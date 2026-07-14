const fs = require('fs')
const path = require('path')

const DEFAULT_POB_VERSION = 'v0.8.0'
const POB_ASSET_ORIGIN = 'https://asset.pob.cool'
const VERSION_TAG = /^v\d+\.\d+\.\d+$/

function isPobVersion(value) {
  return typeof value === 'string' && VERSION_TAG.test(value)
}

function resolvePobVersion(manifest, fallback = DEFAULT_POB_VERSION) {
  const candidate = manifest && manifest.poe2 && manifest.poe2.head
  return isPobVersion(candidate) ? candidate : fallback
}

function readCachedVersion(metadataPath, fallback = DEFAULT_POB_VERSION) {
  try {
    const metadata = JSON.parse(fs.readFileSync(metadataPath, 'utf8'))
    return isPobVersion(metadata.version) ? metadata.version : fallback
  } catch {
    return fallback
  }
}

function writeCachedVersion(metadataPath, version) {
  if (!isPobVersion(version)) return
  fs.mkdirSync(path.dirname(metadataPath), { recursive: true })
  const temp = `${metadataPath}.tmp-${process.pid}`
  fs.writeFileSync(temp, JSON.stringify({ version, updatedAt: new Date().toISOString() }))
  fs.renameSync(temp, metadataPath)
}

async function fetchManifest({ fetchImpl = globalThis.fetch, url = `${POB_ASSET_ORIGIN}/version.json`, timeoutMs = 2500 } = {}) {
  if (typeof fetchImpl !== 'function') throw new Error('fetch is unavailable')
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), timeoutMs)
  try {
    const response = await fetchImpl(url, { signal: controller.signal })
    if (!response.ok) throw new Error(`manifest request failed: HTTP ${response.status}`)
    return await response.json()
  } finally {
    clearTimeout(timer)
  }
}

async function checkPobUpdate({ metadataPath, fetchImpl = globalThis.fetch, fallback = DEFAULT_POB_VERSION, timeoutMs = 2500 } = {}) {
  const cached = metadataPath ? readCachedVersion(metadataPath, fallback) : fallback
  try {
    const manifest = await fetchManifest({ fetchImpl, timeoutMs })
    const version = resolvePobVersion(manifest, cached)
    if (metadataPath) writeCachedVersion(metadataPath, version)
    return { version, source: 'remote', manifest }
  } catch (error) {
    const hasCached = metadataPath && cached !== fallback
    return {
      version: cached,
      source: hasCached ? 'cached' : 'bundled',
      error,
    }
  }
}

function safeAssetRelativePath(value) {
  if (!value || value.includes('\0')) return null
  const rawSegments = value.replaceAll('\\', '/').split('/')
  if (rawSegments.includes('..')) return null
  const normalized = path.posix.normalize(`/${value}`).replace(/^\/+/, '')
  if (!normalized || normalized === '.' || normalized.startsWith('..') || normalized.includes('/../')) return null
  return normalized
}

module.exports = {
  DEFAULT_POB_VERSION,
  POB_ASSET_ORIGIN,
  isPobVersion,
  resolvePobVersion,
  readCachedVersion,
  writeCachedVersion,
  fetchManifest,
  checkPobUpdate,
  safeAssetRelativePath,
}

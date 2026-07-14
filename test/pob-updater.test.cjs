const test = require('node:test')
const assert = require('node:assert/strict')
const fs = require('node:fs')
const os = require('node:os')
const path = require('node:path')

const {
  checkPobUpdate,
  resolvePobVersion,
  safeAssetRelativePath,
} = require('../app/client/electron/pob-updater.cjs')

test('selects the PoE2 head version from a valid manifest', () => {
  const result = resolvePobVersion({
    poe2: {
      head: 'v0.22.0',
      versions: [{ value: 'v0.22.0' }],
    },
  }, 'v0.8.0')

  assert.equal(result, 'v0.22.0')
})

test('rejects an unsafe or incomplete manifest and keeps the bundled version', () => {
  assert.equal(resolvePobVersion({ poe2: { head: '../latest' } }, 'v0.8.0'), 'v0.8.0')
  assert.equal(resolvePobVersion({ poe2: {} }, 'v0.8.0'), 'v0.8.0')
  assert.equal(resolvePobVersion(null, 'v0.8.0'), 'v0.8.0')
})

test('remembers the newest version and uses it when the manifest is temporarily unavailable', async () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'exilecodex-pob-'))
  const metadataPath = path.join(dir, 'version.json')
  const response = { ok: true, json: async () => ({ poe2: { head: 'v0.22.0' } }) }

  const first = await checkPobUpdate({ metadataPath, fetchImpl: async () => response })
  const second = await checkPobUpdate({ metadataPath, fetchImpl: async () => { throw new Error('offline') } })

  assert.equal(first.version, 'v0.22.0')
  assert.equal(first.source, 'remote')
  assert.equal(second.version, 'v0.22.0')
  assert.equal(second.source, 'cached')
})

test('accepts nested asset paths but rejects traversal', () => {
  assert.equal(safeAssetRelativePath('root/Assets/icon_helmet.png'), 'root/Assets/icon_helmet.png')
  assert.equal(safeAssetRelativePath('../root.zip'), null)
  assert.equal(safeAssetRelativePath('root/../../secret'), null)
})

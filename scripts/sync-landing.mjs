#!/usr/bin/env node
// Sync the marketing landing (landing/) into public/home/ — the copy the app iframes on #/home.
//
//   node scripts/sync-landing.mjs
//
// What it does (idempotent — safe to run any number of times):
//   1. Reads the app version from package.json.
//   2. Copies landing/index.html → public/home/index.html, replacing every {{APP_VERSION}}
//      placeholder with the real version and rewriting target="_blank" → target="_top"
//      (the app iframes this copy, so links must break out of the frame, not spawn tabs).
//   3. Copies any new/changed images from landing/img → public/home/img.
//
// landing/index.html is the single source of truth — never edit public/home/index.html by hand.

import { readFileSync, writeFileSync, mkdirSync, readdirSync, existsSync, statSync, copyFileSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const srcHtml = join(root, 'landing', 'index.html')
const srcImg = join(root, 'landing', 'img')
const outDir = join(root, 'public', 'home')
const outHtml = join(outDir, 'index.html')
const outImg = join(outDir, 'img')

// 1. Version from package.json
const { version } = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8'))
if (!version) {
  console.error('sync-landing: no "version" in package.json')
  process.exit(1)
}

// 2. HTML: inject version, retarget links for the iframe
let html = readFileSync(srcHtml, 'utf8')
if (!html.includes('{{APP_VERSION}}')) {
  console.warn('sync-landing: warning — landing/index.html contains no {{APP_VERSION}} placeholder')
}
html = html.replaceAll('{{APP_VERSION}}', version).replaceAll('target="_blank"', 'target="_top"')

mkdirSync(outDir, { recursive: true })
const htmlChanged = !existsSync(outHtml) || readFileSync(outHtml, 'utf8') !== html
if (htmlChanged) writeFileSync(outHtml, html)

// 3. Images: copy only new/changed files
mkdirSync(outImg, { recursive: true })
let copied = 0
for (const name of readdirSync(srcImg)) {
  const from = join(srcImg, name)
  if (!statSync(from).isFile()) continue
  const to = join(outImg, name)
  const same = existsSync(to) && readFileSync(from).equals(readFileSync(to))
  if (!same) {
    copyFileSync(from, to)
    copied++
  }
}

console.log(
  `sync-landing: v${version} → public/home/ ` +
  `(index.html ${htmlChanged ? 'updated' : 'up to date'}, ` +
  `${copied} image${copied === 1 ? '' : 's'} copied)`
)

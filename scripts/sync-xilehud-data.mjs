#!/usr/bin/env node
// Sync the XileHUD dataset snapshot (GPL-3.0, see ATTRIBUTION.md) from a local clone of
// https://github.com/XileHUD/poe_overlay into public/xilehud/, and (re)generate the
// manifest.json each league dir needs — the browser can't list directories, so the vendored
// ModifierDatabase's readdir shim fetches that manifest instead (src/xilehud/db/*).
//
//   node scripts/sync-xilehud-data.mjs [--source D:/Projects/poe_overlay] [--league "Rise of the Abyssal"]
//
// Idempotent: copies only new/changed files, always rewrites the manifest.

import { readdirSync, statSync, mkdirSync, copyFileSync, writeFileSync, existsSync } from 'node:fs'
import { join, resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const args = process.argv.slice(2)
const argOf = (flag, fallback) => {
  const i = args.indexOf(flag)
  return i >= 0 && args[i + 1] ? args[i + 1] : fallback
}

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const source = argOf('--source', 'D:/Projects/poe_overlay')
const league = argOf('--league', 'Rise of the Abyssal')
const slug = league.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')

const srcDir = join(source, 'data', 'poe2', league)
const outDir = join(root, 'public', 'xilehud', 'poe2', slug)

if (!existsSync(srcDir)) {
  console.error(`sync-xilehud-data: source league dir not found: ${srcDir}`)
  process.exit(1)
}
mkdirSync(outDir, { recursive: true })

let copied = 0
const files = readdirSync(srcDir).filter((f) => f.endsWith('.json'))
for (const f of files) {
  const from = join(srcDir, f)
  const to = join(outDir, f)
  const changed = !existsSync(to) || statSync(from).size !== statSync(to).size
  if (changed) {
    copyFileSync(from, to)
    copied++
  }
}

// The manifest lists dataset files only — never itself.
writeFileSync(join(outDir, 'manifest.json'), JSON.stringify(files.sort(), null, 2) + '\n')
console.log(`sync-xilehud-data: ${league} → ${outDir} (${copied} copied, ${files.length} in manifest)`)

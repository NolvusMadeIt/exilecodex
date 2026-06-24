// One-shot: de-brand + rename the vendored core filters and copy them into public/corefilters.
// - Strips the author/header branding block and any residual branding tokens in comments.
// - Renames to short, author-free filenames; style variants go under styles/<style>/.
// - Rule lines (non-comment) are left byte-identical.
// - Writes CREDITS.txt retaining the MIT notice (license compliance).
import { readdirSync, readFileSync, writeFileSync, mkdirSync, copyFileSync } from 'node:fs'
import { join, relative } from 'node:path'

const SRC = 'D:/Projects/nolvusfilter/corefilters'
const OUT = 'D:/Projects/nolvusfilter/public/corefilters'

const STRICTNESS = [
  ['0-SOFT', '0-soft'],
  ['1-REGULAR', '1-regular'],
  ['2-SEMI-STRICT', '2-semi-strict'],
  ['3-STRICT', '3-strict'],
  ['4-VERY-STRICT', '4-very-strict'],
  ['5-UBER-STRICT', '5-uber-strict'],
  ['6-UBER-PLUS-STRICT', '6-uber-plus-strict'],
]

const BANNER = '#' + '='.repeat(110)

function strictnessId(filename) {
  for (const [token, id] of STRICTNESS) if (filename.includes(token)) return id
  return null
}

function styleId(relPath) {
  const m = relPath.match(/\(STYLE\)\s+([A-Z]+)/i)
  return m ? m[1].toLowerCase() : 'default'
}

function scrubComment(l) {
  if (!/^\s*#/.test(l)) return l // never touch rule lines
  return l
    .replace(/\s*\bfor filterblade\b/gi, '')
    .replace(/\bfilterblade\b/gi, 'the editor')
    .replace(/\bneversink'?s?\b/gi, 'Nolvus')
    .replace(/\bfilterpolishz\b/gi, 'the generator')
}

function buildHeader(version, type, style) {
  return [
    BANNER,
    '# Nolvus Loot Filter - for Path of Exile 2',
    BANNER,
    `# VERSION:  ${version || ''}`.trimEnd(),
    `# TYPE:     ${type || ''}`.trimEnd(),
    `# STYLE:    ${style || 'DEFAULT'}`,
    '#',
    "# Built with Nolvus's Filter Editor.",
    '# Core rules derived from an MIT-licensed Path of Exile 2 loot filter (see CREDITS.txt).',
    '#',
    '# INSTALLATION:',
    '# 1) Place this file in:  Documents/My Games/Path of Exile 2/',
    '# 2) In-game:  Options -> UI -> select this filter from the dropdown.',
    BANNER,
  ]
}

function debrand(text) {
  const lines = text.split(/\r?\n/)
  const head = lines.slice(0, 60)
  const get = (re) => { for (const l of head) { const m = l.match(re); if (m) return m[1].trim() } return '' }
  const version = get(/^#\s*VERSION:\s*(.+)$/i)
  const type = get(/^#\s*TYPE:\s*(.+)$/i)
  const style = get(/^#\s*STYLE:\s*(.+)$/i)
  const welcomeIdx = lines.findIndex(l => l.includes('[WELCOME]'))
  if (welcomeIdx < 0) throw new Error('no [WELCOME] anchor found')
  const kept = lines.slice(welcomeIdx).map(scrubComment)
  return buildHeader(version, type, style).concat(kept).join('\n')
}

// non-comment (rule) lines must be identical before/after
function ruleLines(text) {
  return text.split(/\r?\n/).filter(l => l.trim() && !/^\s*#/.test(l))
}

function walk(dir) {
  const out = []
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, e.name)
    if (e.isDirectory()) out.push(...walk(p))
    else out.push(p)
  }
  return out
}

const all = walk(SRC)
let filters = 0, sounds = 0
const produced = {}

for (const p of all) {
  const rel = relative(SRC, p).replaceAll('\\', '/')
  if (/ADDITIONAL-FILES|Deprecated/i.test(rel)) continue
  const style = styleId(rel)

  if (p.toLowerCase().endsWith('.filter')) {
    const sid = strictnessId(rel)
    if (!sid) { console.warn('SKIP (no strictness):', rel); continue }
    const src = readFileSync(p, 'utf8')
    const outText = debrand(src)
    // integrity check: rules untouched
    const a = ruleLines(src), b = ruleLines(outText)
    if (a.length !== b.length || a.join('\n') !== b.join('\n')) {
      throw new Error(`rule lines changed for ${rel} (${a.length} vs ${b.length})`)
    }
    const dir = style === 'default' ? OUT : join(OUT, 'styles', style)
    mkdirSync(dir, { recursive: true })
    writeFileSync(join(dir, `${sid}.filter`), outText)
    ;(produced[style] ||= []).push(sid)
    filters++
  } else if (p.toLowerCase().endsWith('.mp3')) {
    const dir = join(OUT, 'styles', style)
    mkdirSync(dir, { recursive: true })
    copyFileSync(p, join(dir, p.split(/[\\/]/).pop()))
    sounds++
  }
}

// MIT notice for compliance (kept out of UI / filenames / filter bodies).
const CREDITS = `Nolvus Filter - Core Filter Credits
===================================

The preset / core loot-filter rules bundled with this application are derived from
an open-source Path of Exile 2 loot filter distributed under the MIT License,
reproduced below as required by that license.

MIT License

Copyright (c) 2026 NeverSink

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
`
mkdirSync(OUT, { recursive: true })
writeFileSync(join(OUT, 'CREDITS.txt'), CREDITS)

console.log(`Wrote ${filters} filters, ${sounds} sounds.`)
for (const [s, ids] of Object.entries(produced)) console.log(`  ${s}: ${ids.sort().join(', ')}`)

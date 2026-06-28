// The filter generator. The whole .filter is BUILT from the user's settings (Quick Filters,
// rules, tier list, cosmetic) — like poe2filter.com — so the controls always reflect the filter.
// Order is deliberate (PoE2 is first-match-wins): your highlights/hides + quick-filter category
// rules first (already sorted shows-before-hides), then tiered currency, then a final catch-all.
import { compileOverrides, emitStyle, tierStyle } from './overrides.js'
import { loadUniqueBases } from './catalog.js'
import { DROP_TIERS, DEFAULT_TIER_CURRENCY, DEFAULT_TIER_UNIQUES } from '../data/dropTiers.js'
import { quoteList, chunkList } from './filterSyntax.js'
import { strictnessLevel, styleInfo } from '../data/coreFilters.js'

const BAR = '#'.repeat(64)

function stampNow() {
  const d = new Date()
  const p = (n) => String(n).padStart(2, '0')
  return `${d.getUTCFullYear()}-${p(d.getUTCMonth() + 1)}-${p(d.getUTCDate())} ${p(d.getUTCHours())}:${p(d.getUTCMinutes())} UTC`
}

function banner(title) { return [BAR, `# ${title}`, BAR, ''] }

function block(action, comment, conditions, style) {
  const lines = [`${action} # ${comment}`]
  for (const c of conditions || []) if (c) lines.push('\t' + c)
  if (action === 'Show' && style) for (const s of emitStyle(style)) lines.push('\t' + s)
  return lines.join('\n')
}

// Currency, tiered by market value (S→E) from your Tier List, with the long tail handled by the
// catch-all setting. Named valuable currency gets loud styling; the rest a baseline.
function currencyBlocks(settings, uniqueBases = {}) {
  const cosmetic = settings.cosmetic || {}
  const byTier = {}
  for (const t of DROP_TIERS) byTier[t.id] = new Set(DEFAULT_TIER_CURRENCY[t.id] || [])
  for (const [name, tid] of Object.entries(settings.tierOverrides || {})) {
    if (uniqueBases[name]) continue // uniques aren't currency — emitted as base type + Rarity Unique in the override area
    for (const set of Object.values(byTier)) set.delete(name)
    ;(byTier[tid] = byTier[tid] || new Set()).add(name)
  }
  const out = []
  for (const id of ['S', 'A', 'B', 'C', 'D']) {
    const items = [...(byTier[id] || [])]
    for (const chunk of chunkList(items)) out.push(block('Show', `${id}-tier currency`, [`BaseType == ${quoteList(chunk)}`], tierStyle(id, cosmetic)))
  }
  for (const chunk of chunkList([...(byTier.F || [])])) out.push(block('Hide', 'Hidden currency (F-tier)', [`BaseType == ${quoteList(chunk)}`]))
  // Everything else in the currency class: show dim, or hide it at strict levels.
  if (settings.quickFilters?.catchAll === 'hide') out.push(block('Hide', 'Remaining low-value currency', [`Class == ${quoteList(['Stackable Currency'])}`]))
  else out.push(block('Show', 'Remaining currency', [`Class == ${quoteList(['Stackable Currency'])}`], tierStyle('E', cosmetic)))
  return out
}

// The final rule: everything not matched above. Show it dimly, or hide it (true strictness).
function catchAll(settings) {
  if ((settings.quickFilters?.catchAll || 'show') === 'hide') return block('Hide', 'Everything else', [])
  return block('Show', 'Everything else', [], { textColor: [140, 140, 140, 255], fontSize: 18 })
}

function header(settings, opts) {
  const name = (settings.name || "Nolvus's Filter").trim()
  const ver = settings.version || '0.0.1'
  const sName = strictnessLevel(settings.strictness).name
  const stName = styleInfo(settings.style).name
  const gv = opts.gameInfo?.gameVersionLabel || ''
  const lines = [
    BAR,
    `# ${name} - Path of Exile 2 loot filter`,
    BAR,
    `# Built with Nolvus's Filter Editor  -  ${sName}${stName && stName !== 'Default' ? ` / ${stName}` : ''}  -  v${ver}`
      + (gv ? `  -  ${gv}` : '') + `  -  ${opts.stamp || stampNow()}`,
    BAR,
  ]
  if (opts.prefs?.topComment?.trim()) { lines.push('#'); opts.prefs.topComment.split('\n').forEach(l => lines.push(`# ${l}`)) }
  return lines
}

function generate(settings, opts) {
  const out = [...header(settings, opts), '']
  const ub = opts.uniqueBases || {}

  // Auto-seed curated default unique tiers UNDER the user's own tier moves (theirs win) — but only
  // the ones we can resolve to a base type. Lets the Tier List adjust itself without manual work.
  const tierOverrides = { ...(settings.tierOverrides || {}) }
  for (const [tid, names] of Object.entries(DEFAULT_TIER_UNIQUES))
    for (const n of names) if (ub[n] && !(n in tierOverrides)) tierOverrides[n] = tid

  const blocks = compileOverrides({ ...settings, tierOverrides }, ub) // rules + quick-filter + tier rules (sorted)
  if (blocks.length) { out.push(...banner('Your filter')); for (const b of blocks) out.push(b, '') }

  out.push(...banner('Currency'))
  for (const b of currencyBlocks(settings, ub)) out.push(b, '')

  out.push(...banner('Everything else'))
  out.push(catchAll(settings), '')

  const tail = [settings.freeText?.bottom?.trim(), opts.prefs?.bottomComment?.trim()].filter(Boolean)
  if (tail.length) out.push('', ...tail)

  return out.join('\n').replace(/\n{3,}/g, '\n\n') + '\n'
}

// Async only so existing callers (which await) don't change; generation itself is synchronous
// and fast (no network, far fewer lines than a full vendored filter).
export async function buildFilter(settings = {}, opts = {}) {
  let uniqueBases = opts.uniqueBases
  if (!uniqueBases) { try { uniqueBases = await loadUniqueBases() } catch { uniqueBases = {} } }
  return generate(settings, { ...opts, uniqueBases })
}

// The authoritative filter text for output/export: the user's manual edits (Editor tab) when
// present, otherwise the freshly generated filter. Used everywhere a filter is shown or exported.
export async function resolveFilter(settings = {}, opts = {}) {
  if (typeof settings.manualFilter === 'string') return settings.manualFilter
  return buildFilter(settings, opts)
}

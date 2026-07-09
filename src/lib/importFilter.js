// Reverse-mapping engine: turn a parsed .filter back into editable settings so EVERY page mirrors
// the imported file (Presets, Quick Editor, Tier Lists, Custom Rules), not just the output.
//
// Two passes:
//   1. Signature pass — for filters THIS app generated (detected by the header), every Quick Filter
//      emits a distinctive comment (see lib/overrides.js); we match those comments to reconstruct
//      the exact quickFilters + tiers + catch-all. The header line also names the strictness + style.
//   2. Heuristic pass — for foreign filters, tier currency/uniques by colour and keep everything
//      else as editable Custom Rules (verbatim, so the round-trip never drops user data).
//
// Deterministic, no AI, no hidden metadata blob — it reads real filter content only.
import { cloneQuickFilters } from '../data/quickFilters.js'
import { STRICTNESS_LEVELS, STYLES, DEFAULT_STRICTNESS, DEFAULT_STYLE } from '../data/coreFilters.js'
import { DROP_TIERS, DEFAULT_TIER_CURRENCY, DEFAULT_TIER_UNIQUES } from '../data/dropTiers.js'

// name -> default tier, so the decode only records tierOverrides for TRUE user moves. The generator
// emits the curated defaults too (auto-seeded tiers); echoing those back as explicit overrides would
// freeze the Tier List at this snapshot instead of tracking future valueTable updates.
const DEFAULT_CURRENCY_TIER_OF = {}
for (const [tid, names] of Object.entries(DEFAULT_TIER_CURRENCY)) for (const n of names) DEFAULT_CURRENCY_TIER_OF[n] = tid
const DEFAULT_UNIQUE_TIER_OF = {}
for (const [tid, names] of Object.entries(DEFAULT_TIER_UNIQUES)) for (const n of names) DEFAULT_UNIQUE_TIER_OF[n] = tid

const WEAPON_CLASSES = ['Bows', 'Crossbows', 'Quarterstaves', 'Spears', 'Sceptres', 'Wands', 'Staves', 'One Hand Maces', 'Two Hand Maces', 'Foci', 'Quivers']
const ARMOUR_CLASSES = ['Body Armours', 'Helmets', 'Gloves', 'Boots', 'Shields', 'Bucklers']
const JEWELLERY_CLASSES = ['Rings', 'Amulets', 'Belts']
const RARITY_ORDER = ['Normal', 'Magic', 'Rare', 'Unique']

// name -> id for the header reverse lookup.
const STRICTNESS_BY_NAME = Object.fromEntries(STRICTNESS_LEVELS.map(s => [s.name.toLowerCase(), s.id]))
const STYLE_BY_NAME = Object.fromEntries(STYLES.map(s => [s.name.toLowerCase(), s.id]))

// ----- small parse helpers over a parsed block ({ action, comment, conditions, style, raw }) -----
const cond = (b, kind) => (b.conditions || []).find(c => c.kind === kind)
const listVal = (c) => (c == null ? [] : Array.isArray(c.value) ? c.value : [c.value])
const classesOf = (b) => listVal(cond(b, 'Class'))
const basesOf = (b) => listVal(cond(b, 'BaseType'))
const numCond = (b, kind) => { const c = cond(b, kind); return c && typeof c.value === 'number' ? c.value : null }
const numIn = (s, re) => { const m = String(s).match(re); return m ? Number(m[1]) : null }
// Reverse a `rarityCond(val, '<')` list (e.g. "Rarity Normal Magic") back to the rarity floor it hid below.
function rarityFloorFromBlock(b) {
  const c = cond(b, 'Rarity')
  if (!c) return null
  const arr = listVal(c).filter(v => RARITY_ORDER.includes(v))
  if (!arr.length) return null
  const top = arr[arr.length - 1]            // highest rarity in the "hide below" list
  return RARITY_ORDER[RARITY_ORDER.indexOf(top) + 1] || null
}
// Reverse the item-level floor a poe2filter "≥ Tn" tier maps to (overrides.js tierIlvl).
const tierFromIlvl = (lvl) => ({ 82: 1, 75: 2, 68: 3, 60: 4, 50: 5 })[lvl] ?? 3
const sizeFromBlock = (b) => { const w = numCond(b, 'Width'), h = numCond(b, 'Height'); return (w && h) ? `${w}x${h}` : null }

// ----- header → strictness + style (only present in filters this app generated) -----
function readHeader(text) {
  const m = String(text || '').match(/Built with Nolvus's Filter Editor\s+-\s+(.+?)\s+-\s+v\d/)
  if (!m) return null
  const [sRaw, stRaw] = m[1].split(/\s*\/\s*/).map(x => x.trim())
  const strictness = STRICTNESS_BY_NAME[(sRaw || '').toLowerCase()]
  if (!strictness) return null
  const style = stRaw ? (STYLE_BY_NAME[stRaw.toLowerCase()] || DEFAULT_STYLE) : DEFAULT_STYLE
  return { strictness, style }
}

// ----- nearest drop-tier for a foreign Show block's text colour (Euclidean RGB) -----
export function nearestTier(textColor) {
  if (!Array.isArray(textColor) || textColor.length < 3) return null
  let best = null, bestD = Infinity
  for (const t of DROP_TIERS) {
    if (!t.textColor) continue
    const [r, g, bb] = t.textColor
    const d = (r - textColor[0]) ** 2 + (g - textColor[1]) ** 2 + (bb - textColor[2]) ** 2
    if (d < bestD) { bestD = d; best = t.id }
  }
  return bestD <= 4000 ? best : 'E'   // beyond a clear match → no confident tier
}
function styleColor(b) {
  for (const line of b.style || []) {
    const m = line.match(/SetTextColor\s+(\d+)\s+(\d+)\s+(\d+)/)
    if (m) return [Number(m[1]), Number(m[2]), Number(m[3])]
  }
  return null
}

// ----- signature pass: a generated block's comment -> quickFilters state -----
// Returns true if the block was recognised (and consumed). `uniq` carries the inverse unique map
// (base type -> unique names) so Tier-List moves on uniques survive the round-trip.
function applySignature(b, qf, tierOverrides, uniq) {
  const c = b.comment || ''
  const push = (key, val) => { if (!qf[key]) qf[key] = []; if (!qf[key].includes(val)) qf[key].push(val) }
  const set = (k, v) => { qf[k] = v }
  const flaskGroup = (b) => classesOf(b).map(cl => ({ 'Life Flasks': 'life', 'Mana Flasks': 'mana', Charms: 'charms' }[cl])).filter(Boolean)

  // ---- Currency tiers (from buildFilter.currencyBlocks) ----
  // Only record moves that DIFFER from the curated defaults — the generator emits the defaults too.
  let m
  if ((m = c.match(/^([SABCD])-tier currency$/))) { basesOf(b).forEach(n => { if (DEFAULT_CURRENCY_TIER_OF[n] !== m[1]) tierOverrides[n] = m[1] }); return true }
  if (c === 'Hidden currency (F-tier)') { basesOf(b).forEach(n => { if (DEFAULT_CURRENCY_TIER_OF[n] !== 'F') tierOverrides[n] = 'F' }); return true }
  if (c === 'Remaining currency' || c === 'Remaining low-value currency') { set('catchAll', b.action === 'Hide' ? 'hide' : 'show'); return true }
  if (c === 'Everything else') { set('catchAll', b.action === 'Hide' ? 'hide' : 'show'); return true }
  // ---- Tier List moves (plain base types + uniques restored through the inverse base map) ----
  if ((m = c.match(/^Tier ([SABCDEF]) \(your Tier List\)$/))) { basesOf(b).forEach(n => { tierOverrides[n] = m[1] }); return true }
  if ((m = c.match(/^Hidden — Tier ([SABCDEF]) \(your Tier List\)$/))) { basesOf(b).forEach(n => { tierOverrides[n] = m[1] }); return true }
  if ((m = c.match(/^(?:Hidden — )?Tier ([SABCDEF]) uniques \(your Tier List\)$/))) {
    // The block lists BASE types (PoE2 can't match uniques by name); map back to every unique name
    // on that base — behaviourally identical to what the filter does in-game — and keep only moves
    // that differ from the curated defaults. Without ctx.uniqueBases we fall back to re-seeding.
    for (const base of basesOf(b)) for (const name of (uniq?.byBase?.get(base) || []))
      if (DEFAULT_UNIQUE_TIER_OF[name] !== m[1]) tierOverrides[name] = m[1]
    return true
  }

  // ---- Currency category shows / hides ----
  const SHOW_CUR = { 'Show Currency Shards': 'shards', 'Show Runes & Soul Cores': 'runes', 'Show Catalysts': 'catalysts', 'Show Essences': 'essences', 'Show Omens': 'omens' }
  const HIDE_CUR = { 'Hide Currency Shards': 'shards', 'Hide Runes & Soul Cores': 'runes', 'Hide Catalysts': 'catalysts', 'Hide Essences': 'essences', 'Hide Omens': 'omens' }
  if (SHOW_CUR[c]) { push('currencyShow', SHOW_CUR[c]); return true }
  if (HIDE_CUR[c]) { push('currencyHide', HIDE_CUR[c]); return true }
  if (c === 'Hide Scrolls of Wisdom') { set('hideScrolls', true); return true }
  if (c === 'Hide Gold') { set('hideGold', true); return true }
  if (/^Hide small gold piles/.test(c)) { set('minGoldPile', numIn(c, /<\s*(\d+)/) ?? numCond(b, 'StackSize') ?? 0); return true }
  if (c === 'Show Waystones') { set('showWaystones', true); const t = numCond(b, 'WaystoneTier'); if (t) set('minWaystoneTier', t); return true }
  if (c === 'Highlight Rare Waystones') { set('highlightRareWaystones', true); return true }

  // ---- Gems / flasks ----
  if (c === 'Show Uncut Gems') { push('gemsShow', 'uncut'); return true }
  if (c === 'Show Skill Gems') { push('gemsShow', 'skill'); const l = numCond(b, 'GemLevel'); if (l) set('minGemLevel', l); return true }
  if (c === 'Show Support Gems') { push('gemsShow', 'support'); const l = numCond(b, 'GemLevel'); if (l) set('minGemLevel', l); return true }
  if (c === 'Show Flasks & Charms') { flaskGroup(b).forEach(v => push('flasksShow', v)); const q = numCond(b, 'Quality'); if (q) set('qualityFlasksMin', q); return true }
  if (c === 'Hide non-Unique Flasks & Charms') { set('hideNonUniqueFlasks', true); return true }

  // ---- Uniques & chance ----
  if (c === 'Highlight Uniques') { set('showUniques', true); return true }
  if (c === 'Show chance/craft bases') { set('showChanceBases', true); return true }
  if (c === 'Excellent (S-tier) uniques') { set('uExcellent', true); return true }
  if (c === 'Good (A-tier) uniques') { set('uGood', true); return true }
  if (c === 'Potential (B-tier) uniques') { set('uPotential', true); return true }
  if (c === 'Show every remaining unique (drop-restricted safety)') { set('uDropRestricted', true); return true }
  if (c === 'Class-specific uniques') { set('uClassSpecific', classesOf(b)); return true }
  if (c === 'Exceptional uniques') { set('exceptionalUniques', true); const q = numCond(b, 'Quality'); if (q) set('exceptionalUniquesMin', q); return true }
  if (c === 'Vaal mod (corrupted) uniques') { set('vaalModUniques', true); return true }
  if (c === 'Vaal base uniques') { set('vaalUniques', true); return true }
  if (c === 'Small uniques to disenchant') { set('smallDisenchantUniques', true); const s = sizeFromBlock(b); if (s) set('smallDisenchantMaxSize', s); return true }
  if (c === 'Other uniques') { set('uOther', true); return true }
  if (c === 'Hide low-value uniques') { set('hideLowValueUniques', true); return true }
  if (c === 'Hide remaining uniques') { set('hideAllUniques', true); return true }
  if (c === 'Wanted chance bases') { set('chanceWanted', true); return true }
  if (c === 'Potential chance bases') { set('chancePotential', true); return true }

  // ---- Endgame / other items (both the preset shows and the cloned "Other Items" toggles) ----
  const ENDGAME = { 'Show Quest Items': 'quest', 'Show Relics': 'relics', 'Show Trial Items': 'trials', 'Show Precursor Tablets': 'tablets', 'Show Fragments & Splinters': 'fragments', 'Show Expedition': 'expedition' }
  if (ENDGAME[c]) { push('endgameShow', ENDGAME[c]); return true }
  if (c === 'Quest items') { set('showQuest', true); return true }
  if (c === 'Relics') { set('showRelics', true); return true }
  if (c === 'Hide basic (Normal) relics') { set('showRelics', true); set('relicsHideOther', true); return true }
  if (c === 'Trial keys') { set('showTrials', true); return true }
  if (c === 'Precursor tablets') { set('showTablets', true); return true }
  if (c === 'Fragments & splinters') { set('showFragments', true); return true }
  if (c === 'Expedition') { set('showExpedition', true); return true }

  // ---- Campaign leveling ----
  if (c === 'Leveling weapons & armour') { push('levelingShow', 'weaponsArmour'); const a = numCond(b, 'AreaLevel'); if (a) set('levelingMaxAreaLevel', a); return true }
  if (c === 'Leveling jewellery') { push('levelingShow', 'jewellery'); return true }
  if (c === 'Low rares to salvage') { set('disenchantRares', true); return true }
  if (c === 'Leveling gear') { set('lvlGear', true); const lo = numCond(b, 'AreaLevel'); if (lo) set('lvlGearAreaMin', lo); return true }
  if (c === 'Leveling weapons') { set('lvlWeapons', true); const cl = classesOf(b); if (cl.length && cl.length < WEAPON_CLASSES.length) set('lvlWeaponTypes', cl); return true }
  if (c === 'Leveling armour') { set('lvlArmour', true); const cl = classesOf(b); if (cl.length && cl.length < ARMOUR_CLASSES.length) set('lvlArmourTypes', cl); return true }
  if (c === 'Leveling flasks') { set('lvlFlasks', true); return true }
  if (c === 'Leveling gold') { set('lvlGold', true); return true }
  if (c === 'Leveling Verisium') { set('lvlVerisium', true); return true }

  // ---- Disenchant / quality / socketed gear ----
  if (c === 'Rares to disenchant/salvage') {
    set('disRares', true)
    const rar = listVal(cond(b, 'Rarity')).filter(v => RARITY_ORDER.includes(v))
    const top = rar[rar.length - 1]
    if (top) set('disRaresMaxRarity', top)
    set('disRaresMagic', rar.includes('Magic') && top !== 'Magic')
    const s = sizeFromBlock(b); if (s) set('disRaresMaxSize', s)
    return true
  }
  if (/^Socketed gear/.test(c)) { set('socketedGear', true); set('socketedGearMin', numIn(c, /\((\d+)\+\)/) ?? numCond(b, 'Sockets') ?? 2); return true }
  if (c === 'Quality martial weapons') { set('qMartial', true); const q = numCond(b, 'Quality'); if (q) set('qMartialMin', q); return true }
  if (c === 'Quality caster weapons') { set('qCaster', true); const q = numCond(b, 'Quality'); if (q) set('qCasterMin', q); return true }
  if (c === 'Quality shields & armour') { set('qArmour', true); const q = numCond(b, 'Quality'); if (q) set('qArmourMin', q); return true }

  // ---- Jewels / jewellery ----
  if (c === 'My jewels') { set('myJewels', basesOf(b)); return true }
  if (c === 'Hide off-build jewels') return true // implied by My jewels
  if (c === 'Show Jewels') { set('showJewels', true); return true }
  if (c === 'Highlight Rare jewellery') { set('highlightJewellery', true); return true }

  // ---- Equipment floor (gearMinRarity / item level / quality / sockets / always-show) ----
  if (c === 'Show equipment you keep') return true // derived from gearMinRarity / item level
  if (/^Hide equipment below item level/.test(c)) { set('gearMinItemLevel', numIn(c, /(\d+)/) ?? numCond(b, 'ItemLevel') ?? 0); return true }
  if (/^Hide equipment below /.test(c)) { const r = c.replace('Hide equipment below ', '').trim(); if (RARITY_ORDER.includes(r)) set('gearMinRarity', r); return true }
  if (/^Always show .*quality gear/.test(c)) { set('gearMinQuality', numIn(c, /(\d+)%/) ?? numCond(b, 'Quality') ?? 0); return true }
  if (/^Always show .*socket gear/.test(c)) { set('gearMinSockets', numIn(c, /(\d+)\+/) ?? numCond(b, 'Sockets') ?? 0); return true }
  if (/^Always show Rare bases iLvl/.test(c)) { set('alwaysShowRareIlvl', numIn(c, /(\d+)\+/) ?? numCond(b, 'ItemLevel') ?? 0); return true }

  // ---- My equipment (off-build hides → keep = all − dropped) ----
  if (c === 'Hide off-build weapon types') { set('myWeapons', WEAPON_CLASSES.filter(x => !classesOf(b).includes(x))); return true }
  if (c === 'Hide off-build armour types') { set('myArmour', ARMOUR_CLASSES.filter(x => !classesOf(b).includes(x))); return true }
  if (c === 'Hide off-build jewellery') { set('myJewellery', JEWELLERY_CLASSES.filter(x => !classesOf(b).includes(x))); return true }

  // ---- Other Equipment: unidentified ----
  if (/^Unidentified Rare gear/.test(c)) { set('unidRareGear', true); set('unidRareGearTier', tierFromIlvl(numCond(b, 'ItemLevel'))); return true }
  if (/^Unidentified Magic gear/.test(c)) { set('unidMagicGear', true); set('unidMagicGearTier', tierFromIlvl(numCond(b, 'ItemLevel'))); return true }
  if (/^Unidentified Rare jewellery/.test(c)) { set('unidRareJewellery', true); set('unidRareJewelleryTier', tierFromIlvl(numCond(b, 'ItemLevel'))); return true }
  if (/^Unidentified Magic jewellery/.test(c)) { set('unidMagicJewellery', true); set('unidMagicJewelleryTier', tierFromIlvl(numCond(b, 'ItemLevel'))); return true }
  // ---- Other Equipment: identified ----
  if (c === 'Show all identified items') { set('idShowAll', true); return true }
  if (c === 'Identified gear') { set('idGear', true); return true }
  if (c === 'Identified jewellery') { set('idJewellery', true); return true }
  if (c === 'Identified jewels') { set('idJewels', true); return true }
  if (c === 'Identified items on my classes') { set('idCustom', true); return true }
  if (c === 'Hide other identified equipment') { set('idHideRest', true); if (!(b.conditions || []).some(x => x.kind === 'Corrupted')) set('idHideRestCorrupted', true); return true }
  if (c === 'Excellent identified items') { set('idExcellent', true); return true }
  if (c === 'Good identified items') { set('idGood', true); return true }
  // ---- Other Equipment: crafting bases ----
  if (c === 'Highlight crafting bases') { set('showCraftingBases', true); const l = numCond(b, 'ItemLevel'); if (l) set('craftingBaseIlvl', l); return true }
  if (c === 'Excellent quality gear') { set('craftQualityGear', true); const q = numCond(b, 'Quality'); if (q) set('craftQualityMin', q); return true }
  if (c === 'Excellent socketed gear') { set('craftSocketGear', true); const s = numCond(b, 'Sockets'); if (s) set('craftSocketMin', s); return true }
  if (c === 'Excellent jewellery bases') { set('craftJewellery', true); const l = numCond(b, 'ItemLevel'); if (l) set('craftJewelleryIlvl', l); return true }
  // ---- Other Equipment: special ----
  if (/^Special gear/.test(c)) { set('specialGear', true); return true }
  if (c === 'Double-anointed amulets') { set('doubleAnointAmulets', true); return true }
  if (c === 'Excellent special jewellery') { set('specialJewellery', true); const l = numCond(b, 'ItemLevel'); if (l) set('specialJewelleryIlvl', l); return true }
  if (c === 'Remaining special jewellery') { set('specialJewelleryRemaining', true); return true }
  if (c === 'Hide remaining non-unique gear') { set('hideAllRemainingGear', true); return true }

  // ---- Per-slot rarity cleanup ----
  if (c === 'Hide low-rarity Rings') { const f = rarityFloorFromBlock(b); if (f) set('hideRingsBelow', f); return true }
  if (c === 'Hide low-rarity Amulets') { const f = rarityFloorFromBlock(b); if (f) set('hideAmuletsBelow', f); return true }
  if (c === 'Hide low-rarity Belts') { const f = rarityFloorFromBlock(b); if (f) set('hideBeltsBelow', f); return true }
  if (c === 'Hide low-rarity Jewels') { const f = rarityFloorFromBlock(b); if (f) set('hideJewelsBelow', f); return true }

  // ---- Flasks & charms (cloned groups) ----
  if (c === 'High iLvl normal charms') { set('charmsHighIlvl', true); return true }
  if (c === 'Quality charms') { set('qCharms', true); const q = numCond(b, 'Quality'); if (q) set('qCharmsMin', q); return true }
  if (c === 'Quality flasks') { set('qFlasks', true); const q = numCond(b, 'Quality'); if (q) set('qFlasksMin', q); return true }
  if (c === 'Hide non-unique Life Flasks') { set('hideLifeFlasks', true); return true }
  if (c === 'Hide non-unique Mana Flasks') { set('hideManaFlasks', true); return true }
  if (c === 'Hide non-unique Charms') { set('hideCharms', true); return true }
  if (c === 'My flasks & charms') { set('myFlasks', classesOf(b)); return true }

  // ---- Currency: economy + hides ----
  if (c === 'Hide Verisium') { set('hideVerisium', true); const s = numCond(b, 'StackSize'); if (s) set('minVerisium', s); return true }
  if (c === 'Hide regular runes') { set('hideRegularRunes', true); return true }
  if (c === 'Hide low uncut gems') { set('hideUncutGems', true); const l = numCond(b, 'ItemLevel'); if (l) set('hideUncutBelow', l); return true }
  if (c === 'Currency tiering: hide low-tier shards') { set('econTieringMode', 'strict'); return true }
  if (c === 'Currency tiering off: hide low-value currency') { set('econTieringMode', 'off'); return true }
  if (c === 'Highlight large currency stacks') { set('econBigStacks', true); const s = numCond(b, 'StackSize'); if (s) set('econBigStackSize', s); return true }

  return false
}

// ----- heuristic pass for foreign filters -----
function applyHeuristic(b, tierOverrides, baseNames) {
  if (b.action === 'Show') {
    const names = basesOf(b).filter(n => !baseNames || baseNames.has(n))
    const isUnique = (b.conditions || []).some(x => x.kind === 'Rarity' && listVal(x).includes('Unique'))
    if (names.length && !isUnique) { const tid = nearestTier(styleColor(b)) || 'C'; names.forEach(n => { if (!(n in tierOverrides)) tierOverrides[n] = tid }); return true }
  }
  return false
}

// Split a joined freeText string back into its blank-line chunks and keep only the USER's chunks:
// drop pure-comment chunks containing a generated bar line (the header + section banners) and any
// chunk that is just the global Settings top/bottom comment (re-added from prefs on every export —
// baking it into the filter's freeText would duplicate it).
const BAR_LINE = /^#{10,}\s*$/
function userFreeText(joined, prefsComment) {
  if (!joined) return ''
  const norm = (s) => s.split('\n').map(l => l.replace(/^#\s?/, '')).join('\n').trim()
  const pref = prefsComment?.trim() ? norm(prefsComment) : null
  return joined.split(/\n{2,}/).filter(ch => {
    const lines = ch.split('\n')
    if (lines.every(l => l.trim().startsWith('#')) && lines.some(l => BAR_LINE.test(l.trim()))) return false
    if (pref && norm(ch) === pref) return false
    return true
  }).join('\n\n').trim()
}

/**
 * decodeFilter(parsed, ctx) -> settings patch that makes every page mirror the file.
 * parsed: output of parseFilterText (must include `blocks`).
 * ctx: { text, baseNames:Set, uniqueBases:{name:base}, prefs:{topComment,bottomComment} }
 */
export function decodeFilter(parsed, ctx = {}) {
  const { text = '', baseNames = null, uniqueBases = null } = ctx
  const head = readHeader(text)
  const ours = !!head
  const qf = cloneQuickFilters()   // deep copy — decode must never mutate the shared defaults
  const tierOverrides = {}
  const customRules = []
  let recognised = 0

  // Inverse unique map (base type -> unique names) for restoring unique Tier-List moves.
  const byBase = new Map()
  for (const [name, base] of Object.entries(uniqueBases || {})) {
    if (!byBase.has(base)) byBase.set(base, [])
    byBase.get(base).push(name)
  }
  const uniq = { byBase }

  const blocks = parsed.blocks || []
  blocks.forEach((b, i) => {
    if (ours && applySignature(b, qf, tierOverrides, uniq)) { recognised++; return }
    if (!ours && applyHeuristic(b, tierOverrides, baseNames)) { recognised++; return }
    // Leftover / foreign block → an editable Custom Rule (verbatim raw → exact round-trip).
    const cr = parsed.customRules?.[i]
    if (cr) customRules.push(cr)
  })

  // Foreign filters: guess the closest strictness from the catch-all behaviour + hide density.
  let strictness = head?.strictness
  if (!strictness) {
    const hides = blocks.filter(b => b.action === 'Hide').length
    const catchHide = blocks.some(b => b.comment === 'Everything else' && b.action === 'Hide')
    strictness = catchHide ? (hides > 30 ? '4-very-strict' : '3-strict') : (hides > 10 ? '2-semi-strict' : DEFAULT_STRICTNESS)
    // pull catch-all into quickFilters so the generated output keeps the foreign filter's stance
    if (catchHide) qf.catchAll = 'hide'
  }

  return {
    strictness,
    style: head?.style || DEFAULT_STYLE,
    quickFilters: qf,
    tierOverrides,
    customRules,
    // Our own generated header/banners are reconstructed structurally — strip THOSE, but keep the
    // user's real free text (comments/notes they typed on the Custom Rules page) on the round-trip.
    freeText: ours
      ? { top: userFreeText(parsed.freeTextTop, ctx.prefs?.topComment), bottom: userFreeText(parsed.freeTextBottom, ctx.prefs?.bottomComment) }
      : { top: parsed.freeTextTop || '', bottom: parsed.freeTextBottom || '' },
    meta: parsed.meta || {},
    summary: { ours, recognised, tiered: Object.keys(tierOverrides).length, custom: customRules.length, strictness },
  }
}

// The editable settings slices a decode patch contributes (no name/version/meta) — used by the
// store's importDecoded (replace active) and the New-filter "create" path (addFilter).
export function decodedToSettings(patch = {}) {
  return {
    strictness: patch.strictness,
    style: patch.style,
    quickFilters: patch.quickFilters,
    tierOverrides: patch.tierOverrides || {},
    customRules: patch.customRules || [],
    freeText: patch.freeText || { top: '', bottom: '' },
  }
}

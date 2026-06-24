// Override engine. User customizations (Quick Editor rules + toggles, class gear, tier moves,
// custom rules) compile to PoE2 Show/Hide blocks that we splice into the core filter's
// OVERRIDE AREA — before every base rule. Because PoE2 is first-match-wins, anything here wins
// in-game. This is what makes "hide / show / highlight anything" actually work.
import { quote, quoteList } from './filterSyntax.js'
import { DROP_TIERS } from '../data/dropTiers.js'

const TIER_BY_ID = Object.fromEntries(DROP_TIERS.map(t => [t.id, t]))

const START = '#=== NOLVUS OVERRIDES (START) ===  Your customizations — these run first and win.'
const END = '#=== NOLVUS OVERRIDES (END) ==='

const clampVol = (v) => Math.max(0, Math.min(300, Math.round(Number(v) || 0)))
const clampFont = (v) => Math.max(18, Math.min(45, Math.round(Number(v) || 32)))
const num = (v) => v != null && v !== '' && !Number.isNaN(Number(v)) && Number(v) !== 0
const col4 = (c) => Array.isArray(c) ? [c[0], c[1], c[2], c[3] ?? 255].join(' ') : c

// Split a free-text base-type field on commas / newlines into clean names.
export function splitNames(s) {
  return String(s || '').split(/[\n,]/).map(x => x.trim()).filter(Boolean)
}

// A single rarity condition. exact → `Rarity Magic`; with op → `Rarity <= Magic`.
function rarityCond(rarity, op) {
  if (!rarity) return null
  return (!op || op === '=' || op === '==') ? `Rarity ${rarity}` : `Rarity ${op} ${rarity}`
}

// Matcher → condition lines. Every field is optional; only set fields emit a condition.
export function matchConditions(m = {}) {
  const c = []
  if (m.classes?.length) c.push(`Class == ${quoteList(m.classes)}`)
  const names = splitNames(m.baseType)
  if (names.length) c.push(m.baseMode === 'exact' ? `BaseType == ${quoteList(names)}` : `BaseType ${quoteList(names)}`)
  const rc = rarityCond(m.rarity, m.rarityOp)
  if (rc) c.push(rc)
  if (num(m.itemLevel)) c.push(`ItemLevel ${m.itemLevelOp || '>='} ${Number(m.itemLevel)}`)
  if (num(m.quality)) c.push(`Quality ${m.qualityOp || '>='} ${Number(m.quality)}`)
  if (num(m.sockets)) c.push(`Sockets ${m.socketsOp || '>='} ${Number(m.sockets)}`)
  if (num(m.stackSize)) c.push(`StackSize ${m.stackSizeOp || '>='} ${Number(m.stackSize)}`)
  if (num(m.waystoneTier)) c.push(`WaystoneTier ${m.waystoneTierOp || '>='} ${Number(m.waystoneTier)}`)
  if (num(m.areaLevel)) c.push(`AreaLevel ${m.areaLevelOp || '>='} ${Number(m.areaLevel)}`)
  return c
}

// Style lines for a Show override (richer than the old generator: borders + backgrounds + beams).
export function emitStyle(st = {}) {
  const out = []
  if (st.textColor) out.push(`SetTextColor ${col4(st.textColor)}`)
  if (st.borderColor) out.push(`SetBorderColor ${col4(st.borderColor)}`)
  if (st.bgColor) out.push(`SetBackgroundColor ${col4(st.bgColor)}`)
  if (st.fontSize) out.push(`SetFontSize ${clampFont(st.fontSize)}`)
  if (st.beam) out.push(`PlayEffect ${st.beam}${st.beamTemp ? ' Temp' : ''}`)
  if (st.minimap) out.push(`MinimapIcon ${st.minimapSize ?? 1} ${st.minimap} ${st.minimapShape || 'Circle'}`)
  if (st.customSound) out.push(`CustomAlertSound "${st.customSound}" ${clampVol(st.volume ?? 200)}`)
  else if (st.sound && st.sound !== 'None') out.push(`PlayAlertSound ${st.sound} ${clampVol(st.volume ?? 200)}`)
  return out
}

// A loud default highlight for "pinpoint" Shows when the user hasn't customized the style.
export const DEFAULT_HIGHLIGHT = {
  textColor: [255, 255, 255, 255], borderColor: [255, 80, 80, 255], bgColor: [40, 0, 0, 255],
  fontSize: 40, beam: 'Red', minimap: 'Red', minimapShape: 'Star', sound: 1, volume: 300,
}

// Style for an item bumped to a drop tier on the Tier List. Starts from the tier's defaults
// (color/beam) and applies the user's Cosmetic overrides for that tier (beam/shape/sound).
function tierStyle(tierId, cosmetic = {}) {
  const t = TIER_BY_ID[tierId] || TIER_BY_ID.E
  const ov = cosmetic.tierStyles?.[tierId] || {}
  const cap = (s) => s ? s[0].toUpperCase() + s.slice(1) : s
  const beam = ov.beam != null ? ov.beam : (t.beam ? cap(t.beam) : 'None')
  const st = { textColor: t.textColor, fontSize: t.id === 'S' ? 40 : t.id === 'A' ? 38 : t.id === 'B' ? 36 : 34 }
  if (beam && beam !== 'None') { st.beam = beam; st.minimap = beam; st.minimapShape = ov.shape || 'Circle' }
  if (ov.customSound?.trim()) { st.customSound = ov.customSound.trim(); st.volume = ov.volume ?? 200 }
  else if (ov.sound && ov.sound !== 'None') { st.sound = ov.sound; st.volume = ov.volume ?? 200 }
  return st
}

// Render one descriptor to a block string. A descriptor is { action, comment, conditions, style }.
function renderBlock(d) {
  const lines = [`${d.action} # ${d.comment || 'Nolvus override'}`]
  for (const c of d.conditions || []) if (c) lines.push('\t' + c)
  if (d.action === 'Show') for (const s of emitStyle(d.style || {})) lines.push('\t' + s)
  return lines.join('\n')
}

// ----- descriptor sources -----

const WEAPON_CLASSES = ['Bows', 'Crossbows', 'Quarterstaves', 'Spears', 'Sceptres', 'Wands', 'Staves', 'One Hand Maces', 'Two Hand Maces', 'Foci', 'Quivers']
const ARMOUR_CLASSES = ['Body Armours', 'Helmets', 'Gloves', 'Boots', 'Shields', 'Bucklers']
const JEWELLERY_CLASSES = ['Rings', 'Amulets', 'Belts']
const GEAR_CLASSES = [...WEAPON_CLASSES, ...ARMOUR_CLASSES, ...JEWELLERY_CLASSES]

// Quick Editor user rules: hide / show / highlight anything (incl. imported raw rules).
function ruleDescriptors(rules = []) {
  const out = []
  for (const r of rules) {
    if (!r || r.enabled === false) continue
    if (r.raw?.trim()) { out.push({ raw: r.raw.trim(), priority: r.action === 'Hide' ? 40 : 20 }); continue }
    const action = r.action === 'Hide' ? 'Hide' : 'Show'
    const conditions = matchConditions(r.match || {})
    if (!conditions.length) continue // a rule with no matcher would catch everything — skip
    out.push({
      action, conditions,
      comment: r.label || (action === 'Hide' ? 'Hidden by you' : 'Highlighted by you'),
      style: action === 'Show' ? (r.style || DEFAULT_HIGHLIGHT) : undefined,
      priority: action === 'Show' ? 20 : 40,
    })
  }
  return out
}

// Quick Filters (the dropdown sections) → Show/Hide overrides layered on the preset. Non-set
// controls emit nothing (the preset decides). "Force-show" gets a clean tier style; "highlight"
// gets the loud highlight; hides/strictness get Hide blocks. Shows are low-priority (run first).
function quickFilterDescriptors(qf = {}, cosmetic = {}) {
  const out = []
  const has = (arr, v) => Array.isArray(arr) && arr.includes(v)
  const showT = (comment, conditions, tier = 'C', priority = 22) => out.push({ action: 'Show', comment, conditions, style: tierStyle(tier, cosmetic), priority })
  const highlight = (comment, conditions, priority = 16) => out.push({ action: 'Show', comment, conditions, style: DEFAULT_HIGHLIGHT, priority })
  const hide = (comment, conditions, priority = 46) => out.push({ action: 'Hide', comment, conditions, priority })
  const lvl = (n) => num(n) ? [`GemLevel >= ${Number(n)}`] : []

  // Currency
  if (has(qf.currencyShow, 'shards')) showT('Show Currency Shards', [`BaseType ${quoteList(['Shard'])}`], 'D')
  if (has(qf.currencyShow, 'runes')) showT('Show Runes & Soul Cores', [`BaseType ${quoteList(['Rune', 'Soul Core'])}`], 'C')
  if (has(qf.currencyShow, 'catalysts')) showT('Show Catalysts', [`BaseType ${quoteList(['Catalyst'])}`], 'C')
  if (has(qf.currencyShow, 'essences')) showT('Show Essences', [`BaseType ${quoteList(['Essence'])}`], 'C')
  if (has(qf.currencyShow, 'omens')) showT('Show Omens', [`BaseType ${quoteList(['Omen'])}`], 'C')
  if (qf.hideScrolls) hide('Hide Scrolls of Wisdom', [`BaseType == ${quote('Scroll of Wisdom')}`])
  if (qf.hideGold) hide('Hide Gold', [`BaseType == ${quote('Gold')}`])
  else if (num(qf.minGoldPile)) hide(`Hide small gold piles (< ${Number(qf.minGoldPile)})`, [`BaseType == ${quote('Gold')}`, `StackSize < ${Number(qf.minGoldPile)}`])
  if (qf.showWaystones) showT('Show Waystones', [`Class == ${quoteList(['Waystones'])}`, ...(Number(qf.minWaystoneTier) > 1 ? [`WaystoneTier >= ${Number(qf.minWaystoneTier)}`] : [])], 'C')

  // Gems
  if (has(qf.gemsShow, 'uncut')) showT('Show Uncut Gems', [`BaseType ${quoteList(['Uncut'])}`], 'C')
  if (has(qf.gemsShow, 'skill')) showT('Show Skill Gems', [`Class == ${quoteList(['Skill Gems'])}`, ...lvl(qf.minGemLevel)], 'C')
  if (has(qf.gemsShow, 'support')) showT('Show Support Gems', [`Class == ${quoteList(['Support Gems'])}`, ...lvl(qf.minGemLevel)], 'C')

  // Flasks & charms
  const flaskClasses = [has(qf.flasksShow, 'life') && 'Life Flasks', has(qf.flasksShow, 'mana') && 'Mana Flasks', has(qf.flasksShow, 'charms') && 'Charms'].filter(Boolean)
  if (flaskClasses.length) showT('Show Flasks & Charms', [`Class == ${quoteList(flaskClasses)}`, ...(num(qf.qualityFlasksMin) ? [`Quality >= ${Number(qf.qualityFlasksMin)}`] : [])], 'D')
  if (qf.hideNonUniqueFlasks) hide('Hide non-Unique Flasks & Charms', [`Class == ${quoteList(['Life Flasks', 'Mana Flasks', 'Charms'])}`, 'Rarity < Unique'])

  // Uniques & chance
  if (qf.showUniques) highlight('Highlight Uniques', ['Rarity Unique'])
  if (qf.showChanceBases) showT('Show chance/craft bases', [`Class == ${quoteList([...WEAPON_CLASSES, ...ARMOUR_CLASSES, 'Rings', 'Amulets'])}`, 'Rarity <= Magic', 'ItemLevel >= 82'], 'C', 18)

  // Endgame / other
  if (has(qf.endgameShow, 'quest')) showT('Show Quest Items', [`Class == ${quoteList(['Quest Items'])}`], 'C')
  if (has(qf.endgameShow, 'relics')) showT('Show Relics', [`Class == ${quoteList(['Relics'])}`], 'C')
  if (has(qf.endgameShow, 'trials')) showT('Show Trial Items', [`BaseType ${quoteList(['Barya', 'Ultimatum', 'Djinn'])}`], 'C')
  if (has(qf.endgameShow, 'tablets')) showT('Show Precursor Tablets', [`BaseType ${quoteList(['Tablet'])}`], 'C')
  if (has(qf.endgameShow, 'fragments')) showT('Show Fragments & Splinters', [`BaseType ${quoteList(['Splinter', 'Fragment', 'Crest'])}`], 'C')
  if (has(qf.endgameShow, 'expedition')) showT('Show Expedition', [`BaseType ${quoteList(['Logbook', 'Artifact'])}`], 'C')

  // Leveling
  if (has(qf.levelingShow, 'weaponsArmour')) showT('Leveling weapons & armour', [`Class == ${quoteList([...WEAPON_CLASSES, ...ARMOUR_CLASSES])}`, 'Rarity <= Rare'], 'D')
  if (has(qf.levelingShow, 'jewellery')) showT('Leveling jewellery', [`Class == ${quoteList(JEWELLERY_CLASSES)}`, 'Rarity <= Rare'], 'D')
  if (has(qf.levelingShow, 'flasks')) showT('Leveling flasks', [`Class == ${quoteList(['Life Flasks', 'Mana Flasks'])}`], 'D')
  if (qf.disenchantRares) showT('Low rares to salvage', ['Rarity Rare', 'ItemLevel < 65'], 'E')

  // My equipment (class-aware): keep the selected types, hide the rest (below Unique)
  const offBuild = (label, all, keep) => { const drop = all.filter(c => !keep.includes(c)); if (keep.length && drop.length) hide(label, [`Class == ${quoteList(drop)}`, 'Rarity < Unique'], 48) }
  offBuild('Hide off-build weapon types', WEAPON_CLASSES, qf.myWeapons || [])
  offBuild('Hide off-build armour types', ARMOUR_CLASSES, qf.myArmour || [])
  offBuild('Hide off-build jewellery', JEWELLERY_CLASSES, qf.myJewellery || [])
  if (qf.showJewels) showT('Show Jewels', [`Class == ${quoteList(['Jewels'])}`], 'C')
  if (qf.highlightJewellery) highlight('Highlight Rare jewellery', [`Class == ${quoteList(JEWELLERY_CLASSES)}`, 'Rarity >= Rare'])

  // Equipment filtering — always-show overrides first (lower priority), then hides
  if (num(qf.gearMinQuality)) showT(`Always show ${Number(qf.gearMinQuality)}%+ quality gear`, [`Class == ${quoteList(GEAR_CLASSES)}`, `Quality >= ${Number(qf.gearMinQuality)}`], 'C', 18)
  if (num(qf.gearMinSockets)) showT(`Always show ${Number(qf.gearMinSockets)}+ socket gear`, [`Class == ${quoteList(GEAR_CLASSES)}`, `Sockets >= ${Number(qf.gearMinSockets)}`], 'C', 18)
  if (num(qf.alwaysShowRareIlvl)) showT(`Always show Rare bases iLvl ${Number(qf.alwaysShowRareIlvl)}+`, [`Class == ${quoteList(GEAR_CLASSES)}`, 'Rarity Rare', `ItemLevel >= ${Number(qf.alwaysShowRareIlvl)}`], 'C', 18)
  const minR = qf.gearMinRarity || 'all'
  if (minR !== 'all') hide(`Hide equipment below ${minR}`, [`Class == ${quoteList(GEAR_CLASSES)}`, `Rarity < ${minR}`])
  if (num(qf.gearMinItemLevel)) hide(`Hide equipment below item level ${Number(qf.gearMinItemLevel)}`, [`Class == ${quoteList(GEAR_CLASSES)}`, `ItemLevel < ${Number(qf.gearMinItemLevel)}`, 'Rarity < Unique'])

  return out
}

// Tier List moves: itemName → tierId. F (or a tier set to Hide in Cosmetic) = hide; everything
// else = Show with that tier's (cosmetic-adjusted) style.
function tierDescriptors(tierOverrides = {}, cosmetic = {}) {
  const out = []
  const byTier = {}
  for (const [name, tid] of Object.entries(tierOverrides)) (byTier[tid] ||= []).push(name)
  for (const [tid, names] of Object.entries(byTier)) {
    if (!names.length) continue
    const hide = tid === 'F' || (cosmetic.tierStyles?.[tid]?.hide ?? !!(TIER_BY_ID[tid]?.hide))
    if (hide) out.push({ action: 'Hide', comment: `Hidden (tier ${tid}, your settings)`, conditions: [`BaseType == ${quoteList(names)}`], priority: 41 })
    else out.push({ action: 'Show', comment: `Tier ${tid} (your Tier List)`, conditions: [`BaseType == ${quoteList(names)}`], style: tierStyle(tid, cosmetic), priority: 12 })
  }
  return out
}

// Custom Rules page rows. Imported raw rules keep their exact text; structured rows render normally.
function customRuleDescriptors(customRules = [], cosmetic = {}) {
  const out = []
  customRules.filter(r => r && r.enabled !== false).forEach((r, i) => {
    if (r.raw?.trim()) { out.push({ raw: r.raw.trim(), priority: r.action === 'Hide' ? 44 : 24 }); return }
    const action = r.action === 'Hide' ? 'Hide' : 'Show'
    const conditions = matchConditions({
      classes: r.classes, baseType: (r.baseTypes || []).join(', '),
      baseMode: r.baseTypePrefix ? 'contains' : 'exact',
      rarity: r.rarity && r.rarity !== 'Any' ? r.rarity : '', rarityOp: r.rarityOp,
      itemLevel: r.itemLevel, itemLevelOp: r.itemLevelOp,
    })
    if (!conditions.length) return
    out.push({
      action, conditions, comment: r.comment || `Custom Rule ${i + 1}`,
      style: action === 'Show' ? tierStyle(r.dropTier || 'C', cosmetic) : undefined,
      priority: action === 'Show' ? 24 : 44,
    })
  })
  return out
}

// Gather every descriptor, order them (all Shows before all Hides so pinpoints win), render.
export function compileOverrides(settings = {}) {
  const ov = settings.overrides || {}
  const cosmetic = settings.cosmetic || {}
  const descriptors = [
    ...tierDescriptors(settings.tierOverrides, cosmetic),
    ...quickFilterDescriptors(settings.quickFilters, cosmetic),
    ...ruleDescriptors(ov.rules),
    ...customRuleDescriptors(settings.customRules, cosmetic),
  ]
  // User free-text typed for the top of the filter stays functional in the override area.
  const top = settings.freeText?.top?.trim()
  if (top) descriptors.unshift({ raw: top, priority: 5 })
  descriptors.sort((a, b) => (a.priority ?? 30) - (b.priority ?? 30))
  return descriptors.map(d => d.raw ? d.raw : renderBlock(d))
}

// Remove any previously-injected override section (idempotent re-injection).
function stripExistingOverrides(text) {
  const lines = text.split(/\r?\n/)
  const s = lines.findIndex(l => l.includes(START))
  const e = lines.findIndex(l => l.includes(END))
  if (s >= 0 && e >= s) {
    const from = s > 0 && lines[s - 1].trim() === '' ? s - 1 : s
    let to = e
    if (lines[to + 1] !== undefined && lines[to + 1].trim() === '') to += 1
    lines.splice(from, to - from + 1)
  }
  return lines.join('\n')
}

// Splice the override blocks into the base text, immediately before the first real rule.
export function injectOverrides(baseText, blocks = []) {
  const body = stripExistingOverrides(baseText)
  if (!blocks.length) return body
  const lines = body.split(/\r?\n/)
  let idx = lines.findIndex(l => /^(Show|Hide|Minimal)\b/.test(l))
  if (idx < 0) idx = lines.length
  const section = ['', START, '', ...blocks.flatMap(b => [b, '']), END, '']
  return [...lines.slice(0, idx), ...section, ...lines.slice(idx)].join('\n')
}

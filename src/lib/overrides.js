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

// Quick Editor user rules: hide / show / highlight anything.
function ruleDescriptors(rules = []) {
  const out = []
  for (const r of rules) {
    if (!r || r.enabled === false) continue
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

// Convenience toggles → well-known hide rules.
function toggleDescriptors(t = {}) {
  const out = []
  const hide = (comment, conditions, priority = 50) => out.push({ action: 'Hide', comment, conditions, priority })
  if (t.hideNormal) hide('Hide all Normal items', ['Rarity Normal'])
  if (t.hideMagic) hide('Hide all Magic items', ['Rarity Magic'])
  if (num(t.minGoldPile)) hide(`Hide gold piles under ${Number(t.minGoldPile)}`, [`BaseType == ${quote('Gold')}`, `StackSize < ${Number(t.minGoldPile)}`])
  if (num(t.hideRaresBelowIlvl)) hide(`Hide Rares under item level ${Number(t.hideRaresBelowIlvl)}`, ['Rarity Rare', `ItemLevel < ${Number(t.hideRaresBelowIlvl)}`])
  return out
}

const WEAPON_CLASSES = ['Bows', 'Crossbows', 'Quarterstaves', 'Spears', 'Sceptres', 'Wands', 'Staves', 'One Hand Maces', 'Two Hand Maces', 'Foci', 'Quivers']
const ARMOUR_CLASSES = ['Body Armours', 'Helmets', 'Gloves', 'Boots', 'Shields', 'Bucklers']

// Class-aware gear: user picks the weapon / armour types they use; the complementary types get
// hidden (Normal/Magic/Rare only — never Unique). Empty selection = no hiding.
function gearDescriptors(gear = {}) {
  const out = []
  const keepW = gear.weapons || []
  const keepA = gear.armour || []
  if (keepW.length) {
    const drop = WEAPON_CLASSES.filter(c => !keepW.includes(c))
    if (drop.length) out.push({ action: 'Hide', comment: 'Hide off-build weapon types', conditions: [`Class == ${quoteList(drop)}`, 'Rarity < Unique'], priority: 52 })
  }
  if (keepA.length) {
    const drop = ARMOUR_CLASSES.filter(c => !keepA.includes(c))
    if (drop.length) out.push({ action: 'Hide', comment: 'Hide off-build armour types', conditions: [`Class == ${quoteList(drop)}`, 'Rarity < Unique'], priority: 52 })
  }
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
    ...ruleDescriptors(ov.rules),
    ...customRuleDescriptors(settings.customRules, cosmetic),
    ...toggleDescriptors(ov.toggles),
    ...gearDescriptors(ov.gear),
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

// settings object -> .filter text. Produces valid, readable PoE2 filter syntax that
// reflects the user's choices and loads in-game like any standard .filter export.
import { DROP_TIERS, DEFAULT_TIER_CURRENCY } from '../data/dropTiers.js'
import { PRESETS } from '../data/presets.js'
import {
  quote,
  quoteList,
  emitBaseType,
  emitRarity,
  emitClass,
  chunkList,
  RARITY_BELOW_UNIQUE,
  RARITY_NORMAL_MAGIC,
} from './filterSyntax.js'

const TIER_BY_ID = Object.fromEntries(DROP_TIERS.map(t => [t.id, t]))

const banner = (title) => {
  const bar = '#'.repeat(60)
  return [bar, `# ${title}`, bar]
}

// Merge a drop tier's built-in defaults with the user's Cosmetic overrides for that tier.
// Returns a fully-resolved style the generator can emit verbatim.
export function resolveTierStyle(tierId, cosmetic = {}) {
  const def = TIER_BY_ID[tierId] || TIER_BY_ID.E
  const ov = (cosmetic.tierStyles && cosmetic.tierStyles[tierId]) || {}
  // beam/minimap: default is lowercase or null; override is 'None' or a capitalised color
  const defBeam = def.beam ? cap(def.beam) : 'None'
  const beam = ov.beam != null ? ov.beam : defBeam
  const minimap = ov.minimap != null ? ov.minimap : (def.minimap ? cap(def.minimap) : beam)
  return {
    id: tierId,
    hide: ov.hide != null ? !!ov.hide : !!def.hide,
    textColor: def.textColor,
    beam: beam === 'None' ? null : beam,
    minimap: (minimap === 'None' || !minimap) ? null : minimap,
    shape: ov.shape || 'Circle',
    sound: ov.sound || 'None',                 // built-in alert id or 'None'
    customSound: (ov.customSound || '').trim(), // CustomAlertSound filename (wins over sound)
    volume: ov.volume != null ? ov.volume : 200,
    fontSize: Math.min(45, 32 + (tierId === 'S' ? 8 : tierId === 'A' ? 5 : tierId === 'B' ? 2 : 0)),
  }
}

// Emit the style lines (text colour, beam, minimap icon, font size, drop sound) for a tier,
// honouring the user's Cosmetic overrides. PoE2-valid syntax only.
function styleLines(tierId, cosmetic = {}, { fontBoost = 0 } = {}) {
  const st = resolveTierStyle(tierId, cosmetic)
  const out = []
  if (st.textColor) out.push(`\tSetTextColor ${st.textColor.join(' ')} 255`)
  if (st.beam) {
    out.push(`\tPlayEffect ${st.beam}`)
    out.push(`\tMinimapIcon 1 ${st.minimap || st.beam} ${st.shape}`)
  }
  out.push(`\tSetFontSize ${Math.min(45, st.fontSize + fontBoost)}`)
  // Drop sound — custom file wins over a built-in id.
  if (st.customSound) {
    out.push(`\tCustomAlertSound "${st.customSound}" ${clampVol(st.volume)}`)
  } else if (st.sound && st.sound !== 'None') {
    out.push(`\tPlayAlertSound ${st.sound} ${clampVol(st.volume)}`)
  }
  return out
}

const clampVol = (v) => Math.max(0, Math.min(300, Math.round(Number(v) || 0)))

const cap = (s) => s ? s[0].toUpperCase() + s.slice(1) : s

function pushCondLines(lines, cond) {
  if (!cond) return
  for (const part of String(cond).split('\n')) {
    const trimmed = part.trim()
    if (trimmed) lines.push(trimmed.startsWith('\t') ? trimmed : `\t${trimmed}`)
  }
}

function customRuleBlock(rule, idx, cosmetic) {
  const lines = []
  const action = rule.action === 'Hide' ? 'Hide' : 'Show'
  lines.push(`${action} # ${rule.comment || 'Custom Rule ' + (idx + 1)} (custom-rule/custom/${idx + 1})`)

  if (rule.classes?.length) lines.push(`\t${emitClass(rule.classes)[0]}`)

  if (rule.baseTypes?.length) {
    const prefix = !!rule.baseTypePrefix
    if (prefix && rule.baseTypes.length === 1) {
      lines.push(`\t${emitBaseType(rule.baseTypes, { prefix: true })[0]}`)
    } else {
      // One BaseType line with all values — multiple lines would be AND-ed (never matches).
      lines.push(`\t${emitBaseType(rule.baseTypes)[0]}`)
    }
  }

  lines.push(...emitRarity(rule.rarity, rule.rarityOp).map(l => `\t${l}`))

  if (rule.itemLevel) lines.push(`\tItemLevel ${rule.itemLevelOp || '>='} ${rule.itemLevel}`)
  if (action === 'Show') lines.push(...styleLines(rule.dropTier || 'E', cosmetic))
  return lines
}

function emitCustomRule(rule, idx, cosmetic) {
  // Imported rules keep their original text so any standard filter syntax survives round-trips.
  if (rule.raw?.trim()) return rule.raw.trim().split('\n')
  return customRuleBlock(rule, idx, cosmetic)
}

const WEAPON_CLASSES = ['Bows', 'Crossbows', 'Quarterstaves', 'Spears', 'Sceptres', 'Wands', 'Staves', 'One Hand Maces', 'Two Hand Maces', 'Foci', 'Quivers']
const ARMOUR_CLASSES = ['Body Armours', 'Helmets', 'Gloves', 'Boots', 'Shields', 'Bucklers']
const GEAR_CLASSES = [...WEAPON_CLASSES, ...ARMOUR_CLASSES, 'Rings', 'Amulets', 'Belts']

function quickFilterBlocks(qf, cosmetic) {
  const L = []
  const hide = (comment, cond) => { L.push(`Hide # ${comment}`); pushCondLines(L, cond); L.push('') }
  const show = (comment, cond, tier = 'C') => { L.push(`Show # ${comment}`); pushCondLines(L, cond); L.push(...styleLines(tier, cosmetic)); L.push('') }
  const cls = (names) => `Class == ${quoteList(Array.isArray(names) ? names : [names])}`
  const btHas = (names) => `BaseType ${quoteList(Array.isArray(names) ? names : [names])}` // substring/contains match
  const has = (arr, v) => Array.isArray(arr) && arr.includes(v)
  const lvl = (n) => (n ? `ItemLevel >= ${n}` : null)
  const join = (...parts) => parts.filter(Boolean).join('\n')

  // ---- Campaign & Leveling ----
  L.push(...banner('Campaign & Leveling'), '')
  if (has(qf.levelingShow, 'weaponsArmour')) show('Leveling weapons & armour', join(cls([...WEAPON_CLASSES, ...ARMOUR_CLASSES]), 'Rarity <= Rare'), 'D')
  if (has(qf.levelingShow, 'jewellery')) show('Leveling jewellery', join(cls(['Rings', 'Amulets', 'Belts']), 'Rarity <= Rare'), 'D')
  if (has(qf.levelingShow, 'flasks')) show('Leveling flasks', cls(['Life Flasks', 'Mana Flasks']), 'D')
  if (qf.disenchantRares) show('Rares to disenchant / sell (low item level)', join('Rarity Rare', 'ItemLevel < 65'), 'E')

  // ---- Currency ----
  L.push(...banner('Currency'), '')
  if (qf.hideScrolls) hide('Hide Scrolls of Wisdom', `BaseType == ${quote('Scroll of Wisdom')}`)
  if (qf.hideGold) hide('Hide Gold', `BaseType == ${quote('Gold')}`)
  else if (qf.minGoldPile > 0) hide('Hide small gold piles', join(`BaseType == ${quote('Gold')}`, `StackSize < ${qf.minGoldPile}`))
  if (has(qf.currencyShow, 'shards')) show('Show Currency Shards', btHas(['Shard']), 'D')
  if (has(qf.currencyShow, 'runes')) show('Show Runes & Soul Cores', btHas(['Rune', 'Soul Core']), 'C')
  if (has(qf.currencyShow, 'catalysts')) show('Show Catalysts', btHas(['Catalyst']), 'C')
  if (has(qf.currencyShow, 'essences')) show('Show Essences', btHas(['Essence']), 'C')
  if (has(qf.currencyShow, 'omens')) show('Show Omens', btHas(['Omen']), 'C')
  if (qf.showWaystones) show('Show Waystones', join(cls('Waystones'), qf.minWaystoneTier > 1 ? `WaystoneTier >= ${qf.minWaystoneTier}` : null), 'C')

  // ---- Gems ----
  L.push(...banner('Gems'), '')
  if (has(qf.gemsShow, 'uncut')) show('Show Uncut Gems', btHas(['Uncut']), 'C')
  if (has(qf.gemsShow, 'skill')) show('Show Skill Gems', join(cls('Skill Gems'), qf.minGemLevel ? `GemLevel >= ${qf.minGemLevel}` : null), 'C')
  if (has(qf.gemsShow, 'support')) show('Show Support Gems', join(cls('Support Gems'), qf.minGemLevel ? `GemLevel >= ${qf.minGemLevel}` : null), 'C')

  // ---- Flasks & Charms ----
  L.push(...banner('Flasks & Charms'), '')
  const flaskClasses = []
  if (has(qf.flasksShow, 'life')) flaskClasses.push('Life Flasks')
  if (has(qf.flasksShow, 'mana')) flaskClasses.push('Mana Flasks')
  if (flaskClasses.length) show('Show Flasks', join(cls(flaskClasses), qf.qualityFlasksMin ? `Quality >= ${qf.qualityFlasksMin}` : null), 'D')
  if (has(qf.flasksShow, 'charms')) show('Show Charms', join(cls('Charms'), qf.qualityFlasksMin ? `Quality >= ${qf.qualityFlasksMin}` : null), 'D')
  if (qf.hideNonUniqueFlasks) hide('Hide remaining non-Unique Flasks & Charms', join(cls(['Life Flasks', 'Mana Flasks', 'Charms']), RARITY_BELOW_UNIQUE))

  // ---- Uniques & Chance Bases ----
  L.push(...banner('Uniques & Chance Bases'), '')
  if (qf.showUniques) show(qf.hideLowValueUniques ? 'Show high-value Uniques' : 'Show Uniques', 'Rarity Unique', 'B')
  if (qf.showChanceBases) show('Show high-iLvl chance/craft bases', join(cls([...WEAPON_CLASSES, ...ARMOUR_CLASSES, 'Rings', 'Amulets']), 'Rarity <= Magic', 'ItemLevel >= 82'), 'D')

  // ---- Other & Endgame ----
  L.push(...banner('Other & Endgame Items'), '')
  if (has(qf.endgameShow, 'quest')) show('Show Quest Items', cls('Quest Items'), 'C')
  if (has(qf.endgameShow, 'relics')) show('Show Relics', cls('Relics'), 'C')
  if (has(qf.endgameShow, 'trials')) show('Show Trial Items', btHas(['Barya', 'Ultimatum', 'Djinn']), 'C')
  if (has(qf.endgameShow, 'tablets')) show('Show Precursor Tablets', btHas(['Tablet']), 'C')
  if (has(qf.endgameShow, 'fragments')) show('Show Fragments & Splinters', btHas(['Splinter', 'Fragment', 'Crest']), 'C')
  if (has(qf.endgameShow, 'expedition')) show('Show Expedition', btHas(['Logbook', 'Artifact']), 'C')

  // ---- My Equipment (specific class shows — come before the rarity threshold) ----
  L.push(...banner('My Equipment'), '')
  const eq = (label, classes) => { if (classes?.length) show(label, join(cls(classes), lvl(qf.gearMinItemLevel)), 'D') }
  eq('My Weapons', qf.myWeapons)
  eq('My Armour', qf.myArmour)
  eq('My Jewellery', qf.myJewellery)
  if (qf.showJewels) show('Show Jewels', cls('Jewels'), 'C')
  if (qf.highlightJewellery) show('Highlight rare jewellery', join(cls(['Rings', 'Amulets', 'Belts']), 'Rarity >= Rare'), 'B')

  // ---- Equipment Filtering (rarity threshold + always-show quality/sockets) ----
  L.push(...banner('Equipment Filtering'), '')
  // Always-show overrides FIRST (first-match wins, so good gear survives the rarity hide).
  if (qf.gearMinQuality) show(`Always show ${qf.gearMinQuality}%+ quality gear`, join(cls(GEAR_CLASSES), `Quality >= ${qf.gearMinQuality}`), 'C')
  if (qf.gearMinSockets) show(`Always show gear with ${qf.gearMinSockets}+ sockets`, join(cls(GEAR_CLASSES), `Sockets >= ${qf.gearMinSockets}`), 'C')
  if (qf.alwaysShowRareIlvl) show(`Always show rare crafting bases (iLvl ${qf.alwaysShowRareIlvl}+)`, join(cls(GEAR_CLASSES), 'Rarity Rare', `ItemLevel >= ${qf.alwaysShowRareIlvl}`), 'C')
  const minR = qf.gearMinRarity || 'all'
  if (minR === 'all') {
    show('Show all equipment', join(cls(GEAR_CLASSES), lvl(qf.gearMinItemLevel)), 'D')
  } else {
    show(`Show equipment (≥ ${minR})`, join(cls(GEAR_CLASSES), `Rarity >= ${minR}`, lvl(qf.gearMinItemLevel)), 'C')
    hide(`Hide equipment below ${minR}`, join(cls(GEAR_CLASSES), `Rarity < ${minR}`))
  }

  return L
}


export function generateFilter(s, prefs = {}) {
  const lines = []
  const preset = PRESETS.find(p => p.id === s.preset)
  const cosmetic = s.cosmetic || {}

  const bar = '#'.repeat(60)
  const filterVersion = s.version || '0.0.1'
  const gameVersionLabel = prefs.gameVersionLabel || `Path of Exile 2 (${prefs.gameVersion || '0.5.2'})`
  const modes = Object.entries(s.gameMode || {}).filter(([, v]) => v).map(([k]) => k)
  lines.push(bar)
  lines.push(`# Name of the Filter: ${s.name}`)
  lines.push(`# Built with Nolvus's Filter Editor`)
  lines.push(`# Filter version: ${filterVersion}`)
  lines.push(`# Game version: ${gameVersionLabel}`)
  if (prefs.league) lines.push(`# League: ${prefs.league}`)
  if (preset) lines.push(`# Preset: ${preset.name} (${preset.level})`)
  if (s.klass) lines.push(`# Class focus: ${cap(s.klass)}`)
  if (modes.length) lines.push(`# Game mode: ${modes.join(', ')}`)
  lines.push(`# Generated: ${prefs._generatedAt || ''}`.trimEnd())
  lines.push(bar)
  lines.push('')

  if (prefs.topComment?.trim()) {
    prefs.topComment.split('\n').forEach(l => lines.push(`# ${l}`))
    lines.push('')
  }
  if (s.freeText?.top?.trim()) {
    lines.push(...banner('Free-text (top)'), '', s.freeText.top.trim(), '')
  }

  if (s.customRules?.length) {
    lines.push(...banner('Custom Rules'))
    lines.push('')
    s.customRules.filter(r => r.enabled).forEach((r, i) => {
      lines.push(...emitCustomRule(r, i, cosmetic))
      lines.push('')
    })
  }

  lines.push(...quickFilterBlocks(s.quickFilters || {}, cosmetic))

  // Drop Tier Highlights — start from sensible default currency tiers, then apply the user's
  // Tier List moves (tierOverrides: itemName -> tierId). Each item gets exactly its tier's
  // style + sound (first-match, no Continue needed).
  lines.push(...banner('Drop Tier Highlights'))
  lines.push('')
  const byTier = {}
  for (const t of DROP_TIERS) byTier[t.id] = new Set(DEFAULT_TIER_CURRENCY[t.id] || [])
  // user overrides win: pull the item out of every tier, then place it in its chosen one
  for (const [name, tid] of Object.entries(s.tierOverrides || {})) {
    for (const set of Object.values(byTier)) set.delete(name)
    ;(byTier[tid] = byTier[tid] || new Set()).add(name)
  }
  // Specific named-currency blocks for the highlighted tiers (S..D), first-match wins.
  ;['S', 'A', 'B', 'C', 'D'].forEach(id => {
    const items = [...(byTier[id] || [])]
    if (!items.length) return
    const t = TIER_BY_ID[id]
    const st = resolveTierStyle(id, cosmetic)
    for (const chunk of chunkList(items)) {
      if (st.hide) {
        lines.push(`Hide # ${t.name} items (drop-tier/${id})`, `\tBaseType == ${quoteList(chunk)}`, '')
      } else {
        lines.push(`Show # ${t.name} items (drop-tier/${id})`)
        lines.push(`\tBaseType == ${quoteList(chunk)}`)
        lines.push(...styleLines(id, cosmetic), '')
      }
    }
  })
  // Explicitly hidden currency (F-tier).
  const fItems = [...(byTier.F || [])]
  for (const chunk of chunkList(fItems)) {
    lines.push(`Hide # F-Tier items (drop-tier/F)`, `\tBaseType == ${quoteList(chunk)}`, '')
  }
  // E-tier catch-all: every other currency gets the baseline E style/sound.
  const eSt = resolveTierStyle('E', cosmetic)
  if (eSt.hide) {
    lines.push(`Hide # Remaining currency (drop-tier/E)`, `\tClass == ${quoteList(['Currency', 'Stackable Currency'])}`, '')
  } else {
    lines.push(`Show # Remaining currency (drop-tier/E)`)
    lines.push(`\tClass == ${quoteList(['Currency', 'Stackable Currency'])}`)
    lines.push(...styleLines('E', cosmetic), '')
  }

  if (s.freeText?.bottom?.trim()) {
    lines.push(...banner('Free-text (bottom)'), '', s.freeText.bottom.trim(), '')
  }
  if (prefs.bottomComment?.trim()) {
    lines.push('')
    prefs.bottomComment.split('\n').forEach(l => lines.push(`# ${l}`))
  }

  return lines.join('\n').replace(/\n{3,}/g, '\n\n') + '\n'
}
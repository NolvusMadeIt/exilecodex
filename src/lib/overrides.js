// Override engine. User customizations (Quick Editor rules + toggles, class gear, tier moves,
// custom rules) compile to PoE2 Show/Hide blocks emitted at the top of the generated filter.
// Because PoE2 is first-match-wins, anything here wins in-game. This is what makes
// "hide / show / highlight anything" actually work.
import { quote, quoteList } from './filterSyntax.js'
import { DROP_TIERS, DEFAULT_TIER_UNIQUES } from '../data/dropTiers.js'
import { stylePreset } from '../data/styles.js'

const TIER_BY_ID = Object.fromEntries(DROP_TIERS.map(t => [t.id, t]))

const clampVol = (v) => Math.max(0, Math.min(300, Math.round(Number(v) || 0)))
const clampFont = (v) => Math.max(18, Math.min(45, Math.round(Number(v) || 32)))
const num = (v) => v != null && v !== '' && !Number.isNaN(Number(v)) && Number(v) !== 0
const col4 = (c) => Array.isArray(c) ? [c[0], c[1], c[2], c[3] ?? 255].join(' ') : c

// Split a free-text base-type field on commas / newlines into clean names.
export function splitNames(s) {
  return String(s || '').split(/[\n,]/).map(x => x.trim()).filter(Boolean)
}

const RARITY_ORDER = ['Normal', 'Magic', 'Rare', 'Unique']
// Emit rarity conditions in the proven LIST form (e.g. `Rarity Normal Magic Rare`) the core
// filters use — never `Rarity < X`. PoE2 always accepts the list form, so a rarity condition can
// never be the thing that makes the whole filter fail to load. Returns null for an empty range.
function rarityCond(rarity, op) {
  if (!rarity) return null
  const i = RARITY_ORDER.indexOf(rarity)
  if (i < 0) return `Rarity ${rarity}`
  let keep
  if (op === '>=') keep = RARITY_ORDER.slice(i)
  else if (op === '>') keep = RARITY_ORDER.slice(i + 1)
  else if (op === '<=') keep = RARITY_ORDER.slice(0, i + 1)
  else if (op === '<') keep = RARITY_ORDER.slice(0, i)
  else keep = [rarity] // '=' / '==' / unset → exact
  return keep.length ? `Rarity ${keep.join(' ')}` : null
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

// Style for a drop tier (used by the Tier List + the currency tiering in the generator).
// Layering, weakest first: built-in tier defaults ← the filter's STYLE preset (data/styles.js)
// ← the user's global Cosmetic edits ← the user's per-CATEGORY Cosmetic edits. `category` is one
// of 'currency' | 'items' | 'uniques' | 'chance'. The style id rides on cosmetic._styleId
// (attached by compileOverrides / the generator).
export function tierStyle(tierId, cosmetic = {}, category = 'items') {
  const t = TIER_BY_ID[tierId] || TIER_BY_ID.E
  const ov = {
    ...(stylePreset(cosmetic._styleId)[tierId] || {}),
    ...(cosmetic.tierStyles?.[tierId] || {}),
    ...(cosmetic.categoryStyles?.[category]?.[tierId] || {}),
  }
  const cap = (s) => s ? s[0].toUpperCase() + s.slice(1) : s
  const beam = ov.beam != null ? ov.beam : (t.beam ? cap(t.beam) : 'None')
  const st = {
    textColor: ov.textColor || t.textColor,
    fontSize: ov.fontSize || (t.id === 'S' ? 40 : t.id === 'A' ? 38 : t.id === 'B' ? 36 : 34),
  }
  if (ov.borderColor) st.borderColor = ov.borderColor
  if (ov.bgColor) st.bgColor = ov.bgColor
  if (beam && beam !== 'None') { st.beam = beam; st.minimap = beam; st.minimapShape = ov.shape || 'Circle' }
  if (ov.customSound?.trim()) { st.customSound = ov.customSound.trim(); st.volume = ov.volume ?? 200 }
  else if (ov.sound && ov.sound !== 'None') { st.sound = ov.sound; st.volume = ov.volume ?? 200 }
  return st
}

// Whether a tier is hidden for a category (F is always hidden; Cosmetic Hide toggles per layer).
export function tierHidden(tierId, cosmetic = {}, category = 'items') {
  if (tierId === 'F') return true
  return cosmetic.categoryStyles?.[category]?.[tierId]?.hide
    ?? cosmetic.tierStyles?.[tierId]?.hide
    ?? !!TIER_BY_ID[tierId]?.hide
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
const MARTIAL_WEAPONS = ['One Hand Maces', 'Two Hand Maces', 'Spears', 'Quarterstaves', 'Bows', 'Crossbows']
const CASTER_WEAPONS = ['Wands', 'Sceptres', 'Staves', 'Foci']

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
function quickFilterDescriptors(qf = {}, cosmetic = {}, uniqueBases = {}) {
  const out = []
  const has = (arr, v) => Array.isArray(arr) && arr.includes(v)
  const showT = (comment, conditions, tier = 'C', priority = 22, cat = 'items') => out.push({ action: 'Show', comment, conditions, style: tierStyle(tier, cosmetic, cat), priority })
  const highlight = (comment, conditions, priority = 16) => out.push({ action: 'Show', comment, conditions, style: DEFAULT_HIGHLIGHT, priority })
  const hide = (comment, conditions, priority = 46) => out.push({ action: 'Hide', comment, conditions, priority })
  const lvl = (n) => num(n) ? [`GemLevel >= ${Number(n)}`] : []
  // poe2filter's "≥ Tn" market tier → an item-level floor we can actually express in a filter.
  const tierIlvl = (t) => ({ 1: 82, 2: 75, 3: 68, 4: 60, 5: 50 })[Number(t)] ?? 50

  // Currency
  if (has(qf.currencyShow, 'shards')) showT('Show Currency Shards', [`BaseType ${quoteList(['Shard'])}`], 'D', 22, 'currency')
  if (has(qf.currencyShow, 'runes')) showT('Show Runes & Soul Cores', [`BaseType ${quoteList(['Rune', 'Soul Core'])}`], 'C', 22, 'currency')
  if (has(qf.currencyShow, 'catalysts')) showT('Show Catalysts', [`BaseType ${quoteList(['Catalyst'])}`], 'C', 22, 'currency')
  if (has(qf.currencyShow, 'essences')) showT('Show Essences', [`BaseType ${quoteList(['Essence'])}`], 'C', 22, 'currency')
  if (has(qf.currencyShow, 'omens')) showT('Show Omens', [`BaseType ${quoteList(['Omen'])}`], 'C', 22, 'currency')
  if (qf.hideScrolls) hide('Hide Scrolls of Wisdom', [`BaseType == ${quote('Scroll of Wisdom')}`])
  if (qf.hideGold) hide('Hide Gold', [`BaseType == ${quote('Gold')}`])
  else if (num(qf.minGoldPile)) hide(`Hide small gold piles (< ${Number(qf.minGoldPile)})`, [`BaseType == ${quote('Gold')}`, `StackSize < ${Number(qf.minGoldPile)}`])
  if (qf.showWaystones) showT('Show Waystones', [`Class == ${quoteList(['Waystones'])}`, ...(Number(qf.minWaystoneTier) > 1 ? [`WaystoneTier >= ${Number(qf.minWaystoneTier)}`] : [])], 'C')
  if (qf.highlightRareWaystones) highlight('Highlight Rare Waystones', [`Class == ${quoteList(['Waystones'])}`, 'Rarity Rare Unique'])

  // Gems
  if (has(qf.gemsShow, 'uncut')) showT('Show Uncut Gems', [`BaseType ${quoteList(['Uncut'])}`], 'C')
  if (has(qf.gemsShow, 'skill')) showT('Show Skill Gems', [`Class == ${quoteList(['Skill Gems'])}`, ...lvl(qf.minGemLevel)], 'C')
  if (has(qf.gemsShow, 'support')) showT('Show Support Gems', [`Class == ${quoteList(['Support Gems'])}`, ...lvl(qf.minGemLevel)], 'C')

  // Flasks & charms
  const flaskClasses = [has(qf.flasksShow, 'life') && 'Life Flasks', has(qf.flasksShow, 'mana') && 'Mana Flasks', has(qf.flasksShow, 'charms') && 'Charms'].filter(Boolean)
  if (flaskClasses.length) showT('Show Flasks & Charms', [`Class == ${quoteList(flaskClasses)}`, ...(num(qf.qualityFlasksMin) ? [`Quality >= ${Number(qf.qualityFlasksMin)}`] : [])], 'D')
  if (qf.hideNonUniqueFlasks) hide('Hide non-Unique Flasks & Charms', [`Class == ${quoteList(['Life Flasks', 'Mana Flasks', 'Charms'])}`, 'Rarity Normal Magic Rare'])

  // Uniques & chance
  if (qf.showUniques) highlight('Highlight Uniques', ['Rarity Unique'])
  if (qf.showChanceBases) showT('Show chance/craft bases', [`Class == ${quoteList([...WEAPON_CLASSES, ...ARMOUR_CLASSES, 'Rings', 'Amulets'])}`, 'Rarity Normal Magic', 'ItemLevel >= 82'], 'C', 18, 'chance')

  // Endgame / other
  if (has(qf.endgameShow, 'quest')) showT('Show Quest Items', [`Class == ${quoteList(['Quest Items'])}`], 'C')
  if (has(qf.endgameShow, 'relics')) showT('Show Relics', [`Class == ${quoteList(['Relics'])}`], 'C')
  if (has(qf.endgameShow, 'trials')) showT('Show Trial Items', [`BaseType ${quoteList(['Barya', 'Ultimatum', 'Djinn'])}`], 'C')
  if (has(qf.endgameShow, 'tablets')) showT('Show Precursor Tablets', [`BaseType ${quoteList(['Tablet'])}`], 'C')
  if (has(qf.endgameShow, 'fragments')) showT('Show Fragments & Splinters', [`BaseType ${quoteList(['Splinter', 'Fragment', 'Crest'])}`], 'C')
  if (has(qf.endgameShow, 'expedition')) showT('Show Expedition', [`BaseType ${quoteList(['Logbook', 'Artifact'])}`], 'C')

  // Leveling — optionally only while you're below a given area level (keeps maps clean later)
  const areaCap = num(qf.levelingMaxAreaLevel) ? [`AreaLevel <= ${Number(qf.levelingMaxAreaLevel)}`] : []
  if (has(qf.levelingShow, 'weaponsArmour')) showT('Leveling weapons & armour', [`Class == ${quoteList([...WEAPON_CLASSES, ...ARMOUR_CLASSES])}`, 'Rarity Normal Magic Rare', ...areaCap], 'D')
  if (has(qf.levelingShow, 'jewellery')) showT('Leveling jewellery', [`Class == ${quoteList(JEWELLERY_CLASSES)}`, 'Rarity Normal Magic Rare', ...areaCap], 'D')
  if (has(qf.levelingShow, 'flasks')) showT('Leveling flasks', [`Class == ${quoteList(['Life Flasks', 'Mana Flasks'])}`, ...areaCap], 'D')
  if (qf.disenchantRares) showT('Low rares to salvage', ['Rarity Rare', 'ItemLevel < 65'], 'E')

  // ---- Campaign clone: Auto-Scaling Leveling Items ----
  const lvlArea = [...(num(qf.lvlGearAreaMin) ? [`AreaLevel >= ${Number(qf.lvlGearAreaMin)}`] : []), ...(num(qf.lvlGearAreaMax) ? [`AreaLevel <= ${Number(qf.lvlGearAreaMax)}`] : [])]
  if (qf.lvlGear) showT('Leveling gear', [`Class == ${quoteList([...WEAPON_CLASSES, ...ARMOUR_CLASSES])}`, 'Rarity Normal Magic Rare', ...lvlArea], 'D')
  if (qf.lvlWeapons) showT('Leveling weapons', [`Class == ${quoteList(qf.lvlWeaponTypes?.length ? qf.lvlWeaponTypes : WEAPON_CLASSES)}`, 'Rarity Normal Magic Rare'], 'D')
  if (qf.lvlArmour) showT('Leveling armour', [`Class == ${quoteList(qf.lvlArmourTypes?.length ? qf.lvlArmourTypes : ARMOUR_CLASSES)}`, 'Rarity Normal Magic Rare'], 'D')
  if (qf.lvlFlasks) showT('Leveling flasks', [`Class == ${quoteList(['Life Flasks', 'Mana Flasks'])}`], 'D')
  if (qf.lvlGold) showT('Leveling gold', [`BaseType == ${quote('Gold')}`], 'E')
  if (qf.lvlVerisium) showT('Leveling Verisium', [`BaseType == ${quote('Verisium')}`], 'D')

  // ---- Campaign clone: Disenchanting / Selling / Salvaging ----
  if (qf.disRares) {
    // The "≤ rarity" select caps the window's top; the Magic toggle widens it downward. Defaults
    // (≤ Rare, Magic off) emit the classic `Rarity Rare`.
    const top = ['Normal', 'Magic', 'Rare'].includes(qf.disRaresMaxRarity) ? qf.disRaresMaxRarity : 'Rare'
    const floor = qf.disRaresMagic && RARITY_ORDER.indexOf('Magic') <= RARITY_ORDER.indexOf(top) ? 'Magic' : top
    const keep = RARITY_ORDER.slice(RARITY_ORDER.indexOf(floor), RARITY_ORDER.indexOf(top) + 1)
    const size = []
    if (qf.disRaresMaxSize) { const [w, h] = String(qf.disRaresMaxSize).split('x').map(Number); if (w) size.push(`Width <= ${w}`); if (h) size.push(`Height <= ${h}`) }
    showT('Rares to disenchant/salvage', [`Class == ${quoteList(GEAR_CLASSES)}`, `Rarity ${(keep.length ? keep : [top]).join(' ')}`, ...size], 'E')
  }
  if (qf.socketedGear && num(qf.socketedGearMin)) showT(`Socketed gear (${Number(qf.socketedGearMin)}+)`, [`Class == ${quoteList(GEAR_CLASSES)}`, `Sockets >= ${Number(qf.socketedGearMin)}`], 'C', 18)
  const upTo = (val) => (val && val !== 'all') ? rarityCond(val, '<=') : null
  const qualityGear = (on, min, rarity, classes, label) => { if (on && num(min)) { const conds = [`Class == ${quoteList(classes)}`, `Quality >= ${Number(min)}`]; const rc = upTo(rarity); if (rc) conds.push(rc); showT(label, conds, 'C', 18) } }
  qualityGear(qf.qMartial, qf.qMartialMin, qf.qMartialRarity, MARTIAL_WEAPONS, 'Quality martial weapons')
  qualityGear(qf.qCaster, qf.qCasterMin, qf.qCasterRarity, CASTER_WEAPONS, 'Quality caster weapons')
  qualityGear(qf.qArmour, qf.qArmourMin, qf.qArmourRarity, ARMOUR_CLASSES, 'Quality shields & armour')

  // My equipment (class-aware): keep the selected types, hide the rest (below Unique)
  const offBuild = (label, all, keep) => { const drop = all.filter(c => !keep.includes(c)); if (keep.length && drop.length) hide(label, [`Class == ${quoteList(drop)}`, 'Rarity Normal Magic Rare'], 48) }
  offBuild('Hide off-build weapon types', WEAPON_CLASSES, qf.myWeapons || [])
  offBuild('Hide off-build armour types', ARMOUR_CLASSES, qf.myArmour || [])
  offBuild('Hide off-build jewellery', JEWELLERY_CLASSES, qf.myJewellery || [])
  // My Jewels — keep the chosen jewel base types (Show runs first), hide the rest below Unique.
  if (qf.myJewels?.length) {
    showT('My jewels', [`BaseType == ${quoteList(qf.myJewels)}`, 'Rarity Normal Magic Rare'], 'C', 20)
    hide('Hide off-build jewels', [`Class == ${quoteList(['Jewels'])}`, 'Rarity Normal Magic Rare'], 48)
  }
  if (qf.showJewels) showT('Show Jewels', [`Class == ${quoteList(['Jewels'])}`], 'C')
  if (qf.highlightJewellery) highlight('Highlight Rare jewellery', [`Class == ${quoteList(JEWELLERY_CLASSES)}`, 'Rarity Rare Unique'])

  // Equipment filtering — always-show overrides first (lower priority), then hides
  if (num(qf.gearMinQuality)) showT(`Always show ${Number(qf.gearMinQuality)}%+ quality gear`, [`Class == ${quoteList(GEAR_CLASSES)}`, `Quality >= ${Number(qf.gearMinQuality)}`], 'C', 18)
  if (num(qf.gearMinSockets)) showT(`Always show ${Number(qf.gearMinSockets)}+ socket gear`, [`Class == ${quoteList(GEAR_CLASSES)}`, `Sockets >= ${Number(qf.gearMinSockets)}`], 'C', 18)
  if (num(qf.alwaysShowRareIlvl)) showT(`Always show Rare bases iLvl ${Number(qf.alwaysShowRareIlvl)}+`, [`Class == ${quoteList(GEAR_CLASSES)}`, 'Rarity Rare', `ItemLevel >= ${Number(qf.alwaysShowRareIlvl)}`], 'C', 18)
  const minR = qf.gearMinRarity || 'all'
  // Explicitly SHOW the gear you keep, so it survives a catch-all hide (the poe2filter.com model).
  const gearShow = [`Class == ${quoteList(GEAR_CLASSES)}`]
  if (minR !== 'all') gearShow.push(rarityCond(minR, '>='))
  if (num(qf.gearMinItemLevel)) gearShow.push(`ItemLevel >= ${Number(qf.gearMinItemLevel)}`)
  if (minR !== 'all' || num(qf.gearMinItemLevel) || qf.catchAll === 'hide') showT('Show equipment you keep', gearShow, 'D', 26)
  if (minR !== 'all') hide(`Hide equipment below ${minR}`, [`Class == ${quoteList(GEAR_CLASSES)}`, rarityCond(minR, '<')])
  if (num(qf.gearMinItemLevel)) hide(`Hide equipment below item level ${Number(qf.gearMinItemLevel)}`, [`Class == ${quoteList(GEAR_CLASSES)}`, `ItemLevel < ${Number(qf.gearMinItemLevel)}`, 'Rarity Normal Magic Rare'])

  // ===== Other Equipment: Unidentified =====
  const GEAR_WA = [...WEAPON_CLASSES, ...ARMOUR_CLASSES]
  if (qf.unidRareGear) showT(`Unidentified Rare gear (≥ T${Number(qf.unidRareGearTier) || 3})`, [`Class == ${quoteList(GEAR_WA)}`, 'Rarity Rare', 'Identified False', `ItemLevel >= ${tierIlvl(qf.unidRareGearTier)}`], 'C', 20)
  if (qf.unidMagicGear) showT(`Unidentified Magic gear (≥ T${Number(qf.unidMagicGearTier) || 4})`, [`Class == ${quoteList(GEAR_WA)}`, 'Rarity Magic', 'Identified False', `ItemLevel >= ${tierIlvl(qf.unidMagicGearTier)}`], 'D', 22)
  if (qf.unidRareJewellery) showT(`Unidentified Rare jewellery (≥ T${Number(qf.unidRareJewelleryTier) || 3})`, [`Class == ${quoteList(JEWELLERY_CLASSES)}`, 'Rarity Rare', 'Identified False', `ItemLevel >= ${tierIlvl(qf.unidRareJewelleryTier)}`], 'C', 20)
  if (qf.unidMagicJewellery) showT(`Unidentified Magic jewellery (≥ T${Number(qf.unidMagicJewelleryTier) || 3})`, [`Class == ${quoteList(JEWELLERY_CLASSES)}`, 'Rarity Magic', 'Identified False', `ItemLevel >= ${tierIlvl(qf.unidMagicJewelleryTier)}`], 'D', 22)

  // ===== Other Equipment: Identified categories =====
  if (qf.idShowAll) showT('Show all identified items', [`Class == ${quoteList(GEAR_CLASSES)}`, 'Identified True'], 'D', 23)
  if (qf.idGear) showT('Identified gear', [`Class == ${quoteList(GEAR_WA)}`, 'Identified True'], 'D', 23)
  if (qf.idJewellery) showT('Identified jewellery', [`Class == ${quoteList(JEWELLERY_CLASSES)}`, 'Identified True'], 'D', 23)
  if (qf.idJewels) showT('Identified jewels', [`Class == ${quoteList(['Jewels'])}`, 'Identified True'], 'D', 23)
  const myGearClasses = [...(qf.myWeapons || []), ...(qf.myArmour || []), ...(qf.myJewellery || [])]
  if (qf.idCustom && myGearClasses.length) showT('Identified items on my classes', [`Class == ${quoteList(myGearClasses)}`, 'Identified True'], 'C', 19)
  if (qf.idHideRest) hide('Hide other identified equipment', [`Class == ${quoteList(GEAR_CLASSES)}`, 'Rarity Normal Magic Rare', 'Identified True', ...(qf.idHideRestCorrupted ? [] : ['Corrupted False'])], 47)
  // Identified Item Configurations (item level as the value proxy for "Excellent / Good").
  if (qf.idExcellent) highlight('Excellent identified items', [`Class == ${quoteList(GEAR_WA)}`, 'Rarity Rare', 'Identified True', 'ItemLevel >= 82'], 15)
  if (qf.idGood) showT('Good identified items', [`Class == ${quoteList(GEAR_WA)}`, 'Rarity Rare', 'Identified True', 'ItemLevel >= 75'], 'C', 21)

  // ===== Other Equipment: Crafting Bases (white/quality bases worth keeping) =====
  if (qf.showCraftingBases) showT('Highlight crafting bases', [`Class == ${quoteList(GEAR_WA)}`, 'Rarity Normal', `ItemLevel >= ${num(qf.craftingBaseIlvl) ? Number(qf.craftingBaseIlvl) : 82}`], 'B', 18)
  if (qf.craftQualityGear && num(qf.craftQualityMin)) showT('Excellent quality gear', [`Class == ${quoteList(GEAR_WA)}`, 'Rarity Normal Magic', `Quality >= ${Number(qf.craftQualityMin)}`], 'C', 18)
  if (qf.craftSocketGear && num(qf.craftSocketMin)) showT('Excellent socketed gear', [`Class == ${quoteList(GEAR_WA)}`, 'Rarity Normal', `Sockets >= ${Number(qf.craftSocketMin)}`], 'C', 18)
  if (qf.craftJewellery) showT('Excellent jewellery bases', [`Class == ${quoteList(JEWELLERY_CLASSES)}`, 'Rarity Normal Magic', `ItemLevel >= ${num(qf.craftJewelleryIlvl) ? Number(qf.craftJewelleryIlvl) : 82}`], 'C', 18)

  // ===== Other Equipment: Special Equipment (high-end rare bases & jewellery) =====
  if (qf.specialGear) highlight('Special gear (top-tier rare bases)', [`Class == ${quoteList(GEAR_WA)}`, 'Rarity Rare', 'ItemLevel >= 82'], 16)
  if (qf.doubleAnointAmulets) highlight('Double-anointed amulets', [`Class == ${quoteList(['Amulets'])}`, 'Rarity Rare', 'ItemLevel >= 75'], 16)
  if (qf.specialJewellery) highlight('Excellent special jewellery', [`Class == ${quoteList(JEWELLERY_CLASSES)}`, 'Rarity Rare', `ItemLevel >= ${num(qf.specialJewelleryIlvl) ? Number(qf.specialJewelleryIlvl) : 82}`], 16)
  if (qf.specialJewelleryRemaining) showT('Remaining special jewellery', [`Class == ${quoteList(JEWELLERY_CLASSES)}`, 'Rarity Rare'], 'E', 25)

  // Per-slot cleanup — hide low-rarity jewellery / jewels per slot.
  const hideBelow = (label, classes, val) => { if (val && val !== 'all') { const rc = rarityCond(val, '<'); if (rc) hide(label, [`Class == ${quoteList(classes)}`, rc]) } }
  hideBelow('Hide low-rarity Rings', ['Rings'], qf.hideRingsBelow)
  hideBelow('Hide low-rarity Amulets', ['Amulets'], qf.hideAmuletsBelow)
  hideBelow('Hide low-rarity Belts', ['Belts'], qf.hideBeltsBelow)
  hideBelow('Hide low-rarity Jewels', ['Jewels'], qf.hideJewelsBelow)

  // ===== Flasks & Charms (cloned groups) =====
  if (qf.charmsHighIlvl) showT('High iLvl normal charms', [`Class == ${quoteList(['Charms'])}`, 'Rarity Normal', 'ItemLevel >= 80'], 'D')
  if (qf.qCharms && num(qf.qCharmsMin)) showT('Quality charms', [`Class == ${quoteList(['Charms'])}`, `Quality >= ${Number(qf.qCharmsMin)}`], 'C', 18)
  if (qf.qFlasks && num(qf.qFlasksMin)) showT('Quality flasks', [`Class == ${quoteList(['Life Flasks', 'Mana Flasks'])}`, `Quality >= ${Number(qf.qFlasksMin)}`], 'C', 18)
  if (qf.hideLifeFlasks) hide('Hide non-unique Life Flasks', [`Class == ${quoteList(['Life Flasks'])}`, 'Rarity Normal Magic Rare'])
  if (qf.hideManaFlasks) hide('Hide non-unique Mana Flasks', [`Class == ${quoteList(['Mana Flasks'])}`, 'Rarity Normal Magic Rare'])
  if (qf.hideCharms) hide('Hide non-unique Charms', [`Class == ${quoteList(['Charms'])}`, 'Rarity Normal Magic Rare'])

  // ===== Currency: hide groups =====
  const curHide = (v) => has(qf.currencyHide, v)
  if (curHide('shards')) hide('Hide Currency Shards', [`BaseType ${quoteList(['Shard'])}`])
  if (curHide('runes')) hide('Hide Runes & Soul Cores', [`BaseType ${quoteList(['Rune', 'Soul Core'])}`])
  if (curHide('catalysts')) hide('Hide Catalysts', [`BaseType ${quoteList(['Catalyst'])}`])
  if (curHide('essences')) hide('Hide Essences', [`BaseType ${quoteList(['Essence'])}`])
  if (curHide('omens')) hide('Hide Omens', [`BaseType ${quoteList(['Omen'])}`])
  if (qf.hideVerisium) hide('Hide Verisium', num(qf.minVerisium) ? [`BaseType == ${quote('Verisium')}`, `StackSize < ${Number(qf.minVerisium)}`] : [`BaseType == ${quote('Verisium')}`])
  if (qf.hideRegularRunes) hide('Hide regular runes', [`BaseType ${quoteList(['Rune'])}`, 'Rarity Normal'])
  if (qf.hideUncutGems && num(qf.hideUncutBelow)) hide('Hide low uncut gems', [`BaseType ${quoteList(['Uncut'])}`, `ItemLevel < ${Number(qf.hideUncutBelow)}`])

  // ===== Currency: My Flasks & Charms + Economy =====
  if (qf.myFlasks?.length) showT('My flasks & charms', [`Class == ${quoteList(qf.myFlasks)}`], 'D')
  if (qf.econTieringMode === 'strict') hide('Currency tiering: hide low-tier shards', [`BaseType == ${quoteList(['Transmutation Shard', 'Regal Shard', 'Scroll of Wisdom'])}`])
  else if (qf.econTieringMode === 'off') hide('Currency tiering off: hide low-value currency', [`BaseType == ${quoteList(['Transmutation Shard', 'Regal Shard', 'Scroll of Wisdom', 'Orb of Transmutation', 'Orb of Augmentation'])}`])
  if (qf.econBigStacks) highlight('Highlight large currency stacks', [`Class == ${quoteList(['Stackable Currency', 'Currency'])}`, `StackSize >= ${num(qf.econBigStackSize) ? Number(qf.econBigStackSize) : 10}`], 14)

  // ===== Uniques & Chance Bases (cloned groups) =====
  // Value-tier highlights — resolve the curated unique NAMES to their base types (PoE2 can't match a
  // unique by name), then highlight by base type + Rarity Unique. Disabled when Tiering Mode = Off.
  const uniqTier = (names, comment, tier, priority) => {
    const bases = [...new Set((names || []).map(n => uniqueBases[n]).filter(Boolean))]
    if (bases.length) out.push({ action: 'Show', comment, conditions: [`BaseType == ${quoteList(bases)}`, 'Rarity Unique'], style: tierStyle(tier, cosmetic, 'uniques'), priority })
  }
  if (qf.uTieringMode !== 'off') {
    if (qf.uExcellent) uniqTier(DEFAULT_TIER_UNIQUES.S, 'Excellent (S-tier) uniques', 'S', 10)
    if (qf.uGood) uniqTier(DEFAULT_TIER_UNIQUES.A, 'Good (A-tier) uniques', 'A', 11)
    if (qf.uPotential) uniqTier(DEFAULT_TIER_UNIQUES.B, 'Potential (B-tier) uniques', 'B', 12)
  }
  // Hide the curated LOW-value uniques at strict levels (their bases + Rarity Unique) — the
  // valuable tiers above have already matched by the time this hide runs.
  if (qf.hideLowValueUniques) {
    const lowBases = [...new Set((DEFAULT_TIER_UNIQUES.C || []).map(n => uniqueBases[n]).filter(Boolean))]
    if (lowBases.length) hide('Hide low-value uniques', [`BaseType == ${quoteList(lowBases)}`, 'Rarity Unique'], 49)
  }
  if (qf.uDropRestricted) showT('Show every remaining unique (drop-restricted safety)', ['Rarity Unique'], 'D', 27, 'uniques')
  if (qf.uClassSpecific?.length) highlight('Class-specific uniques', [`Class == ${quoteList(qf.uClassSpecific)}`, 'Rarity Unique'], 15)
  if (qf.exceptionalUniques && num(qf.exceptionalUniquesMin)) highlight('Exceptional uniques', ['Rarity Unique', `Quality >= ${Number(qf.exceptionalUniquesMin)}`])
  if (qf.vaalModUniques) highlight('Vaal mod (corrupted) uniques', ['Rarity Unique', 'Corrupted True'])
  if (qf.vaalUniques) highlight('Vaal base uniques', [`BaseType ${quoteList(['Vaal'])}`, 'Rarity Unique'])
  if (qf.smallDisenchantUniques && qf.smallDisenchantMaxSize) { const [w, h] = String(qf.smallDisenchantMaxSize).split('x').map(Number); const s = []; if (w) s.push(`Width <= ${w}`); if (h) s.push(`Height <= ${h}`); showT('Small uniques to disenchant', ['Rarity Unique', ...s], 'D', 26, 'uniques') }
  if (qf.uOther) showT('Other uniques', ['Rarity Unique'], 'E', 28, 'uniques')
  if (qf.hideAllUniques) hide('Hide remaining uniques', ['Rarity Unique'], 50)
  // Chance bases — high-iLvl white bases worth an Orb of Chance.
  const CHANCE_CLASSES = ['Body Armours', 'Helmets', 'Gloves', 'Boots', 'Sceptres', 'Foci', 'Amulets', 'Rings']
  if (qf.chanceWanted) highlight('Wanted chance bases', [`Class == ${quoteList(CHANCE_CLASSES)}`, 'Rarity Normal', 'ItemLevel >= 82'], 17)
  if (qf.chancePotential) showT('Potential chance bases', [`Class == ${quoteList(CHANCE_CLASSES)}`, 'Rarity Normal', 'ItemLevel >= 75'], 'D', 25, 'chance')

  // ===== Other Items (cloned toggles) =====
  if (qf.showQuest) showT('Quest items', [`Class == ${quoteList(['Quest Items'])}`], 'C')
  if (qf.showRelics) showT('Relics', [`Class == ${quoteList(['Relics'])}`], 'C')
  if (qf.showRelics && qf.relicsHideOther) hide('Hide basic (Normal) relics', [`Class == ${quoteList(['Relics'])}`, 'Rarity Normal'])
  if (qf.showTrials) showT('Trial keys', [`BaseType ${quoteList(['Barya', 'Ultimatum', 'Djinn'])}`], 'C')
  if (qf.showTablets) showT('Precursor tablets', [`BaseType ${quoteList(['Tablet'])}`], 'C')
  if (qf.showFragments) showT('Fragments & splinters', [`BaseType ${quoteList(['Splinter', 'Fragment', 'Crest'])}`], 'C')
  if (qf.showExpedition) showT('Expedition', [`BaseType ${quoteList(['Logbook', 'Artifact'])}`], 'C')

  // ===== Remaining equipment =====
  if (qf.hideAllRemainingGear) hide('Hide remaining non-unique gear', [`Class == ${quoteList(GEAR_CLASSES)}`, 'Rarity Normal Magic Rare'], 49)

  return out
}

// Tier List moves: itemName → tierId. F (or a tier set to Hide in Cosmetic) = hide; everything
// else = Show with that tier's (cosmetic-adjusted) style. Uniques can't be matched by name in PoE2
// — `uniqueBases` (name → base type) lets us emit their BASE TYPE + `Rarity Unique` instead, so the
// game accepts the rule. Plain names (currency / real base types) stay exact BaseType matches.
function tierDescriptors(tierOverrides = {}, cosmetic = {}, uniqueBases = {}, baseNames = null) {
  const out = []
  const byTier = {}
  for (const [name, tid] of Object.entries(tierOverrides)) (byTier[tid] ||= []).push(name)
  for (const [tid, names] of Object.entries(byTier)) {
    if (!names.length) continue
    const uniqueBaseList = [...new Set(names.map(n => uniqueBases[n]).filter(Boolean))]
    // `plain` = names safe to emit as a raw `BaseType ==`: confirmed base types only. When baseNames
    // is available, any name that's neither a resolvable unique nor a known base type (e.g. a unique
    // we couldn't resolve, or a typo) is DROPPED — emitting it would make PoE2 reject the whole
    // filter ("No base types found exactly matching …").
    const plain = names.filter(n => !uniqueBases[n] && (baseNames ? baseNames.has(n) : true))
    const add = (conditions, label, cat) => {
      if (tierHidden(tid, cosmetic, cat)) out.push({ action: 'Hide', comment: `Hidden — ${label}`, conditions, priority: 41 })
      else out.push({ action: 'Show', comment: label, conditions, style: tierStyle(tid, cosmetic, cat), priority: 12 })
    }
    if (plain.length) add([`BaseType == ${quoteList(plain)}`], `Tier ${tid} (your Tier List)`, 'currency')
    if (uniqueBaseList.length) add([`BaseType == ${quoteList(uniqueBaseList)}`, 'Rarity Unique'], `Tier ${tid} uniques (your Tier List)`, 'uniques')
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
      style: action === 'Show' ? tierStyle(r.dropTier || 'C', cosmetic, 'items') : undefined,
      priority: action === 'Show' ? 24 : 44,
    })
  })
  return out
}

// Gather every descriptor, order them (all Shows before all Hides so pinpoints win), render.
export function compileOverrides(settings = {}, uniqueBases = {}, baseNames = null) {
  const ov = settings.overrides || {}
  // Ride the filter's style id on the cosmetic object so tierStyle can layer the style preset.
  const cosmetic = { ...(settings.cosmetic || {}), _styleId: settings.style }
  const descriptors = [
    ...tierDescriptors(settings.tierOverrides, cosmetic, uniqueBases, baseNames),
    ...quickFilterDescriptors(settings.quickFilters, cosmetic, uniqueBases),
    ...ruleDescriptors(ov.rules),
    ...customRuleDescriptors(settings.customRules, cosmetic),
  ]
  // User free-text typed for the top of the filter stays functional in the override area.
  const top = settings.freeText?.top?.trim()
  if (top) descriptors.unshift({ raw: top, priority: 5 })
  descriptors.sort((a, b) => (a.priority ?? 30) - (b.priority ?? 30))
  return descriptors.map(d => d.raw ? d.raw : renderBlock(d))
}


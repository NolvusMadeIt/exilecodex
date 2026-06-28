import { test, expect, vi } from 'vitest'
import { compileOverrides, injectOverrides, matchConditions } from './overrides.js'
import { buildFilter } from './buildFilter.js'
import { defaultSettings, emptyOverrideRule } from '../store/defaultSettings.js'

// A minimal stand-in for a real core file: a header, the override anchor, and one base rule.
const FAKE_BASE = [
  '#====',
  '# Nolvus Loot Filter - for Path of Exile 2',
  '#====',
  "# Built with Nolvus's Filter Editor.",
  '#====',
  '# [WELCOME] TABLE OF CONTENTS',
  '#====',
  '# [[0100]] Gold',
  'Show # base gold rule',
  '\tBaseType == "Gold"',
  '\tSetFontSize 30',
  '',
].join('\n')

test('matchConditions emits valid PoE2 conditions for set fields only', () => {
  const c = matchConditions({ classes: ['Wands'], baseType: 'Sapphire', baseMode: 'contains', rarity: 'Magic', rarityOp: '<=', itemLevel: '65', itemLevelOp: '<' })
  expect(c).toContain('Class == "Wands"')
  expect(c).toContain('BaseType "Sapphire"')
  expect(c).toContain('Rarity Normal Magic') // list form (proven syntax), not `Rarity <= Magic`
  expect(c).toContain('ItemLevel < 65')
})

test('a hide rule compiles to a Hide block; a show rule to a styled Show', () => {
  const hide = { ...emptyOverrideRule(1), action: 'Hide', label: 'no wands', match: { classes: ['Wands'] } }
  const show = { ...emptyOverrideRule(2), action: 'Show', label: 'pinpoint mirrors', match: { baseType: 'Mirror', baseMode: 'exact' }, style: { borderColor: [255, 0, 0, 255], beam: 'Red' } }
  const blocks = compileOverrides({ overrides: { rules: [hide, show] } })
  const text = blocks.join('\n\n')
  expect(text).toContain('Hide # no wands')
  expect(text).toContain('Class == "Wands"')
  expect(text).toContain('Show # pinpoint mirrors')
  expect(text).toContain('BaseType == "Mirror"')
  expect(text).toContain('SetBorderColor 255 0 0 255')
  expect(text).toContain('PlayEffect Red')
})

test('show/highlight rules are ordered before hide rules so pinpoints win', () => {
  const hide = { ...emptyOverrideRule(1), action: 'Hide', label: 'hide rares', match: { rarity: 'Rare', rarityOp: '=' } }
  const show = { ...emptyOverrideRule(2), action: 'Show', label: 'keep this base', match: { baseType: 'Stellar', baseMode: 'contains' } }
  const blocks = compileOverrides({ overrides: { rules: [hide, show] } })
  const joined = blocks.join('\n')
  expect(joined.indexOf('keep this base')).toBeLessThan(joined.indexOf('hide rares'))
})

test('quick filters compile to real override blocks', () => {
  const blocks = compileOverrides({ quickFilters: {
    minGoldPile: 100, gearMinRarity: 'Rare', myWeapons: ['Wands'], hideScrolls: true,
  } })
  const text = blocks.join('\n\n')
  expect(text).toContain('StackSize < 100')
  expect(text).toContain('Hide equipment below Rare')
  expect(text).toContain('Hide off-build weapon types')
  expect(text).toMatch(/Class == "Bows"/)
  // the kept weapon type (Wands) is NOT in the off-build hide list
  expect(text).not.toMatch(/off-build weapon types[\s\S]*?"Wands"/)
})

test('new quick filters compile: area-capped leveling, rare waystones, crafting bases, per-slot cleanup', () => {
  const blocks = compileOverrides({ quickFilters: {
    levelingShow: ['weaponsArmour'], levelingMaxAreaLevel: 65,
    highlightRareWaystones: true,
    showCraftingBases: true, craftingBaseIlvl: 82,
    hideRingsBelow: 'Rare', hideJewelsBelow: 'Magic',
  } })
  const text = blocks.join('\n\n')
  // leveling shows only stop forcing once you pass the area level
  expect(text).toMatch(/Leveling weapons & armour[\s\S]*?AreaLevel <= 65/)
  // rare waystones get a highlight
  expect(text).toMatch(/Highlight Rare Waystones[\s\S]*?Rarity Rare Unique/)
  // crafting bases: high-iLvl white gear
  expect(text).toMatch(/Highlight crafting bases[\s\S]*?Rarity Normal[\s\S]*?ItemLevel >= 82/)
  // per-slot cleanup hides below the chosen floor (list form), and only the chosen slots
  expect(text).toMatch(/Hide low-rarity Rings[\s\S]*?Rarity Normal Magic/)
  expect(text).toMatch(/Hide low-rarity Jewels[\s\S]*?Rarity Normal\b/)
  expect(text).not.toContain('Hide low-rarity Amulets') // left at "Keep all"
})

test('cloned quick-filter controls compile to real, in-game-safe output', () => {
  const blocks = compileOverrides({ quickFilters: {
    myFlasks: ['Life Flasks'],
    econTieringMode: 'strict', econBigStacks: true, econBigStackSize: 20,
    uExcellent: true, uGood: true, vaalUniques: true, uClassSpecific: ['Amulets'],
    myJewels: ['Emerald', 'Sapphire'],
    unidRareGear: true, unidRareGearTier: 3,
    idGear: true, idHideRest: true, idHideRestCorrupted: false,
    idExcellent: true, specialGear: true, craftSocketGear: true, craftSocketMin: 2,
    chanceWanted: true,
  } }, { 'Original Sin': 'Sacrificial Heart', 'Ghostwrithe': 'Silk Robe' })
  const text = blocks.join('\n\n')
  // My flasks force-show + economy big-stack highlight + strict currency hide
  expect(text).toMatch(/My flasks[\s\S]*?Class == "Life Flasks"/)
  expect(text).toMatch(/large currency stacks[\s\S]*?StackSize >= 20/)
  expect(text).toContain('Transmutation Shard')
  // Unique value tiers resolve NAME -> base type + Rarity Unique (never the unique name as a BaseType)
  expect(text).toMatch(/Excellent \(S-tier\) uniques[\s\S]*?BaseType == "Sacrificial Heart"[\s\S]*?Rarity Unique/)
  expect(text).toMatch(/Good \(A-tier\) uniques[\s\S]*?BaseType == "Silk Robe"/)
  expect(text).not.toContain('"Original Sin"')
  expect(text).toMatch(/Vaal base uniques[\s\S]*?BaseType "Vaal"[\s\S]*?Rarity Unique/)
  // My jewels: keep chosen bases, hide the rest
  expect(text).toMatch(/My jewels[\s\S]*?BaseType == "Emerald" "Sapphire"/)
  expect(text).toMatch(/Hide off-build jewels[\s\S]*?Class == "Jewels"/)
  // Unidentified rare gear: Identified False + an item-level floor (T3 -> 68)
  expect(text).toMatch(/Identified False[\s\S]*?ItemLevel >= 68/)
  // Identified categories + "hide rest, keep corrupted out of the hide"
  expect(text).toMatch(/Identified gear[\s\S]*?Identified True/)
  expect(text).toMatch(/Hide other identified equipment[\s\S]*?Corrupted False/)
  // Special / crafting / chance highlights are real Show blocks
  expect(text).toMatch(/Special gear[\s\S]*?Rarity Rare[\s\S]*?ItemLevel >= 82/)
  expect(text).toMatch(/Excellent socketed gear[\s\S]*?Sockets >= 2/)
  expect(text).toMatch(/Wanted chance bases[\s\S]*?Rarity Normal[\s\S]*?ItemLevel >= 82/)
  // never emit a rarity operator (would risk the whole filter failing to load)
  expect(text).not.toMatch(/Rarity\s*(<=|>=|<|>)\s/)
})

test('tiered uniques resolve to base type + Rarity Unique (never the unique name as BaseType)', () => {
  const blocks = compileOverrides(
    { tierOverrides: { 'Ab Aeterno': 'S', 'Chaos Orb': 'A' } },
    { 'Ab Aeterno': 'Grand Cuisses' }, // name -> base type
  )
  const text = blocks.join('\n')
  // the unique is emitted as its BASE TYPE + Rarity Unique — the only thing PoE2 accepts
  expect(text).toMatch(/Tier S uniques[\s\S]*?BaseType == "Grand Cuisses"[\s\S]*?Rarity Unique/)
  expect(text).not.toContain('"Ab Aeterno"')        // the bug: unique name was emitted as a BaseType
  // a real base type / currency name stays an exact BaseType match
  expect(text).toMatch(/BaseType == "Chaos Orb"/)
})

test('compiled rarity conditions use in-game-safe list form, never operators', () => {
  const blocks = compileOverrides({
    quickFilters: { gearMinRarity: 'Rare', hideNonUniqueFlasks: true, showChanceBases: true, highlightJewellery: true, levelingShow: ['weaponsArmour'] },
    overrides: { rules: [{ id: 'r', enabled: true, action: 'Hide', label: 'x', match: { rarity: 'Unique', rarityOp: '<' } }] },
  })
  const text = blocks.join('\n\n')
  // A `Rarity < X` could make PoE2 reject the whole filter — the list form never does.
  expect(text).not.toMatch(/Rarity\s*(<=|>=|<|>)\s/)
  expect(text).toContain('Rarity Normal Magic Rare')
})

test('imported raw rules round-trip through the rule builder', () => {
  const ovRule = { id: 'x', enabled: true, action: 'Show', label: 'kept', raw: 'Show # kept\n\tBaseType "Mirror"\n\tPlayEffect Red' }
  const blocks = compileOverrides({ overrides: { rules: [ovRule] } })
  const text = blocks.join('\n\n')
  expect(text).toContain('Show # kept')
  expect(text).toContain('PlayEffect Red')
})

test('injectOverrides places the block before the first rule and is idempotent', () => {
  const blocks = compileOverrides({ overrides: { rules: [{ ...emptyOverrideRule(1), action: 'Hide', match: { classes: ['Wands'] } }] } })
  const once = injectOverrides(FAKE_BASE, blocks)
  // override must appear before the base gold rule
  expect(once.indexOf('NOLVUS OVERRIDES (START)')).toBeLessThan(once.indexOf('Show # base gold rule'))
  // base rule survives verbatim
  expect(once).toContain('Show # base gold rule')
  // re-injecting doesn't stack duplicate sections
  const twice = injectOverrides(once, blocks)
  expect(twice.match(/NOLVUS OVERRIDES \(START\)/g)).toHaveLength(1)
})

test('buildFilter never emits a unique name as a BaseType (the in-game parse error)', async () => {
  // A unique dragged in the Tier List used to leak into BOTH the Currency section and the override
  // area as `BaseType == "Ab Aeterno"`, which PoE2 rejects ("no base types found matching...").
  const s = { ...defaultSettings('T'), tierOverrides: { 'Ab Aeterno': 'S' } }
  const out = await buildFilter(s, { uniqueBases: { 'Ab Aeterno': 'Grand Cuisses' } })
  expect(out).not.toContain('Ab Aeterno')
  expect(out).toMatch(/BaseType == "Grand Cuisses"[\s\S]*?Rarity Unique/)
})

test('buildFilter generates the whole filter from settings (header, rules, currency, catch-all)', async () => {
  const s = { ...defaultSettings('My Test Filter'), overrides: { rules: [{ ...emptyOverrideRule(1), action: 'Hide', label: 'x', match: { classes: ['Wands'] } }] } }
  const out = await buildFilter(s, {})
  expect(out).toContain('# My Test Filter - Path of Exile 2 loot filter')
  expect(out).toContain('Class == "Wands"')                 // the user's rule
  expect(out).toContain('# Currency')                        // currency section
  expect(out).toMatch(/(Show|Hide) # Everything else/)       // final catch-all
  // a strict profile hides the tail; a soft one shows it
  const strict = await buildFilter({ ...s, quickFilters: { ...s.quickFilters, catchAll: 'hide' } }, {})
  expect(strict).toContain('Hide # Everything else')
})

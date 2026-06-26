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

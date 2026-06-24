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
  expect(c).toContain('Rarity <= Magic')
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

test('buildFilter loads the base, stamps the header name, and injects overrides', async () => {
  const fetchMock = vi.fn(async () => ({ ok: true, status: 200, text: async () => FAKE_BASE }))
  vi.stubGlobal('fetch', fetchMock)
  try {
    const s = { ...defaultSettings('My Test Filter'), overrides: { rules: [{ ...emptyOverrideRule(1), action: 'Hide', label: 'x', match: { classes: ['Wands'] } }], toggles: {}, gear: { weapons: [], armour: [] } } }
    const out = await buildFilter(s, {})
    expect(fetchMock).toHaveBeenCalled()
    expect(out).toContain('# My Test Filter - Path of Exile 2 loot filter')
    expect(out).toContain('NOLVUS OVERRIDES (START)')
    expect(out).toContain('Class == "Wands"')
    expect(out).toContain('Show # base gold rule')
  } finally {
    vi.unstubAllGlobals()
  }
})

import { describe, test, expect } from 'vitest'
import { craftingTips, affixAnnotations } from './tips.js'

// The crafting-tip rules ported from the Companion's spot-price-check plugin. Items here use the
// parseTradeItem shape ({ rarity, category, corrupted, properties, mods }); the raw text carries
// the advanced-copy `{ Prefix Modifier … (Tier: N) }` annotations the tier/affix tips read.

const rareGear = (over = {}) => ({
  rarity: 'Rare',
  category: 'armour',
  corrupted: false,
  properties: {},
  mods: [],
  ...over,
})

const ADV_RAW = [
  '{ Prefix Modifier "Healthy" (Tier: 1) }',
  '+120 to maximum Life',
  '{ Suffix Modifier "of the Yeti" (Tier: 3) }',
  '+40% to Cold Resistance',
].join('\n')

describe('affixAnnotations', () => {
  test('counts prefixes, suffixes and tiers from advanced-copy text', () => {
    const a = affixAnnotations(ADV_RAW)
    expect(a.prefixes).toBe(1)
    expect(a.suffixes).toBe(1)
    expect(a.tiers).toEqual([1, 3])
    expect(a.advanced).toBe(true)
  })

  test('plain copy has no annotations', () => {
    const a = affixAnnotations('+120 to maximum Life\n+40% to Cold Resistance')
    expect(a.advanced).toBe(false)
    expect(a.tiers).toEqual([])
  })
})

describe('craftingTips', () => {
  test('corrupted item gets only the locked tip', () => {
    const tips = craftingTips(rareGear({ corrupted: true }))
    expect(tips).toHaveLength(1)
    expect(tips[0].text).toMatch(/Corrupted/)
  })

  test('advanced copy reports exact open prefixes/suffixes', () => {
    const tips = craftingTips(rareGear({ mods: [{ kind: 'explicit' }, { kind: 'explicit' }] }), ADV_RAW)
    const open = tips.find((t) => t.icon === '✦')
    expect(open).toBeDefined()
    expect(open.text).toMatch(/2 open prefixes \+ 2 open suffixes/)
  })

  test('plain copy falls back to total open modifier slots', () => {
    const mods = [{ kind: 'explicit' }, { kind: 'explicit' }, { kind: 'explicit' }, { kind: 'explicit' }]
    const tips = craftingTips(rareGear({ mods }))
    const open = tips.find((t) => t.icon === '✦')
    expect(open).toBeDefined()
    expect(open.text).toMatch(/2 open modifier slots/)
  })

  test('no open-slot tip on a fully rolled rare; Vaal-gamble tip instead', () => {
    const mods = Array.from({ length: 6 }, () => ({ kind: 'explicit' }))
    const tips = craftingTips(rareGear({ mods }))
    expect(tips.find((t) => t.icon === '✦')).toBeUndefined()
    expect(tips.find((t) => t.icon === '⚠')).toBeDefined()
  })

  test('quality tip fires below 20% on gear, not on jewellery', () => {
    const armour = craftingTips(rareGear({ properties: { quality: 8 }, mods: [{ kind: 'explicit' }] }))
    expect(armour.find((t) => t.icon === '⌬')).toBeDefined()
    const ring = craftingTips(
      rareGear({ category: 'jewellery', properties: { quality: 8 }, mods: [{ kind: 'explicit' }] }),
    )
    expect(ring.find((t) => t.icon === '⌬')).toBeUndefined()
  })

  test('top-tier tip needs a T1/T2 annotation', () => {
    const withT1 = craftingTips(rareGear({ mods: [{ kind: 'explicit' }] }), ADV_RAW)
    expect(withT1.find((t) => t.icon === '★')).toBeDefined()
    const lowTiers = '{ Prefix Modifier "x" (Tier: 5) }\n+10 to maximum Life'
    const without = craftingTips(rareGear({ mods: [{ kind: 'explicit' }] }), lowTiers)
    expect(without.find((t) => t.icon === '★')).toBeUndefined()
  })

  test('normal/unique rarity gets no affix-slot or vaal tips', () => {
    const tips = craftingTips(rareGear({ rarity: 'Unique', mods: [{ kind: 'explicit' }] }))
    expect(tips.find((t) => t.icon === '✦')).toBeUndefined()
    expect(tips.find((t) => t.icon === '⚠')).toBeUndefined()
  })

  test('null item yields no tips', () => {
    expect(craftingTips(null)).toEqual([])
  })
})

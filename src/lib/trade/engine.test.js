import { test, expect } from 'vitest'
import { buildQuery } from './buildQuery.js'
import { summarize, formatPrice, toExalted } from './summarize.js'

test('a unique searches by name only (no base type — avoids the "Invalid query" 400)', () => {
  const q = buildQuery({ rarity: 'Unique', name: 'Reverie', baseType: 'Shaman Mantle' }, { searchBy: 'name' })
  expect(q.query.name).toBe('Reverie')
  expect(q.query.type).toBeUndefined()
  expect(q.query.stats).toBeUndefined()
  expect(q.sort).toEqual({ price: 'asc' })
})

test('a rare searches by base + checked mod stat ids floored to Min %', () => {
  const q = buildQuery(
    { rarity: 'Rare', baseType: 'Amethyst Ring' },
    {
      searchBy: 'base', minPct: 80,
      checkedMods: [
        { statId: 'explicit.stat_3299347043', values: [85] }, // +85 Life → min 68
        { statId: 'explicit.stat_x', values: [32] },           // 32% res → min 25
        { values: [9] },                                       // unmatched (no statId) → dropped
      ],
    },
  )
  expect(q.query.type).toBe('Amethyst Ring')
  expect(q.query.stats[0].filters).toHaveLength(2)
  expect(q.query.stats[0].filters[0]).toEqual({ id: 'explicit.stat_3299347043', disabled: false, value: { min: 68 } })
  expect(q.query.stats[0].filters[1].value.min).toBe(25)
})

test('buyout + time filters map into trade_filters', () => {
  const q = buildQuery({ baseType: 'X' }, { searchBy: 'base', saleType: 'buyout', listedWithin: '3days' })
  expect(q.query.filters.trade_filters.filters.sale_type).toEqual({ option: 'priced' })
  expect(q.query.filters.trade_filters.filters.indexed).toEqual({ option: '3days' })
})

test('summarize computes low/median/high in exalted from real listings', () => {
  const listings = [
    { listing: { price: { amount: 5, currency: 'exalted' } } },
    { listing: { price: { amount: 8, currency: 'exalted' } } },
    { listing: { price: { amount: 11, currency: 'exalted' } } },
    { listing: { price: { amount: 1, currency: 'divine' } } }, // 1 div = 40 ex
    { listing: { price: { amount: 3, currency: 'chaos' } } },  // unknown rate → skipped
  ]
  const s = summarize(listings, { divinePrice: 40 })
  expect(s.count).toBe(4)
  expect(s.skipped).toBe(1)
  expect(s.low).toBe(5)
  expect(s.high).toBe(40)
  expect(s.median).toBeGreaterThanOrEqual(8)
})

test('toExalted skips unknown currencies and formatPrice handles ex / div / split', () => {
  expect(toExalted(2, 'divine', { divine: 40 })).toBe(80)
  expect(toExalted(3, 'chaos', { divine: 40 })).toBeNull()
  expect(formatPrice(8, 'Exalted Orb', 40)).toBe('8 ex')
  expect(formatPrice(80, 'Divine Orb', 40)).toBe('2 div')
  expect(formatPrice(80, 'ex+div', 40)).toBe('2 div')
  expect(formatPrice(8, 'ex+div', 40)).toBe('8 ex')
})

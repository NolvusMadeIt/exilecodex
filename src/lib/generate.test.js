import { test, expect } from 'vitest'
import { generateFilter } from './generate.js'
import { parseFilterText } from './parseFilter.js'
import { defaultSettings } from '../store/defaultSettings.js'

test('prefix BaseType survives parse and regenerate', () => {
  const src = [
    'Show # legacy augments',
    '\tClass == "Augment"',
    '\tBaseType "Legacy of"',
    '\tSetFontSize 45',
  ].join('\n')

  const parsed = parseFilterText(src)
  expect(parsed.customRules).toHaveLength(1)
  expect(parsed.customRules[0].baseTypes).toEqual(['Legacy of'])
  expect(parsed.customRules[0].baseTypePrefix).toBe(true)

  const out = generateFilter({ ...defaultSettings(), customRules: parsed.customRules })
  expect(out).toContain('BaseType "Legacy of"')
  expect(out).not.toContain('BaseType == "Legacy of"')
})

test('imported raw rules are emitted verbatim', () => {
  const raw = [
    'Show # keep me exact',
    '\tBaseType "Legacy of"',
    '\tPlayEffect Red',
  ].join('\n')
  const rule = {
    id: 'r1', enabled: true, action: 'Show', classes: [], baseTypes: ['Legacy of'],
    baseTypePrefix: true, rarityOp: '>=', rarity: 'Any', dropTier: 'E',
    itemLevel: 0, comment: 'keep me exact', raw,
  }
  const out = generateFilter({ ...defaultSettings(), customRules: [rule] })
  expect(out).toContain('\tBaseType "Legacy of"')
  expect(out).not.toContain('BaseType == "Legacy of"')
  expect(out).toContain('\tPlayEffect Red')
})

test('quick filters use PoE2 rarity list syntax', () => {
  const out = generateFilter(defaultSettings())
  expect(out).toContain('Rarity Unique')
  expect(out).not.toContain('Rarity == Unique')
  expect(out).toContain('Rarity Normal Magic Rare')
  expect(out).not.toContain('Rarity < Unique')
})
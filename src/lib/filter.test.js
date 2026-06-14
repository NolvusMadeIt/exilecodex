import { test, expect } from 'vitest'
import { rulesToFilterText, parseFilterText } from './filter.js'

test('empty rules produces header only', () => {
  const out = rulesToFilterText([], 'Test')
  expect(out).toContain('# Test')
  expect(out).toContain('# Created with NolvusFilter')
})

test('basic currency rule emits correct syntax', () => {
  const rules = [{ id: '1', enabled: true, action: 'Show', conditions: [{ kind: 'BaseType', op: '==', value: ['Exalted Orb', 'Divine Orb'] }], visuals: { textColor: [255, 178, 135], fontSize: 40, beam: { color: 'Yellow' }, minimap: { size: 0, color: 'Yellow', shape: 'Star' } } }]
  const out = rulesToFilterText(rules, 'T')
  expect(out).toContain('Show')
  expect(out).toContain('BaseType == "Exalted Orb" "Divine Orb"')
  expect(out).toContain('SetTextColor 255 178 135')
  expect(out).toContain('SetFontSize 40')
  expect(out).toContain('PlayEffect Yellow')
  expect(out).toContain('MinimapIcon 0 Yellow Star')
})

test('hide junk + rarity multi works', () => {
  const rules = [{ id: '2', enabled: true, action: 'Hide', conditions: [{ kind: 'Rarity', op: '==', value: ['Normal', 'Magic'] }], visuals: { textColor: [200, 200, 200], fontSize: 28 } }]
  const out = rulesToFilterText(rules)
  expect(out).toContain('Hide')
  expect(out).toContain('Rarity Normal Magic')
})

test('roundtrip parse then emit keeps structure', () => {
  const src = 'Show\n  BaseType == "Chaos Orb"\n  SetTextColor 255 200 120\n  PlayEffect Cyan\n  MinimapIcon 1 Cyan Circle\n'
  const parsed = parseFilterText(src)
  expect(parsed.length).toBe(1)
  const out = rulesToFilterText(parsed, 'RT')
  expect(out).toContain('BaseType == "Chaos Orb"')
  expect(out).toContain('PlayEffect Cyan')
  expect(out).toContain('MinimapIcon 1 Cyan Circle')
})

test('waystone tier numeric', () => {
  const rules = [{ id: '3', enabled: true, action: 'Show', conditions: [{ kind: 'WaystoneTier', op: '>=', value: 11 }], visuals: { textColor: [255, 255, 255] } }]
  const out = rulesToFilterText(rules)
  expect(out).toContain('WaystoneTier >= 11')
})

import { test, expect } from 'vitest'
import { parseTradeItem } from './parseTradeItem.js'

const RARE_ARMOUR = `Item Class: Body Armours
Rarity: Rare
Hypnotic Keep
Advanced Vaal Cuirass
--------
Quality: +20% (augmented)
Armour: 935 (augmented)
Energy Shield: 257
--------
Requirements:
Level: 67
Str: 122
--------
Sockets: S S
--------
Item Level: 81
--------
+12% to all Elemental Resistances (implicit)
--------
+95 to maximum Life
+38% to Cold Resistance
+35% to Lightning Resistance
35% increased Armour
--------
Corrupted`

const RARE_WEAPON = `Item Class: Wands
Rarity: Rare
Storm Bite
Attuned Wand
--------
Physical Damage: 12-22
Critical Hit Chance: 11.00%
Attacks per Second: 1.25
--------
Item Level: 79
--------
+1 to Level of all Spell Skills (implicit)
--------
Adds 23 to 49 Cold Damage
72% increased Critical Hit Chance for Spells
46% increased Cast Speed`

const CURRENCY = `Item Class: Stackable Currency
Rarity: Currency
Divine Orb
--------
Stack Size: 7/10
--------
Randomises the numeric values of the modifiers on an item`

test('parses a rare armour: header, properties, and explicit + implicit mods with values', () => {
  const it = parseTradeItem(RARE_ARMOUR)
  expect(it.rarity).toBe('Rare')
  expect(it.itemLevel).toBe(81)
  expect(it.category).toBe('armour')
  expect(it.properties.armour).toBe(935)
  expect(it.properties.energyShield).toBe(257)
  const life = it.mods.find(m => /maximum Life/.test(m.text))
  expect(life).toBeTruthy()
  expect(life.kind).toBe('explicit')
  expect(life.values).toEqual([95])
  const impl = it.mods.find(m => m.kind === 'implicit')
  expect(impl.text).toMatch(/all Elemental Resistances/)
  expect(it.mods.some(m => /Cold Resistance/.test(m.text))).toBe(true)
})

test('parses a weapon: dps properties + spell mods including a multi-value roll', () => {
  const it = parseTradeItem(RARE_WEAPON)
  expect(it.category).toBe('weapon')
  expect(it.properties.critChance).toBe(11)
  expect(it.properties.attacksPerSecond).toBe(1.25)
  const cold = it.mods.find(m => /Adds .* Cold Damage/.test(m.text))
  expect(cold.values).toEqual([23, 49])
  expect(it.mods.some(m => m.kind === 'implicit' && /Spell Skills/.test(m.text))).toBe(true)
})

test('currency has a category and no mods', () => {
  const it = parseTradeItem(CURRENCY)
  expect(it.category).toBe('currency')
  expect(it.name).toBe('Divine Orb')
  expect(it.mods.length).toBe(0)
})

test('returns null for non-item text', () => {
  expect(parseTradeItem('just some text')).toBeNull()
})

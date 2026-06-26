import { test, expect } from 'vitest'
import { parseBuild, buildToFilterPatch, looksLikeBuild, armourBasesForAttribute } from './buildImport.js'

// A tiny gear-data stand-in: names that classify to armour, each tagged with its defence stat.
const GEAR = [
  { name: 'Plate Vest', arm: 100, str: 40 },     // armour  → Strength
  { name: 'Silk Robe', es: 80, int: 40 },        // ES      → Intelligence
  { name: 'Leather Vest', ev: 70, dex: 35 },     // evasion → Dexterity
  { name: 'Adherent Bow', maxDmg: 59, dex: 104 },// weapon  → not armour
]

const BUILD = {
  name: 'Philmer', author: 'poe.ninja', ascendancy: 'Warrior1',
  passives: [
    { id: 'strength70' }, { id: 'strength2' }, { id: 'strength57' },
    { id: 'two_handed4' }, { id: 'two_handed1' }, { id: 'two_handed3' },
    { id: 'armour5' }, { id: 'intelligence8' },
  ],
  skills: [{ id: 'Metadata/Items/Gems/SkillGemHeraldOfAsh', support_skills: [] }],
}

test('looksLikeBuild detects a build export, rejects plain JSON', () => {
  expect(looksLikeBuild(BUILD)).toBe(true)
  expect(looksLikeBuild({ name: 'x' })).toBe(false)
})

test('parseBuild derives class, attribute, weapon style, weapons and skills', () => {
  const b = parseBuild(BUILD)
  expect(b.className).toBe('Warrior')
  expect(b.attribute).toBe('Strength')      // most passives are strength*
  expect(b.weaponStyle).toBe('two-handed')  // two_handed* > one_handed*
  expect(b.weapons).toEqual(['One Hand Maces', 'Two Hand Maces'])
  expect(b.skills).toContain('Herald of Ash')
})

test('armourBasesForAttribute picks bases by defence type, skips weapons', () => {
  expect(armourBasesForAttribute('Strength', GEAR)).toEqual(['Plate Vest'])
  expect(armourBasesForAttribute('Intelligence', GEAR)).toEqual(['Silk Robe'])
  expect(armourBasesForAttribute('Dexterity', GEAR)).toEqual(['Leather Vest'])
  expect(armourBasesForAttribute(null, GEAR)).toEqual([])      // unknown attribute
  expect(armourBasesForAttribute('Strength', [])).toEqual([])  // no gear data
})

test('buildToFilterPatch builds an editable smart filter (no build blob)', () => {
  const patch = buildToFilterPatch(parseBuild(BUILD), GEAR) // Warrior · Strength · two-handed
  // weapons refined by style (2H drops the one-hander), plus the "every build wants these" shows
  expect(patch.quickFilters.myWeapons).toEqual(['Two Hand Maces'])
  expect(patch.quickFilters.gemsShow).toEqual(['uncut', 'skill', 'support'])
  expect(patch.quickFilters.showJewels).toBe(true)
  expect(patch.quickFilters.highlightJewellery).toBe(true)
  expect(patch.quickFilters.showUniques).toBe(true)
  expect(patch.strictness).toBe('1-regular')
  expect(patch.klass).toBe('Warrior')
  expect(patch.name).toBe('Philmer')
  expect(patch.build).toBeUndefined() // nothing build-specific is stored

  // attribute (Strength) → one editable highlight rule for Armour bases only, hiding nothing
  expect(patch.overrides.rules).toHaveLength(1)
  const rule = patch.overrides.rules[0]
  expect(rule.action).toBe('Show')
  expect(rule.match.baseType).toContain('Plate Vest')
  expect(rule.match.baseType).not.toContain('Silk Robe')
  expect(rule.match.rarity).toBe('Rare')
})

test('buildToFilterPatch omits the armour rule when gear data is unavailable', () => {
  const patch = buildToFilterPatch(parseBuild(BUILD)) // no gear passed
  expect(patch.overrides.rules).toEqual([])
})

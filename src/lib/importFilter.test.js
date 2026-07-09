import { test, expect } from 'vitest'
import { buildFilter } from './buildFilter.js'
import { parseFilterText } from './parseFilter.js'
import { decodeFilter, nearestTier } from './importFilter.js'
import { defaultSettings } from '../store/defaultSettings.js'
import { strictnessProfile } from '../data/strictness.js'
import { DEFAULT_TIER_CURRENCY, DEFAULT_TIER_UNIQUES } from '../data/dropTiers.js'

// A base-name set wide enough that the generator's currency-tier blocks all emit (the build-time
// guard drops names that aren't confirmed base types).
const BASE_NAMES = new Set([...Object.values(DEFAULT_TIER_CURRENCY).flat(), 'Chaos Orb', 'Divine Orb', 'Exalted Orb'])
// Map the curated uniques to (stand-in) base types so the unique value-tier blocks actually emit.
const UNIQUE_BASES = {}
for (const names of Object.values(DEFAULT_TIER_UNIQUES)) for (const n of names) UNIQUE_BASES[n] = `Base of ${n}`
const OPTS = { uniqueBases: UNIQUE_BASES, baseNames: BASE_NAMES, stamp: 'TEST' }

// Mirror how PresetsPage builds a filter: pick a strictness AND seed its quick-filter profile.
const atStrictness = (id, extra = {}) => ({ ...defaultSettings('S'), strictness: id, quickFilters: { ...strictnessProfile(id), ...extra } })

async function roundTrip(settings) {
  const out = await buildFilter(settings, OPTS)
  const parsed = parseFilterText(out)
  return { out, patch: decodeFilter(parsed, { text: out, baseNames: BASE_NAMES, uniqueBases: UNIQUE_BASES }) }
}

test('decodes the strictness and style from the header', async () => {
  const { patch } = await roundTrip({ ...atStrictness('2-semi-strict'), style: 'mythic' })
  expect(patch.strictness).toBe('2-semi-strict')
  expect(patch.style).toBe('mythic')
  expect(patch.summary.ours).toBe(true)
})

test('reconstructs a strictness profile from its generated blocks', async () => {
  const { patch } = await roundTrip(atStrictness('2-semi-strict'))
  const qf = patch.quickFilters
  const prof = strictnessProfile('2-semi-strict')
  expect([...qf.currencyShow].sort()).toEqual([...prof.currencyShow].sort())
  expect([...qf.gemsShow].sort()).toEqual([...prof.gemsShow].sort())
  expect([...qf.flasksShow].sort()).toEqual([...prof.flasksShow].sort())
  expect([...qf.endgameShow].sort()).toEqual([...prof.endgameShow].sort())
  expect(qf.hideScrolls).toBe(true)
  expect(qf.hideNonUniqueFlasks).toBe(true)
  expect(qf.gearMinRarity).toBe('Magic')
  expect(qf.minGoldPile).toBe(400)
  expect(qf.showWaystones).toBe(true)
  expect(qf.showUniques).toBe(true)
  expect(qf.catchAll).toBe('show')
})

test('a strict preset recovers catch-all = hide and the rare-ilvl floor', async () => {
  const { patch } = await roundTrip(atStrictness('4-very-strict'))
  expect(patch.quickFilters.catchAll).toBe('hide')
  expect(patch.quickFilters.alwaysShowRareIlvl).toBe(82)
  expect(patch.quickFilters.highlightJewellery).toBe(true)
})

test('recovers a spread of customised Quick Filter toggles', async () => {
  const qfIn = {
    ...strictnessProfile('1-regular'),
    hideScrolls: true, econTieringMode: 'strict', econBigStacks: true, econBigStackSize: 25,
    uExcellent: true, uGood: true, vaalUniques: true,
    myWeapons: ['Wands', 'Sceptres'],
    unidRareGear: true, unidRareGearTier: 3,
    socketedGear: true, socketedGearMin: 3,
    hideRingsBelow: 'Rare', hideJewelsBelow: 'Magic',
    specialGear: true, chanceWanted: true, idGear: true, idHideRest: true,
    minGoldPile: 750,
  }
  const { patch } = await roundTrip({ ...defaultSettings('S'), strictness: '1-regular', quickFilters: qfIn, style: 'default' })
  const qf = patch.quickFilters
  expect(qf.econTieringMode).toBe('strict')
  expect(qf.econBigStacks).toBe(true)
  expect(qf.econBigStackSize).toBe(25)
  expect(qf.uExcellent).toBe(true)
  expect(qf.uGood).toBe(true)
  expect(qf.vaalUniques).toBe(true)
  expect([...qf.myWeapons].sort()).toEqual(['Sceptres', 'Wands'])
  expect(qf.unidRareGear).toBe(true)
  expect(qf.unidRareGearTier).toBe(3)
  expect(qf.socketedGear).toBe(true)
  expect(qf.socketedGearMin).toBe(3)
  expect(qf.hideRingsBelow).toBe('Rare')
  expect(qf.hideJewelsBelow).toBe('Magic')
  expect(qf.specialGear).toBe(true)
  expect(qf.chanceWanted).toBe(true)
  expect(qf.idGear).toBe(true)
  expect(qf.minGoldPile).toBe(750)
})

test('recovers a currency tier move into tierOverrides', async () => {
  const { patch } = await roundTrip({ ...defaultSettings('S'), tierOverrides: { 'Chaos Orb': 'S' } })
  expect(patch.tierOverrides['Chaos Orb']).toBe('S')
})

test('does not echo curated DEFAULT tiers back as explicit overrides', async () => {
  const { patch } = await roundTrip({ ...defaultSettings('S'), tierOverrides: { 'Chaos Orb': 'S' } })
  // Mirror of Kalandra sits in default S; Divine Orb in default A — the generator emits them, but
  // the decode must not freeze them into tierOverrides (only the real user move comes back).
  expect(patch.tierOverrides['Mirror of Kalandra']).toBeUndefined()
  expect(patch.tierOverrides['Divine Orb']).toBeUndefined()
  expect(Object.keys(patch.tierOverrides)).toEqual(['Chaos Orb'])
})

test('recovers a UNIQUE tier move through the inverse base map', async () => {
  // Goldrim is curated C; the user promotes it to S. Its stand-in base maps back to the name.
  const { patch } = await roundTrip({ ...defaultSettings('S'), tierOverrides: { Goldrim: 'S' } })
  expect(patch.tierOverrides.Goldrim).toBe('S')
  // Default-tier uniques must NOT come back as explicit overrides.
  expect(patch.tierOverrides.Mageblood).toBeUndefined()
})

test('decode never mutates the shared quick-filter defaults or strictness profiles', async () => {
  const { cloneQuickFilters } = await import('../data/quickFilters.js')
  const before = JSON.stringify(cloneQuickFilters())
  const profBefore = JSON.stringify(strictnessProfile('1-regular'))
  // A filter with list-toggles set forces the decoder down every push() path.
  await roundTrip(atStrictness('1-regular'))
  await roundTrip(atStrictness('2-semi-strict'))
  expect(JSON.stringify(cloneQuickFilters())).toBe(before)
  expect(JSON.stringify(strictnessProfile('1-regular'))).toBe(profBefore)
})

test("the user's own free text survives the round-trip; generated banners do not", async () => {
  const settings = {
    ...atStrictness('1-regular'),
    freeText: { top: '# keep this pinned note', bottom: '# remember: mageblood check' },
  }
  const out = await buildFilter(settings, { ...OPTS, prefs: { bottomComment: 'global settings footer' } })
  const parsed = parseFilterText(out)
  const patch = decodeFilter(parsed, {
    text: out, baseNames: BASE_NAMES, uniqueBases: UNIQUE_BASES,
    prefs: { bottomComment: 'global settings footer' },
  })
  expect(patch.freeText.top).toContain('keep this pinned note')
  expect(patch.freeText.bottom).toContain('remember: mageblood check')
  // Generated content and the global Settings comment stay out of the filter's own free text.
  const all = patch.freeText.top + '\n' + patch.freeText.bottom
  expect(all).not.toMatch(/Built with/)
  expect(all).not.toMatch(/#{10,}/)
  expect(all).not.toContain('global settings footer')
})

test('a foreign filter does not crash: tiers by colour, keeps leftovers as Custom Rules', () => {
  const foreign = [
    '# Some Other Filter - PoE2',
    '# Version: 2.1.0',
    '',
    'Show # valuable currency',
    '\tBaseType == "Divine Orb" "Exalted Orb"',
    '\tSetTextColor 224 64 64',
    '',
    'Show # my pinpoint',
    '\tClass == "Amulets"',
    '\tRarity Rare',
    '\tSetFontSize 45',
    '',
    'Hide # everything else',
    '',
  ].join('\n')
  const parsed = parseFilterText(foreign)
  const patch = decodeFilter(parsed, { text: foreign, baseNames: BASE_NAMES, uniqueBases: {} })
  expect(patch.summary.ours).toBe(false)
  expect(patch.tierOverrides['Divine Orb']).toBeTruthy()  // tiered by colour
  expect(patch.customRules.length).toBeGreaterThan(0)     // the pinpoint kept as an editable rule
  expect(patch.strictness).toBeTruthy()
})

test('nearestTier maps exact tier colours to their tier and off-palette to E', () => {
  expect(nearestTier([182, 96, 224])).toBe('S')   // exact S textColor
  expect(nearestTier([224, 64, 64])).toBe('A')    // exact A
  expect(nearestTier([0, 255, 0])).toBe('E')      // off-palette green → no confident tier
})

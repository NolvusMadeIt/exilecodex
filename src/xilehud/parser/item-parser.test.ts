import { describe, it, expect } from 'vitest'
import { ItemParser } from './item-parser'

// The vendored XileHUD item parser (pure logic — the foundation for the paste-an-item flow
// now, and clipboard capture + merchant history in the desktop wave). Fixtures below are our
// own synthetic items written in the game's Ctrl+C / advanced-copy text format.

const RARE_AMULET = [
  'Item Class: Amulets',
  'Rarity: Rare',
  'Storm Charm',
  'Solar Amulet',
  '--------',
  'Requirements:',
  'Level: 52',
  '--------',
  'Item Level: 68',
  '--------',
  '{ Implicit Modifier }',
  '+12% increased Spirit (implicit)',
  '--------',
  '{ Prefix Modifier "Rotund" (Tier: 3) }',
  '+64 to maximum Life',
  '{ Suffix Modifier "of the Storm" (Tier: 2) }',
  '+31% to Lightning Resistance',
].join('\n')

const UNIQUE_CLUB = [
  'Item Class: One Hand Maces',
  'Rarity: Unique',
  'Trenchtimbre',
  'Spiked Club',
  '--------',
  'Item Level: 45',
  '--------',
  'Adds 13 to 22 Physical Damage',
  '20% increased Attack Speed',
  '--------',
  'Corrupted',
].join('\n')

describe('ItemParser (poe2)', () => {
  it('parses a rare with advanced-copy annotations: rarity, names, category, ilvl, mods', async () => {
    const item = await new ItemParser('poe2').parse(RARE_AMULET)
    expect(item.rarity.toLowerCase()).toBe('rare')
    expect(item.name).toBe('Storm Charm')
    expect(item.baseType).toBe('Solar Amulet')
    expect(item.category).toBe('Amulets') // maps onto the modifiers dataset name
    expect(item.itemLevel).toBe(68)
    const mods = item.modifiers.join('\n')
    expect(mods).toContain('maximum Life')
    expect(mods).toContain('Lightning Resistance')
  })

  it('parses a corrupted unique and flags it', async () => {
    const item = await new ItemParser('poe2').parse(UNIQUE_CLUB)
    expect(item.rarity.toLowerCase()).toBe('unique')
    expect(item.name).toBe('Trenchtimbre')
    expect(Boolean(item.corrupted || item.isCorrupted)).toBe(true)
  })

  it('returns a usable result rather than throwing on non-item text', async () => {
    const item = await new ItemParser('poe2').parse('just some clipboard noise')
    expect(item).toBeTruthy()
    expect(item.category || item.itemClass || '').not.toBe('Amulets')
  })
})

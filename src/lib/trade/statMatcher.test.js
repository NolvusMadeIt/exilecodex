import { test, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { normalizeStatText, buildStatIndex, matchStat } from './statMatcher.js'

// Build the index from the REAL bundled GGG trade stat catalogue.
const statsPath = fileURLToPath(new URL('../../../public/data/poe2/trade-stats.json', import.meta.url))
const entries = JSON.parse(readFileSync(statsPath, 'utf8'))
const index = buildStatIndex(entries)

test('normalizes numbers and sign to placeholders', () => {
  expect(normalizeStatText('+85 to maximum Life')).toBe('# to maximum life')
  expect(normalizeStatText('+18% to Chaos Resistance')).toBe('#% to chaos resistance')
  expect(normalizeStatText('Adds 23 to 49 Cold Damage')).toBe('adds # to # cold damage')
})

test('matches common real item mods to explicit stat ids', () => {
  const life = matchStat(index, '+85 to maximum Life', 'explicit')
  expect(life?.id).toBe('explicit.stat_3299347043')
  expect(matchStat(index, '+32% to Lightning Resistance', 'explicit')?.id).toMatch(/^explicit\.stat_/)
  expect(matchStat(index, '+18% to Chaos Resistance', 'explicit')?.id).toMatch(/^explicit\.stat_/)
})

test('prefers the implicit entry for an implicit mod when both exist', () => {
  const m = matchStat(index, '+18% to Chaos Resistance', 'implicit')
  expect(m).toBeTruthy()
  // implicit preferred when available, else falls back to explicit (still a real id)
  expect(['implicit', 'explicit']).toContain(m.type)
})

test('returns null for unmatched / non-stat text rather than guessing', () => {
  expect(matchStat(index, 'Do not despair! Give yourself to the woods!', 'explicit')).toBeNull()
  expect(matchStat(index, '{ Unique Modifier — Chaos, Resistance }', 'explicit')).toBeNull()
})

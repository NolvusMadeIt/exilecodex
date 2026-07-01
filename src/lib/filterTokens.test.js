import { test, expect } from 'vitest'
import { completionContext, suggestionsFor } from './filterTokens.js'

const NAMES = ['Exalted Orb', 'Greater Exalted Orb', 'Mirror of Kalandra', 'Chaos Orb']
const labels = (line) => suggestionsFor(completionContext(line), NAMES).map(s => s.label)
const apply = (line) => suggestionsFor(completionContext(line), NAMES).map(s => s.apply)

test('keyword position suggests actions/conditions/styles by prefix', () => {
  expect(labels('Sho')).toEqual(['Show'])
  expect(labels('Hi')).toEqual(['Hide'])
  expect(labels('Set')).toEqual(expect.arrayContaining(['SetTextColor', 'SetFontSize']))
  // indented condition line still resolves the first-word keyword set
  expect(labels('\tBaseTy')).toEqual(['BaseType'])
})

test('value position depends on the line keyword', () => {
  expect(labels('Rarity ')).toEqual(expect.arrayContaining(['==', 'Rare', 'Unique']))
  expect(labels('Corrupted ')).toEqual(['True', 'False'])
  expect(labels('PlayEffect ')).toEqual(expect.arrayContaining(['Red', 'Temp']))
  expect(labels('ItemLevel ')).toEqual(expect.arrayContaining(['>=', '==']))
})

test('Class suggests item classes; BaseType suggests catalog names', () => {
  expect(labels('\tClass ')).toEqual(expect.arrayContaining(['Bows', 'Body Armours']))
  expect(labels('\tBaseType Mir')).toEqual(['Mirror of Kalandra'])
})

test('quoted names: match range excludes the quote and only the closing quote is added', () => {
  const ctx = completionContext('\tBaseType "Exa')
  // from points AFTER the opening quote so Monaco can fuzzy-match the partial
  const lineUpToCursor = '\tBaseType "Exa'
  expect(lineUpToCursor[ctx.from]).toBe('E')        // replacement starts at the partial, not the "
  expect(ctx.closeQuote).toBe(true)
  expect(suggestionsFor(ctx, NAMES).map(s => s.apply)).toEqual(expect.arrayContaining(['Exalted Orb"', 'Greater Exalted Orb"']))
})

test('bare (unquoted) names get fully wrapped in quotes on insert', () => {
  expect(apply('\tBaseType Chaos')).toEqual(['"Chaos Orb"'])
})

test('no suggestions where none apply', () => {
  expect(labels('SetFontSize ')).toEqual([])  // bare numeric arg — nothing to suggest
  expect(labels('SetTextColor ')).toEqual([]) // colour numbers — nothing to suggest
})

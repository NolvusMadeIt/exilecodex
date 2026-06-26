// Vocabulary + context-aware completions for the PoE2 item-filter language. Drives the autocomplete
// in the Editor tab: given the text on the current line up to the caret, figure out what kind of
// token the user is typing (a block keyword, a condition value, a style argument, or an item name)
// and return the candidate list + where the replacement should start.
import { CLASSES } from '../data/items.js'

export const ACTIONS = ['Show', 'Hide', 'Minimal', 'Continue']
export const CONDITIONS = [
  'Class', 'BaseType', 'Rarity', 'ItemLevel', 'DropLevel', 'Quality', 'Sockets', 'StackSize',
  'GemLevel', 'WaystoneTier', 'AreaLevel', 'Width', 'Height', 'BaseArmour', 'BaseEvasion',
  'BaseEnergyShield', 'Identified', 'Corrupted', 'Mirrored', 'Replica', 'Scourged',
  'AnyEnchantment', 'TransfiguredGem', 'HasExplicitMod', 'HasImplicitMod', 'HasEnchantment',
]
export const STYLES = [
  'SetTextColor', 'SetBorderColor', 'SetBackgroundColor', 'SetFontSize', 'PlayEffect',
  'MinimapIcon', 'PlayAlertSound', 'PlayAlertSoundPositional', 'CustomAlertSound',
  'DisableDropSound', 'EnableDropSound',
]
export const RARITIES = ['Normal', 'Magic', 'Rare', 'Unique']
export const BOOLS = ['True', 'False']
export const OPERATORS = ['==', '>=', '<=', '<', '>', '=']
export const BEAMS = ['Red', 'Green', 'Blue', 'Brown', 'White', 'Yellow', 'Cyan', 'Grey', 'Orange', 'Pink', 'Purple']
export const SHAPES = ['Circle', 'Diamond', 'Hexagon', 'Square', 'Star', 'Triangle', 'Cross', 'Moon', 'Raindrop', 'Kite', 'Pentagon', 'UpsideDownHouse']
export const SOUNDS = Array.from({ length: 16 }, (_, i) => String(i + 1))

const ALL_KEYWORDS = [...ACTIONS, ...CONDITIONS, ...STYLES]
// Conditions that take a numeric comparison (so we suggest operators). Style args like SetFontSize
// take a bare number — not in here, so we don't suggest operators for them.
const NUMERIC = new Set(['ItemLevel', 'DropLevel', 'Quality', 'Sockets', 'StackSize', 'GemLevel', 'WaystoneTier', 'AreaLevel', 'Width', 'Height', 'BaseArmour', 'BaseEvasion', 'BaseEnergyShield'])
const BOOL_CONDS = new Set(['Identified', 'Corrupted', 'Mirrored', 'Replica', 'Scourged', 'AnyEnchantment', 'TransfiguredGem'])
const NAME_CONDS = new Set(['BaseType', 'Class'])

export const CLASS_NAMES = CLASSES.map(c => c.name).sort()

// Word the user is currently typing (the trailing identifier run before the caret).
const wordAt = (s) => (s.match(/[A-Za-z0-9_]*$/) || [''])[0]

// Decide what to suggest for the caret position. Returns null when there's nothing to suggest,
// otherwise { kind, from, prefix, options? } where `from` is the line offset the replacement
// starts at and `prefix` is what to filter candidates by. kind: 'keyword' | 'value' | 'name'.
export function completionContext(lineBeforeCursor) {
  const inQuote = ((lineBeforeCursor.match(/"/g) || []).length % 2) === 1
  const trimmedStart = lineBeforeCursor.trimStart()
  const firstToken = trimmedStart.split(/\s+/)[0] || ''
  const indentLen = lineBeforeCursor.length - trimmedStart.length

  // Inside an open quote → item / class names. Replace from AFTER the quote (so the match range
  // is just the partial name, not the `"`, which Monaco can't fuzzy-match against the label).
  if (inQuote) {
    const q = lineBeforeCursor.lastIndexOf('"')
    return { kind: 'name', from: q + 1, prefix: lineBeforeCursor.slice(q + 1), classNames: firstToken === 'Class', closeQuote: true }
  }

  // Still typing the first word on the line → a block / condition / style keyword.
  if (!/\s/.test(trimmedStart)) {
    return { kind: 'keyword', from: indentLen, prefix: trimmedStart, options: ALL_KEYWORDS }
  }

  const prefix = wordAt(lineBeforeCursor)
  const from = lineBeforeCursor.length - prefix.length

  // Value position — what's valid depends on the line's leading keyword.
  if (NAME_CONDS.has(firstToken)) return { kind: 'name', from, prefix, classNames: firstToken === 'Class' }
  if (firstToken === 'Rarity') return { kind: 'value', from, prefix, options: [...OPERATORS, ...RARITIES] }
  if (BOOL_CONDS.has(firstToken)) return { kind: 'value', from, prefix, options: BOOLS }
  if (firstToken === 'PlayEffect') return { kind: 'value', from, prefix, options: [...BEAMS, 'Temp'] }
  if (firstToken === 'MinimapIcon') return { kind: 'value', from, prefix, options: ['0', '1', '2', ...BEAMS, ...SHAPES] }
  if (firstToken === 'PlayAlertSound' || firstToken === 'PlayAlertSoundPositional') return { kind: 'value', from, prefix, options: SOUNDS }
  if (NUMERIC.has(firstToken)) return { kind: 'value', from, prefix, options: OPERATORS }
  return null
}

// Build the final suggestion list. `catalogNames` is the bundled base-type list (strings).
// Each suggestion: { label, apply } where `apply` is the text inserted in place of the prefix.
export function suggestionsFor(ctx, catalogNames = []) {
  if (!ctx) return []
  const p = (ctx.prefix || '').toLowerCase()
  if (ctx.kind === 'name') {
    const pool = ctx.classNames ? CLASS_NAMES : catalogNames
    const starts = [], contains = []
    for (const n of pool) {
      const lo = n.toLowerCase()
      if (lo.startsWith(p)) starts.push(n)
      else if (p && lo.includes(p)) contains.push(n)
      if (starts.length >= 40) break
    }
    // Inside an open quote the `"` is already there → only add the closing one.
    return [...starts, ...contains].slice(0, 40).map(n => ({ label: n, apply: ctx.closeQuote ? `${n}"` : `"${n}"` }))
  }
  const list = ctx.options.filter(o => o.toLowerCase().startsWith(p) && o.toLowerCase() !== p)
  return list.slice(0, 40).map(o => ({ label: o, apply: ctx.kind === 'keyword' ? o + ' ' : o }))
}

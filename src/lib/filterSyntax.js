// Shared PoE2 item-filter syntax helpers. Standard .filter conventions.

export const quote = (value) => `"${String(value)}"`

export const quoteList = (values) => values.map(quote).join(' ')

// BaseType: exact lists use "==", prefix/wildcard matches omit the operator.
export function emitBaseType(names, { prefix = false } = {}) {
  if (!names?.length) return []
  if (prefix && names.length === 1) return [`BaseType ${quote(names[0])}`]
  return [`BaseType == ${quoteList(names)}`]
}

// Rarity: list form for exact tiers; comparison operators only when the user picked one.
export function emitRarity(value, op = '==') {
  if (!value || value === 'Any') return []
  if (op === '==' || op === '=') return [`Rarity ${value}`]
  return [`Rarity ${op} ${value}`]
}

// Hide all gear below Unique tier.
export const RARITY_BELOW_UNIQUE = 'Rarity Normal Magic Rare'

// Hide normal/magic jewellery leftovers.
export const RARITY_NORMAL_MAGIC = 'Rarity Normal Magic'

export function emitClass(names) {
  if (!names?.length) return []
  return [`Class == ${quoteList(names)}`]
}

// Split very long BaseType lists so a single line cannot be truncated by tooling.
export const BASETYPE_CHUNK = 60

export function chunkList(items, size = BASETYPE_CHUNK) {
  const out = []
  for (let i = 0; i < items.length; i += size) out.push(items.slice(i, i + size))
  return out
}
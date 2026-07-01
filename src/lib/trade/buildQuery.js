// Build an official PoE2 trade search query (POST /api/trade2/search/poe2/<league>) from a parsed
// item + the stats the user kept checked. Uniques search by name+base; rares search by base + the
// checked mods' real stat ids, each floored to Min %. Only mods we resolved to a real stat id are
// added — we never invent a filter.

// listedWithin (our keys) → the trade API's `indexed` option.
const INDEXED = { '3hours': '3hours', '12hours': '12hours', '1day': '1day', '3days': '3days', '1week': '1week', '1month': '1month' }

export function buildQuery(item, opts = {}) {
  const { checkedMods = [], minPct = 80, searchBy = 'base', saleType = 'both', listedWithin = 'any', online = true } = opts
  const query = { status: { option: online ? 'online' : 'any' } }

  if (searchBy === 'name' && item?.rarity === 'Unique' && item?.name) {
    // Name alone identifies the unique. Adding a base type that doesn't exactly match GGG's
    // vocabulary is a common "Invalid query" 400, so for name searches we omit it.
    query.name = item.name
  } else if (item?.baseType) {
    query.type = item.baseType
  }

  const filters = []
  for (const m of checkedMods) {
    if (!m?.statId) continue
    const f = { id: m.statId, disabled: false }
    const v = Array.isArray(m.values) && m.values.length ? Number(m.values[0]) : null
    if (v != null && !Number.isNaN(v)) f.value = { min: Math.max(1, Math.floor(v * (minPct / 100))) }
    filters.push(f)
  }
  if (filters.length) query.stats = [{ type: 'and', filters }]

  const trade = {}
  if (saleType === 'buyout') trade.sale_type = { option: 'priced' }
  if (INDEXED[listedWithin]) trade.indexed = { option: INDEXED[listedWithin] }
  if (Object.keys(trade).length) query.filters = { trade_filters: { filters: trade } }

  return { query, sort: { price: 'asc' } }
}

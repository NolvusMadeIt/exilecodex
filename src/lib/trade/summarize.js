// Turn the real trade listings (from /api/trade2/fetch) into a sell price: lowest / median /
// highest, computed in Exalted-equivalent from actual listed prices. No estimation — if there are
// no usable listings it returns count 0 and the UI says so. Display conversion (ex ↔ div, or the
// ex+div split) is applied separately by the panel.

// Convert a listed price to Exalted using known rates; unknown currencies are skipped (not guessed).
export function toExalted(amount, currency, rates) {
  if (typeof amount !== 'number' || amount <= 0) return null
  if (currency === 'exalted') return amount
  const r = rates?.[currency]
  return typeof r === 'number' && r > 0 ? amount * r : null
}

export function summarize(listings, { divinePrice = 0, rates = {} } = {}) {
  const all = { exalted: 1, divine: divinePrice, ...rates }
  const ex = []
  for (const l of listings || []) {
    const p = l?.listing?.price || l?.price
    if (!p) continue
    const v = toExalted(Number(p.amount), p.currency, all)
    if (v != null) ex.push(v)
  }
  if (!ex.length) return { count: 0, low: null, median: null, high: null, skipped: (listings || []).length }
  ex.sort((a, b) => a - b)
  const at = (q) => ex[Math.max(0, Math.min(ex.length - 1, Math.round(q * (ex.length - 1))))]
  return { count: ex.length, low: ex[0], median: at(0.5), high: ex[ex.length - 1], skipped: (listings || []).length - ex.length }
}

// Format an Exalted-equivalent value for display in the chosen currency. 'ex+div' shows ex for
// small amounts, divine once it's worth ≥ ~1 divine.
export function formatPrice(exValue, currency, divinePrice) {
  if (exValue == null) return '—'
  const round = (n) => (n >= 100 ? Math.round(n) : n >= 10 ? Math.round(n * 10) / 10 : Math.round(n * 100) / 100)
  if (currency === 'Divine Orb') return divinePrice > 0 ? `${round(exValue / divinePrice)} div` : '—'
  if (currency === 'ex+div') {
    return divinePrice > 0 && exValue >= divinePrice ? `${round(exValue / divinePrice)} div` : `${round(exValue)} ex`
  }
  return `${round(exValue)} ex` // Exalted (and as the base for Chaos/Annul until rate-converted)
}

// Maps a parsed item mod ("+85 to maximum Life") to the official trade STAT ID
// ("explicit.stat_3299347043") so the price-check can build a real trade search by mods.
// The stat catalogue (public/data/poe2/trade-stats.json) is GGG's own /api/trade2/data/stats,
// trimmed to { id, text, type }. Matching is exact on the normalized "#"-placeholder form — we
// never guess; a mod that doesn't match cleanly is returned null (shown, but not searched), so the
// price stays honest about what it actually filtered on.

// Normalize a mod / stat line to its placeholder form: numbers → "#", trim the GGG alternate-word
// brackets ("[Evasion|Evasion Rating]" → "Evasion Rating"), lowercase, collapse whitespace.
export function normalizeStatText(text) {
  return String(text || '')
    .replace(/\[([^\]|]*\|)?([^\]]*)\]/g, '$2')
    .replace(/[+\-]?\d+(?:\.\d+)?/g, '#')
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .trim()
}

// Build a lookup from normalized text → candidate entries (one text can exist as explicit/implicit/…).
export function buildStatIndex(entries = []) {
  const byNorm = new Map()
  for (const e of entries) {
    if (!e?.id || !e?.text) continue
    const k = normalizeStatText(e.text)
    if (!byNorm.has(k)) byNorm.set(k, [])
    byNorm.get(k).push({ id: e.id, type: e.type, text: e.text })
  }
  return byNorm
}

// Resolve one mod to a stat entry, preferring the catalogue type that matches the mod's kind.
export function matchStat(index, text, kind = 'explicit') {
  if (!index) return null
  const cands = index.get(normalizeStatText(text))
  if (!cands || !cands.length) return null
  const pref = kind === 'implicit' ? 'implicit' : kind === 'enchant' ? 'enchant' : kind === 'rune' ? 'rune' : 'explicit'
  return cands.find((c) => c.type === pref) || cands.find((c) => c.type === 'explicit') || cands[0]
}

// Runtime loader (browser/desktop): fetch + index the bundled catalogue once.
let _index = null
export async function loadStatIndex() {
  if (_index) return _index
  const res = await fetch('/data/poe2/trade-stats.json')
  if (!res.ok) throw new Error(`trade stats ${res.status}`)
  _index = buildStatIndex(await res.json())
  return _index
}

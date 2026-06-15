// Parse a Path of Exile 2 in-game item — the text you get from hovering an item and
// pressing Ctrl+C ("Copy Item") — into the fields a loot filter can actually target.
//
// Only the header fields drive a filter (Item Class, Rarity, Base Type, Item Level).
// Mods, requirements, sockets and flavor text are NOT filterable, so they're ignored.
// PoE2 filters also can't match a unique by its name — only by its base type — so a
// pasted unique resolves to its base (e.g. "Guiding Palm of the Mind" → "Shrine Sceptre").

// In-game Item Class → filter Class name, for the few that differ.
const CLASS_MAP = {
  'Stackable Currency': 'Currency',
}

const GEAR_RARITIES = ['Normal', 'Magic', 'Rare', 'Unique']

function field(lines, label) {
  const ln = lines.find((l) => l.trim().toLowerCase().startsWith(label.toLowerCase()))
  return ln ? ln.slice(ln.indexOf(':') + 1).trim() : ''
}

function normalizeRarity(r) {
  const s = (r || '').toLowerCase()
  return GEAR_RARITIES.find((x) => s.includes(x.toLowerCase())) || ''
}

// Resolve the base type from the header name lines, using the loaded catalog when present.
function resolveBaseType(nameLines, rarity, catalog) {
  if (!catalog?.baseTypes?.length) {
    // No catalog: rare/unique have a name line then a base line; others are name == base.
    if ((rarity === 'Rare' || rarity === 'Unique') && nameLines[1]) return nameLines[1]
    return nameLines[0] || ''
  }
  const baseSet = new Set(catalog.baseTypes.map((b) => b.name))
  // 1) a header line IS a known base type (Normal items, and the base line of rares/uniques)
  for (const ln of nameLines) if (baseSet.has(ln)) return ln
  // 2) a unique's display name → its base type
  if (rarity === 'Unique' && catalog.uniques?.length) {
    for (const ln of nameLines) {
      const u = catalog.uniques.find((x) => x.name === ln)
      if (u?.baseType) return u.baseType
    }
  }
  // 3) longest known base that appears inside a header line (magic items embed the base)
  let best = ''
  for (const b of catalog.baseTypes) {
    if (b.name.length <= best.length) continue
    if (nameLines.some((ln) => ln.includes(b.name))) best = b.name
  }
  if (best) return best
  // 4) fall back to the heuristic
  if ((rarity === 'Rare' || rarity === 'Unique') && nameLines[1]) return nameLines[1]
  return nameLines[0] || ''
}

export function parseGameItem(text, catalog = null) {
  if (!text || typeof text !== 'string') return null
  const raw = text.replace(/\r/g, '')
  const lines = raw.split('\n')

  // The first block (before the first "----" separator) holds Item Class, Rarity and the name.
  const firstBreak = lines.findIndex((l) => /^-{3,}$/.test(l.trim()))
  const head = (firstBreak === -1 ? lines : lines.slice(0, firstBreak)).map((l) => l.trim())

  const itemClassRaw = field(lines, 'Item Class:')
  const rarityRaw = field(lines, 'Rarity:')
  const rarity = normalizeRarity(rarityRaw)
  // Doesn't look like a copied item at all.
  if (!itemClassRaw && !rarityRaw) return null
  const itemClass = CLASS_MAP[itemClassRaw] || itemClassRaw

  // Name lines = header lines that aren't the labelled fields.
  const nameLines = head.filter((l) => l && !/^item class:/i.test(l) && !/^rarity:/i.test(l))
  const name = nameLines[0] || ''

  const intField = (label) => {
    const v = field(lines, label)
    const m = v.match(/-?\d+/)
    return m ? parseInt(m[0], 10) : null
  }
  const itemLevel = intField('Item Level:') || 0
  const quality = intField('Quality:') || 0
  const waystoneTier = intField('Waystone Tier:')
  const stackStr = field(lines, 'Stack Size:') // e.g. "3/10"
  const stackSize = stackStr ? parseInt(stackStr.replace(/,/g, ''), 10) || null : null
  // Sockets line lists socket letters/groups, e.g. "S S" or "S-S". Count the socket glyphs.
  const socketsStr = field(lines, 'Sockets:')
  const sockets = socketsStr ? (socketsStr.match(/[A-Za-z]/g) || []).length : null
  const corrupted = /(^|\n)\s*Corrupted\s*(\n|$)/i.test(raw)

  const baseType = resolveBaseType(nameLines, rarity, catalog)

  return {
    itemClass, itemClassRaw, rarity, rarityRaw, name, baseType,
    itemLevel, quality, sockets, stackSize, waystoneTier, corrupted,
  }
}

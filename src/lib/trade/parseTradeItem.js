// Parse a copied PoE2 item into the shape the Price Check plugin needs: the header fields
// (via the existing parseGameItem) PLUS the item's properties (armour / evasion / energy shield,
// or weapon DPS / crit / aps) and its mods (explicit / implicit / rune / enchant) with their
// numeric values. The mods are what the trade-search query is built from, so each one keeps its
// raw text, its kind, and the numbers we can later turn into a stat filter.
import { parseGameItem } from '../parseGameItem.js'

const SEP = /^-{3,}$/

// Split the copied text into the game's "----" separated sections.
function toBlocks(text) {
  const lines = String(text || '').replace(/\r/g, '').split('\n')
  const blocks = []
  let cur = []
  for (const l of lines) {
    if (SEP.test(l.trim())) { if (cur.length) blocks.push(cur); cur = [] }
    else cur.push(l)
  }
  if (cur.length) blocks.push(cur)
  return blocks
}

// "Key: value" property lines we care about → our field name.
const PROP_KEYS = {
  armour: 'armour', 'evasion rating': 'evasion', 'energy shield': 'energyShield', spirit: 'spirit',
  quality: 'quality', 'physical damage': 'physicalDamage', 'elemental damage': 'elementalDamage',
  'critical hit chance': 'critChance', 'attacks per second': 'attacksPerSecond',
}

const MOD_KINDS = [
  [/\(implicit\)/i, 'implicit'],
  [/\(rune\)/i, 'rune'],
  [/\(enchant(ed)?\)/i, 'enchant'],
  [/\(crafted\)/i, 'crafted'],
  [/\(fractured\)/i, 'fractured'],
]
const modKind = (line) => { for (const [re, k] of MOD_KINDS) if (re.test(line)) return k; return 'explicit' }

// Every number on a line, in order: "Adds 23 to 49 Cold Damage" → [23, 49].
const valuesOf = (line) => (String(line).match(/-?\d+(?:\.\d+)?/g) || []).map(Number)

const STAT_WORDS = /(increased|reduced|more|less|adds?|gain|regenerate|leech|resistance|maximum|minimum|chance|damage|speed|critical|life|mana|energy shield|spirit|level of|attributes?|strength|dexterity|intelligence|rarity|per\b)/i

// A mod line (a stat) vs a property label, requirement, socket line, or unique flavour text.
function looksLikeMod(line) {
  const t = line.trim()
  if (!t) return false
  if (/:/.test(t)) return false
  if (/^(Requirements|Sockets|Item Level|Level\b|Corrupted|Mirrored|Split|Unidentified|Note)/i.test(t)) return false
  return /\d/.test(t) || STAT_WORDS.test(t)
}

const WEAPON = new Set(['Bows', 'Crossbows', 'Quarterstaves', 'Spears', 'Sceptres', 'Wands', 'Staves', 'One Hand Maces', 'Two Hand Maces', 'Foci', 'Quivers'])
const ARMOUR = new Set(['Body Armours', 'Helmets', 'Gloves', 'Boots', 'Shields', 'Bucklers'])
const JEWELLERY = new Set(['Rings', 'Amulets', 'Belts'])
function categoryOf(cls = '') {
  if (WEAPON.has(cls)) return 'weapon'
  if (ARMOUR.has(cls)) return 'armour'
  if (JEWELLERY.has(cls)) return 'jewellery'
  if (/Flask/i.test(cls)) return 'flask'
  if (/Jewel/i.test(cls)) return 'jewel'
  if (/Currency/i.test(cls)) return 'currency'
  return 'other'
}

export function parseTradeItem(text, catalog = null) {
  const base = parseGameItem(text, catalog)
  if (!base) return null
  const blocks = toBlocks(text)

  // Properties — scan every block for the "Key: value" lines we recognise.
  const properties = {}
  for (const block of blocks) {
    for (const l of block) {
      const m = l.match(/^([A-Za-z ]+):\s*(.+)$/)
      if (!m) continue
      const key = PROP_KEYS[m[1].trim().toLowerCase()]
      if (!key) continue
      const nums = valuesOf(m[2])
      if (nums.length) properties[key] = nums.length === 1 ? nums[0] : nums
    }
  }

  // Mods — the blocks AFTER the "Item Level" line whose lines read like stats.
  const ilvlIdx = blocks.findIndex(b => b.some(l => /^Item Level:/i.test(l.trim())))
  const modBlocks = ilvlIdx >= 0 ? blocks.slice(ilvlIdx + 1) : []
  const mods = []
  for (const block of modBlocks) {
    for (const l of block) {
      if (!looksLikeMod(l)) continue
      const cleaned = l.trim().replace(/\s*\((implicit|rune|enchant(ed)?|crafted|fractured)\)\s*$/i, '').trim()
      mods.push({ text: cleaned, kind: modKind(l), values: valuesOf(l) })
    }
  }

  return { ...base, category: categoryOf(base.itemClass), properties, mods }
}

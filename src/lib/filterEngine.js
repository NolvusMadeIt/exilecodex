// A lightweight PoE2 filter evaluator. Given the generated filter text and a structured
// item, it decides — exactly as the game would, first-match-wins — whether the item shows
// or hides, with what style, and which rule was responsible.
//
// It understands every condition our generator emits (Class, BaseType, Rarity, ItemLevel,
// Quality, Sockets, WaystoneTier, GemLevel, StackSize, Corrupted). A block containing a
// condition we can't evaluate (e.g. exotic free-text) is skipped rather than guessed, so a
// verdict is never falsely confident.

const STYLE_KINDS = new Set([
  'SetTextColor', 'SetBackgroundColor', 'SetBorderColor', 'SetFontSize',
  'PlayEffect', 'MinimapIcon', 'PlayAlertSound', 'PlayAlertSoundPositional',
  'CustomAlertSound', 'CustomAlertSoundOptional', 'DisableDropSound', 'EnableDropSound',
])

const RARITY_RANK = { Normal: 0, Magic: 1, Rare: 2, Unique: 3 }

// Condition kind -> the item field it compares against (numeric conditions).
const NUM_FIELD = {
  ItemLevel: 'itemLevel', Quality: 'quality', Sockets: 'sockets',
  WaystoneTier: 'waystoneTier', MapTier: 'waystoneTier', GemLevel: 'gemLevel',
  StackSize: 'stackSize', AreaLevel: 'areaLevel',
}

function tokenize(rest) {
  const out = []; const re = /"([^"]*)"|(\S+)/g; let m
  while ((m = re.exec(rest))) out.push(m[1] !== undefined ? m[1] : m[2])
  return out
}

function compareNum(op, a, b) {
  if (a == null || isNaN(a) || isNaN(b)) return false
  switch (op) {
    case '>=': return a >= b
    case '<=': return a <= b
    case '>': return a > b
    case '<': return a < b
    default: return a === b // '==' or bare
  }
}

// Parse filter text into ordered Show/Hide blocks, each with conditions + a resolved style.
export function parseFilterBlocks(text) {
  const lines = (text || '').replace(/\r/g, '').split('\n')
  const blocks = []
  let cur = null
  const flush = () => { if (cur) blocks.push(cur) }

  for (const raw of lines) {
    const t = raw.trim()
    if (!t || t.startsWith('#') && !/^(Show|Hide)\b/.test(t)) {
      // blank line or pure comment / banner — ignore (the action line carries the # comment)
      if (!t) continue
      if (t.startsWith('#')) continue
    }
    const headMatch = t.match(/^(Show|Hide)\b(.*)$/)
    if (headMatch) {
      flush()
      const cm = headMatch[2].match(/#\s*(.*)$/)
      cur = { action: headMatch[1], comment: cm ? cm[1].trim() : '', conditions: [], styles: {} }
      continue
    }
    if (!cur || t.startsWith('#')) continue
    const m = t.match(/^(\w+)\s*(>=|<=|==|!=|>|<)?\s*(.*)$/)
    if (!m) continue
    const kind = m[1], op = m[2] || '', rest = (m[3] || '').trim()
    if (STYLE_KINDS.has(kind)) applyStyle(cur.styles, kind, rest)
    else cur.conditions.push({ kind, op, rest })
  }
  flush()
  return blocks
}

function applyStyle(styles, kind, rest) {
  const t = tokenize(rest)
  switch (kind) {
    case 'SetTextColor': styles.textColor = t.slice(0, 3).map(Number); break
    case 'SetBackgroundColor': styles.bgColor = t.slice(0, 3).map(Number); break
    case 'SetBorderColor': styles.borderColor = t.slice(0, 3).map(Number); break
    case 'SetFontSize': styles.fontSize = Number(t[0]) || undefined; break
    case 'PlayEffect': styles.beam = t[0]; break
    case 'MinimapIcon': styles.minimap = t[1]; styles.shape = t[2]; break
    case 'PlayAlertSound':
    case 'PlayAlertSoundPositional': styles.sound = t[0]; styles.volume = Number(t[1]) || undefined; break
    case 'CustomAlertSound':
    case 'CustomAlertSoundOptional': styles.customSound = t[0]; break
    case 'DisableDropSound': styles.muted = true; break
    default: break
  }
}

// true | false | 'unknown'
function conditionMatches(c, item) {
  const vals = tokenize(c.rest)
  switch (c.kind) {
    case 'Class': {
      const fields = [item.itemClass, item.itemClassRaw].filter(Boolean).map((s) => s.toLowerCase())
      if (!fields.length) return false
      if (c.op === '==') return vals.some((v) => fields.includes(v.toLowerCase()))
      return vals.some((v) => fields.some((f) => f.includes(v.toLowerCase()))) // bare = contains
    }
    case 'BaseType': {
      const bt = (item.baseType || '').toLowerCase()
      if (!bt) return false
      if (c.op === '==') return vals.some((v) => bt === v.toLowerCase())
      return vals.some((v) => bt.includes(v.toLowerCase())) // bare = contains
    }
    case 'Rarity': {
      const r = item.rarity || 'Normal'
      if (['>=', '<=', '>', '<'].includes(c.op)) {
        if (RARITY_RANK[r] == null || RARITY_RANK[vals[0]] == null) return false
        return compareNum(c.op, RARITY_RANK[r], RARITY_RANK[vals[0]])
      }
      return vals.includes(r) // list / exact
    }
    case 'Corrupted': {
      const want = !vals.length || /true/i.test(vals[0])
      return !!item.corrupted === want
    }
    default: {
      const field = NUM_FIELD[c.kind]
      if (!field) return 'unknown'
      if (item[field] == null) return false
      return compareNum(c.op || '==', Number(item[field]), Number(vals[0]))
    }
  }
}

function blockMatches(b, item) {
  for (const c of b.conditions) {
    if (conditionMatches(c, item) !== true) return false // false or 'unknown' both disqualify
  }
  return true
}

const DEFAULT_VERDICT = { action: 'Show', comment: '', styles: {}, matched: false, default: true }

// Walk blocks top-down; the first whose conditions ALL match wins (first-match-wins).
// Returns { action, comment, styles, index, matched } or a default-show verdict.
export function evaluateItem(blocks, item) {
  for (let i = 0; i < blocks.length; i++) {
    if (blockMatches(blocks[i], item)) {
      const b = blocks[i]
      return { action: b.action, comment: b.comment, styles: b.styles, index: i, matched: true }
    }
  }
  // PoE2 shows anything no rule matched, with default styling.
  return { ...DEFAULT_VERDICT }
}

// Like evaluateItem, but returns EVERY rule the item matched (in filter order) plus the
// winning verdict — so the UI can explain "your item matched these rules; the first wins".
export function explainItem(blocks, item) {
  const matches = []
  for (let i = 0; i < blocks.length; i++) {
    if (blockMatches(blocks[i], item)) {
      const b = blocks[i]
      matches.push({ index: i, action: b.action, comment: b.comment, styles: b.styles })
    }
  }
  const verdict = matches[0] ? { ...matches[0], matched: true } : { ...DEFAULT_VERDICT }
  return { verdict, matches }
}

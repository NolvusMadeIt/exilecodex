// Parse any standard PoE2 .filter file into editable customRules +
// raw "freeText" buckets for sections we don't model as structured rules.
//
// The PoE filter format is simple: Show/Hide block, then indented condition + style
// lines, separated by blank lines. We support every common directive — anything we
// don't recognise we preserve verbatim so the round-trip never silently drops user data.

const STYLE_TAGS = new Set([
  'SetTextColor', 'SetBackgroundColor', 'SetBorderColor', 'SetFontSize',
  'PlayEffect', 'MinimapIcon', 'PlayAlertSound', 'PlayAlertSoundPositional',
  'CustomAlertSound', 'CustomAlertSoundOptional', 'DisableDropSound', 'EnableDropSound',
  'Continue',
])

const COND_TAGS = new Set([
  'Class', 'BaseType', 'Rarity', 'ItemLevel', 'DropLevel', 'Quality', 'Sockets',
  'LinkedSockets', 'SocketGroup', 'Height', 'Width', 'HasInfluence', 'HasExplicitMod',
  'HasImplicitMod', 'HasEnchantment', 'StackSize', 'GemLevel', 'GemQualityType',
  'MapTier', 'WaystoneTier', 'AreaLevel', 'Identified', 'Corrupted', 'Mirrored',
  'ShaperItem', 'ElderItem', 'FracturedItem', 'SynthesisedItem', 'AnyEnchantment',
  'BlightedMap', 'UberBlightedMap', 'HasEaterOfWorldsImplicit', 'HasSearingExarchImplicit',
  'Replica', 'AlternateQuality', 'Scourged', 'EnchantmentPassiveNum', 'EnchantmentPassiveNode',
  'ArchnemesisMod', 'TransfiguredGem',
])

// Parse one quoted/unquoted token list, e.g. `Class == "Currency" "Stackable Currency"`
function splitTokens(rest) {
  const out = []
  const re = /"([^"]*)"|(\S+)/g
  let m
  while ((m = re.exec(rest))) out.push(m[1] !== undefined ? m[1] : m[2])
  return out
}

function parseValueLine(line) {
  // Returns { kind, op, value, hadExplicitOp }
  const trimmed = line.trim()
  const m = trimmed.match(/^(\w+)\s*(>=|<=|==|!=|>|<)?\s*(.*)$/)
  if (!m) return null
  const kind = m[1]
  const hadExplicitOp = !!m[2]
  const op = m[2] || '='
  const raw = (m[3] || '').trim()
  if (!raw) return { kind, op, hadExplicitOp, value: true }
  const tokens = splitTokens(raw)
  const nums = tokens.map(t => Number(t))
  if (nums.length && nums.every(n => !isNaN(n))) {
    return { kind, op, hadExplicitOp, value: nums.length === 1 ? nums[0] : nums }
  }
  return { kind, op, hadExplicitOp, value: tokens.length === 1 ? tokens[0] : tokens }
}

// Map a parsed Show/Hide block into one of our customRule shapes when possible.
function ruleFromBlock(block, idx) {
  const rule = {
    id: 'imp-' + Date.now().toString(36) + '-' + idx + Math.random().toString(36).slice(2, 5),
    enabled: true,
    action: block.action,           // Show | Hide
    classes: [],
    baseTypes: [],
    rarityOp: '>=',
    rarity: 'Any',
    dropTier: block.action === 'Hide' ? 'F' : 'E',
    itemLevelOp: '>=',
    itemLevel: 0,
    comment: block.comment || `Imported rule ${idx + 1}`,
    baseTypePrefix: false,
    raw: block.raw,                  // verbatim for round-tripping any extras we ignore
  }
  for (const c of block.conditions) {
    if (c.kind === 'Class') rule.classes = Array.isArray(c.value) ? c.value : [c.value]
    else if (c.kind === 'BaseType') {
      rule.baseTypes = Array.isArray(c.value) ? c.value : [c.value]
      // "BaseType Legacy of" (no operator) is a prefix match — not an exact base type name.
      rule.baseTypePrefix = !c.hadExplicitOp
    } else if (c.kind === 'Rarity') {
      rule.rarityOp = c.op === '=' ? '==' : c.op
      rule.rarity = Array.isArray(c.value) ? c.value[0] : String(c.value)
    } else if (c.kind === 'ItemLevel') {
      rule.itemLevelOp = c.op === '=' ? '==' : c.op
      rule.itemLevel = Array.isArray(c.value) ? c.value[0] : Number(c.value) || 0
    }
  }
  return rule
}

/**
 * parseFilterText(text) -> { customRules, freeTextTop, freeTextBottom, meta, blocks }
 * Strategy: split on blank lines into blocks. Each block is either
 *   - a header comment block (no Show/Hide)  -> captured as freeTextTop/meta
 *   - a Show/Hide rule block                  -> converted to a customRule
 *   - anything else                           -> appended to freeTextBottom
 */
export function parseFilterText(text) {
  if (!text || !text.trim()) return { customRules: [], freeTextTop: '', freeTextBottom: '', meta: {} }
  const lines = text.replace(/\r/g, '').split('\n')

  const blocks = []
  let cur = []
  for (const line of lines) {
    if (line.trim() === '') {
      if (cur.length) { blocks.push(cur); cur = [] }
    } else {
      cur.push(line)
    }
  }
  if (cur.length) blocks.push(cur)

  const meta = {}
  const customRules = []
  const freeTextTop = []
  const freeTextBottom = []
  let sawAnyRule = false

  for (let i = 0; i < blocks.length; i++) {
    const block = blocks[i]
    const firstNonComment = block.find(l => l.trim() && !l.trim().startsWith('#'))
    const head = firstNonComment?.trim() || ''

    if (head === 'Show' || head === 'Hide' || head.startsWith('Show ') || head.startsWith('Hide ') ||
        head === 'Minimal' || head === 'Continue') {
      // Capture leading comment as the rule's name
      const commentLines = []
      let action = null
      const conditions = []
      const style = []
      const rest = []
      for (const l of block) {
        const t = l.trim()
        if (!action && (t === 'Show' || t === 'Hide' || t.startsWith('Show ') || t.startsWith('Hide ') || t === 'Minimal')) {
          action = t.startsWith('Hide') ? 'Hide' : 'Show'
          // Trailing `# comment` on the same line, if any
          const cm = l.match(/#\s*(.*)$/)
          if (cm) commentLines.push(cm[1])
          continue
        }
        if (!action && t.startsWith('#')) { commentLines.push(t.replace(/^#\s?/, '')); continue }
        if (!action) { rest.push(l); continue }
        if (t.startsWith('#')) { commentLines.push(t.replace(/^#\s?/, '')); continue }
        const tag = (t.match(/^(\w+)/) || [])[1] || ''
        if (COND_TAGS.has(tag)) { const p = parseValueLine(t); if (p) conditions.push(p); else rest.push(l) }
        else if (STYLE_TAGS.has(tag)) style.push(l)
        else rest.push(l)
      }
      if (action) {
        sawAnyRule = true
        const ruleBlock = { action, conditions, style, raw: block.join('\n'), comment: commentLines[0] || '' }
        customRules.push(ruleFromBlock(ruleBlock, customRules.length))
      } else {
        ;(sawAnyRule ? freeTextBottom : freeTextTop).push(block.join('\n'))
      }
    } else if (block.every(l => l.trim().startsWith('#'))) {
      // Pure-comment block — early ones may carry filter meta (League:, Version:, etc.)
      for (const l of block) {
        const m = l.replace(/^#+\s?/, '').match(/^([A-Za-z ][A-Za-z ]+):\s*(.+)$/)
        if (m) meta[m[1].toLowerCase().replace(/\s+/g, '_')] = m[2].trim()
      }
      if (!sawAnyRule) freeTextTop.push(block.join('\n'))
      else freeTextBottom.push(block.join('\n'))
    } else {
      // Non-rule, non-comment — preserve verbatim
      ;(sawAnyRule ? freeTextBottom : freeTextTop).push(block.join('\n'))
    }
  }

  return {
    customRules,
    freeTextTop: freeTextTop.join('\n\n').trim(),
    freeTextBottom: freeTextBottom.join('\n\n').trim(),
    meta,
  }
}

// Convert parsed rules (ruleFromBlock shape) into Quick Editor override rules, so an imported
// filter shows up in the hide/highlight builder. `raw` is kept so the rule round-trips exactly
// (the builder renders raw rules read-only; the override compiler emits them verbatim).
export function rulesToOverrideRules(rules = []) {
  return rules.map((r, i) => ({
    id: 'ov' + Date.now().toString(36) + i + Math.random().toString(36).slice(2, 5),
    enabled: r.enabled !== false,
    action: r.action === 'Hide' ? 'Hide' : 'Show',
    label: r.comment || `Imported rule ${i + 1}`,
    raw: r.raw?.trim() || undefined,
    match: {
      classes: r.classes || [],
      baseType: (r.baseTypes || []).join(', '),
      baseMode: r.baseTypePrefix ? 'contains' : 'exact',
      rarity: r.rarity && r.rarity !== 'Any' ? r.rarity : '',
      rarityOp: r.rarityOp === '==' ? '=' : (r.rarityOp || '<='),
      itemLevel: r.itemLevel || '',
      itemLevelOp: r.itemLevelOp || '>=',
    },
    style: null,
  }))
}

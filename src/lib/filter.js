export function rulesToFilterText(rules, name = 'My Filter') {
  const lines = []
  lines.push(`# ${name}`)
  lines.push('# Created with NolvusFilter')
  lines.push('')

  const enabledRules = rules.filter(r => r.enabled)

  enabledRules.forEach((rule, idx) => {
    if (rule.comment) lines.push(`# ${rule.comment}`)
    lines.push(rule.action)

    ;(rule.conditions || []).forEach(c => {
      let valStr
      if (Array.isArray(c.value)) {
        valStr = c.value.map(v => `"${v}"`).join(' ')
      } else if (typeof c.value === 'string') {
        valStr = `"${c.value}"`
      } else {
        valStr = String(c.value)
      }
      const op = c.op || (Array.isArray(c.value) || c.kind === 'Rarity' ? '==' : '>=')
      if (c.kind === 'Rarity' && Array.isArray(c.value)) {
        lines.push(`\t${c.kind} ${c.value.join(' ')}`)
      } else {
        lines.push(`\t${c.kind} ${op} ${valStr}`)
      }
    })

    const v = rule.visuals || {}
    if (v.textColor && v.textColor.length) lines.push(`\tSetTextColor ${v.textColor.slice(0,4).join(' ')}`)
    if (v.bgColor && v.bgColor.length) lines.push(`\tSetBackgroundColor ${v.bgColor.slice(0,4).join(' ')}`)
    if (v.borderColor && v.borderColor.length) lines.push(`\tSetBorderColor ${v.borderColor.slice(0,4).join(' ')}`)
    if (v.fontSize) lines.push(`\tSetFontSize ${v.fontSize}`)
    if (v.beam && v.beam.color) {
      const tmp = v.beam.temporary ? ' Temp' : ''
      lines.push(`\tPlayEffect ${v.beam.color}${tmp}`)
    }
    if (v.minimap && v.minimap.color && v.minimap.shape) {
      const sz = v.minimap.size != null ? v.minimap.size : 0
      lines.push(`\tMinimapIcon ${sz} ${v.minimap.color} ${v.minimap.shape}`)
    }
    if (v.sound && v.sound.id != null) {
      const vol = v.sound.volume != null ? v.sound.volume : 300
      lines.push(`\tPlayAlertSound ${v.sound.id} ${vol}`)
    }
    if (idx < enabledRules.length - 1) lines.push('')
  })

  return lines.join('\n') + '\n'
}

export function parseFilterText(text) {
  if (!text || !text.trim()) return []
  const rules = []
  const rawLines = text.replace(/\r/g, '').split('\n')
  let current = null

  const pushCurrent = () => { if (current) { rules.push(current); current = null } }

  for (let line of rawLines) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue
    if (trimmed === 'Show' || trimmed === 'Hide') {
      pushCurrent()
      current = { id: 'imp-' + Date.now() + Math.random().toString(36).slice(2), enabled: true, action: trimmed, conditions: [], visuals: {} }
      continue
    }
    if (!current) continue
    const m = trimmed.match(/^(\w+)\s*(>=|<=|==|>|<|=)?\s*(.+)$/)
    if (!m) continue
    const kind = m[1]
    const op = m[2] || '>='
    let rest = m[3].trim()
    let value
    if (kind === 'Rarity') {
      value = rest.split(/\s+/).filter(Boolean)
    } else if (rest.includes('"')) {
      value = rest.match(/"([^"]+)"/g)?.map(s => s.replace(/"/g, '')) || rest
    } else {
      const n = Number(rest)
      value = isNaN(n) ? rest : n
    }
    if (['Class', 'BaseType', 'Rarity', 'ItemLevel', 'StackSize', 'Quality', 'WaystoneTier'].includes(kind)) {
      current.conditions.push({ kind, op, value })
    } else if (kind === 'SetTextColor') {
      current.visuals.textColor = rest.split(/\s+/).map(Number).filter(n => !isNaN(n))
    } else if (kind === 'SetBackgroundColor') {
      current.visuals.bgColor = rest.split(/\s+/).map(Number).filter(n => !isNaN(n))
    } else if (kind === 'SetBorderColor') {
      current.visuals.borderColor = rest.split(/\s+/).map(Number).filter(n => !isNaN(n))
    } else if (kind === 'SetFontSize') {
      current.visuals.fontSize = Number(rest)
    } else if (kind === 'PlayEffect') {
      const parts = rest.split(/\s+/)
      current.visuals.beam = { color: parts[0], temporary: parts[1] === 'Temp' }
    } else if (kind === 'MinimapIcon') {
      const parts = rest.split(/\s+/)
      current.visuals.minimap = { size: Number(parts[0]) || 0, color: parts[1], shape: parts[2] }
    } else if (kind === 'PlayAlertSound') {
      const parts = rest.split(/\s+/)
      current.visuals.sound = { id: Number(parts[0]) || 1, volume: Number(parts[1]) || 300 }
    }
  }
  pushCurrent()
  return rules
}

export function createEmptyRule(overrides = {}) {
  return {
    id: 'r' + Date.now().toString(36) + Math.random().toString(36).slice(2),
    enabled: true,
    action: 'Show',
    conditions: [],
    visuals: { textColor: [220, 220, 220], fontSize: 32 },
    ...overrides
  }
}

import React, { useEffect, useMemo, useState } from 'react'
import { ChevronDown, ChevronRight, ChevronsDownUp, ChevronsUpDown, Plus, Trash2, Eye, EyeOff } from 'lucide-react'
import { useFilter } from '../store/FilterStore.jsx'
import { usePrefs } from '../store/Prefs.jsx'
import { emptyOverrideRule } from '../store/defaultSettings.js'
import { SECTIONS, TIERS, CLASS_GROUPS } from '../data/quickFilters.js'
import { CLASSES, iconFor } from '../data/items.js'
import { Toggle, Help } from '../components/primitives.jsx'
import { ItemDropdown } from '../components/ItemDropdown.jsx'
import { useCatalog } from '../lib/catalog.js'
import { MultiSelect } from '../components/MultiSelect.jsx'
import { SimpleSelect } from '../components/SimpleSelect.jsx'
import {
  ALL_CLASSES, RARITIES, RARITY_OPS, NUM_OPS, HIGHLIGHT_PRESETS, presetIdForStyle, highlightPreset,
} from '../data/quickEditor.js'
import { useT } from '../i18n/index.js'

/* =========================== Dropdown Quick Filters =========================== */

const classOptions = (group) => CLASS_GROUPS[group].map(name => {
  const c = CLASSES.find(c => c.name === name)
  return { name, icon: iconFor(c?.cat) }
})

const ctrlActive = (c, qf) => {
  const v = qf[c.key]
  if (c.control === 'multi' || c.control === 'classItems') return Array.isArray(v) && v.length > 0
  if (c.control === 'select') return v && v !== 'all'
  if (c.control === 'number') return v > 0
  if (c.control === 'toggle') return !!v
  if (c.control === 'areaRange') return qf[c.minKey] > 0 || qf[c.maxKey] > 0
  return false
}
function rowsActive(rows, qf) {
  let n = 0
  for (const r of rows) {
    if (r.controls || r.enable !== undefined) {
      // enable-toggle row counts when on; control-only row counts when any control is non-default
      if (r.enable !== false) { if (qf[r.key]) n++ }
      else if (r.controls && r.controls.some(c => ctrlActive(c, qf))) n++
      continue
    }
    const v = qf[r.key]
    if (r.control === 'toggle' && v) n++
    else if ((r.control === 'classItems' || r.control === 'multi') && Array.isArray(v) && v.length) n++
    else if (r.control === 'select' && v && v !== 'all') n++
    else if (r.control === 'number' && v > 0 && v !== r.min) n++
  }
  return n
}
const sectionRows = (section) => section.groups ? section.groups.flatMap(g => g.rows) : section.rows
function activeCount(section, qf) { return rowsActive(sectionRows(section), qf) }

// Roughly how tall a section is when expanded (rows + a line per group/section header).
const sectionWeight = (s) => s.groups ? 1 + s.groups.reduce((n, g) => n + 1 + g.rows.length, 0) : 1 + (s.rows?.length || 0)
// Split the sections into two columns whose total weights are as equal as possible (brute force —
// only a handful of sections). Each column keeps reading order; we tie-break toward an even count
// so neither column is lopsided when everything is collapsed (headers are ~equal height).
function balancedColumns(sections) {
  const w = sections.map(sectionWeight)
  const total = w.reduce((a, b) => a + b, 0)
  const n = sections.length
  // Score each split: minimize height diff, then keep the first section (Campaign) in the left
  // column, then prefer an even section count. Bit i set ⇒ section i goes to the left column.
  let best = null
  for (let mask = 1; mask < (1 << n) - 1; mask++) {
    let s = 0, cnt = 0
    for (let i = 0; i < n; i++) if (mask & (1 << i)) { s += w[i]; cnt++ }
    const score = [Math.abs(s - (total - s)), (mask & 1) ? 0 : 1, Math.abs(cnt - (n - cnt))]
    const better = !best || score[0] < best[0]
      || (score[0] === best[0] && (score[1] < best[1] || (score[1] === best[1] && score[2] < best[2])))
    if (better) best = score, best.mask = mask
  }
  const A = [], B = []
  for (let i = 0; i < n; i++) ((best.mask >> i) & 1 ? A : B).push(sections[i])
  return [A, B]
}
const [COL_A, COL_B] = balancedColumns(SECTIONS)

// One inline control inside a grouped rule-row (poe2filter style: a row can carry several).
function Control({ c, qf, setQF }) {
  const v = qf[c.key]
  if (c.control === 'toggle') return <Toggle checked={!!v} onChange={val => setQF(c.key, val)} label={c.label} />
  if (c.control === 'number') return (
    <span className="flex items-center gap-1">
      {c.label && <span className="text-[11.5px] text-poe-text whitespace-nowrap">{c.label}</span>}
      <input type="number" min={c.min} max={c.max} value={v ?? ''}
        onChange={e => setQF(c.key, Math.max(c.min ?? 0, Number(e.target.value) || 0))} className="field h-7 w-14" />
      {c.suffix && <span className="text-[11px] text-poe-text">{c.suffix}</span>}
    </span>
  )
  if (c.control === 'select') return <SimpleSelect value={v} onChange={val => setQF(c.key, val)} className={c.width || 'w-32'} options={c.options} />
  if (c.control === 'multi') return <MultiSelect options={c.options} value={v || []} onChange={val => setQF(c.key, val)} allLabel={c.allLabel || 'Off'} width={210} />
  if (c.control === 'classItems') return <ItemDropdown options={classOptions(c.group)} value={v || []} onChange={val => setQF(c.key, val)} allLabel={c.allLabel || 'All'} width={200} />
  if (c.control === 'areaRange') return (
    <span className="flex items-center gap-1.5">
      <span className="text-[11.5px] text-poe-text whitespace-nowrap">{c.label || 'Between Area Levels'}</span>
      <input type="number" min={0} max={100} value={qf[c.minKey] ?? ''} placeholder="min"
        onChange={e => setQF(c.minKey, Math.max(0, Number(e.target.value) || 0))} className="field h-7 w-14" />
      <span className="text-poe-text">–</span>
      <input type="number" min={0} max={100} value={qf[c.maxKey] ?? ''} placeholder="max"
        onChange={e => setQF(c.maxKey, Math.max(0, Number(e.target.value) || 0))} className="field h-7 w-14" />
    </span>
  )
  return null
}

// Defined at module scope so quick-filter edits never remount the tree (which would collapse dropdowns).
function Row({ row, qf, setQF }) {
  // Grouped rule-row: enable checkbox (unless enable:false) + label + any inline controls.
  // Triggered for every row that opts into the grouped shape (has `controls` and/or `enable`),
  // including simple toggle-only rows that carry just an `enable` + `key`.
  if (row.controls || row.enable !== undefined) {
    return (
      <div className="flex flex-wrap items-center gap-2 min-h-[30px] py-0.5">
        {row.enable !== false && <Toggle checked={!!qf[row.key]} onChange={val => setQF(row.key, val)} />}
        <span className="text-[13px] text-poe-text-bright flex items-center gap-1.5 flex-1 min-w-[150px]">{row.label} {row.help && <Help text={row.help} />}</span>
        {row.controls && (
          <div className="flex items-center gap-2 flex-wrap justify-end">
            {row.controls.map((c, i) => <Control key={i} c={c} qf={qf} setQF={setQF} />)}
          </div>
        )}
      </div>
    )
  }
  const v = qf[row.key]
  return (
    <div className="flex items-center gap-2 min-h-[28px]">
      {row.control === 'toggle' && (
        <Toggle checked={!!v} onChange={val => setQF(row.key, val)} label={row.label} help={row.help} />
      )}
      {row.control !== 'toggle' && (
        <>
          <span className="text-[13px] text-poe-text-bright flex items-center gap-1.5 min-w-[180px]">{row.label} <Help text={row.help} /></span>
          {row.control === 'number' && (
            <div className="flex items-center gap-1">
              <input type="number" min={row.min} max={row.max} value={v}
                onChange={e => setQF(row.key, Math.max(row.min ?? 0, Number(e.target.value) || 0))}
                className="field h-7 w-16" />
              {row.suffix && <span className="text-[11px] text-poe-text">{row.suffix}</span>}
            </div>
          )}
          {row.control === 'select' && (
            <SimpleSelect value={v} onChange={val => setQF(row.key, val)} className="w-36" options={row.options} />
          )}
          {row.control === 'multi' && (
            <MultiSelect options={row.options} value={v || []} onChange={val => setQF(row.key, val)}
              allLabel={row.allLabel || 'Off'} width={230} />
          )}
          {row.control === 'classItems' && (
            <ItemDropdown options={classOptions(row.group)} value={v || []} onChange={val => setQF(row.key, val)}
              allLabel="None selected" width={230} />
          )}
        </>
      )}
    </div>
  )
}

function Section({ section, open, count, onToggle, qf, setQF }) {
  const t = useT()
  return (
    <div className="panel">
      <button onClick={() => onToggle(section.id)} className="w-full flex items-center gap-2 px-3 py-2 hover:bg-white/[0.03]">
        {open ? <ChevronDown size={15} className="text-poe-gold-dim" /> : <ChevronRight size={15} className="text-poe-gold-dim" />}
        <span className="gold-heading text-[15px] flex-1 text-left">{t(section.title)}</span>
        <span className="text-[11px] text-poe-text">{count} {t('active')}</span>
      </button>
      {open && (
        <div className="px-3 pb-2 pt-1 border-t border-poe-line space-y-2">
          {section.groups
            ? section.groups.map(g => (
              <div key={g.id} className="rounded border border-poe-line/70 bg-black/30">
                <div className="flex items-center gap-2 px-2.5 py-1.5 border-b border-poe-line/60">
                  <span className="text-[12.5px] font-medium text-poe-heading flex-1 flex items-center gap-1.5">{t(g.title)} {g.help && <Help text={g.help} />}</span>
                  <span className="text-[10.5px] text-poe-text">{rowsActive(g.rows, qf)} {t('active')}</span>
                </div>
                <div className="px-2.5 py-1.5 space-y-1">
                  {g.rows.map(r => <Row key={r.key || r.label} row={r} qf={qf} setQF={setQF} />)}
                </div>
              </div>
            ))
            : section.rows.map(r => <Row key={r.key || r.label} row={r} qf={qf} setQF={setQF} />)}
        </div>
      )}
    </div>
  )
}

/* =========================== Hide / highlight rule builder =========================== */

const CLASS_OPTS = ALL_CLASSES.map(c => ({ value: c, label: c }))
const rarityOpts = [{ value: '', label: 'Any rarity' }, ...RARITIES.map(r => ({ value: r, label: r }))]
const baseModeOpts = [{ value: 'contains', label: 'contains' }, { value: 'exact', label: 'exact match' }]
const rgba = (c) => c ? `rgba(${c[0]},${c[1]},${c[2]},${(c[3] ?? 255) / 255})` : 'transparent'
const splitBaseType = (s) => String(s || '').split(',').map(x => x.trim()).filter(Boolean)

function NumCond({ label, field, opField, ops = NUM_OPS, value, onChange, min = 0, max = 100000 }) {
  return (
    <div className="flex items-center gap-1.5">
      <span className="text-[12px] text-poe-text min-w-[88px]">{label}</span>
      <SimpleSelect className="w-28" value={value[opField] || ops[0].value} onChange={v => onChange({ [opField]: v })} options={ops} />
      <input type="number" min={min} max={max} value={value[field] ?? ''} placeholder="—"
        onChange={e => onChange({ [field]: e.target.value })} className="field h-7 w-20" />
    </div>
  )
}

function RuleCard({ rule, onPatch, onPatchMatch, onRemove, baseOptions }) {
  const [adv, setAdv] = React.useState(false)
  const m = rule.match || {}
  const isShow = rule.action === 'Show'
  const presetId = presetIdForStyle(rule.style)
  const raw = rule.raw?.trim()

  return (
    <div className="rounded border border-poe-line bg-black/40">
      <div className="flex items-center gap-2 px-2.5 py-1.5 border-b border-poe-line/70">
        <button
          onClick={() => onPatch({ action: isShow ? 'Hide' : 'Show', style: isShow ? null : (rule.style || highlightPreset('red').style) })}
          title="Switch between hide and highlight"
          className={`inline-flex items-center gap-1 rounded px-2 h-7 text-[11px] border ${isShow ? 'border-emerald-500/50 text-emerald-300' : 'border-poe-danger/50 text-poe-danger'}`}>
          {isShow ? <Eye size={13} /> : <EyeOff size={13} />} {isShow ? 'Highlight' : 'Hide'}
        </button>
        <input value={rule.label || ''} onChange={e => onPatch({ label: e.target.value })} placeholder="Rule name" className="field h-7 flex-1 text-[12px]" />
        <Toggle checked={rule.enabled !== false} onChange={v => onPatch({ enabled: v })} />
        <button onClick={onRemove} title="Delete rule" className="p-1 rounded hover:bg-white/10 text-poe-text hover:text-poe-danger"><Trash2 size={14} /></button>
      </div>

      {raw ? (
        <pre className="p-2.5 m-0 font-mono text-[11px] text-poe-text whitespace-pre-wrap overflow-auto max-h-40">{rule.raw}</pre>
      ) : (
        <div className="p-2.5 space-y-2">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
            <div className="flex items-center gap-1.5">
              <span className="text-[12px] text-poe-text">Class</span>
              <MultiSelect options={CLASS_OPTS} value={m.classes || []} onChange={v => onPatchMatch({ classes: v })} allLabel="Any class" width={210} />
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-[12px] text-poe-text flex items-center gap-1">Base type <Help text="Search and pick item base types from the list — no need to know or type any names." /></span>
              <ItemDropdown options={baseOptions} value={splitBaseType(m.baseType)}
                onChange={arr => onPatchMatch({ baseType: arr.join(', '), baseMode: 'exact' })}
                allLabel="Any base type" width={240} />
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-[12px] text-poe-text">Rarity</span>
              <SimpleSelect className="w-28" value={m.rarity || ''} onChange={v => onPatchMatch({ rarity: v })} options={rarityOpts} />
              {m.rarity && <SimpleSelect className="w-28" value={m.rarityOp || '<='} onChange={v => onPatchMatch({ rarityOp: v })} options={RARITY_OPS} />}
            </div>
            <NumCond label="Item level" field="itemLevel" opField="itemLevelOp" value={m} onChange={onPatchMatch} />
          </div>

          <button onClick={() => setAdv(a => !a)} className="text-[11px] text-poe-gold-dim hover:text-poe-gold inline-flex items-center gap-1">
            {adv ? <ChevronDown size={12} /> : <ChevronRight size={12} />} Advanced conditions
          </button>
          {adv && (
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2 pt-0.5">
              <NumCond label="Quality" field="quality" opField="qualityOp" value={m} onChange={onPatchMatch} max={100} />
              <NumCond label="Sockets" field="sockets" opField="socketsOp" value={m} onChange={onPatchMatch} max={6} />
              <NumCond label="Stack size" field="stackSize" opField="stackSizeOp" value={m} onChange={onPatchMatch} />
              <NumCond label="Waystone tier" field="waystoneTier" opField="waystoneTierOp" value={m} onChange={onPatchMatch} max={16} />
              <NumCond label="Area level" field="areaLevel" opField="areaLevelOp" value={m} onChange={onPatchMatch} max={100} />
            </div>
          )}

          {isShow && (
            <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-poe-line/60">
              <span className="text-[12px] text-poe-text">Highlight</span>
              {HIGHLIGHT_PRESETS.map(p => (
                <button key={p.id} onClick={() => onPatch({ style: p.style })} title={p.name}
                  className={`h-7 px-2 rounded border text-[11px] flex items-center gap-1.5 ${presetId === p.id ? 'border-poe-gold' : 'border-poe-line hover:border-poe-gold-dim'}`}>
                  <span className="w-3.5 h-3.5 rounded-sm border" style={{ background: rgba(p.style.bgColor || p.style.textColor), borderColor: rgba(p.style.borderColor) }} />
                  {p.name}
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

/* =========================== Page =========================== */

export function QuickEditorPage() {
  const { active, updateSlice } = useFilter()
  const { prefs, update } = usePrefs()
  const catalog = useCatalog()
  const baseOptions = catalog?.baseTypes || []
  const t = useT()
  const qf = active.quickFilters || {}
  const rules = active.overrides?.rules || []

  const [openIds, setOpenIds] = useState(() =>
    Array.isArray(prefs.qfOpenSections) ? new Set(prefs.qfOpenSections)
      : (prefs.accordionsOpen ? new Set(SECTIONS.map(s => s.id)) : new Set()))
  useEffect(() => { update({ qfOpenSections: [...openIds] }) }, [openIds]) // eslint-disable-line react-hooks/exhaustive-deps
  const toggleOpen = (id) => setOpenIds(s => { const n = new Set(s); n.has(id) ? n.delete(id) : n.add(id); return n })
  const setQF = (key, val) => updateSlice('quickFilters', { [key]: val })

  const sectionCounts = useMemo(() => {
    const c = {}; for (const s of SECTIONS) c[s.id] = activeCount(s, qf); return c
  }, [qf])
  const render = (s) => <Section key={s.id} section={s} open={openIds.has(s.id)} count={sectionCounts[s.id]} onToggle={toggleOpen} qf={qf} setQF={setQF} />

  // rule builder
  const setRules = (next) => updateSlice('overrides', { rules: next })
  const addRule = (action) => {
    const r = emptyOverrideRule(rules.length + 1)
    r.action = action
    if (action === 'Show') { r.style = highlightPreset('red').style; r.label = `Highlight ${rules.length + 1}` }
    setRules([r, ...rules]) // new rules go to the TOP so you never scroll to add one
  }
  const patchRule = (id, patch) => setRules(rules.map(r => r.id === id ? { ...r, ...patch } : r))
  const patchMatch = (id, patch) => setRules(rules.map(r => r.id === id ? { ...r, match: { ...r.match, ...patch } } : r))
  const removeRule = (id) => setRules(rules.filter(r => r.id !== id))

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <p className="text-[12.5px] text-poe-text">
          {t('Tune your preset with dropdowns, then hide or highlight anything below. Everything here layers on top of your chosen preset and wins in-game.')}
        </p>
        <div className="flex items-center gap-1 shrink-0">
          <button onClick={() => setOpenIds(new Set(SECTIONS.map(s => s.id)))} className="btn-dark h-7 text-[11px]"><ChevronsUpDown size={12} /> {t('Expand all')}</button>
          <button onClick={() => setOpenIds(new Set())} className="btn-dark h-7 text-[11px]"><ChevronsDownUp size={12} /> {t('Collapse all')}</button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 items-start">
        <div className="space-y-2">{COL_A.map(render)}</div>
        <div className="space-y-2">{COL_B.map(render)}</div>
      </div>

      {/* Hide / highlight anything */}
      <div className="panel p-3 space-y-2.5">
        <div className="gold-heading text-[15px] flex items-center gap-1.5">Hide / highlight anything <Help text="Build your own rules — match items by class, base type, rarity, item level and more, then hide or highlight them. Imported filters land here too." /></div>
        <div className="flex items-center gap-2">
          <button onClick={() => addRule('Hide')} className="btn-dark h-8"><Plus size={14} /> Add hide rule</button>
          <button onClick={() => addRule('Show')} className="btn-dark h-8"><Plus size={14} /> Add highlight rule</button>
        </div>
        {rules.length === 0 ? (
          <p className="text-[12px] text-poe-text/70 py-2">No custom rules yet. Add one, or import a filter and its rules appear here.</p>
        ) : (
          <div className="space-y-2">
            {rules.map(r => (
              <RuleCard key={r.id} rule={r} baseOptions={baseOptions} onPatch={p => patchRule(r.id, p)} onPatchMatch={p => patchMatch(r.id, p)} onRemove={() => removeRule(r.id)} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

import React, { useEffect, useMemo, useState } from 'react'
import { ChevronDown, ChevronRight, ChevronsDownUp, ChevronsUpDown, Plus, Trash2, Eye, EyeOff } from 'lucide-react'
import { useFilter } from '../store/FilterStore.jsx'
import { usePrefs } from '../store/Prefs.jsx'
import { emptyOverrideRule } from '../store/defaultSettings.js'
import { SECTIONS, TIERS, CLASS_GROUPS } from '../data/quickFilters.js'
import { CLASSES, iconFor } from '../data/items.js'
import { Toggle, Help } from '../components/primitives.jsx'
import { ItemDropdown } from '../components/ItemDropdown.jsx'
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

function activeCount(section, qf) {
  let n = 0
  for (const r of section.rows) {
    const v = qf[r.key]
    if (r.control === 'toggle' && v) n++
    else if ((r.control === 'classItems' || r.control === 'multi') && Array.isArray(v) && v.length) n++
    else if (r.control === 'select' && v && v !== 'all') n++
    else if (r.control === 'number' && v > 0 && v !== r.min) n++
  }
  return n
}

// Defined at module scope so quick-filter edits never remount the tree (which would collapse dropdowns).
function Row({ row, qf, setQF }) {
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
        <div className="px-3 pb-2 pt-1 border-t border-poe-line space-y-1.5">
          {section.rows.map(r => <Row key={r.key} row={r} qf={qf} setQF={setQF} />)}
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

function NumCond({ label, field, opField, ops = NUM_OPS, value, onChange, min = 0, max = 100000 }) {
  return (
    <div className="flex items-center gap-1.5">
      <span className="text-[12px] text-poe-text min-w-[88px]">{label}</span>
      <SimpleSelect className="w-14" value={value[opField] || ops[0]} onChange={v => onChange({ [opField]: v })} options={ops} />
      <input type="number" min={min} max={max} value={value[field] ?? ''} placeholder="—"
        onChange={e => onChange({ [field]: e.target.value })} className="field h-7 w-20" />
    </div>
  )
}

function RuleCard({ rule, onPatch, onPatchMatch, onRemove }) {
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
              <span className="text-[12px] text-poe-text flex items-center gap-1">Base type <Help text="Comma-separate multiple names. 'contains' matches any part of the name; 'exact match' needs the full base name." /></span>
              <input value={m.baseType || ''} onChange={e => onPatchMatch({ baseType: e.target.value })} placeholder="e.g. Sapphire, Breach" className="field h-7 w-48 text-[12px]" />
              <SimpleSelect className="w-28" value={m.baseMode || 'contains'} onChange={v => onPatchMatch({ baseMode: v })} options={baseModeOpts} />
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-[12px] text-poe-text">Rarity</span>
              <SimpleSelect className="w-28" value={m.rarity || ''} onChange={v => onPatchMatch({ rarity: v })} options={rarityOpts} />
              {m.rarity && <SimpleSelect className="w-14" value={m.rarityOp || '<='} onChange={v => onPatchMatch({ rarityOp: v })} options={RARITY_OPS} />}
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
              <NumCond label="Area level" field="areaLevel" opField="areaLevelOp" ops={['<=', '<', '=', '>', '>=']} value={m} onChange={onPatchMatch} max={100} />
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
  const left = SECTIONS.filter(s => s.col === 'left')
  const right = SECTIONS.filter(s => s.col === 'right')
  const render = (s) => <Section key={s.id} section={s} open={openIds.has(s.id)} count={sectionCounts[s.id]} onToggle={toggleOpen} qf={qf} setQF={setQF} />

  // rule builder
  const setRules = (next) => updateSlice('overrides', { rules: next })
  const addRule = (action) => {
    const r = emptyOverrideRule(rules.length + 1)
    r.action = action
    if (action === 'Show') { r.style = highlightPreset('red').style; r.label = `Highlight ${rules.length + 1}` }
    setRules([...rules, r])
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        <div className="space-y-2">{left.map(render)}</div>
        <div className="space-y-2">{right.map(render)}</div>
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
              <RuleCard key={r.id} rule={r} onPatch={p => patchRule(r.id, p)} onPatchMatch={p => patchMatch(r.id, p)} onRemove={() => removeRule(r.id)} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

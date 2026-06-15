import React, { useMemo, useState } from 'react'
import { Plus, Trash2, ChevronUp, ChevronDown, GripVertical } from 'lucide-react'
import { useFilter } from '../store/FilterStore.jsx'
import { useCatalog } from '../lib/catalog.js'
import { CLASSES, iconFor } from '../data/items.js'
import { emptyCustomRule } from '../store/defaultSettings.js'
import { DROP_TIERS } from '../data/dropTiers.js'
import { ItemDropdown } from '../components/ItemDropdown.jsx'
import { SimpleSelect } from '../components/SimpleSelect.jsx'
import { Toggle, Help } from '../components/primitives.jsx'

const RARITIES = [
  { v: 'Normal', color: '#c8c8c8' },
  { v: 'Magic', color: '#8888ff' },
  { v: 'Rare', color: '#ffff77' },
  { v: 'Unique', color: '#af6025' },
]
const CLASS_OPTS = CLASSES.map(c => ({ name: c.name, icon: iconFor(c.cat), cat: c.cat }))
const CLASS_BY_NAME = new Map(CLASS_OPTS.map(c => [c.name, c]))

export function CustomRulesPage() {
  const { active, update } = useFilter()
  const catalog = useCatalog()
  const rules = active.customRules || []

  const setRules = (next) => update({ customRules: next })
  const addRule = () => setRules([...rules, emptyCustomRule(rules.length + 1)])
  const patch = (id, p) => setRules(rules.map(r => r.id === id ? { ...r, ...p } : r))
  const remove = (id) => setRules(rules.filter(r => r.id !== id))
  const move = (id, dir) => {
    const i = rules.findIndex(r => r.id === id); const j = i + dir
    if (i < 0 || j < 0 || j >= rules.length) return
    const next = [...rules];[next[i], next[j]] = [next[j], next[i]]; setRules(next)
  }

  return (
    <div className="space-y-4">
      <p className="text-[12.5px] text-poe-text max-w-[860px]">
        Create custom <span className="text-poe-text-bright">Show</span>, <span className="text-poe-text-bright">Hide</span> and Highlight rules based on Item Class, Base Type, Rarity, and Advanced Conditions.
        These rules have a higher precedence than the Quick Filters, and are processed in the order they are listed. The higher the rule, the higher its precedence.
      </p>

      <div className="section-bar">Custom Rules</div>

      <div className="space-y-2">
        {rules.length === 0 && (
          <div className="panel p-4 text-center text-[12px] text-poe-text">
            No custom rules yet. Click “Add Custom Rule” to build one with visual dropdowns — no typing of class or base names.
          </div>
        )}
        {rules.map((r, idx) => (
          <CustomRuleRow key={r.id} rule={r} idx={idx} total={rules.length} catalog={catalog}
            onPatch={patch} onRemove={remove} onMove={move} />
        ))}
      </div>

      <button onClick={addRule} className="btn-dark w-full"><Plus size={14} /> Add Custom Rule</button>

      <FreeText />
    </div>
  )
}

function CustomRuleRow({ rule, idx, total, catalog, onPatch, onRemove, onMove }) {
  // Filter base types to the selected classes' categories (nice UX), else show all.
  // Stable identity for the catalog ref keeps ItemDropdown's memo intact.
  const allBases = catalog?.baseTypes
  const classesKey = (rule.classes || []).join('|')
  const baseOptions = useMemo(() => {
    if (!allBases) return []
    if (!rule.classes?.length) return allBases
    const cats = new Set()
    for (const n of rule.classes) { const c = CLASS_BY_NAME.get(n); if (c) cats.add(c.cat) }
    const filtered = allBases.filter(b => cats.has(b.category))
    return filtered.length ? filtered : allBases
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allBases, classesKey])

  const dt = DROP_TIERS.find(t => t.id === rule.dropTier) || DROP_TIERS[5]
  const rarity = RARITIES.find(r => r.v === rule.rarity)

  return (
    <div className="panel p-2">
      <div className="flex flex-wrap items-start gap-2">
        <div className="flex items-center gap-1 pt-1">
          <Toggle checked={rule.enabled} onChange={v => onPatch(rule.id, { enabled: v })} />
          <span className="text-poe-text/50"><GripVertical size={14} /></span>
        </div>

        {/* Show / Hide */}
        <div className="flex rounded overflow-hidden border border-poe-line pt-0.5">
          {['Show', 'Hide'].map(a => (
            <button key={a} onClick={() => onPatch(rule.id, { action: a })}
              className={`px-2 h-7 text-[12px] bg-black ${rule.action === a ? (a === 'Show' ? 'bg-[#1a2a1a] text-poe-text-bright' : 'bg-[#2a1a1a] text-poe-text-bright') : 'text-poe-text hover:text-poe-heading hover:bg-[#1a1a1c]'}`}>{a}</button>
          ))}
        </div>

        {/* Class picker */}
        <ItemDropdown options={CLASS_OPTS} value={rule.classes} onChange={v => onPatch(rule.id, { classes: v })}
          allLabel="All Classes" icon={rule.classes.length === 1 ? CLASS_OPTS.find(c => c.name === rule.classes[0])?.icon : `/img/all-items.png`} width={190} />

        {/* BaseType picker */}
        <ItemDropdown options={baseOptions} value={rule.baseTypes} onChange={v => onPatch(rule.id, { baseTypes: v })}
          allLabel={catalog ? 'All Items' : 'Loading…'} width={210} />

        {/* Rarity */}
        <div className="flex items-center gap-1 pt-0.5">
          <SimpleSelect value={rule.rarityOp} onChange={v => onPatch(rule.id, { rarityOp: v })} className="w-12"
            options={['>=', '<=', '==']} />
          <SimpleSelect value={rule.rarity} onChange={v => onPatch(rule.id, { rarity: v })} className="w-24"
            style={{ color: rarity?.color }}
            options={RARITIES.map(r => ({ value: r.v, label: r.v, color: r.color }))} />
        </div>

        {/* Drop tier (style) */}
        <SimpleSelect value={rule.dropTier} onChange={v => onPatch(rule.id, { dropTier: v })}
          className="w-24 pt-0.5" style={{ color: `rgb(${dt.textColor.join(',')})` }} title="Drop-tier styling"
          options={DROP_TIERS.map(t => ({
            value: t.id,
            label: `${t.id}-Tier`,
            color: `rgb(${t.textColor.join(',')})`,
          }))} />

        {/* item level */}
        <div className="flex items-center gap-1 pt-0.5 text-[12px] text-poe-text">
          <span>iLvl ≥</span>
          <input type="number" min={0} max={100} value={rule.itemLevel}
            onChange={e => onPatch(rule.id, { itemLevel: Math.max(0, Number(e.target.value) || 0) })}
            className="field h-7 w-14" />
        </div>

        {/* reorder + delete */}
        <div className="ml-auto flex items-center gap-0.5 pt-0.5">
          <button disabled={idx === 0} onClick={() => onMove(rule.id, -1)} className="btn-ghost h-7 w-7 p-0 disabled:opacity-30"><ChevronUp size={14} /></button>
          <button disabled={idx === total - 1} onClick={() => onMove(rule.id, 1)} className="btn-ghost h-7 w-7 p-0 disabled:opacity-30"><ChevronDown size={14} /></button>
          <button onClick={() => onRemove(rule.id)} className="btn-ghost h-7 w-7 p-0 text-poe-danger"><Trash2 size={14} /></button>
        </div>
      </div>
      <input value={rule.comment} onChange={e => onPatch(rule.id, { comment: e.target.value })}
        className="field h-6 text-[11px] mt-1.5 max-w-[280px]" placeholder="Rule name (comment)" />
    </div>
  )
}

function FreeText() {
  const { active, updateSlice } = useFilter()
  const [open, setOpen] = useState(false)
  const ft = active.freeText || { top: '', bottom: '' }
  return (
    <div>
      <button onClick={() => setOpen(o => !o)} className="section-bar w-full">Free-text Rules {open ? '▾' : '▸'}</button>
      {open && (
        <div className="panel p-3 mt-2 space-y-2">
          <p className="text-[11.5px] text-poe-text">
            These rules are inserted verbatim at the very top / bottom of the filter, respectively.{' '}
            <span className="text-poe-danger">Warning:</span> invalid syntax can break the filter. Use at your own risk.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <div className="text-[11px] uppercase tracking-wide text-poe-text mb-1">Insert At Top</div>
              <textarea value={ft.top} onChange={e => updateSlice('freeText', { top: e.target.value })}
                className="field h-32 font-mono text-[11px] py-1.5" placeholder="Show&#10;  Class == &quot;…&quot;" />
            </div>
            <div>
              <div className="text-[11px] uppercase tracking-wide text-poe-text mb-1">Insert At Bottom</div>
              <textarea value={ft.bottom} onChange={e => updateSlice('freeText', { bottom: e.target.value })}
                className="field h-32 font-mono text-[11px] py-1.5" placeholder="Hide&#10;  Rarity Normal" />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

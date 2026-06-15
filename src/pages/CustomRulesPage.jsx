import React, { useMemo, useState } from 'react'
import { Plus, Trash2, ChevronUp, ChevronDown, GripVertical, ClipboardPaste, Upload } from 'lucide-react'
import { useFilter } from '../store/FilterStore.jsx'
import { useCatalog } from '../lib/catalog.js'
import { useToast } from '../store/Toast.jsx'
import { CLASSES, iconFor } from '../data/items.js'
import { asset } from '../data/assets.js'
import { emptyCustomRule } from '../store/defaultSettings.js'
import { DROP_TIERS } from '../data/dropTiers.js'
import { parseGameItem } from '../lib/parseGameItem.js'
import { ItemDropdown } from '../components/ItemDropdown.jsx'
import { SimpleSelect } from '../components/SimpleSelect.jsx'
import { Toggle, Help } from '../components/primitives.jsx'

const GEAR_RARITIES = ['Normal', 'Magic', 'Rare', 'Unique']

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
  const addFromItem = (data) => setRules([...rules, { ...emptyCustomRule(rules.length + 1), ...data }])
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

      <PasteItemRule catalog={catalog} onAdd={addFromItem} />
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
          allLabel="All Classes" icon={rule.classes.length === 1 ? CLASS_OPTS.find(c => c.name === rule.classes[0])?.icon : asset('all-items.png')} width={190} />

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

// Paste a copied in-game item (Ctrl+C) and turn its filterable header fields into a
// pre-filled Custom Rule. Reuses the catalog to resolve the base type reliably.
function PasteItemRule({ catalog, onAdd }) {
  const toast = useToast()
  const [open, setOpen] = useState(false)
  const [text, setText] = useState('')
  const [action, setAction] = useState('Show')
  const [dropTier, setDropTier] = useState('A')
  const [drag, setDrag] = useState(false)

  const parsed = useMemo(() => (text.trim() ? parseGameItem(text, catalog) : null), [text, catalog])
  const target = parsed && (parsed.baseType || parsed.itemClass)
  const dt = DROP_TIERS.find(t => t.id === dropTier) || DROP_TIERS[5]

  const readFile = (file) => {
    if (!file) return
    if (!/\.(txt|filter)$/i.test(file.name)) { toast.warn('Drop a .txt with a copied item.'); return }
    const r = new FileReader()
    r.onload = () => setText(String(r.result || ''))
    r.readAsText(file)
  }
  const onDrop = (e) => { e.preventDefault(); setDrag(false); readFile(e.dataTransfer?.files?.[0]) }

  const add = () => {
    if (!target) { toast.warn('Paste a copied item first (hover an item in-game and press Ctrl+C).'); return }
    const hasRarity = GEAR_RARITIES.includes(parsed.rarity)
    onAdd({
      action,
      classes: parsed.itemClass ? [parsed.itemClass] : [],
      baseTypes: parsed.baseType ? [parsed.baseType] : [],
      rarity: hasRarity ? parsed.rarity : 'Normal',
      rarityOp: hasRarity ? '==' : '>=', // ">= Normal" matches everything — i.e. no rarity gate
      dropTier,
      itemLevel: 0,
      comment: parsed.name || parsed.baseType || 'Pasted item',
    })
    toast.success(`Added a ${action} rule for “${parsed.name || parsed.baseType}”.`, { title: 'Item rule' })
    setText('')
  }

  return (
    <div>
      <button onClick={() => setOpen(o => !o)} className="section-bar w-full">
        Add from a pasted item {open ? '▾' : '▸'}
      </button>
      {open && (
        <div className={`panel p-3 mt-2 space-y-2.5 transition-colors ${drag ? 'ring-1 ring-poe-gold border-poe-gold' : ''}`}
          onDragOver={e => { e.preventDefault(); if (!drag) setDrag(true) }}
          onDragLeave={e => { e.preventDefault(); setDrag(false) }}
          onDrop={onDrop}>
          <p className="text-[11.5px] text-poe-text">
            Hover an item in-game and press <span className="font-mono text-poe-text-bright">Ctrl+C</span>, then paste it here.
            We build a rule from its <span className="text-poe-text-bright">Class · Base Type · Rarity</span> — then style it (colour, beam, minimap, sound) like any rule above.
          </p>

          <textarea value={text} onChange={e => setText(e.target.value)}
            className="field h-28 font-mono text-[11px] py-1.5" placeholder={'Item Class: Sceptres\nRarity: Unique\nGuiding Palm of the Mind\nShrine Sceptre\n--------\n…'} />

          {text.trim() && (
            target ? (
              <div className="rounded border border-poe-line bg-black p-2 space-y-1">
                <div className="text-[12px] text-poe-text-bright">{parsed.name || parsed.baseType}</div>
                <div className="flex flex-wrap gap-1">
                  <Chip>{parsed.itemClass || 'Any class'}</Chip>
                  {parsed.baseType ? <Chip>{parsed.baseType}</Chip> : <Chip warn>no base type detected</Chip>}
                  {parsed.rarity ? <Chip>{parsed.rarity}</Chip> : null}
                  {parsed.itemLevel ? <Chip>iLvl {parsed.itemLevel}</Chip> : null}
                  {parsed.corrupted ? <Chip>Corrupted</Chip> : null}
                </div>
                {parsed.rarity === 'Unique' && parsed.baseType && (
                  <div className="text-[11px] text-poe-gold/90">
                    Filters match the base type, not the unique’s name — this targets all “{parsed.baseType}” uniques.
                  </div>
                )}
              </div>
            ) : (
              <div className="text-[11.5px] text-poe-danger">
                Couldn’t read that as an item. Copy a whole item in-game with Ctrl+C and paste it all.
              </div>
            )
          )}

          <div className="flex flex-wrap items-center gap-2">
            {/* Show / Hide */}
            <div className="flex rounded overflow-hidden border border-poe-line">
              {['Show', 'Hide'].map(a => (
                <button key={a} onClick={() => setAction(a)}
                  className={`px-2 h-7 text-[12px] bg-black ${action === a ? (a === 'Show' ? 'bg-[#1a2a1a] text-poe-text-bright' : 'bg-[#2a1a1a] text-poe-text-bright') : 'text-poe-text hover:text-poe-heading hover:bg-[#1a1a1c]'}`}>{a}</button>
              ))}
            </div>
            {/* Drop tier (style + sound) */}
            <SimpleSelect value={dropTier} onChange={setDropTier} className="w-24"
              style={{ color: `rgb(${dt.textColor.join(',')})` }} title="Drop-tier styling (colour, beam, minimap, sound)"
              options={DROP_TIERS.map(t => ({ value: t.id, label: `${t.id}-Tier`, color: `rgb(${t.textColor.join(',')})` }))} />
            <span className="text-[11px] text-poe-text/70 inline-flex items-center gap-1">
              <Upload size={12} /> …or drop a .txt
            </span>
            <button onClick={add} disabled={!target} className="btn-dark h-8 ml-auto disabled:opacity-40">
              <ClipboardPaste size={14} /> Add as Custom Rule
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

function Chip({ children, warn }) {
  return (
    <span className={`inline-flex items-center rounded px-1.5 py-0.5 text-[10.5px] border ${warn ? 'border-poe-danger/50 text-poe-danger' : 'border-poe-line text-poe-text-bright'}`}
      style={{ backgroundColor: '#000' }}>
      {children}
    </span>
  )
}

import React from 'react'
import { Plus, Trash2, Eye, EyeOff, ChevronDown, ChevronRight } from 'lucide-react'
import { useFilter } from '../store/FilterStore.jsx'
import { emptyOverrideRule } from '../store/defaultSettings.js'
import { Toggle, Help } from '../components/primitives.jsx'
import { MultiSelect } from '../components/MultiSelect.jsx'
import { SimpleSelect } from '../components/SimpleSelect.jsx'
import {
  ALL_CLASSES, WEAPON_CLASSES, ARMOUR_CLASSES, RARITIES, RARITY_OPS, NUM_OPS,
  HIGHLIGHT_PRESETS, presetIdForStyle, highlightPreset,
} from '../data/quickEditor.js'

const CLASS_OPTS = ALL_CLASSES.map(c => ({ value: c, label: c }))
const WEAPON_OPTS = WEAPON_CLASSES.map(c => ({ value: c, label: c }))
const ARMOUR_OPTS = ARMOUR_CLASSES.map(c => ({ value: c, label: c }))
const rarityOpts = [{ value: '', label: 'Any rarity' }, ...RARITIES.map(r => ({ value: r, label: r }))]
const baseModeOpts = [{ value: 'contains', label: 'contains' }, { value: 'exact', label: 'exact match' }]

const rgba = (c) => c ? `rgba(${c[0]},${c[1]},${c[2]},${(c[3] ?? 255) / 255})` : 'transparent'

// A single number+operator matcher cell (e.g. ItemLevel < 65). Empty value = condition off.
function NumCond({ label, help, field, opField, ops = NUM_OPS, value, onChange, min = 0, max = 100000 }) {
  return (
    <div className="flex items-center gap-1.5">
      <span className="text-[12px] text-poe-text min-w-[92px] flex items-center gap-1">{label}{help && <Help text={help} />}</span>
      <SimpleSelect className="w-14" value={value[opField] || ops[0]} onChange={v => onChange({ [opField]: v })} options={ops} />
      <input type="number" min={min} max={max} value={value[field] ?? ''} placeholder="—"
        onChange={e => onChange({ [field]: e.target.value })}
        className="field h-7 w-20" />
    </div>
  )
}

function RuleCard({ rule, onPatch, onPatchMatch, onRemove }) {
  const [adv, setAdv] = React.useState(false)
  const m = rule.match || {}
  const isShow = rule.action === 'Show'
  const presetId = presetIdForStyle(rule.style)

  return (
    <div className="rounded border border-poe-line bg-black/40">
      {/* header */}
      <div className="flex items-center gap-2 px-2.5 py-1.5 border-b border-poe-line/70">
        <button
          onClick={() => onPatch({ action: isShow ? 'Hide' : 'Show', style: isShow ? null : (rule.style || highlightPreset('red').style) })}
          title="Switch between hide and highlight"
          className={`inline-flex items-center gap-1 rounded px-2 h-7 text-[11px] border ${isShow ? 'border-emerald-500/50 text-emerald-300' : 'border-poe-danger/50 text-poe-danger'}`}>
          {isShow ? <Eye size={13} /> : <EyeOff size={13} />} {isShow ? 'Highlight' : 'Hide'}
        </button>
        <input value={rule.label || ''} onChange={e => onPatch({ label: e.target.value })}
          placeholder="Rule name" className="field h-7 flex-1 text-[12px]" />
        <Toggle checked={rule.enabled !== false} onChange={v => onPatch({ enabled: v })} />
        <button onClick={onRemove} title="Delete rule" className="p-1 rounded hover:bg-white/10 text-poe-text hover:text-poe-danger">
          <Trash2 size={14} />
        </button>
      </div>

      {/* matcher */}
      <div className="p-2.5 space-y-2">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
          <div className="flex items-center gap-1.5">
            <span className="text-[12px] text-poe-text">Class</span>
            <MultiSelect options={CLASS_OPTS} value={m.classes || []} onChange={v => onPatchMatch({ classes: v })} allLabel="Any class" width={210} />
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-[12px] text-poe-text flex items-center gap-1">Base type <Help text="Comma-separate multiple names. 'contains' matches any part of the name (e.g. Sapphire → Sapphire Ring); 'exact match' needs the full base name." /></span>
            <input value={m.baseType || ''} onChange={e => onPatchMatch({ baseType: e.target.value })}
              placeholder="e.g. Sapphire, Breach" className="field h-7 w-48 text-[12px]" />
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

        {/* highlight style for Show rules */}
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
    </div>
  )
}

function Panel({ title, help, children }) {
  return (
    <div className="panel p-3 space-y-2.5">
      <div className="gold-heading text-[15px] flex items-center gap-1.5">{title}{help && <Help text={help} />}</div>
      {children}
    </div>
  )
}

export function QuickEditorPage() {
  const { active, updateSlice } = useFilter()
  const ov = active.overrides || { rules: [], toggles: {}, gear: { weapons: [], armour: [] } }
  const toggles = ov.toggles || {}
  const gear = ov.gear || { weapons: [], armour: [] }
  const rules = ov.rules || []

  const setToggle = (key, val) => updateSlice('overrides', { toggles: { ...toggles, [key]: val } })
  const setGear = (slot, val) => updateSlice('overrides', { gear: { ...gear, [slot]: val } })
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

  const numField = (key, label, help, props = {}) => (
    <div className="flex items-center gap-2">
      <span className="text-[12.5px] text-poe-text-bright min-w-[200px] flex items-center gap-1">{label}{help && <Help text={help} />}</span>
      <input type="number" min={0} value={toggles[key] ?? 0} onChange={e => setToggle(key, Math.max(0, Number(e.target.value) || 0))}
        className="field h-7 w-24" {...props} />
    </div>
  )

  return (
    <div className="space-y-3">
      <p className="text-[12.5px] text-poe-text">
        These edits sit on top of your chosen preset and always win in-game. Hide anything you don’t want to see, or highlight the drops you care about — by class, base type, rarity, item level and more.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        <Panel title="Quick hides" help="One-click strictness nudges layered on top of your preset.">
          <Toggle checked={!!toggles.hideNormal} onChange={v => setToggle('hideNormal', v)} label="Hide all Normal (white) items" help="Hides every Normal-rarity item, regardless of type." />
          <Toggle checked={!!toggles.hideMagic} onChange={v => setToggle('hideMagic', v)} label="Hide all Magic (blue) items" help="Hides every Magic-rarity item." />
          {numField('minGoldPile', 'Hide gold piles under', 'Hides gold stacks smaller than this. 0 = show all gold.')}
          {numField('hideRaresBelowIlvl', 'Hide Rares under item level', 'Hides low-item-level rares (poor crafting bases). 0 = off.', { max: 100 })}
        </Panel>

        <Panel title="My equipment" help="Pick the gear types your build actually uses. Everything else (below Unique) gets hidden so you stop seeing off-build drops.">
          <div className="flex items-center gap-2">
            <span className="text-[12.5px] text-poe-text-bright min-w-[120px]">Weapon types I use</span>
            <MultiSelect options={WEAPON_OPTS} value={gear.weapons || []} onChange={v => setGear('weapons', v)} allLabel="All weapons (no hiding)" width={250} />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[12.5px] text-poe-text-bright min-w-[120px]">Armour types I use</span>
            <MultiSelect options={ARMOUR_OPTS} value={gear.armour || []} onChange={v => setGear('armour', v)} allLabel="All armour (no hiding)" width={250} />
          </div>
          <p className="text-[11px] text-poe-text/70">Leave a row empty to keep showing all of that group. Uniques are never hidden by this.</p>
        </Panel>
      </div>

      <Panel title="Hide / highlight anything" help="Build your own rules. Each one matches items by the conditions you set and either hides them or highlights them.">
        <div className="flex items-center gap-2">
          <button onClick={() => addRule('Hide')} className="btn-dark h-8"><Plus size={14} /> Add hide rule</button>
          <button onClick={() => addRule('Show')} className="btn-dark h-8"><Plus size={14} /> Add highlight rule</button>
        </div>
        {rules.length === 0 ? (
          <p className="text-[12px] text-poe-text/70 py-2">No custom rules yet. Add one to hide or pinpoint exactly what you want.</p>
        ) : (
          <div className="space-y-2">
            {rules.map(r => (
              <RuleCard key={r.id} rule={r}
                onPatch={(p) => patchRule(r.id, p)}
                onPatchMatch={(p) => patchMatch(r.id, p)}
                onRemove={() => removeRule(r.id)} />
            ))}
          </div>
        )}
      </Panel>
    </div>
  )
}

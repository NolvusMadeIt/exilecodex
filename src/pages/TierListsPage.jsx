import React, { useMemo, useState } from 'react'
import { useFilter } from '../store/FilterStore.jsx'
import { useCatalog } from '../lib/catalog.js'
import { DROP_TIERS, DEFAULT_TIER_CURRENCY } from '../data/dropTiers.js'
import { ItemIcon } from '../components/primitives.jsx'

const VISIBLE_TIERS = DROP_TIERS.filter(t => !t.hide) // S..E
// name -> default tier, matching the generator's starting currency tiers
const DEFAULT_LOOKUP = {}
for (const [tid, names] of Object.entries(DEFAULT_TIER_CURRENCY)) for (const n of names) DEFAULT_LOOKUP[n] = tid

export function TierListsPage() {
  const { active, update } = useFilter()
  const catalog = useCatalog()
  const [tab, setTab] = useState('currency')
  const [dragName, setDragName] = useState(null)

  const items = useMemo(() => {
    if (!catalog) return []
    if (tab === 'uniques') return catalog.uniques.slice(0, 80)
    return catalog.baseTypes.filter(b => b.category === 'currency').slice(0, 90)
  }, [catalog, tab])

  const overrides = active.tierOverrides || {}
  // Default tier matches the generator: curated currency in its tier, everything else in E.
  const tierOf = (name) => overrides[name] || DEFAULT_LOOKUP[name] || 'E'

  const setTier = (name, tierId) => update(f => ({ ...f, tierOverrides: { ...f.tierOverrides, [name]: tierId } }))

  const byTier = {}
  VISIBLE_TIERS.forEach(t => byTier[t.id] = [])
  items.forEach((it) => { const tid = tierOf(it.name); (byTier[tid] || byTier.E).push(it) })

  return (
    <div className="space-y-3">
      <p className="text-[12.5px] text-poe-text text-center">
        Drag items between tiers to set how valuable they are to you. Higher tier = stronger highlight. (Seeded with sensible starting tiers — drag to re-tier; uncategorised items sit in E.)
      </p>
      <div className="flex gap-1 justify-center">
        {[['currency', 'Currency'], ['uniques', 'Uniques']].map(([id, label]) => (
          <button key={id} onClick={() => setTab(id)}
            className={`px-3 h-7 text-[12px] rounded border-b-2 ${tab === id ? 'border-poe-gold text-poe-gold' : 'border-transparent text-poe-text hover:text-poe-heading'}`}>{label}</button>
        ))}
      </div>

      {!catalog && <div className="panel p-6 text-center text-[12px] text-poe-text">Loading item catalog…</div>}

      <div className="space-y-2">
        {VISIBLE_TIERS.map(t => (
          <div key={t.id}
            onDragOver={e => e.preventDefault()}
            onDrop={() => { if (dragName) { setTier(dragName, t.id); setDragName(null) } }}
            className="panel flex items-stretch min-h-[64px]">
            <div className="w-[150px] shrink-0 flex flex-col justify-center px-3 border-r border-poe-line"
              style={{ background: `rgba(${t.textColor.join(',')},0.08)` }}>
              <div className="text-[14px] font-smallcaps" style={{ color: `rgb(${t.textColor.join(',')})` }}>{t.name}</div>
              <div className="text-[10px] text-poe-text">{t.label} · {byTier[t.id].length}</div>
            </div>
            <div className="flex-1 flex flex-wrap gap-1.5 p-2 content-start">
              {byTier[t.id].map((it, i) => (
                <span key={it.name + i} draggable
                  onDragStart={() => setDragName(it.name)}
                  title={it.name}
                  className="inline-flex items-center gap-1 bg-black border border-poe-line rounded px-1.5 py-1 text-[11px] cursor-grab hover:border-poe-gold-dim active:cursor-grabbing">
                  <ItemIcon src={it.icon} size={16} /> <span className="max-w-[150px] truncate">{it.name}</span>
                </span>
              ))}
              {byTier[t.id].length === 0 && <span className="text-[11px] text-poe-text/50 italic px-1 self-center">drop items here</span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

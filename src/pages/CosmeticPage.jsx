import React, { useState } from 'react'
import { useFilter } from '../store/FilterStore.jsx'
import { DROP_TIERS, BEAM_COLORS, MINIMAP_SHAPES } from '../data/dropTiers.js'
import { ItemLabel } from '../components/ItemLabel.jsx'
import { Toggle } from '../components/primitives.jsx'
import { SimpleSelect } from '../components/SimpleSelect.jsx'
import { SoundCell } from '../components/SoundCell.jsx'

// 'all' edits the GLOBAL tier styles; the category tabs write real per-category overrides that the
// generator applies to that category's blocks only (see lib/overrides.js tierStyle categories).
const TABS = [
  { id: 'all', label: 'All (global)', example: 'Exalted Orb' },
  { id: 'currency', label: 'Currency', example: 'Exalted Orb' },
  { id: 'items', label: 'Items', example: 'Stellar Amulet' },
  { id: 'uniques', label: 'Uniques', example: 'Mirror of Kalandra' },
  { id: 'chance', label: 'Chance Bases', example: 'Sapphire Ring' },
]

export function CosmeticPage() {
  const { active, update } = useFilter()
  const [tab, setTab] = useState('all')
  const cosmetic = active.cosmetic || {}
  const isGlobal = tab === 'all'
  const example = TABS.find(t => t.id === tab).example

  const globalFor = (tierId) => cosmetic.tierStyles?.[tierId] || {}
  const catFor = (tierId) => cosmetic.categoryStyles?.[tab]?.[tierId] || {}
  // What the generator will actually use for this tab: category override over global.
  const effectiveFor = (tierId) => (isGlobal ? globalFor(tierId) : { ...globalFor(tierId), ...catFor(tierId) })
  const overridden = (tierId) => !isGlobal && Object.keys(catFor(tierId)).length > 0
  const anyOverrides = !isGlobal && Object.keys(cosmetic.categoryStyles?.[tab] || {}).some(tid => Object.keys(cosmetic.categoryStyles[tab][tid] || {}).length)

  const setStyle = (tierId, patch) => {
    if (isGlobal) {
      update(f => ({ ...f, cosmetic: { ...f.cosmetic, tierStyles: { ...f.cosmetic?.tierStyles, [tierId]: { ...f.cosmetic?.tierStyles?.[tierId], ...patch } } } }))
    } else {
      update(f => ({
        ...f,
        cosmetic: {
          ...f.cosmetic,
          categoryStyles: {
            ...f.cosmetic?.categoryStyles,
            [tab]: { ...f.cosmetic?.categoryStyles?.[tab], [tierId]: { ...f.cosmetic?.categoryStyles?.[tab]?.[tierId], ...patch } },
          },
        },
      }))
    }
  }
  const clearTabOverrides = () => {
    update(f => {
      const cs = { ...f.cosmetic?.categoryStyles }
      delete cs[tab]
      return { ...f, cosmetic: { ...f.cosmetic, categoryStyles: cs } }
    })
  }

  return (
    <div className="space-y-4">
      <p className="text-[12.5px] text-poe-text">
        Style the drop tiers used by your <span className="text-poe-text-bright">Tier List</span> and the tier-styled Quick Editor rules.
        The <span className="text-poe-text-bright">All</span> tab sets the global look; the category tabs add real per-category overrides
        (currency blocks, item rules, unique tiers and chance bases each use their own set).
      </p>

      <div className="section-bar">Drop Tier Styles</div>

      {/* sub-tabs */}
      <div className="flex items-center gap-1">
        {TABS.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)}
            className={`px-3 h-7 text-[12px] rounded-t border-b-2 ${tab === t.id ? 'border-poe-gold text-poe-gold bg-white/[0.03]' : 'border-transparent text-poe-text hover:text-poe-heading'}`}>
            {t.label}
          </button>
        ))}
        {anyOverrides && (
          <button onClick={clearTabOverrides} className="ml-3 text-[11px] text-poe-text hover:text-poe-gold underline decoration-dotted">
            Reset this tab to global
          </button>
        )}
      </div>

      {!isGlobal && (
        <p className="text-[11px] text-poe-text/80">
          Cells start from the global values — change one and it becomes an override for {TABS.find(t => t.id === tab).label} only (marked ●).
        </p>
      )}

      {/* tier table */}
      <div className="panel divide-y divide-poe-line">
        <div className="grid grid-cols-[170px_56px_50px_100px_110px_180px_1fr] gap-2 px-3 py-1.5 text-[10px] uppercase tracking-wide text-poe-text">
          <span>Tier</span><span>Value</span><span>Hide</span><span>Beam</span><span>Minimap</span><span>Sound</span><span>Preview</span>
        </div>
        {DROP_TIERS.map(t => {
          const st = effectiveFor(t.id)
          const hidden = st.hide ?? !!t.hide
          const beam = st.beam ?? (t.beam ? cap(t.beam) : 'None')
          const shape = st.shape ?? 'Circle'
          return (
            <div key={t.id} className="grid grid-cols-[170px_56px_50px_100px_110px_180px_1fr] gap-2 px-3 py-1.5 items-center">
              <span className="text-[12.5px]" style={{ color: `rgb(${t.textColor.join(',')})` }}>
                {t.name} <span className="text-poe-text text-[11px]">— {t.label}</span>
                {overridden(t.id) && <span className="ml-1 text-poe-gold" title={`Overridden for ${tab}`}>●</span>}
              </span>
              <span className="text-[11px] text-poe-text">{t.threshold}</span>
              <Toggle checked={hidden} onChange={v => setStyle(t.id, { hide: v })} />
              <SimpleSelect value={beam} onChange={v => setStyle(t.id, { beam: v })} className="text-[11px]" disabled={hidden}
                options={['None', ...BEAM_COLORS]} />
              <SimpleSelect value={shape} onChange={v => setStyle(t.id, { shape: v })} className="text-[11px]" disabled={hidden}
                options={MINIMAP_SHAPES} />
              <SoundCell value={st} onPatch={p => setStyle(t.id, p)} disabled={hidden} />
              <div className="flex items-center pl-1 min-h-[34px]">
                {hidden ? <span className="text-[11px] text-poe-text italic">hidden</span>
                  : <ItemLabel text={example} textColor={t.textColor} beam={beam !== 'None' ? beam : null}
                      minimap={beam !== 'None'} fontSize={32 + (t.id === 'S' ? 8 : t.id === 'A' ? 5 : 0)} />}
              </div>
            </div>
          )
        })}
      </div>

    </div>
  )
}

const cap = (s) => s ? s[0].toUpperCase() + s.slice(1) : s

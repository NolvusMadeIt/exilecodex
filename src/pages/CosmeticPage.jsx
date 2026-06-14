import React, { useState } from 'react'
import { useFilter } from '../store/FilterStore.jsx'
import { DROP_TIERS, BEAM_COLORS, MINIMAP_SHAPES } from '../data/dropTiers.js'
import { ItemLabel } from '../components/ItemLabel.jsx'
import { Toggle, Help } from '../components/primitives.jsx'
import { SimpleSelect } from '../components/SimpleSelect.jsx'
import { SoundCell } from '../components/SoundCell.jsx'

const TABS = [
  { id: 'currency', label: 'Currency', example: 'Exalted Orb' },
  { id: 'items', label: 'Items', example: 'Stellar Amulet' },
  { id: 'uniques', label: 'Uniques', example: "Mirror of Kalandra" },
  { id: 'chance', label: 'Chance Bases', example: 'Sapphire Ring' },
]
const SOUNDS = ['None', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10']

export function CosmeticPage() {
  const { active, update, updateSlice } = useFilter()
  const [tab, setTab] = useState('currency')
  const cosmetic = active.cosmetic
  const example = TABS.find(t => t.id === tab).example

  const styleFor = (tierId) => cosmetic.tierStyles?.[tierId] || {}
  const setStyle = (tierId, patch) => {
    update(f => ({ ...f, cosmetic: { ...f.cosmetic, tierStyles: { ...f.cosmetic.tierStyles, [tierId]: { ...f.cosmetic.tierStyles?.[tierId], ...patch } } } }))
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-[12.5px] text-poe-text">These settings have no impact on which items are shown or hidden, but change <span className="text-poe-text-bright">how items are displayed</span>.</p>
        <button className="btn-dark">Cosmetic Presets</button>
      </div>

      <div className="section-bar">Drop Tier Styles</div>

      {/* sub-tabs */}
      <div className="flex gap-1">
        {TABS.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)}
            className={`px-3 h-7 text-[12px] rounded-t border-b-2 ${tab === t.id ? 'border-poe-gold text-poe-gold bg-white/[0.03]' : 'border-transparent text-poe-text hover:text-poe-heading'}`}>
            {t.label}
          </button>
        ))}
      </div>

      {/* tier table */}
      <div className="panel divide-y divide-poe-line">
        <div className="grid grid-cols-[170px_56px_50px_100px_110px_180px_1fr] gap-2 px-3 py-1.5 text-[10px] uppercase tracking-wide text-poe-text">
          <span>Tier</span><span>Value</span><span>Hide</span><span>Beam</span><span>Minimap</span><span>Sound</span><span>Preview</span>
        </div>
        {DROP_TIERS.map(t => {
          const st = styleFor(t.id)
          const hidden = st.hide ?? !!t.hide
          const beam = st.beam ?? (t.beam ? cap(t.beam) : 'None')
          const shape = st.shape ?? 'Circle'
          return (
            <div key={t.id} className="grid grid-cols-[170px_56px_50px_100px_110px_180px_1fr] gap-2 px-3 py-1.5 items-center">
              <span className="text-[12.5px]" style={{ color: `rgb(${t.textColor.join(',')})` }}>
                {t.name} <span className="text-poe-text text-[11px]">— {t.label}</span>
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

      {/* Hidden Items */}
      <div className="section-bar">Hidden Items</div>
      <div className="flex flex-wrap items-center gap-x-6 gap-y-2 px-1">
        <Toggle checked={!!cosmetic.hiddenGearTransparent} onChange={v => updateSlice('cosmetic', { hiddenGearTransparent: v })}
          label="Hidden Gear Transparent" help="Use a transparent style for hidden gear." />
        <Toggle checked={!!cosmetic.hiddenFlasks} onChange={v => updateSlice('cosmetic', { hiddenFlasks: v })} label="Flasks" help="Hide leftover flasks." />
        <Toggle checked={!!cosmetic.hiddenJewellery} onChange={v => updateSlice('cosmetic', { hiddenJewellery: v })} label="Jewellery" help="Hide leftover jewellery." />
      </div>
    </div>
  )
}

const cap = (s) => s ? s[0].toUpperCase() + s.slice(1) : s

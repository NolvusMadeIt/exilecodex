import React, { useState } from 'react'
import { useFilter } from '../store/FilterStore.jsx'
import { DROP_TIERS } from '../data/dropTiers.js'
import { ItemLabel } from '../components/ItemLabel.jsx'
import { Toggle } from '../components/primitives.jsx'

// Example drops per tier (currency-flavoured), to visualise the styling like the real Preview.
const SAMPLES = [
  { tier: 'S', text: 'Mirror of Kalandra' },
  { tier: 'A', text: 'Divine Orb' },
  { tier: 'A', text: 'Perfect Jeweller’s Orb' },
  { tier: 'B', text: 'Exalted Orb' },
  { tier: 'B', text: 'Greater Jeweller’s Orb' },
  { tier: 'C', text: 'Chaos Orb' },
  { tier: 'C', text: 'Regal Orb' },
  { tier: 'C', text: 'Stellar Amulet' },
  { tier: 'D', text: 'Orb of Augmentation' },
  { tier: 'D', text: 'Scroll of Wisdom' },
  { tier: 'E', text: 'Iron Ring' },
]
const UNIQUE = { text: 'The Pariah', textColor: [175, 96, 37], beam: 'Brown' }
const BACKGROUNDS = ['Woods', 'Desert', 'Marshes', 'Caves']

export function PreviewPage() {
  const { active } = useFilter()
  const [beams, setBeams] = useState(true)
  const [bg, setBg] = useState('Woods')
  const ts = active.cosmetic?.tierStyles || {}

  const tierStyle = (id) => {
    const t = DROP_TIERS.find(d => d.id === id)
    const st = ts[id] || {}
    const beam = st.beam ?? (t.beam ? cap(t.beam) : 'None')
    return { ...t, beam: beam === 'None' ? null : beam, hide: st.hide ?? !!t.hide }
  }

  return (
    <div className="space-y-3">
      {/* controls */}
      <div className="flex flex-wrap items-center gap-4">
        <Toggle checked={beams} onChange={setBeams} label="Beams" />
        <span className="text-[12px] text-poe-text">Background:</span>
        <div className="flex gap-1">
          {BACKGROUNDS.map(b => (
            <button key={b} onClick={() => setBg(b)}
              className={`px-2 h-7 text-[11px] rounded border ${bg === b ? 'border-poe-gold text-poe-gold' : 'border-poe-line text-poe-text hover:text-poe-heading'}`}>{b}</button>
          ))}
        </div>
      </div>

      {/* the in-game scene */}
      <div className="relative rounded border border-poe-line overflow-hidden min-h-[360px]"
        style={{ background: SCENE[bg] }}>
        <div className="absolute inset-0 flex flex-wrap items-center justify-center gap-x-10 gap-y-9 p-10">
          {SAMPLES.map((s, i) => {
            const t = tierStyle(s.tier)
            if (t.hide) return null
            return <ItemLabel key={i} text={s.text} textColor={t.textColor} beam={t.beam}
              minimap={!!t.beam} showBeam={beams} fontSize={32 + (s.tier === 'S' ? 8 : s.tier === 'A' ? 5 : 0)} />
          })}
          <ItemLabel text={UNIQUE.text} textColor={UNIQUE.textColor} beam={UNIQUE.beam} minimap showBeam={beams} fontSize={36} />
        </div>
      </div>

      <p className="text-[11.5px] text-poe-text text-center">
        Live preview of how <span className="text-poe-text-bright">{active.name}</span> renders in-game. Tier colors, beams and minimap icons come from your Cosmetic settings.
      </p>
    </div>
  )
}

const cap = (s) => s ? s[0].toUpperCase() + s.slice(1) : s
const SCENE = {
  Woods: 'radial-gradient(120% 90% at 50% 10%, #1a2417 0%, #0c120c 70%), #0a0e0a',
  Desert: 'radial-gradient(120% 90% at 50% 10%, #2a2418 0%, #120f0a 70%), #100c08',
  Marshes: 'radial-gradient(120% 90% at 50% 10%, #16221f 0%, #0a1110 70%), #08100e',
  Caves: 'radial-gradient(120% 90% at 50% 10%, #201a22 0%, #0d0a10 70%), #0a080d',
}

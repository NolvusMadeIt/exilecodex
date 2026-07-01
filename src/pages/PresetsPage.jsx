import React from 'react'
import { Check } from 'lucide-react'
import { useFilter } from '../store/FilterStore.jsx'
import { STRICTNESS_LEVELS, STYLES } from '../data/coreFilters.js'
import { strictnessProfile } from '../data/strictness.js'
import { StartFilterChoices } from '../components/StartFilterChoices.jsx'
import { useT } from '../i18n/index.js'

export function PresetsPage() {
  const { active, update } = useFilter()
  const t = useT()
  const strictness = active.strictness || '1-regular'
  const style = active.style || 'default'

  return (
    <div className="space-y-6">
      {/* How do you want to start? */}
      <div>
        <div className="text-center mb-3">
          <h1 className="gold-heading text-[22px]">{t('Start your filter')}</h1>
          <p className="text-[12px] text-poe-text mt-0.5">{t('Start from a clean slate, or bring in a filter you already have.')}</p>
        </div>
        <div className="max-w-[560px] mx-auto">
          <StartFilterChoices mode="current" showPreset={false} />
        </div>
      </div>

      {/* Strictness preset — picks the real core filter your filter is built on */}
      <div className="border-t border-poe-line pt-5">
        <div className="text-center mb-3">
          <h1 className="gold-heading text-[22px]">Choose a strictness</h1>
          <p className="text-[12px] text-poe-text mt-1 max-w-[760px] mx-auto">
            This is the foundation of your filter — a complete, in-game-ready ruleset. Softer levels show more; stricter levels hide more clutter. You can fine-tune anything afterwards in the Quick Editor.
          </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
          {STRICTNESS_LEVELS.map(s => {
            const on = s.id === strictness
            return (
              <button key={s.id} onClick={() => update({ strictness: s.id, quickFilters: { ...strictnessProfile(s.id) } })}
                title={s.blurb}
                className={`relative group rounded border text-left p-2.5 h-full flex flex-col transition-colors ${on ? 'border-poe-gold shadow-glow bg-poe-gold/5' : 'border-poe-line hover:border-poe-gold-dim hover:bg-[#1a1a1c]'}`}>
                <div className="flex items-center justify-between">
                  <span className={`grid place-items-center w-7 h-7 rounded font-smallcaps text-[15px] ${on ? 'bg-poe-gold text-black' : 'bg-black/50 text-poe-gold-dim border border-poe-line'}`}>{s.n}</span>
                  {s.recommended && <span className="text-[9px] uppercase tracking-wide bg-poe-gold/90 text-black px-1 rounded-sm">Rec</span>}
                  {on && !s.recommended && <Check size={14} className="text-poe-gold" />}
                </div>
                <div className="heading text-[13px] mt-1.5 leading-tight">{s.name}</div>
                {/* strictness meter */}
                <div className="flex gap-0.5 mt-1.5">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <span key={i} className={`h-1 flex-1 rounded-sm ${i < s.n ? (on ? 'bg-poe-gold' : 'bg-poe-gold-dim') : 'bg-poe-line'}`} />
                  ))}
                </div>
                <p className="text-[10.5px] text-poe-text leading-snug mt-1.5 line-clamp-4">{s.blurb}</p>
              </button>
            )
          })}
        </div>
      </div>

      {/* Style — swaps the visual skin (a different real core file) */}
      <div className="border-t border-poe-line pt-5">
        <div className="text-center mb-3">
          <h2 className="gold-heading text-[18px]">Style</h2>
          <p className="text-[12px] text-poe-text mt-1">The look of your highlights — colors, borders, beams and sounds. The rules stay the same.</p>
        </div>
        <div className="flex flex-wrap justify-center gap-2 max-w-[860px] mx-auto">
          {STYLES.map(st => {
            const on = st.id === style
            return (
              <button key={st.id} onClick={() => update({ style: st.id })} title={st.blurb}
                className={`rounded border px-3 py-2 text-center transition-colors min-w-[110px] ${on ? 'border-poe-gold shadow-glow bg-poe-gold/5' : 'border-poe-line hover:border-poe-gold-dim hover:bg-[#1a1a1c]'}`}>
                <div className={`heading text-[13px] ${on ? 'text-poe-gold' : ''}`}>{st.name}</div>
                <div className="text-[10.5px] text-poe-text leading-snug mt-0.5">{st.blurb}</div>
              </button>
            )
          })}
        </div>
        <p className="text-[11px] text-poe-text/70 text-center mt-2">
          The “Custom Sounds” style adds voice/sound files — they’re bundled with the app and must sit next to the filter in your Path of Exile 2 folder.
        </p>
      </div>
    </div>
  )
}

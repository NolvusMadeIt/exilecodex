import React from 'react'
import { Check, Volume2 } from 'lucide-react'
import { useFilter } from '../store/FilterStore.jsx'
import { STRICTNESS_LEVELS, STYLES } from '../data/coreFilters.js'
import { strictnessProfile } from '../data/strictness.js'
import { STYLE_PRESETS } from '../data/styles.js'
import { DROP_TIERS } from '../data/dropTiers.js'
import { StartFilterChoices } from '../components/StartFilterChoices.jsx'
import { ItemLabel } from '../components/ItemLabel.jsx'
import { useT } from '../i18n/index.js'

// What each strictness level actually does to a handful of telltale drops — derived straight
// from the level's real quick-filter profile, so the preview can never drift from the filter.
// Colors are the drops' authentic in-game label colors (currency tan, magic blue, gem teal).
function strictnessRows(p) {
  return [
    { name: 'Scroll of Wisdom', color: [170, 158, 130], show: !p.hideScrolls },
    { name: 'Gold ×64', color: [235, 205, 95], show: !p.hideGold && !(p.minGoldPile > 100) },
    { name: 'Magic Boots', color: [110, 130, 255], show: p.gearMinRarity === 'all' || p.gearMinRarity === 'Magic' },
    { name: 'Life Flask', color: [200, 200, 200], show: (p.flasksShow || []).includes('life') && !p.hideNonUniqueFlasks },
    { name: 'Skill Gem', color: [27, 180, 170], show: (p.gemsShow || []).includes('skill') },
    { name: 'Exalted Orb', color: [230, 170, 60], border: [230, 170, 60, 160], show: true },
  ]
}

function StrictnessPreview({ profile }) {
  return (
    <div className="label-ground mt-1.5 flex flex-col items-start gap-[3px] rounded-sm px-2 py-2">
      {strictnessRows(profile).map((r) => (
        <ItemLabel key={r.name} text={r.name} textColor={r.color} borderColor={r.border}
          fontSize={22} showBeam={false} hidden={!r.show} />
      ))}
    </div>
  )
}

// A style card's preview: the top tiers rendered as in-game labels with that style's REAL
// per-tier preset (data/styles.js) merged over the built-in tier defaults — on game ground.
const PREVIEW_TIERS = [
  { tier: 'S', text: 'Divine Orb', shape: 'star' },
  { tier: 'A', text: 'Exalted Orb', shape: 'diamond' },
  { tier: 'C', text: 'Chaos Orb', shape: 'circle' },
]

function StylePreview({ styleId }) {
  const preset = STYLE_PRESETS[styleId] || {}
  return (
    <div className="label-ground mt-2 flex flex-col items-start gap-1.5 rounded-sm px-2.5 py-2.5">
      {PREVIEW_TIERS.map(({ tier, text, shape }) => {
        const base = DROP_TIERS.find((t) => t.id === tier)
        const s = preset[tier] || {}
        const beam = s.beam === 'None' ? null : (s.beam || base.beam)
        return (
          <span key={tier} className="inline-flex items-center gap-1">
            <ItemLabel text={text}
              textColor={s.textColor || base.textColor}
              bgColor={s.bgColor}
              borderColor={s.borderColor}
              fontSize={Math.min(s.fontSize || 30, 34)}
              beam={beam}
              showBeam={false}
              minimap minimapShape={shape} />
            {styleId === 'alerts' && <Volume2 size={13} className="text-poe-text/70" />}
          </span>
        )
      })}
    </div>
  )
}

export function PresetsPage() {
  const { active, update } = useFilter()
  const t = useT()
  const strictness = active.strictness || '1-regular'
  const style = active.style || 'default'

  return (
    <div className="space-y-6">
      {/* How do you want to start? */}
      <div>
        <div className="mb-3">
          <h1 className="gold-heading text-[22px]">{t('Start your filter')}</h1>
          <p className="text-[12px] text-poe-text mt-0.5">{t('Start from a clean slate, or bring in a filter you already have.')}</p>
        </div>
        <div className="max-w-[560px]">
          <StartFilterChoices mode="current" showPreset={false} />
        </div>
      </div>

      {/* Strictness preset — writes a full quick-filter profile so every page mirrors the choice */}
      <div className="border-t border-poe-line pt-5">
        <div className="mb-3">
          <h1 className="gold-heading text-[22px]">Choose a strictness</h1>
          <p className="text-[12px] text-poe-text mt-1 max-w-[760px]">
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
                {/* live consequence preview — struck rows are what this level hides */}
                <StrictnessPreview profile={strictnessProfile(s.id)} />
                <p className="text-[10.5px] text-poe-text leading-snug mt-1.5 line-clamp-3">{s.blurb}</p>
              </button>
            )
          })}
        </div>
      </div>

      {/* Style — a real per-tier cosmetic preset layered under your Cosmetic page edits */}
      <div className="border-t border-poe-line pt-5">
        <div className="mb-3">
          <h2 className="gold-heading text-[18px]">Style</h2>
          <p className="text-[12px] text-poe-text mt-1 max-w-[760px]">
            The look of your tier highlights — colors, borders, backgrounds, beams and sounds change in the generated filter.
            The rules stay the same, and anything you set on the Cosmetic page still wins.
          </p>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 max-w-[980px]">
          {STYLES.map(st => {
            const on = st.id === style
            return (
              <button key={st.id} onClick={() => update({ style: st.id })} title={st.blurb}
                className={`rounded border px-3 py-2.5 text-left transition-colors ${on ? 'border-poe-gold shadow-glow bg-poe-gold/5' : 'border-poe-line hover:border-poe-gold-dim hover:bg-[#1a1a1c]'}`}>
                <div className="flex items-center justify-between">
                  <div className={`heading text-[13px] ${on ? 'text-poe-gold' : ''}`}>{st.name}</div>
                  {on && <Check size={14} className="text-poe-gold" />}
                </div>
                <div className="text-[10.5px] text-poe-text leading-snug mt-0.5">{st.blurb}</div>
                {/* the style's real per-tier look, rendered as in-game labels */}
                <StylePreview styleId={st.id} />
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

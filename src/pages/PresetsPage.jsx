import React from 'react'
import { Eye } from 'lucide-react'
import { useFilter } from '../store/FilterStore.jsx'
import { PRESETS, CLASSES, ENDGAME_CONTENT, GAME_MODES } from '../data/presets.js'
import { Toggle, Help, ItemIcon } from '../components/primitives.jsx'
import { StartFilterChoices } from '../components/StartFilterChoices.jsx'

export function PresetsPage() {
  const { active, update, updateSlice } = useFilter()
  const selected = PRESETS.find(p => p.id === active.preset)

  const applyPreset = (p) => {
    update(f => ({
      ...f,
      preset: p.id,
      endgameContent: {
        ...f.endgameContent,
        // late/very-late default to stricter (hide low-value)
        showLowValueUniques: p.tier >= 4,
        showAllIdentified: p.tier >= 5,
      },
    }))
  }

  return (
    <div className="space-y-6">
      {/* How do you want to start? */}
      <div>
        <div className="text-center mb-3">
          <h1 className="gold-heading text-[22px]">Start your filter</h1>
          <p className="text-[12px] text-poe-text mt-0.5">Start from a clean slate, or bring in a filter you already have.</p>
        </div>
        <div className="max-w-[560px] mx-auto">
          <StartFilterChoices mode="current" showPreset={false} />
        </div>
      </div>

      {/* OR — the preset path below */}
      <div className="flex items-center gap-4 max-w-[760px] mx-auto py-1">
        <div className="flex-1 h-px bg-gradient-to-r from-transparent to-poe-line" />
        <span className="font-smallcaps text-poe-gold text-[34px] leading-none tracking-[0.06em] select-none">Or</span>
        <div className="flex-1 h-px bg-gradient-to-l from-transparent to-poe-line" />
      </div>

      {/* Select your class — the preset path */}
      <div>
        <div className="text-center mb-3">
          <h1 className="gold-heading text-[22px]">Select your class</h1>
          <p className="text-[12px] text-poe-text mt-0.5">Shows items relevant to your class, such as your main weapon and armour types.</p>
        </div>
        <div className="grid grid-cols-4 sm:grid-cols-8 gap-3 max-w-[920px] mx-auto">
          {CLASSES.map(c => {
            const on = c.id === active.klass
            return (
              <button key={c.id} onClick={() => update({ klass: on ? null : c.id })}
                className={`rounded border overflow-hidden text-center transition-colors ${on ? 'border-poe-gold shadow-glow' : 'border-poe-line hover:border-poe-gold-dim'}`}>
                <div className="heading text-[12px] pt-1.5">{c.name}</div>
                <div className="aspect-square mt-1 bg-black/40 overflow-hidden">
                  <img src={c.img} alt={c.name} loading="lazy"
                    className={`w-full h-full object-cover ${on ? '' : 'opacity-85'}`}
                    onError={e => { e.currentTarget.style.opacity = 0 }} />
                </div>
              </button>
            )
          })}
        </div>
      </div>

      {/* Select where you are at in the game */}
      <div className="text-center border-t border-poe-line pt-5">
        <h1 className="gold-heading text-[22px]">Select where you are at in the game</h1>
        <p className="text-[12px] text-poe-text mt-1">
          This will set several Quick Filters and an appropriate Tiering Mode for Currency and Uniques.
        </p>
      </div>

      {/* Preset cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {PRESETS.map(p => {
          const on = p.id === active.preset
          return (
            <button key={p.id} onClick={() => applyPreset(p)}
              className={`relative group rounded border text-center overflow-hidden transition-colors ${on ? 'border-poe-gold shadow-glow' : 'border-poe-line hover:border-poe-gold-dim'}`}>
              <div className="pt-2 px-1">
                <div className="heading text-[14px] leading-tight">{p.name}</div>
                <div className="text-[11px] text-poe-text">{p.level}</div>
              </div>
              <div className="mt-1.5 aspect-square overflow-hidden bg-black/40">
                <img src={p.img} alt={p.name} loading="lazy"
                  className={`w-full h-full object-cover transition-transform group-hover:scale-105 ${on ? '' : 'opacity-85'}`}
                  onError={e => { e.currentTarget.style.opacity = 0 }} />
              </div>
              {on && <span className="absolute top-1 right-1 text-[10px] bg-poe-gold/90 text-black px-1 rounded-sm font-smallcaps">SELECTED</span>}
              <span title="Preview changes" className="absolute bottom-1 right-1 text-poe-text-bright/70 opacity-0 group-hover:opacity-100">
                <Eye size={13} />
              </span>
            </button>
          )
        })}
      </div>

      {/* Contextual blurb (appears once a preset is picked) */}
      {selected && (
        <p className="text-center text-[12.5px] text-poe-text-bright/90 italic max-w-[820px] mx-auto">
          {selected.blurb}
        </p>
      )}

      {/* Game Mode & Economy */}
      <div className="border-t border-poe-line pt-4">
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          <span className="text-[12px] text-poe-text font-smallcaps tracking-wide">Game Mode &amp; Economy <Help text="Choose league/economy, hardcore, or SSF tiering." /></span>
          {GAME_MODES.map(m => (
            <Toggle key={m.id} checked={!!active.gameMode[m.id]} onChange={v => updateSlice('gameMode', { [m.id]: v })}
              label={<>{m.label}{m.sub && <span className="text-poe-gold-dim"> {m.sub}</span>}</>} help={m.help} />
          ))}
        </div>
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mt-2">
          <Toggle checked={!!active.options.customizeTopTier} onChange={v => updateSlice('options', { customizeTopTier: v })}
            label="Change Top-Tier Item Label Styles" help="Customize how the best drops look on the Cosmetic page." />
          <Toggle checked={!!active.options.transparentGold} onChange={v => updateSlice('options', { transparentGold: v })}
            label="Transparent Gold" help="Use a transparent background for gold piles." />
        </div>
      </div>

      {/* Endgame Content (only for endgame presets) */}
      {selected?.endgame && (
        <div className="border-t border-poe-line pt-4">
          <div className="text-center mb-3">
            <h2 className="gold-heading text-[18px]">Endgame Content</h2>
            <p className="text-[12px] text-poe-text mt-0.5">
              Select which endgame content you are occasionally engaging with. Deselecting hides items that aren't relevant to you.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {ENDGAME_CONTENT.map(c => (
              <Toggle key={c.id} checked={!!active.endgameContent[c.id]} onChange={v => updateSlice('endgameContent', { [c.id]: v })}
                label={c.label} help={c.help} />
            ))}
          </div>
        </div>
      )}

    </div>
  )
}

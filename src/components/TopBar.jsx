import React, { useState } from 'react'
import { IconButton, Tooltip } from '@mui/material'
import { HelpCircle } from 'lucide-react'
import { useFilter } from '../store/FilterStore.jsx'
import { usePrefs, THEMES } from '../store/Prefs.jsx'
import { useRouter } from '../lib/router.jsx'
import { FilterSelector } from './FilterSelector.jsx'
import { HelpLegend } from './HelpLegend.jsx'
import { ActionBar } from './ActionBar.jsx'

// Slim top app bar for the Filter Studio: brand, active-filter selector, theme switch,
// the global actions (Import/Save/Copy/Reset) and the legend.
export function TopBar() {
  const { active } = useFilter()
  const { prefs, update } = usePrefs()
  const { navigate } = useRouter()
  const [selectorOpen, setSelectorOpen] = useState(false)
  const [legendOpen, setLegendOpen] = useState(false)

  return (
    <header className="flex items-center gap-3 h-14 px-4 border-b border-poe-line bg-black/40 backdrop-blur-sm shrink-0">
      {/* Brand */}
      <button onClick={() => navigate('/presets')} className="flex items-center gap-2 group shrink-0" aria-label="Nolvus Filter — home">
        <span className="text-poe-gold text-[15px] leading-none">◣</span>
        <span className="font-display font-semibold tracking-[0.16em] text-[13.5px] text-poe-heading group-hover:text-poe-gold transition-colors">NOLVUS FILTER</span>
      </button>

      {/* Active filter selector */}
      <button onClick={() => setSelectorOpen(true)}
        className="flex items-center gap-2 px-2.5 h-7 rounded border border-poe-line bg-poe-panel hover:border-poe-gold-dim/60 text-[12px] shrink-0"
        title="Switch or manage filters">
        <span className="text-poe-text-bright max-w-[150px] truncate">{active?.name}</span>
        {active?.version && <span className="font-mono text-poe-text/55 text-[11px]">v{active.version}</span>}
        <span className="text-poe-gold text-[11px]">Change</span>
      </button>

      <div className="ml-auto flex items-center gap-3">
        {/* Theme switch */}
        <div className="hidden md:flex items-center gap-1.5" role="group" aria-label="Theme">
          {THEMES.map(t => (
            <button key={t.id} onClick={() => update({ theme: t.id })} title={t.name} aria-label={`${t.name} theme`}
              className={`w-3.5 h-3.5 rounded-full transition-all ${prefs.theme === t.id ? 'ring-2 ring-offset-2 ring-offset-poe-bg ring-poe-gold scale-110' : 'opacity-45 hover:opacity-90'}`}
              style={{ background: t.swatch }} />
          ))}
        </div>

        {/* Global actions */}
        <ActionBar />

        {/* Legend */}
        <Tooltip title="Open the filter legend (comparators, tiers, rarities, terminology)" arrow>
          <IconButton onClick={() => setLegendOpen(true)} size="small" aria-label="Filter legend"
            sx={{
              borderRadius: '3px', color: 'rgb(var(--c-accent))',
              border: '1px solid rgb(var(--c-accent-dim) / 0.6)', backgroundColor: 'rgb(var(--c-accent) / 0.10)',
              '&:hover': { backgroundColor: 'rgb(var(--c-accent) / 0.18)', color: 'rgb(var(--c-accent))' },
            }}>
            <HelpCircle size={15} />
          </IconButton>
        </Tooltip>
      </div>

      {selectorOpen && <FilterSelector onClose={() => setSelectorOpen(false)} />}
      {legendOpen && <HelpLegend onClose={() => setLegendOpen(false)} />}
    </header>
  )
}

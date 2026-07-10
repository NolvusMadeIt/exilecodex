import React, { useState } from 'react'
import { IconButton, Tooltip } from '@mui/material'
import { HelpCircle, Menu } from 'lucide-react'
import { useFilter } from '../store/FilterStore.jsx'
import { useRouter } from '../lib/router.jsx'
import { FilterSelector } from './FilterSelector.jsx'
import { HelpLegend } from './HelpLegend.jsx'
import { ActionBar } from './ActionBar.jsx'
import { LangPicker } from './LangPicker.jsx'
import { useT } from '../i18n/index.js'

// Slim top app bar for the Filter Studio: brand, active-filter selector, theme switch,
// the global actions (Import/Save/Copy/Reset) and the legend.
// The filter chip (name / version / Change) only belongs where you're working ON the filter.
const STUDIO_ROUTES = new Set(['/', '/presets', '/quick-editor', '/quick-filters', '/tier-lists', '/custom-rules', '/cosmetic', '/editor', '/preview'])

export function TopBar({ onToggleNav }) {
  const { active } = useFilter()
  const { path, navigate } = useRouter()
  const t = useT()
  const [selectorOpen, setSelectorOpen] = useState(false)
  const [legendOpen, setLegendOpen] = useState(false)
  const inStudio = STUDIO_ROUTES.has(path)

  return (
    <header className="flex items-center gap-2 md:gap-3 h-14 px-3 md:px-4 border-b border-poe-line bg-black/40 backdrop-blur-sm shrink-0">
      {/* Nav drawer toggle — only below md, where the rail is hidden */}
      <button onClick={onToggleNav} aria-label="Open navigation"
        className="md:hidden grid place-items-center w-8 h-8 rounded border border-poe-line text-poe-text hover:text-poe-gold hover:border-poe-gold-dim/60 shrink-0">
        <Menu size={16} />
      </button>

      {/* Brand — icon + gold wordmark, doubles as the home button */}
      <button onClick={() => navigate('/presets')} className="flex items-center gap-2 group shrink-0" aria-label="Exile Codex — home" title="Exile Codex — home">
        <img src="/128.png" alt="Exile Codex" draggable={false}
          className="h-8 w-8 object-contain transition-transform group-hover:scale-105"
          style={{ filter: 'drop-shadow(0 1px 4px rgba(0,0,0,0.55))' }} />
        <img src="/wordmark.png" alt="" draggable={false}
          className="hidden sm:block h-[22px] w-auto object-contain opacity-95 group-hover:opacity-100" />
      </button>

      {/* Active filter selector — only while working in the Filter Studio */}
      {inStudio && (
        <button onClick={() => setSelectorOpen(true)}
          className="flex items-center gap-2 px-2.5 h-7 rounded border border-poe-line bg-poe-panel hover:border-poe-gold-dim/60 text-[12px] min-w-0"
          title="Switch or manage filters">
          <span className="text-poe-text-bright max-w-[90px] md:max-w-[150px] truncate">{active?.name}</span>
          {active?.version && <span className="hidden md:inline font-mono text-poe-text/55 text-[11px]">v{active.version}</span>}
          <span className="hidden md:inline text-poe-gold text-[11px]">{t('Change')}</span>
        </button>
      )}

      <div className="ml-auto flex items-center gap-3">
        {/* Filter actions — like the chip, they belong to the Filter Studio */}
        {inStudio && <ActionBar />}

        {/* Language — desktop only; the setting also lives in Settings */}
        <div className="hidden md:block"><LangPicker /></div>

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

import React, { useState } from 'react'
import { useFilter } from '../store/FilterStore.jsx'
import { FilterSelector } from './FilterSelector.jsx'

export function Header() {
  const { active } = useFilter()
  const [selectorOpen, setSelectorOpen] = useState(false)
  return (
    <header className="relative">
      <div className="app-shell pt-2.5 flex items-start justify-end text-[12px]">
        <div className="text-poe-text">
          Active filter: <span className="text-poe-text-bright font-medium">{active?.name}</span>{' '}
          {active?.version && <span className="font-mono text-poe-text/70">v{active.version}</span>}{' '}
          <button className="text-poe-gold hover:text-poe-steel-light underline-offset-2 hover:underline" onClick={() => setSelectorOpen(true)}>Change</button>
        </div>
      </div>

      {/* Own wordmark — modern Sora type, no PoE chrome */}
      <div className="flex flex-col items-center justify-center pt-2 pb-4 select-none">
        <div className="flex items-baseline gap-2">
          <span className="gold-heading text-[32px] leading-none">Nolvus’s</span>
          <span className="heading text-[32px] leading-none">Filter</span>
        </div>
        <span className="mt-2 text-[10.5px] tracking-[0.24em] uppercase text-poe-text/65 font-display">PoE2 Loot Filter Editor</span>
      </div>

      {selectorOpen && <FilterSelector onClose={() => setSelectorOpen(false)} />}
    </header>
  )
}

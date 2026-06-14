import React, { useState } from 'react'
import { useFilter } from '../store/FilterStore.jsx'
import { FilterSelector } from './FilterSelector.jsx'

export function Header() {
  const { active } = useFilter()
  const [selectorOpen, setSelectorOpen] = useState(false)
  return (
    <header className="relative">
      <div className="app-shell pt-2 flex items-start justify-end text-[12px]">
        <div className="text-poe-text">
          Active filter: <span className="text-poe-text-bright">{active?.name}</span>{' '}
          {active?.version && <span className="font-mono text-poe-text/80">v{active.version}</span>}{' '}
          (<button className="text-poe-steel-light hover:text-poe-text-bright" onClick={() => setSelectorOpen(true)}>Change</button>)
        </div>
      </div>

      {/* Centered wordmark (PoE2-styled, NOT their logo) */}
      <div className="flex flex-col items-center justify-center pt-3 pb-1 select-none">
        <div className="flex items-center gap-2">
          <span className="text-[15px] tracking-[0.3em] text-poe-text-bright font-smallcaps">PATH OF EXILE 2</span>
        </div>
        <div className="relative px-8 py-1 mt-0.5">
          <span className="gold-heading text-[34px] leading-none drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)]">Nolvus’s</span>
          <span className="heading text-[34px] leading-none ml-2 drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)]">Filter</span>
        </div>
      </div>

      {selectorOpen && <FilterSelector onClose={() => setSelectorOpen(false)} />}
    </header>
  )
}

import React, { useEffect, useState } from 'react'
import { Minus, Square, X } from 'lucide-react'

// The desktop shell exposes this; in a browser it's undefined, so the bar never renders.
const api = typeof window !== 'undefined' ? window.nolvusDesktop : null

// Custom frameless-window title bar (desktop only): drag to move, double-click to maximize,
// and minimise / maximise-restore / close buttons. Web build renders nothing.
export function TitleBar() {
  if (!api?.isDesktop) return null
  return <DesktopTitleBar />
}

function DesktopTitleBar() {
  const [maxed, setMaxed] = useState(false)

  useEffect(() => {
    api.isMaximized?.().then(setMaxed).catch(() => {})
    const unsub = api.onMaximizeChange?.(setMaxed)
    return () => { if (typeof unsub === 'function') unsub() }
  }, [])

  return (
    <div
      className="flex items-stretch h-8 shrink-0 bg-[#0a0a0c] border-b border-poe-line select-none"
      style={{ WebkitAppRegion: 'drag' }}
      onDoubleClick={() => api.toggleMaximize?.()}
    >
      <div className="flex items-center gap-2 px-3">
        <span className="text-poe-gold text-[12px] leading-none">◣</span>
        <span className="font-display font-semibold tracking-[0.14em] text-[10.5px] text-poe-heading/80">NOLVUS'S FILTER</span>
      </div>
      <div className="flex-1" />
      <div className="flex items-stretch" style={{ WebkitAppRegion: 'no-drag' }}>
        <WinBtn label="Minimize" onClick={() => api.minimize?.()}><Minus size={15} /></WinBtn>
        <WinBtn label={maxed ? 'Restore' : 'Maximize'} onClick={() => api.toggleMaximize?.()}>
          {maxed ? <RestoreIcon /> : <Square size={12} />}
        </WinBtn>
        <WinBtn label="Close" danger onClick={() => api.close?.()}><X size={16} /></WinBtn>
      </div>
    </div>
  )
}

function WinBtn({ children, onClick, label, danger }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      title={label}
      className={`w-[46px] grid place-items-center text-poe-text transition-colors ${danger ? 'hover:bg-[#e81123] hover:text-white' : 'hover:bg-white/10 hover:text-poe-heading'}`}
    >
      {children}
    </button>
  )
}

// The Windows "restore down" glyph — two overlapping squares.
function RestoreIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round">
      <rect x="2" y="3.4" width="6.2" height="6.2" rx="0.6" />
      <path d="M4.4 3.4 V2 a0.6 0.6 0 0 1 0.6 -0.6 H9.8 a0.6 0.6 0 0 1 0.6 0.6 V7.2 a0.6 0.6 0 0 1 -0.6 0.6 H8.6" />
    </svg>
  )
}

import React, { useEffect, useState } from 'react'
import { Minus, X } from 'lucide-react'
import { desktopApi, isDesktopChrome } from '../lib/desktop.js'

// Ornate frameless-window title bar (desktop shell only): drag to move, double-click to
// maximize, and gold-lit minimize / maximize-restore / close controls. The web build
// renders nothing — no native bar, no custom bar.
export function TitleBar() {
  if (!isDesktopChrome()) return null
  return <OrnateTitleBar />
}

function OrnateTitleBar() {
  const [maxed, setMaxed] = useState(false)
  useEffect(() => {
    desktopApi?.isMaximized?.().then(setMaxed).catch(() => {})
    const unsub = desktopApi?.onMaximizeChange?.(setMaxed)
    return () => { if (typeof unsub === 'function') unsub() }
  }, [])

  return (
    <div
      className="relative flex items-center h-9 shrink-0 select-none"
      style={{
        WebkitAppRegion: 'drag',
        background: 'linear-gradient(180deg, #15110d 0%, #0a0807 100%)',
        boxShadow: 'inset 0 1px 0 rgb(var(--c-accent2) / 0.40), inset 0 -1px 0 rgb(var(--c-accent2) / 0.28)',
      }}
      onDoubleClick={() => desktopApi?.toggleMaximize?.()}
    >
      {/* top-left window-corner flourish */}
      <div className="absolute left-0 top-0" style={{ width: 34, height: 34, color: 'rgb(var(--c-accent2))' }}>
        <svg width="34" height="34" viewBox="0 0 34 34" fill="none">
          <path d="M3 34 L3 12 C3 7 7 3 12 3 L34 3" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="11" cy="11" r="1.9" fill="currentColor" />
        </svg>
      </div>

      {/* centered title cartouche */}
      <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2.5">
        <Flourish />
        <img src="/128.png" alt="" draggable={false} className="h-[18px] w-[18px] object-contain"
          style={{ filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.8))' }} />
        <span className="font-display font-semibold text-[11px] tracking-[0.34em]"
          style={{ color: 'rgb(var(--c-accent2))', textShadow: '0 1px 3px rgba(0,0,0,0.85)' }}>
          NOLVUS'S&nbsp;FILTER
        </span>
        <Flourish flip />
      </div>

      {/* window controls */}
      <div className="ml-auto flex items-stretch" style={{ WebkitAppRegion: 'no-drag' }}>
        <WinBtn label="Minimize" onClick={() => desktopApi?.minimize?.()}><Minus size={15} /></WinBtn>
        <WinBtn label={maxed ? 'Restore' : 'Maximize'} onClick={() => desktopApi?.toggleMaximize?.()}>
          {maxed ? <RestoreIcon /> : <MaxIcon />}
        </WinBtn>
        <WinBtn label="Close" danger onClick={() => desktopApi?.close?.()}><X size={16} /></WinBtn>
      </div>
    </div>
  )
}

function WinBtn({ children, onClick, label, danger }) {
  return (
    <button
      type="button" onClick={onClick} aria-label={label} title={label}
      className="group relative w-[44px] grid place-items-center"
      style={{ color: 'rgb(var(--c-accent2))' }}
    >
      {/* thin gold divider */}
      <span className="absolute inset-y-[7px] left-0 w-px" style={{ background: 'rgb(var(--c-accent2) / 0.22)' }} />
      {/* hover wash — coral for close, gold for the rest */}
      <span className="absolute inset-0 opacity-0 transition-opacity duration-150 group-hover:opacity-100"
        style={{ background: danger ? 'rgb(var(--c-danger) / 0.92)' : 'rgb(var(--c-accent2) / 0.16)' }} />
      <span className={`relative z-10 transition-colors ${danger ? 'group-hover:text-white' : 'group-hover:brightness-125'}`}>
        {children}
      </span>
    </button>
  )
}

// Small decorative line that ends in a diamond; flips for the right side of the cartouche.
function Flourish({ flip }) {
  return (
    <svg width="34" height="8" viewBox="0 0 34 8" fill="none"
      style={{ color: 'rgb(var(--c-accent2))', transform: flip ? 'scaleX(-1)' : undefined }}>
      <path d="M0 4 H23" stroke="currentColor" strokeOpacity="0.5" strokeWidth="1" />
      <path d="M23 4 L27 1.5 L31 4 L27 6.5 Z" fill="currentColor" fillOpacity="0.85" />
    </svg>
  )
}

function MaxIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 11 11" fill="none" stroke="currentColor" strokeWidth="1.3">
      <rect x="1.4" y="1.4" width="8.2" height="8.2" rx="1" />
    </svg>
  )
}

// Windows "restore down" glyph — two overlapping squares.
function RestoreIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round">
      <rect x="2" y="3.4" width="6.2" height="6.2" rx="0.6" />
      <path d="M4.4 3.4 V2 a0.6 0.6 0 0 1 0.6 -0.6 H9.8 a0.6 0.6 0 0 1 0.6 0.6 V7.2 a0.6 0.6 0 0 1 -0.6 0.6 H8.6" />
    </svg>
  )
}

import React, { useState } from 'react'
import { Monitor, Download } from 'lucide-react'
import { desktopApi, DOWNLOAD_URL } from '../lib/desktop.js'

const KEY = 'nolvus-promo-dismissed'

// Slim bottom bar (web only) pitching the desktop app's in-game overlay. Hidden inside the
// desktop app, and permanently dismissible — a one-time "I already have it" for people who
// downloaded it elsewhere (the web can't detect an installed app).
export function DesktopPromoBanner() {
  const isDesktop = !!desktopApi?.isDesktop
  const [dismissed, setDismissed] = useState(() => {
    try { return localStorage.getItem(KEY) === '1' } catch { return false }
  })
  if (isDesktop || dismissed) return null

  const dismiss = () => {
    try { localStorage.setItem(KEY, '1') } catch {}
    setDismissed(true)
  }

  return (
    <div className="shrink-0 flex items-center gap-3 px-4 h-9 border-t border-poe-line bg-black/55 text-[12px]">
      <Monitor size={14} className="text-poe-gold shrink-0" />
      <span className="text-poe-text-bright truncate">
        <span className="hidden sm:inline">⚔ In a map right now? </span>The desktop app pins your filter <span className="text-poe-gold">over the game</span> — no alt-tabbing.
      </span>
      <div className="ml-auto flex items-center gap-2 shrink-0">
        <a href={DOWNLOAD_URL} target="_blank" rel="noreferrer" className="btn-action h-7"><Download size={13} /> Download</a>
        <button onClick={dismiss} className="btn-ghost h-7 text-[11px] whitespace-nowrap">✓ I already have it</button>
      </div>
    </div>
  )
}

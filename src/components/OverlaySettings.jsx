import React, { useState, useEffect } from 'react'
import { Gamepad2, Keyboard, Download } from 'lucide-react'
import { usePrefs } from '../store/Prefs.jsx'
import { desktopApi, DOWNLOAD_URL } from '../lib/desktop.js'
import { Toggle } from './primitives.jsx'
import { SimpleSelect } from './SimpleSelect.jsx'

// Settings → Game Overlay. Functional in the desktop app; on the web it shows a short
// pitch + download link (the feature can't run in a browser).
export function OverlaySettings() {
  const { prefs, update } = usePrefs()
  const isDesktop = !!desktopApi?.isDesktop
  const enabled = !!prefs.overlayEnabled
  const side = prefs.overlaySide || 'right'
  const display = prefs.overlayDisplay || 'auto'
  const hotkey = prefs.overlayHotkey || 'Shift+Alt+F'

  // Live list of connected monitors (desktop only), so the user can pin the overlay to the
  // screen the game runs on instead of letting it wander on a multi-monitor setup.
  const [displays, setDisplays] = useState([])
  useEffect(() => {
    if (!isDesktop) return
    let alive = true
    desktopApi.overlayGetDisplays?.().then(list => { if (alive) setDisplays(list || []) }).catch(() => {})
    return () => { alive = false }
  }, [isDesktop])

  const displayOptions = [
    { value: 'auto', label: 'Auto — the screen my mouse is on (recommended)' },
    { value: 'primary', label: 'Primary display' },
    ...displays.map(d => ({ value: d.id, label: `Display ${d.index} — ${d.width}×${d.height}${d.primary ? ' (primary)' : ''}` })),
  ]

  return (
    <section>
      <div className="section-bar">Game Overlay <span className="text-[10px] opacity-70">(desktop app)</span></div>

      {!isDesktop ? (
        <div className="panel p-3.5 mt-2 flex items-center gap-3 flex-wrap">
          <Gamepad2 size={20} className="text-poe-gold shrink-0" />
          <div className="flex-1 min-w-[220px]">
            <div className="text-[12.5px] text-poe-text-bright">Overlay your filter in-game</div>
            <div className="text-[11.5px] text-poe-text">Pin the app on top of Path of Exile 2 (Borderless) and toggle it with a hotkey — available only in the desktop app.</div>
          </div>
          <a href={DOWNLOAD_URL} target="_blank" rel="noreferrer" className="btn-action h-8 shrink-0"><Download size={14} /> Get the desktop app</a>
        </div>
      ) : (
        <div className="mt-2 space-y-3">
          <Toggle checked={enabled} onChange={v => update({ overlayEnabled: v })}
            label="Enable game overlay"
            help="Pins the window on top and slides it in from your chosen edge — about 38% of your screen wide and 90% tall, so the game stays visible alongside it. Run Path of Exile 2 in Borderless / Windowed mode — an overlay can't draw over exclusive Fullscreen." />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <div className="text-[11px] uppercase tracking-wide text-poe-text mb-1">Dock side</div>
              <SimpleSelect value={side} onChange={v => update({ overlaySide: v })} className="h-8"
                options={[{ value: 'left', label: 'Left' }, { value: 'right', label: 'Right' }]} />
            </div>
            <div>
              <div className="text-[11px] uppercase tracking-wide text-poe-text mb-1">Show / hide hotkey</div>
              <HotkeyCapture value={hotkey} onChange={v => update({ overlayHotkey: v })} />
            </div>
          </div>

          <div>
            <div className="text-[11px] uppercase tracking-wide text-poe-text mb-1">Show on display</div>
            <SimpleSelect value={display} onChange={v => update({ overlayDisplay: v })} className="h-8" options={displayOptions} />
            <p className="text-[11px] text-poe-text/70 mt-1">
              On a multi-monitor setup, “Auto” puts the overlay on whichever screen your mouse is on — i.e. the one you're playing on — so it never slides onto the wrong monitor. Or pin it to a specific display.
            </p>
          </div>

          <p className="text-[11px] text-poe-text/70">
            Run PoE2 in <span className="text-poe-text-bright">Borderless</span> so the overlay can sit on top. The hotkey fires even while the game is focused — tap it to bring the filter up or hide it without leaving the game.
          </p>
        </div>
      )}
    </section>
  )
}

// Records a key combo into an Electron accelerator (e.g. "Alt+Shift+F"). Requires at least
// one modifier, so it's a valid global hotkey that won't fire on a stray single keypress.
function HotkeyCapture({ value, onChange }) {
  const [recording, setRecording] = useState(false)

  const onKeyDown = (e) => {
    if (!recording) return
    e.preventDefault()
    const key = normalizeKey(e)
    if (!key) return // modifier-only press — keep waiting for the real key
    const mods = []
    if (e.ctrlKey) mods.push('Control')
    if (e.altKey) mods.push('Alt')
    if (e.shiftKey) mods.push('Shift')
    if (e.metaKey) mods.push('Super')
    if (!mods.length) return // require a modifier
    onChange([...mods, key].join('+'))
    setRecording(false)
  }

  return (
    <button type="button"
      onClick={() => setRecording(r => !r)}
      onKeyDown={onKeyDown}
      onBlur={() => setRecording(false)}
      className={`field h-8 flex items-center gap-2 w-full text-left ${recording ? 'border-poe-gold' : ''}`}>
      <Keyboard size={13} className="text-poe-text/70 shrink-0" />
      <span className="flex-1 font-mono text-poe-text-bright truncate">{recording ? 'Press a key combo…' : value}</span>
      <span className="text-[10px] text-poe-gold uppercase shrink-0">{recording ? 'recording' : 'change'}</span>
    </button>
  )
}

const SPECIAL = {
  ArrowUp: 'Up', ArrowDown: 'Down', ArrowLeft: 'Left', ArrowRight: 'Right',
  Escape: 'Escape', Enter: 'Return', Tab: 'Tab', Backspace: 'Backspace', Delete: 'Delete',
  ' ': 'Space',
}
function normalizeKey(e) {
  const k = e.key
  if (['Control', 'Alt', 'Shift', 'Meta'].includes(k)) return null
  if (SPECIAL[k]) return SPECIAL[k]
  if (/^[a-z]$/i.test(k)) return k.toUpperCase()
  if (/^[0-9]$/.test(k)) return k
  if (/^F\d{1,2}$/.test(k)) return k
  return k.length === 1 ? k : null // punctuation keys ( ` - = [ ] ; ' , . / \ ) pass through
}

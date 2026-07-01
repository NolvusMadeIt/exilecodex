import React, { useEffect, useState } from 'react'
import { FolderSearch, RefreshCw, ExternalLink } from 'lucide-react'
import { usePrefs } from '../../store/Prefs.jsx'

// Campaign Guide settings — shown on Settings ▸ Plugins ▸ Campaign Guide.
//   • displayMode    — in-app page vs. pop-out overlay window (desktop). Choosing "overlay" actually
//                      opens the always-on-top widget; "page" closes it.
//   • overlayHotkey  — global key to toggle the overlay while in-game.
//   • autoTrack      — tail PoE2's Client.txt to auto-detect your zone as you play.
//   • logPath        — device-local Client.txt override when it can't be found automatically.
const OVERLAY_PLUGIN = 'campaign-guide'
export const DEFAULT_OVERLAY_HOTKEY = 'Ctrl+Shift+G'

function KeybindInput({ value, onChange }) {
  const [capturing, setCapturing] = useState(false)
  const onKey = (e) => {
    e.preventDefault(); e.stopPropagation()
    if (['Control', 'Shift', 'Alt', 'Meta'].includes(e.key)) return
    const parts = []
    if (e.ctrlKey) parts.push('Ctrl')
    if (e.altKey) parts.push('Alt')
    if (e.shiftKey) parts.push('Shift')
    if (e.metaKey) parts.push('Meta')
    parts.push(e.key.length === 1 ? e.key.toUpperCase() : e.key)
    onChange(parts.join('+'))
    setCapturing(false)
  }
  return (
    <button onClick={() => setCapturing(true)} onKeyDown={capturing ? onKey : undefined} onBlur={() => setCapturing(false)}
      className="text-[12px] text-poe-text-bright border px-3 py-1.5 min-w-[110px] text-left"
      style={{ borderRadius: 2, background: 'rgb(var(--c-bg))', borderColor: capturing ? 'rgb(var(--c-accent))' : 'rgb(var(--c-line))' }}>
      {capturing ? 'Press keys…' : value || 'Unset'}
    </button>
  )
}

export function CampaignGuideSettings() {
  const { prefs, update } = usePrefs()
  const cg = prefs.pluginSettings?.['campaign-guide'] || {}
  const displayMode = cg.displayMode || 'page'
  const autoTrack = cg.autoTrack !== false // default ON
  const overlayHotkey = cg.overlayHotkey || DEFAULT_OVERLAY_HOTKEY
  const overlayOpacity = Math.max(0.3, Math.min(1, prefs.overlayOpacity ?? 1)) // window transparency (shared, top-level pref)

  const setCg = (patch) => update((p) => ({
    ...p,
    pluginSettings: { ...(p.pluginSettings || {}), 'campaign-guide': { ...(p.pluginSettings?.['campaign-guide'] || {}), ...patch } },
  }))

  const gameLog = typeof window !== 'undefined' ? window.nolvusGameLog : null
  const overlay = typeof window !== 'undefined' ? window.nolvusOverlay : null
  const timer = typeof window !== 'undefined' ? window.nolvusTimer : null
  const desktop = !!gameLog?.isDesktop || !!overlay?.isDesktop
  const [status, setStatus] = useState(null) // { watching, path, source, lastZone }
  const timerHotkeys = cg.timerHotkeys || {}
  const setTimerKey = (action, v) => setCg({ timerHotkeys: { ...timerHotkeys, [action]: v } })

  const refreshStatus = () => { if (gameLog) gameLog.status().then(setStatus).catch(() => {}) }
  useEffect(() => { refreshStatus() }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // Arm the overlay toggle hotkey while settings are open (and whenever it changes).
  useEffect(() => { if (overlay?.setHotkey) overlay.setHotkey(OVERLAY_PLUGIN, overlayHotkey) }, [overlay, overlayHotkey])
  // Arm the speedrun timer hotkeys (start/pause/stop/reset).
  useEffect(() => { if (timer?.setHotkeys) timer.setHotkeys(timerHotkeys) }, [timer, JSON.stringify(timerHotkeys)]) // eslint-disable-line react-hooks/exhaustive-deps

  const setMode = (m) => {
    setCg({ displayMode: m })
    if (!overlay) return
    if (m === 'overlay') overlay.open(OVERLAY_PLUGIN)
    else overlay.close()
  }

  // The Client.txt path is remembered device-locally by the desktop shell (not synced) — set it once
  // and it sticks across launches; we just reflect the current value via status().
  const locate = async () => {
    if (!gameLog) return
    const res = await gameLog.pickPath()
    if (res?.ok && res.path) refreshStatus()
  }
  const redetect = async () => {
    if (!gameLog) return
    await gameLog.start({ auto: true }) // forget the saved override and auto-detect afresh
    refreshStatus()
  }

  return (
    <div className="space-y-6 text-left">
      {/* Display mode */}
      <div>
        <div className="gold-heading text-[14px]">Show campaign guide as</div>
        <div className="inline-flex mt-2 border border-poe-line" style={{ borderRadius: 2 }}>
          {[['page', 'In-app page'], ['overlay', 'Overlay window']].map(([m, label]) => (
            <button key={m} onClick={() => setMode(m)}
              className={`text-[12px] px-3 py-1.5 ${displayMode === m ? 'text-poe-gold' : 'text-poe-text/60 hover:text-poe-gold/80'}`}
              style={{ background: displayMode === m ? 'rgb(var(--c-panel-light))' : 'transparent' }}>
              {label}
            </button>
          ))}
        </div>
        <p className="text-[11px] text-poe-text/50 mt-1.5 max-w-[480px]">
          <span className="text-poe-text/80">In-app page</span> keeps the guide here in the app.{' '}
          <span className="text-poe-text/80">Overlay window</span> pops just the guide out as a separate
          always-on-top widget over the game — objectives + the hover-map popups — that you can move and resize.
        </p>

        {desktop ? (
          <div className="flex items-center gap-3 mt-3 flex-wrap">
            <button onClick={() => { setCg({ displayMode: 'overlay' }); overlay?.open(OVERLAY_PLUGIN) }}
              className="inline-flex items-center gap-1.5 text-[12px] font-medium text-poe-gold border border-poe-gold/50 hover:bg-poe-gold/10 px-3 py-1.5" style={{ borderRadius: 2 }}>
              <ExternalLink size={13} /> Pop out now
            </button>
            <button onClick={() => overlay?.close()} className="text-[12px] text-poe-text/60 hover:text-poe-gold/80">Close overlay</button>
            <div className="flex items-center gap-2">
              <span className="text-[11px] text-poe-text/55">Toggle hotkey</span>
              <KeybindInput value={overlayHotkey} onChange={(v) => setCg({ overlayHotkey: v })} />
              {overlayHotkey !== DEFAULT_OVERLAY_HOTKEY && (
                <button onClick={() => setCg({ overlayHotkey: DEFAULT_OVERLAY_HOTKEY })} className="text-[12px] text-poe-text/50 hover:text-poe-gold">Reset</button>
              )}
            </div>
            <div className="flex items-center gap-2 w-full">
              <span className="text-[11px] text-poe-text/55">Transparency</span>
              <input type="range" min={20} max={100} value={Math.round(overlayOpacity * 100)}
                onChange={(e) => update({ overlayOpacity: Number(e.target.value) / 100 })}
                className="w-[140px] accent-[rgb(var(--c-accent))]" />
              <span className="text-[11px] text-poe-text/45 tabular-nums">{Math.round(overlayOpacity * 100)}%</span>
            </div>
          </div>
        ) : (
          <p className="text-[11px] text-poe-text/45 mt-2">The pop-out overlay is a desktop-app feature.</p>
        )}
      </div>

      {/* Speedrun timer hotkeys */}
      <div>
        <div className="gold-heading text-[14px]">Speedrun timer hotkeys</div>
        {desktop ? (
          <>
            <p className="text-[11px] text-poe-text/50 mt-1 max-w-[480px]">Global keys to control the run timer while you’re in-game (Speedrun mode). Pause toggles a manual pause on top of the automatic town/idle pausing.</p>
            <div className="mt-2 space-y-1.5">
              {[['start', 'Start'], ['pause', 'Pause'], ['stop', 'Stop'], ['reset', 'Reset']].map(([a, label]) => (
                <div key={a} className="flex items-center gap-2">
                  <span className="w-[52px] text-[12px] text-poe-text/70">{label}</span>
                  <KeybindInput value={timerHotkeys[a]} onChange={(v) => setTimerKey(a, v)} />
                  {timerHotkeys[a] && <button onClick={() => setTimerKey(a, '')} className="text-[11px] text-poe-text/40 hover:text-poe-gold">clear</button>}
                </div>
              ))}
            </div>
          </>
        ) : (
          <p className="text-[11px] text-poe-text/45 mt-2">Timer hotkeys are a desktop-app feature.</p>
        )}
      </div>

      {/* Auto-tracking */}
      <div>
        <div className="gold-heading text-[14px]">Auto-track from the game</div>
        {desktop ? (
          <>
            <label className="inline-flex items-center gap-2 mt-2 text-[12.5px] text-poe-text-bright cursor-pointer">
              <input type="checkbox" checked={autoTrack} onChange={(e) => setCg({ autoTrack: e.target.checked })}
                style={{ accentColor: 'rgb(var(--c-accent))', width: 14, height: 14 }} />
              Detect my zone and follow the route as I play
            </label>
            <p className="text-[11px] text-poe-text/50 mt-1.5 max-w-[480px]">
              Reads your PoE2 <span className="text-poe-text/80">Client.txt</span> log (read-only) to know which zone
              you're in, then selects that zone and its map — the same way the standalone overlays do it.
            </p>

            {/* Client.txt location */}
            <div className="mt-3 text-[11.5px]">
              <div className="text-poe-text/50 mb-1">Client.txt</div>
              {status?.path ? (
                <div className="text-poe-text-bright break-all max-w-[560px]">
                  {status.path}
                  <span className="text-poe-text/45"> · {status.source === 'override' ? 'set manually' : 'auto-detected'}</span>
                </div>
              ) : (
                <div className="text-amber-400/80">Not found automatically — locate it below.</div>
              )}
              <div className="flex items-center gap-2 mt-2">
                <button onClick={locate} className="inline-flex items-center gap-1.5 text-[12px] text-poe-text-bright border border-poe-line hover:border-poe-gold/40 px-2.5 py-1.5" style={{ borderRadius: 2, background: 'rgb(var(--c-bg))' }}>
                  <FolderSearch size={13} /> Locate Client.txt…
                </button>
                <button onClick={redetect} className="inline-flex items-center gap-1.5 text-[12px] text-poe-text/70 hover:text-poe-gold/80 border border-poe-line px-2.5 py-1.5" style={{ borderRadius: 2, background: 'rgb(var(--c-bg))' }}>
                  <RefreshCw size={12} /> Auto-detect
                </button>
              </div>
            </div>
          </>
        ) : (
          <p className="text-[11px] text-poe-text/50 mt-2 max-w-[460px]">
            Auto-tracking reads the game's log file, so it only works in the desktop app. In the browser the guide
            is fully manual — tick steps off yourself.
          </p>
        )}
      </div>
    </div>
  )
}

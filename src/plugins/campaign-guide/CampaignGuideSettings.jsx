import React, { useEffect, useState } from 'react'
import { FolderSearch, RefreshCw } from 'lucide-react'
import { usePrefs } from '../../store/Prefs.jsx'

// Campaign Guide settings — shown on Settings ▸ Plugins ▸ Campaign Guide. Two syncable prefs:
//   • displayMode — in-app page vs. always-on-top overlay window over the game (desktop).
//   • autoTrack   — tail PoE2's Client.txt to auto-detect your zone and tick off the route as you play.
// Plus a (device-local) Client.txt path override for when the log can't be found automatically.
// The overlay window + the log watcher itself live in the desktop shell; here we persist the choices.
export function CampaignGuideSettings() {
  const { prefs, update } = usePrefs()
  const cg = prefs.pluginSettings?.['campaign-guide'] || {}
  const displayMode = cg.displayMode || 'page'
  const autoTrack = cg.autoTrack !== false // default ON

  const setCg = (patch) => update((p) => ({
    ...p,
    pluginSettings: { ...(p.pluginSettings || {}), 'campaign-guide': { ...(p.pluginSettings?.['campaign-guide'] || {}), ...patch } },
  }))

  const gameLog = typeof window !== 'undefined' ? window.nolvusGameLog : null
  const desktop = !!gameLog?.isDesktop
  const [status, setStatus] = useState(null) // { watching, path, source, lastZone }

  const refreshStatus = () => { if (gameLog) gameLog.status().then(setStatus).catch(() => {}) }
  useEffect(() => { refreshStatus() }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const locate = async () => {
    if (!gameLog) return
    const res = await gameLog.pickPath()
    if (res?.ok && res.path) { setCg({ logPath: res.path }); refreshStatus() }
  }
  const redetect = async () => {
    if (!gameLog) return
    setCg({ logPath: '' }) // clear the override so auto-detect runs
    await gameLog.start({})
    refreshStatus()
  }

  return (
    <div className="space-y-6 text-left">
      {/* Display mode */}
      <div>
        <div className="gold-heading text-[14px]">Show campaign guide as</div>
        <div className="inline-flex mt-2 border border-poe-line" style={{ borderRadius: 2 }}>
          {[['page', 'In-app page'], ['overlay', 'Overlay window']].map(([m, label]) => (
            <button key={m} onClick={() => setCg({ displayMode: m })}
              className={`text-[12px] px-3 py-1.5 ${displayMode === m ? 'text-poe-gold' : 'text-poe-text/60 hover:text-poe-gold/80'}`}
              style={{ background: displayMode === m ? 'rgb(var(--c-panel-light))' : 'transparent' }}>
              {label}
            </button>
          ))}
        </div>
        <p className="text-[11px] text-poe-text/50 mt-1.5 max-w-[460px]">
          <span className="text-poe-text/80">In-app page</span> keeps the guide here in the app.{' '}
          <span className="text-poe-text/80">Overlay window</span> pops it out as a separate
          always-on-top window over the game so you can follow the route while you play (desktop).
        </p>
      </div>

      {/* Auto-tracking */}
      <div>
        <div className="gold-heading text-[14px]">Auto-track from the game</div>
        {desktop ? (
          <>
            <label className="inline-flex items-center gap-2 mt-2 text-[12.5px] text-poe-text-bright cursor-pointer">
              <input type="checkbox" checked={autoTrack} onChange={(e) => setCg({ autoTrack: e.target.checked })}
                style={{ accentColor: 'rgb(var(--c-accent))', width: 14, height: 14 }} />
              Detect my zone and tick off the route as I play
            </label>
            <p className="text-[11px] text-poe-text/50 mt-1.5 max-w-[480px]">
              Reads your PoE2 <span className="text-poe-text/80">Client.txt</span> log (read-only) to know which zone
              you're in, then jumps to the matching act and checks off the steps you've cleared — the same way the
              standalone overlays do it.
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

import React, { useEffect, useState } from 'react'
import { Download, RefreshCw, X, ArrowRight } from 'lucide-react'
import { desktopApi } from '../lib/desktop.js'

// Bottom-left auto-update banner — desktop app only. Appears when a newer version is found on the
// release repo, shows current → new version and download progress, and lets the user restart-and-
// update now or dismiss for later (it still installs on the next quit).
export function UpdateBanner() {
  const [status, setStatus] = useState(null)
  const [dismissed, setDismissed] = useState(null)

  useEffect(() => {
    if (!desktopApi?.onUpdateStatus) return
    return desktopApi.onUpdateStatus(setStatus)
  }, [])

  if (!desktopApi || !status) return null
  const { state, current, next, percent = 0 } = status
  if (!['available', 'downloading', 'downloaded'].includes(state)) return null
  if (dismissed && dismissed === next) return null

  const downloaded = state === 'downloaded'

  return (
    <div className="fixed bottom-4 left-4 z-[300] w-[330px] panel p-3.5 update-rise" role="alert">
      <div className="flex items-start gap-2.5">
        <span className="mt-0.5 w-8 h-8 grid place-items-center rounded-lg bg-poe-gold/10 border border-poe-gold-dim/50 text-poe-gold shrink-0">
          <Download size={16} />
        </span>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <div className="gold-heading text-[13.5px]">{downloaded ? 'Update ready' : 'Update available'}</div>
            <button onClick={() => setDismissed(next)} title="Dismiss" className="text-poe-text/60 hover:text-poe-text-bright -mt-1 -mr-1 p-1">
              <X size={14} />
            </button>
          </div>

          <div className="mt-1 flex items-center gap-1.5 text-[12px]">
            <span className="font-mono text-poe-text/70">v{current}</span>
            <ArrowRight size={12} className="text-poe-gold-dim" />
            <span className="font-mono text-poe-text-bright">v{next}</span>
          </div>

          {!downloaded && (
            <div className="mt-2">
              <div className="h-1.5 rounded-full bg-poe-line/70 overflow-hidden">
                <div className="h-full bg-poe-gold transition-[width] duration-300" style={{ width: `${percent}%` }} />
              </div>
              <div className="text-[10.5px] text-poe-text/60 mt-1">Downloading… {percent}%</div>
            </div>
          )}

          <div className="mt-2.5 flex items-center gap-2">
            <button onClick={() => desktopApi.installUpdate()} disabled={!downloaded}
              className="btn-action h-8 text-[12px] flex-1">
              <RefreshCw size={13} /> Restart &amp; update
            </button>
            <button onClick={() => setDismissed(next)} className="btn-dark h-8 text-[12px]">Later</button>
          </div>
          {!downloaded && <div className="text-[10px] text-poe-text/50 mt-1.5">“Later” keeps the download — it installs next time you close the app.</div>}
        </div>
      </div>
    </div>
  )
}

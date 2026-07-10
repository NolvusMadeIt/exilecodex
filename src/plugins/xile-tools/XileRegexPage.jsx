import React, { useEffect, useRef, useState } from 'react'
import { ExternalLink } from 'lucide-react'
import { installXileShim } from '../../xilehud/adapter.ts'
import '../../xilehud/xilehud.css'

// The Map Regex builder — XileHUD's juicing tool (GPL-3.0, see ATTRIBUTION.md): pick the mods
// you want to include/exclude on Waystones and it composes the shortest in-game search regex,
// with saved presets (its own localStorage). Fully client-side; the vendored module builds its
// entire UI into the shared container below.
export function XileRegexPage() {
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState('')
  const panelRef = useRef(null)

  useEffect(() => {
    installXileShim()
    let alive = true
    ;(async () => {
      try {
        const mod = await import('../../xilehud/overlay/tools/regex/module.ts')
        if (!alive) return
        await mod.show()
        if (!alive) return
        setStatus('ready')
      } catch (e) {
        if (!alive) return
        setError(String(e?.message || e))
        setStatus('error')
      }
    })()
    return () => {
      alive = false
      if (panelRef.current) panelRef.current.innerHTML = ''
      document.body.classList.remove('crafting-mode')
    }
  }, [])

  return (
    <div className="flex h-[calc(100vh-128px)] min-h-0 flex-col">
      {status === 'loading' && <div className="py-2 text-[12.5px] text-poe-text/60">Loading…</div>}
      {status === 'error' && (
        <div className="py-6 text-[12.5px] text-poe-danger">Couldn’t load the regex builder ({error}).</div>
      )}

      <div id="craftingPanel" ref={panelRef} className="xilehud-panel content min-h-0 flex-1 overflow-y-auto" />

      <div className="mt-4 shrink-0 border-t border-poe-line/60 pt-2 text-[11px] text-poe-text/45">
        Built by{' '}
        <a
          href="https://github.com/NolvusMadeIt"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-0.5 text-poe-gold-dim hover:text-poe-gold"
        >
          Nolvus <ExternalLink size={10} />
        </a>{' '}
        — a player with a passion for the game. Presets are saved on this device only.
      </div>
    </div>
  )
}

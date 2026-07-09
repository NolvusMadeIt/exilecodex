import React, { useEffect, useRef, useState } from 'react'
import { ExternalLink } from 'lucide-react'
import { useRouter } from '../../lib/router.jsx'
import { installXileShim } from '../../xilehud/adapter.ts'
import '../../xilehud/xilehud.css'

// The Character reference — five XileHUD panels (GPL-3.0, see ATTRIBUTION.md): skill gems,
// keystones, ascendancy passives, atlas nodes, and the campaign quest rewards checklist.
// Panel selection lives in the categorized side menu (?panel=<id>); each vendored module
// drives itself through its upstream show() entry against the shared #craftingPanel container.
const PANELS = [
  { id: 'gems', label: 'Gems', load: () => import('../../xilehud/overlay/character/gems/module.ts') },
  { id: 'keystones', label: 'Keystones', load: () => import('../../xilehud/overlay/character/keystones/module.ts') },
  { id: 'ascendancy', label: 'Ascendancies', load: () => import('../../xilehud/overlay/character/ascendancy-passives/module.ts') },
  { id: 'atlas', label: 'Atlas', load: () => import('../../xilehud/overlay/character/atlas-nodes/module.ts') },
  { id: 'quests', label: 'Quest Rewards', load: () => import('../../xilehud/overlay/character/quest-passives/module.ts') },
]

export function XileCharacterPage() {
  const { query } = useRouter()
  const tab = PANELS.some((p) => p.id === query?.panel) ? query.panel : 'gems'
  const [status, setStatus] = useState('loading') // 'loading' | 'ready' | 'error'
  const [error, setError] = useState('')
  const panelRef = useRef(null)

  useEffect(() => {
    installXileShim()
    let alive = true
    setStatus('loading')
    ;(async () => {
      try {
        const mod = await PANELS.find((p) => p.id === tab).load()
        if (!alive) return
        await mod.show() // upstream entry: fetches through the shim (or builds in-module), renders
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
  }, [tab])

  return (
    <div className="flex h-[calc(100vh-128px)] min-h-0 flex-col">
      {status === 'loading' && (
        <div className="py-2 text-[12.5px] text-poe-text/60">Loading…</div>
      )}
      {status === 'error' && (
        <div className="py-6 text-[12.5px] text-poe-danger">
          Couldn’t load this panel ({error}). Switch tabs to retry.
        </div>
      )}

      {/* Shared container every vendored character panel renders into (their ensurePanel()). */}
      <div id="craftingPanel" ref={panelRef} className="xilehud-panel content min-h-0 flex-1 overflow-y-auto" />

      <div className="mt-4 border-t border-poe-line/60 pt-2 text-[11px] text-poe-text/45">
        Powered by{' '}
        <a
          href="https://github.com/XileHUD/poe_overlay"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-0.5 text-poe-gold-dim hover:text-poe-gold"
        >
          XileHUD <ExternalLink size={10} />
        </a>{' '}
        — character reference engine &amp; data (GPL-3.0). Item art is not redistributed.
      </div>
    </div>
  )
}

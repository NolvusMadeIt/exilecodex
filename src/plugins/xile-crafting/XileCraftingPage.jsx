import React, { useEffect, useRef, useState } from 'react'
import { ExternalLink } from 'lucide-react'
import { useRouter } from '../../lib/router.jsx'
import { installXileShim } from '../../xilehud/adapter.ts'
import { GlossaryPanel } from './GlossaryPanel.jsx'
import '../../xilehud/xilehud.css'

// The Crafting reference — eight XileHUD panels (GPL-3.0, see ATTRIBUTION.md): currencies,
// essences, omens, catalysts, augments, liquid emotions, anoints and the keyword glossary.
// Panel selection lives in the categorized side menu (?panel=<id>); each vendored module
// fetches its dataset through the adapter shim and renders vanilla DOM into the shared
// #craftingPanel container. This wrapper owns honest states, cleanup, and the credit footer.
const PANELS = [
  { id: 'currency', label: 'Currency', load: () => import('../../xilehud/overlay/crafting/currency/module.ts') },
  { id: 'essences', label: 'Essences', load: () => import('../../xilehud/overlay/crafting/essences/module.ts') },
  { id: 'omens', label: 'Omens', load: () => import('../../xilehud/overlay/crafting/omens/module.ts') },
  { id: 'catalysts', label: 'Catalysts', load: () => import('../../xilehud/overlay/crafting/catalysts/module.ts') },
  { id: 'augments', label: 'Augments', load: () => import('../../xilehud/overlay/crafting/augments/module.ts') },
  { id: 'liquid', label: 'Liquid Emotions', load: () => import('../../xilehud/overlay/crafting/liquid/module.ts') },
  { id: 'annoints', label: 'Anoints', load: () => import('../../xilehud/overlay/character/annoints/module.ts') },
  // 'glossar' is ours now — a React wiki (GlossaryPanel.jsx) over the same XileHUD dataset.
]

export function XileCraftingPage() {
  const { query } = useRouter()
  const isGlossary = query?.panel === 'glossar'
  const tab = PANELS.some((p) => p.id === query?.panel) ? query.panel : 'currency'
  const [status, setStatus] = useState('loading') // 'loading' | 'ready' | 'error'
  const [error, setError] = useState('')
  const panelRef = useRef(null)

  useEffect(() => {
    if (isGlossary) return // the glossary is a React panel — no vendored module to drive
    installXileShim()
    let alive = true
    setStatus('loading')
    ;(async () => {
      try {
        const mod = await PANELS.find((p) => p.id === tab).load()
        if (!alive) return
        await mod.show() // upstream entry: fetches through the shim, unwraps, renders
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
      document.body.classList.remove('crafting-mode') // show() adds it; keep body clean across pages
    }
  }, [tab, isGlossary])

  return (
    <div className="flex h-[calc(100vh-128px)] min-h-0 flex-col">
      {!isGlossary && status === 'loading' && (
        <div className="py-2 text-[12.5px] text-poe-text/60">Loading…</div>
      )}
      {!isGlossary && status === 'error' && (
        <div className="py-6 text-[12.5px] text-poe-danger">
          Couldn’t load this panel ({error}). Switch tabs to retry.
        </div>
      )}

      {isGlossary ? (
        <GlossaryPanel />
      ) : (
        /* Shared container every vendored crafting panel renders into (their ensurePanel()). */
        <div id="craftingPanel" ref={panelRef} className="xilehud-panel content min-h-0 flex-1 overflow-y-auto" />
      )}

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
        — crafting reference engine &amp; data (GPL-3.0). Item art is not redistributed.
      </div>
    </div>
  )
}

import React, { useEffect, useRef, useState } from 'react'
import { ExternalLink } from 'lucide-react'
import { PoeButton } from '../../components/PoeFrame.jsx'
import { installXileShim } from '../../xilehud/adapter.ts'
import '../../xilehud/xilehud.css'

// The Crafting reference — eight XileHUD panels (GPL-3.0, see ATTRIBUTION.md) behind one tab
// strip: currencies, essences, omens, catalysts, augments, liquid emotions, anoints and the
// keyword glossary. Each vendored module fetches its dataset through the adapter shim and
// renders vanilla DOM into the shared #craftingPanel container; this wrapper owns the tabs,
// honest states, cleanup between switches, and the credit footer.
const PANELS = [
  { id: 'currency', label: 'Currency', load: () => import('../../xilehud/overlay/crafting/currency/module.ts') },
  { id: 'essences', label: 'Essences', load: () => import('../../xilehud/overlay/crafting/essences/module.ts') },
  { id: 'omens', label: 'Omens', load: () => import('../../xilehud/overlay/crafting/omens/module.ts') },
  { id: 'catalysts', label: 'Catalysts', load: () => import('../../xilehud/overlay/crafting/catalysts/module.ts') },
  { id: 'augments', label: 'Augments', load: () => import('../../xilehud/overlay/crafting/augments/module.ts') },
  { id: 'liquid', label: 'Liquid Emotions', load: () => import('../../xilehud/overlay/crafting/liquid/module.ts') },
  { id: 'annoints', label: 'Anoints', load: () => import('../../xilehud/overlay/character/annoints/module.ts') },
  { id: 'glossar', label: 'Glossary', load: () => import('../../xilehud/overlay/crafting/glossar/module.ts') },
]

export function XileCraftingPage() {
  const [tab, setTab] = useState('currency')
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
  }, [tab])

  return (
    <div className="flex h-[calc(100vh-128px)] min-h-0 flex-col">
      <div className="mb-3 flex flex-wrap items-center gap-2">
        {PANELS.map((p) => (
          <PoeButton key={p.id} variant={tab === p.id ? 'gold' : 'default'} onClick={() => setTab(p.id)}>
            {p.label}
          </PoeButton>
        ))}
      </div>

      {status === 'loading' && (
        <div className="py-2 text-[12.5px] text-poe-text/60">Loading…</div>
      )}
      {status === 'error' && (
        <div className="py-6 text-[12.5px] text-poe-danger">
          Couldn’t load this panel ({error}). Switch tabs to retry.
        </div>
      )}

      {/* Shared container every vendored crafting panel renders into (their ensurePanel()). */}
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
        — crafting reference engine &amp; data (GPL-3.0). Item art is not redistributed.
      </div>
    </div>
  )
}

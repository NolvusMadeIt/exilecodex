import React, { useEffect, useRef, useState } from 'react'
import { ExternalLink } from 'lucide-react'
import { PoeButton } from '../../components/PoeFrame.jsx'
import { installXileShim, loadUniques, loadBases } from '../../xilehud/adapter.ts'
import '../../xilehud/xilehud.css'

// The Item Database — powered by XileHUD's vendored uniques/bases modules (GPL-3.0, see
// ATTRIBUTION.md). This wrapper owns the React side: tab strip, data fetch through the
// adapter, honest load/error states, and the credit footer. The vendored modules render
// vanilla DOM into the #craftingPanel container below and know nothing about React.
const TABS = [
  { id: 'uniques', label: 'Uniques' },
  { id: 'bases', label: 'Bases' },
]

export function XileItemsPage() {
  const [tab, setTab] = useState('uniques')
  const [status, setStatus] = useState('loading') // 'loading' | 'ready' | 'error'
  const [error, setError] = useState('')
  const panelRef = useRef(null)

  useEffect(() => {
    installXileShim()
    let alive = true
    setStatus('loading')
    ;(async () => {
      try {
        if (tab === 'uniques') {
          const [mod, data] = await Promise.all([
            import('../../xilehud/overlay/crafting/uniques/module.ts'),
            loadUniques(),
          ])
          if (!alive) return
          mod.render(data?.uniques || {})
        } else {
          const [mod, data] = await Promise.all([
            import('../../xilehud/overlay/crafting/bases/module.ts'),
            loadBases(),
          ])
          if (!alive) return
          mod.render(data?.bases || {})
        }
        setStatus('ready')
      } catch (e) {
        if (!alive) return
        setError(String(e?.message || e))
        setStatus('error')
      }
    })()
    return () => {
      alive = false
      // The two modules share the #craftingPanel container — clear it between tab
      // switches and on unmount so stale DOM never lingers.
      if (panelRef.current) panelRef.current.innerHTML = ''
    }
  }, [tab])

  return (
    <div className="flex min-h-0 flex-col">
      <div className="mb-3 flex items-center gap-2">
        {TABS.map((t) => (
          <PoeButton
            key={t.id}
            variant={tab === t.id ? 'gold' : 'default'}
            onClick={() => setTab(t.id)}
          >
            {t.label}
          </PoeButton>
        ))}
      </div>

      {status === 'loading' && (
        <div className="py-6 text-[12.5px] text-poe-text/60">Loading the {tab} database…</div>
      )}
      {status === 'error' && (
        <div className="py-6 text-[12.5px] text-poe-danger">
          Couldn’t load the {tab} database ({error}). Check your connection and switch tabs to retry.
        </div>
      )}

      {/* The vendored modules find this container by id (their ensurePanel()). */}
      <div id="craftingPanel" ref={panelRef} className="xilehud-panel content min-h-0 flex-1" />

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
        — item database engine &amp; data (GPL-3.0). Item art is not redistributed.
      </div>
    </div>
  )
}

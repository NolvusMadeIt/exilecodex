import React, { useEffect, useRef, useState } from 'react'
import { ExternalLink } from 'lucide-react'
import { SimpleSelect } from '../../components/SimpleSelect.jsx'
import { installXileShim, modifierDb, modifierDbReady } from '../../xilehud/adapter.ts'
import '../../xilehud/xilehud.css'

// The Modifiers browser — powered by XileHUD's vendored modifier engine (GPL-3.0, see
// ATTRIBUTION.md). The vendored module renders into the id-based skeleton below (the same ids
// its upstream shell provides); this wrapper owns the category picker, wires the search/ilvl
// inputs to the module's re-render (as the upstream shell did), and shows honest states.
export function XileModifiersPage() {
  const [categories, setCategories] = useState([])
  const [category, setCategory] = useState('')
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState('')
  const modRef = useRef(null)

  // Load engine + categories once.
  useEffect(() => {
    installXileShim()
    let alive = true
    ;(async () => {
      try {
        const mod = await import('../../xilehud/overlay/modifiers/module.ts')
        if (!alive) return
        modRef.current = mod
        mod.setOverlayVersionMode('poe2')
        const db = await modifierDbReady()
        const cats = await db.getAllCategories()
        if (!alive) return
        setCategories(cats || [])
        // Default to the first real item class — the virtual aggregates (ALL, ESSENCE, …) are
        // the heaviest first paint and stay one click away in the same list.
        const AGGREGATES = new Set(['ALL', 'DESECRATED', 'ESSENCE', 'CORRUPTED', 'AUGMENTS'])
        setCategory((cats || []).find((c) => !AGGREGATES.has(c)) || (cats || [])[0] || '')
      } catch (e) {
        if (!alive) return
        setError(String(e?.message || e))
        setStatus('error')
      }
    })()
    return () => { alive = false }
  }, [])

  // Load + render the selected category.
  useEffect(() => {
    if (!category || !modRef.current) return
    let alive = true
    setStatus('loading')
    ;(async () => {
      try {
        const sections = await modifierDb().getModifiersForCategory(category)
        if (!alive) return
        // The engine's render pipeline takes the ModifierData envelope ({ item?, modifiers }),
        // not the bare section array the database returns. Same priming order as upstream:
        // wrap, post-process annotations, publish the shared reference its filter pipeline
        // re-reads on every input change, then render.
        const data = { modifiers: sections }
        try { modRef.current.mechanicsPostProcess?.(data) } catch { /* annotation is best-effort upstream too */ }
        window.originalData = data
        modRef.current.renderFilteredContent(data)
        setStatus('ready')
      } catch (e) {
        if (!alive) return
        setError(String(e?.message || e))
        setStatus('error')
      }
    })()
    return () => { alive = false }
  }, [category])

  // The upstream shell wired these inputs to the module's re-render; we do the same.
  const refilter = () => {
    if (window.originalData && modRef.current) {
      try { modRef.current.renderFilteredContent(window.originalData) } catch { /* module handles its own errors */ }
    }
  }
  const ilvlDebounce = useRef(null)
  const refilterDebounced = () => {
    clearTimeout(ilvlDebounce.current)
    ilvlDebounce.current = setTimeout(refilter, 400)
  }

  return (
    // Fixed-viewport layout (like the Market page): the engine's virtual scroller needs a
    // bounded scrollport — unbounded, it renders every row (~300k DOM nodes on 'ALL').
    <div className="flex h-[calc(100vh-128px)] min-h-0 flex-col">
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <SimpleSelect value={category} onChange={setCategory} options={categories} className="h-8 w-56" />
        <input
          id="search-input"
          className="field h-8 w-72"
          placeholder="Search modifiers…"
          onInput={refilter}
        />
        <span className="inline-flex items-center gap-1 text-[11.5px] text-poe-text/60">
          ilvl
          <input id="ilvl-min" type="number" min="1" max="100" placeholder="min" className="field h-8 w-16" onInput={refilterDebounced} />
          –
          <input id="ilvl-max" type="number" min="1" max="100" placeholder="max" className="field h-8 w-16" onInput={refilterDebounced} />
        </span>
      </div>

      {status === 'error' && (
        <div className="py-6 text-[12.5px] text-poe-danger">
          Couldn’t load the modifier database ({error}).
        </div>
      )}
      {status === 'loading' && (
        <div className="py-2 text-[12.5px] text-poe-text/60">Loading modifiers…</div>
      )}

      {/* The id-based skeleton the vendored engine renders into (its upstream shell's ids).
          The manual-select / whittling elements belong to the desktop clipboard flow — present
          so the engine's lookups succeed, hidden until that flow lands. */}
      <div id="content" className="xilehud-panel min-h-0 flex-1 overflow-y-auto">
        <div id="whittlingInfo" style={{ display: 'none' }} />
        <div id="manualSelectHint" style={{ display: 'none' }}>
          <span id="manualSelectMessage" />
          <span id="manualSelectMods" />
        </div>
        <div id="modFiltersWrapper" />
        <div id="modResultsWrapper" />
      </div>

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
        — modifier database engine &amp; data (GPL-3.0).
      </div>
    </div>
  )
}

import React, { useEffect, useRef, useState } from 'react'
import { ExternalLink, ClipboardPaste, X } from 'lucide-react'
import { SimpleSelect } from '../../components/SimpleSelect.jsx'
import { PoeButton } from '../../components/PoeFrame.jsx'
import { installXileShim, modifierDb, modifierDbReady } from '../../xilehud/adapter.ts'
import { ItemParser } from '../../xilehud/parser/item-parser.ts'
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
  const [pasteOpen, setPasteOpen] = useState(false)
  const [pastedItem, setPastedItem] = useState(null) // ParsedItem — rides the engine's data.item envelope
  const modRef = useRef(null)
  const itemRef = useRef(null)
  itemRef.current = pastedItem
  const analyzeRef = useRef(null)

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
        // re-reads on every input change, then render. A pasted item rides the envelope's
        // item field — that's what lights up the engine's matched-mod highlighting.
        const data = { modifiers: sections, ...(itemRef.current ? { item: itemRef.current } : {}) }
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

  // Paste-an-item (their clipboard flow, manual-paste variant): parse the game's Ctrl+C /
  // advanced-copy text, jump to the item's category, cap ilvl at the item's level (as
  // upstream does) and re-render with the item riding the envelope.
  async function analyzeItemText(text) {
    if (!text?.trim()) return
    try {
      const item = await new ItemParser('poe2').parse(text)
      setPasteOpen(false)
      if (item?.category && categories.includes(item.category)) {
        setPastedItem(item)
        const ilvlMax = document.getElementById('ilvl-max')
        if (ilvlMax && item.itemLevel > 0) ilvlMax.value = String(item.itemLevel)
        if (item.category !== category) setCategory(item.category) // effect re-renders with the item
        else if (window.originalData && modRef.current) {
          window.originalData = { ...window.originalData, item }
          modRef.current.renderFilteredContent(window.originalData)
        }
      } else {
        setPastedItem(null)
        setError(`That doesn't look like a copied PoE2 item (category "${item?.category || 'unknown'}" not in the database).`)
        setStatus('error')
      }
    } catch (e) {
      setError(String(e?.message || e))
      setStatus('error')
    }
  }

  analyzeRef.current = analyzeItemText

  // Desktop smart clipboard: copying an item in game analyzes it automatically — the same
  // path as manual paste. The bridge only exists in the desktop app; on web this is inert.
  useEffect(() => {
    const unsubscribe = window.nolvusXile?.onItemCopied?.((text) => analyzeRef.current?.(text))
    return () => { try { unsubscribe?.() } catch { /* bridge gone at teardown */ } }
  }, [])

  function clearPastedItem() {
    setPastedItem(null)
    if (window.originalData && modRef.current) {
      const { item, ...rest } = window.originalData
      window.originalData = rest
      modRef.current.renderFilteredContent(window.originalData)
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
        {pastedItem ? (
          <span className="inline-flex items-center gap-1.5 rounded border border-poe-gold/40 bg-poe-gold/10 px-2 py-1 text-[11.5px] text-poe-gold">
            {pastedItem.name || pastedItem.baseType || 'Pasted item'}
            <button type="button" onClick={clearPastedItem} title="Stop analyzing this item" className="hover:text-poe-heading">
              <X size={11} />
            </button>
          </span>
        ) : (
          <PoeButton onClick={() => setPasteOpen((v) => !v)} title="Paste a copied item (Ctrl+C or Ctrl+Alt+C in game) to jump to its mods">
            <ClipboardPaste size={13} /> Paste item
          </PoeButton>
        )}
      </div>

      {pasteOpen && !pastedItem && (
        <textarea
          autoFocus
          rows={4}
          placeholder="Paste the copied item text here (Ctrl+C on the item in game — Ctrl+Alt+C shows affix tiers too)…"
          className="field mb-3 h-24 w-[480px] max-w-full resize-none py-1.5 font-mono text-[11.5px]"
          onPaste={(e) => analyzeItemText(e.clipboardData.getData('text'))}
          onKeyDown={(e) => { if (e.key === 'Escape') setPasteOpen(false) }}
        />
      )}

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

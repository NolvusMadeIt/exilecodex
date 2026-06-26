import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Code2, RotateCcw, Clipboard, FileDown, Sparkles, Check, WrapText, Map, Hash, Minus, Plus, Maximize2, Minimize2, Settings, X } from 'lucide-react'
import { useFilter } from '../store/FilterStore.jsx'
import { usePrefs } from '../store/Prefs.jsx'
import { useGameInfo } from '../store/GameInfo.jsx'
import { useToast } from '../store/Toast.jsx'
import { useCatalog } from '../lib/catalog.js'
import { useFilterText } from '../lib/useFilterText.js'
import { buildFilter } from '../lib/buildFilter.js'
import { Toggle } from '../components/primitives.jsx'
import { SimpleSelect } from '../components/SimpleSelect.jsx'
import { MonacoFilterEditor, setFilterCatalog } from '../components/MonacoFilterEditor.jsx'

const safeName = (name) => ((name || 'filter').replace(/\.filter$/i, '').replace(/[^a-z0-9-_. ]/gi, '').trim() || 'filter')
const HEIGHTS = { compact: '46vh', comfortable: '64vh', tall: '82vh' }
const HEIGHT_ORDER = ['compact', 'comfortable', 'tall']
const HEIGHT_LABEL = { compact: 'S', comfortable: 'M', tall: 'L' }

function TBtn({ on, onClick, title, children }) {
  return (
    <button onClick={onClick} title={title}
      className={`inline-flex items-center gap-1 h-7 px-2 rounded border text-[11.5px] ${on ? 'border-poe-gold text-poe-heading bg-poe-gold/10' : 'border-poe-line text-poe-text hover:border-poe-gold-dim/60 hover:text-poe-text-bright'}`}>
      {children}
    </button>
  )
}

// ---- Editor settings modal (everything from the toolbar + advanced options) ----
function SRow({ label, hint, children }) {
  return (
    <div className="flex items-center justify-between gap-3 py-1.5 border-b border-poe-line/40 last:border-0">
      <span className="text-[12.5px] text-poe-text-bright">{label}{hint && <span className="text-[11px] text-poe-text/70 ml-1.5">{hint}</span>}</span>
      <div className="shrink-0">{children}</div>
    </div>
  )
}
const Num = ({ v, set, min, max, suffix }) => (
  <span className="inline-flex items-center gap-1">
    <input type="number" min={min} max={max} value={v} onChange={e => set(Math.max(min, Math.min(max, Number(e.target.value) || 0)))} className="field h-7 w-16" />
    {suffix && <span className="text-[11px] text-poe-text">{suffix}</span>}
  </span>
)

function EditorSettingsPanel({ prefs, update, onClose }) {
  const g = (k, d) => prefs[k] ?? d
  const sel = (k, d, opts) => <SimpleSelect className="w-32" value={g(k, d)} onChange={v => update({ [k]: v })} options={opts} />
  const tog = (k, d) => <Toggle checked={!!g(k, d)} onChange={v => update({ [k]: v })} />
  const opts = (arr) => arr.map(v => ({ value: v, label: typeof v === 'string' ? v[0].toUpperCase() + v.slice(1) : String(v) }))
  return (
    <aside className="w-72 shrink-0 panel flex flex-col min-h-0 h-full">
      <div className="flex items-center gap-2 px-2.5 py-1.5 border-b border-poe-line shrink-0">
        <Settings size={13} className="text-poe-gold-dim" />
        <span className="gold-heading text-[13px] flex-1">Editor Settings</span>
        <button onClick={onClose} title="Close settings" className="p-1 rounded text-poe-text hover:text-poe-text-bright hover:bg-white/10"><X size={14} /></button>
      </div>
      <div className="flex-1 min-h-0 overflow-auto px-2.5 py-2 space-y-3">
        <section>
          <div className="section-bar">Display</div>
          <SRow label="Font size"><Num v={g('editorFontSize', 13)} set={v => update({ editorFontSize: v })} min={8} max={32} suffix="px" /></SRow>
          <SRow label="Line height" hint="0 = auto"><Num v={g('editorLineHeight', 0)} set={v => update({ editorLineHeight: v })} min={0} max={40} suffix="px" /></SRow>
          <SRow label="Word wrap">{tog('editorWordWrap', false)}</SRow>
          <SRow label="Minimap">{tog('editorMinimap', false)}</SRow>
          <SRow label="Line numbers">{sel('editorLineNumbers', 'on', [{ value: 'on', label: 'On' }, { value: 'off', label: 'Off' }, { value: 'relative', label: 'Relative' }])}</SRow>
          <SRow label="Render whitespace">{sel('editorRenderWhitespace', 'selection', opts(['none', 'boundary', 'selection', 'trailing', 'all']))}</SRow>
          <SRow label="Indent guides">{tog('editorIndentGuides', true)}</SRow>
          <SRow label="Sticky scroll" hint="pins the enclosing block">{tog('editorStickyScroll', false)}</SRow>
          <SRow label="Bracket pair colors">{tog('editorBracketColors', true)}</SRow>
          <SRow label="Font ligatures">{tog('editorLigatures', false)}</SRow>
          <SRow label="Smooth scrolling">{tog('editorSmoothScroll', true)}</SRow>
          <SRow label="Scroll beyond last line">{tog('editorScrollBeyond', false)}</SRow>
        </section>
        <section>
          <div className="section-bar">Editing</div>
          <SRow label="Indentation">{sel('editorInsertSpaces', false, [{ value: false, label: 'Tabs' }, { value: true, label: 'Spaces' }])}</SRow>
          <SRow label="Tab size">{sel('editorTabSize', 4, opts([2, 4, 8]))}</SRow>
          <SRow label="Cursor style">{sel('editorCursorStyle', 'line', opts(['line', 'block', 'underline']))}</SRow>
          <SRow label="Cursor blinking">{sel('editorCursorBlinking', 'blink', opts(['blink', 'smooth', 'phase', 'expand', 'solid']))}</SRow>
        </section>
        <section>
          <div className="section-bar">Suggestions</div>
          <SRow label="Auto-suggest as you type" hint="Ctrl+Space always works">{tog('editorQuickSuggest', true)}</SRow>
        </section>
        <section>
          <div className="section-bar">Layout</div>
          <SRow label="Editor size">{sel('editorHeight', 'tall', [{ value: 'compact', label: 'Small' }, { value: 'comfortable', label: 'Medium' }, { value: 'tall', label: 'Large' }])}</SRow>
        </section>
      </div>
    </aside>
  )
}

export function EditorPage() {
  const { active, setManualFilter, clearManualFilter } = useFilter()
  const { prefs, update } = usePrefs()
  const gameInfo = useGameInfo()
  const toast = useToast()
  const catalog = useCatalog()
  const catalogNames = useMemo(() => (catalog?.baseTypes || []).map(b => b.name), [catalog])
  useEffect(() => { setFilterCatalog(catalogNames) }, [catalogNames])

  const isManual = typeof active.manualFilter === 'string'
  const { text: output } = useFilterText(active, { gameInfo, prefs })
  const [draft, setDraft] = useState(active.manualFilter ?? '')
  const [copied, setCopied] = useState(false)
  const [maximized, setMaximized] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [cursor, setCursor] = useState({ line: 1, col: 1, selLen: 0 })
  const nameRef = useRef(active.name)

  // toolbar quick-access values
  const wordWrap = prefs.editorWordWrap ?? false
  const minimap = prefs.editorMinimap ?? false
  const lineNumbers = prefs.editorLineNumbers ?? 'on'
  const fontSize = prefs.editorFontSize ?? 13
  const tabSize = prefs.editorTabSize ?? 4
  const insertSpaces = prefs.editorInsertSpaces ?? false
  const height = HEIGHT_ORDER.includes(prefs.editorHeight) ? prefs.editorHeight : 'tall'

  // full Monaco option set, rebuilt from prefs
  const editorOptions = useMemo(() => ({
    fontSize, lineHeight: prefs.editorLineHeight ?? 0,
    wordWrap: wordWrap ? 'on' : 'off',
    minimap: { enabled: minimap },
    lineNumbers,
    renderWhitespace: prefs.editorRenderWhitespace ?? 'selection',
    guides: { indentation: prefs.editorIndentGuides ?? true },
    stickyScroll: { enabled: prefs.editorStickyScroll ?? false },
    bracketPairColorization: { enabled: prefs.editorBracketColors ?? true },
    fontLigatures: prefs.editorLigatures ?? false,
    smoothScrolling: prefs.editorSmoothScroll ?? true,
    scrollBeyondLastLine: prefs.editorScrollBeyond ?? false,
    tabSize, insertSpaces,
    cursorStyle: prefs.editorCursorStyle ?? 'line',
    cursorBlinking: prefs.editorCursorBlinking ?? 'blink',
    quickSuggestions: prefs.editorQuickSuggest ?? true,
  }), [prefs, fontSize, wordWrap, minimap, lineNumbers, tabSize, insertSpaces])

  useEffect(() => {
    if (nameRef.current !== active.name) { nameRef.current = active.name; setDraft(active.manualFilter ?? output); return }
    if (!isManual) setDraft(output)
  }, [output, isManual, active.name, active.manualFilter])

  const onEdit = (val) => { setDraft(val); setManualFilter(val) }
  const regenerate = async () => {
    clearManualFilter()
    setDraft(await buildFilter({ ...active, manualFilter: null }, { gameInfo, prefs }))
    toast.info('Reloaded from the builder — manual edits discarded.')
  }
  const copy = async () => { try { await navigator.clipboard.writeText(draft); setCopied(true); setTimeout(() => setCopied(false), 1500) } catch { toast.error('Copy failed.') } }
  const download = () => {
    const url = URL.createObjectURL(new Blob([draft], { type: 'text/plain' }))
    const a = document.createElement('a'); a.href = url; a.download = `${safeName(active.name)}.filter`
    document.body.appendChild(a); a.click(); a.remove(); URL.revokeObjectURL(url)
    toast.success(`Downloaded "${safeName(active.name)}.filter".`)
  }
  const setFont = (d) => update({ editorFontSize: Math.max(8, Math.min(32, fontSize + d)) })
  const cycleHeight = () => { const i = HEIGHT_ORDER.indexOf(height); update({ editorHeight: HEIGHT_ORDER[(i + 1) % HEIGHT_ORDER.length] }) }

  const lineCount = draft ? draft.split('\n').length : 0

  const toolbar = (
    <div className="flex items-center flex-wrap gap-1.5 panel px-2.5 py-1.5">
      <span className={`inline-flex items-center gap-1 h-6 px-2 rounded text-[10.5px] font-medium ${isManual ? 'bg-poe-gold/15 text-poe-gold' : 'bg-white/5 text-poe-text'}`}>
        {isManual ? <><Sparkles size={11} /> Manual</> : <><Code2 size={11} /> Live</>}
      </span>
      <span className="mx-1 w-px h-5 bg-poe-line" />
      <TBtn on={wordWrap} onClick={() => update({ editorWordWrap: !wordWrap })} title="Toggle word wrap"><WrapText size={13} /> Wrap</TBtn>
      <TBtn on={minimap} onClick={() => update({ editorMinimap: !minimap })} title="Toggle minimap"><Map size={13} /> Minimap</TBtn>
      <TBtn on={lineNumbers !== 'off'} onClick={() => update({ editorLineNumbers: lineNumbers === 'off' ? 'on' : 'off' })} title="Toggle line numbers"><Hash size={13} /> Lines</TBtn>
      <div className="inline-flex items-center gap-1">
        <button onClick={() => setFont(-1)} title="Smaller font" className="h-7 w-7 grid place-items-center rounded border border-poe-line text-poe-text hover:text-poe-text-bright"><Minus size={12} /></button>
        <span className="text-[11px] text-poe-text w-9 text-center">{fontSize}px</span>
        <button onClick={() => setFont(1)} title="Larger font" className="h-7 w-7 grid place-items-center rounded border border-poe-line text-poe-text hover:text-poe-text-bright"><Plus size={12} /></button>
      </div>
      <TBtn onClick={cycleHeight} title="Editor size (Small / Medium / Large)">Size: {HEIGHT_LABEL[height]}</TBtn>
      <TBtn on={maximized} onClick={() => setMaximized(m => !m)} title={maximized ? 'Exit fullscreen' : 'Maximize editor'}>{maximized ? <Minimize2 size={13} /> : <Maximize2 size={13} />}</TBtn>

      <span className="ml-auto flex items-center gap-1.5">
        {isManual && <TBtn onClick={regenerate} title="Discard manual edits and reload from the builder"><RotateCcw size={13} /> Regenerate</TBtn>}
        <TBtn onClick={copy} title="Copy filter">{copied ? <Check size={13} /> : <Clipboard size={13} />} {copied ? 'Copied' : 'Copy'}</TBtn>
        <TBtn onClick={download} title="Download .filter"><FileDown size={13} /> Download</TBtn>
        <TBtn on={showSettings} onClick={() => setShowSettings(s => !s)} title="Editor settings"><Settings size={13} /></TBtn>
      </span>
    </div>
  )

  const editor = (
    <div style={{ height: maximized ? '100%' : HEIGHTS[height] }} className="min-h-0 flex-1 flex gap-2">
      <div className="flex-1 min-w-0 h-full"><MonacoFilterEditor value={draft} onChange={onEdit} options={editorOptions} onCursor={setCursor} /></div>
      {showSettings && <EditorSettingsPanel prefs={prefs} update={update} onClose={() => setShowSettings(false)} />}
    </div>
  )

  // IDE-style status bar / footer
  const footer = (
    <div className="flex items-center gap-3 panel px-2.5 py-1 text-[11px] text-poe-text">
      <span title="Cursor position">Ln {cursor.line}, Col {cursor.col}</span>
      {cursor.selLen > 0 && <span className="text-poe-text-bright">({cursor.selLen} selected)</span>}
      <span className="ml-auto flex items-center gap-3">
        <span>{lineCount} lines</span>
        <span>{draft.length} chars</span>
        <button onClick={() => setShowSettings(true)} className="hover:text-poe-text-bright" title="Indentation (click for settings)">{insertSpaces ? `Spaces: ${tabSize}` : `Tab Size: ${tabSize}`}</button>
        <span>LF</span>
        <span>UTF-8</span>
        <span className="text-poe-gold-dim">PoE2 Filter</span>
      </span>
    </div>
  )

  if (maximized) {
    return (
      <div className="fixed inset-0 z-50 bg-poe-bg p-3 flex flex-col gap-2">
        {toolbar}{editor}{footer}
      </div>
    )
  }

  return (
    <div className="space-y-3">
      <div>
        <h1 className="gold-heading text-[18px] flex items-center gap-2"><Code2 size={18} /> PoE2 Editor</h1>
        <p className="text-[12px] text-poe-text mt-0.5">
          The live filter — edit it directly with full syntax highlighting and autocomplete. Type a keyword (e.g. <code className="font-mono text-poe-text-bright">Show</code>, <code className="font-mono text-poe-text-bright">BaseType</code>) for suggestions including real item names; <kbd className="font-mono">Tab</kbd>/<kbd className="font-mono">Enter</kbd> accepts, <kbd className="font-mono">Ctrl</kbd>+<kbd className="font-mono">Space</kbd> forces them. The <Settings size={11} className="inline" /> cog has all editor settings.
        </p>
      </div>
      {isManual
        ? <div className="text-[11.5px] text-poe-text px-1"><span className="text-poe-gold">Manual edits are active</span> — this text is saved, copied and exported. Builder changes won’t apply until you Regenerate.</div>
        : <div className="text-[11.5px] text-poe-text px-1">Showing the <span className="text-poe-text-bright">live</span> filter — start typing to take over and edit it manually.</div>}
      {toolbar}{editor}{footer}
    </div>
  )
}

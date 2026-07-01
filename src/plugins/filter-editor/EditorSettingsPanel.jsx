import React from 'react'
import { Settings, X } from 'lucide-react'
import { Toggle } from '../../components/primitives.jsx'
import { SimpleSelect } from '../../components/SimpleSelect.jsx'
import { usePrefs } from '../../store/Prefs.jsx'

// Editor settings — the full option set behind the in-editor cog AND the plugin's "Settings" tab
// on its detail page (WordPress-style: a plugin owns its own settings UI). Both render the same
// component bound to the same prefs, so changes are identical wherever you make them.
//
// `variant`:
//   'panel' (default) — a fixed-width sidebar that docks beside the Monaco editor (the cog).
//   'page'            — full width of its container, sections in a responsive grid, like a real
//                       IDE settings page (used on the plugin detail "Settings" tab).

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

export function EditorSettingsPanel({ prefs, update, onClose, variant = 'panel' }) {
  const g = (k, d) => prefs[k] ?? d
  const sel = (k, d, opts) => <SimpleSelect className="w-32" value={g(k, d)} onChange={v => update({ [k]: v })} options={opts} />
  const tog = (k, d) => <Toggle checked={!!g(k, d)} onChange={v => update({ [k]: v })} />
  const opts = (arr) => arr.map(v => ({ value: v, label: typeof v === 'string' ? v[0].toUpperCase() + v.slice(1) : String(v) }))
  const page = variant === 'page'

  // The setting sections — shared across both layouts. Each <section> becomes a grid cell in
  // 'page' mode and a stacked block in 'panel' mode.
  const sections = (
    <>
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
    </>
  )

  const header = (
    <div className="flex items-center gap-2 px-2.5 py-1.5 border-b border-poe-line shrink-0">
      <Settings size={13} className="text-poe-gold-dim" />
      <span className="gold-heading text-[13px] flex-1">Editor Settings</span>
      {onClose && <button onClick={onClose} title="Close settings" className="p-1 rounded text-poe-text hover:text-poe-text-bright hover:bg-white/10"><X size={14} /></button>}
    </div>
  )

  // Full-width IDE-style settings page: sections flow into a responsive multi-column grid that
  // fills the container, so it never sits in a narrow column.
  if (page) {
    return (
      <div className="w-full">
        {header}
        <div className="pt-3">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-4 items-start">
            {sections}
          </div>
        </div>
      </div>
    )
  }

  // Docked sidebar (the in-editor cog) — fixed width, scrolls within its own height.
  return (
    <aside className="w-72 shrink-0 panel flex flex-col min-h-0 h-full">
      {header}
      <div className="flex-1 min-h-0 overflow-auto px-2.5 py-2 space-y-3">
        {sections}
      </div>
    </aside>
  )
}

// Self-sourced wrapper used by the plugin detail page's "Settings" tab — full-width page layout.
export function EditorPluginSettings() {
  const { prefs, update } = usePrefs()
  return <EditorSettingsPanel prefs={prefs} update={update} variant="page" />
}

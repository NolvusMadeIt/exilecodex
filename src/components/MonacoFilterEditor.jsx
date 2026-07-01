import React, { useEffect, useRef } from 'react'
// edcore.main = the editor API + all editor CONTRIBUTIONS (suggest/autocomplete, find, hover,
// bracket matching…) WITHOUT the bundled languages. `editor.api` alone omits the suggest
// controller, so autocomplete silently never runs.
import * as monaco from 'monaco-editor/esm/vs/editor/edcore.main'
import EditorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker'
import { registerPoe2FilterLanguage } from '../lib/poe2FilterLanguage.js'

// Thin React wrapper around Monaco. The PoE2 filter language lives in lib/poe2FilterLanguage.js
// (the reusable "plugin core"); this file only owns the Monaco instance lifecycle + React wiring.

// Workers (Vite bundles them). A custom language only needs the core editor worker.
if (typeof self !== 'undefined' && !self.__poeMonacoEnv) {
  self.MonacoEnvironment = { getWorker: () => new EditorWorker() }
  self.__poeMonacoEnv = true
}

export { setFilterCatalog } from '../lib/poe2FilterLanguage.js'

// Fixed options that aren't user-tunable; user options are merged over these.
const BASE = {
  language: 'poe2filter',
  theme: 'poe2-dark',
  automaticLayout: true,
  fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace',
  detectIndentation: false,
  suggestOnTriggerCharacters: true,
  wordBasedSuggestions: 'off',
  suggest: { showWords: false },
  scrollbar: { verticalScrollbarSize: 10, horizontalScrollbarSize: 10 },
  padding: { top: 10, bottom: 10 },
}

export function MonacoFilterEditor({ value, onChange, options = {}, onCursor }) {
  const hostRef = useRef(null)
  const edRef = useRef(null)
  const onChangeRef = useRef(onChange); onChangeRef.current = onChange
  const onCursorRef = useRef(onCursor); onCursorRef.current = onCursor
  // True while WE push an external value in (ed.setValue). setValue fires onDidChangeModelContent
  // synchronously, so without this guard a programmatic update (e.g. the live filter arriving) would
  // be reported as a "user edit" — which silently flips the filter into manual mode and freezes the
  // live output. Only real keystrokes should call onChange.
  const applyingRef = useRef(false)

  const report = () => {
    const ed = edRef.current; if (!ed || !onCursorRef.current) return
    const p = ed.getPosition(); const sel = ed.getSelection()
    const selLen = sel && !sel.isEmpty() ? ed.getModel().getValueInRange(sel).length : 0
    onCursorRef.current({ line: p?.lineNumber || 1, col: p?.column || 1, selLen })
  }

  // Create the editor once.
  useEffect(() => {
    registerPoe2FilterLanguage(monaco)
    const ed = monaco.editor.create(hostRef.current, { ...BASE, ...options, value: value ?? '' })
    edRef.current = ed
    const subs = [
      ed.onDidChangeModelContent(() => { if (applyingRef.current) return; onChangeRef.current?.(ed.getValue()) }),
      ed.onDidChangeCursorPosition(report),
      ed.onDidChangeCursorSelection(report),
    ]
    report()
    return () => { subs.forEach(s => s.dispose()); ed.dispose(); edRef.current = null }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // Push external value changes in without disrupting the caret on no-op (echo) updates.
  useEffect(() => {
    const ed = edRef.current
    if (ed && typeof value === 'string' && value !== ed.getValue()) {
      applyingRef.current = true
      const pos = ed.getPosition(); ed.setValue(value); if (pos) ed.setPosition(pos)
      applyingRef.current = false
    }
  }, [value])

  // Apply settings changes live.
  useEffect(() => { edRef.current?.updateOptions(options) }, [options])

  return <div ref={hostRef} className="h-full w-full" />
}

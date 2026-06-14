import React, { useMemo, useState } from 'react'
import { ChevronDown, ChevronRight, Pencil, Check, X } from 'lucide-react'
import { useFilter } from '../store/FilterStore.jsx'
import { usePrefs } from '../store/Prefs.jsx'
import { useGameInfo } from '../store/GameInfo.jsx'
import { generateFilter } from '../lib/generate.js'
import { parseFilterText } from '../lib/parseFilter.js'

// --- Simple elegant syntax highlighter for PoE .filter syntax ---
const ACTION_WORDS = new Set(['Show', 'Hide', 'Minimal', 'Continue'])
const COND_WORDS = new Set([
  'Class', 'BaseType', 'Rarity', 'ItemLevel', 'DropLevel', 'Quality', 'StackSize',
  'GemLevel', 'MapTier', 'WaystoneTier', 'AreaLevel', 'Identified', 'Corrupted',
  'Mirrored', 'ShaperItem', 'ElderItem', 'FracturedItem', 'SynthesisedItem',
  'HasExplicitMod', 'HasInfluence', 'LinkedSockets', 'Sockets', 'Height', 'Width',
  'HasImplicitMod', 'HasEnchantment', 'BlightedMap', 'UberBlightedMap', 'Replica',
  'AlternateQuality', 'Scourged', 'AnyEnchantment', 'TransfiguredGem'
])
const STYLE_WORDS = new Set([
  'SetTextColor', 'SetBackgroundColor', 'SetBorderColor', 'SetFontSize',
  'PlayEffect', 'MinimapIcon', 'PlayAlertSound', 'PlayAlertSoundPositional',
  'CustomAlertSound', 'CustomAlertSoundOptional', 'DisableDropSound', 'EnableDropSound'
])

function renderHighlighted(text) {
  if (!text) return null
  const lines = text.split('\n')
  return lines.map((line, idx) => {
    const trimmed = line.trimStart()
    if (trimmed.startsWith('#')) {
      return <div key={idx} className="filter-comment">{line}</div>
    }
    const nodes = []
    let i = 0
    const len = line.length
    while (i < len) {
      const ch = line[i]
      if (/\s/.test(ch)) {
        let j = i
        while (j < len && /\s/.test(line[j])) j++
        nodes.push(line.slice(i, j))
        i = j
        continue
      }
      if (ch === '"') {
        let j = i + 1
        while (j < len && line[j] !== '"') j++
        j = Math.min(len, j + 1)
        nodes.push(<span key={nodes.length} className="filter-string">{line.slice(i, j)}</span>)
        i = j
        continue
      }
      if (/\d/.test(ch)) {
        let j = i
        while (j < len && /[\d.]/.test(line[j])) j++
        nodes.push(<span key={nodes.length} className="filter-number">{line.slice(i, j)}</span>)
        i = j
        continue
      }
      if ('=<>!'.includes(ch)) {
        let j = i
        while (j < len && '=<>!'.includes(line[j])) j++
        nodes.push(<span key={nodes.length} className="filter-op">{line.slice(i, j)}</span>)
        i = j
        continue
      }
      if (/[A-Za-z_]/.test(ch)) {
        let j = i
        while (j < len && /[A-Za-z0-9_]/.test(line[j])) j++
        const word = line.slice(i, j)
        let cls = ''
        if (ACTION_WORDS.has(word)) cls = 'filter-action'
        else if (COND_WORDS.has(word)) cls = 'filter-cond'
        else if (STYLE_WORDS.has(word)) cls = 'filter-style'
        nodes.push(cls ? <span key={nodes.length} className={cls}>{word}</span> : word)
        i = j
        continue
      }
      nodes.push(ch)
      i++
    }
    return <div key={idx} className="leading-relaxed">{nodes}</div>
  })
}

// Format a date+time stamp like "2026-06-13 17:42 UTC" — readable and unambiguous.
function stampNow() {
  const d = new Date()
  const pad = (n) => String(n).padStart(2, '0')
  return `${d.getUTCFullYear()}-${pad(d.getUTCMonth() + 1)}-${pad(d.getUTCDate())} ${pad(d.getUTCHours())}:${pad(d.getUTCMinutes())} UTC`
}

export function FilterOutput() {
  const { active, importCustomRules } = useFilter()
  const { prefs } = usePrefs()
  const gameInfo = useGameInfo()
  const [open, setOpen] = useState(true)
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState('')

  // Memoize on active+prefs+gameInfo. Stamp date+time at memo time so the header line is
  // stable per-edit (not rewriting every keystroke).
  const text = useMemo(() => {
    return generateFilter(active, {
      ...prefs,
      gameVersion: gameInfo.gameVersion,
      gameVersionLabel: gameInfo.gameVersionLabel,
      _generatedAt: stampNow(),
    })
  }, [active, prefs, gameInfo])

  const lineCount = text.split('\n').length
  const displayCount = editing ? draft.split('\n').length : lineCount

  const syntaxOn = prefs.syntaxHighlight !== false

  const handleStartEdit = (e) => {
    e.stopPropagation()
    setDraft(text)
    setEditing(true)
    setOpen(true)
  }

  const handleSave = (e) => {
    e.stopPropagation()
    if (!draft.trim()) {
      setEditing(false)
      return
    }
    try {
      const parsed = parseFilterText(draft)
      importCustomRules({
        customRules: parsed.customRules || [],
        freeTextTop: parsed.freeTextTop || '',
        freeTextBottom: parsed.freeTextBottom || '',
        meta: parsed.meta || {},
      })
    } catch (err) {
      console.warn('Failed to parse manual filter edits', err)
    }
    setEditing(false)
  }

  const handleCancel = (e) => {
    e.stopPropagation()
    setEditing(false)
  }

  return (
    <section className="flex w-full flex-1 min-h-0 flex-col">
      <div className="section-bar w-full flex items-center gap-2">
        <button onClick={() => setOpen(o => !o)} className="flex items-center gap-2 flex-1 min-w-0 justify-center hover:opacity-90">
          {open ? <ChevronDown size={14} /> : <ChevronRight size={14} />} Filter Output
          <span className="text-[11px] text-poe-text">({displayCount} lines)</span>
        </button>
        <div className="flex items-center gap-1 pr-1">
          {!editing ? (
            <button
              onClick={handleStartEdit}
              title="Edit the filter output manually"
              className="p-1 rounded hover:bg-white/10 text-poe-text-bright/70 hover:text-poe-text-bright transition-colors"
            >
              <Pencil size={13} />
            </button>
          ) : (
            <>
              <button
                onClick={handleSave}
                title="Save manual changes (updates the app filter)"
                className="p-1 rounded hover:bg-white/10 text-poe-text-bright/70 hover:text-poe-text-bright transition-colors"
              >
                <Check size={13} />
              </button>
              <button
                onClick={handleCancel}
                title="Cancel editing"
                className="p-1 rounded hover:bg-white/10 text-poe-text-bright/70 hover:text-poe-text-bright transition-colors"
              >
                <X size={13} />
              </button>
            </>
          )}
        </div>
      </div>
      {open && (
        editing ? (
          <textarea
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            className="mt-2 flex-1 min-h-0 panel p-3 font-mono text-[11px] leading-relaxed text-poe-text-bright overflow-auto whitespace-pre-wrap focus:outline-none focus:border-poe-gold-dim border border-poe-line/50"
            spellCheck={false}
          />
        ) : syntaxOn ? (
          <div className="mt-2 flex-1 min-h-0 panel p-3 font-mono text-[11px] leading-relaxed text-poe-text-bright overflow-auto">
            {renderHighlighted(text)}
          </div>
        ) : (
          <pre className="mt-2 flex-1 min-h-0 panel p-3 font-mono text-[11px] leading-relaxed text-poe-text-bright overflow-auto whitespace-pre-wrap">
            {text}
          </pre>
        )
      )}
    </section>
  )
}

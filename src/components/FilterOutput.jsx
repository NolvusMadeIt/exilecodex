import React, { useState } from 'react'
import { ChevronDown, ChevronRight } from 'lucide-react'
import { useFilter } from '../store/FilterStore.jsx'
import { usePrefs } from '../store/Prefs.jsx'
import { useGameInfo } from '../store/GameInfo.jsx'
import { useFilterText } from '../lib/useFilterText.js'

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

export function FilterOutput() {
  const { active } = useFilter()
  const { prefs } = usePrefs()
  const gameInfo = useGameInfo()
  const [open, setOpen] = useState(true)

  // Real build of the active filter (core base + your overrides). Async because the base file is
  // fetched at runtime; cached after first load so this stays snappy.
  const { text, loading, error } = useFilterText(active, { gameInfo, prefs })

  const lineCount = text ? text.split('\n').length : 0
  const syntaxOn = prefs.syntaxHighlight !== false

  return (
    <section className="flex w-full flex-1 min-h-0 flex-col">
      <div className="section-bar w-full flex items-center gap-2">
        <button onClick={() => setOpen(o => !o)} className="flex items-center gap-2 flex-1 min-w-0 justify-center hover:opacity-90">
          {open ? <ChevronDown size={14} /> : <ChevronRight size={14} />} Filter Output
          <span className="text-[11px] text-poe-text">
            ({loading ? 'building…' : `${lineCount} lines`})
          </span>
        </button>
      </div>
      {open && (
        error ? (
          <div className="mt-2 flex-1 min-h-0 panel p-3 font-mono text-[11px] text-poe-danger overflow-auto whitespace-pre-wrap">
            Couldn’t build the filter: {error.message}
          </div>
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

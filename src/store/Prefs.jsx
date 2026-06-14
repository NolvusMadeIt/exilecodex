import React, { createContext, useContext, useEffect, useState, useCallback } from 'react'

// App-wide prefs (NOT per-filter): theme, league/version meta, free-text comments
// that are emitted at the top/bottom of every filter the user exports.

const LS = 'nolvus-prefs'

export const THEMES = [
  { id: 'ember',  name: 'Ember',  swatch: '#ff6f5c', desc: 'True black with coral/ember accent.' },
  { id: 'abyss',  name: 'Abyss',  swatch: '#5cafde', desc: 'Deep abyssal blue with cyan highlights.' },
  { id: 'arcane', name: 'Arcane', swatch: '#b27cf0', desc: 'Midnight violet with arcane purple accent.' },
]

const DEFAULTS = {
  theme: 'ember',
  league: 'Return of the Ancients',   // selected from GameInfo's league list
  topComment: '',                      // free text inserted at the very top of .filter
  bottomComment: '',                   // free text appended at the bottom
  syntaxHighlight: true,               // colorize the Filter Output pane (comments, keywords, strings, etc.)
  accordionsOpen: true,                // Quick Filter sections start expanded
}

const PrefsCtx = createContext(null)

function load() {
  try {
    const raw = JSON.parse(localStorage.getItem(LS) || 'null')
    if (raw && typeof raw === 'object') return { ...DEFAULTS, ...raw }
  } catch {}
  return { ...DEFAULTS }
}

export function PrefsProvider({ children }) {
  const [prefs, setPrefs] = useState(load)

  useEffect(() => { try { localStorage.setItem(LS, JSON.stringify(prefs)) } catch {} }, [prefs])
  useEffect(() => { document.documentElement.setAttribute('data-theme', prefs.theme || 'ember') }, [prefs.theme])

  const update = useCallback((patch) => {
    setPrefs(p => ({ ...p, ...(typeof patch === 'function' ? patch(p) : patch) }))
  }, [])

  return <PrefsCtx.Provider value={{ prefs, update }}>{children}</PrefsCtx.Provider>
}

export function usePrefs() {
  const ctx = useContext(PrefsCtx)
  if (!ctx) throw new Error('usePrefs must be used inside PrefsProvider')
  return ctx
}

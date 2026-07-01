import React, { createContext, useContext, useEffect, useState } from 'react'

// Single source of truth for "the current state of the world" — game version + league list.
// Fully self-contained: loads the bundled /data/version.json. No external network calls.
//
// Game version + leagues are NOT user-editable here. To update them, edit version.json.

const BUNDLED_URL = '/data/version.json'
const LS = 'nolvus-gameinfo-cache'

const GameInfoCtx = createContext(null)

const DEFAULT = {
  gameVersion: '0.5.4',
  gameVersionLabel: 'Path of Exile 2 (0.5.4)',
  asOf: '',
  leagues: [{ id: 'Standard', name: 'Standard' }],
  source: 'default',     // 'default' | 'bundled' | 'live'
}

function loadCached() {
  try {
    const c = JSON.parse(localStorage.getItem(LS) || 'null')
    if (c && typeof c === 'object') return { ...DEFAULT, ...c }
  } catch {}
  return null
}

export function GameInfoProvider({ children }) {
  const [info, setInfo] = useState(() => loadCached() || DEFAULT)

  useEffect(() => {
    let alive = true

    // 1) bundled (always present in /public)
    fetch(BUNDLED_URL)
      .then(r => r.ok ? r.json() : null)
      .then(j => {
        if (!alive || !j) return
        const next = {
          gameVersion: j.gameVersion || DEFAULT.gameVersion,
          gameVersionLabel: j.gameVersionLabel || `Path of Exile 2 (${j.gameVersion || '0.3.0'})`,
          asOf: j.asOf || '',
          leagues: Array.isArray(j.leagues) && j.leagues.length ? j.leagues : DEFAULT.leagues,
          source: 'bundled',
        }
        setInfo(next)
        try { localStorage.setItem(LS, JSON.stringify(next)) } catch {}
      })
      .catch(() => {})

    return () => { alive = false }
  }, [])

  return <GameInfoCtx.Provider value={info}>{children}</GameInfoCtx.Provider>
}

export function useGameInfo() {
  const ctx = useContext(GameInfoCtx)
  if (!ctx) throw new Error('useGameInfo must be used inside GameInfoProvider')
  return ctx
}

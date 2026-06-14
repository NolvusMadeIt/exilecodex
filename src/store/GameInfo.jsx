import React, { createContext, useContext, useEffect, useState } from 'react'

// Single source of truth for "the current state of the world" — game version + league list.
// Strategy:
//   1) Load bundled /data/version.json (always present, ships with the build).
//   2) In the background, attempt the live PoE leagues API (CORS may block it). If it
//      succeeds, merge fresh league names in. If not, the bundled list still works.
//
// Game version is intentionally NOT user-editable. To bump it, edit version.json.

const BUNDLED_URL = '/data/version.json'
const LIVE_LEAGUES_URL = 'https://api.pathofexile.com/leagues?realm=poe2&type=main'
const LS = 'nolvus-gameinfo-cache'

const GameInfoCtx = createContext(null)

const DEFAULT = {
  gameVersion: '0.5.2',
  gameVersionLabel: 'Path of Exile 2 (0.5.2)',
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

    // 2) live leagues — best-effort. The official endpoint may CORS-block; that's fine.
    fetch(LIVE_LEAGUES_URL, { credentials: 'omit', mode: 'cors' })
      .then(r => r.ok ? r.json() : null)
      .then(arr => {
        if (!alive || !Array.isArray(arr) || !arr.length) return
        const leagues = arr.map(l => ({ id: l.id, name: l.id })).slice(0, 24)
        setInfo(prev => {
          const next = { ...prev, leagues, source: 'live' }
          try { localStorage.setItem(LS, JSON.stringify(next)) } catch {}
          return next
        })
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

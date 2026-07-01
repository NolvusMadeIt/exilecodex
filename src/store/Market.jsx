import React, { createContext, useContext, useCallback, useMemo, useState } from 'react'
import { usePrefs } from './Prefs.jsx'
import { fetchLeagues, fetchCurrencies, fetchCurrency, fetchHistory } from '../lib/market/client.ts'
import { buyUrl as mkBuyUrl, sellUrl as mkSellUrl } from '../lib/market/trade.ts'
import { fmtNum, fmtCompact, fmtPct, fmtPrice } from '../lib/market/format.ts'

// Shared market layer — the app-wide "host" market source the Marketplace-Companion plugins consume.
// It holds the chosen league + base currency (persisted in prefs, DB-synced) and exposes the market
// fetchers (which call the Supabase `market` edge function). Mounted app-wide but LAZY: it issues no
// network request until a market plugin actually asks, so it costs nothing when those plugins are off.

const MarketCtx = createContext(null)

export function MarketProvider({ children }) {
  const { prefs, update } = usePrefs()
  const league = prefs.market?.league || null
  const base = prefs.market?.base || 'exalted'
  const [leagues, setLeagues] = useState([])

  const setLeague = useCallback((l) => update(p => ({ ...p, market: { ...(p.market || {}), league: l } })), [update])
  const setBase = useCallback((b) => update(p => ({ ...p, market: { ...(p.market || {}), base: b } })), [update])

  // Load the league list on demand; seed the default league (current league, else first) once.
  const loadLeagues = useCallback(async () => {
    const ls = await fetchLeagues()
    setLeagues(ls)
    if (!league && ls.length) setLeague((ls.find(x => x.IsCurrent) || ls[0]).Value)
    return ls
  }, [league, setLeague])

  const market = useMemo(() => ({
    getCurrencies: () => (league ? fetchCurrencies(league, base).then(r => r.rows || []) : Promise.resolve([])),
    getCurrency: (apiId) => (league ? fetchCurrency(league, base, apiId) : Promise.resolve(null)),
    getHistory: (itemId, days) => (league ? fetchHistory(league, itemId, days) : Promise.resolve(null)),
    buyUrl: (apiId) => (league ? mkBuyUrl(league, apiId, base) : '#'),
    sellUrl: (apiId) => (league ? mkSellUrl(league, apiId, base) : '#'),
  }), [league, base])

  const value = useMemo(() => ({
    league, base, leagues, setLeague, setBase, loadLeagues, market,
    format: { num: fmtNum, compact: fmtCompact, pct: fmtPct, price: fmtPrice },
  }), [league, base, leagues, setLeague, setBase, loadLeagues, market])

  return <MarketCtx.Provider value={value}>{children}</MarketCtx.Provider>
}

export function useMarket() {
  const ctx = useContext(MarketCtx)
  if (!ctx) throw new Error('useMarket must be used within MarketProvider')
  return ctx
}

import React, { useEffect, useRef, useState } from 'react'
import { ExternalLink } from 'lucide-react'
import { installXileShim } from '../../xilehud/adapter.ts'
import '../../xilehud/xilehud.css'

// Merchant History — powered by XileHUD's vendored history renderer (GPL-3.0, see
// ATTRIBUTION.md): your Currency Exchange trades, searchable and grouped, with running
// totals and the cumulative earnings chart. Storage is OUR per-league JSON store
// (electron/xilehud/history-store.cjs); network + session go through OUR trade transport
// (electron/trade.cjs history() — never XileHUD's session layer). The id-based skeleton
// below mirrors the upstream shell's history view; the vendored modules bind and own
// everything inside it.
export function XileHistoryPage() {
  const [status, setStatus] = useState('loading') // 'loading' | 'ready' | 'error'
  const [error, setError] = useState('')
  const modRef = useRef(null)

  useEffect(() => {
    installXileShim()
    let alive = true
    ;(async () => {
      try {
        const mod = await import('../../xilehud/overlay/history/module.ts')
        if (!alive) return
        modRef.current = mod
        mod.onEnterView() // upstream entry: loads the store, binds controls, fetch on demand
        setStatus('ready')
      } catch (e) {
        if (!alive) return
        setError(String(e?.message || e))
        setStatus('error')
      }
    })()
    return () => {
      alive = false
      try { modRef.current?.onLeaveView?.() } catch { /* view already gone */ }
    }
  }, [])

  return (
    <div className="xilehud-panel flex h-[calc(100vh-128px)] min-h-0 flex-col">
      {status === 'error' && (
        <div className="py-6 text-[12.5px] text-poe-danger">
          Couldn’t start Merchant History ({error}).
        </div>
      )}

      {/* Upstream history view skeleton — the vendored modules render into these ids. */}
      <div id="historyContainer" className="flex min-h-0 flex-1 flex-col gap-2">
        <div id="historyHeader" className="shrink-0">
          <div id="historyHeaderMain" className="flex flex-wrap items-center gap-2">
            <button type="button" id="historyRefreshBtn" className="poe-btn h-8">Refresh</button>
            <button type="button" id="historyLeagueBtn" className="poe-btn h-8" title="Pick the league to track">League</button>
            <select id="histTimeframe" className="field h-8 w-36" defaultValue="all">
              <option value="all">All time</option>
              <option value="7d">Last 7 days</option>
              <option value="24h">Last 24 hours</option>
            </select>
            <button type="button" id="poeLoginBtn" className="poe-btn h-8">Sign in</button>
            <span id="historyLastRefresh" className="text-[11px] text-poe-text/50" />
            <span id="historyInfoBadge" className="text-[11px] text-poe-text/60" />
            <span id="historyTradeCount" className="text-[11px] text-poe-text/60" />
          </div>
        </div>

        {/* League prompt (the modules show/hide + fill it). */}
        <div id="historyLeaguePrompt" style={{ display: 'none' }} className="panel p-3">
          <div id="historyLeaguePromptMessage" className="text-[12.5px]" />
          <div id="historyLeaguePromptButtons" className="mt-2 flex flex-wrap gap-2" />
          <button type="button" id="historyLeaguePromptDismiss" className="poe-btn mt-2 h-7">Dismiss</button>
        </div>

        <div id="historyTotals" className="shrink-0" />
        <canvas id="historyChart" height="140" className="w-full shrink-0" />
        <div id="historyList" className="min-h-0 flex-1 overflow-y-auto" />
        <div id="historyDetail" />
      </div>

      <div className="mt-3 shrink-0 border-t border-poe-line/60 pt-2 text-[11px] text-poe-text/45">
        Built by{' '}
        <a
          href="https://github.com/NolvusMadeIt"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-0.5 text-poe-gold-dim hover:text-poe-gold"
        >
          Nolvus <ExternalLink size={10} />
        </a>{' '}
        — a player with a passion for the game. Trades are fetched from your own PoE session
        through this app's transport and stored only on this device.
      </div>
    </div>
  )
}

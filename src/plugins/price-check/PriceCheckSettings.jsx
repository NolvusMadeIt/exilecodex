import React, { useEffect, useState } from 'react'
import { usePrefs } from '../../store/Prefs.jsx'
import { fetchLeagues } from '../../lib/market/client.ts'

// Price Check settings — shown in the panel's gear popover and on Settings ▸ Plugins ▸ Price Check.
// The POESESSID is a SESSION SECRET: stored only on this device (localStorage now; the desktop
// transport will move it to Electron safeStorage), never synced. League, display mode and hotkey are
// ordinary, syncable prefs. The desktop shell reads the hotkey (global shortcut), the display mode
// (page vs overlay window), and — when the trade API returns 401 — flips `sessionExpired` so we can
// tell the user to grab a fresh POESESSID.
const SID_KEY = 'nolvus-poesessid'
export const getPoesessid = () => { try { return localStorage.getItem(SID_KEY) || '' } catch { return '' } }
export const DEFAULT_HOTKEY = 'Ctrl+D'

function KeybindInput({ value, onChange }) {
  const [capturing, setCapturing] = useState(false)
  const onKey = (e) => {
    e.preventDefault(); e.stopPropagation()
    if (['Control', 'Shift', 'Alt', 'Meta'].includes(e.key)) return
    const parts = []
    if (e.ctrlKey) parts.push('Ctrl')
    if (e.altKey) parts.push('Alt')
    if (e.shiftKey) parts.push('Shift')
    if (e.metaKey) parts.push('Meta')
    parts.push(e.key.length === 1 ? e.key.toUpperCase() : e.key)
    onChange(parts.join('+'))
    setCapturing(false)
  }
  return (
    <button onClick={() => setCapturing(true)} onKeyDown={capturing ? onKey : undefined} onBlur={() => setCapturing(false)}
      className="text-[12px] text-poe-text-bright border px-3 py-1.5 min-w-[110px] text-left"
      style={{ borderRadius: 2, background: 'rgb(var(--c-bg))', borderColor: capturing ? 'rgb(var(--c-accent))' : 'rgb(var(--c-line))' }}>
      {capturing ? 'Press keys…' : value || 'Unset'}
    </button>
  )
}

export function PriceCheckSettings() {
  const { prefs, update } = usePrefs()
  const [sid, setSid] = useState(getPoesessid)
  const [saved, setSaved] = useState(() => !!getPoesessid())
  const [loggedIn, setLoggedIn] = useState(false)
  const [leagues, setLeagues] = useState([])
  const pc = prefs.pluginSettings?.['price-check'] || {}
  const displayMode = pc.displayMode || 'page'
  const hotkey = pc.hotkey || DEFAULT_HOTKEY
  const sessionExpired = !!pc.sessionExpired

  useEffect(() => { let live = true; fetchLeagues().then((ls) => { if (live) setLeagues(ls || []) }).catch(() => {}); return () => { live = false } }, [])
  const current = leagues.find((l) => l.IsCurrent)?.Value || ''
  const selectedLeague = pc.league || current

  const isDesktop = typeof window !== 'undefined' && !!window.nolvusTrade
  const doLogin = async () => {
    if (!window.nolvusTrade?.login) return
    const r = await window.nolvusTrade.login()
    if (r?.ok) { setPc({ sessionExpired: false }); setLoggedIn(true) }
  }
  const setPc = (patch) => update((p) => ({ ...p, pluginSettings: { ...(p.pluginSettings || {}), 'price-check': { ...(p.pluginSettings?.['price-check'] || {}), ...patch } } }))
  const saveSid = (v) => {
    setSid(v)
    const t = v.trim()
    try { localStorage.setItem(SID_KEY, t) } catch {}
    setSaved(!!t)
    if (t) setPc({ sessionExpired: false }) // a fresh paste clears the expired warning
  }

  const fieldStyle = { borderRadius: 2, background: 'rgb(var(--c-bg))', border: '1px solid rgb(var(--c-line))' }

  return (
    <div className="space-y-5 text-left">
      {/* Season / league */}
      <div>
        <div className="gold-heading text-[14px]">Season</div>
        <p className="text-[12px] text-poe-text/70 mt-1 max-w-[460px]">Which league to price against. Defaults to the current season.</p>
        <select value={selectedLeague} onChange={(e) => setPc({ league: e.target.value })}
          className="mt-2 text-[12px] text-poe-text-bright px-2 py-1.5" style={{ ...fieldStyle, maxWidth: 240 }}>
          {!leagues.length && <option value="">Loading…</option>}
          {leagues.map((l) => <option key={l.Value} value={l.Value}>{l.Value}{l.IsCurrent ? ' · current' : ''}</option>)}
        </select>
      </div>

      {/* Trade session */}
      <div>
        <div className="gold-heading text-[14px]">Trade session</div>
        <p className="text-[12px] text-poe-text/70 mt-1 max-w-[480px]">
          Live prices come from the official trade site, pulled from your own machine with your own
          login session — no developer account or API key needed. Stored only on this device.
        </p>

        {/* Desktop: logging in is the reliable path — it captures BOTH your login and the Cloudflare
            clearance the trade site requires. Pasting a POESESSID alone is often Cloudflare-blocked. */}
        {isDesktop && window.nolvusTrade?.login && (
          <div className="mt-2.5">
            <button onClick={doLogin}
              className="text-[12.5px] font-semibold text-poe-gold border border-poe-gold/60 hover:bg-poe-gold/10 px-3 py-1.5" style={{ borderRadius: 2 }}>
              {loggedIn ? '✓ Logged in — re-run your price check' : 'Log in to Path of Exile  ·  recommended'}
            </button>
            <p className="text-[11px] text-poe-text/55 mt-1 max-w-[480px]">
              Opens a real Path of Exile window. Sign in and let the page finish loading — this captures
              both your login <span className="text-poe-text/75">and the Cloudflare clearance the trade
              site requires</span>. Pasting a POESESSID alone often gets blocked by Cloudflare, so this
              is the reliable way.
            </p>
          </div>
        )}

        <div className="mt-3">
          <div className="text-[11.5px] text-poe-text/60">{isDesktop ? 'Or paste a POESESSID cookie' : 'Paste your POESESSID cookie'}</div>
          <div className="flex items-center gap-2 mt-1.5 flex-wrap">
            <input type="password" value={sid} onChange={(e) => saveSid(e.target.value)} placeholder="POESESSID cookie value"
              className="w-[320px] text-[12px] text-poe-text-bright px-2.5 py-1.5" style={fieldStyle} />
            {saved && <span className="text-[11px] text-emerald-400 whitespace-nowrap">✓ Saved</span>}
          </div>
        </div>

        {sessionExpired && (
          <p className="text-[11.5px] text-red-400 mt-1.5">Your POESESSID is invalid or expired — {isDesktop ? 'log in again above, or paste a fresh one.' : 'paste a fresh one.'}</p>
        )}
        <div className="text-[11px] text-poe-text/55 mt-2 max-w-[480px] leading-relaxed">
          <div className="text-poe-text/70">How to get a POESESSID:</div>
          <ol className="list-decimal ml-4 mt-0.5 space-y-0.5">
            <li>Log in at pathofexile.com in your browser.</li>
            <li>Open DevTools (F12) → <span className="text-poe-text/70">Application</span> → Cookies → pathofexile.com.</li>
            <li>Copy the value of the <code className="text-poe-text/70">POESESSID</code> cookie and paste it above.</li>
          </ol>
          <div className="mt-1.5">{isDesktop
            ? 'If a price check reports a Cloudflare block, use “Log in to Path of Exile” above — it passes the check for you. (A flagged ISP/VPN can also trip Cloudflare.)'
            : 'The browser version routes through our server, which Cloudflare usually blocks — the desktop app uses your own connection and is far more reliable.'}</div>
        </div>
      </div>

      {/* Display mode */}
      <div>
        <div className="gold-heading text-[14px]">Show price check as</div>
        <div className="inline-flex mt-2 border border-poe-line" style={{ borderRadius: 2 }}>
          {[['page', 'In-app page'], ['overlay', 'Overlay window']].map(([m, label]) => (
            <button key={m} onClick={() => setPc({ displayMode: m })}
              className={`text-[12px] px-3 py-1.5 ${displayMode === m ? 'text-poe-gold' : 'text-poe-text/60 hover:text-poe-gold/80'}`}
              style={{ background: displayMode === m ? 'rgb(var(--c-panel-light))' : 'transparent' }}>
              {label}
            </button>
          ))}
        </div>
        <p className="text-[11px] text-poe-text/50 mt-1.5 max-w-[460px]">
          <span className="text-poe-text/80">In-app page</span> keeps it here in the app.{' '}
          <span className="text-poe-text/80">Overlay window</span> pops just the price checker out as a
          separate always-on-top window over the game, opened with the hotkey below (desktop).
        </p>
      </div>

      {/* Hotkey */}
      <div>
        <div className="gold-heading text-[14px]">Price check hotkey</div>
        <p className="text-[12px] text-poe-text/70 mt-1 max-w-[460px]">
          In overlay mode, copy an item in-game (Ctrl+C) and press this to price-check it instantly (desktop).
        </p>
        <div className="flex items-center gap-2 mt-2">
          <KeybindInput value={hotkey} onChange={(v) => setPc({ hotkey: v })} />
          {hotkey !== DEFAULT_HOTKEY && (
            <button onClick={() => setPc({ hotkey: DEFAULT_HOTKEY })} className="text-[12px] text-poe-text/50 hover:text-poe-gold">Reset to {DEFAULT_HOTKEY}</button>
          )}
        </div>
      </div>
    </div>
  )
}

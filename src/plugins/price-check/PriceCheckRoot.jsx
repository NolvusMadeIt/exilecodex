import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Clipboard, Search, Settings, ChevronDown, Check } from 'lucide-react'
import { useCatalog } from '../../lib/catalog.js'
import { useMarket } from '../../store/Market.jsx'
import { usePrefs } from '../../store/Prefs.jsx'
import { useToast } from '../../store/Toast.jsx'
import { parseTradeItem } from '../../lib/trade/parseTradeItem.js'
import { loadStatIndex, matchStat } from '../../lib/trade/statMatcher.js'
import { buildQuery } from '../../lib/trade/buildQuery.js'
import { summarize, formatPrice } from '../../lib/trade/summarize.js'
import { fetchCurrencies, fetchTradePrice, fetchLeagues } from '../../lib/market/client.ts'
import { PriceCheckSettings, getPoesessid } from './PriceCheckSettings.jsx'

// Result-filter options (mirror the official trade): which currency to price in, the listing type,
// and how recent. The buyout/time values map to the market layer's SaleType / ListedWithin.
const CURRENCY_OPTS = [
  { value: 'ex+div', label: 'Exalted + Divine' },
  { value: 'Exalted Orb', label: 'Exalted' },
  { value: 'Divine Orb', label: 'Divine' },
  { value: 'Chaos Orb', label: 'Chaos' },
  { value: 'Orb of Annulment', label: 'Annul' },
]
const SALE_OPTS = [
  { value: 'both', label: 'Buyout + in person' },
  { value: 'buyout', label: 'Instant buyout only' },
  { value: 'inperson', label: 'In person only' },
  { value: 'any', label: 'Any' },
]
const TIME_OPTS = [
  { value: 'any', label: 'Any time' },
  { value: '3hours', label: 'Up to 3 hours' },
  { value: '12hours', label: 'Up to 12 hours' },
  { value: '1day', label: 'Up to a day' },
  { value: '3days', label: 'Up to 3 days' },
  { value: '1week', label: 'Up to a week' },
  { value: '1month', label: 'Up to a month' },
]

// Price Check — Phase 1 slice: the query panel. Paste an item → parse it → pick the stats that
// matter → get a good SELL price FROM the live trade listings (lowest / median / highest), so you
// know what to list it at. Live pulling of the listings arrives with the trade engine + desktop
// transport; nothing here shows an invented price. Sharp corners, left-aligned, content-width
// controls (house rules).

const PANEL = { background: 'rgb(var(--c-panel) / 0.92)' }
const GOLD = 'rgb(var(--c-accent2))' // amber — used for value/in-demand accents

// Best-effort prefix/suffix split from the mod text (the copied item doesn't label affixes). The
// real, exact classification comes with the mod database in the engine slice; until then anything
// we can't place confidently stays under "other mods" rather than being mislabelled.
function affixOf(text) {
  if (/Resistance|to (Strength|Dexterity|Intelligence|all Attributes|Spirit)|Attack Speed|Cast Speed|Critical|Accuracy|Light Radius|Requirement|Regeneration|Leech|Thorns|Stun (Threshold|Buildup)|increased Rarity|Charm|to Level of all/i.test(text)) return 'suffix'
  if (/maximum Life|maximum Mana|maximum Energy Shield|Adds \d|increased .*Damage|increased Armour|increased Evasion|increased Energy Shield|Physical Damage|Spell Damage|Flat/i.test(text)) return 'prefix'
  return 'other'
}

function Section({ label, children }) {
  return (
    <div className="border-t border-poe-line px-3.5 py-2.5">
      <div className="text-[11px] uppercase tracking-[0.06em] text-poe-text/50 mb-1.5">{label}</div>
      {children}
    </div>
  )
}

function Chip({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      className={`text-[12px] px-2.5 py-1 border transition-colors ${
        active ? 'text-poe-gold border-poe-gold/60' : 'text-poe-text/70 border-poe-line hover:text-poe-gold/80'
      }`}
      style={{ borderRadius: 2, background: 'rgb(var(--c-bg))' }}
    >
      {children}
    </button>
  )
}

function StatRow({ checked, onToggle, text, values, kind }) {
  return (
    <label className="flex items-center gap-2 py-[3px] text-[13px] cursor-pointer">
      <input type="checkbox" checked={checked} onChange={onToggle} style={{ accentColor: 'rgb(var(--c-accent))', width: 13, height: 13 }} />
      <span className="flex-1 min-w-0 truncate text-poe-text-bright" title={text}>{text}</span>
      {kind && kind !== 'explicit' && <span className="text-[10px] text-poe-text/40">{kind}</span>}
    </label>
  )
}

function PriceStat({ icon, label, value, hint, gold }) {
  return (
    <div className="text-left">
      <div className="text-[11px] text-poe-text/50">{label}</div>
      <div className="flex items-center gap-1.5">
        {icon && <img src={icon} alt="" width={18} height={18} className="shrink-0" />}
        <span className={`text-[19px] font-semibold tabular-nums ${gold ? 'text-poe-gold' : 'text-poe-text-bright'}`}>{value}</span>
      </div>
      {hint && <div className="text-[10px] text-poe-text/40">{hint}</div>}
    </div>
  )
}

// Compact, content-width dropdown (sharp corners, left-aligned). The popup sizes to its widest
// option (no clipped labels) and flips above the trigger when it'd run off the bottom of the screen.
function Dropdown({ value, options, onChange }) {
  const [open, setOpen] = useState(false)
  const [dropUp, setDropUp] = useState(false)
  const ref = useRef(null)
  useEffect(() => {
    if (!open) return
    const onDoc = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false) }
    document.addEventListener('mousedown', onDoc)
    return () => document.removeEventListener('mousedown', onDoc)
  }, [open])
  const toggle = () => setOpen((o) => {
    const next = !o
    if (next && ref.current) {
      const r = ref.current.getBoundingClientRect()
      const need = Math.min(options.length, 8) * 30 + 14
      setDropUp(window.innerHeight - r.bottom < need && r.top > need)
    }
    return next
  })
  const sel = options.find((o) => o.value === value) || options[0]
  const orbs = (o) => (o?.icons || (o?.icon ? [o.icon] : [])).map((src, i) => <img key={i} src={src} alt="" width={16} height={16} className="shrink-0" />)
  return (
    <div ref={ref} className="relative inline-block">
      <button onClick={toggle} className="inline-flex items-center gap-1.5 text-[12px] text-poe-text-bright border border-poe-line hover:border-poe-gold/40 px-2 py-1" style={{ borderRadius: 2, background: 'rgb(var(--c-bg))' }}>
        {orbs(sel)}
        <span className="whitespace-nowrap">{sel?.label}</span>
        <ChevronDown size={12} className="text-poe-text/50 shrink-0" />
      </button>
      {open && (
        <div className={`absolute left-0 z-30 border border-poe-line py-1 ${dropUp ? 'bottom-full mb-1' : 'top-full mt-1'}`}
          style={{ borderRadius: 2, background: '#000', width: 'max-content', minWidth: '100%' }}>
          {options.map((o) => (
            <button key={o.value} onClick={() => { onChange(o.value); setOpen(false) }}
              className="w-full flex items-center gap-2 text-left text-[12px] px-2.5 py-1 hover:bg-white/5 whitespace-nowrap"
              style={{ color: o.value === value ? 'rgb(var(--c-accent))' : 'rgb(var(--c-text))' }}>
              {orbs(o)}
              <span className="flex-1 whitespace-nowrap">{o.label}</span>
              {o.value === value && <Check size={12} className="shrink-0" />}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export function PriceCheckRoot() {
  const catalog = useCatalog()
  const market = useMarket?.() || {}
  const { prefs, update } = usePrefs()
  const toast = useToast()

  // Dropdown choices persist in prefs (DB-synced) so they're remembered across sessions.
  const pc = prefs.pluginSettings?.['price-check'] || {}
  const setPc = (patch) => update((p) => ({ ...p, pluginSettings: { ...(p.pluginSettings || {}), 'price-check': { ...(p.pluginSettings?.['price-check'] || {}), ...patch } } }))
  const currency = pc.currency || 'Exalted Orb'
  const saleType = pc.saleType || 'both'
  const listedWithin = pc.listedWithin || 'any'
  const setCurrency = (v) => setPc({ currency: v })
  const setSaleType = (v) => setPc({ saleType: v })
  const setListedWithin = (v) => setPc({ listedWithin: v })

  const [raw, setRaw] = useState(() => { try { return localStorage.getItem('nolvus-pc-item') || '' } catch { return '' } })
  const [searchBy, setSearchBy] = useState('base')
  const [minPct, setMinPct] = useState(80)
  const [checked, setChecked] = useState({})
  const [showSettings, setShowSettings] = useState(false)
  const [status, setStatus] = useState(null)
  const [result, setResult] = useState(null)
  const [checking, setChecking] = useState(false)
  const [curIcons, setCurIcons] = useState({})
  const [divinePrice, setDivinePrice] = useState(0)
  const [autoLeague, setAutoLeague] = useState('')

  // The league to price against: explicit setting → market store → auto-detected current season, so
  // the panel always has one even if the Season dropdown was never touched.
  const league = pc.league || market.league || autoLeague
  useEffect(() => {
    if (pc.league || market.league) return
    let live = true
    fetchLeagues().then((ls) => { if (live) setAutoLeague((ls.find((l) => l.IsCurrent) || ls[0])?.Value || '') }).catch(() => {})
    return () => { live = false }
  }, [pc.league, market.league])

  // Real PoE2 orb art (for the currency dropdown + price labels) + the divine→exalted rate, both
  // from the same source the Market plugin uses. Used to display, not to price.
  useEffect(() => {
    if (!league) return
    let live = true
    fetchCurrencies(league, market.base || 'exalted', 'currency')
      .then((res) => { if (!live) return; const m = {}; (res.rows || []).forEach((r) => { m[r.name] = r.iconPath }); setCurIcons(m); setDivinePrice(res.divinePrice || 0) })
      .catch(() => {})
    return () => { live = false }
  }, [league, market.base])

  const item = useMemo(() => (raw.trim() ? parseTradeItem(raw, catalog) : null), [raw, catalog])
  useEffect(() => { try { localStorage.setItem('nolvus-pc-item', raw) } catch {} }, [raw])

  useEffect(() => {
    if (!item) return
    const init = {}
    item.mods.forEach((m, i) => { init[i] = m.kind === 'explicit' || m.kind === 'implicit' })
    setChecked(init)
    setSearchBy(item.rarity === 'Unique' ? 'name' : 'base')
    setStatus(null)
    setResult(null)
  }, [item])

  const pasteFromClipboard = async () => {
    try {
      const t = await navigator.clipboard.readText()
      if (t && t.trim()) setRaw(t)
      else toast.warn('Clipboard is empty — copy an item in-game with Ctrl+C first.', { title: 'Paste' })
    } catch {
      toast.warn('Couldn’t read the clipboard. Paste into the box with Ctrl+V instead.', { title: 'Paste' })
    }
  }

  // "Check sell price" — the real thing: match the checked mods to trade stat ids, build the search,
  // and pull the actual listings from the official trade site (desktop only). No estimation.
  const checkPrice = async () => {
    const onDesktop = typeof window !== 'undefined' && !!window.nolvusTrade
    const poesessid = getPoesessid()
    if (!league) { setStatus({ kind: 'error', msg: 'Pick a season in settings first.' }); return }
    if (checking) return
    // Desktop can auth by login-window session OR a pasted POESESSID; browser must have a pasted one.
    let authed = !!poesessid
    if (!authed && onDesktop) authed = !!(await window.nolvusTrade.hasSession?.())?.hasSession
    if (!authed) {
      setStatus({ kind: 'need-auth', msg: onDesktop ? 'Log in (or paste your POESESSID) in settings to pull live prices.' : 'Add your POESESSID in settings to pull live prices.' })
      setShowSettings(true); return
    }

    setChecking(true)
    setStatus({ kind: 'loading', msg: 'Pulling live listings…' })
    try {
      const index = await loadStatIndex()
      const checkedMods = (item.mods || [])
        .filter((m, i) => checked[i])
        .map((m) => ({ ...m, statId: matchStat(index, m.text, m.kind)?.id }))
      const query = buildQuery(item, { checkedMods, minPct, searchBy, saleType, listedWithin })
      // Desktop calls the trade site directly (your IP); browser routes through our proxy.
      const r = onDesktop
        ? await window.nolvusTrade.price({ query, league, poesessid })
        : await fetchTradePrice(league, query, poesessid)

      if (r?.error === 'auth') {
        setPc({ sessionExpired: true }); setShowSettings(true)
        setStatus({ kind: 'need-auth', msg: onDesktop
          ? 'Your session expired — paste a fresh POESESSID in settings.'
          : 'GGG returned 403. Re-paste a fresh POESESSID — and if it still fails, GGG is blocking our server, so use the desktop app (it uses your own connection).' })
        return
      }
      if (r?.error === 'rate') { setStatus({ kind: 'error', msg: `Rate-limited by GGG — try again in ${r.retryAfter || 60}s.` }); return }
      if (r?.error) { setStatus({ kind: 'error', msg: `Trade request failed (${r.error}${r.status ? ' ' + r.status : ''})${r.detail ? ': ' + (typeof r.detail === 'string' ? r.detail : JSON.stringify(r.detail)) : ''}` }); return }

      const s = summarize(r.listings, { divinePrice })
      if (!s.count) {
        setResult(null)
        setStatus({ kind: 'empty', msg: r.total ? 'Found listings, but none priced in a currency I can convert yet.' : 'No matching listings found — loosen Min % or the stat filters.' })
        return
      }
      setResult(s)
      setStatus({ kind: 'ok', msg: `Based on ${s.count} of ${r.total} live listings.` })
    } catch {
      setStatus({ kind: 'error', msg: 'Something went wrong pulling prices.' })
    } finally {
      setChecking(false)
    }
  }

  const searchByOptions = useMemo(() => {
    if (!item) return []
    const opts = []
    if (item.rarity === 'Unique' && item.name) opts.push({ id: 'name', label: item.name })
    if (item.baseType) opts.push({ id: 'base', label: item.baseType })
    if (item.category) opts.push({ id: 'category', label: `Any ${item.category}` })
    return opts
  }, [item])

  // Phase 1: open the official trade site (no auth needed). The pre-filled stat query + in-app
  // listings come with the trade engine; for now this is the real, working appraisal path.
  const openTrade = () => {
    const url = league
      ? `https://www.pathofexile.com/trade2/search/poe2/${encodeURIComponent(league)}`
      : 'https://www.pathofexile.com/trade2'
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  const byKind = useMemo(() => {
    const g = { implicit: [], explicit: [], rune: [], enchant: [], crafted: [], fractured: [] }
    item?.mods.forEach((m, i) => { (g[m.kind] || g.explicit).push({ ...m, i }) })
    return g
  }, [item])

  const runes = byKind.rune || []
  const socketCount = item?.sockets || 0
  // Boxes only for the sockets the item actually has (runes fill them, the rest are empty), max 6.
  const socketTotal = Math.min(Math.max(socketCount, runes.length), 6)
  const emptySockets = Math.max(0, socketTotal - runes.length)

  // Split explicit mods into prefixes / suffixes / other (best-effort), implicit + enchant stay apart.
  const affixGroups = useMemo(() => {
    const g = { prefix: [], suffix: [], other: [] }
    ;(byKind.explicit || []).forEach((m) => g[affixOf(m.text)].push(m))
    return g
  }, [byKind])

  // "Modifiable" = open affix slots and not corrupted (Rare up to 6, Magic up to 2 explicit mods).
  const explicitCount = (byKind.explicit || []).length
  const affixCap = item?.rarity === 'Rare' ? 6 : item?.rarity === 'Magic' ? 2 : 0
  const modifiable = !!item && !item.corrupted && affixCap > 0 && explicitCount < affixCap

  const props = item?.properties || {}
  const propRows = [
    ['Armour', props.armour], ['Evasion', props.evasion], ['Energy shield', props.energyShield],
    ['Spirit', props.spirit], ['Crit chance', props.critChance], ['Attacks/sec', props.attacksPerSecond],
  ].filter(([, v]) => v != null)

  // Currency dropdown options (combined ex+div carries both orbs) + the icon shown beside prices.
  const currencyOpts = CURRENCY_OPTS.map((o) =>
    o.value === 'ex+div'
      ? { ...o, icons: [curIcons['Exalted Orb'], curIcons['Divine Orb']].filter(Boolean) }
      : { ...o, icon: curIcons[o.value] },
  )
  const priceIcon = curIcons[currency === 'ex+div' ? 'Exalted Orb' : currency]

  return (
    <div className="py-1">
      <div className="border border-poe-line w-full max-w-[560px]" style={{ ...PANEL, borderRadius: 2 }}>
        {/* Header */}
        <div className="flex items-center justify-between px-3.5 py-2.5">
          <div className="flex items-center gap-2 font-semibold text-poe-text-bright">
            {curIcons['Divine Orb'] && <img src={curIcons['Divine Orb']} alt="" width={18} height={18} />} Price check
          </div>
          <button onClick={() => setShowSettings((s) => !s)} className={`p-1 ${showSettings ? 'text-poe-gold' : 'text-poe-text/60 hover:text-poe-gold'}`} title="Settings"><Settings size={15} /></button>
        </div>
        {showSettings && (
          <div className="border-t border-poe-line px-3.5 py-3" style={{ background: 'rgb(var(--c-bg))' }}>
            <PriceCheckSettings />
          </div>
        )}

        {/* Paste area */}
        <div className="border-t border-poe-line px-3.5 py-2.5">
          <div className="flex items-center gap-2">
            <button onClick={pasteFromClipboard} className="inline-flex items-center gap-1.5 text-[12px] text-poe-text-bright border border-poe-line hover:border-poe-gold/50 px-2.5 py-1.5" style={{ borderRadius: 2, background: 'rgb(var(--c-bg))' }}>
              <Clipboard size={13} /> Paste from clipboard
            </button>
            {item && <button onClick={() => setRaw('')} className="text-[12px] text-poe-text/50 hover:text-poe-gold">Clear</button>}
          </div>
          <textarea
            value={raw}
            onChange={(e) => setRaw(e.target.value)}
            placeholder="In-game, hover an item and press Ctrl+C, then paste it here."
            rows={17}
            className="mt-2 w-full max-w-[520px] text-[12px] text-poe-text-bright px-2.5 py-2 resize-y leading-snug"
            style={{ borderRadius: 2, background: 'rgb(var(--c-bg))', border: '1px solid rgb(var(--c-line))' }}
          />
          {item && socketTotal > 0 && (
            <div className="mt-2.5">
              <div className="text-[11px] uppercase tracking-[0.06em] text-poe-text/50 mb-1.5">sockets &amp; runes</div>
              <div className="flex flex-wrap items-center gap-1.5">
                {runes.map((r, i) => (
                  <span key={`r${i}`} className="text-[11.5px] text-poe-gold/80 border border-poe-gold/40 px-1.5 py-1" style={{ borderRadius: 2 }} title={r.text}>
                    {r.text}
                  </span>
                ))}
                {Array.from({ length: emptySockets }).map((_, i) => (
                  <span key={`e${i}`} className="w-6 h-6 border border-poe-line" style={{ borderRadius: 2, background: 'rgb(var(--c-bg))' }} />
                ))}
              </div>
            </div>
          )}
        </div>

        {item ? (
          <>
            {/* Item header */}
            <div className="border-t border-poe-line px-3.5 py-2.5">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-poe-text-bright">{item.name || item.baseType}</span>
                {modifiable && <span className="text-[11px] font-medium text-emerald-400 border border-emerald-700/50 px-1.5 py-0.5" style={{ borderRadius: 2 }}>Modifiable</span>}
                {item.corrupted && <span className="text-[11px] font-medium text-red-400 border border-red-800/50 px-1.5 py-0.5" style={{ borderRadius: 2 }}>Corrupted</span>}
              </div>
              <div className="text-[12px] text-poe-text/60">
                {[item.baseType, item.rarity, item.itemLevel ? `ilvl ${item.itemLevel}` : null].filter(Boolean).join(' · ')}
              </div>
            </div>

            {/* Search by */}
            {searchByOptions.length > 0 && (
              <Section label="search by">
                <div className="flex flex-wrap gap-1.5">
                  {searchByOptions.map((o) => (
                    <Chip key={o.id} active={searchBy === o.id} onClick={() => setSearchBy(o.id)}>{o.label}</Chip>
                  ))}
                </div>
              </Section>
            )}

            {/* Properties */}
            {propRows.length > 0 && (
              <Section label="properties">
                {propRows.map(([k, v]) => (
                  <div key={k} className="flex items-center gap-2 py-[3px] text-[13px]">
                    <span className="flex-1 text-poe-text-bright">{k}</span>
                    <span className="tabular-nums text-poe-text/80">{Array.isArray(v) ? v.join('–') : v}</span>
                  </div>
                ))}
              </Section>
            )}

            {/* Mods, organized: implicit, then prefixes + suffixes together, then enchants. */}
            {[
              ['implicit', byKind.implicit],
              ['prefixes', affixGroups.prefix],
              ['suffixes', affixGroups.suffix],
              ['other mods', affixGroups.other],
              ['enchant', byKind.enchant],
            ].map(([label, list]) =>
              list?.length ? (
                <Section key={label} label={label}>
                  {list.map((m) => (
                    <StatRow
                      key={m.i}
                      checked={!!checked[m.i]}
                      onToggle={() => setChecked((c) => ({ ...c, [m.i]: !c[m.i] }))}
                      text={m.text}
                      values={m.values}
                    />
                  ))}
                </Section>
              ) : null,
            )}

            {/* Min % */}
            <div className="border-t border-poe-line px-3.5 py-2.5 flex items-center gap-3">
              <span className="text-[12px] text-poe-text/60 whitespace-nowrap">Min: {minPct}%</span>
              <input type="range" min={0} max={100} value={minPct} onChange={(e) => setMinPct(Number(e.target.value))} className="flex-1" style={{ accentColor: 'rgb(var(--c-accent))' }} />
            </div>

            {/* Your sell price — pulled from the live listings (lowest / median / highest) */}
            <div className="border-t border-poe-line px-3.5 py-3">
              <div className="text-[11px] uppercase tracking-[0.06em] text-poe-text/50 mb-2">your sell price</div>
              <div className="flex items-start gap-8">
                <PriceStat icon={priceIcon} label="Lowest" value={result ? formatPrice(result.low, currency, divinePrice) : '—'} hint="undercut · fast sale" />
                <PriceStat icon={priceIcon} label="Median" value={result ? formatPrice(result.median, currency, divinePrice) : '—'} hint="realistic price" gold />
                <PriceStat icon={priceIcon} label="Highest" value={result ? formatPrice(result.high, currency, divinePrice) : '—'} hint="patient sale" />
              </div>
              <div className="mt-3 flex flex-wrap items-center gap-2">
                <Dropdown value={currency} onChange={setCurrency} options={currencyOpts} />
                <Dropdown value={saleType} onChange={setSaleType} options={SALE_OPTS} />
                <Dropdown value={listedWithin} onChange={setListedWithin} options={TIME_OPTS} />
                <button onClick={checkPrice} disabled={checking} className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-poe-gold border border-poe-gold/50 hover:bg-poe-gold/10 disabled:opacity-50 px-3 py-1.5" style={{ borderRadius: 2 }}>
                  <Search size={14} /> {checking ? 'Checking…' : 'Check sell price'}
                </button>
              </div>
              {status && (
                <div className="text-[11.5px] text-poe-text/70 mt-2 max-w-[480px]">
                  {status.msg}
                  {status.kind === 'need-auth' && (
                    <button onClick={() => setShowSettings(true)} className="ml-1.5 text-poe-gold hover:underline">Open settings</button>
                  )}
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="border-t border-poe-line px-3.5 py-6 text-[12.5px] text-poe-text/50">
            Paste an item to appraise it — copy it in-game with Ctrl+C, then paste above.
          </div>
        )}
      </div>
    </div>
  )
}

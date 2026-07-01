import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { ChevronDown, Check, MapPin, Radio } from 'lucide-react'
import { usePrefs } from '../../store/Prefs.jsx'
import campaign from './data/campaign.json'
import { CampaignGuideSettings } from './CampaignGuideSettings.jsx'
import { SpeedrunView } from './SpeedrunView.jsx'

// Campaign Guide — pick an Act, then a Zone within it. The selected zone shows its layout MAP on the
// left and its objectives (bosses, quest steps, optional pickups, gem/passive rewards) on the right.
// Any zone name in the text is a live keyword: hover it for a popup of THAT zone's map, click it to
// jump there. Acts 1–4 ship real layout maps (vendored under /data/poe2/campaign-maps); the Interlude
// is objectives-only (no maps exist for it yet). Data: ./data/campaign.json.
//
// Auto-tracking (desktop): window.nolvusGameLog tails PoE2's Client.txt; each detected zone selects
// itself here (dropdowns follow you, its map opens) and is flagged visited. Sharp corners,
// left-aligned, content-width controls (house rules).

const PANEL = { background: 'rgb(var(--c-panel) / 0.92)' }
const ACTS = campaign.acts || []
const MAPS_BASE = '/data/poe2/campaign-maps/'

const norm = (z) => String(z || '').toLowerCase().replace(/\s+/g, ' ').trim()
const esc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
const asArray = (v) => (Array.isArray(v) ? v : v ? [v] : [])
const mapSrc = (file) => (file ? MAPS_BASE + encodeURIComponent(file) : null)

const ALL_ZONES = ACTS.flatMap((a) => (a.zones || []).map((z) => ({ ...z, actId: a.id })))

// Compact, content-width dropdown (sharp corners, left-aligned). Sizes to its widest option and
// flips above the trigger if it'd run off the bottom of the screen. Shared with Price Check's style.
function Dropdown({ value, options, onChange, maxW }) {
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
      const need = Math.min(options.length, 9) * 30 + 14
      setDropUp(window.innerHeight - r.bottom < need && r.top > need)
    }
    return next
  })
  const sel = options.find((o) => o.value === value) || options[0]
  return (
    <div ref={ref} className="relative inline-block">
      <button onClick={toggle} className="inline-flex items-center gap-1.5 text-[12px] text-poe-text-bright border border-poe-line hover:border-poe-gold/40 px-2 py-1" style={{ borderRadius: 2, background: 'rgb(var(--c-bg))', maxWidth: maxW }}>
        <span className="whitespace-nowrap overflow-hidden text-ellipsis">{sel?.label}</span>
        <ChevronDown size={12} className="text-poe-text/50 shrink-0" />
      </button>
      {open && (
        <div className={`absolute left-0 z-30 border border-poe-line py-1 max-h-[280px] overflow-auto ${dropUp ? 'bottom-full mb-1' : 'top-full mt-1'}`}
          style={{ borderRadius: 2, background: '#000', width: 'max-content', minWidth: '100%' }}>
          {options.map((o) => (
            <button key={o.value} onClick={() => { onChange(o.value); setOpen(false) }}
              className="w-full flex items-center gap-2 text-left text-[12px] px-2.5 py-1 hover:bg-white/5 whitespace-nowrap"
              style={{ color: o.value === value ? 'rgb(var(--c-accent))' : 'rgb(var(--c-text))' }}>
              <span className="flex-1 whitespace-nowrap">{o.label}</span>
              {o.value === value && <Check size={12} className="shrink-0" />}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export function CampaignGuideRoot({ compact = false }) {
  const { prefs, update } = usePrefs()
  const cg = prefs.pluginSettings?.['campaign-guide'] || {}
  const setCg = (patch) => update((p) => ({
    ...p,
    pluginSettings: { ...(p.pluginSettings || {}), 'campaign-guide': { ...(p.pluginSettings?.['campaign-guide'] || {}), ...patch } },
  }))
  const done = cg.done || {}
  const visited = cg.visited || {}
  const mode = cg.mode || 'campaign'

  // Selected act + zone (fall back to first).
  const actId = ACTS.find((a) => a.id === cg.actId)?.id || ACTS[0]?.id
  const act = ACTS.find((a) => a.id === actId) || ACTS[0]
  const zones = act?.zones || []
  const zoneId = zones.find((z) => z.id === cg.zoneId)?.id || zones[0]?.id
  const zone = zones.find((z) => z.id === zoneId) || zones[0]

  const actOptions = useMemo(() => ACTS.map((a) => ({ value: a.id, label: a.label })), [])
  const zoneOptions = useMemo(
    () => zones.map((z) => ({ value: z.id, label: z.group ? `${z.group} · ${z.name}` : z.name })),
    [zones],
  )

  const setAct = (id) => setCg({ actId: id, zoneId: ACTS.find((a) => a.id === id)?.zones?.[0]?.id })
  const setZone = (id) => setCg({ zoneId: id })

  // name → { actId, zone } for keyword links + tooltips; a regex matching any known zone name.
  const zoneByName = useMemo(() => {
    const m = new Map()
    for (const z of ALL_ZONES) if (!m.has(norm(z.name))) m.set(norm(z.name), z)
    return m
  }, [])
  const zoneRe = useMemo(() => {
    const names = [...new Set(ALL_ZONES.map((z) => z.name))].filter(Boolean).sort((a, b) => b.length - a.length).map(esc)
    return names.length ? new RegExp(`(?<![A-Za-z0-9])(${names.join('|')})(?![A-Za-z0-9])`, 'g') : null
  }, [])

  const selectZoneByName = useCallback((name) => {
    const z = zoneByName.get(norm(name))
    if (z) setCg({ actId: z.actId, zoneId: z.id })
  }, [zoneByName]) // eslint-disable-line react-hooks/exhaustive-deps

  // Hover tooltip (shared, follows the cursor) + click-to-zoom lightbox.
  const [tip, setTip] = useState(null) // { name, x, y }
  const [zoom, setZoom] = useState(null) // image src
  const onKwEnter = useCallback((name, e) => setTip({ name, x: e.clientX, y: e.clientY }), [])
  const onKwMove = useCallback((e) => setTip((t) => (t ? { ...t, x: e.clientX, y: e.clientY } : t)), [])
  const onKwLeave = useCallback(() => setTip(null), [])

  // Render a string with every known zone name turned into a hover/click keyword.
  const ZoneText = useCallback(({ text }) => {
    if (!text) return null
    if (!zoneRe) return text
    const out = []
    let last = 0
    zoneRe.lastIndex = 0
    let m
    while ((m = zoneRe.exec(text))) {
      if (m.index > last) out.push(text.slice(last, m.index))
      const name = m[0]
      out.push(
        <span key={`${m.index}-${name}`} className="text-poe-gold/90 underline decoration-dotted underline-offset-2 cursor-pointer hover:text-poe-gold"
          onMouseEnter={(e) => onKwEnter(name, e)} onMouseMove={onKwMove} onMouseLeave={onKwLeave}
          onClick={() => selectZoneByName(name)}>{name}</span>,
      )
      last = m.index + name.length
    }
    if (last < text.length) out.push(text.slice(last))
    return out
  }, [zoneRe, onKwEnter, onKwMove, onKwLeave, selectZoneByName])

  // --- Live auto-tracking from the game log (desktop only) -------------------------------------
  const gameLog = typeof window !== 'undefined' ? window.nolvusGameLog : null
  const desktop = !!gameLog?.isDesktop
  const autoTrack = desktop && cg.autoTrack !== false
  const [live, setLive] = useState(null)
  const [watch, setWatch] = useState(null)

  const zoneIndex = useMemo(() => {
    const byZone = new Map()
    for (const z of ALL_ZONES) {
      const k = norm(z.name)
      if (!byZone.has(k)) byZone.set(k, [])
      byZone.get(k).push({ actId: z.actId, zoneId: z.id })
    }
    return byZone
  }, [])

  // Act towns/hubs (e.g. "The Ardura Caravan") aren't route zones, but loading into one means you're
  // in that act — so entering a town jumps the guide to that act.
  const townIndex = useMemo(() => {
    const m = new Map()
    for (const a of ACTS) if (a.town) m.set(norm(a.town), { actId: a.id, firstZoneId: a.zones?.[0]?.id })
    return m
  }, [])

  const applyZone = useCallback((zoneName) => {
    const key = norm(zoneName)
    const matches = zoneIndex.get(key)
    if (matches && matches.length) {
      update((p) => {
        const cur = p.pluginSettings?.['campaign-guide'] || {}
        const loc = matches.find((mm) => mm.actId === cur.actId) || matches[0]
        return {
          ...p,
          pluginSettings: {
            ...(p.pluginSettings || {}),
            'campaign-guide': {
              ...cur, actId: loc.actId, zoneId: loc.zoneId,
              visited: { ...(cur.visited || {}), [`${loc.actId}/${loc.zoneId}`]: true },
            },
          },
        }
      })
      return
    }
    // Not a route zone — but if it's an act town/hub, at least switch to that act. Keep the current
    // zone if we're already in that act (you've just popped back to town); otherwise show its first zone.
    const town = townIndex.get(key)
    if (town) {
      update((p) => {
        const cur = p.pluginSettings?.['campaign-guide'] || {}
        if (cur.actId === town.actId) return p
        return { ...p, pluginSettings: { ...(p.pluginSettings || {}), 'campaign-guide': { ...cur, actId: town.actId, zoneId: town.firstZoneId } } }
      })
    }
    // else: a hideout / map / unknown area — leave the selection as-is (the LiveBar still shows it).
  }, [zoneIndex, townIndex, update])

  useEffect(() => {
    if (!autoTrack || !gameLog) { setWatch(null); try { gameLog?.stop() } catch {} return }
    let cancelled = false
    let unsub = null
    let poll = null
    ;(async () => {
      const res = await gameLog.start({}) // main uses the remembered Client.txt (or auto-detects)
      if (cancelled) return
      setWatch(res)
      if (res?.lastZone) { setLive({ type: 'zone', zone: res.lastZone }); applyZone(res.lastZone) }
      unsub = gameLog.onEvent((ev) => {
        setLive((prev) => ({ ...(prev || {}), ...ev }))
        if (ev.type === 'zone') applyZone(ev.zone)
      })
      // Re-check the watcher periodically so setting the path later (in Settings) clears the
      // "not found" warning here without needing to leave and re-open the page.
      poll = setInterval(async () => {
        try {
          const s = await gameLog.status()
          if (!cancelled && s?.path) setWatch((w) => (w?.ok ? w : { ok: true, path: s.path, source: s.source }))
        } catch { /* ignore */ }
      }, 3000)
    })()
    return () => { cancelled = true; if (unsub) unsub(); if (poll) clearInterval(poll) }
  }, [autoTrack, gameLog, applyZone])

  const liveActLabel = useMemo(() => {
    const z = live?.zone ? zoneByName.get(norm(live.zone)) : null
    return z ? ACTS.find((a) => a.id === z.actId)?.label : null
  }, [live, zoneByName])

  if (!zone) {
    return (
      <div className="py-1">
        <LiveBar desktop={desktop} autoTrack={autoTrack} watch={watch} live={live} actLabel={liveActLabel} />
        <div className="text-[12.5px] text-poe-text/50">No campaign data available.</div>
      </div>
    )
  }

  const images = asArray(zone.mapImage)
  const objectives = zone.objectives || []
  const isVisited = !!visited[`${actId}/${zoneId}`]
  const isHere = !!live?.zone && norm(live.zone) === norm(zone.name)

  return (
    <div className="py-1" onMouseLeave={onKwLeave}>
      {/* Mode: Campaign vs Speedrun */}
      <div className="inline-flex mb-2 border border-poe-line" style={{ borderRadius: 2 }}>
        {[['campaign', 'Campaign'], ['speedrun', 'Speedrun']].map(([m, label]) => (
          <button key={m} onClick={() => setCg({ mode: m })}
            className={`text-[11.5px] px-2.5 py-1 ${mode === m ? 'text-poe-gold' : 'text-poe-text/55 hover:text-poe-gold/80'}`}
            style={{ background: mode === m ? 'rgb(var(--c-panel-light))' : 'transparent' }}>{label}</button>
        ))}
      </div>

      {mode === 'speedrun' ? (
        <SpeedrunView compact={compact} />
      ) : (
      <>
      <LiveBar desktop={desktop} autoTrack={autoTrack} watch={watch} live={live} actLabel={liveActLabel} />

      {/* Selectors */}
      <div className="flex flex-wrap items-center gap-2 mb-3">
        <Dropdown value={actId} onChange={setAct} options={actOptions} />
        {zoneOptions.length > 0 && <Dropdown value={zoneId} onChange={setZone} options={zoneOptions} maxW={260} />}
      </div>

      {/* Map (left) + objectives (right). In compact/overlay mode the big map panel is hidden — the
          map stays reachable by hovering the zone title or any zone keyword. */}
      <div className={compact ? '' : 'flex flex-wrap items-start gap-3'}>
        {!compact && (
          <div className="w-full max-w-[520px] border border-poe-line" style={{ borderRadius: 2, ...PANEL }}>
            <MapPanel images={images} zoneName={zone.name} onZoom={setZoom} />
          </div>
        )}

        {/* Objectives panel — transparent in overlay/compact mode so the window scrim shows through it. */}
        <div className={`${compact ? 'w-full' : 'flex-1 min-w-[300px] max-w-[680px]'} border border-poe-line`} style={{ borderRadius: 2, ...(compact ? {} : PANEL) }}>
          <div className="flex items-center justify-between px-3.5 py-2.5 gap-2">
            <div className="flex items-center gap-2 font-semibold text-poe-text-bright">
              <MapPin size={15} className="text-poe-gold/80" />
              <span className={images.length ? 'cursor-help underline decoration-dotted underline-offset-[5px] decoration-poe-gold/50' : ''}
                onMouseEnter={images.length ? (e) => onKwEnter(zone.name, e) : undefined}
                onMouseMove={images.length ? onKwMove : undefined}
                onMouseLeave={images.length ? onKwLeave : undefined}>{zone.name}</span>
              {zone.group && <span className="text-[11px] text-poe-text/45 font-normal">· {zone.group}</span>}
            </div>
            <div className="flex items-center gap-1.5 shrink-0">
              {isHere && <span className="text-[10px] uppercase tracking-[0.04em] text-emerald-400 border border-emerald-500/40 px-1 py-[1px]" style={{ borderRadius: 2 }}>here</span>}
              {isVisited && !isHere && <span className="text-[10px] uppercase tracking-[0.04em] text-poe-text/45 border border-poe-line px-1 py-[1px]" style={{ borderRadius: 2 }}>visited</span>}
            </div>
          </div>

          {zone.route && (
            <div className="border-t border-poe-line px-3.5 py-2 text-[12px] text-poe-text/75 leading-relaxed">
              <ZoneText text={zone.route} />
            </div>
          )}

          {objectives.length > 0 && (
            <div className="border-t border-poe-line px-3.5 py-2.5">
              <div className="space-y-1.5">
                {objectives.map((o, i) => {
                  const id = `${actId}/${zoneId}/obj/${i}`
                  const isDone = !!done[id]
                  return (
                    <label key={i} className="flex items-start gap-2 text-[13px] cursor-pointer">
                      <input type="checkbox" checked={isDone} onChange={() => setCg({ done: { ...done, [id]: !isDone } })}
                        style={{ accentColor: 'rgb(var(--c-accent))', width: 13, height: 13 }} className="mt-[3px] shrink-0" />
                      <span className="flex-1 min-w-0">
                        <span className="flex flex-wrap items-center gap-1.5">
                          <span className={isDone ? 'text-poe-text/40 line-through' : 'text-poe-text-bright'}>
                            <ZoneText text={o.text} />
                          </span>
                          {o.optional && (
                            <span className="text-[10px] uppercase tracking-[0.04em] text-poe-text/50 border border-poe-line px-1 py-[1px]" style={{ borderRadius: 2 }}>optional</span>
                          )}
                        </span>
                        {o.reward && (
                          <span className="block mt-1">
                            <span className="text-[11px] text-poe-gold/90 border border-poe-gold/40 px-1.5 py-[2px]" style={{ borderRadius: 2 }}>{o.reward}</span>
                          </span>
                        )}
                      </span>
                    </label>
                  )
                })}
              </div>
            </div>
          )}

          {zone.next && (
            <div className="border-t border-poe-line px-3.5 py-2.5 text-[12.5px] text-poe-text/80">
              <span className="text-poe-text/45">→ Go to </span><ZoneText text={zone.next} />
            </div>
          )}
        </div>
      </div>

      {/* Hover map popup */}
      {tip && <ZoneTip zone={zoneByName.get(norm(tip.name))} x={tip.x} y={tip.y} />}

      {/* Lightbox */}
      {zoom && (
        <div className="fixed inset-0 z-[60] bg-black/85 flex items-center justify-center p-6 cursor-zoom-out" onClick={() => setZoom(null)}>
          <img src={zoom} alt="" style={{ maxWidth: '95vw', maxHeight: '92vh', borderRadius: 2 }} />
        </div>
      )}
      </>
      )}
    </div>
  )
}

// Left map panel: the zone's layout image (click to zoom). Some zones have multiple seed variants —
// show a small thumbnail strip to switch. Zones with no map (the Interlude) get a left-aligned stub.
function MapPanel({ images, zoneName, onZoom }) {
  const [idx, setIdx] = useState(0)
  useEffect(() => { setIdx(0) }, [zoneName])
  if (!images.length) {
    return <div className="px-3.5 py-6 text-[12px] text-poe-text/45">No layout map for {zoneName} yet.</div>
  }
  const cur = mapSrc(images[Math.min(idx, images.length - 1)])
  return (
    <div>
      <img src={cur} alt={`${zoneName} layout`} className="block w-full cursor-zoom-in" style={{ borderRadius: 2 }}
        onClick={() => onZoom(cur)} loading="lazy" />
      {images.length > 1 && (
        <div className="flex flex-wrap gap-1.5 px-2 py-2 border-t border-poe-line">
          {images.map((im, i) => (
            <button key={i} onClick={() => setIdx(i)}
              className={`text-[11px] px-2 py-0.5 border ${i === idx ? 'border-poe-gold/60 text-poe-gold' : 'border-poe-line text-poe-text/60 hover:text-poe-gold/80'}`}
              style={{ borderRadius: 2 }}>Map {i + 1}</button>
          ))}
        </div>
      )}
    </div>
  )
}

// The floating map popup shown when hovering a zone keyword.
function ZoneTip({ zone, x, y }) {
  const file = zone ? asArray(zone.mapImage)[0] : null
  const vw = typeof window !== 'undefined' ? window.innerWidth : 1200
  const vh = typeof window !== 'undefined' ? window.innerHeight : 800
  // Fit the popup to the window — it must also work inside the narrow pop-out overlay — and keep it
  // fully on-screen: prefer right of the cursor, flip to the left if it'd overflow, then clamp.
  const W = Math.max(150, Math.min(340, vw - 16))
  let left = x + 16
  if (left + W > vw - 8) left = x - W - 16
  left = Math.max(8, Math.min(left, vw - W - 8))
  const estH = Math.min(vh - 16, W + 30) // maps are ~square, plus the name label
  let top = y + 16
  if (top + estH > vh - 8) top = y - estH - 8
  top = Math.max(8, Math.min(top, Math.max(8, vh - estH - 8)))
  return (
    <div className="fixed z-50 border border-poe-line p-1 pointer-events-none" style={{ left, top, background: '#000', borderRadius: 2, width: W }}>
      {file
        ? <img src={mapSrc(file)} alt="" style={{ display: 'block', width: W - 8, maxHeight: vh - 44, objectFit: 'contain', borderRadius: 2 }} />
        : <div className="text-[11px] text-poe-text/55 px-2 py-1">{zone ? `No map yet — ${zone.name}` : 'Unknown zone'}</div>}
      {zone && <div className="text-[10.5px] text-poe-text/60 px-1.5 pt-1 pb-0.5 truncate">{zone.name}</div>}
    </div>
  )
}

// The live status strip. On desktop with auto-track on it shows the detected zone + act (and the
// character level/class if the log exposes them); points to Settings when the log can't be found;
// in a browser it explains tracking is desktop-only.
function LiveBar({ desktop, autoTrack, watch, live, actLabel }) {
  if (!desktop) {
    return <div className="text-[11px] text-poe-text/45 mb-2">Auto-tracking your zone runs in the desktop app. Here you can browse by hand.</div>
  }
  if (!autoTrack) {
    return <div className="text-[11px] text-poe-text/45 mb-2">Auto-track is off — enable it in Settings ▸ Plugins ▸ Campaign Guide.</div>
  }
  if (watch && watch.ok === false) {
    return (
      <div className="text-[11px] text-amber-400/80 mb-2 border border-amber-500/30 px-2 py-1.5" style={{ borderRadius: 2 }}>
        Couldn't find your PoE2 <span className="text-amber-300">Client.txt</span> automatically — set its location in
        Settings ▸ Plugins ▸ Campaign Guide and tracking will start.
      </div>
    )
  }
  const lvl = live?.level ? `Lv ${live.level}${live.klass ? ` ${live.klass}` : ''}` : null
  return (
    <div className="inline-flex items-center gap-2 text-[11.5px] mb-2 border border-poe-line px-2 py-1" style={{ borderRadius: 2, background: 'rgb(var(--c-bg))' }}>
      <Radio size={12} className={live?.zone ? 'text-emerald-400' : 'text-poe-text/40'} />
      {live?.zone ? (
        <span className="text-poe-text-bright">{live.zone}{actLabel ? <span className="text-poe-text/50"> · {actLabel}</span> : null}</span>
      ) : (
        <span className="text-poe-text/50">Watching for your zone… load an area in-game</span>
      )}
      {lvl && <span className="text-poe-gold/90 border-l border-poe-line pl-2">{lvl}</span>}
    </div>
  )
}

export { CampaignGuideSettings }

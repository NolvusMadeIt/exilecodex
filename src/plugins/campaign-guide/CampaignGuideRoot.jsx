import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { ChevronDown, Check, MapPin, Radio } from 'lucide-react'
import { usePrefs } from '../../store/Prefs.jsx'
import campaign from './data/campaign.json'
import { CampaignGuideSettings } from './CampaignGuideSettings.jsx'

// Campaign Guide — pick an Act, then a hub / mini-act within it, and read the ordered run route plus
// every objective (bosses, quest turn-ins, optional pickups) with gold reward tags and a per-step
// "done" checkbox. Data is from ./data/campaign.json (acts 1–4 + the Interlude). Sharp corners,
// left-aligned, content-width controls (house rules) — built to mirror the Price Check panel.
//
// Auto-tracking (desktop): when enabled it tails PoE2's Client.txt (window.nolvusGameLog) and, every
// time you load a new zone, jumps the Act/hub to match and ticks off the route steps you've cleared —
// the same trick the standalone overlays use. Browsers can't read your disk, so there it's manual.

const PANEL = { background: 'rgb(var(--c-panel) / 0.92)' }
const ACTS = campaign.acts || []

// Normalise a zone name for matching (case/space-insensitive; keeps colons, which real zone names use).
const norm = (z) => String(z || '').toLowerCase().replace(/\s+/g, ' ').trim()

// The ordered list of zones you pass through in a hub: the first step's source, then every step's
// destination. Position N in this list = "you are standing in that zone".
function hubZoneList(hub) {
  const out = []
  for (const [i, step] of (hub?.route || []).entries()) {
    const [src, dst] = String(step).split('→').map((s) => s.trim())
    if (i === 0 && src) out.push(src)
    if (dst) out.push(dst)
  }
  return out
}

// Compact, content-width dropdown (sharp corners, left-aligned) — the same control Price Check uses.
// Sizes to its widest option and flips above the trigger if it'd run off the bottom of the screen.
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
  return (
    <div ref={ref} className="relative inline-block">
      <button onClick={toggle} className="inline-flex items-center gap-1.5 text-[12px] text-poe-text-bright border border-poe-line hover:border-poe-gold/40 px-2 py-1" style={{ borderRadius: 2, background: 'rgb(var(--c-bg))' }}>
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
              <span className="flex-1 whitespace-nowrap">{o.label}</span>
              {o.value === value && <Check size={12} className="shrink-0" />}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export function CampaignGuideRoot() {
  const { prefs, update } = usePrefs()

  // Plugin state lives in prefs.pluginSettings['campaign-guide'] (DB-synced): the chosen act/hub are
  // remembered across sessions, and `done` is a flat map of stepId→true for the progress checkboxes.
  const cg = prefs.pluginSettings?.['campaign-guide'] || {}
  const setCg = (patch) => update((p) => ({
    ...p,
    pluginSettings: { ...(p.pluginSettings || {}), 'campaign-guide': { ...(p.pluginSettings?.['campaign-guide'] || {}), ...patch } },
  }))
  const done = cg.done || {}
  const toggleStep = (id) => setCg({ done: { ...done, [id]: !done[id] } })

  // Selected act (fall back to the first) and the selected hub within it (likewise).
  const actId = ACTS.find((a) => a.id === cg.actId)?.id || ACTS[0]?.id
  const act = ACTS.find((a) => a.id === actId) || ACTS[0]
  const hubs = act?.hubs || []
  const hubId = hubs.find((h) => h.id === cg.hubId)?.id || hubs[0]?.id
  const hub = hubs.find((h) => h.id === hubId) || hubs[0]

  const actOptions = useMemo(() => ACTS.map((a) => ({ value: a.id, label: a.label })), [])
  const hubOptions = useMemo(() => hubs.map((h) => ({ value: h.id, label: h.label })), [hubs])

  const setAct = (id) => {
    const next = ACTS.find((a) => a.id === id)
    // Switching act resets the hub to that act's first (its hubs differ).
    setCg({ actId: id, hubId: next?.hubs?.[0]?.id })
  }
  const setHub = (id) => setCg({ hubId: id })

  // Stable per-step ids for the progress map: scoped by act+hub so steps never collide across hubs.
  const stepId = (kind, i) => `${act?.id}/${hub?.id}/${kind}/${i}`

  const route = hub?.route || []
  const objectives = hub?.objectives || []
  const doneCount = objectives.reduce((n, _o, i) => n + (done[stepId('obj', i)] ? 1 : 0), 0)

  // --- Live auto-tracking from the game log (desktop only) -------------------------------------
  const gameLog = typeof window !== 'undefined' ? window.nolvusGameLog : null
  const desktop = !!gameLog?.isDesktop
  const autoTrack = desktop && cg.autoTrack !== false // default ON on desktop
  const [live, setLive] = useState(null)   // latest {type, zone, level, klass, name, at}
  const [watch, setWatch] = useState(null) // start() result: {ok, path, source, error}

  // Index every zone → which act/hub it belongs to and your position in that hub's route. A zone can
  // appear in more than one hub (the Interlude reuses areas), so we keep a list and prefer the hub
  // you're already viewing before jumping elsewhere.
  const zoneIndex = useMemo(() => {
    const byZone = new Map()
    for (const a of ACTS) {
      for (const h of a.hubs || []) {
        hubZoneList(h).forEach((z, pos) => {
          const k = norm(z)
          if (!byZone.has(k)) byZone.set(k, [])
          byZone.get(k).push({ actId: a.id, hubId: h.id, pos })
        })
      }
    }
    return byZone
  }, [])

  // A zone was loaded in-game → select its act/hub and mark the route steps you've cleared as done.
  // Reads/writes through the functional updater so it never works off stale state.
  const applyZone = useCallback((zone) => {
    const matches = zoneIndex.get(norm(zone))
    if (!matches || !matches.length) return // a town / hideout / map that isn't on a campaign route
    update((p) => {
      const cur = p.pluginSettings?.['campaign-guide'] || {}
      const loc = matches.find((m) => m.hubId === cur.hubId) || matches[0]
      const nextDone = { ...(cur.done || {}) }
      // Reaching zone-list position `pos` means every route step before it is complete.
      for (let i = 0; i < loc.pos; i++) nextDone[`${loc.actId}/${loc.hubId}/route/${i}`] = true
      return {
        ...p,
        pluginSettings: {
          ...(p.pluginSettings || {}),
          'campaign-guide': { ...cur, actId: loc.actId, hubId: loc.hubId, done: nextDone },
        },
      }
    })
  }, [zoneIndex, update])

  useEffect(() => {
    if (!autoTrack || !gameLog) { setWatch(null); try { gameLog?.stop() } catch {} return }
    let cancelled = false
    let unsub = null
    ;(async () => {
      const res = await gameLog.start({ path: cg.logPath || undefined })
      if (cancelled) return
      setWatch(res)
      if (res?.lastZone) { setLive({ type: 'zone', zone: res.lastZone }); applyZone(res.lastZone) }
      unsub = gameLog.onEvent((ev) => {
        setLive((prev) => ({ ...(prev || {}), ...ev }))
        if (ev.type === 'zone') applyZone(ev.zone)
      })
    })()
    return () => { cancelled = true; if (unsub) unsub() }
  }, [autoTrack, gameLog, cg.logPath, applyZone])

  const liveZone = live?.zone
  const liveZoneNorm = norm(liveZone)
  const liveActLabel = useMemo(() => {
    if (!liveZone) return null
    const m = zoneIndex.get(liveZoneNorm)?.[0]
    return m ? ACTS.find((a) => a.id === m.actId)?.label : null
  }, [liveZone, liveZoneNorm, zoneIndex])

  if (!hub) {
    return <div className="py-1 text-[12.5px] text-poe-text/50">No campaign data available.</div>
  }

  return (
    <div className="py-1">
      {/* Live tracker bar */}
      <LiveBar desktop={desktop} autoTrack={autoTrack} watch={watch} live={live} actLabel={liveActLabel} />

      {/* Selectors */}
      <div className="flex flex-wrap items-center gap-2 mb-3">
        <Dropdown value={actId} onChange={setAct} options={actOptions} />
        {hubOptions.length > 0 && <Dropdown value={hubId} onChange={setHub} options={hubOptions} />}
      </div>

      {/* Route + objectives panel */}
      <div className="border border-poe-line w-full max-w-[640px]" style={{ ...PANEL, borderRadius: 2 }}>
        {/* Hub title */}
        <div className="flex items-center justify-between px-3.5 py-2.5">
          <div className="flex items-center gap-2 font-semibold text-poe-text-bright">
            <MapPin size={15} className="text-poe-gold/80" /> {hub.label}
          </div>
          {objectives.length > 0 && (
            <span className="text-[11px] text-poe-text/50 tabular-nums">{doneCount}/{objectives.length} done</span>
          )}
        </div>

        {/* Route — numbered list of zone transitions */}
        {route.length > 0 && (
          <div className="border-t border-poe-line px-3.5 py-2.5">
            <div className="text-[11px] uppercase tracking-[0.06em] text-poe-text/50 mb-1.5">Route</div>
            <ol className="space-y-[3px]">
              {route.map((step, i) => {
                const id = stepId('route', i)
                const isDone = !!done[id]
                // "You are here": the step whose source zone is the one you're currently standing in.
                const src = norm(String(step).split('→')[0])
                const here = !!liveZoneNorm && src === liveZoneNorm
                return (
                  <li key={i} className={`flex items-center gap-2 text-[13px] ${here ? 'bg-poe-gold/10 -mx-1 px-1' : ''}`}>
                    <input type="checkbox" checked={isDone} onChange={() => toggleStep(id)}
                      style={{ accentColor: 'rgb(var(--c-accent))', width: 13, height: 13 }} className="shrink-0" />
                    <span className="text-[11px] text-poe-text/40 tabular-nums w-5 text-right shrink-0">{i + 1}.</span>
                    <span className={`flex-1 ${isDone ? 'text-poe-text/40 line-through' : here ? 'text-poe-gold' : 'text-poe-text-bright'}`}>{step}</span>
                    {here && <span className="text-[10px] uppercase tracking-[0.04em] text-poe-gold/90 shrink-0">here</span>}
                  </li>
                )
              })}
            </ol>
          </div>
        )}

        {/* Objectives — bosses, quest turn-ins, optional pickups; gold reward tags + optional marker */}
        {objectives.length > 0 && (
          <div className="border-t border-poe-line px-3.5 py-2.5">
            <div className="text-[11px] uppercase tracking-[0.06em] text-poe-text/50 mb-1.5">Objectives</div>
            <div className="space-y-1.5">
              {objectives.map((o, i) => {
                const id = stepId('obj', i)
                const isDone = !!done[id]
                return (
                  <label key={i} className="flex items-start gap-2 text-[13px] cursor-pointer">
                    <input type="checkbox" checked={isDone} onChange={() => toggleStep(id)}
                      style={{ accentColor: 'rgb(var(--c-accent))', width: 13, height: 13 }} className="mt-[3px] shrink-0" />
                    <span className="flex-1 min-w-0">
                      <span className="flex flex-wrap items-center gap-1.5">
                        <span className={isDone ? 'text-poe-text/40 line-through' : 'text-poe-text-bright'}>{o.text}</span>
                        {o.optional && (
                          <span className="text-[10px] uppercase tracking-[0.04em] text-poe-text/50 border border-poe-line px-1 py-[1px]" style={{ borderRadius: 2 }}>
                            optional
                          </span>
                        )}
                      </span>
                      {o.reward && (
                        <span className="block mt-1">
                          <span className="text-[11px] text-poe-gold/90 border border-poe-gold/40 px-1.5 py-[2px]" style={{ borderRadius: 2 }}>
                            {o.reward}
                          </span>
                        </span>
                      )}
                    </span>
                  </label>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// The live status strip above the selectors. Honest about what it knows: on desktop with auto-track
// on it shows the detected zone + act (and character level/class if the log exposes them); if the log
// file can't be found it points the user to Settings; in a browser it explains auto-track is desktop.
function LiveBar({ desktop, autoTrack, watch, live, actLabel }) {
  if (!desktop) {
    return (
      <div className="text-[11px] text-poe-text/45 mb-2">
        Auto-tracking your zone runs in the desktop app. Here you can tick steps off by hand.
      </div>
    )
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
        <span className="text-poe-text-bright">
          {live.zone}{actLabel ? <span className="text-poe-text/50"> · {actLabel}</span> : null}
        </span>
      ) : (
        <span className="text-poe-text/50">Watching for your zone… load an area in-game</span>
      )}
      {lvl && <span className="text-poe-gold/90 border-l border-poe-line pl-2">{lvl}</span>}
    </div>
  )
}

// Re-export so the settings surface can be imported from the root too, mirroring Price Check.
export { CampaignGuideSettings }

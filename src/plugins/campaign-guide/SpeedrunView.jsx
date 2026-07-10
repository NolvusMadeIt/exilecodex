import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Play, Square, RotateCcw, Trophy, Radio } from 'lucide-react'
import { usePrefs } from '../../store/Prefs.jsx'
import speedrun from './data/speedrun.json'
import { useRunTimer, fmtMs } from './useRunTimer.js'

// Speedrun Mode — the LEAN do-this-only route (non-optional steps; only permanent-upgrade reward
// chips), plus a game-log-driven run timer, a pre-run Prep checklist, and device-local run history.
// Reuses the `compact` prop for the pop-out overlay (timer + current steps only).

const norm = (z) => String(z || '').toLowerCase().replace(/\s+/g, ' ').trim()
const ACTS = speedrun.acts || []
const PREP = speedrun.prep || []

// zone name → actId (first act that references it), for live auto-follow.
const ZONE_TO_ACT = (() => {
  const m = new Map()
  for (const a of ACTS) for (const s of a.steps || []) if (s.zone && !m.has(norm(s.zone))) m.set(norm(s.zone), a.id)
  return m
})()

const CATEGORIES = [['act1', 'Act 1'], ['act3', 'Act 3'], ['full', 'Full']]

export function SpeedrunView({ compact = false }) {
  const { prefs, update } = usePrefs()
  const cg = prefs.pluginSettings?.['campaign-guide'] || {}
  const setCg = (patch) => update((p) => ({
    ...p, pluginSettings: { ...(p.pluginSettings || {}), 'campaign-guide': { ...(p.pluginSettings?.['campaign-guide'] || {}), ...patch } },
  }))
  const t = useRunTimer()
  const desktop = typeof window !== 'undefined' && !!window.nolvusGameLog?.isDesktop

  const showOptional = !!cg.srShowOptional
  const srDone = cg.srDone || {}
  const prepDone = cg.prepDone || {}
  const category = cg.srCategory || 'full'

  const liveActId = t.zone ? ZONE_TO_ACT.get(norm(t.zone.name)) : null
  const liveActLabel = ACTS.find((a) => a.id === liveActId)?.label || null
  // The displayed act follows your live zone; clicking an act tab is a temporary peek that the next
  // zone change reasserts back to where you actually are.
  const [manualAct, setManualAct] = useState(null)
  useEffect(() => { if (liveActId) setManualAct(null) }, [liveActId])
  const actId = manualAct || liveActId || ACTS[0]?.id
  const act = ACTS.find((a) => a.id === actId) || ACTS[0]
  const liveZoneNorm = norm(t.zone?.name)

  // Auto-start the run the moment you load into a live zone (default on). A new zone after Reset
  // re-arms it; town/hideout never auto-start. Stop/Reset stay manual.
  const autoStart = cg.srAutoStart !== false
  const prevZoneRef = useRef(null)
  useEffect(() => {
    const z = t.zone?.name || null
    if (z && z !== prevZoneRef.current) {
      prevZoneRef.current = z
      if (autoStart && t.phase === 'idle' && t.kind === 'live') t.start({ category })
    }
  }, [t.zone?.name, t.kind, t.phase, autoStart, category]) // eslint-disable-line react-hooks/exhaustive-deps

  // Record an act split as the live zone crosses into a new act.
  useEffect(() => {
    if (t.phase === 'running' && liveActId) {
      const a = ACTS.find((x) => x.id === liveActId)
      if (a) t.addSplit(a.id, a.label)
    }
  }, [liveActId, t.phase]) // eslint-disable-line react-hooks/exhaustive-deps

  const steps = (act?.steps || []).filter((s) => showOptional || !s.optional)

  const [tab, setTab] = useState('route')
  const [runs, setRuns] = useState([])
  const refreshRuns = () => { window.nolvusGameLog?.listRuns?.().then((r) => setRuns(r || [])).catch(() => {}) }
  useEffect(() => { refreshRuns() }, [])
  useEffect(() => { if (t.lastRun) refreshRuns() }, [t.lastRun])

  const running = t.phase === 'running'
  const controls = (
    <div className="flex items-center gap-2 flex-wrap">
      {!running ? (
        <button onClick={() => t.start({ category })}
          className="inline-flex items-center gap-1.5 text-[12px] font-medium text-emerald-300 border border-emerald-500/50 hover:bg-emerald-500/10 px-2.5 py-1" style={{ borderRadius: 2 }}>
          <Play size={12} /> {t.phase === 'done' ? 'New run' : 'Start'}
        </button>
      ) : (
        <button onClick={() => t.stop({ category })}
          className="inline-flex items-center gap-1.5 text-[12px] font-medium text-red-300 border border-red-500/50 hover:bg-red-500/10 px-2.5 py-1" style={{ borderRadius: 2 }}>
          <Square size={11} /> Stop
        </button>
      )}
      {running && (
        <button onClick={t.togglePause} className="text-[12px] text-poe-text/70 hover:text-poe-gold border border-poe-line px-2.5 py-1" style={{ borderRadius: 2 }}>
          {t.manualPause ? 'Resume' : 'Pause'}
        </button>
      )}
      {(running || t.phase === 'done') && (
        <button onClick={t.reset} title="Reset" className="inline-flex items-center gap-1.5 text-[12px] text-poe-text/55 hover:text-poe-gold border border-poe-line px-2 py-1" style={{ borderRadius: 2 }}>
          <RotateCcw size={11} />
        </button>
      )}
    </div>
  )

  const timerBlock = (
    <div className="flex items-center justify-between gap-3 flex-wrap">
      <div className="flex items-baseline gap-2">
        <span className={`tabular-nums font-semibold ${running && !t.pausedReason ? 'text-poe-gold' : 'text-poe-text/60'} ${compact ? 'text-[24px]' : 'text-[30px]'}`} style={{ letterSpacing: '0.02em' }}>
          {fmtMs(t.elapsed)}
        </span>
        {t.pausedReason && <span className="text-[10px] uppercase tracking-[0.06em] text-amber-400 border border-amber-500/40 px-1.5 py-[1px]" style={{ borderRadius: 2 }}>paused · {t.pausedReason}</span>}
        {running && !t.pausedReason && <span className="text-[10px] uppercase tracking-[0.06em] text-emerald-400">running</span>}
      </div>
      {controls}
    </div>
  )

  // Live zone + act indicator (what the run timer is tracking right now).
  const liveLine = (
    <div className="inline-flex items-center gap-2 text-[11.5px]">
      <Radio size={11} className={t.kind === 'live' ? 'text-emerald-400' : 'text-poe-text/40'} />
      {t.zone?.name ? (
        <span className="text-poe-text-bright">{t.zone.name}
          {liveActLabel ? <span className="text-poe-text/50"> · {liveActLabel}</span> : null}
          {t.kind !== 'live' ? <span className="text-amber-400/70"> · {t.kind}</span> : null}
        </span>
      ) : (
        <span className="text-poe-text/45">Waiting for your zone… load an area in-game</span>
      )}
    </div>
  )

  if (!desktop && !compact) {
    // Web: the timer needs the desktop log; route + prep still useful.
    return (
      <div className="py-1">
        <div className="text-[11px] text-poe-text/45 mb-2">The run timer + live auto-tracking run in the desktop app. The route below works anywhere.</div>
        <ActTabs actId={actId} onPick={setManualAct} />
        <RouteList steps={steps} liveZoneNorm={liveZoneNorm} srDone={srDone} setCg={setCg} showOptional={showOptional} />
        <div className="mt-3"><PrepList prepDone={prepDone} setCg={setCg} /></div>
      </div>
    )
  }

  // Compact (overlay): timer + current act's lean steps only.
  if (compact) {
    return (
      <div className="py-1">
        {timerBlock}
        <div className="mt-1 mb-2">{liveLine}</div>
        <RouteList steps={steps} liveZoneNorm={liveZoneNorm} srDone={srDone} setCg={setCg} showOptional={showOptional} dense />
      </div>
    )
  }

  // Full page.
  return (
    <div className="py-1">
      <div className="border border-poe-line w-full max-w-[720px] px-3.5 py-3 mb-3" style={{ borderRadius: 2, background: 'rgb(var(--c-panel) / 0.92)' }}>
        {timerBlock}
        <div className="mt-2">{liveLine}</div>
        <div className="flex items-center gap-3 mt-2 text-[11px] text-poe-text/55 flex-wrap">
          {!running && t.phase !== 'done' && (
            <span className="inline-flex items-center gap-1">Category:
              {CATEGORIES.map(([id, label]) => (
                <button key={id} onClick={() => setCg({ srCategory: id })} className={`px-1.5 py-[1px] border ${category === id ? 'text-poe-gold border-poe-gold/50' : 'text-poe-text/55 border-poe-line hover:text-poe-gold/80'}`} style={{ borderRadius: 2 }}>{label}</button>
              ))}
            </span>
          )}
          {t.deaths > 0 && <span>{t.deaths} death{t.deaths > 1 ? 's' : ''}</span>}
          {t.endLevel != null && <span>Lv {t.endLevel}</span>}
          {t.zone?.name && <span className="text-poe-text/40">in {t.zone.name}</span>}
        </div>
        {t.lastRun && <div className="text-[11.5px] text-poe-text/70 mt-2">Run saved — active {fmtMs(t.lastRun.activeMs)} · real {fmtMs(t.lastRun.realMs)}.</div>}
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 mb-2">
        {[['route', 'Route'], ['prep', 'Prep'], ['runs', 'Runs']].map(([id, label]) => (
          <button key={id} onClick={() => { setTab(id); if (id === 'runs') refreshRuns() }}
            className={`text-[12px] px-2.5 py-1 border ${tab === id ? 'text-poe-gold border-poe-gold/50' : 'text-poe-text/55 border-poe-line hover:text-poe-gold/80'}`} style={{ borderRadius: 2 }}>
            {label}
          </button>
        ))}
        {tab === 'route' && (
          <label className="ml-2 inline-flex items-center gap-1.5 text-[11px] text-poe-text/55 cursor-pointer">
            <input type="checkbox" checked={showOptional} onChange={(e) => setCg({ srShowOptional: e.target.checked })} style={{ accentColor: 'rgb(var(--c-accent))', width: 12, height: 12 }} />
            show optional
          </label>
        )}
      </div>

      {tab === 'route' && (
        <>
          <ActTabs actId={actId} onPick={setManualAct} />
          <RouteList steps={steps} liveZoneNorm={liveZoneNorm} srDone={srDone} setCg={setCg} showOptional={showOptional} />
        </>
      )}
      {tab === 'prep' && <PrepList prepDone={prepDone} setCg={setCg} />}
      {tab === 'runs' && <RunsList runs={runs} onClear={() => { window.nolvusGameLog?.clearRuns?.().then(refreshRuns) }} />}
    </div>
  )
}

function ActTabs({ actId, onPick }) {
  return (
    <div className="flex flex-wrap gap-1 mb-2">
      {ACTS.map((a) => (
        <button key={a.id} onClick={() => onPick(a.id)}
          className={`text-[11.5px] px-2 py-[3px] border ${a.id === actId ? 'text-poe-gold border-poe-gold/50' : 'text-poe-text/55 border-poe-line hover:text-poe-gold/80'}`} style={{ borderRadius: 2 }}>
          {a.label}
        </button>
      ))}
    </div>
  )
}

function RouteList({ steps, liveZoneNorm, srDone, setCg, showOptional, dense }) {
  if (!steps.length) return <div className="text-[12px] text-poe-text/45 py-2">No steps.</div>
  return (
    <ol className={`border border-poe-line ${dense ? '' : 'max-w-[720px]'}`} style={{ borderRadius: 2, background: dense ? 'transparent' : 'rgb(var(--c-panel) / 0.92)' }}>
      {steps.map((s, i) => {
        const here = !!liveZoneNorm && norm(s.zone) === liveZoneNorm
        const done = !!srDone[s.id]
        const showChip = s.reward && (s.chip === 'upgrade' || (showOptional && s.chip === 'loot'))
        return (
          <li key={s.id} className={`flex items-start gap-2 px-3 py-1.5 text-[13px] ${i > 0 ? 'border-t border-poe-line/60' : ''} ${here ? 'bg-white/[0.06]' : ''}`}>
            <input type="checkbox" checked={done} onChange={() => setCg({ srDone: { ...srDone, [s.id]: !done } })}
              style={{ accentColor: 'rgb(var(--c-accent))', width: 13, height: 13 }} className="mt-[3px] shrink-0" />
            <span className="flex-1 min-w-0">
              <span className="flex flex-wrap items-center gap-x-1.5 gap-y-1">
                {s.zone && <span className="text-[10.5px] text-poe-text/45 border border-poe-line px-1 py-[1px]" style={{ borderRadius: 2 }}>{s.zone}</span>}
                <span className={done ? 'text-poe-text/40 line-through' : s.optional ? 'italic text-poe-text/55' : here ? 'text-poe-gold' : 'text-poe-text-bright'}>{s.label}</span>
                {showChip && (
                  <span className={`text-[10.5px] px-1.5 py-[1px] border ${s.chip === 'upgrade' ? 'text-poe-gold/90 border-poe-gold/40' : 'text-poe-text/50 border-poe-line'}`} style={{ borderRadius: 2 }}>{s.reward}</span>
                )}
              </span>
              {s.note && <span className="block text-[11px] text-poe-text/45 mt-0.5">{s.note}</span>}
            </span>
          </li>
        )
      })}
    </ol>
  )
}

function PrepList({ prepDone, setCg }) {
  return (
    <div className="max-w-[720px] space-y-3">
      <p className="text-[11px] text-poe-text/50">Do these before you start a run — gear, gems, filter and keybinds. The live route stays clean of setup.</p>
      {PREP.map((g) => (
        <div key={g.group} className="border border-poe-line" style={{ borderRadius: 2, background: 'rgb(var(--c-panel) / 0.92)' }}>
          <div className="px-3 py-1.5 text-[11px] uppercase tracking-[0.06em] text-poe-gold/80 border-b border-poe-line">{g.group}</div>
          <div className="px-3 py-1.5 space-y-1">
            {g.items.map((item, i) => {
              const id = `${g.group}/${i}`
              const done = !!prepDone[id]
              return (
                <label key={id} className="flex items-start gap-2 text-[12.5px] cursor-pointer">
                  <input type="checkbox" checked={done} onChange={() => setCg({ prepDone: { ...prepDone, [id]: !done } })}
                    style={{ accentColor: 'rgb(var(--c-accent))', width: 13, height: 13 }} className="mt-[2px] shrink-0" />
                  <span className={done ? 'text-poe-text/40 line-through' : 'text-poe-text/85'}>{item}</span>
                </label>
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}

function RunsList({ runs, onClear }) {
  // PB = lowest active time per category.
  const pbByCat = useMemo(() => {
    const m = {}
    for (const r of runs) { const c = r.category || 'full'; if (m[c] == null || r.activeMs < m[c]) m[c] = r.activeMs }
    return m
  }, [runs])
  if (!runs.length) return <div className="text-[12px] text-poe-text/45 py-2 max-w-[720px]">No runs yet — press Start, play, then Stop to save one.</div>
  return (
    <div className="max-w-[720px]">
      <ol className="border border-poe-line" style={{ borderRadius: 2, background: 'rgb(var(--c-panel) / 0.92)' }}>
        {runs.map((r, i) => {
          const isPb = (r.category || 'full') in pbByCat && r.activeMs === pbByCat[r.category || 'full']
          const date = r.startedAt ? new Date(r.startedAt).toLocaleString() : ''
          return (
            <li key={r.id || i} className={`flex items-center gap-3 px-3 py-1.5 text-[12.5px] ${i > 0 ? 'border-t border-poe-line/60' : ''}`}>
              <span className="tabular-nums font-semibold text-poe-text-bright">{fmtMs(r.activeMs)}</span>
              {isPb && <span className="inline-flex items-center gap-1 text-[10px] uppercase tracking-[0.05em] text-poe-gold border border-poe-gold/40 px-1 py-[1px]" style={{ borderRadius: 2 }}><Trophy size={10} /> PB</span>}
              <span className="text-[11px] text-poe-text/45">{(r.category || 'full')}</span>
              <span className="text-[11px] text-poe-text/45">real {fmtMs(r.realMs)}</span>
              {r.endLevel != null && <span className="text-[11px] text-poe-text/45">Lv {r.endLevel}</span>}
              {r.deaths > 0 && <span className="text-[11px] text-poe-text/45">{r.deaths}☠</span>}
              <span className="text-[11px] text-poe-text/35 ml-auto">{date}</span>
            </li>
          )
        })}
      </ol>
      <button onClick={onClear} className="text-[11px] text-poe-text/45 hover:text-red-400 mt-2">Clear run history</button>
    </div>
  )
}

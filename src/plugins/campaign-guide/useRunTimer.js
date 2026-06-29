import { useCallback, useEffect, useRef, useState } from 'react'
import campaign from './data/campaign.json'

// Speedrun run timer driven by the game log. There is no movement or window-focus signal in PoE2's
// Client.txt (verified against every PoE log parser), so "active run time" is approximated the way
// the mature tools do: the clock runs only while you're in a LIVE zone (not town / hideout / menu)
// AND not idle/AFK. Idle comes from the OS (powerMonitor, broadcast as a {type:'idle'} event from
// main.cjs); AFK from the log. Time is accumulated by timestamp math so it never drifts.

const norm = (z) => String(z || '').toLowerCase().replace(/\s+/g, ' ').trim()
const TOWN_NAMES = new Set((campaign.acts || []).map((a) => a.town).filter(Boolean).map(norm))

export function classifyZone(name, areaId) {
  if (areaId && /^hideout/i.test(areaId)) return 'hideout'
  if (/hideout/i.test(name || '')) return 'hideout'
  const n = norm(name)
  if (!n || n === '(null)' || n === '(unknown)') return 'menu'
  if (TOWN_NAMES.has(n)) return 'town'
  return 'live'
}

export function fmtMs(ms) {
  const t = Math.max(0, Math.floor((ms || 0) / 1000))
  const h = Math.floor(t / 3600)
  const m = Math.floor((t % 3600) / 60)
  const s = t % 60
  const pad = (x) => String(x).padStart(2, '0')
  return h > 0 ? `${h}:${pad(m)}:${pad(s)}` : `${m}:${pad(s)}`
}

const IDLE_PAUSE_SEC = 12 // pause once there's been no input this long (you've stopped running)

export function useRunTimer() {
  const gameLog = typeof window !== 'undefined' ? window.nolvusGameLog : null
  const [phase, setPhase] = useState('idle') // 'idle' | 'running' | 'done'
  const [zone, setZone] = useState(null)     // { name, areaId, kind }
  const [afk, setAfk] = useState(false)
  const [idleSec, setIdleSec] = useState(0)
  const [deaths, setDeaths] = useState(0)
  const [endLevel, setEndLevel] = useState(null)
  const [splits, setSplits] = useState([])   // [{ actId, label, atMs }]
  const [elapsed, setElapsed] = useState(0)  // displayed ms
  const [lastRun, setLastRun] = useState(null)

  const accumRef = useRef(0)
  const resumeRef = useRef(null)
  const startedAtRef = useRef(null)

  const [manualPause, setManualPause] = useState(false)
  const kind = zone?.kind || 'menu'
  const gateZone = kind === 'live'
  const gateActive = !afk && idleSec < IDLE_PAUSE_SEC
  const effRunning = phase === 'running' && gateZone && gateActive && !manualPause

  const elapsedNow = useCallback(() => accumRef.current + (resumeRef.current ? Date.now() - resumeRef.current : 0), [])

  // Accumulate elapsed time on every running⇄paused transition (timestamp math = no drift).
  useEffect(() => {
    if (effRunning) {
      resumeRef.current = Date.now()
    } else if (resumeRef.current) {
      accumRef.current += Date.now() - resumeRef.current
      resumeRef.current = null
      setElapsed(accumRef.current)
    }
  }, [effRunning])

  // Cosmetic re-render tick while running.
  useEffect(() => {
    if (!effRunning) return
    const t = setInterval(() => setElapsed(elapsedNow()), 250)
    return () => clearInterval(t)
  }, [effRunning, elapsedNow])

  // Subscribe to the game-log event stream (zone / afk / idle / death / level).
  useEffect(() => {
    if (!gameLog?.onEvent) return
    gameLog.status?.().then((s) => {
      if (s?.lastZone) setZone({ name: s.lastZone, areaId: null, kind: classifyZone(s.lastZone, null) })
    }).catch(() => {})
    const unsub = gameLog.onEvent((ev) => {
      if (ev.type === 'zone') setZone({ name: ev.zone, areaId: ev.areaId, seed: ev.seed, kind: classifyZone(ev.zone, ev.areaId) })
      else if (ev.type === 'afk') setAfk(!!ev.on)
      else if (ev.type === 'idle') setIdleSec(ev.idleSec || 0)
      else if (ev.type === 'death') setDeaths((d) => d + 1)
      else if (ev.type === 'level') setEndLevel(ev.level)
    })
    return () => { if (unsub) unsub() }
  }, [gameLog])

  const start = useCallback((meta = {}) => {
    accumRef.current = 0; resumeRef.current = null; startedAtRef.current = Date.now()
    startedAtRef.category = meta.category || null
    setSplits([]); setDeaths(0); setEndLevel(null); setElapsed(0); setLastRun(null); setManualPause(false)
    setPhase('running')
  }, [])

  const addSplit = useCallback((actId, label) => {
    setSplits((prev) => (prev.some((s) => s.actId === actId) ? prev : [...prev, { actId, label, atMs: elapsedNow() }]))
  }, [elapsedNow])

  const stop = useCallback(async (meta = {}) => {
    if (resumeRef.current) { accumRef.current += Date.now() - resumeRef.current; resumeRef.current = null }
    const startedAt = startedAtRef.current
    const run = {
      id: String(startedAt || Date.now()),
      startedAt, endedAt: Date.now(),
      activeMs: accumRef.current,
      realMs: startedAt ? Date.now() - startedAt : accumRef.current,
      splits, deaths, endLevel,
      finalZone: zone ? { name: zone.name, areaId: zone.areaId, seed: zone.seed } : null,
      category: meta.category || startedAtRef.category || null,
      completed: !!meta.completed,
    }
    setPhase('done'); setElapsed(accumRef.current); setLastRun(run)
    try { await gameLog?.saveRun?.(run) } catch { /* device-local; ignore */ }
    return run
  }, [splits, deaths, endLevel, zone, gameLog])

  const reset = useCallback(() => {
    accumRef.current = 0; resumeRef.current = null; startedAtRef.current = null
    setPhase('idle'); setElapsed(0); setSplits([]); setDeaths(0); setEndLevel(null); setLastRun(null); setManualPause(false)
  }, [])

  const togglePause = useCallback(() => setManualPause((p) => !p), [])

  // Global timer hotkeys (start / pause / stop / reset) fire here even while the game is focused.
  useEffect(() => {
    const timer = typeof window !== 'undefined' ? window.nolvusTimer : null
    if (!timer?.onAction) return
    const unsub = timer.onAction((action) => {
      if (action === 'start') start()
      else if (action === 'pause') togglePause()
      else if (action === 'stop') stop()
      else if (action === 'reset') reset()
    })
    return () => { if (unsub) unsub() }
  }, [start, stop, reset, togglePause])

  // Why the clock is paused (for the UI), or null when running / idle-phase.
  const pausedReason = phase !== 'running' ? null
    : manualPause ? 'Paused'
    : !gateZone ? (kind === 'town' ? 'In town' : kind === 'hideout' ? 'In hideout' : 'Not in a zone')
    : afk ? 'AFK' : idleSec >= IDLE_PAUSE_SEC ? 'Idle' : null

  return { phase, zone, kind, afk, idleSec, deaths, endLevel, splits, elapsed, lastRun, effRunning, pausedReason, manualPause, start, stop, reset, addSplit, togglePause }
}

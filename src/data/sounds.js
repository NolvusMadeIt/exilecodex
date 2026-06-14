// Drop-sound options + preview.
//
// PoE2's 16 built-in alert sounds are referenced in filters as `PlayAlertSound <id> <vol>`.
// We preview the REAL game audio: the actual sound files (extracted by poe2filter) are stored
// locally at /public/sounds/sound1.mp3 .. sound16.mp3. If a file ever fails to load we fall
// back to a synthesised tone so the button still does something. Custom sounds
// (`CustomAlertSound "file" <vol>`) preview the user's own uploaded file.

export const BUILTIN_SOUNDS = [
  { id: 'None', label: 'None' },
  ...Array.from({ length: 16 }, (_, i) => ({ id: String(i + 1), label: `Sound ${i + 1}` })),
]

const vol01 = (v) => Math.max(0, Math.min(1, (Number(v) || 0) / 300))

let _current = null
function stopCurrent() {
  if (_current) { try { _current.pause() } catch {} _current = null }
}

// Play the real game sound for a built-in id; fall back to a synth tone on failure.
export function previewBuiltin(id, volume = 200) {
  if (id === 'None' || id == null) return
  try {
    stopCurrent()
    const audio = new Audio(`/sounds/sound${id}.mp3`)
    audio.volume = vol01(volume)
    audio.play().catch(() => synthFallback(id, volume))
    _current = audio
    return audio
  } catch {
    synthFallback(id, volume)
  }
}

// Play an uploaded custom-sound file (object URL) at the given volume.
export function previewCustomFile(objectUrl, volume = 200) {
  if (!objectUrl) return null
  stopCurrent()
  const audio = new Audio(objectUrl)
  audio.volume = vol01(volume)
  audio.play().catch(() => {})
  _current = audio
  return audio
}

// ---- Synth fallback (only used if an mp3 fails to load) ----
let _ctx = null
function ctx() {
  if (typeof window === 'undefined') return null
  const AC = window.AudioContext || window.webkitAudioContext
  if (!AC) return null
  if (!_ctx) _ctx = new AC()
  if (_ctx.state === 'suspended') _ctx.resume()
  return _ctx
}
function synthFallback(id, volume = 200) {
  const ac = ctx(); if (!ac) return
  const now = ac.currentTime
  const gain = ac.createGain()
  const g = Math.max(0.02, vol01(volume)) * 0.35
  gain.gain.setValueAtTime(0.0001, now)
  gain.gain.exponentialRampToValueAtTime(g, now + 0.015)
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.4)
  gain.connect(ac.destination)
  const osc = ac.createOscillator()
  const scale = [262, 294, 330, 392, 440, 523, 587, 659, 784, 880, 1047, 1175, 1319, 1568, 1760, 2093]
  const n = Number(id) || 1
  osc.type = n % 3 === 0 ? 'triangle' : n % 3 === 1 ? 'sine' : 'square'
  osc.frequency.setValueAtTime(scale[(n - 1) % scale.length], now)
  osc.connect(gain)
  osc.start(now); osc.stop(now + 0.42)
}

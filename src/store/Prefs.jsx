import React, { createContext, useContext, useEffect, useState, useCallback } from 'react'
import { supabase, clientId } from '../lib/supabase.js'

// App-wide prefs (NOT per-filter): theme, league/version meta, free-text comments
// that are emitted at the top/bottom of every filter the user exports.

const LS = 'nolvus-prefs'

// Each theme carries its real surface colors (mirroring its index.css block) so pickers can
// paint an honest sample of the theme rather than just a swatch dot.
export const THEMES = [
  { id: 'exile',  name: 'Exile',  swatch: '#c59e54', bg: '#0c0b09', panel: '#181410', text: '#beb29e', bright: '#e4d8c2',
    desc: 'The in-game window look — dark stone, parchment text, gold trim.' },
  { id: 'ember',  name: 'Ember',  swatch: '#ff6b4a', bg: '#0f0e0d', panel: '#1a1714', text: '#c7beb4', bright: '#ece5db',
    desc: 'Warm charcoal with molten coral & amber accents.' },
  { id: 'abyss',  name: 'Abyss',  swatch: '#38c8b0', bg: '#0c1012', panel: '#141a1d', text: '#b0bec3', bright: '#dce8ec',
    desc: 'Cool slate with teal & cyan accents.' },
  { id: 'arcane', name: 'Arcane', swatch: '#b27cf0', bg: '#100d16', panel: '#1a1622', text: '#bfb6d0', bright: '#e6def6',
    desc: 'Midnight violet with orchid accents.' },
]

const DEFAULTS = {
  theme: 'exile',
  league: 'Return of the Ancients',   // selected from GameInfo's league list
  topComment: '',                      // free text inserted at the very top of .filter
  bottomComment: '',                   // free text appended at the bottom
  syntaxHighlight: true,               // colorize the Filter Output pane (comments, keywords, strings, etc.)
  accordionsOpen: true,                // Quick Filter sections start expanded (first run only)
  fontFamily: 'inter-tight',           // app typeface: 'inter-tight' | 'poppins' | 'inter' | 'system'
  fontScale: 1,                        // app zoom: 0.9 | 1 | 1.1 | 1.2 (capped so it never gets too big)
  lang: 'en',                          // UI language: en | ru | pt | de | zh (see src/i18n)
  // --- Remembered view state (QoL: the app looks how you left it) ---
  lastRoute: '/presets',               // last tab you were on
  navCollapsed: false,                 // desktop: hide the left nav for full-width content
  dockOpen: false,                     // filter-output panel hidden until the user opens it (perf + focus)
  qfOpenSections: null,                // Quick Filter open sections (array; null = use accordionsOpen)
  previewBg: 'Woods',                  // Preview scene background
  previewBeams: true,                  // Preview beams toggle
  // --- Game overlay (desktop app only) ---
  overlayEnabled: false,               // always-on-top + snap to a screen edge
  overlaySide: 'right',                // 'left' | 'right'
  overlayDisplay: 'auto',              // 'auto' (follow mouse / game screen) | 'primary' | display id
  overlayHotkey: 'Shift+Alt+F',        // global show/hide hotkey (Electron accelerator)
  // --- Plugins (add-ons) --- per-plugin state, e.g. { 'filter-editor': { enabled: true } }.
  // Empty = every plugin uses its manifest default. Synced to Supabase with the rest of prefs.
  plugins: {},
  // Per-plugin settings values, e.g. { 'spot-price-check': { defaultUnit: 'exalted' } }.
  pluginSettings: {},
  // Market plugins (Market Companion / Spot Price Check) shared state: chosen league + base currency.
  market: { league: null, base: 'exalted' },
  // --- Developer mode (hidden; unlocked by a secret gesture — see SettingsPage) ---
  devUnlocked: false,                  // whether the Developer section is revealed in Settings
  devMode: false,                      // when on: web sees desktop-only plugins (bypasses the gate)
  // Last local modification time (epoch ms) — used so the cloud pull never clobbers a setting
  // this device changed more recently (fixes settings silently resetting).
  _updatedAt: 0,
}

// Bundled font stacks for the fontFamily pref.
const FONT_STACKS = {
  'inter-tight': "'Inter Tight', system-ui, sans-serif",
  poppins: "'Poppins', system-ui, sans-serif",
  inter: "'Inter Variable', Inter, system-ui, sans-serif",
  system: "system-ui, -apple-system, 'Segoe UI', Roboto, Arial, sans-serif",
}

const PrefsCtx = createContext(null)

// One-time migration to the overlay transformation's look: prefs saved before the Exile theme
// existed pin the old defaults. Applied to BOTH the localStorage cache (load) and the Supabase
// row (the pull below) — a pre-transformation server row would otherwise clobber the migrated
// local state on mount. Once the flag is written back, explicit Settings choices (including
// going back to Ember/Poppins) stick forever.
function migrateExile(p) {
  if (!p || p.exileMigrated) return p
  const out = { ...p, exileMigrated: true }
  if (p.theme === 'ember' || !p.theme) out.theme = 'exile'
  if (p.fontFamily === 'poppins' || !p.fontFamily) out.fontFamily = 'inter-tight'
  return out
}

function load() {
  try {
    const raw = JSON.parse(localStorage.getItem(LS) || 'null')
    if (raw && typeof raw === 'object') return { ...DEFAULTS, ...migrateExile(raw) }
  } catch {}
  return { ...DEFAULTS, exileMigrated: true }
}

export function PrefsProvider({ children }) {
  const [prefs, setPrefs] = useState(load)

  useEffect(() => { try { localStorage.setItem(LS, JSON.stringify(prefs)) } catch {} }, [prefs])

  // Cross-window sync, intentionally NARROW: only the overlay transparency is shared live between the
  // main window and a pop-out overlay. We must NOT blanket-merge prefs here — pluginSettings (e.g. the
  // campaign guide's live-tracked zone) is mutated independently in each window from the same game-log
  // event stream, so a full merge would let a stale window clobber the other's current selection.
  useEffect(() => {
    const onStorage = (e) => {
      if (e.key !== LS || !e.newValue) return
      try {
        const next = JSON.parse(e.newValue)
        if (next && typeof next === 'object' && 'overlayOpacity' in next) {
          setPrefs((p) => (p.overlayOpacity === next.overlayOpacity ? p : { ...p, overlayOpacity: next.overlayOpacity }))
        }
      } catch {}
    }
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [])

  useEffect(() => { document.documentElement.setAttribute('data-theme', prefs.theme || 'exile') }, [prefs.theme])
  useEffect(() => {
    const el = document.documentElement
    el.style.setProperty('--app-font', FONT_STACKS[prefs.fontFamily] || FONT_STACKS['inter-tight'])
    // Whole-app scale, hard-capped at 1.2 so it can never get too big to use.
    const scale = Math.min(1.2, Math.max(0.85, Number(prefs.fontScale) || 1))
    el.style.zoom = String(scale)
  }, [prefs.fontFamily, prefs.fontScale])

  // --- Supabase sync (localStorage stays as the instant/offline cache) ---
  // Pull this device's saved settings once on mount, merging over local state.
  useEffect(() => {
    let alive = true
    supabase.rpc('get_app_settings', { p_client_id: clientId() })
      .then(({ data, error }) => {
        if (!alive || error || !data || typeof data !== 'object') return
        setPrefs(p => {
          const incoming = migrateExile(data)
          // Last-write-wins: never let a stale cloud row overwrite settings this device changed
          // more recently (previously the pull always won, resetting fresh local choices).
          if ((incoming._updatedAt || 0) < (p._updatedAt || 0)) return p
          const merged = { ...p, ...incoming }
          // The LOOK is device-local and must NEVER be reset by a sync — the owner has been
          // burned by this repeatedly. Typography + theme always keep this device's values.
          merged.theme = p.theme
          merged.fontFamily = p.fontFamily
          merged.fontScale = p.fontScale
          return merged
        })
      })
      .catch(() => {})
    return () => { alive = false }
  }, [])
  // Push (debounced) whenever prefs change. Fails silently when offline.
  useEffect(() => {
    const t = setTimeout(() => {
      supabase.rpc('upsert_app_settings', { p_client_id: clientId(), p_prefs: prefs }).then(() => {}, () => {})
    }, 800)
    return () => clearTimeout(t)
  }, [prefs])

  const update = useCallback((patch) => {
    // Stamp every explicit change so the cloud pull can tell "this device just set it" from
    // "this is an older row" (see the get_app_settings merge above).
    setPrefs(p => ({ ...p, ...(typeof patch === 'function' ? patch(p) : patch), _updatedAt: Date.now() }))
  }, [])

  return <PrefsCtx.Provider value={{ prefs, update }}>{children}</PrefsCtx.Provider>
}

export function usePrefs() {
  const ctx = useContext(PrefsCtx)
  if (!ctx) throw new Error('usePrefs must be used inside PrefsProvider')
  return ctx
}

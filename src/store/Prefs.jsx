import React, { createContext, useContext, useEffect, useState, useCallback } from 'react'
import { supabase, clientId } from '../lib/supabase.js'

// App-wide prefs (NOT per-filter): theme, league/version meta, free-text comments
// that are emitted at the top/bottom of every filter the user exports.

const LS = 'nolvus-prefs'

export const THEMES = [
  { id: 'ember',  name: 'Ember',  swatch: '#ff6b4a', desc: 'Warm charcoal with molten coral & amber accents.' },
  { id: 'abyss',  name: 'Abyss',  swatch: '#38c8b0', desc: 'Cool slate with teal & cyan accents.' },
  { id: 'arcane', name: 'Arcane', swatch: '#b27cf0', desc: 'Midnight violet with orchid accents.' },
]

const DEFAULTS = {
  theme: 'ember',
  league: 'Return of the Ancients',   // selected from GameInfo's league list
  topComment: '',                      // free text inserted at the very top of .filter
  bottomComment: '',                   // free text appended at the bottom
  syntaxHighlight: true,               // colorize the Filter Output pane (comments, keywords, strings, etc.)
  accordionsOpen: true,                // Quick Filter sections start expanded (first run only)
  fontFamily: 'poppins',               // app typeface: 'poppins' | 'inter' | 'system'
  fontScale: 1,                        // app zoom: 0.9 | 1 | 1.1 | 1.2 (capped so it never gets too big)
  lang: 'en',                          // UI language: en | ru | pt | de | zh (see src/i18n)
  // --- Remembered view state (QoL: the app looks how you left it) ---
  lastRoute: '/presets',               // last tab you were on
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
}

// Bundled font stacks for the fontFamily pref.
const FONT_STACKS = {
  poppins: "'Poppins', system-ui, sans-serif",
  inter: "'Inter Variable', Inter, system-ui, sans-serif",
  system: "system-ui, -apple-system, 'Segoe UI', Roboto, Arial, sans-serif",
}

const PrefsCtx = createContext(null)

function load() {
  try {
    const raw = JSON.parse(localStorage.getItem(LS) || 'null')
    if (raw && typeof raw === 'object') return { ...DEFAULTS, ...raw }
  } catch {}
  return { ...DEFAULTS }
}

export function PrefsProvider({ children }) {
  const [prefs, setPrefs] = useState(load)

  useEffect(() => { try { localStorage.setItem(LS, JSON.stringify(prefs)) } catch {} }, [prefs])
  useEffect(() => { document.documentElement.setAttribute('data-theme', prefs.theme || 'ember') }, [prefs.theme])
  useEffect(() => {
    const el = document.documentElement
    el.style.setProperty('--app-font', FONT_STACKS[prefs.fontFamily] || FONT_STACKS.poppins)
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
        setPrefs(p => ({ ...p, ...data }))
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
    setPrefs(p => ({ ...p, ...(typeof patch === 'function' ? patch(p) : patch) }))
  }, [])

  return <PrefsCtx.Provider value={{ prefs, update }}>{children}</PrefsCtx.Provider>
}

export function usePrefs() {
  const ctx = useContext(PrefsCtx)
  if (!ctx) throw new Error('usePrefs must be used inside PrefsProvider')
  return ctx
}

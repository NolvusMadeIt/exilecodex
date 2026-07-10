import React, { createContext, useContext, useCallback, useMemo } from 'react'
import { usePrefs } from './Prefs.jsx'
import { useMarket } from './Market.jsx'
import { BUILTIN_PLUGINS } from '../plugins/registry.js'

const APP = { name: "Exile Codex", version: '0.18.1' }

// Plugin core — a WordPress-style lifecycle. Each plugin has three states, persisted in
// prefs.plugins[id] (so it rides the existing Supabase prefs sync):
//   • NOT INSTALLED  → { installed: false }           (only shown under "Add New")
//   • INSTALLED+INACTIVE → { installed: true, active: false }   (in the list, not in the sidebar)
//   • INSTALLED+ACTIVE   → { installed: true, active: true }    (in the sidebar + routes)
// `core: true` plugins are always installed+active (locked) so the app can't be bricked.
//
// effectiveActive(id) drives the sidebar + routes. The exposed `enabledPlugins` keeps its old name
// (SideNav/App consume it) but now means "installed && active" (or core).

const PluginCtx = createContext(null)

// Desktop-only plugins can't be installed/activated in the browser preview.
const IS_DESKTOP = typeof window !== 'undefined' && !!window.nolvusDesktop?.isDesktop

// Normalize the stored state for one plugin, migrating the OLD shape on read.
// Old shape: { enabled: true|false } (no `installed` key). New shape: { installed, active, version }.
// Exported for unit tests (pure — no React).
export function readState(manifest, raw) {
  const s = raw && typeof raw === 'object' ? raw : {}
  const version = s.version || manifest.version

  // New-shape state wins: the presence of an `installed`/`active` key means we're on the new model.
  if (s.installed !== undefined || s.active !== undefined) {
    const installed = !!s.installed
    return { installed, active: installed && !!s.active, version }
  }

  // Legacy migration: the old model only had `enabled`. Translate it.
  if ('enabled' in s) {
    if (s.enabled) return { installed: true, active: true, version }
    // enabled:false (explicitly disabled): keep a default-on plugin installed-but-inactive (the user
    // had it, just turned it off); a default-off plugin was never really installed.
    return manifest.enabledByDefault
      ? { installed: true, active: false, version }
      : { installed: false, active: false, version: s.version }
  }

  // Truly fresh — no stored state at all. Honor the manifest default: a default-on plugin (e.g. the
  // Filter Editor, plugin #1) ships installed + active but stays deletable; everything else is an
  // opt-in that lives under "Add New" until the user installs it.
  return manifest.enabledByDefault
    ? { installed: true, active: true, version }
    : { installed: false, active: false, version }
}

// Whether a plugin is effectively active (in the sidebar + routes). `canDesktop` is true on the
// desktop app OR when Developer mode is on (owner-only) — either lets desktop-only plugins run.
function effectiveActive(manifest, state, canDesktop = IS_DESKTOP) {
  if (manifest.core) return true
  if (manifest.desktopOnly && !canDesktop) return false // can't run optional desktop-only on the web
  const st = readState(manifest, state?.[manifest.id])
  return st.installed && st.active
}

// Whether a plugin is effectively installed (in the list).
function effectiveInstalled(manifest, state) {
  if (manifest.core) return true
  return readState(manifest, state?.[manifest.id]).installed
}

export function PluginProvider({ children }) {
  const { prefs, update } = usePrefs()
  const state = prefs.plugins || {}
  // Developer mode (owner-only; see Settings) lets the web build run desktop-only plugins.
  const canDesktop = IS_DESKTOP || !!prefs.devMode

  // Decorate each manifest with its resolved lifecycle for consumers.
  const plugins = useMemo(
    () => BUILTIN_PLUGINS.map(m => {
      const st = readState(m, state[m.id])
      const installed = m.core ? true : st.installed
      const active = effectiveActive(m, state, canDesktop)
      const storedVersion = st.version
      return {
        ...m,
        installed,
        active,
        // legacy alias — some code still reads `.enabled`; it now means "active".
        enabled: active,
        storedVersion,
        hasUpdate: !m.core && installed && !!storedVersion && storedVersion !== m.version,
      }
    }),
    [state, canDesktop]
  )

  // The set the sidebar + routes consume (installed && active, or core).
  const enabledPlugins = useMemo(() => plugins.filter(p => p.active), [plugins])
  // Everything the user has installed (for the "Installed" list).
  const installedPlugins = useMemo(() => plugins.filter(p => p.installed), [plugins])

  const isActive = useCallback(
    (id) => {
      const m = BUILTIN_PLUGINS.find(p => p.id === id)
      return m ? effectiveActive(m, state, canDesktop) : false
    },
    [state, canDesktop]
  )
  const isInstalled = useCallback(
    (id) => {
      const m = BUILTIN_PLUGINS.find(p => p.id === id)
      return m ? effectiveInstalled(m, state) : false
    },
    [state]
  )
  const hasUpdate = useCallback(
    (id) => {
      const m = BUILTIN_PLUGINS.find(p => p.id === id)
      if (!m || m.core) return false
      const st = readState(m, state[id])
      return st.installed && !!st.version && st.version !== m.version
    },
    [state]
  )

  // Low-level persist: merge a partial state for one plugin into prefs.plugins[id]. The partial is
  // applied on top of the *resolved* state (readState), not the raw stored blob — so a partial like
  // { active: false } on a plugin whose installed state is still implicit (a default-on plugin that
  // has never been written, e.g. the Filter Editor) correctly keeps installed:true instead of
  // collapsing to not-installed.
  const patchState = useCallback((id, partial) => {
    const m = BUILTIN_PLUGINS.find(p => p.id === id)
    update(prev => {
      const resolved = m ? readState(m, prev.plugins?.[id]) : (prev.plugins?.[id] || {})
      return {
        ...prev,
        plugins: {
          ...(prev.plugins || {}),
          [id]: { ...resolved, ...partial },
        },
      }
    })
  }, [update])

  // --- Lifecycle actions ---
  // WordPress installs DEACTIVATED — install only puts it in the list; the user activates separately.
  const install = useCallback((id) => {
    const m = BUILTIN_PLUGINS.find(p => p.id === id)
    if (!m || m.core) return
    if (m.desktopOnly && !IS_DESKTOP) return // can't install optional desktop-only plugins on the web
    patchState(id, { installed: true, active: false, version: m.version })
  }, [patchState])

  const activate = useCallback((id) => {
    const m = BUILTIN_PLUGINS.find(p => p.id === id)
    if (!m || m.core) return
    if (m.desktopOnly && !IS_DESKTOP) return
    // Must be installed to activate (guard against a stray call).
    patchState(id, { installed: true, active: true, version: m.version })
  }, [patchState])

  const deactivate = useCallback((id) => {
    const m = BUILTIN_PLUGINS.find(p => p.id === id)
    if (!m || m.core) return
    patchState(id, { active: false })
  }, [patchState])

  // Delete — only allowed when inactive (WP requires deactivate before delete); core can't be deleted.
  const uninstall = useCallback((id) => {
    const m = BUILTIN_PLUGINS.find(p => p.id === id)
    if (!m || m.core) return
    const st = readState(m, state[id])
    if (st.active) return // refuse to delete an active plugin
    patchState(id, { installed: false, active: false })
  }, [patchState, state])

  // Update — bump the stored version to the manifest's current version (clears hasUpdate).
  const updatePlugin = useCallback((id) => {
    const m = BUILTIN_PLUGINS.find(p => p.id === id)
    if (!m || m.core) return
    patchState(id, { version: m.version })
  }, [patchState])

  // Back-compat shim: the old setEnabled(id, bool) → activate/deactivate. Kept so nothing breaks if
  // some caller still references it.
  const setEnabled = useCallback((id, val) => {
    if (val) activate(id)
    else deactivate(id)
  }, [activate, deactivate])

  const value = useMemo(
    () => ({
      plugins, enabledPlugins, installedPlugins,
      isActive, isInstalled, hasUpdate,
      isEnabled: isActive, // back-compat alias (e.g. GuidePage gates on isEnabled('filter-editor'))
      install, activate, deactivate, uninstall, updatePlugin,
      setEnabled, IS_DESKTOP,
    }),
    [plugins, enabledPlugins, installedPlugins, isActive, isInstalled, hasUpdate,
      install, activate, deactivate, uninstall, updatePlugin, setEnabled]
  )
  return <PluginCtx.Provider value={value}>{children}</PluginCtx.Provider>
}

export function usePlugins() {
  const ctx = useContext(PluginCtx)
  if (!ctx) throw new Error('usePlugins must be used within PluginProvider')
  return ctx
}

// Assemble the `host` object a host-aware plugin receives: app info, the shared market layer,
// formatters, and per-plugin settings get/set (defaults from the manifest's `settings` schema,
// overrides persisted in prefs.pluginSettings[id] → DB-synced). Used by the route host-boundary
// and by the plugin's settings form.
export function usePluginHost(pluginId) {
  const { prefs, update } = usePrefs()
  const { league, base, market, format } = useMarket()
  const manifest = BUILTIN_PLUGINS.find(p => p.id === pluginId)
  const stored = prefs.pluginSettings?.[pluginId]

  return useMemo(() => ({
    app: APP,
    league,
    base,
    market,
    format,
    settings: {
      get: (key) => {
        const v = stored?.[key]
        if (v !== undefined) return v
        return manifest?.settings?.find(f => f.key === key)?.default
      },
      set: (key, value) => update(p => ({
        ...p,
        pluginSettings: { ...(p.pluginSettings || {}), [pluginId]: { ...(p.pluginSettings?.[pluginId] || {}), [key]: value } },
      })),
    },
  }), [pluginId, stored, league, base, market, format, manifest, update])
}

import React, { createContext, useContext, useCallback, useMemo } from 'react'
import { usePrefs } from './Prefs.jsx'
import { useMarket } from './Market.jsx'
import { BUILTIN_PLUGINS } from '../plugins/registry.js'

const APP = { name: "Nolvus's Filter", version: '0.15.2' }

// Plugin core. Tracks which plugins are enabled (persisted in prefs.plugins, so it rides the
// existing Supabase prefs sync) and exposes the contributed surfaces to the host. The host asks
// "what nav items / routes does an enabled plugin add?" — it never reaches into plugin internals.
//
// Effective-enabled = prefs.plugins[id].enabled, falling back to the manifest's enabledByDefault.
// `core: true` plugins are always enabled (their toggle is locked) so the app can't be bricked.

const PluginCtx = createContext(null)

function effectiveEnabled(manifest, state) {
  if (manifest.core) return true
  return state?.[manifest.id]?.enabled ?? manifest.enabledByDefault ?? true
}

export function PluginProvider({ children }) {
  const { prefs, update } = usePrefs()
  const state = prefs.plugins || {}

  const plugins = useMemo(
    () => BUILTIN_PLUGINS.map(m => ({ ...m, enabled: effectiveEnabled(m, state) })),
    [state]
  )
  const enabledPlugins = useMemo(() => plugins.filter(p => p.enabled), [plugins])

  const isEnabled = useCallback(
    (id) => {
      const m = BUILTIN_PLUGINS.find(p => p.id === id)
      return m ? effectiveEnabled(m, state) : false
    },
    [state]
  )

  const setEnabled = useCallback((id, val) => {
    const m = BUILTIN_PLUGINS.find(p => p.id === id)
    if (!m || m.core) return // unknown or core plugin — no-op
    update(prev => ({
      ...prev,
      plugins: { ...(prev.plugins || {}), [id]: { ...(prev.plugins?.[id] || {}), enabled: !!val } },
    }))
  }, [update])

  const enable = useCallback((id) => setEnabled(id, true), [setEnabled])
  const disable = useCallback((id) => setEnabled(id, false), [setEnabled])

  const value = useMemo(
    () => ({ plugins, enabledPlugins, isEnabled, enable, disable, setEnabled }),
    [plugins, enabledPlugins, isEnabled, enable, disable, setEnabled]
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

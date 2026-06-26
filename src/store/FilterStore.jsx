import React, { createContext, useContext, useEffect, useMemo, useState, useCallback } from 'react'
import { defaultSettings } from './defaultSettings.js'
import { rulesToOverrideRules } from '../lib/parseFilter.js'

// Single store ABOVE the router so tab navigation never resets the filter.
// Only Reset clears it — a single-store model keeps tab switches lossless.
const LS_FILTERS = 'nolvus-filters'        // array of settings objects
const LS_ACTIVE = 'nolvus-active-name'     // active filter name

const FilterCtx = createContext(null)

const DEFAULT_NAME = "Nolvus's Filter"
// Fall back to our brand name for any empty/legacy filter name.
const migrateName = (n) => n || DEFAULT_NAME

// Bump the patch component of a semver. 0.0.9 -> 0.0.10, 0.9.99 -> 0.9.100. We never
// auto-bump minor/major — semantic upgrades are the user's call.
export function bumpPatch(v) {
  const m = String(v || '0.0.1').match(/^(\d+)\.(\d+)\.(\d+)/)
  if (!m) return '0.0.2'
  return `${m[1]}.${m[2]}.${Number(m[3]) + 1}`
}

// Merge a stored filter onto current defaults so older saved filters gain any new
// keys/slices added since they were created (forward-compatible migration).
function normalizeFilter(f) {
  const name = migrateName(f?.name)
  const d = defaultSettings(name)
  return {
    ...d, ...f, name,
    version: f?.version || d.version,
    strictness: f?.strictness || d.strictness,
    style: f?.style || d.style,
    gameMode: { ...d.gameMode, ...f?.gameMode },
    quickFilters: { ...d.quickFilters, ...f?.quickFilters },
    overrides: {
      rules: Array.isArray(f?.overrides?.rules) ? f.overrides.rules : d.overrides.rules,
    },
    cosmetic: { ...d.cosmetic, ...f?.cosmetic },
    customRules: Array.isArray(f?.customRules) ? f.customRules : d.customRules,
    freeText: { ...d.freeText, ...f?.freeText },
  }
}

function loadFilters() {
  try {
    const raw = JSON.parse(localStorage.getItem(LS_FILTERS) || 'null')
    if (Array.isArray(raw) && raw.length) return raw.map(normalizeFilter)
  } catch {}
  return [defaultSettings()]
}

export function FilterProvider({ children }) {
  const [filters, setFilters] = useState(loadFilters)
  const [activeName, setActiveName] = useState(() => {
    return migrateName(localStorage.getItem(LS_ACTIVE)) || (loadFilters()[0]?.name ?? DEFAULT_NAME)
  })

  const active = useMemo(
    () => filters.find(f => f.name === activeName) || filters[0],
    [filters, activeName]
  )

  useEffect(() => { try { localStorage.setItem(LS_FILTERS, JSON.stringify(filters)) } catch {} }, [filters])
  useEffect(() => { try { localStorage.setItem(LS_ACTIVE, activeName) } catch {} }, [activeName])

  // Patch the active filter. `patch` is an object (shallow-merge) or updater fn.
  const update = useCallback((patch) => {
    setFilters(prev => prev.map(f => {
      if (f.name !== (active?.name)) return f
      const next = typeof patch === 'function' ? patch(f) : { ...f, ...patch }
      return next
    }))
  }, [active])

  // Update a nested slice (e.g. updateSlice('gameMode', { hardcore: true })).
  const updateSlice = useCallback((key, patch) => {
    update(f => ({ ...f, [key]: { ...f[key], ...(typeof patch === 'function' ? patch(f[key]) : patch) } }))
  }, [update])

  const renameActive = useCallback((newName) => {
    newName = (newName || '').trim()
    if (!newName) return
    setFilters(prev => prev.map(f => f.name === active.name ? { ...f, name: newName } : f))
    setActiveName(newName)
  }, [active])

  const createFilter = useCallback((name = 'MyNewFilter.filter') => {
    let n = name, i = 1
    const taken = new Set(filters.map(f => f.name))
    while (taken.has(n)) n = `${name} ${++i}`
    const f = defaultSettings(n)
    setFilters(prev => [...prev, f])
    setActiveName(n)
  }, [filters])

  // Add a fully-formed filter (from an import or a template) as a NEW entry: normalized
  // onto current defaults, given a unique name, and activated by default. Returns the name.
  const addFilter = useCallback((settings, { activate = true } = {}) => {
    const incoming = normalizeFilter(settings || {})
    let n = incoming.name, i = 1
    const taken = new Set(filters.map(f => f.name))
    while (taken.has(n)) n = `${incoming.name} ${++i}`
    const f = { ...incoming, name: n }
    setFilters(prev => [...prev, f])
    if (activate) setActiveName(n)
    return n
  }, [filters])

  const cloneActive = useCallback(() => {
    const base = JSON.parse(JSON.stringify(active))
    let n = `${active.name} copy`, i = 1
    const taken = new Set(filters.map(f => f.name))
    while (taken.has(n)) n = `${active.name} copy ${++i}`
    base.name = n
    setFilters(prev => [...prev, base])
    setActiveName(n)
  }, [active, filters])

  const deleteFilter = useCallback((name) => {
    setFilters(prev => {
      const next = prev.filter(f => f.name !== name)
      const safe = next.length ? next : [defaultSettings()]
      if (name === activeName) setActiveName(safe[0].name)
      return safe
    })
  }, [activeName])

  const resetActive = useCallback(() => {
    update(() => defaultSettings(active.name))
  }, [update, active])

  const importSettings = useCallback((settings) => {
    update(() => ({ ...defaultSettings(active.name), ...settings, name: active.name }))
  }, [update, active])

  // Merge parsed .filter contents into the active filter without nuking quick-filter
  // settings: imported rules go to customRules, free-text goes to the freeText buckets.
  // Auto-bumps the version (importing an existing filter == "next revision").
  const importCustomRules = useCallback(({ customRules = [], freeTextTop = '', freeTextBottom = '', meta = {}, sourceFile = null }) => {
    update(f => {
      const parsedVer = meta?.filter_version || meta?.version
      const baseVer = parsedVer || f.version || '0.0.1'
      return {
        ...f,
        // Imported rules land in the Quick Editor's hide/highlight builder so they're visible + editable.
        overrides: { ...f.overrides, rules: rulesToOverrideRules(customRules) },
        freeText: { top: freeTextTop || '', bottom: freeTextBottom || '' },
        version: bumpPatch(baseVer),
        sourceFile: sourceFile || null,
      }
    })
  }, [update])

  // Apply a build-derived smart filter (from a .build import) to the active filter. The patch is
  // ordinary settings (strictness + full quickFilters + an editable armour-highlight rule) plus a
  // name; nothing build-specific is stored. The build's rule is prepended to any existing rules,
  // the filter is renamed after the build (deduped), and the version auto-bumps.
  const importBuild = useCallback((patch = {}) => {
    const { name: wantName, overrides: patchOv, ...rest } = patch
    let n = (wantName || active.name).trim() || active.name
    const taken = new Set(filters.filter(f => f.name !== active.name).map(f => f.name))
    const baseN = n; let i = 1
    while (taken.has(n)) n = `${baseN} ${++i}`
    setFilters(prev => prev.map(f => {
      if (f.name !== active.name) return f
      const buildRules = patchOv?.rules || []
      return {
        ...f, ...rest, name: n,
        overrides: { ...f.overrides, rules: [...buildRules, ...(f.overrides?.rules || [])] },
        version: bumpPatch(f.version || '0.0.1'),
        sourceFile: null,
      }
    }))
    setActiveName(n)
  }, [active, filters])

  // Increment the active filter's patch version. Called when the user "ships" a save.
  const bumpVersion = useCallback(() => {
    update(f => ({ ...f, version: bumpPatch(f.version || '0.0.1') }))
  }, [update])

  // Editor tab: store/clear the manually-edited filter text. When set, it overrides the generated
  // filter for all output/export (see lib/buildFilter.js → resolveFilter). null = back to live.
  const setManualFilter = useCallback((text) => {
    update(f => ({ ...f, manualFilter: text }))
  }, [update])
  const clearManualFilter = useCallback(() => {
    update(f => ({ ...f, manualFilter: null }))
  }, [update])

  const value = {
    filters, active, activeName, setActiveName,
    update, updateSlice, renameActive, createFilter, addFilter, cloneActive, deleteFilter,
    resetActive, importSettings, importCustomRules, importBuild, bumpVersion,
    setManualFilter, clearManualFilter,
  }
  return <FilterCtx.Provider value={value}>{children}</FilterCtx.Provider>
}

export function useFilter() {
  const ctx = useContext(FilterCtx)
  if (!ctx) throw new Error('useFilter must be used within FilterProvider')
  return ctx
}

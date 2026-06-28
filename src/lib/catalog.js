import { useEffect, useState } from 'react'
import { classifyName, iconFor } from '../data/items.js'
import { asset } from '../data/assets.js'

// Loads the bundled item catalogs (in /public/data/poe2/) and builds a flat,
// searchable list of base types with representative icons. Cached after first load.
let _cache = null
let _promise = null

async function fetchJSON(path) {
  try { const r = await fetch(path); if (!r.ok) return []; const j = await r.json(); return Array.isArray(j) ? j : [] }
  catch { return [] }
}

async function buildCatalog() {
  const [currency, jewellery, flask, gear, uniques] = await Promise.all([
    fetchJSON('/data/poe2/currency-data.json'),
    fetchJSON('/data/poe2/jewellery-data.json'),
    fetchJSON('/data/poe2/flask-data.json'),
    fetchJSON('/data/poe2/gear-data.json'),
    fetchJSON('/data/poe2/uniques-data.json'),
  ])

  const seen = new Set()
  const baseTypes = []
  const add = (name, category, icon) => {
    if (!name || seen.has(name)) return
    seen.add(name)
    baseTypes.push({ name, category, icon: icon || iconFor(category) })
  }

  currency.forEach(c => add(c.baseType, 'currency'))
  flask.forEach(f => add(f.name, classifyName(f.name)))
  jewellery.forEach(j => add(j.name, classifyName(j.name)))
  gear.forEach(it => add(it.name, classifyName(it.name)))

  // Uniques get their real per-name image from the data's `image` field.
  const uniqueItems = uniques
    .filter(u => u.name)
    .map(u => ({ name: u.name, baseType: u.baseType, category: u.category || 'items',
      icon: u.image ? asset(`uniques/${u.image}`) : iconFor(classifyName(u.baseType || u.name)),
      flavor: u.flavorText, mods: u.explicitMods }))

  baseTypes.sort((a, b) => a.name.localeCompare(b.name))
  _cache = { baseTypes, uniques: uniqueItems, counts: {
    base: baseTypes.length, uniques: uniqueItems.length, currency: currency.length, gear: gear.length,
  } }
  return _cache
}

export function loadCatalog() {
  if (_cache) return Promise.resolve(_cache)
  if (!_promise) _promise = buildCatalog()
  return _promise
}

// Map of unique item NAME -> its BASE TYPE. PoE2 filters can't match a unique by name, so anything
// that targets a unique (e.g. the Tier List) must resolve to the base type + `Rarity Unique`.
let _uniqueBases = null
export async function loadUniqueBases() {
  if (_uniqueBases) return _uniqueBases
  const c = await loadCatalog()
  const m = {}
  for (const u of c.uniques || []) if (u.name && u.baseType) m[u.name] = u.baseType
  _uniqueBases = m
  return m
}

// The set of every REAL base-type name (currency, gear, jewellery, flask bases). The filter
// generator uses this to guarantee it never emits a name as `BaseType ==` unless it's a verified
// base type — so a unique name (or any unknown/typo) can never slip into a BaseType rule and break
// the whole filter in-game ("No base types found exactly matching …"). Empty only if data fails to
// load, in which case the generator safely emits nothing rather than something invalid.
let _baseNames = null
export async function loadBaseNames() {
  if (_baseNames) return _baseNames
  const c = await loadCatalog()
  _baseNames = new Set((c.baseTypes || []).map(b => b.name))
  return _baseNames
}

// React hook
export function useCatalog() {
  const [cat, setCat] = useState(_cache)
  useEffect(() => { let live = true; loadCatalog().then(c => { if (live) setCat(c) }); return () => { live = false } }, [])
  return cat
}

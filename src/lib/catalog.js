import { useEffect, useState } from 'react'
import { classifyName, iconFor, IMG } from '../data/items.js'

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
      icon: u.image ? `${IMG}/uniques/${u.image}` : iconFor(classifyName(u.baseType || u.name)),
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

// React hook
export function useCatalog() {
  const [cat, setCat] = useState(_cache)
  useEffect(() => { let live = true; loadCatalog().then(c => { if (live) setCat(c) }); return () => { live = false } }, [])
  return cat
}

// Adapter between the vendored XileHUD modules (./overlay/**) and this app — original code.
//
// Upstream, those modules load their JSON datasets through Electron IPC
// (window.electronAPI.getUniques() etc.) and resolve item art from an 82MB bundled-images
// directory. Here the datasets ship as static files under /xilehud/ and are fetched on
// demand; bundled game art is intentionally NOT redistributed (see ATTRIBUTION.md), so
// image resolution stays unavailable and the modules fall back to their built-in neutral
// placeholder. If a per-item CDN/wiki resolver lands later, this file is where it goes.
const DATA_ROOT = '/xilehud/poe2/rise-of-the-abyssal' // current dataset snapshot from upstream

const cache = new Map<string, Promise<unknown>>()

function json(file: string): Promise<unknown> {
  let p = cache.get(file)
  if (!p) {
    p = fetch(`${DATA_ROOT}/${file}`).then((res) => {
      if (!res.ok) throw new Error(`XileHUD data ${file}: HTTP ${res.status}`)
      return res.json()
    })
    p.catch(() => cache.delete(file)) // don't cache failures — a retry should refetch
    cache.set(file, p)
  }
  return p
}

export const loadUniques = () => json('Uniques.json')
export const loadBases = () => json('Bases.json')

// --- Modifier database -----------------------------------------------------------------
// Upstream this class lives in Electron's main process behind three IPC channels
// (get-modifier-data / search-modifiers / get-all-categories). Here it runs in-page against
// the same dataset snapshot via the fetch shims inside the vendored files (XILE-PORT marks).
import { ModifierDatabase } from './db/modifier-database'
import { JsonCache } from './db/utils/jsonCache'

let modDb: ModifierDatabase | null = null
export function modifierDb(): ModifierDatabase {
  if (!modDb) modDb = new ModifierDatabase(DATA_ROOT, true, 'poe2', new JsonCache({ cloneResults: false }))
  return modDb
}

// Mirrors the upstream IPC handler's guard: the constructor kicks off an async full load, and
// category listings are empty until it settles — wait for it (bounded) before first use.
export async function modifierDbReady(): Promise<ModifierDatabase> {
  const db = modifierDb()
  const loading = (db as unknown as { __loadingPromise?: Promise<void> }).__loadingPromise
  if (loading?.then) {
    await Promise.race([loading.catch(() => {}), new Promise((r) => setTimeout(r, 8000))])
  }
  return db
}

// The modules' own show()/reload() paths call window.electronAPI.get*(). Install
// fetch-backed equivalents (never overwriting a real desktop API) so those internal
// refresh paths keep working wherever the modules run.
export function installXileShim(): void {
  const w = window as unknown as { electronAPI?: Record<string, unknown> }
  const api = (w.electronAPI = w.electronAPI || {})
  api.getUniques = api.getUniques || loadUniques
  api.getBases = api.getBases || loadBases
  api.getModifierData = api.getModifierData || ((category: string) => modifierDb().getModifiersForCategory(category))
  api.searchModifiers = api.searchModifiers || ((q: string, category?: string) => modifierDb().searchModifiers(q, category))
  api.getAllCategories = api.getAllCategories || (() => modifierDb().getAllCategories())
  // Upstream opens mod tiers in a separate popout window; in-page the tier list is already
  // expandable, so this is a deliberate no-op rather than a broken feature.
  api.openModPopout = api.openModPopout || (() => {})
}

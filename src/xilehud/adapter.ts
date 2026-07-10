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
  // Crafting + annoints panels — each maps 1:1 onto a dataset file in the snapshot.
  api.getLiquidEmotions = api.getLiquidEmotions || (() => json('Liquid_Emotions.json'))
  api.getEssences = api.getEssences || (() => json('Essences.json'))
  api.getCatalysts = api.getCatalysts || (() => json('Catalysts.json'))
  api.getAugments = api.getAugments || (() => json('Augments.json'))
  api.getSocketables = api.getSocketables || (() => json('Augments.json')) // upstream legacy alias
  api.getOmens = api.getOmens || (() => json('Omens.json'))
  api.getCurrency = api.getCurrency || (() => json('Currency.json'))
  api.getKeywords = api.getKeywords || (() => json('Keywords.json'))
  api.getAnnoints = api.getAnnoints || (() => json('Annoints.json'))
  // Character reference panels (quest-passives is self-contained — no dataset).
  api.getKeystones = api.getKeystones || (() => json('Keystones.json'))
  api.getAscendancyPassives = api.getAscendancyPassives || (() => json('Ascendancy_Passives.json'))
  api.getAtlasNodes = api.getAtlasNodes || (() => json('Atlas_Nodes.json'))
  api.getGems = api.getGems || (() => json('Gems.json'))
  api.getModifierData = api.getModifierData || ((category: string) => modifierDb().getModifiersForCategory(category))
  api.searchModifiers = api.searchModifiers || ((q: string, category?: string) => modifierDb().searchModifiers(q, category))
  api.getAllCategories = api.getAllCategories || (() => modifierDb().getAllCategories())
  // Upstream opens mod tiers in a separate popout window; in-page the tier list is already
  // expandable, so this is a deliberate no-op rather than a broken feature.
  api.openModPopout = api.openModPopout || (() => {})

  // Merchant history (desktop only): map the vendored renderer's electronAPI names onto OUR
  // bridges — storage via nolvusXile (per-league JSON in userData), network + session via
  // nolvusTrade (our hardened transport; never XileHUD's session layer). On web these bridges
  // don't exist and the history plugin is desktopOnly, so none of this registers.
  const trade = (w as unknown as { nolvusTrade?: Record<string, (...a: unknown[]) => Promise<Record<string, unknown>>> }).nolvusTrade
  const xile = (w as unknown as { nolvusXile?: Record<string, (...a: unknown[]) => Promise<unknown>> }).nolvusXile
  if (trade && xile) {
    api.historyLoad = api.historyLoad || ((league: string) => xile.historyLoad(league))
    api.historySave = api.historySave || ((store: unknown, league?: string) => xile.historySave(store, league))
    api.poeFetchHistory = api.poeFetchHistory || ((league: string) => trade.history({ league }))
    api.poeGetSession = api.poeGetSession || (async () => {
      const s = await trade.hasSession()
      return { loggedIn: !!s?.hasSession }
    })
    api.poeLogin = api.poeLogin || (async () => {
      const r = await trade.login()
      return { loggedIn: !!(r?.ok || r?.hasSession) }
    })
    // We don't persist GGG's rate-limit headers between runs (they ride each live response).
    api.poeGetSavedRateLimitHeaders = api.poeGetSavedRateLimitHeaders || (() => null)
  }
}

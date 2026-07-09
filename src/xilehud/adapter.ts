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

// The modules' own show()/reload() paths call window.electronAPI.get*(). Install
// fetch-backed equivalents (never overwriting a real desktop API) so those internal
// refresh paths keep working wherever the modules run.
export function installXileShim(): void {
  const w = window as unknown as { electronAPI?: Record<string, unknown> }
  const api = (w.electronAPI = w.electronAPI || {})
  api.getUniques = api.getUniques || loadUniques
  api.getBases = api.getBases || loadBases
}

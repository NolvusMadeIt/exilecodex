import {
  Star, SlidersHorizontal, ListOrdered, Pencil, Shirt, Eye, Settings, BookMarked,
  GraduationCap, Users, ScrollText, FolderCog, LineChart, Wrench,
} from 'lucide-react'

// Shared navigation model — used by the bottom nav bar (BottomNav.jsx). Groups come from three
// sources: the core Filter Studio routes, any enabled plugin that declares contributes.nav.items
// (one entry per panel), and single-route plugins folded into named groups (Market, Tools).
export const FILTER_STUDIO = [
  { to: '/presets', label: 'Presets', icon: Star, order: 10 },
  { to: '/quick-editor', label: 'Quick Editor', icon: SlidersHorizontal, order: 20 },
  { to: '/tier-lists', label: 'Tier Lists', icon: ListOrdered, order: 30 },
  { to: '/custom-rules', label: 'Custom Rules', icon: Pencil, order: 40 },
  { to: '/cosmetic', label: 'Cosmetic', icon: Shirt, order: 50 },
  { to: '/preview', label: 'Preview', icon: Eye, order: 70 },
]

export const FOLD_INTO = {
  'market-companion': 'Market',
  'xile-history': 'Market',
  'price-check': 'Market',
  'xile-tools': 'Tools',
  'campaign-guide': 'Tools',
}

export const FOLDED_META = {
  Market: { icon: LineChart, order: 80 },
  Tools: { icon: Wrench, order: 50 },
}

// The "Other" dropdown — the app's reference/info pages, out of the way of the main tools.
export const OTHER = [
  { to: '/community', label: 'Community', icon: Users },
  { to: '/patch-notes', label: 'Patch Notes', icon: ScrollText },
  { to: '/guide', label: 'How to Use', icon: GraduationCap },
  { to: '/changelog', label: 'Changelog', icon: BookMarked },
]

export const SETTINGS_ITEM = { to: '/settings', label: 'Settings', icon: Settings }

export function buildGroups(enabledPlugins) {
  const groups = []

  const studioItems = [...FILTER_STUDIO]
  const editor = enabledPlugins.find((p) => p.id === 'filter-editor')
  if (editor?.contributes?.route?.path) {
    studioItems.push({
      to: editor.contributes.route.path,
      label: editor.contributes.nav?.label || 'Editor',
      icon: editor.icon,
      order: editor.contributes.nav?.order ?? 60,
    })
  }
  groups.push({ id: 'studio', label: 'Filter Studio', icon: FolderCog, order: 10, items: studioItems.sort((a, b) => a.order - b.order) })

  const folded = {}
  for (const p of enabledPlugins) {
    if (p.id === 'filter-editor') continue
    const nav = p.contributes?.nav
    const route = p.contributes?.route
    if (!nav?.label || !route?.path) continue
    if (Array.isArray(nav.items) && nav.items.length) {
      groups.push({
        id: p.id, label: nav.label, icon: p.icon, order: nav.order ?? 100,
        items: nav.items.map((it) => ({ to: `${route.path}?panel=${it.id}`, label: it.label, panel: it.id, base: route.path })),
      })
    } else {
      const cat = FOLD_INTO[p.id]
      const entry = { to: route.path, label: nav.label, icon: p.icon, order: nav.order ?? 100 }
      if (cat) (folded[cat] ||= []).push(entry)
      else groups.push({ id: p.id, label: nav.label, icon: p.icon, order: nav.order ?? 100, to: route.path })
    }
  }
  for (const [cat, items] of Object.entries(folded)) {
    const meta = FOLDED_META[cat] || { icon: Wrench, order: 95 }
    groups.push({ id: cat, label: cat, icon: meta.icon, order: meta.order, items: items.sort((a, b) => a.order - b.order) })
  }

  return groups.sort((a, b) => a.order - b.order)
}

// Active-state helpers (shared so the bottom bar highlights match the routes exactly).
export function itemActive(item, path, query) {
  const base = item.base || item.to
  const pathMatch = path === base || (base === '/presets' && path === '/')
  if (!pathMatch) return false
  if (!item.panel) return true
  return (query?.panel || null) === item.panel || (!query?.panel && item.first)
}

export function groupActive(g, path, query) {
  return g.items ? g.items.some((it) => itemActive(it, path, query)) : path === g.to
}

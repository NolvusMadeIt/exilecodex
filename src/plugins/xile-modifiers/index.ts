import { lazy } from 'react'
import { ListFilter } from 'lucide-react'

// Plugin: the PoE2 Modifiers browser — every affix by item category with tiers, weights and
// ilvl requirements. Engine and data are GPL-3.0 from the XileHUD project (see
// ATTRIBUTION.md); the React wrapper, theming and browser-side database adapter are ours.
export default {
  id: 'xile-modifiers',
  name: 'Modifiers',
  description: 'Every PoE2 modifier by item category — tiers, weights, ilvl — searchable and filterable.',
  version: '1.0.0',
  author: 'XileHUD (engine) · Nolvus (port)',
  category: 'Database',
  icon: ListFilter,
  core: false,
  enabledByDefault: true,
  desktopOnly: false,
  detail: {
    longDescription:
      'The full PoE2 modifier database: pick an item category and browse every prefix and suffix that '
      + 'can roll on it — tier ladders, spawn weights, item-level gates — with instant search, ilvl '
      + 'range filtering and mod-tag chips. The engine and curated datasets come from the open-source '
      + 'XileHUD overlay project (GPL-3.0), credited in-app, wearing this app\'s Exile theme.',
    changelog: [
      { version: '1.0.0', notes: 'Initial release — XileHUD modifier engine + database vendored under GPL-3.0; their main-process database now runs in-page against static dataset snapshots (works on web and desktop).' },
    ],
  },
  contributes: {
    nav: { group: 'main', label: 'Modifiers', order: 31 },
    route: { path: '/modifiers', component: lazy(() => import('./XileModifiersPage.jsx').then(m => ({ default: m.XileModifiersPage }))) },
  },
}

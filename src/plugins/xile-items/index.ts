import { lazy } from 'react'
import { BookOpen } from 'lucide-react'

// Plugin: the PoE2 Item Database (uniques + bases browser), powered by XileHUD's vendored
// modules — the first module of the overlay transformation's wave 2. Engine and data are
// GPL-3.0 from the XileHUD project (see ATTRIBUTION.md); the React wrapper, theming and
// data adapter are ours. Web-capable: the datasets are static JSON fetched on demand.
export default {
  id: 'xile-items',
  name: 'Item Database',
  description: 'Browse every PoE2 unique and base item — searchable, filterable, offline-friendly. Powered by XileHUD.',
  version: '1.0.0',
  author: 'XileHUD (engine) · Nolvus (port)',
  category: 'Database',
  icon: BookOpen,
  core: false,
  enabledByDefault: true,
  desktopOnly: false,
  detail: {
    longDescription:
      'The full PoE2 item database as a plugin: every unique (weapons, armour, other) and every base type '
      + 'with its implicits and stat ranges, searchable and filterable. The browsing engine and curated '
      + 'datasets come from the open-source XileHUD overlay project (GPL-3.0) — credited in-app and in '
      + 'ATTRIBUTION.md — wearing this app\'s Exile theme. Item art is loaded per item and never '
      + 'redistributed with the app.',
    changelog: [
      { version: '1.0.0', notes: 'Initial release — XileHUD uniques + bases modules vendored under GPL-3.0, rethemed, with a fetch-based data adapter (works on web and desktop).' },
    ],
  },
  contributes: {
    nav: {
      group: 'main', label: 'Items', order: 30,
      // Panels the categorized side menu lists as direct entries (?panel=<id> deep links).
      items: [
        { id: 'uniques', label: 'Uniques' },
        { id: 'bases', label: 'Bases' },
      ],
    },
    route: { path: '/items', component: lazy(() => import('./XileItemsPage.jsx').then(m => ({ default: m.XileItemsPage }))) },
  },
}

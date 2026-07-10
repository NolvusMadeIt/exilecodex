import { lazy } from 'react'
import { FlaskConical } from 'lucide-react'

// Plugin: the Crafting reference — currencies, essences, omens, catalysts, augments, liquid
// emotions, anoints and the keyword glossary, in one tabbed page. Engine and data are GPL-3.0
// from the XileHUD project (see ATTRIBUTION.md); the React wrapper, theming and data adapter
// are ours. Web-capable: every dataset is static JSON fetched on demand.
export default {
  id: 'xile-crafting',
  name: 'Crafting',
  description: 'The PoE2 crafting reference — currencies, essences, omens, catalysts, augments, anoints and the keyword glossary.',
  version: '1.0.0',
  author: 'XileHUD (engine) · Nolvus (port)',
  category: 'Database',
  icon: FlaskConical,
  core: false,
  enabledByDefault: true,
  desktopOnly: false,
  detail: {
    longDescription:
      'Every crafting resource in PoE2, one tab away: currencies with their exact effects, essences by '
      + 'tier, omens, catalysts, socketable augments, liquid emotions for instilling, amulet anoints, and '
      + 'a searchable glossary of game keywords. The reference engine and curated datasets come from the '
      + 'open-source XileHUD overlay project (GPL-3.0), credited in-app, wearing this app\'s Exile theme. '
      + 'Item art is loaded per item and never redistributed with the app.',
    changelog: [
      { version: '1.0.0', notes: 'Initial release — eight XileHUD crafting/reference panels vendored under GPL-3.0, rethemed, fetch-based data adapter (works on web and desktop).' },
    ],
  },
  contributes: {
    nav: {
      group: 'main', label: 'Crafting', order: 32,
      items: [
        { id: 'currency', label: 'Currency' },
        { id: 'essences', label: 'Essences' },
        { id: 'omens', label: 'Omens' },
        { id: 'catalysts', label: 'Catalysts' },
        { id: 'augments', label: 'Augments' },
        { id: 'liquid', label: 'Liquid Emotions' },
        { id: 'annoints', label: 'Anoints' },
        { id: 'glossar', label: 'Glossary' },
      ],
    },
    route: { path: '/crafting', component: lazy(() => import('./XileCraftingPage.jsx').then(m => ({ default: m.XileCraftingPage }))) },
  },
}

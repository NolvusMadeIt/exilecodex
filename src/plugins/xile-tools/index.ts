import { lazy } from 'react'
import { Regex } from 'lucide-react'

// Plugin: the Map Regex builder — compose the shortest in-game search regex for juicing
// Waystones (include/exclude mods, quality thresholds, saved presets). Engine is GPL-3.0
// from the XileHUD project (see ATTRIBUTION.md); the React wrapper and theming are ours.
// Fully client-side — works on web and desktop.
export default {
  id: 'xile-tools',
  name: 'Map Regex',
  description: 'Build the shortest in-game search regex for juicing Waystones — include/exclude mods, saved presets. Powered by XileHUD.',
  version: '1.0.0',
  author: 'XileHUD (engine) · Nolvus (port)',
  category: 'Tools',
  icon: Regex,
  core: false,
  enabledByDefault: true,
  desktopOnly: false,
  detail: {
    longDescription:
      'Pick the Waystone mods you want to see (and the ones you never want to run), set thresholds like '
      + 'quantity or delirium, and get the shortest regex that matches — paste it straight into the '
      + 'in-game search box. Save named presets per strategy. The regex engine comes from the '
      + 'open-source XileHUD overlay project (GPL-3.0), credited in-app, wearing this app\'s Exile theme.',
    changelog: [
      { version: '1.0.0', notes: 'Initial release — XileHUD map-regex engine vendored under GPL-3.0, rethemed; presets persist locally.' },
    ],
  },
  contributes: {
    nav: { group: 'main', label: 'Regex', order: 35 },
    route: { path: '/regex', component: lazy(() => import('./XileRegexPage.jsx').then(m => ({ default: m.XileRegexPage }))) },
  },
}

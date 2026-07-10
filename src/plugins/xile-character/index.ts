import { lazy } from 'react'
import { User } from 'lucide-react'

// Plugin: the Character reference — skill gems, keystones, ascendancy passives, atlas nodes
// and the campaign quest-rewards checklist. Engine and data are GPL-3.0 from the XileHUD
// project (see ATTRIBUTION.md); the React wrapper, theming and data adapter are ours.
// Web-capable: dataset-backed panels fetch static JSON; quest rewards are self-contained.
export default {
  id: 'xile-character',
  name: 'Character',
  description: 'Gems, keystones, ascendancy passives, atlas nodes and the campaign quest-rewards checklist.',
  version: '1.0.0',
  author: 'XileHUD (engine) · Nolvus (port)',
  category: 'Database',
  icon: User,
  core: false,
  enabledByDefault: true,
  desktopOnly: false,
  detail: {
    longDescription:
      'Everything about the character side of the grind, one tab away: every skill gem with its stats, '
      + 'every keystone and ascendancy passive, the atlas passive tree nodes, and a checklist of every '
      + 'permanent campaign reward (skill points, resistances, spirit) so you never leave one behind. '
      + 'The reference engine and curated datasets come from the open-source XileHUD overlay project '
      + '(GPL-3.0), credited in-app, wearing this app\'s Exile theme.',
    changelog: [
      { version: '1.0.0', notes: 'Initial release — five XileHUD character panels vendored under GPL-3.0, rethemed, fetch-based data adapter (works on web and desktop).' },
    ],
  },
  contributes: {
    nav: {
      group: 'main', label: 'Character', order: 34,
      items: [
        { id: 'gems', label: 'Gems' },
        { id: 'keystones', label: 'Keystones' },
        { id: 'ascendancy', label: 'Ascendancies' },
        { id: 'atlas', label: 'Atlas' },
        { id: 'quests', label: 'Quest Rewards' },
      ],
    },
    route: { path: '/character', component: lazy(() => import('./XileCharacterPage.jsx').then(m => ({ default: m.XileCharacterPage }))) },
  },
}

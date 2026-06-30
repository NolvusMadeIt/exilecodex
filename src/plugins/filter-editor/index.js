import { lazy } from 'react'
import { Code2 } from 'lucide-react'

// Plugin #1 — the Filter & Build Editor. Self-contained: it owns its page + settings panel and
// declares everything it contributes to the host (a nav item, a route, its own settings UI). The
// host renders these only while the plugin is enabled, so the app works fully with it turned off.
export default {
  id: 'filter-editor',
  name: 'Filter & Build Editor',
  description: 'A first-of-its-kind PoE2 filter + build/JSON coding IDE — full syntax highlighting and smart autocomplete.',
  version: '1.0.0',
  author: 'Nolvus',
  category: 'Editing',
  icon: Code2,
  core: false,            // plugin #1 — installed + active by default, but the user can deactivate
  enabledByDefault: true, //   or delete it; the app keeps generating/exporting filters without it.

  // Rich content for the WordPress-style detail view (Settings ▸ Plugins ▸ this plugin).
  detail: {
    longDescription:
      'Edit your filter directly in a full Monaco code editor — the same engine that powers VS Code — '
      + 'tuned for Path of Exile 2 loot filters. You get syntax highlighting for Show/Hide actions, '
      + 'condition keywords (Class, BaseType, Rarity…) and style commands, plus smart autocomplete that '
      + 'suggests filter keywords, valid values, and real item base-type names as you type. Your manual '
      + 'edits become the exported filter, and one click reloads from the visual builder whenever you want '
      + 'to go back. This is the foundation of the app’s plugin system — turn it off any time and the '
      + 'rest of the app keeps generating and exporting filters exactly as before.',
    screenshots: [
      { src: '/plugins/filter-editor/editor.png', caption: 'Live filter editing with PoE2 syntax highlighting and autocomplete' },
    ],
    changelog: [
      { version: '1.0.0', notes: 'Initial release as a plugin — the Editor is now a toggleable add-on with its own settings page.' },
    ],
  },

  contributes: {
    nav: { group: 'main', label: 'Editor', order: 60 },
    route: { path: '/editor', component: lazy(() => import('./EditorPage.jsx').then(m => ({ default: m.EditorPage }))) },
    settings: { component: lazy(() => import('./EditorSettingsPanel.jsx').then(m => ({ default: m.EditorPluginSettings }))) },
  },
}

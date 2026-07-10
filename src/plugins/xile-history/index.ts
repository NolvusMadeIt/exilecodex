import { lazy } from 'react'
import { ScrollText } from 'lucide-react'

// Plugin: Merchant History — your Currency Exchange trades with totals, grouping and the
// earnings chart. Renderer engine is GPL-3.0 from the XileHUD project (see ATTRIBUTION.md);
// the storage layer and the session/network transport are this app's own (the trade
// transport hardened for Price Check — XileHUD's session code is deliberately not used).
// Desktop-only: it needs your PoE session and the local store.
export default {
  id: 'xile-history',
  name: 'Merchant History',
  description: 'Your Currency Exchange trade history — searchable, grouped, with running totals and an earnings chart. Powered by XileHUD.',
  version: '1.0.0',
  author: 'XileHUD (engine) · Nolvus (port)',
  category: 'Market',
  icon: ScrollText,
  core: false,
  enabledByDefault: false, // needs a PoE session — opt in from the plugin manager
  desktopOnly: true,
  detail: {
    longDescription:
      'Every trade you make at the Currency Exchange, recorded and browsable: searchable history with '
      + 'smart grouping, running currency totals, and a cumulative earnings chart. Data comes from your '
      + 'own PoE account through this app\'s hardened trade transport (the same session that powers '
      + 'Price Check — sign in once, both work), respects GGG\'s rate limits, and is stored only on '
      + 'this device as one file per league. The history engine is from the open-source XileHUD '
      + 'overlay project (GPL-3.0), credited in-app, wearing this app\'s Exile theme.',
    changelog: [
      { version: '1.0.0', notes: 'Initial release — XileHUD history renderer vendored under GPL-3.0 over our own storage and transport.' },
    ],
  },
  contributes: {
    nav: { group: 'main', label: 'History', order: 33 },
    route: { path: '/history', component: lazy(() => import('./XileHistoryPage.jsx').then(m => ({ default: m.XileHistoryPage }))) },
  },
}

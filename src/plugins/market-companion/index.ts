import { lazy } from 'react'
import { TrendingUp } from 'lucide-react'

// Plugin #2 — the Market Companion (ported from the standalone PoE2 Marketplace Companion app).
// Faithful reproduction of the Companion's market view (MarketSummary banner + framed sortable
// currency table with category tabs, search, watch/alert controls + a resizable detail panel),
// served through the Supabase `market` edge function. The detail chart, watchlist page, and alert
// engine are the next increments. Uses its own ported zustand stores (settings/watch).
export default {
  id: 'market-companion',
  name: 'Market Companion',
  description: 'Live PoE2 currency market — prices, 24h change and volume from the Currency Exchange.',
  version: '1.0.0',
  author: 'Nolvus',
  category: 'Market',
  icon: TrendingUp,
  core: false,
  enabledByDefault: false, // opt-in: stays out of the nav until you activate it
  desktopOnly: true,       // live market runs from the desktop app
  detail: {
    longDescription:
      'The PoE2 Marketplace Companion, now a plugin. Track live currency prices for the current league — '
      + 'value in your chosen base currency (Exalted or Divine), 24-hour change, and trade volume — pulled '
      + 'from the official Currency Exchange via poe2scout. Click any currency to open a buy/sell exchange '
      + 'search. This v1 ships the currency market table; price charts, item appraisal, watchlists and alerts '
      + 'are coming as the port continues.',
    screenshots: [
      { src: '/plugins/market-companion/market.png', caption: 'Live currency market — prices, 24h change, volume' },
    ],
    changelog: [
      { version: '1.0.0', notes: 'Initial release — ported from the standalone Marketplace Companion app into the plugin system.' },
    ],
  },
  contributes: {
    nav: { group: 'main', label: 'Market', order: 80 },
    route: { path: '/market', component: lazy(() => import('./MarketRoot.tsx').then(m => ({ default: m.MarketRoot }))) },
  },
}

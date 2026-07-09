import { lazy } from 'react'
import { TrendingUp } from 'lucide-react'

// Plugin #2 — the Market Companion (ported from the standalone PoE2 Marketplace Companion app).
// Faithful reproduction of the Companion's market surface: the market view (MarketSummary banner +
// framed sortable currency table with category tabs, search, watch/alert controls + a resizable
// detail panel with price charts), the ★ Watchlist view (multiple named lists, portfolio value,
// JSON export/import), the alert engine (price-target toasts + chime), and the wiki "About" panel.
// Market data flows through the Supabase `market` edge function; wiki articles come straight from
// www.poe2wiki.net (CORS-enabled MediaWiki API). Uses its own ported zustand stores (settings/watch).
export default {
  id: 'market-companion',
  name: 'Market Companion',
  description: 'Live PoE2 currency market — prices, charts, watchlists and price alerts from the Currency Exchange.',
  version: '1.1.0',
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
      + 'from the official Currency Exchange via poe2scout. Click any currency for the full detail panel: '
      + 'candle/area price charts (24H·7D·30D·ALL), day stats, a transparent buy/sell/hold signal, and an '
      + '"About" tab with the live PoE2 Wiki article. Build named watchlists with a live portfolio value '
      + '(export/import as JSON), and set price alerts that fire a toast + chime the moment a target is '
      + 'crossed while the Market is open. Buy/Sell buttons deep-link every currency to the official exchange.',
    screenshots: [
      { src: '/plugins/market-companion/market.png', caption: 'Live currency market — prices, 24h change, volume' },
    ],
    changelog: [
      { version: '1.1.0', notes: 'Watchlists went live: multiple named lists, portfolio value and JSON export/import. Price alerts now actually fire (host toasts + volume-controlled chime). New "About" tab in the detail panel with the live PoE2 Wiki article, and a real settings panel (auto-refresh, alert sound, reset).' },
      { version: '1.0.0', notes: 'Initial release — ported from the standalone Marketplace Companion app into the plugin system.' },
    ],
  },
  contributes: {
    nav: { group: 'main', label: 'Market', order: 80 },
    route: { path: '/market', component: lazy(() => import('./MarketRoot.tsx').then(m => ({ default: m.MarketRoot }))) },
    settings: { component: lazy(() => import('./components/MarketSettings.tsx').then(m => ({ default: m.MarketSettings }))) },
  },
}

import { lazy } from 'react'
import { Coins } from 'lucide-react'

// Plugin #3 — Price Check (Exiled Exchange 2–style). Paste an in-game item; it parses the mods,
// builds a real trade search from the stats you keep, and prices it from the LIVE official PoE2
// trade — real listings only, with a sell verdict, in-demand stats, and reliability. The live
// search runs from the desktop shell with the user's session (POESESSID); the web build falls back
// to poe2scout. See docs/superpowers/specs/2026-06-28-price-check-plugin-design.md.
export default {
  id: 'price-check',
  name: 'Price Check',
  description: 'Appraise any item against the live PoE2 trade — real listings, in-demand stats, and a sell verdict.',
  version: '0.1.0',
  author: 'Nolvus',
  category: 'Market',
  icon: Coins,
  core: false,
  enabledByDefault: false, // opt-in: stays out of the nav until you activate it
  desktopOnly: true,       // live trade runs from the desktop app
  detail: {
    longDescription:
      'Price-check any Path of Exile 2 item the way Exiled Exchange 2 does. Paste a copied item and it '
      + 'parses every mod, lets you pick which stats to search by, and prices it from real listings on the '
      + 'official trade — never an invented number, always shown with how reliable the result is. It flags '
      + 'the stats buyers actually want, the value-driving "money-maker" mod, and whether the item is worth '
      + 'listing. Live trade runs locally from the desktop app using your own session; the web version falls '
      + 'back to poe2scout spot prices.',
    screenshots: [],
    changelog: [
      { version: '0.1.0', notes: 'Phase 1 — item parsing + the trade-search query panel.' },
    ],
  },
  contributes: {
    nav: { group: 'main', label: 'Price Check', order: 85 },
    route: { path: '/price-check', component: lazy(() => import('./PriceCheckRoot.jsx').then(m => ({ default: m.PriceCheckRoot }))) },
    settings: { component: lazy(() => import('./PriceCheckSettings.jsx').then(m => ({ default: m.PriceCheckSettings }))) },
  },
}

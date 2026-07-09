# poe2mpc → market-companion port notes

State of the port from the standalone PoE2 Marketplace Companion (`D:\Projects\poe2mpc`,
Next.js/React 19) into this plugin (Vite/React 18, host `poe-*` theme). Everything listed as
ported is live against its real data source — no stubs.

## Parity matrix

| poe2mpc surface | Status | Where it lives here |
| --- | --- | --- |
| Market view (summary banner, category tabs, search, sortable table, resizable detail) | ✅ ported | `MarketView.tsx` + `components/` |
| Price charts (candles/area, 24H·7D·30D·ALL) | ✅ ported | `components/PriceChart.tsx` |
| Per-currency page (`/market/[id]`: detail + wiki) | ✅ folded in | "ⓘ About" toggle in `components/CurrencyDetail.tsx` |
| Wiki article panel (poe2wiki.net) | ✅ ported | `components/WikiPanel.tsx` + `lib/wiki.ts` — called directly (MediaWiki `origin=*` CORS), no proxy needed |
| Wiki panel: poe2db tooltip half | ❌ needs backend | poe2db serves plain HTML, no CORS — see edge ops below |
| Watchlists (`/market/watchlist`: named lists, portfolio value, JSON export/import) | ✅ ported | `components/WatchlistView.tsx` (internal view switch — host mounts one route per plugin) |
| Price alerts (AlertEngine: target crossed → notify + chime) | ✅ ported | `components/AlertEngine.tsx`, set via `AlertEditor` in `CurrencyRow.tsx`; host toasts + WebAudio chime (`lib/sound.ts`) |
| Settings page (auto-refresh, alert sound/volume, reset, credits) | ✅ ported | `components/MarketSettings.tsx` via `contributes.settings` |
| `/api/market/*` routes | ✅ equivalent | Supabase `market` edge function via `src/lib/market/client.ts`; `quotes` shimmed client-side (`lib/quotes.ts`, see below) |
| spot-price-check sub-plugin (parse, tips) | ✅ merged | Crafting/selling tips ported into the host's own price-check plugin (`src/plugins/price-check/tips.js`) |
| User plugin editor/runner (`/plugins/[id]/edit`, PluginEditor, PluginRunner, source API) | ⏸ deliberately not ported | The host has its own WordPress-style plugin manager. In-app authoring of user JS plugins is a separate product decision — decide before porting, don't duplicate two plugin systems |
| App shell (SideNav, TopBar, Footer) | ⏸ deliberately not ported | Plugins wear the host shell/theme (house rule) |

## Edge-function ops the port still wants (do NOT ship client workarounds beyond these)

1. **`op=quotes`** — batch quotes: `{ league, base, ids: string[] }` → `{ rows: CurrencyRow[], divinePrice }`.
   Today `lib/quotes.ts` assembles quotes from the per-category `op=currencies` lists (cached 2 min
   client-side, shared with the market table). Note: `op=currency` (per-id) is NOT usable for this —
   poe2scout's per-item record carries no price (`CurrentPrice`/`PriceLogs` null, verified live);
   only the list endpoint has prices. When a batch op exists, `lib/quotes.ts` is the only file
   that changes.
2. **`op=wiki-tooltip`** — server-side fetch of the poe2db item page (plain HTML, no CORS) so the
   WikiPanel can regain the Companion's stat-tooltip half. Input: item/currency name; output:
   sanitized tooltip HTML or a parsed stat block.

## Host contribution point wanted

- **Background services.** The Companion ran AlertEngine app-wide from its root layout; here it
  only runs while the Market route is mounted (`MarketRoot.tsx`). A
  `contributes.background: { component }` (mounted for active plugins regardless of route) would
  let alerts fire anywhere in the app — and would also benefit other plugins.

# Attribution

PoE2 Champions is licensed under the **GNU General Public License v3.0** (see [LICENSE](LICENSE)).
Complete source code: https://github.com/NolvusMadeIt/nolvusfiltereditor

## XileHUD

Portions of this application — the item/modifier database modules under `src/xilehud/` and the
game data files under `public/xilehud/` — are derived from the
**[XileHUD](https://github.com/XileHUD/poe_overlay)** project, © the XileHUD contributors,
used under the terms of the GPL-3.0 license. Vendored files carry an origin banner and retain
their upstream history; modifications (theming to this app's design tokens, a fetch-based data
adapter replacing Electron IPC, React mounting) are noted in those banners and visible in this
repository's history.

The in-app Item Database and related modules display a "Powered by XileHUD" credit.

## ExileCompass

The window-frame visual style of this app is *inspired by* the look of
[ExileCompass](https://github.com/juddisjudd/exilecompass). No code or assets from that project
are included; the chrome components (`src/components/PoeFrame.jsx`) and the Exile theme palette
are original implementations.

## Grinding Gear Games

Path of Exile and Path of Exile 2 are trademarks of Grinding Gear Games. Item and game images
are loaded at runtime from Grinding Gear Games' public CDN (`web.poecdn.com`) and are not
redistributed with this application. This is an unofficial fan-made tool, not affiliated with
or endorsed by Grinding Gear Games.

## Data sources

- **poe2scout** — economy and price data (Market plugin)
- **PoE2 Wiki** (poe2wiki.net) — currency and item articles
- **TradingView lightweight-charts** — charting (Apache-2.0)

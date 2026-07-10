# Attribution

Exile Codex is licensed under the **GNU General Public License v3.0** (see [LICENSE](LICENSE)).
Complete source code: https://github.com/NolvusMadeIt/exilecodex

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

Path of Exile and Path of Exile 2 are trademarks of Grinding Gear Games. This is an unofficial
fan-made tool, not affiliated with or endorsed by Grinding Gear Games.

- The window/button UI textures under `public/assets/ui/` are Grinding Gear Games' game
  interface art (extracted game assets), © Grinding Gear Games, used here — as across the PoE
  fan-tool ecosystem — to give a game-companion tool the game's own look. They are not claimed
  as part of this project's GPL-licensed work and would be removed promptly on GGG's request.
- Item, currency and skill images are loaded from Grinding Gear Games' public CDN
  (`web.poecdn.com`) or cached locally from it.

## Data sources

- **poe2scout** — economy and price data (Market plugin)
- **PoE2 Wiki** (poe2wiki.net) — currency and item articles
- **TradingView lightweight-charts** — charting (Apache-2.0)

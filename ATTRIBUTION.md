# Attribution

Exile Codex is licensed under the **GNU General Public License v3.0** (see [LICENSE](LICENSE)).
Complete source code: https://github.com/NolvusMadeIt/exilecodex

## XileHUD

The bundled PoE2 game-data files under `app/media/gamedata/` (item, modifier, currency, essence,
omen and base data) and the crafting-bench icon set under `app/media/gamedata/crafting/` were
sourced from the **[XileHUD](https://github.com/XileHUD/poe_overlay)** project, © the XileHUD
contributors, and are used under the terms of the GPL-3.0 license. The icons are copied locally
(not hotlinked); our own work (theming, a fetch-based data adapter, and the Lua/Bootstrap
re-implementation of the data views) is visible in this repository's history.

The in-app About screen credits XileHUD as one of the sources of this bundled game data.

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
- Item, currency and skill images are Grinding Gear Games' game art, sourced from GGG's public
  CDN (`web.poecdn.com` / `cdn.poe2db.tw`) — either loaded from it or cached/vendored locally
  (e.g. the crafting-bench icons under `app/media/gamedata/crafting/`, via XileHUD's asset bundle).
  They are not claimed as part of this project's GPL-licensed work and would be removed promptly
  on GGG's request.

## Typography

Headings and window titles are set in **Fontin / Fontin SmallCaps** by
[Jos Buivenga (exljbris Font Foundry)](https://www.exljbris.com) — the typeface Path of Exile
itself uses. The fonts are free for commercial use and are embedded via `@font-face` under the
[exljbris free-font license](https://www.exljbris.com/eula.html), with the required notice in
`src/index.css`. The font files under `public/assets/fonts/` are © Jos Buivenga, are **not**
part of this project's GPL-licensed work, and would be removed promptly on the foundry's
request. Body text is [Inter Tight](https://github.com/googlefonts/inter) (OFL, via @fontsource).

## Data sources

- **poe2scout** — economy and price data (Market plugin)
- **PoE2 Wiki** (poe2wiki.net) — currency and item articles
- **TradingView lightweight-charts** — charting (Apache-2.0)

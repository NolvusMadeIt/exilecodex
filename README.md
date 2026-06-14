# Nolvus's Filter — PoE2 Loot Filter Editor

A visual, dropdown-driven loot-filter generator for **Path of Exile 2**. Pick a preset,
fine-tune with image dropdowns (no syntax typing), set how drops look and sound, preview
it as real in-game labels, and export a `.filter` you can drop straight into the game.

Built as a faithful, own-branded take on the poe2filter.com workflow — visual first, so
newcomers can build a working filter without learning filter syntax.

## Available two ways

- **Web app** — hosted on Netlify (built from this repo).
- **Windows desktop app** — a thin native shell around the same build (see `electron/`).

## The tabs

1. **Presets** — pick your class + where you are in the game; sensible defaults everywhere.
2. **Quick Filters** — toggle what shows/hides via grouped image dropdowns.
3. **Tier Lists** — rank currency & uniques by value; higher tiers get stronger highlights.
4. **Custom Rules** — your own Show/Hide rules (highest priority), still dropdown-driven.
5. **Cosmetic** — text colour, beams, minimap icons, and drop sounds per value tier.
6. **Preview** — see it rendered as real item labels over a game scene, then export.

Plus **How to Use** (illustrated walkthrough), **Settings** (3 themes, league/version meta,
top/bottom comments), and a **Changelog**. A `(?)` legend explains every symbol.

## Develop

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # → dist/
npm test           # vitest
```

Tech: Vite + React 18 + Tailwind CSS 3, lucide-react icons, vitest. Hash router so filter
state survives tab switches. Real PoE2 item icons (CDN), fonts, and alert sounds.

## Windows desktop app

The desktop build wraps the web app in an Electron shell. See [`electron/README.md`](electron/README.md).

```bash
npm run build          # build the web app first
npm run electron       # run the desktop shell against the build
npm run dist:win       # package a Windows installer → release/
```

## Export & use in-game

Export a `.filter` from the bottom bar, drop it in
`Documents\My Games\Path of Exile 2\`, then select it in-game under
**Options → Game → Loot Filter**. Output is standard PoE2 filter syntax and is
NeverSink / Filterblade import-compatible.

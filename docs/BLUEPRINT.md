# ExileCodex 2.0 — the Lua/Bootstrap rewrite

The WoW-addon experience (Zygor's pinned guide viewer, Dugi's plugins-in-one-frame,
RestedXP's community guides) rebuilt for Path of Exile 2. Clean slate. The old
React/Vite app lives in `concept1/` — **reference only, never import from it**.

## What is "ExileCodex core"?

The core is the shell — the equivalent of the WoW client that addons plug into.
**The UI is a widget desktop, not a web page**: the core renders only a floating
menu dock; every plugin opens as its own draggable, collapsible, closable widget
frame (position remembered per widget). The core owns:

1. **The window + theme** — Bootstrap 5 with the PoE2 dark/gold skin (`app/client/ui/`).
2. **The Lua engine** — fengari runs every plugin and guide as real Lua, like WoW addons (`app/client/lua/core/`).
3. **The widget engine** — floating frames, dragging, z-order, layout persistence (`app/client/lua/core/widgets.lua`).
4. **The plugin host** — registry + the menu dock (`app/client/lua/core/registry.lua`, `init.lua`).
5. **The guide engine** — the `step{}` DSL, tabbed viewer, image-linked words with
   hover-preview / click-to-pin / rotate (`app/client/lua/core/guide.lua`).
6. **Core services (desktop shell)** — Client.txt watcher (smart detection), overlay
   windows, clipboard, plugin install/update (`app/client/electron/`).

**The Market is not the core — it's the flagship plugin.** If the core were the
market, everyone who only wants leveling guides drags the market along, and the
installer's "core + optional plugins" model breaks. Instead: *the default screen is
a setting.* Settings → "Default screen on launch" → pick Market Companion and the
app opens on the market every time. Best of both.

## Architecture

- **Shell:** Electron (thin). Serves the repo over loopback HTTP and hosts the
  native services. `npm run app` (after full `npm install`).
- **UI:** Bootstrap 5.3 + custom PoE2 theme. No React, no bundler. `app/client/ui/index.html`
  is the "TOC file" — it lists every Lua file in load order, exactly like a WoW
  addon `.toc`.
- **Logic:** Lua 5.3 via fengari-web. Global `codex` API: `codex.ui`,
  `codex.registry`, `codex.guide` (grows: `codex.game`, `codex.overlay`,
  `codex.http`, `codex.storage`).
- **Plugins:** one folder each under `app/addons/<id>/` with a `plugin.lua` that calls
  `codex.registry.register{...}`. Guides are plain Lua files using the `step{}` DSL.
- **Dev:** `npm run dev` → http://localhost:4400/app/client/ui/ in any browser (everything but
  the native services works there).

## Layout

Laid out like a WoW install: the client is one folder, addons plug in next to it,
media is the shared art archive. Nothing app-related sits loose at the repo root.

```
app/                     the "game folder" — everything that ships
  client/                the client (WoW.exe equivalent)
    electron/            desktop shell (main.cjs, preload.cjs)
    ui/                  shell page, theme, vendor bundles (generated — gitignored)
    lua/core/            ui.lua · registry.lua · guide.lua · init.lua
  addons/<id>/           plugins, WoW AddOns-style (plugin.lua + guides/ each)
  media/                 all shared art (maps, icons, fonts, sounds, brand…)
docs/                    this blueprint
scripts/                 repo tooling (vendor copy)
concept1/                the old app — reference only (gitignored)
```

Dev URL: http://localhost:4400/app/client/ui/ (the root URL redirects there).

## Image reorganization (from concept1)

| New home            | Came from                                  | What it is |
|---------------------|--------------------------------------------|------------|
| `app/media/maps/`      | `public/data/poe2/campaign-maps/` (87)     | zone maps used by guides |
| `app/media/game-img/`  | `public/img/` (501, hash-named — do not rename) | item/currency art for DB, price check |
| `app/media/icons/`     | `public/icons/` (incl. `poe2/` gems, currency) | UI + game icons |
| `app/media/ui/`        | `public/assets/ui/`                        | PoE frame/border art |
| `app/media/fonts/`     | `public/assets/fonts/` (Fontin)            | the PoE font |
| `app/media/sounds/`    | `public/sounds/`                           | filter alert sounds |
| `app/media/brand/`     | `landing/img/` + `public/*.png`            | logos, wordmark, promo shots |
| `app/media/gamedata/`  | `public/gamedata/`                         | bundled game data |

## Plugin roster (all 10 ported from concept1)

| Plugin | Status | Old source |
|--------|--------|-----------|
| Campaign Guide | **alpha — running** (act 1 in the new DSL; leveling-mode pills + detection status attached to the widget) | `src/plugins/campaign-guide` |
| Guide Forge | **alpha — running** (create/save/open custom guides; Supabase publish in community phase) | new |
| Market Companion | stub | `src/plugins/market-companion` |
| Price Check | stub | `src/plugins/price-check` |
| Filter & Build Editor | stub | `src/plugins/filter-editor` |
| Item Database | stub | `src/plugins/items` |
| Modifiers | stub | `src/plugins/modifiers` |
| Crafting | stub | `src/plugins/crafting` |
| Character | stub | `src/plugins/character` |
| Map Regex | stub | `src/plugins/tools` |
| Merchant History | stub | `src/plugins/history` |

## Phases

1. **Skeleton (this commit)** — shell, Lua engine, guide viewer with act 1,
   hover/pin/rotate images, plugin manager + settings pages, stub roster.
2. **Guide compiler** — generate act 1–6 Lua guides from `concept1`'s
   `campaign.json`/`speedrun.json`; leveling modes (first/league/alt) as filters.
3. **Desktop shell services** — Client.txt watcher → `codex.game` events
   (zone/level/act), auto-advance steps; overlay window (the Waypoint concept).
4. **Plugin ports** — Market Companion first (flagship), then Price Check,
   Item DB, the rest.
5. **Guide Forge** — the form editor (step text, image linking), import/export,
   community sharing (Supabase backend already exists).
6. **Installer** — Concept A: install/update/uninstall core + plugins.

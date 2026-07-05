# Nolvus Filter

**A visual loot-filter studio for Path of Exile 2 — build a filter you can *see*, not a file you have to type.**

**▶ Live:** [nolvusfiltereditor.vercel.app](https://www.poe2champions.xyz)

Nolvus Filter turns loot-filter creation into a workstation experience: pick a starting point, tune what drops and how it looks through image dropdowns and sliders, watch the real `.filter` build itself live, then export and play. No syntax to memorise, no wall of raw text — every control is wired to a clean, in-game-valid filter.

![Nolvus Filter — the studio](docs/screenshots/studio.png)

## Why Nolvus Filter

- **Visual first.** Choose item types from dropdowns with real PoE2 art. You never write a `Class ==` line by hand unless you want to.
- **A real workstation.** A left nav rail, a top action bar, and a docked live-output panel — your filter is always in view while you edit.
- **Instant, honest output.** The right-hand panel regenerates valid PoE2 filter syntax on every change. What you see is exactly what loads in-game.
- **Yours to theme.** Three hand-tuned dark themes (Ember, Abyss, Arcane) with a sharp, angular, game-native look.
- **Two ways to run it.** Use it on the web, or install the standalone **Windows desktop app** — same studio, offline-capable, with its own frameless window and system-tray icon.
- **Built for in-game use.** The desktop app pins the studio on top of Path of Exile 2 (Borderless) and slides in/out with a hotkey — no alt-tabbing. It's multi-monitor aware, so the overlay appears on the screen you're actually playing on.
- **Plays well with others.** Import any standard PoE2 `.filter` file and keep editing; unknown directives are preserved on round-trip.

## The studio

| Section | What it does |
|---|---|
| **Presets** | Pick your class and where you are in the game; sensible defaults are applied everywhere. |
| **Quick Filters** | Toggle and tune what shows or hides through grouped image dropdowns. |
| **Tier Lists** | Rank currency and uniques by value — higher tiers get stronger highlights. |
| **Custom Rules** | Your own Show/Hide rules at the highest priority, still dropdown-driven. |
| **Cosmetic** | Text colour, beams, minimap icons, and drop sounds per value tier — audition each sound. |
| **Preview** | See your filter rendered as real in-game item labels over a scene, then export. |

Plus a **How to Use** walkthrough, **Settings** (themes, league/version, custom comments, game overlay), a **Changelog**, and an in-app legend that explains every symbol.

### A look around

**Quick Filters** — toggle and tune what shows or hides through grouped image dropdowns:

![Quick Filters](docs/screenshots/quick-filters.png)

**Cosmetic** — text colour, beams, minimap icons and drop sounds per value tier:

![Cosmetic styling](docs/screenshots/cosmetic.png)

**Preview** — your filter rendered as real in-game item labels, plus a "Will this drop show?" tester:

![Preview & drop tester](docs/screenshots/preview.png)

## Develop

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # → dist/
npm test           # vitest
```

Built with Vite + React 18, Tailwind CSS, and MUI (themed, not stock). Hash router so filter state survives tab switches. Real PoE2 item art, fonts, and alert sounds.

## Windows desktop app

The desktop build wraps the same web app in a native Electron shell that serves the bundled build locally (works offline). It adds a custom frameless window, a system-tray icon, and an **in-game overlay**: enable it in Settings → Game Overlay, then dock the studio to the left or right edge (~38% wide, ~90% tall) on top of Path of Exile 2 in Borderless mode and slide it in/out with a hotkey (default **Shift+Alt+F**). On a multi-monitor setup, leave the display on "Auto" and the overlay follows the screen your mouse — and your game — is on. See [`electron/README.md`](electron/README.md).

```bash
npm run build          # build the web app first
npm run electron       # run the desktop shell against the build
npm run make:icon      # regenerate build/icon.ico from the logo (electron/icon.png)
npm run dist:win       # package a Windows installer → release/
```

## Export & use in-game

Export a `.filter` from the top bar, drop it in
`Documents\My Games\Path of Exile 2\`, then select it in-game under
**Options → Game → Loot Filter**. Output is standard PoE2 filter syntax.

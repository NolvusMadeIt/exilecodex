// Static, hand-maintained changelog feed (Bluetracker-style layout).
// Newest first. Edit this file to publish a new entry.
export const CHANGELOG = [
  {
    date: '2026-06-29',
    tag: 'Plugins',
    title: 'Nolvus Filter v0.17.0 — Campaign Mode + Speedrun Mode, pop-out overlays & downloadable plugins',
    body: [
      'The Campaign Guide is now Campaign Mode: a zone-by-zone walkthrough with a real layout map for nearly every zone (Acts 1–4 plus the Interlude). Hover any zone name to preview its map, and on desktop it auto-detects the zone you’re in from the game log, follows you as you play, and remembers your Client.txt location.',
      'New Speedrun Mode: a lean, do-this-only critical-path route (optional steps and loot hidden) with a pre-run Prep checklist, plus a live run timer that runs while you’re in a zone and pauses in town/hideout or when you’re idle — completed runs are saved with splits, deaths and your time. Start, Pause, Stop and Reset are rebindable global hotkeys.',
      'Any plugin can now pop out as a separate always-on-top overlay window over the game, with an adjustable transparency slider and a global toggle hotkey.',
      'Plugins can now be downloaded as packages from Settings ▸ Plugins.',
    ],
  },
  {
    date: '2026-06-29',
    tag: 'Plugins',
    title: 'Nolvus Filter v0.16.0 — Price Check & Campaign Guide plugins',
    body: [
      'New plugin — Price Check: paste an item from Path of Exile 2 and get its live sell price straight from the official trade site, with values shown as the real currency orb icons. On desktop the prices come through your own logged-in trade session.',
      'New plugin — Campaign Guide: a zone-by-zone leveling route for every act (1–4) plus the Interlude — the ordered path between zones, each boss and quest objective, gem and passive rewards, optional pickups, and a checkbox on every step that’s remembered across sessions.',
      'Campaign Guide auto-tracking (desktop): it reads your game log to detect the zone you’re in, jumps to the matching act, and ticks off the route as you play. Set it up under Settings ▸ Plugins ▸ Campaign Guide.',
    ],
  },
  {
    date: '2026-06-28',
    tag: 'Desktop',
    title: 'Nolvus Filter v0.15.2 — the window remembers your size, and opens wider',
    body: [
      'The desktop window now remembers exactly the size and position you leave it at — resize it once to your liking and it reopens that way every time (including maximized).',
      'On a fresh install it now opens wide by default (about 92% of your screen), instead of the narrower fixed size in the previous build.',
    ],
  },
  {
    date: '2026-06-28',
    tag: 'Desktop',
    title: 'Nolvus Filter v0.15.1 — comfier window size & a smoother minimize',
    body: [
      'The desktop app now opens at a more comfortable, slightly taller window size (and stays centered on your screen) instead of the old extra-wide default.',
      'Minimizing now “draws in” — the window fades away in place and fades back when you reopen it, rather than dropping down to the taskbar.',
    ],
  },
  {
    date: '2026-06-28',
    tag: 'Release',
    title: 'Nolvus Filter v0.15.0 — plugins arrive, and a live PoE2 currency market',
    body: [
      'The app now has a plugin system. Add-ons can be turned on or off from Settings ▸ Plugins, each with its own info page and settings — so you only run what you want.',
      'The Filter Editor is now a plugin (it’s the first one). It works exactly as before, but if you never touch the code editor you can switch it off and the rest of the app keeps working.',
      'New plugin — Market: a live Path of Exile 2 currency market. Browse every currency by category, search and sort, and price everything in Exalted or Divine for your league.',
      'Each currency opens a detailed view with an interactive price chart (24h / 7d / 30d / all), day open & latest, 24h high/low, 7- and 30-day moves, amount traded and amount listed.',
      'New buy / sell signal: each currency gets a plain-English read of its recent price action — Strong Buy through Strong Sell — with the reasons spelled out, so it’s a transparent guide, not a black box. One-click links jump straight to buying or selling on the official Currency Exchange.',
    ],
  },
  {
    date: '2026-06-28',
    tag: 'Fix',
    title: 'Nolvus Filter v0.14.3 — never let a Unique break your filter',
    body: [
      'Fixed a filter that could fail to load in-game ("No base types found exactly matching…") when Uniques were placed on the Tier List and their base types hadn’t finished loading — every tiered Unique would get written as a raw name the game can’t match, which rejects the whole filter.',
      'The generator is now hardened so this can never happen: a name is only ever written as a BaseType rule if it’s a confirmed base type, or a Unique that resolves to its base type plus Rarity Unique. Anything it can’t confirm is skipped instead of breaking the file.',
      'Result: your tiered Uniques highlight correctly by base type + Rarity Unique, and even in the worst case the filter always loads.',
    ],
  },
  {
    date: '2026-06-28',
    tag: 'Fix',
    title: 'Nolvus Filter v0.14.2 — Filter Output reliably syncs again',
    body: [
      'Fixed the Filter Output staying frozen no matter what you changed: a leftover “manual edit” lock from an earlier version was overriding the live filter on every page. That lock is now cleared automatically, so the output rebuilds the moment you change anything in the Quick Editor, Tier List, Cosmetic or rules.',
      'The output panel now shows a small “Manual” badge with a one-click “Use live” whenever you’re viewing a hand-edited filter — so it can never silently freeze on you again.',
    ],
  },
  {
    date: '2026-06-28',
    tag: 'Fix',
    title: 'Nolvus Filter v0.14.1 — live output fixes, cleaner top bar & always-latest desktop app',
    body: [
      'Fixed the live Filter Output not updating: opening the Editor tab could quietly switch the filter into “manual” mode and freeze the output. Now only your own edits do that, and any filter stuck that way unsticks itself.',
      'Removed the theme swatches from the top bar (themes still live in Settings) and tidied the bar.',
      'Fixed the latest patch notes (0.5.4) failing to load — the full notes are now bundled and read in-app like every other patch.',
      'Desktop app now shows the latest version automatically: it loads the live site so web updates appear without reinstalling, and falls back to the built-in offline copy if you’re not connected. An app update is now only needed when the desktop shell itself changes.',
    ],
  },
  {
    date: '2026-06-28',
    tag: 'Release',
    title: 'Nolvus Filter v0.14.0 — Quick Editor rebuilt for parity, and one home for everything you hide',
    body: [
      'Quick Editor rebuilt to match the layout exiles already know from the most popular quick-filter tool — the same categories and groups: Campaign, Flasks & Charms, Currency, Uniques & Chance Bases, Other Items, My Equipment (Weapons / Armour / Jewellery / Jewels) and Other Equipment (Unidentified, Identified, Crafting Bases, Special). Every control is wired to a real Show/Hide rule.',
      'New dedicated “Hide” category: everything you want gone now lives in one place — currency, gems, flasks & charms, and leftover jewellery/jewels by rarity — so it’s finally obvious what’s being hidden and what isn’t. Hide controls no longer sit scattered through the show-oriented categories.',
      'Removed the blunt “Hide All Remaining …” sweeps in favour of clear, specific hides you choose.',
      'Uniques highlight by value tier (Excellent / Good / Potential) straight from your Uniques Tier List, resolved to the correct base type so the game always accepts them.',
      'Smarter build import: importing a .build now switches on the valuable-unique highlights too, and every choice it makes stays visible and editable in the Quick Editor.',
      'Includes the v0.13.x fixes: the Tier List unique parse fix, auto-seeded unique tiers, the wider desktop window, the Nolvus PoE Filter IDE (direct filter editing with highlighting & autocomplete), and tracking Path of Exile 2 0.5.4.',
    ],
  },
  {
    date: '2026-06-26',
    tag: 'Release',
    title: 'Nolvus Filter v0.13.2 — Tier List unique fix, auto-tiered uniques & a wider window',
    body: [
      'Fixed a filter that could fail to load in-game ("No base types found exactly matching…") when a Unique was placed on the Tier List — uniques now match correctly by their base type plus Rarity Unique, since the game can’t match a unique by name.',
      'The Uniques Tier List now auto-seeds sensible starting tiers for well-known valuable uniques, so it’s useful out of the box without manual setup — and it’s still fully editable, your moves always win.',
      'Made the desktop window a bit wider.',
    ],
  },
  {
    date: '2026-06-26',
    tag: 'Release',
    title: 'Nolvus Filter v0.13.1 — now tracking Path of Exile 2 0.5.4',
    body: [
      'Updated the tracked game version to Path of Exile 2 0.5.4 (Return of the Ancients) — it was a patch behind.',
      'Added the 0.5.4 patch notes and its hotfixes to the Patch Notes page, and marked it as the current patch.',
      'Tidied the game-version display in Settings.',
    ],
  },
  {
    date: '2026-06-26',
    tag: 'Release',
    title: 'Nolvus Filter v0.13.0 — Nolvus PoE Filter IDE, smarter build import & a rebuilt Quick Editor',
    body: [
      'New Editor tab — the Nolvus PoE Filter IDE: edit your filter directly with full syntax highlighting and smart autocomplete that suggests filter keywords, values and real item names as you type. It has its own toolbar and a settings panel (word wrap, minimap, line numbers, font size, indentation, cursor, render whitespace and more) plus an editor-size/fullscreen control and a status bar showing line, column and character counts.',
      'Manual edits in the editor become your exported filter, with one-click "Regenerate from builder" to drop them and return to the live, builder-generated filter.',
      'Quick Editor rebuilt much deeper: full nested categories and groups — Campaign (auto-scaling leveling + disenchant/salvage), Flasks & Charms, Currency, Uniques & Chance Bases, Other Items, My Equipment and Other Equipment — with dozens of new controls, each wired to real Show/Hide rules.',
      'Smart build import: load a Path of Exile 2 .build and the app auto-creates a tailored, fully editable filter from it — your class weapons, attribute-matched armour, gems and more — ready to tweak and export.',
      'Balanced two-column Quick Editor layout, long base-type lists now collapse neatly, and new filters start as "MyNewFilter.filter".',
    ],
  },
  {
    date: '2026-06-24',
    tag: 'Release',
    title: 'Nolvus Filter v0.12.2 — read patch notes in-app',
    body: [
      'Patch Notes are now read right inside the app — no more bouncing to the forum. Every patch from Early Access (0.1.0) to the current 0.5.3 has its notes bundled and loaded on demand, so it’s fast and works offline.',
    ],
  },
  {
    date: '2026-06-24',
    tag: 'Fix',
    title: 'Nolvus Filter v0.12.1 — Quick Editor dropdowns are back + much faster',
    body: [
      'Brought back the dropdown Quick Filters (Currency, Gems, Flasks, Equipment and more) — now wired to layer real Show/Hide rules on top of your preset.',
      'Big performance pass: the live Filter Output is hidden until you open it and only builds while visible, so clicking tabs, controls and links is snappy again.',
      'Importing a .filter now drops its rules straight into the Quick Editor’s hide/highlight builder, ready to edit.',
    ],
  },
  {
    date: '2026-06-24',
    tag: 'Release',
    title: 'Nolvus Filter v0.12 — Patch Notes',
    body: [
      'New Patch Notes page: browse every Path of Exile 2 patch from Early Access (0.1.0) to the current 0.5.3. Pick a version and jump straight to the official notes — with the full hotfix history for the current season.',
      'Updated the tracked game version to Path of Exile 2 0.5.3.',
    ],
  },
  {
    date: '2026-06-24',
    tag: 'Fix',
    title: 'Nolvus Filter v0.11.2 — update checks',
    body: [
      'Checking for updates no longer shows a technical error when there’s nothing new — it now simply tells you you’re on the latest version.',
      'Added a “Check for updates” button (with your current version) on the Settings page.',
      'Update downloads and the desktop download link now come from the public releases page.',
    ],
  },
  {
    date: '2026-06-24',
    tag: 'Release',
    title: 'Nolvus Filter v0.11 — presets that actually work, a new Quick Editor & auto-updates',
    body: [
      'Rebuilt on complete, in-game-ready core filters. Strictness presets (Soft → Uber-Plus Strict) and styles now load a real, battle-tested ruleset — pick one and it just works.',
      'New Style picker: Default, Aura, Cobalt, Dark Mode, Mythic, Vaal, Zen and Custom Sounds.',
      '“Quick Filters” is now the Quick Editor — hide or highlight anything by class, base type, rarity, item level, quality, sockets, stack size and more. Your edits sit on top of the preset and always win in-game.',
      'Class-aware gear: pick the weapon and armour types you use, and off-build drops get hidden automatically.',
      'Tier List, Cosmetic and Custom Rules now layer cleanly on top of your chosen preset.',
      'Auto-updates (desktop app): when a new version is ready you’ll get a prompt in the bottom-left showing the current and new version — update now, or later.',
      'Expanded system-tray menu: open the app, jump to Settings, check for updates, open Discord, or quit.',
    ],
  },
  {
    date: '2026-06-16',
    tag: 'Release',
    title: 'Nolvus Filter v0.10.1 — join the Discord',
    body: [
      'Added a Discord button in the sidebar — come share filters, ask questions and suggest features.',
      'New landing page for the project with screenshots and downloads.',
    ],
  },
  {
    date: '2026-06-16',
    tag: 'Release',
    title: 'Nolvus Filter v0.10 — game overlay & a face of its own',
    body: [
      'New Nolvus logo across the app, the desktop window, the taskbar icon, the installer and a new system-tray icon.',
      'Game overlay (desktop app): pin the studio on top of Path of Exile 2 in Borderless mode and slide it in/out with a hotkey — default Shift+Alt+F — without alt-tabbing. The panel docks to the left or right edge, ~38% of your screen wide and ~90% tall, so the game stays visible beside it.',
      'Smooth slide-and-fade animation tuned to stay light, and to never bleed onto a second monitor.',
      'Multi-monitor aware: pick which screen the overlay uses, or leave it on “Auto” and it appears on whichever screen your mouse — and your game — is on.',
      'System-tray icon to show the window, toggle the overlay, or quit.',
      'Web visitors get a slim banner pointing to the desktop app for the in-game overlay (dismissible).',
    ],
  },
  {
    date: '2026-06-15',
    tag: 'Release',
    title: 'Nolvus Filter v0.9 — test it before you play',
    body: [
      'New “Will this drop show?” tester on the Preview page: paste any in-game item (Ctrl+C) and see exactly what your filter does with it — Shown or Hidden, the real in-game label, which rule decided it, and a “Why?” breakdown of every rule it matched.',
      'One-click “Check valuable drops” confirms the chase items (Mirror, Divine, Exalted…) can’t slip past your filter.',
      'Custom Rules: paste a copied item to build a rule straight from its Class, Base Type & Rarity — no typing, drag-and-drop a .filter works too.',
      'More Quick Filters: hide small gold piles, highlight Rare jewellery, and always show high-item-level rare crafting bases.',
      'The app now remembers your last tab, output-panel layout, open sections and Preview settings — it looks the way you left it.',
    ],
  },
  {
    date: '2026-06-15',
    tag: 'Release',
    title: 'Nolvus Filter v0.8 — Community & a smarter start',
    body: [
      'New Community page: share the filter you’ve built, or browse, download, copy, and load filters from other exiles.',
      'Share two ways — publish your live filter with its editable settings, or paste / drag-and-drop a raw .filter file. Name, author and description required.',
      'Start your filter your way: begin from a blank slate, import an existing .filter / .json, or pick a preset. The same choices appear from “Create New”.',
      'Your look now follows you — theme, typeface and text size are saved, with new font and text-size options in Settings.',
      'Refreshed the How to Use guide for the Community page and the new start options, and added a themed Path of Exile 2 404 page.',
    ],
  },
  {
    date: '2026-06-15',
    tag: 'Release',
    title: 'Nolvus Filter v0.7.2 — fresh type & polish',
    body: [
      'New typography across the whole app for a cleaner, friendlier feel.',
      'Fixed the Mana Flask icon in Quick Filters (it was showing the life-flask art).',
      'Added anonymous usage analytics on the web app.',
    ],
  },
  {
    date: '2026-06-14',
    tag: 'Release',
    title: 'Nolvus Filter v0.7.1 — fully self-contained',
    body: [
      'Every icon and image is now bundled with the app — quicker to load and works completely offline.',
      'No external calls anywhere: league and version data ship with the build.',
    ],
  },
  {
    date: '2026-06-14',
    tag: 'Release',
    title: 'Nolvus Filter v0.7 — the Filter Studio',
    body: [
      'Rebuilt as a workstation: a left navigation rail, a slim top action bar, and a docked live-output panel that stays in view while you edit.',
      'Sharper, game-native look — angular paneling, refined type, and a themed interface across all three themes (Ember / Abyss / Arcane).',
      'Fixed the filter legend (now layers above everything) and corrected the currency group icons (Shards, Runes & Soul Cores, Catalysts, Essences, Omens).',
    ],
  },
  {
    date: '2026-06-14',
    tag: 'Release',
    title: "Nolvus's Filter v0.6 — guide, polish & desktop app",
    body: [
      "New \"How to Use\" tab: an illustrated, step-by-step walkthrough of every tab so first-timers know exactly what to do.",
      "Checkboxes now show a proper checkmark instead of a solid colour fill — clearer at a glance across every dropdown.",
      "Now available two ways: the web app (hosted on Vercel) and a Windows desktop app that wraps the same build.",
    ],
  },
  {
    date: '2026-06-13',
    tag: 'Release',
    title: "Nolvus's Filter v0.5 — full rebuild",
    body: [
      "Six focused pages: Presets, Quick Filters, Tier Lists, Custom Rules, Cosmetic, and Preview.",
      "Image dropdowns with real PoE2 item icons. Live .filter output everywhere. Multi-filter management with import/export.",
      "Settings page with three themes (Ember / Abyss / Arcane), editable filter meta (league + version), and custom top/bottom comments.",
      "Bluetracker-style changelog (this page). Help legend modal accessible from the (?) icon in the top right.",
    ],
  },
  {
    date: '2026-06-13',
    tag: 'Imports',
    title: 'Import compatibility',
    body: [
      'The Import button now parses any standard PoE2 .filter file into editable custom rules.',
      'Unknown directives are preserved verbatim so round-tripping never silently drops data.',
    ],
  },
  {
    date: '2026-06-12',
    tag: 'Foundation',
    title: 'New foundation + reverse-engineered data layer',
    body: [
      "Replaced the old generic rule editor with a purpose-built, visual filter workflow.",
      "Pulled in the live item catalogs (566 gear, 458 uniques, 332 currency, jewellery & flask) and the real PoE2 fonts.",
      "Settings object lives above the router so tab switching never wipes your filter.",
    ],
  },
]

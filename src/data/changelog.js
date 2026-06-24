// Static, hand-maintained changelog feed (Bluetracker-style layout).
// Newest first. Edit this file to publish a new entry.
export const CHANGELOG = [
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

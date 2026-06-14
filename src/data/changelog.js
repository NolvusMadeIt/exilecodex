// Static, hand-maintained changelog feed (Bluetracker-style layout).
// Newest first. Edit this file to publish a new entry.
export const CHANGELOG = [
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
      "Now available two ways: the web app (hosted on Netlify) and a Windows desktop app that wraps the same build.",
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
    title: 'NeverSink / Filterblade compatibility',
    body: [
      'The Import button now parses any standard .filter file — including NeverSink and Filterblade exports — into editable custom rules.',
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

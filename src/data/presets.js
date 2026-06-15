// Presets, classes, and endgame-content options for the Presets page.
// Item art is bundled locally under /public/img.
export const IMG = '/img'

// The 6 game-stage presets. `blurb` for Early Endgame is fixed editorial copy;
// the others describe the same stage (refine to verbatim in a later pass).
export const PRESETS = [
  {
    id: 'campaign', name: 'Campaign', level: 'Level 1', tier: 6,
    img: `${IMG}/presets/presetEarlyCampaign1.webp`,
    blurb: "You're leveling through the campaign. Show usable gear, weapons and armour for your class, all currency, and gems. Clutter from off-build items is hidden.",
    endgame: false,
  },
  {
    id: 'interludes', name: 'Interludes', level: 'Level 55', tier: 5,
    img: `${IMG}/presets/interludes.webp`,
    blurb: "Between acts and early maps. You still want most gear and currency, but low-value clutter starts getting hidden as drops pick up.",
    endgame: false,
  },
  {
    id: 'progressingMaps', name: 'Progressing Maps', level: 'Level 70', tier: 4,
    img: `${IMG}/presets/presetProgressingMaps70.webp`,
    blurb: "You're running early maps. Focus on rare gear with good bases, waystones, and mid-tier currency. Normal and most magic items are hidden.",
    endgame: true,
  },
  {
    id: 'earlyEndgame', name: 'Early Endgame', level: 'Level 80', tier: 3,
    img: `${IMG}/presets/presetEarlyEndgame80.webp`,
    blurb: "You're running Tier 15 maps. You only care about the highest quality flasks, Expert items, and Lvl 17+ skill gems and 16+ spirit gems. You care less about low-value currency.",
    endgame: true,
  },
  {
    id: 'lateEndgame', name: 'Late Endgame', level: 'Level 90+', tier: 2,
    img: `${IMG}/presets/presetLateEndgame90.webp`,
    blurb: "Deep endgame. Only top bases, high-tier waystones, valuable currency and uniques. Aggressive hiding to keep the screen clean while mapping fast.",
    endgame: true,
  },
  {
    id: 'veryLateEndgame', name: 'Very Late Endgame', level: 'Level 95+', tier: 1,
    img: `${IMG}/presets/presetVeryStrict95.webp`,
    blurb: "Hyper-strict. Only the most valuable currency, uniques and perfect bases get through. Everything else is hidden so nothing distracts from the best drops.",
    endgame: true,
  },
]

export const CLASSES = [
  { id: 'warrior',   name: 'Warrior',   img: `${IMG}/presets/warrior.webp` },
  { id: 'mercenary', name: 'Mercenary', img: `${IMG}/presets/mercenary.webp` },
  { id: 'ranger',    name: 'Ranger',    img: `${IMG}/presets/ranger.webp` },
  { id: 'huntress',  name: 'Huntress',  img: `${IMG}/presets/huntress.webp` },
  { id: 'monk',      name: 'Monk',      img: `${IMG}/presets/monk.webp` },
  { id: 'witch',     name: 'Witch',     img: `${IMG}/presets/witch.webp` },
  { id: 'sorceress', name: 'Sorceress', img: `${IMG}/presets/sorceress.webp` },
  { id: 'druid',     name: 'Druid',     img: `${IMG}/presets/druid.webp` },
]

// Endgame Content toggles revealed when an endgame preset is selected.
export const ENDGAME_CONTENT = [
  { id: 'bossUniques',      label: 'Boss Uniques',            help: 'Show uniques that only drop from pinnacle bosses.' },
  { id: 'chanceBases',      label: 'Chance Bases',            help: 'Show base types worth using Orbs of Chance on.' },
  { id: 'trialsOfChaos',    label: 'Trials of Chaos',         help: 'Show items related to the Trial of Chaos (Ultimatum).' },
  { id: 'trialsOfSekhemas', label: 'Trials of the Sekhemas',  help: 'Show relics and keys for the Trial of the Sekhemas.' },
  { id: 'showSupportGems',  label: 'Show Support Gems',       help: 'Keep showing uncut/leveled support gems.' },
  { id: 'showJewels',       label: 'Show Jewels',             help: 'Keep showing jewels.' },
  { id: 'showLowValueUniques', label: 'Show Low-value Uniques', help: 'Show uniques even when their market value is low.' },
  { id: 'showAllIdentified', label: 'Show All Identified Items', help: 'Show every identified item regardless of other rules.' },
]

// Game Mode & Economy toggles.
export const GAME_MODES = [
  { id: 'league',   label: 'Return of the Ancients', sub: 'League', help: 'Build a filter for the current league economy.' },
  { id: 'hardcore', label: 'Hardcore',  help: 'Hardcore-appropriate tiering.' },
  { id: 'ssf',      label: 'Solo-Self-Found (SSF)', help: 'No trade — tiers tuned for self-found play.' },
]

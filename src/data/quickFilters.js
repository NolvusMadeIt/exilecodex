// Quick Filters — dropdown-driven, consolidated controls instead of a wall of
// checkboxes. Every row is wired to the generator.
// control: 'toggle' | 'number' | 'select' | 'multi' | 'classItems'
import { CATEGORY_ICON } from './items.js'
import { asset } from './assets.js'

// Real per-category currency icons (bundled locally under /public/img). These art slugs are not
// derivable from item names, so they're pinned explicitly.
const CUR = (p) => asset(p)

// Rarity threshold options (shown in the rarity's colour). "Show items with rarity ≥ X".
export const RARITY_THRESHOLDS = [
  { value: 'all', label: 'All rarities', color: '#c8c8c8' },
  { value: 'Magic', label: '≥ Magic', color: '#8888ff' },
  { value: 'Rare', label: '≥ Rare', color: '#ffff77' },
  { value: 'Unique', label: 'Unique only', color: '#af6025' },
]

// Category multiselect option sets (value = stable key the generator reads).
const CURRENCY_TYPES = [
  { value: 'shards', label: 'Currency Shards', icon: CUR('currency/currencyupgradetomagicshard.webp') },
  { value: 'runes', label: 'Runes & Soul Cores', icon: CUR('all-runes.png') },
  { value: 'catalysts', label: 'Catalysts', icon: CUR('currency/breach/breachcatalystfire.webp') },
  { value: 'essences', label: 'Essences', icon: CUR('currency/essence/attributeessence.webp') },
  { value: 'omens', label: 'Omens', icon: CUR('currency/omens/omengamblenogoldcost.webp') },
]
const GEM_TYPES = [
  { value: 'uncut', label: 'Uncut Gems', icon: CATEGORY_ICON.gems },
  { value: 'skill', label: 'Skill Gems', icon: CATEGORY_ICON.gems },
  { value: 'support', label: 'Support Gems', icon: CATEGORY_ICON.gems },
]
const FLASK_TYPES = [
  { value: 'life', label: 'Life Flasks', icon: CATEGORY_ICON.flasks },
  { value: 'mana', label: 'Mana Flasks', icon: CUR('gear/flasks/flaskmana01.webp') },
  { value: 'charms', label: 'Charms', icon: CATEGORY_ICON.charms },
]
const ENDGAME_TYPES = [
  { value: 'quest', label: 'Quest Items' },
  { value: 'relics', label: 'Relics', icon: CATEGORY_ICON.relics },
  { value: 'trials', label: 'Trial Items' },
  { value: 'tablets', label: 'Precursor Tablets' },
  { value: 'fragments', label: 'Fragments & Splinters' },
  { value: 'expedition', label: 'Expedition' },
]
const LEVELING_TYPES = [
  { value: 'weaponsArmour', label: 'Weapons & Armour' },
  { value: 'jewellery', label: 'Jewellery' },
  { value: 'flasks', label: 'Flasks' },
]

export const SECTIONS = [
  // ================= LEFT COLUMN =================
  { id: 'campaign', title: 'Campaign & Leveling', col: 'left', rows: [
    { key: 'levelingShow', label: 'Show While Leveling', help: 'Which item groups to show during the campaign (any rarity).', control: 'multi', options: LEVELING_TYPES, allLabel: 'Nothing extra' },
    { key: 'disenchantRares', label: 'Mark Low Rares to Salvage', help: 'Show low item-level rares dimly so you know to disenchant/sell them.', control: 'toggle' },
  ]},

  { id: 'currency', title: 'Currency', col: 'left', rows: [
    { key: 'currencyShow', label: 'Show Currency Types', help: 'Pick which currency groups to show. (Orbs are always shown and tiered on the Tier List.)', control: 'multi', options: CURRENCY_TYPES, allLabel: 'Orbs only' },
    { key: 'hideScrolls', label: 'Hide Scrolls of Wisdom', help: 'Hide identify scrolls.', control: 'toggle' },
    { key: 'hideGold', label: 'Hide Gold', help: 'Hide gold piles entirely.', control: 'toggle' },
    { key: 'showWaystones', label: 'Show Waystones', help: 'Show waystones / map devices.', control: 'toggle' },
    { key: 'minWaystoneTier', label: 'Min Waystone Tier', help: 'Only show waystones at/above this tier.', control: 'number', min: 1, max: 16 },
  ]},

  { id: 'gems', title: 'Gems', col: 'left', rows: [
    { key: 'gemsShow', label: 'Show Gem Types', help: 'Pick which gem groups to show.', control: 'multi', options: GEM_TYPES, allLabel: 'None' },
    { key: 'minGemLevel', label: 'Min Gem Level', help: 'Hide cut gems below this level.', control: 'number', min: 0, max: 20 },
  ]},

  { id: 'flasks', title: 'Flasks & Charms', col: 'left', rows: [
    { key: 'flasksShow', label: 'Show Flask Types', help: 'Pick which flask/charm groups to show.', control: 'multi', options: FLASK_TYPES, allLabel: 'None' },
    { key: 'qualityFlasksMin', label: 'Min Quality', help: 'Only show flasks/charms with at least this quality.', control: 'number', min: 0, max: 20, suffix: '%' },
    { key: 'hideNonUniqueFlasks', label: 'Hide Remaining Non-Unique', help: 'Hide leftover normal/magic flasks & charms.', control: 'toggle' },
  ]},

  { id: 'uniques', title: 'Uniques & Chance Bases', col: 'left', rows: [
    { key: 'showUniques', label: 'Show Uniques', help: 'Show unique items (tiered on the Tier List).', control: 'toggle' },
    { key: 'hideLowValueUniques', label: 'Hide Low-Value Uniques', help: 'Only show uniques worth picking up.', control: 'toggle' },
    { key: 'showChanceBases', label: 'Show Chance Bases', help: 'Show base types worth using Orb of Chance on.', control: 'toggle' },
  ]},

  { id: 'other', title: 'Other & Endgame Items', col: 'left', rows: [
    { key: 'endgameShow', label: 'Show Item Groups', help: 'Pick which endgame/other item groups to show.', control: 'multi', options: ENDGAME_TYPES, allLabel: 'None' },
  ]},

  // ================= RIGHT COLUMN =================
  { id: 'myEquipment', title: 'My Equipment', col: 'right', rows: [
    { key: 'myWeapons', label: 'My Weapons', help: 'Show only the weapon types your build uses.', control: 'classItems', group: 'weapons' },
    { key: 'myArmour', label: 'My Armour', help: 'Show only your armour types.', control: 'classItems', group: 'armour' },
    { key: 'myJewellery', label: 'My Jewellery', help: 'Rings, amulets, belts you care about.', control: 'classItems', group: 'jewellery' },
    { key: 'showJewels', label: 'Show Jewels', help: 'Show jewels.', control: 'toggle' },
  ]},

  { id: 'gear', title: 'Equipment Filtering', col: 'right', rows: [
    { key: 'gearMinRarity', label: 'Show Equipment', help: 'Show weapons/armour/jewellery at this rarity and above. e.g. "≥ Rare" hides white & blue gear automatically — one dropdown instead of many hide-checkboxes.', control: 'select', options: RARITY_THRESHOLDS },
    { key: 'gearMinItemLevel', label: 'Min Item Level', help: 'Hide equipment below this item level.', control: 'number', min: 0, max: 100 },
    { key: 'gearMinQuality', label: 'Always Show Quality ≥', help: 'Always show any gear at/above this quality, regardless of rarity. 0 = off.', control: 'number', min: 0, max: 20, suffix: '%' },
    { key: 'gearMinSockets', label: 'Always Show Sockets ≥', help: 'Always show gear with at least this many sockets. 0 = off.', control: 'number', min: 0, max: 6 },
  ]},
]

export const TIERS = ['T1', 'T2', 'T3', 'T4', 'T5']

// Default values for every quick-filter key.
export const QF_DEFAULTS = {
  // campaign
  levelingShow: ['weaponsArmour', 'jewellery', 'flasks'], disenchantRares: false,
  // currency
  currencyShow: ['shards', 'runes', 'catalysts', 'essences', 'omens'],
  hideScrolls: true, hideGold: false, showWaystones: true, minWaystoneTier: 1,
  // gems
  gemsShow: ['uncut', 'skill', 'support'], minGemLevel: 0,
  // flasks
  flasksShow: ['life', 'mana', 'charms'], qualityFlasksMin: 0, hideNonUniqueFlasks: true,
  // uniques
  showUniques: true, hideLowValueUniques: false, showChanceBases: true,
  // other & endgame
  endgameShow: ['quest', 'relics', 'trials', 'tablets', 'fragments', 'expedition'],
  // my equipment
  myWeapons: [], myArmour: [], myJewellery: [], showJewels: true,
  // equipment filtering
  gearMinRarity: 'Rare', gearMinItemLevel: 0, gearMinQuality: 0, gearMinSockets: 0,
}

// Class option groups for the 'classItems' control.
export const CLASS_GROUPS = {
  weapons: ['Bows', 'Crossbows', 'Quarterstaves', 'Spears', 'Sceptres', 'Wands', 'Staves', 'One Hand Maces', 'Two Hand Maces', 'Foci', 'Quivers'],
  armour: ['Body Armours', 'Helmets', 'Gloves', 'Boots', 'Shields', 'Bucklers'],
  jewellery: ['Rings', 'Amulets', 'Belts'],
}

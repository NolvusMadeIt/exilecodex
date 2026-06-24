// Quick Filters — dropdown-driven, consolidated controls. Each row compiles to a Show/Hide
// OVERRIDE block layered on top of your chosen preset (see lib/overrides.js → quickFilterDescriptors).
// Defaults are intentionally non-intrusive: empty / off = "use the preset's behaviour". Turn a
// control on to force-show, hide, or highlight that group on top of the base filter.
// control: 'toggle' | 'number' | 'select' | 'multi' | 'classItems'
import { CATEGORY_ICON } from './items.js'
import { asset } from './assets.js'

// Real per-category currency icons (bundled locally under /public/img). These art slugs are not
// derivable from item names, so they're pinned explicitly.
const CUR = (p) => asset(p)

// Rarity threshold options (shown in the rarity's colour). "Show items with rarity ≥ X".
export const RARITY_THRESHOLDS = [
  { value: 'all', label: 'Preset default', color: '#c8c8c8' },
  { value: 'Magic', label: '≥ Magic', color: '#8888ff' },
  { value: 'Rare', label: '≥ Rare', color: '#ffff77' },
  { value: 'Unique', label: 'Unique only', color: '#af6025' },
]

// Category multiselect option sets (value = stable key the override compiler reads).
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
    { key: 'levelingShow', label: 'Force-Show While Leveling', help: 'Force these item groups to always show during the campaign (any rarity), even if your preset would hide them.', control: 'multi', options: LEVELING_TYPES, allLabel: 'Off' },
    { key: 'disenchantRares', label: 'Mark Low Rares to Salvage', help: 'Dimly show low item-level rares so you know to disenchant/sell them.', control: 'toggle' },
  ]},

  { id: 'currency', title: 'Currency', col: 'left', rows: [
    { key: 'currencyShow', label: 'Force-Show Currency Types', help: 'Force these currency groups to always show on top of the preset.', control: 'multi', options: CURRENCY_TYPES, allLabel: 'Off' },
    { key: 'hideScrolls', label: 'Hide Scrolls of Wisdom', help: 'Hide identify scrolls.', control: 'toggle' },
    { key: 'hideGold', label: 'Hide Gold', help: 'Hide gold piles entirely.', control: 'toggle' },
    { key: 'minGoldPile', label: 'Min Gold Pile', help: 'Hide gold piles smaller than this — kills the constant small-gold spam while keeping the big piles. 0 = no change. (Ignored if Hide Gold is on.)', control: 'number', min: 0, max: 50000 },
    { key: 'showWaystones', label: 'Force-Show Waystones', help: 'Force waystones / map devices to show.', control: 'toggle' },
    { key: 'minWaystoneTier', label: 'Min Waystone Tier', help: 'When forcing waystones, only show at/above this tier.', control: 'number', min: 1, max: 16 },
  ]},

  { id: 'gems', title: 'Gems', col: 'left', rows: [
    { key: 'gemsShow', label: 'Force-Show Gem Types', help: 'Force these gem groups to show.', control: 'multi', options: GEM_TYPES, allLabel: 'Off' },
    { key: 'minGemLevel', label: 'Min Gem Level', help: 'Hide cut gems below this level.', control: 'number', min: 0, max: 20 },
  ]},

  { id: 'flasks', title: 'Flasks & Charms', col: 'left', rows: [
    { key: 'flasksShow', label: 'Force-Show Flask Types', help: 'Force these flask/charm groups to show.', control: 'multi', options: FLASK_TYPES, allLabel: 'Off' },
    { key: 'qualityFlasksMin', label: 'Min Quality', help: 'When forcing flasks/charms, only those with at least this quality.', control: 'number', min: 0, max: 20, suffix: '%' },
    { key: 'hideNonUniqueFlasks', label: 'Hide Non-Unique Flasks', help: 'Hide normal/magic/rare flasks & charms.', control: 'toggle' },
  ]},

  { id: 'uniques', title: 'Uniques & Chance Bases', col: 'left', rows: [
    { key: 'showUniques', label: 'Highlight Uniques', help: 'Give all unique items a louder highlight.', control: 'toggle' },
    { key: 'hideLowValueUniques', label: 'Hide Low-Value Uniques', help: 'Hide uniques that are typically low value (by base type).', control: 'toggle' },
    { key: 'showChanceBases', label: 'Highlight Chance Bases', help: 'Highlight base types worth using an Orb of Chance on.', control: 'toggle' },
  ]},

  { id: 'other', title: 'Other & Endgame Items', col: 'left', rows: [
    { key: 'endgameShow', label: 'Force-Show Item Groups', help: 'Force these endgame/other item groups to show.', control: 'multi', options: ENDGAME_TYPES, allLabel: 'Off' },
  ]},

  // ================= RIGHT COLUMN =================
  { id: 'myEquipment', title: 'My Equipment', col: 'right', rows: [
    { key: 'myWeapons', label: 'My Weapons', help: 'The weapon types your build uses — off-build weapon types get hidden (below Unique).', control: 'classItems', group: 'weapons' },
    { key: 'myArmour', label: 'My Armour', help: 'Your armour types — off-build armour types get hidden (below Unique).', control: 'classItems', group: 'armour' },
    { key: 'myJewellery', label: 'My Jewellery', help: 'Rings, amulets, belts you care about — the rest get hidden (below Unique).', control: 'classItems', group: 'jewellery' },
    { key: 'showJewels', label: 'Force-Show Jewels', help: 'Force jewels to show.', control: 'toggle' },
    { key: 'highlightJewellery', label: 'Highlight Rare Jewellery', help: 'Make Rare+ Rings, Amulets & Belts stand out — they’re often your most valuable drops.', control: 'toggle' },
  ]},

  { id: 'gear', title: 'Equipment Filtering', col: 'right', rows: [
    { key: 'gearMinRarity', label: 'Hide Equipment Below', help: 'Hide weapons/armour/jewellery below this rarity. e.g. "≥ Rare" hides white & blue gear. "Preset default" = no change.', control: 'select', options: RARITY_THRESHOLDS },
    { key: 'gearMinItemLevel', label: 'Hide Below Item Level', help: 'Hide equipment below this item level. 0 = off.', control: 'number', min: 0, max: 100 },
    { key: 'gearMinQuality', label: 'Always Show Quality ≥', help: 'Always show any gear at/above this quality, regardless of rarity. 0 = off.', control: 'number', min: 0, max: 20, suffix: '%' },
    { key: 'gearMinSockets', label: 'Always Show Sockets ≥', help: 'Always show gear with at least this many sockets. 0 = off.', control: 'number', min: 0, max: 6 },
    { key: 'alwaysShowRareIlvl', label: 'Always Show Rares ≥ iLvl', help: 'Always show Rare bases at/above this item level (good crafting bases), even if you raised the rarity filter. 0 = off.', control: 'number', min: 0, max: 100 },
  ]},
]

export const TIERS = ['T1', 'T2', 'T3', 'T4', 'T5']

// Default values for every quick-filter key. Non-intrusive: empty / off / 'all' = no override.
export const QF_DEFAULTS = {
  levelingShow: [], disenchantRares: false,
  currencyShow: [], hideScrolls: false, hideGold: false, minGoldPile: 0, showWaystones: false, minWaystoneTier: 1,
  gemsShow: [], minGemLevel: 0,
  flasksShow: [], qualityFlasksMin: 0, hideNonUniqueFlasks: false,
  showUniques: false, hideLowValueUniques: false, showChanceBases: false,
  endgameShow: [],
  myWeapons: [], myArmour: [], myJewellery: [], showJewels: false, highlightJewellery: false,
  gearMinRarity: 'all', gearMinItemLevel: 0, gearMinQuality: 0, gearMinSockets: 0, alwaysShowRareIlvl: 0,
}

// Class option groups for the 'classItems' control.
export const CLASS_GROUPS = {
  weapons: ['Bows', 'Crossbows', 'Quarterstaves', 'Spears', 'Sceptres', 'Wands', 'Staves', 'One Hand Maces', 'Two Hand Maces', 'Foci', 'Quivers'],
  armour: ['Body Armours', 'Helmets', 'Gloves', 'Boots', 'Shields', 'Bucklers'],
  jewellery: ['Rings', 'Amulets', 'Belts'],
}

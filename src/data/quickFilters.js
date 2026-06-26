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
  { value: 'all', label: 'All rarities', color: '#c8c8c8' },
  { value: 'Magic', label: '≥ Magic', color: '#8888ff' },
  { value: 'Rare', label: '≥ Rare', color: '#ffff77' },
  { value: 'Unique', label: 'Unique only', color: '#af6025' },
]

// "Hide remaining below rarity" options for per-slot cleanup. value = the rarity floor: anything
// BELOW it (for that item class) gets hidden. 'all' = keep everything (no change).
export const HIDE_BELOW = [
  { value: 'all', label: 'Keep all', color: '#c8c8c8' },
  { value: 'Magic', label: 'Hide Normal', color: '#8888ff' },
  { value: 'Rare', label: 'Hide Normal & Magic', color: '#ffff77' },
  { value: 'Unique', label: 'Hide all non-Unique', color: '#af6025' },
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

// Rarity "at most" picker (the `≤` selectors poe2filter uses for salvage / quality rules).
const RARITY_MAX = [
  { value: 'all', label: '≤ All' },
  { value: 'Normal', label: '≤ Normal' },
  { value: 'Magic', label: '≤ Magic' },
  { value: 'Rare', label: '≤ Rare' },
]
// Item footprint cap (width×height) for "small rares to disenchant".
const ITEM_SIZES = ['1x1', '1x2', '1x3', '2x1', '2x2', '2x3', '2x4'].map(s => ({ value: s, label: '≤ ' + s }))
// Socket count threshold.
const SOCKET_OPTS = [{ value: 1, label: '1 Socket' }, { value: 2, label: '2 Sockets' }, { value: 3, label: '3 Sockets' }]

export const SECTIONS = [
  // ================= LEFT COLUMN — item categories =================
  // Campaign: cloned to poe2filter's nested group → rule-row → inline-controls structure.
  { id: 'campaign', title: 'Campaign', col: 'left', groups: [
    { id: 'autoLeveling', title: 'Auto-Scaling Leveling Items', help: 'Show low-level gear, flasks and currency while you level — scoped to area level so it stops cluttering once you out-level it.', rows: [
      { key: 'lvlGear', label: 'Leveling Gear', enable: true, help: 'Show Normal/Magic/Rare weapons & armour while you are within the chosen area-level range.',
        controls: [{ control: 'areaRange', minKey: 'lvlGearAreaMin', maxKey: 'lvlGearAreaMax', label: 'Between Area Levels' }] },
      { key: 'lvlWeapons', label: 'Leveling Weapons', enable: true, help: 'Which weapon types to show while leveling (empty = all).',
        controls: [{ control: 'classItems', group: 'weapons', key: 'lvlWeaponTypes', allLabel: 'All' }] },
      { key: 'lvlArmour', label: 'Leveling Armour', enable: true, help: 'Which armour types to show while leveling (empty = all).',
        controls: [{ control: 'classItems', group: 'armour', key: 'lvlArmourTypes', allLabel: 'All' }] },
      { key: 'lvlFlasks', label: 'Leveling Flasks', enable: true, help: 'Show Life & Mana flasks while leveling.' },
      { key: 'lvlGold', label: 'Leveling Gold', enable: true, help: 'Show every gold pile while leveling (no minimum).' },
      { key: 'lvlVerisium', label: 'Leveling Verisium', enable: true, help: 'Show Verisium while leveling.' },
    ]},
    { id: 'salvage', title: 'Disenchanting, Selling & Salvaging Gear', help: 'Keep small / quality items visible so you can salvage, disenchant or vendor them.', rows: [
      { key: 'disRares', label: 'Rares to Disenchant or sell', enable: true, help: 'Show small Rare (optionally Magic) items up to a footprint, so you can grab them to disenchant or sell.',
        controls: [
          { control: 'select', key: 'disRaresMaxRarity', options: RARITY_MAX, width: 'w-24' },
          { control: 'toggle', key: 'disRaresMagic', label: 'Magic' },
          { control: 'select', key: 'disRaresMaxSize', options: ITEM_SIZES, width: 'w-24' },
        ] },
      { key: 'socketedGear', label: 'Socketed Gear', enable: true, help: 'Always show gear with at least this many sockets.',
        controls: [{ control: 'select', key: 'socketedGearMin', options: SOCKET_OPTS, width: 'w-28' }] },
      { key: 'qMartial', label: 'Quality Martial Weapons', enable: true, help: 'Show martial (attack) weapons of at least this quality, up to a rarity.',
        controls: [{ control: 'number', key: 'qMartialMin', label: 'Of Quality', min: 1, max: 20 }, { control: 'select', key: 'qMartialRarity', options: RARITY_MAX, width: 'w-24' }] },
      { key: 'qCaster', label: 'Quality Caster Weapons', enable: true, help: 'Show caster weapons of at least this quality, up to a rarity.',
        controls: [{ control: 'number', key: 'qCasterMin', label: 'Of Quality', min: 1, max: 20 }, { control: 'select', key: 'qCasterRarity', options: RARITY_MAX, width: 'w-24' }] },
      { key: 'qArmour', label: 'Quality Shields and Armour', enable: true, help: 'Show armour & shields of at least this quality, up to a rarity.',
        controls: [{ control: 'number', key: 'qArmourMin', label: 'Of Quality', min: 1, max: 20 }, { control: 'select', key: 'qArmourRarity', options: RARITY_MAX, width: 'w-24' }] },
    ]},
  ]},

  { id: 'flasks', title: 'Flasks & Charms', col: 'left', groups: [
    { id: 'myFlasks', title: 'My Flasks and Charms', help: 'Always show the flask & charm types you actually use.', rows: [
      { label: 'Show Flask & Charm Types', enable: false, help: 'Force these flask/charm groups to always show.',
        controls: [{ control: 'multi', key: 'flasksShow', options: FLASK_TYPES, allLabel: 'Off' }] },
    ]},
    { id: 'craftFlasks', title: 'Crafting & Quality Flasks and Charms', help: 'Keep high-quality / high-iLvl flasks & charms worth crafting or selling.', rows: [
      { key: 'charmsHighIlvl', label: 'High iLvl Normal Charms', enable: true, help: 'Show white charms at high item level (good bases to roll).' },
      { key: 'qCharms', label: 'Quality Charms', enable: true, help: 'Show charms of at least this quality.',
        controls: [{ control: 'number', key: 'qCharmsMin', label: 'Of Quality', min: 1, max: 20 }] },
      { key: 'qFlasks', label: 'Quality Flasks', enable: true, help: 'Show flasks of at least this quality.',
        controls: [{ control: 'number', key: 'qFlasksMin', label: 'Of Quality', min: 1, max: 20 }] },
    ]},
    { id: 'hideFlasks', title: 'Hide Remaining Flasks and Charms', help: 'Hide the non-Unique flasks & charms you no longer want.', rows: [
      { key: 'hideLifeFlasks', label: 'Hide non-Unique Life Flasks', enable: true },
      { key: 'hideManaFlasks', label: 'Hide non-Unique Mana Flasks', enable: true },
      { key: 'hideCharms', label: 'Hide non-Unique Charms', enable: true },
    ]},
  ]},

  { id: 'currency', title: 'Currency', col: 'left', groups: [
    { id: 'showCurrency', title: 'Show Currency & Gems', help: 'Force currency and gem groups to show on top of the preset.', rows: [
      { label: 'Show Currency Types', enable: false, controls: [{ control: 'multi', key: 'currencyShow', options: CURRENCY_TYPES, allLabel: 'Off' }] },
      { label: 'Show Gem Types', enable: false, controls: [{ control: 'multi', key: 'gemsShow', options: GEM_TYPES, allLabel: 'Off' }] },
      { label: 'Min Gem Level', enable: false, help: 'Hide cut gems below this level.', controls: [{ control: 'number', key: 'minGemLevel', min: 0, max: 20 }] },
    ]},
    { id: 'hideCurrency', title: 'Hide Currency', help: 'Trim low-value currency clutter.', rows: [
      { key: 'hideScrolls', label: 'Hide Scrolls of Wisdom', enable: true },
      { label: 'Hide Currency Types', enable: false, help: 'Hide these currency groups entirely.', controls: [{ control: 'multi', key: 'currencyHide', options: CURRENCY_TYPES, allLabel: 'None' }] },
      { key: 'hideGold', label: 'Hide Gold Stacks', enable: true, help: 'Hide gold piles below the chosen stack size (off = hide all gold).',
        controls: [{ control: 'number', key: 'minGoldPile', label: 'below', min: 0, max: 50000 }] },
      { key: 'hideVerisium', label: 'Hide Verisium Stacks', enable: true, help: 'Hide Verisium below the chosen stack size.',
        controls: [{ control: 'number', key: 'minVerisium', label: 'below', min: 0, max: 50000 }] },
      { key: 'hideRegularRunes', label: 'Hide Regular Runes', enable: true, help: 'Hide common Normal-rarity runes.' },
      { label: 'Hide Uncut Gems Below Lvl', enable: false, help: 'Hide uncut gems below this item level. 0 = off.', controls: [{ control: 'number', key: 'hideUncutBelow', min: 0, max: 20 }] },
    ]},
  ]},

  { id: 'uniques', title: 'Uniques & Chance Bases', col: 'left', groups: [
    { id: 'valuableUniques', title: 'Valuable Uniques', help: 'Highlight the uniques worth picking up. (Per-unique value tiers live on the Tier List.)', rows: [
      { key: 'showUniques', label: 'Highlight Uniques', enable: true, help: 'Give all uniques a louder highlight.' },
      { key: 'hideLowValueUniques', label: 'Hide Low-Value Uniques', enable: true, help: 'Hide uniques that are typically low value.' },
    ]},
    { id: 'specialUniques', title: 'Special Uniques', help: 'Corrupted and high-quality uniques.', rows: [
      { key: 'exceptionalUniques', label: 'Exceptional Uniques', enable: true, help: 'Highlight uniques of at least this quality.',
        controls: [{ control: 'number', key: 'exceptionalUniquesMin', label: 'Min Quality', min: 1, max: 20 }] },
      { key: 'vaalUniques', label: 'Vaal (Corrupted) Uniques', enable: true, help: 'Highlight corrupted uniques.' },
    ]},
    { id: 'remainingUniques', title: 'Remaining Uniques', help: 'What to do with the rest.', rows: [
      { key: 'smallDisenchantUniques', label: 'Small Disenchant Uniques', enable: true, help: 'Show small uniques up to a footprint, for disenchanting.',
        controls: [{ control: 'select', key: 'smallDisenchantMaxSize', options: ITEM_SIZES, width: 'w-24' }] },
      { key: 'hideAllUniques', label: 'Hide All Remaining Uniques', enable: true, help: 'Hide every unique not highlighted above (very strict).' },
    ]},
    { id: 'chanceBases', title: 'Chance Bases', help: 'Bases worth using an Orb of Chance on.', rows: [
      { key: 'showChanceBases', label: 'Highlight Chance Bases', enable: true },
    ]},
  ]},

  { id: 'other', title: 'Other Items', col: 'left', groups: [
    { id: 'otherItems', title: 'Other Items', help: 'Quest, trial, waystone and other endgame drops.', rows: [
      { key: 'showQuest', label: 'Quest Items', enable: true },
      { key: 'showRelics', label: 'Trial of the Sekhemas Relics', enable: true },
      { key: 'showTrials', label: 'Trial Keys (Barya / Ultimatum)', enable: true },
      { key: 'showTablets', label: 'Precursor Tablets', enable: true },
      { key: 'showFragments', label: 'Fragments & Splinters', enable: true },
      { key: 'showExpedition', label: 'Expedition (Logbooks / Artifacts)', enable: true },
      { key: 'showWaystones', label: 'Show Waystones', enable: true, help: 'Force waystones to show at/above a tier.',
        controls: [{ control: 'number', key: 'minWaystoneTier', label: '≥ Tier', min: 1, max: 16 }] },
      { key: 'highlightRareWaystones', label: 'Highlight Rare Waystones', enable: true },
    ]},
  ]},

  // ================= RIGHT COLUMN — your gear =================
  { id: 'myEquipment', title: 'My Equipment', col: 'right', groups: [
    { id: 'myGear', title: 'My Equipment', help: 'The gear types your build uses — off-build types get hidden below Unique.', rows: [
      { label: 'My Weapons', enable: false, help: 'Weapon types you use (others hidden below Unique).', controls: [{ control: 'classItems', group: 'weapons', key: 'myWeapons', allLabel: 'None selected' }] },
      { label: 'My Armour', enable: false, help: 'Armour types you use.', controls: [{ control: 'classItems', group: 'armour', key: 'myArmour', allLabel: 'None selected' }] },
      { label: 'My Jewellery', enable: false, help: 'Jewellery you care about.', controls: [{ control: 'classItems', group: 'jewellery', key: 'myJewellery', allLabel: 'None selected' }] },
      { key: 'showJewels', label: 'Show Jewels', enable: true },
      { key: 'highlightJewellery', label: 'Highlight Rare Jewellery', enable: true },
    ]},
  ]},

  { id: 'otherEquipment', title: 'Other Equipment', col: 'right', groups: [
    { id: 'gearFiltering', title: 'Gear Filtering', help: 'Rarity / item-level / quality / socket thresholds for all equipment.', rows: [
      { label: 'Hide Equipment Below', enable: false, controls: [{ control: 'select', key: 'gearMinRarity', options: RARITY_THRESHOLDS, width: 'w-32' }] },
      { label: 'Hide Below Item Level', enable: false, controls: [{ control: 'number', key: 'gearMinItemLevel', min: 0, max: 100 }] },
      { label: 'Always Show Quality ≥', enable: false, controls: [{ control: 'number', key: 'gearMinQuality', min: 0, max: 20, suffix: '%' }] },
      { label: 'Always Show Sockets ≥', enable: false, controls: [{ control: 'number', key: 'gearMinSockets', min: 0, max: 6 }] },
      { label: 'Always Show Rares ≥ iLvl', enable: false, controls: [{ control: 'number', key: 'alwaysShowRareIlvl', min: 0, max: 100 }] },
    ]},
    { id: 'craftingBases', title: 'Crafting Bases', help: 'High-item-level white bases for crafting & chancing.', rows: [
      { key: 'showCraftingBases', label: 'Highlight Crafting Bases', enable: true, controls: [{ control: 'number', key: 'craftingBaseIlvl', label: '≥ iLvl', min: 1, max: 100 }] },
    ]},
    { id: 'remainingEquipment', title: 'Remaining Equipment', help: 'Hide the leftover gear you no longer want.', rows: [
      { key: 'hideAllRemainingGear', label: 'Hide All Remaining Non-Unique Gear', enable: true, help: 'Hide every weapon/armour/jewellery not shown above.' },
      { label: 'Hide Remaining Rings', enable: false, controls: [{ control: 'select', key: 'hideRingsBelow', options: HIDE_BELOW, width: 'w-40' }] },
      { label: 'Hide Remaining Amulets', enable: false, controls: [{ control: 'select', key: 'hideAmuletsBelow', options: HIDE_BELOW, width: 'w-40' }] },
      { label: 'Hide Remaining Belts', enable: false, controls: [{ control: 'select', key: 'hideBeltsBelow', options: HIDE_BELOW, width: 'w-40' }] },
      { label: 'Hide Remaining Jewels', enable: false, controls: [{ control: 'select', key: 'hideJewelsBelow', options: HIDE_BELOW, width: 'w-40' }] },
    ]},
  ]},
]

export const TIERS = ['T1', 'T2', 'T3', 'T4', 'T5']

// Base values for every quick-filter key. Strictness profiles (data/strictness.js) build on this;
// `catchAll` decides what happens to everything not matched: 'show' (dim) or 'hide'.
export const QF_DEFAULTS = {
  // Campaign clone (poe2filter structure)
  lvlGear: false, lvlGearAreaMin: 1, lvlGearAreaMax: 70,
  lvlWeapons: false, lvlWeaponTypes: [], lvlArmour: false, lvlArmourTypes: [],
  lvlFlasks: false, lvlGold: false, lvlVerisium: false,
  disRares: false, disRaresMaxRarity: 'Rare', disRaresMagic: false, disRaresMaxSize: '2x2',
  socketedGear: false, socketedGearMin: 2,
  qMartial: false, qMartialMin: 1, qMartialRarity: 'all',
  qCaster: false, qCasterMin: 1, qCasterRarity: 'all',
  qArmour: false, qArmourMin: 1, qArmourRarity: 'all',
  // Flasks & Charms clone
  charmsHighIlvl: false, qCharms: false, qCharmsMin: 1, qFlasks: false, qFlasksMin: 1,
  hideLifeFlasks: false, hideManaFlasks: false, hideCharms: false,
  // Currency clone
  currencyHide: [], hideVerisium: false, minVerisium: 0, hideRegularRunes: false, hideUncutBelow: 0,
  // Uniques clone
  exceptionalUniques: false, exceptionalUniquesMin: 1, vaalUniques: false,
  smallDisenchantUniques: false, smallDisenchantMaxSize: '2x1', hideAllUniques: false,
  // Other Items clone
  showQuest: false, showRelics: false, showTrials: false, showTablets: false, showFragments: false, showExpedition: false,
  // Other Equipment clone
  hideAllRemainingGear: false,
  // Legacy leveling keys (kept so strictness presets + older saved filters still compile)
  levelingShow: [], levelingMaxAreaLevel: 0, disenchantRares: false,
  currencyShow: [], hideScrolls: false, hideGold: false, minGoldPile: 0, showWaystones: false, minWaystoneTier: 1, highlightRareWaystones: false,
  gemsShow: [], minGemLevel: 0,
  flasksShow: [], qualityFlasksMin: 0, hideNonUniqueFlasks: false,
  showUniques: false, hideLowValueUniques: false, showChanceBases: false,
  endgameShow: [],
  myWeapons: [], myArmour: [], myJewellery: [], showJewels: false, highlightJewellery: false,
  gearMinRarity: 'all', gearMinItemLevel: 0, gearMinQuality: 0, gearMinSockets: 0, alwaysShowRareIlvl: 0,
  showCraftingBases: false, craftingBaseIlvl: 82, hideRingsBelow: 'all', hideAmuletsBelow: 'all', hideBeltsBelow: 'all', hideJewelsBelow: 'all',
  catchAll: 'show',
}

// Class option groups for the 'classItems' control.
export const CLASS_GROUPS = {
  weapons: ['Bows', 'Crossbows', 'Quarterstaves', 'Spears', 'Sceptres', 'Wands', 'Staves', 'One Hand Maces', 'Two Hand Maces', 'Foci', 'Quivers'],
  armour: ['Body Armours', 'Helmets', 'Gloves', 'Boots', 'Shields', 'Bucklers'],
  jewellery: ['Rings', 'Amulets', 'Belts'],
}

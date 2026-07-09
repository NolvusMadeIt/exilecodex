// Quick Filters — an exact-structure clone of poe2filter.com's Quick Filters: the same seven
// categories, the same groups, the same rule-rows and labels. Each row compiles to a Show/Hide
// OVERRIDE block layered on top of your chosen preset (see lib/overrides.js → quickFilterDescriptors).
// Defaults are non-intrusive: off / empty = "use the preset + base filter". Turn a control on to
// force-show, hide, or highlight that group on top of the base filter.
// control: 'toggle' | 'number' | 'select' | 'multi' | 'classItems' | 'areaRange'
import { CATEGORY_ICON } from './items.js'
import { asset } from './assets.js'

// Real per-category currency icons (bundled locally under /public/img). These art slugs are not
// derivable from item names, so they're pinned explicitly.
const CUR = (p) => asset(p)

// Rarity threshold options (shown in the rarity's colour). "Show items with rarity ≥ X".
// (Exported for back-compat; the gear-rarity row was removed from the cloned UI.)
export const RARITY_THRESHOLDS = [
  { value: 'all', label: 'All rarities', color: '#c8c8c8' },
  { value: 'Magic', label: '≥ Magic', color: '#8888ff' },
  { value: 'Rare', label: '≥ Rare', color: '#ffff77' },
  { value: 'Unique', label: 'Unique only', color: '#af6025' },
]

// "Hide remaining by rarity" options for per-slot cleanup. value = the rarity floor: anything
// BELOW it (for that item class) gets hidden. 'all' = keep everything (no change).
export const HIDE_BELOW = [
  { value: 'all', label: 'Keep all', color: '#c8c8c8' },
  { value: 'Magic', label: '= Normal', color: '#8888ff' },
  { value: 'Rare', label: '≤ Magic', color: '#ffff77' },
  { value: 'Unique', label: '≤ Rare', color: '#af6025' },
]

// Currency multiselect (value = stable key the override compiler reads).
const CURRENCY_TYPES = [
  { value: 'shards', label: 'Currency Shards', icon: CUR('currency/currencyupgradetomagicshard.webp') },
  { value: 'runes', label: 'Runes & Soul Cores', icon: CUR('all-runes.png') },
  { value: 'catalysts', label: 'Catalysts', icon: CUR('currency/breach/breachcatalystfire.webp') },
  { value: 'essences', label: 'Essences', icon: CUR('currency/essence/attributeessence.webp') },
  { value: 'omens', label: 'Omens', icon: CUR('currency/omens/omengamblenogoldcost.webp') },
]

// Jewel base types for the "My Jewels" picker (compiled as BaseType matches).
const JEWEL_TYPES = ['Emerald', 'Sapphire', 'Ruby', 'Diamond', 'Time-Lost Emerald', 'Time-Lost Sapphire', 'Time-Lost Ruby', 'Time-Lost Diamond']
  .map(n => ({ value: n, label: n, icon: CATEGORY_ICON.jewels }))

// Rarity "at most" picker (the `≤` selectors poe2filter uses for salvage / quality rules).
const RARITY_MAX = [
  { value: 'all', label: '≤ All' },
  { value: 'Normal', label: '≤ Normal' },
  { value: 'Magic', label: '≤ Magic' },
  { value: 'Rare', label: '≤ Rare' },
]
// Item footprint cap (width×height).
const ITEM_SIZES = ['1x1', '1x2', '1x3', '2x1', '2x2', '2x3', '2x4'].map(s => ({ value: s, label: '= ' + s }))
// Socket count threshold.
const SOCKET_OPTS = [{ value: 1, label: '≥ 1 Socket' }, { value: 2, label: '≥ 2 Sockets' }, { value: 3, label: '≥ 3 Sockets' }]
// Drop-tier picker (poe2filter's "≥ Tn" market tiers — mapped to item-level floors in the compiler).
const DROP_TIER_OPTS = [
  { value: 1, label: '≥ T1' }, { value: 2, label: '≥ T2' }, { value: 3, label: '≥ T3' },
  { value: 4, label: '≥ T4' }, { value: 5, label: '≥ T5' },
]
// Tiering mode (Normal = no-op, value 'all' so it doesn't read as "active"). Strict / Off do real work.
const TIER_MODE = [{ value: 'all', label: 'Normal' }, { value: 'strict', label: 'Strict' }, { value: 'off', label: 'Off' }]

export const SECTIONS = [
  // ===================== Campaign =====================
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
        controls: [{ control: 'select', key: 'socketedGearMin', options: SOCKET_OPTS, width: 'w-32' }] },
      { key: 'qMartial', label: 'Quality Martial Weapons', enable: true, help: 'Show martial (attack) weapons of at least this quality, up to a rarity.',
        controls: [{ control: 'number', key: 'qMartialMin', label: 'Of Quality', min: 1, max: 20 }, { control: 'select', key: 'qMartialRarity', options: RARITY_MAX, width: 'w-24' }] },
      { key: 'qCaster', label: 'Quality Caster Weapons', enable: true, help: 'Show caster weapons of at least this quality, up to a rarity.',
        controls: [{ control: 'number', key: 'qCasterMin', label: 'Of Quality', min: 1, max: 20 }, { control: 'select', key: 'qCasterRarity', options: RARITY_MAX, width: 'w-24' }] },
      { key: 'qArmour', label: 'Quality Shields and Armour', enable: true, help: 'Show armour & shields of at least this quality, up to a rarity.',
        controls: [{ control: 'number', key: 'qArmourMin', label: 'Of Quality', min: 1, max: 20 }, { control: 'select', key: 'qArmourRarity', options: RARITY_MAX, width: 'w-24' }] },
    ]},
  ]},

  // ===================== Flasks & Charms =====================
  { id: 'flasks', title: 'Flasks & Charms', col: 'left', groups: [
    { id: 'myFlasks', title: 'My Flasks and Charms', help: 'Always show the flask & charm types you actually use.', rows: [
      { label: '', enable: false, controls: [{ control: 'classItems', group: 'flasksCharms', key: 'myFlasks', allLabel: 'Add Flask Type' }] },
    ]},
    { id: 'craftFlasks', title: 'Crafting & Quality Flasks and Charms', help: 'Keep high-quality / high-iLvl flasks & charms worth crafting or selling.', rows: [
      { key: 'charmsHighIlvl', label: 'High iLevel Normal Charms', enable: true, help: 'Show white charms at high item level (good bases to roll).' },
      { key: 'qCharms', label: 'Quality Charms', enable: true, help: 'Show charms of at least this quality.',
        controls: [{ control: 'number', key: 'qCharmsMin', label: 'Of Quality', min: 1, max: 20 }] },
      { key: 'qFlasks', label: 'Quality Flasks', enable: true, help: 'Show flasks of at least this quality.',
        controls: [{ control: 'number', key: 'qFlasksMin', label: 'Of Quality', min: 1, max: 20 }] },
    ]},
  ]},

  // ===================== Currency =====================
  { id: 'currency', title: 'Currency', col: 'left', groups: [
    { id: 'economy', title: 'Economy', help: 'How aggressively to tier and trim currency by market value.', rows: [
      { label: 'Currency Tiering Mode', enable: false, help: 'Normal keeps the preset behaviour. Strict hides low-tier shards. Off hides all but the highest-value currency shards.',
        controls: [{ control: 'select', key: 'econTieringMode', options: TIER_MODE, width: 'w-28' }] },
      { key: 'econBigStacks', label: 'Highlight Large Currency Stacks', enable: true, help: 'Give big stacks of currency a louder highlight.',
        controls: [{ control: 'number', key: 'econBigStackSize', label: '≥', min: 2, max: 5000 }] },
    ]},
  ]},

  // ===================== Uniques & Chance Bases =====================
  { id: 'uniques', title: 'Uniques & Chance Bases', col: 'left', groups: [
    { id: 'valuableUniques', title: 'Valuable Uniques', help: 'Highlight uniques by value tier (seeded from the Uniques Tier List — re-tier there any time).', rows: [
      { key: 'uExcellent', label: 'Excellent Uniques', enable: true, help: 'Loudly highlight your S-tier uniques.' },
      { key: 'uGood', label: 'Good Uniques', enable: true, help: 'Highlight your A-tier uniques.' },
      { key: 'uPotential', label: 'Potential Uniques', enable: true, help: 'Highlight your B-tier uniques.' },
      { key: 'uDropRestricted', label: 'Good Drop-Restricted Uniques', enable: true, help: 'Show every remaining unique so a restricted-drop unique is never missed.' },
      { label: 'Unique Tiering Mode', enable: false, help: 'Normal keeps the highlights above. Off disables value-tier unique highlights.',
        controls: [{ control: 'select', key: 'uTieringMode', options: TIER_MODE, width: 'w-28' }] },
      { label: 'Class-specific Uniques', enable: false, help: 'Highlight uniques on the gear classes you pick.', controls: [{ control: 'classItems', group: 'all', key: 'uClassSpecific', allLabel: 'None' }] },
    ]},
    { id: 'specialUniques', title: 'Special Uniques', help: 'Corrupted and high-quality uniques.', rows: [
      { key: 'exceptionalUniques', label: 'Exceptional Uniques', enable: true, help: 'Highlight uniques of at least this quality.',
        controls: [{ control: 'number', key: 'exceptionalUniquesMin', label: 'Min Quality', min: 1, max: 20 }] },
      { key: 'vaalModUniques', label: 'Vaal Mod Uniques', enable: true, help: 'Highlight corrupted uniques (may carry a Vaal implicit).' },
      { key: 'vaalUniques', label: 'Vaal Uniques', enable: true, help: 'Highlight uniques on Vaal base types.' },
    ]},
    { id: 'remainingUniques', title: 'Remaining Uniques', help: 'What to do with the rest.', rows: [
      { key: 'smallDisenchantUniques', label: 'Small Disenchant Uniques', enable: true, help: 'Show small uniques up to a footprint, for disenchanting.',
        controls: [{ control: 'select', key: 'smallDisenchantMaxSize', options: ITEM_SIZES, width: 'w-24' }] },
      { key: 'uOther', label: 'Other Uniques', enable: true, help: 'Show every other unique (dim, no highlight).' },
    ]},
    { id: 'chanceBases', title: 'Chance Bases', help: 'White bases worth using an Orb of Chance on.', rows: [
      { key: 'chanceWanted', label: 'Wanted Chance Bases', enable: true, help: 'Loudly highlight high-item-level white bases worth chancing.' },
      { key: 'chancePotential', label: 'Potential Chance Bases', enable: true, help: 'Show other white bases that could be chanced (dim).' },
    ]},
  ]},

  // ===================== Other Items =====================
  { id: 'other', title: 'Other Items', col: 'left', groups: [
    { id: 'otherItems', title: 'Other Items', help: 'Quest, trial and waystone drops.', rows: [
      { key: 'showQuest', label: 'Quest Items', enable: true },
      { key: 'showRelics', label: 'Trial of the Sekhemas Relics', enable: true, help: 'Show relics.' },
      { key: 'showTrials', label: 'Trial of the Sekhemas Keys', enable: true, help: 'Show Barya / Ultimatum / Djinn keys.' },
      { key: 'highlightRareWaystones', label: 'Rare Waystones', enable: true, help: 'Highlight Rare waystones.' },
      { key: 'showWaystones', label: 'Other Waystones', enable: true, help: 'Force waystones to show at/above a tier.',
        controls: [{ control: 'number', key: 'minWaystoneTier', label: '≥ Tier', min: 1, max: 16 }] },
    ]},
  ]},

  // ===================== My Equipment =====================
  { id: 'myEquipment', title: 'My Equipment', col: 'right', groups: [
    { id: 'myWeaponsG', title: 'My Weapons', help: 'Weapon types your build uses — off-build weapons get hidden below Unique.', rows: [
      { label: '', enable: false, controls: [{ control: 'classItems', group: 'weapons', key: 'myWeapons', allLabel: 'Add Weapon Type' }] },
    ]},
    { id: 'myArmourG', title: 'My Armour', help: 'Armour types your build uses — off-build armour gets hidden below Unique.', rows: [
      { label: '', enable: false, controls: [{ control: 'classItems', group: 'armour', key: 'myArmour', allLabel: 'Add Armour Type' }] },
    ]},
    { id: 'myJewelleryG', title: 'My Jewellery', help: 'Jewellery you care about — off-build jewellery gets hidden below Unique.', rows: [
      { label: '', enable: false, controls: [{ control: 'classItems', group: 'jewellery', key: 'myJewellery', allLabel: 'Add Jewellery Type' }] },
    ]},
    { id: 'myJewelsG', title: 'My Jewels', help: 'Jewel types you want shown — other jewels get hidden below Unique.', rows: [
      { label: '', enable: false, controls: [{ control: 'multi', key: 'myJewels', options: JEWEL_TYPES, allLabel: 'Add Jewel Type' }] },
    ]},
  ]},

  // ===================== Other Equipment =====================
  { id: 'otherEquipment', title: 'Other Equipment', col: 'right', groups: [
    { id: 'unidEquip', title: 'Unidentified Equipment', help: 'Show unidentified gear & jewellery at/above a value tier.', rows: [
      { key: 'unidRareGear', label: 'Rare Gear', enable: true, help: 'Show unidentified Rare weapons & armour at/above this drop tier.',
        controls: [{ control: 'select', key: 'unidRareGearTier', options: DROP_TIER_OPTS, width: 'w-24' }] },
      { key: 'unidMagicGear', label: 'Magic Gear', enable: true, help: 'Show unidentified Magic weapons & armour at/above this drop tier.',
        controls: [{ control: 'select', key: 'unidMagicGearTier', options: DROP_TIER_OPTS, width: 'w-24' }] },
      { key: 'unidRareJewellery', label: 'Rare Jewellery', enable: true, help: 'Show unidentified Rare jewellery at/above this drop tier.',
        controls: [{ control: 'select', key: 'unidRareJewelleryTier', options: DROP_TIER_OPTS, width: 'w-24' }] },
      { key: 'unidMagicJewellery', label: 'Magic Jewellery', enable: true, help: 'Show unidentified Magic jewellery at/above this drop tier.',
        controls: [{ control: 'select', key: 'unidMagicJewelleryTier', options: DROP_TIER_OPTS, width: 'w-24' }] },
    ]},
    { id: 'idCategories', title: 'Identified Item Categories', help: 'Show identified items by category.', rows: [
      { key: 'idShowAll', label: 'Show All Identified Items', enable: true },
      { key: 'idGear', label: 'Identified Gear', enable: true, help: 'Show identified weapons & armour.' },
      { key: 'idJewellery', label: 'Identified Jewellery', enable: true },
      { key: 'idJewels', label: 'Identified Jewels', enable: true },
      { key: 'idCustom', label: 'Identified Custom Items', enable: true, help: 'Show identified items on your My Equipment classes.' },
    ]},
    { id: 'idConfigs', title: 'Identified Item Configurations', help: 'Highlight identified items by quality of roll (item level as the value proxy).', rows: [
      { key: 'idExcellent', label: 'Excellent Identified Items', enable: true, help: 'Loudly highlight identified Rare items at expert-tier item level (≥ 82).' },
      { key: 'idGood', label: 'Good Identified Items', enable: true, help: 'Highlight identified Rare items at high item level (≥ 75).' },
    ]},
    { id: 'craftingBases', title: 'Crafting Bases', help: 'High-quality / high-item-level white bases for crafting.', rows: [
      { key: 'craftQualityGear', label: 'Excellent Quality Gear', enable: true, help: 'Highlight Normal/Magic gear of at least this quality.',
        controls: [{ control: 'number', key: 'craftQualityMin', label: '≥ Quality', min: 1, max: 20 }] },
      { key: 'craftSocketGear', label: 'Excellent Socketed Gear', enable: true, help: 'Highlight Normal gear with at least this many sockets.',
        controls: [{ control: 'select', key: 'craftSocketMin', options: SOCKET_OPTS, width: 'w-32' }] },
      { key: 'showCraftingBases', label: 'High iLevel Normal Gear', enable: true, help: 'Highlight white weapons & armour at/above this item level.',
        controls: [{ control: 'number', key: 'craftingBaseIlvl', label: '≥ iLevel', min: 1, max: 100 }] },
      { key: 'craftJewellery', label: 'Excellent Jewellery', enable: true, help: 'Highlight Normal/Magic jewellery at/above this item level.',
        controls: [{ control: 'number', key: 'craftJewelleryIlvl', label: '≥ iLevel', min: 1, max: 100 }] },
    ]},
    { id: 'specialEquip', title: 'Special Equipment', help: 'High-end rare bases & jewellery worth a second look.', rows: [
      { key: 'specialGear', label: 'Special Gear', enable: true, help: 'Highlight Rare weapons & armour at top-tier item level (≥ 82).' },
      { key: 'doubleAnointAmulets', label: 'Double-Anointed Amulets', enable: true, help: 'Highlight high-item-level Rare amulets (amulets can carry anoints).' },
      { key: 'specialJewellery', label: 'Excellent Special Jewellery', enable: true, help: 'Highlight Rare jewellery at/above this item level.',
        controls: [{ control: 'number', key: 'specialJewelleryIlvl', label: '≥ iLevel', min: 1, max: 100 }] },
      { key: 'specialJewelleryRemaining', label: 'Remaining Special Jewellery', enable: true, help: 'Show every other Rare jewellery (dim).' },
    ]},
  ]},

  // ===================== Hide =====================
  // One home for everything you want OUT of your filter. Every row here HIDES — toggle one on (or
  // pick a rarity) and that thing stops dropping into view. No row outside this category hides.
  { id: 'hideItems', title: 'Hide', col: 'right', groups: [
    { id: 'hideCurrencyG', title: 'Currency & Gems', help: 'Turn one on to hide it from your filter.', rows: [
      { key: 'hideScrolls', label: 'Scrolls of Wisdom', enable: true },
      { label: 'Currency Types', enable: false, help: 'Hide these currency groups entirely.', controls: [{ control: 'multi', key: 'currencyHide', options: CURRENCY_TYPES, allLabel: 'None' }] },
      { key: 'hideGold', label: 'Gold Stacks', enable: true, help: 'Hide gold piles below the chosen stack size (no size = hide all gold). Managed by Leveling Gold while that is on.',
        controls: [{ control: 'number', key: 'minGoldPile', label: '≤', min: 0, max: 50000 }] },
      { key: 'hideVerisium', label: 'Verisium Stacks', enable: true, help: 'Hide Verisium below the chosen stack size. Managed by Leveling Verisium while that is on.',
        controls: [{ control: 'number', key: 'minVerisium', label: '≤', min: 0, max: 50000 }] },
      { key: 'hideRegularRunes', label: 'Regular Runes', enable: true, help: 'Hide common Normal-rarity runes.' },
      { key: 'hideUncutGems', label: 'Uncut Gems', enable: true, help: 'Hide uncut gems below the chosen item level.',
        controls: [{ control: 'number', key: 'hideUncutBelow', label: '≤', min: 0, max: 20 }] },
    ]},
    { id: 'hideFlasksG', title: 'Flasks & Charms', help: 'Turn one on to hide it from your filter (Uniques are never hidden).', rows: [
      { key: 'hideLifeFlasks', label: 'Life Flasks (non-Unique)', enable: true },
      { key: 'hideManaFlasks', label: 'Mana Flasks (non-Unique)', enable: true, help: 'Managed by Leveling Flasks while that is on.' },
      { key: 'hideCharms', label: 'Charms (non-Unique)', enable: true },
    ]},
    { id: 'hideEquipG', title: 'Equipment by Rarity', help: 'Hide leftover jewellery & jewels at or below a rarity.', rows: [
      { label: 'Amulets', enable: false, controls: [{ control: 'select', key: 'hideAmuletsBelow', options: HIDE_BELOW, width: 'w-32' }] },
      { label: 'Rings', enable: false, controls: [{ control: 'select', key: 'hideRingsBelow', options: HIDE_BELOW, width: 'w-32' }] },
      { label: 'Belts', enable: false, controls: [{ control: 'select', key: 'hideBeltsBelow', options: HIDE_BELOW, width: 'w-32' }] },
      { label: 'Jewels', enable: false, controls: [{ control: 'select', key: 'hideJewelsBelow', options: HIDE_BELOW, width: 'w-32' }] },
    ]},
  ]},
]

export const TIERS = ['T1', 'T2', 'T3', 'T4', 'T5']

// Base values for every quick-filter key. Strictness profiles (data/strictness.js) build on this;
// `catchAll` decides what happens to everything not matched: 'show' (dim) or 'hide'.
export const QF_DEFAULTS = {
  // Campaign
  lvlGear: false, lvlGearAreaMin: 1, lvlGearAreaMax: 70,
  lvlWeapons: false, lvlWeaponTypes: [], lvlArmour: false, lvlArmourTypes: [],
  lvlFlasks: false, lvlGold: false, lvlVerisium: false,
  disRares: false, disRaresMaxRarity: 'Rare', disRaresMagic: false, disRaresMaxSize: '2x2',
  socketedGear: false, socketedGearMin: 2,
  qMartial: false, qMartialMin: 1, qMartialRarity: 'all',
  qCaster: false, qCasterMin: 1, qCasterRarity: 'all',
  qArmour: false, qArmourMin: 1, qArmourRarity: 'all',
  // Flasks & Charms
  myFlasks: [],
  charmsHighIlvl: false, qCharms: false, qCharmsMin: 1, qFlasks: false, qFlasksMin: 1,
  hideLifeFlasks: false, hideManaFlasks: false, hideCharms: false,
  // Currency
  currencyHide: [], hideVerisium: false, minVerisium: 0, hideRegularRunes: false,
  hideUncutGems: false, hideUncutBelow: 0,
  econTieringMode: 'all', econBigStacks: false, econBigStackSize: 10,
  // Uniques & Chance Bases
  uExcellent: false, uGood: false, uPotential: false, uDropRestricted: false,
  uTieringMode: 'all', uClassSpecific: [],
  exceptionalUniques: false, exceptionalUniquesMin: 1, vaalModUniques: false, vaalUniques: false,
  smallDisenchantUniques: false, smallDisenchantMaxSize: '2x1', uOther: false, hideAllUniques: false,
  chanceWanted: false, chancePotential: false,
  // Other Items
  showQuest: false, showRelics: false, relicsHideOther: false, showTrials: false,
  // My Equipment
  myWeapons: [], myArmour: [], myJewellery: [], myJewels: [],
  // Other Equipment — Unidentified
  unidRareGear: false, unidRareGearTier: 3, unidMagicGear: false, unidMagicGearTier: 4,
  unidRareJewellery: false, unidRareJewelleryTier: 3, unidMagicJewellery: false, unidMagicJewelleryTier: 3,
  // Other Equipment — Identified
  idShowAll: false, idGear: false, idJewellery: false, idJewels: false, idCustom: false,
  idHideRest: false, idHideRestCorrupted: false, idExcellent: false, idGood: false,
  // Other Equipment — Crafting Bases
  craftQualityGear: false, craftQualityMin: 18, craftSocketGear: false, craftSocketMin: 2,
  craftJewellery: false, craftJewelleryIlvl: 82,
  // Other Equipment — Special
  specialGear: false, doubleAnointAmulets: false, specialJewellery: false, specialJewelleryIlvl: 82, specialJewelleryRemaining: false,
  // Other Equipment — Remaining
  hideAllRemainingGear: false,
  hideRingsBelow: 'all', hideAmuletsBelow: 'all', hideBeltsBelow: 'all', hideJewelsBelow: 'all',

  // ---- Legacy keys: kept so strictness presets, build import & older saved filters still compile.
  // (These no longer have a visible row in the cloned Quick Filter UI, but their override paths
  // remain in lib/overrides.js so existing behaviour is preserved.)
  levelingShow: [], levelingMaxAreaLevel: 0, disenchantRares: false,
  currencyShow: [], hideScrolls: false, hideGold: false, minGoldPile: 0, showWaystones: false, minWaystoneTier: 1, highlightRareWaystones: false,
  gemsShow: [], minGemLevel: 0,
  flasksShow: [], qualityFlasksMin: 0, hideNonUniqueFlasks: false,
  showUniques: false, hideLowValueUniques: false, showChanceBases: false, craftingBaseIlvl: 82,
  endgameShow: [], showTablets: false, showFragments: false, showExpedition: false,
  showJewels: false, highlightJewellery: false,
  gearMinRarity: 'all', gearMinItemLevel: 0, gearMinQuality: 0, gearMinSockets: 0, alwaysShowRareIlvl: 0,
  catchAll: 'show',
}

// QF_DEFAULTS holds shared array values — hand out deep copies so no consumer can ever mutate the
// module-level defaults (or the strictness profiles that spread them) through a nested array.
export const cloneQuickFilters = () => JSON.parse(JSON.stringify(QF_DEFAULTS))

// Class option groups for the 'classItems' control.
export const CLASS_GROUPS = {
  weapons: ['Bows', 'Crossbows', 'Quarterstaves', 'Spears', 'Sceptres', 'Wands', 'Staves', 'One Hand Maces', 'Two Hand Maces', 'Foci', 'Quivers'],
  armour: ['Body Armours', 'Helmets', 'Gloves', 'Boots', 'Shields', 'Bucklers'],
  jewellery: ['Rings', 'Amulets', 'Belts'],
  flasksCharms: ['Life Flasks', 'Mana Flasks', 'Charms'],
  all: ['Bows', 'Crossbows', 'Quarterstaves', 'Spears', 'Sceptres', 'Wands', 'Staves', 'One Hand Maces', 'Two Hand Maces', 'Foci', 'Quivers', 'Body Armours', 'Helmets', 'Gloves', 'Boots', 'Shields', 'Bucklers', 'Rings', 'Amulets', 'Belts'],
}

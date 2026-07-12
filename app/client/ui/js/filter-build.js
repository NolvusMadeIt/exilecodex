// PoE2 filter BUILD engine — the "Build" half of the Filter & Build Editor. This is concept1's
// filter generator (src/lib + src/data) ported VERBATIM into one browser global. It has no React
// coupling — it's pure functions over a plain settings object — so bundling it here (rather than
// re-writing ~800 lines in Lua) is literally the same logic the reference app runs. The Lua plugin
// owns the settings state + Bootstrap UI and calls window.ecFilterBuild; JS owns generation.
//
// Sources folded in (import/export stripped, logic unchanged):
//   data/valueTable.js  data/dropTiers.js  data/styles.js  data/coreFilters.js
//   data/quickFilters.js  data/strictness.js  lib/filterSyntax.js  lib/overrides.js
//   lib/buildFilter.js  store/defaultSettings.js
(function () {
  'use strict'

  // ===================== filterSyntax.js =====================
  var quote = function (value) { return '"' + String(value) + '"' }
  var quoteList = function (values) { return values.map(quote).join(' ') }
  var BASETYPE_CHUNK = 60
  var chunkList = function (items, size) {
    size = size || BASETYPE_CHUNK
    var out = []
    for (var i = 0; i < items.length; i += size) out.push(items.slice(i, i + size))
    return out
  }

  // ===================== valueTable.js =====================
  var CURRENCY_TIERS = {
    S: ['Mirror of Kalandra'],
    A: ['Divine Orb', "Perfect Jeweller's Orb", "Hinekora's Lock"],
    B: ['Exalted Orb', "Greater Jeweller's Orb", 'Orb of Annulment', 'Fracturing Orb',
      'Perfect Chaos Orb', 'Perfect Exalted Orb', 'Perfect Regal Orb',
      'Perfect Orb of Augmentation', 'Perfect Orb of Transmutation',
      'Greater Exalted Orb', 'Greater Regal Orb'],
    C: ['Chaos Orb', 'Regal Orb', 'Vaal Orb', "Gemcutter's Prism", "Lesser Jeweller's Orb",
      'Orb of Alchemy', "Arcanist's Etcher", "Artificer's Orb", "Architect's Orb", 'Orb of Chance',
      'Greater Chaos Orb', 'Greater Orb of Augmentation', 'Greater Orb of Transmutation',
      'Core Destabiliser', 'Crystallised Corruption', 'Vaal Infuser', 'Vaal Cultivation Orb',
      'Ancient Infuser', 'Exotic Coinage', 'Orb of Extraction'],
    D: ["Glassblower's Bauble", 'Orb of Augmentation', "Blacksmith's Whetstone", "Armourer's Scrap",
      'Preserved Cranium', 'Preserved Vertebrae', "Amanamu's Gaze", "Kurgal's Gaze", "Tecrod's Gaze",
      "Ulaman's Gaze", "Citaqualotl's Thesis", "Guatelitzi's Thesis", "Jiquani's Thesis",
      "Quipolatl's Thesis"],
    E: ['Orb of Transmutation', 'Scroll of Wisdom', 'Gold'],
  }
  var CURRENCY_GROUP_RULES = [
    [/\bShard\b/i, 'E'], [/Soul Core/i, 'C'], [/Catalyst/i, 'C'], [/Essence/i, 'C'],
    [/\bRune\b/i, 'C'], [/\bOmen\b/i, 'B'], [/Breachstone/i, 'B'],
    [/Splinter|Fragment|\bCrest\b/i, 'C'], [/Tablet/i, 'C'], [/Barya|Ultimatum|Djinn/i, 'C'],
    [/Logbook|Artifact/i, 'C'], [/\bScarab\b|\bVial\b/i, 'C'], [/Liquid|Concentrated|Diluted/i, 'D'],
    [/\bIdol\b/i, 'D'], [/Collarbone|Jawbone|\bRib\b|Feather/i, 'D'],
  ]
  var UNIQUE_TIERS = {
    S: ['Mageblood', 'Headhunter', 'Original Sin', 'The Adorned', 'Temporalis', 'Ingenuity',
      'Astramentis', 'Hand of Wisdom and Action', 'Voices', 'Megalomaniac'],
    A: ['Ghostwrithe', 'Morior Invictus', "Olroth's Resolve", "Doryani's Prototype",
      "Mahuxotl's Machination", 'The Whispering Ice', 'Mind of the Council', "Voll's Protector",
      "Xoph's Blood", "Ventor's Gamble", 'Darkness Enthroned', 'Soul Mantle', 'Yoke of Suffering',
      'Polcirkeln', 'Lightning Coil', 'The Three Dragons'],
    B: ['Pillar of the Caged God', "Kaom's Heart", "Beira's Anguish", 'Carnage Heart', "Ming's Heart",
      'Andvarius', 'Stone of Lazhwar', "Saffell's Frame", 'Rise of the Phoenix', 'Snakebite',
      "Starkonja's Head", "Alpha's Howl", 'Belly of the Beast', 'Dream Fragments', 'The Pandemonius',
      'Crown of Eyes', 'Soul Tether', 'Wake of Destruction', 'Doomfletch', 'Lycosidae'],
    C: ['Goldrim', 'Wanderlust', 'Tabula Rasa', 'Lifesprig', 'Bramblejack', 'Quill Rain', "Death's Harp",
      'Lochtonial Caress', "Meginord's Girdle", 'Bones of Ullr', 'Bronzebeard', 'Wings of Caelyn',
      'Briskwrap', 'Foxshade', "Berek's Grip", "Berek's Pass", "Berek's Respite", 'Goregirdle',
      'Deidbell', "Thief's Torment"],
  }
  var EXPLICIT = {}
  Object.keys(CURRENCY_TIERS).forEach(function (tid) { CURRENCY_TIERS[tid].forEach(function (n) { EXPLICIT[n] = tid }) })
  Object.keys(UNIQUE_TIERS).forEach(function (tid) { UNIQUE_TIERS[tid].forEach(function (n) { EXPLICIT[n] = tid }) })
  var valueTierOf = function (name) {
    if (!name) return undefined
    if (EXPLICIT[name]) return EXPLICIT[name]
    for (var i = 0; i < CURRENCY_GROUP_RULES.length; i++) if (CURRENCY_GROUP_RULES[i][0].test(name)) return CURRENCY_GROUP_RULES[i][1]
    return undefined
  }

  // ===================== dropTiers.js =====================
  var DROP_TIERS = [
    { id: 'S', name: 'S-Tier', label: 'Purple highlight', beam: 'purple', minimap: 'purple', threshold: '≥ 100', textColor: [182, 96, 224] },
    { id: 'A', name: 'A-Tier', label: 'Red highlight', beam: 'red', minimap: 'red', threshold: '≥ 15', textColor: [224, 64, 64] },
    { id: 'B', name: 'B-Tier', label: 'Orange highlight', beam: 'orange', minimap: 'orange', threshold: '≥ 3', textColor: [224, 144, 42] },
    { id: 'C', name: 'C-Tier', label: 'Yellow highlight', beam: 'yellow', minimap: 'yellow', threshold: '~ 1', textColor: [230, 210, 74] },
    { id: 'D', name: 'D-Tier', label: 'White highlight', beam: 'white', minimap: 'white', threshold: '< 0.5', textColor: [232, 232, 232] },
    { id: 'E', name: 'E-Tier', label: 'Visible, no highlight', beam: null, minimap: null, threshold: '< 0.1', textColor: [200, 200, 200] },
    { id: 'F', name: 'F-Tier', label: 'Hidden', beam: null, minimap: null, threshold: '< 0.01', hide: true, textColor: [120, 120, 120] },
  ]
  var DEFAULT_TIER_CURRENCY = CURRENCY_TIERS
  var DEFAULT_TIER_UNIQUES = UNIQUE_TIERS
  var BEAM_COLORS = ['White', 'Yellow', 'Orange', 'Red', 'Purple', 'Brown', 'Cyan', 'Green', 'Blue', 'Pink', 'Grey']
  var MINIMAP_SHAPES = ['Circle', 'Diamond', 'Hexagon', 'Square', 'Star', 'Triangle', 'Cross', 'Moon', 'Raindrop', 'Kite', 'Pentagon', 'UpsideDownHouse']

  // ===================== styles.js =====================
  var STYLE_PRESETS = {
    default: {},
    aura: {
      S: { bgColor: [46, 18, 62, 210], borderColor: [182, 96, 224, 255] },
      A: { bgColor: [58, 14, 14, 210], borderColor: [224, 64, 64, 255] },
      B: { bgColor: [58, 36, 10, 200], borderColor: [224, 144, 42, 255] },
      C: { bgColor: [52, 46, 12, 180], borderColor: [230, 210, 74, 255] },
      D: { bgColor: [40, 40, 42, 160], borderColor: [200, 200, 200, 255] },
    },
    cobalt: {
      S: { textColor: [130, 150, 255, 255], borderColor: [130, 150, 255, 255] },
      A: { textColor: [90, 160, 240, 255], borderColor: [90, 160, 240, 255] },
      B: { textColor: [80, 190, 230, 255], borderColor: [80, 190, 230, 255] },
      C: { textColor: [150, 205, 240, 255] },
      D: { textColor: [205, 220, 240, 255] },
    },
    darkmode: {
      S: { bgColor: [8, 8, 10, 235], borderColor: [182, 96, 224, 255] },
      A: { bgColor: [8, 8, 10, 235], borderColor: [224, 64, 64, 255] },
      B: { bgColor: [8, 8, 10, 225], borderColor: [224, 144, 42, 255] },
      C: { bgColor: [8, 8, 10, 215], borderColor: [160, 150, 60, 255] },
      D: { bgColor: [8, 8, 10, 205], borderColor: [120, 120, 120, 255] },
    },
    mythic: {
      S: { fontSize: 45, borderColor: [255, 200, 80, 255], bgColor: [30, 10, 45, 220] },
      A: { fontSize: 42, borderColor: [255, 200, 80, 255] },
      B: { fontSize: 38, borderColor: [230, 170, 60, 255] },
      C: { fontSize: 36 },
    },
    vaal: {
      S: { borderColor: [220, 30, 30, 255], bgColor: [40, 0, 0, 220], beam: 'Red' },
      A: { borderColor: [220, 30, 30, 255], bgColor: [30, 0, 0, 200], beam: 'Red' },
      B: { borderColor: [180, 40, 40, 255] },
      C: { borderColor: [140, 50, 50, 255] },
    },
    zen: {
      S: { fontSize: 38 }, A: { fontSize: 36 },
      B: { fontSize: 32, beam: 'None', sound: 'None' },
      C: { fontSize: 30, beam: 'None', sound: 'None' },
      D: { fontSize: 26, beam: 'None', sound: 'None' },
      E: { fontSize: 22 },
    },
    alerts: {
      S: { sound: '6', volume: 300 }, A: { sound: '1', volume: 280 },
      B: { sound: '2', volume: 240 }, C: { sound: '9', volume: 200 }, D: { sound: '4', volume: 150 },
    },
  }
  var stylePreset = function (id) { return STYLE_PRESETS[id] || STYLE_PRESETS.default }

  // ===================== coreFilters.js =====================
  var STRICTNESS_LEVELS = [
    { id: '0-soft', n: 0, name: 'Soft', blurb: 'Hides almost nothing — only the most obvious trash. Best for new players and the early campaign, when you still want to see and learn most drops.' },
    { id: '1-regular', n: 1, name: 'Regular', recommended: true, blurb: 'The balanced baseline. Hides clear clutter while still showing most gear and currency. A solid all-round choice for the campaign and into early maps.' },
    { id: '2-semi-strict', n: 2, name: 'Semi-Strict', blurb: 'Begins hiding low-value normal & magic clutter as drops pick up. Good for the late campaign and early maps.' },
    { id: '3-strict', n: 3, name: 'Strict', blurb: 'Hides most normal and magic items, focusing on rares with good bases, currency and uniques. Built for mapping.' },
    { id: '4-very-strict', n: 4, name: 'Very Strict', blurb: 'Aggressive hiding for fast mapping — only worthwhile bases, valuable currency and uniques get through.' },
    { id: '5-uber-strict', n: 5, name: 'Uber Strict', blurb: 'Shows only high-value drops. For efficient farmers who already know what they are looking for.' },
    { id: '6-uber-plus-strict', n: 6, name: 'Uber-Plus Strict', blurb: 'The strictest tier — only the most valuable items in the game are shown. Maximum screen clarity for speed-farming.' },
  ]
  var STYLES = [
    { id: 'default', name: 'Default', blurb: 'The standard look — tier-colored text and beams.' },
    { id: 'aura', name: 'Aura', blurb: 'Glowing tinted backgrounds behind highlighted items.' },
    { id: 'cobalt', name: 'Cobalt', blurb: 'Cool blue-shifted text palette for the top tiers.' },
    { id: 'darkmode', name: 'Dark Mode', blurb: 'Dark plates behind drops with tier-colored borders.' },
    { id: 'mythic', name: 'Mythic', blurb: 'Bigger labels with gold-trimmed, high-contrast borders.' },
    { id: 'vaal', name: 'Vaal', blurb: 'Red, corrupted-themed borders and backgrounds.' },
    { id: 'zen', name: 'Zen', blurb: 'Smaller labels; no beams or sounds below the top tiers.' },
    { id: 'alerts', name: 'Alert Sounds', blurb: 'A distinct built-in drop sound per value tier.' },
  ]
  var DEFAULT_STRICTNESS = '1-regular'
  var DEFAULT_STYLE = 'default'
  var strictnessLevel = function (id) { for (var i = 0; i < STRICTNESS_LEVELS.length; i++) if (STRICTNESS_LEVELS[i].id === id) return STRICTNESS_LEVELS[i]; return STRICTNESS_LEVELS[1] }
  var styleInfo = function (id) { for (var i = 0; i < STYLES.length; i++) if (STYLES[i].id === id) return STYLES[i]; return STYLES[0] }

  // ===================== quickFilters.js (defaults + UI catalog) =====================
  // Icons in SECTIONS come from concept1's asset()/CATEGORY_ICON. Those bundled art paths don't exist
  // here yet, so stub to '' for now (the engine never reads icons; the UI can wire real ones later).
  var asset = function () { return '' }
  var CATEGORY_ICON = {}
  var CUR = function () { return '' }

  var RARITY_THRESHOLDS = [
    { value: 'all', label: 'All rarities', color: '#c8c8c8' },
    { value: 'Magic', label: '≥ Magic', color: '#8888ff' },
    { value: 'Rare', label: '≥ Rare', color: '#ffff77' },
    { value: 'Unique', label: 'Unique only', color: '#af6025' },
  ]
  var HIDE_BELOW = [
    { value: 'all', label: 'Keep all', color: '#c8c8c8' },
    { value: 'Magic', label: '= Normal', color: '#8888ff' },
    { value: 'Rare', label: '≤ Magic', color: '#ffff77' },
    { value: 'Unique', label: '≤ Rare', color: '#af6025' },
  ]
  var CURRENCY_TYPES = [
    { value: 'shards', label: 'Currency Shards', icon: CUR('currency/currencyupgradetomagicshard.webp') },
    { value: 'runes', label: 'Runes & Soul Cores', icon: CUR('all-runes.png') },
    { value: 'catalysts', label: 'Catalysts', icon: CUR('currency/breach/breachcatalystfire.webp') },
    { value: 'essences', label: 'Essences', icon: CUR('currency/essence/attributeessence.webp') },
    { value: 'omens', label: 'Omens', icon: CUR('currency/omens/omengamblenogoldcost.webp') },
  ]
  var JEWEL_TYPES = ['Emerald', 'Sapphire', 'Ruby', 'Diamond', 'Time-Lost Emerald', 'Time-Lost Sapphire', 'Time-Lost Ruby', 'Time-Lost Diamond']
    .map(function (n) { return { value: n, label: n, icon: CATEGORY_ICON.jewels } })
  var RARITY_MAX = [
    { value: 'all', label: '≤ All' }, { value: 'Normal', label: '≤ Normal' },
    { value: 'Magic', label: '≤ Magic' }, { value: 'Rare', label: '≤ Rare' },
  ]
  var ITEM_SIZES = ['1x1', '1x2', '1x3', '2x1', '2x2', '2x3', '2x4'].map(function (s) { return { value: s, label: '= ' + s } })
  var SOCKET_OPTS = [{ value: 1, label: '≥ 1 Socket' }, { value: 2, label: '≥ 2 Sockets' }, { value: 3, label: '≥ 3 Sockets' }]
  var DROP_TIER_OPTS = [
    { value: 1, label: '≥ T1' }, { value: 2, label: '≥ T2' }, { value: 3, label: '≥ T3' },
    { value: 4, label: '≥ T4' }, { value: 5, label: '≥ T5' },
  ]
  var TIER_MODE = [{ value: 'all', label: 'Normal' }, { value: 'strict', label: 'Strict' }, { value: 'off', label: 'Off' }]

  var SECTIONS = [
    { id: 'campaign', title: 'Campaign', col: 'left', groups: [
      { id: 'autoLeveling', title: 'Auto-Scaling Leveling Items', help: 'Show low-level gear, flasks and currency while you level — scoped to area level so it stops cluttering once you out-level it.', rows: [
        { key: 'lvlGear', label: 'Leveling Gear', enable: true, help: 'Show Normal/Magic/Rare weapons & armour while you are within the chosen area-level range.', controls: [{ control: 'areaRange', minKey: 'lvlGearAreaMin', maxKey: 'lvlGearAreaMax', label: 'Between Area Levels' }] },
        { key: 'lvlWeapons', label: 'Leveling Weapons', enable: true, help: 'Which weapon types to show while leveling (empty = all).', controls: [{ control: 'classItems', group: 'weapons', key: 'lvlWeaponTypes', allLabel: 'All' }] },
        { key: 'lvlArmour', label: 'Leveling Armour', enable: true, help: 'Which armour types to show while leveling (empty = all).', controls: [{ control: 'classItems', group: 'armour', key: 'lvlArmourTypes', allLabel: 'All' }] },
        { key: 'lvlFlasks', label: 'Leveling Flasks', enable: true, help: 'Show Life & Mana flasks while leveling.' },
        { key: 'lvlGold', label: 'Leveling Gold', enable: true, help: 'Show every gold pile while leveling (no minimum).' },
        { key: 'lvlVerisium', label: 'Leveling Verisium', enable: true, help: 'Show Verisium while leveling.' },
      ] },
      { id: 'salvage', title: 'Disenchanting, Selling & Salvaging Gear', help: 'Keep small / quality items visible so you can salvage, disenchant or vendor them.', rows: [
        { key: 'disRares', label: 'Rares to Disenchant or sell', enable: true, help: 'Show small Rare (optionally Magic) items up to a footprint, so you can grab them to disenchant or sell.', controls: [
          { control: 'select', key: 'disRaresMaxRarity', options: RARITY_MAX, width: 'w-24' },
          { control: 'toggle', key: 'disRaresMagic', label: 'Magic' },
          { control: 'select', key: 'disRaresMaxSize', options: ITEM_SIZES, width: 'w-24' },
        ] },
        { key: 'socketedGear', label: 'Socketed Gear', enable: true, help: 'Always show gear with at least this many sockets.', controls: [{ control: 'select', key: 'socketedGearMin', options: SOCKET_OPTS, width: 'w-32' }] },
        { key: 'qMartial', label: 'Quality Martial Weapons', enable: true, help: 'Show martial (attack) weapons of at least this quality, up to a rarity.', controls: [{ control: 'number', key: 'qMartialMin', label: 'Of Quality', min: 1, max: 20 }, { control: 'select', key: 'qMartialRarity', options: RARITY_MAX, width: 'w-24' }] },
        { key: 'qCaster', label: 'Quality Caster Weapons', enable: true, help: 'Show caster weapons of at least this quality, up to a rarity.', controls: [{ control: 'number', key: 'qCasterMin', label: 'Of Quality', min: 1, max: 20 }, { control: 'select', key: 'qCasterRarity', options: RARITY_MAX, width: 'w-24' }] },
        { key: 'qArmour', label: 'Quality Shields and Armour', enable: true, help: 'Show armour & shields of at least this quality, up to a rarity.', controls: [{ control: 'number', key: 'qArmourMin', label: 'Of Quality', min: 1, max: 20 }, { control: 'select', key: 'qArmourRarity', options: RARITY_MAX, width: 'w-24' }] },
      ] },
    ] },
    { id: 'flasks', title: 'Flasks & Charms', col: 'left', groups: [
      { id: 'myFlasks', title: 'My Flasks and Charms', help: 'Always show the flask & charm types you actually use.', rows: [
        { label: '', enable: false, controls: [{ control: 'classItems', group: 'flasksCharms', key: 'myFlasks', allLabel: 'Add Flask Type' }] },
      ] },
      { id: 'craftFlasks', title: 'Crafting & Quality Flasks and Charms', help: 'Keep high-quality / high-iLvl flasks & charms worth crafting or selling.', rows: [
        { key: 'charmsHighIlvl', label: 'High iLevel Normal Charms', enable: true, help: 'Show white charms at high item level (good bases to roll).' },
        { key: 'qCharms', label: 'Quality Charms', enable: true, help: 'Show charms of at least this quality.', controls: [{ control: 'number', key: 'qCharmsMin', label: 'Of Quality', min: 1, max: 20 }] },
        { key: 'qFlasks', label: 'Quality Flasks', enable: true, help: 'Show flasks of at least this quality.', controls: [{ control: 'number', key: 'qFlasksMin', label: 'Of Quality', min: 1, max: 20 }] },
      ] },
    ] },
    { id: 'currency', title: 'Currency', col: 'left', groups: [
      { id: 'economy', title: 'Economy', help: 'How aggressively to tier and trim currency by market value.', rows: [
        { label: 'Currency Tiering Mode', enable: false, help: 'Normal keeps the preset behaviour. Strict hides low-tier shards. Off hides all but the highest-value currency shards.', controls: [{ control: 'select', key: 'econTieringMode', options: TIER_MODE, width: 'w-28' }] },
        { key: 'econBigStacks', label: 'Highlight Large Currency Stacks', enable: true, help: 'Give big stacks of currency a louder highlight.', controls: [{ control: 'number', key: 'econBigStackSize', label: '≥', min: 2, max: 5000 }] },
      ] },
    ] },
    { id: 'uniques', title: 'Uniques & Chance Bases', col: 'left', groups: [
      { id: 'valuableUniques', title: 'Valuable Uniques', help: 'Highlight uniques by value tier (seeded from the Uniques Tier List — re-tier there any time).', rows: [
        { key: 'uExcellent', label: 'Excellent Uniques', enable: true, help: 'Loudly highlight your S-tier uniques.' },
        { key: 'uGood', label: 'Good Uniques', enable: true, help: 'Highlight your A-tier uniques.' },
        { key: 'uPotential', label: 'Potential Uniques', enable: true, help: 'Highlight your B-tier uniques.' },
        { key: 'uDropRestricted', label: 'Good Drop-Restricted Uniques', enable: true, help: 'Show every remaining unique so a restricted-drop unique is never missed.' },
        { label: 'Unique Tiering Mode', enable: false, help: 'Normal keeps the highlights above. Off disables value-tier unique highlights.', controls: [{ control: 'select', key: 'uTieringMode', options: TIER_MODE, width: 'w-28' }] },
        { label: 'Class-specific Uniques', enable: false, help: 'Highlight uniques on the gear classes you pick.', controls: [{ control: 'classItems', group: 'all', key: 'uClassSpecific', allLabel: 'None' }] },
      ] },
      { id: 'specialUniques', title: 'Special Uniques', help: 'Corrupted and high-quality uniques.', rows: [
        { key: 'exceptionalUniques', label: 'Exceptional Uniques', enable: true, help: 'Highlight uniques of at least this quality.', controls: [{ control: 'number', key: 'exceptionalUniquesMin', label: 'Min Quality', min: 1, max: 20 }] },
        { key: 'vaalModUniques', label: 'Vaal Mod Uniques', enable: true, help: 'Highlight corrupted uniques (may carry a Vaal implicit).' },
        { key: 'vaalUniques', label: 'Vaal Uniques', enable: true, help: 'Highlight uniques on Vaal base types.' },
      ] },
      { id: 'remainingUniques', title: 'Remaining Uniques', help: 'What to do with the rest.', rows: [
        { key: 'smallDisenchantUniques', label: 'Small Disenchant Uniques', enable: true, help: 'Show small uniques up to a footprint, for disenchanting.', controls: [{ control: 'select', key: 'smallDisenchantMaxSize', options: ITEM_SIZES, width: 'w-24' }] },
        { key: 'uOther', label: 'Other Uniques', enable: true, help: 'Show every other unique (dim, no highlight).' },
      ] },
      { id: 'chanceBases', title: 'Chance Bases', help: 'White bases worth using an Orb of Chance on.', rows: [
        { key: 'chanceWanted', label: 'Wanted Chance Bases', enable: true, help: 'Loudly highlight high-item-level white bases worth chancing.' },
        { key: 'chancePotential', label: 'Potential Chance Bases', enable: true, help: 'Show other white bases that could be chanced (dim).' },
      ] },
    ] },
    { id: 'other', title: 'Other Items', col: 'left', groups: [
      { id: 'otherItems', title: 'Other Items', help: 'Quest, trial and waystone drops.', rows: [
        { key: 'showQuest', label: 'Quest Items', enable: true },
        { key: 'showRelics', label: 'Trial of the Sekhemas Relics', enable: true, help: 'Show relics.' },
        { key: 'showTrials', label: 'Trial of the Sekhemas Keys', enable: true, help: 'Show Barya / Ultimatum / Djinn keys.' },
        { key: 'highlightRareWaystones', label: 'Rare Waystones', enable: true, help: 'Highlight Rare waystones.' },
        { key: 'showWaystones', label: 'Other Waystones', enable: true, help: 'Force waystones to show at/above a tier.', controls: [{ control: 'number', key: 'minWaystoneTier', label: '≥ Tier', min: 1, max: 16 }] },
      ] },
    ] },
    { id: 'myEquipment', title: 'My Equipment', col: 'right', groups: [
      { id: 'myWeaponsG', title: 'My Weapons', help: 'Weapon types your build uses — off-build weapons get hidden below Unique.', rows: [
        { label: '', enable: false, controls: [{ control: 'classItems', group: 'weapons', key: 'myWeapons', allLabel: 'Add Weapon Type' }] },
      ] },
      { id: 'myArmourG', title: 'My Armour', help: 'Armour types your build uses — off-build armour gets hidden below Unique.', rows: [
        { label: '', enable: false, controls: [{ control: 'classItems', group: 'armour', key: 'myArmour', allLabel: 'Add Armour Type' }] },
      ] },
      { id: 'myJewelleryG', title: 'My Jewellery', help: 'Jewellery you care about — off-build jewellery gets hidden below Unique.', rows: [
        { label: '', enable: false, controls: [{ control: 'classItems', group: 'jewellery', key: 'myJewellery', allLabel: 'Add Jewellery Type' }] },
      ] },
      { id: 'myJewelsG', title: 'My Jewels', help: 'Jewel types you want shown — other jewels get hidden below Unique.', rows: [
        { label: '', enable: false, controls: [{ control: 'multi', key: 'myJewels', options: JEWEL_TYPES, allLabel: 'Add Jewel Type' }] },
      ] },
    ] },
    { id: 'otherEquipment', title: 'Other Equipment', col: 'right', groups: [
      { id: 'unidEquip', title: 'Unidentified Equipment', help: 'Show unidentified gear & jewellery at/above a value tier.', rows: [
        { key: 'unidRareGear', label: 'Rare Gear', enable: true, help: 'Show unidentified Rare weapons & armour at/above this drop tier.', controls: [{ control: 'select', key: 'unidRareGearTier', options: DROP_TIER_OPTS, width: 'w-24' }] },
        { key: 'unidMagicGear', label: 'Magic Gear', enable: true, help: 'Show unidentified Magic weapons & armour at/above this drop tier.', controls: [{ control: 'select', key: 'unidMagicGearTier', options: DROP_TIER_OPTS, width: 'w-24' }] },
        { key: 'unidRareJewellery', label: 'Rare Jewellery', enable: true, help: 'Show unidentified Rare jewellery at/above this drop tier.', controls: [{ control: 'select', key: 'unidRareJewelleryTier', options: DROP_TIER_OPTS, width: 'w-24' }] },
        { key: 'unidMagicJewellery', label: 'Magic Jewellery', enable: true, help: 'Show unidentified Magic jewellery at/above this drop tier.', controls: [{ control: 'select', key: 'unidMagicJewelleryTier', options: DROP_TIER_OPTS, width: 'w-24' }] },
      ] },
      { id: 'idCategories', title: 'Identified Item Categories', help: 'Show identified items by category.', rows: [
        { key: 'idShowAll', label: 'Show All Identified Items', enable: true },
        { key: 'idGear', label: 'Identified Gear', enable: true, help: 'Show identified weapons & armour.' },
        { key: 'idJewellery', label: 'Identified Jewellery', enable: true },
        { key: 'idJewels', label: 'Identified Jewels', enable: true },
        { key: 'idCustom', label: 'Identified Custom Items', enable: true, help: 'Show identified items on your My Equipment classes.' },
      ] },
      { id: 'idConfigs', title: 'Identified Item Configurations', help: 'Highlight identified items by quality of roll (item level as the value proxy).', rows: [
        { key: 'idExcellent', label: 'Excellent Identified Items', enable: true, help: 'Loudly highlight identified Rare items at expert-tier item level (≥ 82).' },
        { key: 'idGood', label: 'Good Identified Items', enable: true, help: 'Highlight identified Rare items at high item level (≥ 75).' },
      ] },
      { id: 'craftingBases', title: 'Crafting Bases', help: 'High-quality / high-item-level white bases for crafting.', rows: [
        { key: 'craftQualityGear', label: 'Excellent Quality Gear', enable: true, help: 'Highlight Normal/Magic gear of at least this quality.', controls: [{ control: 'number', key: 'craftQualityMin', label: '≥ Quality', min: 1, max: 20 }] },
        { key: 'craftSocketGear', label: 'Excellent Socketed Gear', enable: true, help: 'Highlight Normal gear with at least this many sockets.', controls: [{ control: 'select', key: 'craftSocketMin', options: SOCKET_OPTS, width: 'w-32' }] },
        { key: 'showCraftingBases', label: 'High iLevel Normal Gear', enable: true, help: 'Highlight white weapons & armour at/above this item level.', controls: [{ control: 'number', key: 'craftingBaseIlvl', label: '≥ iLevel', min: 1, max: 100 }] },
        { key: 'craftJewellery', label: 'Excellent Jewellery', enable: true, help: 'Highlight Normal/Magic jewellery at/above this item level.', controls: [{ control: 'number', key: 'craftJewelleryIlvl', label: '≥ iLevel', min: 1, max: 100 }] },
      ] },
      { id: 'specialEquip', title: 'Special Equipment', help: 'High-end rare bases & jewellery worth a second look.', rows: [
        { key: 'specialGear', label: 'Special Gear', enable: true, help: 'Highlight Rare weapons & armour at top-tier item level (≥ 82).' },
        { key: 'doubleAnointAmulets', label: 'Double-Anointed Amulets', enable: true, help: 'Highlight high-item-level Rare amulets (amulets can carry anoints).' },
        { key: 'specialJewellery', label: 'Excellent Special Jewellery', enable: true, help: 'Highlight Rare jewellery at/above this item level.', controls: [{ control: 'number', key: 'specialJewelleryIlvl', label: '≥ iLevel', min: 1, max: 100 }] },
        { key: 'specialJewelleryRemaining', label: 'Remaining Special Jewellery', enable: true, help: 'Show every other Rare jewellery (dim).' },
      ] },
    ] },
    { id: 'hideItems', title: 'Hide', col: 'right', groups: [
      { id: 'hideCurrencyG', title: 'Currency & Gems', help: 'Turn one on to hide it from your filter.', rows: [
        { key: 'hideScrolls', label: 'Scrolls of Wisdom', enable: true },
        { label: 'Currency Types', enable: false, help: 'Hide these currency groups entirely.', controls: [{ control: 'multi', key: 'currencyHide', options: CURRENCY_TYPES, allLabel: 'None' }] },
        { key: 'hideGold', label: 'Gold Stacks', enable: true, help: 'Hide gold piles below the chosen stack size (no size = hide all gold). Managed by Leveling Gold while that is on.', controls: [{ control: 'number', key: 'minGoldPile', label: '≤', min: 0, max: 50000 }] },
        { key: 'hideVerisium', label: 'Verisium Stacks', enable: true, help: 'Hide Verisium below the chosen stack size. Managed by Leveling Verisium while that is on.', controls: [{ control: 'number', key: 'minVerisium', label: '≤', min: 0, max: 50000 }] },
        { key: 'hideRegularRunes', label: 'Regular Runes', enable: true, help: 'Hide common Normal-rarity runes.' },
        { key: 'hideUncutGems', label: 'Uncut Gems', enable: true, help: 'Hide uncut gems below the chosen item level.', controls: [{ control: 'number', key: 'hideUncutBelow', label: '≤', min: 0, max: 20 }] },
      ] },
      { id: 'hideFlasksG', title: 'Flasks & Charms', help: 'Turn one on to hide it from your filter (Uniques are never hidden).', rows: [
        { key: 'hideLifeFlasks', label: 'Life Flasks (non-Unique)', enable: true },
        { key: 'hideManaFlasks', label: 'Mana Flasks (non-Unique)', enable: true, help: 'Managed by Leveling Flasks while that is on.' },
        { key: 'hideCharms', label: 'Charms (non-Unique)', enable: true },
      ] },
      { id: 'hideEquipG', title: 'Equipment by Rarity', help: 'Hide leftover jewellery & jewels at or below a rarity.', rows: [
        { label: 'Amulets', enable: false, controls: [{ control: 'select', key: 'hideAmuletsBelow', options: HIDE_BELOW, width: 'w-32' }] },
        { label: 'Rings', enable: false, controls: [{ control: 'select', key: 'hideRingsBelow', options: HIDE_BELOW, width: 'w-32' }] },
        { label: 'Belts', enable: false, controls: [{ control: 'select', key: 'hideBeltsBelow', options: HIDE_BELOW, width: 'w-32' }] },
        { label: 'Jewels', enable: false, controls: [{ control: 'select', key: 'hideJewelsBelow', options: HIDE_BELOW, width: 'w-32' }] },
      ] },
    ] },
  ]

  var QF_DEFAULTS = {
    lvlGear: false, lvlGearAreaMin: 1, lvlGearAreaMax: 70,
    lvlWeapons: false, lvlWeaponTypes: [], lvlArmour: false, lvlArmourTypes: [],
    lvlFlasks: false, lvlGold: false, lvlVerisium: false,
    disRares: false, disRaresMaxRarity: 'Rare', disRaresMagic: false, disRaresMaxSize: '2x2',
    socketedGear: false, socketedGearMin: 2,
    qMartial: false, qMartialMin: 1, qMartialRarity: 'all',
    qCaster: false, qCasterMin: 1, qCasterRarity: 'all',
    qArmour: false, qArmourMin: 1, qArmourRarity: 'all',
    myFlasks: [],
    charmsHighIlvl: false, qCharms: false, qCharmsMin: 1, qFlasks: false, qFlasksMin: 1,
    hideLifeFlasks: false, hideManaFlasks: false, hideCharms: false,
    currencyHide: [], hideVerisium: false, minVerisium: 0, hideRegularRunes: false,
    hideUncutGems: false, hideUncutBelow: 0,
    econTieringMode: 'all', econBigStacks: false, econBigStackSize: 10,
    uExcellent: false, uGood: false, uPotential: false, uDropRestricted: false,
    uTieringMode: 'all', uClassSpecific: [],
    exceptionalUniques: false, exceptionalUniquesMin: 1, vaalModUniques: false, vaalUniques: false,
    smallDisenchantUniques: false, smallDisenchantMaxSize: '2x1', uOther: false, hideAllUniques: false,
    chanceWanted: false, chancePotential: false,
    showQuest: false, showRelics: false, relicsHideOther: false, showTrials: false,
    myWeapons: [], myArmour: [], myJewellery: [], myJewels: [],
    unidRareGear: false, unidRareGearTier: 3, unidMagicGear: false, unidMagicGearTier: 4,
    unidRareJewellery: false, unidRareJewelleryTier: 3, unidMagicJewellery: false, unidMagicJewelleryTier: 3,
    idShowAll: false, idGear: false, idJewellery: false, idJewels: false, idCustom: false,
    idHideRest: false, idHideRestCorrupted: false, idExcellent: false, idGood: false,
    craftQualityGear: false, craftQualityMin: 18, craftSocketGear: false, craftSocketMin: 2,
    craftJewellery: false, craftJewelleryIlvl: 82,
    specialGear: false, doubleAnointAmulets: false, specialJewellery: false, specialJewelleryIlvl: 82, specialJewelleryRemaining: false,
    hideAllRemainingGear: false,
    hideRingsBelow: 'all', hideAmuletsBelow: 'all', hideBeltsBelow: 'all', hideJewelsBelow: 'all',
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
  var cloneQuickFilters = function () { return JSON.parse(JSON.stringify(QF_DEFAULTS)) }
  var CLASS_GROUPS = {
    weapons: ['Bows', 'Crossbows', 'Quarterstaves', 'Spears', 'Sceptres', 'Wands', 'Staves', 'One Hand Maces', 'Two Hand Maces', 'Foci', 'Quivers'],
    armour: ['Body Armours', 'Helmets', 'Gloves', 'Boots', 'Shields', 'Bucklers'],
    jewellery: ['Rings', 'Amulets', 'Belts'],
    flasksCharms: ['Life Flasks', 'Mana Flasks', 'Charms'],
    all: ['Bows', 'Crossbows', 'Quarterstaves', 'Spears', 'Sceptres', 'Wands', 'Staves', 'One Hand Maces', 'Two Hand Maces', 'Foci', 'Quivers', 'Body Armours', 'Helmets', 'Gloves', 'Boots', 'Shields', 'Bucklers', 'Rings', 'Amulets', 'Belts'],
  }

  // ===================== strictness.js =====================
  var ALL_CURRENCY = ['shards', 'runes', 'catalysts', 'essences', 'omens']
  var ALL_GEMS = ['uncut', 'skill', 'support']
  var ALL_FLASKS = ['life', 'mana', 'charms']
  var ALL_ENDGAME = ['quest', 'relics', 'trials', 'tablets', 'fragments', 'expedition']
  var qfProfile = function (over) { return Object.assign({}, QF_DEFAULTS, over) }
  var STRICTNESS_PROFILES = {
    '0-soft': qfProfile({ currencyShow: ALL_CURRENCY, gemsShow: ALL_GEMS, flasksShow: ALL_FLASKS, endgameShow: ALL_ENDGAME, showWaystones: true, showJewels: true, showUniques: true, hideScrolls: false, hideGold: false, minGoldPile: 0, hideNonUniqueFlasks: false, gearMinRarity: 'all', catchAll: 'show' }),
    '1-regular': qfProfile({ currencyShow: ALL_CURRENCY, gemsShow: ALL_GEMS, flasksShow: ALL_FLASKS, endgameShow: ALL_ENDGAME, showWaystones: true, showJewels: true, showUniques: true, hideScrolls: true, minGoldPile: 200, hideNonUniqueFlasks: false, gearMinRarity: 'all', catchAll: 'show' }),
    '2-semi-strict': qfProfile({ currencyShow: ALL_CURRENCY, gemsShow: ALL_GEMS, flasksShow: ALL_FLASKS, endgameShow: ALL_ENDGAME, showWaystones: true, showJewels: true, showUniques: true, hideScrolls: true, minGoldPile: 400, hideNonUniqueFlasks: true, gearMinRarity: 'Magic', catchAll: 'show' }),
    '3-strict': qfProfile({ levelingShow: [], currencyShow: ALL_CURRENCY, gemsShow: ['skill', 'support'], flasksShow: ['life', 'mana'], endgameShow: ALL_ENDGAME, showWaystones: true, showJewels: true, showUniques: true, highlightJewellery: true, hideScrolls: true, minGoldPile: 800, hideNonUniqueFlasks: true, gearMinRarity: 'Rare', alwaysShowRareIlvl: 80, catchAll: 'hide' }),
    '4-very-strict': qfProfile({ levelingShow: [], currencyShow: ['runes', 'catalysts', 'essences', 'omens'], gemsShow: ['skill', 'support'], flasksShow: [], endgameShow: ['trials', 'tablets', 'fragments', 'expedition'], showWaystones: true, showJewels: true, showUniques: true, highlightJewellery: true, hideLowValueUniques: true, hideScrolls: true, minGoldPile: 1500, hideNonUniqueFlasks: true, gearMinRarity: 'Rare', alwaysShowRareIlvl: 82, catchAll: 'hide' }),
    '5-uber-strict': qfProfile({ levelingShow: [], currencyShow: ['runes', 'essences', 'omens'], gemsShow: ['support'], flasksShow: [], endgameShow: ['tablets', 'fragments'], showWaystones: true, showJewels: true, showUniques: true, highlightJewellery: true, hideLowValueUniques: true, hideScrolls: true, minGoldPile: 3000, hideNonUniqueFlasks: true, gearMinRarity: 'Rare', alwaysShowRareIlvl: 84, catchAll: 'hide' }),
    '6-uber-plus-strict': qfProfile({ levelingShow: [], currencyShow: ['essences', 'omens'], gemsShow: [], flasksShow: [], endgameShow: ['fragments'], showWaystones: true, showJewels: false, showUniques: true, highlightJewellery: true, hideLowValueUniques: true, hideScrolls: true, hideGold: true, minGoldPile: 0, hideNonUniqueFlasks: true, gearMinRarity: 'Rare', alwaysShowRareIlvl: 86, catchAll: 'hide' }),
  }
  var strictnessProfile = function (id) { return JSON.parse(JSON.stringify(STRICTNESS_PROFILES[id] || STRICTNESS_PROFILES['1-regular'])) }

  // ===================== overrides.js =====================
  var TIER_BY_ID = {}; DROP_TIERS.forEach(function (t) { TIER_BY_ID[t.id] = t })
  var clampVol = function (v) { return Math.max(0, Math.min(300, Math.round(Number(v) || 0))) }
  var clampFont = function (v) { return Math.max(18, Math.min(45, Math.round(Number(v) || 32))) }
  var num = function (v) { return v != null && v !== '' && !Number.isNaN(Number(v)) && Number(v) !== 0 }
  var col4 = function (c) { return Array.isArray(c) ? [c[0], c[1], c[2], c[3] == null ? 255 : c[3]].join(' ') : c }
  var splitNames = function (s) { return String(s || '').split(/[\n,]/).map(function (x) { return x.trim() }).filter(Boolean) }
  var RARITY_ORDER = ['Normal', 'Magic', 'Rare', 'Unique']
  function rarityCond(rarity, op) {
    if (!rarity) return null
    var i = RARITY_ORDER.indexOf(rarity)
    if (i < 0) return 'Rarity ' + rarity
    var keep
    if (op === '>=') keep = RARITY_ORDER.slice(i)
    else if (op === '>') keep = RARITY_ORDER.slice(i + 1)
    else if (op === '<=') keep = RARITY_ORDER.slice(0, i + 1)
    else if (op === '<') keep = RARITY_ORDER.slice(0, i)
    else keep = [rarity]
    return keep.length ? 'Rarity ' + keep.join(' ') : null
  }
  function matchConditions(m) {
    m = m || {}
    var c = []
    if (m.classes && m.classes.length) c.push('Class == ' + quoteList(m.classes))
    var names = splitNames(m.baseType)
    if (names.length) c.push(m.baseMode === 'exact' ? 'BaseType == ' + quoteList(names) : 'BaseType ' + quoteList(names))
    var rc = rarityCond(m.rarity, m.rarityOp)
    if (rc) c.push(rc)
    if (num(m.itemLevel)) c.push('ItemLevel ' + (m.itemLevelOp || '>=') + ' ' + Number(m.itemLevel))
    if (num(m.quality)) c.push('Quality ' + (m.qualityOp || '>=') + ' ' + Number(m.quality))
    if (num(m.sockets)) c.push('Sockets ' + (m.socketsOp || '>=') + ' ' + Number(m.sockets))
    if (num(m.stackSize)) c.push('StackSize ' + (m.stackSizeOp || '>=') + ' ' + Number(m.stackSize))
    if (num(m.waystoneTier)) c.push('WaystoneTier ' + (m.waystoneTierOp || '>=') + ' ' + Number(m.waystoneTier))
    if (num(m.areaLevel)) c.push('AreaLevel ' + (m.areaLevelOp || '>=') + ' ' + Number(m.areaLevel))
    return c
  }
  function emitStyle(st) {
    st = st || {}
    var out = []
    if (st.textColor) out.push('SetTextColor ' + col4(st.textColor))
    if (st.borderColor) out.push('SetBorderColor ' + col4(st.borderColor))
    if (st.bgColor) out.push('SetBackgroundColor ' + col4(st.bgColor))
    if (st.fontSize) out.push('SetFontSize ' + clampFont(st.fontSize))
    if (st.beam) out.push('PlayEffect ' + st.beam + (st.beamTemp ? ' Temp' : ''))
    if (st.minimap) out.push('MinimapIcon ' + (st.minimapSize == null ? 1 : st.minimapSize) + ' ' + st.minimap + ' ' + (st.minimapShape || 'Circle'))
    if (st.customSound) out.push('CustomAlertSound "' + st.customSound + '" ' + clampVol(st.volume == null ? 200 : st.volume))
    else if (st.sound && st.sound !== 'None') out.push('PlayAlertSound ' + st.sound + ' ' + clampVol(st.volume == null ? 200 : st.volume))
    return out
  }
  var DEFAULT_HIGHLIGHT = { textColor: [255, 255, 255, 255], borderColor: [255, 80, 80, 255], bgColor: [40, 0, 0, 255], fontSize: 40, beam: 'Red', minimap: 'Red', minimapShape: 'Star', sound: 1, volume: 300 }
  function tierStyle(tierId, cosmetic, category) {
    cosmetic = cosmetic || {}; category = category || 'items'
    var t = TIER_BY_ID[tierId] || TIER_BY_ID.E
    var ov = Object.assign({}, stylePreset(cosmetic._styleId)[tierId] || {}, (cosmetic.tierStyles && cosmetic.tierStyles[tierId]) || {}, (cosmetic.categoryStyles && cosmetic.categoryStyles[category] && cosmetic.categoryStyles[category][tierId]) || {})
    var cap = function (s) { return s ? s[0].toUpperCase() + s.slice(1) : s }
    var beam = ov.beam != null ? ov.beam : (t.beam ? cap(t.beam) : 'None')
    var st = { textColor: ov.textColor || t.textColor, fontSize: ov.fontSize || (t.id === 'S' ? 40 : t.id === 'A' ? 38 : t.id === 'B' ? 36 : 34) }
    if (ov.borderColor) st.borderColor = ov.borderColor
    if (ov.bgColor) st.bgColor = ov.bgColor
    if (beam && beam !== 'None') { st.beam = beam; st.minimap = beam; st.minimapShape = ov.shape || 'Circle' }
    if (ov.customSound && ov.customSound.trim()) { st.customSound = ov.customSound.trim(); st.volume = ov.volume == null ? 200 : ov.volume }
    else if (ov.sound && ov.sound !== 'None') { st.sound = ov.sound; st.volume = ov.volume == null ? 200 : ov.volume }
    return st
  }
  function tierHidden(tierId, cosmetic, category) {
    cosmetic = cosmetic || {}; category = category || 'items'
    if (tierId === 'F') return true
    var cat = cosmetic.categoryStyles && cosmetic.categoryStyles[category] && cosmetic.categoryStyles[category][tierId]
    if (cat && cat.hide != null) return cat.hide
    var glob = cosmetic.tierStyles && cosmetic.tierStyles[tierId]
    if (glob && glob.hide != null) return glob.hide
    return !!(TIER_BY_ID[tierId] && TIER_BY_ID[tierId].hide)
  }
  function renderBlock(d) {
    var lines = [d.action + ' # ' + (d.comment || 'Exile Codex override')]
    ;(d.conditions || []).forEach(function (c) { if (c) lines.push('\t' + c) })
    if (d.action === 'Show') emitStyle(d.style || {}).forEach(function (s) { lines.push('\t' + s) })
    return lines.join('\n')
  }
  var WEAPON_CLASSES = ['Bows', 'Crossbows', 'Quarterstaves', 'Spears', 'Sceptres', 'Wands', 'Staves', 'One Hand Maces', 'Two Hand Maces', 'Foci', 'Quivers']
  var ARMOUR_CLASSES = ['Body Armours', 'Helmets', 'Gloves', 'Boots', 'Shields', 'Bucklers']
  var JEWELLERY_CLASSES = ['Rings', 'Amulets', 'Belts']
  var GEAR_CLASSES = WEAPON_CLASSES.concat(ARMOUR_CLASSES, JEWELLERY_CLASSES)
  var MARTIAL_WEAPONS = ['One Hand Maces', 'Two Hand Maces', 'Spears', 'Quarterstaves', 'Bows', 'Crossbows']
  var CASTER_WEAPONS = ['Wands', 'Sceptres', 'Staves', 'Foci']
  function ruleDescriptors(rules) {
    rules = rules || []
    var out = []
    rules.forEach(function (r) {
      if (!r || r.enabled === false) return
      if (r.raw && r.raw.trim()) { out.push({ raw: r.raw.trim(), priority: r.action === 'Hide' ? 40 : 20 }); return }
      var action = r.action === 'Hide' ? 'Hide' : 'Show'
      var conditions = matchConditions(r.match || {})
      if (!conditions.length) return
      out.push({ action: action, conditions: conditions, comment: r.label || (action === 'Hide' ? 'Hidden by you' : 'Highlighted by you'), style: action === 'Show' ? (r.style || DEFAULT_HIGHLIGHT) : undefined, priority: action === 'Show' ? 20 : 40 })
    })
    return out
  }
  function quickFilterDescriptors(qf, cosmetic, uniqueBases) {
    qf = qf || {}; cosmetic = cosmetic || {}; uniqueBases = uniqueBases || {}
    var out = []
    var has = function (arr, v) { return Array.isArray(arr) && arr.indexOf(v) !== -1 }
    var showT = function (comment, conditions, tier, priority, cat) { out.push({ action: 'Show', comment: comment, conditions: conditions, style: tierStyle(tier || 'C', cosmetic, cat || 'items'), priority: priority == null ? 22 : priority }) }
    var highlight = function (comment, conditions, priority) { out.push({ action: 'Show', comment: comment, conditions: conditions, style: DEFAULT_HIGHLIGHT, priority: priority == null ? 16 : priority }) }
    var hide = function (comment, conditions, priority) { out.push({ action: 'Hide', comment: comment, conditions: conditions, priority: priority == null ? 46 : priority }) }
    var lvl = function (n) { return num(n) ? ['GemLevel >= ' + Number(n)] : [] }
    var tierIlvl = function (t) { var m = { 1: 82, 2: 75, 3: 68, 4: 60, 5: 50 }; return m[Number(t)] == null ? 50 : m[Number(t)] }

    if (has(qf.currencyShow, 'shards')) showT('Show Currency Shards', ['BaseType ' + quoteList(['Shard'])], 'D', 22, 'currency')
    if (has(qf.currencyShow, 'runes')) showT('Show Runes & Soul Cores', ['BaseType ' + quoteList(['Rune', 'Soul Core'])], 'C', 22, 'currency')
    if (has(qf.currencyShow, 'catalysts')) showT('Show Catalysts', ['BaseType ' + quoteList(['Catalyst'])], 'C', 22, 'currency')
    if (has(qf.currencyShow, 'essences')) showT('Show Essences', ['BaseType ' + quoteList(['Essence'])], 'C', 22, 'currency')
    if (has(qf.currencyShow, 'omens')) showT('Show Omens', ['BaseType ' + quoteList(['Omen'])], 'C', 22, 'currency')
    if (qf.hideScrolls) hide('Hide Scrolls of Wisdom', ['BaseType == ' + quote('Scroll of Wisdom')])
    if (qf.hideGold) hide('Hide Gold', ['BaseType == ' + quote('Gold')])
    else if (num(qf.minGoldPile)) hide('Hide small gold piles (< ' + Number(qf.minGoldPile) + ')', ['BaseType == ' + quote('Gold'), 'StackSize < ' + Number(qf.minGoldPile)])
    if (qf.showWaystones) showT('Show Waystones', ['Class == ' + quoteList(['Waystones'])].concat(Number(qf.minWaystoneTier) > 1 ? ['WaystoneTier >= ' + Number(qf.minWaystoneTier)] : []), 'C')
    if (qf.highlightRareWaystones) highlight('Highlight Rare Waystones', ['Class == ' + quoteList(['Waystones']), 'Rarity Rare Unique'])

    if (has(qf.gemsShow, 'uncut')) showT('Show Uncut Gems', ['BaseType ' + quoteList(['Uncut'])], 'C')
    if (has(qf.gemsShow, 'skill')) showT('Show Skill Gems', ['Class == ' + quoteList(['Skill Gems'])].concat(lvl(qf.minGemLevel)), 'C')
    if (has(qf.gemsShow, 'support')) showT('Show Support Gems', ['Class == ' + quoteList(['Support Gems'])].concat(lvl(qf.minGemLevel)), 'C')

    var flaskClasses = [has(qf.flasksShow, 'life') && 'Life Flasks', has(qf.flasksShow, 'mana') && 'Mana Flasks', has(qf.flasksShow, 'charms') && 'Charms'].filter(Boolean)
    if (flaskClasses.length) showT('Show Flasks & Charms', ['Class == ' + quoteList(flaskClasses)].concat(num(qf.qualityFlasksMin) ? ['Quality >= ' + Number(qf.qualityFlasksMin)] : []), 'D')
    if (qf.hideNonUniqueFlasks) hide('Hide non-Unique Flasks & Charms', ['Class == ' + quoteList(['Life Flasks', 'Mana Flasks', 'Charms']), 'Rarity Normal Magic Rare'])

    if (qf.showUniques) highlight('Highlight Uniques', ['Rarity Unique'])
    if (qf.showChanceBases) showT('Show chance/craft bases', ['Class == ' + quoteList(WEAPON_CLASSES.concat(ARMOUR_CLASSES, ['Rings', 'Amulets'])), 'Rarity Normal Magic', 'ItemLevel >= 82'], 'C', 18, 'chance')

    if (has(qf.endgameShow, 'quest')) showT('Show Quest Items', ['Class == ' + quoteList(['Quest Items'])], 'C')
    if (has(qf.endgameShow, 'relics')) showT('Show Relics', ['Class == ' + quoteList(['Relics'])], 'C')
    if (has(qf.endgameShow, 'trials')) showT('Show Trial Items', ['BaseType ' + quoteList(['Barya', 'Ultimatum', 'Djinn'])], 'C')
    if (has(qf.endgameShow, 'tablets')) showT('Show Precursor Tablets', ['BaseType ' + quoteList(['Tablet'])], 'C')
    if (has(qf.endgameShow, 'fragments')) showT('Show Fragments & Splinters', ['BaseType ' + quoteList(['Splinter', 'Fragment', 'Crest'])], 'C')
    if (has(qf.endgameShow, 'expedition')) showT('Show Expedition', ['BaseType ' + quoteList(['Logbook', 'Artifact'])], 'C')

    var areaCap = num(qf.levelingMaxAreaLevel) ? ['AreaLevel <= ' + Number(qf.levelingMaxAreaLevel)] : []
    if (has(qf.levelingShow, 'weaponsArmour')) showT('Leveling weapons & armour', ['Class == ' + quoteList(WEAPON_CLASSES.concat(ARMOUR_CLASSES)), 'Rarity Normal Magic Rare'].concat(areaCap), 'D')
    if (has(qf.levelingShow, 'jewellery')) showT('Leveling jewellery', ['Class == ' + quoteList(JEWELLERY_CLASSES), 'Rarity Normal Magic Rare'].concat(areaCap), 'D')
    if (has(qf.levelingShow, 'flasks')) showT('Leveling flasks', ['Class == ' + quoteList(['Life Flasks', 'Mana Flasks'])].concat(areaCap), 'D')
    if (qf.disenchantRares) showT('Low rares to salvage', ['Rarity Rare', 'ItemLevel < 65'], 'E')

    var lvlArea = (num(qf.lvlGearAreaMin) ? ['AreaLevel >= ' + Number(qf.lvlGearAreaMin)] : []).concat(num(qf.lvlGearAreaMax) ? ['AreaLevel <= ' + Number(qf.lvlGearAreaMax)] : [])
    if (qf.lvlGear) showT('Leveling gear', ['Class == ' + quoteList(WEAPON_CLASSES.concat(ARMOUR_CLASSES)), 'Rarity Normal Magic Rare'].concat(lvlArea), 'D')
    if (qf.lvlWeapons) showT('Leveling weapons', ['Class == ' + quoteList((qf.lvlWeaponTypes && qf.lvlWeaponTypes.length) ? qf.lvlWeaponTypes : WEAPON_CLASSES), 'Rarity Normal Magic Rare'], 'D')
    if (qf.lvlArmour) showT('Leveling armour', ['Class == ' + quoteList((qf.lvlArmourTypes && qf.lvlArmourTypes.length) ? qf.lvlArmourTypes : ARMOUR_CLASSES), 'Rarity Normal Magic Rare'], 'D')
    if (qf.lvlFlasks) showT('Leveling flasks', ['Class == ' + quoteList(['Life Flasks', 'Mana Flasks'])], 'D')
    if (qf.lvlGold) showT('Leveling gold', ['BaseType == ' + quote('Gold')], 'E')
    if (qf.lvlVerisium) showT('Leveling Verisium', ['BaseType == ' + quote('Verisium')], 'D')

    if (qf.disRares) {
      var top = ['Normal', 'Magic', 'Rare'].indexOf(qf.disRaresMaxRarity) !== -1 ? qf.disRaresMaxRarity : 'Rare'
      var floor = qf.disRaresMagic && RARITY_ORDER.indexOf('Magic') <= RARITY_ORDER.indexOf(top) ? 'Magic' : top
      var keep = RARITY_ORDER.slice(RARITY_ORDER.indexOf(floor), RARITY_ORDER.indexOf(top) + 1)
      var size = []
      if (qf.disRaresMaxSize) { var wh = String(qf.disRaresMaxSize).split('x').map(Number); if (wh[0]) size.push('Width <= ' + wh[0]); if (wh[1]) size.push('Height <= ' + wh[1]) }
      showT('Rares to disenchant/salvage', ['Class == ' + quoteList(GEAR_CLASSES), 'Rarity ' + (keep.length ? keep : [top]).join(' ')].concat(size), 'E')
    }
    if (qf.socketedGear && num(qf.socketedGearMin)) showT('Socketed gear (' + Number(qf.socketedGearMin) + '+)', ['Class == ' + quoteList(GEAR_CLASSES), 'Sockets >= ' + Number(qf.socketedGearMin)], 'C', 18)
    var upTo = function (val) { return (val && val !== 'all') ? rarityCond(val, '<=') : null }
    var qualityGear = function (on, min, rarity, classes, label) { if (on && num(min)) { var conds = ['Class == ' + quoteList(classes), 'Quality >= ' + Number(min)]; var rc = upTo(rarity); if (rc) conds.push(rc); showT(label, conds, 'C', 18) } }
    qualityGear(qf.qMartial, qf.qMartialMin, qf.qMartialRarity, MARTIAL_WEAPONS, 'Quality martial weapons')
    qualityGear(qf.qCaster, qf.qCasterMin, qf.qCasterRarity, CASTER_WEAPONS, 'Quality caster weapons')
    qualityGear(qf.qArmour, qf.qArmourMin, qf.qArmourRarity, ARMOUR_CLASSES, 'Quality shields & armour')

    var offBuild = function (label, all, keep) { var drop = all.filter(function (c) { return keep.indexOf(c) === -1 }); if (keep.length && drop.length) hide(label, ['Class == ' + quoteList(drop), 'Rarity Normal Magic Rare'], 48) }
    offBuild('Hide off-build weapon types', WEAPON_CLASSES, qf.myWeapons || [])
    offBuild('Hide off-build armour types', ARMOUR_CLASSES, qf.myArmour || [])
    offBuild('Hide off-build jewellery', JEWELLERY_CLASSES, qf.myJewellery || [])
    if (qf.myJewels && qf.myJewels.length) {
      showT('My jewels', ['BaseType == ' + quoteList(qf.myJewels), 'Rarity Normal Magic Rare'], 'C', 20)
      hide('Hide off-build jewels', ['Class == ' + quoteList(['Jewels']), 'Rarity Normal Magic Rare'], 48)
    }
    if (qf.showJewels) showT('Show Jewels', ['Class == ' + quoteList(['Jewels'])], 'C')
    if (qf.highlightJewellery) highlight('Highlight Rare jewellery', ['Class == ' + quoteList(JEWELLERY_CLASSES), 'Rarity Rare Unique'])

    if (num(qf.gearMinQuality)) showT('Always show ' + Number(qf.gearMinQuality) + '%+ quality gear', ['Class == ' + quoteList(GEAR_CLASSES), 'Quality >= ' + Number(qf.gearMinQuality)], 'C', 18)
    if (num(qf.gearMinSockets)) showT('Always show ' + Number(qf.gearMinSockets) + '+ socket gear', ['Class == ' + quoteList(GEAR_CLASSES), 'Sockets >= ' + Number(qf.gearMinSockets)], 'C', 18)
    if (num(qf.alwaysShowRareIlvl)) showT('Always show Rare bases iLvl ' + Number(qf.alwaysShowRareIlvl) + '+', ['Class == ' + quoteList(GEAR_CLASSES), 'Rarity Rare', 'ItemLevel >= ' + Number(qf.alwaysShowRareIlvl)], 'C', 18)
    var minR = qf.gearMinRarity || 'all'
    var gearShow = ['Class == ' + quoteList(GEAR_CLASSES)]
    if (minR !== 'all') gearShow.push(rarityCond(minR, '>='))
    if (num(qf.gearMinItemLevel)) gearShow.push('ItemLevel >= ' + Number(qf.gearMinItemLevel))
    if (minR !== 'all' || num(qf.gearMinItemLevel) || qf.catchAll === 'hide') showT('Show equipment you keep', gearShow, 'D', 26)
    if (minR !== 'all') hide('Hide equipment below ' + minR, ['Class == ' + quoteList(GEAR_CLASSES), rarityCond(minR, '<')])
    if (num(qf.gearMinItemLevel)) hide('Hide equipment below item level ' + Number(qf.gearMinItemLevel), ['Class == ' + quoteList(GEAR_CLASSES), 'ItemLevel < ' + Number(qf.gearMinItemLevel), 'Rarity Normal Magic Rare'])

    var GEAR_WA = WEAPON_CLASSES.concat(ARMOUR_CLASSES)
    if (qf.unidRareGear) showT('Unidentified Rare gear (≥ T' + (Number(qf.unidRareGearTier) || 3) + ')', ['Class == ' + quoteList(GEAR_WA), 'Rarity Rare', 'Identified False', 'ItemLevel >= ' + tierIlvl(qf.unidRareGearTier)], 'C', 20)
    if (qf.unidMagicGear) showT('Unidentified Magic gear (≥ T' + (Number(qf.unidMagicGearTier) || 4) + ')', ['Class == ' + quoteList(GEAR_WA), 'Rarity Magic', 'Identified False', 'ItemLevel >= ' + tierIlvl(qf.unidMagicGearTier)], 'D', 22)
    if (qf.unidRareJewellery) showT('Unidentified Rare jewellery (≥ T' + (Number(qf.unidRareJewelleryTier) || 3) + ')', ['Class == ' + quoteList(JEWELLERY_CLASSES), 'Rarity Rare', 'Identified False', 'ItemLevel >= ' + tierIlvl(qf.unidRareJewelleryTier)], 'C', 20)
    if (qf.unidMagicJewellery) showT('Unidentified Magic jewellery (≥ T' + (Number(qf.unidMagicJewelleryTier) || 3) + ')', ['Class == ' + quoteList(JEWELLERY_CLASSES), 'Rarity Magic', 'Identified False', 'ItemLevel >= ' + tierIlvl(qf.unidMagicJewelleryTier)], 'D', 22)

    if (qf.idShowAll) showT('Show all identified items', ['Class == ' + quoteList(GEAR_CLASSES), 'Identified True'], 'D', 23)
    if (qf.idGear) showT('Identified gear', ['Class == ' + quoteList(GEAR_WA), 'Identified True'], 'D', 23)
    if (qf.idJewellery) showT('Identified jewellery', ['Class == ' + quoteList(JEWELLERY_CLASSES), 'Identified True'], 'D', 23)
    if (qf.idJewels) showT('Identified jewels', ['Class == ' + quoteList(['Jewels']), 'Identified True'], 'D', 23)
    var myGearClasses = (qf.myWeapons || []).concat(qf.myArmour || [], qf.myJewellery || [])
    if (qf.idCustom && myGearClasses.length) showT('Identified items on my classes', ['Class == ' + quoteList(myGearClasses), 'Identified True'], 'C', 19)
    if (qf.idHideRest) hide('Hide other identified equipment', ['Class == ' + quoteList(GEAR_CLASSES), 'Rarity Normal Magic Rare', 'Identified True'].concat(qf.idHideRestCorrupted ? [] : ['Corrupted False']), 47)
    if (qf.idExcellent) highlight('Excellent identified items', ['Class == ' + quoteList(GEAR_WA), 'Rarity Rare', 'Identified True', 'ItemLevel >= 82'], 15)
    if (qf.idGood) showT('Good identified items', ['Class == ' + quoteList(GEAR_WA), 'Rarity Rare', 'Identified True', 'ItemLevel >= 75'], 'C', 21)

    if (qf.showCraftingBases) showT('Highlight crafting bases', ['Class == ' + quoteList(GEAR_WA), 'Rarity Normal', 'ItemLevel >= ' + (num(qf.craftingBaseIlvl) ? Number(qf.craftingBaseIlvl) : 82)], 'B', 18)
    if (qf.craftQualityGear && num(qf.craftQualityMin)) showT('Excellent quality gear', ['Class == ' + quoteList(GEAR_WA), 'Rarity Normal Magic', 'Quality >= ' + Number(qf.craftQualityMin)], 'C', 18)
    if (qf.craftSocketGear && num(qf.craftSocketMin)) showT('Excellent socketed gear', ['Class == ' + quoteList(GEAR_WA), 'Rarity Normal', 'Sockets >= ' + Number(qf.craftSocketMin)], 'C', 18)
    if (qf.craftJewellery) showT('Excellent jewellery bases', ['Class == ' + quoteList(JEWELLERY_CLASSES), 'Rarity Normal Magic', 'ItemLevel >= ' + (num(qf.craftJewelleryIlvl) ? Number(qf.craftJewelleryIlvl) : 82)], 'C', 18)

    if (qf.specialGear) highlight('Special gear (top-tier rare bases)', ['Class == ' + quoteList(GEAR_WA), 'Rarity Rare', 'ItemLevel >= 82'], 16)
    if (qf.doubleAnointAmulets) highlight('Double-anointed amulets', ['Class == ' + quoteList(['Amulets']), 'Rarity Rare', 'ItemLevel >= 75'], 16)
    if (qf.specialJewellery) highlight('Excellent special jewellery', ['Class == ' + quoteList(JEWELLERY_CLASSES), 'Rarity Rare', 'ItemLevel >= ' + (num(qf.specialJewelleryIlvl) ? Number(qf.specialJewelleryIlvl) : 82)], 16)
    if (qf.specialJewelleryRemaining) showT('Remaining special jewellery', ['Class == ' + quoteList(JEWELLERY_CLASSES), 'Rarity Rare'], 'E', 25)

    var hideBelow = function (label, classes, val) { if (val && val !== 'all') { var rc = rarityCond(val, '<'); if (rc) hide(label, ['Class == ' + quoteList(classes), rc]) } }
    hideBelow('Hide low-rarity Rings', ['Rings'], qf.hideRingsBelow)
    hideBelow('Hide low-rarity Amulets', ['Amulets'], qf.hideAmuletsBelow)
    hideBelow('Hide low-rarity Belts', ['Belts'], qf.hideBeltsBelow)
    hideBelow('Hide low-rarity Jewels', ['Jewels'], qf.hideJewelsBelow)

    if (qf.charmsHighIlvl) showT('High iLvl normal charms', ['Class == ' + quoteList(['Charms']), 'Rarity Normal', 'ItemLevel >= 80'], 'D')
    if (qf.qCharms && num(qf.qCharmsMin)) showT('Quality charms', ['Class == ' + quoteList(['Charms']), 'Quality >= ' + Number(qf.qCharmsMin)], 'C', 18)
    if (qf.qFlasks && num(qf.qFlasksMin)) showT('Quality flasks', ['Class == ' + quoteList(['Life Flasks', 'Mana Flasks']), 'Quality >= ' + Number(qf.qFlasksMin)], 'C', 18)
    if (qf.hideLifeFlasks) hide('Hide non-unique Life Flasks', ['Class == ' + quoteList(['Life Flasks']), 'Rarity Normal Magic Rare'])
    if (qf.hideManaFlasks) hide('Hide non-unique Mana Flasks', ['Class == ' + quoteList(['Mana Flasks']), 'Rarity Normal Magic Rare'])
    if (qf.hideCharms) hide('Hide non-unique Charms', ['Class == ' + quoteList(['Charms']), 'Rarity Normal Magic Rare'])

    var curHide = function (v) { return has(qf.currencyHide, v) }
    if (curHide('shards')) hide('Hide Currency Shards', ['BaseType ' + quoteList(['Shard'])])
    if (curHide('runes')) hide('Hide Runes & Soul Cores', ['BaseType ' + quoteList(['Rune', 'Soul Core'])])
    if (curHide('catalysts')) hide('Hide Catalysts', ['BaseType ' + quoteList(['Catalyst'])])
    if (curHide('essences')) hide('Hide Essences', ['BaseType ' + quoteList(['Essence'])])
    if (curHide('omens')) hide('Hide Omens', ['BaseType ' + quoteList(['Omen'])])
    if (qf.hideVerisium) hide('Hide Verisium', num(qf.minVerisium) ? ['BaseType == ' + quote('Verisium'), 'StackSize < ' + Number(qf.minVerisium)] : ['BaseType == ' + quote('Verisium')])
    if (qf.hideRegularRunes) hide('Hide regular runes', ['BaseType ' + quoteList(['Rune']), 'Rarity Normal'])
    if (qf.hideUncutGems && num(qf.hideUncutBelow)) hide('Hide low uncut gems', ['BaseType ' + quoteList(['Uncut']), 'ItemLevel < ' + Number(qf.hideUncutBelow)])

    if (qf.myFlasks && qf.myFlasks.length) showT('My flasks & charms', ['Class == ' + quoteList(qf.myFlasks)], 'D')
    if (qf.econTieringMode === 'strict') hide('Currency tiering: hide low-tier shards', ['BaseType == ' + quoteList(['Transmutation Shard', 'Regal Shard', 'Scroll of Wisdom'])])
    else if (qf.econTieringMode === 'off') hide('Currency tiering off: hide low-value currency', ['BaseType == ' + quoteList(['Transmutation Shard', 'Regal Shard', 'Scroll of Wisdom', 'Orb of Transmutation', 'Orb of Augmentation'])])
    if (qf.econBigStacks) highlight('Highlight large currency stacks', ['Class == ' + quoteList(['Stackable Currency', 'Currency']), 'StackSize >= ' + (num(qf.econBigStackSize) ? Number(qf.econBigStackSize) : 10)], 14)

    var uniqTier = function (names, comment, tier, priority) {
      var seen = {}; var bases = []
      ;(names || []).forEach(function (n) { var b = uniqueBases[n]; if (b && !seen[b]) { seen[b] = 1; bases.push(b) } })
      if (bases.length) out.push({ action: 'Show', comment: comment, conditions: ['BaseType == ' + quoteList(bases), 'Rarity Unique'], style: tierStyle(tier, cosmetic, 'uniques'), priority: priority })
    }
    if (qf.uTieringMode !== 'off') {
      if (qf.uExcellent) uniqTier(DEFAULT_TIER_UNIQUES.S, 'Excellent (S-tier) uniques', 'S', 10)
      if (qf.uGood) uniqTier(DEFAULT_TIER_UNIQUES.A, 'Good (A-tier) uniques', 'A', 11)
      if (qf.uPotential) uniqTier(DEFAULT_TIER_UNIQUES.B, 'Potential (B-tier) uniques', 'B', 12)
    }
    if (qf.hideLowValueUniques) {
      var seenLow = {}; var lowBases = []
      ;(DEFAULT_TIER_UNIQUES.C || []).forEach(function (n) { var b = uniqueBases[n]; if (b && !seenLow[b]) { seenLow[b] = 1; lowBases.push(b) } })
      if (lowBases.length) hide('Hide low-value uniques', ['BaseType == ' + quoteList(lowBases), 'Rarity Unique'], 49)
    }
    if (qf.uDropRestricted) showT('Show every remaining unique (drop-restricted safety)', ['Rarity Unique'], 'D', 27, 'uniques')
    if (qf.uClassSpecific && qf.uClassSpecific.length) highlight('Class-specific uniques', ['Class == ' + quoteList(qf.uClassSpecific), 'Rarity Unique'], 15)
    if (qf.exceptionalUniques && num(qf.exceptionalUniquesMin)) highlight('Exceptional uniques', ['Rarity Unique', 'Quality >= ' + Number(qf.exceptionalUniquesMin)])
    if (qf.vaalModUniques) highlight('Vaal mod (corrupted) uniques', ['Rarity Unique', 'Corrupted True'])
    if (qf.vaalUniques) highlight('Vaal base uniques', ['BaseType ' + quoteList(['Vaal']), 'Rarity Unique'])
    if (qf.smallDisenchantUniques && qf.smallDisenchantMaxSize) { var whs = String(qf.smallDisenchantMaxSize).split('x').map(Number); var s = []; if (whs[0]) s.push('Width <= ' + whs[0]); if (whs[1]) s.push('Height <= ' + whs[1]); showT('Small uniques to disenchant', ['Rarity Unique'].concat(s), 'D', 26, 'uniques') }
    if (qf.uOther) showT('Other uniques', ['Rarity Unique'], 'E', 28, 'uniques')
    if (qf.hideAllUniques) hide('Hide remaining uniques', ['Rarity Unique'], 50)
    var CHANCE_CLASSES = ['Body Armours', 'Helmets', 'Gloves', 'Boots', 'Sceptres', 'Foci', 'Amulets', 'Rings']
    if (qf.chanceWanted) highlight('Wanted chance bases', ['Class == ' + quoteList(CHANCE_CLASSES), 'Rarity Normal', 'ItemLevel >= 82'], 17)
    if (qf.chancePotential) showT('Potential chance bases', ['Class == ' + quoteList(CHANCE_CLASSES), 'Rarity Normal', 'ItemLevel >= 75'], 'D', 25, 'chance')

    if (qf.showQuest) showT('Quest items', ['Class == ' + quoteList(['Quest Items'])], 'C')
    if (qf.showRelics) showT('Relics', ['Class == ' + quoteList(['Relics'])], 'C')
    if (qf.showRelics && qf.relicsHideOther) hide('Hide basic (Normal) relics', ['Class == ' + quoteList(['Relics']), 'Rarity Normal'])
    if (qf.showTrials) showT('Trial keys', ['BaseType ' + quoteList(['Barya', 'Ultimatum', 'Djinn'])], 'C')
    if (qf.showTablets) showT('Precursor tablets', ['BaseType ' + quoteList(['Tablet'])], 'C')
    if (qf.showFragments) showT('Fragments & splinters', ['BaseType ' + quoteList(['Splinter', 'Fragment', 'Crest'])], 'C')
    if (qf.showExpedition) showT('Expedition', ['BaseType ' + quoteList(['Logbook', 'Artifact'])], 'C')

    if (qf.hideAllRemainingGear) hide('Hide remaining non-unique gear', ['Class == ' + quoteList(GEAR_CLASSES), 'Rarity Normal Magic Rare'], 49)

    return out
  }
  function tierDescriptors(tierOverrides, cosmetic, uniqueBases, baseNames) {
    tierOverrides = tierOverrides || {}; cosmetic = cosmetic || {}; uniqueBases = uniqueBases || {}
    var out = []
    var byTier = {}
    Object.keys(tierOverrides).forEach(function (name) { var tid = tierOverrides[name]; (byTier[tid] = byTier[tid] || []).push(name) })
    Object.keys(byTier).forEach(function (tid) {
      var names = byTier[tid]
      if (!names.length) return
      var seen = {}; var uniqueBaseList = []
      names.forEach(function (n) { var b = uniqueBases[n]; if (b && !seen[b]) { seen[b] = 1; uniqueBaseList.push(b) } })
      var plain = names.filter(function (n) { return !uniqueBases[n] && (baseNames ? baseNames.has(n) : true) })
      var add = function (conditions, label, cat) {
        if (tierHidden(tid, cosmetic, cat)) out.push({ action: 'Hide', comment: 'Hidden — ' + label, conditions: conditions, priority: 41 })
        else out.push({ action: 'Show', comment: label, conditions: conditions, style: tierStyle(tid, cosmetic, cat), priority: 12 })
      }
      if (plain.length) add(['BaseType == ' + quoteList(plain)], 'Tier ' + tid + ' (your Tier List)', 'currency')
      if (uniqueBaseList.length) add(['BaseType == ' + quoteList(uniqueBaseList), 'Rarity Unique'], 'Tier ' + tid + ' uniques (your Tier List)', 'uniques')
    })
    return out
  }
  function customRuleDescriptors(customRules, cosmetic) {
    customRules = customRules || []; cosmetic = cosmetic || {}
    var out = []
    customRules.filter(function (r) { return r && r.enabled !== false }).forEach(function (r, i) {
      if (r.raw && r.raw.trim()) { out.push({ raw: r.raw.trim(), priority: r.action === 'Hide' ? 44 : 24 }); return }
      var action = r.action === 'Hide' ? 'Hide' : 'Show'
      var conditions = matchConditions({
        classes: r.classes, baseType: (r.baseTypes || []).join(', '),
        baseMode: r.baseTypePrefix ? 'contains' : 'exact',
        rarity: r.rarity && r.rarity !== 'Any' ? r.rarity : '', rarityOp: r.rarityOp,
        itemLevel: r.itemLevel, itemLevelOp: r.itemLevelOp,
      })
      if (!conditions.length) return
      out.push({ action: action, conditions: conditions, comment: r.comment || ('Custom Rule ' + (i + 1)), style: action === 'Show' ? tierStyle(r.dropTier || 'C', cosmetic, 'items') : undefined, priority: action === 'Show' ? 24 : 44 })
    })
    return out
  }
  function compileOverrides(settings, uniqueBases, baseNames) {
    settings = settings || {}; uniqueBases = uniqueBases || {}
    var ov = settings.overrides || {}
    var cosmetic = Object.assign({}, settings.cosmetic || {}, { _styleId: settings.style })
    var descriptors = tierDescriptors(settings.tierOverrides, cosmetic, uniqueBases, baseNames)
      .concat(quickFilterDescriptors(settings.quickFilters, cosmetic, uniqueBases))
      .concat(ruleDescriptors(ov.rules))
      .concat(customRuleDescriptors(settings.customRules, cosmetic))
    var top = settings.freeText && settings.freeText.top && settings.freeText.top.trim()
    if (top) descriptors.unshift({ raw: top, priority: 5 })
    descriptors.sort(function (a, b) { return (a.priority == null ? 30 : a.priority) - (b.priority == null ? 30 : b.priority) })
    return descriptors.map(function (d) { return d.raw ? d.raw : renderBlock(d) })
  }

  // ===================== buildFilter.js =====================
  var BAR = new Array(65).join('#')
  function stampNow() {
    var d = new Date()
    var p = function (n) { return String(n).length < 2 ? '0' + n : String(n) }
    return d.getUTCFullYear() + '-' + p(d.getUTCMonth() + 1) + '-' + p(d.getUTCDate()) + ' ' + p(d.getUTCHours()) + ':' + p(d.getUTCMinutes()) + ' UTC'
  }
  function banner(title) { return [BAR, '# ' + title, BAR, ''] }
  function block(action, comment, conditions, style) {
    var lines = [action + ' # ' + comment]
    ;(conditions || []).forEach(function (c) { if (c) lines.push('\t' + c) })
    if (action === 'Show' && style) emitStyle(style).forEach(function (s) { lines.push('\t' + s) })
    return lines.join('\n')
  }
  function currencyBlocks(settings, uniqueBases, baseNames) {
    uniqueBases = uniqueBases || {}
    var cosmetic = Object.assign({}, settings.cosmetic || {}, { _styleId: settings.style })
    var byTier = {}
    DROP_TIERS.forEach(function (t) { byTier[t.id] = {}; (DEFAULT_TIER_CURRENCY[t.id] || []).forEach(function (n) { byTier[t.id][n] = 1 }) })
    Object.keys(settings.tierOverrides || {}).forEach(function (name) {
      var tid = settings.tierOverrides[name]
      if (uniqueBases[name]) return
      if (baseNames && !baseNames.has(name)) return
      Object.keys(byTier).forEach(function (k) { delete byTier[k][name] })
      ;(byTier[tid] = byTier[tid] || {})[name] = 1
    })
    var out = [];
    ['S', 'A', 'B', 'C', 'D'].forEach(function (id) {
      var items = Object.keys(byTier[id] || {})
      chunkList(items).forEach(function (chunk) { out.push(block('Show', id + '-tier currency', ['BaseType == ' + quoteList(chunk)], tierStyle(id, cosmetic, 'currency'))) })
    })
    chunkList(Object.keys(byTier.F || {})).forEach(function (chunk) { out.push(block('Hide', 'Hidden currency (F-tier)', ['BaseType == ' + quoteList(chunk)])) })
    if (settings.quickFilters && settings.quickFilters.catchAll === 'hide') out.push(block('Hide', 'Remaining low-value currency', ['Class == ' + quoteList(['Stackable Currency'])]))
    else out.push(block('Show', 'Remaining currency', ['Class == ' + quoteList(['Stackable Currency'])], tierStyle('E', cosmetic, 'currency')))
    return out
  }
  function catchAll(settings) {
    if ((settings.quickFilters && settings.quickFilters.catchAll || 'show') === 'hide') return block('Hide', 'Everything else', [])
    return block('Show', 'Everything else', [], { textColor: [140, 140, 140, 255], fontSize: 18 })
  }
  function header(settings, opts) {
    var name = (settings.name || 'Unnamed.filter').trim()
    var ver = settings.version || '0.0.1'
    var sName = strictnessLevel(settings.strictness).name
    var stName = styleInfo(settings.style).name
    var gv = (opts.gameInfo && opts.gameInfo.gameVersionLabel) || ''
    var lines = [
      BAR, '# ' + name + ' - Path of Exile 2 loot filter', BAR,
      '# Built with Exile Codex  -  ' + sName + (stName && stName !== 'Default' ? ' / ' + stName : '') + '  -  v' + ver + (gv ? '  -  ' + gv : '') + '  -  ' + (opts.stamp || stampNow()),
      BAR,
    ]
    if (opts.prefs && opts.prefs.topComment && opts.prefs.topComment.trim()) { lines.push('#'); opts.prefs.topComment.split('\n').forEach(function (l) { lines.push('# ' + l) }) }
    return lines
  }
  function generate(settings, opts) {
    var out = header(settings, opts).concat([''])
    var ub = opts.uniqueBases || {}
    var tierOverrides = Object.assign({}, settings.tierOverrides || {})
    Object.keys(DEFAULT_TIER_UNIQUES).forEach(function (tid) {
      DEFAULT_TIER_UNIQUES[tid].forEach(function (n) { if (ub[n] && !(n in tierOverrides)) tierOverrides[n] = tid })
    })
    var blocks = compileOverrides(Object.assign({}, settings, { tierOverrides: tierOverrides }), ub, opts.baseNames)
    if (blocks.length) { out = out.concat(banner('Your filter')); blocks.forEach(function (b) { out.push(b, '') }) }
    out = out.concat(banner('Currency'))
    currencyBlocks(settings, ub, opts.baseNames).forEach(function (b) { out.push(b, '') })
    out = out.concat(banner('Everything else'))
    out.push(catchAll(settings), '')
    var bottomComment = opts.prefs && opts.prefs.bottomComment && opts.prefs.bottomComment.trim()
    var tail = [
      settings.freeText && settings.freeText.bottom && settings.freeText.bottom.trim(),
      bottomComment && bottomComment.split('\n').map(function (l) { return l.trim().indexOf('#') === 0 ? l : '# ' + l }).join('\n'),
    ].filter(Boolean)
    tail.forEach(function (t) { out.push('', t) })
    return out.join('\n').replace(/\n{3,}/g, '\n\n') + '\n'
  }

  // ===================== Quick Filters form renderer =====================
  // Renders the SECTIONS catalog to an HTML form whose controls carry data-qf-* attributes. The Lua
  // plugin injects this and wires ONE delegated change/input listener that reads the attributes and
  // calls the session's setQF* helpers. This keeps the (complex, nested) SECTIONS data + template in
  // JS while Lua owns the app integration (tabs, events, rebuild, persistence).
  function esc(s) { return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;') }
  function renderControl(ctrl, qf) {
    var key = ctrl.key
    if (ctrl.control === 'toggle') {
      var on = qf[key] === true
      return '<label class="qf-chip"><input type="checkbox" data-qf-key="' + esc(key) + '" data-qf-type="bool"' + (on ? ' checked' : '') + '><span>' + esc(ctrl.label || key) + '</span></label>'
    }
    if (ctrl.control === 'number') {
      var v = qf[key]; v = (v == null ? '' : v)
      return '<span class="qf-num">' + (ctrl.label ? '<span class="qf-numlbl">' + esc(ctrl.label) + '</span>' : '')
        + '<input type="number" data-qf-key="' + esc(key) + '" data-qf-type="num" value="' + esc(v) + '"'
        + (ctrl.min != null ? ' min="' + ctrl.min + '"' : '') + (ctrl.max != null ? ' max="' + ctrl.max + '"' : '') + '></span>'
    }
    if (ctrl.control === 'select') {
      var cur = String(qf[key] == null ? '' : qf[key])
      var opts = ctrl.options.map(function (o) { return '<option value="' + esc(o.value) + '"' + (String(o.value) === cur ? ' selected' : '') + '>' + esc(o.label) + '</option>' }).join('')
      return '<select class="qf-sel" data-qf-key="' + esc(key) + '" data-qf-type="str" autocomplete="off">' + opts + '</select>'
    }
    if (ctrl.control === 'areaRange') {
      var mn = qf[ctrl.minKey], mx = qf[ctrl.maxKey]
      return '<span class="qf-range">' + (ctrl.label ? '<span class="qf-numlbl">' + esc(ctrl.label) + '</span>' : '')
        + '<input type="number" data-qf-key="' + esc(ctrl.minKey) + '" data-qf-type="num" value="' + esc(mn == null ? '' : mn) + '">'
        + '<span class="qf-dash">–</span>'
        + '<input type="number" data-qf-key="' + esc(ctrl.maxKey) + '" data-qf-type="num" value="' + esc(mx == null ? '' : mx) + '"></span>'
    }
    if (ctrl.control === 'multi' || ctrl.control === 'classItems') {
      var options = ctrl.control === 'multi' ? ctrl.options : (CLASS_GROUPS[ctrl.group] || []).map(function (n) { return { value: n, label: n } })
      var arr = Array.isArray(qf[key]) ? qf[key] : []
      var chips = options.map(function (o) {
        var on = arr.indexOf(o.value) !== -1
        return '<label class="qf-chip"><input type="checkbox" data-qf-key="' + esc(key) + '" data-qf-type="arr" data-qf-val="' + esc(o.value) + '"' + (on ? ' checked' : '') + '><span>' + esc(o.label) + '</span></label>'
      }).join('')
      return '<div class="qf-chips">' + chips + '</div>'
    }
    return ''
  }
  function renderRow(row, qf) {
    var parts = ['<div class="qf-row">']
    if (row.key) {
      var on = qf[row.key] === true
      parts.push('<label class="qf-switch"><input type="checkbox" role="switch" data-qf-key="' + esc(row.key) + '" data-qf-type="bool"' + (on ? ' checked' : '') + '><span>' + esc(row.label || row.key) + '</span></label>')
    } else if (row.label) {
      parts.push('<span class="qf-rowlbl">' + esc(row.label) + '</span>')
    }
    if (row.controls && row.controls.length) {
      parts.push('<span class="qf-ctrls">')
      row.controls.forEach(function (c) { parts.push(renderControl(c, qf)) })
      parts.push('</span>')
    }
    if (row.help) parts.push('<span class="qf-help" title="' + esc(row.help) + '"><i class="bi bi-info-circle"></i></span>')
    parts.push('</div>')
    return parts.join('')
  }
  function renderQuickFiltersHtml(qf) {
    qf = qf || {}
    var cols = { left: [], right: [] }
    SECTIONS.forEach(function (sec) {
      var col = sec.col === 'right' ? 'right' : 'left'
      var s = ['<div class="qf-section"><div class="qf-sectitle">' + esc(sec.title) + '</div>']
      sec.groups.forEach(function (g) {
        s.push('<div class="qf-group">')
        s.push('<div class="qf-grptitle">' + esc(g.title) + (g.help ? ' <span class="qf-help" title="' + esc(g.help) + '"><i class="bi bi-info-circle"></i></span>' : '') + '</div>')
        g.rows.forEach(function (r) { s.push(renderRow(r, qf)) })
        s.push('</div>')
      })
      s.push('</div>')
      cols[col].push(s.join(''))
    })
    return '<div class="qf-cols"><div class="qf-col">' + cols.left.join('') + '</div><div class="qf-col">' + cols.right.join('') + '</div></div>'
  }

  // ===================== defaultSettings.js =====================
  function defaultSettings(name) {
    name = name || 'Unnamed.filter'
    return {
      name: name, version: '0.0.1', sourceFile: null,
      strictness: DEFAULT_STRICTNESS, style: DEFAULT_STYLE, klass: null,
      gameMode: { league: true, hardcore: false, ssf: false },
      quickFilters: strictnessProfile(DEFAULT_STRICTNESS),
      overrides: { rules: [] }, customRules: [],
      freeText: { top: '', bottom: '' },
      cosmetic: { hiddenGearTransparent: true, hiddenFlasks: false, hiddenJewellery: false, tierStyles: {} },
      tierOverrides: {}, manualFilter: null,
    }
  }

  // ===================== public API + session =====================
  // Synchronous build: generate the live .filter text from a settings object. Catalogs (uniqueBases:
  // name→base, baseNames: Set) are optional; without them unique-by-name tiering safely emits nothing.
  var CATALOG = { uniqueBases: {}, baseNames: null }
  function build(settings, opts) {
    opts = opts || {}
    return generate(settings, {
      uniqueBases: opts.uniqueBases || CATALOG.uniqueBases,
      baseNames: opts.baseNames || CATALOG.baseNames,
      prefs: opts.prefs, gameInfo: opts.gameInfo, stamp: opts.stamp,
    })
  }

  // A stateful controller the Lua plugin drives. JS keeps the (complex, nested) settings object;
  // Lua calls typed getters/setters + build(). Values cross the bridge as JSON strings where they'd
  // otherwise be JS arrays/objects fengari can't read cleanly.
  function newSession(savedJson) {
    var settings
    try { settings = savedJson ? JSON.parse(savedJson) : defaultSettings() } catch (e) { settings = defaultSettings() }
    // heal missing shape from older saves
    if (!settings.quickFilters) settings.quickFilters = strictnessProfile(settings.strictness || DEFAULT_STRICTNESS)
    return {
      // scalar meta
      get: function (field) { var v = settings[field]; return v == null ? null : (typeof v === 'object' ? JSON.stringify(v) : v) },
      getStrictness: function () { return settings.strictness },
      getStyle: function () { return settings.style },
      getCatchAll: function () { return settings.quickFilters.catchAll || 'show' },
      isManual: function () { return typeof settings.manualFilter === 'string' },
      // mutations
      setStrictness: function (id) { settings.strictness = id; settings.quickFilters = strictnessProfile(id) },
      setStyle: function (id) { settings.style = id },
      setCatchAll: function (v) { settings.quickFilters.catchAll = v },
      setName: function (n) { settings.name = n },
      setManual: function (text) { settings.manualFilter = text },
      clearManual: function () { settings.manualFilter = null },
      // quick-filter generic access (value passed/returned as JSON for arrays/objects)
      getQF: function (key) { var v = settings.quickFilters[key]; return v == null ? null : (typeof v === 'object' ? JSON.stringify(v) : v) },
      setQF: function (key, valueJson) { try { settings.quickFilters[key] = JSON.parse(valueJson) } catch (e) { settings.quickFilters[key] = valueJson } },
      // typed setters for the Quick Filters form (driven by data-qf-* attributes from Lua)
      setQFBool: function (key, b) { settings.quickFilters[key] = !!b },
      setQFNum: function (key, n) { var v = Number(n); settings.quickFilters[key] = isNaN(v) ? 0 : v },
      setQFStr: function (key, s) { settings.quickFilters[key] = s },
      toggleQFArrayVal: function (key, val, on) {
        var a = settings.quickFilters[key]
        if (!Array.isArray(a)) { a = []; settings.quickFilters[key] = a }
        var i = a.indexOf(val)
        if (on && i === -1) a.push(val)
        else if (!on && i !== -1) a.splice(i, 1)
      },
      // the Quick Filters form HTML for the current settings
      qfHtml: function () { return renderQuickFiltersHtml(settings.quickFilters) },
      // build the live filter (ignores manualFilter) / the authoritative output (manual wins)
      build: function () { return build(settings) },
      output: function () { return typeof settings.manualFilter === 'string' ? settings.manualFilter : build(settings) },
      // persistence
      serialize: function () { return JSON.stringify(settings) },
      reset: function () { settings = defaultSettings() },
    }
  }

  window.ecFilterBuild = {
    // data for the UI
    strictnessLevels: STRICTNESS_LEVELS,
    styles: STYLES,
    sections: SECTIONS,
    classGroups: CLASS_GROUPS,
    dropTiers: DROP_TIERS,
    DEFAULT_STRICTNESS: DEFAULT_STRICTNESS,
    DEFAULT_STYLE: DEFAULT_STYLE,
    // pure helpers
    defaultSettings: defaultSettings,
    strictnessProfile: strictnessProfile,
    build: build,
    valueTierOf: valueTierOf,
    // catalog wiring (call once data is loaded)
    setCatalog: function (uniqueBases, baseNames) { CATALOG.uniqueBases = uniqueBases || {}; CATALOG.baseNames = baseNames || null },
    // stateful controller for the plugin
    newSession: newSession,
  }
})()

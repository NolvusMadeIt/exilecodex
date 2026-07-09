// Curated value table — a static, hand-tuned market-value snapshot used to AUTO-ORGANISE the Tier
// Lists so they arrive pre-sorted instead of dumping ~80 items into E. It is the single source for
// the starting currency + unique tiers (dropTiers.js re-exports DEFAULT_TIER_CURRENCY /
// DEFAULT_TIER_UNIQUES from here), and `valueTierOf(name)` resolves ANY item the Tier List surfaces
// — including the big grouped families (essences, runes, soul cores, catalysts, omens) that aren't
// worth enumerating one by one — to a sensible tier. E stays a legitimate "visible, no highlight"
// bucket for genuinely common items, not a dumping ground.
//
// Tiers follow DROP_TIERS (S→F). Values are approximate and user-overridable on the Tier List page;
// this is a snapshot, not live pricing (live economy data is the Market plugin's job).

// ---- Currency: explicit tiers for the named orbs & specials -----------------------------------
export const CURRENCY_TIERS = {
  S: ['Mirror of Kalandra'],
  A: ['Divine Orb', "Perfect Jeweller's Orb", "Hinekora's Lock"],
  B: [
    'Exalted Orb', "Greater Jeweller's Orb", 'Orb of Annulment', 'Fracturing Orb',
    'Perfect Chaos Orb', 'Perfect Exalted Orb', 'Perfect Regal Orb',
    'Perfect Orb of Augmentation', 'Perfect Orb of Transmutation',
    'Greater Exalted Orb', 'Greater Regal Orb',
  ],
  C: [
    'Chaos Orb', 'Regal Orb', 'Vaal Orb', "Gemcutter's Prism", "Lesser Jeweller's Orb",
    'Orb of Alchemy', "Arcanist's Etcher", "Artificer's Orb", "Architect's Orb", 'Orb of Chance',
    'Greater Chaos Orb', 'Greater Orb of Augmentation', 'Greater Orb of Transmutation',
    'Core Destabiliser', 'Crystallised Corruption', 'Vaal Infuser', 'Vaal Cultivation Orb',
    'Ancient Infuser', 'Exotic Coinage', 'Orb of Extraction',
  ],
  D: [
    "Glassblower's Bauble", 'Orb of Augmentation', "Blacksmith's Whetstone", "Armourer's Scrap",
    'Preserved Cranium', 'Preserved Vertebrae', "Amanamu's Gaze", "Kurgal's Gaze", "Tecrod's Gaze",
    "Ulaman's Gaze", "Citaqualotl's Thesis", "Guatelitzi's Thesis", "Jiquani's Thesis",
    "Quipolatl's Thesis",
  ],
  E: ['Orb of Transmutation', 'Scroll of Wisdom', 'Gold'],
}

// ---- Currency: pattern tiers for the grouped families -----------------------------------------
// These mirror how the Quick Filters already style each group (Show Essences → C, etc.), so the
// Tier List reads the same value the generated filter applies. First match wins; order matters
// (e.g. "Greater Desert Rune" must hit /Rune/ before any generic fallback).
const CURRENCY_GROUP_RULES = [
  [/\bShard\b/i, 'E'],            // Transmutation/Regal/Chance/Artificer shards — low
  [/Soul Core/i, 'C'],
  [/Catalyst/i, 'C'],
  [/Essence/i, 'C'],
  [/\bRune\b/i, 'C'],
  [/\bOmen\b/i, 'B'],
  [/Breachstone/i, 'B'],
  [/Splinter|Fragment|\bCrest\b/i, 'C'],
  [/Tablet/i, 'C'],
  [/Barya|Ultimatum|Djinn/i, 'C'],          // Trial of the Sekhemas / Chaos keys
  [/Logbook|Artifact/i, 'C'],               // Expedition
  [/\bScarab\b|\bVial\b/i, 'C'],
  [/Liquid|Concentrated|Diluted/i, 'D'],    // Delirium emotions
  [/\bIdol\b/i, 'D'],                        // Ritual idols
  [/Collarbone|Jawbone|\bRib\b|Feather/i, 'D'],
]

// ---- Uniques: a broad curated set so the Uniques tab arrives organised, not all in E ----------
// Resolved to base type + `Rarity Unique` on output (PoE2 can't match a unique by name). Names must
// exist in uniques-data.json. The long tail stays in E (visible) — users re-tier any time.
export const UNIQUE_TIERS = {
  S: [
    'Mageblood', 'Headhunter', 'Original Sin', 'The Adorned', 'Temporalis', 'Ingenuity',
    'Astramentis', 'Hand of Wisdom and Action', 'Voices', 'Megalomaniac',
  ],
  A: [
    'Ghostwrithe', 'Morior Invictus', "Olroth's Resolve", "Doryani's Prototype",
    "Mahuxotl's Machination", 'The Whispering Ice', 'Mind of the Council', "Voll's Protector",
    "Xoph's Blood", "Ventor's Gamble", 'Darkness Enthroned', 'Soul Mantle', 'Yoke of Suffering',
    'Polcirkeln', 'Lightning Coil', 'The Three Dragons',
  ],
  B: [
    'Pillar of the Caged God', "Kaom's Heart", "Beira's Anguish", 'Carnage Heart', "Ming's Heart",
    'Andvarius', 'Stone of Lazhwar', "Saffell's Frame", 'Rise of the Phoenix', 'Snakebite',
    "Starkonja's Head", "Alpha's Howl", 'Belly of the Beast', 'Dream Fragments', 'The Pandemonius',
    'Crown of Eyes', 'Soul Tether', 'Wake of Destruction', 'Doomfletch', 'Lycosidae',
  ],
  C: [
    'Goldrim', 'Wanderlust', 'Tabula Rasa', 'Lifesprig', 'Bramblejack', 'Quill Rain', "Death's Harp",
    'Lochtonial Caress', "Meginord's Girdle", 'Bones of Ullr', 'Bronzebeard', 'Wings of Caelyn',
    'Briskwrap', 'Foxshade', 'Berek\'s Grip', 'Berek\'s Pass', 'Berek\'s Respite', 'Goregirdle',
    'Deidbell', 'Thief\'s Torment',
  ],
}

// name -> tierId from the explicit tables (built once).
const EXPLICIT = {}
for (const [tid, names] of Object.entries(CURRENCY_TIERS)) for (const n of names) EXPLICIT[n] = tid
for (const [tid, names] of Object.entries(UNIQUE_TIERS)) for (const n of names) EXPLICIT[n] = tid

// Resolve any item name to a tier id, or undefined if we have no opinion (caller defaults to E).
export function valueTierOf(name) {
  if (!name) return undefined
  if (EXPLICIT[name]) return EXPLICIT[name]
  for (const [re, tid] of CURRENCY_GROUP_RULES) if (re.test(name)) return tid
  return undefined
}

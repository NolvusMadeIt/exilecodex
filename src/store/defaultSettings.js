// The single filter settings object. Every page is a view/editor of this shape.
// Generator (lib/generate.js) turns it into .filter text.
import { QF_DEFAULTS } from '../data/quickFilters.js'

export function defaultSettings(name = "Nolvus's Filter") {
  return {
    name,
    version: '0.0.1',        // semver of this filter — auto-bumps on Save and Import
    sourceFile: null,        // { name, fromFileHandle } — set on import for "overwrite"
    preset: null,            // one of PRESETS ids
    klass: null,             // selected class id
    gameMode: { league: true, hardcore: false, ssf: false },
    options: { transparentGold: false, customizeTopTier: true },
    endgameContent: {
      bossUniques: true, chanceBases: true, trialsOfChaos: true, trialsOfSekhemas: true,
      showSupportGems: true, showJewels: true, showLowValueUniques: false, showAllIdentified: false,
    },
    // Quick Filters: flat map of key -> value (schema in data/quickFilters.js).
    quickFilters: { ...QF_DEFAULTS },
    // Custom Rules: precedence-ordered Show/Hide/Highlight rules.
    customRules: [],
    freeText: { top: '', bottom: '' },
    // Cosmetic: per drop-tier style overrides keyed by tier id.
    cosmetic: { hiddenGearTransparent: true, hiddenFlasks: false, hiddenJewellery: false, tierStyles: {} },
    // Tier list overrides: itemName -> tierId (drag/drop moves).
    tierOverrides: {},
  }
}

// A blank custom rule row (matches the live Custom Rules row controls).
export function emptyCustomRule(n = 1) {
  return {
    id: 'cr' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
    enabled: true,
    action: 'Show',          // Show | Hide
    classes: [],             // item class names ([] = All)
    baseTypes: [],           // base type names ([] = All Items)
    rarityOp: '>=',
    rarity: 'Normal',        // Normal | Magic | Rare | Unique
    dropTier: 'E',           // S..F drop-tier style
    itemLevelOp: '>=',
    itemLevel: 0,
    comment: `Custom Rule ${n}`,
  }
}

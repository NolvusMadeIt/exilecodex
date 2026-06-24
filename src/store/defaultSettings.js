// The single filter settings object. Every page is a view/editor of this shape.
// lib/buildFilter.js turns it into .filter text: a real core base file (strictness x style)
// with the user's overrides spliced in.
import { DEFAULT_STRICTNESS, DEFAULT_STYLE } from '../data/coreFilters.js'
import { QF_DEFAULTS } from '../data/quickFilters.js'

export function defaultSettings(name = "Nolvus's Filter") {
  return {
    name,
    version: '0.0.1',        // semver of this filter — auto-bumps on Save and Import
    sourceFile: null,        // { name, fromFileHandle } — set on import for "overwrite"
    // Base selection: which real core filter to build on.
    strictness: DEFAULT_STRICTNESS, // '0-soft' … '6-uber-plus-strict'
    style: DEFAULT_STYLE,           // 'default' | 'aura' | 'cobalt' | …
    klass: null,             // selected class id (informational)
    gameMode: { league: true, hardcore: false, ssf: false },
    // Quick Filters: the dropdown sections (schema in data/quickFilters.js) → override blocks.
    quickFilters: { ...QF_DEFAULTS },
    // Quick Editor custom rules: hide / show / highlight anything (also import target).
    overrides: {
      rules: [],             // user-built rules (see emptyOverrideRule)
    },
    // Custom Rules page: precedence-ordered Show/Hide rules (also compiled into overrides).
    customRules: [],
    freeText: { top: '', bottom: '' },
    // Cosmetic: per drop-tier style overrides keyed by tier id (used by Tier List highlights).
    cosmetic: { hiddenGearTransparent: true, hiddenFlasks: false, hiddenJewellery: false, tierStyles: {} },
    // Tier list overrides: itemName -> tierId (drag/drop moves) → compiled to overrides.
    tierOverrides: {},
  }
}

// A blank Quick Editor override rule (hide / show / highlight anything).
export function emptyOverrideRule(n = 1) {
  return {
    id: 'ov' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
    enabled: true,
    action: 'Hide',          // 'Hide' | 'Show'
    label: `Rule ${n}`,
    match: {                 // every field optional; only set fields constrain the rule
      classes: [], baseType: '', baseMode: 'contains',
      rarity: '', rarityOp: '<=',
      itemLevel: '', itemLevelOp: '<',
      quality: '', qualityOp: '>=',
      sockets: '', socketsOp: '>=',
      stackSize: '', stackSizeOp: '>=',
      waystoneTier: '', waystoneTierOp: '>=',
      areaLevel: '', areaLevelOp: '<=',
    },
    style: null,             // null → DEFAULT_HIGHLIGHT when action is Show
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

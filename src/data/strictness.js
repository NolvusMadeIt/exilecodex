// Strictness profiles — each preset is a concrete set of Quick Filter values + a catch-all
// behaviour. Picking a preset writes these into active.quickFilters, so the dropdowns always
// mirror the filter (the poe2filter.com behaviour). Softer = show more; stricter = hide the tail.
import { QF_DEFAULTS } from './quickFilters.js'

// catchAll: what happens to everything NOT matched by an earlier rule.
//   'show' → show it dimly (nothing is hidden) · 'hide' → hide it (true strictness)
const ALL_CURRENCY = ['shards', 'runes', 'catalysts', 'essences', 'omens']
const ALL_GEMS = ['uncut', 'skill', 'support']
const ALL_FLASKS = ['life', 'mana', 'charms']
const ALL_ENDGAME = ['quest', 'relics', 'trials', 'tablets', 'fragments', 'expedition']

const profile = (over) => ({ ...QF_DEFAULTS, ...over })

export const STRICTNESS_PROFILES = {
  '0-soft': profile({
    currencyShow: ALL_CURRENCY, gemsShow: ALL_GEMS, flasksShow: ALL_FLASKS,
    endgameShow: ALL_ENDGAME, showWaystones: true, showJewels: true, showUniques: true,
    hideScrolls: false, hideGold: false, minGoldPile: 0, hideNonUniqueFlasks: false,
    gearMinRarity: 'all', catchAll: 'show',
  }),
  '1-regular': profile({
    currencyShow: ALL_CURRENCY, gemsShow: ALL_GEMS, flasksShow: ALL_FLASKS,
    endgameShow: ALL_ENDGAME, showWaystones: true, showJewels: true, showUniques: true,
    hideScrolls: true, minGoldPile: 200, hideNonUniqueFlasks: false,
    gearMinRarity: 'all', catchAll: 'show',
  }),
  '2-semi-strict': profile({
    currencyShow: ALL_CURRENCY, gemsShow: ALL_GEMS, flasksShow: ALL_FLASKS,
    endgameShow: ALL_ENDGAME, showWaystones: true, showJewels: true, showUniques: true,
    hideScrolls: true, minGoldPile: 400, hideNonUniqueFlasks: true,
    gearMinRarity: 'Magic', catchAll: 'show',
  }),
  '3-strict': profile({
    levelingShow: [], currencyShow: ALL_CURRENCY, gemsShow: ['skill', 'support'], flasksShow: ['life', 'mana'],
    endgameShow: ALL_ENDGAME, showWaystones: true, showJewels: true, showUniques: true, highlightJewellery: true,
    hideScrolls: true, minGoldPile: 800, hideNonUniqueFlasks: true,
    gearMinRarity: 'Rare', alwaysShowRareIlvl: 80, catchAll: 'hide',
  }),
  '4-very-strict': profile({
    levelingShow: [], currencyShow: ['runes', 'catalysts', 'essences', 'omens'], gemsShow: ['skill', 'support'], flasksShow: [],
    endgameShow: ['trials', 'tablets', 'fragments', 'expedition'], showWaystones: true, showJewels: true,
    showUniques: true, highlightJewellery: true, hideLowValueUniques: true,
    hideScrolls: true, minGoldPile: 1500, hideNonUniqueFlasks: true,
    gearMinRarity: 'Rare', alwaysShowRareIlvl: 82, catchAll: 'hide',
  }),
  '5-uber-strict': profile({
    levelingShow: [], currencyShow: ['runes', 'essences', 'omens'], gemsShow: ['support'], flasksShow: [],
    endgameShow: ['tablets', 'fragments'], showWaystones: true, showJewels: true,
    showUniques: true, highlightJewellery: true, hideLowValueUniques: true,
    hideScrolls: true, minGoldPile: 3000, hideNonUniqueFlasks: true,
    gearMinRarity: 'Rare', alwaysShowRareIlvl: 84, catchAll: 'hide',
  }),
  '6-uber-plus-strict': profile({
    levelingShow: [], currencyShow: ['essences', 'omens'], gemsShow: [], flasksShow: [],
    endgameShow: ['fragments'], showWaystones: true, showJewels: false,
    showUniques: true, highlightJewellery: true, hideLowValueUniques: true,
    hideScrolls: true, hideGold: true, minGoldPile: 0, hideNonUniqueFlasks: true,
    gearMinRarity: 'Rare', alwaysShowRareIlvl: 86, catchAll: 'hide',
  }),
}

// The quick-filter value set for a strictness id (falls back to Regular). Deep-copied at the
// boundary: profiles share nested arrays with QF_DEFAULTS, so handing out the live object would
// let any caller that mutates an array corrupt the profile (and every other profile) in place.
export const strictnessProfile = (id) =>
  JSON.parse(JSON.stringify(STRICTNESS_PROFILES[id] || STRICTNESS_PROFILES['1-regular']))

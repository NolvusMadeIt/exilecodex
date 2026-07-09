// Drop Tier definitions — market-value buckets for Currency and Uniques.
// Beam color + minimap + default thresholds drive the Cosmetic defaults (S→F).
import { CURRENCY_TIERS, UNIQUE_TIERS } from './valueTable.js'

export const DROP_TIERS = [
  { id: 'S', name: 'S-Tier', label: 'Purple highlight', beam: 'purple', minimap: 'purple', threshold: '≥ 100', textColor: [182, 96, 224] },
  { id: 'A', name: 'A-Tier', label: 'Red highlight',    beam: 'red',    minimap: 'red',    threshold: '≥ 15',  textColor: [224, 64, 64] },
  { id: 'B', name: 'B-Tier', label: 'Orange highlight', beam: 'orange', minimap: 'orange', threshold: '≥ 3',   textColor: [224, 144, 42] },
  { id: 'C', name: 'C-Tier', label: 'Yellow highlight', beam: 'yellow', minimap: 'yellow', threshold: '~ 1',   textColor: [230, 210, 74] },
  { id: 'D', name: 'D-Tier', label: 'White highlight',  beam: 'white',  minimap: 'white',  threshold: '< 0.5', textColor: [232, 232, 232] },
  { id: 'E', name: 'E-Tier', label: 'Visible, no highlight', beam: null, minimap: null,   threshold: '< 0.1', textColor: [200, 200, 200] },
  { id: 'F', name: 'F-Tier', label: 'Hidden',          beam: null,     minimap: null,     threshold: '< 0.01', hide: true, textColor: [120, 120, 120] },
]

// Starting currency + UNIQUE tiers — a static, curated economy snapshot from data/valueTable.js.
// Drives the auto-seeded Tier Lists + "Drop Tier Highlights" output out-of-the-box; users re-tier on
// the Tier List page and their moves always win. On output each unique is resolved to its base type
// + `Rarity Unique` (PoE2 can't match a unique by name). Names must exist in the bundled catalogs.
export const DEFAULT_TIER_CURRENCY = CURRENCY_TIERS
export const DEFAULT_TIER_UNIQUES = UNIQUE_TIERS

export const BEAM_COLORS = ['White', 'Yellow', 'Orange', 'Red', 'Purple', 'Brown', 'Cyan', 'Green', 'Blue', 'Pink', 'Grey']
export const MINIMAP_SHAPES = ['Circle', 'Diamond', 'Hexagon', 'Square', 'Star', 'Triangle', 'Cross', 'Moon', 'Raindrop', 'Kite', 'Pentagon', 'UpsideDownHouse']

// CSS color for a beam name (for previews)
export const BEAM_CSS = {
  White: '#e8e8e8', Yellow: '#e6d24a', Orange: '#e0902a', Red: '#e04040',
  Purple: '#b660e0', Brown: '#9a6a3a', Cyan: '#39c5c5', Green: '#46c24a',
  Blue: '#5b86b3', Pink: '#e07ab0', Grey: '#9aa0a8',
}

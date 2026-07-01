// Option data for the Quick Editor (the override rule builder). All class names are real PoE2
// item classes (as used by the core filter), so a rule the user builds actually matches in-game.

export const WEAPON_CLASSES = ['Bows', 'Crossbows', 'Quarterstaves', 'Spears', 'Sceptres', 'Wands', 'Staves', 'One Hand Maces', 'Two Hand Maces', 'Foci', 'Quivers']
export const ARMOUR_CLASSES = ['Body Armours', 'Helmets', 'Gloves', 'Boots', 'Shields', 'Bucklers']
export const JEWELLERY_CLASSES = ['Amulets', 'Rings', 'Belts']

// Grouped class options for the rule matcher's Class multiselect.
export const CLASS_OPTION_GROUPS = [
  { label: 'Weapons', options: WEAPON_CLASSES },
  { label: 'Armour', options: ARMOUR_CLASSES },
  { label: 'Jewellery', options: JEWELLERY_CLASSES },
  { label: 'Flasks & Charms', options: ['Life Flasks', 'Mana Flasks', 'Charms'] },
  { label: 'Gems', options: ['Skill Gems', 'Support Gems'] },
  { label: 'Other', options: ['Jewels', 'Waystones', 'Relics', 'Quest Items', 'Stackable Currency'] },
]

export const ALL_CLASSES = CLASS_OPTION_GROUPS.flatMap(g => g.options)

export const RARITIES = ['Normal', 'Magic', 'Rare', 'Unique']
// Human-readable operator labels. The `value` is the real PoE2 operator the filter still emits
// (so "at least" → ">="), the label is just what the user reads in the dropdown.
export const NUM_OPS = [
  { value: '>=', label: 'at least' },
  { value: '>', label: 'more than' },
  { value: '=', label: 'exactly' },
  { value: '<', label: 'less than' },
  { value: '<=', label: 'at most' },
]
export const RARITY_OPS = [
  { value: '>=', label: 'at least' },
  { value: '>', label: 'higher than' },
  { value: '=', label: 'exactly' },
  { value: '<', label: 'lower than' },
  { value: '<=', label: 'at most' },
]

// Quick highlight presets for Show rules — each is a complete, valid style.
export const HIGHLIGHT_PRESETS = [
  { id: 'red', name: 'Red (loud)', style: { textColor: [255, 255, 255, 255], borderColor: [255, 60, 60, 255], bgColor: [40, 0, 0, 255], fontSize: 40, beam: 'Red', minimap: 'Red', minimapShape: 'Star', sound: 1, volume: 300 } },
  { id: 'purple', name: 'Purple', style: { textColor: [255, 255, 255, 255], borderColor: [182, 96, 224, 255], bgColor: [28, 8, 40, 255], fontSize: 40, beam: 'Purple', minimap: 'Purple', minimapShape: 'Star', sound: 2, volume: 300 } },
  { id: 'orange', name: 'Orange', style: { textColor: [255, 255, 255, 255], borderColor: [224, 144, 42, 255], bgColor: [40, 24, 0, 255], fontSize: 38, beam: 'Orange', minimap: 'Orange', minimapShape: 'Diamond', sound: 1, volume: 250 } },
  { id: 'yellow', name: 'Yellow', style: { textColor: [230, 210, 74, 255], borderColor: [230, 210, 74, 255], bgColor: [24, 24, 0, 255], fontSize: 36, beam: 'Yellow', minimap: 'Yellow', minimapShape: 'Circle', sound: 1, volume: 200 } },
  { id: 'cyan', name: 'Cyan', style: { textColor: [255, 255, 255, 255], borderColor: [57, 197, 197, 255], bgColor: [0, 30, 30, 255], fontSize: 36, beam: 'Cyan', minimap: 'Cyan', minimapShape: 'Hexagon', sound: 1, volume: 200 } },
  { id: 'green', name: 'Green', style: { textColor: [255, 255, 255, 255], borderColor: [70, 194, 74, 255], bgColor: [0, 28, 0, 255], fontSize: 36, beam: 'Green', minimap: 'Green', minimapShape: 'Triangle', sound: 1, volume: 200 } },
  { id: 'subtle', name: 'Subtle border only', style: { borderColor: [200, 200, 200, 255], fontSize: 34 } },
]

export const highlightPreset = (id) => HIGHLIGHT_PRESETS.find(p => p.id === id) || HIGHLIGHT_PRESETS[0]

// Match a saved style back to a preset id (for showing the active swatch). Compares the beam +
// border; falls back to 'red' (the default highlight).
export function presetIdForStyle(style) {
  if (!style) return 'red'
  const hit = HIGHLIGHT_PRESETS.find(p => JSON.stringify(p.style.borderColor) === JSON.stringify(style.borderColor) && p.style.beam === style.beam)
  return hit ? hit.id : 'red'
}

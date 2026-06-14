export const RARITIES = ['Normal', 'Magic', 'Rare', 'Unique']

export const SOUNDS = Array.from({ length: 16 }, (_, i) => i + 1)

export const MINIMAP_SHAPES = ['Circle', 'Diamond', 'Hexagon', 'Square', 'Star', 'Triangle', 'Cross', 'Moon', 'Kite', 'Pentagon']

export const EFFECT_COLORS = ['Red', 'Green', 'Blue', 'Brown', 'White', 'Yellow', 'Cyan', 'Grey', 'Orange', 'Pink', 'Purple']

export const CONDITIONS = [
  { key: 'Class', label: 'Item Class', type: 'list' },
  { key: 'BaseType', label: 'Base Type', type: 'list' },
  { key: 'Rarity', label: 'Rarity', type: 'rarity' },
  { key: 'ItemLevel', label: 'Item Level', type: 'numeric' },
  { key: 'StackSize', label: 'Stack Size', type: 'numeric' },
  { key: 'Quality', label: 'Quality', type: 'numeric' },
  { key: 'WaystoneTier', label: 'Waystone Tier', type: 'numeric' }
]

export const RARITY_COLORS = {
  Normal: { text: [200, 200, 200, 255] },
  Magic: { text: [136, 136, 255, 255] },
  Rare: { text: [255, 255, 119, 255] },
  Unique: { text: [175, 96, 37, 255] }
}

export const CATEGORIES = [
  { id: 'currency-high', name: 'High Currency', baseTypes: ['Exalted Orb', 'Chaos Orb', 'Divine Orb'], defaults: { text: [255, 178, 135], size: 40, beam: 'Yellow', icon: ['Circle', 'Yellow'] } },
  { id: 'currency-mid', name: 'Mid Currency', baseTypes: ['Regal Orb', 'Orb of Alchemy', 'Vaal Orb'], defaults: { text: [255, 207, 132], size: 36 } },
  { id: 'uniques', name: 'All Uniques', conditions: { Rarity: ['Unique'] }, defaults: { text: [175, 96, 37], border: [175, 96, 37], size: 42, beam: 'Brown', icon: ['Star', 'Brown'] } },
  { id: 'waystones-high', name: 'Waystones T11+', classes: ['Waystones'], conditions: { WaystoneTier: { op: '>=', val: 11 } }, defaults: { text: [255, 255, 255], border: [255, 255, 255], size: 40, beam: 'White', icon: ['Square', 'White'] } },
  { id: 'hide-junk', name: 'Hide Normal/Magic Junk', conditions: { Rarity: ['Normal', 'Magic'] }, defaults: { text: [200, 200, 200], size: 28, action: 'Hide' } },
  { id: 'gems-uncut', name: 'Uncut Gems', classes: ['Uncut Skill Gems', 'Uncut Spirit Gems'], defaults: { text: [27, 162, 155], border: [27, 162, 155], size: 38, beam: 'Cyan', icon: ['Triangle', 'Cyan'] } }
]

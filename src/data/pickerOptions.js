// Visual options for condition dropdowns, styled after poe2filter.com
// Icons prefer remote static.poe2filter.com when possible (exact images from their dropdowns),
// with local fallbacks from our extracted set for reliability.

export const CLASS_OPTIONS = [
  { value: 'Stackable Currency', label: 'Stackable Currency', icon: '/icons/poe2filter/exalt.webp' },
  { value: 'Waystones', label: 'Waystones', icon: '/icons/poe2filter/waystone.webp' },
  { value: 'Rings', label: 'Rings', icon: '/icons/poe2filter/goldring.webp' },
  { value: 'Amulets', label: 'Amulets', icon: '/icons/poe2filter/goldamulet.webp' },
  { value: 'Belts', label: 'Belts', icon: '/icons/poe2filter/leatherbelt.webp' },
  { value: 'Body Armours', label: 'Body Armours', icon: '/icons/poe2filter/bodyarmour01.webp' },
  { value: 'Helmets', label: 'Helmets', icon: '/icons/poe2filter/helmet01.webp' },
  { value: 'Gloves', label: 'Gloves', icon: '/icons/poe2filter/gloves01.webp' },
  { value: 'Boots', label: 'Boots', icon: '/icons/poe2filter/boots01.webp' },
  { value: 'Shields', label: 'Shields', icon: '/icons/poe2filter/buckler01.webp' },
  { value: 'One Hand Swords', label: 'One Hand Swords', icon: '/icons/poe2filter/sword01.webp' },
  { value: 'One Hand Axes', label: 'One Hand Axes', icon: '/icons/poe2filter/axe01.webp' },
  { value: 'One Hand Maces', label: 'One Hand Maces', icon: '/icons/poe2filter/mace01.webp' },
  { value: 'Bows', label: 'Bows', icon: '/icons/poe2filter/bow01.webp' },
  { value: 'Staves', label: 'Staves', icon: '/icons/poe2filter/staff01.webp' },
  { value: 'Claws', label: 'Claws', icon: '/icons/poe2filter/claw01.webp' },
  { value: 'Daggers', label: 'Daggers', icon: '/icons/poe2filter/dagger01.webp' },
  { value: 'Wands', label: 'Wands', icon: '/icons/poe2filter/wand01.webp' },
  { value: 'Uncut Skill Gems', label: 'Uncut Skill Gems', icon: '/icons/poe2filter/uncutskillgem.webp' },
  { value: 'Uncut Spirit Gems', label: 'Uncut Spirit Gems', icon: '/icons/poe2filter/uncutskillgem.webp' },
  { value: 'Charms', label: 'Charms', icon: '/icons/poe2filter/charm01.webp' },
  { value: 'Jewels', label: 'Jewels', icon: '/icons/jewel.webp' },
  { value: 'Flasks', label: 'Flasks', icon: '/icons/poe2filter/lifeflask01.webp' },
  { value: 'Life Flasks', label: 'Life Flasks', icon: '/icons/poe2filter/lifeflask01.webp' },
  { value: 'Mana Flasks', label: 'Mana Flasks', icon: '/icons/poe2filter/lifeflask01.webp' },
];

export const BASE_TYPE_OPTIONS = [
  // Currency 
  { value: 'Exalted Orb', label: 'Exalted Orb', icon: '/icons/poe2filter/exalt.webp' },
  { value: 'Divine Orb', label: 'Divine Orb', icon: '/icons/poe2filter/divine.webp' },
  { value: 'Chaos Orb', label: 'Chaos Orb', icon: '/icons/poe2filter/chaos.webp' },
  { value: 'Regal Orb', label: 'Regal Orb', icon: '/icons/poe2filter/exalt.webp' },
  { value: 'Orb of Alchemy', label: 'Orb of Alchemy', icon: '/icons/poe2filter/exalt.webp' },
  { value: 'Vaal Orb', label: 'Vaal Orb', icon: '/icons/poe2filter/exalt.webp' },
  { value: 'Orb of Augmentation', label: 'Orb of Augmentation', icon: '/icons/poe2filter/exalt.webp' },
  { value: 'Orb of Transmutation', label: 'Orb of Transmutation', icon: '/icons/poe2filter/exalt.webp' },
  { value: 'Gold', label: 'Gold', icon: '/icons/poe2filter/gold.webp' },
  { value: 'Verisium', label: 'Verisium', icon: '/icons/verisium.webp' },
  // Jewellery - using poe2filter local copies in correct spots
  { value: 'Gold Ring', label: 'Gold Ring', icon: '/icons/poe2filter/goldring.webp' },
  { value: 'Iron Ring', label: 'Iron Ring', icon: '/icons/poe2filter/ironring.webp' },
  { value: 'Gold Amulet', label: 'Gold Amulet', icon: '/icons/poe2filter/goldamulet.webp' },
  { value: 'Leather Belt', label: 'Leather Belt', icon: '/icons/poe2filter/leatherbelt.webp' },
  // Armour & Weapons 
  { value: 'Body Armour', label: 'Body Armour', icon: '/icons/poe2filter/bodyarmour01.webp' },
  { value: 'Helmet', label: 'Helmet', icon: '/icons/poe2filter/helmet01.webp' },
  { value: 'Buckler', label: 'Buckler', icon: '/icons/poe2filter/buckler01.webp' },
  // Gems / other
  { value: 'Uncut Skill Gem', label: 'Uncut Skill Gem', icon: '/icons/poe2filter/uncutskillgem.webp' },
  { value: 'Uncut Spirit Gem', label: 'Uncut Spirit Gem', icon: '/icons/poe2filter/uncutskillgem.webp' },
];

export const PRESETS = [
  {
    id: 'campaign',
    name: 'Campaign',
    description: 'Leveling focus. Shows useful weapons/armour for your class, basic currency, gems, and charms. Hides junk.',
    icon: '/icons/presets/campaign.webp',
  },
  {
    id: 'interludes',
    name: 'Interludes',
    description: 'Early maps. Good currency highlights, magic/rare gear, waystones, and uniques.',
    icon: '/icons/presets/interludes.webp',
  },
  {
    id: 'progressing-maps',
    name: 'Progressing Maps',
    description: 'Mid game. Tiered waystones, strong currency, jewellery, and rare gear.',
    icon: '/icons/presets/progressing-maps.webp',
  },
  {
    id: 'early-endgame',
    name: 'Early Endgame',
    description: 'T6+ waystones, high value orbs, uniques, and good bases.',
    icon: '/icons/presets/early-endgame.webp',
  },
  {
    id: 'late-endgame',
    name: 'Late Endgame',
    description: 'Strict. High tier waystones, top currency, strong uniques and influenced gear.',
    icon: '/icons/presets/late-endgame.webp',
  },
  {
    id: 'very-late-endgame',
    name: 'Very Late Endgame',
    description: 'Very strict. Only the best drops, jackpot currency, T11+ waystones, mirror tier uniques.',
    icon: '/icons/presets/very-late-endgame.webp',
  },
];

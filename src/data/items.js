// Item icon system — representative per-category art, bundled locally under /public/img
// with opaque hashed filenames (resolved via assets.js). Per-name overrides for uniques.
import { asset } from './assets.js'

export const IMG = '/img'

const g = (p) => asset('gear/' + p)

// category id -> confirmed representative icon URL
export const CATEGORY_ICON = {
  // jewellery
  rings: g('rings/goldring.webp'),
  amulets: g('amulets/goldamulet.webp'),
  belts: g('belts/stalkingbelt.webp'),
  jewels: g('jewels/emeraldjewel.webp'),
  charms: g('charms/goldencharm.webp'),
  // flasks
  flasks: g('flasks/flasklife08.webp'),
  // armours
  helmets: g('armours/helmets/helmetstr01.webp'),
  boots: g('armours/boots/bootsstr01.webp'),
  gloves: g('armours/gloves/glovesstr01.webp'),
  bodyarmours: g('armours/bodyarmours/bodystr01.webp'),
  // offhand
  shields: asset('shields/shield-red.png'),
  foci: g('offhand/foci/focus02.webp'),
  talismans: g('offhand/talismans/changelingtalisman.webp'),
  quivers: asset('all-weapons.png'),
  // one-hand weapons
  onehandmaces: g('weapons/onehandweapons/onehandmaces/1hmace01.webp'),
  sceptres: g('weapons/onehandweapons/scepters/sceptre01.webp'),
  spears: g('weapons/onehandweapons/onehandspears/1hspear01.webp'),
  wands: g('weapons/onehandweapons/wands/wand01.webp'),
  // two-hand weapons
  twohandmaces: g('weapons/twohandweapons/twohandmaces/2hmace01.webp'),
  quarterstaves: g('weapons/twohandweapons/warstaves/warstaff01.webp'),
  staves: g('weapons/twohandweapons/staves/staff01.webp'),
  bows: g('weapons/twohandweapons/bows/bow01.webp'),
  crossbows: g('weapons/twohandweapons/crossbows/2hcrossbow01.webp'),
  // other
  relics: g('relics/relicbase1x2.webp'),
  currency: asset('currency/CoinPileTier2.webp'),
  gems: asset('all-gems.png'),
  waystones: g('maps/endgamemaps/endgamemap15.webp'),
  items: asset('all-items.png'),
}

export const iconFor = (cat) => CATEGORY_ICON[cat] || CATEGORY_ICON.items

// Item classes (the PoE2 Class names) -> the category icon they use.
// `cat` drives the icon; classes with the same icon (Shields/Bucklers) is fine.
export const CLASSES = [
  { name: 'Bows', cat: 'bows' },
  { name: 'Crossbows', cat: 'crossbows' },
  { name: 'Quarterstaves', cat: 'quarterstaves' },
  { name: 'Quivers', cat: 'quivers' },
  { name: 'Spears', cat: 'spears' },
  { name: 'Sceptres', cat: 'sceptres' },
  { name: 'Wands', cat: 'wands' },
  { name: 'Staves', cat: 'staves' },
  { name: 'One Hand Maces', cat: 'onehandmaces' },
  { name: 'Two Hand Maces', cat: 'twohandmaces' },
  { name: 'Foci', cat: 'foci' },
  { name: 'Body Armours', cat: 'bodyarmours' },
  { name: 'Helmets', cat: 'helmets' },
  { name: 'Gloves', cat: 'gloves' },
  { name: 'Boots', cat: 'boots' },
  { name: 'Shields', cat: 'shields' },
  { name: 'Bucklers', cat: 'shields' },
  { name: 'Rings', cat: 'rings' },
  { name: 'Amulets', cat: 'amulets' },
  { name: 'Belts', cat: 'belts' },
  { name: 'Talismans', cat: 'talismans' },
  { name: 'Jewels', cat: 'jewels' },
  { name: 'Life Flasks', cat: 'flasks' },
  { name: 'Mana Flasks', cat: 'flasks' },
  { name: 'Charms', cat: 'charms' },
  { name: 'Currency', cat: 'currency' },
  { name: 'Waystones', cat: 'waystones' },
  { name: 'Relics', cat: 'relics' },
  { name: 'Skill Gems', cat: 'gems' },
  { name: 'Support Gems', cat: 'gems' },
]

// Classify a base-type NAME into a category by suffix/keyword (PoE2 names are descriptive).
const RULES = [
  [/crossbow/i, 'crossbows'],
  [/\bbow\b/i, 'bows'],
  [/quiver/i, 'quivers'],
  [/\bwand\b/i, 'wands'],
  [/sceptre|scepter/i, 'sceptres'],
  [/spear/i, 'spears'],
  [/quarterstaff|warstaff/i, 'quarterstaves'],
  [/\bstaff\b|stave/i, 'staves'],
  [/mace|club|hammer|maul|breaker/i, 'twohandmaces'],
  [/focus|foci/i, 'foci'],
  [/buckler/i, 'shields'],
  [/shield|targe|tower/i, 'shields'],
  [/helm|helmet|crown|mask|hood|circlet|burgonet|bascinet|coif|tricorne|cage/i, 'helmets'],
  [/glove|gauntlet|mitt|grip|vambrace|cuff/i, 'gloves'],
  [/boot|greave|sabaton|shoe|sandal|footwrap/i, 'boots'],
  [/plate|vest|robe|garb|raiment|jacket|brigandine|hauberk|cuirass|coat|wrap|tunic|mail|carapace|lamellar|armour|ringmail|leather|jerkin/i, 'bodyarmours'],
  [/talisman/i, 'talismans'],
  [/belt|sash/i, 'belts'],
  [/amulet/i, 'amulets'],
  [/\bring\b|signet|loop|coil/i, 'rings'],
  [/jewel|\beye\b/i, 'jewels'],
  [/charm/i, 'charms'],
  [/flask/i, 'flasks'],
  [/waystone|map$/i, 'waystones'],
  [/relic/i, 'relics'],
]
export function classifyName(name) {
  for (const [re, cat] of RULES) if (re.test(name)) return cat
  return 'items'
}

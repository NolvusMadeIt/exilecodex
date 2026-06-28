// Turn a Path of Exile 2 .build JSON (passive-tree export with skills/gear, new in 0.5) into a
// real, editable loot filter — deterministically, no AI. A loot filter can't read item mods, but
// it CAN act on the two things a build tells us: the WEAPON CLASSES it uses (offense) and the
// ATTRIBUTE it stacks (defense — Str→Armour, Dex→Evasion, Int→Energy Shield). We translate those
// into ordinary Quick Filter values + one editable highlight rule, then forget the build. The
// resulting filter is just settings: fully visible in the Quick Editor, tweakable, and exportable.
// Nothing build-specific is stored on the filter and nothing about the build is emitted to output.
import { strictnessProfile } from '../data/strictness.js'
import { emptyOverrideRule } from '../store/defaultSettings.js'
import { classifyName } from '../data/items.js'

// Signature weapon classes per PoE2 class. Conservative (we'd rather show a usable weapon than
// hide it). The user refines under "My Equipment".
const CLASS_WEAPONS = {
  Warrior: ['One Hand Maces', 'Two Hand Maces'],
  Druid: ['One Hand Maces', 'Two Hand Maces', 'Quarterstaves', 'Staves'],
  Monk: ['Quarterstaves'],
  Ranger: ['Bows', 'Quivers'],
  Mercenary: ['Crossbows'],
  Huntress: ['Spears'],
  Witch: ['Wands', 'Sceptres', 'Staves', 'Foci'],
  Sorceress: ['Wands', 'Sceptres', 'Staves', 'Foci'],
}
const CLASS_NAMES = Object.keys(CLASS_WEAPONS)

// Armour categories (from data/items.js classifyName) we highlight by attribute.
const ARMOUR_CATS = new Set(['bodyarmours', 'helmets', 'gloves', 'boots', 'shields'])
// Attribute → the defence stat that attribute's armour carries (gear-data fields), a human label,
// and a subtle highlight colour (no beam / no sound — non-aggressive, just a border + text tint).
const ATTR_DEFENCE = {
  Strength: { key: 'arm', label: 'Armour', color: [214, 124, 70, 255] },
  Dexterity: { key: 'ev', label: 'Evasion', color: [98, 196, 98, 255] },
  Intelligence: { key: 'es', label: 'Energy Shield', color: [86, 162, 224, 255] },
}

// "Warrior1" / "Sorceress2" → "Warrior" / "Sorceress".
function classFromAscendancy(asc = '') {
  const base = String(asc || '').replace(/\d+$/, '')
  return CLASS_NAMES.find(c => base.toLowerCase().startsWith(c.toLowerCase())) || null
}

function primaryAttribute(passives = []) {
  const c = { Strength: 0, Dexterity: 0, Intelligence: 0 }
  for (const p of passives) {
    const id = String(p?.id || '').toLowerCase()
    if (id.startsWith('strength')) c.Strength++
    else if (id.startsWith('dexterity')) c.Dexterity++
    else if (id.startsWith('intelligence')) c.Intelligence++
  }
  const top = Object.entries(c).sort((a, b) => b[1] - a[1])[0]
  return top && top[1] > 0 ? top[0] : null
}

function weaponStyle(passives = []) {
  let two = 0, one = 0
  for (const p of passives) {
    const id = String(p?.id || '').toLowerCase()
    if (id.startsWith('two_handed')) two++
    else if (id.startsWith('one_handed')) one++
  }
  return two > one ? 'two-handed' : one > two ? 'one-handed' : null
}

// Drop the wrong-handedness mace when the build's style is clear (2H build → no One Hand Maces,
// and vice-versa). Leaves classes with no 1H/2H split untouched. Never returns an empty list.
function refineWeaponsByStyle(weapons, style) {
  let out = weapons
  if (style === 'two-handed') out = weapons.filter(w => w !== 'One Hand Maces')
  else if (style === 'one-handed') out = weapons.filter(w => w !== 'Two Hand Maces')
  return out.length ? out : weapons
}

// "Metadata/Items/Gems/SkillGemHeraldOfAsh" → "Herald of Ash".
function cleanGemName(id = '') {
  const leaf = String(id || '').split('/').pop() || ''
  return leaf
    .replace(/^(Skill|Support)Gem/, '')
    .replace(/(Two|Three|Four)$/, '')
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/\bOf\b/g, 'of')
    .trim()
}

// Does this parsed JSON look like a PoE2 build export?
export function looksLikeBuild(json) {
  return !!json && typeof json === 'object' && Array.isArray(json.passives) && (json.ascendancy != null || Array.isArray(json.skills))
}

// Extract the build's filter-relevant facts.
export function parseBuild(json = {}) {
  const className = classFromAscendancy(json.ascendancy)
  const skills = (json.skills || []).map(s => cleanGemName(s?.id)).filter(Boolean)
  return {
    name: (json.name || '').trim() || 'Imported build',
    author: (json.author || '').trim(),
    className,
    ascendancy: json.ascendancy || '',
    attribute: primaryAttribute(json.passives),
    weaponStyle: weaponStyle(json.passives),
    weapons: className ? [...CLASS_WEAPONS[className]] : [],
    skills,
  }
}

// The armour BASE TYPE names that match a build's attribute (its defence type), pulled from the
// loaded gear data. Empty when the attribute is unknown or no gear data is available.
export function armourBasesForAttribute(attribute, gear = []) {
  const def = ATTR_DEFENCE[attribute]
  if (!def || !Array.isArray(gear)) return []
  const names = new Set()
  for (const it of gear) {
    const name = it?.name
    if (!name || !ARMOUR_CATS.has(classifyName(name))) continue
    if (Number(it[def.key]) > 0) names.add(name)
  }
  return [...names].sort()
}

// One editable "highlight my armour" rule: Rare+ armour bases of the build's defence type, with a
// subtle border tint (hides nothing). Lands in the Quick Editor's "Hide / highlight anything"
// builder so the user sees it and can recolour, disable, or delete it in one click. Null if we
// can't determine the attribute or have no matching bases.
function armourHighlightRule(attribute, gear) {
  const def = ATTR_DEFENCE[attribute]
  const bases = armourBasesForAttribute(attribute, gear)
  if (!def || !bases.length) return null
  const base = emptyOverrideRule()
  return {
    ...base,
    action: 'Show',
    label: `Highlight my ${def.label} bases (your build)`,
    match: { ...base.match, baseType: bases.join(', '), baseMode: 'exact', rarity: 'Rare', rarityOp: '>=' },
    style: { textColor: def.color, borderColor: def.color, fontSize: 36 },
  }
}

// Build → a full settings patch: a Regular-strictness filter tuned to the build. Conservative —
// it keeps the build's weapon types (off-class weapons fall away below Unique via the existing
// engine), shows the gems/jewels/uniques every build wants, and highlights (never hides) the
// armour that matches the build's attribute. `gear` is the loaded gear-data array (optional;
// without it the armour highlight is simply omitted). No build summary is stored anywhere.
export function buildToFilterPatch(build, gear = []) {
  const weapons = refineWeaponsByStyle(build.weapons || [], build.weaponStyle)
  const quickFilters = {
    ...strictnessProfile('1-regular'),
    myWeapons: weapons,
    // Highlight valuable uniques — these map to VISIBLE rows in the Quick Editor's "Valuable
    // Uniques" group, so the imported build stays fully editable (gems/jewels show via the base
    // filter already). Conservative: highlights only, hides nothing.
    uExcellent: true, uGood: true, uPotential: true,
  }
  const armourRule = armourHighlightRule(build.attribute, gear)
  return {
    name: build.name,
    strictness: '1-regular',
    klass: build.className || null,
    quickFilters,
    overrides: { rules: armourRule ? [armourRule] : [] },
  }
}

// Bundled gear data (per-base attribute + defence stats), fetched once and cached. Used to derive
// the attribute-aware armour highlight. Returns [] if it can't be loaded (highlight just omitted).
let _gear = null
let _gearPromise = null
export async function loadGearData() {
  if (_gear) return _gear
  if (!_gearPromise) {
    _gearPromise = fetch('/data/poe2/gear-data.json')
      .then(r => (r.ok ? r.json() : []))
      .then(j => (Array.isArray(j) ? j : []))
      .catch(() => [])
  }
  _gear = await _gearPromise
  return _gear
}

// Parse a build JSON and produce its smart-filter patch in one step (loading gear data as needed).
// Returns { build, patch } — `build` only for toast wording; nothing build-specific is persisted.
export async function smartFilterFromBuild(json) {
  const build = parseBuild(json)
  let gear = []
  try { gear = await loadGearData() } catch { gear = [] }
  return { build, patch: buildToFilterPatch(build, gear) }
}

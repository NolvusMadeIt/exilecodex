// Manifest + loader for the bundled core filters. These are REAL .filter files served from
// /corefilters at runtime (copied from public/ into the build; resolved by the Electron app://
// origin too). A filter's base = one strictness level x one style → one real file.

// The 7 strictness levels (NeverSink tiers 0–6), in order. `n` is the numeric tier.
// Descriptions are factual summaries of what each tier actually does in-game.
export const STRICTNESS_LEVELS = [
  { id: '0-soft', n: 0, name: 'Soft',
    blurb: 'Hides almost nothing — only the most obvious trash. Best for new players and the early campaign, when you still want to see and learn most drops.' },
  { id: '1-regular', n: 1, name: 'Regular', recommended: true,
    blurb: 'The balanced baseline. Hides clear clutter while still showing most gear and currency. A solid all-round choice for the campaign and into early maps.' },
  { id: '2-semi-strict', n: 2, name: 'Semi-Strict',
    blurb: 'Begins hiding low-value normal & magic clutter as drops pick up. Good for the late campaign and early maps.' },
  { id: '3-strict', n: 3, name: 'Strict',
    blurb: 'Hides most normal and magic items, focusing on rares with good bases, currency and uniques. Built for mapping.' },
  { id: '4-very-strict', n: 4, name: 'Very Strict',
    blurb: 'Aggressive hiding for fast mapping — only worthwhile bases, valuable currency and uniques get through.' },
  { id: '5-uber-strict', n: 5, name: 'Uber Strict',
    blurb: 'Shows only high-value drops. For efficient farmers who already know what they are looking for.' },
  { id: '6-uber-plus-strict', n: 6, name: 'Uber-Plus Strict',
    blurb: 'The strictest tier — only the most valuable items in the game are shown. Maximum screen clarity for speed-farming.' },
]

// Style variants. `default` is NeverSink's standard look; the rest are his alternate skins.
// `customsounds` additionally needs the bundled .mp3 files placed next to the filter in-game.
export const STYLES = [
  { id: 'default', name: 'Default', blurb: 'The standard look — colored text, borders and beams.' },
  { id: 'aura', name: 'Aura', blurb: 'Glowing background auras on highlighted items.' },
  { id: 'cobalt', name: 'Cobalt', blurb: 'Cool blue-toned palette.' },
  { id: 'darkmode', name: 'Dark Mode', blurb: 'Muted, darker styling that is easier on the eyes.' },
  { id: 'mythic', name: 'Mythic', blurb: 'Bold, high-contrast highlights.' },
  { id: 'vaal', name: 'Vaal', blurb: 'Red/corrupted-themed styling.' },
  { id: 'zen', name: 'Zen', blurb: 'Minimal, low-noise styling.' },
  { id: 'customsounds', name: 'Custom Sounds', blurb: 'Adds spoken/custom drop sounds (ships the required .mp3 files).' },
]

export const DEFAULT_STRICTNESS = '1-regular'
export const DEFAULT_STYLE = 'default'

const STRICTNESS_IDS = new Set(STRICTNESS_LEVELS.map(s => s.id))
const STYLE_IDS = new Set(STYLES.map(s => s.id))

export const strictnessLevel = (id) => STRICTNESS_LEVELS.find(s => s.id === id) || STRICTNESS_LEVELS[1]
export const styleInfo = (id) => STYLES.find(s => s.id === id) || STYLES[0]

// Resolve to the public path of the real file. `default` style lives at the root; others under
// styles/<style>/. Unknown ids fall back to the safe defaults so we never request a missing file.
export function coreFilterPath(strictnessId = DEFAULT_STRICTNESS, styleId = DEFAULT_STYLE) {
  const s = STRICTNESS_IDS.has(strictnessId) ? strictnessId : DEFAULT_STRICTNESS
  const st = STYLE_IDS.has(styleId) ? styleId : DEFAULT_STYLE
  return st === 'default' ? `/corefilters/${s}.filter` : `/corefilters/styles/${st}/${s}.filter`
}

// In-memory cache so re-selecting the same base doesn't re-fetch. Keyed by resolved path.
const cache = new Map()

// Fetch the real core-filter text. Throws on a failed load so callers can surface a real error
// rather than silently producing a broken filter.
export async function loadCoreFilter(strictnessId, styleId) {
  const path = coreFilterPath(strictnessId, styleId)
  if (cache.has(path)) return cache.get(path)
  const res = await fetch(path)
  if (!res.ok) throw new Error(`Could not load core filter "${path}" (HTTP ${res.status})`)
  const text = await res.text()
  cache.set(path, text)
  return text
}

// Strictness levels + style catalog. The filter itself is generated 100% from settings
// (lib/buildFilter.js); strictness maps to a quick-filter profile (data/strictness.js) and a
// style maps to a REAL per-tier cosmetic preset (data/styles.js) layered under the user's
// Cosmetic page edits.

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

// Style variants — each id has a matching per-tier preset in data/styles.js that really changes
// the emitted colors/borders/backgrounds/beams/sounds. Your Cosmetic page edits always win.
export const STYLES = [
  { id: 'default', name: 'Default', blurb: 'The standard look — tier-colored text and beams.' },
  { id: 'aura', name: 'Aura', blurb: 'Glowing tinted backgrounds behind highlighted items.' },
  { id: 'cobalt', name: 'Cobalt', blurb: 'Cool blue-shifted text palette for the top tiers.' },
  { id: 'darkmode', name: 'Dark Mode', blurb: 'Dark plates behind drops with tier-colored borders.' },
  { id: 'mythic', name: 'Mythic', blurb: 'Bigger labels with gold-trimmed, high-contrast borders.' },
  { id: 'vaal', name: 'Vaal', blurb: 'Red, corrupted-themed borders and backgrounds.' },
  { id: 'zen', name: 'Zen', blurb: 'Smaller labels; no beams or sounds below the top tiers.' },
  { id: 'alerts', name: 'Alert Sounds', blurb: 'A distinct built-in drop sound per value tier.' },
]

export const DEFAULT_STRICTNESS = '1-regular'
export const DEFAULT_STYLE = 'default'

export const strictnessLevel = (id) => STRICTNESS_LEVELS.find(s => s.id === id) || STRICTNESS_LEVELS[1]
export const styleInfo = (id) => STYLES.find(s => s.id === id) || STYLES[0]

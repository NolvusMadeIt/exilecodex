// REAL style presets. A style is a per-tier cosmetic layer applied UNDER the user's own Cosmetic
// overrides (built-in tier defaults ← style preset ← user's Cosmetic edits). Picking a style
// changes the actual emitted SetTextColor/SetBorderColor/SetBackgroundColor/PlayEffect/
// PlayAlertSound lines across every tier-styled block — currency tiers, Tier List moves, unique
// tiers and quick-filter shows. No core files involved; the generator stays 100% settings-driven.
//
// Keys per tier: textColor, borderColor, bgColor ([r,g,b,a]), fontSize, beam ('None' disables),
// sound (built-in alert id), volume. Omitted keys fall through to the tier's built-in defaults.

export const STYLE_PRESETS = {
  default: {},

  // Glowing background auras behind highlighted items.
  aura: {
    S: { bgColor: [46, 18, 62, 210], borderColor: [182, 96, 224, 255] },
    A: { bgColor: [58, 14, 14, 210], borderColor: [224, 64, 64, 255] },
    B: { bgColor: [58, 36, 10, 200], borderColor: [224, 144, 42, 255] },
    C: { bgColor: [52, 46, 12, 180], borderColor: [230, 210, 74, 255] },
    D: { bgColor: [40, 40, 42, 160], borderColor: [200, 200, 200, 255] },
  },

  // Cool blue-shifted palette.
  cobalt: {
    S: { textColor: [130, 150, 255, 255], borderColor: [130, 150, 255, 255] },
    A: { textColor: [90, 160, 240, 255], borderColor: [90, 160, 240, 255] },
    B: { textColor: [80, 190, 230, 255], borderColor: [80, 190, 230, 255] },
    C: { textColor: [150, 205, 240, 255] },
    D: { textColor: [205, 220, 240, 255] },
  },

  // Dark plates behind drops — easier on the eyes, still tier-coloured borders.
  darkmode: {
    S: { bgColor: [8, 8, 10, 235], borderColor: [182, 96, 224, 255] },
    A: { bgColor: [8, 8, 10, 235], borderColor: [224, 64, 64, 255] },
    B: { bgColor: [8, 8, 10, 225], borderColor: [224, 144, 42, 255] },
    C: { bgColor: [8, 8, 10, 215], borderColor: [160, 150, 60, 255] },
    D: { bgColor: [8, 8, 10, 205], borderColor: [120, 120, 120, 255] },
  },

  // Bold, bigger, gold-trimmed high-contrast highlights.
  mythic: {
    S: { fontSize: 45, borderColor: [255, 200, 80, 255], bgColor: [30, 10, 45, 220] },
    A: { fontSize: 42, borderColor: [255, 200, 80, 255] },
    B: { fontSize: 38, borderColor: [230, 170, 60, 255] },
    C: { fontSize: 36 },
  },

  // Red / corrupted theming.
  vaal: {
    S: { borderColor: [220, 30, 30, 255], bgColor: [40, 0, 0, 220], beam: 'Red' },
    A: { borderColor: [220, 30, 30, 255], bgColor: [30, 0, 0, 200], beam: 'Red' },
    B: { borderColor: [180, 40, 40, 255] },
    C: { borderColor: [140, 50, 50, 255] },
  },

  // Minimal and quiet: smaller labels, no beams or sounds below the top tiers.
  zen: {
    S: { fontSize: 38 },
    A: { fontSize: 36 },
    B: { fontSize: 32, beam: 'None', sound: 'None' },
    C: { fontSize: 30, beam: 'None', sound: 'None' },
    D: { fontSize: 26, beam: 'None', sound: 'None' },
    E: { fontSize: 22 },
  },

  // A distinct built-in alert sound per tier so you can hear the value without looking.
  alerts: {
    S: { sound: '6', volume: 300 },
    A: { sound: '1', volume: 280 },
    B: { sound: '2', volume: 240 },
    C: { sound: '9', volume: 200 },
    D: { sound: '4', volume: 150 },
  },
}

export const stylePreset = (id) => STYLE_PRESETS[id] || STYLE_PRESETS.default

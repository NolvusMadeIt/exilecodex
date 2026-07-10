import React from 'react'
import { BEAM_CSS } from '../data/dropTiers.js'

// Renders an in-game item label with the game's real anatomy (reference: how drops actually
// look in PoE2 / how FilterBlade previews them): Fontin smallcaps, an opaque dark plate
// (or the filter's SetBackgroundColor), a border only when the filter sets one, heavy drop
// shadow, wide horizontal padding, and the minimap icon drawn inside the label's left edge.
const rgb = (arr, fallback) => (Array.isArray(arr) && arr.length >= 3) ? `rgb(${arr[0]},${arr[1]},${arr[2]})` : fallback
const rgba = (arr, fallback) => (Array.isArray(arr) && arr.length >= 3)
  ? `rgba(${arr[0]},${arr[1]},${arr[2]},${(arr[3] ?? 255) / 255})` : fallback

// MinimapIcon shapes (game vocabulary), drawn as tiny SVGs with a dark outline so they read
// on any plate color.
function MinimapShape({ shape = 'circle', color, size }) {
  const s = Math.max(7, Math.round(size * 0.55))
  const common = { width: s, height: s, viewBox: '0 0 10 10', style: { flexShrink: 0 } }
  const stroke = 'rgba(0,0,0,0.85)'
  if (shape === 'star') {
    return (
      <svg {...common}><path d="M5 0.5 6.3 3.6 9.5 3.8 7 6 7.8 9.3 5 7.5 2.2 9.3 3 6 0.5 3.8 3.7 3.6Z"
        fill={color} stroke={stroke} strokeWidth="0.7" /></svg>
    )
  }
  if (shape === 'diamond') {
    return (
      <svg {...common}><path d="M5 0.5 9.5 5 5 9.5 0.5 5Z" fill={color} stroke={stroke} strokeWidth="0.7" /></svg>
    )
  }
  return (
    <svg {...common}><circle cx="5" cy="5" r="4" fill={color} stroke={stroke} strokeWidth="0.8" /></svg>
  )
}

export function ItemLabel({
  text, textColor, bgColor, borderColor, fontSize = 32,
  beam, showBeam = true, minimap, minimapShape = 'circle', hidden = false,
}) {
  const scale = 0.5 // the game's 32px default, halved for UI density
  const size = Math.max(10, Math.round(fontSize * scale))
  // Beam names arrive both lowercase (tier data) and Capitalized (filter values) — accept both.
  const beamCss = beam && (BEAM_CSS[beam] || BEAM_CSS[String(beam).charAt(0).toUpperCase() + String(beam).slice(1).toLowerCase()])
  return (
    <span className="relative inline-flex items-center justify-center" style={hidden ? { opacity: 0.35, filter: 'grayscale(0.8)' } : undefined}>
      {showBeam && beamCss && !hidden && (
        <span aria-hidden className="absolute left-1/2 -translate-x-1/2 bottom-full"
          style={{ width: 8, height: 46, background: `linear-gradient(to top, ${beamCss}, transparent)`, filter: 'blur(2px)', opacity: 0.85 }} />
      )}
      <span
        className="inline-flex items-center leading-none whitespace-nowrap"
        style={{
          fontFamily: "'Fontin SmallCaps', 'Fontin', var(--app-font)",
          color: rgb(textColor, '#c8c8c8'),
          background: bgColor ? rgba(bgColor, 'rgba(0,0,0,0.85)') : 'rgba(0,0,0,0.85)',
          border: borderColor ? `1px solid ${rgba(borderColor, 'transparent')}` : '1px solid transparent',
          fontSize: size,
          gap: Math.round(size * 0.3),
          padding: `${Math.round(size * 0.3)}px ${Math.round(size * 0.6)}px`,
          textShadow: '1px 1px 1px rgba(0,0,0,0.95), 0 0 2px rgba(0,0,0,0.7)',
          letterSpacing: '0.015em',
          textDecoration: hidden ? 'line-through' : 'none',
          boxShadow: '0 2px 5px -2px rgba(0,0,0,0.8)',
        }}
      >
        {minimap && beamCss && <MinimapShape shape={minimapShape} color={beamCss} size={size} />}
        {text}
      </span>
    </span>
  )
}

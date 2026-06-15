import React from 'react'
import { BEAM_CSS } from '../data/dropTiers.js'

// Renders an in-game-style item label (text color + optional bg + border, smallcaps),
// optionally with a beam glow behind it. Used by Cosmetic preview and the Preview page.
const rgb = (arr, fallback) => (Array.isArray(arr) && arr.length >= 3) ? `rgb(${arr[0]},${arr[1]},${arr[2]})` : fallback

export function ItemLabel({ text, textColor, bgColor, borderColor, fontSize = 32, beam, showBeam = true, minimap }) {
  const scale = 0.42 // shrink the game's 32px default to UI size
  const size = Math.round(fontSize * scale)
  const beamCss = beam && BEAM_CSS[beam]
  return (
    <span className="relative inline-flex items-center justify-center">
      {showBeam && beamCss && (
        <span aria-hidden className="absolute left-1/2 -translate-x-1/2 bottom-full"
          style={{ width: 8, height: 46, background: `linear-gradient(to top, ${beamCss}, transparent)`, filter: 'blur(2px)', opacity: 0.85 }} />
      )}
      <span className="inline-flex items-center gap-1 leading-none whitespace-nowrap"
        style={{
          color: rgb(textColor, '#c8c8c8'),
          background: bgColor ? rgb(bgColor, 'transparent') : 'rgba(0,0,0,0.55)',
          border: `1px solid ${borderColor ? rgb(borderColor, 'transparent') : 'rgba(120,120,120,0.5)'}`,
          fontSize: size, padding: `${Math.round(size * 0.25)}px ${Math.round(size * 0.5)}px`,
          borderRadius: 2, textShadow: '0 1px 2px rgba(0,0,0,0.9)',
        }}>
        {minimap && beamCss && <span style={{ width: size * 0.5, height: size * 0.5, background: beamCss, borderRadius: '50%', display: 'inline-block' }} />}
        {text}
      </span>
    </span>
  )
}

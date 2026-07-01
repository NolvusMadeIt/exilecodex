import React from 'react'
import { isDesktopChrome } from '../lib/desktop.js'

// Decorative window skin (desktop shell only): thin metal frame down the sides and across
// the bottom, plus original filigree corner ornaments. Pure overlay — pointer-events:none,
// so it never blocks the UI. Theme-aware via the app's --c-accent / --c-accent2 vars.
export function OrnateFrame() {
  if (!isDesktopChrome()) return null
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[45]" style={{ color: 'rgb(var(--c-accent2))' }}>
      {/* beveled metal frame — bright gold inner line + dark outer edge (sides + bottom; the
          title bar caps the top) */}
      <div className="absolute rounded-b-[5px]"
        style={{
          top: 34, left: 3, right: 3, bottom: 3,
          boxShadow: [
            'inset 1px 0 0 0 rgb(var(--c-accent2) / 0.55)',
            'inset -1px 0 0 0 rgb(var(--c-accent2) / 0.55)',
            'inset 0 -1px 0 0 rgb(var(--c-accent2) / 0.55)',
            'inset 0 0 0 2px rgb(var(--c-accent2) / 0.10)',
            '0 0 0 1px rgb(0 0 0 / 0.55)',
          ].join(', '),
        }} />
      {/* faint ember glow hugging the inner frame */}
      <div className="absolute inset-0" style={{ boxShadow: 'inset 0 0 90px -44px rgb(var(--c-accent) / 0.55)' }} />

      <CornerBox style={{ bottom: 0, left: 0, transform: 'scaleY(-1)' }} />
      <CornerBox style={{ bottom: 0, right: 0, transform: 'scale(-1, -1)' }} />
    </div>
  )
}

function CornerBox({ style }) {
  return (
    <div className="absolute" style={{ width: 88, height: 88, ...style }}>
      <CornerSvg />
    </div>
  )
}

// Top-left-oriented filigree corner: double bracket, sweeping fin, a faceted gem at the
// elbow, an inward spike, and rivets. Mirrored to the other corners by the parent transform.
function CornerSvg() {
  return (
    <svg width="88" height="88" viewBox="0 0 88 88" fill="none"
      style={{ filter: 'drop-shadow(0 0 2px rgba(0,0,0,0.85))' }}>
      {/* outer + inner bracket */}
      <path d="M5 88 L5 25 C5 13 13 5 25 5 L88 5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M13 88 L13 27 C13 18 18 13 27 13 L88 13" stroke="currentColor" strokeOpacity="0.4" strokeWidth="1.1" />
      {/* sweeping fin from the gem */}
      <path d="M22 22 C22 46 42 66 66 66" stroke="currentColor" strokeOpacity="0.5" strokeWidth="1" />
      {/* inward spike with coral tip */}
      <path d="M25 25 L46 46" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M40 46 L46 46 L46 40" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
        style={{ stroke: 'rgb(var(--c-accent))' }} />
      {/* faceted gem */}
      <g transform="translate(21 21) rotate(45)">
        <rect x="-7.2" y="-7.2" width="14.4" height="14.4" rx="1.6" stroke="currentColor" strokeWidth="1.6"
          style={{ fill: 'rgb(var(--c-bg))' }} />
        <rect x="-3.2" y="-3.2" width="6.4" height="6.4" style={{ fill: 'rgb(var(--c-accent) / 0.9)' }} />
      </g>
      {/* rivets */}
      <circle cx="5" cy="62" r="1.7" fill="currentColor" />
      <circle cx="62" cy="5" r="1.7" fill="currentColor" />
    </svg>
  )
}

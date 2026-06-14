import React from 'react'
import { Tooltip } from '@mui/material'
import { Check } from 'lucide-react'

// Square checkbox toggle + label, matching the site's "■ Label (?)" rows.
export function Toggle({ checked, onChange, label, help, className = '' }) {
  return (
    <button type="button" onClick={() => onChange(!checked)}
      className={`group inline-flex items-center gap-2 text-[13px] ${className}`}>
      <span className={`sqtoggle ${checked ? 'sqtoggle-on' : ''}`}>
        {checked && <Check size={11} className="text-poe-gold" strokeWidth={3} />}
      </span>
      {label && <span className={checked ? 'text-poe-text-bright' : 'text-poe-text'}>{label}</span>}
      {help && <Help text={help} />}
    </button>
  )
}

// Inline help marker — MUI tooltip showing the explanation on hover/focus.
export function Help({ text }) {
  if (!text) return null
  return (
    <Tooltip title={text} arrow placement="top">
      <span
        tabIndex={0}
        className="inline-flex items-center text-[11px] text-poe-gold-dim hover:text-poe-gold cursor-help select-none focus:outline-none"
        aria-label="More info"
      >
        (?)
      </span>
    </Tooltip>
  )
}

// Image with graceful fallback (hides if the CDN slug is missing).
export function ItemIcon({ src, alt, size = 22, className = '' }) {
  return (
    <img src={src} alt={alt} width={size} height={size} loading="lazy"
      className={`object-contain ${className}`} style={{ width: size, height: size }}
      onError={(e) => { e.currentTarget.style.visibility = 'hidden' }} />
  )
}
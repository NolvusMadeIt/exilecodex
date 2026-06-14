import React from 'react'
import { createPortal } from 'react-dom'
import { Check } from 'lucide-react'
import { useTooltipPortal } from '../lib/useTooltipPortal.js'

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

// Inline help marker — shows a hover popover with the explanation (no native tooltip).
export function Help({ text }) {
  const [open, setOpen] = React.useState(false)
  const triggerRef = React.useRef(null)
  const { tooltipRef, tooltipStyle, arrowLeft, openUp } = useTooltipPortal({ open, anchorRef: triggerRef })

  if (!text) return null

  const tooltip = open && tooltipStyle && createPortal(
    <span
      ref={tooltipRef}
      role="tooltip"
      className="relative rounded border border-poe-line p-2.5 text-poe-text-bright text-[11.5px] leading-[1.45] shadow-panel text-left"
      style={{ ...tooltipStyle, backgroundColor: '#000', pointerEvents: 'none' }}
    >
      <span className="block text-left">{text}</span>
      <span
        aria-hidden
        className={`absolute w-2 h-2 rotate-45 border-poe-line ${openUp ? 'border-r border-b -bottom-1' : 'border-l border-t -top-1'}`}
        style={{ left: arrowLeft, backgroundColor: '#000' }}
      />
    </span>,
    document.body,
  )

  return (
    <span
      ref={triggerRef}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
      tabIndex={0}
      className="inline-flex items-center text-[11px] text-poe-gold-dim hover:text-poe-gold cursor-help select-none focus:outline-none"
      aria-label="More info"
    >
      (?)
      {tooltip}
    </span>
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
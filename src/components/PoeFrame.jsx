import React, { useState } from 'react'
import { X, ChevronDown, ChevronUp } from 'lucide-react'

// The in-game window chrome (Exile theme) — original implementation. A framed panel with a
// title band, gold/bronze bevels and corner studs, evoking PoE2's own window dressing. The
// styling lives in index.css (.poe-frame*): pure layered CSS by default, with texture slots
// (--ui-frame-bg / --ui-head-bg) that upgrade the look automatically if real game textures
// are ever dropped into public/ui/ and the vars defined. Header is a drag region in frameless
// desktop windows via data-drag (see OverlayShell).
export function PoeFrame({
  title,
  actions,            // extra header controls (right side, before collapse/close)
  onClose,
  collapsible = false,
  defaultCollapsed = false,
  dragHeader = false, // frameless-window move region (desktop overlay)
  className = '',
  bodyClassName = '',
  children,
}) {
  const [collapsed, setCollapsed] = useState(defaultCollapsed)
  const hasHead = title != null || actions || onClose || collapsible
  return (
    <section className={`poe-frame ${className}`}>
      <i aria-hidden className="poe-frame-corner" data-pos="tl" />
      <i aria-hidden className="poe-frame-corner" data-pos="tr" />
      <i aria-hidden className="poe-frame-corner" data-pos="bl" />
      <i aria-hidden className="poe-frame-corner" data-pos="br" />
      {hasHead && (
        <header
          className="poe-frame-head"
          style={dragHeader ? { WebkitAppRegion: 'drag' } : undefined}
        >
          <span className="poe-frame-title truncate">{title}</span>
          <div
            className="flex shrink-0 items-center gap-1"
            style={dragHeader ? { WebkitAppRegion: 'no-drag' } : undefined}
          >
            {actions}
            {collapsible && (
              <button
                type="button"
                className="poe-frame-btn"
                title={collapsed ? 'Expand' : 'Collapse'}
                onClick={() => setCollapsed((c) => !c)}
              >
                {collapsed ? <ChevronDown size={12} /> : <ChevronUp size={12} />}
              </button>
            )}
            {onClose && (
              <button type="button" className="poe-frame-btn" title="Close" onClick={onClose}>
                <X size={12} />
              </button>
            )}
          </div>
        </header>
      )}
      {!collapsed && <div className={`poe-frame-body ${bodyClassName}`}>{children}</div>}
    </section>
  )
}

// The beveled game-style button. Sizes via className (h-*/px-*); variant="gold" for the
// primary action.
export function PoeButton({ variant = 'default', className = '', children, ...props }) {
  return (
    <button type="button" className={`poe-btn ${variant === 'gold' ? 'poe-btn-gold' : ''} ${className}`} {...props}>
      {children}
    </button>
  )
}

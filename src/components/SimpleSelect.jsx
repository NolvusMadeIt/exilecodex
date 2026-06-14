import React, { useCallback, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { ChevronDown } from 'lucide-react'
import { useDropdownPortal } from '../lib/useDropdownPortal.js'

const norm = (options) =>
  options.map(o => (typeof o === 'string' ? { value: o, label: o } : o))

// Single-select dropdown with a solid black panel (replaces native <select>).
export function SimpleSelect({ value, onChange, options, className = '', disabled = false, style, title }) {
  const [open, setOpen] = useState(false)
  const anchorRef = useRef(null)
  const items = useMemo(() => norm(options), [options])
  const current = items.find(o => o.value === value) || items[0]
  const close = useCallback(() => setOpen(false), [])
  const { menuRef, menuStyle } = useDropdownPortal({
    open,
    onClose: close,
    anchorRef,
    minWidth: 80,
    maxHeight: 240,
  })

  const menu = open && menuStyle && createPortal(
    <div
      ref={menuRef}
      className="dropdown-panel rounded border border-poe-line shadow-panel p-1 overflow-auto"
      style={{ ...menuStyle, backgroundColor: '#000' }}
    >
      {items.map(o => {
        const on = o.value === value
        return (
          <button
            key={o.value}
            type="button"
            // Stay open after picking — closes on outside-click or clicking the field again.
            onClick={() => onChange(o.value)}
            className={`w-full text-left rounded px-2 py-1 text-[12px] flex items-center gap-1.5 ${on ? 'text-poe-heading' : 'text-poe-text-bright hover:bg-[#1a1a1c]'}`}
            style={{ backgroundColor: '#000', color: o.color }}
          >
            <span className="w-3 shrink-0 text-poe-gold">{on ? '✓' : ''}</span>
            <span className="flex-1">{o.label}</span>
          </button>
        )
      })}
    </div>,
    document.body,
  )

  return (
    <div ref={anchorRef}>
      <button
        type="button"
        disabled={disabled}
        onClick={() => !disabled && setOpen(o => !o)}
        className={`field h-7 flex items-center gap-1 text-left disabled:opacity-40 disabled:cursor-not-allowed ${className}`}
        style={{ ...style, color: current?.color || style?.color, backgroundColor: '#000' }}
        title={title}
      >
        <span className="flex-1 truncate">{current?.label ?? value}</span>
        <ChevronDown size={12} className="opacity-60 shrink-0" />
      </button>
      {menu}
    </div>
  )
}
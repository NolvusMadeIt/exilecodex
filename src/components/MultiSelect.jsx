import React, { useCallback, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { ChevronDown, X, Check } from 'lucide-react'
import { ItemIcon } from './primitives.jsx'
import { useDropdownPortal } from '../lib/useDropdownPortal.js'

// Compact multiselect with checkboxes + chips. options: [{ value, label, icon? }].
// value: string[] of selected values. onChange(string[]). No search (short lists).
export function MultiSelect({ options, value = [], onChange, allLabel = 'None', width = 230 }) {
  const [open, setOpen] = useState(false)
  const anchorRef = useRef(null)
  const close = useCallback(() => setOpen(false), [])
  const { menuRef, menuStyle } = useDropdownPortal({ open, onClose: close, anchorRef, width, minWidth: width, maxHeight: 320 })

  const toggle = (v) => onChange(value.includes(v) ? value.filter(x => x !== v) : [...value, v])
  const selected = options.filter(o => value.includes(o.value))

  const summary = value.length === 0 ? allLabel
    : value.length === options.length ? 'All'
    : value.length <= 2 ? selected.map(o => o.label).join(', ')
    : `${value.length} selected`

  const menu = open && menuStyle && createPortal(
    <div ref={menuRef} className="rounded border border-poe-line shadow-panel p-1 flex flex-col" style={{ ...menuStyle, backgroundColor: '#000' }}>
      <div className="flex items-center justify-between px-1.5 py-1 shrink-0">
        <button onClick={() => onChange(options.map(o => o.value))} className="text-[10px] text-poe-text hover:text-poe-heading">All</button>
        <button onClick={() => onChange([])} className="text-[10px] text-poe-text hover:text-poe-heading">None</button>
      </div>
      <div className="overflow-auto flex-1 min-h-0" style={{ backgroundColor: '#000' }}>
        {options.map(o => {
          const on = value.includes(o.value)
          return (
            <button key={o.value} onClick={() => toggle(o.value)}
              className={`w-full flex items-center gap-2 px-1.5 py-1 rounded text-left text-[12px] ${on ? 'text-poe-heading' : 'hover:bg-[#1a1a1c] text-poe-text-bright'}`}
              style={{ backgroundColor: '#000' }}>
              <span className={`sqtoggle ${on ? 'sqtoggle-on' : ''} shrink-0`}>
                {on && <Check size={10} className="text-poe-gold" strokeWidth={3} />}
              </span>
              {o.icon && <ItemIcon src={o.icon} size={18} />}
              <span className="truncate flex-1">{o.label}</span>
            </button>
          )
        })}
      </div>
    </div>,
    document.body,
  )

  return (
    <div ref={anchorRef} style={{ width }}>
      <button type="button" onClick={() => setOpen(o => !o)} className="field h-7 flex items-center gap-1.5 text-left w-full">
        <span className="flex-1 truncate text-[12px]">
          {value.length === 0 ? <span className="text-poe-text">{allLabel}</span> : summary}
        </span>
        <ChevronDown size={12} className="opacity-60 shrink-0" />
      </button>
      {menu}
    </div>
  )
}

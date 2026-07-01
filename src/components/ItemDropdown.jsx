import React, { useCallback, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { ChevronDown, X, Search } from 'lucide-react'
import { ItemIcon } from './primitives.jsx'
import { useDropdownPortal } from '../lib/useDropdownPortal.js'

// Multiselect dropdown with search + item images. No typing of names required.
// options: [{ name, icon }]. value: string[]. onChange(string[]).
export function ItemDropdown({ options, value = [], onChange, placeholder = 'Choose…', allLabel = 'All', icon, width = 240 }) {
  const [open, setOpen] = useState(false)
  const [q, setQ] = useState('')
  const [showAll, setShowAll] = useState(false)
  const anchorRef = useRef(null)
  const close = useCallback(() => setOpen(false), [])
  const { menuRef, menuStyle } = useDropdownPortal({
    open,
    onClose: close,
    anchorRef,
    width,
    minWidth: 240,
    maxHeight: 320,
  })

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase()
    const list = s ? options.filter(o => o.name.toLowerCase().includes(s)) : options
    return list.slice(0, 400)
  }, [options, q])

  const toggle = (name) => {
    onChange(value.includes(name) ? value.filter(v => v !== name) : [...value, name])
  }

  const selectedOpts = value.map(v => options.find(o => o.name === v)).filter(Boolean)

  const menu = open && menuStyle && createPortal(
    <div
      ref={menuRef}
      className="dropdown-panel rounded border border-poe-line shadow-panel p-1.5 flex flex-col"
      style={{ ...menuStyle, backgroundColor: '#000' }}
    >
      <div className="flex items-center gap-1 mb-1 border border-poe-line rounded px-1.5 shrink-0" style={{ backgroundColor: '#000' }}>
        <Search size={12} className="text-poe-text" />
        <input autoFocus value={q} onChange={e => setQ(e.target.value)} placeholder="Search…"
          className="h-7 text-[12px] flex-1 outline-none text-poe-text-bright border-0"
          style={{ backgroundColor: '#000' }} />
        {value.length > 0 && <button onClick={() => onChange([])} className="text-[10px] text-poe-text hover:text-poe-heading hover:bg-[#1a1a1c] px-1 rounded">clear</button>}
      </div>
      <div className="dropdown-panel overflow-auto pr-1 flex-1 min-h-0" style={{ backgroundColor: '#000' }}>
        {filtered.length === 0 && <div className="text-[12px] text-poe-text px-1 py-2" style={{ backgroundColor: '#000' }}>No matches.</div>}
        {filtered.map(o => {
          const on = value.includes(o.name)
          return (
            <button key={o.name} onClick={() => toggle(o.name)}
              className={`w-full flex items-center gap-2 px-1.5 py-1 rounded text-left text-[12px] ${on ? 'text-poe-heading' : 'hover:bg-[#1a1a1c] text-poe-text-bright'}`}
              style={{ backgroundColor: '#000' }}>
              <ItemIcon src={o.icon} size={20} />
              <span className="truncate flex-1">{o.name}</span>
              {on && <span className="text-poe-gold text-[11px]">✓</span>}
            </button>
          )
        })}
      </div>
      <div className="text-right pt-1 shrink-0" style={{ backgroundColor: '#000' }}>
        <button onClick={close} className="text-[11px] text-poe-text hover:text-poe-heading hover:bg-[#1a1a1c] px-1 rounded">Close</button>
      </div>
    </div>,
    document.body,
  )

  return (
    <div ref={anchorRef} style={{ width }}>
      <button type="button" onClick={() => setOpen(o => !o)}
        className="field h-7 flex items-center gap-1.5 text-left w-full">
        {icon && <ItemIcon src={icon} size={16} />}
        <span className="flex-1 truncate text-[12px]">
          {value.length === 0 ? <span className="text-poe-text">{allLabel}</span>
            : value.length <= 2 ? value.join(', ')
            : `${value.length} selected`}
        </span>
        <ChevronDown size={12} className="opacity-60 shrink-0" />
      </button>

      {selectedOpts.length > 0 && (() => {
        // Long selections (e.g. a build-generated or imported base-type list) would otherwise be a
        // wall of chips. Show a handful, then collapse the rest behind "+N more" → a scrollable box.
        const LIMIT = 12
        const many = selectedOpts.length > LIMIT
        const shown = many && !showAll ? selectedOpts.slice(0, LIMIT) : selectedOpts
        const Chip = (o) => (
          <span key={o.name} className="inline-flex items-center gap-1 bg-black border border-poe-line rounded px-1 py-0.5 text-[11px]">
            <ItemIcon src={o.icon} size={14} /> {o.name}
            <button onClick={() => toggle(o.name)} className="text-poe-danger hover:text-red-400"><X size={10} /></button>
          </span>
        )
        return (
          <div className="mt-1">
            <div className={`flex flex-wrap gap-1 ${many && showAll ? 'max-h-44 overflow-auto pr-1' : ''}`}>
              {shown.map(Chip)}
              {many && !showAll && (
                <button onClick={() => setShowAll(true)}
                  className="inline-flex items-center rounded px-1.5 py-0.5 text-[11px] text-poe-gold-dim hover:text-poe-gold border border-poe-line hover:border-poe-gold-dim">
                  +{selectedOpts.length - LIMIT} more
                </button>
              )}
            </div>
            {many && (
              <div className="flex items-center gap-3 mt-1">
                {showAll && <button onClick={() => setShowAll(false)} className="text-[10px] text-poe-text hover:text-poe-heading">Show less</button>}
                <button onClick={() => onChange([])} className="text-[10px] text-poe-text hover:text-poe-danger">Clear all ({selectedOpts.length})</button>
              </div>
            )}
          </div>
        )
      })()}

      {menu}
    </div>
  )
}
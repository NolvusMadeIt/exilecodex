import React, { useCallback, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { Languages, Check } from 'lucide-react'
import { useDropdownPortal } from '../lib/useDropdownPortal.js'
import { usePrefs } from '../store/Prefs.jsx'
import { LANGUAGES, useT } from '../i18n/index.js'

// Language selector for the top bar (next to the filter legend). Switches the whole UI
// instantly; the choice persists + syncs like every other preference.
export function LangPicker() {
  const { prefs, update } = usePrefs()
  const t = useT()
  const [open, setOpen] = useState(false)
  const anchorRef = useRef(null)
  const lang = prefs.lang || 'en'
  const cur = LANGUAGES.find(l => l.id === lang) || LANGUAGES[0]
  const close = useCallback(() => setOpen(false), [])
  const { menuRef, menuStyle } = useDropdownPortal({ open, onClose: close, anchorRef, minWidth: 190, align: 'right' })

  return (
    <div ref={anchorRef} className="relative">
      <button onClick={() => setOpen(o => !o)} title={t('Language')} aria-label={t('Language')}
        className="flex items-center gap-1.5 px-2 h-8 rounded border border-poe-line bg-poe-panel hover:border-poe-gold-dim/60 text-[12px] text-poe-text-bright">
        <Languages size={15} className="text-poe-gold" />
        <span className="hidden md:inline max-w-[90px] truncate">{cur.native}</span>
      </button>
      {open && menuStyle && createPortal(
        <div ref={menuRef} className="dropdown-panel rounded border border-poe-line shadow-panel p-1" style={{ ...menuStyle, backgroundColor: '#000' }}>
          {LANGUAGES.map(l => (
            <button key={l.id} onClick={() => { update({ lang: l.id }); setOpen(false) }}
              className="w-full text-left rounded px-2 py-1.5 flex items-center gap-2 hover:bg-[#1a1a1c]" style={{ backgroundColor: '#000' }}>
              <span className="w-4 text-poe-gold shrink-0">{l.id === lang ? <Check size={13} /> : null}</span>
              <span className="text-[12.5px] text-poe-text-bright flex-1">{l.native}</span>
              <span className="text-[10.5px] text-poe-text/55 uppercase shrink-0">{l.id}</span>
            </button>
          ))}
        </div>,
        document.body,
      )}
    </div>
  )
}

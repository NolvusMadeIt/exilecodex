import React, { useEffect } from 'react'
import { createPortal } from 'react-dom'

// Portaled to <body> so it escapes any ancestor with a transform/backdrop-filter
// (e.g. the nav's backdrop-blur), which would otherwise trap `position: fixed`.
export function Modal({ onClose, title, children, width = 560 }) {
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose?.() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])
  return createPortal(
    <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-start justify-center pt-16 px-4"
      onClick={onClose}>
      <div className="shadow-panel p-5 w-full rounded-md border border-poe-line bg-poe-panel" style={{ maxWidth: width }} onClick={e => e.stopPropagation()}>
        {title && <div className="gold-heading text-[16px] mb-3">{title}</div>}
        {children}
      </div>
    </div>,
    document.body,
  )
}

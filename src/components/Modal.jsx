import React, { useEffect } from 'react'

export function Modal({ onClose, title, children, width = 560 }) {
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose?.() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])
  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-start justify-center pt-16 px-4"
      onClick={onClose}>
      <div className="shadow-panel p-4 w-full rounded border border-poe-line bg-black" style={{ maxWidth: width }} onClick={e => e.stopPropagation()}>
        {title && <div className="gold-heading text-[17px] mb-3">{title}</div>}
        {children}
      </div>
    </div>
  )
}

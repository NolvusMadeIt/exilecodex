import React, { createContext, useContext, useState, useCallback, useEffect, useRef } from 'react'
import { X, CheckCircle2, AlertCircle, Info, AlertTriangle } from 'lucide-react'

// Themed slide-in notifications. Replaces every native alert()/confirm() in the app.
// - Appears at bottom-right, slides in from the right edge.
// - Auto-dismisses after `duration` ms (default 8000). 0 = persistent (used for confirms).
// - Manual close via the X button.
// - Inherits the current theme via the existing CSS-variable system.

const ToastCtx = createContext(null)

const KIND_STYLES = {
  info:    { ring: 'border-l-poe-gold',      icon: Info,         iconColor: 'text-poe-gold' },
  success: { ring: 'border-l-emerald-400',   icon: CheckCircle2, iconColor: 'text-emerald-400' },
  warn:    { ring: 'border-l-amber-400',     icon: AlertTriangle,iconColor: 'text-amber-400' },
  error:   { ring: 'border-l-poe-danger',    icon: AlertCircle,  iconColor: 'text-poe-danger' },
}

let _nextId = 1
const newId = () => `t${_nextId++}`

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])
  const timers = useRef(new Map())

  const dismiss = useCallback((id) => {
    const t = timers.current.get(id)
    if (t) { clearTimeout(t); timers.current.delete(id) }
    setToasts(arr => arr.filter(x => x.id !== id))
  }, [])

  const show = useCallback((message, opts = {}) => {
    const id = newId()
    const duration = opts.duration ?? 8000
    setToasts(arr => [...arr, {
      id,
      message,
      kind: opts.kind || 'info',
      title: opts.title,
      actions: opts.actions, // [{ label, primary?, onClick }]
    }])
    if (duration > 0) timers.current.set(id, setTimeout(() => dismiss(id), duration))
    return id
  }, [dismiss])

  const api = {
    show, dismiss,
    info:    (m, o) => show(m, { ...o, kind: 'info' }),
    success: (m, o) => show(m, { ...o, kind: 'success' }),
    warn:    (m, o) => show(m, { ...o, kind: 'warn' }),
    error:   (m, o) => show(m, { ...o, kind: 'error' }),
    // Promise-based replacement for window.confirm — returns true/false.
    confirm: (message, opts = {}) => new Promise((resolve) => {
      let id
      const close = (v) => { dismiss(id); resolve(v) }
      id = show(message, {
        kind: opts.kind || 'warn',
        title: opts.title || 'Confirm',
        duration: 0, // persists until the user chooses
        actions: [
          { label: opts.cancelLabel || 'Cancel', onClick: () => close(false) },
          { label: opts.confirmLabel || 'Confirm', primary: true, onClick: () => close(true) },
        ],
      })
    }),
  }

  return (
    <ToastCtx.Provider value={api}>
      {children}
      <Viewport toasts={toasts} dismiss={dismiss} />
    </ToastCtx.Provider>
  )
}

function Viewport({ toasts, dismiss }) {
  return (
    <div className="fixed z-[60] right-4 bottom-20 flex flex-col-reverse gap-2 pointer-events-none w-[380px] max-w-[92vw]">
      {toasts.map(t => <Item key={t.id} toast={t} onClose={() => dismiss(t.id)} />)}
    </div>
  )
}

function Item({ toast, onClose }) {
  const [open, setOpen] = useState(false)
  useEffect(() => {
    const r = requestAnimationFrame(() => setOpen(true))
    return () => cancelAnimationFrame(r)
  }, [])

  const { ring, icon: Icon, iconColor } = KIND_STYLES[toast.kind] || KIND_STYLES.info

  return (
    <div
      className={`pointer-events-auto rounded border border-poe-line border-l-2 ${ring} bg-poe-bg shadow-panel transition-all duration-300 ease-out ${open ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}
      role={toast.actions ? 'alertdialog' : 'status'}
    >
      <div className="flex items-start gap-2.5 p-3">
        <Icon size={16} className={`${iconColor} mt-0.5 shrink-0`} />
        <div className="flex-1 min-w-0">
          {toast.title && (
            <div className="text-[12.5px] font-smallcaps tracking-wide text-poe-heading mb-0.5">{toast.title}</div>
          )}
          <div className="text-[12.5px] text-poe-text-bright whitespace-pre-line break-words leading-snug">
            {toast.message}
          </div>
          {toast.actions?.length > 0 && (
            <div className="flex gap-2 mt-2.5 justify-end">
              {toast.actions.map((a, i) => (
                <button
                  key={i}
                  onClick={a.onClick}
                  className={`${a.primary ? 'btn-action' : 'btn-dark'} h-7 px-3 text-[12px]`}
                >
                  {a.label}
                </button>
              ))}
            </div>
          )}
        </div>
        <button onClick={onClose} className="text-poe-text hover:text-poe-heading shrink-0 -mt-0.5" aria-label="Dismiss">
          <X size={14} />
        </button>
      </div>
    </div>
  )
}

export function useToast() {
  const ctx = useContext(ToastCtx)
  if (!ctx) throw new Error('useToast must be used inside ToastProvider')
  return ctx
}

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react'
import { usePrefs } from '../store/Prefs.jsx'

// Minimal hash router (no dependency). Keeps filter state intact across tab switches.
const RouterCtx = createContext(null)

function parseHash(fallback) {
  let h = window.location.hash.replace(/^#/, '')
  // Optional query inside the hash (e.g. #/crafting?panel=essences) — the categorized side
  // menu deep-links a plugin page's panel this way. Path stays query-free for route matching.
  let query = {}
  const q = h.indexOf('?')
  if (q >= 0) {
    try { query = Object.fromEntries(new URLSearchParams(h.slice(q + 1)).entries()) } catch { /* malformed query → ignore */ }
    h = h.slice(0, q)
  }
  if (h.length > 1) h = h.replace(/\/+$/, '') // tolerate a trailing slash, e.g. /presets/ -> /presets
  return { path: h || fallback || '/presets', query }
}

const currentPath = (fallback) => parseHash(fallback).path

// On the web the bare domain (no hash) opens the marketing home; the desktop app opens straight to
// the last tab / the editor. Everything else is reachable at #/<route> either way.
const IS_DESKTOP = typeof window !== 'undefined' && !!window.nolvusDesktop?.isDesktop
const defaultRoute = (prefs) => (IS_DESKTOP ? (prefs.lastRoute || '/presets') : '/home')

export function RouterProvider({ children }) {
  const { prefs, update } = usePrefs()
  // Restore the last tab on a fresh load (QoL), but never override a deep link in the URL.
  const [route, setRoute] = useState(() => parseHash(defaultRoute(prefs)))
  const path = route.path
  const query = route.query

  useEffect(() => {
    const onHash = () => setRoute(parseHash(defaultRoute(prefs)))
    window.addEventListener('hashchange', onHash)
    if (!window.location.hash) window.location.hash = defaultRoute(prefs)
    return () => window.removeEventListener('hashchange', onHash)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Remember the current tab so the next visit opens where you left off. Also depends on
  // prefs.lastRoute so it re-corrects if the Supabase prefs-pull merges a stale value back in.
  useEffect(() => {
    // Never remember the pop-out overlay route as the main app's last tab (it's a separate window).
    if (path && path !== prefs.lastRoute && path !== '/home' && !path.startsWith('/overlay/')) update({ lastRoute: path })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [path, prefs.lastRoute])

  const navigate = useCallback((to) => {
    const target = String(to)
    if (`#${target}` !== window.location.hash) window.location.hash = target
    else setRoute(parseHash())
  }, [])

  return <RouterCtx.Provider value={{ path, query, navigate }}>{children}</RouterCtx.Provider>
}

export function useRouter() {
  const ctx = useContext(RouterCtx)
  if (!ctx) throw new Error('useRouter must be used within RouterProvider')
  return ctx
}

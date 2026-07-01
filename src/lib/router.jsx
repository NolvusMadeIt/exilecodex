import React, { createContext, useContext, useEffect, useState, useCallback } from 'react'
import { usePrefs } from '../store/Prefs.jsx'

// Minimal hash router (no dependency). Keeps filter state intact across tab switches.
const RouterCtx = createContext(null)

function currentPath(fallback) {
  let h = window.location.hash.replace(/^#/, '')
  if (h.length > 1) h = h.replace(/\/+$/, '') // tolerate a trailing slash, e.g. /presets/ -> /presets
  return h || fallback || '/presets'
}

// On the web the bare domain (no hash) opens the marketing home; the desktop app opens straight to
// the last tab / the editor. Everything else is reachable at #/<route> either way.
const IS_DESKTOP = typeof window !== 'undefined' && !!window.nolvusDesktop?.isDesktop
const defaultRoute = (prefs) => (IS_DESKTOP ? (prefs.lastRoute || '/presets') : '/home')

export function RouterProvider({ children }) {
  const { prefs, update } = usePrefs()
  // Restore the last tab on a fresh load (QoL), but never override a deep link in the URL.
  const [path, setPath] = useState(() => currentPath(defaultRoute(prefs)))

  useEffect(() => {
    const onHash = () => setPath(currentPath(defaultRoute(prefs)))
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
    if (to !== currentPath()) window.location.hash = to
    else setPath(to)
  }, [])

  return <RouterCtx.Provider value={{ path, navigate }}>{children}</RouterCtx.Provider>
}

export function useRouter() {
  const ctx = useContext(RouterCtx)
  if (!ctx) throw new Error('useRouter must be used within RouterProvider')
  return ctx
}

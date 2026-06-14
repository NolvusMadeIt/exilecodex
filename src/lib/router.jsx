import React, { createContext, useContext, useEffect, useState, useCallback } from 'react'

// Minimal hash router (no dependency). Keeps filter state intact across tab switches.
const RouterCtx = createContext(null)

function currentPath() {
  const h = window.location.hash.replace(/^#/, '')
  return h || '/presets'
}

export function RouterProvider({ children }) {
  const [path, setPath] = useState(currentPath)

  useEffect(() => {
    const onHash = () => setPath(currentPath())
    window.addEventListener('hashchange', onHash)
    if (!window.location.hash) window.location.hash = '/presets'
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

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

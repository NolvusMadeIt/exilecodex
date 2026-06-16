import { useEffect, useRef } from 'react'
import { usePrefs } from '../store/Prefs.jsx'
import { desktopApi } from '../lib/desktop.js'

// Desktop-only: pushes the saved game-overlay settings to the Electron main process — on
// launch (only if the overlay is on) and whenever they change. Renders nothing; a no-op in
// the web app.
export function OverlayController() {
  const { prefs } = usePrefs()
  const enabled = !!prefs.overlayEnabled
  const side = prefs.overlaySide || 'right'
  const display = prefs.overlayDisplay || 'auto'
  const hotkey = prefs.overlayHotkey || 'Shift+Alt+F'
  const first = useRef(true)

  // Always-on-top + dock to the chosen edge/screen (or restore a normal window when off).
  // Skip the initial apply when the overlay is already off, so launching the app normally
  // doesn't yank the window to centre.
  useEffect(() => {
    if (!desktopApi?.isDesktop) return
    if (first.current) {
      first.current = false
      if (!enabled) return
    }
    desktopApi.overlayApply?.({ enabled, side, display })
  }, [enabled, side, display])

  // Register the global show/hide hotkey while the overlay is enabled.
  useEffect(() => {
    if (!desktopApi?.isDesktop) return
    desktopApi.overlaySetHotkey?.(enabled ? hotkey : null)
    return () => { if (desktopApi?.isDesktop) desktopApi.overlaySetHotkey?.(null) }
  }, [enabled, hotkey])

  return null
}

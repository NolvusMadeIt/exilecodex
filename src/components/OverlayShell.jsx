import React, { Suspense } from 'react'
import { X, Eye } from 'lucide-react'
import { findPlugin } from '../plugins/registry.js'
import { usePluginHost } from '../store/Plugins.jsx'
import { usePrefs } from '../store/Prefs.jsx'

// The chrome-less shell rendered in the pop-out overlay window (#/overlay/<pluginId>). It shows ONE
// plugin's view in compact mode — no SideNav, no TitleBar, no output dock — inside a small frameless
// always-on-top window you keep over the game. A thin draggable bar lets you move it; the × closes
// it (back to the in-app page). All the app's providers still wrap this (Prefs, GameLog, …), so the
// plugin behaves exactly as in-app, including the live zone auto-tracking and the hover-map popups.
function OverlayBody({ pluginId }) {
  const plugin = findPlugin(pluginId)
  const route = plugin?.contributes?.route
  const host = usePluginHost(route?.host ? pluginId : null)
  if (!plugin || !route?.component) {
    return <div className="px-3 py-4 text-[12px] text-poe-text/50">This plugin can’t be shown as an overlay.</div>
  }
  const C = route.component
  return route.host ? <C host={host} compact /> : <C compact />
}

export function OverlayShell({ pluginId }) {
  const plugin = findPlugin(pluginId)
  const { prefs, update } = usePrefs()
  // Transparency: the window itself is transparent, so the slider controls how opaque this dark scrim
  // is. Lower it and the game shows through EVERYTHING (panel included, since the panel has no
  // background of its own in overlay mode); the text and borders stay fully crisp.
  const opacity = Math.max(0.2, Math.min(1, prefs.overlayOpacity ?? 1))

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden" style={{ background: `rgba(9, 10, 12, ${opacity})` }}>
      {/* Draggable title bar (frameless window move region) + transparency + close. */}
      <div className="flex items-center justify-between gap-2 px-2.5 h-8 shrink-0 border-b border-poe-line select-none"
        style={{ WebkitAppRegion: 'drag', background: `rgba(16, 17, 20, ${Math.min(1, opacity + 0.1)})` }}>
        <span className="text-[11px] uppercase tracking-[0.08em] text-poe-text/60 truncate">{plugin?.name || 'Overlay'}</span>
        <div className="flex items-center gap-2 shrink-0" style={{ WebkitAppRegion: 'no-drag' }}>
          <Eye size={12} className="text-poe-text/40" />
          <input type="range" min={20} max={100} value={Math.round(opacity * 100)} title="Transparency"
            onChange={(e) => update({ overlayOpacity: Number(e.target.value) / 100 })}
            className="w-[64px] accent-[rgb(var(--c-accent))]" style={{ height: 14 }} />
          <button onClick={() => window.nolvusOverlay?.close?.()} title="Close overlay" className="text-poe-text/50 hover:text-poe-gold p-1 -mr-1">
            <X size={14} />
          </button>
        </div>
      </div>
      {/* Scrollable plugin body. */}
      <div className="flex-1 overflow-auto px-3 py-2">
        <Suspense fallback={<div className="text-[12px] text-poe-text/50 py-4">Loading…</div>}>
          <OverlayBody pluginId={pluginId} />
        </Suspense>
      </div>
    </div>
  )
}

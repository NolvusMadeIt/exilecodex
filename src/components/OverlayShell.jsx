import React, { Suspense, useMemo, useState } from 'react'
import { Eye } from 'lucide-react'
import { findPlugin } from '../plugins/registry.js'
import { usePlugins, usePluginHost } from '../store/Plugins.jsx'
import { usePrefs } from '../store/Prefs.jsx'
import { PoeFrame } from './PoeFrame.jsx'
import { overlayTabs } from './overlayTabs.js'

// The tabbed in-game overlay shell (#/overlay/<pluginId>) — the EC-style compact window from the
// overlay transformation. One frameless always-on-top window, PoeFrame chrome, and a tab strip
// across every ACTIVE plugin (not just the one deep-linked): switch modules without leaving the
// game. The deep-linked plugin opens focused; the last tab you were on is remembered. All the
// app's providers wrap this (Prefs, GameLog, …), so plugins behave exactly as in-app.
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
  const { enabledPlugins } = usePlugins()
  const { prefs, update } = usePrefs()
  const tabs = useMemo(() => overlayTabs(enabledPlugins), [enabledPlugins])
  // Deep link wins on open; after that, clicks rule and are remembered across sessions.
  const [active, setActive] = useState(() => pluginId || prefs.overlayLastTab || tabs[0]?.id)
  const activeId = tabs.some((t) => t.id === active) ? active : (pluginId || tabs[0]?.id)
  const select = (id) => { setActive(id); update({ overlayLastTab: id }) }

  const opacity = Math.max(0.2, Math.min(1, prefs.overlayOpacity ?? 1))
  const title = findPlugin(activeId)?.name || 'Overlay'

  return (
    <div className="h-screen w-screen overflow-hidden p-[3px]" style={{ background: `rgba(9, 10, 12, ${opacity * 0.6})` }}>
      <PoeFrame
        title={title}
        dragHeader
        onClose={() => window.nolvusOverlay?.close?.()}
        actions={
          <span className="inline-flex items-center gap-2">
            <Eye size={12} className="text-poe-text/40" />
            <input
              type="range" min={20} max={100} value={Math.round(opacity * 100)} title="Transparency"
              onChange={(e) => update({ overlayOpacity: Number(e.target.value) / 100 })}
              className="w-[64px] accent-[rgb(var(--c-accent))]" style={{ height: 14 }}
            />
          </span>
        }
        className="flex h-full flex-col"
        bodyClassName="flex min-h-0 flex-1 flex-col"
      >
        {tabs.length > 1 && (
          <nav className="flex shrink-0 gap-1 overflow-x-auto border-b border-poe-line/70 px-1.5 pt-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => select(tab.id)}
                className={`shrink-0 rounded-t-[3px] px-2.5 py-1 text-[11px] uppercase tracking-[0.08em] transition-colors ${
                  tab.id === activeId
                    ? 'bg-white/[0.06] text-poe-gold'
                    : 'text-poe-text/60 hover:text-poe-text-bright'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        )}
        {/* Scrollable plugin body — style backdrop stays translucent so the game shows through. */}
        <div className="min-h-0 flex-1 overflow-auto px-3 py-2" style={{ background: `rgba(9, 10, 12, ${Math.max(0, opacity - 0.25)})` }}>
          <Suspense fallback={<div className="py-4 text-[12px] text-poe-text/50">Loading…</div>}>
            <OverlayBody pluginId={activeId} />
          </Suspense>
        </div>
      </PoeFrame>
    </div>
  )
}

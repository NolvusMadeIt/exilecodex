import React, { useEffect, useState } from 'react'
import { ChevronRight, ChevronLeft, Code2 } from 'lucide-react'
import { TitleBar } from './TitleBar.jsx'
import { OrnateFrame } from './OrnateFrame.jsx'
import { TopBar } from './TopBar.jsx'
import { SideNav } from './SideNav.jsx'
import { FilterOutput } from './FilterOutput.jsx'
import { OverlayController } from './OverlayController.jsx'
import { DesktopPromoBanner } from './DesktopPromoBanner.jsx'
import { UpdateBanner } from './UpdateBanner.jsx'
import { usePrefs } from '../store/Prefs.jsx'
import { useRouter } from '../lib/router.jsx'
import { desktopApi } from '../lib/desktop.js'

// Tracks the xl breakpoint so the output renders in exactly ONE place (dock on wide screens,
// stacked under the content otherwise) — never both at once.
function useIsXl() {
  const [xl, setXl] = useState(() => typeof window !== 'undefined' && window.matchMedia('(min-width: 1280px)').matches)
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1280px)')
    const on = () => setXl(mq.matches)
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [])
  return xl
}

// Filter Studio shell: fixed-viewport workstation — top action bar, left nav rail, scrolling
// main work area, and an on-demand live output (hidden by default; mounted only when shown so it
// never costs anything while you work).
// The live filter output only belongs on the pages where you build/preview the filter — not on
// Patch Notes, Community, Guide, Settings or Changelog.
const OUTPUT_ROUTES = new Set(['/', '/presets', '/quick-editor', '/quick-filters', '/tier-lists', '/custom-rules', '/cosmetic', '/preview'])
const WIDE_ROUTES = new Set(['/market', '/price-check', '/campaign-guide', '/history', '/items', '/modifiers', '/crafting', '/character', '/regex'])

export function Layout({ children }) {
  const { prefs, update } = usePrefs()
  const { path, navigate } = useRouter()
  const dockOpen = !!prefs.dockOpen
  const setDockOpen = (v) => update({ dockOpen: v })
  const isXl = useIsXl()
  const outputHere = OUTPUT_ROUTES.has(path)
  // Dense/split layouts want the full width of the work area rather than the centered reading
  // column — the market surfaces and every database/reference page (house rule: dense pages
  // full-width, content at proper size, never crammed).
  const wide = WIDE_ROUTES.has(path)

  // Tray menu → renderer navigation (e.g. "Settings"). Desktop only; no-op on the web.
  useEffect(() => {
    if (!desktopApi?.onNavigate) return
    return desktopApi.onNavigate((route) => navigate(route))
  }, [navigate])

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <TitleBar />
      <TopBar />
      <div className="flex flex-1 min-h-0">
        <SideNav />

        <main className="flex-1 min-w-0 overflow-y-auto" style={{ scrollbarGutter: 'stable both-edges' }}>
          <div className={wide ? 'px-4 py-4' : 'px-5 py-5 mx-auto'} style={{ maxWidth: wide ? 'none' : 1180 }}>
            {children}
            {/* On narrow screens the output stacks here — only when opened, and only this copy. */}
            {outputHere && dockOpen && !isXl && (
              <div className="mt-8 h-[72vh] flex flex-col">
                <FilterOutput onClose={() => setDockOpen(false)} />
              </div>
            )}
            {outputHere && !dockOpen && !isXl && (
              <div className="mt-8 flex justify-center">
                <button onClick={() => setDockOpen(true)} className="btn-dark h-8 text-[12px]">
                  <Code2 size={14} /> Show filter output
                </button>
              </div>
            )}
          </div>
        </main>

        {/* On wide screens the output is a right-hand dock — mounted only when opened. */}
        {outputHere && isXl && (dockOpen ? (
          <aside className="relative flex w-[600px] shrink-0 border-l border-poe-line bg-black/20 flex-col min-h-0">
            <button onClick={() => setDockOpen(false)} title="Hide output panel" aria-label="Hide output panel"
              className="absolute left-0 top-3 -translate-x-1/2 z-10 w-6 h-6 grid place-items-center rounded border border-poe-line bg-poe-panel text-poe-text hover:text-poe-gold hover:border-poe-gold-dim/60">
              <ChevronRight size={14} />
            </button>
            <div className="flex-1 min-h-0 flex flex-col p-3 pl-4">
              <FilterOutput onClose={() => setDockOpen(false)} />
            </div>
          </aside>
        ) : (
          <button onClick={() => setDockOpen(true)} title="Show output panel"
            className="flex w-9 shrink-0 border-l border-poe-line bg-black/20 flex-col items-center pt-3 gap-2 text-poe-text hover:text-poe-gold">
            <ChevronLeft size={14} />
            <span className="text-[11px] tracking-wide font-display [writing-mode:vertical-rl] rotate-180">Filter Output</span>
          </button>
        ))}
      </div>
      <DesktopPromoBanner />
      <UpdateBanner />
      <OverlayController />
      <OrnateFrame />
    </div>
  )
}

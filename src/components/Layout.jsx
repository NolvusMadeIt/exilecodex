import React from 'react'
import { ChevronRight, ChevronLeft } from 'lucide-react'
import { TitleBar } from './TitleBar.jsx'
import { TopBar } from './TopBar.jsx'
import { SideNav } from './SideNav.jsx'
import { FilterOutput } from './FilterOutput.jsx'
import { usePrefs } from '../store/Prefs.jsx'

// Filter Studio shell: fixed-viewport workstation — top action bar, left nav rail, scrolling
// main work area, and a docked live output on the right (collapsible). Below xl the dock
// hides and the output stacks under the main content so it's never lost.
export function Layout({ children }) {
  const { prefs, update } = usePrefs()
  const dockOpen = prefs.dockOpen !== false // remembered across visits
  const setDockOpen = (v) => update({ dockOpen: v })
  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <TitleBar />
      <TopBar />
      <div className="flex flex-1 min-h-0">
        <SideNav />

        <main className="flex-1 min-w-0 overflow-y-auto">
          <div className="px-5 py-5 mx-auto" style={{ maxWidth: 1180 }}>
            {children}
            {/* Output stacks here on narrower screens (no room for the dock) */}
            <div className="xl:hidden mt-8 h-[72vh] flex flex-col">
              <FilterOutput />
            </div>
          </div>
        </main>

        {dockOpen ? (
          <aside className="relative hidden xl:flex w-[600px] shrink-0 border-l border-poe-line bg-black/20 flex-col min-h-0">
            <button onClick={() => setDockOpen(false)} title="Collapse output panel" aria-label="Collapse output panel"
              className="absolute left-0 top-3 -translate-x-1/2 z-10 w-6 h-6 grid place-items-center rounded border border-poe-line bg-poe-panel text-poe-text hover:text-poe-gold hover:border-poe-gold-dim/60">
              <ChevronRight size={14} />
            </button>
            <div className="flex-1 min-h-0 flex flex-col p-3 pl-4">
              <FilterOutput />
            </div>
          </aside>
        ) : (
          <button onClick={() => setDockOpen(true)} title="Show output panel"
            className="hidden xl:flex w-9 shrink-0 border-l border-poe-line bg-black/20 flex-col items-center pt-3 gap-2 text-poe-text hover:text-poe-gold">
            <ChevronLeft size={14} />
            <span className="text-[11px] tracking-wide font-display [writing-mode:vertical-rl] rotate-180">Filter Output</span>
          </button>
        )}
      </div>
    </div>
  )
}

import React from 'react'
import { Header } from './Header.jsx'
import { TabNav } from './TabNav.jsx'
import { ActionBar } from './ActionBar.jsx'
import { FilterOutput } from './FilterOutput.jsx'

export function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <TabNav />
      <main className="flex-1">
        <div className="py-4">
          <div className="app-shell">
            <div className="grid grid-cols-1 gap-x-6 gap-y-8 xl:grid-cols-[minmax(0,1fr)_600px]">
              <div className="py-4">
                {children}
              </div>
              <div className="xl:sticky xl:top-4 xl:h-[calc(100dvh-140px)] xl:flex xl:flex-col">
                <FilterOutput />
              </div>
            </div>
          </div>
        </div>
      </main>
      <ActionBar />
    </div>
  )
}

import React, { lazy, Suspense } from 'react'
import { Analytics } from '@vercel/analytics/react'
import { FilterProvider } from './store/FilterStore.jsx'
import { PrefsProvider } from './store/Prefs.jsx'
import { GameInfoProvider } from './store/GameInfo.jsx'
import { ToastProvider } from './store/Toast.jsx'
import { RouterProvider, useRouter } from './lib/router.jsx'
import { Layout } from './components/Layout.jsx'
import { ErrorBoundary } from './components/ui.jsx'
import { PresetsPage } from './pages/PresetsPage.jsx'

// Lazy-loaded pages — keeps the initial bundle small (Presets ships immediately,
// the rest stream in on first navigation).
const QuickFiltersPage = lazy(() => import('./pages/QuickFiltersPage.jsx').then(m => ({ default: m.QuickFiltersPage })))
const TierListsPage    = lazy(() => import('./pages/TierListsPage.jsx').then(m => ({ default: m.TierListsPage })))
const CustomRulesPage  = lazy(() => import('./pages/CustomRulesPage.jsx').then(m => ({ default: m.CustomRulesPage })))
const CosmeticPage     = lazy(() => import('./pages/CosmeticPage.jsx').then(m => ({ default: m.CosmeticPage })))
const PreviewPage      = lazy(() => import('./pages/PreviewPage.jsx').then(m => ({ default: m.PreviewPage })))
const SettingsPage     = lazy(() => import('./pages/SettingsPage.jsx').then(m => ({ default: m.SettingsPage })))
const ChangelogPage    = lazy(() => import('./pages/ChangelogPage.jsx').then(m => ({ default: m.ChangelogPage })))
const GuidePage        = lazy(() => import('./pages/GuidePage.jsx').then(m => ({ default: m.GuidePage })))

const Loading = () => (
  <div className="text-center py-12 text-poe-text text-[12px]">Loading…</div>
)

function Routes() {
  const { path } = useRouter()
  switch (path) {
    case '/':
    case '/presets':       return <PresetsPage />
    case '/quick-filters': return <QuickFiltersPage />
    case '/tier-lists':    return <TierListsPage />
    case '/custom-rules':  return <CustomRulesPage />
    case '/cosmetic':      return <CosmeticPage />
    case '/preview':       return <PreviewPage />
    case '/guide':         return <GuidePage />
    case '/settings':      return <SettingsPage />
    case '/changelog':     return <ChangelogPage />
    default:               return <PresetsPage />
  }
}

export default function App() {
  return (
    <ErrorBoundary>
      <GameInfoProvider>
        <PrefsProvider>
          <FilterProvider>
            <ToastProvider>
              <RouterProvider>
                <Layout>
                  <Suspense fallback={<Loading />}>
                    <Routes />
                  </Suspense>
                </Layout>
              </RouterProvider>
            </ToastProvider>
          </FilterProvider>
        </PrefsProvider>
      </GameInfoProvider>
      <Analytics />
    </ErrorBoundary>
  )
}

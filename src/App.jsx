import React, { lazy, Suspense } from 'react'
import { Analytics } from '@vercel/analytics/react'
import { FilterProvider } from './store/FilterStore.jsx'
import { PrefsProvider } from './store/Prefs.jsx'
import { GameInfoProvider } from './store/GameInfo.jsx'
import { ToastProvider } from './store/Toast.jsx'
import { PluginProvider, usePlugins, usePluginHost } from './store/Plugins.jsx'
import { MarketProvider } from './store/Market.jsx'
import { RouterProvider, useRouter } from './lib/router.jsx'
import { Layout } from './components/Layout.jsx'
import { OverlayShell } from './components/OverlayShell.jsx'
import { ErrorBoundary } from './components/ui.jsx'
import { PresetsPage } from './pages/PresetsPage.jsx'

// Lazy-loaded pages — keeps the initial bundle small (Presets ships immediately,
// the rest stream in on first navigation).
const QuickEditorPage  = lazy(() => import('./pages/QuickEditorPage.jsx').then(m => ({ default: m.QuickEditorPage })))
const TierListsPage    = lazy(() => import('./pages/TierListsPage.jsx').then(m => ({ default: m.TierListsPage })))
const CustomRulesPage  = lazy(() => import('./pages/CustomRulesPage.jsx').then(m => ({ default: m.CustomRulesPage })))
const CosmeticPage     = lazy(() => import('./pages/CosmeticPage.jsx').then(m => ({ default: m.CosmeticPage })))
const PreviewPage      = lazy(() => import('./pages/PreviewPage.jsx').then(m => ({ default: m.PreviewPage })))
const SettingsPage     = lazy(() => import('./pages/SettingsPage.jsx').then(m => ({ default: m.SettingsPage })))
const ChangelogPage    = lazy(() => import('./pages/ChangelogPage.jsx').then(m => ({ default: m.ChangelogPage })))
const PatchNotesPage   = lazy(() => import('./pages/PatchNotesPage.jsx').then(m => ({ default: m.PatchNotesPage })))
const GuidePage        = lazy(() => import('./pages/GuidePage.jsx').then(m => ({ default: m.GuidePage })))
const SharedFiltersPage = lazy(() => import('./pages/SharedFiltersPage.jsx').then(m => ({ default: m.SharedFiltersPage })))
const NotFoundPage     = lazy(() => import('./pages/NotFoundPage.jsx').then(m => ({ default: m.NotFoundPage })))

const Loading = () => (
  <div className="text-center py-12 text-poe-text text-[12px]">Loading…</div>
)

// Renders a host-aware plugin page with its assembled `host` prop.
function HostBoundary({ pluginId, Comp }) {
  const host = usePluginHost(pluginId)
  return <Comp host={host} />
}

function Routes() {
  const { path } = useRouter()
  const { enabledPlugins } = usePlugins()

  // Plugin-contributed routes win for their own paths — but only while the plugin is enabled.
  // (Disabled plugins contribute nothing, so their path falls through to NotFound below.)
  const plugin = enabledPlugins.find(p => p.contributes?.route?.path === path)
  if (plugin) {
    const route = plugin.contributes.route
    const C = route.component
    return route.host ? <HostBoundary pluginId={plugin.id} Comp={C} /> : <C />
  }

  switch (path) {
    case '/':
    case '/presets':       return <PresetsPage />
    case '/quick-editor':  return <QuickEditorPage />
    // alias: old deep links / saved lastRoute
    case '/quick-filters': return <QuickEditorPage />
    case '/tier-lists':    return <TierListsPage />
    case '/custom-rules':  return <CustomRulesPage />
    case '/cosmetic':      return <CosmeticPage />
    case '/preview':       return <PreviewPage />
    case '/guide':         return <GuidePage />
    case '/community':     return <SharedFiltersPage />
    case '/settings':      return <SettingsPage />
    case '/patch-notes':   return <PatchNotesPage />
    case '/changelog':     return <ChangelogPage />
    default:               return <NotFoundPage />
  }
}

// Chooses the shell based on the route: the pop-out overlay window loads #/overlay/<pluginId> and
// renders only that plugin (no app chrome); everything else gets the normal Layout.
function AppShell() {
  const { path } = useRouter()
  if (path.startsWith('/overlay/')) {
    return <OverlayShell pluginId={path.slice('/overlay/'.length)} />
  }
  return (
    <Layout>
      <Suspense fallback={<Loading />}>
        <Routes />
      </Suspense>
    </Layout>
  )
}

export default function App() {
  return (
    <ErrorBoundary>
      <GameInfoProvider>
        <PrefsProvider>
          <FilterProvider>
            <ToastProvider>
              <MarketProvider>
                <PluginProvider>
                  <RouterProvider>
                    <AppShell />
                  </RouterProvider>
                </PluginProvider>
              </MarketProvider>
            </ToastProvider>
          </FilterProvider>
        </PrefsProvider>
      </GameInfoProvider>
      <Analytics />
    </ErrorBoundary>
  )
}

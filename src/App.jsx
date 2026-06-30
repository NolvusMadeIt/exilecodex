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

// The browser build is a free preview: optional (non-core) plugins are desktop-app only. You can
// still see them in Settings ▸ Plugins (description + screenshots), but using them — and downloading
// the plugin packages — needs the Windows app.
const IS_DESKTOP = typeof window !== 'undefined' && !!window.nolvusDesktop?.isDesktop

function DesktopOnly({ plugin }) {
  const Icon = plugin.icon
  return (
    <div className="py-8 max-w-[600px]">
      <div className="panel p-6" style={{ borderRadius: 2 }}>
        <div className="flex items-center gap-2 gold-heading text-[16px]">{Icon ? <Icon size={18} /> : null} {plugin.name}</div>
        <p className="text-[13px] text-poe-text mt-2 leading-relaxed">
          This plugin runs in the <b>desktop app</b>. The browser version is a free preview — install the
          Windows app to use {plugin.name}, plus the in-game overlay, live game-log tracking and plugin downloads.
        </p>
        <p className="text-[12px] text-poe-text/70 mt-2">{plugin.description}</p>
        <div className="mt-4">
          <a href="https://github.com/NolvusMadeIt/nolvusfiltereditor/releases/latest" target="_blank" rel="noreferrer"
            className="btn-dark h-8 text-[12px] inline-flex items-center px-3">Get the desktop app</a>
        </div>
      </div>
    </div>
  )
}

function Routes() {
  const { path } = useRouter()
  const { enabledPlugins, plugins } = usePlugins()

  // Plugin-contributed routes win for their own paths — but only while the plugin is enabled.
  const plugin = enabledPlugins.find(p => p.contributes?.route?.path === path)
  if (plugin) {
    if (plugin.desktopOnly && !IS_DESKTOP) return <DesktopOnly plugin={plugin} />
    const route = plugin.contributes.route
    const C = route.component
    return route.host ? <HostBoundary pluginId={plugin.id} Comp={C} /> : <C />
  }
  // A desktop-only plugin reached on the web (it's off / not activated here) → show its preview gate
  // rather than a 404, so the page still sells the desktop app.
  const knownPlugin = plugins.find(p => p.contributes?.route?.path === path)
  if (knownPlugin?.desktopOnly && !IS_DESKTOP) return <DesktopOnly plugin={knownPlugin} />

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
// poe2champions.xyz/ → the marketing home (the landing, served statically from /home/), framed
// full-page. Everything else lives at #/<route>; "Open Web App" on the home navigates here in place.
function HomePage() {
  // Explicit /index.html so dev (Vite SPA fallback), Vercel and the desktop bundle all serve the
  // static landing file rather than falling back to the app's own index.html.
  return <iframe src="/home/index.html" title="PoE2 Champions" style={{ position: 'fixed', inset: 0, width: '100vw', height: '100vh', border: 0, background: '#0a0807' }} />
}

function AppShell() {
  const { path } = useRouter()
  if (path === '/home') return <HomePage />
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

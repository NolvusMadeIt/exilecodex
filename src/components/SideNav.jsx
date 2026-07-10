import React, { useEffect, useMemo, useState } from 'react'
import { Button } from '@mui/material'
import {
  Home, Star, SlidersHorizontal, ListOrdered, Pencil, Shirt, Eye, Settings, BookMarked,
  GraduationCap, Users, ScrollText, ChevronDown, ChevronRight, FolderCog, LineChart, Wrench,
} from 'lucide-react'
import { useRouter } from '../lib/router.jsx'
import { usePlugins } from '../store/Plugins.jsx'
import { useT } from '../i18n/index.js'

// The categorized side menu — the overlay transformation's navigation structure: groups with
// one entry per panel (the structure the owner wants, on the left, at this app's sizing).
// Groups come from three sources:
//   1. Filter Studio — the core filter routes plus the Editor page the filter-editor plugin
//      contributes (it slots by its nav order).
//   2. Any enabled plugin that declares contributes.nav.items — one group per plugin, one
//      menu entry per panel, deep-linked as <route>?panel=<id>.
//   3. FOLD_INTO — single-route plugins folded into named groups (Market, Tools). Plugins
//      not named anywhere render as standalone entries, so nothing ever silently vanishes.
const FILTER_STUDIO = [
  { to: '/presets', label: 'Presets', icon: Star, order: 10 },
  { to: '/quick-editor', label: 'Quick Editor', icon: SlidersHorizontal, order: 20 },
  { to: '/tier-lists', label: 'Tier Lists', icon: ListOrdered, order: 30 },
  { to: '/custom-rules', label: 'Custom Rules', icon: Pencil, order: 40 },
  { to: '/cosmetic', label: 'Cosmetic', icon: Shirt, order: 50 },
  { to: '/preview', label: 'Preview', icon: Eye, order: 70 },
]
const FOLD_INTO = {
  'market-companion': 'Market',
  'xile-history': 'Market',
  'price-check': 'Market',
  'xile-tools': 'Tools',
  'campaign-guide': 'Tools',
}
const FOLDED_META = {
  Market: { icon: LineChart, order: 80 },
  Tools: { icon: Wrench, order: 50 },
}
const SECONDARY = [
  { to: '/community', label: 'Community', icon: Users },
  { to: '/patch-notes', label: 'Patch Notes', icon: ScrollText },
  { to: '/guide', label: 'How to Use', icon: GraduationCap },
  { to: '/settings', label: 'Settings', icon: Settings },
  { to: '/changelog', label: 'Changelog', icon: BookMarked },
]

function buildGroups(enabledPlugins) {
  const groups = []

  const studioItems = [...FILTER_STUDIO]
  const editor = enabledPlugins.find((p) => p.id === 'filter-editor')
  if (editor?.contributes?.route?.path) {
    studioItems.push({
      to: editor.contributes.route.path,
      label: editor.contributes.nav?.label || 'Editor',
      icon: editor.icon,
      order: editor.contributes.nav?.order ?? 60,
    })
  }
  groups.push({ id: 'studio', label: 'Filter Studio', icon: FolderCog, order: 10, items: studioItems.sort((a, b) => a.order - b.order) })

  const folded = {}
  for (const p of enabledPlugins) {
    if (p.id === 'filter-editor') continue
    const nav = p.contributes?.nav
    const route = p.contributes?.route
    if (!nav?.label || !route?.path) continue
    if (Array.isArray(nav.items) && nav.items.length) {
      groups.push({
        id: p.id, label: nav.label, icon: p.icon, order: nav.order ?? 100,
        items: nav.items.map((it) => ({ to: `${route.path}?panel=${it.id}`, label: it.label, panel: it.id, base: route.path })),
      })
    } else {
      const cat = FOLD_INTO[p.id]
      const entry = { to: route.path, label: nav.label, icon: p.icon, order: nav.order ?? 100 }
      if (cat) (folded[cat] ||= []).push(entry)
      else groups.push({ id: p.id, label: nav.label, icon: p.icon, order: nav.order ?? 100, to: route.path })
    }
  }
  for (const [cat, items] of Object.entries(folded)) {
    const meta = FOLDED_META[cat] || { icon: Wrench, order: 95 }
    groups.push({ id: cat, label: cat, icon: meta.icon, order: meta.order, items: items.sort((a, b) => a.order - b.order) })
  }

  return groups.sort((a, b) => a.order - b.order)
}

export function SideNav({ mobileOpen = false, onClose }) {
  const { path, query, navigate } = useRouter()
  const { enabledPlugins } = usePlugins()
  const t = useT()

  const groups = useMemo(() => buildGroups(enabledPlugins), [enabledPlugins])

  // Drawer mode (below md): any navigation closes it.
  useEffect(() => { onClose?.() }, [path, query?.panel]) // eslint-disable-line react-hooks/exhaustive-deps

  const itemActive = (item) => {
    const base = item.base || item.to
    const pathMatch = path === base || (base === '/presets' && path === '/')
    if (!pathMatch) return false
    if (!item.panel) return true
    // Panel entries: exact panel match, or the group's first panel when none is in the URL.
    return (query?.panel || null) === item.panel || (!query?.panel && item.first)
  }
  const groupActive = (g) => (g.items ? g.items.some(itemActive) : path === g.to)

  // The group holding the active route starts open; the user's clicks rule after that.
  const [open, setOpen] = useState(() => new Set(groups.filter(groupActive).map((g) => g.id)))
  const toggle = (id) => setOpen((s) => { const n = new Set(s); n.has(id) ? n.delete(id) : n.add(id); return n })

  // Mark first panels so "no ?panel in URL" highlights the default entry.
  const marked = useMemo(() => groups.map((g) => ({
    ...g,
    items: g.items?.map((it, i) => ({ ...it, first: i === 0 })),
  })), [groups])

  const rowSx = (active, indent = false) => ({
    justifyContent: 'flex-start', px: indent ? 3.25 : 1.5, py: 0.75, fontSize: 13, minHeight: 34,
    width: '100%', textAlign: 'left', gap: 1,
    color: active ? 'rgb(var(--c-accent))' : 'rgb(var(--c-text))',
    backgroundColor: active ? 'rgb(var(--c-accent) / 0.10)' : 'transparent',
    boxShadow: active ? 'inset 2px 0 0 rgb(var(--c-accent))' : 'none',
    borderRadius: '6px',
    '&:hover': { backgroundColor: 'rgb(var(--c-text) / 0.05)', backgroundImage: 'none', color: 'rgb(var(--c-heading))' },
    // Nav rows are navigation, not action buttons — strip the game button chrome the global
    // MuiButton override applies (border-image + smallcaps face).
    background: active ? 'rgb(var(--c-accent) / 0.10)' : 'transparent',
    backgroundImage: 'none',
    border: 'none',
    borderImage: 'none',
    textShadow: 'none',
    fontFamily: 'var(--app-font)',
    fontWeight: 500,
    letterSpacing: 0,
    '&:hover': { backgroundColor: 'rgb(var(--c-text) / 0.05)', backgroundImage: 'none', borderImage: 'none', color: 'rgb(var(--c-heading))' },
  })

  return (
    <>
    {/* Drawer backdrop — only when the drawer is open below md */}
    {mobileOpen && <div className="fixed inset-0 z-30 bg-black/60 md:hidden" onClick={onClose} />}
    <nav className={`${mobileOpen
      ? 'flex fixed inset-y-0 left-0 z-40 bg-[#12100c] shadow-2xl'
      : 'hidden'} md:flex md:static md:z-auto md:bg-black/20 w-[220px] shrink-0 border-r border-poe-line flex-col py-2 overflow-y-auto`}>
      <div className="flex flex-col gap-0.5 px-2">
        {/* Home — always first, always one click away */}
        <Button onClick={() => navigate('/presets')} startIcon={<Home size={16} />}
          sx={rowSx(path === '/' || path === '/presets')} disableRipple>
          {t('Home')}
        </Button>
        <div className="h-px bg-poe-line/50 mx-1 my-1" />
        {marked.map((g) => {
          const GIcon = g.icon
          const isOpen = open.has(g.id)
          const active = groupActive(g)
          if (!g.items) {
            return (
              <Button key={g.id} onClick={() => navigate(g.to)} startIcon={GIcon ? <GIcon size={16} /> : null} sx={rowSx(active)} disableRipple>
                {t(g.label)}
              </Button>
            )
          }
          return (
            <div key={g.id}>
              <Button
                onClick={() => toggle(g.id)}
                startIcon={GIcon ? <GIcon size={16} /> : null}
                endIcon={isOpen ? <ChevronDown size={13} /> : <ChevronRight size={13} />}
                sx={{ ...rowSx(active && !isOpen), justifyContent: 'space-between', '& .MuiButton-endIcon': { marginLeft: 'auto', opacity: 0.55 } }}
                disableRipple
              >
                <span className="flex-1 text-left">{t(g.label)}</span>
              </Button>
              {isOpen && (
                <div className="flex flex-col gap-0.5 pb-0.5">
                  {g.items.map((item) => {
                    const IIcon = item.icon
                    return (
                      <Button key={item.to} onClick={() => navigate(item.to)} startIcon={IIcon ? <IIcon size={15} /> : null}
                        sx={rowSx(itemActive(item), true)} disableRipple>
                        {t(item.label)}
                      </Button>
                    )
                  })}
                </div>
              )}
            </div>
          )
        })}
      </div>

      <div className="h-px bg-poe-line/70 mx-3 my-2.5" />

      <div className="flex flex-col gap-0.5 px-2">
        {SECONDARY.map((item) => {
          const Icon = item.icon
          const active = path === item.to
          return (
            <Button key={item.to} onClick={() => navigate(item.to)} startIcon={<Icon size={15} />} sx={rowSx(active)} disableRipple>
              {t(item.label)}
            </Button>
          )
        })}

        {/* Discord — opens the community invite (system browser in the desktop app) */}
        <a href="https://discord.gg/4gueh3Kb3A" target="_blank" rel="noreferrer"
          className="group mt-1.5 flex items-center gap-2 px-2.5 h-9 rounded-md text-[13px] font-medium
            border border-[#5865F2]/40 text-poe-text bg-[#5865F2]/10
            hover:bg-[#5865F2]/20 hover:text-white hover:border-[#5865F2]/70 transition-colors">
          <DiscordIcon className="text-[#7782f6] group-hover:text-white transition-colors" />
          <span>{t('Join our Discord')}</span>
        </a>
      </div>
    </nav>
    </>
  )
}

function DiscordIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" className={className} aria-hidden="true">
      <path d="M20.317 4.369A19.79 19.79 0 0 0 16.558 3c-.2.36-.43.84-.593 1.226a18.27 18.27 0 0 0-3.93 0A12.6 12.6 0 0 0 11.44 3a19.74 19.74 0 0 0-3.76 1.37C2.96 9.05 2.2 13.61 2.55 18.1a19.9 19.9 0 0 0 6.06 3.08c.49-.67.93-1.38 1.3-2.13-.71-.27-1.39-.6-2.03-.99.17-.13.34-.26.5-.4 3.92 1.83 8.16 1.83 12.03 0 .17.14.33.27.5.4-.65.39-1.33.72-2.04.99.38.75.81 1.46 1.3 2.13a19.86 19.86 0 0 0 6.07-3.08c.42-5.2-.78-9.72-3.22-13.73ZM9.68 15.33c-1.18 0-2.15-1.09-2.15-2.42 0-1.34.95-2.42 2.15-2.42 1.2 0 2.17 1.09 2.15 2.42 0 1.33-.95 2.42-2.15 2.42Zm4.64 0c-1.18 0-2.15-1.09-2.15-2.42 0-1.34.95-2.42 2.15-2.42 1.2 0 2.17 1.09 2.15 2.42 0 1.33-.94 2.42-2.15 2.42Z"/>
    </svg>
  )
}

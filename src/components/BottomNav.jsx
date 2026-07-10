import React, { useEffect, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { Home, Settings, MoreHorizontal, ChevronUp } from 'lucide-react'
import { useRouter } from '../lib/router.jsx'
import { usePlugins } from '../store/Plugins.jsx'
import { useT } from '../i18n/index.js'
import { buildGroups, itemActive, groupActive, OTHER } from './navConfig.jsx'

// The bottom navigation bar — XileHUD's structure: a slim footer of category buttons, each with
// an upward-opening dropdown of its panels. Single-route categories navigate directly. Reference
// pages fold into an "Other" dropdown; a cog on the right opens Settings.
// Dropdowns render through a portal so the bar's horizontal scroll can't clip them.

function DiscordIcon({ size = 16, className }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" className={className} aria-hidden="true">
      <path d="M20.317 4.369A19.79 19.79 0 0016.558 3.2a.074.074 0 00-.079.037c-.34.607-.719 1.4-.984 2.023a18.27 18.27 0 00-5.487 0 12.6 12.6 0 00-.997-2.023.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C1.533 7.55.928 10.65 1.225 13.71a.082.082 0 00.031.056 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 00-.041-.106 13.1 13.1 0 01-1.872-.892.077.077 0 01-.008-.128c.126-.094.252-.192.371-.291a.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.061 0a.074.074 0 01.078.009c.12.099.245.198.372.292a.077.077 0 01-.006.127c-.598.35-1.22.645-1.873.892a.076.076 0 00-.04.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.84 19.84 0 006.002-3.03.077.077 0 00.032-.055c.5-3.177-.838-6.238-2.549-9.314a.061.061 0 00-.031-.028zM8.02 12.66c-1.182 0-2.157-1.085-2.157-2.419 0-1.333.956-2.418 2.157-2.418 1.21 0 2.176 1.094 2.157 2.418 0 1.334-.956 2.42-2.157 2.42zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.418 2.157-2.418 1.21 0 2.176 1.094 2.157 2.418 0 1.334-.946 2.42-2.157 2.42z" />
    </svg>
  )
}

// A button in the bar. Bold label; the icon stands out in gold. Active/open = lit plate + gold.
function BarButton({ icon: Icon, label, active, open, hasMenu, onClick, innerRef }) {
  const hot = active || open
  return (
    <button
      ref={innerRef}
      onClick={onClick}
      className={`inline-flex h-8 shrink-0 items-center gap-1.5 rounded px-2.5 text-[12.5px] font-semibold transition-colors ${
        hot ? 'bg-white/[0.06] text-poe-gold' : 'text-poe-text hover:bg-white/[0.04] hover:text-poe-heading'
      }`}
    >
      {Icon && <Icon size={16} className={hot ? '' : 'text-poe-gold-dim'} />}
      {label && <span className="whitespace-nowrap">{label}</span>}
      {hasMenu && <ChevronUp size={12} className={`opacity-60 transition-transform ${open ? '' : 'rotate-180'}`} />}
    </button>
  )
}

export function BottomNav() {
  const { path, query, navigate } = useRouter()
  const { enabledPlugins } = usePlugins()
  const t = useT()
  const groups = useMemo(() => buildGroups(enabledPlugins), [enabledPlugins])

  // The open menu: its id, the items to show, the anchor button rect, and which edge to align to.
  const [menu, setMenu] = useState(null) // { id, items, rect, align } | null
  const barRef = useRef(null)
  const menuRef = useRef(null)

  const openMenu = (id, items, e, align = 'left') => {
    if (menu?.id === id) { setMenu(null); return }
    setMenu({ id, items, rect: e.currentTarget.getBoundingClientRect(), align })
  }

  // Close on route change, outside click, Escape, or resize/scroll (the rect would go stale).
  useEffect(() => { setMenu(null) }, [path, query?.panel])
  useEffect(() => {
    const onDown = (e) => {
      if (barRef.current?.contains(e.target) || menuRef.current?.contains(e.target)) return
      setMenu(null)
    }
    const onKey = (e) => { if (e.key === 'Escape') setMenu(null) }
    const onWin = () => setMenu(null)
    window.addEventListener('mousedown', onDown)
    window.addEventListener('keydown', onKey)
    window.addEventListener('resize', onWin)
    return () => {
      window.removeEventListener('mousedown', onDown)
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('resize', onWin)
    }
  }, [])

  const marked = useMemo(() => groups.map((g) => ({
    ...g,
    items: g.items?.map((it, i) => ({ ...it, first: i === 0 })),
  })), [groups])

  const otherActive = OTHER.some((o) => path === o.to)

  // The portaled dropdown, anchored above its button so the bar's overflow can't clip it.
  const dropdown = menu ? createPortal(
    <div
      ref={menuRef}
      style={{
        position: 'fixed',
        bottom: Math.round(window.innerHeight - menu.rect.top + 6),
        left: menu.align === 'left' ? Math.round(menu.rect.left) : undefined,
        right: menu.align === 'right' ? Math.round(window.innerWidth - menu.rect.right) : undefined,
        zIndex: 60,
      }}
      className="min-w-[184px] rounded border border-poe-line bg-[#12100c] py-1 shadow-2xl"
    >
      {menu.items.map((item) => {
        const Icon = item.icon
        const active = item.panel != null || item.base ? itemActive(item, path, query) : path === item.to
        return (
          <button
            key={item.to}
            onClick={() => { navigate(item.to); setMenu(null) }}
            className={`flex w-full items-center gap-2.5 px-3 py-1.5 text-left text-[12.5px] transition-colors ${
              active ? 'bg-white/[0.06] text-poe-gold' : 'text-poe-text hover:bg-white/[0.04] hover:text-poe-heading'
            }`}
          >
            {Icon && <Icon size={15} className={active ? 'shrink-0' : 'shrink-0 text-poe-gold-dim'} />}
            <span className="whitespace-nowrap font-medium">{item.label}</span>
          </button>
        )
      })}
    </div>,
    document.body,
  ) : null

  return (
    <>
      <nav ref={barRef} className="relative z-20 flex shrink-0 items-center gap-1 h-11 px-2 border-t border-poe-line bg-black/55 overflow-x-auto">
        <BarButton icon={Home} label={t('Home')} active={path === '/' || path === '/presets'} onClick={() => navigate('/presets')} />
        <div className="mx-1 h-5 w-px bg-poe-line/60 shrink-0" />

        {marked.map((g) => {
          const GIcon = g.icon
          if (!g.items) {
            return <BarButton key={g.id} icon={GIcon} label={t(g.label)} active={groupActive(g, path, query)} onClick={() => navigate(g.to)} />
          }
          return (
            <BarButton key={g.id} icon={GIcon} label={t(g.label)} active={groupActive(g, path, query)} open={menu?.id === g.id} hasMenu
              onClick={(e) => openMenu(g.id, g.items, e)} />
          )
        })}

        <div className="ml-auto flex items-center gap-1 shrink-0">
          <BarButton icon={MoreHorizontal} label={t('Other')} active={otherActive} open={menu?.id === 'other'} hasMenu
            onClick={(e) => openMenu('other', OTHER, e, 'right')} />

          <a href="https://discord.gg/4gueh3Kb3A" target="_blank" rel="noreferrer" title="Join our Discord"
            className="grid h-8 w-8 shrink-0 place-items-center rounded text-[#7782f6] transition-colors hover:bg-white/[0.04] hover:text-white">
            <DiscordIcon size={17} />
          </a>

          <button onClick={() => navigate('/settings')} title={t('Settings')}
            className={`grid h-8 w-8 shrink-0 place-items-center rounded transition-colors ${
              path === '/settings' ? 'bg-white/[0.06] text-poe-gold' : 'text-poe-gold-dim hover:bg-white/[0.04] hover:text-poe-gold'
            }`}>
            <Settings size={17} />
          </button>
        </div>
      </nav>
      {dropdown}
    </>
  )
}

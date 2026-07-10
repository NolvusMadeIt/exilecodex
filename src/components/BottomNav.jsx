import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Home, Settings, MoreHorizontal, ChevronUp } from 'lucide-react'
import { useRouter } from '../lib/router.jsx'
import { usePlugins } from '../store/Plugins.jsx'
import { useT } from '../i18n/index.js'
import { buildGroups, itemActive, groupActive, OTHER } from './navConfig.jsx'

// The bottom navigation bar — XileHUD's structure: a slim footer of category buttons, each with
// an upward-opening dropdown of its panels. Single-route categories navigate directly. Reference
// pages fold into an "Other" dropdown; a cog on the right opens Settings.

function DiscordIcon({ size = 15, className }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" className={className} aria-hidden="true">
      <path d="M20.317 4.369A19.79 19.79 0 0016.558 3.2a.074.074 0 00-.079.037c-.34.607-.719 1.4-.984 2.023a18.27 18.27 0 00-5.487 0 12.6 12.6 0 00-.997-2.023.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C1.533 7.55.928 10.65 1.225 13.71a.082.082 0 00.031.056 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 00-.041-.106 13.1 13.1 0 01-1.872-.892.077.077 0 01-.008-.128c.126-.094.252-.192.371-.291a.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.061 0a.074.074 0 01.078.009c.12.099.245.198.372.292a.077.077 0 01-.006.127c-.598.35-1.22.645-1.873.892a.076.076 0 00-.04.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.84 19.84 0 006.002-3.03.077.077 0 00.032-.055c.5-3.177-.838-6.238-2.549-9.314a.061.061 0 00-.031-.028zM8.02 12.66c-1.182 0-2.157-1.085-2.157-2.419 0-1.333.956-2.418 2.157-2.418 1.21 0 2.176 1.094 2.157 2.418 0 1.334-.956 2.42-2.157 2.42zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.418 2.157-2.418 1.21 0 2.176 1.094 2.157 2.418 0 1.334-.946 2.42-2.157 2.42z" />
    </svg>
  )
}

// A flat button in the bar. Active = lit plate + gold text (no accent wash/glow).
function BarButton({ icon: Icon, label, active, open, hasMenu, onClick, title }) {
  return (
    <button
      onClick={onClick}
      title={title || label}
      className={`inline-flex h-8 shrink-0 items-center gap-1.5 rounded px-2.5 text-[12.5px] transition-colors ${
        active || open ? 'bg-white/[0.06] text-poe-gold' : 'text-poe-text hover:bg-white/[0.04] hover:text-poe-heading'
      }`}
    >
      {Icon && <Icon size={15} />}
      {label && <span className="whitespace-nowrap">{label}</span>}
      {hasMenu && <ChevronUp size={12} className={`opacity-55 transition-transform ${open ? '' : 'rotate-180'}`} />}
    </button>
  )
}

// The upward dropdown that pops above a category button.
function Dropdown({ items, path, query, navigate, onPick }) {
  return (
    <div className="absolute bottom-full left-0 mb-1 min-w-[176px] rounded border border-poe-line bg-[#12100c] py-1 shadow-2xl">
      {items.map((item) => {
        const Icon = item.icon
        const active = itemActive(item, path, query)
        return (
          <button
            key={item.to}
            onClick={() => { navigate(item.to); onPick() }}
            className={`flex w-full items-center gap-2 px-3 py-1.5 text-left text-[12.5px] transition-colors ${
              active ? 'bg-white/[0.06] text-poe-gold' : 'text-poe-text hover:bg-white/[0.04] hover:text-poe-heading'
            }`}
          >
            {Icon && <Icon size={14} className="shrink-0" />}
            <span className="whitespace-nowrap">{item.label}</span>
          </button>
        )
      })}
    </div>
  )
}

export function BottomNav() {
  const { path, query, navigate } = useRouter()
  const { enabledPlugins } = usePlugins()
  const t = useT()
  const groups = useMemo(() => buildGroups(enabledPlugins), [enabledPlugins])

  const [openId, setOpenId] = useState(null) // id of the open dropdown, or null
  const barRef = useRef(null)

  // Close the menu when the route changes or on an outside click / Escape.
  useEffect(() => { setOpenId(null) }, [path, query?.panel])
  useEffect(() => {
    const onDown = (e) => { if (barRef.current && !barRef.current.contains(e.target)) setOpenId(null) }
    const onKey = (e) => { if (e.key === 'Escape') setOpenId(null) }
    window.addEventListener('mousedown', onDown)
    window.addEventListener('keydown', onKey)
    return () => { window.removeEventListener('mousedown', onDown); window.removeEventListener('keydown', onKey) }
  }, [])

  const marked = useMemo(() => groups.map((g) => ({
    ...g,
    items: g.items?.map((it, i) => ({ ...it, first: i === 0 })),
  })), [groups])

  const otherActive = OTHER.some((o) => path === o.to)

  return (
    <nav ref={barRef} className="relative z-20 flex shrink-0 items-center gap-1 h-11 px-2 border-t border-poe-line bg-black/55 overflow-x-auto">
      <BarButton icon={Home} label={t('Home')} active={path === '/' || path === '/presets'} onClick={() => navigate('/presets')} />
      <div className="mx-1 h-5 w-px bg-poe-line/60 shrink-0" />

      {marked.map((g) => {
        const GIcon = g.icon
        if (!g.items) {
          return <BarButton key={g.id} icon={GIcon} label={t(g.label)} active={groupActive(g, path, query)} onClick={() => navigate(g.to)} />
        }
        const open = openId === g.id
        return (
          <div key={g.id} className="relative shrink-0">
            <BarButton icon={GIcon} label={t(g.label)} active={groupActive(g, path, query)} open={open} hasMenu
              onClick={() => setOpenId(open ? null : g.id)} />
            {open && <Dropdown items={g.items} path={path} query={query} navigate={navigate} onPick={() => setOpenId(null)} />}
          </div>
        )
      })}

      <div className="ml-auto flex items-center gap-1 shrink-0">
        {/* Other — the reference/info pages */}
        <div className="relative shrink-0">
          <BarButton icon={MoreHorizontal} label={t('Other')} active={otherActive} open={openId === 'other'} hasMenu
            onClick={() => setOpenId(openId === 'other' ? null : 'other')} />
          {openId === 'other' && <DropdownRight items={OTHER} path={path} query={query} navigate={navigate} onPick={() => setOpenId(null)} />}
        </div>

        {/* Discord */}
        <a href="https://discord.gg/4gueh3Kb3A" target="_blank" rel="noreferrer" title="Join our Discord"
          className="grid h-8 w-8 shrink-0 place-items-center rounded text-[#7782f6] transition-colors hover:bg-white/[0.04] hover:text-white">
          <DiscordIcon size={16} />
        </a>

        {/* Settings cog */}
        <button onClick={() => navigate('/settings')} title={t('Settings')}
          className={`grid h-8 w-8 shrink-0 place-items-center rounded transition-colors ${
            path === '/settings' ? 'bg-white/[0.06] text-poe-gold' : 'text-poe-text hover:bg-white/[0.04] hover:text-poe-heading'
          }`}>
          <Settings size={16} />
        </button>
      </div>
    </nav>
  )
}

// Right-anchored variant of the dropdown so the "Other" menu doesn't overflow the right edge.
function DropdownRight({ items, path, query, navigate, onPick }) {
  return (
    <div className="absolute bottom-full right-0 mb-1 min-w-[176px] rounded border border-poe-line bg-[#12100c] py-1 shadow-2xl">
      {items.map((item) => {
        const Icon = item.icon
        const active = path === item.to
        return (
          <button
            key={item.to}
            onClick={() => { navigate(item.to); onPick() }}
            className={`flex w-full items-center gap-2 px-3 py-1.5 text-left text-[12.5px] transition-colors ${
              active ? 'bg-white/[0.06] text-poe-gold' : 'text-poe-text hover:bg-white/[0.04] hover:text-poe-heading'
            }`}
          >
            {Icon && <Icon size={14} className="shrink-0" />}
            <span className="whitespace-nowrap">{item.label}</span>
          </button>
        )
      })}
    </div>
  )
}

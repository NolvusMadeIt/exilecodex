import React from 'react'
import { Tabs, Tab, Button } from '@mui/material'
import { Star, SlidersHorizontal, ListOrdered, Pencil, Shirt, Eye, Settings, BookMarked, GraduationCap, Users, ScrollText, Code2 } from 'lucide-react'
import { useRouter } from '../lib/router.jsx'
import { useT } from '../i18n/index.js'

const MAIN = [
  { to: '/presets', label: 'Presets', icon: Star },
  { to: '/quick-editor', label: 'Quick Editor', icon: SlidersHorizontal },
  { to: '/tier-lists', label: 'Tier Lists', icon: ListOrdered },
  { to: '/custom-rules', label: 'Custom Rules', icon: Pencil },
  { to: '/cosmetic', label: 'Cosmetic', icon: Shirt },
  { to: '/editor', label: 'Editor', icon: Code2 },
  { to: '/preview', label: 'Preview', icon: Eye },
]
const SECONDARY = [
  { to: '/community', label: 'Community', icon: Users },
  { to: '/patch-notes', label: 'Patch Notes', icon: ScrollText },
  { to: '/guide', label: 'How to Use', icon: GraduationCap },
  { to: '/settings', label: 'Settings', icon: Settings },
  { to: '/changelog', label: 'Changelog', icon: BookMarked },
]

// Vertical navigation rail for the Filter Studio. MUI vertical Tabs for the main sections
// (accent bar on the active item's left edge), MUI Buttons for the secondary group.
export function SideNav() {
  const { path, navigate } = useRouter()
  const t = useT()
  const isActive = (to) => path === to || (to === '/presets' && path === '/')
  const mainValue = MAIN.find(t => isActive(t.to))?.to ?? false

  const tabSx = {
    minHeight: 38, justifyContent: 'flex-start', textAlign: 'left', px: 2, gap: 1,
    color: 'rgb(var(--c-text))', fontSize: 13,
    '& .MuiTab-iconWrapper': { marginRight: '2px' },
    '&:hover': { color: 'rgb(var(--c-heading))', backgroundColor: 'rgb(var(--c-text) / 0.05)' },
    '&.Mui-selected': { color: 'rgb(var(--c-accent))', backgroundColor: 'rgb(var(--c-accent) / 0.10)' },
  }

  return (
    <nav className="w-[210px] shrink-0 border-r border-poe-line bg-black/20 flex flex-col py-2 overflow-y-auto">
      <Tabs
        orientation="vertical"
        value={mainValue}
        onChange={(e, v) => navigate(v)}
        sx={{
          '& .MuiTabs-flexContainer': { gap: '2px' },
          '& .MuiTabs-indicator': { left: 0, right: 'auto', width: '2px', backgroundColor: 'rgb(var(--c-accent))' },
        }}
      >
        {MAIN.map(item => {
          const Icon = item.icon
          return <Tab key={item.to} value={item.to} disableRipple label={t(item.label)}
            icon={<Icon size={16} />} iconPosition="start" sx={tabSx} />
        })}
      </Tabs>

      <div className="h-px bg-poe-line/70 mx-3 my-2.5" />

      <div className="flex flex-col gap-0.5 px-2">
        {SECONDARY.map(item => {
          const Icon = item.icon
          const active = isActive(item.to)
          return (
            <Button key={item.to} onClick={() => navigate(item.to)} startIcon={<Icon size={15} />}
              sx={{
                justifyContent: 'flex-start', px: 1.5, py: 0.75, fontSize: 13,
                color: active ? 'rgb(var(--c-accent))' : 'rgb(var(--c-text))',
                backgroundColor: active ? 'rgb(var(--c-accent) / 0.10)' : 'transparent',
                '&:hover': { backgroundColor: 'rgb(var(--c-text) / 0.05)', color: 'rgb(var(--c-heading))' },
              }}>
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
  )
}

function DiscordIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" className={className} aria-hidden="true">
      <path d="M20.317 4.369A19.79 19.79 0 0 0 16.558 3c-.2.36-.43.84-.593 1.226a18.27 18.27 0 0 0-3.93 0A12.6 12.6 0 0 0 11.44 3a19.74 19.74 0 0 0-3.76 1.37C2.96 9.05 2.2 13.61 2.55 18.1a19.9 19.9 0 0 0 6.06 3.08c.49-.67.93-1.38 1.3-2.13-.71-.27-1.39-.6-2.03-.99.17-.13.34-.26.5-.4 3.92 1.83 8.16 1.83 12.03 0 .17.14.33.27.5.4-.65.39-1.33.72-2.04.99.38.75.81 1.46 1.3 2.13a19.86 19.86 0 0 0 6.07-3.08c.42-5.2-.78-9.72-3.22-13.73ZM9.68 15.33c-1.18 0-2.15-1.09-2.15-2.42 0-1.34.95-2.42 2.15-2.42 1.2 0 2.17 1.09 2.15 2.42 0 1.33-.95 2.42-2.15 2.42Zm4.64 0c-1.18 0-2.15-1.09-2.15-2.42 0-1.34.95-2.42 2.15-2.42 1.2 0 2.17 1.09 2.15 2.42 0 1.33-.94 2.42-2.15 2.42Z"/>
    </svg>
  )
}

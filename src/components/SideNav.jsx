import React from 'react'
import { Tabs, Tab, Button } from '@mui/material'
import { Star, SlidersHorizontal, ListOrdered, Pencil, Shirt, Eye, Settings, BookMarked, GraduationCap, Users } from 'lucide-react'
import { useRouter } from '../lib/router.jsx'
import { useT } from '../i18n/index.js'

const MAIN = [
  { to: '/presets', label: 'Presets', icon: Star },
  { to: '/quick-filters', label: 'Quick Filters', icon: SlidersHorizontal },
  { to: '/tier-lists', label: 'Tier Lists', icon: ListOrdered },
  { to: '/custom-rules', label: 'Custom Rules', icon: Pencil },
  { to: '/cosmetic', label: 'Cosmetic', icon: Shirt },
  { to: '/preview', label: 'Preview', icon: Eye },
]
const SECONDARY = [
  { to: '/community', label: 'Community', icon: Users },
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
      </div>
    </nav>
  )
}

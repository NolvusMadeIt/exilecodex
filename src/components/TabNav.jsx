import React, { useState } from 'react'
import { Tabs, Tab, Button, IconButton, Tooltip, Box } from '@mui/material'
import { Star, SlidersHorizontal, ListOrdered, Pencil, Shirt, Eye, Settings, BookMarked, HelpCircle, GraduationCap } from 'lucide-react'
import { useRouter } from '../lib/router.jsx'
import { HelpLegend } from './HelpLegend.jsx'

const TABS = [
  { to: '/presets', label: 'Presets', icon: Star },
  { to: '/quick-editor', label: 'Quick Editor', icon: SlidersHorizontal },
  { to: '/tier-lists', label: 'Tier Lists', icon: ListOrdered },
  { to: '/custom-rules', label: 'Custom Rules', icon: Pencil },
  { to: '/cosmetic', label: 'Cosmetic', icon: Shirt },
  { to: '/preview', label: 'Preview', icon: Eye },
]
const RIGHT = [
  { to: '/guide', label: 'How to Use', icon: GraduationCap },
  { to: '/settings', label: 'Settings', icon: Settings },
  { to: '/changelog', label: 'Changelog', icon: BookMarked },
]

export function TabNav() {
  const { path, navigate } = useRouter()
  const [legendOpen, setLegendOpen] = useState(false)
  const isActive = (to) => path === to || (to === '/presets' && path === '/')
  const leftValue = TABS.find(t => isActive(t.to))?.to ?? false

  return (
    <nav className="border-y border-poe-line bg-black/30 backdrop-blur-sm">
      <div className="app-shell flex items-center">
        <Tabs
          value={leftValue}
          onChange={(e, v) => navigate(v)}
          variant="scrollable"
          scrollButtons="auto"
          aria-label="Main sections"
        >
          {TABS.map(t => {
            const Icon = t.icon
            return (
              <Tab key={t.to} value={t.to} label={t.label}
                iconPosition="start" icon={<Icon size={15} />} />
            )
          })}
        </Tabs>

        <Box sx={{ ml: 'auto', display: 'flex', alignItems: 'center', gap: 0.5, pl: 1 }}>
          {RIGHT.map(t => {
            const Icon = t.icon
            const active = isActive(t.to)
            return (
              <Button key={t.to} onClick={() => navigate(t.to)} size="small"
                startIcon={<Icon size={14} />}
                sx={{
                  color: active ? 'rgb(var(--c-accent))' : 'rgb(var(--c-text))',
                  backgroundColor: active ? 'rgb(var(--c-accent) / 0.10)' : 'transparent',
                  '&:hover': { backgroundColor: 'rgb(var(--c-text) / 0.06)', color: 'rgb(var(--c-heading))' },
                }}>
                {t.label}
              </Button>
            )
          })}
          <Tooltip title="Open the filter legend (comparators, tiers, rarities, terminology)" arrow>
            <IconButton onClick={() => setLegendOpen(true)} size="small" aria-label="Filter legend"
              sx={{
                ml: 0.5, borderRadius: '8px', color: 'rgb(var(--c-accent))',
                border: '1px solid rgb(var(--c-accent-dim) / 0.6)',
                backgroundColor: 'rgb(var(--c-accent) / 0.10)',
                '&:hover': { backgroundColor: 'rgb(var(--c-accent) / 0.18)', color: 'rgb(var(--c-accent))' },
              }}>
              <HelpCircle size={15} />
            </IconButton>
          </Tooltip>
        </Box>
      </div>
      {legendOpen && <HelpLegend onClose={() => setLegendOpen(false)} />}
    </nav>
  )
}

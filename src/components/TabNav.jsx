import React, { useState } from 'react'
import { Star, SlidersHorizontal, ListOrdered, Pencil, Shirt, Eye, Settings, BookMarked, HelpCircle, GraduationCap } from 'lucide-react'
import { useRouter } from '../lib/router.jsx'
import { HelpLegend } from './HelpLegend.jsx'

const TABS = [
  { to: '/presets', label: 'Presets', icon: Star },
  { to: '/quick-filters', label: 'Quick Filters', icon: SlidersHorizontal },
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
  const Item = ({ to, label, icon: Icon }) => (
    <button onClick={() => navigate(to)} className={`tab ${isActive(to) ? 'tab-active' : ''}`}>
      <Icon size={14} /> {label}
    </button>
  )
  return (
    <nav className="border-y border-poe-line bg-black/30 backdrop-blur-sm">
      <div className="app-shell flex items-center">
        <div className="flex items-center">{TABS.map(t => <Item key={t.to} {...t} />)}</div>
        <div className="ml-auto flex items-center">
          {RIGHT.map(t => <Item key={t.to} {...t} />)}
          <button
            onClick={() => setLegendOpen(true)}
            title="Open the filter legend (comparators, tiers, rarities, terminology)"
            className="tab text-poe-gold border-poe-gold-dim/60 bg-poe-gold/10 hover:bg-poe-gold/20"
          >
            <HelpCircle size={14} />
          </button>
        </div>
      </div>
      {legendOpen && <HelpLegend onClose={() => setLegendOpen(false)} />}
    </nav>
  )
}

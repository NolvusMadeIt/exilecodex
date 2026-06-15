import React from 'react'
import { Lock } from 'lucide-react'
import { usePrefs, THEMES } from '../store/Prefs.jsx'
import { useGameInfo } from '../store/GameInfo.jsx'
import { useFilter } from '../store/FilterStore.jsx'
import { Help, Toggle } from '../components/primitives.jsx'
import { SimpleSelect } from '../components/SimpleSelect.jsx'

const SOURCE_LABEL = { default: 'fallback', bundled: 'bundled with app' }

export function SettingsPage() {
  const { prefs, update } = usePrefs()
  const gameInfo = useGameInfo()
  const { active } = useFilter()

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="gold-heading text-[22px]">Settings</h1>
        <p className="text-[12px] text-poe-text mt-1">Theme, filter meta, and custom comments. These apply across every filter you build.</p>
      </div>

      {/* Theme */}
      <section>
        <div className="section-bar">Theme</div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-2">
          {THEMES.map(t => {
            const on = prefs.theme === t.id
            return (
              <button
                key={t.id}
                onClick={() => update({ theme: t.id })}
                className={`text-left p-3 rounded border transition-colors ${on ? 'border-poe-gold shadow-glow bg-poe-gold/5' : 'border-poe-line hover:border-poe-gold-dim'}`}
              >
                <div className="flex items-center gap-2">
                  <span className="inline-block w-4 h-4 rounded-full border border-white/10" style={{ background: t.swatch }} />
                  <span className="heading text-[15px]">{t.name}</span>
                  {on && <span className="ml-auto text-[10px] bg-poe-gold/90 text-black px-1 rounded-sm font-smallcaps">SELECTED</span>}
                </div>
                <p className="text-[11.5px] text-poe-text mt-1.5">{t.desc}</p>
              </button>
            )
          })}
        </div>
      </section>

      {/* Filter Output display options */}
      <section>
        <div className="section-bar">Filter Output</div>
        <div className="mt-2">
          <Toggle
            checked={prefs.syntaxHighlight ?? true}
            onChange={v => update({ syntaxHighlight: v })}
            label="Syntax highlighting"
            help="Adds elegant colors to the live Filter Output (comments in gray, Show/Hide actions, condition keywords like Class/Rarity, style commands like SetTextColor, strings, numbers, and operators). On by default."
          />
          <p className="text-[11px] text-poe-text/70 mt-1.5 pl-6">Makes the generated .filter text much easier and more pleasant to read while you work.</p>
        </div>
      </section>

      {/* Interface options */}
      <section>
        <div className="section-bar">Interface</div>
        <div className="mt-2">
          <Toggle
            checked={prefs.accordionsOpen ?? true}
            onChange={v => update({ accordionsOpen: v })}
            label="Expand Quick Filter sections by default"
            help="When on, every Quick Filter section (Currency, Flasks, Equipment, etc.) starts expanded so you can see all options at once. When off, they start collapsed. On by default."
          />
          <p className="text-[11px] text-poe-text/70 mt-1.5 pl-6">You can still expand/collapse individual sections, or use the Expand all / Collapse all buttons on the Quick Filters page.</p>
        </div>
      </section>

      {/* Filter meta */}
      <section>
        <div className="section-bar">Filter Meta <span className="text-[10px] opacity-70">(written at the top of every .filter)</span></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-2">
          {/* League — dropdown, auto-populated from version.json (+ live API if reachable) */}
          <div>
            <div className="flex items-center gap-2 text-[11px] uppercase tracking-wide text-poe-text mb-1">
              League <Help text="The PoE2 league this filter targets, taken from the bundled league list. The name is stamped at the top of your .filter so you can keep separate filters per league." />
            </div>
            <SimpleSelect
              value={prefs.league || ''}
              onChange={v => update({ league: v })}
              className="h-8"
              options={[
                ...(!gameInfo.leagues.some(l => l.id === prefs.league) && prefs.league
                  ? [{ value: prefs.league, label: `${prefs.league} (custom)` }]
                  : []),
                ...gameInfo.leagues.map(l => ({
                  value: l.id,
                  label: `${l.name}${l.current ? ' — current' : ''}`,
                })),
              ]}
            />
            <p className="text-[10.5px] text-poe-text/70 mt-1">Source: {SOURCE_LABEL[gameInfo.source]}{gameInfo.asOf ? ` · as of ${gameInfo.asOf}` : ''}</p>
          </div>

          {/* Filter version — read-only, per-filter, auto-bumped */}
          <div>
            <div className="flex items-center gap-2 text-[11px] uppercase tracking-wide text-poe-text mb-1">
              Filter version <Help text="The version of THIS filter (per-filter, not app-wide). New filters start at 0.0.1. The patch number auto-increments on Save and on Import — so every revision is traceable. To bump minor/major, use a custom comment line in the Top Comment box." />
            </div>
            <div className="field h-8 flex items-center gap-2 cursor-not-allowed select-none">
              <Lock size={12} className="text-poe-text/60 shrink-0" />
              <span className="font-mono text-poe-text-bright">{active?.version || '0.0.1'}</span>
              <span className="text-[10px] text-poe-text/70 ml-auto">auto</span>
            </div>
            <p className="text-[10.5px] text-poe-text/70 mt-1">Filter: <span className="text-poe-text-bright">{active?.name}</span></p>
          </div>

          {/* Game version — read-only, sourced from version.json */}
          <div>
            <div className="flex items-center gap-2 text-[11px] uppercase tracking-wide text-poe-text mb-1">
              PoE2 game version <Help text="The Path of Exile 2 patch version this filter is intended for. Comes from a bundled config that the app maintainer updates each patch. There's no purely-public PoE2 patch API, so this is treated as the 'official' source for the app." />
            </div>
            <div className="field h-8 flex items-center gap-2 cursor-not-allowed select-none">
              <Lock size={12} className="text-poe-text/60 shrink-0" />
              <span className="font-mono text-poe-text-bright">{gameInfo.gameVersionLabel}</span>
              <span className="text-[10px] text-poe-text/70 ml-auto">auto</span>
            </div>
            <p className="text-[10.5px] text-poe-text/70 mt-1">Source: {SOURCE_LABEL[gameInfo.source]}{gameInfo.asOf ? ` · as of ${gameInfo.asOf}` : ''}</p>
          </div>
        </div>
      </section>

      {/* Custom comments */}
      <section>
        <div className="section-bar">Custom Comments</div>
        <p className="text-[12px] text-poe-text">
          Free-text added to the top and bottom of every exported <code className="font-mono">.filter</code>. Each line is auto-prefixed with <code className="font-mono">#</code> (PoE filter comment syntax).
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
          <div>
            <div className="flex items-center gap-2 text-[11px] uppercase tracking-wide text-poe-text mb-1">
              Top Comment <Help text="Appears at the very top of the .filter, just after the auto-generated header. Use it for credits, links, or notes you want collaborators to see first." />
            </div>
            <textarea
              value={prefs.topComment}
              onChange={e => update({ topComment: e.target.value })}
              className="field h-36 font-mono text-[11.5px] py-2"
              placeholder={"Author: you\nDescription: my SSF lvl-90 mapping filter"}
            />
          </div>
          <div>
            <div className="flex items-center gap-2 text-[11px] uppercase tracking-wide text-poe-text mb-1">
              Bottom Comment <Help text="Appended at the very end of the .filter (e.g. footer, link to your blog, license notice)." />
            </div>
            <textarea
              value={prefs.bottomComment}
              onChange={e => update({ bottomComment: e.target.value })}
              className="field h-36 font-mono text-[11.5px] py-2"
              placeholder={"-- end of filter --"}
            />
          </div>
        </div>
      </section>
    </div>
  )
}


import React, { useEffect, useState } from 'react'
import { Lock, RefreshCw } from 'lucide-react'
import { usePrefs, THEMES } from '../store/Prefs.jsx'
import { useGameInfo } from '../store/GameInfo.jsx'
import { useFilter } from '../store/FilterStore.jsx'
import { Help, Toggle } from '../components/primitives.jsx'
import { SimpleSelect } from '../components/SimpleSelect.jsx'
import { OverlaySettings } from '../components/OverlaySettings.jsx'
import { PluginsTab } from './PluginsTab.jsx'
import { desktopApi } from '../lib/desktop.js'
import { useT } from '../i18n/index.js'

const SOURCE_LABEL = { default: 'fallback', bundled: 'bundled with app' }

export function SettingsPage() {
  const { prefs, update } = usePrefs()
  const gameInfo = useGameInfo()
  const { active } = useFilter()
  const t = useT()
  const [tab, setTab] = useState('general')

  // Desktop-only: current app version + a manual update check (results show as a dialog / the
  // bottom-left banner, handled in the main process).
  const [appVersion, setAppVersion] = useState('')
  const [checking, setChecking] = useState(false)
  useEffect(() => {
    if (desktopApi?.getVersion) desktopApi.getVersion().then(setAppVersion).catch(() => {})
  }, [])
  const checkUpdates = () => {
    if (!desktopApi?.checkForUpdate) return
    setChecking(true)
    desktopApi.checkForUpdate()
    setTimeout(() => setChecking(false), 4000)
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="gold-heading text-[22px]">{t('Settings')}</h1>
        <p className="text-[12px] text-poe-text mt-1">Theme, filter meta, plugins, and custom comments. These apply across every filter you build.</p>
      </div>

      {/* Settings tabs — made prominent (larger, bolder, accent underline, more padding). */}
      <div className="flex gap-2 border-b border-poe-line/60">
        {[['general', 'General'], ['plugins', 'Plugins']].map(([id, label]) => {
          const on = tab === id
          return (
            <button key={id} onClick={() => setTab(id)}
              className={`px-5 h-11 text-[15px] font-semibold border-b-2 -mb-px transition-colors ${on
                ? 'border-poe-gold text-poe-gold bg-poe-gold/[0.06]'
                : 'border-transparent text-poe-text/80 hover:text-poe-heading hover:bg-poe-text/[0.04]'}`}>
              {t(label)}
            </button>
          )
        })}
      </div>

      {tab === 'plugins' && <PluginsTab />}

      {tab === 'general' && (
      <div className="space-y-6">
      {/* Updates (desktop app only) */}
      {desktopApi && (
        <section>
          <div className="section-bar">{t('Updates')}</div>
          <div className="mt-2 flex flex-wrap items-center gap-3">
            <span className="text-[12.5px] text-poe-text">
              Current version <span className="font-mono text-poe-text-bright">v{appVersion || '…'}</span>
            </span>
            <button onClick={checkUpdates} disabled={checking} className="btn-dark h-8 text-[12px] disabled:opacity-50">
              <RefreshCw size={13} className={checking ? 'animate-spin' : ''} /> {checking ? 'Checking…' : 'Check for updates'}
            </button>
          </div>
          <p className="text-[11px] text-poe-text/70 mt-1.5">When a newer version is published you’ll get a prompt in the bottom-left to update now or later.</p>
        </section>
      )}

      {/* Theme */}
      <section>
        <div className="section-bar">{t('Theme')}</div>
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

      {/* Typography */}
      <section>
        <div className="section-bar">{t('Typography')}</div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
          <div>
            <div className="flex items-center gap-2 text-[11px] uppercase tracking-wide text-poe-text mb-1">
              {t('Font')} <Help text="The typeface used throughout the app. Inter Tight is the default; every option is bundled with the app (works offline)." />
            </div>
            <SimpleSelect
              value={prefs.fontFamily || 'inter-tight'}
              onChange={v => update({ fontFamily: v })}
              className="h-8"
              options={[
                { value: 'inter-tight', label: 'Inter Tight (default)' },
                { value: 'poppins', label: 'Poppins' },
                { value: 'inter', label: 'Inter' },
                { value: 'system', label: 'System UI' },
              ]}
            />
          </div>
          <div>
            <div className="flex items-center gap-2 text-[11px] uppercase tracking-wide text-poe-text mb-1">
              {t('Font size')} <Help text="Scales the whole app. Capped at Extra Large (120%) so the layout always stays usable." />
            </div>
            <SimpleSelect
              value={String(prefs.fontScale ?? 1)}
              onChange={v => update({ fontScale: Number(v) })}
              className="h-8"
              options={[
                { value: '0.9', label: 'Compact (90%)' },
                { value: '1', label: 'Default (100%)' },
                { value: '1.1', label: 'Large (110%)' },
                { value: '1.2', label: 'Extra Large (120%)' },
              ]}
            />
          </div>
        </div>
        <p className="text-[11px] text-poe-text/70 mt-2">{t('Applies instantly across the whole app and is saved with your settings.')}</p>
      </section>

      {/* Filter Output display options */}
      <section>
        <div className="section-bar">{t('Filter Output')}</div>
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

      {/* Game Overlay (desktop app) */}
      <OverlaySettings />

      {/* Filter meta */}
      <section>
        <div className="section-bar">{t('Filter Meta')} <span className="text-[10px] opacity-70">(written at the top of every .filter)</span></div>
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
            </div>
            <p className="text-[10.5px] text-poe-text/70 mt-1">Source: {SOURCE_LABEL[gameInfo.source]}{gameInfo.asOf ? ` · as of ${gameInfo.asOf}` : ''}</p>
          </div>
        </div>
      </section>

      {/* Custom comments */}
      <section>
        <div className="section-bar">{t('Custom Comments')}</div>
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

        <div className="section-bar">{t('Credits & licenses')}</div>
        <div className="text-[12px] leading-relaxed text-poe-text/80 max-w-2xl">
          <p>
            This app is open source under{' '}
            <a href="https://github.com/NolvusMadeIt/exilecodex/blob/main/LICENSE" target="_blank" rel="noopener noreferrer" className="text-poe-gold-dim hover:text-poe-gold">GPL-3.0</a>.
            The Item Database, Modifiers, Crafting, Character and Map Regex modules are{' '}
            <span className="text-poe-text-bright">powered by{' '}
            <a href="https://github.com/XileHUD/poe_overlay" target="_blank" rel="noopener noreferrer" className="text-poe-gold-dim hover:text-poe-gold">XileHUD</a></span>{' '}
            (engine &amp; curated data, GPL-3.0). The window look is our own implementation, inspired by the overlay
            style the PoE2 community loves. Market &amp; price data via poe2scout; articles via the PoE2 Wiki; charts via
            TradingView lightweight-charts. Full details in{' '}
            <a href="https://github.com/NolvusMadeIt/exilecodex/blob/main/ATTRIBUTION.md" target="_blank" rel="noopener noreferrer" className="text-poe-gold-dim hover:text-poe-gold">ATTRIBUTION.md</a>.
          </p>
          <p className="mt-1.5 text-poe-text/50">
            Unofficial fan-made tool — not affiliated with or endorsed by Grinding Gear Games. Game images load from
            GGG's public CDN and are never redistributed with the app.
          </p>
        </div>
      </section>
      </div>
      )}
    </div>
  )
}


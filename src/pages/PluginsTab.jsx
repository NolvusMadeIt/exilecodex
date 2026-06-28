import React, { Suspense, useState } from 'react'
import { ArrowLeft, Puzzle, Lock, ImageOff } from 'lucide-react'
import { usePlugins, usePluginHost } from '../store/Plugins.jsx'
import { Toggle } from '../components/primitives.jsx'
import { SimpleSelect } from '../components/SimpleSelect.jsx'

// Auto-rendered form for a plugin's declarative `settings` schema (toggle/number/text/select),
// bound to the plugin's host settings (persisted in prefs.pluginSettings[id], DB-synced).
function PluginSettingsForm({ pluginId, schema }) {
  const host = usePluginHost(pluginId)
  return (
    <div className="max-w-xl space-y-1">
      {schema.map(f => {
        const val = host.settings.get(f.key)
        return (
          <div key={f.key} className="flex items-center justify-between gap-3 py-2 border-b border-poe-line/40 last:border-0">
            <div className="min-w-0">
              <div className="text-[12.5px] text-poe-text-bright">{f.label}</div>
              {f.help && <div className="text-[11px] text-poe-text/70">{f.help}</div>}
            </div>
            <div className="shrink-0">
              {f.type === 'toggle' && <Toggle checked={!!val} onChange={v => host.settings.set(f.key, v)} />}
              {f.type === 'number' && (
                <input type="number" value={Number(val ?? f.default)} min={f.min} max={f.max} step={f.step}
                  onChange={e => host.settings.set(f.key, Number(e.target.value))} className="field h-7 w-24" />
              )}
              {f.type === 'text' && (
                <input type="text" value={String(val ?? '')} onChange={e => host.settings.set(f.key, e.target.value)} className="field h-7 w-44" />
              )}
              {f.type === 'select' && (
                <SimpleSelect className="w-44" value={String(val ?? f.default)} onChange={v => host.settings.set(f.key, v)} options={f.options} />
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}

// Settings ▸ Plugins — the WordPress-style plugin manager: a list of installed plugins, and a
// per-plugin detail view (info, screenshots, changelog, and the plugin's own settings).

function StatusPill({ enabled }) {
  return (
    <span className={`text-[10px] px-1.5 py-0.5 rounded border font-smallcaps ${enabled
      ? 'text-emerald-300 border-emerald-700/60 bg-emerald-900/20'
      : 'text-poe-text/70 border-poe-line'}`}>{enabled ? 'Active' : 'Inactive'}</span>
  )
}

// Active/Inactive control. Core plugins can't be turned off, so they show a lock instead.
function EnableControl({ p, onToggle }) {
  if (p.core) return <span className="inline-flex items-center gap-1 text-[11px] text-poe-text/60"><Lock size={12} /> Always on</span>
  return <Toggle checked={p.enabled} onChange={onToggle} />
}

function Screenshot({ shot }) {
  const [err, setErr] = useState(false)
  return (
    <figure className="m-0">
      {err ? (
        <div className="aspect-video w-full rounded border border-poe-line bg-black/40 grid place-items-center text-poe-text/50 text-[11px] gap-1">
          <ImageOff size={18} /> Screenshot coming soon
        </div>
      ) : (
        <img src={shot.src} alt={shot.caption || ''} onError={() => setErr(true)}
          className="w-full rounded border border-poe-line" loading="lazy" />
      )}
      {shot.caption && <figcaption className="text-[11px] text-poe-text/70 mt-1">{shot.caption}</figcaption>}
    </figure>
  )
}

function DetailTabs({ p }) {
  const shots = p.detail?.screenshots || []
  const changelog = p.detail?.changelog || []
  const SettingsComp = p.contributes?.settings?.component
  const schema = Array.isArray(p.settings) ? p.settings : null
  const hasSettings = !!SettingsComp || !!(schema && schema.length)
  const tabs = [
    ['description', 'Description'],
    ...(changelog.length ? [['changelog', 'Changelog']] : []),
    ...(hasSettings ? [['settings', 'Settings']] : []),
  ]
  const [tab, setTab] = useState('description')

  return (
    <div>
      <div className="flex gap-1 border-b border-poe-line/60 mb-3">
        {tabs.map(([id, label]) => (
          <button key={id} onClick={() => setTab(id)}
            className={`px-3 h-8 text-[12px] border-b-2 -mb-px ${tab === id ? 'border-poe-gold text-poe-gold' : 'border-transparent text-poe-text hover:text-poe-heading'}`}>{label}</button>
        ))}
      </div>

      {tab === 'description' && (
        <div className="space-y-4">
          <p className="text-[12.5px] text-poe-text leading-relaxed whitespace-pre-line">{p.detail?.longDescription || p.description}</p>
          {shots.length > 0 && (
            <div>
              <div className="section-bar">Screenshots</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
                {shots.map((s, i) => <Screenshot key={i} shot={s} />)}
              </div>
            </div>
          )}
        </div>
      )}

      {tab === 'changelog' && (
        <ul className="space-y-2">
          {changelog.map((c, i) => (
            <li key={i}>
              <div className="text-[12.5px] text-poe-text-bright font-mono">v{c.version}</div>
              <div className="text-[12px] text-poe-text">{c.notes}</div>
            </li>
          ))}
        </ul>
      )}

      {tab === 'settings' && (
        SettingsComp ? (
          <Suspense fallback={<div className="text-[12px] text-poe-text">Loading settings…</div>}>
            <SettingsComp />
          </Suspense>
        ) : schema ? (
          <PluginSettingsForm pluginId={p.id} schema={schema} />
        ) : null
      )}
    </div>
  )
}

function PluginDetail({ p, onBack, onToggle }) {
  const Icon = p.icon || Puzzle
  return (
    <div className="space-y-4">
      <button onClick={onBack} className="inline-flex items-center gap-1 text-[12px] text-poe-text hover:text-poe-heading">
        <ArrowLeft size={14} /> All plugins
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_220px] gap-4">
        <div className="space-y-4">
          <div className="panel p-4 flex items-start gap-3">
            <span className="w-12 h-12 grid place-items-center rounded bg-poe-gold/10 border border-poe-gold-dim/50 text-poe-gold shrink-0"><Icon size={22} /></span>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="gold-heading text-[17px]">{p.name}</h2>
                <StatusPill enabled={p.enabled} />
              </div>
              <p className="text-[12px] text-poe-text mt-1">{p.description}</p>
            </div>
            <div className="shrink-0"><EnableControl p={p} onToggle={onToggle} /></div>
          </div>

          <div className="panel p-4"><DetailTabs p={p} /></div>
        </div>

        {/* Meta sidebar (WordPress plugin-detail style) */}
        <aside className="panel p-4 h-max space-y-2 text-[12px]">
          <div className="section-bar">Details</div>
          <Meta label="Version" value={`v${p.version}`} />
          <Meta label="Author" value={p.author} />
          <Meta label="Category" value={p.category} />
          <Meta label="Status" value={p.enabled ? 'Active' : 'Inactive'} />
          <Meta label="Type" value={p.core ? 'Core (built-in)' : 'Optional add-on'} />
        </aside>
      </div>
    </div>
  )
}

function Meta({ label, value }) {
  return (
    <div className="flex items-center justify-between gap-3 py-1 border-b border-poe-line/40 last:border-0">
      <span className="text-poe-text/70">{label}</span>
      <span className="text-poe-text-bright text-right">{value}</span>
    </div>
  )
}

function PluginRow({ p, onOpen, onToggle }) {
  const Icon = p.icon || Puzzle
  return (
    <div className="panel p-3 flex items-center gap-3">
      <span className="w-10 h-10 grid place-items-center rounded bg-poe-gold/10 border border-poe-gold-dim/50 text-poe-gold shrink-0"><Icon size={18} /></span>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <button onClick={onOpen} className="gold-heading text-[14px] hover:underline text-left truncate">{p.name}</button>
          <StatusPill enabled={p.enabled} />
          {p.core && <span className="text-[10px] px-1.5 py-0.5 rounded border border-poe-line text-poe-text/70">Core</span>}
        </div>
        <p className="text-[12px] text-poe-text mt-0.5 line-clamp-1">{p.description}</p>
        <div className="text-[10.5px] text-poe-text/60 mt-0.5">v{p.version} · by {p.author} · {p.category}</div>
      </div>
      <div className="flex items-center gap-3 shrink-0">
        <button onClick={onOpen} className="btn-dark h-7 text-[11px]">View details</button>
        <EnableControl p={p} onToggle={onToggle} />
      </div>
    </div>
  )
}

export function PluginsTab() {
  const { plugins, setEnabled } = usePlugins()
  const [openId, setOpenId] = useState(null)
  const open = plugins.find(p => p.id === openId) || null

  if (open) {
    return <PluginDetail p={open} onBack={() => setOpenId(null)} onToggle={v => setEnabled(open.id, v)} />
  }

  return (
    <div className="space-y-4">
      <p className="text-[12px] text-poe-text">
        Plugins are optional add-ons. Turn one off and it disappears from the app — the rest keeps working exactly as before.
        The <span className="text-poe-text-bright">Filter & Build Editor</span> is the first; more are on the way.
      </p>

      <div className="space-y-2">
        {plugins.map(p => (
          <PluginRow key={p.id} p={p} onOpen={() => setOpenId(p.id)} onToggle={v => setEnabled(p.id, v)} />
        ))}
      </div>

      {/* Community marketplace seed (future phase) */}
      <div className="panel p-4 text-center border-dashed">
        <div className="inline-flex items-center gap-2 text-poe-text-bright text-[13px]"><Puzzle size={15} /> Community add-ons</div>
        <p className="text-[12px] text-poe-text mt-1">Browse, install and share plugins made by the community — coming soon.</p>
      </div>
    </div>
  )
}

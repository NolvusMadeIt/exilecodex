import React, { Suspense, useMemo, useState } from 'react'
import {
  ArrowLeft, Puzzle, Lock, ImageOff, Download, Search, Plus,
  CheckCircle2, AlertTriangle, Trash2, Power, PowerOff, RefreshCw,
} from 'lucide-react'
import { usePlugins, usePluginHost } from '../store/Plugins.jsx'
import { Toggle } from '../components/primitives.jsx'
import { SimpleSelect } from '../components/SimpleSelect.jsx'

// Each built-in plugin is also packaged as a downloadable .zip under /public/plugins, so users can
// grab it from the app (desktop only — backup/sharing) to inspect or share.
const pluginZipUrl = (id) => `/plugins/${id}.zip`
// Plugin packages download from the desktop app only; the browser build is a preview.
const IS_DESKTOP = typeof window !== 'undefined' && !!window.nolvusDesktop?.isDesktop
// Sharp corners (house rule).
const SHARP = { borderRadius: 2 }

// A desktop-only optional plugin can't be installed/activated in the browser preview.
const lockedOnWeb = (p) => !p.core && p.desktopOnly && !IS_DESKTOP

// ---------------------------------------------------------------------------
// Settings form (declarative schema → auto-rendered), bound to the plugin host.
// ---------------------------------------------------------------------------
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
                  onChange={e => host.settings.set(f.key, Number(e.target.value))} className="field h-7 w-24" style={SHARP} />
              )}
              {f.type === 'text' && (
                <input type="text" value={String(val ?? '')} onChange={e => host.settings.set(f.key, e.target.value)} className="field h-7 w-44" style={SHARP} />
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

function hasSettings(p) {
  const SettingsComp = p.contributes?.settings?.component
  const schema = Array.isArray(p.settings) ? p.settings : null
  return !!SettingsComp || !!(schema && schema.length)
}

// ---------------------------------------------------------------------------
// Small shared bits
// ---------------------------------------------------------------------------
function IconTile({ p, size = 18, big = false }) {
  const Icon = p.icon || Puzzle
  return (
    <span
      className={`grid place-items-center bg-poe-gold/10 border border-poe-gold-dim/50 text-poe-gold shrink-0 ${big ? 'w-12 h-12' : 'w-10 h-10'}`}
      style={SHARP}>
      <Icon size={big ? 22 : size} />
    </span>
  )
}

// Status pill for the detail view: Active / Inactive / Not installed.
function StatusPill({ p }) {
  let label = 'Not installed', cls = 'text-poe-text/60 border-poe-line'
  if (p.active) { label = 'Active'; cls = 'text-emerald-300 border-emerald-700/60 bg-emerald-900/20' }
  else if (p.installed) { label = 'Inactive'; cls = 'text-poe-text/80 border-poe-line' }
  return <span className={`text-[10px] px-1.5 py-0.5 border font-smallcaps ${cls}`} style={SHARP}>{label}</span>
}

// A WordPress-style action "link" (text button).
function ActionLink({ onClick, children, danger = false, disabled = false, title }) {
  return (
    <button type="button" onClick={onClick} disabled={disabled} title={title}
      className={`text-[12px] transition-colors disabled:opacity-40 disabled:cursor-not-allowed ${danger
        ? 'text-red-300/90 hover:text-red-300'
        : 'text-poe-gold-dim hover:text-poe-gold'}`}>
      {children}
    </button>
  )
}

function Screenshot({ shot }) {
  const [err, setErr] = useState(false)
  return (
    <figure className="m-0">
      {err ? (
        <div className="aspect-video w-full border border-poe-line bg-black/40 grid place-items-center text-poe-text/50 text-[11px] gap-1" style={SHARP}>
          <ImageOff size={18} /> Screenshot coming soon
        </div>
      ) : (
        <img src={shot.src} alt={shot.caption || ''} onError={() => setErr(true)}
          className="w-full border border-poe-line" style={SHARP} loading="lazy" />
      )}
      {shot.caption && <figcaption className="text-[11px] text-poe-text/70 mt-1">{shot.caption}</figcaption>}
    </figure>
  )
}

// Card cover image — first screenshot if present (graceful), else the big icon tile.
function CardCover({ p }) {
  const shot = p.detail?.screenshots?.[0]
  const [err, setErr] = useState(false)
  if (shot && !err) {
    return (
      <img src={shot.src} alt="" onError={() => setErr(true)}
        className="w-full aspect-video object-cover border-b border-poe-line" style={{ borderTopLeftRadius: 2, borderTopRightRadius: 2 }} loading="lazy" />
    )
  }
  const Icon = p.icon || Puzzle
  return (
    <div className="w-full aspect-video grid place-items-center bg-poe-gold/5 border-b border-poe-line text-poe-gold/70" style={{ borderTopLeftRadius: 2, borderTopRightRadius: 2 }}>
      <Icon size={40} />
    </div>
  )
}

// ---------------------------------------------------------------------------
// Lifecycle action buttons (shared logic between list-row, card and detail)
// ---------------------------------------------------------------------------
function useLifecycle() {
  const { install, activate, deactivate, uninstall, updatePlugin } = usePlugins()
  return { install, activate, deactivate, uninstall, updatePlugin }
}

// ---------------------------------------------------------------------------
// DETAIL VIEW
// ---------------------------------------------------------------------------
function DetailTabs({ p, initialTab = 'description' }) {
  const shots = p.detail?.screenshots || []
  const changelog = p.detail?.changelog || []
  const SettingsComp = p.contributes?.settings?.component
  const schema = Array.isArray(p.settings) ? p.settings : null
  const settingsAvailable = hasSettings(p)
  const tabs = [
    ['description', 'Description'],
    ...(changelog.length ? [['changelog', 'Changelog']] : []),
    ...(settingsAvailable ? [['settings', 'Settings']] : []),
  ]
  // Honor a requested initial tab (e.g. the "Settings" action link), but only if that tab exists
  // and the plugin is installed (settings need install).
  const wantSettings = initialTab === 'settings' && settingsAvailable && p.installed
  const [tab, setTab] = useState(wantSettings ? 'settings' : 'description')

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
          <div>
            <div className="section-bar">Screenshots</div>
            {shots.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
                {shots.map((s, i) => <Screenshot key={i} shot={s} />)}
              </div>
            ) : (
              <div className="mt-2"><Screenshot shot={{ src: '', caption: '' }} /></div>
            )}
          </div>
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
        p.installed ? (
          SettingsComp ? (
            <Suspense fallback={<div className="text-[12px] text-poe-text">Loading settings…</div>}>
              <SettingsComp />
            </Suspense>
          ) : schema ? (
            <PluginSettingsForm pluginId={p.id} schema={schema} />
          ) : null
        ) : (
          <div className="text-[12px] text-poe-text/70">Install this plugin to configure its settings.</div>
        )
      )}
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

// The lifecycle button-bar shown in the detail header, sized to state.
function LifecycleButtons({ p }) {
  const { install, activate, deactivate, uninstall, updatePlugin } = useLifecycle()

  if (p.core) {
    return <span className="inline-flex items-center gap-1 text-[12px] text-poe-text/60"><Lock size={13} /> Always on</span>
  }
  if (lockedOnWeb(p)) {
    return <span className="inline-flex items-center gap-1 text-[12px] text-poe-text/50"><Lock size={13} /> Desktop app only</span>
  }
  if (!p.installed) {
    return (
      <button onClick={() => install(p.id)} className="btn-action h-8 text-[12px] inline-flex items-center px-3" style={SHARP}>
        <Plus size={14} /> Install Now
      </button>
    )
  }
  // Installed.
  return (
    <div className="flex items-center gap-2 flex-wrap justify-end">
      {p.hasUpdate && (
        <button onClick={() => updatePlugin(p.id)} className="btn-action h-8 text-[12px] inline-flex items-center px-3" style={SHARP}>
          <RefreshCw size={13} /> Update to v{p.version}
        </button>
      )}
      {p.active ? (
        <button onClick={() => deactivate(p.id)} className="btn-dark h-8 text-[12px] inline-flex items-center px-3" style={SHARP}>
          <PowerOff size={13} /> Deactivate
        </button>
      ) : (
        <button onClick={() => activate(p.id)} className="btn-action h-8 text-[12px] inline-flex items-center px-3" style={SHARP}>
          <Power size={13} /> Activate
        </button>
      )}
      {!p.active && (
        <button onClick={() => uninstall(p.id)} title="Delete this plugin"
          className="btn-dark h-8 text-[12px] inline-flex items-center px-3 text-red-300/90 hover:text-red-300" style={SHARP}>
          <Trash2 size={13} /> Delete
        </button>
      )}
    </div>
  )
}

function PluginDetail({ p, onBack, initialTab }) {
  return (
    <div className="space-y-4">
      <button onClick={onBack} className="inline-flex items-center gap-1 text-[12px] text-poe-text hover:text-poe-heading">
        <ArrowLeft size={14} /> All plugins
      </button>

      {p.hasUpdate && (
        <div className="panel px-3 py-2 border-amber-700/50 bg-amber-900/15 flex items-center gap-2 text-[12px] text-amber-200" style={SHARP}>
          <AlertTriangle size={14} className="shrink-0" />
          There's a new version of {p.name} (v{p.version}). Update now to get the latest.
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_240px] gap-4">
        <div className="space-y-4">
          <div className="panel p-4 flex items-start gap-3" style={SHARP}>
            <IconTile p={p} big />
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="gold-heading text-[17px]">{p.name}</h2>
                <StatusPill p={p} />
                {p.core && <span className="text-[10px] px-1.5 py-0.5 border border-poe-line text-poe-text/70" style={SHARP}>Core</span>}
              </div>
              <p className="text-[12px] text-poe-text mt-1">{p.description}</p>
            </div>
            <div className="shrink-0 self-center"><LifecycleButtons p={p} /></div>
          </div>

          <div className="panel p-4" style={SHARP}><DetailTabs p={p} initialTab={initialTab} key={(p.installed ? 'i' : 'n') + initialTab} /></div>
        </div>

        {/* Meta sidebar (WordPress plugin-detail style) */}
        <aside className="panel p-4 h-max space-y-2 text-[12px]" style={SHARP}>
          <div className="section-bar">Details</div>
          <Meta label="Version" value={`v${p.version}`} />
          <Meta label="Author" value={p.author} />
          <Meta label="Category" value={p.category} />
          <Meta label="Status" value={p.active ? 'Active' : p.installed ? 'Inactive' : 'Not installed'} />
          <Meta label="Type" value={p.core ? 'Core (built-in)' : 'Optional add-on'} />
          {p.installed && hasSettings(p) && !p.core && (
            <p className="text-[10.5px] text-poe-text/60 leading-snug pt-1">Use the Settings tab above to configure this plugin.</p>
          )}
          {/* Secondary, desktop-only backup download — clearly NOT the install action. */}
          {IS_DESKTOP && (
            <a href={pluginZipUrl(p.id)} download={`${p.id}.zip`}
              className="text-[11px] text-poe-text/55 hover:text-poe-text inline-flex items-center gap-1.5 pt-1">
              <Download size={12} /> Download package (.zip)
            </a>
          )}
          {IS_DESKTOP && <p className="text-[10px] text-poe-text/45 leading-snug">Backup/sharing only — built-in plugins are managed above.</p>}
          {lockedOnWeb(p) && (
            <p className="text-[10.5px] text-poe-text/55 leading-snug pt-1">This plugin needs the Windows app. Install the desktop app to use it.</p>
          )}
        </aside>
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// INSTALLED LIST (WordPress plugins list-table)
// ---------------------------------------------------------------------------
function InstalledRow({ p, onOpen, onOpenSettings }) {
  const { activate, deactivate, uninstall, updatePlugin } = useLifecycle()
  const settingsAvailable = hasSettings(p)

  return (
    <div
      className={`panel p-3 ${p.active ? 'border-l-2 border-l-poe-gold bg-poe-gold/[0.04]' : ''}`}
      style={SHARP}>
      {/* Update notice strip */}
      {p.hasUpdate && (
        <div className="-mx-3 -mt-3 mb-3 px-3 py-1.5 border-b border-amber-700/40 bg-amber-900/15 flex items-center gap-2 text-[11.5px] text-amber-200">
          <AlertTriangle size={13} className="shrink-0" />
          <span>There's a new version of {p.name} (v{p.version}).</span>
          <button onClick={() => updatePlugin(p.id)} className="text-amber-200 underline hover:text-amber-100">Update now.</button>
        </div>
      )}

      <div className="flex items-start gap-3">
        <IconTile p={p} />
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <button onClick={onOpen} className="gold-heading text-[14px] hover:underline text-left truncate">{p.name}</button>
            {p.active && <CheckCircle2 size={13} className="text-emerald-400 shrink-0" />}
            {p.core && <span className="text-[10px] px-1.5 py-0.5 border border-poe-line text-poe-text/70" style={SHARP}>Core</span>}
          </div>

          {/* WordPress-style action links */}
          <div className="flex items-center gap-2 mt-1 text-[12px]">
            {p.core ? (
              <span className="inline-flex items-center gap-1 text-poe-text/60"><Lock size={12} /> Always on</span>
            ) : (
              <>
                {p.active
                  ? <ActionLink onClick={() => deactivate(p.id)}>Deactivate</ActionLink>
                  : <ActionLink onClick={() => activate(p.id)}>Activate</ActionLink>}
                {settingsAvailable && <><span className="text-poe-line">·</span><ActionLink onClick={onOpenSettings}>Settings</ActionLink></>}
                {/* Delete: hidden for active plugins (WP requires deactivate first). */}
                {!p.active && <><span className="text-poe-line">·</span><ActionLink danger onClick={() => uninstall(p.id)}>Delete</ActionLink></>}
              </>
            )}
          </div>

          <p className="text-[12px] text-poe-text mt-1.5">{p.description}</p>
          <div className="text-[10.5px] text-poe-text/60 mt-1">Version {p.version} · By {p.author}</div>
        </div>

        <button onClick={onOpen} className="btn-dark h-7 text-[11px] shrink-0" style={SHARP}>View details</button>
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// ADD NEW (WordPress "Add Plugins" cards)
// ---------------------------------------------------------------------------
function AddCard({ p, onOpen }) {
  const { install } = useLifecycle()
  const locked = lockedOnWeb(p)
  return (
    <div className="panel flex flex-col overflow-hidden" style={SHARP}>
      <CardCover p={p} />
      <div className="p-3 flex flex-col flex-1">
        <div className="flex items-start gap-2">
          <div className="min-w-0 flex-1">
            <button onClick={onOpen} className="gold-heading text-[14px] hover:underline text-left truncate block">{p.name}</button>
            <div className="text-[10.5px] text-poe-gold-dim mt-0.5">{p.category}</div>
          </div>
          {locked ? (
            <span className="text-[11px] text-poe-text/45 border border-poe-line px-2 py-1 inline-flex items-center gap-1 shrink-0" style={SHARP}>
              <Lock size={11} /> Desktop app only
            </span>
          ) : (
            <button onClick={() => install(p.id)} className="btn-action h-7 text-[11px] inline-flex items-center px-2.5 shrink-0" style={SHARP}>
              <Plus size={12} /> Install Now
            </button>
          )}
        </div>

        <p className="text-[12px] text-poe-text mt-2 flex-1">{p.description}</p>

        {locked && <p className="text-[10.5px] text-poe-text/55 mt-2">Needs the Windows app to install.</p>}

        <div className="flex items-center justify-between gap-2 mt-3 pt-2 border-t border-poe-line/50 text-[10.5px] text-poe-text/60">
          <span>Version {p.version} · By {p.author} · {p.category}</span>
          <button onClick={onOpen} className="text-poe-gold-dim hover:text-poe-gold whitespace-nowrap">More details</button>
        </div>
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Top bar: heading + status filter tabs + Add New + search
// ---------------------------------------------------------------------------
function FilterTab({ id, label, count, active, onClick }) {
  return (
    <button onClick={onClick}
      className={`text-[12.5px] transition-colors ${active ? 'text-poe-gold font-semibold' : 'text-poe-text hover:text-poe-heading'}`}>
      {label} <span className="text-poe-text/50">({count})</span>
    </button>
  )
}

// ===========================================================================
export function PluginsTab() {
  const { plugins } = usePlugins()
  const [openId, setOpenId] = useState(null)
  const [openTab, setOpenTab] = useState('description')
  const [statusFilter, setStatusFilter] = useState('all') // all | active | inactive | updates
  const [showAddNew, setShowAddNew] = useState(false)
  const [query, setQuery] = useState('')

  const open = plugins.find(p => p.id === openId) || null

  const installed = useMemo(() => plugins.filter(p => p.installed), [plugins])
  const notInstalled = useMemo(() => plugins.filter(p => !p.installed), [plugins])

  const counts = useMemo(() => ({
    all: installed.length,
    active: installed.filter(p => p.active).length,
    inactive: installed.filter(p => !p.active).length,
    updates: installed.filter(p => p.hasUpdate).length,
  }), [installed])

  const q = query.trim().toLowerCase()
  const matches = (p) => !q || p.name.toLowerCase().includes(q) || (p.description || '').toLowerCase().includes(q)

  const visibleInstalled = useMemo(() => installed.filter(p => {
    if (!matches(p)) return false
    if (statusFilter === 'active') return p.active
    if (statusFilter === 'inactive') return !p.active
    if (statusFilter === 'updates') return p.hasUpdate
    return true
  }), [installed, statusFilter, q])

  const visibleAddNew = useMemo(() => notInstalled.filter(matches), [notInstalled, q])

  if (open) {
    return <PluginDetail p={open} initialTab={openTab} onBack={() => { setOpenId(null); setOpenTab('description') }} />
  }

  return (
    <div className="space-y-4">
      {/* Top bar */}
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
        <h2 className="gold-heading text-[18px]">Plugins</h2>
        <button onClick={() => setShowAddNew(s => !s)}
          className={`h-7 text-[12px] inline-flex items-center px-2.5 ${showAddNew ? 'btn-action' : 'btn-dark'}`} style={SHARP}>
          <Plus size={13} /> Add New
        </button>

        <div className="flex items-center gap-2.5 ml-1">
          <FilterTab id="all" label="All" count={counts.all} active={statusFilter === 'all'} onClick={() => setStatusFilter('all')} />
          <span className="text-poe-line">|</span>
          <FilterTab id="active" label="Active" count={counts.active} active={statusFilter === 'active'} onClick={() => setStatusFilter('active')} />
          <span className="text-poe-line">|</span>
          <FilterTab id="inactive" label="Inactive" count={counts.inactive} active={statusFilter === 'inactive'} onClick={() => setStatusFilter('inactive')} />
          {counts.updates > 0 && <>
            <span className="text-poe-line">|</span>
            <FilterTab id="updates" label="Updates" count={counts.updates} active={statusFilter === 'updates'} onClick={() => setStatusFilter('updates')} />
          </>}
        </div>

        <div className="ml-auto relative">
          <Search size={13} className="absolute left-2 top-1/2 -translate-y-1/2 text-poe-text/50 pointer-events-none" />
          <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search plugins…"
            className="field h-7 w-52 pl-7" style={SHARP} />
        </div>
      </div>

      {/* ADD NEW directory */}
      {showAddNew && (
        <section className="panel p-4" style={SHARP}>
          <div className="flex items-center justify-between gap-2 mb-3">
            <div className="gold-heading text-[14px]">Add Plugins</div>
            <span className="text-[11px] text-poe-text/60">Built-in add-ons — install to add them to the app.</span>
          </div>
          {visibleAddNew.length === 0 ? (
            <p className="text-[12px] text-poe-text/70">
              {notInstalled.length === 0 ? 'Everything available is already installed.' : 'No plugins match your search.'}
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
              {visibleAddNew.map(p => <AddCard key={p.id} p={p} onOpen={() => setOpenId(p.id)} />)}
            </div>
          )}
        </section>
      )}

      {/* INSTALLED list */}
      <div className="space-y-2">
        {visibleInstalled.length === 0 ? (
          <div className="panel p-6 text-center" style={SHARP}>
            <Puzzle size={20} className="mx-auto text-poe-text/40" />
            <p className="text-[12.5px] text-poe-text mt-2">
              {installed.length === 0
                ? 'No plugins installed yet.'
                : 'No installed plugins match this filter.'}
            </p>
            {notInstalled.length > 0 && !showAddNew && (
              <button onClick={() => setShowAddNew(true)} className="btn-action h-8 text-[12px] inline-flex items-center px-3 mt-3" style={SHARP}>
                <Plus size={13} /> Add New plugins
              </button>
            )}
          </div>
        ) : (
          visibleInstalled.map(p => (
            <InstalledRow key={p.id} p={p}
              onOpen={() => { setOpenTab('description'); setOpenId(p.id) }}
              onOpenSettings={() => { setOpenTab('settings'); setOpenId(p.id) }} />
          ))
        )}
      </div>
    </div>
  )
}

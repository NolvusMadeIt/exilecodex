import React, { useEffect, useState, useCallback } from 'react'
import { Download, Clipboard, Send, FolderInput, RefreshCw, Users, Loader2 } from 'lucide-react'
import { supabase } from '../lib/supabase.js'
import { useFilter } from '../store/FilterStore.jsx'
import { usePrefs } from '../store/Prefs.jsx'
import { useGameInfo } from '../store/GameInfo.jsx'
import { useToast } from '../store/Toast.jsx'
import { useRouter } from '../lib/router.jsx'
import { generateFilter } from '../lib/generate.js'

const safe = (n) => ((n || 'filter').replace(/[^a-z0-9-_. ]/gi, '').trim() || 'filter')
function stampNow() {
  const d = new Date(); const p = (n) => String(n).padStart(2, '0')
  return `${d.getUTCFullYear()}-${p(d.getUTCMonth() + 1)}-${p(d.getUTCDate())} ${p(d.getUTCHours())}:${p(d.getUTCMinutes())} UTC`
}
const fmtDate = (s) => { try { return new Date(s).toLocaleDateString() } catch { return '' } }

export function SharedFiltersPage() {
  const { active, importSettings } = useFilter()
  const { prefs } = usePrefs()
  const gameInfo = useGameInfo()
  const toast = useToast()
  const { navigate } = useRouter()

  const [list, setList] = useState([])
  const [loading, setLoading] = useState(true)
  const [err, setErr] = useState('')
  const [busy, setBusy] = useState(null)
  const [submitting, setSubmitting] = useState(false)
  const [form, setForm] = useState({ name: '', author: '', description: '' })

  const fetchList = useCallback(async () => {
    setLoading(true); setErr('')
    const { data, error } = await supabase
      .from('shared_filters')
      .select('id,name,description,author,game_version,downloads,created_at')
      .order('created_at', { ascending: false })
      .limit(60)
    if (error) setErr(error.message || 'Could not load shared filters.')
    setList(data || [])
    setLoading(false)
  }, [])

  useEffect(() => { fetchList() }, [fetchList])

  const buildText = () => generateFilter(active, {
    ...prefs, gameVersion: gameInfo.gameVersion, gameVersionLabel: gameInfo.gameVersionLabel, _generatedAt: stampNow(),
  })

  const submit = async () => {
    const name = form.name.trim()
    if (!name) { toast.warn('Give your filter a name first.'); return }
    setSubmitting(true)
    try {
      const { error } = await supabase.from('shared_filters').insert({
        name: name.slice(0, 120),
        author: form.author.trim().slice(0, 60) || null,
        description: form.description.trim().slice(0, 2000) || null,
        game_version: gameInfo.gameVersionLabel,
        filter_text: buildText(),
        settings: active,
      })
      if (error) throw error
      toast.success(`"${name}" shared with the community.`, { title: 'Submitted' })
      setForm({ name: '', author: '', description: '' })
      fetchList()
    } catch (e) {
      toast.error('Could not submit: ' + (e?.message || 'unknown error'), { title: 'Submit failed' })
    } finally { setSubmitting(false) }
  }

  const getCol = async (id, col) => {
    const { data, error } = await supabase.from('shared_filters').select(col).eq('id', id).single()
    if (error || !data) throw error || new Error('Not found')
    return data[col]
  }

  const download = async (item) => {
    setBusy(item.id)
    try {
      const text = await getCol(item.id, 'filter_text')
      const blob = new Blob([text], { type: 'text/plain' })
      const url = URL.createObjectURL(blob); const a = document.createElement('a')
      a.href = url; a.download = `${safe(item.name)}.filter`
      document.body.appendChild(a); a.click(); a.remove(); URL.revokeObjectURL(url)
      supabase.rpc('increment_filter_downloads', { filter_id: item.id }).then(() => {}, () => {})
      setList((l) => l.map((x) => (x.id === item.id ? { ...x, downloads: (x.downloads || 0) + 1 } : x)))
      toast.success(`Downloaded "${item.name}".`)
    } catch (e) { toast.error('Download failed: ' + (e?.message || '')) }
    finally { setBusy(null) }
  }

  const copy = async (item) => {
    setBusy(item.id)
    try {
      const text = await getCol(item.id, 'filter_text')
      await navigator.clipboard.writeText(text)
      toast.success(`"${item.name}" copied to clipboard.`, { title: 'Copied' })
    } catch (e) { toast.error('Copy failed: ' + (e?.message || '')) }
    finally { setBusy(null) }
  }

  const loadIntoEditor = async (item) => {
    setBusy(item.id)
    try {
      const settings = await getCol(item.id, 'settings')
      if (!settings) throw new Error('This shared filter has no editable settings.')
      importSettings(settings)
      toast.success(`Loaded "${item.name}" into the editor.`, { title: 'Loaded' })
      navigate('/quick-filters')
    } catch (e) { toast.error('Could not load: ' + (e?.message || '')) }
    finally { setBusy(null) }
  }

  return (
    <div className="space-y-6 max-w-[920px] mx-auto">
      <header className="text-center">
        <h1 className="gold-heading text-[22px] flex items-center justify-center gap-2"><Users size={20} /> Community Filters</h1>
        <p className="text-[12.5px] text-poe-text mt-1 max-w-[640px] mx-auto">
          Share the filter you've built, or grab one from another exile. Download the <code className="font-mono">.filter</code>, copy it, or load it straight into the editor.
        </p>
      </header>

      {/* Submit */}
      <section className="panel p-4">
        <div className="gold-heading text-[14px] mb-2">Share your current filter</div>
        <p className="text-[11.5px] text-poe-text/80 mb-3">
          Publishing <span className="text-poe-text-bright">{active?.name}</span> as it is right now (its full settings + the generated <code className="font-mono">.filter</code>).
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <input className="field h-9" placeholder="Filter name (required)" maxLength={120}
            value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} />
          <input className="field h-9" placeholder="Your name (optional)" maxLength={60}
            value={form.author} onChange={(e) => setForm((f) => ({ ...f, author: e.target.value }))} />
        </div>
        <textarea className="field h-20 mt-3 py-2 text-[12px]" placeholder="Short description (optional) — what's it tuned for?" maxLength={2000}
          value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} />
        <div className="mt-3 flex justify-end">
          <button className="btn-action" onClick={submit} disabled={submitting || !form.name.trim()}>
            {submitting ? <Loader2 size={14} className="animate-spin" /> : <Send size={14} />} Share filter
          </button>
        </div>
      </section>

      {/* List */}
      <section>
        <div className="section-bar flex items-center justify-between">
          <span>Shared by the community {list.length ? `(${list.length})` : ''}</span>
          <button className="text-poe-text hover:text-poe-gold inline-flex items-center gap-1 text-[11px]" onClick={fetchList} title="Refresh">
            <RefreshCw size={12} /> Refresh
          </button>
        </div>

        {loading ? (
          <div className="text-center py-10 text-poe-text text-[12px] flex items-center justify-center gap-2"><Loader2 size={14} className="animate-spin" /> Loading…</div>
        ) : err ? (
          <div className="panel p-4 text-center text-[12px] text-poe-danger">{err}</div>
        ) : list.length === 0 ? (
          <div className="panel p-6 text-center text-[12.5px] text-poe-text">No shared filters yet — be the first to share one above.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
            {list.map((item) => (
              <div key={item.id} className="panel p-3.5 flex flex-col">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <div className="text-poe-text-bright font-medium text-[13.5px] truncate">{item.name}</div>
                    <div className="text-[11px] text-poe-text/70">
                      {item.author ? <>by <span className="text-poe-text-bright">{item.author}</span> · </> : null}
                      {fmtDate(item.created_at)}{item.game_version ? ` · ${item.game_version}` : ''}
                    </div>
                  </div>
                  <span className="shrink-0 inline-flex items-center gap-1 text-[11px] text-poe-text/70" title="Downloads">
                    <Download size={12} /> {item.downloads || 0}
                  </span>
                </div>
                {item.description && <p className="text-[12px] text-poe-text mt-1.5 line-clamp-3">{item.description}</p>}
                <div className="mt-auto pt-3 flex flex-wrap gap-2">
                  <button className="btn-dark h-8" onClick={() => download(item)} disabled={busy === item.id}>
                    {busy === item.id ? <Loader2 size={13} className="animate-spin" /> : <Download size={13} />} Download
                  </button>
                  <button className="btn-dark h-8" onClick={() => copy(item)} disabled={busy === item.id}>
                    <Clipboard size={13} /> Copy
                  </button>
                  <button className="btn-dark h-8" onClick={() => loadIntoEditor(item)} disabled={busy === item.id} title="Load this filter's settings into the editor">
                    <FolderInput size={13} /> Load
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}

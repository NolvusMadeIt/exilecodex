import React, { useEffect, useState, useCallback, useRef } from 'react'
import { Download, Clipboard, Send, FolderInput, RefreshCw, Users, Loader2, Upload, FileText, Wand2 } from 'lucide-react'
import { supabase } from '../lib/supabase.js'
import { useFilter } from '../store/FilterStore.jsx'
import { usePrefs } from '../store/Prefs.jsx'
import { useGameInfo } from '../store/GameInfo.jsx'
import { useToast } from '../store/Toast.jsx'
import { useRouter } from '../lib/router.jsx'
import { useT } from '../i18n/index.js'
import { buildFilter } from '../lib/buildFilter.js'

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
  const t = useT()

  const [list, setList] = useState([])
  const [loading, setLoading] = useState(true)
  const [err, setErr] = useState('')
  const [busy, setBusy] = useState(null)
  const [submitting, setSubmitting] = useState(false)
  const [form, setForm] = useState({ name: '', author: '', description: '' })
  const [mode, setMode] = useState('current') // 'current' | 'paste'
  const [pasteText, setPasteText] = useState('')
  const [dragOver, setDragOver] = useState(false)
  const fileRef = useRef(null)

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

  const buildText = () => buildFilter(active, { gameInfo, prefs, stamp: stampNow() })

  // Read a dropped/selected .filter file into the paste box.
  const readFile = (file) => {
    if (!file) return
    if (!/\.filter$/i.test(file.name)) { toast.warn('That needs to be a .filter file.'); return }
    if (file.size > 200000) { toast.warn('That file is too large (200 KB max).'); return }
    const reader = new FileReader()
    reader.onload = () => {
      setPasteText(String(reader.result || ''))
      setMode('paste')
      setForm((f) => (f.name.trim() ? f : { ...f, name: file.name.replace(/\.filter$/i, '') }))
      toast.success(`Loaded "${file.name}".`)
    }
    reader.onerror = () => toast.error('Could not read that file.')
    reader.readAsText(file)
  }

  const onDrop = (e) => { e.preventDefault(); setDragOver(false); readFile(e.dataTransfer?.files?.[0]) }
  const onDragOver = (e) => { e.preventDefault(); if (!dragOver) setDragOver(true) }
  const onDragLeave = (e) => { e.preventDefault(); setDragOver(false) }

  const pasteReady = mode === 'current' || pasteText.trim().length >= 10
  const canSubmit = !!form.name.trim() && !!form.author.trim() && !!form.description.trim() && pasteReady

  const submit = async () => {
    const name = form.name.trim()
    const author = form.author.trim()
    const description = form.description.trim()
    if (!name) { toast.warn('Give your filter a name.'); return }
    if (!author) { toast.warn('Add your name so people know who made it.'); return }
    if (!description) { toast.warn('Add a short description of your filter.'); return }

    let filter_text, settings
    if (mode === 'paste') {
      filter_text = pasteText.trim()
      if (filter_text.length < 10) { toast.warn('Paste your filter, or upload a .filter file.'); return }
      if (!/(^|\n)\s*(Show|Hide)\b/.test(filter_text)) {
        toast.warn("That doesn't look like a PoE2 filter — no Show / Hide blocks found."); return
      }
      settings = null // raw paste: no editable settings to attach
    } else {
      filter_text = await buildText()
      settings = active
    }

    setSubmitting(true)
    try {
      const { error } = await supabase.from('shared_filters').insert({
        name: name.slice(0, 120),
        author: author.slice(0, 60),
        description: description.slice(0, 2000),
        game_version: gameInfo.gameVersionLabel,
        filter_text: filter_text.slice(0, 200000),
        settings,
      })
      if (error) throw error
      toast.success(`"${name}" shared with the community.`, { title: 'Submitted' })
      setForm({ name: '', author: '', description: '' })
      setPasteText(''); setMode('current')
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
      navigate('/quick-editor')
    } catch (e) { toast.error('Could not load: ' + (e?.message || '')) }
    finally { setBusy(null) }
  }

  return (
    <div className="space-y-6 max-w-[920px] mx-auto">
      <header className="text-center">
        <h1 className="gold-heading text-[22px] flex items-center justify-center gap-2"><Users size={20} /> {t('Community Filters')}</h1>
        <p className="text-[12.5px] text-poe-text mt-1 max-w-[640px] mx-auto">
          Share the filter you've built here — or paste / upload your own <code className="font-mono">.filter</code>. Grab one from another exile by downloading, copying, or loading it straight into the editor.
        </p>
      </header>

      {/* Submit */}
      <section className={`panel p-4 transition-colors ${dragOver ? 'ring-1 ring-poe-gold border-poe-gold' : ''}`}
        onDrop={onDrop} onDragOver={onDragOver} onDragLeave={onDragLeave}>
        <div className="flex items-center justify-between gap-3 mb-3 flex-wrap">
          <div className="gold-heading text-[14px]">{t('Share a filter')}</div>
          <div className="flex rounded overflow-hidden border border-poe-line shrink-0">
            {[['current', 'My current filter'], ['paste', 'Paste / upload']].map(([v, label]) => (
              <button key={v} onClick={() => setMode(v)}
                className={`px-3 h-8 text-[12px] ${mode === v ? 'bg-[#1a2a1a] text-poe-text-bright' : 'bg-black text-poe-text hover:text-poe-heading hover:bg-[#1a1a1c]'}`}>
                {t(label)}
              </button>
            ))}
          </div>
        </div>

        {mode === 'current' ? (
          <p className="text-[11.5px] text-poe-text/80 mb-3">
            Publishing <span className="text-poe-text-bright">{active?.name}</span> as it is right now — its full settings plus the generated <code className="font-mono">.filter</code>. Others can download, copy, or load it straight into their editor.
          </p>
        ) : (
          <div className="mb-3">
            <div
              onClick={() => fileRef.current?.click()}
              className={`rounded border border-dashed p-3 text-center cursor-pointer transition-colors ${dragOver ? 'border-poe-gold bg-poe-gold/5' : 'border-poe-line hover:border-poe-text/40'}`}>
              <div className="flex items-center justify-center gap-2 text-[12px] text-poe-text-bright">
                <Upload size={14} className="text-poe-gold" /> Drag &amp; drop a <code className="font-mono">.filter</code> file here, or click to browse
              </div>
              <div className="text-[11px] text-poe-text/70 mt-0.5">…or just paste the filter text below.</div>
            </div>
            <input ref={fileRef} type="file" accept=".filter" className="hidden"
              onChange={(e) => { readFile(e.target.files?.[0]); e.target.value = '' }} />
            <div className="relative mt-2">
              <textarea className="field h-40 py-2 font-mono text-[11px] leading-snug" maxLength={200000}
                placeholder={'Show\n  Class == "Currency"\n  SetFontSize 40\n  ...'}
                value={pasteText} onChange={(e) => setPasteText(e.target.value)} />
              {pasteText.trim() && (
                <span className="absolute top-2 right-2 inline-flex items-center gap-1 text-[10px] text-poe-text/70 bg-black/70 rounded px-1.5 py-0.5">
                  <FileText size={11} /> {pasteText.trim().length.toLocaleString()} chars
                </span>
              )}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <input className="field h-9" placeholder={t('Filter name (required)')} maxLength={120}
            value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} />
          <input className="field h-9" placeholder={t('Your name (required)')} maxLength={60}
            value={form.author} onChange={(e) => setForm((f) => ({ ...f, author: e.target.value }))} />
        </div>
        <textarea className="field h-20 mt-3 py-2 text-[12px]" placeholder="Description (required) — what's it tuned for? Class, game stage, strictness…" maxLength={2000}
          value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} />
        <div className="mt-3 flex items-center justify-between gap-3">
          <span className="text-[11px] text-poe-text/60 inline-flex items-center gap-1">
            <Wand2 size={12} /> {mode === 'paste' ? 'Pasted filters are shared as-is (no editable settings).' : 'Shared with editable settings.'}
          </span>
          <button className="btn-action" onClick={submit} disabled={submitting || !canSubmit}>
            {submitting ? <Loader2 size={14} className="animate-spin" /> : <Send size={14} />} {t('Share filter')}
          </button>
        </div>
      </section>

      {/* List */}
      <section>
        <div className="section-bar flex items-center justify-between">
          <span>{t('Shared by the community')} {list.length ? `(${list.length})` : ''}</span>
          <button className="text-poe-text hover:text-poe-gold inline-flex items-center gap-1 text-[11px]" onClick={fetchList} title={t('Refresh')}>
            <RefreshCw size={12} /> {t('Refresh')}
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
                    {busy === item.id ? <Loader2 size={13} className="animate-spin" /> : <Download size={13} />} {t('Download')}
                  </button>
                  <button className="btn-dark h-8" onClick={() => copy(item)} disabled={busy === item.id}>
                    <Clipboard size={13} /> {t('Copy')}
                  </button>
                  <button className="btn-dark h-8" onClick={() => loadIntoEditor(item)} disabled={busy === item.id} title="Load this filter's settings into the editor">
                    <FolderInput size={13} /> {t('Load')}
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

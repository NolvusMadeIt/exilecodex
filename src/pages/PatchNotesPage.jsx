import React, { useEffect, useState } from 'react'
import { ScrollText, Loader2, ExternalLink } from 'lucide-react'
import { PATCHES } from '../data/patchNotes.js'
import { Markdown } from '../components/Markdown.jsx'

const fmtDate = (s) => {
  if (!s) return ''
  const [y, m, d] = String(s).split('-').map(Number)
  if (!y || !m || !d) return s
  return new Date(Date.UTC(y, m - 1, d)).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric', timeZone: 'UTC' })
}

// Per-patch notes are fetched once from our own /patchnotes/<version>.md (same-origin, cached) —
// no external calls, works offline. Cached in-memory so re-selecting a patch is instant.
const cache = new Map()
function useNotes(version, hasNotes) {
  const [state, setState] = useState({ loading: false, md: '', error: false })
  useEffect(() => {
    if (!hasNotes) { setState({ loading: false, md: '', error: false }); return }
    if (cache.has(version)) { setState({ loading: false, md: cache.get(version), error: false }); return }
    let alive = true
    setState({ loading: true, md: '', error: false })
    fetch(`/patchnotes/${version}.md`)
      .then(r => r.ok ? r.text() : Promise.reject(new Error(String(r.status))))
      .then(t => { cache.set(version, t); if (alive) setState({ loading: false, md: t, error: false }) })
      .catch(() => { if (alive) setState({ loading: false, md: '', error: true }) })
    return () => { alive = false }
  }, [version, hasNotes])
  return state
}

export function PatchNotesPage() {
  const [selected, setSelected] = useState(() => (PATCHES.find(p => p.current) || PATCHES[0])?.version)
  const patch = PATCHES.find(p => p.version === selected) || PATCHES[0]
  const { loading, md, error } = useNotes(patch.version, !!patch.notes)

  return (
    <div className="space-y-4">
      <header className="text-center">
        <h1 className="gold-heading text-[22px]">Patch Notes</h1>
        <p className="text-[12px] text-poe-text mt-1 max-w-[680px] mx-auto">
          Every Path of Exile 2 patch from Early Access to now — read them right here. Pick a version on the left.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-[230px_1fr] gap-4">
        {/* version selector */}
        <div className="md:max-h-[calc(100vh-230px)] md:overflow-y-auto pr-1 space-y-1.5">
          {PATCHES.map(p => {
            const on = p.version === selected
            return (
              <button key={p.version} onClick={() => setSelected(p.version)}
                className={`w-full text-left rounded-lg border px-3 py-2 transition-colors ${on ? 'border-poe-gold shadow-glow bg-white/[0.04]' : 'border-poe-line hover:border-poe-gold-dim hover:bg-[#1a1a1c]'}`}>
                <div className="flex items-center gap-2">
                  <span className={`font-mono text-[14px] ${on ? 'text-poe-gold' : 'text-poe-text-bright'}`}>{p.version}</span>
                  {p.current && <span className="text-[9px] uppercase tracking-wide bg-poe-gold/90 text-black px-1 rounded-sm">Current</span>}
                  {p.major && !p.current && <span className="text-[9px] uppercase tracking-wide text-poe-gold-dim border border-poe-gold-dim/50 px-1 rounded-sm">Major</span>}
                </div>
                <div className="text-[11px] text-poe-text mt-0.5 truncate">{p.codename || p.season || 'Patch'}{p.date ? ` · ${fmtDate(p.date)}` : ''}</div>
              </button>
            )
          })}
        </div>

        {/* detail */}
        <div className="panel p-4 min-h-[300px]">
          <div className="flex items-center gap-2 pb-3 border-b border-poe-line">
            <span className="w-8 h-8 grid place-items-center rounded-lg bg-poe-gold/10 border border-poe-gold-dim/50 text-poe-gold shrink-0"><ScrollText size={16} /></span>
            <div>
              <h2 className="gold-heading text-[19px] leading-tight">Patch {patch.version}{patch.codename ? ` — ${patch.codename}` : ''}</h2>
              <p className="text-[11.5px] text-poe-text">{patch.season && !patch.codename ? `${patch.season} season` : 'Path of Exile 2'}{patch.date ? ` · ${fmtDate(patch.date)}` : ''}</p>
            </div>
            {patch.current && <span className="ml-auto text-[10px] uppercase tracking-wide bg-poe-gold/90 text-black px-1.5 py-0.5 rounded-sm self-start">Current</span>}
          </div>

          {/* notes body */}
          <div className="pt-3">
            {!patch.notes ? (
              <p className="text-[12.5px] text-poe-text/80">Full notes for this patch are being added. Check back soon.</p>
            ) : loading ? (
              <div className="flex items-center gap-2 text-[12px] text-poe-text py-6"><Loader2 size={15} className="animate-spin text-poe-gold" /> Loading notes…</div>
            ) : error ? (
              <p className="text-[12.5px] text-poe-danger">Couldn’t load these notes. Please try again.</p>
            ) : (
              <Markdown source={md} />
            )}
          </div>

          {/* hotfixes (in-app list, no external links) */}
          {patch.hotfixes?.length > 0 && (
            <div className="mt-5">
              <div className="section-bar">Hotfixes &amp; follow-ups</div>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 mt-1">
                {patch.hotfixes.map((h, i) => (
                  <li key={i} className="flex items-center justify-between gap-2 rounded-lg border border-poe-line bg-black/30 px-3 py-1.5">
                    <span className="text-[12.5px] text-poe-text-bright truncate">{h.label}</span>
                    {h.date && <span className="text-[10.5px] text-poe-text/70 font-mono shrink-0">{fmtDate(h.date)}</span>}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {patch.url && (
            <p className="text-[10.5px] text-poe-text/45 mt-5">
              Source: official Path of Exile forum (<a href={patch.url} target="_blank" rel="noreferrer" className="hover:text-poe-text/70 underline-offset-2 hover:underline inline-flex items-center gap-0.5">{patch.version} thread <ExternalLink size={10} /></a>).
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

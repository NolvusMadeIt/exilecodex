import React, { useState } from 'react'
import { ExternalLink, ScrollText } from 'lucide-react'
import { PATCHES, PATCH_NOTES_FORUM } from '../data/patchNotes.js'

const fmtDate = (s) => {
  if (!s) return ''
  const [y, m, d] = String(s).split('-').map(Number)
  if (!y || !m || !d) return s
  // Render in UTC so a plain YYYY-MM-DD never shifts a day in a behind-UTC timezone.
  return new Date(Date.UTC(y, m - 1, d)).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric', timeZone: 'UTC' })
}

// Opens the official thread in the system browser (desktop) / a new tab (web).
const Out = ({ href, children, className = '' }) => (
  <a href={href} target="_blank" rel="noreferrer" className={className}>{children}</a>
)

export function PatchNotesPage() {
  const [selected, setSelected] = useState(() => (PATCHES.find(p => p.current) || PATCHES[0])?.version)
  const patch = PATCHES.find(p => p.version === selected) || PATCHES[0]

  return (
    <div className="space-y-4">
      <header className="text-center">
        <h1 className="gold-heading text-[22px]">Patch Notes</h1>
        <p className="text-[12px] text-poe-text mt-1 max-w-[680px] mx-auto">
          Every Path of Exile 2 patch from Early Access to now. Pick a version on the left — notes open on the
          <Out href={PATCH_NOTES_FORUM} className="text-poe-gold hover:underline"> official forum</Out>.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-[230px_1fr] gap-4">
        {/* version selector */}
        <div className="md:max-h-[calc(100vh-230px)] md:overflow-y-auto pr-1 space-y-1.5">
          {PATCHES.map(p => {
            const on = p.version === selected
            return (
              <button key={p.version} onClick={() => setSelected(p.version)}
                className={`w-full text-left rounded-lg border px-3 py-2 transition-colors ${on ? 'border-poe-gold shadow-glow bg-poe-gold/5' : 'border-poe-line hover:border-poe-gold-dim hover:bg-[#1a1a1c]'}`}>
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
        <div className="panel p-4 min-h-[260px]">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 grid place-items-center rounded-lg bg-poe-gold/10 border border-poe-gold-dim/50 text-poe-gold shrink-0"><ScrollText size={16} /></span>
                <h2 className="gold-heading text-[19px]">Patch {patch.version}</h2>
                {patch.current && <span className="text-[10px] uppercase tracking-wide bg-poe-gold/90 text-black px-1.5 py-0.5 rounded-sm">Current</span>}
              </div>
              <p className="text-[12.5px] text-poe-text mt-1.5">
                {patch.codename ? <span className="text-poe-text-bright">{patch.codename}</span> : (patch.season ? <>Part of the <span className="text-poe-text-bright">{patch.season}</span> season</> : 'Patch notes')}
                {patch.date ? ` · ${fmtDate(patch.date)}` : ''}
              </p>
            </div>
            <Out href={patch.url} className="btn-action h-9 text-[12.5px] shrink-0">
              Read full patch notes <ExternalLink size={14} />
            </Out>
          </div>

          {patch.hotfixes?.length > 0 && (
            <div className="mt-4">
              <div className="section-bar">Hotfixes &amp; follow-ups</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 mt-1">
                {patch.hotfixes.map((h, i) => (
                  <Out key={i} href={h.url}
                    className="group flex items-center justify-between gap-2 rounded-lg border border-poe-line bg-black/30 px-3 py-1.5 hover:border-poe-gold-dim hover:bg-[#1a1a1c]">
                    <span className="text-[12.5px] text-poe-text-bright truncate">{h.label}</span>
                    <span className="flex items-center gap-2 shrink-0">
                      {h.date && <span className="text-[10.5px] text-poe-text/70 font-mono">{fmtDate(h.date)}</span>}
                      <ExternalLink size={13} className="text-poe-text/50 group-hover:text-poe-gold" />
                    </span>
                  </Out>
                ))}
              </div>
            </div>
          )}

          <p className="text-[11px] text-poe-text/60 mt-4">
            Patch notes are hosted by Grinding Gear Games — each link opens the official thread on pathofexile.com.
          </p>
        </div>
      </div>
    </div>
  )
}

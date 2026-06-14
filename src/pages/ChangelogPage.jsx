import React, { useMemo, useState } from 'react'
import { CHANGELOG } from '../data/changelog.js'

const TAG_COLORS = {
  Release: 'bg-poe-gold/15 text-poe-gold border-poe-gold-dim/60',
  Imports: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/40',
  Foundation: 'bg-sky-500/10 text-sky-300 border-sky-500/40',
  Fix: 'bg-rose-500/10 text-rose-300 border-rose-500/40',
  Note: 'bg-slate-500/10 text-slate-300 border-slate-500/40',
}

export function ChangelogPage() {
  const [tag, setTag] = useState('All')
  const tags = useMemo(() => ['All', ...new Set(CHANGELOG.map(e => e.tag))], [])
  const entries = tag === 'All' ? CHANGELOG : CHANGELOG.filter(e => e.tag === tag)

  return (
    <div className="space-y-5">
      <header className="text-center">
        <h1 className="gold-heading text-[22px]">Changelog</h1>
        <p className="text-[12px] text-poe-text mt-1">
          Updates to Nolvus's Filter, in the spirit of <span className="text-poe-text-bright">GGG's Bluetracker feed</span>. Newest first.
        </p>
      </header>

      <div className="flex flex-wrap gap-2 justify-center">
        {tags.map(t => (
          <button
            key={t}
            onClick={() => setTag(t)}
            className={`px-2.5 h-7 text-[11.5px] rounded-full border ${tag === t ? 'border-poe-gold text-poe-gold bg-poe-gold/10' : 'border-poe-line text-poe-text hover:border-poe-gold-dim hover:text-poe-text-bright'}`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="relative pl-4 ml-2 border-l-2 border-poe-line space-y-5">
        {entries.map((e, i) => (
          <article key={i} className="relative">
            <span className="absolute -left-[21px] top-2 w-3 h-3 rounded-full bg-poe-bg border-2 border-poe-gold" />
            <div className="panel p-3.5">
              <div className="flex flex-wrap items-center gap-2 mb-1.5">
                <time className="font-mono text-[11px] text-poe-text">{e.date}</time>
                <span className={`px-1.5 py-0.5 text-[10px] uppercase tracking-wide rounded border ${TAG_COLORS[e.tag] || TAG_COLORS.Note}`}>
                  {e.tag}
                </span>
                <h2 className="heading text-[14.5px] text-poe-text-bright">{e.title}</h2>
              </div>
              <ul className="space-y-1 text-[12.5px] text-poe-text">
                {e.body.map((line, j) => (
                  <li key={j} className="pl-3 relative before:absolute before:left-0 before:top-2 before:w-1 before:h-1 before:rounded-full before:bg-poe-gold/70">
                    {line}
                  </li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}

import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Search, BookOpen, CornerDownRight } from 'lucide-react'
import { useRouter } from '../../lib/router.jsx'
import { installXileShim } from '../../xilehud/adapter.ts'

// The keyword glossary as a real wiki: an A–Z index on the left, the selected entry as an
// article on the right — cross-references inside articles are live links (the upstream module
// stripped them), every entry lists what references it back, and entries deep-link via
// ?panel=glossar&kw=<slug> so the browser back button walks your reading trail.
// Renderer is ours; the keyword dataset is XileHUD's (GPL-3.0, see ATTRIBUTION.md).

// Tag → semantic color token (theme vars from index.css). Tags whose nature has no game
// element keep the muted gold trim so nothing shouts that shouldn't.
const TAG_TOKENS = {
  Fire: '--el-fire', Cold: '--el-cold', Lightning: '--el-lightning', Chaos: '--el-chaos',
  Life: '--el-life', Mana: '--el-mana', 'Energy Shield': '--el-es', Physical: '--el-phys',
  Attributes: '--attr-str', Minion: '--el-chaos', Resistances: '--el-fire',
}
const TAG_ORDER = [
  'Damage', 'Physical', 'Fire', 'Cold', 'Lightning', 'Chaos', 'Ailments', 'Life', 'Mana',
  'Energy Shield', 'Defences', 'Resistances', 'Attributes', 'Critical', 'Attack', 'Spell',
  'Projectile', 'Area', 'Minion', 'Mechanics',
]

function deriveTags(entry) {
  const text = `${entry.name || ''} ${entry.description_plain || ''}`
  const tags = []
  const has = (re) => re.test(text)
  if (has(/Damage/i)) tags.push('Damage')
  if (has(/\bPhysical\b/i)) tags.push('Physical')
  if (has(/\bFire\b/i)) tags.push('Fire')
  if (has(/\bCold\b|Chill|Freeze/i)) tags.push('Cold')
  if (has(/Lightning|Shock|Electrocute/i)) tags.push('Lightning')
  if (has(/\bChaos\b/i)) tags.push('Chaos')
  if (has(/Ailment|Bleed|Ignite|Poison|Stun/i)) tags.push('Ailments')
  if (has(/\bLife\b/i)) tags.push('Life')
  if (has(/\bMana\b/i)) tags.push('Mana')
  if (has(/Energy Shield/i)) tags.push('Energy Shield')
  if (has(/Armour|Armor|Evasion|Block/i)) tags.push('Defences')
  if (has(/Resist/i)) tags.push('Resistances')
  if (has(/Attribute|Strength|Dexterity|Intelligence/i)) tags.push('Attributes')
  if (has(/Critical/i)) tags.push('Critical')
  if (has(/\bAttack\b/i)) tags.push('Attack')
  if (has(/Spell|\bCast\b/i)) tags.push('Spell')
  if (has(/Projectile/i)) tags.push('Projectile')
  if (has(/\bArea\b/i)) tags.push('Area')
  if (has(/Minion/i)) tags.push('Minion')
  if (has(/Trap|Totem|Trigger|Curse|Aura/i)) tags.push('Mechanics')
  return tags
}

const tagColor = (tag) => `rgb(var(${TAG_TOKENS[tag] || '--c-accent'}))`
const tagBg = (tag, a = 0.12) => `rgb(var(${TAG_TOKENS[tag] || '--c-accent'}) / ${a})`

// Rewrite an article's HTML for our page: wiki cross-reference anchors become internal links
// (unknown targets unwrap to plain text), wiki hover-cache attributes drop, and numeric values
// get the bright treatment so the stats stand out from prose.
function articleHtml(entry, bySlug) {
  const doc = new DOMParser().parseFromString(entry.description_html || '', 'text/html')
  doc.querySelectorAll('a').forEach((a) => {
    const slug = (a.getAttribute('href') || a.getAttribute('data-keyword') || '').replace(/^.*\//, '')
    const target = bySlug.get(slug) || bySlug.get(a.getAttribute('data-keyword') || '')
    if (target) {
      a.setAttribute('href', `#/crafting?panel=glossar&kw=${encodeURIComponent(target.slug)}`)
      a.setAttribute('data-kw', target.slug)
      a.className = 'kw-link'
      for (const attr of ['data-hover', 'data-keyword', 'target', 'rel']) a.removeAttribute(attr)
    } else {
      a.replaceWith(...a.childNodes)
    }
  })
  let html = doc.body.innerHTML
  html = html.replace(/(?<![\w>])([+\-]?\d+(?:\.\d+)?(?:\s*[–-]\s*\d+(?:\.\d+)?)?%?)(?![\w<])/g, '<span class="kw-num">$1</span>')
  return html
}

export function GlossaryPanel() {
  const { query, navigate } = useRouter()
  const [entries, setEntries] = useState(null)
  const [error, setError] = useState('')
  const [search, setSearch] = useState('')
  const [activeTags, setActiveTags] = useState([])
  const articleRef = useRef(null)

  useEffect(() => {
    installXileShim()
    let alive = true
    ;(async () => {
      try {
        const data = await window.electronAPI.getKeywords()
        if (!alive) return
        // The export contains a few duplicate slugs (shorter stub + fuller article) and dev
        // placeholder rows ([DNT] "Fill me in") — keep one entry per slug, preferring the
        // fuller description.
        const seen = new Map()
        for (const e of data?.entries || data?.keywords || []) {
          if (/^\[DNT/i.test(e.name || '')) continue
          const prev = seen.get(e.slug)
          if (!prev || (e.description_plain || '').length > (prev.description_plain || '').length) seen.set(e.slug, e)
        }
        const list = [...seen.values()].map((e) => ({ ...e, tags: deriveTags(e) }))
        list.sort((a, b) => a.name.localeCompare(b.name))
        setEntries(list)
      } catch (e) {
        if (alive) setError(String(e?.message || e))
      }
    })()
    return () => { alive = false }
  }, [])

  const bySlug = useMemo(() => {
    const m = new Map()
    for (const e of entries || []) m.set(e.slug, e)
    return m
  }, [entries])

  // Wiki backlinks: which articles reference this one.
  const backlinks = useMemo(() => {
    const m = new Map()
    for (const e of entries || []) {
      for (const [, ref] of (e.description_html || '').matchAll(/(?:href|data-keyword)="([^"]*?)"/g)) {
        const slug = ref.replace(/^.*\//, '')
        if (slug && slug !== e.slug && (entries || []).length) {
          if (!m.has(slug)) m.set(slug, [])
          if (!m.get(slug).some((x) => x.slug === e.slug)) m.get(slug).push(e)
        }
      }
    }
    return m
  }, [entries])

  const selected = bySlug.get(query?.kw) || null

  const filtered = useMemo(() => {
    const f = search.toLowerCase().trim()
    return (entries || []).filter((e) => {
      if (activeTags.length && !activeTags.every((t) => e.tags.includes(t))) return false
      return !f || e.name.toLowerCase().includes(f) || (e.description_plain || '').toLowerCase().includes(f)
    })
  }, [entries, search, activeTags])

  // A–Z groups for the index rail.
  const groups = useMemo(() => {
    const g = new Map()
    for (const e of filtered) {
      const letter = /^[a-z]/i.test(e.name) ? e.name[0].toUpperCase() : '#'
      if (!g.has(letter)) g.set(letter, [])
      g.get(letter).push(e)
    }
    return [...g.entries()]
  }, [filtered])

  const open = (slug) => navigate(`/crafting?panel=glossar&kw=${encodeURIComponent(slug)}`)

  // Clicks on cross-links inside the article stay in the panel (the href still middle-clicks).
  useEffect(() => {
    const el = articleRef.current
    if (!el) return
    const onClick = (e) => {
      const a = e.target.closest?.('a[data-kw]')
      if (!a) return
      e.preventDefault()
      open(a.getAttribute('data-kw'))
    }
    el.addEventListener('click', onClick)
    return () => el.removeEventListener('click', onClick)
  }, [entries, selected])

  useEffect(() => { articleRef.current?.scrollTo?.(0, 0) }, [selected])

  if (error) return <div className="py-6 text-[12.5px] text-poe-danger">Couldn’t load the glossary ({error}).</div>
  if (!entries) return <div className="py-2 text-[12.5px] text-poe-text/60">Loading…</div>

  const refs = selected ? (backlinks.get(selected.slug) || []) : []

  return (
    <div className="flex min-h-0 flex-1 gap-4">
      {/* Index rail — search, nature filters, A–Z list */}
      <aside className="flex w-[300px] shrink-0 flex-col min-h-0">
        <div className="relative">
          <Search size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-poe-text/40" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={`Search ${entries.length} keywords…`}
            className="h-8 w-full rounded border border-poe-line bg-black/30 pl-8 pr-2 text-[12.5px] text-poe-text-bright placeholder:text-poe-text/35 focus:border-poe-gold-dim/60 focus:outline-none"
          />
        </div>
        <div className="mt-2 flex flex-wrap gap-1">
          {TAG_ORDER.map((tag) => {
            const on = activeTags.includes(tag)
            return (
              <button
                key={tag}
                onClick={() => setActiveTags(on ? activeTags.filter((t) => t !== tag) : [...activeTags, tag])}
                className="rounded-sm border px-1.5 py-0.5 text-[10.5px] leading-4 transition-colors"
                style={{
                  color: on ? tagColor(tag) : 'rgb(var(--c-text) / 0.65)',
                  borderColor: on ? tagColor(tag) : 'rgb(var(--c-line))',
                  background: on ? tagBg(tag, 0.16) : 'transparent',
                }}
              >
                {tag}
              </button>
            )
          })}
        </div>
        <div className="mt-2 min-h-0 flex-1 overflow-y-auto rounded border border-poe-line/60 bg-black/20">
          {groups.map(([letter, list]) => (
            <div key={letter}>
              <div className="sticky top-0 z-10 border-b border-poe-line/50 bg-poe-panel px-2.5 py-1 font-display text-[12px] tracking-wide text-poe-gold-dim">{letter}</div>
              {list.map((e) => (
                <button
                  key={e.slug}
                  onClick={() => open(e.slug)}
                  className={`block w-full truncate px-2.5 py-[5px] text-left text-[12.5px] transition-colors hover:bg-white/[0.04] ${
                    selected?.slug === e.slug ? 'bg-poe-gold/10 text-poe-gold' : 'text-poe-text'
                  }`}
                >
                  {e.name}
                </button>
              ))}
            </div>
          ))}
          {!filtered.length && <div className="px-3 py-4 text-[12px] text-poe-text/50">No keywords match.</div>}
        </div>
      </aside>

      {/* Article */}
      <div ref={articleRef} className="min-h-0 min-w-0 flex-1 overflow-y-auto">
        {selected ? (
          <article className="max-w-[820px]">
            <header className="border-b border-poe-line/70 pb-2">
              <h1 className="gold-heading text-[24px] leading-tight">{selected.name}</h1>
              {selected.tags.length > 0 && (
                <div className="mt-1.5 flex flex-wrap gap-1">
                  {selected.tags.map((tag) => (
                    <span key={tag} className="rounded-sm border px-1.5 py-0.5 text-[10.5px] leading-4"
                      style={{ color: tagColor(tag), borderColor: tagBg(tag, 0.5), background: tagBg(tag, 0.1) }}>
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </header>
            <div
              className="kw-article mt-3 text-[13px] leading-[1.65] text-poe-text"
              dangerouslySetInnerHTML={{ __html: articleHtml(selected, bySlug) }}
            />
            {refs.length > 0 && (
              <>
                <div className="section-bar mt-6">Referenced by</div>
                <div className="flex flex-wrap gap-x-4 gap-y-1">
                  {refs.map((e) => (
                    <button key={e.slug} onClick={() => open(e.slug)}
                      className="inline-flex items-center gap-1 text-[12.5px] text-poe-gold-dim hover:text-poe-gold">
                      <CornerDownRight size={11} className="opacity-50" /> {e.name}
                    </button>
                  ))}
                </div>
              </>
            )}
          </article>
        ) : (
          <div className="max-w-[820px]">
            <div className="flex items-center gap-2">
              <BookOpen size={18} className="text-poe-gold-dim" />
              <h1 className="gold-heading text-[20px]">Keyword Glossary</h1>
            </div>
            <p className="mt-1.5 text-[13px] leading-relaxed text-poe-text">
              Every game keyword, cross-linked like a wiki — {entries.length} entries. Pick one from the
              index, search, or start from a damage type below; inside an article every underlined term
              is a link, and “Referenced by” walks you back up.
            </p>
            <div className="section-bar mt-5">Start somewhere</div>
            <div className="flex flex-wrap gap-1.5">
              {['Physical_Damage', 'Fire_Damage', 'Cold_Damage', 'Lightning_Damage', 'Chaos_Damage',
                'Critical_Hit', 'Energy_Shield', 'Resistances', 'Ailments', 'Stun'].filter((s) => bySlug.has(s)).map((slug) => {
                const e = bySlug.get(slug)
                const tag = e.tags.find((t) => TAG_TOKENS[t]) || e.tags[0]
                return (
                  <button key={slug} onClick={() => open(slug)}
                    className="rounded border px-2.5 py-1.5 text-[12.5px] transition-colors hover:brightness-110"
                    style={{ color: tagColor(tag), borderColor: tagBg(tag, 0.5), background: tagBg(tag, 0.08) }}>
                    {e.name}
                  </button>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

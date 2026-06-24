import React, { useMemo } from 'react'

// Minimal, dependency-free Markdown for patch notes: ##/### headings, "- " bullet lists (one
// level of nesting via indentation), **bold**, and paragraphs. No runtime deps, fast to render.
function inline(text) {
  return text.split(/(\*\*[^*]+\*\*)/g).map((p, i) =>
    p.startsWith('**') && p.endsWith('**')
      ? <strong key={i} className="text-poe-text-bright">{p.slice(2, -2)}</strong>
      : <React.Fragment key={i}>{p}</React.Fragment>)
}

function parse(src) {
  const lines = String(src || '').replace(/\r/g, '').split('\n')
  const blocks = []
  let list = null
  let para = []
  const flushPara = () => { if (para.length) { blocks.push({ t: 'p', text: para.join(' ') }); para = [] } }
  const flushList = () => { if (list) { blocks.push(list); list = null } }
  for (const raw of lines) {
    const line = raw.replace(/\s+$/, '')
    if (!line.trim()) { flushPara(); flushList(); continue }
    let m
    if ((m = line.match(/^(#{1,4})\s+(.*)$/))) { flushPara(); flushList(); blocks.push({ t: 'h', level: m[1].length, text: m[2] }); continue }
    if ((m = line.match(/^(\s*)[-*]\s+(.*)$/))) {
      flushPara()
      if (!list) list = { t: 'ul', items: [] }
      list.items.push({ depth: m[1].length >= 2 ? 1 : 0, text: m[2] })
      continue
    }
    flushList()
    para.push(line.trim())
  }
  flushPara(); flushList()
  return blocks
}

export function Markdown({ source }) {
  const blocks = useMemo(() => parse(source), [source])
  return (
    <div className="space-y-3">
      {blocks.map((b, i) => {
        if (b.t === 'h') {
          return b.level <= 2
            ? <h3 key={i} className="gold-heading text-[15px] pt-1">{inline(b.text)}</h3>
            : <h4 key={i} className="heading text-[13px] text-poe-text-bright pt-0.5">{inline(b.text)}</h4>
        }
        if (b.t === 'p') return <p key={i} className="text-[12.5px] text-poe-text leading-relaxed">{inline(b.text)}</p>
        return (
          <ul key={i} className="space-y-1">
            {b.items.map((it, j) => (
              <li key={j}
                className={`text-[12.5px] text-poe-text leading-snug relative pl-3 ${it.depth ? 'ml-6 before:bg-poe-text/40' : 'ml-3 before:bg-poe-gold/70'} before:absolute before:left-0 before:top-[7px] before:w-1 before:h-1 before:rounded-full`}>
                {inline(it.text)}
              </li>
            ))}
          </ul>
        )
      })}
    </div>
  )
}

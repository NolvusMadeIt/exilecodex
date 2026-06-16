import React, { useEffect, useMemo, useState } from 'react'
import { ChevronDown, ChevronRight, ChevronsDownUp, ChevronsUpDown } from 'lucide-react'
import { useFilter } from '../store/FilterStore.jsx'
import { usePrefs } from '../store/Prefs.jsx'
import { SECTIONS, TIERS, CLASS_GROUPS } from '../data/quickFilters.js'
import { CLASSES, iconFor } from '../data/items.js'
import { Toggle, Help } from '../components/primitives.jsx'
import { ItemDropdown } from '../components/ItemDropdown.jsx'
import { MultiSelect } from '../components/MultiSelect.jsx'
import { SimpleSelect } from '../components/SimpleSelect.jsx'
import { useT } from '../i18n/index.js'

const classOptions = (group) => CLASS_GROUPS[group].map(name => {
  const c = CLASSES.find(c => c.name === name)
  return { name, icon: iconFor(c?.cat) }
})

function activeCount(section, qf) {
  let n = 0
  for (const r of section.rows) {
    const v = qf[r.key]
    if (r.control === 'toggle' && v) n++
    else if ((r.control === 'classItems' || r.control === 'multi') && Array.isArray(v) && v.length) n++
    else if (r.control === 'select' && v && v !== 'all') n++
    else if (r.control === 'number' && v > 0 && v !== r.min) n++
  }
  return n
}

// NOTE: Row and Section are defined at module scope (not inside the page component) so
// they keep a stable identity across renders. If they were inline, every quick-filter
// change would remount the whole tree and collapse any open dropdown.
function Row({ row, qf, setQF }) {
  const v = qf[row.key]
  return (
    <div className="flex items-center gap-2 min-h-[28px]">
      {row.control === 'toggle' && (
        <Toggle checked={!!v} onChange={val => setQF(row.key, val)} label={row.label} help={row.help} />
      )}
      {row.control !== 'toggle' && (
        <>
          <span className="text-[13px] text-poe-text-bright flex items-center gap-1.5 min-w-[180px]">{row.label} <Help text={row.help} /></span>
          {row.control === 'number' && (
            <div className="flex items-center gap-1">
              <input type="number" min={row.min} max={row.max} value={v}
                onChange={e => setQF(row.key, Math.max(row.min ?? 0, Number(e.target.value) || 0))}
                className="field h-7 w-16" />
              {row.suffix && <span className="text-[11px] text-poe-text">{row.suffix}</span>}
            </div>
          )}
          {row.control === 'tier' && (
            <SimpleSelect value={v} onChange={val => setQF(row.key, val)} className="w-20"
              options={TIERS.map(t => ({ value: t, label: `≥ ${t}` }))} />
          )}
          {row.control === 'select' && (
            <SimpleSelect value={v} onChange={val => setQF(row.key, val)} className="w-36" options={row.options} />
          )}
          {row.control === 'multi' && (
            <MultiSelect options={row.options} value={v || []} onChange={val => setQF(row.key, val)}
              allLabel={row.allLabel || 'None'} width={230} />
          )}
          {row.control === 'classItems' && (
            <ItemDropdown options={classOptions(row.group)} value={v || []} onChange={val => setQF(row.key, val)}
              allLabel="None selected" width={230} />
          )}
        </>
      )}
    </div>
  )
}

function Section({ section, open, count, onToggle, qf, setQF }) {
  const t = useT()
  return (
    <div className="panel">
      <button onClick={() => onToggle(section.id)} className="w-full flex items-center gap-2 px-3 py-2 hover:bg-white/[0.03]">
        {open ? <ChevronDown size={15} className="text-poe-gold-dim" /> : <ChevronRight size={15} className="text-poe-gold-dim" />}
        <span className="gold-heading text-[15px] flex-1 text-left">{t(section.title)}</span>
        <span className="text-[11px] text-poe-text">{count} {t('active')}</span>
      </button>
      {open && (
        <div className="px-3 pb-2 pt-1 border-t border-poe-line space-y-1.5">
          {section.rows.map(r => <Row key={r.key} row={r} qf={qf} setQF={setQF} />)}
        </div>
      )}
    </div>
  )
}

export function QuickFiltersPage() {
  const { active, updateSlice } = useFilter()
  const { prefs, update } = usePrefs()
  const t = useT()
  const qf = active.quickFilters
  // Remember which sections you left open, falling back to the accordionsOpen default first run.
  const [openIds, setOpenIds] = useState(() =>
    Array.isArray(prefs.qfOpenSections)
      ? new Set(prefs.qfOpenSections)
      : (prefs.accordionsOpen ? new Set(SECTIONS.map(s => s.id)) : new Set())
  )
  useEffect(() => { update({ qfOpenSections: [...openIds] }) }, [openIds]) // eslint-disable-line react-hooks/exhaustive-deps
  const toggleOpen = (id) => setOpenIds(s => { const n = new Set(s); n.has(id) ? n.delete(id) : n.add(id); return n })
  const expandAll = () => setOpenIds(new Set(SECTIONS.map(s => s.id)))
  const collapseAll = () => setOpenIds(new Set())
  const setQF = (key, val) => updateSlice('quickFilters', { [key]: val })

  const sectionCounts = useMemo(() => {
    const counts = {}
    for (const s of SECTIONS) counts[s.id] = activeCount(s, qf)
    return counts
  }, [qf])

  const left = SECTIONS.filter(s => s.col === 'left')
  const right = SECTIONS.filter(s => s.col === 'right')
  const render = (s) => (
    <Section key={s.id} section={s} open={openIds.has(s.id)} count={sectionCounts[s.id]}
      onToggle={toggleOpen} qf={qf} setQF={setQF} />
  )

  return (
    <div>
      <div className="flex items-center justify-between mb-3 gap-3">
        <p className="text-[12.5px] text-poe-text">
          {t('Adjust the filter to your preference. Toggle rows or pick item types from the image dropdowns — no syntax to type.')}
        </p>
        <div className="flex items-center gap-1 shrink-0">
          <button onClick={expandAll} className="btn-dark h-7 text-[11px]"><ChevronsUpDown size={12} /> {t('Expand all')}</button>
          <button onClick={collapseAll} className="btn-dark h-7 text-[11px]"><ChevronsDownUp size={12} /> {t('Collapse all')}</button>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        <div className="space-y-2">{left.map(render)}</div>
        <div className="space-y-2">{right.map(render)}</div>
      </div>
    </div>
  )
}

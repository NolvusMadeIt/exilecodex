import React, { useRef, useState } from 'react'
import { useFilter } from '../store/FilterStore.jsx'
import { useRouter } from '../lib/router.jsx'
import { useToast } from '../store/Toast.jsx'
import { parseFilterText } from '../lib/parseFilter.js'
import { defaultSettings } from '../store/defaultSettings.js'

const stripExt = (n) => (n || 'filter').replace(/\.(filter|json|txt)$/i, '').trim() || 'filter'

// A filter with nothing built on it yet — used to skip the "you'll lose work" confirm.
const isPristine = (f) =>
  !!f && !(f.customRules?.length) && !f.preset && !f.klass &&
  !(f.freeText?.top) && !(f.freeText?.bottom)

// The "how do you want to start a filter" cards, with self-contained SVG art.
// mode="create"  → each choice spins up a NEW filter entry (used by the New-filter modal).
// mode="current" → each choice acts on the active filter (used inline on the Presets page).
// onPreset overrides the preset card (e.g. scroll to the picker instead of navigating).
// showPreset=false drops the preset card (the Presets page already IS the preset path).
export function StartFilterChoices({ mode = 'create', onDone, onPreset, showPreset = true }) {
  const { createFilter, addFilter, resetActive, importSettings, importCustomRules, renameActive, active } = useFilter()
  const { navigate } = useRouter()
  const toast = useToast()
  const fileRef = useRef(null)
  const [drag, setDrag] = useState(false)

  const done = () => onDone?.()

  const startBlank = async () => {
    if (mode === 'create') {
      createFilter('new filter')
    } else {
      if (!isPristine(active)) {
        const ok = await toast.confirm(
          `Start a blank filter?\nThis clears "${active?.name}" back to defaults.`,
          { title: 'Blank filter', confirmLabel: 'Start blank', cancelLabel: 'Keep' }
        )
        if (!ok) return
      }
      resetActive()
    }
    toast.info('Started a blank filter — build it up however you like.')
    navigate('/quick-filters'); done()
  }

  const startPreset = () => {
    if (onPreset) { onPreset(); return }
    if (mode === 'create') createFilter('new filter')
    navigate('/presets'); done()
  }

  const ingest = (file) => {
    if (!file) return
    if (!/\.(filter|json|txt)$/i.test(file.name)) { toast.warn('Choose a .filter or .json file.'); return }
    if (file.size > 1_000_000) { toast.warn('That file is too large (1 MB max).'); return }
    const reader = new FileReader()
    reader.onload = () => {
      try {
        const txt = String(reader.result || '')
        const base = stripExt(file.name)

        // .json — a full editor-settings backup
        if (file.name.toLowerCase().endsWith('.json')) {
          const j = JSON.parse(txt)
          const settings = j.filter || j
          if (mode === 'create') {
            const n = addFilter({ ...settings, name: settings.name || base })
            toast.success(`Created "${n}" from "${file.name}".`, { title: 'Imported' })
          } else {
            importSettings(settings); renameActive(settings.name || base)
            toast.success(`Loaded settings from "${file.name}".`, { title: 'Imported' })
          }
          navigate('/quick-filters'); done(); return
        }

        // .filter — parse rules out of the raw filter text
        const parsed = parseFilterText(txt)
        if (!parsed.customRules.length && !parsed.freeTextTop && !parsed.freeTextBottom) {
          toast.warn(`No rules found in "${file.name}".`, { title: 'Import' }); return
        }
        const ver = parsed.meta?.filter_version || parsed.meta?.version
        if (mode === 'create') {
          const n = addFilter({
            ...defaultSettings(base),
            customRules: parsed.customRules,
            freeText: { top: parsed.freeTextTop || '', bottom: parsed.freeTextBottom || '' },
            version: ver || '0.0.1',
            sourceFile: { name: file.name, fromFileHandle: false },
          })
          toast.success(`Created "${n}" with ${parsed.customRules.length} rule(s) from "${file.name}".`, { title: 'Imported' })
        } else {
          importCustomRules({ ...parsed, sourceFile: { name: file.name, fromFileHandle: false } })
          renameActive(base)
          toast.success(`Imported ${parsed.customRules.length} rule(s) from "${file.name}".`, { title: 'Imported' })
        }
        navigate('/custom-rules'); done()
      } catch (err) {
        toast.error(`Could not import "${file.name}": ${err?.message || ''}`, { title: 'Import failed' })
      }
    }
    reader.readAsText(file)
  }

  const onDrop = (e) => { e.preventDefault(); setDrag(false); ingest(e.dataTransfer?.files?.[0]) }

  return (
    <>
      <div className={`grid grid-cols-1 gap-3 ${showPreset ? 'sm:grid-cols-3' : 'sm:grid-cols-2'}`}>
        <Card art={<BlankArt />} title="Blank filter"
          desc="Start from a clean baseline and build it up yourself." onClick={startBlank} />
        {showPreset && (
          <Card art={<PresetArt />} title="From a preset"
            desc="Pick your class and game stage; we set sensible defaults." onClick={startPreset} />
        )}
        <Card art={<ImportArt />} title="Import existing"
          desc="Load a .filter or .json — drop it here or click to browse."
          onClick={() => fileRef.current?.click()}
          drag={drag}
          onDragOver={(e) => { e.preventDefault(); if (!drag) setDrag(true) }}
          onDragLeave={(e) => { e.preventDefault(); setDrag(false) }}
          onDrop={onDrop} />
      </div>
      <input ref={fileRef} type="file" accept=".filter,.json,text/plain" className="hidden"
        onChange={(e) => { ingest(e.target.files?.[0]); e.target.value = '' }} />
    </>
  )
}

function Card({ art, title, desc, onClick, drag, onDragOver, onDragLeave, onDrop }) {
  return (
    <button onClick={onClick} onDragOver={onDragOver} onDragLeave={onDragLeave} onDrop={onDrop}
      className={`group text-left rounded border p-2.5 h-full flex flex-col transition-colors bg-black ${drag ? 'border-poe-gold bg-poe-gold/5' : 'border-poe-line hover:border-poe-gold-dim hover:bg-[#1a1a1c]'}`}>
      <div className="rounded h-[96px] grid place-items-center text-poe-gold overflow-hidden border border-poe-line/60"
        style={{ background: 'radial-gradient(120% 100% at 50% 0%, rgb(var(--c-accent) / 0.12), transparent 70%), #0b0b0d' }}>
        <div className="w-[88px] h-[70px] opacity-90 transition-transform duration-200 group-hover:scale-105">{art}</div>
      </div>
      <div className="mt-2">
        <div className="gold-heading text-[14px]">{title}</div>
        <div className="text-[11.5px] text-poe-text leading-snug mt-0.5">{desc}</div>
      </div>
    </button>
  )
}

/* ---------- self-drawn card art (inline SVG, no external assets) ---------- */

function BlankArt() {
  return (
    <svg viewBox="0 0 80 64" fill="none" className="w-full h-full">
      <path d="M24 8 h22 l10 10 v36 a2 2 0 0 1 -2 2 H24 a2 2 0 0 1 -2 -2 V10 a2 2 0 0 1 2 -2 z"
        stroke="currentColor" strokeWidth="2" fill="currentColor" fillOpacity="0.05" strokeLinejoin="round" />
      <path d="M46 8 v8 a2 2 0 0 0 2 2 h8" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <g stroke="currentColor" strokeWidth="2" opacity="0.32" strokeLinecap="round">
        <path d="M29 32 h18" /><path d="M29 40 h18" /><path d="M29 48 h12" />
      </g>
      <path d="M59 28 l1.7 4.4 4.4 1.7 -4.4 1.7 -1.7 4.4 -1.7 -4.4 -4.4 -1.7 4.4 -1.7 z"
        fill="currentColor" />
    </svg>
  )
}

function PresetArt() {
  return (
    <svg viewBox="0 0 80 64" fill="none" className="w-full h-full">
      <rect x="14" y="20" width="34" height="34" rx="3" stroke="currentColor" strokeWidth="2" opacity="0.3" />
      <rect x="21" y="15" width="34" height="34" rx="3" stroke="currentColor" strokeWidth="2" opacity="0.55" fill="#0b0b0d" />
      <rect x="28" y="10" width="34" height="34" rx="3" stroke="currentColor" strokeWidth="2" fill="currentColor" fillOpacity="0.05" />
      <path d="M45 17 l2.4 4.9 5.4 .8 -3.9 3.8 .9 5.4 -4.8 -2.5 -4.8 2.5 .9 -5.4 -3.9 -3.8 5.4 -.8 z"
        fill="currentColor" />
    </svg>
  )
}

function ImportArt() {
  return (
    <svg viewBox="0 0 80 64" fill="none" className="w-full h-full">
      <g stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M40 11 v23" />
        <path d="M31 25 l9 9 9 -9" />
      </g>
      <path d="M19 39 h13 l3 5 h10 l3 -5 h13 v11 a3 3 0 0 1 -3 3 H22 a3 3 0 0 1 -3 -3 z"
        stroke="currentColor" strokeWidth="2" fill="currentColor" fillOpacity="0.06" strokeLinejoin="round" />
    </svg>
  )
}

import React, { useState, useRef, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { useDropdownPortal } from '../lib/useDropdownPortal.js'
import { Upload, Save, Clipboard, RotateCcw, ChevronDown, Star, FileDown, FilePlus2, Cloud, Code2, Check } from 'lucide-react'
import { useFilter } from '../store/FilterStore.jsx'
import { usePrefs } from '../store/Prefs.jsx'
import { useGameInfo } from '../store/GameInfo.jsx'
import { useToast } from '../store/Toast.jsx'
import { useRouter } from '../lib/router.jsx'
import { generateFilter } from '../lib/generate.js'
import { parseFilterText } from '../lib/parseFilter.js'

const safeName = (name) => (name || 'filter').replace(/[^a-z0-9-_. ]/gi, '')

// File System Access API is Chromium-only. We fall back to <input type=file> + download.
const HAS_FS_ACCESS = typeof window !== 'undefined' && 'showOpenFilePicker' in window

function stampNow() {
  const d = new Date(); const p = n => String(n).padStart(2, '0')
  return `${d.getUTCFullYear()}-${p(d.getUTCMonth()+1)}-${p(d.getUTCDate())} ${p(d.getUTCHours())}:${p(d.getUTCMinutes())} UTC`
}

export function ActionBar() {
  const { active, resetActive, importSettings, importCustomRules, bumpVersion } = useFilter()
  const { prefs } = usePrefs()
  const gameInfo = useGameInfo()
  const toast = useToast()
  const { navigate } = useRouter()
  const [copied, setCopied] = useState(false)
  const [saveMenu, setSaveMenu] = useState(false)
  const [importMenu, setImportMenu] = useState(false)
  const fileRef = useRef(null)
  const saveMenuRef = useRef(null)
  const importMenuRef = useRef(null)
  // File-handle from FS Access API import (Chromium only). null in Firefox/Safari.
  const handleRef = useRef(null)

  const buildText = (bumpedVersion) => {
    const stamp = stampNow()
    const ctx = { ...prefs, gameVersion: gameInfo.gameVersion, gameVersionLabel: gameInfo.gameVersionLabel, _generatedAt: stamp }
    // Pass a synthetic next-version through so the output reflects the bump immediately
    const snap = bumpedVersion ? { ...active, version: bumpedVersion } : active
    return generateFilter(snap, ctx)
  }

  const downloadBlob = (text, name) => {
    const blob = new Blob([text], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url; a.download = name
    document.body.appendChild(a); a.click(); a.remove()
    URL.revokeObjectURL(url)
  }

  // --- Save actions ---

  // Bump version, then download as a fresh file
  const saveToNewFile = () => {
    setSaveMenu(false)
    const next = bumpPatchInline(active.version)
    bumpVersion()
    const fname = `${safeName(active.name)}.filter`
    downloadBlob(buildText(next), fname)
    toast.success(`Downloaded "${fname}" · v${next}`, { title: 'Saved' })
  }

  // Overwrite the file that was imported (uses FS Access API if we have a live handle)
  const overwriteImported = async () => {
    setSaveMenu(false)
    const next = bumpPatchInline(active.version)
    bumpVersion()
    const text = buildText(next)
    if (handleRef.current && handleRef.current.createWritable) {
      try {
        const w = await handleRef.current.createWritable()
        await w.write(text); await w.close()
        toast.success(`Overwrote "${active.sourceFile?.name || 'file'}" with v${next}.`, { title: 'Saved' })
        return
      } catch (e) {
        toast.error(`Overwrite failed: ${e.message}\nFalling back to download.`, { title: 'Save' })
      }
    }
    // Fallback: re-download using the original filename
    downloadBlob(text, active.sourceFile?.name || `${safeName(active.name)}.filter`)
    toast.success(`Saved as "${active.sourceFile?.name || `${safeName(active.name)}.filter`}" · v${next}`, { title: 'Saved' })
  }

  // Save the SETTINGS (not the .filter) as JSON for backup / sharing the editor state.
  const saveSettingsJson = () => {
    setSaveMenu(false)
    const fname = `${safeName(active.name)}.settings.json`
    const blob = new Blob([JSON.stringify({ filter: active, prefs }, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a'); a.href = url; a.download = fname
    document.body.appendChild(a); a.click(); a.remove(); URL.revokeObjectURL(url)
    toast.success(`Saved editor settings as "${fname}".`, { title: 'Backup' })
  }

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(buildText())
      setCopied(true); setTimeout(() => setCopied(false), 1400)
      toast.success(`${active.name} copied to clipboard.`, { title: 'Copied', duration: 4000 })
    } catch (e) {
      toast.error('Could not copy to clipboard: ' + (e?.message || ''), { title: 'Copy' })
    }
  }

  // --- Import actions ---

  // Open via FS Access API so we can later "overwrite" the same file. Chromium only.
  const openWithHandle = async () => {
    setImportMenu(false)
    try {
      const [handle] = await window.showOpenFilePicker({
        types: [{ description: 'PoE filter', accept: { 'text/plain': ['.filter', '.txt'] } }],
        multiple: false, excludeAcceptAllOption: false,
      })
      const file = await handle.getFile()
      handleRef.current = handle
      await ingestFile(file, { fromHandle: true })
    } catch (e) { /* user cancelled */ }
  }

  const onImport = (e) => {
    const f = e.target.files?.[0]; if (!f) return
    handleRef.current = null
    ingestFile(f, { fromHandle: false })
    e.target.value = ''
  }

  const ingestFile = (f, { fromHandle }) => {
    const reader = new FileReader()
    reader.onload = () => {
      try {
        const txt = String(reader.result)
        if (f.name.toLowerCase().endsWith('.json')) {
          const j = JSON.parse(txt)
          // Accept either { filter, prefs } or a raw filter settings object
          importSettings(j.filter || j)
          toast.success(`Loaded editor settings from "${f.name}".`, { title: 'Imported' })
          return
        }
        const parsed = parseFilterText(txt)
        if (!parsed.customRules.length && !parsed.freeTextTop && !parsed.freeTextBottom) {
          toast.warn(`No rules found in "${f.name}".`, { title: 'Import' })
          return
        }
        importCustomRules({
          ...parsed,
          sourceFile: { name: f.name, fromFileHandle: !!fromHandle },
        })
        const v = parsed.meta?.filter_version || parsed.meta?.version
        const detail = v
          ? `Detected filter version ${v} — bumped automatically.`
          : 'Version bumped automatically.'
        toast.success(`Imported ${parsed.customRules.length} rule(s) from "${f.name}".\n${detail}`, { title: 'Imported' })
      } catch (err) {
        toast.error(`Could not import "${f.name}":\n${err.message}`, { title: 'Import failed' })
      }
    }
    reader.readAsText(f)
  }

  const hasSource = !!active.sourceFile
  const overwriteLabel = hasSource
    ? (handleRef.current ? `Overwrite "${active.sourceFile.name}"` : `Save as "${active.sourceFile.name}"`)
    : 'Overwrite imported file'

  return (
    <div className="sticky bottom-0 z-30 border-t border-poe-line bg-poe-bg/95 backdrop-blur">
      <div className="app-shell py-2 flex items-center gap-2">
        {/* Import split */}
        <div className="relative" ref={importMenuRef}>
          <div className="flex">
            <button className="btn-dark rounded-r-none" onClick={() => fileRef.current?.click()}>
              <Upload size={14} /> Import
            </button>
            <button className="btn-dark rounded-l-none border-l-0 px-1.5" onClick={() => setImportMenu(o => !o)} aria-label="Import options">
              <ChevronDown size={12} className="opacity-70" />
            </button>
          </div>
          <input ref={fileRef} type="file" accept=".filter,.json,text/plain" className="hidden" onChange={onImport} />
          <PortalMenu open={importMenu} onClose={() => setImportMenu(false)} anchorRef={importMenuRef}>
            <MenuItem onClick={() => { setImportMenu(false); fileRef.current?.click() }} icon={Upload} label="Import .filter / .json" sub="Browse and load a file" />
            <MenuItem
              onClick={openWithHandle}
              disabled={!HAS_FS_ACCESS}
              icon={FileDown}
              label="Open for editing (link to file)"
              sub={HAS_FS_ACCESS ? 'Keeps a link so you can overwrite later (Chromium only)' : 'Not supported in this browser'}
            />
          </PortalMenu>
        </div>
        <span className="text-[10px] text-poe-text/70 hidden md:inline">.filter (NeverSink / Filterblade OK)</span>

        {/* Save split-button */}
        <div className="flex-1 flex justify-center">
          <div className="relative" ref={saveMenuRef}>
            <div className="flex">
              <button className="btn-action rounded-r-none min-w-[150px]" onClick={saveToNewFile}>
                <Save size={14} /> Save to new file
              </button>
              <button className="btn-action rounded-l-none border-l border-black/20 px-1.5" onClick={() => setSaveMenu(o => !o)} aria-label="Save options">
                <ChevronDown size={12} />
              </button>
            </div>
            <PortalMenu open={saveMenu} onClose={() => setSaveMenu(false)} anchorRef={saveMenuRef} align="right">
              <MenuItem onClick={saveToNewFile} icon={FilePlus2} label="Save to new file"
                sub="Download a fresh .filter (bumps version)" />
              <MenuItem onClick={overwriteImported} icon={FileDown} disabled={!hasSource}
                label={overwriteLabel}
                sub={!hasSource
                  ? 'Available after you import a filter'
                  : (handleRef.current
                      ? 'Writes directly back to the same file (Chromium)'
                      : 'Re-downloads using the original filename')} />
              <MenuItem onClick={saveSettingsJson} icon={Code2}
                label="Save settings as .json"
                sub="Editor state backup (re-importable here)" />
              <MenuItem onClick={() => {}} disabled icon={Cloud}
                label="Save to PoE2 account"
                sub="Coming soon — needs pathofexile.com login" />
            </PortalMenu>
          </div>
          <button className="btn-dark min-w-[150px] ml-2" onClick={copy}>
            <Clipboard size={14} /> {copied ? 'Copied!' : 'Copy to Clipboard'}
          </button>
        </div>

        <button className="btn-dark" onClick={() => navigate('/presets')}><Star size={14} /> Presets</button>
        <button
          className="btn-dark"
          onClick={async () => {
            const ok = await toast.confirm(
              `Reset "${active.name}" to defaults?\nThis clears your Quick Filters, Custom Rules and Cosmetic edits.`,
              { title: 'Reset filter', confirmLabel: 'Reset', cancelLabel: 'Keep' }
            )
            if (ok) {
              resetActive()
              toast.info(`"${active.name}" reset to defaults.`)
            }
          }}
        >
          <RotateCcw size={14} /> Reset
        </button>
      </div>
    </div>
  )
}

function PortalMenu({ open, onClose, anchorRef, align = 'left', children }) {
  const close = useCallback(() => onClose(), [onClose])
  const { menuRef, menuStyle } = useDropdownPortal({
    open,
    onClose: close,
    anchorRef,
    minWidth: 260,
    maxHeight: 400,
    align,
    preferUp: true,
  })

  if (!open || !menuStyle) return null

  return createPortal(
    <div
      ref={menuRef}
      className="dropdown-panel rounded border border-poe-line shadow-panel p-1"
      style={{ ...menuStyle, backgroundColor: '#000' }}
    >
      {children}
    </div>,
    document.body,
  )
}

function MenuItem({ icon: Icon, label, sub, onClick, disabled }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`w-full text-left rounded px-2 py-1.5 flex items-start gap-2 ${disabled ? 'opacity-40 cursor-not-allowed' : 'hover:bg-[#1a1a1c]'}`}
      style={{ backgroundColor: '#000' }}
    >
      {Icon && <Icon size={14} className="mt-0.5 text-poe-text" />}
      <div className="flex-1">
        <div className="text-[12.5px] text-poe-text-bright">{label}</div>
        {sub && <div className="text-[11px] text-poe-text">{sub}</div>}
      </div>
    </button>
  )
}

// Inline patch-bump (used to render the about-to-ship version into the file BEFORE the
// store's async setState has propagated, so the output reflects the bump immediately).
function bumpPatchInline(v) {
  const m = String(v || '0.0.1').match(/^(\d+)\.(\d+)\.(\d+)/)
  if (!m) return '0.0.2'
  return `${m[1]}.${m[2]}.${Number(m[3]) + 1}`
}

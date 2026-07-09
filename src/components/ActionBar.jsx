import React, { useState, useRef, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { Button, ButtonGroup } from '@mui/material'
import { useDropdownPortal } from '../lib/useDropdownPortal.js'
import { Upload, Save, Clipboard, RotateCcw, ChevronDown, Star, FileDown, FilePlus2, Cloud, Code2, Check } from 'lucide-react'
import { useFilter } from '../store/FilterStore.jsx'
import { usePrefs } from '../store/Prefs.jsx'
import { useGameInfo } from '../store/GameInfo.jsx'
import { useToast } from '../store/Toast.jsx'
import { useRouter } from '../lib/router.jsx'
import { useT } from '../i18n/index.js'
import { resolveFilter } from '../lib/buildFilter.js'
import { parseFilterText } from '../lib/parseFilter.js'
import { decodeFilter } from '../lib/importFilter.js'
import { loadBaseNames, loadUniqueBases } from '../lib/catalog.js'
import { strictnessLevel } from '../data/coreFilters.js'
import { looksLikeBuild, smartFilterFromBuild } from '../lib/buildImport.js'

// Sanitize a filter name into a base filename. Strips a trailing ".filter" first so a filter
// literally named "MyNewFilter.filter" exports as "MyNewFilter.filter", not "...filter.filter".
const safeName = (name) => ((name || 'filter').replace(/\.filter$/i, '').replace(/[^a-z0-9-_. ]/gi, '').trim() || 'filter')

// File System Access API is Chromium-only. We fall back to <input type=file> + download.
const HAS_FS_ACCESS = typeof window !== 'undefined' && 'showOpenFilePicker' in window

function stampNow() {
  const d = new Date(); const p = n => String(n).padStart(2, '0')
  return `${d.getUTCFullYear()}-${p(d.getUTCMonth()+1)}-${p(d.getUTCDate())} ${p(d.getUTCHours())}:${p(d.getUTCMinutes())} UTC`
}

export function ActionBar() {
  const { active, resetActive, importSettings, importDecoded, importBuild, bumpVersion } = useFilter()
  const { prefs } = usePrefs()
  const gameInfo = useGameInfo()
  const toast = useToast()
  const { navigate } = useRouter()
  const t = useT()
  const [copied, setCopied] = useState(false)
  const [saveMenu, setSaveMenu] = useState(false)
  const [importMenu, setImportMenu] = useState(false)
  const fileRef = useRef(null)
  const saveMenuRef = useRef(null)
  const importMenuRef = useRef(null)
  // File-handle from FS Access API import (Chromium only). null in Firefox/Safari.
  const handleRef = useRef(null)

  const buildText = (bumpedVersion) => {
    // Pass a synthetic next-version through so the output reflects the bump immediately.
    const snap = bumpedVersion ? { ...active, version: bumpedVersion } : active
    return resolveFilter(snap, { gameInfo, prefs, stamp: stampNow() })
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
  const saveToNewFile = async () => {
    setSaveMenu(false)
    const next = bumpPatchInline(active.version)
    bumpVersion()
    const fname = `${safeName(active.name)}.filter`
    downloadBlob(await buildText(next), fname)
    toast.success(`Downloaded "${fname}" · v${next}`, { title: 'Saved' })
  }

  // Overwrite the file that was imported (uses FS Access API if we have a live handle)
  const overwriteImported = async () => {
    setSaveMenu(false)
    const next = bumpPatchInline(active.version)
    bumpVersion()
    const text = await buildText(next)
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
      await navigator.clipboard.writeText(await buildText())
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
    reader.onload = async () => {
      try {
        const txt = String(reader.result)
        const lower = f.name.toLowerCase()
        if (lower.endsWith('.json') || lower.endsWith('.build')) {
          const j = JSON.parse(txt)
          // A PoE2 build export → generate a smart filter from it.
          if (looksLikeBuild(j)) {
            const { build, patch } = await smartFilterFromBuild(j)
            importBuild(patch)
            toast.success(`Smart filter built for "${build.name}"${build.className ? ` (${build.className})` : ''} — tune it anytime in the Quick Editor.`, { title: 'Build imported' })
            navigate('/quick-editor')
            return
          }
          // Otherwise it's an editor-settings backup ({ filter, prefs } or a raw settings object).
          importSettings(j.filter || j)
          toast.success(`Loaded editor settings from "${f.name}".`, { title: 'Imported' })
          return
        }
        const parsed = parseFilterText(txt)
        if (!parsed.customRules.length && !parsed.freeTextTop && !parsed.freeTextBottom) {
          toast.warn(`No rules found in "${f.name}".`, { title: 'Import' })
          return
        }
        // Decode the filter back into editable settings so EVERY page mirrors it.
        const [baseNames, uniqueBases] = await Promise.all([
          loadBaseNames().catch(() => new Set()), loadUniqueBases().catch(() => ({})),
        ])
        const patch = decodeFilter(parsed, { text: txt, baseNames, uniqueBases, prefs })
        importDecoded(patch, { sourceFile: { name: f.name, fromFileHandle: !!fromHandle } })
        const s = patch.summary
        const detail = `${strictnessLevel(s.strictness).name} preset · ${s.tiered} tiered item(s) · ${s.custom} custom rule(s).`
        toast.success(
          `Imported "${f.name}" — ${s.ours ? 'your filter is now mirrored across the editor' : 'best-effort decode'}.\n${detail}`,
          { title: 'Imported' },
        )
        navigate('/quick-editor')
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
    <div className="flex items-center gap-2">
      {/* Import split */}
      <div className="relative" ref={importMenuRef}>
        <ButtonGroup variant="outlined" size="small" aria-label="Import">
          <Button startIcon={<Upload size={14} />} onClick={() => fileRef.current?.click()}>{t('Import')}</Button>
          <Button onClick={() => setImportMenu(o => !o)} aria-label="Import options" sx={{ px: 0.75, minWidth: 0 }}>
            <ChevronDown size={12} />
          </Button>
        </ButtonGroup>
        <input ref={fileRef} type="file" accept=".filter,.json,.build,text/plain" className="hidden" onChange={onImport} />
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

      {/* Save split-button */}
      <div className="relative" ref={saveMenuRef}>
        <ButtonGroup variant="contained" color="primary" size="small" aria-label="Save">
          <Button startIcon={<Save size={14} />} onClick={saveToNewFile} sx={{ minWidth: 130 }}>{t('Save to new file')}</Button>
          <Button onClick={() => setSaveMenu(o => !o)} aria-label="Save options" sx={{ px: 0.75, minWidth: 0 }}>
            <ChevronDown size={12} />
          </Button>
        </ButtonGroup>
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
        </PortalMenu>
      </div>

      <Button variant="outlined" size="small" startIcon={<Clipboard size={14} />} onClick={copy}>
        {copied ? t('Copied!') : t('Copy')}
      </Button>
      <Button
        variant="outlined"
        size="small"
        startIcon={<RotateCcw size={14} />}
        onClick={async () => {
          const ok = await toast.confirm(
            `Reset "${active.name}" to defaults?\nThis clears your Quick Editor, Custom Rules and Cosmetic edits.`,
            { title: 'Reset filter', confirmLabel: 'Reset', cancelLabel: 'Keep' }
          )
          if (ok) {
            resetActive()
            toast.info(`"${active.name}" reset to defaults.`)
          }
        }}
      >
        {t('Reset')}
      </Button>
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
    preferUp: false,
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

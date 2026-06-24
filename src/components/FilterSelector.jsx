import React, { useState } from 'react'
import { Plus, Copy, Trash2, X, Pencil, Check } from 'lucide-react'
import { useFilter } from '../store/FilterStore.jsx'
import { useToast } from '../store/Toast.jsx'
import { Modal } from './Modal.jsx'
import { NewFilterModal } from './NewFilterModal.jsx'
import { strictnessLevel, styleInfo } from '../data/coreFilters.js'

export function FilterSelector({ onClose }) {
  const { filters, activeName, setActiveName, cloneActive, deleteFilter, renameActive } = useFilter()
  const toast = useToast()
  const [editing, setEditing] = useState(null) // { name, draft }
  const [choosing, setChoosing] = useState(false)

  const startRename = (f) => {
    setActiveName(f.name)
    setEditing({ original: f.name, draft: f.name })
  }
  const commitRename = () => {
    if (!editing) return
    const draft = editing.draft.trim()
    if (!draft) { setEditing(null); return }
    if (draft === editing.original) { setEditing(null); return }
    if (filters.some(f => f.name === draft)) {
      toast.warn(`A filter named "${draft}" already exists.`, { title: 'Rename' })
      return
    }
    renameActive(draft)
    toast.success(`Renamed to "${draft}".`)
    setEditing(null)
  }

  const askDelete = async (f) => {
    const ok = await toast.confirm(
      `Delete the filter "${f.name}"?\nThis cannot be undone.`,
      { title: 'Delete filter', confirmLabel: 'Delete', cancelLabel: 'Keep' }
    )
    if (ok) { deleteFilter(f.name); toast.info(`Deleted "${f.name}".`) }
  }

  return (
    <Modal onClose={onClose} title="Filter Selector" width={520}>
      <div className="mb-3 text-[12px] text-poe-text">
        Stored filters in this browser. Click a row to switch. Names must be unique.
      </div>
      <button className="btn-dark w-full mb-3" onClick={() => setChoosing(true)}>
        <Plus size={14} /> Create New
      </button>
      <div className="max-h-[320px] overflow-auto space-y-1">
        {filters.map(f => (
          <div key={f.name}
            className={`flex items-center gap-2 px-2 py-1.5 rounded border bg-black ${f.name === activeName ? 'border-poe-gold-dim' : 'border-poe-line hover:bg-[#1a1a1c]'}`}>
            {editing && editing.original === f.name ? (
              <input
                autoFocus
                value={editing.draft}
                onChange={e => setEditing({ ...editing, draft: e.target.value })}
                onKeyDown={e => {
                  if (e.key === 'Enter') commitRename()
                  if (e.key === 'Escape') setEditing(null)
                }}
                className="field h-7 text-[13px] flex-1"
              />
            ) : (
              <button className="flex-1 text-left text-[13px] text-poe-text-bright hover:text-poe-heading"
                onClick={() => setActiveName(f.name)}>
                {f.name}
                {f.version && <span className="ml-2 font-mono text-[10.5px] text-poe-text/70">v{f.version}</span>}
                <span className="ml-2 text-[11px] text-poe-text">
                  {strictnessLevel(f.strictness).name}{f.style && f.style !== 'default' ? ` · ${styleInfo(f.style).name}` : ''} · {((f.overrides?.rules?.length || 0) + (f.customRules?.length || 0))} rules
                </span>
              </button>
            )}
            {editing && editing.original === f.name ? (
              <>
                <button title="Save" className="text-emerald-300 hover:text-emerald-200" onClick={commitRename}>
                  <Check size={14} />
                </button>
                <button title="Cancel" className="text-poe-text hover:text-poe-heading" onClick={() => setEditing(null)}>
                  <X size={14} />
                </button>
              </>
            ) : (
              <>
                <button title="Rename" className="text-poe-text hover:text-poe-heading" onClick={() => startRename(f)}>
                  <Pencil size={13} />
                </button>
                <button title="Clone" className="text-poe-text hover:text-poe-heading"
                  onClick={() => { setActiveName(f.name); cloneActive(); toast.success(`Cloned "${f.name}".`) }}>
                  <Copy size={13} />
                </button>
                <button title="Delete" className="text-poe-danger hover:text-red-400" onClick={() => askDelete(f)}>
                  <Trash2 size={13} />
                </button>
              </>
            )}
          </div>
        ))}
      </div>
      <div className="mt-3 text-right">
        <button className="btn-ghost" onClick={onClose}><X size={14} /> Close</button>
      </div>

      {choosing && <NewFilterModal onClose={() => setChoosing(false)} onChosen={onClose} />}
    </Modal>
  )
}

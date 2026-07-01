import React from 'react'
import { X } from 'lucide-react'
import { Modal } from './Modal.jsx'
import { StartFilterChoices } from './StartFilterChoices.jsx'

// "Create New" chooser — pick how to start a brand-new filter (blank, preset, or import).
// Each choice creates a NEW filter entry and then closes this modal.
export function NewFilterModal({ onClose, onChosen }) {
  const finish = () => { onClose?.(); onChosen?.() }
  return (
    <Modal onClose={onClose} title="New filter" width={680}>
      <p className="text-[12.5px] text-poe-text mb-4">Pick a starting point for your new filter.</p>
      <StartFilterChoices mode="create" onDone={finish} />
      <div className="mt-4 text-right">
        <button className="btn-ghost" onClick={onClose}><X size={14} /> Cancel</button>
      </div>
    </Modal>
  )
}

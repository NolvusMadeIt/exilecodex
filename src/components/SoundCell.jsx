import React, { useCallback, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { Play, Upload, Volume2, Check } from 'lucide-react'
import { useDropdownPortal } from '../lib/useDropdownPortal.js'
import { BUILTIN_SOUNDS, previewBuiltin, previewCustomFile } from '../data/sounds.js'

// Per-tier drop-sound control. value = { sound, customSound, volume }. onPatch(partial).
export function SoundCell({ value = {}, onPatch, disabled }) {
  const [open, setOpen] = useState(false)
  const anchorRef = useRef(null)
  const uploadedUrl = useRef(null)        // object URL of an uploaded custom file (preview only)
  const fileRef = useRef(null)
  const close = useCallback(() => setOpen(false), [])
  const { menuRef, menuStyle } = useDropdownPortal({ open, onClose: close, anchorRef, minWidth: 260, maxHeight: 320, align: 'right' })

  const sound = value.sound || 'None'
  const custom = (value.customSound || '').trim()
  const volume = value.volume != null ? value.volume : 200

  const summary = custom ? custom : (sound === 'None' ? 'No sound' : `Sound ${sound}`)

  const play = () => {
    if (custom && uploadedUrl.current) previewCustomFile(uploadedUrl.current, volume)
    else if (custom) { /* no uploaded file to preview */ }
    else previewBuiltin(sound, volume)
  }

  const onUpload = (e) => {
    const f = e.target.files?.[0]; if (!f) return
    if (uploadedUrl.current) URL.revokeObjectURL(uploadedUrl.current)
    uploadedUrl.current = URL.createObjectURL(f)
    // Use the file's name as the CustomAlertSound reference (it must live in the game folder).
    onPatch({ customSound: f.name, sound: 'None' })
    previewCustomFile(uploadedUrl.current, volume)
    e.target.value = ''
  }

  const canPreview = custom ? !!uploadedUrl.current : sound !== 'None'

  const popover = open && menuStyle && createPortal(
    <div ref={menuRef} className="rounded border border-poe-line shadow-panel p-2.5 space-y-2.5"
      style={{ ...menuStyle, backgroundColor: '#000' }}>
      <div className="text-[10px] uppercase tracking-wide text-poe-text">Built-in sound</div>
      <div className="max-h-[150px] overflow-auto rounded border border-poe-line" style={{ backgroundColor: '#000' }}>
        {BUILTIN_SOUNDS.map(s => {
          const on = !custom && sound === s.id
          return (
            <div key={s.id}
              className={`flex items-center gap-1 px-2 py-1 text-[11px] cursor-pointer ${on ? 'text-poe-heading bg-[#1a1a1c]' : 'text-poe-text-bright hover:bg-[#151517]'}`}
              onClick={() => onPatch({ sound: s.id, customSound: '' })}>
              <span className="w-3 shrink-0">{on && <Check size={11} className="text-poe-gold" />}</span>
              <span className="flex-1 truncate">{s.label}</span>
              {s.id !== 'None' && (
                <button
                  title="Hear this sound"
                  onClick={(e) => { e.stopPropagation(); previewBuiltin(s.id, volume) }}
                  className="shrink-0 w-5 h-5 grid place-items-center rounded text-poe-text hover:text-poe-gold"
                >
                  <Play size={10} />
                </button>
              )}
            </div>
          )
        })}
      </div>

      <div className="text-[10px] uppercase tracking-wide text-poe-text pt-1">Or custom file</div>
      <div className="flex gap-1">
        <input
          value={custom}
          onChange={(e) => onPatch({ customSound: e.target.value, sound: 'None' })}
          placeholder="my-sound.wav"
          className="field h-7 text-[11px] flex-1"
        />
        <button className="btn-dark h-7 px-2" title="Upload a file to preview" onClick={() => fileRef.current?.click()}>
          <Upload size={12} />
        </button>
        <input ref={fileRef} type="file" accept="audio/*" className="hidden" onChange={onUpload} />
      </div>
      <p className="text-[10px] text-poe-text/70 leading-snug">
        The file must sit in your PoE2 filter folder. Uploading here is only to preview it.
      </p>

      <div className="text-[10px] uppercase tracking-wide text-poe-text pt-1 flex items-center gap-1">
        <Volume2 size={11} /> Volume <span className="ml-auto font-mono text-poe-text-bright">{volume}</span>
      </div>
      <input
        type="range" min={0} max={300} step={10} value={volume}
        onChange={(e) => onPatch({ volume: Number(e.target.value) })}
        className="w-full accent-poe-gold"
      />

      <button onClick={play} disabled={!canPreview}
        className="btn-action h-7 w-full text-[12px] disabled:opacity-40">
        <Play size={12} /> {custom && !uploadedUrl.current ? 'Upload to preview' : 'Play preview'}
      </button>
    </div>,
    document.body,
  )

  return (
    <div ref={anchorRef} className="flex items-center gap-1">
      <button
        disabled={disabled}
        onClick={(e) => { e.stopPropagation(); play() }}
        title="Play preview"
        className="shrink-0 w-6 h-7 grid place-items-center rounded border border-poe-line bg-black text-poe-text hover:text-poe-gold disabled:opacity-40"
      >
        <Play size={11} />
      </button>
      <button
        disabled={disabled}
        onClick={() => setOpen(o => !o)}
        className="field h-7 text-[11px] flex-1 text-left truncate disabled:opacity-40"
        style={{ backgroundColor: '#000' }}
        title="Configure drop sound"
      >
        {summary}
      </button>
      {popover}
    </div>
  )
}

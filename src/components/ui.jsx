import React from 'react'

const toHex = (arr) => arr ? '#' + arr.slice(0, 3).map(n => Number(n).toString(16).padStart(2, '0')).join('') : '#000000'
const fromHex = (hex) => [1, 3, 5].map(i => parseInt(hex.slice(i, i + 2), 16))

export function ColorSwatch({ value, onChange, label, clearable }) {
  return (
    <div className="flex items-center gap-1.5">
      <label className="relative w-7 h-7 rounded border border-bg-600 overflow-hidden cursor-pointer" title={label}>
        <span className="absolute inset-0" style={{ background: value ? toHex(value) : 'repeating-conic-gradient(#333 0% 25%, #555 0% 50%) 0 0 / 8px 8px' }} />
        <input type="color" aria-label={label} value={value ? toHex(value) : '#888888'} onChange={e => onChange(fromHex(e.target.value))} className="absolute inset-0 opacity-0 cursor-pointer" />
      </label>
      {clearable && value && <button className="text-[10px] text-slate-500 hover:text-slate-300" onClick={() => onChange(null)}>×</button>}
    </div>
  )
}

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }
  componentDidCatch(error, info) {
    console.error('App error', error, info)
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="p-4 m-2 text-sm border border-red-500/70 bg-[#1a0f0f] text-red-200 rounded">
          <strong>Render error</strong><br />
          {this.state.error?.message}<br />
          <span className="text-xs opacity-70">Hard refresh or clear localStorage keys starting with 'nolvus'.</span>
          <button className="block mt-2 text-xs underline" onClick={() => window.location.reload()}>Reload</button>
        </div>
      )
    }
    return this.props.children
  }
}

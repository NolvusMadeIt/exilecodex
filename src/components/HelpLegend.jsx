import React from 'react'
import { Modal } from './Modal.jsx'

// Reference legend modal — matches the layout the user sketched.
// Opened from the (?) icon in the top-right of the tab nav.
export function HelpLegend({ onClose }) {
  return (
    <Modal onClose={onClose} title="Filter Legend" width={720}>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4 text-[12px]">
        {/* Comparators */}
        <Section title="Comparators">
          <Row k=">"  v="Greater than" />
          <Row k="≥" v="Greater than or equal to" />
          <Row k="<" v="Less than" />
          <Row k="≤" v="Less than or equal to" />
        </Section>

        {/* Tiers */}
        <Section title="Tiers">
          <Tier color="#b660e0">S-Tier <Light>Purple</Light></Tier>
          <Tier color="#e04040">A-Tier <Light>Red</Light></Tier>
          <Tier color="#e0902a">B-Tier <Light>Orange</Light></Tier>
          <Tier color="#e6d24a">C-Tier <Light>Yellow</Light></Tier>
          <Tier color="#e8e8e8">D-Tier <Light>White</Light></Tier>
          <Tier color="#c8c8c8">E-Tier <Light>Default</Light></Tier>
          <Tier color="#777" muted>F-Tier <Light>Hidden</Light></Tier>
        </Section>

        {/* Rarities */}
        <Section title="Rarities">
          <Dot color="#c8c8c8" label="Normal" />
          <Dot color="#8888ff" label="Magic" />
          <Dot color="#ffff77" label="Rare" />
          <Dot color="#af6025" label="Unique" />
        </Section>

        {/* Minimap icons */}
        <Section title="Minimap Icons">
          <MinimapIcon shape="circle" color="#c9b58c" label="Currency" />
          <MinimapIcon shape="diamond" color="#c9b58c" label="Items" />
          <MinimapIcon shape="hex"    color="#c9b58c" label="Waystones" />
          <MinimapIcon shape="square" color="#c9b58c" label="Gold" />
        </Section>

        {/* Gear tiers */}
        <Section title="Gear Tiers">
          <Row k="★"  v="Basic" />
          <Row k="★★" v="Advanced" />
          <Row k="☢"  v="Expert" />
          <Row k="✦✦" v="Elite" />
        </Section>

        {/* Terminology */}
        <Section title="Terminology">
          <Term name="Item"      def="Both Currency and Equipment" />
          <Term name="Currency"  def="Anything stackable and typically usable" />
          <Term name="Equipment" def="Any item you can wear: gear, jewellery, flasks and charms" />
          <Term name="Gear"      def="Weapons, armour and shields" />
          <Term name="Jewellery" def="Rings, amulets, belts, jewels" />
          <Term name="Base Type" def="The specific type of item" />
          <Term name="Gear Tier" def="The tier of the gear base type (Basic, Advanced, Expert, Elite)" />
        </Section>
      </div>

      <div className="border-t border-poe-line mt-4 pt-3 space-y-1.5 text-[12px] text-poe-text">
        <p><span className="text-poe-gold font-display font-semibold tracking-wide">Rule Navigation:</span> Ctrl+Click a rule's title to jump to it in the Filter Output, and vice-versa.</p>
        <p><span className="text-poe-gold font-display font-semibold tracking-wide">Simulator:</span> In-game, Ctrl+C an item, then Ctrl+V anywhere in this tool to see if and how it would be displayed, and by which rule(s).</p>
      </div>
    </Modal>
  )
}

const Light = ({ children }) => <span className="text-poe-text/70 ml-1">{children}</span>

function Section({ title, children }) {
  return (
    <div className="space-y-1">
      <div className="font-display font-semibold tracking-[0.08em] uppercase text-poe-gold text-[11px]">{title}</div>
      <div className="space-y-0.5">{children}</div>
    </div>
  )
}
function Row({ k, v }) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-poe-text-bright w-6">{k}</span>
      <span className="text-poe-text">{v}</span>
    </div>
  )
}
function Dot({ color, label }) {
  return (
    <div className="flex items-center gap-2">
      <span className="inline-block w-3.5 h-3.5 rounded-full" style={{ background: color, boxShadow: '0 0 0 1px rgba(0,0,0,0.5) inset' }} />
      <span className="text-poe-text-bright">{label}</span>
    </div>
  )
}
function Tier({ color, children, muted }) {
  return (
    <div className="flex items-center gap-2">
      <span className={`font-display font-semibold tracking-wide ${muted ? 'opacity-50' : ''}`} style={{ color }}>{children}</span>
    </div>
  )
}
function MinimapIcon({ shape, color, label }) {
  const css = { background: color, width: 12, height: 12 }
  let s
  if (shape === 'circle')   s = <span style={{ ...css, borderRadius: '50%' }} />
  else if (shape === 'diamond') s = <span style={{ ...css, transform: 'rotate(45deg)' }} />
  else if (shape === 'square')  s = <span style={css} />
  else if (shape === 'hex')     s = <span style={{ ...css, clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)' }} />
  return (
    <div className="flex items-center gap-2">
      <span className="inline-flex items-center justify-center w-4 h-4">{s}</span>
      <span className="text-poe-text-bright">{label}</span>
    </div>
  )
}
function Term({ name, def }) {
  return (
    <div className="grid grid-cols-[110px_1fr] gap-2">
      <span className="font-display font-semibold tracking-wide text-poe-gold">{name}</span>
      <span className="text-poe-text">{def}</span>
    </div>
  )
}

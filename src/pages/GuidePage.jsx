import React from 'react'
import { Star, SlidersHorizontal, ListOrdered, Pencil, Shirt, Eye, Check, Volume2, ChevronDown, Users, Download, Clipboard, FolderInput, FilePlus2, Upload } from 'lucide-react'
import { useRouter } from '../lib/router.jsx'
import { ItemLabel } from '../components/ItemLabel.jsx'
import { ItemIcon } from '../components/primitives.jsx'
import { asset } from '../data/assets.js'
import { CATEGORY_ICON } from '../data/items.js'

// ---------- small reusable mock pieces (built from real styles, not screenshots) ----------
const MockField = ({ children, w = 150 }) => (
  <span className="field h-7 inline-flex items-center gap-1.5 text-[11px] text-poe-text-bright" style={{ width: w }}>
    <span className="flex-1 truncate">{children}</span><ChevronDown size={11} className="opacity-60" />
  </span>
)
const MockCheck = ({ on, label }) => (
  <span className="inline-flex items-center gap-1.5 text-[11px]">
    <span className={`sqtoggle ${on ? 'sqtoggle-on' : ''}`}>{on && <Check size={9} className="text-poe-gold" strokeWidth={3} />}</span>
    <span className={on ? 'text-poe-text-bright' : 'text-poe-text'}>{label}</span>
  </span>
)
const cur = (slug) => asset(`gear/${slug}`)

// ---------- per-tab guide content ----------
const GUIDE = [
  {
    id: 'presets', to: '/presets', icon: Star, title: 'Presets', tag: 'Start here',
    what: 'Your starting point. Begin from a blank slate, import a filter you already have, or — the fast path — pick your class and game stage and it sets sensible defaults across every other tab.',
    steps: [
      'Start your filter: choose Blank, Import an existing .filter / .json, or use a preset below.',
      'Pick your class so the filter shows your weapon & armour types.',
      'Choose your game stage (Campaign → Very Late Endgame), then toggle the endgame content you run.',
    ],
    visual: (
      <div className="space-y-2">
        <div className="flex gap-2">
          {['presetEarlyCampaign1', 'presetProgressingMaps70', 'presetVeryStrict95'].map(p => (
            <img key={p} src={asset(`presets/${p}.webp`)} className="w-16 h-16 rounded border border-poe-line object-cover" alt="" />
          ))}
        </div>
        <div className="flex gap-1.5">
          {['warrior', 'witch', 'ranger', 'monk'].map(c => (
            <img key={c} src={asset(`presets/${c}.webp`)} className="w-10 h-10 rounded border border-poe-line object-cover" alt="" />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'quick', to: '/quick-editor', icon: SlidersHorizontal, title: 'Quick Editor', tag: 'Fine-tune',
    what: 'Hide anything you don’t want to see and highlight the drops you care about. Your edits layer on top of the chosen preset and always win in-game.',
    steps: [
      'Use Quick hides for one-click strictness (hide all Normal/Magic, hide small gold piles).',
      'Pick your weapon & armour types under My equipment to hide off-build gear.',
      'Add a hide or highlight rule and match by class, base type, rarity or item level.',
    ],
    visual: (
      <div className="panel p-2 w-full max-w-[300px] space-y-1.5">
        <div className="gold-heading text-[12px]">Currency</div>
        <div className="flex items-center justify-between gap-2">
          <span className="text-[11px] text-poe-text-bright">Show Currency Types</span>
          <MockField w={110}>3 selected</MockField>
        </div>
        <div className="rounded border border-poe-line p-1.5 space-y-1" style={{ backgroundColor: '#000' }}>
          <MockCheck on label="Currency Shards" />
          <MockCheck on label="Catalysts" />
          <MockCheck label="Omens" />
        </div>
      </div>
    ),
  },
  {
    id: 'tier', to: '/tier-lists', icon: ListOrdered, title: 'Tier Lists', tag: 'Value',
    what: 'Decide how valuable each currency and unique is to you. Higher tiers get stronger highlights and sounds. Drag items between tiers.',
    steps: [
      'Pick the Currency or Uniques sub-tab.',
      'Drag an item to a higher or lower tier.',
      'The drop highlight & sound follow the tier you set in Cosmetic.',
    ],
    visual: (
      <div className="space-y-1.5 w-full max-w-[320px]">
        {[['S', '#b660e0', ['goldring/goldring.webp', 'amulets/goldamulet.webp']], ['B', '#e0902a', ['jewels/emeraldjewel.webp']]].map(([t, color, icons]) => (
          <div key={t} className="panel flex items-stretch overflow-hidden">
            <div className="w-12 grid place-items-center font-smallcaps text-[13px] border-r border-poe-line" style={{ color, background: `${color}14` }}>{t}-Tier</div>
            <div className="flex-1 flex flex-wrap gap-1 p-1.5">
              {icons.map(i => (
                <span key={i} className="inline-flex items-center gap-1 bg-black border border-poe-line rounded px-1.5 py-0.5 text-[10px]">
                  <ItemIcon src={asset(`gear/${i}`)} size={14} /> item
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    ),
  },
  {
    id: 'custom', to: '/custom-rules', icon: Pencil, title: 'Custom Rules', tag: 'Advanced',
    what: 'Make your own Show/Hide rules with the highest priority. Pick a class and base types from image dropdowns — still no typing required.',
    steps: [
      'Click "Add Custom Rule".',
      'Choose Show or Hide, then pick Class / Base Types from the dropdowns.',
      'Set rarity, drop-tier styling, and item level. Reorder for priority.',
    ],
    visual: (
      <div className="panel p-2 w-full max-w-[340px]">
        <div className="flex flex-wrap items-center gap-1">
          <span className="px-2 h-7 grid place-items-center rounded bg-poe-steel/80 text-white text-[11px]">Show</span>
          <MockField w={90}>Rings</MockField>
          <MockField w={90}>All Items</MockField>
          <MockField w={70}>≥ Rare</MockField>
        </div>
      </div>
    ),
  },
  {
    id: 'cosmetic', to: '/cosmetic', icon: Shirt, title: 'Cosmetic', tag: 'Looks',
    what: 'Control how drops look — text colour, beams, minimap icons and sounds for each value tier. Hear each sound before you pick it.',
    steps: [
      'Pick the Currency / Items / Uniques sub-tab.',
      'For each tier, set the beam, minimap icon and drop sound.',
      'Press ▶ to preview a sound; the label preview shows the result live.',
    ],
    visual: (
      <div className="flex items-center gap-3">
        <ItemLabel text="Divine Orb" textColor={[224, 64, 64]} beam="Red" minimap fontSize={36} />
        <span className="inline-flex items-center gap-1 text-[11px] text-poe-text-bright bg-black border border-poe-line rounded px-2 h-7">
          <Volume2 size={12} className="text-poe-gold" /> Sound 6
        </span>
      </div>
    ),
  },
  {
    id: 'preview', to: '/preview', icon: Eye, title: 'Preview', tag: 'Check',
    what: 'See your filter rendered as real in-game item labels over a game scene, so you know exactly what it will look like before you play.',
    steps: [
      'Toggle Beams on/off and switch the background scene.',
      'Confirm valuable drops stand out and clutter is hidden.',
      'When happy, use "Save to new file" (bottom bar) to export.',
    ],
    visual: (
      <div className="rounded border border-poe-line p-4 flex flex-wrap gap-x-6 gap-y-3 justify-center"
        style={{ background: 'radial-gradient(120% 90% at 50% 10%, #1a2417 0%, #0c120c 70%), #0a0e0a' }}>
        <ItemLabel text="Mirror of Kalandra" textColor={[182, 96, 224]} beam="Purple" minimap fontSize={34} />
        <ItemLabel text="Exalted Orb" textColor={[224, 144, 42]} beam="Orange" minimap fontSize={32} />
        <ItemLabel text="Iron Ring" textColor={[200, 200, 200]} fontSize={30} />
      </div>
    ),
  },
  {
    id: 'community', to: '/community', icon: Users, title: 'Community Filters', tag: 'Share',
    what: "Share the filter you've built, or grab one from another exile. Publish your current filter (with its editable settings so others can load it), or paste / upload a raw .filter — drag-and-drop works too.",
    steps: [
      'Share your current filter, or switch to “Paste / upload” to drop in a .filter file or paste its text.',
      'Add a filter name, your name, and a short description — all three are required.',
      'Browse what others shared: Download the .filter, Copy it, or Load it straight into the editor.',
    ],
    visual: (
      <div className="panel p-3 w-full max-w-[320px]">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <div className="text-poe-text-bright text-[13px] font-medium truncate">Endgame Strict</div>
            <div className="text-[11px] text-poe-text/70">by Exile · Path of Exile 2</div>
          </div>
          <span className="inline-flex items-center gap-1 text-[11px] text-poe-text/70"><Download size={12} /> 42</span>
        </div>
        <p className="text-[11.5px] text-poe-text mt-1.5">Tuned for very late maps — hides clutter, highlights chase items.</p>
        <div className="mt-2 flex flex-wrap gap-1.5">
          <span className="btn-dark h-7 text-[11px]"><Download size={12} /> Download</span>
          <span className="btn-dark h-7 text-[11px]"><Clipboard size={12} /> Copy</span>
          <span className="btn-dark h-7 text-[11px]"><FolderInput size={12} /> Load</span>
        </div>
      </div>
    ),
  },
]

export function GuidePage() {
  const { navigate } = useRouter()
  return (
    <div className="space-y-6">
      <header className="text-center">
        <h1 className="gold-heading text-[22px]">How to Use Nolvus's Filter</h1>
        <p className="text-[12.5px] text-poe-text mt-1 max-w-[700px] mx-auto">
          New here? Each tab does one job. On <span className="text-poe-text-bright">Presets</span> you start blank, import an existing filter, or pick a preset — then fine-tune in the <span className="text-poe-text-bright">Quick Editor</span>, <span className="text-poe-text-bright">Preview</span>, and save. You can also share or grab filters on the <span className="text-poe-text-bright">Community</span> page. Here's what each tab is for.
        </p>
      </header>

      <ol className="space-y-4">
        {GUIDE.map((g, i) => {
          const Icon = g.icon
          return (
            <li key={g.id} className="panel p-4">
              <div className="grid grid-cols-1 lg:grid-cols-[1fr_minmax(280px,360px)] gap-4 items-center">
                <div>
                  <div className="flex items-center gap-2.5 mb-2">
                    <span className="w-8 h-8 grid place-items-center rounded bg-poe-gold/10 border border-poe-gold-dim/50 text-poe-gold shrink-0">
                      <Icon size={16} />
                    </span>
                    <div>
                      <button onClick={() => navigate(g.to)} className="gold-heading text-[16px] hover:underline text-left">
                        {i + 1}. {g.title}
                      </button>
                      <span className="ml-2 text-[10px] uppercase tracking-wide text-poe-text/70 border border-poe-line rounded px-1 py-0.5">{g.tag}</span>
                    </div>
                  </div>
                  <p className="text-[12.5px] text-poe-text mb-2">{g.what}</p>
                  <ul className="space-y-1">
                    {g.steps.map((s, j) => (
                      <li key={j} className="flex items-start gap-2 text-[12.5px] text-poe-text-bright">
                        <span className="text-poe-gold mt-px"><Check size={13} /></span>{s}
                      </li>
                    ))}
                  </ul>
                  <button onClick={() => navigate(g.to)} className="btn-dark h-7 text-[11px] mt-3">Open {g.title} →</button>
                </div>
                <div className="flex justify-center lg:justify-end">{g.visual}</div>
              </div>
            </li>
          )
        })}
      </ol>

      <div className="panel p-4 space-y-2.5 text-center">
        <p className="text-[12.5px] text-poe-text">
          <span className="inline-flex items-center gap-1 text-poe-text-bright"><FilePlus2 size={13} className="text-poe-gold" /> Save to new file</span> (top bar) downloads a <code className="font-mono">.filter</code> for your
          <span className="text-poe-text-bright"> Documents\My Games\Path of Exile 2</span> folder, bumping the version each time.
          <span className="inline-flex items-center gap-1 text-poe-text-bright ml-1"><Upload size={13} className="text-poe-gold" /> Import</span> loads an existing <code className="font-mono">.filter</code> or <code className="font-mono">.json</code> back in — or open one for editing to overwrite it later.
        </p>
        <p className="text-[12px] text-poe-text/85">
          Use the filter name up top to keep several filters and switch between them (<span className="text-poe-text-bright">Create New</span> offers the same blank / preset / import start). Pick your look — theme, typeface and text size — in <span className="text-poe-text-bright">Settings</span>. The legend <span className="text-poe-gold">(?)</span> in the top-right explains every symbol.
        </p>
      </div>
    </div>
  )
}

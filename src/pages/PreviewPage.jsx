import React, { useMemo, useState } from 'react'
import { Eye, EyeOff, Volume2, VolumeX, ShieldCheck, FlaskConical, ChevronDown, ChevronRight } from 'lucide-react'
import { useFilter } from '../store/FilterStore.jsx'
import { usePrefs } from '../store/Prefs.jsx'
import { useGameInfo } from '../store/GameInfo.jsx'
import { useCatalog } from '../lib/catalog.js'
import { DROP_TIERS } from '../data/dropTiers.js'
import { ItemLabel } from '../components/ItemLabel.jsx'
import { Toggle } from '../components/primitives.jsx'
import { generateFilter } from '../lib/generate.js'
import { parseFilterBlocks, evaluateItem, explainItem } from '../lib/filterEngine.js'
import { parseGameItem } from '../lib/parseGameItem.js'

// Example drops per tier (currency-flavoured), to visualise the styling like the real Preview.
const SAMPLES = [
  { tier: 'S', text: 'Mirror of Kalandra' },
  { tier: 'A', text: 'Divine Orb' },
  { tier: 'A', text: 'Perfect Jeweller’s Orb' },
  { tier: 'B', text: 'Exalted Orb' },
  { tier: 'B', text: 'Greater Jeweller’s Orb' },
  { tier: 'C', text: 'Chaos Orb' },
  { tier: 'C', text: 'Regal Orb' },
  { tier: 'C', text: 'Stellar Amulet' },
  { tier: 'D', text: 'Orb of Augmentation' },
  { tier: 'D', text: 'Scroll of Wisdom' },
  { tier: 'E', text: 'Iron Ring' },
]
const UNIQUE = { text: 'The Pariah', textColor: [175, 96, 37], beam: 'Brown' }
const BACKGROUNDS = ['Woods', 'Desert', 'Marshes', 'Caves']

const RARITY_COLOR = { Normal: [200, 200, 200], Magic: [136, 136, 255], Rare: [255, 255, 119], Unique: [175, 96, 37] }

// "Did I just vendor a Mirror?" — the items a beginner most fears losing. Structured so we
// can run them straight through the engine without anyone pasting anything.
const CHASE_ITEMS = [
  { label: 'Mirror of Kalandra', item: cur('Mirror of Kalandra') },
  { label: 'Divine Orb', item: cur('Divine Orb') },
  { label: 'Exalted Orb', item: cur('Exalted Orb') },
  { label: 'Chaos Orb', item: cur('Chaos Orb') },
  { label: 'Any Unique', item: { itemClass: 'Body Armours', itemClassRaw: 'Body Armours', baseType: 'Astral Plate', rarity: 'Unique', itemLevel: 80 } },
]
function cur(baseType) {
  return { itemClass: 'Currency', itemClassRaw: 'Stackable Currency', baseType, rarity: 'Normal', stackSize: 1 }
}

export function PreviewPage() {
  const { active } = useFilter()
  const { prefs, update } = usePrefs()
  const gameInfo = useGameInfo()
  // Remembered across visits (QoL) so the Preview looks the way you left it.
  const beams = prefs.previewBeams !== false
  const setBeams = (v) => update({ previewBeams: v })
  const bg = prefs.previewBg || 'Woods'
  const setBg = (v) => update({ previewBg: v })
  const ts = active.cosmetic?.tierStyles || {}

  // The actual filter the player would use — parsed into rule blocks for the tester.
  const blocks = useMemo(() => {
    const text = generateFilter(active, { ...prefs, gameVersion: gameInfo.gameVersion, gameVersionLabel: gameInfo.gameVersionLabel })
    return parseFilterBlocks(text)
  }, [active, prefs, gameInfo])

  const tierStyle = (id) => {
    const t = DROP_TIERS.find(d => d.id === id)
    const st = ts[id] || {}
    const beam = st.beam ?? (t.beam ? cap(t.beam) : 'None')
    return { ...t, beam: beam === 'None' ? null : beam, hide: st.hide ?? !!t.hide }
  }

  return (
    <div className="space-y-4">
      {/* controls */}
      <div className="flex flex-wrap items-center gap-4">
        <Toggle checked={beams} onChange={setBeams} label="Beams" />
        <span className="text-[12px] text-poe-text">Background:</span>
        <div className="flex gap-1">
          {BACKGROUNDS.map(b => (
            <button key={b} onClick={() => setBg(b)}
              className={`px-2 h-7 text-[11px] rounded border ${bg === b ? 'border-poe-gold text-poe-gold' : 'border-poe-line text-poe-text hover:text-poe-heading'}`}>{b}</button>
          ))}
        </div>
      </div>

      {/* the in-game scene */}
      <div className="relative rounded border border-poe-line overflow-hidden min-h-[300px]"
        style={{ background: SCENE[bg] }}>
        <div className="absolute inset-0 flex flex-wrap items-center justify-center gap-x-10 gap-y-9 p-10">
          {SAMPLES.map((s, i) => {
            const t = tierStyle(s.tier)
            if (t.hide) return null
            return <ItemLabel key={i} text={s.text} textColor={t.textColor} beam={t.beam}
              minimap={!!t.beam} showBeam={beams} fontSize={32 + (s.tier === 'S' ? 8 : s.tier === 'A' ? 5 : 0)} />
          })}
          <ItemLabel text={UNIQUE.text} textColor={UNIQUE.textColor} beam={UNIQUE.beam} minimap showBeam={beams} fontSize={36} />
        </div>
      </div>

      <p className="text-[11.5px] text-poe-text text-center">
        Live preview of how <span className="text-poe-text-bright">{active.name}</span> renders in-game. Tier colors, beams and minimap icons come from your Cosmetic settings.
      </p>

      <DropTester blocks={blocks} />
    </div>
  )
}

// Paste any in-game item and see what THIS filter actually does with it.
function DropTester({ blocks }) {
  const catalog = useCatalog()
  const [text, setText] = useState('')
  const [chase, setChase] = useState(null)

  const parsed = useMemo(() => (text.trim() ? parseGameItem(text, catalog) : null), [text, catalog])
  const explain = useMemo(() => (parsed && (parsed.baseType || parsed.itemClass) ? explainItem(blocks, parsed) : null), [parsed, blocks])

  const runChase = () => setChase(CHASE_ITEMS.map(c => ({ label: c.label, v: evaluateItem(blocks, c.item) })))

  return (
    <div className="panel p-4 space-y-3">
      <div className="flex items-center gap-2">
        <span className="w-7 h-7 grid place-items-center rounded bg-poe-gold/10 border border-poe-gold-dim/50 text-poe-gold"><FlaskConical size={15} /></span>
        <div>
          <div className="gold-heading text-[15px]">Will this drop show?</div>
          <div className="text-[11.5px] text-poe-text">Paste a real item and see exactly what your filter does with it — before you ever load the game.</div>
        </div>
      </div>

      {/* Chase-item reassurance */}
      <div className="rounded border border-poe-line bg-black/40 p-2.5">
        <div className="flex flex-wrap items-center gap-2">
          <button onClick={runChase} className="btn-dark h-8"><ShieldCheck size={14} /> Check valuable drops</button>
          <span className="text-[11.5px] text-poe-text">Make sure the chase items can’t slip past your filter.</span>
        </div>
        {chase && (
          <div className="mt-2 flex flex-wrap gap-1.5">
            {chase.map(({ label, v }) => {
              const hidden = v.action === 'Hide'
              return (
                <span key={label} className={`inline-flex items-center gap-1 rounded px-2 py-1 text-[11px] border ${hidden ? 'border-poe-danger/50 text-poe-danger' : 'border-emerald-500/40 text-emerald-300'}`} style={{ backgroundColor: '#000' }}>
                  {hidden ? <EyeOff size={12} /> : <Eye size={12} />} {label}
                </span>
              )
            })}
          </div>
        )}
      </div>

      {/* Paste + verdict */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <textarea value={text} onChange={e => setText(e.target.value)}
          className="field h-40 font-mono text-[11px] py-1.5"
          placeholder={'Hover an item in-game, press Ctrl+C, paste here…\n\nItem Class: Sceptres\nRarity: Unique\nGuiding Palm of the Mind\nShrine Sceptre\n--------'} />
        <div className="rounded border border-poe-line bg-black/40 p-3 grid place-items-center min-h-[160px]">
          {!parsed ? (
            <span className="text-[12px] text-poe-text/70 text-center">Your filter’s verdict will appear here.</span>
          ) : !explain ? (
            <span className="text-[12px] text-poe-danger text-center">Couldn’t read that as an item — copy a whole item with Ctrl+C.</span>
          ) : (
            <Verdict item={parsed} explain={explain} />
          )}
        </div>
      </div>
    </div>
  )
}

function Verdict({ item, explain }) {
  const [why, setWhy] = useState(false)
  const v = explain.verdict
  const matches = explain.matches || []
  const hidden = v.action === 'Hide'
  const s = v.styles || {}
  const textColor = s.textColor && s.textColor.length >= 3 ? s.textColor : (RARITY_COLOR[item.rarity] || [200, 200, 200])
  const label = item.name || item.baseType || 'Item'

  const sound = s.customSound ? `Custom sound (${s.customSound})`
    : s.muted ? 'Drop sound off'
    : s.sound ? `Plays alert sound ${s.sound}`
    : 'No alert sound'

  return (
    <div className="w-full text-center space-y-2.5">
      {hidden ? (
        <span className="inline-flex items-center gap-1.5 text-[13px] font-medium text-poe-danger"><EyeOff size={15} /> Hidden — you won’t see this</span>
      ) : (
        <span className="inline-flex items-center gap-1.5 text-[13px] font-medium text-emerald-300"><Eye size={15} /> Shows on the ground</span>
      )}

      <div className="flex justify-center py-1">
        {hidden
          ? <span className="text-[12px] line-through opacity-60" style={{ color: `rgb(${textColor.join(',')})` }}>{label}</span>
          : <ItemLabel text={label} textColor={textColor} beam={s.beam} minimap={!!s.beam} fontSize={s.fontSize || 32} />}
      </div>

      <div className="text-[11.5px] text-poe-text space-y-0.5">
        <div>
          {v.matched
            ? <>Decided by: <span className="text-poe-text-bright">{v.comment || '(unnamed rule)'}</span></>
            : <span className="text-poe-text/80">No rule matched — shown with the game’s default style.</span>}
        </div>
        {!hidden && (
          <div className="inline-flex items-center gap-1 text-poe-text/80">
            {s.sound && !s.muted ? <Volume2 size={12} className="text-poe-gold" /> : <VolumeX size={12} />} {sound}
          </div>
        )}
      </div>

      {/* Why? — the full list of rules this item matched, in filter order. */}
      <div className="pt-1 text-left">
        <button onClick={() => setWhy(w => !w)} className="text-[11px] text-poe-gold hover:underline inline-flex items-center gap-1">
          {why ? <ChevronDown size={12} /> : <ChevronRight size={12} />} Why? {matches.length > 1 ? `(matched ${matches.length} rules)` : ''}
        </button>
        {why && (
          <div className="mt-1.5 rounded border border-poe-line bg-black p-2 space-y-1">
            <p className="text-[11px] text-poe-text/80">
              The game reads your filter top-down and uses the <span className="text-poe-text-bright">first</span> rule an item matches. {matches.length > 1 ? 'Lower matches never get a say:' : ''}
            </p>
            {matches.length === 0 ? (
              <div className="text-[11px] text-poe-text">No rule matched this item, so the game shows it with default styling.</div>
            ) : (
              <ol className="space-y-0.5">
                {matches.map((m, i) => (
                  <li key={m.index} className={`flex items-center gap-2 text-[11.5px] ${i === 0 ? '' : 'opacity-55'}`}>
                    <span className={`inline-flex items-center justify-center w-9 text-[10px] rounded px-1 py-0.5 border ${m.action === 'Hide' ? 'border-poe-danger/50 text-poe-danger' : 'border-emerald-500/40 text-emerald-300'}`}>{m.action}</span>
                    <span className="flex-1 text-poe-text-bright truncate">{m.comment || '(unnamed rule)'}</span>
                    {i === 0 && <span className="text-[10px] text-poe-gold shrink-0">← applied</span>}
                  </li>
                ))}
              </ol>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

const cap = (s) => s ? s[0].toUpperCase() + s.slice(1) : s
const SCENE = {
  Woods: 'radial-gradient(120% 90% at 50% 10%, #1a2417 0%, #0c120c 70%), #0a0e0a',
  Desert: 'radial-gradient(120% 90% at 50% 10%, #2a2418 0%, #120f0a 70%), #100c08',
  Marshes: 'radial-gradient(120% 90% at 50% 10%, #16221f 0%, #0a1110 70%), #08100e',
  Caves: 'radial-gradient(120% 90% at 50% 10%, #201a22 0%, #0d0a10 70%), #0a080d',
}

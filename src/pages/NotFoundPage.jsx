import React from 'react'
import { Home, Compass } from 'lucide-react'
import { useRouter } from '../lib/router.jsx'

// Cool PoE2-flavoured 404 for unknown in-app routes.
export function NotFoundPage() {
  const { navigate } = useRouter()
  return (
    <div className="min-h-[62vh] flex flex-col items-center justify-center text-center px-4 select-none">
      <div className="relative">
        <div
          className="gold-heading font-bold leading-none tracking-tight"
          style={{ fontSize: 'clamp(88px, 16vw, 150px)', textShadow: '0 6px 30px rgba(0,0,0,0.85)' }}
        >404</div>
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 blur-[60px] opacity-30"
          style={{ background: 'radial-gradient(closest-side, rgb(var(--c-accent) / 0.7), transparent)' }}
        />
      </div>

      <div className="mt-3 flex items-center gap-3">
        <span className="h-px w-10 bg-poe-line" />
        <span className="text-poe-gold text-[11px] uppercase tracking-[0.35em] font-display">Off the map</span>
        <span className="h-px w-10 bg-poe-line" />
      </div>

      <h1 className="heading text-[22px] text-poe-heading mt-4">You've wandered into the void, Exile.</h1>
      <p className="text-[13px] text-poe-text mt-3 max-w-[480px] leading-relaxed">
        Whatever you sought here has crumbled to dust — a page or relic that does not exist,
        or was never yours to take. The path ahead is sealed.
      </p>

      <div className="flex flex-wrap items-center justify-center gap-2 mt-7">
        <button className="btn-action" onClick={() => navigate('/presets')}><Home size={14} /> Return to safety</button>
        <button className="btn-dark" onClick={() => navigate('/community')}><Compass size={14} /> Browse community filters</button>
      </div>

      <div className="mt-10 text-[10px] uppercase tracking-[0.3em] text-poe-text/35 font-display">Nolvus · PoE2 Filter Editor</div>
    </div>
  )
}

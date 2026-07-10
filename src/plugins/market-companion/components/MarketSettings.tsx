import { useSettings, REFRESH_OPTIONS } from "../store/settings";
import { playAlert } from "../lib/sound";
import { useToast } from "../../../store/Toast.jsx";

// Market Companion settings panel (Settings ▸ Plugins ▸ Market Companion), ported from the
// Companion's Settings page — the Market (auto-refresh) and Alerts (chime + volume) sections plus
// the reset action and the data-source credits. League and base currency stay on the Market page
// itself where the Companion's header had them. Left-aligned, content-width controls (house rules).
function Row({ label, help, children }: { label: string; help?: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-4 py-2">
      <div className="w-56 shrink-0">
        <div className="text-[13px] text-poe-text-bright">{label}</div>
        {help && <div className="text-[11px] text-poe-text/50">{help}</div>}
      </div>
      {children}
    </div>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <div className="mb-1 mt-4 text-[11px] uppercase tracking-[0.18em] text-poe-gold first:mt-0">{children}</div>;
}

export function MarketSettings() {
  const { refreshMs, soundEnabled, soundVolume, setRefreshMs, setSoundEnabled, setSoundVolume } = useSettings();
  const toast = useToast();

  async function resetData() {
    const ok = toast.confirm
      ? await toast.confirm(
          "Reset the Market Companion's saved data? This clears your watchlists, price alerts and market preferences. It can't be undone.",
          { title: "Reset Market data", confirmLabel: "Reset" },
        )
      : window.confirm("Reset all Market Companion data?");
    if (!ok) return;
    ["nolpoc-settings", "poe2companion-watch"].forEach((k) => {
      try {
        localStorage.removeItem(k);
      } catch {
        void 0;
      }
    });
    location.reload();
  }

  return (
    <div className="max-w-xl text-left">
      <SectionTitle>Market</SectionTitle>
      <Row label="Auto-refresh" help="How often live prices update.">
        <select value={refreshMs} onChange={(e) => setRefreshMs(Number(e.target.value))} className="field h-7 w-44 text-sm">
          {REFRESH_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </Row>

      <SectionTitle>Alerts</SectionTitle>
      <Row label="Alert sound" help="Play a chime when a price alert is crossed.">
        <button
          onClick={() => setSoundEnabled(!soundEnabled)}
          className={`relative h-5 w-10 rounded-full border transition-colors ${
            soundEnabled ? "border-poe-gold/60 bg-white/[0.10]" : "border-poe-line bg-black/40"
          }`}
          title={soundEnabled ? "On" : "Off"}
        >
          <span
            className={`absolute top-0.5 h-3.5 w-3.5 rounded-full transition-all ${
              soundEnabled ? "left-[1.35rem] bg-poe-gold" : "left-0.5 bg-poe-text/40"
            }`}
          />
        </button>
      </Row>
      <Row label="Volume">
        <div className="flex items-center gap-3">
          <input
            type="range"
            min={0}
            max={1}
            step={0.05}
            value={soundVolume}
            disabled={!soundEnabled}
            onChange={(e) => setSoundVolume(Number(e.target.value))}
            className="w-40 disabled:opacity-40"
            style={{ accentColor: "rgb(var(--c-accent))" }}
          />
          <span className="w-10 text-right text-xs tabular-nums text-poe-text/60">{Math.round(soundVolume * 100)}%</span>
          <button
            onClick={() => playAlert(soundVolume)}
            disabled={!soundEnabled}
            className="rounded border border-poe-line px-2 py-0.5 text-xs text-poe-text/60 hover:text-poe-gold disabled:opacity-40"
          >
            Test
          </button>
        </div>
      </Row>

      <SectionTitle>Data</SectionTitle>
      <Row label="Watchlists" help="Back up or move your lists and alerts.">
        <span className="text-xs text-poe-text/60">Export / Import lives on the Market page → ★ Watchlist.</span>
      </Row>
      <Row label="Reset" help="Clear watchlists, alerts and market preferences.">
        <button
          onClick={resetData}
          className="rounded border border-red-800/50 px-3 py-1 text-xs text-red-300 hover:bg-red-900/20"
        >
          Reset Market data
        </button>
      </Row>

      <div className="mt-5 border-t border-poe-line/60 pt-3 text-[11px] leading-relaxed text-poe-text/40">
        Data sources: <span className="text-poe-text/60">poe2scout</span> (economy &amp; price data),{" "}
        <span className="text-poe-text/60">PoE2 Wiki</span> (currency articles),{" "}
        <span className="text-poe-text/60">Grinding Gear Games</span> (game assets via web.poecdn.com),{" "}
        <span className="text-poe-text/60">TradingView lightweight-charts</span> (charting). Unofficial fan-made
        companion — not affiliated with or endorsed by GGG.
      </div>
    </div>
  );
}

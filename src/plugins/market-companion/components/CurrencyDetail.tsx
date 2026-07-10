import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSettings } from "../store/settings";
import PriceChart from "./PriceChart";
import { fmtNum, fmtCompact, fmtPct } from "../../../lib/market/format";
import { buyUrl, sellUrl } from "../../../lib/market/trade";
import { fetchDetail } from "../../../lib/market/client";
import { computeSignal } from "../../../lib/market/signal";
import WikiPanel from "./WikiPanel";

// Ported from the Marketplace Companion (components/market/CurrencyDetail.tsx) — same chart +
// timeframe + 8-stat behavior; nolvusfilter theme; data via the Supabase edge function. The
// Companion's per-currency page (CurrencyPageView: detail + wiki article) is folded in here as the
// "About" toggle, which swaps the chart for the live PoE2 Wiki article.
type TF = "24H" | "7D" | "30D" | "ALL";
const TABS: TF[] = ["24H", "7D", "30D", "ALL"];

function Change({ v, big = false }: { v: number; big?: boolean }) {
  const pos = v >= 0;
  return (
    <span
      className={`tabular-nums ${big ? "text-base px-2 py-0.5" : "text-xs px-1.5 py-0.5"} rounded border ${
        pos ? "text-emerald-400 border-emerald-700/50 bg-emerald-900/20" : "text-red-400 border-red-800/50 bg-red-900/20"
      }`}
    >
      {pos ? "▲" : "▼"} {fmtPct(v)}
    </span>
  );
}

function Stat({ label, value, tone, hint }: { label: string; value: string; tone?: "gain" | "loss"; hint?: string }) {
  return (
    <div className="bg-black/20 px-3 py-2" title={hint}>
      <div className="flex items-center gap-1 text-[10px] uppercase tracking-[0.15em] text-poe-text/60">
        <span className="decoration-dotted underline-offset-2 [text-decoration-line:underline] decoration-poe-line">{label}</span>
      </div>
      <div className={`tabular-nums text-sm ${tone === "gain" ? "text-emerald-400" : tone === "loss" ? "text-red-400" : "text-poe-text-bright"}`}>
        {value}
      </div>
    </div>
  );
}

export default function CurrencyDetail({ apiId }: { apiId: string | null }) {
  const { league, base, refreshMs } = useSettings();
  const [tf, setTf] = useState<TF>("7D");
  const [about, setAbout] = useState(false);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["detail", apiId, league, base],
    enabled: !!apiId && !!league,
    refetchInterval: refreshMs || false,
    queryFn: () => fetchDetail(league!, base, apiId!),
  });

  const chart = useMemo(() => {
    if (!data) return { kind: "area" as const, candles: [], points: [] };
    if (tf === "24H") return { kind: "area" as const, candles: [], points: data.hourly.slice(-24) };
    if (tf === "7D") return { kind: "area" as const, candles: [], points: data.hourly };
    if (tf === "30D") return { kind: "candle" as const, candles: data.daily.slice(-30), points: [] };
    return { kind: "candle" as const, candles: data.daily, points: [] };
  }, [data, tf]);

  if (!apiId)
    return <div className="panel h-full grid place-items-center text-poe-text/60 tracking-wide">Select a currency to inspect</div>;
  if (isLoading) return <div className="panel h-full grid place-items-center text-poe-text/60">Loading…</div>;
  if (isError || !data) return <div className="panel h-full grid place-items-center text-red-400">Detail unavailable</div>;

  const s = data.stats;
  const signal = computeSignal(s);
  const unit = data.baseLabel === "Divine" ? "div" : "ex";
  const altUnit = data.baseLabel === "Divine" ? "ex" : "div";
  const altValue = data.baseLabel === "Divine" ? s.current * data.divinePrice : s.current / data.divinePrice;
  const hasChart =
    (chart.kind === "candle" && chart.candles.length > 0) || (chart.kind === "area" && chart.points.length > 0);

  return (
    <div className="panel h-full flex flex-col overflow-hidden">
      <div className="flex items-center gap-3 border-b border-poe-line px-4 py-3">
        <img src={data.iconPath} alt="" width={38} height={38} className="drop-shadow" />
        <div className="min-w-0">
          <div className="gold-heading text-lg leading-tight truncate">{data.name}</div>
          <div className="text-[10px] uppercase tracking-[0.2em] text-poe-text/60">{data.category}</div>
        </div>
        <div className="ml-auto text-right">
          <div className="tabular-nums text-2xl text-poe-text-bright">
            {fmtNum(s.current)} <span className="text-sm text-poe-text/50">{unit}</span>
          </div>
          <div className="tabular-nums text-[11px] text-poe-text/50" title={`Same value in ${altUnit === "div" ? "Divine" : "Exalted"} Orbs`}>
            ≈ {fmtNum(altValue)} {altUnit}
          </div>
          <div className="mt-0.5">
            <Change v={s.change24h} big />
          </div>
          {league ? (
            <div className="mt-2 flex justify-end gap-1.5">
              <a href={buyUrl(league, data.apiId, base)} target="_blank" rel="noopener noreferrer"
                title="Buy on the official PoE2 Currency Exchange"
                className="rounded border border-emerald-700/50 bg-emerald-900/20 px-3 py-1 text-xs tracking-wide text-emerald-300 transition-colors hover:bg-emerald-900/40">
                Buy ↗
              </a>
              <a href={sellUrl(league, data.apiId, base)} target="_blank" rel="noopener noreferrer"
                title="Sell on the official PoE2 Currency Exchange"
                className="rounded border border-red-800/50 bg-red-900/20 px-3 py-1 text-xs tracking-wide text-red-300 transition-colors hover:bg-red-900/40">
                Sell ↗
              </a>
            </div>
          ) : null}
        </div>
      </div>

      <div
        className="flex items-center gap-2 border-b border-poe-line px-4 py-2"
        title={`Market signal (from recent price action):\n• ${signal.reasons.join("\n• ")}`}
      >
        <span
          className={`inline-flex items-center gap-1 rounded px-2 py-0.5 text-[12px] font-medium border ${
            signal.action === "buy"
              ? "text-emerald-300 border-emerald-700/50 bg-emerald-900/20"
              : signal.action === "sell"
                ? "text-red-300 border-red-800/50 bg-red-900/20"
                : "text-poe-gold border-poe-gold/40 bg-white/[0.06]"
          }`}
        >
          {signal.action === "buy" ? "▲" : signal.action === "sell" ? "▼" : "●"} {signal.label}
        </span>
        <span className="min-w-0 truncate text-[11.5px] text-poe-text/70">{signal.reasons.slice(0, 2).join(" · ")}</span>
        <span className="ml-auto shrink-0 text-[10px] uppercase tracking-[0.15em] text-poe-text/40">Signal</span>
      </div>

      <div className="flex items-center gap-1 border-b border-poe-line px-3 py-1.5">
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => {
              setTf(t);
              setAbout(false);
            }}
            className={`tabular-nums px-2.5 py-1 text-xs rounded transition-colors ${
              tf === t && !about ? "bg-white/[0.06] text-poe-gold" : "text-poe-text/60 hover:text-poe-gold"
            }`}
          >
            {t}
          </button>
        ))}
        <button
          onClick={() => setAbout((v) => !v)}
          title="What this currency does — live from the PoE2 Wiki"
          className={`px-2.5 py-1 text-xs rounded transition-colors ${
            about ? "bg-white/[0.06] text-poe-gold" : "text-poe-text/60 hover:text-poe-gold"
          }`}
        >
          ⓘ About
        </button>
        <span className="ml-auto text-[10px] uppercase tracking-[0.15em] text-poe-text/60">{data.baseLabel} · per unit</span>
      </div>

      <div className="relative min-h-0 flex-1 px-1 py-1">
        {about ? (
          <div className="h-full overflow-y-auto">
            <WikiPanel name={data.name} />
          </div>
        ) : hasChart ? (
          <PriceChart kind={chart.kind} candles={chart.candles} points={chart.points} unit={unit} />
        ) : (
          <div className="grid h-full place-items-center text-poe-text/60 text-sm">No {tf} data for this currency</div>
        )}
      </div>

      <div className="grid grid-cols-2 gap-px border-t border-poe-line bg-poe-line sm:grid-cols-4">
        <Stat label="Day Open" value={fmtNum(s.open)} hint="Price when the latest day started" />
        <Stat label="Latest" value={fmtNum(s.close)} hint="Most recent price (latest day's close)" />
        <Stat label="24h High" value={fmtNum(s.high24h)} hint="Highest price in the last 24 hours" />
        <Stat label="24h Low" value={fmtNum(s.low24h)} hint="Lowest price in the last 24 hours" />
        <Stat label="7-Day" value={fmtPct(s.change7d)} tone={s.change7d >= 0 ? "gain" : "loss"} hint="Price move over the past 7 days" />
        <Stat label="30-Day" value={fmtPct(s.change30d)} tone={s.change30d >= 0 ? "gain" : "loss"} hint="Price move over the past 30 days" />
        <Stat label="Traded 24h" value={fmtCompact(s.volume24h)} hint="How many were traded in the last 24 hours" />
        <Stat label="For Sale" value={fmtCompact(s.listed)} hint="How many are listed for sale right now" />
      </div>
    </div>
  );
}

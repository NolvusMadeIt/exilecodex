import { useMemo, useState } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { ArrowLeft, TrendingUp, TrendingDown, Activity } from "lucide-react";
import { useSettings } from "../store/settings";
import { fetchCurrencies } from "../../../lib/market/client";
import { fmtNum, fmtCompact, denominate } from "../../../lib/market/format";
import { rankMovers, type RankedMover } from "../lib/signals";
import SellCallBadge from "./SellCallBadge";
import Sparkline from "./Sparkline";
import { EmptyState, ErrorState } from "./States";

// The exiledtools "Economy" page, ported to our design: movers scored against each item's OWN
// range (see signals.ts), split into Rising / Falling / Top Volume. All computed client-side from
// the currency rows we already fetch — no scraping. Honest by construction: signals are
// tendencies, and the panel says so.
const TABS = [
  { id: "rising", label: "Rising", icon: TrendingUp },
  { id: "falling", label: "Falling", icon: TrendingDown },
  { id: "volume", label: "Top Volume", icon: Activity },
] as const;
type Kind = (typeof TABS)[number]["id"];

export default function MoversView({ onBack, onSelect }: { onBack: () => void; onSelect: (apiId: string) => void }) {
  const { league, base, refreshMs } = useSettings();
  const [kind, setKind] = useState<Kind>("rising");
  const unit = base === "divine" ? "div" : "ex";

  // Movers are a whole-market read, so pull the biggest categories in one query and pool them.
  const cats = ["currency", "fragments", "essences", "runes"];
  const { data, isLoading: loading, isError: error } = useQuery({
    queryKey: ["movers", league, base],
    enabled: !!league,
    refetchInterval: refreshMs || false,
    placeholderData: keepPreviousData,
    queryFn: async () => {
      const results = await Promise.all(cats.map((c) => fetchCurrencies(league!, base, c).catch(() => null)));
      const seen = new Set<string>();
      const out = [];
      for (const res of results) for (const r of res?.rows ?? []) if (!seen.has(r.apiId)) (seen.add(r.apiId), out.push(r));
      return { rows: out, divinePrice: results.find((r) => r?.divinePrice)?.divinePrice ?? 1 };
    },
  });
  const pooled = data?.rows ?? [];
  const divinePrice = data?.divinePrice ?? 1;

  const movers = useMemo(() => rankMovers(pooled, kind, 12), [pooled, kind]);

  return (
    <div className="panel flex min-h-0 flex-1 flex-col overflow-hidden">
      <div className="flex items-center gap-3 border-b border-poe-line px-4 py-2.5">
        <button onClick={onBack} className="btn-dark h-7 px-2 text-[12px]" title="Back to the market table">
          <ArrowLeft size={13} /> Market
        </button>
        <h1 className="gold-heading text-base tracking-wide">Market Movers</h1>
        <span className="ml-auto text-[11px] text-poe-text/45">scored vs each item's own range</span>
      </div>

      <div className="flex gap-1 border-b border-poe-line px-2 py-1.5">
        {TABS.map((t) => {
          const on = t.id === kind;
          const Icon = t.icon;
          return (
            <button
              key={t.id}
              onClick={() => setKind(t.id)}
              className={`inline-flex items-center gap-1.5 rounded px-3 py-1 text-[12px] transition-colors ${
                on ? "bg-white/[0.06] text-poe-gold" : "text-poe-text/60 hover:bg-white/5 hover:text-poe-gold"
              }`}
            >
              <Icon size={13} /> {t.label}
            </button>
          );
        })}
      </div>

      {loading && !pooled.length ? (
        <EmptyState message="Reading the market…" />
      ) : error ? (
        <ErrorState message="Market data is temporarily unavailable." />
      ) : !movers.length ? (
        <EmptyState message="Nothing notable moving right now." />
      ) : (
        <div className="min-h-0 flex-1 overflow-y-auto">
          <table className="w-full border-collapse text-sm">
            <thead className="sticky top-0 z-10 bg-poe-panel text-[10px] uppercase tracking-wider text-poe-text/50">
              <tr className="border-b border-poe-line">
                <th className="py-2 pl-4 text-left font-medium">#</th>
                <th className="py-2 text-left font-medium">Item</th>
                <th className="py-2 text-right font-medium">Price</th>
                <th className="py-2 text-right font-medium">24h</th>
                <th className="hidden py-2 text-right font-medium sm:table-cell" title="How many traded in the last 24 hours — higher means easier to buy or sell">Traded/day</th>
                <th className="hidden py-2 text-center font-medium md:table-cell">Trend</th>
                <th className="py-2 pr-4 text-right font-medium">Call</th>
              </tr>
            </thead>
            <tbody>
              {movers.map((m: RankedMover, i) => {
                const pos = m.row.change24h >= 0;
                return (
                  <tr
                    key={m.row.apiId}
                    onClick={() => onSelect(m.row.apiId)}
                    className="cursor-pointer border-b border-poe-line/50 transition-colors hover:bg-white/5"
                  >
                    <td className="py-2 pl-4 tabular-nums text-poe-text/45">{i + 1}</td>
                    <td className="py-2">
                      <span className="flex items-center gap-2.5">
                        <img src={m.row.iconPath} alt="" width={24} height={24} />
                        <span className="truncate text-poe-text">{m.row.name}</span>
                      </span>
                    </td>
                    <td className="text-right tabular-nums text-poe-text-bright">
                      {(() => { const p = denominate(m.row.value, base, divinePrice); return <>{fmtNum(p.amount)} <span className="text-[10px] text-poe-text/40">{p.unit}</span></>; })()}
                    </td>
                    <td className={`text-right tabular-nums ${pos ? "text-emerald-400" : "text-red-400"}`}>
                      {pos ? "+" : ""}
                      {m.row.change24h.toFixed(1)}%
                    </td>
                    <td className="hidden text-right tabular-nums text-poe-text/70 sm:table-cell">
                      {fmtCompact(m.row.volume)}
                    </td>
                    <td className="hidden px-2 md:table-cell">
                      <Sparkline data={m.row.sparkline} up={pos} />
                    </td>
                    <td className="py-2 pr-4 text-right">
                      <SellCallBadge call={m.call} size="xs" />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <p className="px-4 py-3 text-[11px] leading-relaxed text-poe-text/40">
            Each item is scored against its own recent trading range, not the market as a whole. These are
            tendencies, not guarantees — thin or volatile markets can swing either way.
          </p>
        </div>
      )}
    </div>
  );
}

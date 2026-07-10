import { useQuery } from "@tanstack/react-query";
import { useSettings } from "../store/settings";
import { fmtCompact, fmtNum } from "../../../lib/market/format";
import { fetchSummary } from "../../../lib/market/client";

// Ported from the Marketplace Companion (components/market/MarketSummary.tsx); nolvusfilter theme,
// data via the Supabase edge function.
function Metric({
  label,
  value,
  unit,
  accent,
}: {
  label: string;
  value: string;
  unit?: string;
  accent?: boolean;
}) {
  return (
    <div className="flex min-w-0 flex-col px-4 py-2">
      <span className="text-[10px] uppercase tracking-[0.18em] text-poe-text/60">{label}</span>
      <span className={`tabular-nums text-sm ${accent ? "text-poe-text-bright" : "text-poe-text"}`}>
        {value}
        {unit ? <span className="ml-1 text-xs text-poe-text/50">{unit}</span> : null}
      </span>
    </div>
  );
}

export default function MarketSummary({ count }: { count: number }) {
  const { league, base } = useSettings();

  const { data } = useQuery({
    queryKey: ["summary", league, base],
    enabled: !!league,
    refetchInterval: 120_000,
    queryFn: () => fetchSummary(league!, base),
  });

  const updated =
    data?.epoch != null
      ? new Date(data.epoch * 1000).toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" })
      : "—";

  // Whole-economy aggregates are huge, so show them in Divine (the high-value unit) rather than
  // billions of Exalt.
  const dp = data?.divinePrice || 1;
  const inDiv = (v: number) => (base === "divine" ? v : v / dp);

  return (
    <div className="panel flex flex-wrap items-center divide-x divide-poe-line">
      <div className="px-4 py-2">
        <div className="gold-heading text-sm tracking-[0.12em]">{league ?? "—"}</div>
        <div className="text-[10px] uppercase tracking-[0.18em] text-poe-text/60">Currency Exchange</div>
      </div>
      <Metric label="Total market value" value={data ? fmtCompact(inDiv(data.marketCap)) : "—"} unit="div" accent />
      <Metric label="Sold / day" value={data ? fmtCompact(inDiv(data.volume)) : "—"} unit="div" />
      <Metric label="1 Divine =" value={data ? fmtNum(data.divinePrice) : "—"} unit="ex" />
      <Metric label="Tracked" value={`${count}`} />
      <Metric label="Updated" value={updated} />
    </div>
  );
}

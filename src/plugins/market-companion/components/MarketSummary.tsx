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
  const unit = base === "divine" ? "div" : "ex";

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

  return (
    <div className="panel flex flex-wrap items-center divide-x divide-poe-line">
      <div className="px-4 py-2">
        <div className="gold-heading text-sm tracking-[0.12em]">{league ?? "—"}</div>
        <div className="text-[10px] uppercase tracking-[0.18em] text-poe-text/60">Currency Exchange</div>
      </div>
      <Metric label="Market Cap" value={data ? fmtCompact(data.marketCap) : "—"} unit={unit} accent />
      <Metric label="24h Volume" value={data ? fmtCompact(data.volume) : "—"} unit={unit} />
      <Metric label="Divine" value={data ? fmtNum(data.divinePrice) : "—"} unit="ex" />
      <Metric label="Tracked" value={`${count}`} />
      <Metric label="Updated" value={updated} />
    </div>
  );
}

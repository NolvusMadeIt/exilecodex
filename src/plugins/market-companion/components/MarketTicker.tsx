import { useQuery } from "@tanstack/react-query";
import { ExternalLink } from "lucide-react";
import { useSettings } from "../store/settings";
import { fetchCurrencies } from "../../../lib/market/client";
import { fmtNum } from "../../../lib/market/format";

// A stock-style scrolling ticker banner (the exiledtools ticker, in our theme): the most-traded
// currencies scroll left-to-right with price + 24h change. It ALWAYS shows currencies regardless
// of which category the table is on. Hovering pauses the scroll (CSS: .ticker-banner:hover). The
// pop-out button opens it as a thin standalone window (#/ticker) you can float over the game.
export default function MarketTicker({
  onSelect,
  standalone,
}: {
  onSelect?: (apiId: string) => void;
  standalone?: boolean;
}) {
  const { league, base, refreshMs } = useSettings();
  const unit = base === "divine" ? "div" : "ex";

  const { data } = useQuery({
    queryKey: ["ticker", league, base],
    enabled: !!league,
    refetchInterval: refreshMs || 300_000,
    queryFn: () => fetchCurrencies(league!, base, "currency"),
  });

  const items = (data?.rows ?? [])
    .filter((r) => r.volume > 0)
    .sort((a, b) => b.volume - a.volume)
    .slice(0, 24);

  if (!items.length) return null;
  // Duplicate the run so the -50% translate loops seamlessly.
  const seq = [...items, ...items];

  const popout = () => {
    const url = window.location.origin + window.location.pathname + "#/ticker";
    window.open(url, "exilecodex-ticker", "width=1040,height=60,menubar=no,toolbar=no,location=no,status=no,resizable=yes");
  };

  return (
    <div className="ticker-banner group relative flex items-center overflow-hidden border-y border-poe-line bg-black/50">
      <div className="min-w-0 flex-1 overflow-hidden">
        <div className="ticker-track flex items-center gap-7 py-2 pr-7">
          {seq.map((r, i) => {
            const up = r.change24h >= 0;
            return (
              <button
                key={i}
                onClick={() => onSelect?.(r.apiId)}
                className="inline-flex shrink-0 items-center gap-1.5"
                title={standalone ? r.name : `Open ${r.name}`}
                tabIndex={-1}
              >
                <img src={r.iconPath} alt="" width={18} height={18} className="shrink-0" />
                <span className="text-[12.5px] text-poe-text-bright">{r.name}</span>
                <span className="tabular-nums text-[12.5px] text-poe-text">
                  {fmtNum(r.value)} <span className="text-[10px] text-poe-text/45">{unit}</span>
                </span>
                <span className={`tabular-nums text-[11.5px] ${up ? "text-emerald-400" : "text-red-400"}`}>
                  {up ? "▲" : "▼"} {Math.abs(r.change24h).toFixed(1)}%
                </span>
              </button>
            );
          })}
        </div>
      </div>
      {!standalone && (
        <button
          onClick={popout}
          title="Pop the ticker out as a floating overlay"
          className="mx-1 grid h-8 w-8 shrink-0 place-items-center rounded border border-poe-line text-poe-text/70 transition-colors hover:border-poe-gold-dim hover:text-poe-gold"
        >
          <ExternalLink size={14} />
        </button>
      )}
    </div>
  );
}

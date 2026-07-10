import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { useSettings } from "./store/settings";
import CurrencyTable from "./components/CurrencyTable";
import CurrencyDetail from "./components/CurrencyDetail";
import MarketSummary from "./components/MarketSummary";
import WatchlistView from "./components/WatchlistView";
import MoversView from "./components/MoversView";
import { EmptyState, ErrorState } from "./components/States";
import { fmtNum } from "../../lib/market/format";
import { fetchLeagues, fetchCategories, fetchCurrencies } from "../../lib/market/client";
import type { BaseCurrency } from "../../lib/market/types";

// Ported from the Marketplace Companion (components/market/MarketView.tsx) — the faithful split view
// (MarketSummary banner + framed sortable table with category tabs/search + a resizable detail
// panel), themed natively to nolvusfilter. Data comes from the Supabase edge function via React
// Query. The Companion's /market/watchlist page lives here as the ★ Watchlist view (same single
// route, internal switch — the host mounts one route per plugin).
const MIN_DETAIL = 360;
const MIN_TABLE = 380;
const BASES: { id: BaseCurrency; label: string }[] = [
  { id: "exalted", label: "Exalted" },
  { id: "divine", label: "Divine" },
];

export default function MarketView() {
  const { league, base, detailWidth, setLeague, setBase, setDetailWidth, refreshMs } = useSettings();
  const [selected, setSelected] = useState<string | null>(null);
  const [q, setQ] = useState("");
  const [category, setCategory] = useState("currency");
  const [view, setView] = useState<"market" | "watchlist" | "movers">("market");
  const containerRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const { data: leagues } = useQuery({ queryKey: ["leagues"], queryFn: fetchLeagues });
  useEffect(() => {
    if (!league && leagues?.length) setLeague((leagues.find((l) => l.IsCurrent) || leagues[0]).Value);
  }, [league, leagues, setLeague]);

  const { data: catData } = useQuery({
    queryKey: ["marketCategories", league],
    enabled: !!league,
    staleTime: 3_600_000,
    queryFn: () => fetchCategories(league!),
  });
  const categories = catData?.length ? catData : [{ apiId: "currency", label: "Currency" }];
  const activeLabel = categories.find((c) => c.apiId === category)?.label ?? "Currency";

  const { data, isLoading, isError } = useQuery({
    queryKey: ["currencies", league, base, category],
    enabled: !!league,
    refetchInterval: refreshMs || false,
    placeholderData: keepPreviousData,
    queryFn: () => fetchCurrencies(league!, base, category),
  });

  const changeCategory = (id: string) => {
    if (id === category) return;
    setQ("");
    setSelected(null);
    setCategory(id);
  };

  const rows = useMemo(() => {
    const seen = new Set<string>();
    return (data?.rows ?? []).filter((r) => (seen.has(r.apiId) ? false : (seen.add(r.apiId), true)));
  }, [data]);
  const filtered = useMemo(
    () => rows.filter((r) => r.name.toLowerCase().includes(q.trim().toLowerCase())),
    [rows, q],
  );

  useEffect(() => {
    if (rows.length && (!selected || !rows.some((r) => r.apiId === selected))) {
      setSelected([...rows].sort((a, b) => b.value - a.value)[0].apiId);
    }
  }, [rows, selected]);

  const clampWidth = useCallback((w: number) => {
    const total = containerRef.current?.getBoundingClientRect().width ?? 1200;
    return Math.round(Math.min(Math.max(w, MIN_DETAIL), total - MIN_TABLE));
  }, []);

  const startDrag = (e: React.MouseEvent) => {
    e.preventDefault();
    dragging.current = true;
    document.body.style.cursor = "col-resize";
    document.body.style.userSelect = "none";
  };

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!dragging.current || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      setDetailWidth(clampWidth(rect.right - e.clientX));
    };
    const onUp = () => {
      if (!dragging.current) return;
      dragging.current = false;
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
  }, [clampWidth, setDetailWidth]);

  const controls = (
    <div className="panel flex flex-wrap items-center gap-2 px-3 py-2">
      <span className="text-[10px] uppercase tracking-[0.18em] text-poe-text/60">League</span>
      <select value={league || ""} onChange={(e) => setLeague(e.target.value)} className="field h-7 text-sm w-[210px]">
        {!league && <option value="">Loading…</option>}
        {(leagues ?? []).map((l) => (
          <option key={l.Value} value={l.Value}>
            {l.Value}
            {l.IsCurrent ? " · current" : ""}
          </option>
        ))}
      </select>
      <span className="ml-2 text-[10px] uppercase tracking-[0.18em] text-poe-text/60">Base</span>
      <div className="flex overflow-hidden rounded border border-poe-line">
        {BASES.map((b) => (
          <button
            key={b.id}
            onClick={() => setBase(b.id)}
            className={`px-2.5 py-1 text-sm ${base === b.id ? "bg-poe-gold/20 text-poe-gold" : "text-poe-text/60 hover:text-poe-gold"}`}
          >
            {b.label}
          </button>
        ))}
      </div>
    </div>
  );

  const openDetail = (apiId: string) => {
    setSelected(apiId);
    setView("market");
  };

  let body: React.ReactNode;
  if (view === "watchlist") body = <WatchlistView onBack={() => setView("market")} />;
  else if (view === "movers") body = <MoversView onBack={() => setView("market")} onSelect={openDetail} />;
  else if (!league) body = <EmptyState message="Loading leagues…" />;
  else if (isLoading) body = <EmptyState message="Loading market…" />;
  else if (isError) body = <ErrorState message="Market data is temporarily unavailable." />;
  else if (!rows.length) body = <EmptyState message="No currencies found for this league." />;
  else
    body = (
      <div ref={containerRef} className="flex min-h-0 flex-1">
        <div className="panel flex min-w-0 flex-1 flex-col overflow-hidden">
          <div className="flex items-center gap-3 border-b border-poe-line px-4 py-2.5">
            <h1 className="gold-heading text-base tracking-wide">{activeLabel} Market</h1>
            <span className="tabular-nums text-xs text-poe-text/60">{filtered.length} listed</span>
            {data?.divinePrice ? (
              <span className="tabular-nums ml-auto text-xs text-poe-text/50">
                Divine ≈ <span className="text-poe-gold">{fmtNum(data.divinePrice)}</span> ex
              </span>
            ) : null}
          </div>

          <div className="flex gap-1 overflow-x-auto border-b border-poe-line px-2 py-1.5">
            <button
              onClick={() => setView("movers")}
              className="shrink-0 rounded border border-poe-line px-2.5 py-1 text-[11px] uppercase tracking-wide text-poe-text/70 hover:border-poe-gold-dim hover:text-poe-gold"
              title="Market movers — what's rising, falling and most traded, scored against each item's own range"
            >
              ↕ Movers
            </button>
            <button
              onClick={() => setView("watchlist")}
              className="shrink-0 rounded border border-poe-line px-2.5 py-1 text-[11px] uppercase tracking-wide text-poe-text/70 hover:border-poe-gold-dim hover:text-poe-gold"
              title="Your watchlists — tracked currencies, portfolio value, alerts"
            >
              ★ Watchlist
            </button>
            {categories.map((c) => (
              <button
                key={c.apiId}
                onClick={() => changeCategory(c.apiId)}
                className={`shrink-0 rounded px-2.5 py-1 text-[11px] uppercase tracking-wide transition-colors ${
                  c.apiId === category
                    ? "bg-poe-gold/15 text-poe-gold"
                    : "text-poe-text/60 hover:bg-white/5 hover:text-poe-gold"
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>

          <div className="border-b border-poe-line px-3 py-2">
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder={`Search ${activeLabel.toLowerCase()}…`}
              className="field h-8 w-full max-w-[340px] text-sm"
            />
          </div>
          <div className="min-h-0 flex-1 overflow-y-auto">
            <CurrencyTable
              rows={filtered}
              league={league}
              base={base}
              divinePrice={data?.divinePrice}
              selectedId={selected}
              onSelect={(r) => setSelected(r.apiId)}
            />
          </div>
        </div>

        <div
          onMouseDown={startDrag}
          onDoubleClick={() => setDetailWidth(clampWidth(540))}
          title="Drag to resize · double-click to reset"
          className="group mx-1 flex w-2 shrink-0 cursor-col-resize items-center justify-center"
        >
          <div className="h-16 w-[3px] rounded-full bg-poe-line transition-colors group-hover:bg-poe-gold" />
        </div>

        <div className="min-h-0 shrink-0" style={{ width: detailWidth, maxWidth: "72%", minWidth: MIN_DETAIL }}>
          <CurrencyDetail apiId={selected} />
        </div>
      </div>
    );

  return (
    <div className="flex h-[calc(100vh-128px)] min-h-0 flex-col gap-3">
      {controls}
      {view === "market" && league && rows.length > 0 && <MarketSummary count={rows.length} />}
      {body}
    </div>
  );
}

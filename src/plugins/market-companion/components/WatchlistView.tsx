import { useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSettings } from "../store/settings";
import { useWatch } from "../store/watch";
import { fetchQuotes } from "../lib/quotes";
import CurrencyTable from "./CurrencyTable";
import { EmptyState } from "./States";
import { fmtNum } from "../../../lib/market/format";
import { useToast } from "../../../store/Toast.jsx";

// Ported from the Marketplace Companion (components/market/WatchlistView.tsx) — multiple named
// watchlists (create / rename / delete / switch), a live portfolio value, and JSON export/import
// (file download + clipboard copy on export; merge on import). Quotes come per-id through the edge
// proxy (lib/quotes). Themed to nolvusfilter; delete confirmation + import errors use host toasts.
export default function WatchlistView({ onBack }: { onBack: () => void }) {
  const { league, base, refreshMs } = useSettings();
  const lists = useWatch((s) => s.lists);
  const activeId = useWatch((s) => s.activeId);
  const [renaming, setRenaming] = useState(false);
  const [name, setName] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);
  const toast = useToast();

  const active = lists.find((l) => l.id === activeId) ?? lists[0];
  const ids = active?.items ?? [];
  const unit = base === "divine" ? "div" : "ex";

  const { data, isLoading } = useQuery({
    queryKey: ["quotes", league, base, ids.join(",")],
    enabled: !!league && ids.length > 0,
    refetchInterval: refreshMs || false,
    queryFn: () => fetchQuotes(league!, base, ids),
  });
  const rows = data?.rows ?? [];
  const total = rows.reduce((s, r) => s + r.value, 0);

  const w = useWatch.getState();

  function exportFile() {
    const json = useWatch.getState().exportJSON();
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "poe2-watchlists.json";
    a.click();
    URL.revokeObjectURL(url);
    navigator.clipboard?.writeText(json).catch(() => {});
    toast.success?.("Watchlists exported — file downloaded and JSON copied to the clipboard.", { title: "Export" });
  }

  function onImportFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    file.text().then((text) => {
      const ok = useWatch.getState().importJSON(text, "merge");
      if (!ok) toast.warn?.("That file doesn't look like a valid watchlist export.", { title: "Import" });
      else toast.success?.("Watchlists imported (merged with your existing lists).", { title: "Import" });
    });
    e.target.value = "";
  }

  async function deleteActive() {
    if (lists.length <= 1) return;
    const ok = toast.confirm
      ? await toast.confirm(`Delete list "${active?.name}"? Its tracked currencies are removed with it.`, {
          title: "Delete watchlist",
          confirmLabel: "Delete",
        })
      : window.confirm(`Delete list "${active?.name}"?`);
    if (ok) w.deleteList(activeId);
  }

  return (
    <div className="flex min-h-0 flex-1 flex-col gap-3">
      <div className="panel flex flex-wrap items-center gap-2 px-4 py-2.5">
        <button onClick={onBack} className="text-poe-text/60 hover:text-poe-gold" title="Back to market">
          ‹
        </button>
        <span className="gold-heading text-base tracking-wide">★ Watchlists</span>

        {renaming ? (
          <input
            autoFocus
            value={name}
            onChange={(e) => setName(e.target.value)}
            onBlur={() => {
              w.renameList(activeId, name);
              setRenaming(false);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                w.renameList(activeId, name);
                setRenaming(false);
              }
            }}
            className="field h-7 w-[220px] text-sm"
          />
        ) : (
          <select
            value={activeId}
            onChange={(e) => w.setActive(e.target.value)}
            className="field h-7 w-[220px] text-sm"
          >
            {lists.map((l) => (
              <option key={l.id} value={l.id}>
                {l.name} ({l.items.length})
              </option>
            ))}
          </select>
        )}

        <button
          onClick={() => {
            setName(active?.name ?? "");
            setRenaming(true);
          }}
          className="rounded border border-poe-line px-2 py-1 text-xs text-poe-text/60 hover:text-poe-gold"
        >
          Rename
        </button>
        <button
          onClick={() => w.createList("New List")}
          className="rounded border border-poe-line px-2 py-1 text-xs text-poe-text/60 hover:text-poe-gold"
        >
          + New
        </button>
        <button
          onClick={deleteActive}
          disabled={lists.length <= 1}
          className="rounded border border-red-800/50 px-2 py-1 text-xs text-red-300 hover:bg-red-900/20 disabled:opacity-40"
        >
          Delete
        </button>

        <div className="ml-auto flex items-center gap-2">
          <button
            onClick={exportFile}
            className="rounded border border-poe-line px-2.5 py-1 text-xs text-poe-text/60 hover:text-poe-gold"
          >
            Export
          </button>
          <button
            onClick={() => fileRef.current?.click()}
            className="rounded border border-poe-line px-2.5 py-1 text-xs text-poe-text/60 hover:text-poe-gold"
          >
            Import
          </button>
          <input ref={fileRef} type="file" accept="application/json,.json" onChange={onImportFile} className="hidden" />
        </div>
      </div>

      {ids.length > 0 && (
        <div className="panel flex items-baseline gap-3 px-4 py-2">
          <span className="text-[11px] uppercase tracking-[0.15em] text-poe-text/50">Portfolio value</span>
          <span className="gold-heading tabular-nums text-xl">
            {fmtNum(total)} {unit}
          </span>
          <span className="tabular-nums text-xs text-poe-text/60">· {ids.length} tracked</span>
        </div>
      )}

      <div className="panel flex min-h-0 flex-1 flex-col overflow-hidden">
        {ids.length === 0 ? (
          <EmptyState message="No currencies in this list yet. Go back to the market and tap ☆ on any row to add it." />
        ) : isLoading && !rows.length ? (
          <EmptyState message="Loading your watchlist…" />
        ) : (
          <div className="min-h-0 flex-1 overflow-y-auto">
            <CurrencyTable rows={rows} league={league} base={base} divinePrice={data?.divinePrice} />
          </div>
        )}
      </div>
    </div>
  );
}

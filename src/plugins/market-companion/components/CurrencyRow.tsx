import { useState } from "react";
import type { CurrencyRow as Row, BaseCurrency } from "../../../lib/market/types";
import { fmtNum, fmtCompact } from "../../../lib/market/format";
import { buyUrl, sellUrl } from "../../../lib/market/trade";
import { useWatch, isWatched } from "../store/watch";

// Ported from the Marketplace Companion (components/market/CurrencyRow.tsx) — same behavior, themed
// to nolvusfilter (poe-* tokens). The name selects the in-panel detail (row click).
export default function CurrencyRow({
  row,
  league,
  base,
  divinePrice,
  selected,
  onClick,
}: {
  row: Row;
  league: string | null;
  base: BaseCurrency;
  divinePrice: number;
  selected?: boolean;
  onClick?: () => void;
}) {
  const pos = row.change24h >= 0;
  const stop = (e: React.MouseEvent) => e.stopPropagation();

  const watched = useWatch((s) => isWatched(s.lists, s.activeId, row.apiId));
  const alert = useWatch((s) => s.alerts[row.apiId]);
  const [editing, setEditing] = useState(false);

  const toExalted = (v: number) => (base === "divine" ? v * divinePrice : v);
  const fromExalted = (ex: number) => (base === "divine" && divinePrice > 0 ? ex / divinePrice : ex);
  const unit = base === "divine" ? "div" : "ex";

  return (
    <>
      <tr
        onClick={onClick}
        className={`group cursor-pointer border-b border-poe-line/50 transition-colors ${
          selected ? "bg-poe-gold/10" : "hover:bg-white/5"
        }`}
      >
        <td className="py-2 pl-3">
          <span className="flex items-center gap-2.5">
            <span
              className={`h-7 w-[3px] rounded-full ${selected ? "bg-poe-gold" : "bg-transparent group-hover:bg-poe-gold-dim"}`}
            />
            <img src={row.iconPath} alt="" width={26} height={26} />
            <span className={`truncate ${selected ? "text-poe-text-bright" : "text-poe-text"}`}>{row.name}</span>
          </span>
        </td>
        <td className="text-right tabular-nums text-poe-text-bright">{fmtNum(row.value)}</td>
        <td className={`text-right tabular-nums ${pos ? "text-emerald-400" : "text-red-400"}`}>
          {pos ? "+" : ""}
          {row.change24h.toFixed(1)}%
        </td>
        <td className="text-right tabular-nums text-poe-text">{fmtCompact(row.volume)}</td>

        <td className="px-1">
          <span className="flex items-center justify-center gap-0.5">
            <button
              onClick={(e) => {
                stop(e);
                useWatch.getState().toggleWatch(row.apiId);
              }}
              title={watched ? "Remove from watchlist" : "Add to watchlist"}
              className={`rounded px-1 text-sm leading-none transition-colors ${
                watched ? "text-poe-gold" : "text-poe-text/50 hover:text-poe-gold-dim"
              }`}
            >
              {watched ? "★" : "☆"}
            </button>
            <button
              onClick={(e) => {
                stop(e);
                setEditing((v) => !v);
              }}
              title={alert ? "Edit price alert" : "Set price alert"}
              className={`rounded px-1 text-sm leading-none transition-colors ${
                alert?.enabled ? "text-emerald-400" : "text-poe-text/50 hover:text-poe-gold-dim"
              }`}
            >
              {alert?.enabled ? "🔔" : "🔕"}
            </button>
          </span>
        </td>

        <td className="py-1 pr-3 pl-2">
          {league ? (
            <span className="flex items-center justify-end gap-1">
              <a
                href={buyUrl(league, row.apiId, base)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={stop}
                title={`Buy ${row.name} on the official exchange`}
                className="rounded border border-emerald-700/50 bg-emerald-900/20 px-2 py-0.5 text-[11px] text-emerald-300 hover:bg-emerald-900/40"
              >
                Buy
              </a>
              <a
                href={sellUrl(league, row.apiId, base)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={stop}
                title={`Sell ${row.name} on the official exchange`}
                className="rounded border border-red-800/50 bg-red-900/20 px-2 py-0.5 text-[11px] text-red-300 hover:bg-red-900/40"
              >
                Sell
              </a>
            </span>
          ) : null}
        </td>
      </tr>

      {editing && (
        <tr className="border-b border-poe-line/50 bg-black/30">
          <td colSpan={6} className="px-3 py-2">
            <AlertEditor
              current={fromExalted(toExalted(row.value))}
              unit={unit}
              existing={alert ? { value: fromExalted(alert.targetEx), dir: alert.dir } : null}
              onSave={(value, dir) => {
                useWatch.getState().setAlert(row.apiId, { targetEx: toExalted(value), dir, enabled: true });
                setEditing(false);
              }}
              onClear={() => {
                useWatch.getState().clearAlert(row.apiId);
                setEditing(false);
              }}
              onClose={() => setEditing(false)}
            />
          </td>
        </tr>
      )}
    </>
  );
}

function AlertEditor({
  current,
  unit,
  existing,
  onSave,
  onClear,
  onClose,
}: {
  current: number;
  unit: string;
  existing: { value: number; dir: "above" | "below" } | null;
  onSave: (value: number, dir: "above" | "below") => void;
  onClear: () => void;
  onClose: () => void;
}) {
  const [value, setValue] = useState(String(existing?.value ?? +current.toFixed(2)));
  const [dir, setDir] = useState<"above" | "below">(existing?.dir ?? "above");

  return (
    <div className="flex flex-wrap items-center gap-2 text-xs" onClick={(e) => e.stopPropagation()}>
      <span className="text-[10px] uppercase tracking-[0.15em] text-poe-text/60">Alert me when price is</span>
      <div className="flex overflow-hidden rounded border border-poe-line">
        {(["above", "below"] as const).map((d) => (
          <button
            key={d}
            onClick={() => setDir(d)}
            className={`px-2 py-1 ${dir === d ? "bg-poe-gold/20 text-poe-gold" : "text-poe-text/60 hover:text-poe-gold"}`}
          >
            {d === "above" ? "≥" : "≤"} {d}
          </button>
        ))}
      </div>
      <input
        type="number"
        step="any"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="field h-7 w-28 tabular-nums"
      />
      <span className="tabular-nums text-poe-text/60">{unit}</span>
      <button
        onClick={() => {
          const v = parseFloat(value);
          if (!Number.isNaN(v) && v > 0) onSave(v, dir);
        }}
        className="rounded border border-poe-gold/60 bg-poe-gold/15 px-3 py-1 text-poe-gold hover:bg-poe-gold/25"
      >
        Save
      </button>
      {existing && (
        <button onClick={onClear} className="rounded border border-red-800/50 px-2 py-1 text-red-300 hover:bg-red-900/20">
          Remove
        </button>
      )}
      <button onClick={onClose} className="ml-auto text-poe-text/60 hover:text-poe-gold">
        ✕
      </button>
    </div>
  );
}

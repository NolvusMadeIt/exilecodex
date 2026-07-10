import { useMemo, useState } from "react";
import type { CurrencyRow as Row, BaseCurrency } from "../../../lib/market/types";
import CurrencyRowView from "./CurrencyRow";

// Ported from the Marketplace Companion (components/market/CurrencyTable.tsx) — same sort behavior,
// nolvusfilter theme.
type SortKey = "name" | "value" | "change24h" | "volume";

export default function CurrencyTable({
  rows,
  league,
  base,
  divinePrice,
  selectedId,
  onSelect,
}: {
  rows: Row[];
  league?: string | null;
  base?: BaseCurrency;
  divinePrice?: number;
  selectedId?: string | null;
  onSelect?: (r: Row) => void;
}) {
  const [sort, setSort] = useState<SortKey>("value");
  const [dir, setDir] = useState<1 | -1>(-1);

  const sorted = useMemo(
    () => [...rows].sort((a, b) => (a[sort] < b[sort] ? -1 : a[sort] > b[sort] ? 1 : 0) * dir),
    [rows, sort, dir],
  );

  const head = (k: SortKey, label: string, align = "text-left", title?: string) => (
    <th
      title={title}
      className={`${align} cursor-pointer select-none px-2 py-2 text-[11px] uppercase tracking-[0.15em] text-poe-gold-dim hover:text-poe-gold`}
      onClick={() => {
        if (sort === k) setDir((d) => (d === 1 ? -1 : 1));
        else setSort(k);
      }}
    >
      {label}
      <span className="text-poe-gold">{sort === k ? (dir === 1 ? " ▲" : " ▼") : ""}</span>
    </th>
  );

  return (
    <table className="w-full border-collapse text-sm">
      <thead className="sticky top-0 z-10 bg-poe-panel/95 backdrop-blur">
        <tr className="border-b border-poe-line">
          <th className="px-2 py-2 pl-3 text-left text-[11px] uppercase tracking-[0.15em] text-poe-gold-dim">
            <span className="cursor-pointer hover:text-poe-gold" onClick={() => setSort("name")}>
              Currency
            </span>
          </th>
          {head("value", "Price", "text-right", "Current price, shown in Divine (div) for expensive items or Exalt (ex) for cheaper ones")}
          {head("change24h", "24h", "text-right", "Price change over the last 24 hours")}
          {head("volume", "Traded / day", "text-right", "How many traded in the last 24 hours — higher means easier to buy or sell quickly")}
          <th className="px-1 py-2 text-center text-[11px] uppercase tracking-[0.15em] text-poe-gold-dim">Watch</th>
          <th className="px-2 py-2 pr-3 text-right text-[11px] uppercase tracking-[0.15em] text-poe-gold-dim">Trade</th>
        </tr>
      </thead>
      <tbody>
        {sorted.map((r) => (
          <CurrencyRowView
            key={r.apiId}
            row={r}
            league={league ?? null}
            base={base ?? "exalted"}
            divinePrice={divinePrice ?? 1}
            selected={selectedId === r.apiId}
            onClick={() => onSelect?.(r)}
          />
        ))}
      </tbody>
    </table>
  );
}

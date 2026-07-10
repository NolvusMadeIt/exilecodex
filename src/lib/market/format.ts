// Number formatters (ported verbatim from the PoE2 Marketplace Companion's lib/format.ts).

export function fmtNum(n: number): string {
  if (!isFinite(n)) return "—";
  const abs = Math.abs(n);
  if (abs >= 1000) return n.toLocaleString(undefined, { maximumFractionDigits: 0 });
  if (abs >= 1) return n.toLocaleString(undefined, { maximumFractionDigits: 2 });
  return n.toLocaleString(undefined, { maximumFractionDigits: 3 });
}

export function fmtCompact(n: number): string {
  if (!isFinite(n)) return "—";
  return Intl.NumberFormat(undefined, { notation: "compact", maximumFractionDigits: 1 }).format(n);
}

export function fmtPct(n: number): string {
  const s = n >= 0 ? "+" : "";
  return `${s}${n.toFixed(1)}%`;
}

export function fmtPrice(n: number): string {
  if (!isFinite(n)) return "—";
  const a = Math.abs(n);
  if (a >= 1000) return fmtCompact(n);
  if (a >= 100) return n.toFixed(0);
  if (a >= 1) return n.toFixed(1);
  return n.toFixed(2);
}

// Smart price denomination — show every price in the unit players actually quote in, so numbers
// stay in a human range instead of "3,500,499 ex". Anything worth a Divine or more shows in Divine
// (div); cheaper items show in Exalt (ex). `value` is in `base`; `divinePrice` is exalts-per-divine.
export type PriceUnit = "div" | "ex";
export interface Priced {
  amount: number;
  unit: PriceUnit;
  /** amount formatted with its unit, e.g. "5,776 div" or "12.5 ex". */
  text: string;
}

export function denominate(value: number, base: "exalted" | "divine", divinePrice: number): Priced {
  const dp = divinePrice > 0 ? divinePrice : 1;
  const valueEx = base === "divine" ? value * dp : value;
  const valueDiv = valueEx / dp;
  const useDiv = valueDiv >= 1;
  const amount = useDiv ? valueDiv : valueEx;
  const unit: PriceUnit = useDiv ? "div" : "ex";
  return { amount, unit, text: `${fmtQty(amount)} ${unit}` };
}

// Price magnitude → sensible number of decimals (bigger numbers need fewer).
export function fmtQty(n: number): string {
  if (!isFinite(n)) return "—";
  const a = Math.abs(n);
  const d = a >= 100 ? 0 : a >= 10 ? 1 : a >= 1 ? 2 : 3;
  return n.toLocaleString(undefined, { maximumFractionDigits: d });
}

export function fmtDate(iso: string): string {
  const d = new Date(iso);
  if (isNaN(d.getTime())) return iso;
  return d.toLocaleString(undefined, { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" });
}

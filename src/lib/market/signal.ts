import type { CurrencyStats } from "./types";

// A transparent, deterministic "should I buy / sell / hold" signal for a PoE2 currency, derived
// purely from the price action we already fetch (7-day & 30-day trend, 24h momentum, and where the
// current price sits in its 30-day range). Webull-style technical read, adapted to the currency
// market — every input is a reason the user can see, so it's explainable, not a black box.

export interface MarketSignal {
  action: "buy" | "sell" | "hold";
  label: string; // Strong Buy | Buy | Hold | Sell | Strong Sell
  score: number; // -100 (sell) … +100 (buy)
  reasons: string[];
}

export function computeSignal(s: CurrencyStats): MarketSignal {
  let score = 0;
  const reasons: string[] = [];
  const add = (pts: number, why?: string) => {
    score += pts;
    if (why) reasons.push(why);
  };
  const pos = (n: number) => (n >= 0 ? "+" : "");

  // Medium-term trend (7-day) — the strongest weight.
  if (s.change7d >= 20) add(35, `Strong 7-day uptrend (${pos(s.change7d)}${s.change7d.toFixed(0)}%)`);
  else if (s.change7d >= 7) add(18, `7-day uptrend (${pos(s.change7d)}${s.change7d.toFixed(0)}%)`);
  else if (s.change7d <= -20) add(-35, `Sharp 7-day decline (${s.change7d.toFixed(0)}%)`);
  else if (s.change7d <= -7) add(-18, `7-day downtrend (${s.change7d.toFixed(0)}%)`);

  // Short-term momentum (24h).
  if (s.change24h >= 8) add(20, `Up ${s.change24h.toFixed(0)}% in the last 24h`);
  else if (s.change24h >= 3) add(10);
  else if (s.change24h <= -8) add(-20, `Down ${Math.abs(s.change24h).toFixed(0)}% in the last 24h`);
  else if (s.change24h <= -3) add(-10);

  // Long-term context (30-day) — lighter.
  if (s.change30d >= 30) add(10);
  else if (s.change30d <= -30) add(-10);

  // Range position — temper buying an overheated currency / favour value near the lows.
  const range = s.high30d - s.low30d;
  const where = range > 0 ? (s.current - s.low30d) / range : 0.5;
  if (where >= 0.9) add(-12, "Trading near its 30-day high — limited upside");
  else if (where <= 0.1) add(12, "Trading near its 30-day low — potential value");

  score = Math.max(-100, Math.min(100, Math.round(score)));
  const action: MarketSignal["action"] = score >= 12 ? "buy" : score <= -12 ? "sell" : "hold";
  const label =
    score >= 45 ? "Strong Buy" : score >= 12 ? "Buy" : score <= -45 ? "Strong Sell" : score <= -12 ? "Sell" : "Hold";
  if (!reasons.length) reasons.push("Flat price action — no clear edge");
  return { action, label, score, reasons };
}

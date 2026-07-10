// Market signal engine — the behavior port of exiledtools.com (see EXILEDTOOLS-PORT-SPEC.md).
// Their whole edge is one idea: "each item is scored against its OWN recent trading range, not
// the market as a whole." Everything here computes from data we already fetch (each CurrencyRow
// carries a `sparkline` price series + `volume` + `change24h`) — no scraping, no new backend.

import type { CurrencyRow } from "../../../lib/market/types";

export type Direction = "rising" | "falling" | "flat";
export type SellCall = "sell_now" | "sell_at_market" | "hold";

export interface Signal {
  /** where the current price sits in its own recent range, 0 (range low) … 1 (range high). */
  position: number;
  /** normalized slope of the series, roughly the per-step % drift. */
  slope: number;
  /** rising / falling / flat, from position + slope. */
  direction: Direction;
  /** the three-way sell guidance. */
  call: SellCall;
  /** suggested listing range [low, high] in the row's own units (high = going rate). */
  suggested: [number, number];
  /** a 0..1 confidence — thin series/volume lowers it. */
  confidence: number;
}

// Least-squares slope over an evenly-spaced series, divided by the mean → a unit-free drift
// (so a 100ex item and a 1ex item are comparable). Returns 0 for degenerate input.
export function seriesSlope(series: number[]): number {
  const n = series.length;
  if (n < 2) return 0;
  const mean = series.reduce((a, b) => a + b, 0) / n;
  if (mean === 0) return 0;
  const xMean = (n - 1) / 2;
  let num = 0;
  let den = 0;
  for (let i = 0; i < n; i++) {
    num += (i - xMean) * (series[i] - mean);
    den += (i - xMean) ** 2;
  }
  if (den === 0) return 0;
  return num / den / mean; // slope per step, as a fraction of the mean
}

// Position of the latest value inside the series' own [min, max]. 0.5 when flat/degenerate.
export function rangePosition(series: number[]): number {
  if (series.length < 2) return 0.5;
  const lo = Math.min(...series);
  const hi = Math.max(...series);
  if (hi === lo) return 0.5;
  return (series[series.length - 1] - lo) / (hi - lo);
}

// The core: score one row against its own range.
export function scoreRow(row: Pick<CurrencyRow, "value" | "volume" | "sparkline" | "change24h">): Signal {
  const series = row.sparkline && row.sparkline.length >= 2 ? row.sparkline : [row.value, row.value];
  const position = rangePosition(series);
  const slope = seriesSlope(series);

  // Direction: needs BOTH an extreme position and a matching drift, so a coin-flip wiggle in the
  // middle of the range stays "flat" (matches exiledtools treating mid-range as no signal).
  let direction: Direction = "flat";
  if (position > 0.7 && slope > 0.002) direction = "rising";
  else if (position < 0.3 && slope < -0.002) direction = "falling";

  // Confidence: short series or thin volume = less to trust.
  const lenConf = Math.min(1, (series.length - 1) / 12);
  const volConf = Math.min(1, Math.log10(Math.max(1, row.volume)) / 4); // ~10k/day → full
  const confidence = Math.max(0.15, lenConf * 0.5 + volConf * 0.5);

  // Sell call — you're the seller, so:
  //   rising + demand   → HOLD (let it climb)
  //   falling / slipping → SELL NOW (get out before it drops more)
  //   otherwise         → SELL AT MARKET (stable)
  let call: SellCall = "sell_at_market";
  if (direction === "rising" && volConf > 0.3) call = "hold";
  else if (direction === "falling" || (slope < -0.004 && position < 0.5)) call = "sell_now";

  // Suggested listing range: the going rate is the top; the floor widens as the outlook worsens
  // or volume thins (you'll undercut more to move a slipping/illiquid item quickly).
  const going = row.value;
  let spread = 0.05; // stable, liquid → list within ~5% of rate
  if (call === "sell_now") spread = 0.14;
  else if (call === "hold") spread = 0.03;
  spread += (1 - volConf) * 0.06; // thin market → wider
  const suggested: [number, number] = [going * (1 - spread), going];

  return { position, slope, direction, call, suggested, confidence };
}

export interface RankedMover extends Signal {
  row: CurrencyRow;
  /** signed magnitude used for ranking, |Δ| weighted by liquidity. */
  score: number;
}

// Rank the movers. `kind`:
//   rising  → items high in their range & drifting up, biggest first
//   falling → items low in their range & drifting down, biggest drop first
//   volume  → simply the most-traded, regardless of direction
export function rankMovers(rows: CurrencyRow[], kind: "rising" | "falling" | "volume", limit = 12): RankedMover[] {
  const scored = rows
    .filter((r) => r.sparkline && r.sparkline.length >= 3)
    .map((r) => {
      const sig = scoreRow(r);
      // |move| weighted by sqrt(volume) so liquidity dominates: a 40% pop on a volume-3 (dead)
      // item must NOT top a solid 5% move on a heavily-traded one. Volume is capped so the very
      // deepest markets don't always crowd out genuine movers.
      const liq = Math.sqrt(Math.min(r.volume, 10_000));
      const score = Math.abs(r.change24h) * liq;
      return { row: r, ...sig, score };
    });

  if (kind === "volume") {
    return scored.sort((a, b) => b.row.volume - a.row.volume).slice(0, limit);
  }
  const wantUp = kind === "rising";
  return scored
    .filter((m) => (wantUp ? m.row.change24h > 0 : m.row.change24h < 0))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}

// Market-wide activity read for the dashboard/summary strip: counts + a mood.
export function marketMood(rows: CurrencyRow[]): { rising: number; falling: number; mood: "hot" | "steady" | "cooling" } {
  let rising = 0;
  let falling = 0;
  for (const r of rows) {
    if (r.change24h > 1) rising++;
    else if (r.change24h < -1) falling++;
  }
  const net = rising - falling;
  const mood = net > rows.length * 0.15 ? "hot" : net < -rows.length * 0.15 ? "cooling" : "steady";
  return { rising, falling, mood };
}

export const CALL_META: Record<SellCall, { label: string; tone: "up" | "down" | "flat"; hint: string }> = {
  hold: { label: "Hold for more", tone: "up", hint: "Trending up with demand — listing later may fetch more." },
  sell_at_market: { label: "Sell at market", tone: "flat", hint: "Stable — list at the going rate." },
  sell_now: { label: "Sell now", tone: "down", hint: "Cooling or slipping — move it before it drops further." },
};

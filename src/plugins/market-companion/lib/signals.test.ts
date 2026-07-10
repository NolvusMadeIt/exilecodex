import { describe, it, expect } from "vitest";
import { seriesSlope, rangePosition, scoreRow, rankMovers, marketMood } from "./signals";
import type { CurrencyRow } from "../../../lib/market/types";

const row = (over: Partial<CurrencyRow>): CurrencyRow => ({
  apiId: "x", itemId: 1, name: "X", iconPath: "", value: 100, change24h: 0, volume: 1000,
  sparkline: [], ...over,
});

describe("seriesSlope", () => {
  it("is positive for a rising series, negative for falling, ~0 for flat", () => {
    expect(seriesSlope([1, 2, 3, 4, 5])).toBeGreaterThan(0);
    expect(seriesSlope([5, 4, 3, 2, 1])).toBeLessThan(0);
    expect(Math.abs(seriesSlope([3, 3, 3, 3]))).toBeLessThan(1e-9);
  });
  it("is scale-free (same drift on a 1x and 100x series)", () => {
    const a = seriesSlope([1, 2, 3, 4]);
    const b = seriesSlope([100, 200, 300, 400]);
    expect(Math.abs(a - b)).toBeLessThan(1e-9);
  });
  it("handles degenerate input", () => {
    expect(seriesSlope([])).toBe(0);
    expect(seriesSlope([7])).toBe(0);
  });
});

describe("rangePosition", () => {
  it("is ~1 at the top of the range, ~0 at the bottom", () => {
    expect(rangePosition([1, 2, 3, 10])).toBeCloseTo(1, 5);
    expect(rangePosition([10, 5, 2, 1])).toBeCloseTo(0, 5);
  });
  it("is 0.5 for a flat series", () => {
    expect(rangePosition([4, 4, 4])).toBe(0.5);
  });
});

describe("scoreRow sell calls", () => {
  it("says HOLD when climbing to the top of its range with volume", () => {
    const s = scoreRow(row({ value: 10, volume: 20000, change24h: 8, sparkline: [6, 6.5, 7, 8, 9, 10] }));
    expect(s.direction).toBe("rising");
    expect(s.call).toBe("hold");
  });
  it("says SELL NOW when sinking to the bottom of its range", () => {
    const s = scoreRow(row({ value: 6, volume: 20000, change24h: -8, sparkline: [10, 9, 8, 7, 6.5, 6] }));
    expect(s.direction).toBe("falling");
    expect(s.call).toBe("sell_now");
  });
  it("says SELL AT MARKET when flat mid-range", () => {
    const s = scoreRow(row({ value: 8, volume: 20000, change24h: 0.2, sparkline: [8, 8.1, 7.9, 8, 8.05, 8] }));
    expect(s.call).toBe("sell_at_market");
  });
  it("widens the suggested spread for a sell-now vs a hold", () => {
    const sellNow = scoreRow(row({ value: 100, volume: 50, change24h: -9, sparkline: [140, 130, 120, 110, 105, 100] }));
    const hold = scoreRow(row({ value: 100, volume: 50000, change24h: 9, sparkline: [70, 80, 88, 94, 98, 100] }));
    const sellNowSpread = 1 - sellNow.suggested[0] / 100;
    const holdSpread = 1 - hold.suggested[0] / 100;
    expect(sellNowSpread).toBeGreaterThan(holdSpread);
    expect(sellNow.suggested[1]).toBe(100); // top of range is always the going rate
  });
});

describe("rankMovers", () => {
  const rows = [
    row({ apiId: "up-liquid", change24h: 5, volume: 40000, sparkline: [90, 92, 95, 98, 100] }),
    row({ apiId: "up-thin", change24h: 40, volume: 3, sparkline: [10, 20, 30, 40, 50] }),
    row({ apiId: "down-liquid", change24h: -6, volume: 40000, sparkline: [110, 106, 103, 101, 100] }),
    row({ apiId: "flat", change24h: 0.1, volume: 40000, sparkline: [100, 100, 100, 100, 100] }),
  ];
  it("ranks rising by liquidity-weighted magnitude (a huge thin move doesn't top a real one)", () => {
    const m = rankMovers(rows, "rising", 5);
    expect(m[0].row.apiId).toBe("up-liquid");
    expect(m.some((x) => x.row.apiId === "down-liquid")).toBe(false);
  });
  it("falling returns only losers", () => {
    const m = rankMovers(rows, "falling", 5);
    expect(m.every((x) => x.row.change24h < 0)).toBe(true);
    expect(m[0].row.apiId).toBe("down-liquid");
  });
  it("volume ignores direction and sorts by volume", () => {
    const m = rankMovers(rows, "volume", 2);
    expect(m[0].row.volume).toBeGreaterThanOrEqual(m[1].row.volume);
  });
});

describe("marketMood", () => {
  it("reads hot when many more are up than down", () => {
    const rows = Array.from({ length: 10 }, (_, i) => row({ apiId: String(i), change24h: i < 8 ? 5 : -5 }));
    expect(marketMood(rows).mood).toBe("hot");
  });
  it("reads cooling when many more are down", () => {
    const rows = Array.from({ length: 10 }, (_, i) => row({ apiId: String(i), change24h: i < 8 ? -5 : 5 }));
    expect(marketMood(rows).mood).toBe("cooling");
  });
});

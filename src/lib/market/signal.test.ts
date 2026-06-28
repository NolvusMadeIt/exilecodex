import { describe, it, expect } from "vitest";
import { computeSignal } from "./signal";
import type { CurrencyStats } from "./types";

const base: CurrencyStats = {
  current: 100, change24h: 0, change7d: 0, change30d: 0,
  high24h: 100, low24h: 100, high30d: 120, low30d: 80,
  volume24h: 1000, open: 100, close: 100, listed: 100,
};

describe("computeSignal", () => {
  it("flags a strong uptrend as Buy / Strong Buy", () => {
    const s = computeSignal({ ...base, change7d: 25, change24h: 10, change30d: 40, current: 100, low30d: 60, high30d: 110 });
    expect(s.action).toBe("buy");
    expect(["Buy", "Strong Buy"]).toContain(s.label);
    expect(s.reasons.length).toBeGreaterThan(0);
  });

  it("flags a sharp decline as Sell / Strong Sell", () => {
    const s = computeSignal({ ...base, change7d: -25, change24h: -10, change30d: -40 });
    expect(s.action).toBe("sell");
    expect(["Sell", "Strong Sell"]).toContain(s.label);
  });

  it("returns Hold for flat price action", () => {
    const s = computeSignal({ ...base });
    expect(s.action).toBe("hold");
    expect(s.label).toBe("Hold");
  });

  it("tempers a buy when trading near the 30-day high", () => {
    const hot = computeSignal({ ...base, change7d: 8, current: 119, low30d: 80, high30d: 120 });
    const cool = computeSignal({ ...base, change7d: 8, current: 100, low30d: 80, high30d: 120 });
    expect(hot.score).toBeLessThan(cool.score);
  });

  it("keeps score within [-100, 100]", () => {
    const s = computeSignal({ ...base, change7d: 999, change24h: 999, change30d: 999 });
    expect(s.score).toBeLessThanOrEqual(100);
    expect(s.score).toBeGreaterThanOrEqual(-100);
  });
});

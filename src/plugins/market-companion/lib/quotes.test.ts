import { describe, it, expect, vi, beforeEach } from "vitest";

// fetchQuotes assembles watchlist/alert quotes from the per-category list op — the per-id
// `op=currency` carries no price data (verified live), so this orchestration IS the feature.
// The client is mocked; the behaviors pinned here are the ones the Watchlist view and the
// alert engine depend on.
const calls: string[] = [];
vi.mock("../../../lib/market/client", () => ({
  fetchLeagues: vi.fn(async () => [{ Value: "TestLeague", DivinePrice: 2000 }]),
  fetchCategories: vi.fn(async () => [
    { apiId: "fragments", label: "Fragments" },
    { apiId: "currency", label: "Currency" },
    { apiId: "essences", label: "Essences" },
  ]),
  fetchCurrencies: vi.fn(async (_league: string, _base: string, category: string) => {
    calls.push(category);
    if (category === "currency") {
      return {
        divinePrice: 1828,
        rows: [
          { apiId: "divine", name: "Divine Orb", value: 1828 },
          { apiId: "chaos", name: "Chaos Orb", value: 90 },
        ],
      };
    }
    if (category === "fragments") {
      return { divinePrice: 1828, rows: [{ apiId: "some-fragment", name: "Some Fragment", value: 12 }] };
    }
    throw new Error("category endpoint down");
  }),
}));

import { fetchQuotes } from "./quotes";

beforeEach(() => {
  calls.length = 0;
});

describe("fetchQuotes", () => {
  it("resolves wanted ids from the currency list first and stops once all are found", async () => {
    const q = await fetchQuotes("TestLeague", "exalted", ["divine", "chaos"]);
    expect(q.rows.map((r) => r.apiId).sort()).toEqual(["chaos", "divine"]);
    expect(q.divinePrice).toBe(1828);
    expect(calls).toEqual(["currency"]); // never touched fragments/essences
  });

  it("falls through to other categories for ids the currency list doesn't have", async () => {
    const q = await fetchQuotes("TestLeague", "exalted", ["divine", "some-fragment"]);
    expect(q.rows.map((r) => r.apiId).sort()).toEqual(["divine", "some-fragment"]);
    expect(calls).toEqual(["currency", "fragments"]);
  });

  it("survives a failing category endpoint and still returns what it found", async () => {
    const q = await fetchQuotes("TestLeague", "exalted", ["divine", "no-such-id"]);
    expect(q.rows.map((r) => r.apiId)).toEqual(["divine"]); // essences threw, poll still resolves
    expect(q.divinePrice).toBe(1828);
  });

  it("returns no rows and the leagues divine price when no ids are wanted", async () => {
    const q = await fetchQuotes("TestLeague", "exalted", ["", "  "]);
    expect(q.rows).toEqual([]);
    expect(q.divinePrice).toBe(2000); // leagues fallback — no list was fetched
    expect(calls).toEqual([]);
  });
});

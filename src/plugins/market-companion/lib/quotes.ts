// Quotes for a specific set of currencies (the Companion's /api/market/quotes route, re-homed).
// The edge function's per-id `op=currency` returns the poe2scout item record WITHOUT price data
// (CurrentPrice/PriceLogs are null — verified live), so quotes come from the same per-category
// list op the market table renders from: 'currency' first (where most watched ids live), then the
// remaining categories only while wanted ids are still missing. client.ts caches each list for
// 2 minutes, so the Watchlist view and the alert engine piggyback on the market view's own
// traffic instead of adding per-id fan-out. If/when the edge function grows a batch `quotes` op
// this is the only file that changes (see PORT-NOTES.md).
import { fetchLeagues, fetchCategories, fetchCurrencies } from "../../../lib/market/client";
import type { CurrencyRow, BaseCurrency } from "../../../lib/market/types";

const MAX_IDS = 100;

export interface QuotesResult {
  rows: CurrencyRow[];
  divinePrice: number;
}

export async function fetchQuotes(league: string, base: BaseCurrency, ids: string[]): Promise<QuotesResult> {
  const wanted = new Set(ids.map((s) => s.trim()).filter(Boolean).slice(0, MAX_IDS));
  const found = new Map<string, CurrencyRow>();
  let divinePrice = 0;

  if (wanted.size) {
    const categories = await fetchCategories(league);
    const order = [...categories].sort((a, b) => Number(b.apiId === "currency") - Number(a.apiId === "currency"));
    for (const cat of order) {
      if (found.size >= wanted.size) break;
      try {
        const list = await fetchCurrencies(league, base, cat.apiId);
        if (list.divinePrice) divinePrice = list.divinePrice;
        for (const row of list.rows ?? []) {
          if (wanted.has(row.apiId) && !found.has(row.apiId)) found.set(row.apiId, row);
        }
      } catch {
        void 0; // one bad category shouldn't kill the poll — the rest still resolve
      }
    }
  }

  if (!divinePrice) {
    const leagues = await fetchLeagues();
    divinePrice = leagues.find((l) => l.Value === league)?.DivinePrice ?? 1;
  }

  return { rows: [...found.values()], divinePrice };
}

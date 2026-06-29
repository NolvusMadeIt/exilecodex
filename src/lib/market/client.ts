// Client for the `market` Supabase edge function (the proxy that re-homes the Companion's Next
// /api/market routes). All market data flows through here. A tiny TTL cache avoids refetching the
// (large) currency list on every view switch.
import type { CurrencyRow, League, MarketCategory, CurrenciesResponse, SummaryResponse, CurrencyDetailVM } from "./types";

const env = (import.meta as any).env ?? {};
const SUPABASE_URL = env.VITE_SUPABASE_URL || "https://vofkgydinpdtasxuzmyq.supabase.co";
const KEY = env.VITE_SUPABASE_PUBLISHABLE_KEY || "sb_publishable_krkLInTvxybJkG-R1H7orA_zhGBew15";
const FN = `${SUPABASE_URL}/functions/v1/market`;

const cache = new Map<string, { v: unknown; exp: number }>();
async function cached<T>(key: string, ttl: number, loader: () => Promise<T>): Promise<T> {
  const hit = cache.get(key);
  if (hit && hit.exp > Date.now()) return hit.v as T;
  const v = await loader();
  cache.set(key, { v, exp: Date.now() + ttl });
  return v;
}

async function call<T>(params: Record<string, string>): Promise<T> {
  const q = new URLSearchParams(params).toString();
  const res = await fetch(`${FN}?${q}`, { headers: { apikey: KEY } });
  if (!res.ok) throw new Error(`market ${params.op} → ${res.status}`);
  return (await res.json()) as T;
}

export function fetchLeagues(): Promise<League[]> {
  return cached("leagues", 3_600_000, async () => (await call<{ leagues: League[] }>({ op: "leagues" })).leagues ?? []);
}

export function fetchCategories(league: string): Promise<MarketCategory[]> {
  return cached(`cats:${league}`, 3_600_000, async () =>
    (await call<{ categories: MarketCategory[] }>({ op: "categories", league })).categories ?? [],
  );
}

export function fetchCurrencies(league: string, base: string, category = "currency"): Promise<CurrenciesResponse> {
  return cached(`cur:${league}:${base}:${category}`, 120_000, () =>
    call<CurrenciesResponse>({ op: "currencies", league, base, category }),
  );
}

export function fetchSummary(league: string, base: string): Promise<SummaryResponse> {
  return cached(`sum:${league}:${base}`, 120_000, () => call<SummaryResponse>({ op: "summary", league, base }));
}

export function fetchCurrency(league: string, base: string, apiId: string) {
  return call<{ item: CurrencyRow; raw: unknown }>({ op: "currency", league, base, apiId });
}

export function fetchDetail(league: string, base: string, apiId: string): Promise<CurrencyDetailVM> {
  return call<CurrencyDetailVM>({ op: "detail", league, base, apiId });
}

// Live trade price via the edge proxy (browser path — the desktop app calls the trade site
// directly instead). POESESSID + query go in the POST body; returns { total, listings } or { error }.
export async function fetchTradePrice(league: string, query: unknown, poesessid: string) {
  const res = await fetch(`${FN}?op=trade`, {
    method: "POST",
    headers: { apikey: KEY, "Content-Type": "application/json" },
    body: JSON.stringify({ league, query, poesessid }),
  });
  if (!res.ok) return { error: "proxy", status: res.status };
  return res.json();
}

export function fetchHistory(league: string, itemId: number, days = 90) {
  return cached(`hist:${league}:${itemId}:${days}`, 300_000, async () =>
    (await call<{ history: unknown }>({ op: "history", league, itemId: String(itemId), days: String(days) })).history,
  );
}

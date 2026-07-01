// Official Currency Exchange deep-links (ported from the Companion's lib/trade.ts; Next env →
// Vite env). buyUrl = "I want apiId, I have base"; sellUrl = the reverse.
import type { BaseCurrency } from "./types";

const TRADE_SITE = (import.meta as any).env?.VITE_TRADE_SITE || "https://www.pathofexile.com";
const EXCHANGE_BASE = `${TRADE_SITE}/trade2/exchange/poe2`;

function exchangeUrl(league: string, want: string, have: string): string {
  const q = { exchange: { status: { option: "online" }, want: [want], have: [have] } };
  return `${EXCHANGE_BASE}/${encodeURIComponent(league)}?q=${encodeURIComponent(JSON.stringify(q))}`;
}

function counterFor(apiId: string, base: BaseCurrency): string {
  if (apiId === base) return base === "exalted" ? "divine" : "exalted";
  return base;
}

export function buyUrl(league: string, apiId: string, base: BaseCurrency): string {
  return exchangeUrl(league, apiId, counterFor(apiId, base));
}

export function sellUrl(league: string, apiId: string, base: BaseCurrency): string {
  return exchangeUrl(league, counterFor(apiId, base), apiId);
}

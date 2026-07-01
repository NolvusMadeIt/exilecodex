// Shared market types (ported/condensed from the PoE2 Marketplace Companion). The edge function
// returns rows already normalized + converted to the chosen base currency, so the client just
// consumes these shapes.

export type BaseCurrency = "exalted" | "divine";

export interface CurrencyRow {
  apiId: string;
  itemId: number;
  name: string;
  iconPath: string;
  value: number;
  change24h: number;
  volume: number;
  sparkline: number[];
}

export interface League {
  Value: string;
  ShortName: string;
  IsCurrent: boolean;
  DivinePrice: number;
  BaseCurrencyApiId: string;
  BaseCurrencyText: string;
}

export type SaleType = "buyout" | "any" | "priced_with_info" | "unpriced";
export type ListedWithin = "any" | "3hours" | "12hours" | "1day" | "3days" | "1week" | "1month";

export interface MarketCategory {
  apiId: string;
  label: string;
}

export interface CurrenciesResponse {
  rows: CurrencyRow[];
  divinePrice: number;
  league?: string;
  base?: string;
}

export interface SummaryResponse {
  volume: number;
  marketCap: number;
  divinePrice: number;
  epoch: number;
  base: BaseCurrency;
}

export interface Candle {
  t: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export interface PricePoint {
  t: string;
  value: number;
  volume: number;
}

export interface CurrencyStats {
  current: number;
  change24h: number;
  change7d: number;
  change30d: number;
  high24h: number;
  low24h: number;
  high30d: number;
  low30d: number;
  volume24h: number;
  open: number;
  close: number;
  listed: number;
}

export interface CurrencyDetailVM {
  apiId: string;
  name: string;
  iconPath: string;
  category: string;
  baseLabel: "Exalted" | "Divine";
  divinePrice: number;
  stats: CurrencyStats;
  daily: Candle[];
  hourly: PricePoint[];
}

// Plugin host contract (consumed by host-aware plugins like Market Companion / Spot Price Check).
export interface PluginHost {
  app: { name: string; version: string };
  league: string | null;
  base: BaseCurrency;
  settings: {
    get: <T = unknown>(key: string) => T | undefined;
    set: (key: string, value: unknown) => void;
  };
  market: {
    getCurrencies: () => Promise<CurrencyRow[]>;
    getCurrency: (apiId: string) => Promise<{ item: CurrencyRow; raw: unknown } | null>;
    getHistory: (itemId: number, days?: number) => Promise<unknown>;
    buyUrl: (apiId: string) => string;
    sellUrl: (apiId: string) => string;
  };
  format: {
    num: (n: number) => string;
    compact: (n: number) => string;
    pct: (n: number) => string;
    price: (n: number) => string;
  };
}

// Declarative per-plugin settings schema (auto-rendered on the plugin detail Settings tab).
export interface PluginSettingBase {
  key: string;
  label: string;
  help?: string;
}
export type PluginSettingField =
  | (PluginSettingBase & { type: "toggle"; default: boolean })
  | (PluginSettingBase & { type: "number"; default: number; min?: number; max?: number; step?: number })
  | (PluginSettingBase & { type: "text"; default: string })
  | (PluginSettingBase & { type: "select"; default: string; options: { value: string; label: string }[] });

// Market data proxy for the Market Companion plugin (ported from the PoE2 Marketplace Companion's
// Next /api/market routes). poe2scout sends no CORS headers, so the browser can't call it directly —
// this edge function proxies it, normalizes, caches per-instance, and returns permissive CORS.
// Public read-only data → verify_jwt is disabled on deploy.
import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const UPSTREAM = "https://poe2scout.com/api";
const REALM = "poe2";
const UA = "NolvusFilterMarket/0.1 (+https://github.com/Nolvus)";

const CORS: Record<string, string> = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
};

type BaseCurrency = "exalted" | "divine";
const toBase = (v: number, base: BaseCurrency, divine: number) =>
  base === "divine" ? (divine > 0 ? v / divine : 0) : v;

const cache = new Map<string, { v: unknown; exp: number }>();
async function cached<T>(key: string, ttl: number, loader: () => Promise<T>): Promise<T> {
  const hit = cache.get(key);
  if (hit && hit.exp > Date.now()) return hit.v as T;
  const v = await loader();
  cache.set(key, { v, exp: Date.now() + ttl });
  return v;
}

async function up<T>(path: string): Promise<T> {
  const res = await fetch(`${UPSTREAM}${path}`, { headers: { "User-Agent": UA } });
  if (!res.ok) throw new Error(`upstream ${path} -> ${res.status}`);
  return (await res.json()) as T;
}

// deno-lint-ignore no-explicit-any
function getLeagues(): Promise<any[]> {
  return cached("leagues", 3_600_000, () => up<any[]>(`/${REALM}/Leagues`));
}

// deno-lint-ignore no-explicit-any
async function getAllCurrencies(league: string, category: string): Promise<any[]> {
  return cached(`cur:${league}:${category}`, 120_000, async () => {
    const per = 200;
    const l = encodeURIComponent(league);
    const c = encodeURIComponent(category);
    // deno-lint-ignore no-explicit-any
    const first = await up<any>(`/${REALM}/Leagues/${l}/Currencies/ByCategory?Category=${c}&Page=1&PerPage=${per}`);
    const items = [...(first.Items ?? [])];
    const pages = Math.min(first.Pages ?? 1, 40);
    if (pages > 1) {
      const rest = await Promise.all(
        Array.from({ length: pages - 1 }, (_, i) =>
          up<any>(`/${REALM}/Leagues/${l}/Currencies/ByCategory?Category=${c}&Page=${i + 2}&PerPage=${per}`)
            .then((p) => p.Items ?? [])
            .catch(() => [])
        ),
      );
      for (const r of rest) items.push(...r);
    }
    const seen = new Set<string>();
    const out: unknown[] = [];
    for (const it of items) {
      const k = it.ApiId || String(it.CurrencyItemId);
      if (seen.has(k)) continue;
      seen.add(k);
      out.push(it);
    }
    return out;
  });
}

// deno-lint-ignore no-explicit-any
function toRow(dto: any, base: BaseCurrency, divine: number) {
  const logs = (dto.PriceLogs ?? []).filter(Boolean);
  const newest = logs[0];
  const prior = logs[1];
  const raw = dto.CurrentPrice ?? newest?.Price ?? 0;
  const change24h = prior && prior.Price > 0 && newest ? ((newest.Price - prior.Price) / prior.Price) * 100 : 0;
  // deno-lint-ignore no-explicit-any
  const sparkline = [...logs].reverse().map((l: any) => toBase(l.Price, base, divine));
  return {
    apiId: dto.ApiId,
    itemId: dto.ItemId,
    name: dto.ItemMetadata?.name ?? dto.Text,
    iconPath: dto.IconUrl ?? "",
    value: toBase(raw, base, divine),
    change24h,
    volume: newest?.Quantity ?? dto.CurrentQuantity ?? 0,
    sparkline,
  };
}

const pct = (curr: number, prev: number) => (prev > 0 ? ((curr - prev) / prev) * 100 : 0);

// Port of lib/normalize/detail.ts buildDetail — the CurrencyDetailVM (stats + daily candles +
// hourly points) the detail panel + chart render.
// deno-lint-ignore no-explicit-any
function buildDetail(dto: any, daily: any[], hourly: any[], base: BaseCurrency, divine: number, iconPath: string) {
  const conv = (v: number) => toBase(v, base, divine);
  const candles = [...daily]
    .sort((a, b) => (a.Time < b.Time ? -1 : 1))
    .map((d) => ({ t: d.Time, open: conv(d.Open), high: conv(d.High), low: conv(d.Low), close: conv(d.Close), volume: d.Volume }));
  const points = (hourly.filter(Boolean) as any[])
    .slice()
    .sort((a, b) => (a.Time < b.Time ? -1 : 1))
    .map((h) => ({ t: h.Time, value: conv(h.Price), volume: h.Quantity }));

  const lastC = candles[candles.length - 1];
  const lastH = points[points.length - 1];
  const current = dto.CurrentPrice != null ? conv(dto.CurrentPrice) : (lastC?.close ?? lastH?.value ?? 0);
  const ref24 = points.length > 24 ? points[points.length - 25] : points[0];
  const change24h = lastH && ref24 ? pct(lastH.value, ref24.value) : 0;
  const last24 = points.slice(-24);
  const high24h = last24.length ? Math.max(...last24.map((p) => p.value)) : (lastC?.high ?? current);
  const low24h = last24.length ? Math.min(...last24.map((p) => p.value)) : (lastC?.low ?? current);
  const volume24h = last24.reduce((s, p) => s + p.volume, 0) || lastC?.volume || 0;
  const change7d = candles.length > 7
    ? pct(lastC.close, candles[candles.length - 8].close)
    : candles.length > 1 ? pct(lastC.close, candles[0].close) : 0;
  const change30d = candles.length > 1 ? pct(lastC.close, candles[0].close) : 0;
  const high30d = candles.length ? Math.max(...candles.map((c) => c.high)) : current;
  const low30d = candles.length ? Math.min(...candles.map((c) => c.low)) : current;

  return {
    apiId: dto.ApiId,
    name: dto.ItemMetadata?.name ?? dto.Text,
    iconPath,
    category: dto.CategoryApiId,
    baseLabel: base === "divine" ? "Divine" : "Exalted",
    divinePrice: divine,
    stats: {
      current, change24h, change7d, change30d, high24h, low24h, high30d, low30d, volume24h,
      open: lastC?.open ?? current, close: lastC?.close ?? current, listed: dto.CurrentQuantity ?? lastH?.volume ?? 0,
    },
    daily: candles,
    hourly: points,
  };
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: CORS });
  const url = new URL(req.url);
  const op = url.searchParams.get("op") ?? "";
  const j = (data: unknown, status = 200) =>
    new Response(JSON.stringify(data), { status, headers: { ...CORS, "Content-Type": "application/json" } });

  try {
    if (op === "leagues") return j({ leagues: await getLeagues() });

    // --- Live trade proxy (Price Check) ---
    // The browser can't reach pathofexile.com/trade2 (CORS + Cloudflare). We proxy it server-side
    // using the user's own POESESSID (passed in the POST body, never logged). search -> fetch(10)
    // -> raw listings. The desktop app does this locally instead; this is the browser path.
    if (op === "trade") {
      const TRADE = "https://www.pathofexile.com/api/trade2";
      const BUA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36";
      // deno-lint-ignore no-explicit-any
      const body = await req.json().catch(() => ({})) as any;
      const tl = body.league as string;
      const poesessid = body.poesessid as string;
      const query = body.query;
      if (!poesessid) return j({ error: "no-auth" });
      if (!tl) return j({ error: "no-league" });
      const h = { Cookie: `POESESSID=${poesessid}`, "User-Agent": BUA, "Content-Type": "application/json", Accept: "application/json" };
      const ra = (r: Response) => Number(r.headers.get("retry-after")) || 60;
      const sRes = await fetch(`${TRADE}/search/${REALM}/${encodeURIComponent(tl)}`, { method: "POST", headers: h, body: JSON.stringify(query) });
      if (sRes.status === 401 || sRes.status === 403) return j({ error: "auth", status: sRes.status });
      if (sRes.status === 429) return j({ error: "rate", retryAfter: ra(sRes) });
      if (!sRes.ok) { const detail = await sRes.text().catch(() => ""); return j({ error: "search", status: sRes.status, detail: detail.slice(0, 250) }); }
      // deno-lint-ignore no-explicit-any
      const s = await sRes.json() as any;
      const result: string[] = s.result ?? [];
      const total: number = s.total ?? 0;
      if (!result.length) return j({ total: 0, listings: [] });
      const fRes = await fetch(`${TRADE}/fetch/${result.slice(0, 10).join(",")}?query=${s.id}&realm=${REALM}`, { headers: h });
      if (fRes.status === 429) return j({ error: "rate", retryAfter: ra(fRes) });
      if (!fRes.ok) { const detail = await fRes.text().catch(() => ""); return j({ error: "fetch", status: fRes.status, detail: detail.slice(0, 250) }); }
      // deno-lint-ignore no-explicit-any
      const f = await fRes.json() as any;
      return j({ total, listings: f.result ?? [] });
    }

    const league = url.searchParams.get("league") ?? "";
    const base = (url.searchParams.get("base") as BaseCurrency) || "exalted";
    if (!league) return j({ error: "missing_league" }, 400);

    const leagues = await getLeagues();
    const divine = leagues.find((x) => x.Value === league)?.DivinePrice ?? 1;
    const l = encodeURIComponent(league);

    if (op === "currencies") {
      const category = url.searchParams.get("category") ?? "currency";
      const items = await getAllCurrencies(league, category);
      const rows = items.map((d) => toRow(d, base, divine));
      return j({ rows, league, base, divinePrice: divine });
    }

    if (op === "currency") {
      const apiId = url.searchParams.get("apiId") ?? "";
      // deno-lint-ignore no-explicit-any
      const dto = await up<any>(`/${REALM}/Leagues/${l}/Currencies/${encodeURIComponent(apiId)}`);
      return j({ item: toRow(dto, base, divine), raw: dto });
    }

    if (op === "detail") {
      const apiId = url.searchParams.get("apiId") ?? "";
      // deno-lint-ignore no-explicit-any
      const dto = await cached<any>(`cur1:${league}:${apiId}`, 120_000, () =>
        up(`/${REALM}/Leagues/${l}/Currencies/${encodeURIComponent(apiId)}`));
      const itemId = dto.ItemId;
      const [daily, hourly] = await Promise.all([
        // deno-lint-ignore no-explicit-any
        cached<any>(`daily:${league}:${itemId}`, 120_000, () =>
          up(`/${REALM}/Leagues/${l}/Items/${itemId}/DailyStatsHistory?DayCount=90`))
          .then((r) => r.DailyStats ?? []).catch(() => []),
        // deno-lint-ignore no-explicit-any
        cached<any>(`hist:${league}:${itemId}`, 120_000, () =>
          up(`/${REALM}/Leagues/${l}/Items/${itemId}/History?LogCount=168`))
          .then((r) => r.PriceHistory ?? []).catch(() => []),
      ]);
      return j(buildDetail(dto, daily, hourly, base, divine, dto.IconUrl ?? ""));
    }

    if (op === "history") {
      const itemId = url.searchParams.get("itemId") ?? "";
      const days = url.searchParams.get("days") ?? "90";
      const data = await up(`/${REALM}/Leagues/${l}/Items/${encodeURIComponent(itemId)}/DailyStatsHistory?DayCount=${days}`);
      return j({ history: data });
    }

    if (op === "summary") {
      // deno-lint-ignore no-explicit-any
      const snap = await cached<any>(`snap:${league}`, 120_000, () => up(`/${REALM}/Leagues/${l}/ExchangeSnapshot`));
      return j({
        volume: toBase(Number(snap.Volume), base, divine),
        marketCap: toBase(Number(snap.MarketCap), base, divine),
        divinePrice: divine,
        epoch: snap.Epoch,
        base,
      });
    }

    if (op === "categories") {
      // deno-lint-ignore no-explicit-any
      const cats = await cached<any>(`cats:${league}`, 3_600_000, () => up(`/${REALM}/Leagues/${l}/Items/Categories`));
      // deno-lint-ignore no-explicit-any
      const categories = (cats.CurrencyCategories ?? []).map((c: any) => ({ apiId: c.ApiId, label: c.Label }));
      return j({ categories });
    }

    return j({ error: "unknown_op" }, 400);
  } catch (e) {
    return j({ error: "upstream_unavailable", detail: String(e) }, 502);
  }
});

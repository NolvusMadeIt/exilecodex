# Market Companion — exiledtools.com behavior port (spec)

Owner directive (2026-07-10): make every Market Companion page WORK like exiledtools.com
works, while keeping OUR design. Do not copy their look. exiledtools.com has no public
repo (not to be confused with Exiled Exchange 2) — this spec was mapped from the live site.
Their data source is poe.ninja (hourly); ours stays poe2scout (see PORT-NOTES.md — per-id
`op=currency` has NO price data; assemble from per-category lists).

## Their functional model, page by page

### 1. Economy — market movers & signals
- Three tabs: **Falling**, **Rising**, **Top Volume** (10 rows each).
- Core scoring rule (their own wording): *"Each item is scored against its own recent
  trading range, not the market as a whole."* Falling = trading below its recent range;
  Rising = above it.
- Row: rank, icon+name, current price (div/c), trend % vs its average, volume/day,
  14-day comparison.
- Divine-price-over-time chart from league start; snapshot chips (current div rate,
  league peak/low, days tracked).
- Honest framing: signals are tendencies, not guarantees.

### 2. Currency Exchange — sell-guidance desk (~40 items)
- Per item: **going rate**, **suggested listing range**, and ONE of three calls:
  - **Sell now** — demand cooling or price slipping
  - **Sell at market** — stable conditions
  - **Hold for more** — upward trend + healthy demand
- Inputs to the call: price trajectory across 1h/1d/7d/14d + daily trade volume as the
  demand signal.
- Columns: icon+name, rate, suggested range, call, Δ1h/Δ1d/Δ7d/Δ14d.

### 3. Currency desk — full price table (503 items)
- Columns: Item (icon+name), Category, Rate (div/c/ex auto-denominated), Vol/d,
  Δ7d (with sparkline), Δ14d. Sortable (default Vol/d desc), search, 11 category filters
  (Currency, Fragments, Essences, Breach, Ritual, Delirium, Expedition, Abyss,
  Soul Cores, Runes, Gems).
- Per-currency detail pages (usage/acquisition writeups).

### 4. Bulk pricer — stash valuation + whisper
- Quantity input per item × live unit price → per-item total + grand total in div.
- Three pricing strategies: **Fast Sale −25%**, **Optimal −17%**, **Max Value −8%**
  (discount = liquidation speed tradeoff).
- Output: market value, discounted total, and a **copy-ready trade whisper**.

### 5. Farming — div/hr strategy ranking
- Hand-authored **chaos-per-hour anchor** per strategy, scaled by a **damped multiplier**
  from live prices of that strategy's actual category drops, converted to div at the live
  rate. Shown as RANGES (e.g. 54.2–121.9 div/hr), never points.
- Columns: trend (climbing/steady/falling), demand (sold/day), constituent drop prices
  with Δ1h/Δ7d/Δ14d, recommended tablets + Atlas nodes.
- Methodology note shown to users: baseline at average efficiency, not a guarantee.

### 6. Dashboard — command centre
- Rates strip: chaos↔div, ex↔chaos, ex↔div.
- Market activity chip: STEADY/… + counts of rising vs falling items.
- Tool tiles linking to each page with a one-line live stat.
- Net-worth tracking explicitly "not available" (no stash API) → points at Bulk Pricer.

## Port mapping (keep OUR design + poe2scout)

| Theirs | Ours |
|---|---|
| Economy movers/signals | New "Movers" view in MarketView — score each currency against its own N-day range from poe2scout PriceLogs |
| Exchange sell calls | Add call+suggested-range columns to CurrencyTable/CurrencyDetail (trajectory from PriceLogs, demand from Volume) |
| Currency desk | Our CurrencyTable already close: add Δ7d/Δ14d + sparkline + category filters + sort-by-volume default |
| Bulk pricer | New page in plugin: quantity inputs over our quotes, 3 strategies, whisper generator |
| Farming | New page: our own hand-authored anchors (write honestly, mark as estimates) scaled by live category prices |
| Dashboard | Market landing: rates strip + activity chip + tile row |

Signal math to implement (self-contained, no scraping): for each item, take its k-day
price series; range = [min, max] over window; position = (now − min)/(max − min);
Rising ≈ position > 0.8 with positive slope, Falling ≈ position < 0.2 with negative
slope; rank movers by |Δ| weighted by volume. Sell call: slope(1d,7d) + volume trend →
three-way threshold. Suggested range: going rate × [1−spread, 1] where spread widens
with falling slope / thin volume.

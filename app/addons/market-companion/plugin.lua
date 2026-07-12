-- Market Companion — live PoE2 currency market, ported from concept1's
-- MarketView. Data flows through our Supabase edge function (poe2scout proxy)
-- via the ecMarket bridge in boot.js. Faithful core: league picker, category
-- tabs, search, a sortable table (icon / name / price / 24h / volume /
-- sparkline) and a live movers ticker. Prices auto-show in the unit players
-- quote (Divine when ≥ 1 div, else Exalt). Detail/watchlist/alerts: later pass.
local js = require "js"
local window = js.global
local ui = codex.ui

local S = {
  league = nil, leagues = {}, categories = {},
  category = "currency", catLabel = "Currency", base = "exalted",
  rows = {}, divine = 0, q = "", loading = false, error = false,
  sort = "value", desc = true, loaded_static = false,
  view = "list", selected = nil, detail = nil, tf = "7D", about = false,
}
local body_el = nil
local open_detail, set_view  -- forward (defined with the detail view below)

-- ---------------------------------------------------------------- helpers

local function esc(s)
  return (tostring(s):gsub("&", "&amp;"):gsub("<", "&lt;"):gsub(">", "&gt;"):gsub('"', "&quot;"))
end
local function jstr(v) if v == nil or v == js.null then return nil end return tostring(v) end
local function jnum(v) if v == nil or v == js.null then return nil end return tonumber(v) end

-- ecMarket:get(op, league, base, category, apiId, cb) → parsed object (or nil)
local function market_get(op, league, category, apiId, cb)
  local m = window.ecMarket
  if m == nil or m == js.null then cb(nil) return end
  m:get(op, league or "", S.base, category or "", apiId or "", function(_, data) cb(data) end)
end

-- denominated number: 2.93M / 12.4k / 552 / 5.3 / 0.42
local function fmt(n)
  if not n then return "—" end
  local a = math.abs(n)
  if a >= 1e6 then return string.format("%.2fM", n / 1e6)
  elseif a >= 1e4 then return string.format("%.1fk", n / 1e3)
  elseif a >= 1e3 then return string.format("%.2fk", n / 1e3)
  elseif a >= 100 then return string.format("%.0f", n)
  elseif a >= 10 then return string.format("%.1f", n)
  else return string.format("%.2f", n) end
end

-- tiny inline sparkline SVG from a JS array of ~7 numbers
local function sparkline(arr)
  if arr == nil or arr == js.null then return "" end
  local n = jnum(arr.length) or 0
  if n < 2 then return "" end
  local vals, mn, mx = {}, math.huge, -math.huge
  for i = 0, n - 1 do
    local v = jnum(arr[i]) or 0
    vals[#vals + 1] = v
    if v < mn then mn = v end
    if v > mx then mx = v end
  end
  local w, h, rng = 58, 18, (mx - mn)
  if rng == 0 then rng = 1 end
  local pts = {}
  for i, v in ipairs(vals) do
    local x = (i - 1) / (#vals - 1) * (w - 2) + 1
    local y = h - 1 - ((v - mn) / rng) * (h - 2)
    pts[#pts + 1] = string.format("%.1f,%.1f", x, y)
  end
  local color = (vals[#vals] >= vals[1]) and "#5fb95f" or "#c9564a"
  return '<svg width="' .. w .. '" height="' .. h .. '" viewBox="0 0 ' .. w .. ' ' .. h .. '">'
    .. '<polyline fill="none" stroke="' .. color .. '" stroke-width="1.3" points="' .. table.concat(pts, " ") .. '"/></svg>'
end

local function price_cell(v)
  if S.divine and S.divine > 0 and v >= S.divine then
    return fmt(v / S.divine) .. ' <span class="mkt-unit">div</span>'
  end
  return fmt(v) .. ' <span class="mkt-unit">ex</span>'
end

local function change_cell(c)
  if not c or math.abs(c) < 0.05 then return '<span class="mkt-flat">0%</span>' end
  local up = c > 0
  return '<span class="' .. (up and "mkt-up" or "mkt-down") .. '">' .. (up and "▲" or "▼")
    .. ' ' .. string.format("%.1f%%", math.abs(c)) .. '</span>'
end

-- ---------------------------------------------------------------- rendering

local function sorted_filtered()
  local list, ql = {}, S.q:lower()
  for _, r in ipairs(S.rows) do
    if ql == "" or r.name:lower():find(ql, 1, true) then list[#list + 1] = r end
  end
  table.sort(list, function(a, b)
    local av, bv
    if S.sort == "name" then av, bv = a.name:lower(), b.name:lower()
    elseif S.sort == "change" then av, bv = a.change, b.change
    elseif S.sort == "volume" then av, bv = a.volume, b.volume
    else av, bv = a.value, b.value end
    if S.desc then return av > bv else return av < bv end
  end)
  return list
end

local function q(sel) return body_el and body_el:querySelector(sel) or js.null end

local function render_ticker()
  local el = q("#mkt-ticker")
  if el == js.null then return end
  if #S.rows == 0 then el.innerHTML = "" return end
  -- top movers by absolute 24h change
  local movers = {}
  for _, r in ipairs(S.rows) do movers[#movers + 1] = r end
  table.sort(movers, function(a, b) return math.abs(a.change) > math.abs(b.change) end)
  local parts = {}
  for i = 1, math.min(14, #movers) do
    local r = movers[i]
    parts[#parts + 1] = '<span class="mkt-tick"><img src="' .. esc(r.icon or "") .. '" alt="">'
      .. esc(r.name) .. ' ' .. change_cell(r.change) .. '</span>'
  end
  -- duplicated so the marquee scrolls seamlessly
  local strip = table.concat(parts)
  el.innerHTML = '<div class="mkt-tickrun">' .. strip .. strip .. '</div>'
end

local function header(label, key)
  local arrow = ""
  if S.sort == key then arrow = S.desc and " ▼" or " ▲" end
  return '<th data-sort="' .. key .. '" class="mkt-th">' .. label .. arrow .. '</th>'
end

local function render_table()
  local el = q("#mkt-body")
  if el == js.null then return end
  if S.loading and #S.rows == 0 then
    el.innerHTML = '<div class="mkt-state">Loading market…</div>' return
  end
  if S.error then
    el.innerHTML = '<div class="mkt-state">Market data is temporarily unavailable.</div>' return
  end
  local list = sorted_filtered()
  if #list == 0 then
    el.innerHTML = '<div class="mkt-state">No items match.</div>' return
  end
  local parts = {
    '<table class="mkt-table"><thead><tr>',
    header("Item", "name"), '<th class="mkt-th mkt-r" data-sort="value">Price', (S.sort == "value" and (S.desc and " ▼" or " ▲") or ""), '</th>',
    '<th class="mkt-th mkt-r" data-sort="change">24h', (S.sort == "change" and (S.desc and " ▼" or " ▲") or ""), '</th>',
    '<th class="mkt-th mkt-r" data-sort="volume">Vol', (S.sort == "volume" and (S.desc and " ▼" or " ▲") or ""), '</th>',
    '<th class="mkt-th mkt-c">7d</th>',
    '</tr></thead><tbody>',
  }
  for _, r in ipairs(list) do
    parts[#parts + 1] = table.concat({
      '<tr class="mkt-row" data-open="', esc(r.apiId or ""), '">',
      '<td class="mkt-item"><img class="mkt-ic" src="', esc(r.icon or ""), '" alt="" loading="lazy"><span>', esc(r.name), '</span></td>',
      '<td class="mkt-r mkt-price">', price_cell(r.value), '</td>',
      '<td class="mkt-r">', change_cell(r.change), '</td>',
      '<td class="mkt-r mkt-vol">', fmt(r.volume), '</td>',
      '<td class="mkt-c">', r.spark or "", '</td>',
      '</tr>',
    })
  end
  parts[#parts + 1] = '</tbody></table>'
  el.innerHTML = table.concat(parts)

  ui.each(el, ".mkt-th[data-sort]", function(th)
    ui.on(th, "click", function()
      local k = ui.attr(th, "data-sort")
      if S.sort == k then S.desc = not S.desc else S.sort = k; S.desc = (k ~= "name") end
      render_table()
    end)
  end)
  ui.each(el, ".mkt-row[data-open]", function(tr)
    ui.on(tr, "click", function()
      local id = ui.attr(tr, "data-open")
      if id and id ~= "" then open_detail(id) end
    end)
  end)
end

local function render_meta()
  local el = q("#mkt-meta")
  if el ~= js.null then
    local d = (S.divine > 0) and (' &middot; 1 div ≈ <span style="color:var(--ec-gold)">' .. fmt(S.divine) .. '</span> ex') or ''
    el.innerHTML = esc(S.catLabel) .. ' &middot; ' .. #S.rows .. ' listed' .. d
  end
end

-- ---------------------------------------------------------------- data flow

local function load_currencies()
  S.loading = true
  S.error = false
  if S.view == "list" then render_table() end
  market_get("currencies", S.league, S.category, nil, function(data)
    S.loading = false
    if data == nil or data == js.null then
      S.error = true; S.rows = {}
      if S.view == "list" then render_table() end
      return
    end
    S.divine = jnum(data.divinePrice) or S.divine
    local rows, list = data.rows, {}
    if rows ~= nil and rows ~= js.null then
      local n = jnum(rows.length) or 0
      for i = 0, n - 1 do
        local r = rows[i]
        if r ~= nil and r ~= js.null then
          list[#list + 1] = {
            apiId = jstr(r.apiId), name = jstr(r.name) or "?", icon = jstr(r.iconPath),
            value = jnum(r.value) or 0, change = jnum(r.change24h) or 0,
            volume = jnum(r.volume) or 0, spark = sparkline(r.sparkline),
          }
        end
      end
    end
    S.rows = list
    if S.view == "list" then render_table() end
    render_ticker()
    render_meta()
  end)
end

local function render_tabs()
  local el = q("#mkt-cats")
  if el == js.null then return end
  local parts = {}
  for _, c in ipairs(S.categories) do
    local cls = (c.apiId == S.category) and "mkt-cat active" or "mkt-cat"
    parts[#parts + 1] = '<button class="' .. cls .. '" data-cat="' .. esc(c.apiId) .. '">' .. esc(c.label) .. '</button>'
  end
  el.innerHTML = table.concat(parts)
  ui.each(el, "[data-cat]", function(btn)
    ui.on(btn, "click", function()
      local id = ui.attr(btn, "data-cat")
      if id == S.category then return end
      S.category = id
      for _, c in ipairs(S.categories) do if c.apiId == id then S.catLabel = c.label end end
      S.q = ""
      local si = q("#mkt-search"); if si ~= js.null then si.value = "" end
      render_tabs()
      load_currencies()
    end)
  end)
end

local function load_categories()
  market_get("categories", S.league, nil, nil, function(data)
    S.categories = {}
    if data ~= nil and data ~= js.null and data.categories ~= nil and data.categories ~= js.null then
      local n = jnum(data.categories.length) or 0
      for i = 0, n - 1 do
        local c = data.categories[i]
        S.categories[#S.categories + 1] = { apiId = jstr(c.apiId) or "", label = jstr(c.label) or "?" }
      end
    end
    if #S.categories == 0 then S.categories = { { apiId = "currency", label = "Currency" } } end
    render_tabs()
    load_currencies()
  end)
end

local function render_leagues()
  local sel = q("#mkt-league")
  if sel == js.null then return end
  local parts = {}
  for _, l in ipairs(S.leagues) do
    local s = (l.value == S.league) and " selected" or ""
    parts[#parts + 1] = '<option value="' .. esc(l.value) .. '"' .. s .. '>' .. esc(l.value) .. (l.current and " · current" or "") .. '</option>'
  end
  sel.innerHTML = table.concat(parts)
end

local function load_leagues(after)
  market_get("leagues", nil, nil, nil, function(data)
    S.leagues = {}
    local cur = nil
    if data ~= nil and data ~= js.null and data.leagues ~= nil and data.leagues ~= js.null then
      local n = jnum(data.leagues.length) or 0
      for i = 0, n - 1 do
        local l = data.leagues[i]
        local val = jstr(l.Value) or ""
        local isCur = (l.IsCurrent == true)
        S.leagues[#S.leagues + 1] = { value = val, current = isCur }
        if isCur and not cur then cur = val end
      end
    end
    if not S.league then S.league = cur or (S.leagues[1] and S.leagues[1].value) end
    render_leagues()
    if after then after() end
  end)
end

-- ---------------------------------------------------------------- detail view

set_view = function(v)
  S.view = v
  local lh = q("#mkt-listhead")
  if lh ~= js.null then lh.style.display = (v == "list") and "" or "none" end
end

local function unit_of(d)
  local cur = jnum(d.stats and d.stats.current) or 0
  local div = jnum(d.divinePrice) or 0
  if div > 0 and cur >= div then return "div", div end
  return "ex", div
end

-- price-history line chart SVG from a series of numbers (already in display unit)
local function line_chart(series, unit)
  local n = #series
  if n < 2 then return '<div class="mkt-nochart">No data for this range.</div>' end
  local mn, mx = math.huge, -math.huge
  for _, v in ipairs(series) do if v < mn then mn = v end; if v > mx then mx = v end end
  local w, h, pad = 600, 150, 4
  local rng = mx - mn; if rng == 0 then rng = 1 end
  local pts = {}
  for i, v in ipairs(series) do
    local x = pad + (i - 1) / (n - 1) * (w - 2 * pad)
    local y = pad + (1 - (v - mn) / rng) * (h - 2 * pad)
    pts[#pts + 1] = string.format("%.1f,%.1f", x, y)
  end
  local color = (series[n] >= series[1]) and "#5fb95f" or "#c9564a"
  local area = string.format("%.1f,%.1f ", pad, h - pad) .. table.concat(pts, " ")
    .. string.format(" %.1f,%.1f", w - pad, h - pad)
  return '<div class="mkt-chart">'
    .. '<svg class="mkt-chartsvg" viewBox="0 0 ' .. w .. ' ' .. h .. '" preserveAspectRatio="none">'
    .. '<polygon fill="' .. color .. '" fill-opacity="0.12" points="' .. area .. '"/>'
    .. '<polyline fill="none" stroke="' .. color .. '" stroke-width="1.6" vector-effect="non-scaling-stroke" points="'
    .. table.concat(pts, " ") .. '"/></svg>'
    .. '<span class="mkt-axhi">' .. fmt(mx) .. ' ' .. unit .. '</span>'
    .. '<span class="mkt-axlo">' .. fmt(mn) .. ' ' .. unit .. '</span>'
    .. '</div>'
end

local function chart_series(d, unit, div)
  local function inU(v) if unit == "div" and div > 0 then return v / div else return v end end
  local out = {}
  local function pull(arr, key, tail)
    if arr == nil or arr == js.null then return end
    local n = jnum(arr.length) or 0
    local start = tail and math.max(0, n - tail) or 0
    for i = start, n - 1 do
      local it = arr[i]
      if it ~= nil and it ~= js.null then
        local v = jnum(key == "value" and it.value or it.close)
        if v then out[#out + 1] = inU(v) end
      end
    end
  end
  if S.tf == "24H" then pull(d.hourly, "value", 24)
  elseif S.tf == "7D" then pull(d.hourly, "value", nil)
  elseif S.tf == "30D" then pull(d.daily, "close", 30)
  else pull(d.daily, "close", nil) end
  return out
end

local function render_wiki(host, name)
  if host == js.null then return end
  host.innerHTML = '<div class="mkt-wiki-load">Loading wiki article…</div>'
  local w = window.ecWiki
  if w == nil or w == js.null then host.innerHTML = '<div class="mkt-wiki-load">Wiki unavailable.</div>' return end
  w:get(name, function(_, art)
    if art == nil or art == js.null then
      host.innerHTML = '<div class="mkt-wiki-load">No wiki article found for &ldquo;' .. esc(name) .. '&rdquo;.</div>'
      return
    end
    local parts, lead, secs = {}, art.lead, art.sections
    if lead ~= nil and lead ~= js.null then
      for i = 0, (jnum(lead.length) or 0) - 1 do parts[#parts + 1] = '<p>' .. esc(tostring(lead[i])) .. '</p>' end
    end
    if secs ~= nil and secs ~= js.null then
      for i = 0, (jnum(secs.length) or 0) - 1 do
        local s = secs[i]
        local title = jstr(s.title)
        if title and title ~= "" then parts[#parts + 1] = '<h4 class="mkt-wiki-h">' .. esc(title) .. '</h4>' end
        local body = s.body
        if body ~= nil and body ~= js.null then
          for j = 0, (jnum(body.length) or 0) - 1 do parts[#parts + 1] = '<p>' .. esc(tostring(body[j])) .. '</p>' end
        end
      end
    end
    host.innerHTML = '<div class="mkt-wiki">' .. table.concat(parts) .. '</div>'
  end)
end

local render_detail

local function back_only(msg)
  local el = q("#mkt-body")
  if el == js.null then return end
  el.innerHTML = '<div class="mkt-detail"><div class="mkt-dethead"><button id="mkt-back" class="mkt-back">'
    .. '<i class="bi bi-arrow-left"></i></button></div><div class="mkt-state">' .. msg .. '</div></div>'
  ui.on(el:querySelector("#mkt-back"), "click", function() set_view("list"); render_table() end)
end

render_detail = function()
  local el = q("#mkt-body")
  if el == js.null then return end
  local d = S.detail
  if d == nil then el.innerHTML = '<div class="mkt-state">Loading item…</div>' return end
  local unit, div = unit_of(d)
  local stats = d.stats
  local function inU(v) if unit == "div" and div > 0 then return v / div else return v end end
  local cur = jnum(stats and stats.current) or 0
  local main = inU(cur)
  local alt = (unit == "div") and (main * div) or (div > 0 and main / div or 0)
  local altUnit = (unit == "div") and "ex" or "div"
  local name = jstr(d.name) or "?"
  local apiId = jstr(d.apiId) or S.selected
  local counter = (apiId == S.base) and ((S.base == "exalted") and "divine" or "exalted") or S.base
  local buy = tostring(window.ecMarket:exchangeUrl(S.league, apiId, counter))
  local sell = tostring(window.ecMarket:exchangeUrl(S.league, counter, apiId))

  local tabs = {}
  for _, t in ipairs({ "24H", "7D", "30D", "ALL" }) do
    tabs[#tabs + 1] = '<button class="mkt-tf' .. ((S.tf == t and not S.about) and " active" or "") .. '" data-tf="' .. t .. '">' .. t .. '</button>'
  end
  tabs[#tabs + 1] = '<button class="mkt-tf' .. (S.about and " active" or "") .. '" data-about="1">ⓘ About</button>'

  local content
  if S.about then
    content = '<div id="mkt-detbody" class="mkt-detbody"></div>'
  else
    content = '<div id="mkt-detbody" class="mkt-detbody">' .. line_chart(chart_series(d, unit, div), unit) .. '</div>'
  end

  local function sc(l, v) return '<div class="mkt-stat"><div class="mkt-stat-l">' .. l .. '</div><div class="mkt-stat-v">' .. v .. '</div></div>' end
  local statgrid = table.concat({
    sc("Right now", fmt(inU(jnum(stats.close) or 0)) .. " " .. unit),
    sc("Earlier today", fmt(inU(jnum(stats.open) or 0)) .. " " .. unit),
    sc("High (24h)", fmt(inU(jnum(stats.high24h) or 0)) .. " " .. unit),
    sc("Low (24h)", fmt(inU(jnum(stats.low24h) or 0)) .. " " .. unit),
    sc("This week", change_cell(jnum(stats.change7d) or 0)),
    sc("This month", change_cell(jnum(stats.change30d) or 0)),
    sc("Sold / day", fmt(jnum(stats.volume24h) or 0)),
    sc("For sale", fmt(jnum(stats.listed) or 0)),
  })

  el.innerHTML = table.concat({
    '<div class="mkt-detail">',
    '<div class="mkt-dethead">',
    '<button id="mkt-back" class="mkt-back" title="Back to market"><i class="bi bi-arrow-left"></i></button>',
    '<img class="mkt-detic" src="', esc(jstr(d.iconPath) or ""), '" alt="">',
    '<div class="mkt-dettitle"><div class="mkt-detname">', esc(name), '</div><div class="mkt-detcat">', esc(jstr(d.category) or ""), '</div></div>',
    '<div class="mkt-detprice"><div class="mkt-detbig">', fmt(main), ' <span class="mkt-unit">', unit, '</span></div>',
    '<div class="mkt-detalt">≈ ', fmt(alt), ' ', altUnit, '</div>',
    '<div>', change_cell(jnum(stats.change24h) or 0), '</div></div>',
    '</div>',
    '<div class="mkt-detactions">',
    '<a class="mkt-buy" href="', esc(buy), '" target="_blank" rel="noopener">Buy ↗</a>',
    '<a class="mkt-sell" href="', esc(sell), '" target="_blank" rel="noopener">Sell ↗</a>',
    '<span class="mkt-detsub">official Currency Exchange</span>',
    '</div>',
    '<div class="mkt-tfrow">', table.concat(tabs), '<span class="mkt-tfunit">price in ', unit, '</span></div>',
    content,
    '<div class="mkt-stats">', statgrid, '</div>',
    '</div>',
  })

  ui.on(el:querySelector("#mkt-back"), "click", function() set_view("list"); S.about = false; render_table() end)
  ui.each(el, "[data-tf]", function(b)
    ui.on(b, "click", function() S.tf = ui.attr(b, "data-tf"); S.about = false; render_detail() end)
  end)
  local ab = el:querySelector("[data-about]")
  if ab ~= js.null then ui.on(ab, "click", function() S.about = not S.about; render_detail() end) end
  if S.about then render_wiki(el:querySelector("#mkt-detbody"), name) end
end

local function load_detail(apiId)
  S.detail = nil
  render_detail()
  market_get("detail", S.league, nil, apiId, function(data)
    if data == nil or data == js.null then back_only("Item detail is temporarily unavailable.") return end
    S.detail = data
    render_detail()
  end)
end

open_detail = function(apiId)
  S.selected, S.about, S.tf = apiId, false, "7D"
  set_view("detail")
  load_detail(apiId)
end

-- ---------------------------------------------------------------- mount

local function mount(body)
  body_el = body
  body.innerHTML = table.concat({
    '<div class="mkt-wrap">',
    '<div id="mkt-ticker" class="mkt-ticker"></div>',
    '<div class="mkt-controls">',
    '<span class="mkt-lbl">League</span>',
    '<select id="mkt-league" class="form-select form-select-sm" style="max-width:230px"></select>',
    '<button id="mkt-refresh" class="btn btn-ec-ghost btn-sm" title="Refresh"><i class="bi bi-arrow-clockwise"></i></button>',
    '<span id="mkt-meta" class="mkt-metatxt"></span>',
    '</div>',
    '<div id="mkt-listhead">',
    '<div id="mkt-cats" class="mkt-cats"></div>',
    '<div class="mkt-searchrow"><i class="bi bi-search"></i><input id="mkt-search" class="mkt-search" placeholder="Search…"></div>',
    '</div>',
    '<div id="mkt-body" class="mkt-tablewrap"></div>',
    '</div>',
  })

  local sel = body:querySelector("#mkt-league")
  ui.on(sel, "change", function()
    S.league = tostring(sel.value)
    S.categories = {}
    load_categories()
  end)
  local si = body:querySelector("#mkt-search")
  ui.on(si, "input", function() S.q = tostring(si.value) render_table() end)
  ui.on(body:querySelector("#mkt-refresh"), "click", function()
    if S.view == "detail" and S.selected then load_detail(S.selected) else load_currencies() end
  end)

  -- always (re)mount into the list view
  S.view = "list"

  -- use cached static data across remounts; only fetch what's missing
  if S.loaded_static and S.league then
    render_leagues()
    render_tabs()
    if #S.rows > 0 then render_table() render_ticker() render_meta() else load_currencies() end
  else
    load_leagues(function()
      S.loaded_static = true
      load_categories()
    end)
  end
end

-- refresh the currency list every 2 minutes while the widget is open
window:setInterval(function()
  if body_el and codex.widgets and codex.widgets.is_open and codex.widgets.is_open("market-companion") and S.league then
    load_currencies()
  end
end, 120000)

codex.registry.register{
  id = "market-companion",
  name = "Market Companion",
  icon = "bi-graph-up-arrow",
  order = 20,
  status = "alpha",
  width = 640,
  desc = "Live PoE2 currency market — prices, 24h moves, volume and sparklines from the Currency Exchange.",
  mount = mount,
}

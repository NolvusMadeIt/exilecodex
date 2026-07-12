-- Run Tracker — a LiveSplit-style PoE2 campaign speedrun timer.
--   * A compact splits column (name · Δ-vs-PB · split time), a big adjusted
--     timer coloured ahead/behind/gold, and icon-only controls.
--   * Auto-splits on first-time zone entry / level (configurable split sets),
--     never on towns/hideouts.
--   * Load removal: subtracts the load-screen time the game logs (the gap
--     between "Got Instance Details" and "You have entered"), using the log's
--     millisecond uptime counter — the "game time" speedrunners compare.
--   * Personal Best + gold (best) segments per split set.
-- Settings live in Settings → Run Tracker; run history lives in the guide
-- toolbar's "History" button. Both read/drive this module via `codex.tracker`.
local js = require "js"
local window = js.global
local document = window.document
local ui = codex.ui

local RUN = "ec.tracker.run"
local HIST = "ec.tracker.hist"
local CUSTOM = "ec.tracker.customrules"
local MAX_HIST = 40

codex.tracker = codex.tracker or {}
local API = codex.tracker

-- ---------------------------------------------------------------- flags/time
local function flag(k, def)
  local v = ui.store_get(k); if v == nil then return def == "1" end; return v == "1"
end
local function autostart_on() return flag("ec.tracker.autostart", "1") end
local function pausetown_on() return flag("ec.tracker.pausetown", "1") end
local function loadremoval_on() return flag("ec.tracker.loadremoval", "1") end
local function autosplit_on() return flag("ec.tracker.autosplit", "1") end
local function dock_on() return flag("ec.tracker.dock", "0") end

local function now_ms()
  local ok, v = pcall(function() return window.Date:now() end)
  return ok and tonumber(v) or (os.time() * 1000)
end
local function esc(s) return (tostring(s):gsub("&", "&amp;"):gsub("<", "&lt;"):gsub(">", "&gt;")) end
local MINUS = "\226\136\146" -- U+2212

local function fmt(ms, tenths)
  ms = math.max(0, math.floor(tonumber(ms) or 0))
  local s = math.floor(ms / 1000)
  local h, m, sec = math.floor(s / 3600), math.floor((s % 3600) / 60), s % 60
  local base = h > 0 and string.format("%d:%02d:%02d", h, m, sec) or string.format("%d:%02d", m, sec)
  if tenths then base = base .. "." .. math.floor((ms % 1000) / 100) end
  return base
end
-- Δ vs PB: + = behind (slower/red), − = ahead (faster/green)
local function dfmt(ms)
  local neg = ms < 0
  local a = math.abs(math.floor(ms))
  local s = math.floor(a / 1000)
  local body = (s >= 60) and string.format("%d:%02d", math.floor(s / 60), s % 60)
    or string.format("%d.%d", s, math.floor((a % 1000) / 100))
  return (neg and MINUS or "+") .. body
end
local function znorm(s) return (tostring(s or ""):lower():gsub("^%s+", ""):gsub("%s+$", "")) end

-- ------------------------------------------------------------- split sets
local BUILTIN = {
  acts = { id = "acts", name = "Campaign — Acts", mode = "rules", rules = {
    { type = "zone", match = "Vastiri Outskirts", label = "Act 1" },
    { type = "zone", match = "Sandswept Marsh", label = "Act 2" },
    { type = "zone", match = "Kingsmarch", label = "Act 3" },
    { type = "zone", match = "The Ziggurat Refuge", label = "Campaign" },
  } },
  firstzone = { id = "firstzone", name = "Every new zone", mode = "firstzone", rules = {} },
}
local function decode(key)
  local ok, v = pcall(function() return codex.json.decode(ui.store_get(key) or "") end)
  return ok and v or nil
end
API.custom_rules = function()
  local r = decode(CUSTOM)
  return (type(r) == "table") and r or {}
end
local function active_set()
  local id = ui.store_get("ec.tracker.splitset") or "acts"
  if id == "custom" then
    return { id = "custom", name = "Custom", mode = "rules", rules = API.custom_rules() }
  end
  return BUILTIN[id] or BUILTIN.acts
end

-- towns / hideouts: never a split, and where the timer auto-pauses. Delegates to
-- the single classifier in codex.detect so one keyword list is used app-wide;
-- the local table is only a fallback if detect somehow isn't loaded yet.
local TOWN_WORDS = { "hideout", "encampment", "refuge", "caravan", "kingsmarch", "ziggurat encampment", " town", "ardura" }
local function is_town(area)
  if codex.detect and codex.detect.classify then return codex.detect.classify(area) ~= "other" end
  if not area or area == "" then return false end
  local a = tostring(area):lower()
  for _, w in ipairs(TOWN_WORDS) do if a:find(w, 1, true) then return true end end
  return false
end

-- ---------------------------------------------------------------- state
local T = { run = nil, hist = {}, body = nil, dock = nil, tick = nil, goldFlash = 0 }
local render, wire, render_history, do_split

local function pb_key(setId) return "ec.tracker.pb." .. setId end
local function gold_key(setId) return "ec.tracker.gold." .. setId end
local function get_pb(setId) return decode(pb_key(setId)) end
local function get_gold(setId) local g = decode(gold_key(setId)); return type(g) == "table" and g or {} end
local function set_gold(setId, tbl) ui.store_set(gold_key(setId), codex.json.encode(tbl)) end

local function load()
  local r = decode(RUN); T.run = (type(r) == "table" and r.segs) and r or nil
  local h = decode(HIST); T.hist = type(h) == "table" and h or {}
end
local function save_run() if T.run then ui.store_set(RUN, codex.json.encode(T.run)) else window.localStorage:removeItem(RUN) end end
local function save_hist() ui.store_set(HIST, codex.json.encode(T.hist)) end

-- ---------------------------------------------------------------- timing
local function raw_ms()
  local r = T.run; if not r then return 0 end
  if r.running and not r.paused then return (r.rawAccMs or 0) + (now_ms() - (r.sinceWall or now_ms())) end
  return r.rawAccMs or 0
end
local function adjusted_ms() local r = T.run; if not r then return 0 end; return raw_ms() - (r.loadMs or 0) end
API.adjusted_fmt = function() return fmt(adjusted_ms(), false) end

local function pause_timer() local r = T.run; if r and r.running and not r.paused then r.rawAccMs = raw_ms(); r.paused = true end end
local function resume_timer() local r = T.run; if r and r.running and r.paused then r.paused = false; r.sinceWall = now_ms() end end

local function start_run(zone)
  local n = now_ms()
  T.run = { running = true, paused = false, rawAccMs = 0, sinceWall = n, startedWall = n,
    loadMs = 0, pendingLoad = nil, setId = active_set().id, curIdx = 1, visited = {}, segs = {} }
  save_run()
end

do_split = function(label)
  local r = T.run; if not r then return end
  local cum = adjusted_ms()
  local prev = (#r.segs > 0) and r.segs[#r.segs].cum or 0
  local segDur = cum - prev
  local gold = get_gold(r.setId)
  local best = gold[label]
  local isGold = (best == nil) or (segDur < best)
  if isGold then gold[label] = segDur; set_gold(r.setId, gold); T.goldFlash = now_ms() end
  r.segs[#r.segs + 1] = { label = label, cum = cum, dur = segDur, gold = isGold }
  save_run(); render()
end

local function stop_save()
  local r = T.run; if not r then return end
  local total = adjusted_ms()
  table.insert(T.hist, 1, { endedWall = now_ms(), startedWall = r.startedWall, totalMs = total,
    loadMs = r.loadMs or 0, setId = r.setId, segs = r.segs })
  while #T.hist > MAX_HIST do table.remove(T.hist) end
  -- PB: overwrite if faster (or none yet)
  local pb = get_pb(r.setId)
  if #r.segs > 0 and (pb == nil or total < (pb.totalMs or math.huge)) then
    ui.store_set(pb_key(r.setId), codex.json.encode({ totalMs = total, segs = r.segs }))
  end
  T.run = nil; save_run(); save_hist()
end

-- ------------------------------------------------------------ auto-split
local function try_split_zone(name)
  local r = T.run; if not (r and autosplit_on() and r.running and not r.paused) then return end
  local set = active_set()
  if set.mode == "firstzone" then
    if is_town(name) then return end
    local k = znorm(name)
    if not r.visited[k] then r.visited[k] = true; do_split(name) end
    return
  end
  local rule = set.rules[r.curIdx]
  if rule and rule.type == "zone" and znorm(rule.match) == znorm(name) then
    r.curIdx = r.curIdx + 1; do_split(rule.label or name)
  end
end
local function try_split_level(n)
  local r = T.run; if not (r and autosplit_on() and r.running and not r.paused) then return end
  local set = active_set()
  local rule = set.rules[r.curIdx]
  if rule and rule.type == "level" and n and n >= (tonumber(rule.n) or 0) then
    r.curIdx = r.curIdx + 1; do_split(rule.label or ("Level " .. tostring(rule.n)))
  end
end

-- --------------------------------------------------- detection listeners
local last_zone_ms = 0
local function on_zone_ts(name, ms)
  if not name or name == "" then return end
  local r = T.run
  -- fold the just-finished load screen into removed time
  if r and loadremoval_on() and r.pendingLoad and ms then
    r.loadMs = (r.loadMs or 0) + math.max(0, ms - r.pendingLoad); r.pendingLoad = nil
  end
  local town = is_town(name)
  -- Start on the first ACT zone / map — never in town or hideout (when auto-pause
  -- is on). The timer is driven entirely by Client.txt, never a bare button press.
  if not r and autostart_on() and not (pausetown_on() and town) then start_run(name); r = T.run end
  if r then
    if town and pausetown_on() then pause_timer() else resume_timer() end
    try_split_zone(name)
  end
  render()
end
local function on_level_ts(n, _ms) try_split_level(n) end
local function on_load(ms) local r = T.run; if r and loadremoval_on() and ms then r.pendingLoad = ms end end

-- ------------------------------------------------------------ manual actions
-- The timer never starts from nothing: manual start only resumes an existing run
-- or begins one if Client.txt has already put us in an area. Otherwise it waits.
local function act_start()
  if T.run then resume_timer()
  elseif codex.detect and codex.detect.area and tostring(codex.detect.area) ~= "" then start_run(tostring(codex.detect.area))
  else return end
  save_run(); render()
end
local function act_pause() local r = T.run; if not r then return end; if r.paused then resume_timer() else pause_timer() end; save_run(); render() end
local function act_split() if T.run then do_split((codex.detect and codex.detect.area) or ("Split " .. (#T.run.segs + 1))) end end
local function act_reset() T.run = nil; save_run(); render() end
local function act_stop() stop_save(); render() end
API.reset_pb = function()
  local id = active_set().id
  window.localStorage:removeItem(pb_key(id)); window.localStorage:removeItem(gold_key(id))
  render()
end

-- ------------------------------------------------------------------ UI
local function delta_class(ms) if ms < 0 then return "ahead" else return "behind" end end

local function split_rows()
  local r = T.run
  local set = active_set()
  local pb = r and get_pb(r.setId) or get_pb(set.id)
  local pbsegs = (pb and pb.segs) or {}
  local rows = {}
  local function row(label, done, current, deltaMs, timeMs, gold)
    local dcls = deltaMs ~= nil and (" " .. delta_class(deltaMs)) or ""
    return table.concat({
      '<div class="rt-split', current and ' rt-live' or '', done and ' rt-done' or '', '">',
      '<span class="rt-sn">', esc(label), '</span>',
      '<span class="rt-sd', dcls, '">', deltaMs ~= nil and dfmt(deltaMs) or '', '</span>',
      '<span class="rt-stime', gold and ' rt-gold' or '', '">', timeMs ~= nil and fmt(timeMs, false) or '', '</span>',
      '</div>',
    })
  end
  if set.mode == "rules" and #set.rules > 0 then
    for i, rule in ipairs(set.rules) do
      local label = rule.label or rule.match or ("Split " .. i)
      local seg = r and r.segs[i]
      local pbcum = pbsegs[i] and pbsegs[i].cum or nil
      if seg then
        local d = pbcum and (seg.cum - pbcum) or nil
        rows[#rows + 1] = row(label, true, false, d, seg.cum, seg.gold)
      elseif r and i == #r.segs + 1 then
        rows[#rows + 1] = row(label, false, true, nil, nil, false)
      else
        rows[#rows + 1] = row(label, false, false, nil, pbcum, false)
      end
    end
  else
    -- firstzone / no rules: list what's been split, plus a live row
    if r then
      for i, seg in ipairs(r.segs) do rows[#rows + 1] = row(seg.label, true, false, nil, seg.cum, seg.gold) end
      rows[#rows + 1] = row((codex.detect and codex.detect.area) or "…", false, true, nil, nil, false)
    else
      rows[#rows + 1] = '<div class="rt-hint2">Enter a zone to start splitting.</div>'
    end
  end
  return table.concat(rows)
end

local function timer_color()
  local r = T.run
  if not r then return "" end
  if (now_ms() - (T.goldFlash or 0)) < 700 then return " rt-t-gold" end
  if r.paused then return " rt-t-paused" end
  local last = r.segs[#r.segs]
  local pb = get_pb(r.setId)
  if last and pb and pb.segs and pb.segs[#r.segs] then
    return (last.cum - pb.segs[#r.segs].cum) < 0 and " rt-t-ahead" or " rt-t-behind"
  end
  return ""
end

render = function()
  local host = dock_on() and T.dock or T.body
  if not host or not host.isConnected then return end
  local r = T.run
  local idleTxt = (codex.detect and codex.detect.available) and 'Waiting for zone' or 'Idle'
  local status = r and (r.paused and '<span class="rt-pill paused">Paused</span>' or '<span class="rt-pill rec">● REC</span>') or ('<span class="rt-pill idle">' .. idleTxt .. '</span>')
  local zone = (r and codex.detect and codex.detect.area) and ('<span class="rt-zc">' .. esc(codex.detect.area) .. '</span>') or ''
  local loadchip = (r and loadremoval_on() and (r.loadMs or 0) > 0) and ('<span class="rt-lc" title="Load time removed">' .. MINUS .. fmt(r.loadMs, false) .. '</span>') or ''
  -- Docked in the guide, keep it minimal: just the timer + controls (no splits).
  local docked = dock_on()
  host.innerHTML = table.concat({
    '<div class="rt-ls', docked and ' rt-docked' or '', '">',
      (not docked) and ('<div class="rt-splits">' .. split_rows() .. '</div>') or '',
      '<div class="rt-time', timer_color(), '" id="rt-time">', fmt(adjusted_ms(), true), '</div>',
      '<div class="rt-statusline">', status, zone, loadchip, '</div>',
      '<div class="rt-bar">',
        '<button class="rt-ib" data-act="', (r and not r.paused) and 'pause' or 'start', '" title="Start / pause (F6)"><i class="bi bi-', (r and not r.paused) and 'pause-fill' or 'play-fill', '"></i></button>',
        '<button class="rt-ib" data-act="split" title="Split (F9)"><i class="bi bi-scissors"></i></button>',
        '<button class="rt-ib" data-act="stop" title="Stop &amp; save (F7)"><i class="bi bi-flag-fill"></i></button>',
        '<button class="rt-ib ghost" data-act="reset" title="Reset (F8)"><i class="bi bi-arrow-counterclockwise"></i></button>',
        (dock_on() and '<button class="rt-ib ghost" data-act="detach" title="Detach to a floating window"><i class="bi bi-box-arrow-up-right"></i></button>' or ''),
      '</div>',
    '</div>',
  })
  wire(host)
end

wire = function(host)
  ui.each(host, "[data-act]", function(b)
    ui.on(b, "click", function()
      local a = ui.attr(b, "data-act")
      if a == "start" then act_start() elseif a == "pause" then act_pause()
      elseif a == "split" then act_split() elseif a == "stop" then act_stop()
      elseif a == "reset" then act_reset() elseif a == "detach" then API.detach() end
    end)
  end)
end

-- live tick — refresh the timer number + colour class (cheap; no full re-render)
local function tick()
  local host = dock_on() and T.dock or T.body
  if not host or not host.isConnected then return end
  local tv = host:querySelector("#rt-time")
  if tv ~= js.null then
    tv.innerHTML = fmt(adjusted_ms(), true)
    tv.className = "rt-time" .. timer_color()
  end
end

-- ---------------------------------------------------- history (guide toolbar)
render_history = function(el)
  if el == nil or el == js.null then return end
  local set = active_set()
  local pb = get_pb(set.id)
  local parts = { '<div class="rt-hhdr"><span>Personal best <b>', pb and fmt(pb.totalMs, false) or '—',
    '</b> · ', esc(set.name), '</span><button class="rt-clearpb" data-clearpb="1">Clear PB</button></div>' }
  if #T.hist == 0 then
    parts[#parts + 1] = '<div class="rt-hempty">No finished runs yet.</div>'
  else
    for i, h in ipairs(T.hist) do
      local subs = {}
      for j, seg in ipairs(h.segs or {}) do
        subs[#subs + 1] = '<div class="rt-hseg"><span>' .. esc(seg.label) .. '</span><span class="' .. (seg.gold and 'rt-gold' or '') .. '">' .. fmt(seg.cum, false) .. '</span></div>'
      end
      parts[#parts + 1] = table.concat({
        '<div class="rt-hrow" data-h="', i, '">',
        '<div class="rt-hhead"><span class="rt-htot">', fmt(h.totalMs, false), '</span>',
        '<span class="rt-hmeta">', #(h.segs or {}), ' splits', (h.loadMs and h.loadMs > 0) and (' · ' .. MINUS .. fmt(h.loadMs, false) .. ' load') or '', '</span>',
        '<i class="bi bi-chevron-down rt-hchev"></i>',
        '<button class="rt-htrash" data-del="', i, '" title="Delete this run"><i class="bi bi-trash"></i></button></div>',
        '<div class="rt-hsegs d-none">', table.concat(subs), '</div></div>',
      })
    end
  end
  el.innerHTML = table.concat(parts)
  ui.on(el:querySelector("[data-clearpb]"), "click", function() API.reset_pb(); render_history(el) end)
  ui.each(el, ".rt-hrow", function(rowEl)
    ui.on(rowEl:querySelector(".rt-hhead"), "click", function(_, ev)
      if ev and ev.target and ev.target.closest and ev.target:closest(".rt-htrash") ~= js.null then return end
      local s = rowEl:querySelector(".rt-hsegs"); if s ~= js.null then s.classList:toggle("d-none") end
      rowEl.classList:toggle("open")
    end)
  end)
  ui.each(el, "[data-del]", function(btn)
    ui.on(btn, "click", function()
      local idx = tonumber(ui.attr(btn, "data-del"))
      if idx then table.remove(T.hist, idx); save_hist(); render_history(el) end
    end)
  end)
end
API.render_history = render_history

-- ------------------------------------------------------- dock into the guide
API.mount_into = function(el) T.dock = el; if dock_on() then render() end end
API.unmount = function() T.dock = nil end
API.is_docked = function() return dock_on() end
-- Attach: dock the tracker under the guide's Speedrun footer + hide the widget.
API.attach = function()
  ui.store_set("ec.tracker.dock", "1")
  if codex.widgets then
    if not codex.widgets.is_open("campaign-guide") then codex.widgets.open_plugin("campaign-guide") end
    codex.widgets.close("run-tracker")
  end
  if codex.guide and codex.guide.refresh_dock then codex.guide.refresh_dock() end
end
API.detach = function()
  ui.store_set("ec.tracker.dock", "0")
  T.dock = nil
  if codex.guide and codex.guide.refresh_dock then codex.guide.refresh_dock() end
  if codex.widgets then codex.widgets.open_plugin("run-tracker") end
end

-- ------------------------------------------------------------------ hotkeys
local hk_bound = false
local function bind_hotkeys()
  if hk_bound then return end
  hk_bound = true
  document:addEventListener("keydown", function(_, ev)
    local k = tostring(ev.key)
    if k == "F6" then (T.run and (not T.run.paused) and act_pause or act_start)(); ev:preventDefault()
    elseif k == "F7" then act_stop(); ev:preventDefault()
    elseif k == "F8" then act_reset(); ev:preventDefault()
    elseif k == "F9" then act_split(); ev:preventDefault() end
  end)
end

-- ------------------------------------------------------------------ init
load()
if codex.detect then
  if codex.detect.on_zone_ts then codex.detect.on_zone_ts(on_zone_ts) end
  if codex.detect.on_level_ts then codex.detect.on_level_ts(on_level_ts) end
  if codex.detect.on_load then codex.detect.on_load(on_load) end
end
bind_hotkeys()
if T.tick == nil then T.tick = window:setInterval(function() tick() end, 250) end

local function mount(body) T.body = body; if not dock_on() then render() end end
local function on_close() T.body = nil end

codex.registry.register{
  id = "run-tracker",
  name = "Run Tracker",
  icon = "bi-stopwatch",
  order = 15,
  status = "alpha",
  published = true,
  width = 230,
  desc = "A LiveSplit-style PoE2 campaign speedrun timer — auto-splits on zones/levels, removes load time, tracks PB + gold splits. History lives in the guide toolbar; settings in Settings → Run Tracker.",
  mount = mount,
  on_close = on_close,
  on_attach = API.attach,
}

-- codex.detect — Client.txt smart detection. The desktop shell tails PoE2's
-- Client.txt and pushes { char, cls, level, area, active } to the renderer; we
-- mirror it into the guide status bar (Discord-presence style) and gate the run
-- timer on "the game is actually running". No-ops in the browser build (no shell).
local js = require "js"
local window = js.global
local ui = codex.ui

codex.detect = { char = nil, cls = nil, level = nil, area = nil, kind = "other", active = false, available = false }
local D = codex.detect

local function shell()
  if window.exileShell ~= nil and window.exileShell ~= js.null then return window.exileShell end
  return nil
end

-- Detection (and therefore the run timer) is only possible in the desktop shell.
D.available = shell() ~= nil

-- Zone-kind classifier. The log only gives an area DISPLAY NAME, so we classify
-- by name into { "town", "hideout", "other" }. This is the single source of truth
-- for "should the timer pause here" (town/hideout) — the guide decides
-- campaign-vs-map itself by whether the area matches a step. Name-based so it can
-- be tuned without rebuilding the shell.
local HIDEOUT_WORDS = { "hideout" }
local TOWN_WORDS = { "encampment", "refuge", "caravan", "kingsmarch", "ardura", " town" }
function D.classify(area)
  if not area or area == "" then return "other" end
  local a = tostring(area):lower()
  for _, w in ipairs(HIDEOUT_WORDS) do if a:find(w, 1, true) then return "hideout" end end
  for _, w in ipairs(TOWN_WORDS) do if a:find(w, 1, true) then return "town" end end
  return "other"
end
-- true when the current (or given) area is a town/hideout, where the timer pauses.
function D.is_town(area)
  return D.classify(area ~= nil and area or D.area) ~= "other"
end

-- Zone-change listeners (the Run Tracker subscribes here). Each is called with
-- the new area name whenever the player enters a different zone.
D.zone_listeners = {}
function D.on_zone_change(fn) D.zone_listeners[#D.zone_listeners + 1] = fn end
local function emit_zone(area)
  if codex.guide and codex.guide.on_zone then codex.guide.on_zone(area) end
  for _, fn in ipairs(D.zone_listeners) do pcall(fn, area) end
end

-- Timestamped speedrun events (Run Tracker: auto-split + load removal). These
-- carry the log's ms uptime counter so load time can be subtracted precisely.
D.zone_ts_listeners = {}
D.level_ts_listeners = {}
D.load_listeners = {}
function D.on_zone_ts(fn) D.zone_ts_listeners[#D.zone_ts_listeners + 1] = fn end
function D.on_level_ts(fn) D.level_ts_listeners[#D.level_ts_listeners + 1] = fn end
function D.on_load(fn) D.load_listeners[#D.load_listeners + 1] = fn end
local function fire(list, a, b) for _, fn in ipairs(list) do pcall(fn, a, b) end end

local function s_or_nil(v)
  if v == nil or v == js.null then return nil end
  local s = tostring(v)
  if s == "" then return nil end
  return s
end

-- Point the watcher at the configured Client.txt path (call on boot + on change).
function D.start()
  local sh = shell()
  if not sh or sh.watchClientTxt == nil then return end
  sh:watchClientTxt(ui.store_get("ec.path.clienttxt") or "")
end

local function esc(s)
  return (tostring(s):gsub("&", "&amp;"):gsub("<", "&lt;"):gsub(">", "&gt;"))
end

-- HTML for the Settings connection indicator — green dot when the game is live.
function D.status_html()
  if D.active then
    local bits = {}
    if D.char and D.char ~= "" then bits[#bits + 1] = esc(D.char) end
    if D.level then bits[#bits + 1] = "Lv " .. string.format("%d", D.level) end
    if D.area and D.area ~= "" then bits[#bits + 1] = esc(D.area) end
    local detail = (#bits > 0) and (" &mdash; " .. table.concat(bits, ", ")) or ""
    return '<span class="conn on"><i class="bi bi-circle-fill"></i> ' .. codex.T("Connected") .. detail .. '</span>'
  end
  return '<span class="conn"><i class="bi bi-circle-fill"></i> ' .. codex.T("Not detected") .. '</span>'
end

-- Repaint the guide presence strip (name / level / zone chips, blank when
-- unknown) and any open Settings connection indicators.
function D.refresh()
  local bar = ui.byId("cg-status")
  if bar then
    local parts = {}
    if D.char and D.char ~= "" then
      parts[#parts + 1] = '<span class="cg-chip"><i class="bi bi-person-fill"></i>' .. esc(D.char) .. '</span>'
    end
    if D.level then
      parts[#parts + 1] = '<span class="cg-chip lv"><i class="bi bi-graph-up-arrow"></i>' .. string.format("%d", D.level) .. '</span>'
    end
    if D.area and D.area ~= "" then
      parts[#parts + 1] = '<span class="cg-chip"><i class="bi bi-geo-alt-fill"></i>' .. esc(D.area) .. '</span>'
    end
    bar.innerHTML = table.concat(parts)
  end
  for _, id in ipairs({ "set-conn", "set-det-live" }) do
    local el = ui.byId(id)
    if el then el.innerHTML = D.status_html() end
  end
end

-- Subscribe to shell pushes (fengari hands event callbacks `this` first).
local sh = shell()
if sh and sh.onDetect ~= nil then
  sh:onDetect(function(_, data)
    if data == nil or data == js.null then return end
    D.active = (data.active == true)
    D.char = s_or_nil(data.char)
    D.cls = s_or_nil(data.cls)
    local lv = data.level
    local new_level = (lv ~= nil and lv ~= js.null) and tonumber(lv) or nil
    local new_area = s_or_nil(data.area)

    -- auto-follow the guide on a NEW zone / level (not on every repeat push)
    local zone_changed = new_area ~= nil and new_area ~= D.area
    local level_changed = new_level ~= nil and new_level ~= D.level
    D.level = new_level
    D.area = new_area
    D.kind = D.classify(new_area)

    D.refresh()
    if codex.guide and codex.guide.maybe_autostart_timer then codex.guide.maybe_autostart_timer() end
    if zone_changed then emit_zone(new_area) end
    if level_changed and codex.guide and codex.guide.on_level then codex.guide.on_level(new_level) end
  end)
end

-- Timestamped events (load / zone / level with the log ms counter) → the Run
-- Tracker's load-removal + auto-split. Additive to the snapshot channel above.
if sh and sh.onDetectEvent ~= nil then
  sh:onDetectEvent(function(_, ev)
    if ev == nil or ev == js.null then return end
    local t = tostring(ev.type)
    local ms = (ev.ms ~= nil and ev.ms ~= js.null) and tonumber(ev.ms) or nil
    if t == "zone" then
      fire(D.zone_ts_listeners, s_or_nil(ev.name), ms)
    elseif t == "level" then
      local lv = (ev.level ~= nil and ev.level ~= js.null) and tonumber(ev.level) or nil
      fire(D.level_ts_listeners, lv, ms)
    elseif t == "load" then
      fire(D.load_listeners, ms)
    end
  end)
end

D.start()

-- Debug/test hook: simulate a Client.txt push from the JS console (or a test):
--   window.ecDetectSimulate("Clearfell", 5)   -- enter a zone / set a level
--   window.ecTrackerSimLoad(1200)             -- simulate a 1200ms load screen
-- Drives the same auto-follow + tracker paths as a real detection push.
local sim_ms = 0
local sim_pending_load = 0
window.ecTrackerSimLoad = function(_, ms)
  sim_pending_load = tonumber(ms) or 0
  fire(D.load_listeners, sim_ms)  -- load START now; the next zone ends it `ms` later
end
window.ecDetectSimulate = function(_, area, level)
  D.active = true
  local new_area = s_or_nil(area)
  local new_level = (level ~= nil and level ~= js.null) and tonumber(level) or nil
  local zone_changed = new_area ~= nil and new_area ~= D.area
  local level_changed = new_level ~= nil and new_level ~= D.level
  if new_level ~= nil then D.level = new_level end
  if new_area ~= nil then D.area = new_area end
  D.kind = D.classify(D.area)
  D.refresh()
  if codex.guide and codex.guide.maybe_autostart_timer then codex.guide.maybe_autostart_timer() end
  if zone_changed then emit_zone(new_area) end
  if level_changed and codex.guide and codex.guide.on_level then codex.guide.on_level(new_level) end
  -- also drive the timestamped tracker listeners (synthetic ms clock). A pending
  -- simulated load lands its full duration on this zone's timestamp.
  if sim_pending_load > 0 then sim_ms = sim_ms + sim_pending_load; sim_pending_load = 0
  else sim_ms = sim_ms + 50 end
  if zone_changed then fire(D.zone_ts_listeners, new_area, sim_ms) end
  if level_changed then fire(D.level_ts_listeners, new_level, sim_ms) end
end

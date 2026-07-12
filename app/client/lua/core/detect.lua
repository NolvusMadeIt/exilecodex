-- codex.detect — Client.txt smart detection. The desktop shell tails PoE2's
-- Client.txt and pushes { char, cls, level, area, active } to the renderer; we
-- mirror it into the guide status bar (Discord-presence style) and gate the run
-- timer on "the game is actually running". No-ops in the browser build (no shell).
local js = require "js"
local window = js.global
local ui = codex.ui

codex.detect = { char = nil, cls = nil, level = nil, area = nil, active = false, available = false }
local D = codex.detect

local function shell()
  if window.exileShell ~= nil and window.exileShell ~= js.null then return window.exileShell end
  return nil
end

-- Detection (and therefore the run timer) is only possible in the desktop shell.
D.available = shell() ~= nil

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

    D.refresh()
    if codex.guide then
      if codex.guide.maybe_autostart_timer then codex.guide.maybe_autostart_timer() end
      if zone_changed and codex.guide.on_zone then codex.guide.on_zone(new_area) end
      if level_changed and codex.guide.on_level then codex.guide.on_level(new_level) end
    end
  end)
end

D.start()

-- Debug/test hook: simulate a Client.txt push from the JS console (or a test):
--   window.ecDetectSimulate("Clearfell", 5)   -- enter a zone / set a level
-- Drives the same auto-follow path as a real detection push.
window.ecDetectSimulate = function(_, area, level)
  D.active = true
  local new_area = s_or_nil(area)
  local new_level = (level ~= nil and level ~= js.null) and tonumber(level) or nil
  local zone_changed = new_area ~= nil and new_area ~= D.area
  local level_changed = new_level ~= nil and new_level ~= D.level
  if new_level ~= nil then D.level = new_level end
  if new_area ~= nil then D.area = new_area end
  D.refresh()
  if codex.guide then
    if codex.guide.maybe_autostart_timer then codex.guide.maybe_autostart_timer() end
    if zone_changed and codex.guide.on_zone then codex.guide.on_zone(new_area) end
    if level_changed and codex.guide.on_level then codex.guide.on_level(new_level) end
  end
end

-- Bounded overlay coordinator. The Electron shell owns the native window bounds;
-- this module reports only visible HUD rectangles and compensates local DOM
-- coordinates when the shell moves the window origin.
local js = require "js"
local window = js.global
local ui = codex.ui

codex.overlay = {}
local M = codex.overlay
local pending = false

local function shell()
  local sh = window.exileShell
  if sh ~= nil and sh ~= js.null and sh.mode == "overlay" then return sh end
  return nil
end

local function add_rect(out, id, el)
  if not el or el == js.null then return end
  local ok, r = pcall(function() return el:getBoundingClientRect() end)
  if not ok or not r or r == js.null then return end
  local w, h = tonumber(r.width) or 0, tonumber(r.height) or 0
  if w > 0 and h > 0 then
    out[#out + 1] = { id = id, x = tonumber(r.x) or 0, y = tonumber(r.y) or 0, width = w, height = h }
  end
end

function M.report()
  pending = false
  local sh = shell()
  if not sh or sh.overlayLayout == nil then return end
  local rects = {}
  add_rect(rects, "orb", ui.byId("orb"))
  if codex.widgets and codex.widgets.open then
    for id, fr in pairs(codex.widgets.open) do add_rect(rects, id, fr) end
  end
  local rail = ui.byId("rail")
  if rail then
    ui.each(rail, ".ec-rail-btn", function(btn) add_rect(rects, "menu:" .. tostring(ui.attr(btn, "data-view") or ""), btn) end)
  end
  pcall(function() sh:overlayLayout(codex.json.encode({ rects = rects })) end)
end

function M.request_report()
  if pending then return end
  pending = true
  window:setTimeout(function() M.report() end, 50)
end

window:addEventListener("resize", function()
  M.request_report()
end)

local function shift(el, dx, dy)
  if not el or el == js.null then return end
  local x, y = tonumber(el.offsetLeft) or 0, tonumber(el.offsetTop) or 0
  el.style.left = math.floor(x - dx) .. "px"
  el.style.top = math.floor(y - dy) .. "px"
end

local function origin_callback(a, b)
  local msg = b
  if msg == nil or msg == js.null then msg = a end
  if msg == nil or msg == js.null then return end
  local dx, dy = tonumber(msg.dx) or 0, tonumber(msg.dy) or 0
  if dx == 0 and dy == 0 then return end
  shift(ui.byId("orb"), dx, dy)
  shift(ui.byId("rail"), dx, dy)
  if codex.widgets and codex.widgets.open then
    for _, fr in pairs(codex.widgets.open) do shift(fr, dx, dy) end
  end
  M.request_report()
end

do
  local sh = shell()
  if sh and sh.onOverlayOrigin ~= nil then sh:onOverlayOrigin(origin_callback) end
end

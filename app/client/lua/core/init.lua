-- init.lua — boots the core app. The core is deliberately tiny: an
-- Overwolf-style launcher orb (drag anywhere, click to unfold the menu,
-- Alt+1 hides/shows the orb without touching open widgets), plus the
-- built-in Plugins and Settings widgets. Loads last so every plugin has
-- already registered itself.
local js = require "js"
local window = js.global
local document = window.document
local ui = codex.ui
local W = codex.widgets

local VERSION = codex.VERSION

-- built-in widgets ----------------------------------------------------------

local function plugins_body(body)
  local parts = {}
  for _, p in ipairs(codex.registry.visible()) do
    parts[#parts + 1] = table.concat({
      '<div class="ec-panel d-flex align-items-center gap-3 p-2 mb-2">',
      '<i class="bi ', p.icon or 'bi-puzzle', '" style="font-size:20px;color:var(--ec-gold)"></i>',
      '<div class="flex-grow-1 min-w-0">',
      '<div style="color:var(--ec-text-strong);font-weight:500;font-size:12px">', p.name,
      ' <span class="ec-chip ec-chip-gold" style="font-size:11px">', p.status or "alpha", '</span></div>',
      '<div class="ec-dim" style="font-size:11px">', p.desc or "", '</div>',
      '</div>',
      '<div class="form-check form-switch m-0">',
      '<input class="form-check-input" type="checkbox" checked disabled title="Always on during alpha">',
      '</div></div>',
    })
  end
  parts[#parts + 1] = '<div class="ec-muted" style="font-size:11px">Install, update and remove plugins from the ExileCodex installer (coming with the desktop shell).</div>'
  body.innerHTML = table.concat(parts)
end

local BUILTINS = {
  ["__plugins"] = { title = "Plugins", icon = "bi-puzzle", width = 470, color = "#e5661a", mount = plugins_body },
  -- Zygor's options window is 700×500 with a ~190px group sidebar
  ["__settings"] = { title = "Settings", icon = "bi-gear", width = 700, color = "#9a9a9a", flush = true,
    mount = function(body) codex.settings.mount(body) end },
}

local function toggle_widget(id)
  if id == "__quit" then
    if window.exileShell ~= nil and window.exileShell ~= js.null then
      window.exileShell:quit()
    end
    return
  end
  local b = BUILTINS[id]
  if b then
    if W.is_open(id) then
      W.close(id)
    else
      W.spawn{ id = id, title = b.title, icon = b.icon, width = b.width, mount = b.mount }
    end
  else
    W.toggle_plugin(id)
  end
end

-- the menu (unfolds from the orb) --------------------------------------------

local orb = ui.byId("orb")
local rail = ui.byId("rail")

-- The DOM is the single source of truth for menu state — a Lua-side flag can
-- drift out of sync if an event is lost (e.g. mouseup outside the window).
local function is_menu_open()
  return not rail.classList:contains("d-none")
end

local function rail_button(id, icon, title)
  -- one restrained gold ramp for all rail glyphs; state via CSS hover/active
  return '<button class="ec-rail-btn" data-view="' .. id .. '" title="' .. codex.T(title)
    .. '"><i class="bi ' .. icon .. '"></i></button>'
end

local function sync_rail()
  ui.each(rail, ".ec-rail-btn", function(btn)
    local id = ui.attr(btn, "data-view")
    if id and W.is_open(id) then
      btn.classList:add("active")
    else
      btn.classList:remove("active")
    end
  end)
end

local function render_rail()
  local parts = {}
  for _, p in ipairs(codex.registry.visible()) do
    parts[#parts + 1] = rail_button(p.id, p.icon or "bi-puzzle", p.name)
  end
  parts[#parts + 1] = rail_button("__plugins", "bi-puzzle", "Plugins")
  parts[#parts + 1] = rail_button("__settings", "bi-gear", "Settings")
  if window.exileShell ~= nil and window.exileShell ~= js.null then
    parts[#parts + 1] = rail_button("__quit", "bi-power", "Quit ExileCodex")
  end
  rail.innerHTML = table.concat(parts)

  ui.each(rail, ".ec-rail-btn", function(btn)
    ui.on(btn, "click", function() toggle_widget(ui.attr(btn, "data-view")) end)
  end)
end

-- Fan the buttons out in arcs around the orb, opening toward whichever side
-- of the screen has room. Spacing is computed from arc length so buttons sit
-- an even ~48px apart on every ring — never bunched, never scattered.
local RINGS = { 80, 132, 184, 236 }
local ARC_GAP = 48    -- px between button centers along an arc
local MAX_SPAN = 150  -- max degrees a ring may fan across

local function place_menu()
  local vw, vh = window.innerWidth, window.innerHeight
  local cx = orb.offsetLeft + 23
  local cy = orb.offsetTop + 23
  rail.style.left = cx .. "px"
  rail.style.top = cy .. "px"

  local dir = (cx < vw / 2) and 1 or -1

  local btns = {}
  ui.each(rail, ".ec-rail-btn", function(b) btns[#btns + 1] = b end)

  local function asin_deg(v)
    if v < -1 then v = -1 elseif v > 1 then v = 1 end
    return math.deg(math.asin(v))
  end

  -- Each ring computes its own allowed angular window from the screen edges
  -- (topmost point >= 30px, bottommost <= vh-30px, capped to the forward
  -- 200°), fills what fits, and overflows the rest outward. At a corner the
  -- fan naturally folds into the open quadrant instead of clipping.
  local idx = 1
  for _, r in ipairs(RINGS) do
    if idx > #btns then break end
    local top_arg = (30 - cy) / r
    local bot_arg = (vh - 30 - cy) / r
    local a1 = (top_arg <= -1) and -100 or asin_deg(top_arg)
    local a2 = (bot_arg >= 1) and 100 or asin_deg(bot_arg)
    local step = math.deg(ARC_GAP / r)
    local avail = a2 - a1
    if avail >= 0 then
      local cap = math.min(math.floor(avail / step) + 1, math.floor(MAX_SPAN / step) + 1)
      local n = math.min(cap, #btns - idx + 1)
      local used = step * (n - 1)
      local start = a1 + (avail - used) / 2
      for k = 1, n do
        local a = math.rad(start + (k - 1) * step)
        local b = btns[idx]
        b.style.left = math.floor(dir * r * math.cos(a)) .. "px"
        b.style.top = math.floor(r * math.sin(a)) .. "px"
        b.style.transitionDelay = (idx * 14) .. "ms"
        idx = idx + 1
      end
    end
  end
  -- pathological leftovers (tiny screen): stack beside the orb, never lost
  while idx <= #btns do
    local b = btns[idx]
    b.style.left = (dir * 54) .. "px"
    b.style.top = ((idx - #btns) * 44) .. "px"
    b.style.transitionDelay = (idx * 14) .. "ms"
    idx = idx + 1
  end
end

local function close_menu()
  rail.classList:remove("open")
  rail.classList:add("d-none")
end

local function open_menu()
  rail.classList:remove("d-none")
  place_menu()
  sync_rail()
  window:setTimeout(function()
    rail.classList:add("open")
  end, 20)
end

-- the orb ---------------------------------------------------------------------

local function tuck_orb()
  orb.classList:remove("tuck-left")
  orb.classList:remove("tuck-right")
  local vw = window.innerWidth
  if orb.offsetLeft <= 4 then
    orb.classList:add("tuck-left")
  elseif orb.offsetLeft + 46 >= vw - 4 then
    orb.classList:add("tuck-right")
  end
end

local function orb_place(x, y)
  local vw, vh = window.innerWidth, window.innerHeight
  x = math.max(0, math.min(x, vw - 46))
  y = math.max(0, math.min(y, vh - 46))
  orb.style.left = x .. "px"
  orb.style.top = y .. "px"
end

local function orb_load()
  local v = ui.store_get("ec.orb")
  local x, y = 14, math.floor(window.innerHeight * 0.4)
  if v then
    local sx, sy = v:match("^(-?%d+),(-?%d+)$")
    if sx then x, y = tonumber(sx), tonumber(sy) end
  end
  orb_place(x, y)
  tuck_orb()
end

local orb_drag = nil

orb:addEventListener("mousedown", function(_, ev)
  orb_drag = {
    sx = ev.clientX, sy = ev.clientY,
    ox = orb.offsetLeft, oy = orb.offsetTop,
    moved = false,
  }
  ev:preventDefault()
end)

document:addEventListener("mousemove", function(_, ev)
  local d = orb_drag
  if not d then return end
  if ev.buttons == 0 then
    -- the mouseup never reached us (released outside the window) — abort the
    -- drag instead of teleporting the orb on the next stray mousemove
    orb_drag = nil
    return
  end
  local dx, dy = ev.clientX - d.sx, ev.clientY - d.sy
  if math.abs(dx) > 4 or math.abs(dy) > 4 then d.moved = true end
  if d.moved then
    orb.classList:remove("tuck-left")
    orb.classList:remove("tuck-right")
    orb_place(d.ox + dx, d.oy + dy)
    if is_menu_open() then place_menu() end
  end
end)

document:addEventListener("mouseup", function()
  local d = orb_drag
  if not d then return end
  orb_drag = nil
  if d.moved then
    ui.store_set("ec.orb", math.floor(orb.offsetLeft) .. "," .. math.floor(orb.offsetTop))
    tuck_orb()
  else
    if is_menu_open() then close_menu() else open_menu() end
  end
end)

-- click outside the orb/menu closes the menu
document:addEventListener("mousedown", function(_, ev)
  if not is_menu_open() then return end
  local t = ev.target
  if not t.closest then return end
  local inMenu = t:closest("#rail")
  local inOrb = t:closest("#orb")
  if inMenu == js.null and inOrb == js.null then close_menu() end
end)

-- Alt+1: hide/show the orb itself. Open widgets are never touched.
document:addEventListener("keydown", function(_, ev)
  if ev.altKey and (tostring(ev.key) == "1" or tostring(ev.code) == "Digit1") then
    ev:preventDefault()
    if orb.classList:contains("d-none") then
      orb.classList:remove("d-none")
    else
      orb.classList:add("d-none")
      close_menu()
    end
  end
end)

-- boot ----------------------------------------------------------------------


-- called when the language changes so every translated bit of chrome refreshes
codex.refresh_ui = function()
  render_rail()
  sync_rail()
end

codex.settings.apply()
W.onchange = sync_rail
render_rail()
orb_load()

-- The version / launcher hint now lives in the Settings panel footer (shown
-- in desktop-window mode only, not in the game overlay) — see settings.lua.
-- The floating corner label is retired.

-- Restore the whole workspace: reopen every plugin that was open last session
-- (each at its remembered position/size). Falls back to the default view.
local reopened = false
local openlist = ui.store_get("ec.openwidgets")
if openlist and openlist ~= "" then
  for id in openlist:gmatch("[^,]+") do
    if codex.registry.is_visible(id) then W.open_plugin(id); reopened = true end
  end
end
if not reopened then
  local start = ui.store_get("ec.default_view") or "campaign-guide"
  if codex.registry.is_visible(start) then W.open_plugin(start) else W.open_plugin("campaign-guide") end
end
sync_rail()

-- Tray → renderer: the system-tray menu can open Settings (optionally to a
-- specific group). Mode switches are handled entirely in the shell (recreate).
do
  local sh = js.global.exileShell
  if sh ~= nil and sh ~= js.null and sh.onTray ~= nil then
    sh:onTray(function(_, msg)
      if msg == nil or msg == js.null then return end
      if tostring(msg.cmd) == "settings" then
        local g = msg.group
        local group = (g ~= nil and g ~= js.null and tostring(g) ~= "") and tostring(g) or nil
        if codex.settings and codex.settings.open then codex.settings.open(group) end
      end
    end)
  end
end

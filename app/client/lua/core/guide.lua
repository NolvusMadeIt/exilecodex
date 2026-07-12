-- codex.guide — the guide engine, Zygor-converted: steps are bundles of GOALS
-- (talk/kill/accept/turnin/collect/goto/note...), each with its own icon,
-- click-to-complete state, counted progress with a red→green backing bar, and
-- auto-advance when every mandatory goal is done.
--
-- Guides are standalone, catalog-registered objects (no more view-modes): the
-- viewer shows a tab bar with a ＋ picker, the current step plus the next two
-- dimmed, and a green progress bar. The picker lists default guides + your
-- custom guides and can create one inline. Image-linked [words] dock a
-- zoomable panel to the guide's roomier side.
local js = require "js"
local window = js.global
local document = window.document
local ui = codex.ui

codex.guide = { guides = {}, tabs = {}, active = nil, catalog = {} }
local M = codex.guide

-- three viewer regions so the picker (and its inline forge) survive body
-- re-renders: the tab bar and the step body are rebuilt; the picker is not.
local viewer_el, gbar_el, gbody_el, tstrip_el, gfoot_el, gdock_el = nil, nil, nil, nil, nil, nil
local guides_menu_open = false
local history_open = false

-- Zygor's action→icon vocabulary (their actionicons table), our own icons.
local ACTION_ICONS = {
  accept = "bi-exclamation-circle-fill",
  turnin = "bi-question-circle-fill",
  kill = "bi-crosshair",
  from = "bi-crosshair",
  get = "bi-bag-fill",
  collect = "bi-bag-fill",
  buy = "bi-cart-fill",
  use = "bi-hand-index-thumb-fill",
  home = "bi-house-fill",
  ["goto"] = "bi-compass-fill",
  talk = "bi-chat-fill",
  goal = "bi-record-circle",
}
local DEFAULT_ICON = "bi-record-circle"
local DONE_ICON = "bi-check-circle-fill"

-- actions that get the red "objective" backing bar while incomplete
local TRACKED = {
  accept = true, turnin = true, kill = true, from = true,
  get = true, collect = true, buy = true, use = true, goal = true,
}

-- ---------------------------------------------------------------- DSL

local Guide = {}
Guide.__index = Guide

function M.new(opts)
  local g = setmetatable({
    id = opts.id,
    title = opts.title,
    steps = {},
    current = 1,
    done = {},
  }, Guide)
  M.guides[g.id] = g
  return g
end

function Guide:step(s)
  if not s.goals then
    local goals = {}
    if s.text then goals[#goals + 1] = { action = s.action or "goal", text = s.text, count = s.count } end
    if s.tip then goals[#goals + 1] = { action = "note", text = s.tip } end
    s.goals = goals
  end
  table.insert(self.steps, s)
  return self
end

-- ---------------------------------------------------------------- catalog

-- A catalog entry: { id, title, group, patch, build = function() -> Guide }.
-- build() is lazy — called the first time a guide is opened.
function M.register_catalog(entry)
  M.catalog[#M.catalog + 1] = entry
end

-- Build (or fetch) a guide by id: an already-built guide, a catalog entry, or
-- a saved custom guide (id "custom-<n>" indexes ec.myguides). nil if unknown.
local function ensure_guide(id)
  if M.guides[id] then return M.guides[id] end
  for _, e in ipairs(M.catalog) do
    if e.id == id then return e.build() end
  end
  local idx = tostring(id):match("^custom%-(%d+)$")
  if idx then
    local list = codex.json.decode(ui.store_get("ec.myguides") or "[]") or {}
    local saved = list[tonumber(idx)]
    if saved then
      local g = M.new{ id = id, title = saved.title or "Custom guide" }
      for _, s in ipairs(saved.steps or {}) do g:step(s) end
      return g
    end
  end
  return nil
end

-- ---------------------------------------------------------------- helpers

local function esc(s)
  return (tostring(s):gsub("&", "&amp;"):gsub("<", "&lt;"):gsub(">", "&gt;"))
end

-- Guide prose is translatable: strings route through codex.T so a later data
-- drop can localize them. English strings are their own keys (identity).
local function tr(s)
  return codex.T(s)
end

local function rich_text(text, images)
  local txt = esc(tr(text))
  txt = txt:gsub("%[(.-)%]", function(name)
    local src = images and images[name]
    if src then
      return '<span class="ec-imglink" data-img="' .. src .. '" data-name="' .. name .. '">' .. name .. '</span>'
    end
    return name
  end)
  return txt
end

local function save_pos(g)
  ui.store_set("ec.step." .. g.id, g.current)
end

local function load_pos(g)
  local n = tonumber(ui.store_get("ec.step." .. g.id) or "")
  if n and n >= 1 and n <= #g.steps then g.current = n end
  g.done = codex.json.decode(ui.store_get("ec.goals." .. g.id) or "") or {}
end

local function goal_state(g, si, gi)
  local s = g.done[tostring(si)]
  if s then return s[tostring(gi)] end
  return nil
end

local function set_goal_state(g, si, gi, v)
  local sk = tostring(si)
  g.done[sk] = g.done[sk] or {}
  g.done[sk][tostring(gi)] = v
  ui.store_set("ec.goals." .. g.id, codex.json.encode(g.done))
end

local function is_done(goal, v)
  if goal.count then return (tonumber(v) or 0) >= goal.count end
  return v == true
end

local function step_complete(g, si, step)
  for gi, goal in ipairs(step.goals) do
    if goal.action ~= "note" and not goal.optional then
      if not is_done(goal, goal_state(g, si, gi)) then return false end
    end
  end
  return true
end

-- Guides are standalone now, so every step is visible; kept as a list of
-- { i, s } so the render/advance code can stay index-stable.
local function visible_items(g)
  local items = {}
  for i, s in ipairs(g.steps) do
    items[#items + 1] = { i = i, s = s }
  end
  return items
end

-- ---------------------------------------------------------------- run timer

local function timer_elapsed()
  local acc = tonumber(ui.store_get("ec.timer.acc") or "0") or 0
  if ui.store_get("ec.timer.run") == "1" then
    local ts = tonumber(ui.store_get("ec.timer.ts") or "0") or 0
    acc = acc + math.max(0, os.time() - ts)
  end
  return acc
end

local function timer_fmt(s)
  return string.format("%d:%02d:%02d", math.floor(s / 3600), math.floor((s % 3600) / 60), s % 60)
end

function M.timer_start()
  ui.store_set("ec.timer.ts", os.time())
  ui.store_set("ec.timer.run", "1")
end

function M.timer_pause()
  ui.store_set("ec.timer.acc", timer_elapsed())
  ui.store_set("ec.timer.run", "0")
end

function M.timer_reset()
  ui.store_set("ec.timer.acc", "0")
  ui.store_set("ec.timer.run", "0")
end

-- The run timer only counts while the game is actually running: auto-start (and
-- manual start) require Client.txt detection to be live. Never ticks on a dead log.
local function detection_live()
  return codex.detect ~= nil and codex.detect.active == true
end

function M.maybe_autostart_timer()
  if ui.store_get("ec.timer.auto") == "0" then return end
  if not detection_live() then return end
  if not M.active then return end
  if ui.store_get("ec.timer.run") == "1" then return end
  if (tonumber(ui.store_get("ec.timer.acc") or "0") or 0) ~= 0 then return end
  M.timer_start()
  if viewer_el then M.render() end
end

window:setInterval(function()
  local el = ui.byId("zg-timer-val")
  if el and ui.store_get("ec.timer.run") == "1" then
    el.innerHTML = timer_fmt(timer_elapsed())
  end
end, 1000)

-- ---------------------------------------------------------------- auto-follow

local function znorm(z)
  return z and (tostring(z):lower():gsub("^%s+", ""):gsub("%s+$", "")) or ""
end

-- Client.txt zone detection: when the character enters a zone, the guide
-- follows — jump to that zone's step and (if auto-complete is on) tick its
-- traversal goals. Driven by codex.detect on every "You have entered" line.
function M.on_zone(area)
  if not area or area == "" then return end
  if ui.store_get("ec.det.zone") == "0" then return end
  local g = M.active and M.guides[M.active]
  if not g then return end
  local want = znorm(area)

  -- first matching step at/after the current position, else the first anywhere
  local target = nil
  for i = g.current, #g.steps do
    if znorm(g.steps[i].zone) == want then target = i break end
  end
  if not target then
    for i = 1, #g.steps do
      if znorm(g.steps[i].zone) == want then target = i break end
    end
  end
  if not target then return end

  if target ~= g.current then
    g.current = target
    save_pos(g)
  end
  -- auto-complete traversal goals ("goto"/enter the zone) for the entered step
  if ui.store_get("ec.det.advance") ~= "0" then
    for gi, goal in ipairs(g.steps[target].goals) do
      if goal.action == "goto" and not goal.count then
        set_goal_state(g, target, gi, true)
      end
    end
  end
  M.render()
end

-- Client.txt level-up: tick any "reach level N" goal on the current step whose
-- target level has been met (auto-complete only).
function M.on_level(level)
  if not level or ui.store_get("ec.det.advance") == "0" then return end
  local g = M.active and M.guides[M.active]
  if not g then return end
  local step = g.steps[g.current]
  if not step then return end
  for gi, goal in ipairs(step.goals) do
    if goal.reach_level and level >= goal.reach_level then
      set_goal_state(g, g.current, gi, true)
    end
  end
  M.render()
end

-- ---------------------------------------------------------------- tooltip

local function tooltip_show(src, name)
  local t = ui.byId("ec-tooltip")
  if not t then return end
  t.innerHTML = '<img src="' .. src .. '" alt=""><div class="ec-tip-name">' .. esc(name) .. '</div>'
  t.classList:remove("d-none")
end

local function tooltip_move(x, y)
  local t = ui.byId("ec-tooltip")
  if not t then return end
  -- #ec-tooltip is position:fixed inside <body>, which carries the global font
  -- `zoom` (ec.fontscale). A fixed element's px offsets are in the zoomed space,
  -- so a raw clientX would land at clientX*zoom — far from the cursor. Convert
  -- the cursor's viewport coords into body space by dividing by the zoom.
  local z = tonumber(tostring(document.body.style.zoom)) or 1
  if z == 0 or z ~= z then z = 1 end
  local cx, cy = x / z, y / z
  local vw, vh = window.innerWidth / z, window.innerHeight / z
  local tx, ty = cx + 18, cy + 14
  if tx + 355 > vw then tx = cx - 355 end
  if ty + 300 > vh then ty = vh - 300 end
  if tx < 4 then tx = 4 end
  if ty < 4 then ty = 4 end
  t.style.left = math.floor(tx) .. "px"
  t.style.top = math.floor(ty) .. "px"
end

local function tooltip_hide()
  local t = ui.byId("ec-tooltip")
  if t then t.classList:add("d-none") end
end

-- ---------------------------------------------------------------- pin widget
-- The image panel docks to the guide's roomier side, re-anchors when the guide
-- moves, and is zoomable (wheel + buttons) and pannable (drag when zoomed).

local GUIDE_WIDGET = "campaign-guide"

-- place the pin flush to the guide's left or right edge, whichever side of the
-- viewport centre the guide sits on (so it opens toward the roomier side).
local function dock_pin(pinFr, guideFr)
  if pinFr == nil or pinFr == js.null then return end
  if guideFr == nil or guideFr == js.null then return end
  local vw = window.innerWidth
  local gx = guideFr.offsetLeft
  local gw = guideFr.offsetWidth
  local pw = pinFr.offsetWidth
  local gap = 6
  local left
  if (gx + gw / 2) > vw / 2 then
    left = gx - pw - gap            -- guide on the right → dock left
  else
    left = gx + gw + gap            -- guide on the left → dock right
  end
  left = math.max(4, math.min(left, vw - pw - 4))
  pinFr.style.left = math.floor(left) .. "px"
  pinFr.style.top = math.floor(math.max(4, guideFr.offsetTop)) .. "px"
end

function M.pin(src, name)
  local W = codex.widgets
  W.close("image-pin")

  local scale, tx, ty, deg = 1, 0, 0, 0
  local dragging, dsx, dsy = false, 0, 0

  local function apply()
    local img = ui.byId("ec-pin-img")
    if not img then return end
    local r = (deg % 180 ~= 0) and " rotate(" .. deg .. "deg)" or (deg ~= 0 and " rotate(" .. deg .. "deg)" or "")
    img.style.transform = "translate(" .. tx .. "px," .. ty .. "px)" .. r .. " scale(" .. scale .. ")"
    local pct = ui.byId("ec-pin-zoom")
    if pct then pct.innerHTML = math.floor(scale * 100 + 0.5) .. "%" end
    local body = ui.byId("ec-pin-body")
    if body then body.style.cursor = (scale > 1) and "grab" or "default" end
  end

  local function zoom_by(delta)
    scale = math.max(0.5, math.min(5, scale + delta))
    if scale <= 1 then tx, ty = 0, 0 end
    apply()
  end

  W.spawn{
    id = "image-pin",
    title = name,
    icon = "bi-image",
    width = 330,
    on_close = function() W.clear_anchor("image-pin") end,
    mount = function(body)
      body.innerHTML = table.concat({
        '<div id="ec-pin-body" class="ec-pinbody"><img id="ec-pin-img" src="', src, '" alt=""></div>',
        '<div class="ec-pinbar">',
        '<button id="ec-pin-zout" class="btn btn-ec-ghost btn-sm py-0 px-2" title="Zoom out"><i class="bi bi-dash-lg"></i></button>',
        '<span id="ec-pin-zoom" class="ec-muted" style="font-size:11px;min-width:34px;text-align:center;cursor:pointer" title="', esc(tr("Reset view")), '">100%</span>',
        '<button id="ec-pin-zin" class="btn btn-ec-ghost btn-sm py-0 px-2" title="Zoom in"><i class="bi bi-plus-lg"></i></button>',
        '<span style="width:1px;height:16px;background:var(--ec-border-soft);margin:0 2px"></span>',
        '<button id="ec-pin-ccw" class="btn btn-ec-ghost btn-sm py-0 px-2" title="Rotate left"><i class="bi bi-arrow-counterclockwise"></i></button>',
        '<button id="ec-pin-cw" class="btn btn-ec-ghost btn-sm py-0 px-2" title="Rotate right"><i class="bi bi-arrow-clockwise"></i></button>',
        '<span class="spacer"></span>',
        '<span class="ec-muted" style="font-size:11px">pinned</span>',
        '</div>',
      })
      local pbody = body:querySelector("#ec-pin-body")
      ui.on(body:querySelector("#ec-pin-zin"), "click", function() zoom_by(0.25) end)
      ui.on(body:querySelector("#ec-pin-zout"), "click", function() zoom_by(-0.25) end)
      ui.on(body:querySelector("#ec-pin-zoom"), "click", function() scale, tx, ty = 1, 0, 0 apply() end)
      ui.on(body:querySelector("#ec-pin-cw"), "click", function() deg = (deg + 90) % 360 apply() end)
      ui.on(body:querySelector("#ec-pin-ccw"), "click", function() deg = (deg - 90) % 360 apply() end)

      pbody:addEventListener("wheel", function(_, ev)
        ev:preventDefault()
        zoom_by(ev.deltaY < 0 and 0.2 or -0.2)
      end)
      pbody:addEventListener("mousedown", function(_, ev)
        if scale <= 1 then return end
        dragging = true
        dsx, dsy = ev.clientX - tx, ev.clientY - ty
        pbody.style.cursor = "grabbing"
        ev:preventDefault()
        ev:stopPropagation()
      end)
      document:addEventListener("mousemove", function(_, ev)
        if not dragging then return end
        tx, ty = ev.clientX - dsx, ev.clientY - dsy
        apply()
      end)
      document:addEventListener("mouseup", function()
        if dragging then dragging = false apply() end
      end)
      apply()
    end,
  }

  -- dock to the guide now, and re-dock whenever the guide moves/resizes
  local pinFr = codex.widgets.open["image-pin"]
  local guideFr = codex.widgets.open[GUIDE_WIDGET]
  dock_pin(pinFr, guideFr)
  W.set_anchor("image-pin", GUIDE_WIDGET, function(child, parent) dock_pin(child, parent) end)
end

-- ---------------------------------------------------------------- rendering

local function wire_imglinks(root)
  ui.each(root, ".ec-imglink", function(link)
    local src = ui.attr(link, "data-img")
    local name = ui.attr(link, "data-name") or ""
    link:addEventListener("mouseenter", function(_, ev)
      tooltip_show(src, name)
      tooltip_move(ev.clientX, ev.clientY)
    end)
    link:addEventListener("mousemove", function(_, ev)
      tooltip_move(ev.clientX, ev.clientY)
    end)
    link:addEventListener("mouseleave", function() tooltip_hide() end)
    link:addEventListener("click", function(_, ev)
      ev:stopPropagation()
      tooltip_hide()
      M.pin(src, name)
    end)
  end)
end

local function goal_html(g, si, gi, goal, step, live)
  if goal.action == "note" then
    if ui.store_get("ec.guide.show_notes") == "0" then return "" end
    return '<div class="zgoal-note">' .. rich_text(goal.text, step.images) .. '</div>'
  end

  local v = goal_state(g, si, gi)
  local done = is_done(goal, v)
  local icon = (done and DONE_ICON or (ACTION_ICONS[goal.action] or DEFAULT_ICON))
    .. " act-" .. (goal.action or "goal")
  local cls = done and "zgoal done" or "zgoal"

  local bg = ""
  if not done and TRACKED[goal.action] then
    local pct = 0
    if goal.count and goal.count > 0 then pct = math.floor((tonumber(v) or 0) / goal.count * 100) end
    bg = ' style="background:linear-gradient(to right, rgba(0,132,22,0.55) ' .. pct
      .. '%, rgba(118,14,6,0.5) ' .. pct .. '%)"'
  end

  local count = ""
  if goal.count then
    count = ' <span class="zgoal-count">(' .. (tonumber(v) or 0) .. '/' .. goal.count .. ')</span>'
  end
  local opt = goal.optional and '<span class="ec-optional-badge">opt</span>' or ""

  local wire = live and (' data-si="' .. si .. '" data-gi="' .. gi .. '"') or ""
  return table.concat({
    '<div class="', cls, '"', bg, wire, '>',
    '<i class="bi ', icon, ' zgoal-ico"></i>',
    '<span class="zgoal-text">', rich_text(goal.text, step.images), count, opt, '</span>',
    '</div>',
  })
end

local function step_html(g, it, live)
  local parts = { '<div class="zg-step', live and '' or ' dim', '">' }
  if it.s.zone then
    local actpart = it.s.act and ('<span style="color:var(--ec-gold-dim)">' .. esc(tr(it.s.act)) .. '</span> &middot; ') or ''
    parts[#parts + 1] = '<div style="font-size:10.5px;color:var(--ec-text-soft);padding:0 7px 3px;letter-spacing:0.04em;text-transform:uppercase">'
      .. actpart .. esc(tr(it.s.zone)) .. (it.s.optional and ' <span class="ec-optional-badge">optional</span>' or '') .. '</div>'
  end
  for gi, goal in ipairs(it.s.goals) do
    parts[#parts + 1] = goal_html(g, it.i, gi, goal, it.s, live)
  end
  if it.s.reward and ui.store_get("ec.guide.show_rewards") ~= "0" then
    parts[#parts + 1] = '<div class="zg-reward"><i class="bi bi-gift"></i> ' .. esc(tr(it.s.reward)) .. '</div>'
  end
  -- the current step surfaces its zone map(s) as a clickable thumbnail
  if live and it.s.images then
    local thumbs = {}
    for name, src in pairs(it.s.images) do
      thumbs[#thumbs + 1] = '<div class="zg-map-thumb" data-map="' .. esc(src) .. '" data-name="' .. esc(name) .. '">'
        .. '<img src="' .. esc(src) .. '" alt=""><span class="cap">' .. esc(name) .. '</span>'
        .. '<i class="zoom bi bi-arrows-fullscreen"></i></div>'
    end
    if #thumbs > 0 then
      parts[#parts + 1] = '<div class="zg-map">' .. table.concat(thumbs) .. '</div>'
    end
  end
  parts[#parts + 1] = '</div>'
  return table.concat(parts)
end

-- ---------------------------------------------------------------- tool strip

local function my_guides_list()
  return codex.json.decode(ui.store_get("ec.myguides") or "[]") or {}
end

local function open_forge(load)
  codex.widgets.open_plugin("guide-forge")
  local w = codex.widgets.open["guide-forge"]
  if w and codex.forge then
    codex.forge.mount(w:querySelector(".ec-widget-body"), { load = load })
  end
end

local function close_guides_menu()
  guides_menu_open = false
  local d = tstrip_el and tstrip_el:querySelector("#ec-guides-drop")
  if d and d ~= js.null then d.classList:add("d-none") end
end

local function build_guides_menu()
  local drop = tstrip_el and tstrip_el:querySelector("#ec-guides-drop")
  if not drop or drop == js.null then return end
  local parts = { '<div class="ec-tsdrop-sec">' .. esc(tr("Default guides")) .. '</div>' }
  for _, e in ipairs(M.catalog) do
    if e.group ~= "Custom" and not e.hidden then
      parts[#parts + 1] = '<div class="ec-tsdrop-item" data-open="' .. e.id .. '">'
        .. '<img class="lead" src="../../media/icons/presets/campaign.webp" alt="">' .. esc(tr(e.title))
        .. (e.patch and ('<span class="badge2">v' .. esc(e.patch) .. '</span>') or '') .. '</div>'
    end
  end
  local mine = my_guides_list()
  parts[#parts + 1] = '<div class="ec-tsdrop-sec">' .. esc(tr("My guides")) .. '</div>'
  if #mine == 0 then
    parts[#parts + 1] = '<div class="ec-tsdrop-item muted">&mdash;</div>'
  end
  for i, gd in ipairs(mine) do
    parts[#parts + 1] = '<div class="ec-tsdrop-item custom" data-opencustom="' .. i .. '">'
      .. '<i class="bi bi-journal-bookmark-fill lead"></i>' .. esc(gd.title or "Untitled") .. '</div>'
  end
  parts[#parts + 1] = '<div class="ec-tsdrop-divider"></div>'
  parts[#parts + 1] = '<div class="ec-tsdrop-item create" data-create="1"><i class="bi bi-plus-lg lead"></i>' .. esc(tr("Create a guide")) .. '</div>'
  parts[#parts + 1] = '<div class="ec-tsdrop-item create" data-manage="1"><i class="bi bi-sliders2 lead"></i>' .. esc(tr("Manage my guides")) .. '</div>'
  drop.innerHTML = table.concat(parts)

  ui.each(drop, "[data-open]", function(el)
    ui.on(el, "click", function() M.open(ui.attr(el, "data-open")) close_guides_menu() end)
  end)
  ui.each(drop, "[data-opencustom]", function(el)
    ui.on(el, "click", function() M.open("custom-" .. ui.attr(el, "data-opencustom")) close_guides_menu() end)
  end)
  ui.each(drop, "[data-create]", function(el)
    ui.on(el, "click", function() open_forge(nil) close_guides_menu() end)
  end)
  ui.each(drop, "[data-manage]", function(el)
    ui.on(el, "click", function() open_forge(nil) close_guides_menu() end)
  end)
end

function M.open_guides_menu()
  guides_menu_open = true
  build_guides_menu()
  local d = tstrip_el and tstrip_el:querySelector("#ec-guides-drop")
  if d and d ~= js.null then d.classList:remove("d-none") end
end

local function render_toolstrip()
  if not tstrip_el then return end
  tstrip_el.innerHTML = table.concat({
    '<button class="ec-tsbtn" id="ec-guides-btn"><i class="bi bi-signpost-split"></i> ',
    esc(tr("Guides")), ' <i class="bi bi-caret-down-fill"></i></button>',
    '<button class="ec-tsbtn accent" id="ec-create-btn"><i class="bi bi-plus-lg"></i> ',
    esc(tr("Create a guide")), '</button>',
    '<button class="ec-tsbtn" id="ec-history-btn"><i class="bi bi-clock-history"></i> ',
    esc(tr("History")), '</button>',
    '<div id="ec-guides-drop" class="ec-tsdrop d-none"></div>',
    '<div id="ec-history-drop" class="ec-tsdrop ec-tsdrop-wide d-none"></div>',
  })
  ui.on(tstrip_el:querySelector("#ec-guides-btn"), "click", function(ev)
    ev:stopPropagation()
    if guides_menu_open then close_guides_menu() else M.open_guides_menu() end
  end)
  ui.on(tstrip_el:querySelector("#ec-create-btn"), "click", function() open_forge(nil) end)
  -- Run history lives here (out of the tracker widget). The tracker owns the view.
  local hbtn = tstrip_el:querySelector("#ec-history-btn")
  if hbtn ~= js.null then
    ui.on(hbtn, "click", function(ev)
      ev:stopPropagation()
      local drop = tstrip_el:querySelector("#ec-history-drop")
      if drop == js.null then return end
      close_guides_menu()
      if drop.classList:contains("d-none") then
        if codex.tracker and codex.tracker.render_history then codex.tracker.render_history(drop) end
        drop.classList:remove("d-none")
        history_open = true
      else
        drop.classList:add("d-none"); history_open = false
      end
    end)
  end
end

-- ---------------------------------------------------------------- tabs

local function save_tabs()
  ui.store_set("ec.guide.tabs", table.concat(M.tabs, ","))
  ui.store_set("ec.guide.active", M.active or "")
end

function M.close_tab(id)
  for k, t in ipairs(M.tabs) do
    if t == id then table.remove(M.tabs, k) break end
  end
  if M.active == id then M.active = M.tabs[#M.tabs] end
  save_tabs()
  M.render()
end

local function render_tabs()
  if not gbar_el then return end
  local parts = { '<div class="ec-tabs">' }
  for _, id in ipairs(M.tabs) do
    local t = M.guides[id]
    local title = t and t.title or id
    local cls = (id == M.active) and "ec-tab active" or "ec-tab"
    parts[#parts + 1] = '<div class="' .. cls .. '" data-tab="' .. id .. '">'
      .. esc(tr(title))
      .. '<i class="bi bi-x ec-tab-x" data-closetab="' .. id .. '" title="' .. esc(tr("Close guide")) .. '"></i></div>'
  end
  parts[#parts + 1] = '</div>'
  gbar_el.innerHTML = table.concat(parts)

  ui.each(gbar_el, ".ec-tab[data-tab]", function(tab)
    ui.on(tab, "click", function()
      M.active = ui.attr(tab, "data-tab")
      save_tabs()
      M.render()
    end)
  end)
  ui.each(gbar_el, ".ec-tab-x", function(x)
    ui.on(x, "click", function(ev)
      ev:stopPropagation()
      M.close_tab(ui.attr(x, "data-closetab"))
    end)
  end)
end

-- Guide selection + custom-guide creation now live in Settings → Guides
-- (and Guide Forge opens as its own popup window). The tab bar keeps only the
-- open guides plus a shortcut button that jumps to that Settings group.

-- ---------------------------------------------------------------- render body

local function advance(g, items, pos)
  if pos < #items then
    g.current = items[pos + 1].i
    save_pos(g)
    M.render()
  end
end

function M.render()
  render_tabs()
  if not gbody_el then return end
  local g = M.active and M.guides[M.active] or nil
  if not g then
    gbody_el.innerHTML = '<div class="p-4 text-center" style="font-size:12px;color:var(--ec-text-soft)">'
      .. esc(tr("No guide open")) .. '<br><button id="ec-pick-empty" class="btn btn-ec btn-sm mt-2">'
      .. esc(tr("Pick a guide")) .. '</button></div>'
    local pe = gbody_el:querySelector("#ec-pick-empty")
    if pe ~= js.null then ui.on(pe, "click", function() M.open_guides_menu() end) end
    return
  end

  local items = visible_items(g)
  if #items == 0 then
    gbody_el.innerHTML = '<div class="p-4" style="font-size:12px;color:var(--ec-text-soft)">This guide has no steps yet.</div>'
    return
  end

  local pos = nil
  for k, it in ipairs(items) do
    if it.i == g.current then pos = k break end
  end
  pos = pos or #items

  local parts = {}

  -- right side of the step bar: run timer (when enabled) or the goal hint
  local right = '<span style="font-size:10.5px;color:var(--ec-text-soft)">' .. esc(tr("click a goal to complete it")) .. '</span>'
  -- the timer only counts with Client.txt detection, so its controls only
  -- appear in the desktop shell — never a dead play button in the browser
  if ui.store_get("ec.timer.show") ~= "0" and codex.detect and codex.detect.available then
    local running = ui.store_get("ec.timer.run") == "1"
    right = table.concat({
      '<span class="zg-timer"><i class="bi bi-stopwatch"></i>',
      '<span id="zg-timer-val">', timer_fmt(timer_elapsed()), '</span>',
      '<i id="zg-timer-toggle" class="bi ', running and "bi-pause-fill" or "bi-play-fill", '" title="Start / pause"></i>',
      '<i id="zg-timer-reset" class="bi bi-arrow-counterclockwise" title="Reset"></i>',
      '</span>',
    })
  end

  parts[#parts + 1] = table.concat({
    '<div class="ec-stepnav">',
    '<button id="ec-prev" class="btn btn-sm py-0 px-2" style="border:1px solid var(--ec-border);background:transparent"><i class="bi bi-arrow-left"></i></button>',
    '<span class="zg-stepnum">', pos, '</span>',
    '<span style="font-size:11px;color:var(--ec-text-soft)">', esc(tr("of")), ' ', #items, '</span>',
    '<button id="ec-next" class="btn btn-sm py-0 px-2" style="border:1px solid var(--ec-border);background:transparent"><i class="bi bi-arrow-right"></i></button>',
    '<span class="flex-grow-1"></span>',
    right,
    '</div>',
  })

  local nshow = tonumber(ui.store_get("ec.guide.next_steps") or "2") or 2
  parts[#parts + 1] = step_html(g, items[pos], true)
  for k = pos + 1, math.min(pos + nshow, #items) do
    parts[#parts + 1] = step_html(g, items[k], false)
  end

  gbody_el.innerHTML = table.concat(parts)

  -- The guide title + progress live in a pinned footer (above the tabs), not in
  -- the scrolling steps region.
  local pct = math.floor((pos - 1) / math.max(#items, 1) * 100 + 0.5)
  if gfoot_el then
    gfoot_el.innerHTML = table.concat({
      '<div class="zg-foot"><span>' .. esc(tr(g.title)) .. '</span><span style="color:var(--ec-green)">' .. pct .. '%</span></div>',
      '<div class="zg-progress"><div style="width:' .. pct .. '%"></div></div>',
    })
  end

  -- wiring
  local prev = gbody_el:querySelector("#ec-prev")
  local nxt = gbody_el:querySelector("#ec-next")
  if prev ~= js.null then
    ui.on(prev, "click", function()
      if pos > 1 then
        g.current = items[pos - 1].i
        save_pos(g)
        M.render()
      end
    end)
  end
  if nxt ~= js.null then
    ui.on(nxt, "click", function() advance(g, items, pos) end)
  end

  local tt = gbody_el:querySelector("#zg-timer-toggle")
  if tt ~= js.null then
    ui.on(tt, "click", function()
      if ui.store_get("ec.timer.run") == "1" then
        M.timer_pause()
      elseif detection_live() then
        M.timer_start()
      end
      -- with no Client.txt detected, start is a no-op (timer waits for the game)
      M.render()
    end)
  end
  local trs = gbody_el:querySelector("#zg-timer-reset")
  if trs ~= js.null then
    ui.on(trs, "click", function() M.timer_reset() M.render() end)
  end

  ui.each(gbody_el, ".zgoal[data-si]", function(line)
    ui.on(line, "click", function()
      local si = tonumber(ui.attr(line, "data-si"))
      local gi = tonumber(ui.attr(line, "data-gi"))
      local goal = g.steps[si] and g.steps[si].goals[gi]
      if not goal then return end
      local v = goal_state(g, si, gi)
      if goal.count then
        local n = (tonumber(v) or 0) + 1
        if n > goal.count then n = 0 end
        set_goal_state(g, si, gi, n > 0 and n or nil)
      else
        set_goal_state(g, si, gi, (v ~= true) and true or nil)
      end
      M.render()
      if ui.store_get("ec.guide.autoadvance") ~= "0"
        and si == g.current and step_complete(g, si, g.steps[si]) then
        window:setTimeout(function()
          if M.active == g.id and g.current == si and step_complete(g, si, g.steps[si]) then
            advance(g, visible_items(g), pos)
          end
        end, 700)
      end
    end)
  end)

  wire_imglinks(gbody_el)

  ui.each(gbody_el, ".zg-map-thumb[data-map]", function(el)
    ui.on(el, "click", function()
      M.pin(ui.attr(el, "data-map"), ui.attr(el, "data-name"))
    end)
  end)
end

-- ---------------------------------------------------------------- window prefs

-- Apply the "Guide window" settings (width / font size / opacity / height) to
-- the open guides window. Called on mount and whenever those settings change.
function M.apply_window()
  local fr = codex.widgets.open[GUIDE_WIDGET]
  if fr == nil or fr == js.null then return end

  -- Width/height are owned by the widget engine now (grip resize is saved +
  -- restored per widget), so we no longer override the width here — otherwise a
  -- size the player dragged would be reset on every mount. The "Width" slider
  -- drives M.set_width() which resizes the live widget + persists it.

  if viewer_el then
    local fs = tonumber(ui.store_get("ec.guide.fontscale") or "1") or 1
    viewer_el.style.zoom = (fs == 1) and "" or tostring(fs)
  end

  if ui.store_get("ec.guide.opacity_on") == "1" then
    local op = tonumber(ui.store_get("ec.guide.opacity") or "1") or 1
    fr.style.opacity = tostring(op)
  else
    fr.style.opacity = ""
  end

  if gbody_el then
    -- The steps region ALWAYS flex-fills the widget body and scrolls internally,
    -- so the progress footer + tab bar stay pinned at the bottom no matter how
    -- tall the widget is dragged. (A viewport max-height cap here used to strand
    -- them mid-way once the widget grew past ~52vh.)
    gbody_el.style.maxHeight = "none"
    gbody_el.style.overflowY = "auto"
  end

  -- A wider width or bigger font can push the window past an edge — pull it back.
  if codex.widgets.clamp_onscreen then codex.widgets.clamp_onscreen(fr) end
  codex.widgets.reposition_anchored(GUIDE_WIDGET)
end

-- ---------------------------------------------------------------- mount + open

function M.mount(host)
  -- Guide tabs (the "Speedrun" switcher) sit at the BOTTOM, under the steps —
  -- the body height-caps and scrolls internally so the tab bar stays a footer.
  host.innerHTML = table.concat({
    '<div id="ec-viewer" class="ec-viewer">',
    '<div id="ec-tstrip" class="ec-toolstrip"></div>',
    '<div id="ec-gbody"></div>',
    '<div id="ec-tracker-dock" class="ec-tracker-dock d-none"></div>',
    '<div id="ec-gfoot" class="ec-gfoot"></div>',
    '<div id="ec-gbar" class="ec-gbar ec-gbar-foot"></div>',
    '</div>',
  })
  viewer_el = host:querySelector("#ec-viewer")
  tstrip_el = host:querySelector("#ec-tstrip")
  gbar_el = host:querySelector("#ec-gbar")
  gbody_el = host:querySelector("#ec-gbody")
  gfoot_el = host:querySelector("#ec-gfoot")
  gdock_el = host:querySelector("#ec-tracker-dock")
  render_toolstrip()
  M.render()
  M.refresh_dock()
end

-- Show / hide the docked Run Tracker (above the Speedrun footer). Driven by the
-- tracker's attach/detach and re-run whenever the guide (re)mounts.
function M.refresh_dock()
  if not gdock_el or gdock_el == js.null then return end
  local docked = (ui.store_get("ec.tracker.dock") == "1") and codex.tracker ~= nil
  if docked then
    gdock_el.classList:remove("d-none")
    if codex.tracker.mount_into then codex.tracker.mount_into(gdock_el) end
  else
    gdock_el.classList:add("d-none")
    gdock_el.innerHTML = ""
    if codex.tracker and codex.tracker.unmount then codex.tracker.unmount() end
  end
end

-- Width slider (Settings → Guide window) resizes the live widget and persists it
-- through the widget engine, so grip-resizes and the slider share one source.
function M.set_width(px)
  local fr = codex.widgets.open[GUIDE_WIDGET]
  if fr == nil or fr == js.null then return end
  local w = math.max(240, math.floor(tonumber(px) or 300))
  fr.style.width = w .. "px"
  ui.store_set("ec.guide.width", tostring(w))
  if codex.widgets.clamp_onscreen then codex.widgets.clamp_onscreen(fr) end
  if codex.widgets.save then codex.widgets.save(GUIDE_WIDGET) end
end

function M.open(id)
  local g = ensure_guide(id)
  if not g then return end
  local found = false
  for _, t in ipairs(M.tabs) do
    if t == id then found = true break end
  end
  if not found then table.insert(M.tabs, id) end
  M.active = id
  load_pos(g)
  save_tabs()
  M.maybe_autostart_timer()
  M.render()
end

function M.open_custom(i)
  M.open("custom-" .. i)
end

-- Restore the tabs open at last close (or open default_id fresh). Called by the
-- campaign plugin when the guides window mounts.
function M.restore_tabs(default_id)
  local raw = ui.store_get("ec.guide.tabs")
  local ids = {}
  if raw and raw ~= "" then
    for id in raw:gmatch("[^,]+") do ids[#ids + 1] = id end
  end
  if #ids == 0 then ids = { default_id } end

  M.tabs = {}
  for _, id in ipairs(ids) do
    local g = ensure_guide(id)
    if g then M.tabs[#M.tabs + 1] = id end
  end
  local want = ui.store_get("ec.guide.active")
  M.active = nil
  for _, id in ipairs(M.tabs) do
    if id == want then M.active = id end
  end
  M.active = M.active or M.tabs[#M.tabs]
  if M.active then
    load_pos(M.guides[M.active])
    M.maybe_autostart_timer()
  end
  save_tabs()
  M.render()
end

-- Click anywhere outside the tool strip closes the guides dropdown.
document:addEventListener("click", function(_, ev)
  if not (guides_menu_open or history_open) then return end
  local t = ev.target
  if t and t.closest and t:closest("#ec-tstrip") ~= js.null then return end
  close_guides_menu()
  if history_open and tstrip_el then
    local d = tstrip_el:querySelector("#ec-history-drop")
    if d ~= js.null then d.classList:add("d-none") end
    history_open = false
  end
end)

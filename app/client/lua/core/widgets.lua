-- codex.widgets — the floating-frame engine. Every plugin lives in one of
-- these: draggable by the title bar, collapsible, closable, z-ordered on
-- click, position remembered per widget. This is what makes ExileCodex feel
-- like a WoW addon instead of a web page.
local js = require "js"
local window = js.global
local document = window.document
local ui = codex.ui

codex.widgets = { open = {}, specs = {}, anchors = {}, z = 500, cascade = 0, drag = nil, rdrag = nil, onchange = nil }
local W = codex.widgets

-- Anchoring: a child widget can pin itself to a parent widget's edge (e.g. the
-- image panel docks to the guide window). When the parent moves or resizes, the
-- child's place() runs so it follows. Cleared on close.
function W.set_anchor(childId, parentId, place)
  W.anchors[childId] = { parentId = parentId, place = place }
end

function W.clear_anchor(childId)
  W.anchors[childId] = nil
end

function W.reposition_anchored(parentId)
  local parent = W.open[parentId]
  if not parent then return end
  for childId, a in pairs(W.anchors) do
    if a.parentId == parentId then
      local child = W.open[childId]
      if child then a.place(child, parent) end
    end
  end
end

local function desktop()
  return ui.byId("desktop")
end

-- Remember which plugins are open (positions/sizes are already saved per widget)
-- so a relaunch can restore the whole workspace.
local function save_open_list()
  local ids = {}
  for id in pairs(W.open) do
    if codex.registry and codex.registry.find and codex.registry.find(id) then ids[#ids + 1] = id end
  end
  ui.store_set("ec.openwidgets", table.concat(ids, ","))
end

local function notify()
  save_open_list()
  if W.onchange then W.onchange() end
end

function W.is_open(id)
  return W.open[id] ~= nil
end

function W.close(id)
  local fr = W.open[id]
  if fr then
    desktop():removeChild(fr)
    W.open[id] = nil
    notify()
  end
end

function W.front(fr)
  W.z = W.z + 1
  fr.style.zIndex = W.z
end

-- Keep a widget fully within its container. Everything here is done in LAYOUT
-- space (offsetWidth/offsetLeft + the offsetParent's clientWidth) so it stays
-- correct under the global font `zoom` (ec.fontscale) — getBoundingClientRect
-- would report zoomed coordinates that don't match the style.left we write.
local MARGIN = 6
local function bounds(fr)
  local p = fr.offsetParent
  if p ~= nil and p ~= js.null then return p.clientWidth, p.clientHeight end
  return window.innerWidth, window.innerHeight
end
local function clamp_onscreen(fr)
  if fr == nil or fr == js.null then return end
  local pw, ph = bounds(fr)
  local left, top = fr.offsetLeft, fr.offsetTop
  local maxLeft = pw - fr.offsetWidth - MARGIN
  local maxTop = ph - fr.offsetHeight - MARGIN
  if maxLeft < MARGIN then maxLeft = MARGIN end
  if maxTop < MARGIN then maxTop = MARGIN end
  if left > maxLeft then left = maxLeft end
  if left < MARGIN then left = MARGIN end
  if top > maxTop then top = maxTop end
  if top < MARGIN then top = MARGIN end
  fr.style.left = math.floor(left) .. "px"
  fr.style.top = math.floor(top) .. "px"
end
W.clamp_onscreen = clamp_onscreen

-- When the app window resizes (window mode is resizable), pull every open widget
-- back on-screen so nothing is ever stranded off the edge.
window:addEventListener("resize", function()
  for _, fr in pairs(W.open) do clamp_onscreen(fr) end
end)

local function save_state(id, fr)
  local collapsed = fr.classList:contains("collapsed") and 1 or 0
  local w = math.floor(fr.offsetWidth)
  local h = 0
  local body = fr:querySelector(".ec-widget-body")
  if body ~= js.null and tostring(body.style.height) ~= "" then
    h = math.floor(body.offsetHeight)
  end
  ui.store_set("ec.widget." .. id,
    math.floor(fr.offsetLeft) .. "," .. math.floor(fr.offsetTop) .. "," .. collapsed .. "," .. w .. "," .. h)
end

local function load_state(id)
  local v = ui.store_get("ec.widget." .. id)
  if not v then return nil end
  local x, y, c, w, h = v:match("^(-?%d+),(-?%d+),(%d),?(%d*),?(%d*)")
  if not x then return nil end
  return tonumber(x), tonumber(y), c == "1",
    (w ~= "" and tonumber(w) or nil), (h ~= "" and tonumber(h) or nil)
end

-- Persist a widget's current position/size on demand (e.g. the guide's Width
-- slider resizes the live widget, then calls this to remember it).
function W.save(id)
  local fr = W.open[id]
  if fr then save_state(id, fr) end
end

-- Spawn a widget: { id, title, icon, width, flush, mount = function(body) end }.
-- If it's already open it just comes to the front.
function W.spawn(spec)
  local existing = W.open[spec.id]
  if existing then
    W.front(existing)
    return existing
  end

  local fr = ui.el("div", "ec-widget")

  -- fresh widgets open centered on screen; from then on position AND size are
  -- remembered (saved on drag/resize/collapse and on spawn)
  local x, y, collapsed, sw, sh = load_state(spec.id)
  local width = sw or spec.width or 380
  fr.style.width = width .. "px"
  local fresh = (x == nil)
  if fresh then
    W.cascade = W.cascade + 1
    local nudge = ((W.cascade % 5) - 2) * 26
    x = math.max(8, math.floor((window.innerWidth - width) / 2) + nudge)
    y = math.max(8, math.floor(window.innerHeight * 0.5 - 240) + nudge)
  end
  fr.style.left = x .. "px"
  fr.style.top = y .. "px"

  local flush = spec.flush and " flush" or ""
  fr.innerHTML = table.concat({
    '<div class="ec-widget-title">',
    '<i class="bi ', spec.icon or "bi-app", '" style="color:', spec.color or "var(--ec-gold)", ';font-size:13px"></i>',
    '<span class="t">', codex.T and codex.T(spec.title or spec.id) or (spec.title or spec.id), '</span>',
    (spec.on_attach and '<button data-act="attach" title="Attach to Guide"><i class="bi bi-pin-angle"></i></button>' or ''),
    '<button data-act="collapse" title="Collapse"><i class="bi bi-chevron-up"></i></button>',
    (spec.wiki and '<button data-act="help" title="Help / wiki"><i class="bi bi-question-circle"></i></button>' or ''),
    '<button data-act="close" title="Close"><i class="bi bi-x-lg"></i></button>',
    '</div>',
    '<div class="ec-widget-body', flush, '"></div>',
    '<div class="ec-widget-grip" title="Resize"></div>',
  })
  desktop():appendChild(fr)
  W.open[spec.id] = fr
  W.specs[spec.id] = spec
  W.front(fr)
  if collapsed then fr.classList:add("collapsed") end
  if sh and sh > 0 then
    local body = fr:querySelector(".ec-widget-body")
    body.style.height = sh .. "px"
    body.style.maxHeight = "none"
  end

  fr:addEventListener("mousedown", function() W.front(fr) end, true)

  ui.on(fr:querySelector('[data-act="close"]'), "click", function()
    W.close(spec.id)
    if spec.on_close then spec.on_close() end
  end)
  ui.on(fr:querySelector('[data-act="collapse"]'), "click", function()
    fr.classList:toggle("collapsed")
    save_state(spec.id, fr)
  end)
  if spec.on_attach then
    local ab = fr:querySelector('[data-act="attach"]')
    if ab ~= js.null then ui.on(ab, "click", function() spec.on_attach() end) end
  end
  if spec.wiki then
    local hb = fr:querySelector('[data-act="help"]')
    if hb ~= js.null then
      ui.on(hb, "click", function()
        if codex.wiki then codex.wiki.open(spec.wiki, spec.title) end
      end)
    end
  end

  local title = fr:querySelector(".ec-widget-title")
  title:addEventListener("mousedown", function(_, ev)
    local onButton = ev.target.closest and ev.target:closest("button") or js.null
    if onButton ~= js.null then return end
    W.drag = { fr = fr, id = spec.id, dx = ev.clientX - fr.offsetLeft, dy = ev.clientY - fr.offsetTop }
    ev:preventDefault()
  end)

  -- resize by the corner grip: width on the frame, height on the body
  local grip = fr:querySelector(".ec-widget-grip")
  grip:addEventListener("mousedown", function(_, ev)
    local body = fr:querySelector(".ec-widget-body")
    W.rdrag = {
      fr = fr, id = spec.id, body = body,
      sx = ev.clientX, sy = ev.clientY,
      sw = fr.offsetWidth, sh = body.offsetHeight,
    }
    ev:preventDefault()
    ev:stopPropagation()
  end)

  if spec.mount then spec.mount(fr:querySelector(".ec-widget-body")) end

  -- now that content exists the real height is known — center fresh widgets
  -- vertically for real, then persist wherever they ended up
  if fresh then
    local h = fr.offsetHeight
    fr.style.top = math.max(8, math.floor((window.innerHeight - h) / 2)) .. "px"
  end
  clamp_onscreen(fr) -- a restored position may be off-screen if the window shrank
  save_state(spec.id, fr)

  notify()
  return fr
end

-- One global drag/resize loop for all widgets.
document:addEventListener("mousemove", function(_, ev)
  local rd = W.rdrag
  if rd then
    if ev.buttons == 0 then
      save_state(rd.id, rd.fr)
      W.rdrag = nil
      return
    end
    -- cap the size so a bottom-right resize can't push the widget off-screen
    local pw, ph = bounds(rd.fr)
    local maxW = pw - rd.fr.offsetLeft - MARGIN
    if maxW < 240 then maxW = 240 end
    local chrome = rd.fr.offsetHeight - rd.body.offsetHeight
    local maxBodyH = ph - rd.fr.offsetTop - chrome - MARGIN
    if maxBodyH < 100 then maxBodyH = 100 end
    local newW = math.max(240, rd.sw + (ev.clientX - rd.sx))
    local newH = math.max(100, rd.sh + (ev.clientY - rd.sy))
    if newW > maxW then newW = maxW end
    if newH > maxBodyH then newH = maxBodyH end
    rd.fr.style.width = math.floor(newW) .. "px"
    rd.body.style.height = math.floor(newH) .. "px"
    rd.body.style.maxHeight = "none"
    W.reposition_anchored(rd.id)
    return
  end
  local d = W.drag
  if not d then return end
  if ev.buttons == 0 then
    -- mouseup was lost (released outside the window) — finalize where it is
    save_state(d.id, d.fr)
    W.drag = nil
    return
  end
  -- clamp the drag so the widget can never be dragged off-screen
  local pw, ph = bounds(d.fr)
  local nx = ev.clientX - d.dx
  local ny = ev.clientY - d.dy
  local maxX = pw - d.fr.offsetWidth - MARGIN
  local maxY = ph - d.fr.offsetHeight - MARGIN
  if maxX < MARGIN then maxX = MARGIN end
  if maxY < MARGIN then maxY = MARGIN end
  if nx < MARGIN then nx = MARGIN elseif nx > maxX then nx = maxX end
  if ny < MARGIN then ny = MARGIN elseif ny > maxY then ny = maxY end
  d.fr.style.left = math.floor(nx) .. "px"
  d.fr.style.top = math.floor(ny) .. "px"
  W.reposition_anchored(d.id)
end)

document:addEventListener("mouseup", function()
  if W.rdrag then
    save_state(W.rdrag.id, W.rdrag.fr)
    W.rdrag = nil
  end
  local d = W.drag
  if d then
    save_state(d.id, d.fr)
    W.drag = nil
  end
end)

-- Remount every open widget in place (used when the language changes).
function W.refresh_all()
  local ids = {}
  for id in pairs(W.open) do ids[#ids + 1] = id end
  for _, id in ipairs(ids) do
    local spec = W.specs[id]
    W.close(id)
    if spec then W.spawn(spec) end
  end
end

-- Open / toggle a registered plugin as a widget.
function W.open_plugin(pid)
  local p = codex.registry.find(pid)
  if not p then return end
  W.spawn{ id = pid, title = p.name, icon = p.icon, color = p.color, width = p.width, flush = p.flush, wiki = p.wiki, mount = p.mount, on_close = p.on_close, on_attach = p.on_attach }
end

function W.toggle_plugin(pid)
  if W.is_open(pid) then W.close(pid) else W.open_plugin(pid) end
end

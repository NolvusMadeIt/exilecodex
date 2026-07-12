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

local function notify()
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
    rd.fr.style.width = math.max(240, rd.sw + (ev.clientX - rd.sx)) .. "px"
    rd.body.style.height = math.max(100, rd.sh + (ev.clientY - rd.sy)) .. "px"
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
  local nx = math.max(0, ev.clientX - d.dx)
  local ny = math.max(0, ev.clientY - d.dy)
  d.fr.style.left = nx .. "px"
  d.fr.style.top = ny .. "px"
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
  W.spawn{ id = pid, title = p.name, icon = p.icon, color = p.color, width = p.width, flush = p.flush, wiki = p.wiki, mount = p.mount, on_close = p.on_close }
end

function W.toggle_plugin(pid)
  if W.is_open(pid) then W.close(pid) else W.open_plugin(pid) end
end

-- codex.update — in-app auto-update surface over the desktop shell's
-- electron-updater. The shell downloads new builds from the public releases repo
-- in the background and streams status here; we show a "restart to update" toast
-- and feed Settings → About. No-ops in the browser build (no shell).
local js = require "js"
local window = js.global
local document = window.document
local ui = codex.ui

codex.update = { status = "idle", percent = 0, available_ver = nil }
local U = codex.update
local listeners = {}

local function shell()
  if window.exileShell ~= nil and window.exileShell ~= js.null then return window.exileShell end
  return nil
end

-- The installed build version (from the shell); falls back to the renderer const.
function U.version()
  local sh = shell()
  if sh and sh.appVersion ~= nil and sh.appVersion ~= js.null then
    local v = tostring(sh.appVersion)
    if v ~= "" then return v end
  end
  return codex.VERSION
end

-- Auto-updates only exist in the packaged desktop app.
function U.available() return shell() ~= nil end

-- Settings (and anything else) can subscribe to re-paint on status changes.
function U.on_change(fn) listeners[#listeners + 1] = fn end
local function emit() for _, fn in ipairs(listeners) do pcall(fn) end end

function U.check()
  local sh = shell()
  if sh and sh.checkForUpdate ~= nil then U.status = "checking"; emit(); pcall(function() sh:checkForUpdate() end) end
end

function U.install()
  local sh = shell()
  if sh and sh.installUpdate ~= nil then pcall(function() sh:installUpdate() end) end
end

-- A dismissible bottom bar shown once an update has finished downloading.
local function show_ready_toast(ver)
  local old = ui.byId("ec-update-toast")
  if old then old:remove() end
  local el = document:createElement("div")
  el.id = "ec-update-toast"
  el.className = "ec-updatebar"
  el.innerHTML = table.concat({
    '<i class="bi bi-stars ec-updatebar-ico"></i>',
    '<span class="ec-updatebar-t">', codex.T("Update ready"), (ver and (' &middot; v' .. tostring(ver)) or ''), '</span>',
    '<button id="ec-update-restart" class="btn btn-ec btn-sm">', codex.T("Restart to update"), '</button>',
    '<i id="ec-update-dismiss" class="bi bi-x ec-updatebar-x" title="Later"></i>',
  })
  document.body:appendChild(el)
  local rb = ui.byId("ec-update-restart")
  if rb then ui.on(rb, "click", function() U.install() end) end
  local db = ui.byId("ec-update-dismiss")
  if db then ui.on(db, "click", function() el:remove() end) end
end

-- Subscribe to shell update events (fengari hands the JS `this` first).
local sh0 = shell()
if sh0 and sh0.onUpdate ~= nil then
  sh0:onUpdate(function(_, ev)
    if ev == nil or ev == js.null then return end
    local t = tostring(ev.type)
    U.status = t
    if t == "available" then
      U.available_ver = (ev.version ~= nil and ev.version ~= js.null) and tostring(ev.version) or nil
    elseif t == "progress" then
      U.percent = tonumber(ev.percent) or 0
    elseif t == "downloaded" then
      U.available_ver = (ev.version ~= nil and ev.version ~= js.null) and tostring(ev.version) or nil
      show_ready_toast(U.available_ver)
    end
    emit()
  end)
end

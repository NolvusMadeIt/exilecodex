-- codex.plugins — per-plugin versioning + update checks.
--   * Every registered plugin carries a version (its own `version` field, or the
--     app version as a floor). A remote manifest lists the newest version + raw
--     source URL per plugin id; when an installed plugin is behind, we notify.
--   * Applying an update reloads ONLY that plugin when it declares itself
--     hot-reloadable (`hot = true` + an `on_unload` teardown that clears any
--     listeners/intervals it set). Otherwise we warn the user and soft-reload the
--     renderer — fast, prefs/run state persist in localStorage, and the desktop
--     app itself is NOT restarted.
-- The manifest lives in the repo (app/plugins.manifest.json), fetched from GitHub
-- raw by default; override the URL in prefs key `ec.plugins.manifest`.
local js = require "js"
local window = js.global
local document = window.document
local ui = codex.ui

codex.plugins = codex.plugins or {}
local P = codex.plugins
P.updates = {}       -- id -> { current, latest, url, name }
P.status = "idle"    -- idle | checking | ok | error
local listeners = {}

local DEFAULT_MANIFEST =
  "https://raw.githubusercontent.com/NolvusMadeIt/exilecodex/main/app/plugins.manifest.json"

local function esc(s) return (tostring(s):gsub("&", "&amp;"):gsub("<", "&lt;"):gsub(">", "&gt;")) end
local function T(k) return codex.T and codex.T(k) or k end

function P.manifest_url()
  local v = ui.store_get("ec.plugins.manifest")
  if v and v ~= "" then return v end
  return DEFAULT_MANIFEST
end

function P.version_of(p)
  if type(p) == "string" then p = codex.registry.find(p) end
  if not p then return nil end
  return p.version or codex.VERSION
end

function P.on_change(fn) listeners[#listeners + 1] = fn end
local function emit() for _, fn in ipairs(listeners) do pcall(fn) end end

-- true when version `a` is strictly older than `b` (numeric dotted compare;
-- pre-release suffixes are ignored so alpha↔alpha of equal numbers isn't noise).
local function older(a, b)
  a, b = tostring(a or ""), tostring(b or "")
  if a == b then return false end
  local function nums(s) local t = {}; for n in s:gmatch("%d+") do t[#t + 1] = tonumber(n) end; return t end
  local pa, pb = nums(a), nums(b)
  for i = 1, math.max(#pa, #pb) do
    local x, y = pa[i] or 0, pb[i] or 0
    if x < y then return true elseif x > y then return false end
  end
  return false
end
P._older = older

function P.update_count()
  local n = 0; for _ in pairs(P.updates) do n = n + 1 end; return n
end

-- Fetch the remote manifest (JS side parses the JSON) and diff vs installed.
function P.check(cb)
  if window.ecJson == nil or window.ecJson == js.null then
    P.status = "error"; emit(); if cb then pcall(cb, false) end; return
  end
  P.status = "checking"; emit()
  window.ecJson:get(P.manifest_url(), function(_, man)
    if man == nil or man == js.null then
      P.status = "error"; emit(); if cb then pcall(cb, false) end; return
    end
    local list = man.plugins
    P.updates = {}
    if list ~= nil and list ~= js.null then
      for _, p in ipairs(codex.registry.plugins) do
        local ok, m = pcall(function() return list[p.id] end)
        if ok and m ~= nil and m ~= js.null then
          local latest = tostring(m.version or "")
          if latest ~= "" and older(P.version_of(p), latest) then
            local url = (m.url ~= nil and m.url ~= js.null) and tostring(m.url) or nil
            P.updates[p.id] = { current = P.version_of(p), latest = latest, url = url, name = p.name }
          end
        end
      end
    end
    P.status = "ok"; emit()
    P.notify()
    if cb then pcall(cb, true) end
  end)
end

-- ------------------------------------------------------------------ toasts
-- One dismissible bottom bar summarising plugins with updates.
function P.notify()
  local old = ui.byId("ec-plugin-toast"); if old then old:remove() end
  local n = P.update_count()
  if n == 0 then return end
  local first
  for id, info in pairs(P.updates) do first = info; first.id = id; break end
  local label = (n == 1) and (esc(tostring(first.name or first.id)) .. " " .. T("has an update"))
    or (tostring(n) .. " " .. T("plugins have updates"))
  local el = document:createElement("div")
  el.id = "ec-plugin-toast"; el.className = "ec-updatebar"
  el.innerHTML = table.concat({
    '<i class="bi bi-puzzle ec-updatebar-ico"></i>',
    '<span class="ec-updatebar-t">', label, '</span>',
    '<button id="ec-plugin-open" class="btn btn-ec btn-sm">', T("View"), '</button>',
    '<i id="ec-plugin-dismiss" class="bi bi-x ec-updatebar-x" title="Later"></i>',
  })
  document.body:appendChild(el)
  local ob = ui.byId("ec-plugin-open")
  if ob then ui.on(ob, "click", function()
    el:remove(); if codex.settings and codex.settings.open then codex.settings.open("plugins") end
  end) end
  local db = ui.byId("ec-plugin-dismiss")
  if db then ui.on(db, "click", function() el:remove() end) end
end

-- Warned soft-reload of the renderer (used when a plugin can't reload alone).
function P.warn_reload(p)
  local old = ui.byId("ec-plugin-toast"); if old then old:remove() end
  local el = document:createElement("div")
  el.id = "ec-plugin-toast"; el.className = "ec-updatebar"
  el.innerHTML = table.concat({
    '<i class="bi bi-arrow-clockwise ec-updatebar-ico"></i>',
    '<span class="ec-updatebar-t">', T("Reload to finish updating"), ' ', esc(tostring(p.name)), '?</span>',
    '<button id="ec-plugin-reload" class="btn btn-ec btn-sm">', T("Reload now"), '</button>',
    '<i id="ec-plugin-later" class="bi bi-x ec-updatebar-x" title="Later"></i>',
  })
  document.body:appendChild(el)
  local rb = ui.byId("ec-plugin-reload")
  if rb then ui.on(rb, "click", function() pcall(function() window.location:reload() end) end) end
  local lb = ui.byId("ec-plugin-later")
  if lb then ui.on(lb, "click", function() el:remove() end) end
end

-- True single-plugin reload: fetch fresh source, tear the old one down, re-eval
-- (which re-registers it, replacing the entry), and re-open its window if open.
function P.hot_reload(p)
  local info = P.updates[p.id]
  local src_url = (info and info.url) or p.src
  if not src_url or window.ecHtml == nil or window.ecHtml == js.null then P.warn_reload(p); return end
  window.ecHtml:get(src_url, function(_, src)
    if src == nil or src == js.null or tostring(src) == "" then P.warn_reload(p); return end
    pcall(function() p.on_unload() end)
    local chunk, err = load(tostring(src), "@" .. tostring(p.id))
    if not chunk then pcall(function() window.console:error("plugin reload compile: " .. tostring(err)) end); P.warn_reload(p); return end
    local ok, e = pcall(chunk)
    if not ok then pcall(function() window.console:error("plugin reload run: " .. tostring(e)) end); return end
    P.updates[p.id] = nil; emit()
    if codex.widgets and codex.widgets.is_open and codex.widgets.is_open(p.id) then
      pcall(function() codex.widgets.close(p.id); codex.widgets.open_plugin(p.id) end)
    end
  end)
end

-- Apply the available update for one plugin.
function P.apply(id)
  local p = codex.registry.find(id)
  if not p then return end
  if p.hot and type(p.on_unload) == "function" then P.hot_reload(p) else P.warn_reload(p) end
end

-- One light check a few seconds after startup (a single small fetch; no polling).
window:setTimeout(function() pcall(function() P.check() end) end, 4000)

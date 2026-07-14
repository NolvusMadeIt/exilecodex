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
-- Base installed version per plugin id, from the bundled manifest (loaded at init).
local bundled_versions = nil

-- exilecodex is public, so the manifest + every plugin's source are fetched
-- straight from it — no mirror repo. Pushing a bumped plugin.lua to main is all
-- it takes for the raw URL to serve the update. Override in prefs ec.plugins.manifest.
local DEFAULT_MANIFEST =
  "https://raw.githubusercontent.com/NolvusMadeIt/exilecodex/main/app/plugins.manifest.json"

local function esc(s) return (tostring(s):gsub("&", "&amp;"):gsub("<", "&lt;"):gsub(">", "&gt;")) end
local function T(k) return codex.T and codex.T(k) or k end

function P.manifest_url()
  local v = ui.store_get("ec.plugins.manifest")
  if v and v ~= "" then return v end
  return DEFAULT_MANIFEST
end

-- Installed plugin overrides (downloaded updates persisted to userData). Read
-- lazily from the shell; version_of() prefers an override over the bundled ver.
local overrides_cache = nil
local function overrides_obj()
  if overrides_cache == nil then
    local sh = window.exileShell
    if sh ~= nil and sh ~= js.null and sh.pluginOverrides ~= nil then
      local ok, ov = pcall(function() return sh:pluginOverrides() end)
      overrides_cache = (ok and ov ~= nil and ov ~= js.null) and ov or js.null
    else
      overrides_cache = js.null
    end
  end
  return overrides_cache
end
function P.installed_version(id)
  local ov = overrides_obj()
  if ov ~= nil and ov ~= js.null then
    local v = nil
    pcall(function() v = ov[id] end)
    if v ~= nil and v ~= js.null and tostring(v) ~= "" then return tostring(v) end
  end
  return nil
end

function P.version_of(p)
  if type(p) == "string" then p = codex.registry.find(p) end
  if not p then return nil end
  return P.installed_version(p.id)
    or (bundled_versions and bundled_versions[p.id])
    or p.version or codex.VERSION
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

-- Bottom bar after an install: success prompts a reload (which loads the freshly
-- written override); failure explains why.
function P.install_toast(info, ok, err)
  local old = ui.byId("ec-plugin-toast"); if old then old:remove() end
  local el = document:createElement("div")
  el.id = "ec-plugin-toast"; el.className = "ec-updatebar"
  if ok then
    el.innerHTML = table.concat({
      '<i class="bi bi-check-circle ec-updatebar-ico"></i>',
      '<span class="ec-updatebar-t">', esc(tostring(info.name or info.id)), ' ', T("updated to"), ' v', esc(tostring(info.latest)), ' — ', T("reload to apply"), '</span>',
      '<button id="ec-plugin-reload" class="btn btn-ec btn-sm">', T("Reload now"), '</button>',
      '<i id="ec-plugin-later" class="bi bi-x ec-updatebar-x" title="Later"></i>',
    })
  else
    el.innerHTML = table.concat({
      '<i class="bi bi-exclamation-triangle ec-updatebar-ico"></i>',
      '<span class="ec-updatebar-t">', T("Update failed"), ': ', esc(tostring(err or "")), '</span>',
      '<i id="ec-plugin-later" class="bi bi-x ec-updatebar-x" title="Close"></i>',
    })
  end
  document.body:appendChild(el)
  local rb = ui.byId("ec-plugin-reload")
  if rb then ui.on(rb, "click", function() pcall(function() window.location:reload() end) end) end
  local lb = ui.byId("ec-plugin-later")
  if lb then ui.on(lb, "click", function() el:remove() end) end
end

-- Apply an update: download the latest source, persist it as an override (the
-- shell serves it over the bundled file so it STICKS past a restart), then reload
-- to load it. This is what makes plugins updatable on their own, no app rebuild.
-- Download the latest source and persist it as an override — no toast, no
-- reload, no status paint. cb(ok, info, err). Used by the boot update phase to
-- apply plugin updates silently before the app reveals.
function P.apply_silent(id, cb)
  local info = P.updates[id]
  local sh = window.exileShell
  if not info or not info.url or window.ecHtml == nil or window.ecHtml == js.null
    or sh == nil or sh == js.null or sh.pluginWrite == nil then
    if cb then pcall(cb, false, info, "unavailable") end
    return
  end
  window.ecHtml:get(info.url, function(_, src)
    if src == nil or src == js.null or tostring(src) == "" then
      if cb then pcall(cb, false, info, "download failed") end
      return
    end
    sh:pluginWrite(id, info.latest, tostring(src)):then_(function(_, res)
      if res ~= nil and res ~= js.null and res.ok then
        overrides_cache = nil -- re-read installed versions next time
        P.updates[id] = nil
        if cb then pcall(cb, true, info) end
      else
        local e = (res ~= nil and res ~= js.null) and tostring(res.error or "") or "write failed"
        if cb then pcall(cb, false, info, e) end
      end
    end)
  end)
end

function P.apply(id)
  local info = P.updates[id]
  local p = codex.registry.find(id)
  local sh = window.exileShell
  if not info or not info.url or window.ecHtml == nil or window.ecHtml == js.null
    or sh == nil or sh == js.null or sh.pluginWrite == nil then
    if p then P.warn_reload(p) end -- browser build / no source: best-effort reload
    return
  end
  P.status = "installing"; emit()
  P.apply_silent(id, function(ok, inf, err)
    if ok then
      P.status = "ok"; emit(); P.install_toast(inf, true)
    else
      P.status = "error"; emit(); P.install_toast(inf, false, err or "update failed")
    end
  end)
end

-- The bundled manifest gives each plugin's base installed version (so the panel
-- shows real, independent per-plugin versions — not the app version).
local function load_bundled_manifest()
  if window.ecJson == nil or window.ecJson == js.null then return end
  window.ecJson:get("/app/plugins.manifest.json", function(_, man)
    if man == nil or man == js.null then return end
    local list = man.plugins
    if list == nil or list == js.null then return end
    local bv = {}
    for _, p in ipairs(codex.registry.plugins) do
      local ok, m = pcall(function() return list[p.id] end)
      if ok and m ~= nil and m ~= js.null and m.version ~= nil and m.version ~= js.null then
        bv[p.id] = tostring(m.version)
      end
    end
    bundled_versions = bv
    emit()
  end)
end
window:setTimeout(function() pcall(load_bundled_manifest) end, 600)
-- One light update check a few seconds after startup (a single small fetch).
window:setTimeout(function() pcall(function() P.check() end) end, 4000)

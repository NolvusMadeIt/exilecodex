-- codex.ui — DOM + Bootstrap helpers shared by the core and every plugin.
-- All ExileCodex Lua code talks to the page through this module.
local js = require "js"
local window = js.global
local document = window.document

codex = codex or {}
codex.VERSION = "2.1.0-alpha"
codex.ui = { window = window, document = document }
local ui = codex.ui

-- getElementById that returns nil (not js.null) when missing, so `if el then` works.
function ui.byId(id)
  local el = document:getElementById(id)
  if el == js.null then return nil end
  return el
end

function ui.el(tag, className, html)
  local e = document:createElement(tag)
  if className then e.className = className end
  if html then e.innerHTML = html end
  return e
end

function ui.clear(el)
  el.innerHTML = ""
end

-- Event helper: fengari passes the JS `this` as the first callback arg; we hand
-- plugins a friendlier (event, element) order.
function ui.on(el, event, fn)
  el:addEventListener(event, function(this, ev) fn(ev, this) end)
end

-- Run fn over every element matching sel under rootEl.
function ui.each(rootEl, sel, fn)
  local list = rootEl:querySelectorAll(sel)
  for i = 0, list.length - 1 do fn(list:item(i)) end
end

-- getAttribute as a plain Lua string (or nil).
function ui.attr(el, name)
  local v = el:getAttribute(name)
  if v == js.null then return nil end
  return tostring(v)
end

-- localStorage as plain Lua strings.
function ui.store_get(key)
  local v = window.localStorage:getItem(key)
  if v == js.null or v == nil then return nil end
  return tostring(v)
end

function ui.store_set(key, value)
  window.localStorage:setItem(key, tostring(value))
  -- mirror to the WoW-style SavedVariables file (desktop shell only; no-op in web)
  if window.ecSaveVars ~= nil and window.ecSaveVars ~= js.null then window.ecSaveVars() end
end

-- Placeholder page for plugins that haven't been ported from concept1 yet.
function ui.stub_page(opts)
  return table.concat({
    '<div class="ec-stub-wrap">',
    '<div class="ec-panel p-4" style="max-width:600px">',
    '<div class="d-flex align-items-center gap-3 mb-2">',
    '<i class="bi ', opts.icon or 'bi-puzzle', '" style="font-size:28px;color:var(--ec-gold)"></i>',
    '<div>',
    '<div class="ec-title" style="font-size:19px;color:var(--ec-text-strong)">', opts.name, '</div>',
    '<span class="ec-chip ec-chip-gold">port pending</span>',
    '</div></div>',
    '<p class="ec-dim mb-2" style="font-size:13px;line-height:1.7">', opts.desc or '', '</p>',
    '<p class="ec-muted mb-0" style="font-size:12px">This plugin is being rebuilt in Lua. ',
    'Reference implementation: <code style="color:var(--ec-blue)">', opts.source or '', '</code></p>',
    '</div>',
    '</div>',
  })
end

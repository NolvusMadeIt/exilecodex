-- Item Database — browse every PoE2 unique item from the bundled game data
-- (see ATTRIBUTION.md), grouped Weapon / Armour / Other,
-- searchable, each showing its base type and full mod text. Fresh Lua view
-- over the same data the old app used.
local js = require "js"
local window = js.global
local ui = codex.ui
local DATA = "../../media/gamedata/poe2/rise-of-the-abyssal/"

local TABS = { "Weapon", "Armour", "Other" }
local LABELS = { Weapon = "Weapons", Armour = "Armour", Other = "Other" }

local S = { tab = "Weapon", all = nil, items = {}, q = "", loading = false, error = false }
local body_el = nil

local function esc(s)
  return (tostring(s):gsub("&", "&amp;"):gsub("<", "&lt;"):gsub(">", "&gt;"):gsub('"', "&quot;"))
end
local function jstr(v) if v == nil or v == js.null then return nil end return tostring(v) end
local function jnum(v) if v == nil or v == js.null then return nil end return tonumber(v) end
local function q(sel) return body_el and body_el:querySelector(sel) or js.null end

local function render_list()
  local el = q("#itm-list")
  if el == js.null then return end
  if S.loading then el.innerHTML = '<div class="xdb-state">Loading items…</div>' return end
  if S.error then el.innerHTML = '<div class="xdb-state">Couldn\'t load the item database.</div>' return end
  local ql = S.q:lower()
  local parts, shown = {}, 0
  for _, it in ipairs(S.items) do
    if ql == "" or it.name:lower():find(ql, 1, true) or it.base:lower():find(ql, 1, true) or it.plain:lower():find(ql, 1, true) then
      shown = shown + 1
      parts[#parts + 1] = table.concat({
        '<div class="uniq-item">',
        '<div class="uniq-name">', esc(it.name), '</div>',
        '<div class="uniq-base">', esc(it.base), '</div>',
        (it.effect ~= "" and ('<div class="uniq-mods">' .. it.effect .. '</div>') or ''),
        '</div>',
      })
    end
  end
  if shown == 0 then el.innerHTML = '<div class="xdb-state">No items match.</div>' return end
  el.innerHTML = '<div class="xdb-count">' .. shown .. ' uniques</div>' .. table.concat(parts)
end

local function build_tab(tab)
  S.items = {}
  if not S.all then return end
  local arr = S.all[tab]
  if arr == nil or arr == js.null then return end
  for i = 0, (jnum(arr.length) or 0) - 1 do
    local it = arr[i]
    if it ~= nil and it ~= js.null then
      local mods, eff, plain = it.explicitMods, "", ""
      if mods ~= nil and mods ~= js.null then
        local lines = {}
        for j = 0, (jnum(mods.length) or 0) - 1 do
          local ln = jstr(mods[j]) or ""
          lines[#lines + 1] = ln
          plain = plain .. " " .. ln
        end
        eff = table.concat(lines, "<br>")
      end
      S.items[#S.items + 1] = {
        name = jstr(it.name) or "?", base = jstr(it.typeLine) or "",
        effect = eff, plain = plain:gsub("<[^>]->", ""),
      }
    end
  end
end

local function show_tab(tab)
  S.tab = tab
  build_tab(tab)
  render_list()
end

local function render_tabs()
  local el = q("#itm-tabs")
  if el == js.null then return end
  local parts = {}
  for _, t in ipairs(TABS) do
    parts[#parts + 1] = '<button class="xdb-sidebtn' .. (t == S.tab and " active" or "") .. '" data-tab="' .. t .. '">' .. LABELS[t] .. '</button>'
  end
  el.innerHTML = table.concat(parts)
  ui.each(el, "[data-tab]", function(b)
    ui.on(b, "click", function()
      local t = ui.attr(b, "data-tab")
      if t == S.tab then return end
      S.q = ""
      local si = q("#itm-search"); if si ~= js.null then si.value = "" end
      render_tabs()
      show_tab(t)
    end)
  end)
end

local function load_all()
  S.loading = true
  S.error = false
  render_list()
  window.ecJson:get(DATA .. "Uniques.json", function(_, data)
    S.loading = false
    if data == nil or data == js.null or data.uniques == nil or data.uniques == js.null then
      S.error = true; render_list(); return
    end
    S.all = data.uniques
    show_tab(S.tab)
  end)
end

local function mount(body)
  body_el = body
  body.innerHTML = table.concat({
    '<div class="xdb-wrap">',
    '<div id="itm-tabs" class="xdb-sides"></div>',
    '<div class="mkt-searchrow"><i class="bi bi-search"></i><input id="itm-search" class="mkt-search" placeholder="Search uniques, base types, mods…"></div>',
    '<div id="itm-list" class="xdb-list"></div>',
    '</div>',
  })
  local si = body:querySelector("#itm-search")
  ui.on(si, "input", function() S.q = tostring(si.value) render_list() end)
  render_tabs()
  if S.all then show_tab(S.tab) else load_all() end
end

codex.registry.register{
  id = "items",
  name = "Item Database",
  icon = "bi-box-seam",
  order = 30,
  status = "alpha",
  width = 560,
  desc = "Browse every PoE2 unique item — searchable by name, base type or mod, offline-friendly.",
  mount = mount,
}

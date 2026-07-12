-- Character — the PoE2 gem + ascendancy reference from the bundled game data
-- (see ATTRIBUTION.md): skill / support / spirit / lineage
-- gems and every ascendancy passive, searchable. Fresh Lua view over the same
-- data the old app used.
local js = require "js"
local window = js.global
local ui = codex.ui
local DATA = "../../media/gamedata/poe2/rise-of-the-abyssal/"

local TABS = {
  { id = "skill", label = "Skill", src = "gems", key = "skill" },
  { id = "support", label = "Support", src = "gems", key = "support" },
  { id = "spirit", label = "Spirit", src = "gems", key = "spirit" },
  { id = "lineage", label = "Lineage", src = "gems", key = "lineage" },
  { id = "asc", label = "Ascendancy", src = "asc" },
}

local S = { tab = TABS[1], items = {}, q = "", loading = false, error = false, cache = {} }
local body_el = nil

local function esc(s)
  return (tostring(s):gsub("&", "&amp;"):gsub("<", "&lt;"):gsub(">", "&gt;"):gsub('"', "&quot;"))
end
local function jstr(v) if v == nil or v == js.null then return nil end return tostring(v) end
local function jnum(v) if v == nil or v == js.null then return nil end return tonumber(v) end
local function q(sel) return body_el and body_el:querySelector(sel) or js.null end

local function render_list()
  local el = q("#char-list")
  if el == js.null then return end
  if S.loading then el.innerHTML = '<div class="xdb-state">Loading…</div>' return end
  if S.error then el.innerHTML = '<div class="xdb-state">Couldn\'t load this data.</div>' return end
  local ql = S.q:lower()
  local parts, shown = {}, 0
  for _, it in ipairs(S.items) do
    if ql == "" or it.name:lower():find(ql, 1, true) or it.plain:lower():find(ql, 1, true) or (it.sub and it.sub:lower():find(ql, 1, true)) then
      shown = shown + 1
      local tags = ""
      if it.tags and #it.tags > 0 then
        local tg = {}
        for _, t in ipairs(it.tags) do tg[#tg + 1] = '<span class="xdb-tag">' .. esc(t) .. '</span>' end
        tags = '<div class="xdb-tags" style="padding-left:0">' .. table.concat(tg) .. '</div>'
      end
      parts[#parts + 1] = table.concat({
        '<div class="craft-item">',
        '<div class="craft-name">', esc(it.name), it.sub and (' <span class="char-sub">' .. esc(it.sub) .. '</span>') or '', '</div>',
        tags,
        (it.effect ~= "" and ('<div class="craft-effect">' .. it.effect .. '</div>') or ''),
        '</div>',
      })
    end
  end
  if shown == 0 then el.innerHTML = '<div class="xdb-state">Nothing matches.</div>' return end
  el.innerHTML = '<div class="xdb-count">' .. shown .. ' entries</div>' .. table.concat(parts)
end

local function build_items()
  S.items = {}
  local tab = S.tab
  if tab.src == "gems" then
    local g = S.cache.gems
    if g == nil or g == js.null then return end
    local arr = g[tab.key]
    if arr == nil or arr == js.null then return end
    for i = 0, (jnum(arr.length) or 0) - 1 do
      local it = arr[i]
      if it ~= nil and it ~= js.null then
        local name = jstr(it.name) or ""
        if name ~= "" and not name:find("%[DNT%]") then
          local tags, ta = {}, it.tags
          if ta ~= nil and ta ~= js.null then
            for j = 0, (jnum(ta.length) or 0) - 1 do tags[#tags + 1] = jstr(ta[j]) or "" end
          end
          local desc = jstr(it.description) or ""
          S.items[#S.items + 1] = { name = name, sub = nil, tags = tags, effect = esc(desc), plain = desc }
        end
      end
    end
  else
    local a = S.cache.asc
    if a == nil or a == js.null then return end
    local arr = a.passives
    if arr == nil or arr == js.null then return end
    for i = 0, (jnum(arr.length) or 0) - 1 do
      local it = arr[i]
      if it ~= nil and it ~= js.null then
        local name = jstr(it.name) or "?"
        local asc = jstr(it.ascendancy) or ""
        local char = jstr(it.character) or ""
        local sub = (asc ~= "" and asc or "") .. ((asc ~= "" and char ~= "") and " · " or "") .. (char ~= "" and char or "")
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
        S.items[#S.items + 1] = { name = name, sub = sub, tags = nil, effect = eff, plain = (sub .. " " .. plain):gsub("<[^>]->", "") }
      end
    end
  end
end

local function show_current()
  build_items()
  render_list()
end

local function load_tab(tab)
  S.tab = tab
  local need = (tab.src == "gems") and (S.cache.gems == nil) or (tab.src == "asc" and S.cache.asc == nil)
  if not need then show_current() return end
  S.loading = true
  S.error = false
  render_list()
  local file = (tab.src == "gems") and "Gems.json" or "Ascendancy_Passives.json"
  window.ecJson:get(DATA .. file, function(_, data)
    S.loading = false
    if data == nil or data == js.null then S.error = true; render_list(); return end
    if tab.src == "gems" then S.cache.gems = data.gems else S.cache.asc = data end
    show_current()
  end)
end

local function render_tabs()
  local el = q("#char-tabs")
  if el == js.null then return end
  local parts = {}
  for _, t in ipairs(TABS) do
    parts[#parts + 1] = '<button class="xdb-sidebtn' .. (t.id == S.tab.id and " active" or "") .. '" data-tab="' .. t.id .. '">' .. t.label .. '</button>'
  end
  el.innerHTML = table.concat(parts)
  ui.each(el, "[data-tab]", function(b)
    ui.on(b, "click", function()
      local id = ui.attr(b, "data-tab")
      if id == S.tab.id then return end
      for _, t in ipairs(TABS) do if t.id == id then
        S.q = ""
        local si = q("#char-search"); if si ~= js.null then si.value = "" end
        render_tabs()
        load_tab(t)
      end end
    end)
  end)
end

local function mount(body)
  body_el = body
  body.innerHTML = table.concat({
    '<div class="xdb-wrap">',
    '<div id="char-tabs" class="xdb-sides" style="flex-wrap:wrap"></div>',
    '<div class="mkt-searchrow"><i class="bi bi-search"></i><input id="char-search" class="mkt-search" placeholder="Search gems, ascendancy passives…"></div>',
    '<div id="char-list" class="xdb-list"></div>',
    '</div>',
  })
  local si = body:querySelector("#char-search")
  ui.on(si, "input", function() S.q = tostring(si.value) render_list() end)
  render_tabs()
  load_tab(S.tab)
end

codex.registry.register{
  id = "xile-character",
  name = "Character",
  icon = "bi-person-badge",
  order = 33,
  status = "alpha",
  width = 560,
  desc = "PoE2 gems (skill / support / spirit / lineage) and every ascendancy passive — searchable.",
  mount = mount,
}

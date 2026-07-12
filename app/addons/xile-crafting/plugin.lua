-- Crafting — the PoE2 crafting reference from the bundled XileHUD dataset
-- (GPL-3.0, see ATTRIBUTION.md): currencies, essences, omens, catalysts and
-- runes, each with its exact effect. Tabbed + searchable. Fresh Lua view over
-- the same data the old app used.
local js = require "js"
local window = js.global
local ui = codex.ui
local DATA = "../../media/xilehud/poe2/rise-of-the-abyssal/"

local CATS = {
  { id = "Currency", file = "Currency.json", key = "currency", mods = "explicitMods" },
  { id = "Essences", file = "Essences.json", key = "essences", mods = "explicitMods" },
  { id = "Omens", file = "Omens.json", key = "omens", mods = "explicitMods" },
  { id = "Catalysts", file = "Catalysts.json", key = "catalysts", mods = "explicitMods" },
  { id = "Runes", file = "Augments.json", key = "augments", mods = "implicitMods" },
}

local S = { cat = CATS[1], items = {}, q = "", loading = false, error = false }
local body_el = nil

local function esc(s)
  return (tostring(s):gsub("&", "&amp;"):gsub("<", "&lt;"):gsub(">", "&gt;"):gsub('"', "&quot;"))
end
local function jstr(v) if v == nil or v == js.null then return nil end return tostring(v) end
local function jnum(v) if v == nil or v == js.null then return nil end return tonumber(v) end
local function q(sel) return body_el and body_el:querySelector(sel) or js.null end
local function pretty(slug) return (tostring(slug):gsub("^/%a%a/", ""):gsub("_", " ")) end

local function render_list()
  local el = q("#craft-list")
  if el == js.null then return end
  if S.loading then el.innerHTML = '<div class="xdb-state">Loading…</div>' return end
  if S.error then el.innerHTML = '<div class="xdb-state">Couldn\'t load this reference.</div>' return end
  local ql = S.q:lower()
  local parts, shown = {}, 0
  for _, it in ipairs(S.items) do
    if ql == "" or it.name:lower():find(ql, 1, true) or it.plain:lower():find(ql, 1, true) then
      shown = shown + 1
      parts[#parts + 1] = table.concat({
        '<div class="craft-item">',
        '<div class="craft-name">', esc(it.name), it.req and (' <span class="craft-req">Lv ' .. string.format("%d", it.req) .. '</span>') or '', '</div>',
        '<div class="craft-effect">', it.effect, '</div>',
        '</div>',
      })
    end
  end
  if shown == 0 then el.innerHTML = '<div class="xdb-state">Nothing matches.</div>' return end
  el.innerHTML = '<div class="xdb-count">' .. shown .. ' ' .. S.cat.id:lower() .. '</div>' .. table.concat(parts)
end

local function load_cat(cat)
  S.cat = cat
  S.loading = true
  S.error = false
  S.items = {}
  render_list()
  window.ecJson:get(DATA .. cat.file, function(_, data)
    S.loading = false
    if data == nil or data == js.null then S.error = true; render_list(); return end
    local arr = data[cat.key]
    local list = {}
    if arr ~= nil and arr ~= js.null then
      for i = 0, (jnum(arr.length) or 0) - 1 do
        local it = arr[i]
        if it ~= nil and it ~= js.null then
          local name = jstr(it.name)
          if not name or name == "" then name = pretty(jstr(it.slug) or "?") end
          -- effect: join the mod lines (they carry safe bundled HTML like <br>, <span class="mod-value">)
          local mods, effHtml, plain = it[cat.mods], "", ""
          if mods ~= nil and mods ~= js.null then
            local lines = {}
            for j = 0, (jnum(mods.length) or 0) - 1 do
              local ln = jstr(mods[j]) or ""
              lines[#lines + 1] = ln
              plain = plain .. " " .. ln
            end
            effHtml = table.concat(lines, "<br>")
          end
          list[#list + 1] = { name = name, effect = effHtml, plain = plain:gsub("<[^>]->", ""), req = jnum(it.level_req) }
        end
      end
    end
    S.items = list
    render_list()
  end)
end

local function render_tabs()
  local el = q("#craft-tabs")
  if el == js.null then return end
  local parts = {}
  for _, c in ipairs(CATS) do
    parts[#parts + 1] = '<button class="xdb-sidebtn' .. (c.id == S.cat.id and " active" or "") .. '" data-cat="' .. c.id .. '">' .. c.id .. '</button>'
  end
  el.innerHTML = table.concat(parts)
  ui.each(el, "[data-cat]", function(b)
    ui.on(b, "click", function()
      local id = ui.attr(b, "data-cat")
      if id == S.cat.id then return end
      for _, c in ipairs(CATS) do if c.id == id then
        S.q = ""
        local si = q("#craft-search"); if si ~= js.null then si.value = "" end
        render_tabs()
        load_cat(c)
      end end
    end)
  end)
end

local function mount(body)
  body_el = body
  body.innerHTML = table.concat({
    '<div class="xdb-wrap">',
    '<div id="craft-tabs" class="xdb-sides" style="flex-wrap:wrap"></div>',
    '<div class="mkt-searchrow"><i class="bi bi-search"></i><input id="craft-search" class="mkt-search" placeholder="Search the crafting reference…"></div>',
    '<div id="craft-list" class="xdb-list"></div>',
    '</div>',
  })
  local si = body:querySelector("#craft-search")
  ui.on(si, "input", function() S.q = tostring(si.value) render_list() end)
  render_tabs()
  load_cat(S.cat)
end

codex.registry.register{
  id = "xile-crafting",
  name = "Crafting",
  icon = "bi-hammer",
  order = 32,
  status = "alpha",
  width = 560,
  desc = "The PoE2 crafting reference — currencies, essences, omens, catalysts and runes with exact effects.",
  mount = mount,
}

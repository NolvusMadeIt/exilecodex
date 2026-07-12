-- Modifiers — every PoE2 modifier by item category, from the bundled XileHUD
-- dataset (GPL-3.0, see ATTRIBUTION.md). Pick a category, filter by prefix/
-- suffix and search; each mod expands to its full tier ladder (name / level /
-- values). Fresh Lua view over the same data the old app used.
local js = require "js"
local window = js.global
local ui = codex.ui
local DATA = "../../media/xilehud/poe2/rise-of-the-abyssal/"

local GROUPS = {
  { label = "Jewellery", cats = { "Amulets", "Rings", "Belts", "Talismans", "Charms" } },
  { label = "Weapons", cats = {
    "Bows", "Crossbows", "Wands", "Sceptres", "Staves", "Quarterstaves", "Spears",
    "Claws", "Daggers", "Flails", "One_Hand_Axes", "One_Hand_Maces", "One_Hand_Swords",
    "Two_Hand_Axes", "Two_Hand_Maces", "Two_Hand_Swords", "Foci", "Traps" } },
  { label = "Armour", cats = {
    "Body_Armours_str", "Body_Armours_dex", "Body_Armours_int", "Body_Armours_str_dex",
    "Body_Armours_str_int", "Body_Armours_dex_int", "Helmets_str", "Helmets_dex", "Helmets_int",
    "Helmets_str_dex", "Helmets_str_int", "Helmets_dex_int", "Gloves_str", "Gloves_dex", "Gloves_int",
    "Gloves_str_dex", "Gloves_str_int", "Gloves_dex_int", "Boots_str", "Boots_dex", "Boots_int",
    "Boots_str_dex", "Boots_str_int", "Boots_dex_int", "Shields_str", "Shields_str_dex",
    "Shields_str_int", "Bucklers", "Quivers" } },
  { label = "Flasks", cats = { "Life_Flasks", "Mana_Flasks" } },
  { label = "Jewels", cats = { "Emerald", "Ruby", "Sapphire", "Time-Lost_Emerald", "Time-Lost_Ruby", "Time-Lost_Sapphire" } },
  { label = "Waystones", cats = { "Waystones_Mid", "Waystones_Top" } },
  { label = "Tablets", cats = {
    "Precursor_Tablet", "Breach_Precursor_Tablet", "Delirium_Precursor_Tablet",
    "Expedition_Precursor_Tablet", "Ritual_Precursor_Tablet", "Abyss_Precursor_Tablet", "Overseer_Precursor_Tablet" } },
}

local S = { cat = "Amulets", mods = {}, q = "", side = "all", loading = false, error = false }
local body_el = nil

local function esc(s)
  return (tostring(s):gsub("&", "&amp;"):gsub("<", "&lt;"):gsub(">", "&gt;"):gsub('"', "&quot;"))
end
local function jstr(v) if v == nil or v == js.null then return nil end return tostring(v) end
local function jnum(v) if v == nil or v == js.null then return nil end return tonumber(v) end
local function q(sel) return body_el and body_el:querySelector(sel) or js.null end
local function pretty(c) return (tostring(c):gsub("_", " ")) end

local function render_list()
  local el = q("#mod-list")
  if el == js.null then return end
  if S.loading then el.innerHTML = '<div class="xdb-state">Loading modifiers…</div>' return end
  if S.error then el.innerHTML = '<div class="xdb-state">Couldn\'t load this category.</div>' return end
  local ql = S.q:lower()
  local shown = {}
  for _, m in ipairs(S.mods) do
    local okSide = (S.side == "all") or (m.side == S.side)
    local okQ = ql == ""
    if not okQ then
      if m.text:lower():find(ql, 1, true) or (m.family ~= "" and m.family:lower():find(ql, 1, true)) then okQ = true end
      if not okQ then for _, t in ipairs(m.tags) do if t:lower():find(ql, 1, true) then okQ = true break end end end
    end
    if okSide and okQ then shown[#shown + 1] = m end
  end
  if #shown == 0 then el.innerHTML = '<div class="xdb-state">No modifiers match.</div>' return end
  local parts = { '<div class="xdb-count">' .. #shown .. ' modifiers</div>' }
  for i, m in ipairs(shown) do
    local badge = m.side == "prefix" and "P" or (m.side == "suffix" and "S" or "?")
    local sideBadge = '<span class="xdb-side side-' .. esc(m.side) .. '">' .. badge .. '</span>'
    local tags = ""
    if #m.tags > 0 then
      local tg = {}
      for _, t in ipairs(m.tags) do tg[#tg + 1] = '<span class="xdb-tag">' .. esc(t) .. '</span>' end
      tags = '<div class="xdb-tags">' .. table.concat(tg) .. '</div>'
    end
    local tiers = {}
    for _, t in ipairs(m.tiers) do
      tiers[#tiers + 1] = '<div class="xdb-tier"><span class="xdb-tiername">' .. esc(t.name)
        .. (t.lvl and (' <span class="xdb-tierlvl">i' .. string.format("%d", t.lvl) .. '</span>') or '')
        .. '</span><span class="xdb-tiertext">' .. esc(t.text) .. '</span></div>'
    end
    local meta = (m.ilvl and ('iLvl ' .. string.format("%d", m.ilvl)) or '')
      .. (m.weight and (' &middot; ' .. string.format("%.1f%%", m.weight)) or '')
    parts[#parts + 1] = table.concat({
      '<div class="xdb-mod" data-i="', i, '">',
      '<div class="xdb-modhead">', sideBadge,
      '<span class="xdb-modtext">', esc(m.text), '</span>',
      '<span class="xdb-modmeta">', meta, '</span>',
      '<i class="bi bi-chevron-down xdb-chev"></i></div>',
      tags,
      '<div class="xdb-tiers d-none">', table.concat(tiers), '</div>',
      '</div>',
    })
  end
  el.innerHTML = table.concat(parts)
  ui.each(el, ".xdb-mod", function(card)
    ui.on(card:querySelector(".xdb-modhead"), "click", function()
      local t = card:querySelector(".xdb-tiers")
      if t ~= js.null then t.classList:toggle("d-none") end
      card.classList:toggle("open")
    end)
  end)
end

local function load_cat(cat)
  S.cat = cat
  S.loading = true
  S.error = false
  S.mods = {}
  render_list()
  window.ecJson:get(DATA .. cat .. ".json", function(_, arr)
    S.loading = false
    if arr == nil or arr == js.null then S.error = true; render_list(); return end
    local list, n = {}, jnum(arr.length) or 0
    for i = 0, n - 1 do
      local m = arr[i]
      if m ~= nil and m ~= js.null then
        local tiers, ta = {}, m.tiers
        if ta ~= nil and ta ~= js.null then
          for j = 0, (jnum(ta.length) or 0) - 1 do
            local t = ta[j]
            tiers[#tiers + 1] = { name = jstr(t.tier_name) or "", lvl = jnum(t.tier_level), text = jstr(t.text_plain) or "" }
          end
        end
        local tags, ga = {}, m.tags
        if ga ~= nil and ga ~= js.null then
          for j = 0, (jnum(ga.length) or 0) - 1 do tags[#tags + 1] = jstr(ga[j]) or "" end
        end
        list[#list + 1] = {
          side = jstr(m.side) or "", text = jstr(m.text_plain) or "", family = jstr(m.family) or "",
          ilvl = jnum(m.ilvl), weight = jnum(m.weight_pct), tags = tags, tiers = tiers,
        }
      end
    end
    S.mods = list
    render_list()
  end)
end

local function mount(body)
  body_el = body
  local opts = {}
  for _, g in ipairs(GROUPS) do
    opts[#opts + 1] = '<optgroup label="' .. esc(g.label) .. '">'
    for _, c in ipairs(g.cats) do
      opts[#opts + 1] = '<option value="' .. esc(c) .. '"' .. (c == S.cat and " selected" or "") .. '>' .. esc(pretty(c)) .. '</option>'
    end
    opts[#opts + 1] = '</optgroup>'
  end
  body.innerHTML = table.concat({
    '<div class="xdb-wrap">',
    '<div class="xdb-controls">',
    '<select id="mod-cat" class="form-select form-select-sm" style="max-width:230px">', table.concat(opts), '</select>',
    '<div class="xdb-sides">',
    '<button class="xdb-sidebtn active" data-side="all">All</button>',
    '<button class="xdb-sidebtn" data-side="prefix">Prefix</button>',
    '<button class="xdb-sidebtn" data-side="suffix">Suffix</button>',
    '</div></div>',
    '<div class="mkt-searchrow"><i class="bi bi-search"></i><input id="mod-search" class="mkt-search" placeholder="Search modifiers, tags…"></div>',
    '<div id="mod-list" class="xdb-list"></div>',
    '</div>',
  })
  local sel = body:querySelector("#mod-cat")
  ui.on(sel, "change", function() load_cat(tostring(sel.value)) end)
  local si = body:querySelector("#mod-search")
  ui.on(si, "input", function() S.q = tostring(si.value) render_list() end)
  ui.each(body, ".xdb-sidebtn", function(b)
    ui.on(b, "click", function()
      S.side = ui.attr(b, "data-side")
      ui.each(body, ".xdb-sidebtn", function(x)
        if ui.attr(x, "data-side") == S.side then x.classList:add("active") else x.classList:remove("active") end
      end)
      render_list()
    end)
  end)
  load_cat(S.cat)
end

codex.registry.register{
  id = "xile-modifiers",
  name = "Modifiers",
  icon = "bi-sliders2-vertical",
  order = 31,
  status = "alpha",
  width = 600,
  desc = "Every PoE2 modifier by item category — prefix/suffix, tiers, ilvl and weights, searchable.",
  mount = mount,
}

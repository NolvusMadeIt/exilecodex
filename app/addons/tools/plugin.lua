-- Map Regex — build a Waystone search regex for the in-game stash/search box.
-- Toggle the mods you want to highlight; it composes an OR regex from short,
-- unambiguous tokens and shows the character count (PoE2's search box caps at
-- ~50). Presets are saved on this device (localStorage). Self-contained.
local ui = codex.ui

-- Curated waystone mod tokens: { label, token }. Tokens are safe lowercase
-- substrings that match the intended mod line in-game.
local GROUPS = {
  { label = "Loot & rewards", mods = {
    { l = "Item Rarity", t = "rarity" },
    { l = "Pack Size", t = "pack siz" },
    { l = "More Waystones", t = "waystones fo" },
    { l = "Gold", t = "gold" },
    { l = "Rare/Magic Waystones", t = "aystones in" },
  } },
  { label = "Monster density", mods = {
    { l = "Magic Monsters", t = "magic mons" },
    { l = "Rare Monsters", t = "rare mons" },
    { l = "Additional Packs", t = "additional pack" },
    { l = "Pack of Beasts", t = "beasts" },
    { l = "Vaal Monsters", t = "vaal mon" },
  } },
  { label = "Exclude — hide these dangerous mods (! prefix)", mode = "exclude", mods = {
    { l = "Extra Fire Dmg", t = "extra fire" },
    { l = "Extra Cold Dmg", t = "extra cold" },
    { l = "Extra Lightning Dmg", t = "extra lightn" },
    { l = "More Monster Life", t = "monster life" },
    { l = "Monster Damage", t = "monster dam" },
    { l = "Less Recovery", t = "less recover" },
    { l = "Monster Speed", t = "monster.*speed" },
  } },
}

local selected = {}  -- token -> true
local body_el = nil

local function esc(s)
  return (tostring(s):gsub("&", "&amp;"):gsub("<", "&lt;"):gsub(">", "&gt;"):gsub('"', "&quot;"))
end
local function q(sel) return body_el and body_el:querySelector(sel) or nil end

local function load_presets()
  return codex.json.decode(ui.store_get("ec.mapregex") or "[]") or {}
end
local function save_presets(list) ui.store_set("ec.mapregex", codex.json.encode(list)) end

local function build_regex()
  -- include groups → "a|b" (highlight), exclude groups → !"c|d" (hide).
  -- Multiple quoted groups AND together in-game; | is OR; ! excludes.
  local inc, exc = {}, {}
  for _, g in ipairs(GROUPS) do
    for _, m in ipairs(g.mods) do
      if selected[m.t] then
        if g.mode == "exclude" then exc[#exc + 1] = m.t else inc[#inc + 1] = m.t end
      end
    end
  end
  local parts = {}
  if #inc > 0 then parts[#parts + 1] = '"' .. table.concat(inc, "|") .. '"' end
  if #exc > 0 then parts[#parts + 1] = '!"' .. table.concat(exc, "|") .. '"' end
  return table.concat(parts, " ")
end

local function render_output()
  local out = q("#mr-out")
  if not out then return end
  local rx = build_regex()
  local len = #rx
  local warn = (len > 250) and ' <span class="mr-warn">' .. len .. '/250 — too long</span>' or (' <span class="mr-len">' .. len .. '/250</span>')
  out.innerHTML = (rx == "" and '<span class="mr-empty">Pick mods below to build a regex…</span>' or ('<code>' .. esc(rx) .. '</code>')) .. warn
end

local render_presets  -- forward

local function render_chips()
  local el = q("#mr-chips")
  if not el then return end
  local parts = {}
  for _, g in ipairs(GROUPS) do
    parts[#parts + 1] = '<div class="mr-group"><div class="mr-grouplbl">' .. esc(g.label) .. '</div><div class="mr-chiprow">'
    for _, m in ipairs(g.mods) do
      local on = selected[m.t] and " on" or ""
      parts[#parts + 1] = '<button class="mr-chip' .. on .. '" data-tok="' .. esc(m.t) .. '">' .. esc(m.l) .. '</button>'
    end
    parts[#parts + 1] = '</div></div>'
  end
  el.innerHTML = table.concat(parts)
  ui.each(el, ".mr-chip", function(b)
    ui.on(b, "click", function()
      local t = ui.attr(b, "data-tok")
      if selected[t] then selected[t] = nil else selected[t] = true end
      b.classList:toggle("on")
      render_output()
    end)
  end)
end

render_presets = function()
  local el = q("#mr-presets")
  if not el then return end
  local list = load_presets()
  if #list == 0 then el.innerHTML = '<span class="mr-empty">No saved presets yet.</span>' return end
  local parts = {}
  for i, p in ipairs(list) do
    parts[#parts + 1] = '<span class="mr-preset"><button data-load="' .. i .. '">' .. esc(p.name or "preset") .. '</button>'
      .. '<i class="bi bi-x" data-del="' .. i .. '" title="Delete"></i></span>'
  end
  el.innerHTML = table.concat(parts)
  ui.each(el, "[data-load]", function(b)
    ui.on(b, "click", function()
      local p = load_presets()[tonumber(ui.attr(b, "data-load"))]
      if not p then return end
      selected = {}
      for _, t in ipairs(p.toks or {}) do selected[t] = true end
      render_chips()
      render_output()
    end)
  end)
  ui.each(el, "[data-del]", function(b)
    ui.on(b, "click", function()
      local l = load_presets()
      table.remove(l, tonumber(ui.attr(b, "data-del")))
      save_presets(l)
      render_presets()
    end)
  end)
end

local function mount(body)
  body_el = body
  body.innerHTML = table.concat({
    '<div class="mr-wrap">',
    '<div class="mr-outbox"><div id="mr-out" class="mr-outtext"></div>',
    '<button id="mr-copy" class="btn btn-ec btn-sm"><i class="bi bi-clipboard"></i> Copy</button></div>',
    '<div class="mr-hint">Paste into the in-game Waystone stash / map device search to highlight these mods.</div>',
    '<div class="mr-saverow"><input id="mr-name" class="form-control form-control-sm" placeholder="Preset name" style="max-width:180px">',
    '<button id="mr-save" class="btn btn-ec-ghost btn-sm">Save preset</button>',
    '<button id="mr-clear" class="btn btn-ec-ghost btn-sm">Clear</button></div>',
    '<div id="mr-presets" class="mr-presets"></div>',
    '<div id="mr-chips"></div>',
    '</div>',
  })
  render_chips()
  render_output()
  render_presets()

  ui.on(body:querySelector("#mr-copy"), "click", function()
    local rx = build_regex()
    if rx == "" then return end
    local nav = ui.window.navigator
    if nav and nav.clipboard then nav.clipboard:writeText(rx) end
    local btn = body:querySelector("#mr-copy")
    btn.innerHTML = '<i class="bi bi-check2"></i> Copied'
    ui.window:setTimeout(function() btn.innerHTML = '<i class="bi bi-clipboard"></i> Copy' end, 1400)
  end)
  ui.on(body:querySelector("#mr-clear"), "click", function()
    selected = {}
    render_chips()
    render_output()
  end)
  ui.on(body:querySelector("#mr-save"), "click", function()
    local name = tostring(body:querySelector("#mr-name").value)
    if name == "" then return end
    local toks = {}
    for t in pairs(selected) do toks[#toks + 1] = t end
    if #toks == 0 then return end
    local l = load_presets()
    l[#l + 1] = { name = name, toks = toks }
    save_presets(l)
    body:querySelector("#mr-name").value = ""
    render_presets()
  end)
end

codex.registry.register{
  id = "tools",
  name = "Map Regex",
  icon = "bi-braces",
  order = 34,
  status = "alpha",
  width = 500,
  wiki = "tools/wiki/index.html",
  desc = "Build a Waystone search regex — toggle the mods you want, copy it into the in-game search.",
  mount = mount,
}

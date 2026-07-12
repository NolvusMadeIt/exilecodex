-- Build Planner — a PoE2 build planner structured like Path of Building Community (pob.cool/poe2).
-- PoB layout: a row of main tabs (Tree · Skills · Items · Calcs · Config · Notes · Import/Export),
-- an always-on LEFT STATS sidebar (PoB's signature live calc readout), a build-meta header
-- (Level · Class · Ascendancy · passive/ascendancy points), and the active tab's content on the right.
--
-- Passive-tree DATA is the PoB-PoE2 fork's own tree.json (Lua-native project — same as us), vendored
-- to app/media/tree/0_5/tree.json. Node icons are GGG DDS art (Art/2DArt/SkillIcons/*.dds); rendering
-- the visual tree with web images is the next phase. This commit is the PoB-style shell + wired data.
local js = require "js"
local window = js.global
local ui = codex.ui
local document = js.global.document

local CLASSES = {
  { name = "Warrior",   attr = "STR",     asc = { "Titan", "Warbringer", "Smith of Kitava" } },
  { name = "Witch",     attr = "INT",     asc = { "Infernalist", "Blood Mage", "Lich" } },
  { name = "Ranger",    attr = "DEX",     asc = { "Deadeye", "Pathfinder" } },
  { name = "Monk",      attr = "DEX/INT", asc = { "Invoker", "Acolyte of Chayula" } },
  { name = "Mercenary", attr = "STR/DEX", asc = { "Witchhunter", "Gemling Legionnaire" } },
  { name = "Sorceress", attr = "INT",     asc = { "Stormweaver", "Chronomancer" } },
  { name = "Huntress",  attr = "DEX",     asc = { "Amazon", "Ritualist" } },
  { name = "Druid",     attr = "STR/INT", asc = {} },
}

local TABS = {
  { id = "tree",   label = "Tree" },
  { id = "skills", label = "Skills" },
  { id = "items",  label = "Items" },
  { id = "calcs",  label = "Calcs" },
  { id = "config", label = "Config" },
  { id = "notes",  label = "Notes" },
  { id = "io",     label = "Import / Export" },
}

-- PoE2 equipment slots, in Path of Building's exact order (Items tab is a list of per-slot dropdowns,
-- like pob.cool — Weapon Set I/II swaps the two weapon slots).
local ITEM_SLOTS = {
  "Weapon 1", "Weapon 2", "Helmet", "Body Armour", "Gloves", "Boots",
  "Amulet", "Ring 1", "Ring 2", "Belt", "Charm 1", "Charm 2", "Charm 3", "Flask 1", "Flask 2",
}

local TREE_URL = "../../media/tree/0_5/tree.json"

local B = { class = "Warrior", asc = "", level = 1, tab = "tree", notes = "", code = "" }
local TREE = nil        -- ecTree canvas renderer handle (Tree tab)
local body = nil

local function esc(s)
  return (tostring(s):gsub("&", "&amp;"):gsub("<", "&lt;"):gsub(">", "&gt;"):gsub('"', "&quot;"))
end
local function q(sel) return body and body:querySelector(sel) or js.null end
local function class_def(name)
  for _, c in ipairs(CLASSES) do if c.name == name then return c end end
  return CLASSES[1]
end

-- ------------------------------------------------------------ state
local function load_state()
  B.class = ui.store_get("ec.buildplanner.class") or "Warrior"
  B.asc   = ui.store_get("ec.buildplanner.asc") or ""
  B.level = tonumber(ui.store_get("ec.buildplanner.level")) or 1
  B.tab   = ui.store_get("ec.buildplanner.tab") or "tree"
  B.notes = ui.store_get("ec.buildplanner.notes") or ""
end
local function save(k, v) ui.store_set("ec.buildplanner." .. k, tostring(v)) end

-- ------------------------------------------------------------ left stats sidebar (PoB signature)
local function stat_row(label, val, cls)
  return '<div class="pob-stat"><span>' .. esc(label) .. '</span><b class="' .. (cls or "") .. '">' .. esc(val) .. '</b></div>'
end
local function sidebar_html()
  local life = 40 + 12 * B.level
  local mana = 40 + 6 * B.level
  return table.concat({
    '<div class="pob-side">',
      '<div class="pob-side-skill"><label>Main Skill</label><select class="bp-sel"><option>&lt;No skills added yet&gt;</option></select></div>',
      '<div class="pob-statgroup"><div class="pob-sg-h">Offence</div>',
        stat_row("Total DPS", "0", "n"),
        stat_row("Average Hit", "0", "n"),
        stat_row("Hit Chance", "100%", "n"),
        stat_row("Crit Chance", "5%", "n"),
      '</div>',
      '<div class="pob-statgroup"><div class="pob-sg-h">Defence</div>',
        stat_row("Total Life", tostring(life), "life"),
        stat_row("Energy Shield", "0", "es"),
        stat_row("Total Mana", tostring(mana), "mana"),
        stat_row("Total Spirit", "100", "spirit"),
        stat_row("Armour", "0", "n"),
        stat_row("Evasion", "0", "n"),
        stat_row("Fire Res", "0%", "fire"),
        stat_row("Cold Res", "0%", "cold"),
        stat_row("Lightning Res", "0%", "light"),
        stat_row("Chaos Res", "0%", "chaos"),
      '</div>',
      '<div class="pob-statgroup"><div class="pob-sg-h">Attributes</div>',
        stat_row("Strength", "0", "str"),
        stat_row("Dexterity", "0", "dex"),
        stat_row("Intelligence", "0", "int"),
      '</div>',
      '<div class="pob-side-note">Live calculation lands with the gear + tree data pass.</div>',
    '</div>',
  })
end

-- ------------------------------------------------------------ tab content
local function tab_tree()
  return table.concat({
    '<div class="pob-treebar">',
      '<span class="pob-points"><b id="pob-passivecount">0</b> / 123 <span>Passives</span></span>',
      '<span class="pob-points"><b>0</b> / 8 <span>Ascendancy</span></span>',
      '<span class="mx-spacer"></span>',
      '<input class="bp-sel pob-treesearch" id="pob-treesearch" placeholder="Search nodes…">',
      '<button class="bp-btn" data-act="tree-reset" title="Deallocate everything"><i class="bi bi-arrow-counterclockwise"></i> Reset</button>',
    '</div>',
    '<div class="pob-treehost" id="pob-treehost"></div>',
  })
end

local function tab_skills()
  return table.concat({
    '<div class="pob-panel-note">Socket groups — a main active/spirit skill gem plus its support gems (PoE2 sockets supports into the skill).</div>',
    '<div id="pob-skills" class="mx-skills"><div class="bp-empty">No socket groups yet.</div></div>',
    '<button class="bp-btn bp-btn-gold mx-add" data-act="add-skill"><i class="bi bi-plus-lg"></i> Add socket group</button>',
  })
end

local function tab_items()
  local rows = {}
  for _, s in ipairs(ITEM_SLOTS) do
    rows[#rows + 1] = '<div class="pob-slotrow"><span class="pob-slotlbl">' .. esc(s)
      .. '</span><select class="bp-sel pob-slotsel" data-slot="' .. esc(s) .. '"><option>None</option></select></div>'
  end
  return table.concat({
    '<div class="pob-itemshead">',
      '<label class="mx-hl">Item Set</label><select class="bp-sel pob-itemset"><option>Default</option></select>',
      '<span class="mx-spacer"></span>',
      '<label class="mx-hl">Weapon Set</label>',
      '<div class="pob-wset"><button class="pob-ws on" data-ws="1">I</button><button class="pob-ws" data-ws="2">II</button></div>',
    '</div>',
    '<div class="pob-slots">', table.concat(rows), '</div>',
    '<div class="pob-itembtns">',
      '<button class="bp-btn bp-btn-gold" data-act="import-uniques"><i class="bi bi-box-arrow-in-down"></i> Import from Uniques</button>',
      '<button class="bp-btn" data-act="craft-item"><i class="bi bi-hammer"></i> Craft item</button>',
    '</div>',
    '<div class="pob-panel-note">Slot dropdowns fill from PoB / RePoE item data (bases, uniques + icons) in the data pass. Weapon Set I / II swaps the two weapon slots (PoE2 weapon specialisation).</div>',
  })
end

local function tab_calcs()
  local sec = function(t) return '<div class="pob-calc-sec"><div class="pob-calc-h">' .. t .. '</div><div class="bp-empty">Breakdown appears once the calc engine is wired.</div></div>' end
  return '<div class="pob-calcs">' .. sec("Offence") .. sec("Defence") .. sec("Attributes &amp; Resistances") .. '</div>'
end

local function cfg_check(label)
  return '<label class="pob-cfgrow"><input type="checkbox"><span>' .. esc(label) .. '</span></label>'
end
local function cfg_sec(title, inner)
  return '<div class="pob-cfgsec"><div class="pob-cfgsec-h">' .. esc(title) .. '</div><div class="pob-cfgsec-b">' .. inner .. '</div></div>'
end
-- Config tab mirrors PoB's grouped calc toggles (General / When In Combat / For Effective DPS / Quest
-- Rewards). Static for now — each feeds the calc engine in the data pass.
local function tab_config()
  local general = table.concat({
    '<label class="pob-cfgrow wide"><span>Elemental Resistance penalty</span><select class="bp-sel"><option>None — 0%</option><option>Cruel — -30%</option><option selected>Endgame — -60%</option></select></label>',
    '<label class="pob-cfgrow wide"><span>Ailment calculation mode</span><select class="bp-sel"><option selected>Average</option><option>Lucky</option><option>Unlucky</option></select></label>',
    '<label class="pob-cfgrow wide"><span>Enemy level</span><input type="number" class="bp-num" min="1" max="100" value="82"></label>',
  })
  local combat = table.concat({
    cfg_check("Do you use Power Charges?"), cfg_check("Do you use Frenzy Charges?"),
    cfg_check("Do you use Endurance Charges?"), cfg_check("Are you Sprinting?"),
    cfg_check("Do you use Onslaught?"), cfg_check("Do you have Arcane Surge?"),
    cfg_check("Are you Fortified?"), cfg_check("Are you on Consecrated Ground?"),
  })
  local dps = table.concat({
    cfg_check("Is the enemy Blinded?"), cfg_check("Is the enemy Burning?"),
    cfg_check("Is the enemy Ignited?"), cfg_check("Is the enemy Chilled?"),
    cfg_check("Is the enemy Frozen?"), cfg_check("Is the enemy Shocked?"),
    cfg_check("Is the enemy Intimidated?"), cfg_check("Is the enemy Crushed?"),
  })
  local quests = table.concat({
    cfg_check("Act 1 — Clearfell"), cfg_check("Act 1 — Ogham Manor"),
    cfg_check("Act 2 — Valley of the Titans"), cfg_check("Act 3 — Azak Bog"),
    cfg_check("Act 3 — Jiquani's Machinarium"), cfg_check("Act 4 — Eye of Hinekora"),
  })
  return table.concat({
    '<div class="pob-cfgtop"><label class="mx-hl">Config set</label><select class="bp-sel"><option>Default</option></select></div>',
    '<div class="pob-cfg">',
      cfg_sec("General", general),
      cfg_sec("When In Combat", combat),
      cfg_sec("For Effective DPS", dps),
      cfg_sec("Quest Rewards", quests),
    '</div>',
  })
end

local function tab_notes()
  return '<textarea id="bp-notes" class="bp-notes" placeholder="Build notes…">' .. esc(B.notes) .. '</textarea>'
end

local function tab_io()
  return table.concat({
    '<div class="pob-io">',
      '<div class="pob-io-row">',
        '<button class="bp-btn bp-btn-gold" data-act="export"><i class="bi bi-box-arrow-up"></i> Generate code</button>',
        '<button class="bp-btn" data-act="import"><i class="bi bi-box-arrow-in-down"></i> Import code</button>',
      '</div>',
      '<textarea id="bp-code" class="bp-code" placeholder="Build code appears here on Generate; paste one and Import.">', esc(B.code), '</textarea>',
    '</div>',
  })
end

local TAB_RENDER = {
  tree = tab_tree, skills = tab_skills, items = tab_items, calcs = tab_calcs,
  config = tab_config, notes = tab_notes, io = tab_io,
}

-- ------------------------------------------------------------ render
-- Mount the canvas tree renderer into the Tree tab's host and route its point count to the header.
local function mount_tree()
  local host = q("#pob-treehost"); if host == js.null then return end
  local et = window.ecTree
  if et == nil or et == js.null then host.innerHTML = '<div class="bp-empty">Tree renderer unavailable.</div>'; return end
  -- pass the selected ascendancy + the class's full ascendancy list (for background art)
  local c = class_def(B.class)
  local ascList = {}
  for _, a in ipairs(c.asc) do if a ~= "" then ascList[#ascList + 1] = '"' .. esc(a) .. '"' end end
  local opts = '{"ascendancy":"' .. esc(B.asc) .. '","ascendancies":[' .. table.concat(ascList, ",") .. ']}'
  TREE = et:mount(host, TREE_URL, opts, function(_, n)
    local cc = q("#pob-passivecount"); if cc ~= js.null then cc.textContent = string.format("%d", n) end
  end)
end

local function render_content()
  if TREE then TREE:dispose(); TREE = nil end
  local el = q("#pob-content"); if el == js.null then return end
  el.innerHTML = (TAB_RENDER[B.tab] or tab_tree)()
  if B.tab == "tree" then mount_tree() end
end

local function header_html()
  local c = class_def(B.class)
  local classopts, ascopts = {}, { '<option value="">Ascendancy…</option>' }
  for _, cl in ipairs(CLASSES) do
    classopts[#classopts + 1] = '<option value="' .. esc(cl.name) .. '"' .. (cl.name == B.class and ' selected' or '') .. '>' .. esc(cl.name) .. '</option>'
  end
  for _, a in ipairs(c.asc) do
    ascopts[#ascopts + 1] = '<option value="' .. esc(a) .. '"' .. (a == B.asc and ' selected' or '') .. '>' .. esc(a) .. '</option>'
  end
  local tabs = {}
  for _, t in ipairs(TABS) do
    tabs[#tabs + 1] = '<button class="pob-tab' .. (t.id == B.tab and ' on' or '') .. '" data-tab="' .. t.id .. '">' .. esc(t.label) .. '</button>'
  end
  return table.concat({
    '<div class="pob-top">',
      '<div class="pob-tabs">', table.concat(tabs), '</div>',
      '<span class="mx-spacer"></span>',
      '<label class="mx-hl">Lvl</label><input type="number" id="bp-level" class="bp-num mx-hnum" min="1" max="100" value="', tostring(B.level), '">',
      '<select id="bp-class" class="bp-sel mx-hsel">', table.concat(classopts), '</select>',
      '<select id="bp-asc" class="bp-sel mx-hsel">', table.concat(ascopts), '</select>',
      '<span class="mx-attr">', esc(c.attr), '</span>',
    '</div>',
  })
end

local function render()
  if not body then return end
  body.innerHTML = table.concat({
    '<div class="pob-root">',
      header_html(),
      '<div class="pob-body">',
        sidebar_html(),
        '<div class="pob-content" id="pob-content"></div>',
      '</div>',
    '</div>',
  })
  render_content()
end

-- ------------------------------------------------------------ dynamic + wiring
local function refresh_header()
  local head = q(".pob-top")
  if head ~= js.null then
    local tmp = document:createElement("div"); tmp.innerHTML = header_html()
    head:replaceWith(tmp.firstChild)
  end
end

local function add_skill_group()
  local host = q("#pob-skills"); if host == js.null then return end
  local empty = host:querySelector(".bp-empty"); if empty ~= js.null then empty:remove() end
  local g = document:createElement("div"); g.className = "bp-group mx-skillrow"
  g.innerHTML = '<div class="bp-gemslot bp-gemslot-skill" title="Skill gem"><i class="bi bi-plus"></i></div>'
    .. '<div class="bp-gemslot" title="Support"><i class="bi bi-plus"></i></div>'
    .. '<div class="bp-gemslot" title="Support"><i class="bi bi-plus"></i></div>'
    .. '<div class="bp-gemslot" title="Support"><i class="bi bi-plus"></i></div>'
    .. '<div class="bp-gemslot" title="Support"><i class="bi bi-plus"></i></div>'
    .. '<button class="bp-gem-x" title="Remove"><i class="bi bi-x"></i></button>'
  host:appendChild(g)
end

local function build_code()
  local json = table.concat({
    '{"v":1,"class":"', esc(B.class), '","asc":"', esc(B.asc), '","level":', tostring(B.level),
    ',"notes":', tostring(window.JSON:stringify(B.notes)), '}',
  })
  return tostring(window:btoa(tostring(window:encodeURIComponent(json))))
end

local function wire()
  ui.on(body, "change", function(ev)
    local t = ev.target; if t == js.null then return end
    local id = t.id
    if id == "bp-class" then B.class = t.value; B.asc = ""; save("class", B.class); save("asc", ""); refresh_header()
      if B.tab == "tree" then render_content() end   -- re-mount tree with the new class's ascendancy art
    elseif id == "bp-asc" then B.asc = t.value; save("asc", B.asc)
      if TREE then TREE:setAscendancy(B.asc) end
    elseif id == "bp-level" then B.level = tonumber(t.value) or 1; save("level", B.level)
      local s = q(".pob-side"); if s ~= js.null then local tmp = document:createElement("div"); tmp.innerHTML = sidebar_html(); s:replaceWith(tmp.firstChild) end
    end
  end)
  ui.on(body, "input", function(ev)
    local t = ev.target; if t == js.null then return end
    if t.id == "bp-notes" then B.notes = tostring(t.value); save("notes", B.notes)
    elseif t.id == "bp-code" then B.code = tostring(t.value)
    elseif t.id == "pob-treesearch" then if TREE then TREE:setSearch(t.value) end end
  end)
  ui.on(body, "click", function(ev)
    local t = ev.target; if t == js.null then return end
    -- tab switch
    local tb = t.closest and t:closest(".pob-tab") or js.null
    if tb ~= js.null then
      B.tab = ui.attr(tb, "data-tab"); save("tab", B.tab)
      ui.each(body, ".pob-tab", function(x) if ui.attr(x, "data-tab") == B.tab then x.classList:add("on") else x.classList:remove("on") end end)
      render_content(); return
    end
    -- weapon set I / II toggle (Items tab)
    local ws = (t.closest and t:closest(".pob-ws")) or js.null
    if ws ~= js.null then
      ui.each(body, ".pob-ws", function(b) if b == ws then b.classList:add("on") else b.classList:remove("on") end end)
      return
    end
    -- remove buttons
    local x = (t.closest and t:closest(".bp-gem-x")) or js.null
    if x ~= js.null then
      local row = x:closest(".mx-skillrow")
      if row ~= js.null then row:remove() end
      return
    end
    local btn = (t.closest and t:closest("[data-act]")) or js.null
    if btn == js.null then return end
    local act = ui.attr(btn, "data-act")
    if act == "add-skill" then add_skill_group()
    elseif act == "tree-reset" then if TREE then TREE:reset() end
    elseif act == "export" then local ta = q("#bp-code"); if ta ~= js.null then ta.value = build_code(); B.code = ta.value end
    elseif act == "import" then
      local ta = q("#bp-code")
      if ta ~= js.null and ta.value ~= "" then
        pcall(function()
          local o = window.JSON:parse(tostring(window:decodeURIComponent(tostring(window:atob(ta.value)))))
          if o ~= js.null then
            B.class = tostring(o["class"]); B.asc = tostring(o.asc or ""); B.level = tonumber(o.level) or 1; B.notes = tostring(o.notes or "")
            save("class", B.class); save("asc", B.asc); save("level", B.level); save("notes", B.notes)
            render(); wire()
          end
        end)
      end
    end
  end)
end

-- ------------------------------------------------------------ mount
local function mount(el)
  body = el
  el.style.display = "flex"; el.style.flexDirection = "column"
  el.style.height = "auto"; el.style.maxHeight = "none"
  load_state()
  render()
  wire()
end

local function on_close()
  if TREE then TREE:dispose(); TREE = nil end
  body = nil
end

codex.registry.register{
  id = "build-planner",
  name = "Build Planner",
  icon = "bi-diagram-3",
  order = 6,
  width = 980,
  desc = "A PoE2 build planner structured like Path of Building — Tree, Skills, Items, Calcs, Config, Notes and Import/Export with a live stats sidebar.",
  mount = mount,
  on_close = on_close,
}

-- Guide Forge — create your own guides: type steps into a form, link words to
-- images (hover/pin in the viewer), save locally, open in the guide viewer.
-- Publishing to the community runs on Supabase (community phase — the
-- connection fields already live in Settings).
local ui = codex.ui
local json = codex.json

local draft = { title = "My custom guide", steps = {} }
local links = {}   -- pending word→image links for the step being written
-- the step being typed — kept outside the DOM so re-renders never eat input
local pending = { text = "", zone = "", reward = "", tip = "", opt = false }
local body_el = nil
local on_saved_cb = nil   -- fired after a save so a host (the picker) can refresh
local initialized = false -- keep in-progress draft across re-mounts

local function esc(s)
  return (tostring(s):gsub("&", "&amp;"):gsub("<", "&lt;"):gsub(">", "&gt;"):gsub('"', "&quot;"))
end

local function trim(s)
  return (tostring(s):gsub("^%s+", ""):gsub("%s+$", ""))
end

-- Searchable dropdowns (native <datalist>): type to filter, free text still
-- allowed so the user can enter a custom zone or reward.

-- every zone from the shipped campaign route, plus common towns/hubs
local EXTRA_ZONES = {
  "Hideout", "The Ardura Caravan", "Ziggurat Encampment", "Kingsmarch", "The Ziggurat Refuge",
}
local function zone_options()
  local seen, list = {}, {}
  local function add(z) if z and z ~= "" and not seen[z] then seen[z] = true; list[#list + 1] = z end end
  local route = codex.campaign_route
  if route and route.steps then
    for _, s in ipairs(route.steps) do add(s.zone) end
  end
  for _, z in ipairs(EXTRA_ZONES) do add(z) end
  table.sort(list)
  local parts = {}
  for _, z in ipairs(list) do parts[#parts + 1] = '<option value="' .. esc(z) .. '">' end
  return table.concat(parts)
end

-- a broad menu of common PoE2 quest rewards (custom text still allowed)
local REWARDS = {
  "Permanent: +10% Cold Resistance",
  "Permanent: +10% Fire Resistance",
  "Permanent: +10% Lightning Resistance",
  "Permanent: +2 passive skill points",
  "Permanent: +2 Weapon-Set passive points",
  "Permanent: +30 Spirit",
  "Permanent: +40 maximum Spirit",
  "Permanent: +20 maximum Life",
  "Permanent: +5% maximum Life",
  "Permanent: +5% maximum Mana",
  "Permanent: +1 Charm slot",
  "Permanent: one free Unique Item",
  "Permanent: 3 tattoos (attribute or resistance each)",
  "2 Ascendancy points",
  "Uncut skill gem (level 1)",
  "Uncut skill gem (level 2)",
  "Uncut skill gem (level 3)",
  "Uncut support gem (level 1)",
  "Uncut spirit gem",
  "A free unique item",
  "Access to the Reforging Bench",
  "Currency Exchange unlocked",
}
local function reward_options()
  local parts = {}
  for _, r in ipairs(REWARDS) do parts[#parts + 1] = '<option value="' .. esc(r) .. '">' end
  return table.concat(parts)
end

-- Flatten a built (goal-based) guide into the Forge step shape so the user can
-- start a custom guide from a default one and edit it.
local function forge_steps_from_guide(g)
  local steps = {}
  for _, s in ipairs(g.steps or {}) do
    local lines, notes = {}, {}
    for _, goal in ipairs(s.goals or {}) do
      if goal.action == "note" then notes[#notes + 1] = goal.text
      else lines[#lines + 1] = goal.text end
    end
    steps[#steps + 1] = {
      text = table.concat(lines, "\n"), zone = s.zone, reward = s.reward,
      tip = (#notes > 0) and table.concat(notes, " ") or nil,
      optional = s.optional or nil, images = s.images,
    }
  end
  return steps
end

local function build_default(id)
  local g = codex.guide and codex.guide.guides and codex.guide.guides[id]
  if not g and codex.guide then
    for _, e in ipairs(codex.guide.catalog or {}) do
      if e.id == id then g = e.build() end
    end
  end
  return g
end

local function load_saved()
  return json.decode(ui.store_get("ec.myguides") or "[]") or {}
end

local function save_saved(list)
  ui.store_set("ec.myguides", json.encode(list))
end

-- open a set of steps in the guide viewer (spawns the Campaign Guide widget
-- if needed — the "smart injection" from the concepts)
local function open_in_viewer(gid, title, steps)
  local G = codex.guide.new{ id = gid, title = title }
  for _, s in ipairs(steps) do G:step(s) end
  codex.widgets.open_plugin("campaign-guide")
  codex.guide.open(gid)
end

local function preview_html(text)
  local out = esc(text)
  out = out:gsub("%[(.-)%]", '<span class="ec-imglink">%1</span>')
  return out
end

local render  -- forward declaration

local function wire(body)
  local q = function(sel) return body:querySelector(sel) end

  local title_in = q("#gf-title")
  ui.on(title_in, "change", function() draft.title = trim(title_in.value) end)

  -- live preview while typing; every field mirrors into `pending`
  local text_in = q("#gf-text")
  local prev = q("#gf-preview")
  ui.on(text_in, "input", function()
    pending.text = tostring(text_in.value)
    prev.innerHTML = preview_html(pending.text)
  end)
  local zone_in, reward_in, tip_in, opt_in = q("#gf-zone"), q("#gf-reward"), q("#gf-tip"), q("#gf-opt")
  ui.on(zone_in, "input", function() pending.zone = tostring(zone_in.value) end)
  ui.on(reward_in, "input", function() pending.reward = tostring(reward_in.value) end)
  ui.on(tip_in, "input", function() pending.tip = tostring(tip_in.value) end)
  ui.on(opt_in, "change", function() pending.opt = opt_in.checked and true or false end)

  -- add a word→image link
  ui.on(q("#gf-addlink"), "click", function()
    local word = trim(q("#gf-word").value)
    local img = trim(q("#gf-img").value)
    if word == "" or img == "" then return end
    links[#links + 1] = { word = word, img = img }
    q("#gf-word").value = ""
    q("#gf-img").value = ""
    render(body_el)
  end)
  ui.each(body, "[data-dellink]", function(chip)
    ui.on(chip, "click", function()
      table.remove(links, tonumber(ui.attr(chip, "data-dellink")))
      render(body_el)
    end)
  end)

  -- add the step
  ui.on(q("#gf-add"), "click", function()
    local text = trim(pending.text)
    if text == "" then return end
    local images = nil
    for _, l in ipairs(links) do
      if not text:find("[" .. l.word .. "]", 1, true) then
        local s, e = text:find(l.word, 1, true)
        if s then text = text:sub(1, s - 1) .. "[" .. l.word .. "]" .. text:sub(e + 1) end
      end
      images = images or {}
      images[l.word] = l.img
    end
    local zone = trim(pending.zone)
    local reward = trim(pending.reward)
    local tip = trim(pending.tip)
    draft.steps[#draft.steps + 1] = {
      text = text,
      zone = zone ~= "" and zone or nil,
      reward = reward ~= "" and reward or nil,
      tip = tip ~= "" and tip or nil,
      optional = pending.opt and true or nil,
      images = images,
    }
    links = {}
    pending = { text = "", zone = "", reward = "", tip = "", opt = false }
    render(body_el)
  end)

  ui.each(body, "[data-delstep]", function(x)
    ui.on(x, "click", function()
      table.remove(draft.steps, tonumber(ui.attr(x, "data-delstep")))
      render(body_el)
    end)
  end)

  ui.on(q("#gf-save"), "click", function()
    if #draft.steps == 0 then return end
    local list = load_saved()
    list[#list + 1] = json.decode(json.encode(draft))
    save_saved(list)
    render(body_el)
    if on_saved_cb then on_saved_cb() end
  end)

  ui.on(q("#gf-open"), "click", function()
    if #draft.steps == 0 then return end
    open_in_viewer("custom-draft", draft.title, draft.steps)
  end)

  ui.on(q("#gf-publish"), "click", function()
    local n = q("#gf-notice")
    n.innerHTML = '<i class="bi bi-cloud-upload"></i> Publishing needs the Supabase connection (Settings &rarr; Community). Landing with the community phase — your guide is safe locally.'
    n.classList:remove("d-none")
  end)

  ui.each(body, "[data-mgopen]", function(b)
    ui.on(b, "click", function(ev)
      ev:stopPropagation()
      local i = tonumber(ui.attr(b, "data-mgopen"))
      local g = load_saved()[i]
      if g then open_in_viewer("custom-saved-" .. i, g.title, g.steps) end
    end)
  end)
  ui.each(body, "[data-mgload]", function(b)
    ui.on(b, "click", function(ev)
      ev:stopPropagation()
      local i = tonumber(ui.attr(b, "data-mgload"))
      local g = load_saved()[i]
      if g then
        draft = json.decode(json.encode(g))
        links = {}
        render(body_el)
      end
    end)
  end)
  ui.each(body, "[data-mgdup]", function(b)
    ui.on(b, "click", function(ev)
      ev:stopPropagation()
      local list = load_saved()
      local src = list[tonumber(ui.attr(b, "data-mgdup"))]
      if not src then return end
      local copy = json.decode(json.encode(src))
      copy.title = (src.title or "Guide") .. " (copy)"
      table.insert(list, tonumber(ui.attr(b, "data-mgdup")) + 1, copy)
      save_saved(list)
      render(body_el)
    end)
  end)
  ui.each(body, "[data-mgdel]", function(b)
    ui.on(b, "click", function(ev)
      ev:stopPropagation()
      local list = load_saved()
      table.remove(list, tonumber(ui.attr(b, "data-mgdel")))
      save_saved(list)
      render(body_el)
    end)
  end)
  ui.each(body, "[data-fromdef]", function(b)
    ui.on(b, "click", function(ev)
      ev:stopPropagation()
      local g = build_default(ui.attr(b, "data-fromdef"))
      if not g then return end
      draft = { title = codex.T(g.title) .. " (copy)", steps = forge_steps_from_guide(g) }
      links = {}
      render(body_el)
    end)
  end)
end

render = function(body)
  body_el = body
  local parts = {}

  parts[#parts + 1] = '<label class="form-label">Guide title</label>'
  parts[#parts + 1] = '<input id="gf-title" class="form-control form-control-sm mb-2" value="' .. esc(draft.title) .. '">'
  parts[#parts + 1] = '<div class="mb-2" style="display:flex;align-items:center;gap:6px;flex-wrap:wrap">'
    .. '<span class="ec-muted" style="font-size:11px">Start from a default:</span>'
    .. '<button class="btn btn-ec-ghost btn-sm py-0" data-fromdef="campaign-league-start"><i class="bi bi-files"></i> Campaign</button>'
    .. '<button class="btn btn-ec-ghost btn-sm py-0" data-fromdef="campaign-speedrun"><i class="bi bi-files"></i> Speedrun</button>'
    .. '</div>'

  parts[#parts + 1] = '<div class="ec-panel p-2 mb-2">'
  parts[#parts + 1] = '<label class="form-label">Step text &mdash; wrap a word in [brackets] to make it an image link</label>'
  parts[#parts + 1] = '<textarea id="gf-text" class="form-control mb-2" rows="3" style="font-size:14px;line-height:1.5" placeholder="Kill [Beira of the Rotten Pack] north of the waypoint">' .. esc(pending.text) .. '</textarea>'
  parts[#parts + 1] = '<div class="d-flex gap-2 mb-2">'
  parts[#parts + 1] = '<input id="gf-zone" class="form-control form-control-sm" list="gf-zones" placeholder="Zone — type to search" value="' .. esc(pending.zone) .. '">'
  parts[#parts + 1] = '<input id="gf-reward" class="form-control form-control-sm" list="gf-rewards" placeholder="Reward — pick or type custom" value="' .. esc(pending.reward) .. '">'
  parts[#parts + 1] = '</div>'
  parts[#parts + 1] = '<datalist id="gf-zones">' .. zone_options() .. '</datalist>'
  parts[#parts + 1] = '<datalist id="gf-rewards">' .. reward_options() .. '</datalist>'
  parts[#parts + 1] = '<input id="gf-tip" class="form-control form-control-sm mb-2" placeholder="Tip (optional)" value="' .. esc(pending.tip) .. '">'
  parts[#parts + 1] = '<div class="d-flex gap-2 align-items-center mb-2">'
  parts[#parts + 1] = '<input id="gf-word" class="form-control form-control-sm" placeholder="Word to link">'
  parts[#parts + 1] = '<input id="gf-img" class="form-control form-control-sm" placeholder="Image path or URL">'
  parts[#parts + 1] = '<button id="gf-addlink" class="btn btn-ec-ghost btn-sm text-nowrap" title="Link word to image"><i class="bi bi-link-45deg"></i></button>'
  parts[#parts + 1] = '</div>'
  if #links > 0 then
    parts[#parts + 1] = '<div class="mb-2 d-flex gap-1 flex-wrap">'
    for i, l in ipairs(links) do
      parts[#parts + 1] = '<span class="ec-chip" style="font-size:11px">' .. esc(l.word)
        .. ' <i class="bi bi-image ec-dim"></i> <i class="bi bi-x" data-dellink="' .. i .. '" style="cursor:pointer"></i></span>'
    end
    parts[#parts + 1] = '</div>'
  end
  parts[#parts + 1] = '<div class="d-flex gap-2 align-items-center">'
  parts[#parts + 1] = '<div class="form-check m-0"><input id="gf-opt" class="form-check-input" type="checkbox"' .. (pending.opt and ' checked' or '') .. '><label class="form-check-label ec-dim" for="gf-opt" style="font-size:12px">Optional step</label></div>'
  parts[#parts + 1] = '<span class="flex-grow-1"></span>'
  parts[#parts + 1] = '<button id="gf-add" class="btn btn-ec btn-sm">Add step</button>'
  parts[#parts + 1] = '</div>'
  parts[#parts + 1] = '<div class="ec-muted mt-2" style="font-size:11px">Preview</div>'
  parts[#parts + 1] = '<div id="gf-preview" class="ec-step-current mt-1" style="font-size:13px;color:var(--ec-text-strong)">'
    .. (pending.text ~= "" and preview_html(pending.text) or "&hellip;") .. '</div>'
  parts[#parts + 1] = '</div>'

  parts[#parts + 1] = '<div class="ec-dim mb-1" style="font-size:12px">Steps &middot; ' .. #draft.steps .. '</div>'
  parts[#parts + 1] = '<ul class="gf-steps mb-2">'
  if #draft.steps == 0 then
    parts[#parts + 1] = '<li class="ec-muted">No steps yet — add your first one above.</li>'
  end
  for i, s in ipairs(draft.steps) do
    parts[#parts + 1] = '<li><span class="n">' .. i .. '</span><span>'
      .. esc(((s.text or ""):gsub("%[", ""):gsub("%]", "")))
      .. (s.optional and ' <span class="ec-optional-badge">opt</span>' or '')
      .. '</span><i class="bi bi-x x" data-delstep="' .. i .. '" title="Remove"></i></li>'
  end
  parts[#parts + 1] = '</ul>'

  parts[#parts + 1] = '<div class="d-flex gap-2 mb-2">'
  parts[#parts + 1] = '<button id="gf-save" class="btn btn-ec btn-sm">Save guide</button>'
  parts[#parts + 1] = '<button id="gf-open" class="btn btn-ec-ghost btn-sm">Open in viewer</button>'
  parts[#parts + 1] = '<button id="gf-publish" class="btn btn-ec-ghost btn-sm"><i class="bi bi-cloud-upload"></i> Publish</button>'
  parts[#parts + 1] = '</div>'
  parts[#parts + 1] = '<div id="gf-notice" class="ec-panel p-2 d-none mb-2" style="font-size:12px;color:var(--ec-gold)"></div>'

  local saved = load_saved()
  if #saved > 0 then
    parts[#parts + 1] = '<div class="gd-section-title" style="margin-top:10px">My guides <span class="gd-count">' .. #saved .. '</span></div>'
    parts[#parts + 1] = '<div class="gd-list">'
    for i, g in ipairs(saved) do
      local n = #(g.steps or {})
      parts[#parts + 1] = table.concat({
        '<div class="gd-card" data-mgopen="', i, '">',
        '<div class="gd-emblem custom"><i class="bi bi-journal-bookmark-fill"></i></div>',
        '<div class="gd-body"><div class="gd-title">', esc(g.title or "Untitled"), '</div>',
        '<div class="gd-meta">', n, ' step', (n == 1 and '' or 's'), '</div></div>',
        '<div class="gd-actions">',
        '<div class="gd-act" data-mgopen="', i, '" title="Open"><i class="bi bi-play-fill"></i></div>',
        '<div class="gd-act" data-mgload="', i, '" title="Edit"><i class="bi bi-pencil"></i></div>',
        '<div class="gd-act" data-mgdup="', i, '" title="Duplicate"><i class="bi bi-files"></i></div>',
        '<div class="gd-act danger" data-mgdel="', i, '" title="Delete"><i class="bi bi-trash3"></i></div>',
        '</div></div>',
      })
    end
    parts[#parts + 1] = '</div>'
  end

  body.innerHTML = table.concat(parts)
  wire(body)
end

-- Reusable entry point so the guides-window picker can host this form inline.
--   opts.load     — a saved guide to edit (deep-copied into the draft)
--   opts.on_saved — called after a successful save (host refreshes its list)
codex.forge = {
  mount = function(host, opts)
    opts = opts or {}
    on_saved_cb = opts.on_saved
    if opts.load then
      draft = json.decode(json.encode(opts.load))
      links = {}
      initialized = true
    elseif not initialized then
      initialized = true
    end
    render(host)
  end,
}

codex.registry.register{
  id = "guide-forge",
  name = "Guide Forge",
  icon = "bi-vector-pen",
  order = 12,
  status = "alpha",
  width = 700,
  desc = "Create your own guides: type steps, link words to images, save and share. Community publishing via Supabase.",
  mount = function(body) codex.forge.mount(body) end,
}

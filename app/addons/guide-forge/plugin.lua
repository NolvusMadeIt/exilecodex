-- Guide Forge — create your own guides. Authors the NATIVE runtime step schema
-- ({ act, zone, reward, optional, images, goals }), so custom guides are
-- first-class: real goals (go to / kill / talk / collect / turn in / accept /
-- note...) with counts, reach-level triggers and per-goal optional, plus an act
-- so the guide's act bar can navigate them. Legacy flat guides upconvert on edit.
-- Publishing to the community runs on Supabase (community phase).
local ui = codex.ui
local json = codex.json

-- draft.steps hold NATIVE steps. `pending` is the step-level header being typed,
-- `pgoals` its goals-so-far, `goaldraft` the one goal row being typed. All kept
-- outside the DOM so a re-render (add link / add goal) never eats input.
local draft = { title = "My custom guide", steps = {} }
local links = {}     -- pending word→image links for the step being written
local pending = { act = "", zone = "", reward = "", optional = false }
local pgoals = {}    -- goals added to the pending step
local goaldraft = { action = "goal", text = "", count = "", reach_level = "", optional = false }
local body_el = nil
local on_saved_cb = nil   -- fired after a save so a host (the picker) can refresh
local initialized = false -- keep in-progress draft across re-mounts

local function esc(s)
  return (tostring(s):gsub("&", "&amp;"):gsub("<", "&lt;"):gsub(">", "&gt;"):gsub('"', "&quot;"))
end

local function trim(s)
  return (tostring(s):gsub("^%s+", ""):gsub("%s+$", ""))
end

-- ---------------------------------------------------------------- option lists

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

-- Acts: the canonical set, seeded from the route so it always matches the shipped
-- guides. Used by the guide's act bar to group / jump.
local ACTS = { "Act 1", "Act 2", "Act 3", "Act 4", "Interlude 1", "Interlude 2", "Interlude 3" }
local function act_list()
  local seen, list = {}, {}
  local function add(a) if a and a ~= "" and not seen[a] then seen[a] = true; list[#list + 1] = a end end
  local route = codex.campaign_route
  if route and route.steps then for _, s in ipairs(route.steps) do add(s.act) end end
  for _, a in ipairs(ACTS) do add(a) end
  return list
end
local function act_options(sel)
  local parts = { '<option value="">&mdash; act (optional) &mdash;</option>' }
  for _, a in ipairs(act_list()) do
    parts[#parts + 1] = '<option value="' .. esc(a) .. '"' .. (a == sel and ' selected' or '') .. '>' .. esc(a) .. '</option>'
  end
  return table.concat(parts)
end

-- Goal action vocabulary (mirrors core/guide.lua's ACTION_ICONS). "goal" is the
-- generic objective; "note" is non-completable prose.
local ACTIONS = { "goal", "goto", "kill", "talk", "collect", "turnin", "accept", "get", "use", "note" }
local ACTION_LABEL = {
  goal = "Objective", ["goto"] = "Go to", kill = "Kill", talk = "Talk to", collect = "Collect",
  turnin = "Turn in", accept = "Accept", get = "Get", use = "Use", note = "Note",
}
local function action_options(sel)
  local parts = {}
  for _, a in ipairs(ACTIONS) do
    parts[#parts + 1] = '<option value="' .. a .. '"' .. (a == sel and ' selected' or '') .. '>' .. esc(ACTION_LABEL[a] or a) .. '</option>'
  end
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

-- ---------------------------------------------------------------- schema

local function copy_goals(goals)
  local out = {}
  for _, gl in ipairs(goals or {}) do
    out[#out + 1] = {
      action = gl.action or "goal", text = gl.text or "",
      count = gl.count, reach_level = gl.reach_level, optional = gl.optional,
    }
  end
  return out
end

-- Normalize any saved step (native OR legacy flat {text, tip}) into a native
-- step so the editor speaks one shape. Legacy text splits on newlines into goals;
-- tip becomes a note. The runtime already renders legacy guides via Guide:step's
-- synthesis, so old saved guides keep working before AND after editing.
local function to_native_step(s)
  if s.goals then
    return { act = s.act, zone = s.zone, reward = s.reward, optional = s.optional, images = s.images, goals = copy_goals(s.goals) }
  end
  local goals = {}
  if s.text and s.text ~= "" then
    for line in (tostring(s.text) .. "\n"):gmatch("(.-)\n") do
      local t = trim(line)
      if t ~= "" then goals[#goals + 1] = { action = s.action or "goal", text = t, count = s.count } end
    end
  end
  if s.tip and s.tip ~= "" then goals[#goals + 1] = { action = "note", text = tostring(s.tip) } end
  return { act = s.act, zone = s.zone, reward = s.reward, optional = s.optional, images = s.images, goals = goals }
end

-- Flatten a built (goal-based) guide into native editor steps so the user can
-- start a custom guide from a default one — now lossless (act + full goals kept).
local function forge_steps_from_guide(g)
  local steps = {}
  for _, s in ipairs(g.steps or {}) do steps[#steps + 1] = to_native_step(s) end
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

-- open a set of steps in the guide viewer (spawns the Campaign Guide widget if
-- needed). Native steps run directly; legacy steps are synthesized by Guide:step.
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

-- live preview of the step being typed (header + goals + in-progress goal)
local function pending_preview_html()
  local parts = {}
  local head = {}
  if pending.act ~= "" then head[#head + 1] = esc(pending.act) end
  if pending.zone ~= "" then head[#head + 1] = esc(pending.zone) end
  if #head > 0 then
    parts[#parts + 1] = '<div style="font-size:10px;color:var(--ec-text-soft);text-transform:uppercase;letter-spacing:.04em;margin-bottom:3px">'
      .. table.concat(head, ' &middot; ') .. (pending.optional and ' <span class="ec-optional-badge">optional</span>' or '') .. '</div>'
  end
  local all = {}
  for _, gl in ipairs(pgoals) do all[#all + 1] = gl end
  if trim(goaldraft.text) ~= "" then
    all[#all + 1] = { action = goaldraft.action, text = goaldraft.text, count = tonumber(goaldraft.count) }
  end
  if #all == 0 then parts[#parts + 1] = '<span class="ec-muted">&hellip;</span>' end
  for _, gl in ipairs(all) do
    local lbl = ACTION_LABEL[gl.action] or gl.action
    parts[#parts + 1] = '<div style="font-size:12.5px;margin:1px 0"><span class="ec-muted" style="font-size:9.5px;text-transform:uppercase">'
      .. esc(lbl) .. '</span> ' .. preview_html(gl.text) .. (gl.count and (' <span class="ec-muted">(0/' .. gl.count .. ')</span>') or '') .. '</div>'
  end
  if pending.reward ~= "" then
    parts[#parts + 1] = '<div style="color:var(--ec-gold);font-size:11.5px;margin-top:3px"><i class="bi bi-gift"></i> ' .. esc(pending.reward) .. '</div>'
  end
  return table.concat(parts)
end

local render  -- forward declaration

local function reset_pending()
  pending = { act = "", zone = "", reward = "", optional = false }
  pgoals = {}
  links = {}
  goaldraft = { action = "goal", text = "", count = "", reach_level = "", optional = false }
end

local function wire(body)
  local q = function(sel) return body:querySelector(sel) end
  local prev = q("#gf-preview")
  local function repreview() if prev and prev ~= js.null then prev.innerHTML = pending_preview_html() end end

  local title_in = q("#gf-title")
  ui.on(title_in, "change", function() draft.title = trim(title_in.value) end)

  -- step-level header fields mirror into `pending` (no re-render → DOM keeps focus)
  local act_in, zone_in, reward_in, opt_in = q("#gf-act"), q("#gf-zone"), q("#gf-reward"), q("#gf-opt")
  ui.on(act_in, "change", function() pending.act = tostring(act_in.value); repreview() end)
  ui.on(zone_in, "input", function() pending.zone = tostring(zone_in.value); repreview() end)
  ui.on(reward_in, "input", function() pending.reward = tostring(reward_in.value); repreview() end)
  ui.on(opt_in, "change", function() pending.optional = opt_in.checked and true or false; repreview() end)

  -- the one goal row being typed mirrors into `goaldraft`
  local ga, gt, gc, glv, go = q("#gf-gaction"), q("#gf-gtext"), q("#gf-gcount"), q("#gf-glevel"), q("#gf-gopt")
  ui.on(ga, "change", function() goaldraft.action = tostring(ga.value) end)
  ui.on(gt, "input", function() goaldraft.text = tostring(gt.value); repreview() end)
  ui.on(gc, "input", function() goaldraft.count = tostring(gc.value) end)
  ui.on(glv, "input", function() goaldraft.reach_level = tostring(glv.value) end)
  ui.on(go, "change", function() goaldraft.optional = go.checked and true or false end)

  local function commit_goaldraft()
    local text = trim(goaldraft.text)
    if text == "" then return false end
    pgoals[#pgoals + 1] = {
      action = goaldraft.action or "goal", text = text,
      count = tonumber(goaldraft.count), reach_level = tonumber(goaldraft.reach_level),
      optional = goaldraft.optional and true or nil,
    }
    goaldraft = { action = "goal", text = "", count = "", reach_level = "", optional = false }
    return true
  end

  ui.on(q("#gf-addgoal"), "click", function()
    if commit_goaldraft() then render(body_el) end
  end)
  ui.each(body, "[data-delgoal]", function(x)
    ui.on(x, "click", function()
      table.remove(pgoals, tonumber(ui.attr(x, "data-delgoal")))
      render(body_el)
    end)
  end)

  -- add a word→image link
  ui.on(q("#gf-addlink"), "click", function()
    local word = trim(q("#gf-word").value)
    local img = trim(q("#gf-img").value)
    if word == "" or img == "" then return end
    links[#links + 1] = { word = word, img = img }
    render(body_el)
  end)
  ui.each(body, "[data-dellink]", function(chip)
    ui.on(chip, "click", function()
      table.remove(links, tonumber(ui.attr(chip, "data-dellink")))
      render(body_el)
    end)
  end)

  -- commit the step
  ui.on(q("#gf-add"), "click", function()
    commit_goaldraft()   -- fold in a half-typed goal
    if #pgoals == 0 then return end
    local images = nil
    for _, l in ipairs(links) do images = images or {}; images[l.word] = l.img end
    draft.steps[#draft.steps + 1] = {
      act = pending.act ~= "" and pending.act or nil,
      zone = pending.zone ~= "" and pending.zone or nil,
      reward = pending.reward ~= "" and pending.reward or nil,
      optional = pending.optional and true or nil,
      images = images,
      goals = copy_goals(pgoals),
    }
    reset_pending()
    render(body_el)
  end)

  -- pull a saved step back into the editor to tweak it (removes it from the list)
  ui.each(body, "[data-editstep]", function(x)
    ui.on(x, "click", function(ev)
      ev:stopPropagation()
      local i = tonumber(ui.attr(x, "data-editstep"))
      local s = draft.steps[i]
      if not s then return end
      pending = { act = s.act or "", zone = s.zone or "", reward = s.reward or "", optional = s.optional and true or false }
      pgoals = copy_goals(s.goals)
      links = {}
      if s.images then for word, img in pairs(s.images) do links[#links + 1] = { word = word, img = img } end end
      goaldraft = { action = "goal", text = "", count = "", reach_level = "", optional = false }
      table.remove(draft.steps, i)
      render(body_el)
    end)
  end)
  ui.each(body, "[data-delstep]", function(x)
    ui.on(x, "click", function(ev)
      ev:stopPropagation()
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
        draft = { title = g.title or "Custom guide", steps = {} }
        for _, s in ipairs(g.steps or {}) do draft.steps[#draft.steps + 1] = to_native_step(s) end
        reset_pending()
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
      reset_pending()
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

  -- step header: act / zone / reward / optional
  parts[#parts + 1] = '<div class="d-flex gap-2 mb-2">'
  parts[#parts + 1] = '<select id="gf-act" class="form-select form-select-sm" style="max-width:150px">' .. act_options(pending.act) .. '</select>'
  parts[#parts + 1] = '<input id="gf-zone" class="form-control form-control-sm" list="gf-zones" placeholder="Zone — type to search" value="' .. esc(pending.zone) .. '">'
  parts[#parts + 1] = '</div>'
  parts[#parts + 1] = '<div class="d-flex gap-2 mb-2 align-items-center">'
  parts[#parts + 1] = '<input id="gf-reward" class="form-control form-control-sm" list="gf-rewards" placeholder="Reward — pick or type custom" value="' .. esc(pending.reward) .. '">'
  parts[#parts + 1] = '<div class="form-check m-0 text-nowrap"><input id="gf-opt" class="form-check-input" type="checkbox"' .. (pending.optional and ' checked' or '') .. '><label class="form-check-label ec-dim" for="gf-opt" style="font-size:12px">Optional</label></div>'
  parts[#parts + 1] = '</div>'
  parts[#parts + 1] = '<datalist id="gf-zones">' .. zone_options() .. '</datalist>'
  parts[#parts + 1] = '<datalist id="gf-rewards">' .. reward_options() .. '</datalist>'

  -- goals of the pending step
  parts[#parts + 1] = '<div class="ec-muted" style="font-size:10.5px;text-transform:uppercase;letter-spacing:.08em;margin:2px 0 4px">Goals</div>'
  if #pgoals > 0 then
    parts[#parts + 1] = '<div class="gf-goals mb-2">'
    for i, gl in ipairs(pgoals) do
      local tail = ''
      if gl.count then tail = tail .. ' &times;' .. gl.count end
      if gl.reach_level then tail = tail .. ' @Lv' .. gl.reach_level end
      parts[#parts + 1] = '<div class="gf-goal"><span class="a">' .. esc(ACTION_LABEL[gl.action] or gl.action) .. '</span>'
        .. '<span class="t">' .. esc((tostring(gl.text):gsub("%[", ""):gsub("%]", ""))) .. tail
        .. (gl.optional and ' <span class="ec-optional-badge">opt</span>' or '') .. '</span>'
        .. '<i class="bi bi-x x" data-delgoal="' .. i .. '" title="Remove goal"></i></div>'
    end
    parts[#parts + 1] = '</div>'
  end

  -- the goal row being typed
  parts[#parts + 1] = '<div class="gf-goaledit mb-1">'
  parts[#parts + 1] = '<select id="gf-gaction" class="form-select form-select-sm" style="max-width:118px">' .. action_options(goaldraft.action) .. '</select>'
  parts[#parts + 1] = '<input id="gf-gtext" class="form-control form-control-sm" placeholder="Goal text — wrap a word in [brackets] to link an image" value="' .. esc(goaldraft.text) .. '">'
  parts[#parts + 1] = '</div>'
  parts[#parts + 1] = '<div class="gf-goaledit mb-2">'
  parts[#parts + 1] = '<input id="gf-gcount" class="form-control form-control-sm" type="number" min="1" placeholder="count" value="' .. esc(goaldraft.count) .. '" style="width:72px">'
  parts[#parts + 1] = '<input id="gf-glevel" class="form-control form-control-sm" type="number" min="1" placeholder="reach Lv" value="' .. esc(goaldraft.reach_level) .. '" style="width:82px">'
  parts[#parts + 1] = '<div class="form-check m-0"><input id="gf-gopt" class="form-check-input" type="checkbox"' .. (goaldraft.optional and ' checked' or '') .. '><label class="form-check-label ec-dim" for="gf-gopt" style="font-size:11px">opt</label></div>'
  parts[#parts + 1] = '<span class="flex-grow-1"></span>'
  parts[#parts + 1] = '<button id="gf-addgoal" class="btn btn-ec-ghost btn-sm"><i class="bi bi-plus-lg"></i> goal</button>'
  parts[#parts + 1] = '</div>'

  -- word→image links
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

  parts[#parts + 1] = '<div class="d-flex align-items-center">'
  parts[#parts + 1] = '<span class="flex-grow-1"></span>'
  parts[#parts + 1] = '<button id="gf-add" class="btn btn-ec btn-sm">Add step</button>'
  parts[#parts + 1] = '</div>'

  parts[#parts + 1] = '<div class="ec-muted mt-2" style="font-size:11px">Preview</div>'
  parts[#parts + 1] = '<div id="gf-preview" class="ec-step-current mt-1" style="font-size:13px;color:var(--ec-text-strong)">'
    .. pending_preview_html() .. '</div>'
  parts[#parts + 1] = '</div>'

  parts[#parts + 1] = '<div class="ec-dim mb-1" style="font-size:12px">Steps &middot; ' .. #draft.steps .. '</div>'
  parts[#parts + 1] = '<ul class="gf-steps mb-2">'
  if #draft.steps == 0 then
    parts[#parts + 1] = '<li class="ec-muted">No steps yet — add your first one above.</li>'
  end
  for i, s in ipairs(draft.steps) do
    local first = (s.goals and s.goals[1] and s.goals[1].text) or ""
    local ng = s.goals and #s.goals or 0
    local badge = s.act and ('<span class="ec-optional-badge" style="margin:0 5px 0 0">' .. esc(s.act) .. '</span>') or ''
    parts[#parts + 1] = '<li><span class="n">' .. i .. '</span><span class="grow">' .. badge
      .. esc((tostring(first):gsub("%[", ""):gsub("%]", "")))
      .. (ng > 1 and (' <span class="ec-muted">+' .. (ng - 1) .. '</span>') or '')
      .. (s.optional and ' <span class="ec-optional-badge">opt</span>' or '')
      .. '</span><i class="bi bi-pencil x" data-editstep="' .. i .. '" title="Edit"></i>'
      .. '<i class="bi bi-x x" data-delstep="' .. i .. '" title="Remove"></i></li>'
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
--   opts.load     — a saved guide to edit (upconverted into native draft steps)
--   opts.on_saved — called after a successful save (host refreshes its list)
codex.forge = {
  mount = function(host, opts)
    opts = opts or {}
    on_saved_cb = opts.on_saved
    if opts.load then
      draft = { title = opts.load.title or "My custom guide", steps = {} }
      for _, s in ipairs(opts.load.steps or {}) do draft.steps[#draft.steps + 1] = to_native_step(s) end
      reset_pending()
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
  published = true,
  width = 700,
  desc = "Create your own guides: real goals (kill / talk / go to / collect...), acts, counts and level triggers, image links, save and share. Community publishing via Supabase.",
  mount = function(body) codex.forge.mount(body) end,
}

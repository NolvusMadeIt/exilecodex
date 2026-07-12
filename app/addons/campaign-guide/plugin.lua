-- Campaign Guide plugin — the flagship widget (the "guides window"). It hosts
-- the tabbed guide viewer + picker (owned by core/guide.lua) and a smart-
-- detection status bar. The two leveling routes are no longer view-modes: they
-- are two standalone, pickable guides registered into the guide catalog, both
-- built from the shared route data in guides/campaign-acts.lua.
local ui = codex.ui

-- Build one campaign guide from the shared route. variant "league" keeps every
-- step (full route); "speedrun" drops optional side content. Each step can
-- carry a variant-specific note (ls_note / sr_note) appended as a note goal.
local function build_campaign(id, title, variant)
  local route = codex.campaign_route or { steps = {} }
  local g = codex.guide.new{ id = id, title = title }
  for _, step in ipairs(route.steps) do
    if variant ~= "speedrun" or not step.optional then
      local goals = {}
      for _, goal in ipairs(step.goals) do goals[#goals + 1] = goal end
      local extra = (variant == "speedrun") and step.sr_note or step.ls_note
      if extra then goals[#goals + 1] = { action = "note", text = extra } end
      g:step{
        act = step.act,
        zone = step.zone,
        reward = step.reward,
        images = step.images,
        optional = step.optional,
        goals = goals,
      }
    end
  end
  return g
end

-- Register both routes into the catalog so the picker can list them even when
-- no tab is open. title is an i18n key ("League start" / "Alt · speedrun"), so
-- tab labels follow the language. build() is lazy — called on first open.
codex.guide.register_catalog{
  id = "campaign-league-start",
  title = "Campaign",
  group = "Campaign",
  patch = codex.campaign_route and codex.campaign_route.patch or nil,
  build = function()
    return build_campaign("campaign-league-start", "Campaign", "league")
  end,
}
-- Speedrun: the same route trimmed to only the necessary steps to reach
-- endgame (side content dropped), with speedrun routing notes. A real default
-- guide, shown in the picker alongside Campaign.
codex.guide.register_catalog{
  id = "campaign-speedrun",
  title = "Speedrun",
  group = "Campaign",
  patch = codex.campaign_route and codex.campaign_route.patch or nil,
  build = function()
    return build_campaign("campaign-speedrun", "Speedrun", "speedrun")
  end,
}

codex.registry.register{
  id = "campaign-guide",
  name = "Campaign Guide",
  icon = "bi-signpost-split",
  order = 10,
  status = "alpha",
  -- Zygor's viewer defaults to a compact ~260-300px frame (MIN_WIDTH=260)
  width = 300,
  flush = true,
  desc = "Zone-by-zone PoE2 leveling with maps, rewards and image-linked steps. Ported from concept1's Campaign Mode.",
  mount = function(body)
    body.classList:add("cg-body")
    body.innerHTML = table.concat({
      '<div id="cg-viewer"></div>',
      '<div class="cg-status" id="cg-status"></div>',
    })
    codex.guide.mount(body:querySelector("#cg-viewer"))
    codex.guide.apply_window()
    codex.guide.restore_tabs("campaign-league-start")
    if codex.detect then codex.detect.refresh() end
  end,
}

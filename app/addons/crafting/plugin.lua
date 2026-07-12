-- Crafting — an interactive PoE2 crafting bench (Craft-of-Exile style) that
-- merges the old Modifiers + Crafting reference plugins into one simulator:
-- pick a base, apply currency / essences / omens, watch the mod pool + weights,
-- roll, and backtrack through your crafting history.
--
-- Lua owns registration + the panel frame; the stateful engine and UI live in
-- window.ecCraft (js/craft-engine.js), the same thin-Lua / JS-engine split we use
-- for the Filter Editor (ecFilterBuild) and Build Planner tree (ecTree).
local js = require "js"
local window = js.global

local CTRL = nil  -- window.ecCraft controller for the mounted panel (nil when closed)

local function mount(body)
  local ec = window.ecCraft
  if ec == nil or ec == js.null then
    body.innerHTML = '<div class="xdb-state">The crafting engine failed to load '
      .. '(js/craft-engine.js). Reload the app.</div>'
    return
  end
  -- hand the whole panel to the JS engine; it renders + wires everything.
  CTRL = ec:mount(body, "{}")
end

local function on_close()
  if CTRL ~= nil and CTRL ~= js.null then
    pcall(function() CTRL:dispose() end)
    CTRL = nil
  end
end

codex.registry.register{
  id = "crafting",
  name = "Crafting",
  icon = "bi-hammer",
  order = 31,
  status = "alpha",
  published = true,
  width = 1060,
  desc = "An interactive PoE2 crafting bench — pick a base, apply currency, essences and omens, watch the mod pool and weights, roll and backtrack. Merges the old Modifiers + Crafting references.",
  mount = mount,
  on_close = on_close,
}

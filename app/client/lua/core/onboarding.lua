-- First-launch tour coordinator. The Electron tutorial window owns the dimmed
-- presentation; Lua reports the real app rectangles and executes semantic
-- commands through the existing widget/menu functions.
local js = require "js"
local window = js.global
local ui = codex.ui

codex.onboarding = {}
local M = codex.onboarding

local function shell()
  local sh = window.exileShell
  if sh ~= nil and sh ~= js.null then return sh end
  return nil
end

local function report(kind, el)
  local sh = shell()
  if not sh or sh.tutorialTarget == nil then return end
  if not el or el == js.null then
    pcall(function() sh:tutorialTarget(kind, 0, 0, 0, 0) end)
    return
  end
  local ok, rect = pcall(function() return el:getBoundingClientRect() end)
  if not ok or not rect or rect == js.null then return end
  pcall(function() sh:tutorialTarget(kind, rect.x, rect.y, rect.width, rect.height) end)
end

local function report_widget(kind, id)
  local open = codex.widgets and codex.widgets.open or nil
  report(kind, open and open[id] or nil)
end

function M.report_targets()
  report("orb", ui.byId("orb"))
  report_widget("market", "market-companion")
end

function M.on_menu_open()
  window:setTimeout(function()
    local rail = ui.byId("rail")
    local target = rail and rail:querySelector('[data-view="__settings"]') or nil
    report("settings-button", target)
  end, 80)
end

function M.on_widget_open(id)
  if id == "__settings" then
    window:setTimeout(function() report_widget("settings", "__settings") end, 100)
  elseif id == "market-companion" then
    window:setTimeout(function() report_widget("market", id) end, 100)
  end
end

function M.finish()
  ui.store_set("ec.onboarding.completed", "1")
end

function M.start()
  if ui.store_get("ec.onboarding.completed") == "1" or ui.store_get("ec.onboarding.suppressed") == "1" then return end
  local sh = shell()
  if not sh or sh.tutorialStart == nil then return end
  pcall(function() sh:tutorialStart() end)
  M.report_targets()
  window:setTimeout(function() M.report_targets() end, 120)
end

function M.reset()
  ui.store_set("ec.onboarding.completed", "0")
  ui.store_set("ec.onboarding.suppressed", "0")
  M.start()
end

local function command_callback(a, b)
  local command = b
  if command == nil or command == js.null then command = a end
  command = tostring(command or "")
  if command == "show-market" then
    if codex.widgets then codex.widgets.open_plugin("market-companion") end
    M.on_widget_open("market-companion")
  elseif command == "open-menu" then
    if codex.open_menu then codex.open_menu() end
  elseif command == "open-settings" then
    if codex.toggle_widget then codex.toggle_widget("__settings") end
  elseif command == "finish" or command == "skip" then
    M.finish()
  end
end

do
  local sh = shell()
  if sh and sh.onTutorialCommand ~= nil then
    sh:onTutorialCommand(command_callback)
  end
end

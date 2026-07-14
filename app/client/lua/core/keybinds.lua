-- codex.keybinds — configurable global hotkeys for the launcher orb + each plugin.
-- Prefs: ec.keybind.launcher, ec.keybind.plugin:<id> — Electron accelerator strings
-- ("Alt+1", "Ctrl+Shift+G", "F6"). Registered as GLOBAL shortcuts by the shell, so
-- they fire even while PoE2 is focused. Rebind them in Settings → Keybinds.
local js = require "js"
local window = js.global
local ui = codex.ui

codex.keybinds = codex.keybinds or {}
local K = codex.keybinds

-- Default: the launcher keeps its familiar Alt+1 until the user changes it.
function K.get(action)
  local v = ui.store_get("ec.keybind." .. action)
  if (v == nil or v == "") and action == "launcher" then return "Alt+1" end
  return v or ""
end

function K.set(action, accel)
  if accel and accel ~= "" then
    ui.store_set("ec.keybind." .. action, accel)
  else
    pcall(function() window.localStorage:removeItem("ec.keybind." .. action) end)
  end
  K.push()
end

-- Hand the shell the current { accel: action } map to (re)register.
function K.push()
  local sh = window.exileShell
  if sh == nil or sh == js.null or sh.setKeybinds == nil then return end
  local map = {}
  local function add(action)
    local a = K.get(action)
    if a and a ~= "" then map[a] = action end
  end
  add("launcher")
  if codex.registry and codex.registry.plugins then
    for _, p in ipairs(codex.registry.plugins) do add("plugin:" .. p.id) end
  end
  pcall(function() sh:setKeybinds(codex.json.encode(map)) end)
end

-- Run an action fired by a global shortcut.
local function run(action)
  action = tostring(action)
  if action == "launcher" then
    if codex.launcher_toggle then codex.launcher_toggle() end
  elseif action:sub(1, 7) == "plugin:" then
    local id = action:sub(8)
    if codex.widgets and codex.widgets.toggle_plugin then codex.widgets.toggle_plugin(id) end
  end
end

do
  local sh = window.exileShell
  if sh ~= nil and sh ~= js.null and sh.onKeybind ~= nil then
    pcall(function() sh:onKeybind(function(_, action) run(action) end) end)
  end
end
-- Register once plugins are loaded.
window:setTimeout(function() pcall(K.push) end, 900)

-- codex.registry — every plugin registers itself here at load time.
-- A plugin is a table: { id, name, icon, order, desc, status, published, mount = function(el) ... end }
-- `published = true` marks a plugin as finished enough to ship in the PUBLIC build;
-- unpublished (in-progress) plugins are hidden from users but stay usable in dev mode.
local js = require "js"
local window = js.global

codex = codex or {}
codex.registry = { plugins = {} }

function codex.registry.register(p)
  assert(p.id and p.name and p.mount, "plugin needs id, name and mount()")
  table.insert(codex.registry.plugins, p)
  table.sort(codex.registry.plugins, function(a, b)
    return (a.order or 99) < (b.order or 99)
  end)
end

function codex.registry.find(id)
  for _, p in ipairs(codex.registry.plugins) do
    if p.id == id then return p end
  end
  return nil
end

-- Developer mode (session unlock via About ×6). Shared read used by the publish
-- gate; mirrors core/settings.lua's own check (shell main-process flag first,
-- then per-tab sessionStorage). Held-back plugins reappear when it's on.
function codex.dev_unlocked()
  local sh = window.exileShell
  if sh ~= nil and sh ~= js.null and sh.getDevUnlocked ~= nil then
    local ok, v = pcall(function() return sh:getDevUnlocked() end)
    if ok then return v and true or false end
  end
  local ok, v = pcall(function() return window.sessionStorage:getItem("ecDevUnlocked") end)
  return ok and v == "1"
end

-- Is this plugin (or id) shown to the user right now? Published ones always;
-- everything when dev mode is unlocked.
function codex.registry.is_visible(p)
  if type(p) == "string" then p = codex.registry.find(p) end
  if not p then return false end
  return p.published == true or codex.dev_unlocked()
end

-- The plugins the launcher / plugin manager should list, in order.
function codex.registry.visible()
  local dev = codex.dev_unlocked()
  local out = {}
  for _, p in ipairs(codex.registry.plugins) do
    if p.published == true or dev then out[#out + 1] = p end
  end
  return out
end

-- codex.registry — every plugin registers itself here at load time.
-- A plugin is a table: { id, name, icon, order, desc, status, mount = function(el) ... end }
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

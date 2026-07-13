-- Build Planner — embeds pob-web (the real Path of Building, compiled to WebAssembly)
-- in an iframe. The static bundle is built from the pobweb/ workspace and served by
-- the Electron loopback from app/vendor/pobweb/. See project-pobweb-integration.
--
-- Everything (passive tree, skills, items, live calcs, import/export) is the actual
-- PoB running locally — no external site, no pob.cool dependency.
local js = require "js"
local window = js.global
local document = window.document

-- Served by the loopback at /app/vendor/pobweb/index.html; relative to the shell
-- document (app/client/ui/index.html).
local POB_URL = "../../vendor/pobweb/index.html"

local function mount(el)
  el.innerHTML = '<iframe class="pobweb-frame" src="' .. POB_URL .. '"'
    .. ' allow="clipboard-read; clipboard-write; fullscreen"'
    .. ' referrerpolicy="no-referrer"></iframe>'
end

local function on_close() end

codex.registry.register{
  id = "build-planner",
  name = "Build Planner",
  icon = "bi-diagram-3",
  order = 6,
  width = 1180,
  status = "alpha",
  published = true,
  flush = true, -- no body padding — the iframe fills the widget
  desc = "Path of Building for PoE2, running in-app via WebAssembly — the full passive tree, skills, items and live calculations. Self-hosted; no external site.",
  mount = mount,
  on_close = on_close,
}

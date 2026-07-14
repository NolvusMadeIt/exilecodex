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
local frame = nil
local loader = nil
local message_handler = nil
local wait_timer = nil

local phases = {
  prepare = true,
  runtime = true,
  data = true,
  tree = true,
  ready = true,
  error = true,
}

local function mount(el)
  el.innerHTML = table.concat({
    '<div class="pob-planner-shell">',
      '<iframe class="pobweb-frame" src="', POB_URL, '"',
        ' allow="clipboard-read; clipboard-write; fullscreen"',
        ' referrerpolicy="no-referrer"></iframe>',
      '<div class="pob-loader" data-phase="prepare" role="status" aria-live="polite">',
        '<div class="pob-loader-card">',
          '<div class="pob-loader-kicker">BUILD PLANNER</div>',
          '<div class="pob-loader-title">Preparing the planner</div>',
          '<div class="pob-loader-detail">Starting the local planner runtime…</div>',
          '<div class="pob-loader-track" aria-hidden="true"><div class="pob-loader-fill"></div></div>',
          '<div class="pob-loader-wait">Still loading — the first start may take a little longer.</div>',
        '</div>',
      '</div>',
    '</div>',
  })

  frame = el:querySelector(".pobweb-frame")
  loader = el:querySelector(".pob-loader")
  local title = loader:querySelector(".pob-loader-title")
  local detail = loader:querySelector(".pob-loader-detail")

  message_handler = function(_, ev)
    if frame == nil or frame == js.null or ev.source ~= frame.contentWindow then return end
    local msg = ev.data
    if msg == nil or msg == js.null or msg.source ~= "exilecodex-pob" or msg.type ~= "planner-phase" then return end
    local phase = tostring(msg.phase or "")
    if not phases[phase] then return end

    loader:setAttribute("data-phase", phase)
    if msg.detail ~= nil and msg.detail ~= js.null then title.textContent = tostring(msg.detail) end

    if phase == "ready" then
      if wait_timer ~= nil then window:clearTimeout(wait_timer) end
      loader:setAttribute("data-ready", "true")
      window:setTimeout(function()
        if loader ~= nil and loader ~= js.null then loader:remove() end
      end, 220)
    elseif phase == "error" then
      loader:setAttribute("data-error", "true")
      detail.textContent = "The planner could not finish loading. Check the app log and try opening it again."
    end
  end
  window:addEventListener("message", message_handler)

  wait_timer = window:setTimeout(function()
    if loader ~= nil and loader ~= js.null and loader:getAttribute("data-ready") ~= "true" then
      loader:setAttribute("data-waiting", "true")
      detail.textContent = "Still loading — the first start may take a little longer."
    end
  end, 12000)
end

local function on_close()
  if message_handler ~= nil then window:removeEventListener("message", message_handler) end
  if wait_timer ~= nil then window:clearTimeout(wait_timer) end
  frame = nil
  loader = nil
  message_handler = nil
  wait_timer = nil
end

codex.registry.register{
  id = "build-planner",
  name = "Build Planner",
  icon = "bi-diagram-3",
  order = 6,
  width = 1320,
  status = "alpha",
  published = true,
  flush = true, -- no body padding — the iframe fills the widget
  desc = "Path of Building for PoE2, running in-app via WebAssembly — the full passive tree, skills, items and live calculations. Self-hosted; no external site.",
  mount = mount,
  on_close = on_close,
}

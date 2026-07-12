-- Filter and Build Editor — the PoE2 filter coding IDE + build engine, ported from concept1.
--   Editor: a real Monaco editor (vendored under ui/vendor/monaco) with the custom `poe2filter`
--           language — bridged through window.ecMonaco (js/monaco-boot.js).
--   Build : the concept1 filter GENERATOR (Quick Filters -> .filter), bundled verbatim as the pure
--           JS global window.ecFilterBuild (js/filter-build.js). Lua owns the settings state + UI;
--           JS owns generation. Live = the built filter; typing takes over -> Manual; Regenerate
--           rebuilds from the builder.
--
-- Two tabs over one shared session: "Quick Filters" (the SECTIONS form — every poe2filter.com
-- control) and "Editor" (Monaco). Strictness / Style / Catch-all live in the always-on builder bar.
local js = require "js"
local window = js.global
local document = js.global.document
local ui = codex.ui

local SET_KEY = "ec.filtereditor.settings"   -- serialized build settings (source of truth)
local PREF_TEXT = "ec.filtereditor.text"      -- legacy plain-text buffer (migrated to manualFilter)

local STARTER = table.concat({
  "# ExileCodex — starter filter",
  "# The build engine was unavailable; this is a plain editable buffer.",
  "",
  "Show # Rare items",
  "\tRarity Rare",
  "\tSetTextColor 255 255 119",
  "",
  "Hide # Everything else",
}, "\n")

local P = { wrap = false, minimap = false, lines = true, font = 13, size = "comfortable", tab = 4, spaces = false }

local HEIGHTS = { compact = "40vh", comfortable = "56vh", tall = "74vh" }
local HLABEL  = { compact = "S", comfortable = "M", tall = "L" }
local HORDER  = { "compact", "comfortable", "tall" }

local ED = nil          -- current Monaco handle
local SESS = nil        -- window.ecFilterBuild session (nil if engine unavailable)
local body = nil        -- the widget body element we mounted into
local view = "editor"   -- "editor" | "qf"

local function esc(s)
  return (tostring(s):gsub("&", "&amp;"):gsub("<", "&lt;"):gsub(">", "&gt;"):gsub('"', "&quot;"))
end

-- ---------------------------------------------------------------- prefs io
local function load_prefs()
  P.wrap    = ui.store_get("ec.editor.wrap") == "1"
  P.minimap = ui.store_get("ec.editor.minimap") == "1"
  local ln  = ui.store_get("ec.editor.lines"); P.lines = (ln == nil) or (ln == "1")
  P.font    = tonumber(ui.store_get("ec.editor.font")) or 13
  P.size    = ui.store_get("ec.editor.size") or "comfortable"
  if not HEIGHTS[P.size] then P.size = "comfortable" end
  P.tab     = tonumber(ui.store_get("ec.editor.tab")) or 4
  P.spaces  = ui.store_get("ec.editor.spaces") == "1"
end

local function bstr(b) return b and "true" or "false" end

local function opts_json()
  return table.concat({
    '{"fontSize":', tostring(P.font),
    ',"wordWrap":"', (P.wrap and "on" or "off"), '"',
    ',"minimap":{"enabled":', bstr(P.minimap), '}',
    ',"lineNumbers":"', (P.lines and "on" or "off"), '"',
    ',"tabSize":', tostring(P.tab),
    ',"insertSpaces":', bstr(P.spaces),
    ',"renderWhitespace":"selection"',
    ',"bracketPairColorization":{"enabled":true}',
    ',"scrollBeyondLastLine":false',
    ',"smoothScrolling":true',
    ',"guides":{"indentation":true}',
    ',"cursorBlinking":"smooth"}',
  })
end

-- ---------------------------------------------------------------- settings session
local function persist_settings()
  if SESS then ui.store_set(SET_KEY, tostring(SESS:serialize())) end
end

local function init_session()
  local fb = window.ecFilterBuild
  if fb == nil or fb == js.null then SESS = nil; return end
  local saved = ui.store_get(SET_KEY)
  if saved and saved ~= "" then
    SESS = fb:newSession(saved)
  else
    SESS = fb:newSession()
    local old = ui.store_get(PREF_TEXT)
    if old and old ~= "" then SESS:setManual(old) end
    persist_settings()
  end
end

-- ---------------------------------------------------------------- helpers
local function q(sel) return body and body:querySelector(sel) or js.null end

local function set_text(sel, s)
  local el = q(sel)
  if el ~= js.null then el.textContent = s end
end

local function update_counts(text)
  local lines = 1
  for _ in tostring(text):gmatch("\n") do lines = lines + 1 end
  if text == "" then lines = 0 end
  set_text("#fe-lines", lines .. (lines == 1 and " line" or " lines"))
  set_text("#fe-chars", #text .. " chars")
end

-- ---------------------------------------------------------------- mode (Live / Manual)
local function refresh_mode()
  local manual = SESS and SESS:isManual()
  local badge = q("#fe-mode")
  if badge ~= js.null then
    if manual then
      badge.className = "fe-mode manual"; badge.innerHTML = '<i class="bi bi-pencil-fill"></i> Manual'
    else
      badge.className = "fe-mode"; badge.innerHTML = '<i class="bi bi-broadcast"></i> Live'
    end
  end
  local regen = q('[data-act="regen"]')
  if regen ~= js.null then regen.style.display = manual and "inline-flex" or "none" end
end

local function rebuild_live()
  if not SESS or SESS:isManual() then return end
  local t = tostring(SESS:build())
  if ED then ED:setValue(t) end
  update_counts(t)
end

-- After a builder change: re-render the Quick Filters form if it's showing, else refresh the editor.
local function refresh_view()
  if view == "qf" then
    local qf = q("#fe-qf")
    if qf ~= js.null and SESS then qf.innerHTML = tostring(SESS:qfHtml()) end
  else
    rebuild_live()
  end
end

-- ---------------------------------------------------------------- editor callbacks
local function on_change(_, val)
  local text = tostring(val)
  update_counts(text)
  if SESS then
    SESS:setManual(text); persist_settings(); refresh_mode()
  else
    ui.store_set(PREF_TEXT, text)
  end
end

local function on_cursor(_, json)
  local ok, c = pcall(function() return window.JSON:parse(json) end)
  if not ok or c == js.null then return end
  local line = tonumber(c.line) or 1
  local col  = tonumber(c.col) or 1
  local sel  = tonumber(c.selLen) or 0
  set_text("#fe-pos", string.format("Ln %d, Col %d", line, col))
  set_text("#fe-sel", sel > 0 and string.format("(%d selected)", sel) or "")
end

-- ---------------------------------------------------------------- editor toolbar actions
local function apply_opts() if ED then ED:updateOptions(opts_json()) end end

local function set_toggle(sel, on)
  local el = q(sel)
  if el == js.null then return end
  if on then el.classList:add("on") else el.classList:remove("on") end
end

local function apply_size()
  local host = q("#fe-host"); if host ~= js.null then host.style.height = HEIGHTS[P.size] end
  local qf = q("#fe-qf"); if qf ~= js.null then qf.style.height = HEIGHTS[P.size] end
  local btn = q('[data-act="size"]'); if btn ~= js.null then btn.textContent = "Size: " .. HLABEL[P.size] end
  if ED then ED:layout() end
end

local function flash(btn, html)
  if btn == js.null then return end
  local prev = btn.innerHTML
  btn.innerHTML = html
  window:setTimeout(function() btn.innerHTML = prev end, 1300)
end

local function do_copy(btn)
  if not ED then return end
  local text = tostring(ED:getValue())
  local ok = pcall(function() window.navigator.clipboard:writeText(text) end)
  if ok then flash(btn, '<i class="bi bi-check-lg"></i> Copied') end
end

local function do_download()
  if not ED then return end
  local text = tostring(ED:getValue())
  local href = "data:text/plain;charset=utf-8," .. tostring(window:encodeURIComponent(text))
  local a = document:createElement("a")
  a.href = href; a.download = "exilecodex.filter"
  document.body:appendChild(a); a:click(); a:remove()
end

local function do_regenerate()
  if not SESS then return end
  SESS:clearManual(); persist_settings()
  local t = tostring(SESS:build())
  if ED then ED:setValue(t) end
  update_counts(t); refresh_mode()
end

-- ---------------------------------------------------------------- view switching
local function set_view(v)
  view = v
  local editing = (v == "editor")
  local qf, host, tb = q("#fe-qf"), q("#fe-host"), q(".fe-toolbar")
  if v == "qf" and qf ~= js.null and SESS then qf.innerHTML = tostring(SESS:qfHtml()) end
  if qf ~= js.null then qf.style.display = editing and "none" or "block" end
  if host ~= js.null then host.style.display = editing and "block" or "none" end
  if tb ~= js.null then tb.style.display = editing and "flex" or "none" end
  ui.each(body, ".fe-tab", function(b)
    if ui.attr(b, "data-tab") == v then b.classList:add("on") else b.classList:remove("on") end
  end)
  if editing then rebuild_live(); if ED then ED:layout() end end
end

-- ---------------------------------------------------------------- markup
local function select_options(list_key, cur)
  local list = window.ecFilterBuild[list_key]
  local parts = {}
  for i = 0, tonumber(list.length) - 1 do
    local it = list[i]
    local id, name = tostring(it.id), tostring(it.name)
    parts[#parts + 1] = '<option value="' .. esc(id) .. '"' .. (id == cur and ' selected' or '') .. '>' .. esc(name) .. '</option>'
  end
  return table.concat(parts)
end

local function buildbar_html()
  if not SESS then return "" end
  local strictness = tostring(SESS:getStrictness())
  local style = tostring(SESS:getStyle())
  local catchall = tostring(SESS:getCatchAll())
  return table.concat({
    '<div class="fe-buildbar">',
      '<span class="fe-mode" id="fe-mode"><i class="bi bi-broadcast"></i> Live</span>',
      '<button class="fe-tbtn" data-act="regen" title="Discard manual edits and rebuild from the builder" style="display:none"><i class="bi bi-arrow-clockwise"></i> Regenerate</button>',
      '<span class="fe-sep"></span>',
      '<label class="fe-lbl">Strictness</label>',
      '<select class="fe-select" id="fe-strictness" autocomplete="off">', select_options("strictnessLevels", strictness), '</select>',
      '<label class="fe-lbl">Style</label>',
      '<select class="fe-select" id="fe-style" autocomplete="off">', select_options("styles", style), '</select>',
      '<label class="fe-lbl">Catch-all</label>',
      '<select class="fe-select" id="fe-catchall" autocomplete="off">',
        '<option value="show"', (catchall == "show" and " selected" or ""), '>Show all</option>',
        '<option value="hide"', (catchall == "hide" and " selected" or ""), '>Hide rest</option>',
      '</select>',
      '<span class="fe-spacer"></span>',
      '<span class="fe-tabs">',
        '<button class="fe-tab on" data-tab="editor">Editor</button>',
        '<button class="fe-tab" data-tab="qf">Quick Filters</button>',
      '</span>',
    '</div>',
  })
end

local function toolbar_html()
  return table.concat({
    '<div class="fe-toolbar">',
      '<button class="fe-tbtn', (P.wrap and " on" or ""), '" data-act="wrap" title="Toggle word wrap"><i class="bi bi-text-wrap"></i> Wrap</button>',
      '<button class="fe-tbtn', (P.minimap and " on" or ""), '" data-act="minimap" title="Toggle minimap"><i class="bi bi-map"></i> Minimap</button>',
      '<button class="fe-tbtn', (P.lines and " on" or ""), '" data-act="lines" title="Toggle line numbers"><i class="bi bi-list-ol"></i> Lines</button>',
      '<span class="fe-sep"></span>',
      '<button class="fe-tbtn fe-icon" data-act="font-" title="Smaller font"><i class="bi bi-dash-lg"></i></button>',
      '<span class="fe-font" id="fe-font">', tostring(P.font), 'px</span>',
      '<button class="fe-tbtn fe-icon" data-act="font+" title="Larger font"><i class="bi bi-plus-lg"></i></button>',
      '<button class="fe-tbtn" data-act="size" title="Editor height (Small / Medium / Large)">Size: ', HLABEL[P.size], '</button>',
      '<span class="fe-spacer"></span>',
      '<button class="fe-tbtn" data-act="output" title="Filter output options — syntax highlighting + custom top/bottom comments"><i class="bi bi-sliders"></i> Output</button>',
      '<button class="fe-tbtn fe-icon" data-act="find" title="Find (Ctrl+F)"><i class="bi bi-search"></i></button>',
      '<button class="fe-tbtn" data-act="copy" title="Copy filter"><i class="bi bi-clipboard"></i> Copy</button>',
      '<button class="fe-tbtn fe-gold" data-act="download" title="Download .filter"><i class="bi bi-download"></i> Download</button>',
    '</div>',
  })
end

-- Filter OUTPUT options (moved here from Settings → Filter output): syntax
-- highlighting of the generated filter + custom top/bottom comment blocks.
local function fe_esc(s)
  return (tostring(s):gsub("&", "&amp;"):gsub("<", "&lt;"):gsub(">", "&gt;"))
end
local function output_panel_html()
  return table.concat({
    '<div class="fe-output" id="fe-output" style="display:none">',
      '<div class="fe-out-title">Filter output</div>',
      '<label class="fe-out-check"><input type="checkbox" id="fe-out-syntax"',
        ((ui.store_get("ec.filter.syntax") or "1") == "1") and " checked" or "", '> Syntax highlighting in the exported filter</label>',
      '<label class="fe-out-lbl">Custom top comment</label>',
      '<textarea id="fe-out-top" class="fe-out-ta" rows="3" placeholder="# Notes added to the top of every downloaded filter">', fe_esc(ui.store_get("ec.filter.top") or ""), '</textarea>',
      '<label class="fe-out-lbl">Custom bottom comment</label>',
      '<textarea id="fe-out-bot" class="fe-out-ta" rows="3" placeholder="# Notes added to the bottom">', fe_esc(ui.store_get("ec.filter.bottom") or ""), '</textarea>',
    '</div>',
  })
end

local function footer_html()
  return table.concat({
    '<div class="fe-foot">',
      '<span id="fe-pos">Ln 1, Col 1</span>',
      '<span id="fe-sel" class="fe-sel"></span>',
      '<span class="fe-spacer"></span>',
      '<span id="fe-lines">0 lines</span>',
      '<span id="fe-chars">0 chars</span>',
      '<span id="fe-tab">', (P.spaces and ("Spaces: " .. P.tab) or ("Tab: " .. P.tab)), '</span>',
      '<span>LF</span><span>UTF-8</span>',
      '<span class="fe-lang">PoE2 Filter</span>',
    '</div>',
  })
end

-- ---------------------------------------------------------------- wiring
local function wire_editor()
  local function click(sel, fn)
    local el = q(sel); if el ~= js.null then ui.on(el, "click", fn) end
  end
  click('[data-act="wrap"]', function()
    P.wrap = not P.wrap; ui.store_set("ec.editor.wrap", P.wrap and "1" or "0")
    set_toggle('[data-act="wrap"]', P.wrap); apply_opts()
  end)
  -- Filter output options (relocated from Settings)
  click('[data-act="output"]', function()
    local p = q("#fe-output")
    if p ~= js.null then
      local hidden = tostring(p.style.display) == "none"
      p.style.display = hidden and "block" or "none"
      set_toggle('[data-act="output"]', hidden)
    end
  end)
  local syn = q("#fe-out-syntax")
  if syn ~= js.null then ui.on(syn, "change", function() ui.store_set("ec.filter.syntax", syn.checked and "1" or "0") end) end
  local topc = q("#fe-out-top")
  if topc ~= js.null then ui.on(topc, "input", function() ui.store_set("ec.filter.top", tostring(topc.value)) end) end
  local botc = q("#fe-out-bot")
  if botc ~= js.null then ui.on(botc, "input", function() ui.store_set("ec.filter.bottom", tostring(botc.value)) end) end
  click('[data-act="minimap"]', function()
    P.minimap = not P.minimap; ui.store_set("ec.editor.minimap", P.minimap and "1" or "0")
    set_toggle('[data-act="minimap"]', P.minimap); apply_opts()
  end)
  click('[data-act="lines"]', function()
    P.lines = not P.lines; ui.store_set("ec.editor.lines", P.lines and "1" or "0")
    set_toggle('[data-act="lines"]', P.lines); apply_opts()
  end)
  click('[data-act="font-"]', function()
    P.font = math.max(8, P.font - 1); ui.store_set("ec.editor.font", tostring(P.font))
    set_text("#fe-font", P.font .. "px"); apply_opts()
  end)
  click('[data-act="font+"]', function()
    P.font = math.min(32, P.font + 1); ui.store_set("ec.editor.font", tostring(P.font))
    set_text("#fe-font", P.font .. "px"); apply_opts()
  end)
  click('[data-act="size"]', function()
    local i = 1
    for k, name in ipairs(HORDER) do if name == P.size then i = k end end
    P.size = HORDER[(i % #HORDER) + 1]; ui.store_set("ec.editor.size", P.size)
    apply_size()
  end)
  click('[data-act="find"]', function() if ED then ED:run("actions.find") end end)
  click('[data-act="copy"]', function(_, btn) do_copy(btn) end)
  click('[data-act="download"]', function() do_download() end)
end

local function wire_builder()
  if not SESS then return end
  local function change(sel, fn)
    local el = q(sel); if el ~= js.null then ui.on(el, "change", fn) end
  end
  change("#fe-strictness", function(_, el)
    SESS:setStrictness(el.value); persist_settings()
    local ca = q("#fe-catchall"); if ca ~= js.null then ca.value = tostring(SESS:getCatchAll()) end
    refresh_view()
  end)
  change("#fe-style", function(_, el) SESS:setStyle(el.value); persist_settings(); refresh_view() end)
  change("#fe-catchall", function(_, el) SESS:setCatchAll(el.value); persist_settings(); refresh_view() end)
  local regen = q('[data-act="regen"]')
  if regen ~= js.null then ui.on(regen, "click", function() do_regenerate() end) end
  -- tab strip
  ui.each(body, ".fe-tab", function(b)
    ui.on(b, "click", function() set_view(ui.attr(b, "data-tab")) end)
  end)
end

-- Delegated Quick Filters form handler: read the data-qf-* attributes and update the session.
local function wire_quickfilters()
  local qf = q("#fe-qf")
  if qf == js.null or not SESS then return end
  local function handle(ev)
    local t = ev.target
    if t == js.null then return end
    local key = ui.attr(t, "data-qf-key")
    if not key then return end
    local typ = ui.attr(t, "data-qf-type")
    if typ == "bool" then SESS:setQFBool(key, t.checked)
    elseif typ == "num" then SESS:setQFNum(key, t.value)
    elseif typ == "str" then SESS:setQFStr(key, t.value)
    elseif typ == "arr" then SESS:toggleQFArrayVal(key, ui.attr(t, "data-qf-val"), t.checked) end
    persist_settings()
  end
  ui.on(qf, "change", handle)
  ui.on(qf, "input", handle)
end

-- ---------------------------------------------------------------- mount
local function mount(el)
  body = el
  el.style.height = "auto"; el.style.maxHeight = "none"
  el.style.display = "flex"; el.style.flexDirection = "column"

  load_prefs()
  init_session()
  view = "editor"

  el.innerHTML = table.concat({
    buildbar_html(),
    toolbar_html(),
    output_panel_html(),
    '<div class="fe-qf" id="fe-qf" style="height:', HEIGHTS[P.size], ';display:none"></div>',
    '<div class="fe-host" id="fe-host" style="height:', HEIGHTS[P.size], '">',
      '<div class="fe-loading" id="fe-loading"><span class="spinner-border spinner-border-sm"></span> Loading editor…</div>',
    '</div>',
    footer_html(),
  })
  wire_editor()
  wire_builder()
  wire_quickfilters()
  refresh_mode()

  local host = el:querySelector("#fe-host")
  local text = SESS and tostring(SESS:output()) or (ui.store_get(PREF_TEXT) or STARTER)
  update_counts(text)

  local em = window.ecMonaco
  if em == nil or em == js.null then
    host.innerHTML = ""
    local ta = document:createElement("textarea")
    ta.className = "fe-fallback"; ta.value = text
    ui.on(ta, "input", function(_, t) on_change(nil, t.value) end)
    host:appendChild(ta)
    return
  end

  em:ready(function()
    if not host.isConnected then return end
    if ED then ED:dispose(); ED = nil end
    local loading = el:querySelector("#fe-loading")
    if loading ~= js.null then loading:remove() end
    ED = em:create(host, text, opts_json(), on_change, on_cursor)
    ED:focus()
  end)
end

local function on_close()
  if ED then ED:dispose(); ED = nil end
  body = nil
end

codex.registry.register{
  id = "filter-editor",
  name = "Filter and Build Editor",
  icon = "bi-funnel",
  order = 22,
  width = 900,
  desc = "A PoE2 filter coding IDE + build engine — syntax highlighting, autocomplete, and a Quick Filters builder that generates the filter.",
  mount = mount,
  on_close = on_close,
}

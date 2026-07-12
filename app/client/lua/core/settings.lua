-- codex.settings — Zygor-style options window (700×500, group sidebar).
-- Everything is translated via codex.T, typography uses real page zoom,
-- game paths have working Browse/Auto-locate in the desktop shell, and
-- settings sync to OUR Supabase project's existing app_settings table.
local js = require "js"
local window = js.global
local document = window.document
local ui = codex.ui
local T = function(k) return codex.T(k) end

codex.settings = {}
local S = codex.settings

local function esc(s)
  return (tostring(s):gsub("&", "&amp;"):gsub("<", "&lt;"):gsub(">", "&gt;"):gsub('"', "&quot;"))
end

local function shell()
  if window.exileShell ~= nil and window.exileShell ~= js.null then return window.exileShell end
  return nil
end

-- Developer mode is a *session* unlock (tap About six times). On the desktop it
-- lives in the shell's main process, so it survives a window<->overlay switch
-- but relocks when the app fully closes. In the browser build it falls back to
-- sessionStorage (per tab). It is deliberately NOT an ec.* pref, so it never
-- persists to SavedVariables across launches.
local function dev_unlocked()
  local sh = shell()
  if sh ~= nil and sh.getDevUnlocked ~= nil then
    local ok, v = pcall(function() return sh:getDevUnlocked() end)
    if ok then return v and true or false end
  end
  local ok, v = pcall(function() return window.sessionStorage:getItem("ecDevUnlocked") end)
  return ok and v == "1"
end
local function set_dev_unlocked(v)
  local sh = shell()
  if sh ~= nil and sh.setDevUnlocked ~= nil then
    pcall(function() sh:setDevUnlocked(v and true or false) end)
  end
  pcall(function() window.sessionStorage:setItem("ecDevUnlocked", v and "1" or "0") end)
end

-- ---------------------------------------------------------------- themes

local THEME_VARS = {
  "--ec-bg", "--ec-panel", "--ec-panel-2", "--ec-panel-3",
  "--ec-gold", "--ec-gold-dim", "--ec-gold-bg",
  "--ec-text", "--ec-text-strong", "--ec-text-soft",
  "--ec-border", "--ec-border-soft",
}

local THEMES = {
  { id = "midnight", name = "Midnight", swatch = "#e5661a",
    desc = "The Zygor look — black glass, white text, ember accent.",
    vars = {
      ["--ec-bg"] = "#0a0a0a", ["--ec-panel"] = "rgba(14,14,14,0.92)", ["--ec-panel-2"] = "rgba(8,8,8,0.95)", ["--ec-panel-3"] = "#0c0c0c",
      ["--ec-gold"] = "#e5661a", ["--ec-gold-dim"] = "#c07a45", ["--ec-gold-bg"] = "#2b1505",
      ["--ec-text"] = "#d9d9d9", ["--ec-text-strong"] = "#ffffff", ["--ec-text-soft"] = "#a8a8a8",
      ["--ec-border"] = "#333333", ["--ec-border-soft"] = "#222222",
    } },
  { id = "exile", name = "Exile", swatch = "#c9a45c",
    desc = "The in-game window look — dark stone, parchment text, gold trim." },
  { id = "ember", name = "Ember", swatch = "#ff6b4a",
    desc = "Warm charcoal with molten coral and amber accents.",
    vars = {
      ["--ec-bg"] = "#0f0e0d", ["--ec-panel"] = "#1a1714", ["--ec-panel-2"] = "#151311", ["--ec-panel-3"] = "#11100e",
      ["--ec-gold"] = "#ff6b4a", ["--ec-gold-dim"] = "#b98874", ["--ec-gold-bg"] = "#301b13",
      ["--ec-text"] = "#c7beb4", ["--ec-text-strong"] = "#ece5db", ["--ec-text-soft"] = "#a89e94",
      ["--ec-border"] = "#41332b", ["--ec-border-soft"] = "#2e2620",
    } },
  { id = "abyss", name = "Abyss", swatch = "#38c8b0",
    desc = "Cool slate with teal and cyan accents.",
    vars = {
      ["--ec-bg"] = "#0c1012", ["--ec-panel"] = "#141a1d", ["--ec-panel-2"] = "#101518", ["--ec-panel-3"] = "#0d1214",
      ["--ec-gold"] = "#38c8b0", ["--ec-gold-dim"] = "#6fa196", ["--ec-gold-bg"] = "#0f2b25",
      ["--ec-text"] = "#b0bec3", ["--ec-text-strong"] = "#dce8ec", ["--ec-text-soft"] = "#93a3a9",
      ["--ec-border"] = "#2b3a40", ["--ec-border-soft"] = "#1f2c31",
    } },
  { id = "arcane", name = "Arcane", swatch = "#b27cf0",
    desc = "Midnight violet with orchid accents.",
    vars = {
      ["--ec-bg"] = "#100d16", ["--ec-panel"] = "#1a1622", ["--ec-panel-2"] = "#15121c", ["--ec-panel-3"] = "#110e18",
      ["--ec-gold"] = "#b27cf0", ["--ec-gold-dim"] = "#8b76a8", ["--ec-gold-bg"] = "#261a3a",
      ["--ec-text"] = "#bfb6d0", ["--ec-text-strong"] = "#e6def6", ["--ec-text-soft"] = "#9f95b4",
      ["--ec-border"] = "#3a2f4d", ["--ec-border-soft"] = "#2a2338",
    } },
}

local function apply_theme()
  local id = ui.store_get("ec.theme") or "midnight"
  local theme = THEMES[1]
  for _, t in ipairs(THEMES) do
    if t.id == id then theme = t end
  end
  local root = document.documentElement
  for _, k in ipairs(THEME_VARS) do
    root.style:removeProperty(k)
  end
  if theme.vars then
    for k, v in pairs(theme.vars) do
      root.style:setProperty(k, v)
    end
  end
end

-- Real zoom: webFrame in the shell (scales EVERYTHING), CSS zoom in browser.
local function apply_typography()
  local scale = tonumber(ui.store_get("ec.fontscale") or "1") or 1
  local sh = shell()
  if sh then
    sh:setZoom(scale)
    document.body.style.zoom = ""
  else
    document.body.style.zoom = (scale == 1) and "" or tostring(scale)
  end
  local font = ui.store_get("ec.font") or "system"
  if font == "fontin" then
    document.body.style.fontFamily = "'Fontin', serif"
  else
    document.body.style.fontFamily = ""
  end
end

-- Push the stored Game-overlay prefs to the shell (arm hotkey / pin display).
local function push_overlay()
  local sh = shell()
  if sh and sh.setOverlayConfig ~= nil then
    sh:setOverlayConfig(
      ui.store_get("ec.overlay.enabled") == "1",
      ui.store_get("ec.overlay.hotkey") or "Shift+Alt+F",
      ui.store_get("ec.overlay.display") or "auto"
    )
  end
end

function S.apply()
  apply_theme()
  apply_typography()
  push_overlay()
end

-- Open the Settings widget, optionally jumping to a group (e.g. "guides").
function S.open(group)
  if group then ui.store_set("ec.settings.group", group) end
  codex.widgets.spawn{
    id = "__settings", title = "Settings", icon = "bi-gear", width = 700, flush = true,
    mount = function(b) S.mount(b) end,
  }
end

-- ---------------------------------------------------------------- data

local LEAGUES = {
  { id = "return-of-the-ancients", label = "Return of the Ancients — current" },
  { id = "standard", label = "Standard" },
  { id = "hardcore", label = "Hardcore" },
}

local LANGS = {
  { id = "en", label = "English" },
  { id = "ru", label = "Русский" },
  { id = "pt", label = "Português" },
  { id = "de", label = "Deutsch" },
  { id = "zh", label = "中文" },
}

local GROUPS = {
  { id = "general", name = "General", icon = "bi-sliders" },
  { id = "steps", name = "Step display", icon = "bi-list-check" },
  { id = "tracker", name = "Run Tracker", icon = "bi-stopwatch" },
  { id = "guidewin", name = "Guide window", icon = "bi-window-stack" },
  { id = "display", name = "Display", icon = "bi-palette" },
  { id = "paths", name = "Game paths", icon = "bi-folder2-open" },
  { id = "detection", name = "Smart detection", icon = "bi-broadcast" },
  { id = "overlay", name = "Game overlay", icon = "bi-pip" },
  { id = "about", name = "About", icon = "bi-info-circle" },
}
-- Groups revealed only when developer mode is unlocked (Settings → tap About 6×).
local DEV_GROUPS = {
  { id = "sync", name = "Sync (Supabase)", icon = "bi-cloud" },
  { id = "developer", name = "Developer", icon = "bi-bug" },
}

local about_taps = 0
local body_el = nil

-- our stable client id for settings sync (matches app_settings.client_id)
local function client_id()
  local id = ui.store_get("ec.client")
  if id then return id end
  local ok, uuid = pcall(function() return tostring(window.crypto:randomUUID()) end)
  id = ok and uuid or ("ec-" .. os.time() .. "-" .. math.random(100000, 999999))
  ui.store_set("ec.client", id)
  return id
end

-- effective supabase config: stored override, else the shell's .env.local
local function sb_config()
  local sh = shell()
  local env_url, env_key = "", ""
  if sh and sh.supabase ~= js.null and sh.supabase ~= nil then
    env_url = tostring(sh.supabase.url or "")
    env_key = tostring(sh.supabase.key or "")
  end
  local url = ui.store_get("ec.supabase.url")
  local key = ui.store_get("ec.supabase.key")
  if not url or url == "" then url = env_url end
  if not key or key == "" then key = env_key end
  return url, key, (env_url ~= "")
end

-- ---------------------------------------------------------------- html bits

local function sec(title, note, inner)
  local n = note and (' <span class="ec-muted" style="font-size:11px">' .. note .. '</span>') or ""
  return '<div class="ec-panel p-3 mb-2"><label class="form-label">' .. title .. n .. '</label>' .. inner .. '</div>'
end

local function options_html(list, current)
  local parts = {}
  for _, o in ipairs(list) do
    local sel = (o.id == current) and ' selected' or ''
    parts[#parts + 1] = '<option value="' .. o.id .. '"' .. sel .. '>' .. o.label .. '</option>'
  end
  return table.concat(parts)
end

local function toggle_html(id, label, checked, help)
  return table.concat({
    '<div class="form-check form-switch m-0">',
    '<input class="form-check-input" type="checkbox" id="', id, '"', checked and ' checked' or '', '>',
    '<label class="form-check-label" for="', id, '" style="font-size:12px;color:var(--ec-text)">', label, '</label>',
    '</div>',
    help and ('<div class="ec-muted mt-1" style="font-size:11px">' .. help .. '</div>') or '',
  })
end

local function bind_store(pane, sel, key, event, after)
  local el = pane:querySelector(sel)
  if el == js.null then return end
  ui.on(el, event or "change", function()
    ui.store_set(key, tostring(el.value))
    if after then after() end
  end)
end

local function bind_toggle(pane, sel, key, after)
  local el = pane:querySelector(sel)
  if el == js.null then return end
  ui.on(el, "change", function()
    ui.store_set(key, el.checked and "1" or "0")
    if after then after() end
  end)
end

local function rerender_guide()
  if codex.guide and codex.guide.render then codex.guide.render() end
end

-- ---------------------------------------------------------------- groups

local RENDER = {}

RENDER.general = function(pane)
  local parts = {}
  parts[#parts + 1] = sec(T("Widget to open on launch"), nil, table.concat({
    '<select id="set-default" class="form-select form-select-sm">',
    (function()
      local opts = {}
      local current = ui.store_get("ec.default_view") or "campaign-guide"
      for _, p in ipairs(codex.registry.visible()) do
        opts[#opts + 1] = '<option value="' .. p.id .. '"' .. (p.id == current and ' selected' or '') .. '>' .. p.name .. '</option>'
      end
      return table.concat(opts)
    end)(),
    '</select>',
  }))
  parts[#parts + 1] = sec(T("Language"), nil, table.concat({
    '<select id="set-lang" class="form-select form-select-sm">',
    options_html(LANGS, ui.store_get("ec.lang") or "en"),
    '</select>',
  }))
  parts[#parts + 1] = sec(T("League"), nil, table.concat({
    '<select id="set-league" class="form-select form-select-sm">',
    options_html(LEAGUES, ui.store_get("ec.league") or "return-of-the-ancients"),
    '</select>',
  }))
  parts[#parts + 1] = sec(T("Launcher orb"), nil,
    '<div class="ec-dim" style="font-size:12px;line-height:1.7"><span class="ec-chip" style="font-size:11px">Alt+1</span></div>')
  pane.innerHTML = table.concat(parts)
  bind_store(pane, "#set-default", "ec.default_view")
  bind_store(pane, "#set-league", "ec.league")
  -- language: switch i18n + re-render every open widget and the menu
  local lang_sel = pane:querySelector("#set-lang")
  ui.on(lang_sel, "change", function()
    codex.i18n.set(tostring(lang_sel.value))
    if codex.refresh_ui then codex.refresh_ui() end
    codex.widgets.refresh_all()
  end)
end

-- Run Tracker (LiveSplit-style speedrun timer) config. The tracker plugin +
-- the guide's History button read these same ec.tracker.* keys.
local function rt_render_editor(pane)
  local host = pane:querySelector("#set-rt-editor")
  if host == js.null then return end
  if (ui.store_get("ec.tracker.splitset") or "acts") ~= "custom" then host.innerHTML = ""; return end
  local rules = (codex.tracker and codex.tracker.custom_rules and codex.tracker.custom_rules()) or {}
  local rows = {}
  for i, r in ipairs(rules) do
    rows[#rows + 1] = table.concat({
      '<div class="rt-erow" data-i="', i, '">',
      '<input class="form-control form-control-sm rt-elabel" placeholder="Label" value="', esc(r.label or ""), '">',
      '<select class="form-select form-select-sm rt-etype" style="max-width:82px">',
      '<option value="zone"', (r.type == "zone" and " selected" or ""), '>Zone</option>',
      '<option value="level"', (r.type == "level" and " selected" or ""), '>Level</option></select>',
      '<input class="form-control form-control-sm rt-eval" placeholder="', r.type == "level" and "N" or "Zone name", '" value="', esc(r.type == "level" and tostring(r.n or "") or (r.match or "")), '">',
      '<button class="btn btn-ec-ghost btn-sm rt-edel" title="Remove">&times;</button></div>',
    })
  end
  host.innerHTML = '<div class="rt-editor">' .. table.concat(rows)
    .. '<button id="rt-eadd" class="btn btn-ec-ghost btn-sm mt-1"><i class="bi bi-plus-lg"></i> Add split rule</button></div>'

  local function collect()
    local out = {}
    ui.each(host, ".rt-erow", function(rowEl)
      local ty = tostring(rowEl:querySelector(".rt-etype").value)
      local label = tostring(rowEl:querySelector(".rt-elabel").value)
      local val = tostring(rowEl:querySelector(".rt-eval").value)
      if ty == "level" then out[#out + 1] = { type = "level", n = tonumber(val) or 0, label = label }
      else out[#out + 1] = { type = "zone", match = val, label = label } end
    end)
    ui.store_set("ec.tracker.customrules", codex.json.encode(out))
  end
  ui.each(host, ".rt-erow input, .rt-erow select", function(el) ui.on(el, "change", collect) end)
  ui.each(host, ".rt-edel", function(b) ui.on(b, "click", function()
    local i = tonumber(ui.attr(b:closest(".rt-erow"), "data-i"))
    if i then table.remove(rules, i); ui.store_set("ec.tracker.customrules", codex.json.encode(rules)); rt_render_editor(pane) end
  end) end)
  ui.on(host:querySelector("#rt-eadd"), "click", function()
    rules[#rules + 1] = { type = "zone", match = "", label = "" }
    ui.store_set("ec.tracker.customrules", codex.json.encode(rules)); rt_render_editor(pane)
  end)
end

RENDER.tracker = function(pane)
  local parts = {}
  parts[#parts + 1] = sec(T("Timing"), nil, table.concat({
    toggle_html("set-rt-autostart", "Auto-start the timer on entering a zone", (ui.store_get("ec.tracker.autostart") or "1") == "1"),
    '<div class="mt-2"></div>',
    toggle_html("set-rt-pausetown", "Auto-pause in town / hideout", (ui.store_get("ec.tracker.pausetown") or "1") == "1"),
    '<div class="mt-2"></div>',
    toggle_html("set-rt-loadremoval", "Remove load-screen time", (ui.store_get("ec.tracker.loadremoval") or "1") == "1",
      "Desktop only. Subtracts the game's load time (the gap between requesting a zone and entering it) — the game-time speedrunners compare."),
  }))
  parts[#parts + 1] = sec(T("Auto-splitting"), nil, table.concat({
    toggle_html("set-rt-autosplit", "Auto-split on zones / levels", (ui.store_get("ec.tracker.autosplit") or "1") == "1"),
    '<div class="d-flex gap-2 mt-2 align-items-center"><span style="font-size:12px;color:var(--ec-text-soft)">Split set</span>',
    '<select id="set-rt-splitset" class="form-select form-select-sm" style="max-width:200px">',
    options_html({ { id = "acts", label = "Campaign — Acts" }, { id = "firstzone", label = "Every new zone" }, { id = "custom", label = "Custom…" } }, ui.store_get("ec.tracker.splitset") or "acts"),
    '</select></div>',
    '<div class="ec-muted mt-1" style="font-size:11px">Splits fire the first time you enter the target zone or reach the level. Towns and hideouts never split.</div>',
    '<div id="set-rt-editor" class="mt-2"></div>',
  }))
  parts[#parts + 1] = sec(T("Records"), nil, table.concat({
    '<button id="set-rt-pbreset" class="btn btn-ec-ghost btn-sm">Clear PB &amp; gold splits (current set)</button>',
  }))
  pane.innerHTML = table.concat(parts)
  bind_toggle(pane, "#set-rt-autostart", "ec.tracker.autostart")
  bind_toggle(pane, "#set-rt-pausetown", "ec.tracker.pausetown")
  bind_toggle(pane, "#set-rt-loadremoval", "ec.tracker.loadremoval")
  bind_toggle(pane, "#set-rt-autosplit", "ec.tracker.autosplit")
  bind_store(pane, "#set-rt-splitset", "ec.tracker.splitset", "change", function() rt_render_editor(pane) end)
  local pbr = pane:querySelector("#set-rt-pbreset")
  ui.on(pbr, "click", function()
    if ui.attr(pbr, "data-armed") == "1" then
      if codex.tracker and codex.tracker.reset_pb then codex.tracker.reset_pb() end
      pbr.innerHTML = "Cleared."
    else
      pbr:setAttribute("data-armed", "1"); pbr.innerHTML = "Click again to confirm"
    end
  end)
  rt_render_editor(pane)
end

RENDER.steps = function(pane)
  local parts = {}
  parts[#parts + 1] = sec(T("Upcoming steps shown"), nil, table.concat({
    '<select id="set-nextsteps" class="form-select form-select-sm">',
    options_html({
      { id = "0", label = "0" }, { id = "1", label = "1" },
      { id = "2", label = "2" }, { id = "3", label = "3" },
      { id = "4", label = "4" }, { id = "5", label = "5" },
    }, ui.store_get("ec.guide.next_steps") or "2"),
    '</select>',
  }))
  parts[#parts + 1] = sec(T("Goal lines"), nil, table.concat({
    toggle_html("set-shownotes", T("Show note lines"), (ui.store_get("ec.guide.show_notes") or "1") == "1"),
    '<div class="mt-2"></div>',
    toggle_html("set-showrewards", T("Show reward lines"), (ui.store_get("ec.guide.show_rewards") or "1") == "1"),
    '<div class="mt-2"></div>',
    toggle_html("set-autoadvance", T("Auto-advance completed steps"), (ui.store_get("ec.guide.autoadvance") or "1") == "1"),
  }))
  parts[#parts + 1] = sec(T("Run timer"), nil, table.concat({
    toggle_html("set-timershow", T("Show run timer on the guide"), (ui.store_get("ec.timer.show") or "1") == "1"),
    '<div class="mt-2"></div>',
    toggle_html("set-timerauto", T("Auto-start timer when a guide opens"), (ui.store_get("ec.timer.auto") or "1") == "1"),
  }))
  pane.innerHTML = table.concat(parts)
  bind_store(pane, "#set-nextsteps", "ec.guide.next_steps", "change", rerender_guide)
  bind_toggle(pane, "#set-shownotes", "ec.guide.show_notes", rerender_guide)
  bind_toggle(pane, "#set-showrewards", "ec.guide.show_rewards", rerender_guide)
  bind_toggle(pane, "#set-autoadvance", "ec.guide.autoadvance")
  bind_toggle(pane, "#set-timershow", "ec.timer.show", rerender_guide)
  bind_toggle(pane, "#set-timerauto", "ec.timer.auto")
end

-- Guides — the guide selector (moved here from the guide window): pick a default
-- or custom guide to open, or create a new one in its own popup.
-- Guide window — Zygor's Display group, mirrored: size / font / opacity /
-- height, applied live to the open guides window.
RENDER.guidewin = function(pane)
  local function apply()
    if codex.guide and codex.guide.apply_window then codex.guide.apply_window() end
  end

  local parts = {}
  parts[#parts + 1] = sec(T("Width"), "260–560px", table.concat({
    '<input id="set-gw-width" type="range" min="260" max="560" step="10" class="form-range" value="',
    ui.store_get("ec.guide.width") or "300", '">',
    '<div class="ec-muted" style="font-size:11px"><span id="set-gw-width-v">',
    ui.store_get("ec.guide.width") or "300", '</span> px</div>',
  }))
  parts[#parts + 1] = sec(T("Font size"), T("applies instantly"), table.concat({
    '<select id="set-gw-font" class="form-select form-select-sm">',
    options_html({
      { id = "0.85", label = "85%" }, { id = "1", label = "100%" },
      { id = "1.15", label = "115%" }, { id = "1.3", label = "130%" },
      { id = "1.4", label = "140%" },
    }, ui.store_get("ec.guide.fontscale") or "1"),
    '</select>',
  }))
  parts[#parts + 1] = sec(T("Opacity"), nil, table.concat({
    toggle_html("set-gw-opon", T("Enable window opacity"), ui.store_get("ec.guide.opacity_on") == "1"),
    '<input id="set-gw-op" type="range" min="0.6" max="1" step="0.05" class="form-range mt-2" value="',
    ui.store_get("ec.guide.opacity") or "1", '">',
  }))
  parts[#parts + 1] = sec(T("Reset window"), nil,
    '<button id="set-gw-reset" class="btn btn-ec-ghost btn-sm">' .. T("Reset window") .. '</button>')
  pane.innerHTML = table.concat(parts)

  local wr = pane:querySelector("#set-gw-width")
  ui.on(wr, "input", function()
    local v = pane:querySelector("#set-gw-width-v")
    if v ~= js.null then v.innerHTML = tostring(wr.value) end
    if codex.guide and codex.guide.set_width then codex.guide.set_width(wr.value) end
  end)
  bind_store(pane, "#set-gw-font", "ec.guide.fontscale", "change", apply)
  bind_toggle(pane, "#set-gw-opon", "ec.guide.opacity_on", apply)
  local opr = pane:querySelector("#set-gw-op")
  ui.on(opr, "input", function()
    ui.store_set("ec.guide.opacity", tostring(opr.value))
    apply()
  end)

  ui.on(pane:querySelector("#set-gw-reset"), "click", function()
    for _, k in ipairs({ "ec.guide.width", "ec.guide.fontscale", "ec.guide.opacity",
      "ec.guide.opacity_on", "ec.guide.fixedheight", "ec.widget.campaign-guide" }) do
      window.localStorage:removeItem(k)
    end
    if codex.widgets.is_open("campaign-guide") then
      codex.widgets.close("campaign-guide")
      codex.widgets.open_plugin("campaign-guide")
    end
    RENDER.guidewin(pane)
  end)
end

RENDER.display = function(pane)
  local theme_id = ui.store_get("ec.theme") or "midnight"
  local cards = { '<div class="d-grid gap-2" style="grid-template-columns:1fr 1fr">' }
  for _, t in ipairs(THEMES) do
    local on = (t.id == theme_id)
    cards[#cards + 1] = table.concat({
      '<button class="text-start p-2" data-theme="', t.id, '" style="background:var(--ec-panel-3);border:1px solid ',
      on and t.swatch or 'var(--ec-border-soft)', ';border-radius:6px;cursor:pointer">',
      '<span style="display:inline-block;width:12px;height:12px;border-radius:50%;background:', t.swatch, ';vertical-align:-1px"></span> ',
      '<span style="color:', t.swatch, ';font-size:13px;font-weight:500">', t.name, '</span>',
      on and ' <span class="ec-chip ec-chip-gold" style="font-size:10px">&check;</span>' or '',
      '<div class="ec-dim mt-1" style="font-size:11px;line-height:1.5">', t.desc, '</div>',
      '</button>',
    })
  end
  cards[#cards + 1] = '</div>'

  local parts = {}
  parts[#parts + 1] = sec(T("Theme"), T("applies instantly"), table.concat(cards))
  parts[#parts + 1] = sec(T("Typography"), T("applies instantly"), table.concat({
    '<div class="d-flex gap-2">',
    '<select id="set-font" class="form-select form-select-sm">',
    options_html({
      { id = "system", label = "System UI" },
      { id = "fontin", label = "Fontin — PoE" },
    }, ui.store_get("ec.font") or "system"),
    '</select>',
    '<select id="set-fontscale" class="form-select form-select-sm">',
    options_html({
      { id = "0.9", label = "90%" },
      { id = "1", label = "100%" },
      { id = "1.1", label = "110%" },
      { id = "1.25", label = "125%" },
      { id = "1.5", label = "150%" },
    }, ui.store_get("ec.fontscale") or "1"),
    '</select>',
    '</div>',
    '<div class="ec-muted mt-1" style="font-size:11px">Zooms the whole app — every widget, the orb, everything.</div>',
  }))
  pane.innerHTML = table.concat(parts)

  ui.each(pane, "[data-theme]", function(btn)
    ui.on(btn, "click", function()
      ui.store_set("ec.theme", ui.attr(btn, "data-theme"))
      S.apply()
      RENDER.display(pane)
    end)
  end)
  bind_store(pane, "#set-font", "ec.font", "change", S.apply)
  bind_store(pane, "#set-fontscale", "ec.fontscale", "change", S.apply)
end

RENDER.paths = function(pane)
  local sh = shell()
  local function path_row(id, label, key, is_file, kind)
    local v = ui.store_get(key) or ""
    local dis = sh and "" or " disabled"
    return table.concat({
      '<div class="mb-2"><label class="form-label">', label, '</label>',
      '<div class="d-flex gap-2">',
      '<input id="', id, '" class="form-control form-control-sm" value="', esc(v), '">',
      '<button class="btn btn-ec-ghost btn-sm text-nowrap" data-browse="', id, '" data-file="', is_file and "1" or "0", '"', dis, '>', T("Browse"), '</button>',
      '<button class="btn btn-ec-ghost btn-sm text-nowrap" data-auto="', id, '" data-kind="', kind, '"', dis, '>', T("Auto-locate"), '</button>',
      '</div></div>',
    })
  end

  local note = sh and "" or ('<div class="ec-muted mb-2" style="font-size:11px">' .. T("desktop shell") .. ' &mdash; Browse/Auto-locate need the desktop app; typing paths works anywhere.</div>')
  pane.innerHTML = sec(T("Game paths"), nil, table.concat({
    note,
    path_row("set-path-game", T("PoE2 game folder"), "ec.path.game", false, "game"),
    path_row("set-path-clienttxt", T("Client.txt file"), "ec.path.clienttxt", true, "clienttxt"),
    path_row("set-path-filters", T("Filter output folder"), "ec.path.filters", false, "filters"),
  })) .. sec(T("Detection status"), nil,
    '<div id="set-conn">' .. (codex.detect and codex.detect.status_html() or "") .. '</div>')

  local KEYS = {
    ["set-path-game"] = "ec.path.game",
    ["set-path-clienttxt"] = "ec.path.clienttxt",
    ["set-path-filters"] = "ec.path.filters",
  }
  for id, key in pairs(KEYS) do
    bind_store(pane, "#" .. id, key, "change")
  end
  -- typing/pasting a Client.txt path re-points the detection watcher live
  local ct = pane:querySelector("#set-path-clienttxt")
  if ct ~= js.null then
    ui.on(ct, "change", function() if codex.detect then codex.detect.start() end end)
  end
  if not sh then return end

  -- Auto-locate any path that's still empty as soon as the pane opens, so the
  -- common case needs zero clicks. Silent — only fills on a hit.
  local AUTO = {
    { id = "set-path-game", key = "ec.path.game", kind = "game" },
    { id = "set-path-clienttxt", key = "ec.path.clienttxt", kind = "clienttxt" },
    { id = "set-path-filters", key = "ec.path.filters", kind = "filters" },
  }
  for _, a in ipairs(AUTO) do
    if (ui.store_get(a.key) or "") == "" then
      sh:autoLocate(a.kind, ui.store_get("ec.path.game") or "", function(_, p)
        if p ~= js.null and p ~= nil then
          local input = pane:querySelector("#" .. a.id)
          if input ~= js.null then input.value = tostring(p) end
          ui.store_set(a.key, tostring(p))
          if codex.detect then codex.detect.start() end
        end
      end)
    end
  end

  ui.each(pane, "[data-browse]", function(btn)
    ui.on(btn, "click", function()
      local target = ui.attr(btn, "data-browse")
      local is_file = ui.attr(btn, "data-file") == "1"
      sh:pickPath(is_file, function(_, p)
        if p ~= js.null and p ~= nil then
          local input = pane:querySelector("#" .. target)
          input.value = tostring(p)
          ui.store_set(KEYS[target], tostring(p))
          if codex.detect then codex.detect.start() end
        end
      end)
    end)
  end)
  ui.each(pane, "[data-auto]", function(btn)
    ui.on(btn, "click", function()
      local target = ui.attr(btn, "data-auto")
      local kind = ui.attr(btn, "data-kind")
      sh:autoLocate(kind, ui.store_get("ec.path.game") or "", function(_, p)
        if p ~= js.null and p ~= nil then
          local input = pane:querySelector("#" .. target)
          input.value = tostring(p)
          ui.store_set(KEYS[target], tostring(p))
          if codex.detect then codex.detect.start() end
        else
          btn.innerHTML = T("Not found")
          window:setTimeout(function() btn.innerHTML = T("Auto-locate") end, 1600)
        end
      end)
    end)
  end)
end

RENDER.detection = function(pane)
  pane.innerHTML = sec(T("Detection status"), nil,
    '<div id="set-det-live">' .. (codex.detect and codex.detect.status_html() or "") .. '</div>')
  .. sec(T("Detection"), T("desktop shell"), table.concat({
    toggle_html("set-det-zone", "Zone detection", (ui.store_get("ec.det.zone") or "1") == "1"),
    '<div class="mt-2"></div>',
    toggle_html("set-det-level", "Level detection", (ui.store_get("ec.det.level") or "1") == "1"),
    '<div class="mt-2"></div>',
    toggle_html("set-det-advance", "Auto-complete goals from the log", (ui.store_get("ec.det.advance") or "1") == "1"),
    '<div class="ec-muted mt-2" style="font-size:11px">Reads the Client.txt set under Game paths. Wiring lands with the watcher.</div>',
  }))
  bind_toggle(pane, "#set-det-zone", "ec.det.zone")
  bind_toggle(pane, "#set-det-level", "ec.det.level")
  bind_toggle(pane, "#set-det-advance", "ec.det.advance")
end

RENDER.overlay = function(pane)
  pane.innerHTML = sec(T("Game overlay"), T("desktop shell"), table.concat({
    toggle_html("set-ov-on", "Enable game overlay", ui.store_get("ec.overlay.enabled") == "1"),
    '<div class="d-flex gap-2 mt-2">',
    '<select id="set-ov-side" class="form-select form-select-sm">',
    options_html({
      { id = "right", label = "Snap right" },
      { id = "left", label = "Snap left" },
    }, ui.store_get("ec.overlay.side") or "right"),
    '</select>',
    '<select id="set-ov-display" class="form-select form-select-sm">',
    options_html({
      { id = "auto", label = "Display: auto" },
      { id = "primary", label = "Display: primary" },
    }, ui.store_get("ec.overlay.display") or "auto"),
    '</select>',
    '<input id="set-ov-hotkey" class="form-control form-control-sm" style="max-width:130px" value="',
    ui.store_get("ec.overlay.hotkey") or "Shift+Alt+F", '">',
    '</div>',
    '<div class="ec-muted mt-1" style="font-size:11px"><b>Off (default):</b> ExileCodex runs as a normal resizable window. '
      .. '<b>On:</b> it reloads as a transparent, click-through overlay on top of the game — the show/hide hotkey arms (works while PoE2 is focused); run PoE2 in Borderless so the overlay can sit on top. Switching reloads the app.</div>',
  }))
  bind_toggle(pane, "#set-ov-on", "ec.overlay.enabled", push_overlay)
  bind_store(pane, "#set-ov-side", "ec.overlay.side")
  bind_store(pane, "#set-ov-display", "ec.overlay.display", "change", push_overlay)
  bind_store(pane, "#set-ov-hotkey", "ec.overlay.hotkey", "change", push_overlay)

  -- populate the display picker with the real monitors from the shell
  local sh = shell()
  if sh and sh.listDisplays ~= nil then
    sh:listDisplays(function(_, list)
      local sel = pane:querySelector("#set-ov-display")
      if sel == js.null or list == nil or list == js.null then return end
      local cur = ui.store_get("ec.overlay.display") or "auto"
      local opts = { '<option value="auto"' .. (cur == "auto" and ' selected' or '') .. '>Display: auto</option>' }
      local n = tonumber(list.length) or 0
      for i = 0, n - 1 do
        local d = list[i]
        local id = tostring(d.id)
        opts[#opts + 1] = '<option value="' .. id .. '"' .. (cur == id and ' selected' or '') .. '>' .. esc(tostring(d.label)) .. '</option>'
      end
      sel.innerHTML = table.concat(opts)
    end)
  end
end

-- (Filter output settings moved into the Filter Editor plugin's "Output" panel.)

RENDER.sync = function(pane)
  local url, key, from_env = sb_config()
  local parts = {}
  parts[#parts + 1] = sec(T("Sync (Supabase)"), from_env and "auto-configured from .env.local" or nil, table.concat({
    '<input id="set-sburl" class="form-control form-control-sm mb-2" placeholder="Project URL" value="', esc(url), '">',
    '<input id="set-sbkey" class="form-control form-control-sm mb-2" placeholder="Publishable key" value="', esc(key), '">',
    '<div class="d-flex gap-2">',
    '<button id="set-backup" class="btn btn-ec btn-sm">', T("Back up settings now"), '</button>',
    '<button id="set-restore" class="btn btn-ec-ghost btn-sm">', T("Restore settings"), '</button>',
    '</div>',
    '<div id="set-syncstatus" class="ec-muted mt-2" style="font-size:11px">&nbsp;</div>',
    '<div class="ec-muted mt-1" style="font-size:11px">Device id: <span style="font-family:monospace">', esc(client_id()), '</span></div>',
  }))
  pane.innerHTML = table.concat(parts)
  bind_store(pane, "#set-sburl", "ec.supabase.url")
  bind_store(pane, "#set-sbkey", "ec.supabase.key")

  local status = pane:querySelector("#set-syncstatus")
  local function say(msg, good)
    status.innerHTML = '<span style="color:' .. (good and "#61e05e" or "#ff8a5c") .. '">' .. esc(msg) .. '</span>'
  end

  ui.on(pane:querySelector("#set-backup"), "click", function()
    local u, k = sb_config()
    if u == "" or k == "" then say("No Supabase URL/key configured", false) return end
    -- gather every ec.* preference into one json blob
    local prefs = {}
    local storage = window.localStorage
    for i = 0, storage.length - 1 do
      local sk = tostring(storage:key(i))
      if sk:sub(1, 3) == "ec." and sk ~= "ec.client" then
        prefs[sk] = tostring(storage:getItem(sk))
      end
    end
    say("Backing up…", true)
    window.ecSync:backup(u, k, client_id(), codex.json.encode(prefs), function(_, result)
      local r = tostring(result)
      say(r == "ok" and "Settings backed up" or ("Backup failed: " .. r), r == "ok")
    end)
  end)

  ui.on(pane:querySelector("#set-restore"), "click", function()
    local u, k = sb_config()
    if u == "" or k == "" then say("No Supabase URL/key configured", false) return end
    say("Restoring…", true)
    window.ecSync:restore(u, k, client_id(), function(_, prefsJson)
      if prefsJson == js.null or prefsJson == nil then
        say("No backup found for this device id", false)
        return
      end
      local prefs = codex.json.decode(tostring(prefsJson))
      if not prefs then say("Backup was unreadable", false) return end
      for sk, v in pairs(prefs) do
        ui.store_set(sk, v)
      end
      say("Settings restored — applying", true)
      codex.i18n.lang = ui.store_get("ec.lang") or "en"
      S.apply()
      if codex.refresh_ui then codex.refresh_ui() end
      codex.widgets.refresh_all()
    end)
  end)
end

RENDER.about = function(pane)
  local parts = {}
  local U = codex.update or {}
  local ver = (U.version and U.version()) or codex.VERSION
  local desktop = U.available and U.available()
  parts[#parts + 1] = sec(T("Updates"), T("desktop shell"), table.concat({
    '<div class="d-flex align-items-center gap-2 flex-wrap">',
    '<span style="font-size:12px;color:var(--ec-text)">', T("Current version"), ' <span style="color:var(--ec-gold);font-family:monospace">v', esc(ver), '</span></span>',
    desktop and ('<button id="set-checkupd" class="btn btn-ec-ghost btn-sm"><i class="bi bi-arrow-repeat"></i> ' .. T("Check for updates") .. '</button>') or '',
    '<span id="set-updstatus" class="ec-muted" style="font-size:11.5px"></span>',
    '</div>',
    (not desktop) and ('<div class="ec-muted mt-1" style="font-size:11px">' .. T("Automatic updates are available in the desktop app.") .. '</div>') or '',
  }))
  parts[#parts + 1] = sec(T("Credits and licenses"), nil, table.concat({
    '<div class="ec-dim" style="font-size:11px;line-height:1.7">',
    'Open source under <a href="https://github.com/NolvusMadeIt/exilecodex/blob/main/LICENSE" target="_blank" rel="noopener">GPL-3.0</a>. ',
    'Item Database, Modifiers, Crafting, Character and Map Regex are powered by ',
    '<a href="https://github.com/XileHUD/poe_overlay" target="_blank" rel="noopener">XileHUD</a> (GPL-3.0). ',
    'Market and price data via poe2scout; articles via the PoE2 Wiki. Full details in ATTRIBUTION.md.',
    '<div class="ec-muted mt-1">Unofficial fan-made tool — not affiliated with or endorsed by Grinding Gear Games.</div>',
    '</div>',
  }))
  pane.innerHTML = table.concat(parts)

  if desktop then
    local btn = pane:querySelector("#set-checkupd")
    if btn ~= js.null then ui.on(btn, "click", function() codex.update.check() end) end
    local function paint_status()
      local s = pane:querySelector("#set-updstatus")
      if s == nil or s == js.null or not s.isConnected then return end
      local st = codex.update.status
      local txt = ""
      if st == "checking" then txt = T("Checking for updates…")
      elseif st == "available" then txt = T("Downloading update…")
      elseif st == "progress" then txt = T("Downloading") .. " " .. tostring(codex.update.percent or 0) .. "%"
      elseif st == "downloaded" then txt = T("Update ready — restart to apply.")
      elseif st == "none" then txt = T("You're on the latest version.")
      elseif st == "error" then txt = T("Update check failed — try again later.")
      end
      s.textContent = txt
    end
    paint_status()
    if codex.update.on_change then codex.update.on_change(paint_status) end
  end
end

RENDER.developer = function(pane)
  pane.innerHTML = sec(T("Developer"), "session", table.concat({
    toggle_html("set-devmode", "Developer mode", ui.store_get("ec.devMode") == "1"),
    '<div class="ec-muted mt-2" style="font-size:11px">Unlocked for this session. It relocks automatically when ExileCodex is fully closed (window or overlay).</div>',
    '<button id="set-devlock" class="btn btn-ec-ghost btn-sm mt-2"><i class="bi bi-lock"></i> Relock now</button>',
  }))
  bind_toggle(pane, "#set-devmode", "ec.devMode")
  ui.on(pane:querySelector("#set-devlock"), "click", function()
    set_dev_unlocked(false)
    ui.store_set("ec.settings.group", "general")
    S.mount(body_el)
  end)
end

-- A themed, self-dismissing "unlocked" toast (PoE-flavoured), shown on the
-- easter egg. Uses a pure CSS animation so no timers are needed.
local function show_dev_unlock()
  local el = document:createElement("div")
  el.className = "ec-devtoast"
  el.innerHTML = table.concat({
    '<i class="bi bi-unlock-fill"></i>',
    '<div><div class="ec-devtoast-title">Developer mode unlocked</div>',
    '<div class="ec-devtoast-sub">The veil parts. The Developer panel is yours — until the app is closed.</div></div>',
  })
  document.body:appendChild(el)
  ui.on(el, "animationend", function()
    if el.parentNode ~= nil and el.parentNode ~= js.null then el.parentNode:removeChild(el) end
  end)
end

-- ---------------------------------------------------------------- widget

local function groups_list()
  local list = {}
  for _, grp in ipairs(GROUPS) do list[#list + 1] = grp end
  if dev_unlocked() then
    for _, grp in ipairs(DEV_GROUPS) do list[#list + 1] = grp end
  end
  return list
end

local function select_group(id)
  ui.store_set("ec.settings.group", id)
  local pane = body_el:querySelector("#set-pane")
  ui.each(body_el, ".set-nav-btn", function(btn)
    if ui.attr(btn, "data-group") == id then
      btn.classList:add("active")
    else
      btn.classList:remove("active")
    end
  end)
  local render = RENDER[id] or RENDER.general
  render(pane)
end

function S.mount(body)
  body_el = body
  local current = ui.store_get("ec.settings.group") or "general"
  local list = groups_list()
  local ok = false
  for _, grp in ipairs(list) do
    if grp.id == current then ok = true end
  end
  if not ok then current = "general" end

  local parts = { '<div class="set-wrap">' }
  parts[#parts + 1] = '<div class="set-nav">'
  parts[#parts + 1] = '<div id="set-title" class="set-title ec-title">' .. T("Settings") .. '</div>'
  for _, grp in ipairs(list) do
    parts[#parts + 1] = '<button class="set-nav-btn" data-group="' .. grp.id .. '">'
      .. '<i class="bi ' .. grp.icon .. '"></i> ' .. T(grp.name) .. '</button>'
  end
  parts[#parts + 1] = '</div>'
  parts[#parts + 1] = '<div id="set-pane" class="set-pane"></div>'
  parts[#parts + 1] = '</div>'
  -- Footer: the version / launcher hint (retired from the floating corner).
  -- Shown in the normal desktop window only — never over the game overlay.
  local sh = shell()
  local is_overlay = sh ~= nil and sh.mode ~= nil and tostring(sh.mode) == "overlay"
  if not is_overlay then
    parts[#parts + 1] = '<div class="set-footer">ExileCodex ' .. codex.VERSION .. ' &middot; Alt+1 launcher</div>'
  end
  body.innerHTML = table.concat(parts)

  ui.each(body, ".set-nav-btn", function(btn)
    ui.on(btn, "click", function()
      local id = ui.attr(btn, "data-group")
      -- Easter egg: six clicks on About unlocks the Developer section for this
      -- session (only counts real clicks, resets if you visit another group).
      if id == "about" and not dev_unlocked() then
        about_taps = about_taps + 1
        if about_taps >= 6 then
          about_taps = 0
          set_dev_unlocked(true)
          show_dev_unlock()
          ui.store_set("ec.settings.group", "developer")
          S.mount(body)
          return
        end
      elseif id ~= "about" then
        about_taps = 0
      end
      select_group(id)
    end)
  end)

  select_group(current)
end

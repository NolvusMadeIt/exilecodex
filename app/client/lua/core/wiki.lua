-- codex.wiki — the in-app help library. Each plugin can ship a wiki page at
-- app/addons/<id>/wiki/index.html; the ? button on its widget title bar opens
-- it here in a floating help widget. This is the seed of a growing help library
-- explaining how our tools work.
local js = require "js"
local window = js.global
local ui = codex.ui

codex.wiki = {}

-- path is relative to app/addons/, e.g. "xile-tools/wiki/index.html"
function codex.wiki.open(path, title)
  if not path or path == "" then return end
  codex.widgets.spawn{
    id = "wiki:" .. path,
    title = (title or "Help") .. " \u{00b7} Help",
    icon = "bi-question-circle",
    width = 600,
    mount = function(body)
      body.innerHTML = '<div class="ec-wiki"><div class="ec-wiki-load">Loading help\u{2026}</div></div>'
      local h = window.ecHtml
      local host = body:querySelector(".ec-wiki")
      if h == nil or h == js.null then
        if host then host.innerHTML = '<div class="ec-wiki-load">Help is only available in the desktop app.</div>' end
        return
      end
      h:get("../../addons/" .. path, function(_, html)
        if host == nil or host == js.null then return end
        if html == nil or html == js.null then
          host.innerHTML = '<div class="ec-wiki-load">This help page hasn\'t been written yet.</div>'
          return
        end
        host.innerHTML = tostring(html)
      end)
    end,
  }
end

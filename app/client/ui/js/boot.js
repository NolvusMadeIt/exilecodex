// Dev-time safety net: surface any uncaught Lua/JS error as a visible banner
// instead of a silent blank screen. The Lua side never needs to touch this.
window.addEventListener('error', function (e) {
  var el = document.getElementById('boot-error')
  if (!el) return
  el.classList.remove('d-none')
  var msg = e.message || (e.error && String(e.error)) || 'unknown error'
  var line = document.createElement('div')
  line.textContent = '⚠ ' + msg + (e.filename ? '  (' + e.filename.split('/').slice(-2).join('/') + ':' + e.lineno + ')' : '')
  el.appendChild(line)
})

// Supabase settings sync — plain fetch helpers so the Lua side only deals in
// strings + callbacks. Uses OUR project's existing app_settings table
// (client_id text pk, prefs jsonb, updated_at).
window.ecSync = {
  backup: function (url, key, clientId, prefsJson, cb) {
    fetch(url + '/rest/v1/app_settings?on_conflict=client_id', {
      method: 'POST',
      headers: {
        apikey: key,
        Authorization: 'Bearer ' + key,
        'Content-Type': 'application/json',
        Prefer: 'resolution=merge-duplicates',
      },
      body: JSON.stringify({ client_id: clientId, prefs: JSON.parse(prefsJson), updated_at: new Date().toISOString() }),
    }).then(function (r) { cb(r.ok ? 'ok' : 'http ' + r.status) })
      .catch(function (e) { cb('error: ' + e.message) })
  },
  restore: function (url, key, clientId, cb) {
    fetch(url + '/rest/v1/app_settings?client_id=eq.' + encodeURIComponent(clientId) + '&select=prefs', {
      headers: { apikey: key, Authorization: 'Bearer ' + key },
    }).then(function (r) { return r.json() })
      .then(function (rows) { cb(rows && rows[0] && rows[0].prefs ? JSON.stringify(rows[0].prefs) : null) })
      .catch(function () { cb(null) })
  },
}

// Live PoE2 market — proxied through our Supabase edge function (poe2scout).
// The Lua side calls ecMarket.get(op, league, base, category, cb) and receives
// the already-parsed object, so fengari never has to JSON-parse the big list.
window.ecMarket = {
  base: 'https://vofkgydinpdtasxuzmyq.supabase.co/functions/v1/market',
  key: 'sb_publishable_krkLInTvxybJkG-R1H7orA_zhGBew15',
  get: function (op, league, base, category, apiId, cb) {
    var p = ['op=' + encodeURIComponent(op)]
    if (league) p.push('league=' + encodeURIComponent(league))
    if (base) p.push('base=' + encodeURIComponent(base))
    if (category) p.push('category=' + encodeURIComponent(category))
    if (apiId) p.push('apiId=' + encodeURIComponent(apiId))
    fetch(this.base + '?' + p.join('&'), { headers: { apikey: this.key } })
      .then(function (r) { return r.ok ? r.json() : Promise.reject(r.status) })
      .then(function (j) { cb(j) })
      .catch(function () { cb(null) })
  },
  // official Currency Exchange deep-link: want X, have Y
  exchangeUrl: function (league, want, have) {
    var q = { exchange: { status: { option: 'online' }, want: [want], have: [have] } }
    return 'https://www.pathofexile.com/trade2/exchange/poe2/' +
      encodeURIComponent(league) + '?q=' + encodeURIComponent(JSON.stringify(q))
  },
}

// PoE2 Wiki article (MediaWiki api.php serves anonymous CORS with origin=*), parsed
// into { lead:[...], sections:[{title, body:[...]}] }. Returns null if missing.
window.ecWiki = {
  get: function (name, cb) {
    if (!name || !name.trim()) { cb(null); return }
    var title = name.trim().replace(/\s+/g, '_')
    var url = 'https://www.poe2wiki.net/w/api.php?action=query&prop=extracts&explaintext=1' +
      '&exsectionformat=wiki&redirects=1&format=json&origin=*&titles=' + encodeURIComponent(title)
    fetch(url).then(function (r) { return r.ok ? r.json() : Promise.reject(0) }).then(function (json) {
      var pages = json && json.query && json.query.pages
      if (!pages) { cb(null); return }
      var page = pages[Object.keys(pages)[0]]
      var extract = (page && page.extract) || ''
      if (!extract.trim() || (page && page.missing !== undefined)) { cb(null); return }
      cb(window.ecWiki._parse(extract))
    }).catch(function () { cb(null) })
  },
  _paras: function (block) {
    return block.split(/\n+/).map(function (p) { return p.trim() }).filter(function (p) { return p.length > 1 })
  },
  _parse: function (text) {
    var SKIP = /^(version history|references|see also|gallery|navigation|external links)$/i
    var KNOWN = ['Item acquisition', 'Acquisition', 'Usage', 'Mechanics', 'Recipe', 'Vendor recipe', 'Related omens', 'Strategy', 'Notes']
    var parts = text.split(/={2,}\s*([^=\n]+?)\s*={2,}/)
    var lead = window.ecWiki._paras(parts[0] || '')
    var sections = []
    for (var i = 1; i < parts.length; i += 2) {
      var title = (parts[i] || '').trim()
      var block = (parts[i + 1] || '').trim()
      var known = KNOWN.find(function (k) { return title.indexOf(k) === 0 && title.length > k.length })
      if (known) { block = (title.slice(known.length).trim() + ' ' + block).trim(); title = known }
      else if (title.length > 24 && /\.\s|\.$/.test(title)) { block = (title + ' ' + block).trim(); title = '' }
      if (title && SKIP.test(title)) continue
      var body = window.ecWiki._paras(block)
      if (!body.length) continue
      sections.push({ title: title, body: body })
    }
    return { lead: lead, sections: sections }
  },
}
// prefer the shell's configured Supabase project when present
if (window.exileShell && window.exileShell.supabase && window.exileShell.supabase.url) {
  window.ecMarket.base = window.exileShell.supabase.url + '/functions/v1/market'
  if (window.exileShell.supabase.key) window.ecMarket.key = window.exileShell.supabase.key
}

// Generic local-JSON fetch for the data-driven plugins (bundled game data under
// app/media). Returns the parsed object so fengari doesn't parse big files.
window.ecJson = {
  get: function (url, cb) {
    fetch(url).then(function (r) { return r.ok ? r.json() : Promise.reject(r.status) })
      .then(function (j) { cb(j) }).catch(function () { cb(null) })
  },
}

// Plain-text/HTML fetch for the in-app wiki (plugin help pages under
// app/addons/<id>/wiki/). Returns the raw text (or null).
window.ecHtml = {
  get: function (url, cb) {
    fetch(url).then(function (r) { return r.ok ? r.text() : Promise.reject(r.status) })
      .then(function (t) { cb(t) }).catch(function () { cb(null) })
  },
}

// Desktop shell wiring. In the browser build none of this runs and the page
// keeps its own painted background. The shell launches in one of two modes:
//   window  (default) — a normal framed, opaque, resizable app window; keeps
//                        the painted background, no click-through.
//   overlay           — transparent, click-through, always-on-top over the game.
if (window.exileShell) {
  var _shellMode = window.exileShell.mode || 'window'
  // Only the overlay makes the body transparent; the window keeps the painted bg.
  document.body.classList.add(_shellMode === 'overlay' ? 'shell' : 'shell-window')

  // WoW SavedVariables: load the durable settings file into localStorage BEFORE
  // the Lua UI reads any pref (boot.js runs before the fengari scripts), then
  // mirror every ec.* change back to the file (debounced) + a flush on quit.
  if (window.exileShell.loadVars) {
    try {
      var _raw = window.exileShell.loadVars()
      if (_raw) {
        var _vars = JSON.parse(_raw)
        Object.keys(_vars).forEach(function (k) { if (k.indexOf('ec.') === 0) localStorage.setItem(k, _vars[k]) })
      }
    } catch (e) { /* corrupt file — start fresh */ }

    var _saveTimer = null
    function _flushVars() {
      var out = {}
      for (var i = 0; i < localStorage.length; i++) {
        var k = localStorage.key(i)
        if (k && k.indexOf('ec.') === 0) out[k] = localStorage.getItem(k)
      }
      window.exileShell.saveVars(JSON.stringify(out))
    }
    // called from ui.store_set (Lua) on every pref change
    window.ecSaveVars = function () {
      if (_saveTimer) clearTimeout(_saveTimer)
      _saveTimer = setTimeout(function () { _saveTimer = null; _flushVars() }, 400)
    }
    window.addEventListener('beforeunload', function () { if (_saveTimer) { clearTimeout(_saveTimer); _saveTimer = null } _flushVars() })
  }

  // Mouse pass-through — OVERLAY MODE ONLY. The overlay covers the whole work
  // area but only the orb/menu/widgets are real UI; over empty space, clicks
  // fall through to the game underneath (the shell forwards mousemove even while
  // ignoring input, so we can detect re-entry). A normal window is fully solid,
  // so this is skipped entirely there.
  if (_shellMode === 'overlay') {
    var through = null
    function overUI(t) {
      return !!(t && t.closest && t.closest('.ec-widget, #orb, #rail, #boot-error'))
    }
    function updateThrough(e) {
      if (e.buttons) return // never flip modes mid-drag
      // While a widget control has focus (open <select> dropdown, text input),
      // never re-enable pass-through — the native dropdown popup sits outside
      // the page, and flipping modes under it made settings feel like they
      // "kept closing".
      var ae = document.activeElement
      var focusHeld = !!(ae && ae.closest && ae.closest('.ec-widget, #rail'))
      var want = !(overUI(e.target) || focusHeld)
      if (want !== through) {
        through = want
        window.exileShell.setMouseThrough(want)
      }
    }
    document.addEventListener('mousemove', updateThrough, true)

    // The overlay is non-activating (never steals foreground from the game — this
    // is what fixes the "click twice" bug). Text fields still need real keyboard
    // focus, so enable focus just while one is in use, then drop it again.
    function isEditable(t) {
      return !!(t && t.closest && t.closest('input, textarea, select, [contenteditable="true"], .monaco-editor'))
    }
    document.addEventListener('mousedown', function (e) {
      if (isEditable(e.target)) window.exileShell.setOverlayFocusable(true)
    }, true)
    document.addEventListener('focusout', function () {
      setTimeout(function () {
        if (!isEditable(document.activeElement)) window.exileShell.setOverlayFocusable(false)
      }, 0)
    }, true)
  }
}

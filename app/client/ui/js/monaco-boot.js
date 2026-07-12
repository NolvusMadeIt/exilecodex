// Monaco bridge for the Lua/Bootstrap app. Monaco ships as an AMD bundle (vendor/monaco/vs), so we
// load it lazily through its own loader the first time the Filter Editor mounts — keeping app
// startup light (the 14 MB editor isn't parsed until it's actually needed). The Lua side only ever
// deals in strings + callbacks; JS owns the Monaco lifecycle. Callback convention matches the rest
// of the app: JS invokes cb(arg) and fengari prepends `this`, so Lua handlers read (self, arg).
(function () {
  'use strict'

  // Fixed options that aren't user-tunable (from concept1 MonacoFilterEditor BASE); user options
  // are merged over these.
  var BASE = {
    language: 'poe2filter',
    theme: 'poe2-dark',
    automaticLayout: true,
    fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace',
    detectIndentation: false,
    suggestOnTriggerCharacters: true,
    wordBasedSuggestions: 'off',
    suggest: { showWords: false },
    scrollbar: { verticalScrollbarSize: 10, horizontalScrollbarSize: 10 },
    padding: { top: 10, bottom: 10 }
  }

  var ecMonaco = {
    _ready: false,
    _loading: false,
    _queue: [],

    // Register a callback to run once Monaco is loaded (fires immediately if already ready).
    ready: function (cb) {
      if (this._ready) { try { cb() } catch (e) {} return }
      if (cb) this._queue.push(cb)
      this.load()
    },

    load: function () {
      if (this._ready || this._loading) return
      this._loading = true
      var self = this
      // Resolve absolute base URLs so the AMD loader + web-worker bootstrap work under both the dev
      // http server and the Electron loopback server, regardless of the document path.
      var monacoBase = new URL('./vendor/monaco/', document.baseURI).href // .../vendor/monaco/
      var vsBase = monacoBase + 'vs'

      // Cross-origin-safe worker: a tiny blob that points Monaco at the vendored base and imports
      // the real worker. A custom Monarch language only needs the core editor worker.
      window.MonacoEnvironment = {
        getWorkerUrl: function () {
          var src = 'self.MonacoEnvironment={baseUrl:"' + monacoBase + '"};' +
            'importScripts("' + monacoBase + 'vs/base/worker/workerMain.js");'
          return URL.createObjectURL(new Blob([src], { type: 'text/javascript' }))
        }
      }

      if (!window.require || !window.require.config) {
        console.error('[ecMonaco] Monaco AMD loader (vendor/monaco/vs/loader.js) not on the page')
        this._loading = false
        return
      }
      window.require.config({ paths: { vs: vsBase } })
      window.require(['vs/editor/editor.main'], function () {
        try { window.PoE2FilterLang.register(window.monaco) } catch (e) { console.error('[ecMonaco] language register failed', e) }
        self._ready = true
        self._loading = false
        var q = self._queue.splice(0)
        for (var i = 0; i < q.length; i++) { try { q[i]() } catch (e) {} }
      }, function (err) {
        console.error('[ecMonaco] failed to load editor.main', err)
        self._loading = false
      })
    },

    // Create an editor in `hostEl`. options/callbacks come from Lua; options is a JSON string.
    // Returns a handle whose methods Lua calls with `:` (so `this` = the handle).
    create: function (hostEl, value, optionsJson, onChange, onCursor) {
      var monaco = window.monaco
      var opts
      try { opts = optionsJson ? JSON.parse(optionsJson) : {} } catch (e) { opts = {} }
      var merged = Object.assign({}, BASE, opts, { value: value == null ? '' : String(value) })
      var ed = monaco.editor.create(hostEl, merged)

      // True while WE push an external value in (setValue) — setValue fires the content-change event
      // synchronously, and without this guard a programmatic update would be misreported as a user
      // edit (concept1's applyingRef).
      var applying = false
      var report = function () {
        if (!onCursor) return
        var p = ed.getPosition(), sel = ed.getSelection()
        var selLen = sel && !sel.isEmpty() ? ed.getModel().getValueInRange(sel).length : 0
        onCursor(JSON.stringify({ line: (p && p.lineNumber) || 1, col: (p && p.column) || 1, selLen: selLen }))
      }
      ed.onDidChangeModelContent(function () { if (applying) return; if (onChange) onChange(ed.getValue()) })
      ed.onDidChangeCursorPosition(report)
      ed.onDidChangeCursorSelection(report)
      report()

      return {
        getValue: function () { return ed.getValue() },
        setValue: function (v) {
          v = v == null ? '' : String(v)
          if (v === ed.getValue()) return
          applying = true
          var pos = ed.getPosition()
          ed.setValue(v)
          if (pos) ed.setPosition(pos)
          applying = false
        },
        updateOptions: function (json) { try { ed.updateOptions(JSON.parse(json)) } catch (e) {} },
        layout: function () { try { ed.layout() } catch (e) {} },
        focus: function () { try { ed.focus() } catch (e) {} },
        // Fire a built-in editor action (e.g. 'editor.action.formatDocument', 'actions.find').
        run: function (id) { try { var a = ed.getAction(id); if (a) a.run() } catch (e) {} },
        dispose: function () { try { ed.dispose() } catch (e) {} }
      }
    },

    // Set the base-type autocomplete catalog from a JSON array string of names.
    setCatalog: function (namesJson) {
      try { window.PoE2FilterLang.setFilterCatalog(JSON.parse(namesJson)) } catch (e) {}
    }
  }

  window.ecMonaco = ecMonaco
})()

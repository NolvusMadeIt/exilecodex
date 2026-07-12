// PoE2 item-filter language for Monaco — ported from concept1 (src/lib/filterTokens.js +
// src/lib/poe2FilterLanguage.js) into a plain browser global (no ES modules) so the no-bundler
// Lua/Bootstrap app can load it with a <script> tag. Registers the `poe2filter` language id, a
// Monarch tokenizer (syntax highlighting), the `poe2-dark` theme, and a context-aware completion
// provider. Base-type names are injected asynchronously via PoE2FilterLang.setFilterCatalog().
(function () {
  'use strict'

  // ---- vocabulary (filterTokens.js) --------------------------------------------------------
  var ACTIONS = ['Show', 'Hide', 'Minimal', 'Continue']
  var CONDITIONS = [
    'Class', 'BaseType', 'Rarity', 'ItemLevel', 'DropLevel', 'Quality', 'Sockets', 'StackSize',
    'GemLevel', 'WaystoneTier', 'AreaLevel', 'Width', 'Height', 'BaseArmour', 'BaseEvasion',
    'BaseEnergyShield', 'Identified', 'Corrupted', 'Mirrored', 'Replica', 'Scourged',
    'AnyEnchantment', 'TransfiguredGem', 'HasExplicitMod', 'HasImplicitMod', 'HasEnchantment'
  ]
  var STYLES = [
    'SetTextColor', 'SetBorderColor', 'SetBackgroundColor', 'SetFontSize', 'PlayEffect',
    'MinimapIcon', 'PlayAlertSound', 'PlayAlertSoundPositional', 'CustomAlertSound',
    'DisableDropSound', 'EnableDropSound'
  ]
  var RARITIES = ['Normal', 'Magic', 'Rare', 'Unique']
  var BOOLS = ['True', 'False']
  var OPERATORS = ['==', '>=', '<=', '<', '>', '=']
  var BEAMS = ['Red', 'Green', 'Blue', 'Brown', 'White', 'Yellow', 'Cyan', 'Grey', 'Orange', 'Pink', 'Purple']
  var SHAPES = ['Circle', 'Diamond', 'Hexagon', 'Square', 'Star', 'Triangle', 'Cross', 'Moon', 'Raindrop', 'Kite', 'Pentagon', 'UpsideDownHouse']
  var SOUNDS = []; for (var i = 1; i <= 16; i++) SOUNDS.push(String(i))

  var ALL_KEYWORDS = ACTIONS.concat(CONDITIONS, STYLES)
  var NUMERIC = { ItemLevel: 1, DropLevel: 1, Quality: 1, Sockets: 1, StackSize: 1, GemLevel: 1, WaystoneTier: 1, AreaLevel: 1, Width: 1, Height: 1, BaseArmour: 1, BaseEvasion: 1, BaseEnergyShield: 1 }
  var BOOL_CONDS = { Identified: 1, Corrupted: 1, Mirrored: 1, Replica: 1, Scourged: 1, AnyEnchantment: 1, TransfiguredGem: 1 }
  var NAME_CONDS = { BaseType: 1, Class: 1 }

  // PoE2 item classes (from concept1 src/data/items.js CLASSES), sorted for suggestions.
  var CLASS_NAMES = [
    'Amulets', 'Belts', 'Body Armours', 'Boots', 'Bows', 'Bucklers', 'Charms', 'Crossbows',
    'Currency', 'Foci', 'Gloves', 'Helmets', 'Jewels', 'Life Flasks', 'Mana Flasks',
    'One Hand Maces', 'Quarterstaves', 'Quivers', 'Relics', 'Rings', 'Sceptres', 'Shields',
    'Skill Gems', 'Spears', 'Staves', 'Support Gems', 'Talismans', 'Two Hand Maces', 'Wands', 'Waystones'
  ]

  // Item / base-type names, loaded asynchronously by the host and read by the completion provider.
  var CATALOG = []
  function setFilterCatalog(names) { CATALOG = names || [] }

  // Word the user is currently typing (trailing identifier run before the caret).
  function wordAt(s) { var m = s.match(/[A-Za-z0-9_]*$/); return m ? m[0] : '' }

  // Decide what to suggest for the caret. Returns null when nothing applies, otherwise
  // { kind, from, prefix, options?, classNames?, closeQuote? }. kind: 'keyword' | 'value' | 'name'.
  function completionContext(lineBeforeCursor) {
    var quotes = lineBeforeCursor.match(/"/g)
    var inQuote = ((quotes ? quotes.length : 0) % 2) === 1
    var trimmedStart = lineBeforeCursor.replace(/^\s+/, '')
    var firstToken = trimmedStart.split(/\s+/)[0] || ''
    var indentLen = lineBeforeCursor.length - trimmedStart.length

    if (inQuote) {
      var q = lineBeforeCursor.lastIndexOf('"')
      return { kind: 'name', from: q + 1, prefix: lineBeforeCursor.slice(q + 1), classNames: firstToken === 'Class', closeQuote: true }
    }
    if (!/\s/.test(trimmedStart)) {
      return { kind: 'keyword', from: indentLen, prefix: trimmedStart, options: ALL_KEYWORDS }
    }
    var prefix = wordAt(lineBeforeCursor)
    var from = lineBeforeCursor.length - prefix.length

    if (NAME_CONDS[firstToken]) return { kind: 'name', from: from, prefix: prefix, classNames: firstToken === 'Class' }
    if (firstToken === 'Rarity') return { kind: 'value', from: from, prefix: prefix, options: OPERATORS.concat(RARITIES) }
    if (BOOL_CONDS[firstToken]) return { kind: 'value', from: from, prefix: prefix, options: BOOLS }
    if (firstToken === 'PlayEffect') return { kind: 'value', from: from, prefix: prefix, options: BEAMS.concat(['Temp']) }
    if (firstToken === 'MinimapIcon') return { kind: 'value', from: from, prefix: prefix, options: ['0', '1', '2'].concat(BEAMS, SHAPES) }
    if (firstToken === 'PlayAlertSound' || firstToken === 'PlayAlertSoundPositional') return { kind: 'value', from: from, prefix: prefix, options: SOUNDS }
    if (NUMERIC[firstToken]) return { kind: 'value', from: from, prefix: prefix, options: OPERATORS }
    return null
  }

  // Build the final suggestion list. Each: { label, apply }.
  function suggestionsFor(ctx, catalogNames) {
    catalogNames = catalogNames || []
    if (!ctx) return []
    var p = (ctx.prefix || '').toLowerCase()
    if (ctx.kind === 'name') {
      var pool = ctx.classNames ? CLASS_NAMES : catalogNames
      var starts = [], contains = []
      for (var j = 0; j < pool.length; j++) {
        var n = pool[j], lo = n.toLowerCase()
        if (lo.indexOf(p) === 0) starts.push(n)
        else if (p && lo.indexOf(p) !== -1) contains.push(n)
        if (starts.length >= 40) break
      }
      return starts.concat(contains).slice(0, 40).map(function (nm) {
        return { label: nm, apply: ctx.closeQuote ? nm + '"' : '"' + nm + '"' }
      })
    }
    var list = ctx.options.filter(function (o) { return o.toLowerCase().indexOf(p) === 0 && o.toLowerCase() !== p })
    return list.slice(0, 40).map(function (o) { return { label: o, apply: ctx.kind === 'keyword' ? o + ' ' : o } })
  }

  // ---- Monaco registration (poe2FilterLanguage.js) -----------------------------------------
  var registered = false
  function register(monaco) {
    if (registered) return
    registered = true

    monaco.languages.register({ id: 'poe2filter' })

    monaco.languages.setMonarchTokensProvider('poe2filter', {
      defaultToken: '',
      kwAction: ACTIONS,
      kwCond: CONDITIONS,
      kwStyle: STYLES,
      tokenizer: {
        root: [
          [/#.*$/, 'comment'],
          [/"[^"]*"?/, 'string'],
          [/\b\d+(\.\d+)?\b/, 'number'],
          [/[<>=!]+/, 'operator'],
          [/[A-Za-z_]\w*/, { cases: { '@kwAction': 'keyword.action', '@kwCond': 'keyword.cond', '@kwStyle': 'keyword.style', '@default': 'identifier' } }]
        ]
      }
    })

    monaco.editor.defineTheme('poe2-dark', {
      base: 'vs-dark', inherit: true,
      rules: [
        { token: 'comment', foreground: '6b6b70', fontStyle: 'italic' },
        { token: 'string', foreground: '9ece6a' },
        { token: 'number', foreground: 'e0a060' },
        { token: 'operator', foreground: 'c8c8c8' },
        { token: 'keyword.action', foreground: 'e0a84e', fontStyle: 'bold' },
        { token: 'keyword.cond', foreground: '5aa2e0' },
        { token: 'keyword.style', foreground: 'b26ae0' },
        { token: 'identifier', foreground: 'd6cfbf' }
      ],
      colors: {
        'editor.background': '#0b0b0d',
        'editor.lineHighlightBackground': '#ffffff0a',
        'editorLineNumber.foreground': '#4a4a50',
        'editorLineNumber.activeForeground': '#caa14e',
        'editorCursor.foreground': '#e9e3d2',
        'editor.selectionBackground': '#caa14e33',
        'editorIndentGuide.background1': '#ffffff10'
      }
    })

    var TRIGGERS = [' ', '"'].concat('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''))
    monaco.languages.registerCompletionItemProvider('poe2filter', {
      triggerCharacters: TRIGGERS,
      provideCompletionItems: function (model, position) {
        try {
          var lineBefore = model.getValueInRange({ startLineNumber: position.lineNumber, startColumn: 1, endLineNumber: position.lineNumber, endColumn: position.column })
          var ctx = completionContext(lineBefore)
          var items = suggestionsFor(ctx, CATALOG)
          if (!ctx || !items.length) return { suggestions: [] }
          var range = { startLineNumber: position.lineNumber, startColumn: ctx.from + 1, endLineNumber: position.lineNumber, endColumn: position.column }
          var kind = ctx.kind === 'name'
            ? monaco.languages.CompletionItemKind.Value
            : ctx.kind === 'value' ? monaco.languages.CompletionItemKind.Enum : monaco.languages.CompletionItemKind.Keyword
          return {
            suggestions: items.map(function (it) {
              return { label: it.label, kind: kind, insertText: it.apply, filterText: it.label, range: range }
            })
          }
        } catch (e) { return { suggestions: [] } }
      }
    })
  }

  window.PoE2FilterLang = { register: register, setFilterCatalog: setFilterCatalog, CLASS_NAMES: CLASS_NAMES }
})()

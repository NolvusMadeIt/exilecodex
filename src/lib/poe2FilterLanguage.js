// PoE2 filter language for Monaco — the self-contained "plugin core". It has NO React/app coupling
// and takes the `monaco` instance as an argument, so it can be lifted out into a standalone Monaco
// language plugin (or its own package) later. It registers: the `poe2filter` language id, a Monarch
// tokenizer (syntax highlighting), a dark theme, and a completion provider (IntelliSense) that
// reuses the vocabulary in filterTokens.js. Base-type/item names are injected via setFilterCatalog.
import { ACTIONS, CONDITIONS, STYLES, completionContext, suggestionsFor } from './filterTokens.js'

// Item / base-type names are loaded asynchronously by the host app; the completion provider
// (registered once) reads this. The host calls setFilterCatalog whenever the catalog changes.
let CATALOG = []
export const setFilterCatalog = (names) => { CATALOG = names || [] }

let registered = false

// Register the language, theme and completions on a given Monaco instance. Idempotent.
export function registerPoe2FilterLanguage(monaco) {
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
        [/[A-Za-z_]\w*/, { cases: { '@kwAction': 'keyword.action', '@kwCond': 'keyword.cond', '@kwStyle': 'keyword.style', '@default': 'identifier' } }],
      ],
    },
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
      { token: 'identifier', foreground: 'd6cfbf' },
    ],
    colors: {
      'editor.background': '#0b0b0d',
      'editor.lineHighlightBackground': '#ffffff0a',
      'editorLineNumber.foreground': '#4a4a50',
      'editorLineNumber.activeForeground': '#caa14e',
      'editorCursor.foreground': '#e9e3d2',
      'editor.selectionBackground': '#caa14e33',
      'editorIndentGuide.background1': '#ffffff10',
    },
  })

  // Trigger on space, quote and every letter so suggestions appear as you type (belt-and-suspenders
  // with quickSuggestions). filterText = label so Monaco's fuzzy filter keeps the right items.
  const TRIGGERS = ' "'.split('').concat('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''))
  monaco.languages.registerCompletionItemProvider('poe2filter', {
    triggerCharacters: TRIGGERS,
    provideCompletionItems(model, position) {
      try {
        const lineBefore = model.getValueInRange({ startLineNumber: position.lineNumber, startColumn: 1, endLineNumber: position.lineNumber, endColumn: position.column })
        const ctx = completionContext(lineBefore)
        const items = suggestionsFor(ctx, CATALOG)
        if (!ctx || !items.length) return { suggestions: [] }
        const range = { startLineNumber: position.lineNumber, startColumn: ctx.from + 1, endLineNumber: position.lineNumber, endColumn: position.column }
        const kind = ctx.kind === 'name'
          ? monaco.languages.CompletionItemKind.Value
          : ctx.kind === 'value' ? monaco.languages.CompletionItemKind.Enum : monaco.languages.CompletionItemKind.Keyword
        return { suggestions: items.map(it => ({ label: it.label, kind, insertText: it.apply, filterText: it.label, range })) }
      } catch { return { suggestions: [] } }
    },
  })
}

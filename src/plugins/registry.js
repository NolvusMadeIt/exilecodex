// The registry of built-in plugins. Adding a plugin = drop a module under src/plugins/<id>/ and
// import its manifest here. (A future phase loads community plugins on top of this list.)
import filterEditor from './filter-editor/index.js'
import marketCompanion from './market-companion/index.ts'
import priceCheck from './price-check/index.ts'
import campaignGuide from './campaign-guide/index.ts'

export const BUILTIN_PLUGINS = [filterEditor, marketCompanion, priceCheck, campaignGuide]

export function findPlugin(id) {
  return BUILTIN_PLUGINS.find(p => p.id === id) || null
}

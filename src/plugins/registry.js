// The registry of built-in plugins. Adding a plugin = drop a module under src/plugins/<id>/ and
// import its manifest here. (A future phase loads community plugins on top of this list.)
import filterEditor from './filter-editor/index.js'
import marketCompanion from './market-companion/index.ts'
import priceCheck from './price-check/index.ts'
import campaignGuide from './campaign-guide/index.ts'
import xileItems from './xile-items/index.ts'
import xileModifiers from './xile-modifiers/index.ts'
import xileCrafting from './xile-crafting/index.ts'
import xileCharacter from './xile-character/index.ts'
import xileTools from './xile-tools/index.ts'
import xileHistory from './xile-history/index.ts'

export const BUILTIN_PLUGINS = [filterEditor, marketCompanion, priceCheck, campaignGuide, xileItems, xileModifiers, xileCrafting, xileCharacter, xileTools, xileHistory]

export function findPlugin(id) {
  return BUILTIN_PLUGINS.find(p => p.id === id) || null
}

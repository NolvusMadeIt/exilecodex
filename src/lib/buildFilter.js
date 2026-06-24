// The primary filter build path: take the user's settings, load the REAL core filter for their
// chosen strictness/style, splice in their override customizations, and stamp the header. This
// replaces the old synthetic generator (which produced rules that didn't behave in-game).
import { loadCoreFilter, strictnessLevel, styleInfo, DEFAULT_STRICTNESS, DEFAULT_STYLE } from '../data/coreFilters.js'
import { compileOverrides, injectOverrides } from './overrides.js'

function stampNow() {
  const d = new Date()
  const p = (n) => String(n).padStart(2, '0')
  return `${d.getUTCFullYear()}-${p(d.getUTCMonth() + 1)}-${p(d.getUTCDate())} ${p(d.getUTCHours())}:${p(d.getUTCMinutes())} UTC`
}

// Rewrite the core file's (already de-branded) header title + build line to reflect THIS filter.
// Graceful: if the anchor strings aren't present the header is simply left as-is.
function applyHeader(text, settings, ctx) {
  const name = (settings.name || "Nolvus's Filter").trim()
  const ver = settings.version || '0.0.1'
  const sName = strictnessLevel(ctx.strictness).name
  const stName = styleInfo(ctx.style).name
  const gv = ctx.gameInfo?.gameVersionLabel || ctx.gameInfo?.gameVersion || ''
  const built = `# Built with Nolvus's Filter Editor  -  Base: ${sName} / ${stName}  -  Filter v${ver}`
    + (gv ? `  -  ${gv}` : '') + (ctx.stamp ? `  -  ${ctx.stamp}` : '')
  let out = text
    .replace('# Nolvus Loot Filter - for Path of Exile 2', `# ${name} - Path of Exile 2 loot filter`)
    .replace("# Built with Nolvus's Filter Editor.", built)
  if (ctx.topComment) {
    const block = ctx.topComment.split('\n').map(l => `# ${l}`).join('\n')
    out = out.replace(built, `${built}\n#\n${block}`)
  }
  return out
}

// Build the final .filter text. Async because the base file is a real runtime fetch.
export async function buildFilter(settings = {}, opts = {}) {
  const strictness = settings.strictness || DEFAULT_STRICTNESS
  const style = settings.style || DEFAULT_STYLE
  const base = await loadCoreFilter(strictness, style)
  const headed = applyHeader(base, settings, {
    strictness, style,
    stamp: opts.stamp || stampNow(),
    gameInfo: opts.gameInfo,
    topComment: opts.prefs?.topComment?.trim() || '',
  })
  let out = injectOverrides(headed, compileOverrides(settings))

  // User free-text / pref comment that belongs at the very bottom of the file.
  const tail = [settings.freeText?.bottom?.trim(), opts.prefs?.bottomComment?.trim()].filter(Boolean)
  if (tail.length) out = out.replace(/\n*$/, '\n\n') + tail.join('\n\n') + '\n'
  return out
}

// Crafting/selling tips — ported from the Marketplace Companion's spot-price-check plugin
// (plugins/spot-price-check/tips.ts), adapted to nolvusfilter's parseTradeItem shape. The
// Companion's parser kept the advanced-copy `{ Prefix Modifier … (Tier: N) }` annotations on each
// mod; parseTradeItem drops those lines, so this reads them straight from the raw copied text
// instead — same information, same tips. Pure + deterministic (see tips.test.js).

// Advanced copy (Ctrl+Alt+C in game) annotates each mod with its affix slot and tier.
export function affixAnnotations(raw) {
  const text = String(raw || '')
  const prefixes = (text.match(/\{\s*Prefix Modifier/gi) || []).length
  const suffixes = (text.match(/\{\s*Suffix Modifier/gi) || []).length
  const tiers = [...text.matchAll(/\(Tier:\s*(\d+)\)/gi)].map((m) => parseInt(m[1], 10))
  return { prefixes, suffixes, tiers, advanced: prefixes + suffixes > 0 }
}

// item: the parseTradeItem result ({ rarity, category, corrupted, properties, mods, … });
// raw: the original copied text (for the advanced-copy annotations).
export function craftingTips(item, raw = '') {
  if (!item) return []
  const tips = []
  const rarity = (item.rarity || '').toLowerCase()
  const isGear = ['weapon', 'armour', 'jewellery'].includes(item.category)
  const perSideCap = rarity === 'rare' ? 3 : rarity === 'magic' ? 1 : 0
  const totalCap = perSideCap * 2
  const explicitCount = (item.mods || []).filter((m) => m.kind === 'explicit').length
  const { prefixes, suffixes, tiers, advanced } = affixAnnotations(raw)

  if (item.corrupted) {
    tips.push({
      icon: '🔒',
      text: "Corrupted — it can't be modified any further, so this roll is final. Price it as-is and buyers know exactly what they're getting.",
    })
    return tips
  }

  if (totalCap > 0) {
    if (advanced) {
      const openPrefix = Math.max(0, perSideCap - prefixes)
      const openSuffix = Math.max(0, perSideCap - suffixes)
      const parts = []
      if (openPrefix > 0) parts.push(`${openPrefix} open prefix${openPrefix > 1 ? 'es' : ''}`)
      if (openSuffix > 0) parts.push(`${openSuffix} open suffix${openSuffix > 1 ? 'es' : ''}`)
      if (parts.length) {
        tips.push({
          icon: '✦',
          text: `${parts.join(' + ')} still open. Items with empty slots are craftable — an Exalted Orb adds a random modifier, so crafters pay a premium for the upside. Listing it unfinished can beat the going rate (but rolling it yourself is a gamble).`,
        })
      }
    } else if (explicitCount > 0 && explicitCount < totalCap) {
      const open = totalCap - explicitCount
      tips.push({
        icon: '✦',
        text: `${open} open modifier slot${open > 1 ? 's' : ''}. Items with empty slots are craftable — an Exalted Orb adds a random modifier, so crafters pay a premium for the upside. (Copy with Ctrl+Alt+C in game to see exactly which prefixes/suffixes are open.)`,
      })
    }
  }

  const quality = item.properties?.quality
  if (isGear && item.category !== 'jewellery' && typeof quality === 'number' && quality < 20) {
    tips.push({
      icon: '⌬',
      text: `Quality is ${quality}% — taking it to 20% with quality currency is a cheap, safe bump that nudges the price up before you list.`,
    })
  }

  if (tiers.some((t) => t <= 2)) {
    tips.push({
      icon: '★',
      text: 'Carries top-tier (T1–T2) rolls — those are what buyers search for. List toward the High end rather than the median.',
    })
  }

  const fullyRolled = advanced ? prefixes >= perSideCap && suffixes >= perSideCap : explicitCount >= totalCap
  if (isGear && rarity === 'rare' && fullyRolled && totalCap > 0) {
    tips.push({
      icon: '⚠',
      text: "Fully rolled and uncorrupted — a Vaal Orb is a high-risk gamble that can add value (an extra implicit or socket) or brick the item. Only Vaal it if you'd still sell the corrupted result.",
    })
  }

  return tips
}

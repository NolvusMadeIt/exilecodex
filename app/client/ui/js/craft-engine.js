/*
 * craft-engine.js — window.ecCraft
 *
 * The interactive PoE2 crafting simulator that powers the "Crafting" plugin
 * (a Craft-of-Exile-style bench). Engine + UI live here in JS, mounted by a
 * thin Lua plugin (app/addons/crafting/plugin.lua), the same split we use for
 * ecFilterBuild / ecTree / ecMonaco — it keeps the 100+-mod pool math and the
 * stateful roll/history logic off the Lua<->JS bridge.
 *
 * Data: the bundled XileHUD dataset under app/media/xilehud/poe2/rise-of-the-abyssal/
 *   - per-category mod pools (Bows.json, Body_Armours_str.json, ...): the prefix/
 *     suffix ladders with tiers, ilvl gates and weights.
 *   - Currency.json / Essences.json / Omens.json / Bases.json: the crafting bench.
 * Icons: app/media/xilehud/crafting/<imageLocal> (vendored from XileHUD, GPL-3.0).
 */
;(function () {
  'use strict'
  var DATA = '../../media/xilehud/poe2/rise-of-the-abyssal/'
  var IMG = '../../media/xilehud/crafting/'

  // ------------------------------------------------------------------ helpers
  function esc (s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
  }
  function stripHtml (s) { return String(s == null ? '' : s).replace(/<[^>]*>/g, '') }
  function htmlText (s) { return esc(s).replace(/\n/g, '<br>') } // escape, then honour hybrid line breaks
  function cap1 (s) { return s.replace(/\b\w/g, function (c) { return c.toUpperCase() }) }
  function nameFromSlug (il, folder) {
    return cap1(String(il || '').replace(new RegExp('^' + folder + '/'), '').replace(/\.webp$/, '').replace(/_/g, ' '))
      // keep small joining words lower, PoE style
      .replace(/\b(Of|The|To|Or|And|A)\b/g, function (m) { return m.toLowerCase() })
      .replace(/^./, function (c) { return c.toUpperCase() })
  }
  function jarr (v) { // JS array from ecJson (already native), tolerant of null
    return (v && v.length != null) ? v : []
  }

  // ------------------------------------------------------------------- caches
  var core = null            // {currency, essences, omens, bases}
  var modCache = {}          // file -> annotated mod array
  var coreWaiters = []

  function loadCore (cb) {
    if (core) { cb(core); return }
    coreWaiters.push(cb)
    if (coreWaiters.length > 1) return // a load is already in flight
    var pending = { currency: 'Currency.json', essences: 'Essences.json', omens: 'Omens.json', bases: 'Bases.json' }
    var got = {}, left = 0
    for (var k in pending) left++
    Object.keys(pending).forEach(function (key) {
      window.ecJson.get(DATA + pending[key], function (j) {
        got[key] = j
        if (--left === 0) {
          core = {
            currency: normCurrency(got.currency),
            essences: normEssences(got.essences),
            omens: normOmens(got.omens),
            bases: (got.bases && got.bases.bases) || {}
          }
          var ws = coreWaiters; coreWaiters = []
          ws.forEach(function (f) { f(core) })
        }
      })
    })
  }

  function normCurrency (j) {
    var arr = (j && j.currency) || []
    var out = []
    for (var i = 0; i < arr.length; i++) {
      var c = arr[i]
      out.push({ name: c.name, slug: c.slug, img: c.imageLocal, effect: (c.explicitMods && c.explicitMods.join(' ')) || '' })
    }
    return out
  }
  function normEssences (j) {
    var arr = (j && j.essences) || []
    var out = []
    for (var i = 0; i < arr.length; i++) {
      var e = arr[i]
      var mods = e.explicitMods || []
      var name = e.name && e.name !== '' ? e.name : nameFromSlug(e.imageLocal, 'essences')
      out.push({
        name: name, img: e.imageLocal,
        mechanic: mods[0] || '',
        // remaining lines describe the guaranteed mod, gated by item type:
        //   "Armour or Belt: +X to maximum Life"   "Jewellery: +Y to maximum Life"
        guarantees: mods.slice(1).map(function (line) {
          var m = /^([^:]+):\s*(.+)$/.exec(line)
          return m ? { types: m[1], text: m[2] } : { types: '', text: line }
        }),
        tier: /^perfect/i.test(name) ? 'Perfect' : /^greater/i.test(name) ? 'Greater' : /^lesser/i.test(name) ? 'Lesser' : 'Normal'
      })
    }
    return out
  }
  function normOmens (j) {
    var arr = (j && j.omens) || []
    var out = []
    for (var i = 0; i < arr.length; i++) {
      var o = arr[i]
      out.push({ name: o.name, short: o.name.replace(/^Omen of /, ''), img: o.imageLocal, effect: (o.explicitMods && o.explicitMods.join(' ')) || '', rule: omenRule(o.name) })
    }
    return out
  }

  // ------------------------------------------------- base -> mod file resolver
  // Weapons + jewellery have a 1:1 mod file; armour pools split by attribute.
  var ARMOUR = { Body_Armours: 1, Helmets: 1, Gloves: 1, Boots: 1, Shields: 1 }
  var ARMOUR_CAT = { Body_Armours: 1, Helmets: 1, Gloves: 1, Boots: 1, Shields: 1, Bucklers: 1, Foci: 1 }
  var CASTER_WEAPON = { Wands: 1, Sceptres: 1, Staves: 1 }
  var NON_ITEM = /Amulets|Rings|Belts|Talismans|Charms|Quivers|Flask|Emerald|Ruby|Sapphire|Jewel|Waystone|Tablet|Relic|Logbook|Strongbox/
  function isWeaponCat (c) { return !ARMOUR_CAT[c] && !NON_ITEM.test(c) }
  function quality (item, log) { item.quality = Math.min(20, (item.quality || 0) + 5); log.push('Quality now ' + item.quality + '%.'); return { ok: true, log: log } }
  function attrSuffix (item) {
    var d = item.def || {}
    var A = d.ar, E = d.ev, S = d.es
    var parts = []
    if (A) parts.push('str'); if (E) parts.push('dex'); if (S) parts.push('int')
    if (parts.length === 0) return 'str'
    if (parts.length === 3) return 'str_dex' // rare tri-defence base; closest split
    // file naming keeps a fixed order: str, dex, int
    var order = { str: 0, dex: 1, int: 2 }
    parts.sort(function (a, b) { return order[a] - order[b] })
    return parts.join('_')
  }
  function modFileFor (item) {
    var cat = item.category
    if (ARMOUR[cat]) {
      var suf = attrSuffix(item)
      // Shields have no dex_int / dex file in the dataset — clamp to available.
      if (cat === 'Shields') {
        var ok = { str: 'str', str_dex: 'str_dex', str_int: 'str_int' }
        suf = ok[suf] || 'str'
      }
      return cat + '_' + suf
    }
    return cat
  }

  function loadModsFor (item, cb) {
    var file = modFileFor(item)
    if (modCache[file]) { cb(modCache[file]); return }
    window.ecJson.get(DATA + file + '.json', function (arr) {
      var out = []
      arr = jarr(arr)
      for (var i = 0; i < arr.length; i++) {
        var m = arr[i]
        var tiers = []
        var ta = jarr(m.tiers)
        for (var j = 0; j < ta.length; j++) {
          // tier text_plain is prefixed with the tier level ("81 +(31—33) to Dexterity") — strip it.
          // Hybrid mods join two stats with no separator ("...Damage+(16—20) to Accuracy") — break them.
          var txt = String(ta[j].text_plain == null ? '' : ta[j].text_plain)
            .replace(/^\d+\s+/, '')
            .replace(/([A-Za-z%])(\+\(|\(\d)/g, '$1\n$2')
          tiers.push({ name: ta[j].tier_name, lvl: +ta[j].tier_level || 0, text: txt, weight: +ta[j].weight || 0 })
        }
        out.push({
          side: m.side, text: m.text_plain, family: m.family || (m.text_plain || ''),
          domain: m.domain || 'normal', ilvl: +m.ilvl || 0, tags: jarr(m.tags).map(String), tiers: tiers,
          totalWeight: +m.weight || 0
        })
      }
      modCache[file] = out
      cb(out)
    })
  }

  // ----------------------------------------------------------------- pool math
  function caps (rarity) {
    return rarity === 'rare' ? { p: 3, s: 3 } : rarity === 'magic' ? { p: 1, s: 1 } : { p: 0, s: 0 }
  }
  function eligTiers (mod, ilvl) {
    var out = []
    for (var i = 0; i < mod.tiers.length; i++) if (mod.tiers[i].lvl <= ilvl) out.push(mod.tiers[i])
    return out
  }
  function modWeight (mod, ilvl) {
    var w = 0, t = mod.tiers
    for (var i = 0; i < t.length; i++) if (t[i].lvl <= ilvl) w += t[i].weight
    return w
  }
  function familiesOn (item) {
    var s = {}
    item.prefixes.concat(item.suffixes).forEach(function (mi) { s[mi.family] = 1 })
    return s
  }
  function sideFull (item, side) {
    var c = caps(item.rarity)
    return side === 'prefix' ? item.prefixes.length >= c.p : item.suffixes.length >= c.s
  }
  // typeTags of the item's existing mods (for Homogenising omens)
  function itemTypeTags (item) {
    var s = {}
    item.prefixes.concat(item.suffixes).forEach(function (mi) { (mi.tags || []).forEach(function (t) { s[t] = 1 }) })
    return s
  }

  // Build the applicable-mod pool. side: 'prefix'|'suffix'|null(both open sides).
  // opts: { tag, sameTypeTags, domain }
  function poolFor (item, mods, side, opts) {
    opts = opts || {}
    var fams = familiesOn(item)
    var list = [], total = 0
    var domain = opts.domain || 'normal'
    for (var i = 0; i < mods.length; i++) {
      var m = mods[i]
      if (m.domain !== domain) continue
      if (side && m.side !== side) continue
      // slot-fullness only gates actual rolling; the display pool shows every
      // mod the base could roll (Craft-of-Exile style "N possible mods").
      if (!opts.display && !side && sideFull(item, m.side)) continue
      if (fams[m.family]) continue
      if (opts.tag && m.tags.indexOf(opts.tag) < 0) continue
      if (opts.sameTypeTags && !hasAny(m.tags, opts.sameTypeTags)) continue
      var w = modWeight(m, item.ilvl)
      if (w <= 0) continue
      list.push({ mod: m, eff: w })
      total += w
    }
    return { list: list, total: total }
  }
  function hasAny (arr, set) { for (var i = 0; i < arr.length; i++) if (set[arr[i]]) return true; return false }

  // ------------------------------------------------------------------- rolling
  function pickWeighted (list, total, wf) {
    if (!list.length) return null
    var r = Math.random() * total, acc = 0
    for (var i = 0; i < list.length; i++) { acc += wf(list[i]); if (r <= acc) return list[i] }
    return list[list.length - 1]
  }
  function rollTier (mod, ilvl) {
    var elig = eligTiers(mod, ilvl)
    var tot = 0; for (var i = 0; i < elig.length; i++) tot += elig[i].weight
    var t = pickWeighted(elig, tot, function (x) { return x.weight })
    return t || elig[0] || mod.tiers[mod.tiers.length - 1]
  }
  function instanceOf (mod, tier) {
    return { family: mod.family, side: mod.side, mod: mod.text, tags: mod.tags, tierName: tier.name, tierLvl: tier.lvl, text: tier.text }
  }
  // add one random mod. side null => choose an open side by weight. returns instance or null
  function addRandomMod (item, mods, side, opts) {
    var pool = poolFor(item, mods, side, opts)
    if (!pool.list.length) return null
    var chosen = pickWeighted(pool.list, pool.total, function (x) { return x.eff })
    if (!chosen) return null
    var inst = instanceOf(chosen.mod, rollTier(chosen.mod, item.ilvl))
    placeInstance(item, inst)
    return inst
  }
  function placeInstance (item, inst) {
    if (inst.side === 'prefix') item.prefixes.push(inst); else item.suffixes.push(inst)
  }
  function removeRandom (item, side) {
    var bag = []
    if (side !== 'suffix') item.prefixes.forEach(function (m, i) { bag.push(['prefix', i, m]) })
    if (side !== 'prefix') item.suffixes.forEach(function (m, i) { bag.push(['suffix', i, m]) })
    if (!bag.length) return null
    var pickd = bag[Math.floor(Math.random() * bag.length)]
    var slot = pickd[0] === 'prefix' ? item.prefixes : item.suffixes
    slot.splice(slot.indexOf(pickd[2]), 1)
    return pickd[2]
  }

  // ----------------------------------------------------- currency application
  // Each mechanic mutates `item` and returns {ok, log[]} — the caller snapshots
  // for history before calling. `o` is the resolved options (omens/tag).
  function fill (item, mods, n, side, opts, log) {
    for (var i = 0; i < n; i++) {
      var inst = addRandomMod(item, mods, side, opts)
      if (inst) log.push('+ ' + inst.text + '  [' + inst.tierName + ']')
      else { log.push('· no open ' + (side || 'slot') + ' mod available'); break }
    }
  }
  function pickOpenSide (item) {
    var c = caps(item.rarity)
    var pOpen = item.prefixes.length < c.p, sOpen = item.suffixes.length < c.s
    if (pOpen && sOpen) return Math.random() < 0.5 ? 'prefix' : 'suffix'
    return pOpen ? 'prefix' : sOpen ? 'suffix' : null
  }

  function applyCurrency (item, cname, mods, omen) {
    var log = [], o = { tag: null }
    var r = item.rarity
    // omen-derived option resolution
    var side = null, count = 1, homogen = false
    if (omen && omen.rule) {
      if (omen.rule.side) side = omen.rule.side
      if (omen.rule.count) count = omen.rule.count
      if (omen.rule.homogenising) homogen = true
    }
    var sameTypeTags = homogen ? itemTypeTags(item) : null

    switch (cname) {
      case 'Orb of Transmutation':
      case 'Greater Orb of Transmutation':
      case 'Perfect Orb of Transmutation':
        if (r !== 'normal') return fail('Needs a Normal item.')
        item.rarity = 'magic'; fill(item, mods, 1, pickOpenSide(item), { sameTypeTags: sameTypeTags }, log); break
      case 'Orb of Augmentation':
      case 'Greater Orb of Augmentation':
      case 'Perfect Orb of Augmentation':
        if (r !== 'magic') return fail('Needs a Magic item.')
        if (fullBoth(item)) return fail('No open modifier.')
        fill(item, mods, 1, pickOpenSide(item), { sameTypeTags: sameTypeTags }, log); break
      case 'Regal Orb':
      case 'Greater Regal Orb':
      case 'Perfect Regal Orb':
        if (r !== 'magic') return fail('Needs a Magic item.')
        item.rarity = 'rare'; fill(item, mods, 1, side, { sameTypeTags: sameTypeTags }, log); break
      case 'Exalted Orb':
      case 'Greater Exalted Orb':
      case 'Perfect Exalted Orb':
        if (r !== 'rare') return fail('Needs a Rare item.')
        if (fullBoth(item)) return fail('Item already has 6 modifiers.')
        fill(item, mods, count, side, { sameTypeTags: sameTypeTags }, log); break
      case 'Orb of Alchemy':
        if (r !== 'normal' && r !== 'magic') return fail('Needs a Normal or Magic item.')
        item.rarity = 'rare'; item.prefixes = []; item.suffixes = []
        // 4 mods; a dextral/sinistral alchemy omen maxes that side
        if (side) { fill(item, mods, caps('rare')[side === 'prefix' ? 'p' : 's'], side, {}, log); fill(item, mods, 4 - (side === 'prefix' ? item.prefixes.length : item.suffixes.length), null, {}, log) }
        else fill(item, mods, 4, null, {}, log)
        break
      case 'Chaos Orb':
      case 'Greater Chaos Orb':
      case 'Perfect Chaos Orb':
        if (r !== 'rare') return fail('Needs a Rare item.')
        if (!item.prefixes.length && !item.suffixes.length) return fail('No modifiers to replace.')
        var removed = removeRandom(item, side) // dextral/sinistral erasure = side-locked removal
        if (removed) log.push('− ' + removed.text)
        fill(item, mods, 1, null, { sameTypeTags: sameTypeTags }, log); break
      case 'Orb of Annulment':
        if (!item.prefixes.length && !item.suffixes.length) return fail('No modifiers to remove.')
        var n = count
        for (var k = 0; k < n; k++) { var rm = removeRandom(item, side); if (rm) log.push('− ' + rm.text) }
        break
      case 'Divine Orb':
        if (!item.prefixes.length && !item.suffixes.length) return fail('No modifiers to divine.')
        item.prefixes.concat(item.suffixes).forEach(function (mi) { mi.rolled = true })
        log.push('Randomised the numeric values of ' + (item.prefixes.length + item.suffixes.length) + ' modifiers.'); break
      case 'Vaal Orb':
        return applyVaal(item, mods, omen, log)
      case 'Fracturing Orb':
        if (r !== 'rare' || (item.prefixes.length + item.suffixes.length) < 4) return fail('Needs a Rare item with at least 4 modifiers.')
        var all = item.prefixes.concat(item.suffixes).filter(function (m) { return !m.fractured })
        if (!all.length) return fail('Every modifier is already fractured.')
        var fr = all[Math.floor(Math.random() * all.length)]; fr.fractured = true
        log.push('Fractured (locked): ' + fr.text); break
      case 'Blacksmith\'s Whetstone':
        if (!(isWeaponCat(item.category) && !CASTER_WEAPON[item.category])) return fail('Improves a martial weapon.')
        return quality(item, log)
      case 'Arcanist\'s Etcher':
        if (!CASTER_WEAPON[item.category]) return fail('Improves a wand, staff or sceptre.')
        return quality(item, log)
      case 'Armourer\'s Scrap':
        if (!ARMOUR_CAT[item.category]) return fail('Improves an armour.')
        return quality(item, log)
      default:
        return { ok: false, log: ['“' + cname + '” isn\'t a bench action in the simulator — see its effect on the right.'] }
    }
    return { ok: true, log: log }

    function fail (msg) { return { ok: false, log: [msg] } }
  }
  function fullBoth (item) { var c = caps(item.rarity); return item.prefixes.length >= c.p && item.suffixes.length >= c.s }

  function applyVaal (item, mods, omen, log) {
    item.corrupted = true
    var roll = Math.random()
    if (omen && omen.rule && omen.rule.vaalChange) roll = Math.min(roll, 0.74) // Omen of Corruption: always changes
    if (roll < 0.25) { log.push('Vaal: no change (item corrupted).') }
    else if (roll < 0.5 && (item.prefixes.length + item.suffixes.length)) { var rm = removeRandom(item); if (rm) log.push('Vaal − ' + rm.text) }
    else if (roll < 0.75 && !fullBoth(item) && item.rarity === 'rare') { var inst = addRandomMod(item, mods, null, {}); if (inst) log.push('Vaal + ' + inst.text) }
    else { item.rarity = 'rare'; log.push('Vaal: reforged as a corrupted Rare.'); }
    return { ok: true, log: log }
  }

  // essence: upgrades to rare and adds a guaranteed mod matching the item type
  function applyEssence (item, ess, mods, omen) {
    var log = []
    if (item.rarity === 'normal') { item.rarity = 'magic' }
    if (item.rarity === 'magic') { item.rarity = 'rare' }
    else if (item.rarity !== 'rare') return { ok: false, log: ['Essences apply to Normal, Magic or Rare items.'] }
    // find the guarantee line whose type list matches this item
    var g = matchGuarantee(ess, item)
    if (!g) { log.push('This essence has no effect on ' + prettyCat(item.category) + '.'); return { ok: true, log: log } }
    // find a pool mod in that family (by keyword) to occupy the right side
    var target = guaranteedMod(g.text, mods, item, ess.tier)
    if (target) {
      if (sideFull(item, target.mod.side)) { log.push('No open ' + target.mod.side + ' for the guaranteed mod.') }
      else { var inst = instanceOf(target.mod, target.tier); inst.guaranteed = true; placeInstance(item, inst); log.push('Guaranteed: ' + inst.text + '  [' + inst.tierName + ']') }
    } else {
      // fall back to showing the essence's own text as the guaranteed prefix
      var side = /life|mana|armour|evasion|energy shield|physical|spell|attack/i.test(g.text) ? 'prefix' : 'suffix'
      if (!sideFull(item, side)) { placeInstance(item, { family: 'essence:' + ess.name, side: side, mod: g.text, tags: [], tierName: ess.tier, tierLvl: 0, text: stripHtml(g.text), guaranteed: true }); log.push('Guaranteed: ' + stripHtml(g.text)) }
    }
    // fill the rest of a rare up to a natural count
    var target6 = 3 + Math.floor(Math.random() * 3) // 3..5 total is typical for an essence hit
    var side2 = omen && omen.rule && omen.rule.side ? omen.rule.side : null
    var guard = 0
    while ((item.prefixes.length + item.suffixes.length) < target6 && guard++ < 8) {
      var extra = addRandomMod(item, mods, side2, {})
      if (!extra) break
      log.push('+ ' + extra.text + '  [' + extra.tierName + ']')
    }
    return { ok: true, log: log }
  }
  function matchGuarantee (ess, item) {
    var catWords = essenceTypeWords(item)
    for (var i = 0; i < ess.guarantees.length; i++) {
      var g = ess.guarantees[i]
      var types = g.types.toLowerCase()
      for (var w = 0; w < catWords.length; w++) if (types.indexOf(catWords[w]) >= 0) return g
    }
    return ess.guarantees.length === 1 ? ess.guarantees[0] : null
  }
  function essenceTypeWords (item) {
    var c = item.category
    var map = {
      Amulets: ['jewellery', 'amulet'], Rings: ['jewellery', 'ring'], Belts: ['belt', 'armour or belt'],
      Body_Armours: ['armour', 'body'], Helmets: ['armour', 'helmet'], Gloves: ['armour', 'glove'], Boots: ['armour', 'boot'],
      Shields: ['armour', 'shield'], Bucklers: ['armour', 'shield'], Foci: ['armour', 'focus'], Quivers: ['quiver']
    }
    if (map[c]) return map[c]
    // weapons
    if (/Bows/.test(c)) return ['bow', 'weapon']
    if (/Two_Hand|Staves|Quarterstaves|Crossbows/.test(c)) return ['two handed', 'weapon']
    return ['one handed', 'weapon', 'melee']
  }
  // essences give a fixed strength by tier — pin the guaranteed tier instead of rolling.
  function essenceTierPick (mod, ilvl, tier) {
    var elig = eligTiers(mod, ilvl) // ascending tier level = weakest -> strongest
    if (!elig.length) return mod.tiers[mod.tiers.length - 1]
    var frac = ({ Lesser: 0.3, Normal: 0.55, Greater: 0.8, Perfect: 1 })[tier]
    if (frac == null) frac = 0.6
    return elig[Math.min(elig.length - 1, Math.round((elig.length - 1) * frac))]
  }
  function guaranteedMod (text, mods, item, tier) {
    var plain = stripHtml(text).toLowerCase()
    var key = plain.replace(/[+()0-9%—.-]/g, ' ').replace(/\s+/g, ' ').trim()
    // pick the pool mod whose family/text best matches the essence stat wording
    var best = null, bestScore = 0
    for (var i = 0; i < mods.length; i++) {
      var m = mods[i]
      if (m.domain !== 'normal') continue
      var fam = (m.family || '').toLowerCase()
      var score = 0
      if (key.indexOf(fam) >= 0 && fam.length > 2) score += fam.length
      var mt = (m.text || '').toLowerCase().replace(/[+()0-9%—.-]/g, ' ')
      var shared = key.split(' ').filter(function (w) { return w.length > 3 && mt.indexOf(w) >= 0 }).length
      score += shared
      if (score > bestScore) { bestScore = score; best = m }
    }
    if (best && bestScore > 0) return { mod: best, tier: essenceTierPick(best, item.ilvl, tier) }
    return null
  }

  // -------------------------------------------------------------- omen rules
  function omenRule (name) {
    var n = name.toLowerCase()
    var r = {}
    if (/dextral/.test(n)) r.side = 'suffix'
    if (/sinistral/.test(n)) r.side = 'prefix'
    if (/greater exaltation/.test(n)) r.count = 2
    if (/greater annulment/.test(n)) r.count = 2
    if (/homogenising/.test(n)) r.homogenising = true
    if (/^omen of corruption/.test(n)) r.vaalChange = true
    return Object.keys(r).length ? r : null
  }
  // which currency an omen modifies (to grey-out non-matching omens)
  function omenApplies (omen, cname) {
    var n = omen.name.toLowerCase()
    if (/exaltation/.test(n)) return /exalted/i.test(cname)
    if (/annulment/.test(n)) return /annulment/i.test(cname)
    if (/coronation/.test(n)) return /regal/i.test(cname)
    if (/alchemy/.test(n)) return /alchemy/i.test(cname)
    if (/erasure/.test(n)) return /chaos/i.test(cname)
    if (/corruption/.test(n)) return /vaal/i.test(cname)
    if (/crystallisation/.test(n)) return /essence/i.test(cname)
    if (/chance/.test(n)) return /chance/i.test(cname)
    return false
  }

  // ---------------------------------------------------------------- item model
  function baseDefTypes (base) {
    var d = { ar: 0, ev: 0, es: 0 }
    ;(base.properties || []).forEach(function (p) {
      var n = String(p.name || '')
      if (/^Armour$/i.test(n)) d.ar = 1
      else if (/^Evasion/i.test(n)) d.ev = 1
      else if (/^Energy Shield$/i.test(n)) d.es = 1
    })
    return d
  }
  function newItem (category, base) {
    return {
      category: category, base: base.name, img: base.imageLocal, def: baseDefTypes(base),
      implicits: (base.implicitMods || []).map(stripHtml),
      ilvl: 82, rarity: 'normal', quality: 0, prefixes: [], suffixes: [], corrupted: false
    }
  }
  function cloneItem (it) {
    return {
      category: it.category, base: it.base, img: it.img, def: it.def, implicits: it.implicits,
      ilvl: it.ilvl, rarity: it.rarity, quality: it.quality, corrupted: it.corrupted,
      prefixes: it.prefixes.map(cloneInst), suffixes: it.suffixes.map(cloneInst)
    }
  }
  function cloneInst (m) { var o = {}; for (var k in m) o[k] = m[k]; return o }
  function prettyCat (c) { return String(c).replace(/_/g, ' ') }

  // ============================================================ UI CONTROLLER
  // Curated bench: the currencies that actually alter an item's mods/quality,
  // in the order a crafter reaches for them. Everything else in Currency.json
  // is still browsable, but these drive the simulation.
  var BENCH = [
    'Orb of Transmutation', 'Orb of Augmentation', 'Regal Orb', 'Exalted Orb', 'Chaos Orb',
    'Orb of Alchemy', 'Orb of Annulment', 'Divine Orb', 'Vaal Orb', 'Fracturing Orb',
    'Greater Exalted Orb', 'Perfect Exalted Orb', 'Greater Regal Orb', 'Greater Orb of Augmentation',
    'Greater Chaos Orb', 'Perfect Chaos Orb', 'Blacksmith\'s Whetstone', 'Armourer\'s Scrap', 'Arcanist\'s Etcher'
  ]

  function mount (host, optsJson) {
    var opts = {}
    try { opts = optsJson ? JSON.parse(optsJson) : {} } catch (e) {}
    var st = {
      category: 'Bows', item: null, mods: [], history: [], future: [],
      tab: 'currency', omen: null, poolTag: null, poolSide: 'all', q: ''
    }
    host.innerHTML = '<div class="cx-loading">Loading the crafting bench…</div>'

    loadCore(function () {
      // default base = first of the category
      var list = core.bases[st.category] || core.bases[Object.keys(core.bases)[0]]
      st.category = list ? st.category : Object.keys(core.bases)[0]
      list = core.bases[st.category]
      st.item = newItem(st.category, list[0])
      loadModsFor(st.item, function (mods) { st.mods = mods; render() })
    })

    // ---- actions ----
    function setBase (cat, baseName) {
      st.category = cat
      var list = core.bases[cat] || []
      var base = null
      for (var i = 0; i < list.length; i++) if (list[i].name === baseName) { base = list[i]; break }
      base = base || list[0]
      st.item = newItem(cat, base)
      st.history = []; st.future = []
      loadModsFor(st.item, function (mods) { st.mods = mods; render() })
    }
    function pushHistory (label) { st.history.push({ label: label, snap: cloneItem(st.item) }); st.future = [] }
    function doCurrency (cname) {
      var before = cloneItem(st.item)
      var res = applyCurrency(st.item, cname, st.mods, st.omen)
      if (!res.ok) { flash(res.log[0]); st.item = before; return }
      st.history.push({ label: cname + (st.omen ? ' + ' + st.omen.short : ''), snap: before, log: res.log })
      st.future = []
      st.omen = null // omens are single-use
      render()
    }
    function doEssence (ess) {
      var before = cloneItem(st.item)
      var res = applyEssence(st.item, ess, st.mods, st.omen)
      if (!res.ok) { flash(res.log[0]); st.item = before; return }
      st.history.push({ label: ess.name + (st.omen ? ' + ' + st.omen.short : ''), snap: before, log: res.log })
      st.future = []; st.omen = null; render()
    }
    function backtrackTo (idx) {
      // restore the snapshot taken *before* step idx
      var step = st.history[idx]
      if (!step) return
      st.item = cloneItem(step.snap)
      st.history = st.history.slice(0, idx)
      render()
    }
    function resetItem () {
      var list = core.bases[st.category]; st.item = newItem(st.category, findBase(st.item.base) || list[0])
      st.history = []; st.future = []; st.omen = null; render()
    }
    function findBase (name) { var l = core.bases[st.category] || []; for (var i = 0; i < l.length; i++) if (l[i].name === name) return l[i]; return null }
    function scour () { st.item.rarity = 'normal'; st.item.prefixes = []; st.item.suffixes = []; render() }

    function flash (msg) {
      var el = host.querySelector('#cx-flash')
      if (!el) return
      el.textContent = msg; el.classList.add('show')
      clearTimeout(flash._t); flash._t = setTimeout(function () { el.classList.remove('show') }, 2600)
    }

    // ------------------------------------------------------------- rendering
    function render () {
      if (!host.isConnected) return
      host.innerHTML =
        '<div class="cx-root">' +
          topBar() +
          '<div class="cx-cols">' +
            '<div class="cx-left">' + itemCard() + tagsCard() + historyCard() + '</div>' +
            '<div class="cx-right">' + stepCard() + poolCard() + '</div>' +
          '</div>' +
          '<div id="cx-flash" class="cx-flash"></div>' +
        '</div>'
      wire()
    }

    // top bar: category + base + ilvl + rarity
    function topBar () {
      var cats = Object.keys(core.bases)
      var catOpts = cats.map(function (c) { return '<option value="' + esc(c) + '"' + (c === st.category ? ' selected' : '') + '>' + esc(prettyCat(c)) + '</option>' }).join('')
      var bases = core.bases[st.category] || []
      var baseOpts = bases.map(function (b) { return '<option value="' + esc(b.name) + '"' + (b.name === st.item.base ? ' selected' : '') + '>' + esc(b.name) + '</option>' }).join('')
      return '<div class="cx-top">' +
        '<div class="cx-field"><label>Item class</label><select id="cx-cat" class="form-select form-select-sm" autocomplete="off">' + catOpts + '</select></div>' +
        '<div class="cx-field cx-grow"><label>Base</label><select id="cx-base" class="form-select form-select-sm" autocomplete="off">' + baseOpts + '</select></div>' +
        '<div class="cx-field cx-ilvl"><label>Item level</label><input id="cx-ilvl" type="number" min="1" max="100" value="' + st.item.ilvl + '" class="form-control form-control-sm" autocomplete="off"></div>' +
        '<button class="cx-btn cx-reset" data-act="reset" title="Reset to a fresh base"><i class="bi bi-arrow-counterclockwise"></i></button>' +
        '</div>'
    }

    // ---- LEFT: current item ----
    function modRow (m, side) {
      var badge = side === 'prefix' ? 'P' : 'S'
      var tags = (m.tags || []).slice(0, 4).map(function (t) { return '<span class="cx-mtag">' + esc(t) + '</span>' }).join('')
      var flags = (m.fractured ? '<i class="bi bi-lock-fill cx-fract" title="Fractured"></i>' : '') + (m.guaranteed ? '<i class="bi bi-stars cx-guar" title="Guaranteed by essence"></i>' : '')
      return '<div class="cx-mod cx-' + side + '">' +
        '<span class="cx-mbadge cx-b-' + side + '">' + badge + '</span>' +
        '<div class="cx-mbody"><div class="cx-mtext">' + htmlText(m.text) + ' ' + flags + '</div>' +
        '<div class="cx-mmeta"><span class="cx-tier">' + esc(m.tierName || '') + '</span>' + tags + '</div></div></div>'
    }
    function itemCard () {
      var it = st.item, c = caps(it.rarity)
      var pRows = it.prefixes.map(function (m) { return modRow(m, 'prefix') }).join('')
      var sRows = it.suffixes.map(function (m) { return modRow(m, 'suffix') }).join('')
      var implicits = it.implicits.length ? '<div class="cx-implicits">' + it.implicits.map(function (t) { return '<div class="cx-imp">' + esc(t) + '</div>' }).join('') + '</div>' : ''
      var empty = (!it.prefixes.length && !it.suffixes.length) ? '<div class="cx-emptymods">No modifiers yet — apply currency on the right.</div>' : ''
      return '<div class="cx-card cx-itemcard cx-r-' + it.rarity + (it.corrupted ? ' cx-corrupt' : '') + '">' +
        '<div class="cx-itemhead">' +
          '<img class="cx-itemimg" src="' + IMG + esc(it.img) + '" alt="" onerror="this.style.visibility=\'hidden\'">' +
          '<div class="cx-itemtitle"><div class="cx-itemname">' + esc(it.base) + '</div>' +
          '<div class="cx-itemsub">' + cap1(it.rarity) + ' · iLvl ' + it.ilvl + (it.quality ? ' · +' + it.quality + '% Q' : '') + (it.corrupted ? ' · Corrupted' : '') + '</div></div>' +
        '</div>' + implicits +
        '<div class="cx-slotcounts"><span class="cx-pfx">Prefixes ' + it.prefixes.length + '/' + c.p + '</span><span class="cx-sfx">Suffixes ' + it.suffixes.length + '/' + c.s + '</span></div>' +
        '<div class="cx-modlist">' + pRows + sRows + empty + '</div>' +
        '<div class="cx-itemactions"><button class="cx-linkbtn" data-act="scour"><i class="bi bi-eraser"></i> Scour</button></div>' +
        '</div>'
    }
    // ---- LEFT: active craft tags (from the current item's mods) ----
    function tagsCard () {
      var counts = {}
      st.item.prefixes.concat(st.item.suffixes).forEach(function (m) { (m.tags || []).forEach(function (t) { counts[t] = (counts[t] || 0) + 1 }) })
      var keys = Object.keys(counts).sort(function (a, b) { return counts[b] - counts[a] })
      if (!keys.length) return ''
      var chips = keys.map(function (t) { return '<span class="cx-ctag">' + esc(t) + '<b>' + counts[t] + '</b></span>' }).join('')
      return '<div class="cx-card cx-tagscard"><div class="cx-cardhead">Active Craft Tags</div><div class="cx-ctags">' + chips + '</div></div>'
    }
    // ---- LEFT: history + backtrack ----
    function historyCard () {
      if (!st.history.length) return '<div class="cx-card cx-histcard"><div class="cx-cardhead">Crafting History</div><div class="cx-histempty">Your steps will appear here.</div></div>'
      var rows = st.history.map(function (h, i) {
        var log = (h.log || []).map(function (l) { return '<div class="cx-hlog">' + esc(l) + '</div>' }).join('')
        return '<div class="cx-hstep"><div class="cx-hhead"><span class="cx-hnum">' + (i + 1) + '</span><span class="cx-hlabel">' + esc(h.label) + '</span>' +
          '<button class="cx-backtrack" data-back="' + i + '" title="Backtrack to before this step"><i class="bi bi-arrow-return-left"></i></button></div>' + log + '</div>'
      }).reverse().join('')
      return '<div class="cx-card cx-histcard"><div class="cx-cardhead">Crafting History <span class="cx-hcount">' + st.history.length + ' steps</span></div><div class="cx-hlist">' + rows + '</div></div>'
    }

    // ---- RIGHT: crafting step (currency / essence / omen) ----
    function stepCard () {
      var tabs = ['currency', 'essence', 'omen'].map(function (t) {
        var label = t === 'currency' ? 'Use Currency' : t === 'essence' ? 'Essence' : 'Omens'
        return '<button class="cx-tab' + (st.tab === t ? ' active' : '') + '" data-tab="' + t + '">' + label + '</button>'
      }).join('')
      var body = st.tab === 'currency' ? currencyGrid() : st.tab === 'essence' ? essenceGrid() : omenGrid()
      var active = st.omen ? '<div class="cx-activeomen">Active Omen: <b>' + esc(st.omen.short) + '</b> <button class="cx-omenclear" data-act="clearomen">clear</button></div>' : ''
      return '<div class="cx-card cx-stepcard"><div class="cx-cardhead">Crafting Step</div>' +
        '<div class="cx-tabs">' + tabs + '</div>' + active +
        '<div class="cx-stepbody">' + body + '</div></div>'
    }
    function cell (img, name, on, disabled, dataAttr) {
      return '<button class="cx-cell' + (disabled ? ' disabled' : '') + (on ? ' on' : '') + '" ' + dataAttr + ' title="' + esc(name) + '"' + (disabled ? ' disabled' : '') + '>' +
        '<img src="' + IMG + esc(img) + '" alt="" onerror="this.style.opacity=0.15">' +
        '<span class="cx-cellname">' + esc(name) + '</span></button>'
    }
    function currencyGrid () {
      var byName = {}; core.currency.forEach(function (c) { byName[c.name] = c })
      var cells = BENCH.map(function (name) {
        var c = byName[name]; if (!c) return ''
        var res = dryRun(name)
        return cell(c.img, shortCur(name), false, !res.ok, 'data-cur="' + esc(name) + '"')
      }).join('')
      return '<div class="cx-grid">' + cells + '</div>' +
        '<div class="cx-hint">Click a currency to apply it. Greyed-out currencies don\'t apply to the current item.</div>'
    }
    function essenceGrid () {
      // group by tier for browsability
      var groups = { Lesser: [], Normal: [], Greater: [], Perfect: [] }
      core.essences.forEach(function (e) { (groups[e.tier] || (groups[e.tier] = [])).push(e) })
      var html = ''
      ;['Lesser', 'Normal', 'Greater', 'Perfect'].forEach(function (g) {
        if (!groups[g] || !groups[g].length) return
        var cells = groups[g].map(function (e, i) { return cell(e.img, e.name.replace(/^(Lesser|Greater|Perfect) /, '').replace(/^Essence of /, ''), false, false, 'data-ess="' + esc(g) + ':' + i + '"') }).join('')
        html += '<div class="cx-essgroup"><div class="cx-essgrouphead">' + g + '</div><div class="cx-grid">' + cells + '</div></div>'
      })
      return html + '<div class="cx-hint">An essence upgrades the item and adds a guaranteed modifier for its item type.</div>'
    }
    function omenGrid () {
      var cells = core.omens.map(function (o, i) {
        var on = st.omen && st.omen.name === o.name
        return cell(o.img, o.short, on, false, 'data-omen="' + i + '"')
      }).join('')
      return '<div class="cx-grid cx-omengrid">' + cells + '</div>' +
        '<div class="cx-hint">Select an omen to modify your <b>next</b> currency use (e.g. Dextral = suffix only, Greater Exaltation = +2 mods). It\'s consumed on use.</div>'
    }
    function dryRun (cname) {
      var copy = cloneItem(st.item)
      return applyCurrency(copy, cname, st.mods, st.omen)
    }

    // ---- RIGHT: the mod pool ("possible mods (total weight)") ----
    function poolCard () {
      // combined open-side pool for display
      var side = st.poolSide === 'all' ? null : st.poolSide
      var pool = poolFor(st.item, st.mods, side, { tag: st.poolTag, display: true })
      // build tag list for "filter by craft tags"
      var tagCounts = {}
      st.mods.forEach(function (m) { if (m.domain === 'normal') (m.tags || []).forEach(function (t) { tagCounts[t] = (tagCounts[t] || 0) + 1 }) })
      var topTags = Object.keys(tagCounts).sort(function (a, b) { return tagCounts[b] - tagCounts[a] }).slice(0, 16)
      var tagChips = topTags.map(function (t) { return '<button class="cx-poolTag' + (st.poolTag === t ? ' on' : '') + '" data-ptag="' + esc(t) + '">' + esc(t) + '</button>' }).join('')

      var ql = st.q.toLowerCase()
      var rows = pool.list
        .filter(function (x) { return !ql || x.mod.text.toLowerCase().indexOf(ql) >= 0 || (x.mod.family || '').toLowerCase().indexOf(ql) >= 0 })
        .sort(function (a, b) { return b.eff - a.eff })
        .map(function (x) {
          var m = x.mod, pct = pool.total ? (x.eff / pool.total * 100) : 0
          var elig = eligTiers(m, st.item.ilvl)
          var top = elig[elig.length - 1] || m.tiers[m.tiers.length - 1]
          return '<div class="cx-prow">' +
            '<span class="cx-pbadge cx-b-' + m.side + '">' + (m.side === 'prefix' ? 'P' : 'S') + '</span>' +
            '<div class="cx-pbody"><div class="cx-ptext">' + htmlText(top ? top.text : m.text) + '</div>' +
            '<div class="cx-pmeta">' + (m.tags || []).slice(0, 3).map(function (t) { return '<span class="cx-mtag">' + esc(t) + '</span>' }).join('') +
            '<span class="cx-pmore">' + elig.length + ' tiers · iL' + (elig[0] ? elig[0].lvl : m.ilvl) + '+</span></div></div>' +
            '<div class="cx-pw"><b>' + pct.toFixed(1) + '%</b><span>' + fmtW(x.eff) + '</span></div>' +
            '</div>'
        }).join('')

      var sideBtns = ['all', 'prefix', 'suffix'].map(function (s) {
        return '<button class="cx-poolside' + (st.poolSide === s ? ' on' : '') + '" data-pside="' + s + '">' + (s === 'all' ? 'All' : cap1(s)) + '</button>'
      }).join('')

      return '<div class="cx-card cx-poolcard">' +
        '<div class="cx-cardhead">' + pool.list.length + ' possible mods <span class="cx-poolweight">total weight ' + fmtW(pool.total) + '</span></div>' +
        '<div class="cx-poolctl">' + sideBtns +
          '<div class="cx-poolsearch"><i class="bi bi-search"></i><input id="cx-psearch" placeholder="Search mods…" value="' + esc(st.q) + '" autocomplete="off"></div>' +
        '</div>' +
        (tagChips ? '<div class="cx-pooltags">' + (st.poolTag ? '<button class="cx-poolTag on" data-ptag="">Craft Tags ✕</button>' : '<span class="cx-pooltaglbl">Filter by Craft Tag:</span>') + tagChips + '</div>' : '') +
        '<div class="cx-poollist">' + (rows || '<div class="cx-emptymods">No mods can roll here right now.</div>') + '</div>' +
        '</div>'
    }
    function fmtW (w) { return w >= 1000 ? (w / 1000).toFixed(1) + 'k' : String(w) }
    function shortCur (n) { return n.replace(/^Orb of /, '').replace(/'s /, '’s ') }

    // -------------------------------------------------------------- wiring
    function wire () {
      var $ = function (s) { return host.querySelector(s) }
      var each = function (s, fn) { var l = host.querySelectorAll(s); for (var i = 0; i < l.length; i++) fn(l[i]) }
      var cat = $('#cx-cat'); if (cat) cat.addEventListener('change', function () { setBase(this.value, (core.bases[this.value] || [{}])[0].name) })
      var base = $('#cx-base'); if (base) base.addEventListener('change', function () { setBase(st.category, this.value) })
      var ilvl = $('#cx-ilvl'); if (ilvl) ilvl.addEventListener('change', function () { var v = Math.max(1, Math.min(100, +this.value || 82)); st.item.ilvl = v; render() })
      each('[data-tab]', function (b) { b.addEventListener('click', function () { st.tab = this.getAttribute('data-tab'); render() }) })
      each('[data-cur]', function (b) { b.addEventListener('click', function () { if (!this.disabled) doCurrency(this.getAttribute('data-cur')) }) })
      each('[data-ess]', function (b) { b.addEventListener('click', function () { var p = this.getAttribute('data-ess').split(':'); var g = groupsFor(p[0]); doEssence(g[+p[1]]) }) })
      each('[data-omen]', function (b) { b.addEventListener('click', function () { var o = core.omens[+this.getAttribute('data-omen')]; st.omen = (st.omen && st.omen.name === o.name) ? null : o; render() }) })
      each('[data-back]', function (b) { b.addEventListener('click', function () { backtrackTo(+this.getAttribute('data-back')) }) })
      each('[data-ptag]', function (b) { b.addEventListener('click', function () { var t = this.getAttribute('data-ptag'); st.poolTag = t || null; render() }) })
      each('[data-pside]', function (b) { b.addEventListener('click', function () { st.poolSide = this.getAttribute('data-pside'); render() }) })
      var ps = $('#cx-psearch'); if (ps) ps.addEventListener('input', function () { st.q = this.value; var list = host.querySelector('.cx-poollist'); rerenderPool() })
      each('[data-act]', function (b) {
        b.addEventListener('click', function () {
          var a = this.getAttribute('data-act')
          if (a === 'reset' || a === 'scour') { a === 'reset' ? resetItem() : scour() }
          else if (a === 'clearomen') { st.omen = null; render() }
        })
      })
    }
    function groupsFor (tier) { return core.essences.filter(function (e) { return e.tier === tier }) }
    // light-touch pool re-render on search so the input keeps focus
    function rerenderPool () {
      var card = host.querySelector('.cx-poolcard')
      if (!card) { render(); return }
      var focus = document.activeElement === host.querySelector('#cx-psearch')
      var tmp = document.createElement('div'); tmp.innerHTML = poolCard()
      card.parentNode.replaceChild(tmp.firstChild, card)
      // rewire pool-only controls
      var $ = function (s) { return host.querySelector(s) }
      var each = function (s, fn) { var l = host.querySelectorAll(s); for (var i = 0; i < l.length; i++) fn(l[i]) }
      each('[data-ptag]', function (b) { b.addEventListener('click', function () { var t = b.getAttribute('data-ptag'); st.poolTag = t || null; render() }) })
      each('[data-pside]', function (b) { b.addEventListener('click', function () { st.poolSide = b.getAttribute('data-pside'); render() }) })
      var ps = $('#cx-psearch'); if (ps) { ps.addEventListener('input', function () { st.q = this.value; rerenderPool() }); if (focus) { ps.focus(); ps.setSelectionRange(ps.value.length, ps.value.length) } }
    }

    return { dispose: function () { clearTimeout(flash._t); host.innerHTML = '' } }
  }

  window.ecCraft = {
    mount: mount,
    // exposed for future headless tests
    _applyCurrency: applyCurrency, _poolFor: poolFor, _newItem: newItem
  }
})()

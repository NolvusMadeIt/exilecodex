// PoE2 passive tree renderer — canvas engine over the PoB-PoE2 tree.json (vendored under
// app/media/tree/0_5). Faithful to Path of Building's own PassiveTree/PassiveTreeView logic:
//   * node pos  = group + orbitRadii[orbit] at orbitAnglesByOrbit[orbit][orbitIndex]
//   * assets    are drawn at 2x their stored width (PoB DrawAsset: width = RADIUS) — so the
//     ascendancy background (width 1500) covers a 3000-unit circle and its nodes sit INSIDE it
//   * ALL ascendancy backgrounds render (selected full, others dimmed)
//   * connections = arc through the connection's orbit / same-orbit arc / else straight line,
//     only between nodes of the same ascendancy (PoB BuildConnector)
//   * node sizes = PoB GetNodeTargetSize * 2 (frame drawn over the icon)
// Art is downloaded from the PoB repo + converted to PNG by scripts/build-tree-{sprites,backgrounds}
// .cjs and vendored under media/tree/0_5/sprites — no external linking.
(function () {
  'use strict'
  var CACHE = null, ASSETS = null, TAU = Math.PI * 2

  function loadTree(url, cb) {
    if (CACHE) { cb(CACHE); return }
    fetch(url).then(function (r) { return r.ok ? r.json() : Promise.reject(r.status) })
      .then(function (j) { CACHE = j; cb(j) }).catch(function (e) { console.error('[ecTree] tree.json load failed', e); cb(null) })
  }
  function loadAssets(base, cb) {
    if (ASSETS) { cb(ASSETS); return }
    Promise.all([
      fetch(base + 'sprite-map.json').then(function (r) { return r.ok ? r.json() : {} }).catch(function () { return {} }),
      fetch(base + 'bg-map.json').then(function (r) { return r.ok ? r.json() : {} }).catch(function () { return {} }),
    ]).then(function (m) {
      var iconMap = m[0] || {}, bgMap = m[1] || {}, names = {}, k
      for (k in iconMap) names[iconMap[k].sheet] = 1
      for (k in bgMap) names[bgMap[k].sheet] = 1
      names['background_1024_1024_BC7.png'] = 1
      var list = Object.keys(names), imgs = {}, left = list.length
      if (!left) { ASSETS = { iconMap: iconMap, bgMap: bgMap, imgs: imgs }; cb(ASSETS); return }
      list.forEach(function (nm) { var img = new Image(); img.onload = img.onerror = function () { if (--left === 0) { ASSETS = { iconMap: iconMap, bgMap: bgMap, imgs: imgs }; cb(ASSETS) } }; img.src = base + nm; imgs[nm] = img })
    })
  }

  function build(tree) {
    var oR = tree.constants.orbitRadii, angles = tree.constants.orbitAnglesByOrbit
    var nodes = {}, list = [], ids = Object.keys(tree.nodes)
    for (var i = 0; i < ids.length; i++) {
      var id = ids[i], n = tree.nodes[id], g = n.group != null ? tree.groups[n.group] : null
      if (!g) continue
      var a = (angles[n.orbit] || [0])[n.orbitIndex] || 0, r = oR[n.orbit] || 0
      var rec = {
        id: id, x: g.x + Math.sin(a) * r, y: g.y - Math.cos(a) * r, gx: g.x, gy: g.y,
        group: n.group, orbit: n.orbit, orbitR: r, angle: a,
        type: n.isKeystone ? 'keystone' : n.isNotable ? 'notable' : n.isJewelSocket ? 'jewel' : n.ascendancyName ? 'ascend' : 'normal',
        name: n.name || '', icon: n.icon || null, asc: n.ascendancyName || null, isAscStart: !!n.isAscendancyStart,
        classStart: !!n.classesStart, stats: n.stats || [],
        conns: (n.connections || []).map(function (c) { return { id: String(c.id), orbit: c.orbit || 0 } }),
      }
      nodes[id] = rec; list.push(rec)
    }
    // ALL ascendancy background art (image + world pos + size) from the class data
    var ascBg = {}, classes = tree.classes
    var ck = Array.isArray(classes) ? classes.map(function (_, i) { return i }) : Object.keys(classes || {})
    ck.forEach(function (k) { var cl = classes[k]; if (!cl || !cl.ascendancies) return
      cl.ascendancies.forEach(function (x) { if (x.background && x.background.image) ascBg[x.name] = { image: x.background.image, x: x.background.x, y: x.background.y, w: x.background.width, h: x.background.height } }) })
    return { nodes: nodes, list: list, ascBg: ascBg, orbitRadii: oR }
  }

  // PoB GetNodeTargetSize * 2 (frame = overlay, icon = base) — world-unit diameters
  var SZ = { normal: { f: 108, i: 74 }, notable: { f: 160, i: 108 }, keystone: { f: 240, i: 164 }, jewel: { f: 152, i: 104 }, ascend: { f: 160, i: 74 } }
  var FRAME = { normal: ['PSSkillFrame', 'PSSkillFrameActive'], notable: ['NotableFrameUnallocated', 'NotableFrameAllocated'], keystone: ['KeystoneFrameUnallocated', 'KeystoneFrameAllocated'], jewel: ['JewelFrameUnallocated', 'JewelFrameAllocated'] }
  var COL = { normal: '#6a6456', notable: '#b7935a', keystone: '#c56b3a', jewel: '#4a7ea0', ascend: '#8a6fb0' }
  var LINE = '#5a5240', ALLOC_LINE = '#e8c56a'

  function Renderer(host, data, opts) {
    opts = opts || {}; var self = this
    this.host = host; this.data = data; this.alloc = {}; this.search = ''
    this.onPoints = opts.onPoints || function () {}
    this.ascFilter = opts.ascendancy || null
    this.iconMap = null; this.bgMap = null; this.imgs = {}; this.bg = null
    var c = document.createElement('canvas'); c.className = 'ectree-canvas'; host.appendChild(c)
    this.canvas = c; this.ctx = c.getContext('2d')
    this.camX = 0; this.camY = 0; this.scale = 0.26; this.dpr = Math.min(window.devicePixelRatio || 1, 2)
    this._resize(); this._bind()
    if (window.ResizeObserver) { this._ro = new ResizeObserver(function () { self._resize(); self.draw() }); this._ro.observe(host) }
    this.draw(); this._emit()
  }
  Renderer.prototype._resize = function () {
    var w = (this.host && this.host.clientWidth) || 600, h = (this.host && this.host.clientHeight) || 400
    this.canvas.width = w * this.dpr; this.canvas.height = h * this.dpr; this.canvas.style.width = w + 'px'; this.canvas.style.height = h + 'px'; this.w = w; this.h = h
  }
  Renderer.prototype._w2s = function (x, y) { return { x: (x - this.camX) * this.scale + this.w / 2, y: (y - this.camY) * this.scale + this.h / 2 } }
  Renderer.prototype._s2w = function (sx, sy) { return { x: (sx - this.w / 2) / this.scale + this.camX, y: (sy - this.h / 2) / this.scale + this.camY } }
  Renderer.prototype._img = function (name) { if (!this.bgMap) return null; var f = this.bgMap[name]; if (!f) return null; var im = this.imgs[f.sheet]; return (im && im.complete && im.naturalWidth) ? { im: im, f: f } : null }
  Renderer.prototype._drawSprite = function (name, cx, cy, diam) { var g = this._img(name); if (!g) return false; this.ctx.drawImage(g.im, g.f.x, g.f.y, g.f.w, g.f.h, cx - diam / 2, cy - diam / 2, diam, diam); return true }

  Renderer.prototype.draw = function () {
    var ctx = this.ctx, d = this.data, s = this.scale, self = this
    ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0)
    var minX = this.camX - (this.w / 2) / s, maxX = this.camX + (this.w / 2) / s, minY = this.camY - (this.h / 2) / s, maxY = this.camY + (this.h / 2) / s
    var w2s = function (x, y) { return { x: (x - self.camX) * s + self.w / 2, y: (y - self.camY) * s + self.h / 2 } }
    var visXY = function (x, y, pad) { return x > minX - pad && x < maxX + pad && y > minY - pad && y < maxY + pad }

    // background texture (tiled)
    var bg = this.imgs['background_1024_1024_BC7.png'], ts = 3000, tiled = false
    if (bg && bg.complete && bg.naturalWidth && s > 0.03) {
      var nx = Math.ceil((maxX - minX) / ts) + 1, ny = Math.ceil((maxY - minY) / ts) + 1
      if (nx * ny <= 300) { tiled = true; var x0 = Math.floor(minX / ts) * ts, y0 = Math.floor(minY / ts) * ts
        for (var wx = x0; wx < maxX; wx += ts) for (var wy = y0; wy < maxY; wy += ts) { var bp = w2s(wx, wy); ctx.drawImage(bg, bp.x, bp.y, ts * s + 1, ts * s + 1) } }
    }
    if (!tiled) { var gg = ctx.createRadialGradient(this.w / 2, this.h / 2, 40, this.w / 2, this.h / 2, Math.max(this.w, this.h)); gg.addColorStop(0, '#141a22'); gg.addColorStop(1, '#08090c'); ctx.fillStyle = gg; ctx.fillRect(0, 0, this.w, this.h) }

    // ALL ascendancy background portraits — drawn at width*2 (PoB DrawAsset: width = radius)
    for (var an in d.ascBg) {
      var abg = d.ascBg[an], img = this._img(abg.image); if (!img) continue
      var diam = abg.w * 2 * s
      if (!visXY(abg.x, abg.y, abg.w)) continue
      var c = w2s(abg.x, abg.y)
      ctx.globalAlpha = an === this.ascFilter ? 1 : (this.ascFilter ? 0.4 : 0.85)
      ctx.drawImage(img.im, img.f.x, img.f.y, img.f.w, img.f.h, c.x - diam / 2, c.y - diam / 2, diam, diam)
      ctx.globalAlpha = 1
    }

    // vignette
    var vg = ctx.createRadialGradient(this.w / 2, this.h / 2, this.h * 0.4, this.w / 2, this.h / 2, this.h * 0.98)
    vg.addColorStop(0, 'rgba(0,0,0,0)'); vg.addColorStop(1, 'rgba(0,0,0,0.4)'); ctx.fillStyle = vg; ctx.fillRect(0, 0, this.w, this.h)

    // ---- connections (PoB BuildConnector) ----
    if (s > 0.04) {
      ctx.lineWidth = Math.max(0.7, 10 * s)
      for (var i = 0; i < d.list.length; i++) {
        var n = d.list[i], nvis = visXY(n.x, n.y, 400), nsp = null
        for (var ci = 0; ci < n.conns.length; ci++) {
          var conn = n.conns[ci], mm = d.nodes[conn.id]; if (!mm) continue
          if (Number(n.id) > Number(mm.id)) continue                 // one edge only
          if (n.asc !== mm.asc) continue                             // no cross-ascendancy links
          if (n.classStart || mm.classStart) continue
          if (!nvis && !visXY(mm.x, mm.y, 400)) continue
          if (!nsp) nsp = w2s(n.x, n.y)
          var msp = w2s(mm.x, mm.y)
          ctx.strokeStyle = (this.alloc[n.id] && this.alloc[mm.id]) ? ALLOC_LINE : LINE
          ctx.beginPath()
          var drew = false
          var orbit = Math.abs(conn.orbit)
          if (conn.orbit !== 0 && d.orbitRadii[orbit] != null) {
            var r = d.orbitRadii[orbit], dx = mm.x - n.x, dy = mm.y - n.y, dist = Math.sqrt(dx * dx + dy * dy)
            if (dist > 0 && dist < r * 2) {
              var perp = Math.sqrt(r * r - dist * dist / 4) * (conn.orbit > 0 ? 1 : -1)
              var cx = n.x + dx / 2 + perp * (dy / dist), cy = n.y + dy / 2 - perp * (dx / dist)
              var cs = w2s(cx, cy), a1 = Math.atan2(nsp.y - cs.y, nsp.x - cs.x), a2 = Math.atan2(msp.y - cs.y, msp.x - cs.x)
              var da = a2 - a1; while (da <= -Math.PI) da += TAU; while (da > Math.PI) da -= TAU
              ctx.arc(cs.x, cs.y, r * s, a1, a2, da < 0); drew = true
            }
          } else if (n.group === mm.group && n.orbit === mm.orbit && n.orbitR > 0) {
            var ctr = w2s(n.gx, n.gy), b1 = Math.atan2(nsp.y - ctr.y, nsp.x - ctr.x), b2 = Math.atan2(msp.y - ctr.y, msp.x - ctr.x)
            var db = b2 - b1; while (db <= -Math.PI) db += TAU; while (db > Math.PI) db -= TAU
            ctx.arc(ctr.x, ctr.y, n.orbitR * s, b1, b2, db < 0); drew = true
          }
          if (!drew) { ctx.moveTo(nsp.x, nsp.y); ctx.lineTo(msp.x, msp.y) }
          ctx.stroke()
        }
      }
    }

    // ---- nodes: icon then frame (PoB draws base then overlay) ----
    var ql = this.search, drawIcons = s > 0.05
    for (var j = 0; j < d.list.length; j++) {
      var nd = d.list[j]; if (nd.classStart) continue
      var sz = SZ[nd.type] || SZ.normal
      if (!visXY(nd.x, nd.y, sz.f)) continue
      var p = w2s(nd.x, nd.y), on = !!this.alloc[nd.id]
      var iconD = sz.i * s, frameD = sz.f * s
      // icon
      var sp = this.iconMap && nd.icon ? this.iconMap[nd.icon] : null, im = sp ? this.imgs[sp.sheet] : null
      if (sp && im && im.complete && im.naturalWidth && drawIcons) {
        ctx.save(); ctx.beginPath(); ctx.arc(p.x, p.y, iconD / 2, 0, TAU); ctx.clip()
        ctx.globalAlpha = on ? 1 : 0.7
        ctx.drawImage(im, sp.x, sp.y, sp.w, sp.h, p.x - iconD / 2, p.y - iconD / 2, iconD, iconD)
        ctx.restore(); ctx.globalAlpha = 1
      } else if (!drawIcons || !sp) { ctx.beginPath(); ctx.arc(p.x, p.y, iconD / 2 || 2, 0, TAU); ctx.fillStyle = on ? ALLOC_LINE : COL[nd.type]; ctx.fill() }
      // frame (over the icon)
      var fname
      if (nd.type === 'ascend') { fname = nd.asc ? (nd.asc + 'FrameSmall' + (on ? 'Allocated' : 'Normal')) : null; if (!fname || !this._img(fname)) fname = FRAME.notable[on ? 1 : 0] }
      else fname = FRAME[nd.type][on ? 1 : 0]
      this._drawSprite(fname, p.x, p.y, frameD)
      if (ql && nd.name.toLowerCase().indexOf(ql) !== -1) { ctx.beginPath(); ctx.arc(p.x, p.y, frameD / 2 + Math.max(3, 6 * s), 0, TAU); ctx.lineWidth = Math.max(1.5, 4 * s); ctx.strokeStyle = '#63d1ff'; ctx.stroke() }
    }
  }

  Renderer.prototype._emit = function () { var n = 0; for (var k in this.alloc) if (this.alloc[k]) n++; this.onPoints(n) }
  Renderer.prototype._hit = function (sx, sy) {
    var w = this._s2w(sx, sy), best = null, bd = Infinity
    for (var i = 0; i < this.data.list.length; i++) {
      var nd = this.data.list[i]; if (nd.classStart) continue
      var sz = SZ[nd.type] || SZ.normal, dx = nd.x - w.x, dy = nd.y - w.y, dist = dx * dx + dy * dy, rr = (sz.f / 2) * (sz.f / 2)
      if (dist < rr && dist < bd) { bd = dist; best = nd }
    }
    return best
  }
  Renderer.prototype._bind = function () {
    var self = this, drag = false, moved = false, lx = 0, ly = 0, c = this.canvas
    c.addEventListener('mousedown', function (e) { drag = true; moved = false; lx = e.clientX; ly = e.clientY })
    this._wm = function (e) { if (!drag) return; var dx = e.clientX - lx, dy = e.clientY - ly; if (Math.abs(dx) + Math.abs(dy) > 3) moved = true; self.camX -= dx / self.scale; self.camY -= dy / self.scale; lx = e.clientX; ly = e.clientY; self.draw() }
    this._wu = function () { drag = false }
    window.addEventListener('mousemove', this._wm); window.addEventListener('mouseup', this._wu)
    c.addEventListener('click', function (e) { if (moved) return; var r = c.getBoundingClientRect(), nd = self._hit(e.clientX - r.left, e.clientY - r.top); if (nd) { if (self.alloc[nd.id]) delete self.alloc[nd.id]; else self.alloc[nd.id] = true; self.draw(); self._emit() } })
    c.addEventListener('wheel', function (e) { e.preventDefault(); var r = c.getBoundingClientRect(), b = self._s2w(e.clientX - r.left, e.clientY - r.top); self.scale = Math.max(0.02, Math.min(1.6, self.scale * (e.deltaY < 0 ? 1.15 : 1 / 1.15))); var a = self._s2w(e.clientX - r.left, e.clientY - r.top); self.camX += b.x - a.x; self.camY += b.y - a.y; self.draw() }, { passive: false })
    var tip = null
    c.addEventListener('mousemove', function (e) {
      if (drag) return; var r = c.getBoundingClientRect(), nd = self._hit(e.clientX - r.left, e.clientY - r.top)
      if (nd && nd.name) { if (!tip) { tip = document.createElement('div'); tip.className = 'ectree-tip'; document.body.appendChild(tip) }
        tip.innerHTML = '<b>' + nd.name.replace(/</g, '&lt;') + '</b>' + (nd.stats.length ? '<br>' + nd.stats.join('<br>').replace(/</g, '&lt;') : '')
        tip.style.left = (e.clientX + 14) + 'px'; tip.style.top = (e.clientY + 14) + 'px'; tip.style.display = 'block'
      } else if (tip) tip.style.display = 'none'
    })
    c.addEventListener('mouseleave', function () { if (tip) tip.style.display = 'none' })
    this._tip = function () { if (tip && tip.parentNode) tip.parentNode.removeChild(tip) }
  }
  Renderer.prototype.setAssets = function (a) { this.iconMap = a.iconMap; this.bgMap = a.bgMap; this.imgs = a.imgs; this.draw() }
  Renderer.prototype.setBackground = function () { this.draw() }
  Renderer.prototype.setSearch = function (q) { this.search = (q || '').toLowerCase(); this.draw() }
  Renderer.prototype.setAscendancy = function (a) { this.ascFilter = a || null; var bg = a && this.data.ascBg[a]; if (bg) { this.camX = bg.x; this.camY = bg.y; this.scale = 0.5 } this.draw() }
  Renderer.prototype.reset = function () { this.alloc = {}; this.draw(); this._emit() }
  Renderer.prototype.dispose = function () { if (this._ro) this._ro.disconnect(); if (this._tip) this._tip(); if (this._wm) window.removeEventListener('mousemove', this._wm); if (this._wu) window.removeEventListener('mouseup', this._wu); if (this.canvas && this.canvas.parentNode) this.canvas.parentNode.removeChild(this.canvas) }

  window.ecTree = {
    mount: function (host, url, optsJson, onPoints) {
      var opts = {}; try { opts = optsJson ? JSON.parse(optsJson) : {} } catch (e) {}
      opts.onPoints = function (n) { if (onPoints) onPoints(n) }
      var handle = { r: null }
      loadTree(url, function (tree) {
        if (!host || !host.isConnected) return
        if (!tree) { host.innerHTML = '<div class="ectree-err">Could not load tree data.</div>'; return }
        handle.r = new Renderer(host, build(tree), opts)
        loadAssets(url.replace(/[^/]*$/, 'sprites/'), function (a) { if (handle.r) handle.r.setAssets(a) })
      })
      return {
        setSearch: function (q) { if (handle.r) handle.r.setSearch(q) },
        setAscendancy: function (a) { if (handle.r) handle.r.setAscendancy(a) },
        reset: function () { if (handle.r) handle.r.reset() },
        dispose: function () { if (handle.r) handle.r.dispose() },
      }
    },
  }
})()

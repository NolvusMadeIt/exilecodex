// Build the PoE2 passive-tree BACKGROUND images for the Build Planner tree renderer.
// The main / group / ascendancy backgrounds in PathOfBuilding-PoE2 src/TreeData/0_5 are BC7 (BPTC)
// DDS textures, zstd-compressed. This downloads them, zstd-decompresses (Node built-in), decodes
// BC7 (full 8-mode decoder, below), and writes PNGs + bg-map.json into app/media/tree/0_5/sprites.
// Vendored locally — downloaded + converted, no external linking.
//   Run: node scripts/build-tree-backgrounds.cjs [main|all]
const fs = require('fs')
const path = require('path')
const zlib = require('zlib')
const https = require('https')

const ROOT = path.join(__dirname, '..')
const OUT = path.join(ROOT, 'app', 'media', 'tree', '0_5', 'sprites')
const BASE = 'https://raw.githubusercontent.com/PathOfBuildingCommunity/PathOfBuilding-PoE2/dev/src/TreeData/0_5'
const tree = require(path.join(ROOT, 'app', 'media', 'tree', '0_5', 'tree.json'))
const ONLY = process.argv[2] || 'all'

function fetch(url) {
  return new Promise(function (res, rej) {
    https.get(url, function (r) {
      if (r.statusCode >= 300 && r.statusCode < 400 && r.headers.location) { r.resume(); return fetch(r.headers.location).then(res, rej) }
      if (r.statusCode !== 200) { r.resume(); return rej(new Error(r.statusCode + ' ' + url)) }
      var c = []; r.on('data', function (x) { c.push(x) }); r.on('end', function () { res(Buffer.concat(c)) })
    }).on('error', rej)
  })
}

// ---- DDS ----
function parseDDS(buf) {
  if (buf.readUInt32LE(0) !== 0x20534444) throw new Error('not DDS')
  var height = buf.readUInt32LE(12), width = buf.readUInt32LE(16), mips = buf.readUInt32LE(28) || 1
  var fourCC = buf.toString('ascii', 84, 88), dataOff = 128, arraySize = 1, dxgi = 0
  if (fourCC === 'DX10') { dxgi = buf.readUInt32LE(128); arraySize = buf.readUInt32LE(140) || 1; dataOff = 148 }
  return { width: width, height: height, mips: mips, arraySize: arraySize, dxgi: dxgi, data: buf.slice(dataOff) }
}
// BC7 = 16 bytes / 4x4 block
function blocks(d) { return Math.max(1, Math.ceil(d / 4)) }
function bc7MipBytes(w, h, m) { return blocks(Math.max(1, w >> m)) * blocks(Math.max(1, h >> m)) * 16 }
function bc7SliceStride(w, h, mips) { var s = 0; for (var m = 0; m < mips; m++) s += bc7MipBytes(w, h, m); return s }

// ---- BC7 decoder ----
var MODES = [
  // NS,PB,RB,ISB,CB,AB,EPB,SPB,IB,IB2
  [3, 4, 0, 0, 4, 0, 1, 0, 3, 0],
  [2, 6, 0, 0, 6, 0, 0, 1, 3, 0],
  [3, 6, 0, 0, 5, 0, 0, 0, 2, 0],
  [2, 6, 0, 0, 7, 0, 1, 0, 2, 0],
  [1, 0, 2, 1, 5, 6, 0, 0, 2, 3],
  [1, 0, 2, 0, 7, 8, 0, 0, 2, 2],
  [1, 0, 0, 0, 7, 7, 1, 0, 4, 0],
  [2, 6, 0, 0, 5, 5, 1, 0, 2, 0],
]
var W2 = [0, 21, 43, 64], W3 = [0, 9, 18, 27, 37, 46, 55, 64]
var W4 = [0, 4, 8, 12, 17, 21, 25, 29, 34, 38, 42, 46, 51, 55, 59, 64]
var PART2 = [
  [0,0,1,1,0,0,1,1,0,0,1,1,0,0,1,1],[0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1],[0,1,1,1,0,1,1,1,0,1,1,1,0,1,1,1],[0,0,0,1,0,0,1,1,0,0,1,1,0,1,1,1],
  [0,0,0,0,0,0,0,1,0,0,0,1,0,0,1,1],[0,0,1,1,0,1,1,1,0,1,1,1,1,1,1,1],[0,0,0,1,0,0,1,1,0,1,1,1,1,1,1,1],[0,0,0,0,0,0,0,1,0,0,1,1,0,1,1,1],
  [0,0,0,0,0,0,0,0,0,0,0,1,0,0,1,1],[0,0,1,1,0,1,1,1,1,1,1,1,1,1,1,1],[0,0,0,0,0,0,0,1,0,1,1,1,1,1,1,1],[0,0,0,0,0,0,0,0,0,0,0,1,0,1,1,1],
  [0,0,0,1,0,1,1,1,1,1,1,1,1,1,1,1],[0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1],[0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1],[0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1],
  [0,0,0,0,1,0,0,0,1,1,1,0,1,1,1,1],[0,1,1,1,0,0,0,1,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,1,0,0,0,1,1,1,0],[0,1,1,1,0,0,1,1,0,0,0,1,0,0,0,0],
  [0,0,1,1,0,0,0,1,0,0,0,0,0,0,0,0],[0,0,0,0,1,0,0,0,1,1,0,0,1,1,1,0],[0,0,0,0,0,0,0,0,1,0,0,0,1,1,0,0],[0,1,1,1,0,0,1,1,0,0,1,1,0,0,0,1],
  [0,0,1,1,0,0,0,1,0,0,0,1,0,0,0,0],[0,0,0,0,1,0,0,0,1,0,0,0,1,1,0,0],[0,1,1,0,0,1,1,0,0,1,1,0,0,1,1,0],[0,0,1,1,0,1,1,0,0,1,1,0,1,1,0,0],
  [0,0,0,1,0,1,1,1,1,1,1,0,1,0,0,0],[0,0,0,0,1,1,1,1,1,1,1,1,0,0,0,0],[0,1,1,1,0,0,0,1,1,0,0,0,1,1,1,0],[0,0,1,1,1,0,0,1,1,0,0,1,1,1,0,0],
  [0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1],[0,0,0,0,1,1,1,1,0,0,0,0,1,1,1,1],[0,1,0,1,1,0,1,0,0,1,0,1,1,0,1,0],[0,0,1,1,0,0,1,1,1,1,0,0,1,1,0,0],
  [0,0,1,1,1,1,0,0,0,0,1,1,1,1,0,0],[0,1,0,1,0,1,0,1,1,0,1,0,1,0,1,0],[0,1,1,0,1,0,0,1,0,1,1,0,1,0,0,1],[0,1,0,1,1,0,1,0,1,0,1,0,0,1,0,1],
  [0,1,1,1,0,0,1,1,1,1,0,0,1,1,1,0],[0,0,0,1,0,0,1,1,1,1,0,0,1,0,0,0],[0,0,1,1,0,0,1,0,0,1,0,0,1,1,0,0],[0,0,1,1,1,0,1,1,1,1,0,1,1,1,0,0],
  [0,1,1,0,1,0,0,1,1,0,0,1,0,1,1,0],[0,0,1,1,1,1,0,0,1,1,0,0,0,0,1,1],[0,1,1,0,0,1,1,0,1,0,0,1,1,0,0,1],[0,0,0,0,0,1,1,0,0,1,1,0,0,0,0,0],
  [0,1,0,0,1,1,1,0,0,1,0,0,0,0,0,0],[0,0,1,0,0,1,1,1,0,0,1,0,0,0,0,0],[0,0,0,0,0,0,1,0,0,1,1,1,0,0,1,0],[0,0,0,0,0,1,0,0,1,1,1,0,0,1,0,0],
  [0,1,1,0,1,1,0,0,1,0,0,1,0,0,1,1],[0,0,1,1,0,1,1,0,1,1,0,0,1,0,0,1],[0,1,1,0,0,0,1,1,1,0,0,1,1,1,0,0],[0,0,1,1,1,0,0,1,1,1,0,0,0,1,1,0],
  [0,1,1,0,1,1,0,0,1,1,0,0,1,0,0,1],[0,1,1,0,0,0,1,1,0,0,1,1,1,0,0,1],[0,1,1,1,1,1,1,0,1,0,0,0,0,0,0,1],[0,0,0,1,1,0,0,0,1,1,1,0,0,1,1,1],
  [0,0,0,0,1,1,1,1,0,0,1,1,0,0,1,1],[0,0,1,1,0,0,1,1,1,1,1,1,0,0,0,0],[0,0,1,0,0,0,1,0,1,1,1,0,1,1,1,0],[0,1,0,0,0,1,0,0,0,1,1,1,0,1,1,1],
]
var PART3 = [
  [0,0,1,1,0,0,1,1,0,2,2,1,2,2,2,2],[0,0,0,1,0,0,1,1,2,2,1,1,2,2,2,1],[0,0,0,0,2,0,0,1,2,2,1,1,2,2,1,1],[0,2,2,2,0,0,2,2,0,0,1,1,0,1,1,1],
  [0,0,0,0,0,0,0,0,1,1,2,2,1,1,2,2],[0,0,1,1,0,0,1,1,0,0,2,2,0,0,2,2],[0,0,2,2,0,0,2,2,1,1,1,1,1,1,1,1],[0,0,1,1,0,0,1,1,2,2,1,1,2,2,1,1],
  [0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2],[0,0,0,0,1,1,1,1,1,1,1,1,2,2,2,2],[0,0,0,0,1,1,1,1,2,2,2,2,2,2,2,2],[0,0,1,2,0,0,1,2,0,0,1,2,0,0,1,2],
  [0,1,1,2,0,1,1,2,0,1,1,2,0,1,1,2],[0,1,2,2,0,1,2,2,0,1,2,2,0,1,2,2],[0,0,1,1,0,1,1,2,1,1,2,2,1,2,2,2],[0,0,1,1,2,0,0,1,2,2,0,0,2,2,2,0],
  [0,0,0,1,0,0,1,1,0,1,1,2,1,1,2,2],[0,1,1,1,0,0,1,1,2,0,0,1,2,2,0,0],[0,0,0,0,1,1,2,2,1,1,2,2,1,1,2,2],[0,0,2,2,0,0,2,2,0,0,2,2,1,1,1,1],
  [0,1,1,1,0,1,1,1,0,2,2,2,0,2,2,2],[0,0,0,1,0,0,0,1,2,2,2,1,2,2,2,1],[0,0,0,0,0,0,1,1,0,1,2,2,0,1,2,2],[0,0,0,0,1,1,0,0,2,2,1,0,2,2,1,0],
  [0,1,2,2,0,1,2,2,0,0,1,1,0,0,0,0],[0,0,1,2,0,0,1,2,1,1,2,2,2,2,2,2],[0,1,1,0,1,2,2,1,1,2,2,1,0,1,1,0],[0,0,0,0,0,1,1,0,1,2,2,1,1,2,2,1],
  [0,0,2,2,1,1,0,2,1,1,0,2,0,0,2,2],[0,1,1,0,0,1,1,0,2,0,0,2,2,2,2,2],[0,0,1,1,0,1,2,2,0,1,2,2,0,0,1,1],[0,0,0,0,2,0,0,0,2,2,1,1,2,2,2,1],
  [0,0,0,0,0,0,0,2,1,1,2,2,1,2,2,2],[0,2,2,2,0,0,2,2,0,0,1,2,0,0,1,1],[0,0,1,1,0,0,1,2,0,0,2,2,0,2,2,2],[0,1,2,0,0,1,2,0,0,1,2,0,0,1,2,0],
  [0,0,0,0,1,1,1,1,2,2,2,2,0,0,0,0],[0,1,2,0,1,2,0,1,2,0,1,2,0,1,2,0],[0,1,2,0,2,0,1,2,1,2,0,1,0,1,2,0],[0,0,1,1,2,2,0,0,1,1,2,2,0,0,1,1],
  [0,0,1,1,1,1,2,2,2,2,0,0,0,0,1,1],[0,1,0,1,0,1,0,1,2,2,2,2,2,2,2,2],[0,0,0,0,0,0,0,0,2,1,2,1,2,1,2,1],[0,0,2,2,1,1,2,2,0,0,2,2,1,1,2,2],
  [0,0,2,2,0,0,1,1,0,0,2,2,0,0,1,1],[0,2,2,0,1,2,2,1,0,2,2,0,1,2,2,1],[0,1,0,1,2,2,2,2,2,2,2,2,0,1,0,1],[0,0,0,0,2,1,2,1,2,1,2,1,2,1,2,1],
  [0,1,0,1,0,1,0,1,0,1,0,1,2,2,2,2],[0,2,2,2,0,1,1,1,0,2,2,2,0,1,1,1],[0,0,0,2,1,1,1,2,0,0,0,2,1,1,1,2],[0,0,0,0,2,1,1,2,2,1,1,2,2,1,1,2],
  [0,2,2,2,0,1,1,1,0,1,1,1,0,2,2,2],[0,0,0,2,1,1,1,2,1,1,1,2,0,0,0,2],[0,1,1,0,0,1,1,0,0,1,1,0,2,2,2,2],[0,0,0,0,0,0,0,0,2,1,1,2,2,1,1,2],
  [0,1,1,0,0,1,1,0,2,2,2,2,2,2,2,2],[0,0,2,2,0,0,1,1,0,0,1,1,0,0,2,2],[0,0,2,2,1,1,2,2,1,1,2,2,0,0,2,2],[0,0,0,0,0,0,0,0,0,0,0,0,2,1,1,2],
  [0,0,0,2,0,0,0,1,0,0,0,2,0,0,0,1],[0,2,2,2,1,2,2,2,0,2,2,2,1,2,2,2],[0,1,0,1,2,2,2,2,2,2,2,2,2,2,2,2],[0,1,1,1,2,0,1,1,2,2,0,1,2,2,2,0],
]
var ANCHOR2 = [
  15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,
  15,2,8,2,2,8,8,15,2,8,2,2,8,8,2,2,
  15,15,6,8,2,8,15,15,2,8,2,2,2,15,15,6,
  6,2,6,8,15,15,2,2,15,15,15,15,15,2,2,15,
]
var ANCHOR3a = [
  3,3,15,15,8,3,15,15,8,8,6,6,6,5,3,3,
  3,3,8,15,3,3,6,10,5,8,8,6,8,5,15,15,
  8,15,3,5,6,10,8,15,15,3,15,5,15,15,15,15,
  3,15,5,5,5,8,5,10,5,10,8,13,15,12,3,3,
]
var ANCHOR3b = [
  15,8,8,3,15,15,3,8,15,15,15,15,15,15,15,8,
  15,8,15,3,15,8,15,8,3,15,6,10,15,15,10,8,
  15,3,15,10,10,8,9,10,6,15,8,15,3,6,6,8,
  15,3,15,15,15,15,15,15,15,15,15,15,3,15,15,8,
]
var PART1 = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]

function unq(v, bits) { if (bits >= 8) return v & 0xff; var r = (v << (8 - bits)); var sh = 2 * bits - 8; if (sh >= 0) r |= (v >> sh); return r & 0xff }
function interp(a, b, w) { return ((a * (64 - w) + b * w + 32) >> 6) & 0xff }

function decodeBC7Block(bytes, off, out) {
  var pos = off * 8 // bit position (LSB-first) within the 16-byte block starting at byte `off`
  function rd(n) { var v = 0; for (var i = 0; i < n; i++) { var bit = (bytes[pos >> 3] >> (pos & 7)) & 1; v |= bit << i; pos++ } return v }
  var mode = -1; for (var mm = 0; mm < 8; mm++) { if (rd(1) === 1) { mode = mm; break } }
  if (mode < 0) { for (var z = 0; z < 64; z++) out[z] = 0; return }
  var P = MODES[mode], NS = P[0], PB = P[1], RB = P[2], ISB = P[3], CB = P[4], AB = P[5], EPB = P[6], SPB = P[7], IB = P[8], IB2 = P[9]
  var partition = PB ? rd(PB) : 0
  var rotation = RB ? rd(RB) : 0
  var idxSel = ISB ? rd(ISB) : 0
  var nEP = NS * 2, ep = []
  for (var e = 0; e < nEP; e++) ep.push([0, 0, 0, AB > 0 ? 0 : 255])
  for (var e = 0; e < nEP; e++) ep[e][0] = rd(CB)
  for (var e = 0; e < nEP; e++) ep[e][1] = rd(CB)
  for (var e = 0; e < nEP; e++) ep[e][2] = rd(CB)
  if (AB > 0) for (var e = 0; e < nEP; e++) ep[e][3] = rd(AB)
  var cBits = CB, aBits = AB
  if (EPB) { var pb = []; for (var e = 0; e < nEP; e++) pb.push(rd(1)); for (var e = 0; e < nEP; e++) { ep[e][0] = (ep[e][0] << 1) | pb[e]; ep[e][1] = (ep[e][1] << 1) | pb[e]; ep[e][2] = (ep[e][2] << 1) | pb[e]; if (AB > 0) ep[e][3] = (ep[e][3] << 1) | pb[e] } cBits++; if (AB > 0) aBits++ }
  else if (SPB) { var sp = []; for (var s = 0; s < NS; s++) sp.push(rd(1)); for (var e = 0; e < nEP; e++) { var s = e >> 1; ep[e][0] = (ep[e][0] << 1) | sp[s]; ep[e][1] = (ep[e][1] << 1) | sp[s]; ep[e][2] = (ep[e][2] << 1) | sp[s]; if (AB > 0) ep[e][3] = (ep[e][3] << 1) | sp[s] } cBits++; if (AB > 0) aBits++ }
  for (var e = 0; e < nEP; e++) { ep[e][0] = unq(ep[e][0], cBits); ep[e][1] = unq(ep[e][1], cBits); ep[e][2] = unq(ep[e][2], cBits); ep[e][3] = AB > 0 ? unq(ep[e][3], aBits) : 255 }
  var part = NS === 1 ? PART1 : NS === 2 ? PART2[partition] : PART3[partition]
  var anchors = [0]; if (NS === 2) anchors.push(ANCHOR2[partition]); if (NS === 3) { anchors.push(ANCHOR3a[partition]); anchors.push(ANCHOR3b[partition]) }
  var idx = new Array(16), idx2 = new Array(16)
  for (var t = 0; t < 16; t++) { var s = part[t]; var an = (t === anchors[s]); idx[t] = rd(an ? IB - 1 : IB) }
  if (IB2 > 0) for (var t = 0; t < 16; t++) { var an = (t === 0); idx2[t] = rd(an ? IB2 - 1 : IB2) }
  var Wp = IB === 2 ? W2 : IB === 3 ? W3 : W4
  var Ws = IB2 === 2 ? W2 : IB2 === 3 ? W3 : W4
  for (var t = 0; t < 16; t++) {
    var s = part[t], e0 = ep[s * 2], e1 = ep[s * 2 + 1], ci, ai
    if (IB2 > 0) { var pw = Wp[idx[t]], sw = Ws[idx2[t]]; if (idxSel === 0) { ci = pw; ai = sw } else { ci = sw; ai = pw } }
    else { ci = Wp[idx[t]]; ai = ci }
    var r = interp(e0[0], e1[0], ci), g = interp(e0[1], e1[1], ci), b = interp(e0[2], e1[2], ci), a = AB > 0 ? interp(e0[3], e1[3], ai) : 255
    if (rotation === 1) { var tp = a; a = r; r = tp } else if (rotation === 2) { var tp = a; a = g; g = tp } else if (rotation === 3) { var tp = a; a = b; b = tp }
    var o = t * 4; out[o] = r; out[o + 1] = g; out[o + 2] = b; out[o + 3] = a
  }
}

// box-filter downsample RGBA (for the big 1500² ascendancy art -> 512)
function downsample(rgba, w, h, tw, th) {
  var out = Buffer.alloc(tw * th * 4), sx = w / tw, sy = h / th
  for (var y = 0; y < th; y++) for (var x = 0; x < tw; x++) {
    var x0 = Math.floor(x * sx), x1 = Math.min(w, Math.floor((x + 1) * sx)) || x0 + 1
    var y0 = Math.floor(y * sy), y1 = Math.min(h, Math.floor((y + 1) * sy)) || y0 + 1
    var r = 0, g = 0, b = 0, a = 0, n = 0
    for (var yy = y0; yy < y1; yy++) for (var xx = x0; xx < x1; xx++) { var o = (yy * w + xx) * 4; r += rgba[o]; g += rgba[o + 1]; b += rgba[o + 2]; a += rgba[o + 3]; n++ }
    var o2 = (y * tw + x) * 4; out[o2] = r / n | 0; out[o2 + 1] = g / n | 0; out[o2 + 2] = b / n | 0; out[o2 + 3] = a / n | 0
  }
  return out
}
function decodeBC7(data, width, height) {
  var out = Buffer.alloc(width * height * 4), bw = Math.ceil(width / 4), bh = Math.ceil(height / 4)
  var tex = new Array(64)
  for (var by = 0; by < bh; by++) for (var bx = 0; bx < bw; bx++) {
    decodeBC7Block(data, (by * bw + bx) * 16, tex)
    for (var py = 0; py < 4; py++) for (var px = 0; px < 4; px++) {
      var x = bx * 4 + px, y = by * 4 + py; if (x >= width || y >= height) continue
      var o = (y * width + x) * 4, ti = (py * 4 + px) * 4
      out[o] = tex[ti]; out[o + 1] = tex[ti + 1]; out[o + 2] = tex[ti + 2]; out[o + 3] = tex[ti + 3]
    }
  }
  return out
}

// ---- PNG (RGBA) ----
var CRCT = (function () { var t = []; for (var n = 0; n < 256; n++) { var c = n; for (var k = 0; k < 8; k++) c = (c & 1) ? (0xedb88320 ^ (c >>> 1)) : (c >>> 1); t[n] = c >>> 0 } return t })()
function crc32(b) { var c = 0xffffffff; for (var i = 0; i < b.length; i++) c = CRCT[(c ^ b[i]) & 0xff] ^ (c >>> 8); return (c ^ 0xffffffff) >>> 0 }
function encodePNG(rgba, w, h) {
  var stride = w * 4 + 1, raw = Buffer.alloc(stride * h)
  for (var y = 0; y < h; y++) { raw[y * stride] = 0; rgba.copy(raw, y * stride + 1, y * w * 4, (y + 1) * w * 4) }
  var idat = zlib.deflateSync(raw, { level: 9 }), out = [Buffer.from([137, 80, 78, 71, 13, 10, 26, 10])]
  function ch(type, data) { var l = Buffer.alloc(4); l.writeUInt32BE(data.length, 0); var t = Buffer.from(type), cr = Buffer.alloc(4); cr.writeUInt32BE(crc32(Buffer.concat([t, data])), 0); out.push(l, t, data, cr) }
  var ihdr = Buffer.alloc(13); ihdr.writeUInt32BE(w, 0); ihdr.writeUInt32BE(h, 4); ihdr[8] = 8; ihdr[9] = 6
  ch('IHDR', ihdr); ch('IDAT', idat); ch('IEND', Buffer.alloc(0)); return Buffer.concat(out)
}

// ---- main ----
;(async function () {
  fs.mkdirSync(OUT, { recursive: true })
  var sheets = Object.keys(tree.ddsCoords).filter(function (k) { return /_BC7\.dds\.zst$/.test(k) && !/4000|legion|mastery/.test(k) })
  if (ONLY === 'main') sheets = sheets.filter(function (k) { return /^background_/.test(k) })
  var bgMap = {}
  for (var si = 0; si < sheets.length; si++) {
    var sheet = sheets[si]
    var dds = parseDDS(zlib.zstdDecompressSync(await fetch(BASE + '/' + sheet)))
    var W = dds.width, H = dds.height, count = dds.arraySize
    var stride = bc7SliceStride(W, H, dds.mips), mip0 = bc7MipBytes(W, H, 0)
    var pngName = sheet.replace('.dds.zst', '.png')
    if (count === 1) {
      var rgba = decodeBC7(dds.data.slice(0, mip0), W, H)
      fs.writeFileSync(path.join(OUT, pngName), encodePNG(rgba, W, H))
      var k0 = Object.keys(tree.ddsCoords[sheet])[0]
      if (k0) bgMap[k0] = { sheet: pngName, x: 0, y: 0, w: W, h: H }
      console.log(sheet, '->', pngName, W + 'x' + H, '(single)')
    } else {
      var CW = W > 640 ? 512 : W, CH = H > 640 ? 512 : H   // downscale big ascendancy art to 512
      var cols = Math.ceil(Math.sqrt(count)), rows = Math.ceil(count / cols), gW = cols * CW, gH = rows * CH
      var grid = Buffer.alloc(gW * gH * 4)
      for (var i = 0; i < count; i++) {
        var r = decodeBC7(dds.data.slice(i * stride, i * stride + mip0), W, H)
        if (CW !== W || CH !== H) r = downsample(r, W, H, CW, CH)
        var gx = (i % cols) * CW, gy = Math.floor(i / cols) * CH
        for (var y = 0; y < CH; y++) r.copy(grid, ((gy + y) * gW + gx) * 4, y * CW * 4, (y + 1) * CW * 4)
      }
      fs.writeFileSync(path.join(OUT, pngName), encodePNG(grid, gW, gH))
      var coords = tree.ddsCoords[sheet]
      for (var key in coords) { var idx = coords[key], col = idx % cols, row = Math.floor(idx / cols); bgMap[key] = { sheet: pngName, x: col * CW, y: row * CH, w: CW, h: CH } }
      console.log(sheet, '->', pngName, gW + 'x' + gH, '| slices', count, CW !== W ? '(downscaled ' + W + '->' + CW + ')' : '')
    }
  }
  fs.writeFileSync(path.join(OUT, 'bg-map.json'), JSON.stringify(bgMap))
  console.log('DONE: bg-map.json with', Object.keys(bgMap).length, 'entries')
})().catch(function (e) { console.error('FAILED:', e); process.exit(1) })

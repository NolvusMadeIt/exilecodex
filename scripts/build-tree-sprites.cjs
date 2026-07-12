// Build the PoE2 passive-tree node sprites for the Build Planner tree renderer.
// Source: PathOfBuilding-PoE2 src/TreeData/0_5 — the node icon sheets are BC1 (DXT1) DDS textures,
// zstd-compressed (skills_128_128_BC1.dds.zst etc.). Browsers can't render DDS, so this downloads
// each sheet, zstd-decompresses (Node built-in), decodes BC1 -> RGBA, encodes a PNG, and writes a
// sprite-map.json (icon path -> {sheet,x,y,w,h}) derived from tree.json's ddsCoords grid indices.
// Output is vendored under app/media/tree/0_5/sprites — downloaded + converted, no external linking.
//
// Run: node scripts/build-tree-sprites.cjs
const fs = require('fs')
const path = require('path')
const zlib = require('zlib')
const https = require('https')

const ROOT = path.join(__dirname, '..')
const OUT = path.join(ROOT, 'app', 'media', 'tree', '0_5', 'sprites')
const BASE = 'https://raw.githubusercontent.com/PathOfBuildingCommunity/PathOfBuilding-PoE2/dev/src/TreeData/0_5'
const tree = require(path.join(ROOT, 'app', 'media', 'tree', '0_5', 'tree.json'))

function fetch(url) {
  return new Promise(function (resolve, reject) {
    https.get(url, function (r) {
      if (r.statusCode >= 300 && r.statusCode < 400 && r.headers.location) { r.resume(); return fetch(r.headers.location).then(resolve, reject) }
      if (r.statusCode !== 200) { r.resume(); return reject(new Error(r.statusCode + ' ' + url)) }
      var chunks = []
      r.on('data', function (c) { chunks.push(c) })
      r.on('end', function () { resolve(Buffer.concat(chunks)) })
    }).on('error', reject)
  })
}

// ---- DDS ----
function parseDDS(buf) {
  if (buf.readUInt32LE(0) !== 0x20534444) throw new Error('not a DDS file')
  var height = buf.readUInt32LE(12), width = buf.readUInt32LE(16)
  var mipMapCount = buf.readUInt32LE(28) || 1
  var fourCC = buf.toString('ascii', 84, 88)
  var dataOff = 128, dxgi = 0, arraySize = 1
  if (fourCC === 'DX10') { dxgi = buf.readUInt32LE(128); arraySize = buf.readUInt32LE(140) || 1; dataOff = 148 } // BC1_UNORM = 71/72
  return { width: width, height: height, mipMapCount: mipMapCount, arraySize: arraySize, fourCC: fourCC, dxgi: dxgi, data: buf.slice(dataOff) }
}
// BC1 bytes for a mip level of a CxC image
function bc1MipBytes(C, m) { var d = Math.max(1, C >> m); var b = Math.max(1, Math.ceil(d / 4)); return b * b * 8 }
// bytes per array slice = full mip chain
function bc1SliceStride(C, mips) { var s = 0; for (var m = 0; m < mips; m++) s += bc1MipBytes(C, m); return s }
function rgb565(c) { return [Math.round(((c >> 11) & 0x1f) * 255 / 31), Math.round(((c >> 5) & 0x3f) * 255 / 63), Math.round((c & 0x1f) * 255 / 31)] }
function decodeBC1(data, width, height) {
  var out = Buffer.alloc(width * height * 4)
  var bw = Math.ceil(width / 4), bh = Math.ceil(height / 4), p = 0
  for (var by = 0; by < bh; by++) for (var bx = 0; bx < bw; bx++) {
    var c0 = data.readUInt16LE(p), c1 = data.readUInt16LE(p + 2), bits = data.readUInt32LE(p + 4); p += 8
    var col0 = rgb565(c0), col1 = rgb565(c1), cols = [col0, col1, [0, 0, 0], [0, 0, 0]], al = [255, 255, 255, 255]
    if (c0 > c1) { for (var i = 0; i < 3; i++) { cols[2][i] = Math.round((2 * col0[i] + col1[i]) / 3); cols[3][i] = Math.round((col0[i] + 2 * col1[i]) / 3) } }
    else { for (var j = 0; j < 3; j++) { cols[2][j] = Math.round((col0[j] + col1[j]) / 2); cols[3][j] = 0 } al[3] = 0 }
    for (var py = 0; py < 4; py++) for (var px = 0; px < 4; px++) {
      var idx = (bits >>> (2 * (py * 4 + px))) & 3
      var x = bx * 4 + px, y = by * 4 + py; if (x >= width || y >= height) continue
      var o = (y * width + x) * 4
      out[o] = cols[idx][0]; out[o + 1] = cols[idx][1]; out[o + 2] = cols[idx][2]; out[o + 3] = al[idx]
    }
  }
  return out
}

// ---- PNG ----
var CRCT = (function () { var t = []; for (var n = 0; n < 256; n++) { var c = n; for (var k = 0; k < 8; k++) c = (c & 1) ? (0xedb88320 ^ (c >>> 1)) : (c >>> 1); t[n] = c >>> 0 } return t })()
function crc32(buf) { var c = 0xffffffff; for (var i = 0; i < buf.length; i++) c = CRCT[(c ^ buf[i]) & 0xff] ^ (c >>> 8); return (c ^ 0xffffffff) >>> 0 }
function encodePNG(rgba, width, height) {
  var stride = width * 4 + 1
  var raw = Buffer.alloc(stride * height)
  for (var y = 0; y < height; y++) { raw[y * stride] = 0; rgba.copy(raw, y * stride + 1, y * width * 4, (y + 1) * width * 4) }
  var idat = zlib.deflateSync(raw, { level: 9 })
  var out = [Buffer.from([137, 80, 78, 71, 13, 10, 26, 10])]
  function chunk(type, data) {
    var len = Buffer.alloc(4); len.writeUInt32BE(data.length, 0)
    var t = Buffer.from(type), crc = Buffer.alloc(4); crc.writeUInt32BE(crc32(Buffer.concat([t, data])), 0)
    out.push(len, t, data, crc)
  }
  var ihdr = Buffer.alloc(13); ihdr.writeUInt32BE(width, 0); ihdr.writeUInt32BE(height, 4); ihdr[8] = 8; ihdr[9] = 6 // 8-bit RGBA
  chunk('IHDR', ihdr); chunk('IDAT', idat); chunk('IEND', Buffer.alloc(0))
  return Buffer.concat(out)
}

// ---- main ----
;(async function () {
  fs.mkdirSync(OUT, { recursive: true })
  // BC1 skill-icon sheets (normal, not the disabled variants)
  var sheets = Object.keys(tree.ddsCoords).filter(function (k) { return /^skills_\d/.test(k) })
  var map = {}
  for (var s = 0; s < sheets.length; s++) {
    var sheet = sheets[s]
    var zst = await fetch(BASE + '/' + sheet)
    var dds = zlib.zstdDecompressSync(zst)
    var info = parseDDS(dds)
    var C = info.width                          // each array slice is CxC (one icon)
    var count = info.arraySize
    var stride = bc1SliceStride(C, info.mipMapCount)
    var mip0 = bc1MipBytes(C, 0)
    // pack the array slices into a square-ish grid PNG
    var cols = Math.ceil(Math.sqrt(count)), rows = Math.ceil(count / cols)
    var gridW = cols * C, gridH = rows * C
    var grid = Buffer.alloc(gridW * gridH * 4)
    for (var i = 0; i < count; i++) {
      var sliceData = info.data.slice(i * stride, i * stride + mip0)  // mip0 of slice i
      var rgba = decodeBC1(sliceData, C, C)
      var gx = (i % cols) * C, gy = Math.floor(i / cols) * C
      for (var y = 0; y < C; y++) rgba.copy(grid, ((gy + y) * gridW + gx) * 4, y * C * 4, (y + 1) * C * 4)
    }
    var png = encodePNG(grid, gridW, gridH)
    var pngName = sheet.replace('.dds.zst', '.png')
    fs.writeFileSync(path.join(OUT, pngName), png)
    var coords = tree.ddsCoords[sheet]
    for (var icon in coords) {
      var idx = coords[icon], col = idx % cols, row = Math.floor(idx / cols)
      if (!(icon in map) || C > map[icon].w) map[icon] = { sheet: pngName, x: col * C, y: row * C, w: C, h: C }
    }
    console.log(sheet, '->', pngName, gridW + 'x' + gridH, '| slices', count, '| grid', cols + 'x' + rows)
  }
  fs.writeFileSync(path.join(OUT, 'sprite-map.json'), JSON.stringify(map))
  console.log('DONE: sprite-map.json with', Object.keys(map).length, 'icons ->', OUT)
})().catch(function (e) { console.error('FAILED:', e); process.exit(1) })

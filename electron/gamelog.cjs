// Game-log watcher — tails Path of Exile 2's Client.txt to auto-detect the zone the player is in.
//
// This is exactly how PoE overlays (Awakened PoE Trade, Exiled Exchange 2, …) do live zone tracking:
// the game appends lines to logs/Client.txt every time you load a new area, e.g.
//   ... [DEBUG Client 23456] Generating level 16 area "G2_1" with seed 3515667606
//   ... [INFO Client 23456] [SCENE] Set Source [The Red Vale]
// We locate that file (Steam + standalone installs, including extra Steam library drives), poll it
// for growth, parse the new lines, and broadcast a {type:'zone'} event to the renderer so the
// Campaign Guide can advance the act/hub and tick off route steps as you play.
//
// Desktop-only and read-only: we never write to the game's files. The renderer feature-detects this
// via window.nolvusGameLog.

const fs = require('node:fs')
const path = require('node:path')
// `electron` is required lazily (inside the IPC handlers) so the pure parsing logic below can be
// unit-tested under plain Node/vitest without an Electron runtime.

// Zone detection (PoE2). Unlike PoE1, PoE2 does NOT write "You have entered X." An area load is an
// authoritative `Generating level N area "<id>"` line, immediately followed by the human-readable
// `[SCENE] Set Source [<name>]` (after a "(null)" loading screen). We pair the two so that opening
// the in-game map — which also emits Set Source, e.g. [Atlas] or [Act 1], with no preceding
// Generating — never counts as a zone change. The zone name keeps its real punctuation (e.g.
// "Ogham Manor: First Floor"). Verified against Exiled-Exchange-2's real PoE2 Client.txt fixtures.
const GEN_RE = /Generating level (\d+) area "([^"]+)"/
const SETSRC_RE = /Set Source \[(.+)\]/
// Character — PoE2 logs a level-up with name + base class together (only fires on level-up):
//   "<Name> (<Class>) is now level <N>"
const LEVEL_RE = /\] : (.+?) \((.+?)\) is now level (\d+)\b/
//   "<Name> has been slain." — confirms the active character's name.
const SLAIN_RE = /\] : (.+?) has been slain\.\s*$/

// A Set Source name that means "no real zone": the loading screen and the main menu / logout.
const NON_ZONE = new Set(['(null)', '(unknown)'])

// --- Locating Client.txt -----------------------------------------------------------------------

// Pull extra Steam library roots out of libraryfolders.vdf (many players install on D:/E:). The VDF
// is a simple quoted-key format; a regex for the "path" entries is enough and avoids a dependency.
function steamLibraries(steamBase) {
  const out = []
  try {
    const vdf = fs.readFileSync(path.join(steamBase, 'steamapps', 'libraryfolders.vdf'), 'utf8')
    const re = /"path"\s*"([^"]+)"/g
    let m
    while ((m = re.exec(vdf))) out.push(m[1].replace(/\\\\/g, '\\'))
  } catch { /* no Steam / no libraries file — fine */ }
  return out
}

function candidatePaths() {
  const pf = process.env['ProgramFiles'] || 'C:\\Program Files'
  const pfx = process.env['ProgramFiles(x86)'] || 'C:\\Program Files (x86)'
  const out = []

  // Steam installs: default Steam dir(s) + every library folder, under steamapps/common.
  const steamBases = [path.join(pfx, 'Steam'), path.join(pf, 'Steam')]
  const libs = new Set()
  for (const base of steamBases) { libs.add(base); for (const l of steamLibraries(base)) libs.add(l) }
  for (const lib of libs) {
    out.push(path.join(lib, 'steamapps', 'common', 'Path of Exile 2', 'logs', 'Client.txt'))
  }

  // Standalone GGG client.
  for (const base of [pfx, pf]) {
    out.push(path.join(base, 'Grinding Gear Games', 'Path of Exile 2', 'logs', 'Client.txt'))
  }
  return out
}

function findClientTxt() {
  for (const p of candidatePaths()) {
    try { if (fs.statSync(p).isFile()) return p } catch { /* not here */ }
  }
  return null
}

// --- The watcher -------------------------------------------------------------------------------

let state = {
  watching: false,
  path: null,
  source: null,      // 'override' | 'auto'
  pos: 0,            // byte offset we've parsed up to
  carry: '',         // a partial last line carried between reads
  pending: null,     // { areaLevel, areaId } from a Generating line awaiting its Set Source name
  lastZone: null,
  broadcast: null,   // (payload) => void
}

// Pure parser: run a batch of log lines through the recognisers and return the events in order.
// `ctx.pending` carries the area level from a `Generating level…` line across to its following
// `Set Source` name (and across read boundaries when ctx is the long-lived watcher state), so an
// area load becomes one {type:'zone'} event and a bare map-open Set Source produces nothing.
// Exported for tests — given the real PoE2 fixture lines it must yield the right events.
function processLines(lines, ctx) {
  const events = []
  for (const line of lines) {
    let m
    if ((m = LEVEL_RE.exec(line))) { events.push({ type: 'level', name: m[1].trim(), klass: m[2].trim(), level: Number(m[3]) }); continue }
    if ((m = SLAIN_RE.exec(line))) { events.push({ type: 'death', name: m[1].trim() }); continue }
    if ((m = GEN_RE.exec(line))) { ctx.pending = { areaLevel: Number(m[1]), areaId: m[2] }; continue }
    if ((m = SETSRC_RE.exec(line))) {
      const name = m[1].trim()
      if (NON_ZONE.has(name)) continue
      if (ctx.pending) {
        events.push({ type: 'zone', zone: name, areaLevel: ctx.pending.areaLevel, areaId: ctx.pending.areaId })
        ctx.pending = null
      }
    }
  }
  return events
}

function emit(payload) {
  if (payload.type === 'zone') state.lastZone = payload.zone
  if (typeof state.broadcast === 'function') {
    try { state.broadcast({ ...payload, at: Date.now() }) } catch { /* a dead window must not crash us */ }
  }
}

// Read the bytes appended since `state.pos`, split into lines, parse + emit each.
function readNew() {
  if (!state.path) return
  let size
  try { size = fs.statSync(state.path).size } catch { return }
  if (size < state.pos) { state.pos = 0; state.carry = '' } // file rotated / truncated
  if (size === state.pos) return
  let fd
  try {
    fd = fs.openSync(state.path, 'r')
    const len = size - state.pos
    const buf = Buffer.alloc(len)
    fs.readSync(fd, buf, 0, len, state.pos)
    state.pos = size
    const text = state.carry + buf.toString('utf8')
    const lines = text.split(/\r?\n/)
    state.carry = lines.pop() ?? '' // last element is an unterminated partial line
    for (const ev of processLines(lines, state)) emit(ev)
  } catch { /* transient read error — try again next tick */ }
  finally { if (fd !== undefined) try { fs.closeSync(fd) } catch {} }
}

// Seed the current zone on start by scanning the tail of the file for the most recent area load,
// so the guide reflects where you already are without waiting for the next zone change. Runs the
// same Generating→Set Source pairing forward over the tail and keeps the last zone it produces.
function seedLastZone() {
  try {
    const size = fs.statSync(state.path).size
    const span = Math.min(size, 256 * 1024)
    const fd = fs.openSync(state.path, 'r')
    const buf = Buffer.alloc(span)
    fs.readSync(fd, buf, 0, span, size - span)
    fs.closeSync(fd)
    const lines = buf.toString('utf8').split(/\r?\n/)
    const zones = processLines(lines, { pending: null }).filter((e) => e.type === 'zone')
    if (zones.length) state.lastZone = zones[zones.length - 1].zone
  } catch { /* seeding is a nicety */ }
}

let pollTimer = null

function stop() {
  if (pollTimer) { clearInterval(pollTimer); pollTimer = null }
  state.watching = false
}

function start(opts = {}) {
  stop()
  const override = opts.path && fs.existsSync(opts.path) ? opts.path : null
  const auto = override ? null : findClientTxt()
  const target = override || auto
  if (!target) {
    return { ok: false, error: 'not-found', tried: candidatePaths() }
  }
  state.path = target
  state.source = override ? 'override' : 'auto'
  state.carry = ''
  state.pending = null
  seedLastZone()
  try { state.pos = fs.statSync(target).size } catch { state.pos = 0 } // only watch NEW lines
  state.watching = true
  // Poll for growth (1s). Polling is more reliable across drives/AV than fs.watch for a log tail,
  // and once-a-second is plenty for zone changes.
  pollTimer = setInterval(readNew, 1000)
  return { ok: true, path: target, source: state.source, lastZone: state.lastZone }
}

function status() {
  return { watching: state.watching, path: state.path, source: state.source, lastZone: state.lastZone }
}

// IPC surface. `getWindows()` returns the live BrowserWindow list so events reach the main window
// (and the overlay, when it's the same window in docked mode).
function registerGameLog(ipcMain, getWindows) {
  const { BrowserWindow, dialog } = require('electron')
  state.broadcast = (payload) => {
    const wins = (typeof getWindows === 'function' ? getWindows() : BrowserWindow.getAllWindows()) || []
    for (const w of wins) { if (w && !w.isDestroyed()) w.webContents.send('gamelog:event', payload) }
  }
  ipcMain.handle('gamelog:start', (_e, opts) => start(opts || {}))
  ipcMain.handle('gamelog:stop', () => { stop(); return { ok: true } })
  ipcMain.handle('gamelog:status', () => status())
  ipcMain.handle('gamelog:pickPath', async (e) => {
    const win = BrowserWindow.fromWebContents(e.sender)
    const res = await dialog.showOpenDialog(win, {
      title: 'Locate Path of Exile 2 Client.txt',
      properties: ['openFile'],
      filters: [{ name: 'Client log', extensions: ['txt'] }],
    })
    if (res.canceled || !res.filePaths?.[0]) return { canceled: true }
    return start({ path: res.filePaths[0] })
  })
}

module.exports = { registerGameLog, start, stop, status, findClientTxt, processLines }

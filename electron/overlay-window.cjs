// Plugin overlay window — a separate, frameless, always-on-top BrowserWindow that renders ONE
// plugin's view (e.g. the Campaign Guide) as a compact widget you keep over the game. It loads the
// same app at a special hash route (#/overlay/<pluginId>); the renderer's OverlayShell strips the
// app chrome and shows just that plugin in compact mode. Bounds are remembered; an optional global
// hotkey toggles it. This is distinct from the "dock the main window to a screen edge" overlay.

const path = require('node:path')
const fs = require('node:fs')
const { BrowserWindow, globalShortcut, shell, app, screen } = require('electron')

let overlayWin = null
const hotkeys = new Map() // accelerator -> pluginId (so each plugin can have its own toggle key)

// Resting bounds for the overlay: the left edge, vertically centred ("slide in from the left
// middle"). If the user has moved/resized it before, respect their saved position.
function targetBounds() {
  const display = (() => { try { return screen.getDisplayNearestPoint(screen.getCursorScreenPoint()) } catch { return screen.getPrimaryDisplay() } })()
  const { workArea } = display
  const saved = loadBounds() || {}
  const width = Math.max(280, saved.width || 380)
  const height = Math.max(240, saved.height || 620)
  const x = Number.isFinite(saved.x) ? saved.x : workArea.x + 12
  const y = Number.isFinite(saved.y) ? saved.y : workArea.y + Math.round((workArea.height - height) / 2)
  return { x, y, width, height, workArea }
}

// Slide + fade a window from a start x to a target x (easeOutCubic, matching the main overlay's
// motion). Position carries the "slide in"; opacity makes it a soft entrance.
function slideIn(win, fromX, toX, y, width, height, dur = 240) {
  if (!win || win.isDestroyed()) return
  const start = Date.now()
  try { win.setOpacity(0) } catch {}
  const tick = setInterval(() => {
    if (!win || win.isDestroyed()) { clearInterval(tick); return }
    const t = Math.min(1, (Date.now() - start) / dur)
    const e = 1 - Math.pow(1 - t, 3)
    try {
      win.setBounds({ x: Math.round(fromX + (toX - fromX) * e), y, width, height })
      win.setOpacity(e)
    } catch {}
    if (t >= 1) { clearInterval(tick); try { win.setOpacity(1) } catch {} }
  }, 12)
}

const stateFile = () => path.join(app.getPath('userData'), 'overlay-window-state.json')
function loadBounds() { try { return JSON.parse(fs.readFileSync(stateFile(), 'utf8')) } catch { return null } }
let saveTimer = null
function saveBounds() {
  try { if (overlayWin && !overlayWin.isDestroyed()) fs.writeFileSync(stateFile(), JSON.stringify(overlayWin.getBounds())) } catch {}
}
const queueSave = () => { if (saveTimer) clearTimeout(saveTimer); saveTimer = setTimeout(saveBounds, 400) }

function isOpen() { return !!(overlayWin && !overlayWin.isDestroyed()) }

function openOverlay(urlFor, pluginId) {
  const url = urlFor(pluginId)
  if (isOpen()) {
    overlayWin.loadURL(url)
    if (overlayWin.isMinimized()) overlayWin.restore()
    overlayWin.show(); overlayWin.focus()
    return { ok: true, reused: true }
  }
  const t = targetBounds()
  overlayWin = new BrowserWindow({
    width: t.width,
    height: t.height,
    x: t.x,
    y: t.y,
    minWidth: 280,
    minHeight: 240,
    frame: false,
    resizable: true,
    skipTaskbar: true,
    maximizable: false,
    fullscreenable: false,
    transparent: true,            // see-through to the game; the renderer paints a slider-controlled scrim
    backgroundColor: '#00000000',
    opacity: 0,                   // start invisible; slideIn fades it in as it slides
    title: 'Nolvus overlay',
    icon: path.join(__dirname, 'icon.png'),
    webPreferences: { contextIsolation: true, nodeIntegration: false, preload: path.join(__dirname, 'preload.cjs') },
  })
  overlayWin.setAlwaysOnTop(true, 'screen-saver')
  try { overlayWin.setVisibleOnAllWorkspaces(true, { visibleOnFullScreen: true }) } catch {}
  overlayWin.loadURL(url)
  // External links open in the system browser, never inside the overlay.
  overlayWin.webContents.setWindowOpenHandler(({ url: u }) => { if (/^https?:/.test(u)) shell.openExternal(u); return { action: 'deny' } })
  overlayWin.on('resize', queueSave)
  overlayWin.on('move', queueSave)
  overlayWin.on('close', saveBounds)
  overlayWin.on('closed', () => { overlayWin = null })
  // Slide in from off the left edge to the resting position (or a short nudge if docked elsewhere).
  const fromLeftEdge = t.x <= t.workArea.x + 120
  const startX = fromLeftEdge ? (t.workArea.x - t.width) : Math.max(t.workArea.x, t.x - 60)
  overlayWin.setBounds({ x: Math.round(startX), y: t.y, width: t.width, height: t.height })
  overlayWin.show()
  overlayWin.focus()
  slideIn(overlayWin, startX, t.x, t.y, t.width, t.height, 240)
  return { ok: true }
}

function closeOverlay() {
  if (isOpen()) { saveBounds(); overlayWin.close() }
  overlayWin = null
  return { ok: true }
}

function toggleOverlay(urlFor, pluginId) {
  if (isOpen() && overlayWin.isVisible() && !overlayWin.isMinimized()) { closeOverlay(); return { ok: true, open: false } }
  openOverlay(urlFor, pluginId)
  return { ok: true, open: true }
}

// Bind (or rebind) a global hotkey for this plugin's overlay. One accelerator per plugin; a falsy
// accel clears it. mode 'toggle' (default) shows/hides; mode 'show' always opens + reloads (so e.g.
// Price Check re-reads the clipboard and re-checks the item on every press instead of hiding).
function setOverlayHotkey(urlFor, pluginId, accel, mode = 'toggle') {
  try {
    for (const [a, p] of [...hotkeys]) if (p === pluginId) { globalShortcut.unregister(a); hotkeys.delete(a) }
    if (!accel) return { ok: true }
    if (hotkeys.has(accel)) { globalShortcut.unregister(accel); hotkeys.delete(accel) }
    const handler = mode === 'show' ? () => openOverlay(urlFor, pluginId) : () => toggleOverlay(urlFor, pluginId)
    const ok = globalShortcut.register(accel, handler)
    if (ok) hotkeys.set(accel, pluginId)
    return { ok }
  } catch { return { ok: false } }
}

// `urlFor(pluginId)` (from main.cjs) returns the overlay URL for the active app base (live / dev /
// bundled). Registered once; the renderer drives open/close/toggle and (re)binds hotkeys.
function registerOverlayWindow(ipcMain, urlFor) {
  ipcMain.handle('pluginOverlay:open', (_e, pluginId) => openOverlay(urlFor, pluginId))
  ipcMain.handle('pluginOverlay:close', () => closeOverlay())
  ipcMain.handle('pluginOverlay:toggle', (_e, pluginId) => toggleOverlay(urlFor, pluginId))
  ipcMain.handle('pluginOverlay:isOpen', () => ({ open: isOpen() }))
  ipcMain.handle('pluginOverlay:setHotkey', (_e, { pluginId, accel, mode } = {}) => setOverlayHotkey(urlFor, pluginId, accel, mode))
}

module.exports = { registerOverlayWindow, closeOverlay }

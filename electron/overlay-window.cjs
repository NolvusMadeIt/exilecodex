// Plugin overlay window — a separate, frameless, always-on-top BrowserWindow that renders ONE
// plugin's view (e.g. the Campaign Guide) as a compact widget you keep over the game. It loads the
// same app at a special hash route (#/overlay/<pluginId>); the renderer's OverlayShell strips the
// app chrome and shows just that plugin in compact mode. Bounds are remembered; an optional global
// hotkey toggles it. This is distinct from the "dock the main window to a screen edge" overlay.

const path = require('node:path')
const fs = require('node:fs')
const { BrowserWindow, globalShortcut, shell, app } = require('electron')

let overlayWin = null
const hotkeys = new Map() // accelerator -> pluginId (so each plugin can have its own toggle key)

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
  const b = loadBounds() || {}
  overlayWin = new BrowserWindow({
    width: b.width || 400,
    height: b.height || 600,
    x: Number.isFinite(b.x) ? b.x : undefined,
    y: Number.isFinite(b.y) ? b.y : undefined,
    minWidth: 280,
    minHeight: 240,
    frame: false,
    resizable: true,
    skipTaskbar: true,
    maximizable: false,
    fullscreenable: false,
    transparent: true,            // see-through to the game; the renderer paints a slider-controlled scrim
    backgroundColor: '#00000000',
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

// Bind (or rebind) a global hotkey that toggles this plugin's overlay. One accelerator per plugin;
// passing a falsy accel clears the plugin's hotkey.
function setOverlayHotkey(urlFor, pluginId, accel) {
  try {
    for (const [a, p] of [...hotkeys]) if (p === pluginId) { globalShortcut.unregister(a); hotkeys.delete(a) }
    if (!accel) return { ok: true }
    if (hotkeys.has(accel)) { globalShortcut.unregister(accel); hotkeys.delete(accel) }
    const ok = globalShortcut.register(accel, () => toggleOverlay(urlFor, pluginId))
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
  ipcMain.handle('pluginOverlay:setHotkey', (_e, { pluginId, accel } = {}) => setOverlayHotkey(urlFor, pluginId, accel))
}

module.exports = { registerOverlayWindow, closeOverlay }

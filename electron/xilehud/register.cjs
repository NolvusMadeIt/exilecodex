// Our integration for the XileHUD-derived desktop features (the vendored monitor itself lives
// in clipboard-monitor.cjs — see its banner). Smart clipboard: every detected PoE2 item copy is
// broadcast to all windows on 'xile:item-copied'; renderers opt in through the nolvusXile
// preload bridge (the Modifiers page auto-analyzes the item exactly like a manual paste).
const { ClipboardMonitor } = require('./clipboard-monitor.cjs')
const { registerHistoryStore } = require('./history-store.cjs')

let monitor = null

function registerXileClipboard(ipcMain, getWindows) {
  registerHistoryStore(ipcMain)
  monitor = new ClipboardMonitor() // upstream behavior: starts polling immediately
  monitor.on('poe2-item-copied', (text) => {
    for (const w of getWindows()) {
      if (w && !w.isDestroyed()) w.webContents.send('xile:item-copied', text)
    }
  })
  ipcMain.on('xile:clipboard:start', () => { try { monitor?.startMonitoring() } catch {} })
  ipcMain.on('xile:clipboard:stop', () => { try { monitor?.stopMonitoring() } catch {} })
  ipcMain.on('xile:clipboard:reset', () => { try { monitor?.resetLastSeen() } catch {} })
}

module.exports = { registerXileClipboard }

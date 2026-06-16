// Minimal, secure preload. contextIsolation is on and nodeIntegration is off, so the
// renderer (our web app) gets no Node access. We expose a small read-only flag so the web
// app can detect the desktop shell, plus the window controls the custom title bar needs.
const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('nolvusDesktop', {
  isDesktop: true,
  platform: process.platform,
  // Window controls for the custom (frameless) title bar.
  minimize: () => ipcRenderer.send('win:minimize'),
  toggleMaximize: () => ipcRenderer.send('win:maximize'),
  close: () => ipcRenderer.send('win:close'),
  isMaximized: () => ipcRenderer.invoke('win:isMaximized'),
  // Subscribe to maximize/restore changes. Returns an unsubscribe fn.
  onMaximizeChange: (cb) => {
    const handler = (_e, value) => cb(!!value)
    ipcRenderer.on('win:maximized', handler)
    return () => ipcRenderer.removeListener('win:maximized', handler)
  },
  // --- Game overlay ---
  overlayApply: (opts) => ipcRenderer.send('overlay:apply', opts),
  overlayToggle: () => ipcRenderer.send('overlay:toggle'),
  overlaySetHotkey: (accel) => ipcRenderer.invoke('overlay:setHotkey', accel),
  overlayGetDisplays: () => ipcRenderer.invoke('overlay:getDisplays'),
})

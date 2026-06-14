// Minimal, secure preload. contextIsolation is on and nodeIntegration is off, so the
// renderer (our web app) gets no Node access. We expose only a tiny read-only flag the web
// app can use to detect it's running inside the desktop shell, if it ever needs to.
const { contextBridge } = require('electron')

contextBridge.exposeInMainWorld('nolvusDesktop', {
  isDesktop: true,
  platform: process.platform,
})

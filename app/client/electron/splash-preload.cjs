// Minimal, sandboxed bridge for the boot splash window. It only needs to
// receive streamed init lines from the main process — nothing else.
const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('ecSplash', {
  // Each message is { line: string, level: 'info'|'dim'|'accent'|'ok'|'warn'|'done' }.
  onBoot: (cb) => ipcRenderer.on('ec:boot', (_e, msg) => cb(msg)),
})

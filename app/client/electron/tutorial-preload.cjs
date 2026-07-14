const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('ecTutorial', {
  onState: (cb) => ipcRenderer.on('ec:tutorial-state', (_event, state) => cb(state)),
  action: (action) => ipcRenderer.send('ec:tutorial-action', String(action || '')),
})

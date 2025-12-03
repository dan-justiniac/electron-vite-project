import { ipcRenderer, contextBridge } from 'electron'

// Bind Electron IPC helpers for the renderer without leaking unsafe any spreads.
const ipcRendererApi = {
  on: ipcRenderer.on.bind(ipcRenderer),
  off: ipcRenderer.off.bind(ipcRenderer),
  send: ipcRenderer.send.bind(ipcRenderer),
  invoke: ipcRenderer.invoke.bind(ipcRenderer),
} satisfies Pick<typeof ipcRenderer, 'on' | 'off' | 'send' | 'invoke'>

// --------- Expose some API to the Renderer process ---------
contextBridge.exposeInMainWorld('ipcRenderer', ipcRendererApi)

// You can expose other APIs you need here.
// ...

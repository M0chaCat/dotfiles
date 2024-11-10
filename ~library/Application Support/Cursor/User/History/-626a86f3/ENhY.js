const { contextBridge, ipcRenderer } = require('electron');
import * as commands from './Commands.js';

contextBridge.exposeInMainWorld('api', {
    ipcRenderer: {
        send: ipcRenderer.send,
        invoke: ipcRenderer.invoke,
        on: ipcRenderer.on
    },
    ...commands
});
const { contextBridge, ipcRenderer } = require('electron');
const commands = require('./Commands.js');

contextBridge.exposeInMainWorld('api', {
    ipcRenderer: {
        send: ipcRenderer.send,
        invoke: ipcRenderer.invoke,
        on: ipcRenderer.on
    },
});
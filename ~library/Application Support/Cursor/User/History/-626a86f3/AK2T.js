const path = require('path');
const { contextBridge, ipcRenderer } = require('electron');
const commandsPath = path.join(__dirname, 'Commands.js');
const commands = require(commandsPath);

// Expose globalFunctions and ipcRenderer as part of the api
contextBridge.exposeInMainWorld('api', {
    ipcRenderer: {
        send: ipcRenderer.send,
        invoke: ipcRenderer.invoke,
        on: ipcRenderer.on
    },
    globalFunctions: {
        BEMA_Element: commands.BEMA_Element,
        onEvent: commands.onEvent,
        setText: commands.setText,
        getText: commands.getText,
        deleteElement: commands.deleteElement,
        generateRandomString: commands.generateRandomString,
        timedLoop: commands.timedLoop,
        setProperty: commands.setProperty,
        showElement: commands.showElement,
        hideElement: commands.hideElement
    }
});
const { contextBridge, ipcRenderer } = require('electron');
const commands = require('./Commands.js');

// Expose functions globally
contextBridge.exposeInMainWorld('globalFunctions', {
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
});
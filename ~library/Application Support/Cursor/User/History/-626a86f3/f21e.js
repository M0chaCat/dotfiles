const { contextBridge, ipcRenderer } = require('electron');
const path = require('path');
const fs = require('fs');

// Load Commands.js
const commandsPath = path.join(__dirname, 'Commands.js');
const commandsCode = fs.readFileSync(commandsPath, 'utf-8');
eval(commandsCode); // Load the functions into the current context

// Expose functions globally
contextBridge.exposeInMainWorld('globalFunctions', {
    BEMA_Element,
    onEvent,
    setText,
    getText,
    deleteElement,
    generateRandomString,
    timedLoop,
    setProperty,
    showElement,
    hideElement
});

// Attach functions to the window object for global access
window.BEMA_Element = BEMA_Element;
window.onEvent = onEvent;
window.setText = setText;
window.getText = getText;
window.deleteElement = deleteElement;
window.generateRandomString = generateRandomString;
window.timedLoop = timedLoop;
window.setProperty = setProperty;
window.showElement = showElement;
window.hideElement = hideElement;
const { contextBridge, ipcRenderer } = require('electron');
const commands = require('./commands.js'); // Ensure the path is correct

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
        hideElement: commands.hideElement,
        setupEventListeners: (id) => {
            const element = document.getElementById(id);
            if (element) {
                element.classList.add('listening'); // Add class to enable pointer events
                ['click', 'mouseover', 'mouseout'].forEach(eventType => {
                    element.addEventListener(eventType, (event) => {
                        ipcRenderer.send('element-event', id, eventType, event.type);
                    });
                });
            }
        }
    }
});
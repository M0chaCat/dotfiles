const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
    createElement: (type, id, x, y, width, height, autohide, rounded, borderWidth, borderColor, bgColor, textColor, text, textAlign, fontSize, fontFamily, readOnly, icon, iconColor) => {
        ipcRenderer.invoke('create-element', type, id, x, y, width, height, autohide, rounded, borderWidth, borderColor, bgColor, textColor, text, textAlign, fontSize, fontFamily, readOnly, icon, iconColor);
    },
    onEvent: (id, event, callback) => {
        console.log(`Registering event listener for ${id}-${event}`);
        ipcRenderer.on(`${id}-${event}`, (e, ...args) => {
            console.log(`Event received: ${id}-${event}`);
            callback(...args);
        });
    },
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
    },
    ipcRenderer: {
        send: (channel, ...args) => {
            ipcRenderer.send(channel, ...args);
        },
        on: (channel, listener) => {
            ipcRenderer.on(channel, listener);
        },
        // Add other ipcRenderer methods as needed
    }
});
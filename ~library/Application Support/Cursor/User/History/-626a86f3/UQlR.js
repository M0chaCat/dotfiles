const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
    BEMA_Element: (type, id, x, y, width, height, draggable, zIndex, bgColor, textColor, text, textAlign, fontSize, fontFamily, visible, imageUrl) => {
        ipcRenderer.invoke('create-element', type, id, x, y, width, height, draggable, zIndex, bgColor, textColor, text, textAlign, fontSize, fontFamily, visible, imageUrl);
    },
    setupEventListeners: (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.classList.add('listening');
            ['click', 'mouseover', 'mouseout'].forEach(eventType => {
                element.addEventListener(eventType, (event) => {
                    ipcRenderer.send('element-event', id, eventType, event.type);
                });
            });
        }
    },
    onEvent: (id, event, callback) => {
        ipcRenderer.on(`${id}-${event}`, (e, ...args) => callback(...args));
    },
    // Expose ipcRenderer methods if needed
    ipcRenderer: {
        send: (channel, ...args) => ipcRenderer.send(channel, ...args),
        on: (channel, listener) => ipcRenderer.on(channel, listener),
        // Add other ipcRenderer methods as needed
    }
});
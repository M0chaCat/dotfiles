const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
    createElement: (type, id, x, y, width, height, autohide, rounded, borderWidth, borderColor, bgColor, textColor, text, textAlign, fontSize, fontFamily, readOnly, icon, iconColor) => {
        ipcRenderer.invoke('create-element', type, id, x, y, width, height, autohide, rounded, borderWidth, borderColor, bgColor, textColor, text, textAlign, fontSize, fontFamily, readOnly, icon, iconColor);
    },
    onEvent: (id, event, callback) => {
        ipcRenderer.on(`${id}-${event}`, (e, ...args) => callback(...args));
    },
    BEMA_Element: (elementType, id, x, y, width, height, draggable, zIndex, bgColor, textColor, text, textAlign, fontSize, fontFamily, visible, imageUrl, readOnly) => {
        // Function implementation
        const element = document.createElement(elementType);
        element.id = id;
        element.style.position = 'absolute';
        element.style.left = `${x}px`;
        element.style.top = `${y}px`;
        element.style.width = `${width}px`;
        element.style.height = `${height}px`;
        element.style.zIndex = zIndex;
        element.style.backgroundColor = bgColor;
        element.style.color = textColor;
        element.style.textAlign = textAlign;
        element.style.fontSize = `${fontSize}px`;
        element.style.fontFamily = fontFamily;
        element.style.display = visible ? 'block' : 'none';
        element.classList.add('bema-element');

        if (text) {
            element.innerText = text;
        }

        if (imageUrl) {
            const img = document.createElement('img');
            img.src = imageUrl;
            element.appendChild(img);
        }

        if (readOnly && (elementType === 'input' || elementType === 'textarea')) {
            element.readOnly = true;
        }

        document.getElementById('bema-container').appendChild(element);

        if (draggable) {
            element.draggable = true;
        }
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
    deleteElement: (id) => {
        console.log(`Request to delete element with ID: ${id}`); // Debugging log
        ipcRenderer.invoke('delete-element', id);
    },
    showElement: (id) => {
        ipcRenderer.invoke('show-element', id);
    },
    hideElement: (id) => {
        ipcRenderer.invoke('hide-element', id);
    },
    setProperty: (id, property, value) => {
        ipcRenderer.invoke('set-property', id, property, value);
    },
    setText: (id, text) => {
        ipcRenderer.invoke('set-text', id, text);
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
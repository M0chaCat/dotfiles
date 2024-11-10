const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
    createElement: (type, id, x, y, width, height, autohide, rounded, borderWidth, borderColor, bgColor, textColor, text, textAlign, fontSize, fontFamily, readOnly, icon, iconColor) => {
        ipcRenderer.invoke('create-element', type, id, x, y, width, height, autohide, rounded, borderWidth, borderColor, bgColor, textColor, text, textAlign, fontSize, fontFamily, readOnly, icon, iconColor);
    },
    onEvent: (id, event, callback) => {
        ipcRenderer.on(`${id}-${event}`, (e, ...args) => callback(...args));
    },
    BEMA_Element: (elementType, id, x, y, width, height, draggable, zIndex, bgColor, textColor, text, textAlign, fontSize, fontFamily, visible, imageUrl, readOnly) => {
        const container = document.getElementById('bema-container');
        const containerWidth = container.offsetWidth;
        const containerHeight = container.offsetHeight;

        console.log(`Container dimensions: ${containerWidth}x${containerHeight}`); // Debugging log
        console.log(`Element position: ${x}% ${y}%`); // Debugging log

        const element = document.createElement(elementType);
        element.id = id;
        element.style.position = 'absolute';
        element.style.left = `${(x / 100) * containerWidth}px`;
        element.style.top = `${(y / 100) * containerHeight}px`;
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
            element.style.backgroundImage = `url(${imageUrl})`;
            element.style.backgroundSize = 'cover';
        }

        if (readOnly && (elementType === 'input' || elementType === 'textarea')) {
            element.readOnly = true;
        }

        container.appendChild(element);

        if (draggable) {
            element.draggable = true;
        }

        console.log(`Element ${id} created at (${element.style.left}, ${element.style.top})`); // Debugging log
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
    }
});
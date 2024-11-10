const { contextBridge, ipcRenderer } = require('electron');
const commands = require('./Commands.js');
const openBundles = require('./openbundles.js');

contextBridge.exposeInMainWorld('api', {
    ipcRenderer: {
        send: ipcRenderer.send,
        invoke: ipcRenderer.invoke,
        on: ipcRenderer.on
    },
    commands: {
        BEMA: commands.BEMA,
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
                element.classList.add('listening');
                ['click', 'mouseover', 'mouseout'].forEach(eventType => {
                    element.addEventListener(eventType, (event) => {
                        ipcRenderer.send('element-event', id, eventType, event.type);
                    });
                });
            }
        },
        getTime: commands.getTime,
        getDate: commands.getDate,
        setPosition: (elementId, x, y) => {
            const element = document.getElementById(elementId);
            if (element) {
                element.style.left = `${x}px`;
                element.style.top = `${y}px`;
            } else {
                console.warn(`Element with id '${elementId}' not found. Position not set.`);
            }
        },
        getXPosition: (elementId) => {
            const element = document.getElementById(elementId);
            return element ? parseInt(element.style.left, 10) || 0 : 0;
        },
        getYPosition: (elementId) => {
            const element = document.getElementById(elementId);
            return element ? parseInt(element.style.top, 10) || 0 : 0;
        },
    },
    openBundles: {
        openBundles$RegisterAppBundle: openBundles.openBundles$RegisterAppBundle,
        openBundles$hideIcons: openBundles.openBundles$hideIcons,
        openBundles$showIcons: openBundles.openBundles$showIcons,
        openBundles$addApp: openBundles.openBundles$addApp,
        openBundles$getApps: openBundles.openBundles$getApps,
        openBundles$Config: openBundles.openBundles$Config,
        openBundles$getIDstarter: openBundles.openBundles$getIDstarter,
        openBundles$openApp: openBundles.openBundles$openApp,
        openBundles$InstallShortcut: openBundles.openBundles$InstallShortcut,
    },
});
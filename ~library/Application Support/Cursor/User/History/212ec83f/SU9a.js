const { app, BrowserWindow, ipcMain } = require('electron'); // Import ipcMain
const path = require('path');
const fs = require('fs');

function createWindow() {
    const preloadPath = '/dist/preload.bundle.js'; // Adjusted path
    console.log(`Looking for preload script at: ${preloadPath}`);
    if (!fs.existsSync(preloadPath)) {
        console.error(`Preload script not found at ${preloadPath}`);
    }

    const mainWindow = new BrowserWindow({
        width: 822.5,
        height: 625,
        resizable: false, // Add this line to lock the window size
        webPreferences: {
            preload: preloadPath,
            contextIsolation: true, // Enables context isolation
            nodeIntegration: false, // Disables Node.js integration
        }
    });

    mainWindow.loadFile('index.html').catch(err => {
        console.error('Failed to load index.html:', err);
    });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    app.quit();
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});

ipcMain.handle('create-element', (event, elementType, id, x, y, width, height, draggable, zIndex, bgColor, textColor, text, textAlign, fontSize, fontFamily, visible, imageUrl) => {
    const mainWindow = BrowserWindow.getFocusedWindow();
    mainWindow.webContents.send('create-element', elementType, id, x, y, width, height, draggable, zIndex, bgColor, textColor, text, textAlign, fontSize, fontFamily, visible, imageUrl);
});

// Example usage of ipcMain
ipcMain.on('some-event', (event, arg) => {
    console.log(arg); // prints the argument sent from renderer process
    event.reply('some-event-reply', 'pong');
});

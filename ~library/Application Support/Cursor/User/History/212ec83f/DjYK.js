const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(app.getAppPath(), 'dist', 'preload.bundle.js') // Dynamically construct the path
        }
    });

    // Dynamically construct the path to index.html
    mainWindow.loadFile(path.join(app.getAppPath(), 'index.html'));
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
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

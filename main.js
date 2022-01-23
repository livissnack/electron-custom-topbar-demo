const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')
const ipc = ipcMain

function createWindow () {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        minWidth: 940,
        minHeight: 560,
        frame: false,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            devTools: true,
            preload: path.join(__dirname, 'preload.js')
        }
    })

    win.loadFile('src/index.html')
    win.setBackgroundColor('#343B48')

    ipc.on('minimizeApp', () => {
        console.log('Clicked on Minimize Btn')
        win.minimize()
    })

    ipc.on('maximizeRestoreApp', () => {
        console.log('Clicked on maximizeRestore Btn')
        if (win.isMaximized()) {
            win.restore()
        } else {
            win.maximize()
        }
    })

    win.on('maximize', () => {
        win.webContents.send('isMaximized')
    })

    win.on('unmaximize', () => {
        win.webContents.send('isRestored')
    })

    ipc.on('closeApp', () => {
        console.log('Clicked on Close Btn')
        win.close()
    })
}


app.whenReady().then(() => {
    createWindow()

    app.on('activate', () => {
        if(BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }
    })
})


app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})
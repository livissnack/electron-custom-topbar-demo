const { ipcRenderer } = require('electron')
const maxResBtn = document.getElementById('maxResBtn')
const mySidebar = document.getElementById('mySidebar')
const ipc = ipcRenderer
var isLeftMenuActive = true

minimizeBtn.addEventListener('click', () => {
    ipc.send('minimizeApp')
})

function changeMaxResBtn(isMaximizedApp) {
    if(isMaximizedApp) {
        maxResBtn.title = 'Restore'
        maxResBtn.classList.remove('maximizeBtn')
        maxResBtn.classList.add('restoreBtn')
    } else {
        maxResBtn.title = 'Maximize'
        maxResBtn.classList.remove('restoreBtn')
        maxResBtn.classList.add('maximizeBtn')
    }
}

maxResBtn.addEventListener('click', () => {
    ipc.send('maximizeRestoreApp')
})

ipc.on('isMaximized', () => {
    changeMaxResBtn(true)
})

ipc.on('isRestored', () => {
    changeMaxResBtn(false)
})

closeBtn.addEventListener('click', () => {
    ipc.send('closeApp')
})


showHideMenus.addEventListener('click', () => {
    if(isLeftMenuActive) {
        mySidebar.style.width = '0px'
        isLeftMenuActive = false
    } else {
        mySidebar.style.width = '280px'
        isLeftMenuActive = true
    }
})
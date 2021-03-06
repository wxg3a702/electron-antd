const path = require('path')
const { app, BrowserWindow, ipcMain } = require('electron')
const { port } = require('../config/dev.config')

const { NODE_ENV } = process.env

let mainWindow, winURL

if (NODE_ENV === 'development') {
  winURL = `http://localhost:${port}`

  // react-developer-tools
  require('electron-debug')({ showDevTools: false })
  app.on('ready', () => {
    let installExtension = require('electron-devtools-installer')
    installExtension.default(installExtension.REACT_DEVELOPER_TOOLS).then(() => {

    }).catch(err => {
      console.log('Unable to install `react-developer-tools`: \n', err)
    })
  })
  
} else {
  winURL = `file://${path.join(__dirname, '../dist/index.html')}`
}


function createWindow() {
  mainWindow = new BrowserWindow({ 
    width: 800, 
    height: 600,
    // frame: false
  })

  mainWindow.loadURL(winURL)

  if (NODE_ENV === 'development') {
    mainWindow.webContents.openDevTools();
  }

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  mainWindow.on('closed', function () {
    mainWindow = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow()
  }
})

ipcMain.on('test', (event, person) => {

  console.log('creating', person);  
});

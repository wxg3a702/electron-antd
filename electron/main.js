const path = require('path');
const { app, BrowserWindow, ipcMain, Menu, MenuItem } = require('electron');
const { port } = require('../config/dev.config');

const menu = new Menu();
menu.append(new MenuItem({ label: '新建页面' }));
menu.append(new MenuItem({ label: '删除' }));

const { NODE_ENV } = process.env;

let mainWindow, winURL;

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
});

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow()
  }
});

app.on('browser-window-created', function (event, win) {
  win.webContents.on('context-menu', function (e, params) {
    menu.popup(win, params.x, params.y)
  })
});

ipcMain.on('show-context-menu', function (event) {
  const win = BrowserWindow.fromWebContents(event.sender)
  menu.popup(win)
});

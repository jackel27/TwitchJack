'use strict'

const electron = require('electron')
const path = require('path')
const app = electron.app
const BrowserWindow = electron.BrowserWindow
const globalShortcut = electron.globalShortcut
const Menu = electron.Menu
const Tray = electron.Tray

let tray = null
app.on('ready', () => {
  tray = new Tray('./App/icons/twitch.ico')
  tray.setToolTip('StreamJack')
})

let mainWindow
let config = {}

if (process.env.NODE_ENV === 'development') {
  config = require('../config')
  config.url = `http://localhost:${config.port}`
} else {
  config.devtron = false
  config.url = `file://${__dirname}/dist/index.html`
}

function createWindow () {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    transparent: true,
    center: true,
    frame: false,
    alwaysOnTop: true,
    webPreferences: {
      webSecurity: false
    },
    resizable: false,
    height: 516,
    width: 550
  })

  mainWindow.loadURL(config.url)

  if (process.env.NODE_ENV === 'development') {
    BrowserWindow.addDevToolsExtension(path.join(__dirname, '../node_modules/devtron'))

    let installExtension = require('electron-devtools-installer')

    installExtension.default(installExtension.VUEJS_DEVTOOLS)
      .then((name) => mainWindow.webContents.openDevTools())
      .catch((err) => console.log('An error occurred: ', err))
  }

  mainWindow.on('closed', () => {
    mainWindow = null
  })

  console.log('mainWindow opened')
}
app.on('ready', () => {

  // Register a 'CommandOrControl+X' shortcut listener.
  const chat = globalShortcut.register('CommandOrControl+Shift+C', () => {
    console.log('Key Pressed!')
      mainWindow.webContents.send('chat', 'togglechat')
  })

  // Restart Application....
  const home = globalShortcut.register('CommandOrControl+Shift+R', () => {
      app.relaunch()
      app.quit()
  })

  // close connection, return to home..
  const gohome = globalShortcut.register('CommandOrControl+Shift+D', () => {
      mainWindow.webContents.send('home', 'Restarting application')
  })
})

app.on('ready', createWindow)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

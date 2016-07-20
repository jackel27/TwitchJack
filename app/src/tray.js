const electron = require('electron')
const Tray = electron.remote.Tray
const Menu = electron.remote.Menu

let icon = 'C:\\Electron-Apps\\overstream\\app\\icons\\twitch.ico'

let tray = new Tray(icon)
const contextMenu = Menu.buildFromTemplate([
  {label: 'Item1', type: 'radio'},
  {label: 'Item2', type: 'radio'},
  {label: 'Item3', type: 'radio', checked: true},
  {label: 'Item4', type: 'radio'}
])
tray.setToolTip('JackTwitch')
tray.setContextMenu(contextMenu)

export default {
  tray: tray
}

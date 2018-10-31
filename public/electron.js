const {app, Menu, shell, BrowserWindow} = require('electron')
const defaultMenu = require('electron-default-menu')

var mainWindow

const path = require('path')
const isDev = require('electron-is-dev')

function createWindow () {

  mainWindow = new BrowserWindow({width: 800, height: 600})

  mainWindow.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`)

  isDev && mainWindow.webContents.openDevTools()

  mainWindow.on('closed',  _ => mainWindow = null)

}

app.on('ready', _ => {
  createWindow()
  Menu.setApplicationMenu(Menu.buildFromTemplate(defaultMenu(app, shell)))
})

app.on('window-all-closed', _ => process.platform !== 'darwin' && app.quit())

app.on('activate', _ => mainWindow === null && createWindow())
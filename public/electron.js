const {app, BrowserWindow} = require('electron')

var mainWindow

const path = require('path')
const isDev = require('electron-is-dev')

function createWindow () {

  mainWindow = new BrowserWindow({width: 800, height: 600})

  mainWindow.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`)

  isDev && mainWindow.webContents.openDevTools()

  mainWindow.on('closed',  _ => mainWindow = null)

}

app.on('ready', _ => createWindow())

app.on('window-all-closed', _ => process.platform !== 'darwin' && app.quit())

app.on('activate', _ => mainWindow === null && createWindow())
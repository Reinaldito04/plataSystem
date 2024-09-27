import { app, shell, BrowserWindow, ipcMain } from 'electron'
import path, { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'

// Cargar el icono según la plataforma
const iconPath =
  process.platform === 'win32'
    ? path.join(__dirname, '../../resources/icon.ico') // Windows
    : process.platform === 'darwin'
      ? path.join(__dirname, '../../resources/icon.icns') // macOS
      : path.join(__dirname, '../../resources/icon.png') // Linux

const sqlite3 = require('sqlite3').verbose()

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    icon: iconPath, // Usar el icono correcto según la plataforma
    autoHideMenuBar: true,
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

app.whenReady().then(() => {
  electronApp.setAppUserModelId('com.electron')
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  createWindow()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// Conexión a la base de datos SQLite
const db = new sqlite3.Database('backend.db')

db.serialize(() => {
  db.run(
    'CREATE TABLE IF NOT EXISTS BackendAddress (ID INTEGER PRIMARY KEY AUTOINCREMENT, address TEXT)'
  )
})

ipcMain.handle('save-address', (event, address) => {
  return new Promise((resolve, reject) => {
    db.run('UPDATE BackendAddress SET address = ? WHERE ID = 1', [address], function (err) {
      if (err) {
        reject(err)
      } else {
        resolve({ id: this.lastID }) // Resuelve con el ID del último registro modificado
      }
    })
  })
})

ipcMain.handle('get-address', (event) => {
  return new Promise((resolve, reject) => {
    db.get('SELECT address FROM BackendAddress ORDER BY id DESC LIMIT 1', (err, row) => {
      if (err) {
        reject(err)
      } else {
        resolve(row ? row.address : null)
      }
    })
  })
})

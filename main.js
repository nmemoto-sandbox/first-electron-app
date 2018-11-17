const { app, BrowserWindow, Menu } = require('electron')

const path = require('path')
require('electron-reload')(__dirname, {
  electron: path.join(__dirname, 'node_modules', '.bin', 'electron')
})

let win

function createWindow () {
  win = new BrowserWindow({ width: 800, height: 600 })
  win.loadFile('src/index.html')

  win.webContents.openDevTools()

  win.on('closed', () => {
    win = null
  })

  const template = [
    {
      label: 'electron',
      submenu: [
        { label: 'Preferences' },
        { type: 'separator' },
        { label: 'log', click() {
          console.log("log item clicked")
        }}
      ]
    }
  ]
  const menu = Menu.buildFromTemplate(template)
  Menu.setApplicationMenu(menu)
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (win === null) {
    createWindow()
  }
})
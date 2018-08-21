// Modules to control application life and create native browser window
const { app, BrowserWindow, Menu } = require('electron')
const fetch = require('node-fetch')
const { ipcMain } = require('electron')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let windows = {}

let cryptoData = {}

function initialize () {
  Menu.setApplicationMenu(null)
  watchCrypto()
  
  let window = createWindow({ title: 'Crypto Dashboard', width: 800, height: 600, resizable: false })
  window.loadFile('./src/index.html')
  window.webContents.on('did-finish-load', () => {
    window.webContents.send('crypto-data', cryptoData)
  })

  window.on('closed', () => {
    app.quit()
  })

  ipcMain.on('crypto-popout', (event, arg) => {
    let targetCoin
    for(const coinId in cryptoData.data){
      if(cryptoData.data[coinId].website_slug === arg){
        targetCoin = cryptoData.data[coinId]
        break
      }
    }
    let popout = createWindow({ title: `${targetCoin.name} Popout`, width: 500, height: 100, frame: false, transparent: true, resizable: false, alwaysOnTop: true })
    popout.loadFile('./src/popout.html')
    popout.webContents.on('did-finish-load', () => {
      popout.send('crypto-info', arg)
      popout.send('crypto-data', cryptoData)
    })
  })
}

function createWindow(params){
  const win = new BrowserWindow(params)
  let winId = win.id;
  /*
      Each window has a unique id. 
      We can use this unique id as the key to store the window reference in `windows` object
  */
  windows[winId] = win

  /*
      This is fired when the window `win` is closed. 
      We want to remove the reference to this window from `windows` object
  */
  win.on('closed', () => {
      delete windows[winId]
  })

  // return the newly created window so we can modify it right after calling this function
  return win;
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', initialize)

function watchCrypto(){
  fetch('https://api.coinmarketcap.com/v2/ticker')
    .then((data) => data.json())
    .then((data) => {
      cryptoData = data
      for(const winId in windows){
        windows[winId].webContents.send('crypto-data', data)
      }
      setTimeout(watchCrypto, 5000)
    })
    .catch((err) => {
      console.log(err)
      setTimeout(watchCrypto, 5000)
    })
}

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

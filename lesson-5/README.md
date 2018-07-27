# Lesson 5 - Youtube Wrapper App - Interprocess Communication and Windows Management
In previous lessons, we briefly went over some features of ipc, but have never really explained how ipc works. Now, we are going to uncover the power of ipc in depth through making a multi-windowed application.

## Part 1 - Interprocess Communication (IPC)
In every electron app, there is a main process which runs in the background. It is not required for an electron app to have a window, but each additional window you create is going to have its own render process.

It should be apparent that we would like communications to occur betweeen
* Main process and a render process
* Two render processes

Unfortunately, communication between two render processes is not supported in Electron. If you want to communicate between two windows A and B, you have to use IPC to send a message from window A to the main process, and write code for the main process to forward that message to window B.

The APIs of IPC is straight forward. There are 3 scenarios to communicate via IPC.

### 1. ipcRenderer
This is the only way a window can send messages to the main process.

import ipcRenderer from electron:
```
// In renderer process (web page).
const {ipcRenderer} = require('electron')
```
When this window receives a message in channel `asynchronous-reply` from the main process, we output the message to the console
```
ipcRenderer.on('asynchronous-reply', (event, arg) => {
  console.log(arg) // prints "pong"
})
```

Send a message to the main process in channel `asynchronous-message`
```
ipcRenderer.send('asynchronous-message', 'ping')
```
[Read more](https://electronjs.org/docs/api/ipc-renderer)

### 2. ipcMain
Use ipcMain to listen for a message form a render process and optionally send a reply

import ipcMain from electron:
```
// In main process.
const {ipcMain} = require('electron')
```
When the main process receives a message from a render process in channel `asynchronous-message`, we print the message to the console and send a response 'pong' through the channel `asynchronous-reply`
```
ipcMain.on('asynchronous-message', (event, arg) => {
  console.log(arg) // prints "ping"
  event.sender.send('asynchronous-reply', 'pong')
})
```
[Read more](https://electronjs.org/docs/api/ipc-main)

### 3. webContent.send
If you have a reference of a window in your main process, you can access the webContent of that window to initiate ipc to that window's render process

let `win` be a reference to a newly create window
```
// In main process
let win = new BrowserWindow({width: 800, height: 600})
win.loadFile('src/index.html')
```
`did-finish-load` is an even that is called when the window has finished loading the page. In this case, we want to send `whoooooooh!` to that window's render process through channel `ping`
```
win.webContents.on('did-finish-load', () => {
    win.webContents.send('ping', 'whoooooooh!')
})
```
[Read more](https://electronjs.org/docs/api/web-contents#webcontentssendchannel-arg1-arg2-)
## Part 2 - Multi-windowed Best Practice
To make the development of multi-windowed applications easier, you should manage all windows of your application inside your main process by having an array or map to store the reference of each window. All creations and deletions of windows should be handled by the main process, and all messages between windows should be and can only be sent through the main process. Essentially, the main process acts as a package distribution center. Imagine if you want to send a package to a friend, you would give the package to Fedex, and Fedex will deliver that package to your friend's house.

In your main process, you should define an object to keep track of all windows in your application
```
let windows = {}
```

Define a `createWindow` function to handle all windows creation and keep their references in `windows` object we just created
```
function createWindow(){
    const win = new Electron.BrowserWindow({ width: 400, height: 400 })

    // each window has a unique id, we can use this unique id as the key to store the window reference in `windows` object
    windows[win.id] = win

    // This is fired when the window `win` is closed. We want to remove the reference to this window from `windows` object
    win.on('closed', () => {
        this.windows.delete(win.id)
    })

    // return the newly created window so we can modify more properties on it
    return win;
}
```
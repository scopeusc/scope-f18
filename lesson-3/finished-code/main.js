'use strict';

var app = require('app');
var BrowserWindow = require('browser-window');

var mainWindow = null;

app.on('ready', function() {
    mainWindow = new BrowserWindow({
        height: 700,
        width: 368,
        frame: false,
        resizable: false
    });

    mainWindow.loadUrl('file://' + __dirname + '/app/index.html');


    globalShortcut.register('ctrl+shift+1', function () {
            mainWindow.webContents.send('global-shortcut', 0);
    });
    globalShortcut.register('ctrl+shift+2', function () {
        mainWindow.webContents.send('global-shortcut', 1);
    });
});

var ipc = require('ipc');

ipc.on('close-main-window', function () {
    app.quit();
});

var globalShortcut = require('global-shortcut');


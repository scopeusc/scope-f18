Before beginning, be sure to change your working directory to the **scope-f18** repository.  Once you’re inside the repository, change directory once again to the lesson-3 folder.  Run a quick npm install from there to be sure that Node is properly setup.
# Creating a package.json
First, we must create the **package.json** file, which specifies some of our project details.

For now, you can start off with the sample shown below:
```
{
	“name”: “lesson-3”,
	“version”: “0.1.0”,
	“main”: “./main.js”,
	“scripts”: {
		“start”: “electron .”
	}
}
```
# Creating an index.html
In order to verify that we’re able to render a browser window in Electron, we’re going to create an incredibly simple HTML.  You can use the sample below, or something like it.
```
<h1>Hello, Scope!</h1>
<br />
<h2>Welcome to Lesson 3</h2>
```
Note: no `<html>`, `<head>`, `<body>`, or the related closing tags are needed for this example.
# Creating a simple main.js
As we specified within our **package.json** file, a file called **main.js** will contain the main process of our project.  Below, we’ve produced a **main.js** that will simply use Electron to build a simple browser window (800x600 in size) that renders our index.html.
```
'use strict';

var app = require('app');
var BrowserWindow = require('browser-window');

var mainWindow = null;

app.on('ready', function() {
    mainWindow = new BrowserWindow({
        height: 600,
        width: 800
    });

    mainWindow.loadUrl('file://' + __dirname + '/app/index.html');
});
```
Now, try running your application with npm start.
Adapting the main process for a sound board
Great work so far!  While the example application above does demonstrate the basic needs of our application, let’s make some slight changes to make it feel more like a sound machine.

We’ll need to make some changes to **main.js**:

First, set the height specification to 700
Next, set the width specification to 368
Finally, add two lines after the dimension specifications:  
`frame: false,`  
`resizable: false`  

*Note: be sure that the last specification in the list does not have a comma following it.*

Last but not least, we’ll need to display the interactive portion of the sound machine in the window.  Add the following snippet to **app/js/index.js**:
```
'use strict';

var soundButtons = document.querySelectorAll('.button-sound');

for (var i = 0; i < soundButtons.length; i++) {
    var soundButton = soundButtons[i];
    var soundName = soundButton.attributes['data-sound'].value;

    prepareButton(soundButton, soundName);
}

function prepareButton(buttonEl, soundName) {
    buttonEl.querySelector('span').style.backgroundImage = 'url("img/icons/' + soundName + '.png")';

    var audio = new Audio(__dirname + '/wav/' + soundName + '.wav');
    buttonEl.addEventListener('click', function () {
        audio.currentTime = 0;
        audio.play();
    });
}
```
Once again, we can now run our app using npm start.
Configuring inter-process communications
Another aspect of Electron is the use of inter-process communication modules (IPCs).  An IPC allows you to send/receive messages on a channel, in a sort of publisher/subscriber model.

To subscribe our application to the channel on which close-window events will be received, add the following code block to your **main.js**:
```
var ipc = require('ipc');

ipc.on('close-main-window', function () {
    app.quit();
});
```
Next, in order to send the message on that channel, add the following code to **index.js**:
```
var ipc = require('ipc');

var closeEl = document.querySelector('.close');
closeEl.addEventListener('click', function () {
    ipc.send('close-main-window');
});
```
Finally, define the close button as non-draggable by adding this attribute to **index.css**:
```
.settings {
    ...
    -webkit-app-region: no-drag;
}
```
Catching native GUI events to trigger window events
Let’s begin by adding two basic shortcuts to our application.  Shortcuts must first be registered, which can be done by adding the following code to your **main.js** file:

```
var globalShortcut = require('global-shortcut');

app.on('ready', function() {
    ... // existing code from earlier

    globalShortcut.register('ctrl+shift+1', function () {
            mainWindow.webContents.send('global-shortcut', 0);
    });
    globalShortcut.register('ctrl+shift+2', function () {
        mainWindow.webContents.send('global-shortcut', 1);
    });
});
```

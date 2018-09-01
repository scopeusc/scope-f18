Before beginning, be sure to change your working directory to the **scope-f18** repository.  Once you’re inside the repository, change directory once again to the lesson-3 folder.  Run a quick `npm install` from there to be sure that Node is properly setup.

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
As we specified within our **package.json** file, a file called **main.js** will contain the main process of our project.  Below, we’ve produced a **main.js** that will simply use Electron to build a simple browser window (800x600 in size) that renders our **index.html**.
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
Now, try running your application with `npm start`.

# Adapting the main process for a sound board
Great work so far!  While the example application above does demonstrate the basic needs of our application, let’s make some slight changes to make it feel more like a sound machine.

We’ll need to make some changes to **main.js**:

1. First, set the height specification to 700
2. Next, set the width specification to 368
3. Finally, add two lines after the dimension specifications:  
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
Once again, we can now run our app using `npm start`.

# Configuring inter-process communications
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

# Catching native GUI events to trigger window events
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

Next, add the following code to your **index.js** file in order to simulate a button click and use the selector that we created (above).

```
ipc.on('global-shortcut', function (arg) {
    var event = new MouseEvent('click');
    soundButtons[arg].dispatchEvent(event);
});
```

# Defining modifier key configurations
The next portion of this tutorial is focused on creating a settings window to allow modifier keys to be set/changed, depending on the user's needs.  We'll be adding four components:

1. A settings button
2. A settings window, linked to the above button
3. Signals to toggle the settings window (via IPC)
4. Persistant user configuration data management

## Settings button/window creation
Begin by adding code to your **index.js** to send a message when the settings button is clicked by the user.  You can do that in the following manner:

```
var settingsEl = document.querySelector('.settings');
settingsEl.addEventListener('click', function () {
    ipc.send('open-settings-window');
});
```

Now, we must implement the event that's triggered by that message in **main.js**.  This can be done by listening on the "open-settings-window" channel and producing the setting's window.  Add the following code to your **main.js** file.

```
var settingsWindow = null;

ipc.on('open-settings-window', function () {
    if (settingsWindow) {
        return;
    }

    settingsWindow = new BrowserWindow({
        frame: false,
        height: 200,
        resizable: false,
        width: 200
    });

    settingsWindow.loadUrl('file://' + __dirname + '/app/settings.html');

    settingsWindow.on('closed', function () {
        settingsWindow = null;
    });
});
```

Additionally, we must implement code to close that window when we're done.  Create a new file called **settings.js** with the following:

```
'use strict';

var ipc = require('ipc');

var closeEl = document.querySelector('.close');
closeEl.addEventListener('click', function (e) {
    ipc.send('close-settings-window');

```

And of course, we have to add the corresponding IPC code to our **main.js**:

```

ipc.on('close-settings-window', function () {
    if (settingsWindow) {
        settingsWindow.close();
    }
});
```

## Working with persistant user configurations
To handle our settings files, we'll be using the *nconf* module.  To ensure that it's installed on your device, run `npm install --save nconf` which will save the module as a dependency for our application.

Next, we need to create our configuration file.  Open up a new file in the project root directory, call it **configuration.js**, and paste the following contents:

```
'use strict';

var nconf = require('nconf').file({file: getUserHome() + '/sound-machine-config.json'});

function saveSettings(settingKey, settingValue) {
    nconf.set(settingKey, settingValue);
    nconf.save();
}

function readSettings(settingKey) {
    nconf.load();
    return nconf.get(settingKey);
}

function getUserHome() {
    return process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME'];
}

module.exports = {
    saveSettings: saveSettings,
    readSettings: readSettings
};
```

Next, we'll need to initialize the variables that store our user settings.  Head back over to **main.js** and require the configuration module:

```
'use strict';

var configuration = require('./configuration');

app.on('ready', function () {
    if (!configuration.readSettings('shortcutKeys')) {
        configuration.saveSettings('shortcutKeys', ['ctrl', 'shift']);
    }
    ...
}
```

To account for this change, we'll need to make another small modification to **main.js** by removing the registration of shortcut keys:

```
app.on('ready', function () {
    ...
    setGlobalShortcuts(); 
}

function setGlobalShortcuts() {
    globalShortcut.unregisterAll();

    var shortcutKeysSetting = configuration.readSettings('shortcutKeys');
    var shortcutPrefix = shortcutKeysSetting.length === 0 ? '' : shortcutKeysSetting.join('+') + '+';

    globalShortcut.register(shortcutPrefix + '1', function () {
        mainWindow.webContents.send('global-shortcut', 0);
    });
    globalShortcut.register(shortcutPrefix + '2', function () {
        mainWindow.webContents.send('global-shortcut', 1);
    });
}
```

## Settings window interactions
Nearly done!  All we have let to do is bind the behavior in our settings window and register the IPC corresponding to settings changes.  Within **settings.js**, bind the click events and checkbox behavior:

```

var configuration = require('../configuration.js');

var modifierCheckboxes = document.querySelectorAll('.global-shortcut');

for (var i = 0; i < modifierCheckboxes.length; i++) {
    var shortcutKeys = configuration.readSettings('shortcutKeys');
    var modifierKey = modifierCheckboxes[i].attributes['data-modifier-key'].value;
    modifierCheckboxes[i].checked = shortcutKeys.indexOf(modifierKey) !== -1;
    modifierCheckboxes[i].addEventListener('click', function (e) {
        bindModifierCheckboxes(e);
    });
}

function bindModifierCheckboxes(e) {
    var shortcutKeys = configuration.readSettings('shortcutKeys');
    var modifierKey = e.target.attributes['data-modifier-key'].value;

    if (shortcutKeys.indexOf(modifierKey) !== -1) {
        var shortcutKeyIndex = shortcutKeys.indexOf(modifierKey);
        shortcutKeys.splice(shortcutKeyIndex, 1);
    }
    else {
        shortcutKeys.push(modifierKey);
    }

    configuration.saveSettings('shortcutKeys', shortcutKeys);
    ipc.send('set-global-shortcuts');
}
view raw
```

And then, add the final IPC to **main.js**:

```
ipc.on('set-global-shortcuts', function () {
    setGlobalShortcuts();
});
```

Congratulations!  Start up your Electron application and enjoy!
# Lesson 3:  Simple Soundboard

Before beginning, be sure to change your working directory to the **scope-f18** repository and run `git pull`.  Once you’re inside the repository, change directory once again to the [lesson-3/starter-code](starter-code) folder.

## Part 1 - Setup
**Project Structure:**
* `index.html` - The web view for the main window
* `main.js` - The main electron application script
* `package.json` - Hold the details of your project and its dependencies
* `sounds/` - The sound file for our simple soundboard

Run a quick `npm install` from there to be sure that Node is properly setup and that the Electron application dependencies are installed.

## Part 2 - Setting Up the Web View
Open up `index.html` and you'll notice that the file looks essentially like a template for any old Electron application.  We'll be adding some content to make it into our soundboard.

First, give your web view a fun title (within the `<head></head>` tags).  Our example below is a bit basic:

```HTML
<title>Simple Soundboard</title>
```

Next, add a quick section explaining to your user what they're looking at.  This is just like adding text to any website, but it'll render in a platform specific application.  Replace the code within the `<body></body>` tags with the following:

```HTML
<h1>Simple Soundboard</h1>
<p>Welcome to our simple soundboard application, built with Electron.</p>
<p>Using the A-Z and 0-9 keys on your keyboard, you can play sounds!</p>
```

Thirdly, we need a DIV within our web view in order to later programatically create our HTML5 audio tags and access the soundboard audio files (within `sounds/`).  Add the following line anywhere within your `<body></body>` tags:

```HTML
<div class="audio" id="audioDiv"></div>
```

Finally, we need to ensure that our web view calls the script we'll write to populate it with the HTML5 tags that play our sound files.  Add the following script tag (with its contents) after the closing body tag (`</body>`):

```HTML
<script>
      require('./functions.js')
</script>
```

## Part 3 - Setting Up the Business Logic
In this section, we'll be writing some quick JS functions that will add the necessary HTML5 tags to our web view and map key presses to those tags.  Create a file called `functions.js` and open that up.

In this application, we'll be making the keys A-Z and 0-9 map to sound files that announce the character being pressed on the keyboard.  There are segments of code that we'll need to write in order to do this.

### Creating the HTML5 Audio Tags
In order to play the sound files, we'll need to insert audio tags into our `index.html` programatically (as there will be 36 of them).  To do this, we'll be making us of the character codes for 0-9 and A-Z (as those are the values that will be passed by our keyboard button presses).  The below loop begins with `i = 48` (which is 0) and ends with `i = 90` (which is Z).  Include the following loop at the beginning of your `functions.js` file:

```js
for (var i = 48; i < 91; i++) {

}
```

Within the body of this loop, we need to access the DIV we created above and create a pair of `<audio></audio>` tags for each key.  We'll set the audio file source to the corresponding clip in our `sounds/` directory.  Copy the following line to be repeated by our for loop:


```js
document.getElementById("audioDiv").innerHTML += "<audio id=\""
+ String.fromCharCode(i)
+ "\" src=\"sounds/"
+ String.fromCharCode(i)
+ ".mp3\" preload=\"auto\"></audio>"
```

### Create the Key Press Event Handler
Finally, in this section we'll be writing the function to process the keyboard button press event and play the corresponding audio file via the `<audio></audio>` tags.

Below, we've written an empty function in which we'll be processing this event.  Copy the skeleton code after the entire for loop that we just wrote:

```js
document.onkeydown = function(e) {

};
```

First, we need to isolate the key presses in which we have corresponding sound files.  You can access the key pressed via the `e.keyCode` variable.  Use an if-else like the one below to check if the key press is in the valid range, within the function:

```js
if (e.keyCode > 47 && e.keyCode < 91) {

}
else {
    console.log("Key is not found!");
}
```

Lastly, we'll need to convert the character code (from the key press) to a character.  Using that character, we can get the ID of the correction `<audio></audio>` tags and call the `play()` method.  This can be done with the following lines:

```js
var keyPress = String.fromCharCode(e.keyCode);
document.getElementById(keyPress).play();
```

## Part 4 - Try It Out!

Congratulations!  Your simple soundboard built in Electron is complete.  Run it with `npm start`.

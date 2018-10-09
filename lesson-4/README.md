# **Lesson 4 - Markdown Editor**
**Introduction**

In this lesson we’ll be creating a text editor that will let us write Markdown quickly and easily on our desktop. Before starting, make sure you `git pull` to get the most up-to-date code. 

## Part 1: Setup

We've included a package.json, basic index.js and a number of CSS files in this lessons folder to make starting the project easier. If you look at the index.js, it basically creates a new window, loads 'index.html' into it, and displays it when the app is ready. It also handles closing windows and the application, which are things we have covered in previous lessons.

Once you install the project dependencies with `npm install` you'll be ready to start coding.


## Part 2: Creating index.html

The entry point in our package.json is index.js, which loads the main window with index.html, so let's start by creating this file. 

We need our main window to show us two separate views, one for us type markdown in, and the other to show us the result. The idea is that we'll be able to type markdown on the left side and see the result on the right side. 

```html
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8" />
        <title>Markdown Editor</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" type="text/css" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css">
        <link rel="stylesheet" type="text/css" href="index.css" />
    </head>
    <body>
        <div class="container-fluid">
                <div class="row w-100">
                <div id="leftSide" class="col">
                    <textarea type="text" id="input"></textarea>
                </div>
                <div id="rightSide" class="col">
                </div>
                </div>
                <div id="footer" class="row">
                    <div class="col w-100">
                    </div>
                </div>
        </div>
    </body>
</html>
```

We’re using bootstrap to make some of the dynamic sizing easy, and also some custom CSS that will control the styling for our window.

Create an index.css file and add the following code
```css
html, body {
    height: 100%;
    width: 100%;
    margin: 0;
    padding: 0;
}
#leftSide {
    border-right: 2px solid;
    padding: 2px;
}
#rightSide {
    border-left: 2px solid;
}
.container-fluid {
    height: 100%;
}
.row {
    height: 100%;
    position: absolute;
}
#input {
    border: 0;
    width: 100%;
    height: 100%;
}
#input:focus {
    outline: none;
}
```
Now that we have styling for the page, we need to add a link to this CSS file and a link to Bootstrap within
the head elements of our index.html file
```html
<link rel="stylesheet" type="text/css" href="index.css" />
<link rel="stylesheet" type="text/css" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css">
```

When we run the app now with `npm start` you should see a window that opens with two sides, we can type into the left side,
but nothing happens yet. 

## Part 3: Adding Javascript

We want whatever we type on the left to show up on the right, and we can do this with Javascript. Let's add some script tags to the bottom of our index.html file that will handle this logic. We want a function that will take the text entered in the text area on the left, and display it on the right after rending the text according to the Markdown tags. 

```html
<script>
    function updateRightSide () {
        var inputText = document.getElementById('input').value;
        document.getElementById('rightSide').innerHTML = inputText;
    }
</script>
```
We want this function to run every time the text we type in changes so that the right side is always up-to-date. We can do this pretty easily by running the function every time a key is pressed in our text input area. We can do this using the `onkeyup` html attribute. Our text area input on the left side needs to run our updating function on this event which it can do with 

`<textarea type="text" id="input" onkeyup="updateRightSide()"></textarea>`

This function will constantly update the display on the right when text is entered, which you should be able to see if you run the app again. However, the right side doesn't yet know how to handle any Markdown, so we'll add that now. 

Luckily there is a node module called 'marked' that can translate Markdown for us that we have already installed as a dependency because it was included in the package.json file for this lesson. To use it, we need to add 

`const marked = require('marked');`

above our update function. We want to translate our Markdown entered on the left and display it on the right side, so all we have to do is convert our text with the 'marked()' function included in the marked module. We will now set the innerHTML of the right side to our converted text, which should look like this 

`document.getElementById('rightSide').innerHTML = marked(inputText);`

Once this is done, run the app with `npm start` and you'll see that we now have a basic version of a live markdown editor that will run as a native desktop application. The resulting Markdown might not be as nicely styled as what you're used to, but we can change this by adding two extra CSS files that will make our Markdown a little bit more like what you would see on Github. Include links to these files at the top of our index.html with

```css
<link rel="stylesheet" href="skeleton.css">
<link rel="stylesheet" href="normalize.css">
```

## Part 4: Making things easier

Our app is working now! Although, there is one feature we could add to make our app a little more useful since we'll always be copying and pasting our Markdown somewhere else after we're done formatting. We can make our lives easier by including a button that can save our text to the clipboard, which Electron can easily interface with if we import the clipboard module. 

If we add a button to our index.html page, we just need the onclick action to run the following function
```js
function copyText() {
    const {clipboard} = require('electron')
    clipboard.writeText(document.getElementById("input").value)
}
```
This function just uses the clipboard module to write the text we have input to the system clipboard so that we can paste it wherever we need it easily. You will have to add some styling to position the button correctly but all you need to connect it is Javascript. 

We've now built a simple application that can be used to create Markdown documents on the fly. What can you add to make it more useful or awesome?



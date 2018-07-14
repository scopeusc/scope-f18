# **Lesson 4 - Markdown Editor**
**Introduction**

In this lesson we’ll be creating an editor that will let us write Markdown quickly and easily on our desktop. We’ll be learning how to use keyboard shortcuts and save to the system clipboard which will make our app more convenient and faster to use. 

**Part 1: Setup**

Prerequisites
Electron. Make sure you have the right version of electron and node

`node -v // should print 8.x`
`electron -v // should print 2.0.x`

**Installing**

Clone the repo
`git clone https://github.com/scopeusc/futureRepoWithCode`

Install dependencies

`npm install`

Running the project

`npm start`

**Creating the App**

Now that we have the basic skeleton of an electron app running, let's start building our markdown editor.

The first thing we need is the basic html of our main window that will show us two separate views, one for us type markdown in, and the other to show us the result.

```
<div class="container-fluid">
        <div class="row w-100">
          <div id="leftSide" class="col">
            <textarea type="text" id="input" onkeyup="updateMarkdown()"></textarea>
          </div>
          <div id="rightSide" class="col">
          </div>
        </div>
        <div id="footer" class="row">
            <div class="col w-100">
              <button type="button" id="copyButton" onclick="copyText()" class="btn">Copy Text</button>
            </div>
        </div>
</div>
```

We’re using bootstrap to make some of the dynamic sizing easy, and also some custom CSS so we need to include links to these things at the top of our index.html. 

Create an index.css file and add the following code
```
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
Now that we have styling for the page, we need to include the node module that will translate the markdown for us. 

`npm install marked --save-dev `

This installs the marked module and saves it as a dependency of our project. Now we will make a new Javascript file that will have the logic for translating our text into markdown. In this file we will require the marked module and then use it to set the innerHTML of our output div. We will trigger the function that does this every time a key is pressed in our input textarea box. 

Once this is done, we will have a basic version of a live markdown editor that will run as a native desktop application. 



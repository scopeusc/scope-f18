# **Lesson 1 - Introduction to Electron, Setup, and review of HTML, CSS, and Javascript**
  
## **Introduction**

Welcome to Scope - Fall 2018!

We’re excited to be teaching Electron this semester, a framework that lets you create native desktop applications with pure Javascript. For those of you who were here last semester and learned Node.js, you can think of Electron as a variant of Node that runs on your desktop instead of a server. 

Electron uses web pages as the basis for application windows, and so if you know how to write HTML/CSS code, you can get started writing Electron apps almost immediately. 

You might be wondering, if Electron is basically just a wrapper for a website, why do we need it? The really awesome part of Electron is that it gives you a lot more control and access to the users computer than a typical web app through its rich operating system API’s. This means we can do things that a normal website wouldn’t be able to do like read and write to the file system, read CPU and other hardware usage statistics, and do pretty much anything else a normal desktop app would do. 

## **Setup**

Before we write any code, we need to get everyone on the same page in terms of setup. 

For our curriculum this semester, we will be using Visual Studio Code as our editor, and recommend that everyone use it as well to make sure that the lessons are as easy and helpful as possible. 

You can install VS Code with the link below by just following the prompts after downloading the version for the operating system you're currently running
https://code.visualstudio.com/Docs/setup/setup-overview

Visual studio code is a powerful editor and one of its best features is its built in debugging, which may come in handy this semester or for any of your other projects. The link below shows you how to set up debugging within VS Code for electron projects https://electronjs.org/docs/tutorial/debugging-main-process-vscode

If this is your first time using VS Code, you might be interested in this video that goes through the installation process and goes over the basic features of the editor
https://code.visualstudio.com/docs/introvideos/basics

Now that we have our editor installed, we need to install Electron. This can be done through NPM (Node Package Manager), which we will do locally once we create our first project. 

For everyone who worked with Node.js last semester, npm should already be installed on your computer because its installed together with Node. If anyone doesn’t have Node.js or npm installed, you can get it here https://nodejs.org/en/. We will be using Node version 8.9.3 and Electron version 2.0.2 as recommended by the Electron webpage and recommend these versions for all Scopers this semester. 

## **Overview of HTML, CSS, and Javascript**

All of our Electron projects this semester will be using HTML, CSS, and Javascript because Electron application windows are basically webpages with extra fuctionality. Therefore, its important that everyone understand the basics of these three languages. There a short descriptions provided below as well as links for those of you who don't have much experience with HTML, CSS, or Javascript and we encourage you to explore these topics in more detail before our next meeting.

**HTML - Hypertext Markup Language**
* The language that describes the components of a webpage like the text, buttons, forms, and so on
* Here's a few links that great for learning HTML 
  * https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML/Getting_started 
  * https://www.w3schools.com/html/,
  * https://www.codecademy.com/learn/learn-html

**CSS - Cascading Style Sheets**
* Used to style the design of the components of the page
* Changing the font color or size, setting the size of components or changing how they appear to the user
* Here's a few links that great for learning CSS 
  * https://developer.mozilla.org/en-US/docs/Learn/CSS 
  * https://www.w3schools.com/css/
  * https://www.codecademy.com/learn/learn-css

**Javascript**
* Make websites dynamic by giving us the ability to change parts of the page based on certain conditions like user actions
* For example, triggering a message to pop up once a form is submitted
* Here's a few links that great for learning Javascript 
  * https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/JavaScript_basics 
  * https://www.w3schools.com/js/
  * https://www.codecademy.com/learn/introduction-to-javascript



















Before beginning, be sure to change your working directory to the **scope-f18** repository.  Once you’re inside the repository, change directory once again to the **lesson-6** folder.  Run a quick `npm install` from there to be sure that Node is properly setup.

# Dependencies: electron-packager
This week, we’ll be working on packaging up your Electron application in order to allow easy sharing and use of your new software.  To do this, we’ll be using the electron-packager tool.

To start, run `npm install electron-packager -g` which will install from node package manager.

# Manually packaging our application
There are two ways to package our application with electron-packager.  The first of those is done via the command-line interface.  You must run the command:
```
electron-packager <location of project> <name of project> <platform> <architecture> <electron version> <optional options>
```
Where:
The location of the project is simply the root directory of the project (i.e. .../lesson-6)
The name of the project is a cool title that will be attached to the final package
The platform determines which devices will be able to run the package.  We’d recommend all for use on Windows, Mac, or Linux.
The architecture determines which processing environment the program will be built for.  Again, all is recommended to be interchangeable between 32-bit and 64-bit processors.
The electron version specifies which version of electron you’ll use (latest now is 2.0.5).

So, an example packaging command may be:
```
electron-packager ~/GitHub/scope-f18/lesson-6 ScopeElectronApp --all --version=2.0.5
```
# Scripting the packaging of our application
Another way that you could build your final application package is by adding a script to the **package.json** file.  Take the below file for example:
```
"scripts": {
  "start": "electron .",
  "package": "electron-packager ~/GitHub/scope-f18/lesson-6 ScopeElectronApp --all --version=2.0.5"
}
```
The above **package.json** would allow you to simply run `npm run-script package` from your project directory (../lesson-6) and it would run the same command that we just ran manually.

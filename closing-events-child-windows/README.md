# OpenFin example: Closing events

When a listener is added to an OpenFin application for 'close' or 'close-requested' the default close Event is overridden. You will not be able to close a window, either using the standard close button on a framed Window or by calling the 'close()' method. The purpose of this is to allow a function to be called prior to the window closing. In this example it is a simple pop-up window with a 'confirm' pop-up. If the user confirms close then the 'close()' method is called with the argument 'true', like this:

```
_mainWindow.close(true);
```  
It may be used to, for example, save data to a server and only close the app when a response is received.

New windows may be generated with the 'Add Window' button. The child windows are all closed when the parent window is closed.

See: [http://cdn.openfin.co/jsdocs/stable/tutorial-window.addEventListener.html](http://cdn.openfin.co/jsdocs/stable/tutorial-window.addEventListener.html) for documentation on EventListeners and [http://cdn.openfin.co/jsdocs/stable/tutorial-application.getChildWindows.html](http://cdn.openfin.co/jsdocs/stable/tutorial-application.getChildWindows.html) for documentation on ChildWindows.

--

This is a vanilla JavaScript app, free from frameworks and build systems.

It has a simple Node/Express server for local development.

Clone the repo and run:

```
$ npm install
```
NB: on a Mac you may need to type 'sudo npm install'

Navigate to the root folder where 'server.js' resides with your command line tool and run:

```
$ node server
```

This should start a simple Node server at [http://localhost:5070](http://localhost:5070), then, click the link below to install as an openFin app.

If you wish to change to localhost port you will need to change the references in "server.js", "app.json" and in the installer link below.

[installer](https://dl.openfin.co/services/download?fileName=openfin_closing_events&config=http://localhost:5070/app.json)
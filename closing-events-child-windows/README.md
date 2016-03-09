#OpenFin example: Apps, Child Windows and Closing Events 

When a listener is added to an OpenFin application for 'close' or 'close-requested' the default close Event is overridden. You will not be able to close a window, either using the standard close button on a framed Window or by calling the 'close()' method. The purpose of this is to allow a function to be called prior to the window closing. In this example it is a simple pop-up window with a 'confirm' pop-up. If the user confirms close then the 'close()' method is called with the argument 'true', like this:

```
_mainWindow.close(true);
```  
It may be used to, for example, save data to a server and only close the app when a response is received.

New windows may be generated with the 'Add Window' button. The child windows are all closed when the parent window is closed.

See: [http://cdn.openfin.co/jsdocs/stable/tutorial-window.addEventListener.html](http://cdn.openfin.co/jsdocs/stable/tutorial-window.addEventListener.html) for documentation on EventListeners and [http://cdn.openfin.co/jsdocs/stable/tutorial-application.getChildWindows.html](http://cdn.openfin.co/jsdocs/stable/tutorial-application.getChildWindows.html) for documentation on ChildWindows.

--
##Apps vs Windows

Apps and Windows behave in very different ways.###AppsApps, even if created programmatically, are independent of the app which created them. It is possible to retrieve a list of the running apps, this does not, however, return the actual Application as Objects, with access to their methods, but an Object containing the uuid and a boolean 'isRunning' to tell if the Application is currently running.To communicate with an App you must do so via the InterApplicationBus. see: [http://cdn.openfin.co/jsdocs/stable/fin.desktop.module_InterApplicationBus.html](http://cdn.openfin.co/jsdocs/stable/fin.desktop.module_InterApplicationBus.html)###WindowsWhen a window is created programmatically the parent application has access to the Window Object – either via the Object returned in the constructor callback.Instantiating the window as shown below...

```var _window = new fin.desktop.Window(config_object,successCallback,failCallback);
```...then retrieving the Object in the success callback...
```var successCallback = function(){console.log(this) //'this' is the newly created Window object}
```Or, alternatively, using the 'getChildWindows()' method.
```var _app = fin.desktop.Application.getCurrent();  _app.getChildWindows(function(children){  console.log(children)}
```
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
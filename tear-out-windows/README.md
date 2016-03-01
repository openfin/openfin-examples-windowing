# OpenFin example: Tear-out windows

The illusion of being able to tear an element out of a window onto the desktop is acheived by reparenting the DOM elements to an external app window. In this demo the external windows are pre created and each draggable element has a hidden window awaiting it being dragged from the main window. 

As we are able to track the System mouse position, when the element is re-parented we can then move the external window to the mouse position so the element appears to have been dropped on the desktop.

Other techniques are available, for example spawning new windows on-the-fly to accomodate torn out elements. 

The code has been copiously annotated to help you understand the process.


--

This is a vanilla JavaScript app, free from frameworks and build systems.

It has a simple Node/Express server for local development.

Clone the repo and run

```
$ npm install
```
NB: on a Mac you may need to type 'sudo npm install'

Navigate to the root folder where 'server.js' resides with your command line tool and run:

```
$ node server
```

This should start a simple Node server at [http://localhost:9066](http://localhost:9066), then, click the link below to install as an openFin app.

If you wish to change to localhost port you will need to change the references in "server.js", "app.json" and in the installer link below.

[installer](https://dl.openfin.co/services/download?fileName=openfin_tearout_windows&config=http://localhost:9066/app.json)
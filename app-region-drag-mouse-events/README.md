# OpenFin example: Draggable Elements & Mouse Events
The purpose of this demonstration is to show to create draggable areas by setting the CSS property of '-webkit-app-region: drag;'.

This is a vanilla JavaScript app free from frameworks and build systems, though you may add them as you see fit.

It has a simple Node/Express server for local development.

Clone the repo and run

```
$ npm install
```
NB: on a Mac you may need to type 'sudo npm install'

Navigate to the root folder where 'server.js' resides in your command line tool and run:

```
$ node server
```

This should start a simple Node server at [http://localhost:9070](http://localhost:9070), then, click the link below to install as an OpenFin app.

If you wish to change to localhost port you will need to change the references in "server.js", "app.json" and in the installer link below.

[installer](https://dl.openfin.co/services/download?fileName=openfin_windowdragging&config=http://localhost:9070/app.json)

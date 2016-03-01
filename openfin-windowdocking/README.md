# OpenFin example: Snap and dock

This repo contains a modified version of the OpenFin snap and dock code [https://github.com/openfin/snap-and-dock](https://github.com/openfin/snap-and-dock).

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

This should start a simple Node server at [http://localhost:9070](http://localhost:9060), then, click the link below to install as an openFin app.

If you wish to change to localhost port you will need to change the references in "server.js", "app.json" and in the installer link below.

[installer](https://dl.openfin.co/services/download?fileName=openfin-window-docking-demo&config=http://localhost:9077/app.json)
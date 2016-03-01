##Openfin window transparency

Implementing the experimental window transparency feature of OpenFin.

run 
```
$ npm install
```

NB: you may need to run sudo npm install on a Mac


There is a simple Node/Express server you need to run to get this working. Navigate to the root directory in the termainal and run 
```
node server
```

Then download the installer below and install the app. 

[https://dl.openfin.co/services/download?fileName=WindowTransparency&config=http://localhost:8080/app.json](https://dl.openfin.co/services/download?fileName=WindowTransparency&config=http://localhost:8080/app.json)

Transparency is set in the app.cofig 

```
   "alphaMask": {
   "red": 200,
   "green": 200,
   "blue": 200
 },
```

The pseudo translucent effect is achieved by setting a four pixel checkerboard with top left and bottom right in the alpha colour rgb(200,200,200). 

The alpha channel is all or nothing - there is no alpha percentage or antialiasing at present so curves, translucence and gradients will appear crude and require some ingenuity to implement. The alpha colour will need careful consideration to avoid fringing on anti aliased text and images.

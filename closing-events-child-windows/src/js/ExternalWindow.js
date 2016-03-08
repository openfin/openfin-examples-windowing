/**
 * Created by grahamclapham on 05/01/16.
 */
// We need a unique name for each window - this function generates a random one.
var _generateRandomName = function(){
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < 15; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
};


ExternalWindow = function(){

   var _window_config = {
        alwaysOnTop: false,
        autoShow: true,
        cornerRounding: {
            width: 25,
            height: 30
        },
        defaultCentered:true,
        defaultHeight:300,
        defaultLeft: (Math.random() * 500),
        defaultTop:100,
        defaultWidth:400,
        frame:true,
        hideOnClose: false,
        icon:"http://default.ico",
        maxHeight: -1,
        maximizable: true,
        maxWidth: -1,
        minHeight: 0,
        minimizable: true,
        minWidth: 0,
        name:_generateRandomName(),
        opacity: 1.0,
        resizable: true,
        resizeRegion: {
            size: 2, //The size in pixels (Default: 2),
            bottomRightCorner: 4 //The size in pixels of an additional
                                 //square resizable region located at the
                                 //bottom right corner of a
                                 //frameless window. (Default: 4)
        },
        showTaskbarIcon: true,
        saveWindowState:true,
        /*taskbarIcon: The URL of an icon to be shown on the desktop. Support formats: Portable Network Graphic (PNG); Size: 256 x 256 Default: The parent application's applicationIcon */
        taskbarIcon:"http://default_icon.png",
        /* state: A string that sets the window to be "minimized", "maximized", or "normal" on creation. Default: "normal" */
        state:"normal",
        /* The URL of the window. Default: "about:blank" */
        url: "http://localhost:5070/childwindow.html"
    };

    var _this = this;


    return new Promise(function(resolve, reject){
        var _initCallback = function(){
            console.log("Initialisation succeeded.", this.getNativeWindow().document.querySelector("#title-display"));
            //
            this.getNativeWindow().document.querySelector("#title-display").innerHTML ='</H2>'+_window_config.name+'</H2>';
            //document.querySelector("#title-display").innerHTML('</H2>LOADED</H2>');

            resolve(this);
        };
        var _onIntFail = function(){
            console.log("Initialisation failed.")
        };

        try{
            fin.desktop.main(function(){
                _this._window = new fin.desktop.Window(_window_config,_initCallback,_onIntFail);
            })
        }catch(err){
            console.log("Error: ", err);
            reject(err)
        }

    });
};

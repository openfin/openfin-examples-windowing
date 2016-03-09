var _mainWindow
    , _messageWindow
    , _applications = []
    , _appUUID = 0
    , winDisplay
    , appDisplay
    , appList = []
    , winList = [];

document.addEventListener('DOMContentLoaded', function() {
    init();
});

init = function(){
    _messageWindow = document.querySelector("#message")
    try{
        fin.desktop.main(function(){
            initWithOpenFin();
        })
    }catch(err){
        initWithoutOpenFin();
    }
};

initWithOpenFin = function(){
    printMessage("We have OpenFin available.");
    winDisplay = document.querySelector("#win-display");
    appDisplay = document.querySelector("#app-display");
    if (!_mainWindow){
        _mainWindow = fin.desktop.Window.getCurrent()
    };
    OpenFinEventListeners.addAllEventListeners(_mainWindow);
    updateLists();
    _mainWindow.addEventListener('close-requested', function(e) {
        var challenge = confirm('are you sure? This will close all the child windows.');
        if (challenge == true) {
            _mainWindow.close(true);
        }else{
            console.log("The confirm was false")
        }
    });

    initButtonListeners();
    // This is just a utility function to allow the url in the app to open in a browser.
    initExternalURLs();
};

printMessage = function(message){
    if(_messageWindow){
        _messageWindow.innerHTML = message;
    }
};
//
initButtonListeners = function(){
    document.querySelector("#closeButton").addEventListener('click', function(e){
        closeMainWindow();
    });

    //document.querySelector('#listWindows').addEventListener("click", function(e){
    //    listAllWindows()
    //});

    document.querySelector('#addWin').addEventListener("click", function(e){
        var win = new ExternalWindow().then(function(win){
            console.log(win);
            win.addEventListener("close-requested", function() {
                win.close(true, function(){
                    console.log("THE WINDOW SHOULD HAVE CLOSED ");
                    updateLists();
                }, function(err){
                    console.log("THE WINDOW CLOSE ERRORED :  ",err);

                });
            });
            updateLists();
        });
    });

    document.querySelector('#addApp').addEventListener("click", function(e){
        _appUUID ++;
        initNewApp("APP_"+_appUUID).then(function(app){
            app.addEventListener('closed', function(event){
                updateLists()
            });
            _applications.push(app);
            listAllApplications()
        });
    });
};

updateLists = function(){
    listAllApplications();
    listAllWindows();
};

// APPLICATIONS:
// getAllApplications is a method of the fin.desktop.System class
getAllApplications = function(){
    return new Promise(function(resolve, reject){
        fin.desktop.System.getAllApplications(function(applicationInfoList) {
            resolve(applicationInfoList);
        });
    });
};

listAllApplications = function(){
    appList.map(function(d,i){
        try{
            d.destroy()
        }catch(e){
            console.log(e)
        }
    });
    appList = [];
    getAllApplications().then(function(allApps){
        allApps.forEach(function (app) {
            var data = {app: app, "uuid": app.uuid, type: "app", "running":app.isRunning}
            var _dis = iconFactory(data);
            appDisplay.appendChild(_dis.dom);
            _dis.dom.style.opacity = 1;
            appList.push(_dis);
            setTimeout(function(){
                _dis.dom.style.opacity = 1;
            }, 10);
        });
    });
};


// WINDOWS:
// Getting child Windows is a method of the fin.desktop.Application class

listAllWindows = function(){
    winList.map(function(d,i){
        try{
            d.destroy()
        }catch(e){
            console.log(e)
        }
    });
    winList = [];
    fin.desktop.Application.getCurrent().getChildWindows(function (children) {
        children.forEach(function (childWindow) {

            console.log(childWindow);


            //          _dom.className   = data.running ? "window-icon running" :"window-icon not-running" ;

            var data = {window:childWindow};
            var _win = iconFactory(data);
            winDisplay.appendChild(_win.dom);
            winList.push(_win);

            setTimeout(function(){
                _win.dom.style.opacity = 1;
            }, 10);

        });
    });
};

//----
iconFactory = function(data){
    var _app, _window;
    if(data.app) _app = data.app;
    if(data.window) _window = data.window;

    var _destroy = function(){
        try {
            this.parentElement.removeChild(this);
        }catch(err){
            //--
        }
    };

    var _dom = document.createElement("div");

    if(_app){
        _dom.className   = data.running ? "window-icon running" :"window-icon not-running" ;
        var _text = document.createTextNode(data.uuid);
        _dom.appendChild(_text);
        _dom.addEventListener('click', function(){
            console.log("App : ",_app );
        });
    }

    if(_window){
        // console.log(">>>>>>>>>>>>>>>>> _window ",_window);
        _dom.className = "window-icon";
        var _text = document.createTextNode(data.window.name);
        _dom.appendChild(_text);
        _dom.addEventListener('click', function(){
            data.window.bringToFront()
        });
    }

    return {dom:_dom, destroy:_destroy.bind(_dom)}
};

///---------
closeRequestedCallback = function(evt){
    console.log("Close Requested Callback ", evt);
    delayForceCloseWindow(_mainWindow);
};
//-----
closeMainWindow = function(){
    _mainWindow.close(false,
        function(){
            console.log("Close called ")
        },
        function(evt){
            console.log("Close call failed  ", evt)
        }
    );
};

delayForceCloseWindow = function(win){
    printMessage("The window will close in three seconds.");
    setTimeout(function(){
        forceCloseWindow(win)
    }, 3000);
};

forceCloseWindow = function(win){
    win.close(true,
        function(){
            console.log("Close called ");
        },
        function(evt){
            console.log("Close call failed  ", evt);
        });
}

initWithoutOpenFin = function(){
    console.log("We have NO OpenFin ");
    printMessage("We OpenFin is not available.");
};
// makes the anchor tags open in a browser rather than in the OpenFin app.
initExternalURLs = function(){
//Grab all the 'a' tags.
    [].slice.call(document.querySelectorAll('a')).map(function(d, i){
        d.addEventListener('click', function(e){
            e.preventDefault();
            fin.desktop.System.openUrlWithBrowser(e.target.href, function () {
                console.log("successful");
            },function (err) {
                console.log("failure: " + err);
            })
        });
    });
};
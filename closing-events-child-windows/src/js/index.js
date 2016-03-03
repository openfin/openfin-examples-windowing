var _mainWindow, _messageWindow, _applications = [], _appUUID = 0;

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
    printMessage("We have OpenFin available.")
    if (!_mainWindow){
        _mainWindow = fin.desktop.Window.getCurrent()
    };
    OpenFinEventListeners.addAllEventListeners(_mainWindow);
    //OpenFinEventListeners.listen("close-requested", closeRequestedCallback);
    _mainWindow.addEventListener('close-requested', function(e) {
        var challenge = confirm('are you sure?');
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
        _messageWindow.innerHTML = message
    }
};

initButtonListeners = function(){
    document.querySelector("#closeButton").addEventListener('click', function(e){
        closeMainWindow();
    });

    //document.querySelector('#removeAllListeners').addEventListener("click", function(e){
    //    OpenFinEventListeners.removeAllEvemtListeners(_mainWindow);
    //});

    //document.querySelector('#removeBoundsChanged').addEventListener("click", function(e){
    //    OpenFinEventListeners.removeListenerByName(_mainWindow, "bounds-changed");
    //});

    document.querySelector('#listWindows').addEventListener("click", function(e){
        listWindows()
    });

    document.querySelector('#addWin').addEventListener("click", function(e){
        var win = new ExternalWindow().then(function(win){
            console.log(win);
        });
        listWindows();
    });



    document.querySelector('#addApp').addEventListener("click", function(e){
        _appUUID ++;

        initNewApp("APP_"+_appUUID).then(function(app){
            _applications.push(app);
        });
    });

    document.querySelector('#')
};

listWindows = function(){
    var _list = "__"
    fin.desktop.Application.getCurrent().getChildWindows(function (children) {
        _list += fin.desktop.Application.getCurrent().window.name +"<br>";
        children.forEach(function (childWindow) {
            _list += "Showing child: " + childWindow.name +"<br>";
            childWindow.show();
        });
        console.log("_list")
        printMessage(_list)
    });
};

closeRequestedCallback = function(evt){
    console.log("Close Requested Callback ", evt);
    delayForceCloseWindow(_mainWindow);
};

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
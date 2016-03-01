/*

 1.       Child Application can minimize and close individually.

 2.       Child Applications if docked to each other, will minimize or close as  a group.

 3.       Minimizing the main application will  minimize itself and all child applications, even if they are not docked to the main application.
 */


var dockingManager, _childWindows, _dockButton,  _dockingEnabled = false;

document.addEventListener("DOMContentLoaded", function(){
    init();
});

function init(){
    console.log("Dom Loaded ", this);
    try{
        fin.desktop.main(function(){
            initWithOpenFin();
        })
    }catch(err){
        initNoOpenFin();
    }
};

function initWithOpenFin(){
    dockingManager = DockingManager.getInstance();
    // Your OpenFin specific code to go here...
    // Create a bunch of simple external windows -- the
    var _windowPromises = [createDockedWindow(),createDockedWindow(),createDockedWindow(),createDockedWindow()];
    // Once all promises are fulfilled - save them in _childWindows Array.
    Promise.all(_windowPromises).then(function(values) {
        _childWindows = values;
        _dockButton = document.querySelector("#dockButton");
        _dockButton.addEventListener('click', function(){
            _dockingEnabled ? removeArrayFromDockingWindows(_childWindows) :  addArrayToDockingWindows(_childWindows);
        })
        _closeAllButton = document.querySelector("#closeAll")
        _closeAllButton.addEventListener('click', function(e){
            dockingManager.minimizeAll();
        })
    });
}

function initNoOpenFin(){
    alert("OpenFin is not available - you are probably running in a browser.");
}
//

function addArrayToDockingWindows(array){
    dockingManager.register(fin.desktop.Window.getCurrent(), true);
    array.map(function(d,i){
        dockingManager.register(d, true);
    });
    _dockingEnabled = true;
    _dockButton.innerHTML = "disable docking "
}

function removeArrayFromDockingWindows(array){
    dockingManager.unregister(fin.desktop.Window.getCurrent(), true);
    array.map(function(d,i){
        dockingManager.unregister(d);
    });
    _dockingEnabled = false;
    _dockButton.innerHTML = "enable docking "
}


var _generateRandomName = function(){
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < 15; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
};


/*
    This is the code fro creating a very simple docked window.
 */
function createDockedWindow(){
    var _name =  _generateRandomName(),
        _content = document.createElement('div');
        _content.innerHTML = "<h3>"+_name+"</h3>";
    return new Promise(function(resolve, reject){
        var child = new fin.desktop.Window({
            name:_name,
            defaultWidth: 266,
            defaultHeight: 127,
            defaultTop: (Math.random() * 800),
            defaultLeft: (Math.random() * 800),
            showTaskbarIcon: true
        }, function () {
            // gets the HTML window of the child
            // dockingManager.register(child, true);
            var wnd = child.getNativeWindow();
            wnd.document.body.appendChild(_content);
            child.show();
            resolve(child);
        });
    });
}
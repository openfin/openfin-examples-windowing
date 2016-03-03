// Due to the asynchronous nature of the
function initNewApp(uuid){
    return new Promise(function(resolve, reject){
        var SpawnedApplication = new fin.desktop.Application({
            name: "A New OpenFinApp",
            uuid: uuid,
            url: "http://localhost:5070/childapp.html",
            mainWindowOptions: {
                name: "OpenFin Application",
                autoShow: true,
                defaultCentered: false,
                alwaysOnTop: false,
                saveWindowState: true,
                icon: "http://localhost:5070/favicon.ico"
            }
        }, function () {
            console.log("running");
            SpawnedApplication.run();
            resolve(SpawnedApplication)
        });
    })
}
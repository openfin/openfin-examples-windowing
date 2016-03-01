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
    console.log("OpenFin is available");
    // Your OpenFin specific code to go here...
    initTearoutListeners()
}

function initNoOpenFin(){
    alert("OpenFin is not available - you are probably running in a browser.");
}
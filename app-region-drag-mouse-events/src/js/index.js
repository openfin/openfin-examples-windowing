var _dragArea;

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
  console.log("OpenFin is available. ");
  _dragArea = document.querySelector("#dragger");
  fin.desktop.Window.getCurrent().defineDraggableArea(_dragArea);
    fin.desktop.System.getMonitorInfo(function (monitorInfo) {
        console.log("This object contains information about all monitors: ", monitorInfo);
    });
    initDomEventListeners();
    initDragEventListener();
    initExternalWindow();
}

function initDomEventListeners(){
[].slice.call(document.querySelectorAll(".listened")).map(function(d,i){
    d.addEventListener('mouseover', function(e){
        console.log("MOUSE OVER --- ")
        e.target.classList.remove('mouseleave');
        e.target.classList.add('mouseover');

    });
    d.addEventListener('mouseout', function(e){
        console.log("MOUSE OUT --- ")
        e.target.classList.remove('mouseleave');
        e.target.classList.add('mouseover');
    });
    d.addEventListener('mouseleave', function(e){
        console.log("MOUSE LEAVE --- ")
        e.target.classList.add('mouseleave');
        e.target.classList.remove('mouseover');
    });
});
}
/*
 initDragEventListener will have no effect on the drag bar, as it is defined as a draggable area, and is there for illustration only.
 */
function initDragEventListener(){
    _dragArea.addEventListener('mouseover', function(e){
        console.log("MOUSE OVER --- ");
        e.target.classList.remove('mouseleave');
        e.target.classList.add('mouseover');

    });
    _dragArea.addEventListener('mouseout', function(e){
        console.log("MOUSE OUT --- ");
        e.target.classList.add('mouseleave');
        e.target.classList.remove('mouseover');

    });
    _dragArea.addEventListener('mouseleave', function(e){
        console.log("MOUSE LEAVE --- ");
        e.target.classList.add('mouseleave');
        e.target.classList.remove('mouseover');

    });
    _dragArea.addEventListener('mousemove', function(e){
        console.log("MOUSE MOVE --- ");
        e.target.classList.remove('mouseleave');
        e.target.classList.add('mouseover');

    });
}
/*
There needs to be an onSuccess callback when a window is created.
Within the callback you can execute any code specific to the created window which may be accesed via 'this'.

To obtain the DOM of that window use 'this.contentWindow.document'.
*/


initExternalWindow = function(){
    var customWindow = new fin.desktop.Window({
        url: "http://localhost:9070/draggable.html",
        name: "frameless_example",
        defaultWidth: 300,
        defaultHeight: 300,
        autoShow: true,
        frame: false
    }, function(){
        //obtain the toolbar DOM element.
        toolbar = this.contentWindow.document.getElementById('toolbar')
        //call defineDraggableArea method with the toolbar.
        this.defineDraggableArea(toolbar);
    });

};

function initNoOpenFin(){
  alert("OpenFin is not available. You are in a browser.");
}

var _dragArea, _current;

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
    _dragArea = document.querySelector("#dragger");
    _current = fin.desktop.Window.getCurrent();

    initDomEventListeners();
    initExternalWindow();
    initDragEventListener();

}

function initDomEventListeners(){
    document.querySelector("#closer").addEventListener('click', function(){
        _current.close()
    });

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
Within the callback you can execute any code specific to the created window which may be accessed via 'this'.

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
        console.log('Child window created: ', this)
    });

};

function initNoOpenFin(){
  alert("OpenFin is not available. You are in a browser.");
}

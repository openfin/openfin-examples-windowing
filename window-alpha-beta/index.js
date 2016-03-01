var targetedElement, startingTrans, x, y, grid,
    OFFSET_X = 160,
    OFFSET_Y = 210,
    COLUMNS = 25,
    NUM_LADDERS = 200,
    lnfOverrides = genLnfOverrides(),
    win;

/**
 *
 * 	Create and append hypergrids
 *
 */

document.querySelector("#fullscreen_off_btt").addEventListener('click', function(){
  //alert("FullScreen off ");
  win.restore();
})

document.querySelector("#fullscreen_btt").addEventListener('click', function(){
//  alert("FullScreen on ");
win.maximize();

})

document.querySelector('#mk-wind')
    .addEventListener('click', function(e) {

        var tmpLadder,
            ladder = document.querySelector('.ladder'),
            frag = document.createDocumentFragment(),
            i = 0,
            runningOffsetX = 0,
            runningOffsetY = 0;

        for (; i < NUM_LADDERS; i++) {
            tmpLadder = ladder.cloneNode(true);

            tmpLadder.querySelector('fin-hypergrid').addGlobalProperties(lnfOverrides)
            tmpLadder.querySelector('fin-hypergrid-behavior-json').setData(generateRandomData());

            tmpLadder.querySelector('.ladder-num').innerHTML = 'Ladder: ' + i;

            tmpLadder.style.left = runningOffsetX;
            tmpLadder.style.top = runningOffsetY;
            tmpLadder.style.display = 'block';

            runningOffsetX = (i && !(i % COLUMNS)) ? 0 : runningOffsetX + OFFSET_X;
            runningOffsetY += (i && !(i % COLUMNS)) ? OFFSET_Y : 0;

            frag.appendChild(tmpLadder);
        }

        document.body.appendChild(frag);
    });


/**
 *
 * 	Close the app
 *
 */

document.querySelector('#close')
    .addEventListener('click', function(e) {
        fin.desktop.Application.getCurrent().close();
    });


/**
 *
 * 	Rudimentary drag handling. Transform-translate elements based mouse move
 *
 */

document.addEventListener('mousedown', function(e) {
    var target = e.target,
        path = e.path,
        transform;

    if (target.classList.contains('drag')) {
        targetedElement = target;
        transform = targetedElement.style.transform;
        x = e.x;
        y = e.y;
        startingTrans = transform.match(/([^(]?\d+)/g) || [0, 0];
    }

    if (target.classList.contains('close')) {
        path[2].removeChild(path[1]);
    }
});


document.addEventListener('mouseup', function(e) {

    if (targetedElement) {
        targetedElement.style.zIndex = null;
        targetedElement = false;
        startingTrans = [0, 0];
        x = y = 0;
    }
});


document.addEventListener('mousemove', function(e) {
    var xMovement, yMovement, movementString;

    if (targetedElement) {
        xMovement = startingTrans[0] - (x - e.x);
        yMovement = startingTrans[1] - (y - e.y);

        movementString = ['translateX(',
            xMovement,
            'px) translateY(',
            yMovement,
            'px)'
        ].join('');

        targetedElement.style.transform = movementString;
        targetedElement.style.zIndex = 10;
    }

});


/**
 *
 * 	Show after getting the monitor info and making the app fill the screen
 *
 */

fin.desktop.main(function() {
    win = fin.desktop.Window.getCurrent();

    fin.desktop.System.getMonitorInfo(function(monitorInfo) {
        var mainWindow = fin.desktop.Window.getCurrent(),
            rec = monitorInfo.primaryMonitor.availableRect;

        mainWindow.setBounds(rec.left, rec.top, rec.right - rec.left, rec.bottom - rec.top, function() {
            mainWindow.show()
        })
    });
});


/**
 *
 * 	Simulate ticking data
 *
 */

(function fakeTicks(){

	var tmp = Array.prototype.forEach
		.call(document.querySelectorAll('fin-hypergrid-behavior-json'),
			function(behavior){
				if (behavior.setData) {
					behavior.setData(generateRandomData())
				}
			})

	tmp = null;

	return requestAnimationFrame(fakeTicks);
}())


/**
 *
 * 	Hypergrid setup
 *
 */

function randomRow() {
    var row = {
        asks: (Math.random() * 100).toFixed(0),
        bids: (Math.random() * 100).toFixed(0),
        price: (Math.random() * 1000).toFixed(3),
        ltq: (Math.random() * 1000).toFixed(0)
    };
    return row;
}

function generateRandomData() {
    var rowCount = 10;
    var data = new Array(rowCount);
    for (var i = 0; i < rowCount; i++) {
        data[i] = randomRow();
    }
    return data;
}


function genLnfOverrides() {
    return {
        font: '13px Tahoma, Geneva, sans-serif',
        color: '#ffffff',
        backgroundColor: '#505050',
        foregroundSelColor: 'rgb(25, 25, 25)',
        backgroundSelColor: 'rgb(183, 219, 255)',

        topLeftFont: '14px Tahoma, Geneva, sans-serif',
        topLeftColor: 'rgb(25, 25, 25)',
        topLeftBackgroundColor: 'rgb(223, 227, 232)',
        topLeftFGSelColor: 'rgb(25, 25, 25)',
        topLeftBGSelColor: 'rgb(255, 220, 97)',

        fixedColumnFont: '14px Tahoma, Geneva, sans-serif',
        fixedColumnColor: 'rgb(25, 25, 25)',
        fixedColumnBackgroundColor: 'rgb(223, 227, 232)',
        fixedColumnFGSelColor: 'rgb(25, 25, 25)',
        fixedColumnBGSelColor: 'rgb(255, 220, 97)',

        fixedRowFont: '11px Tahoma, Geneva, sans-serif',
        fixedRowColor: '#ffffff',
        fixedRowBackgroundColor: '#303030',
        fixedRowFGSelColor: 'rgb(25, 25, 25)',
        fixedRowBGSelColor: 'rgb(255, 220, 97)',

        backgroundColor2: '#303030',
        lineColor: '#707070',
        voffset: 0,
        scrollingEnabled: false,

        defaultRowHeight: 20,
        defaultFixedRowHeight: 20,
        defaultColumnWidth: 100,
        defaultFixedColumnWidth: 100
    }
}

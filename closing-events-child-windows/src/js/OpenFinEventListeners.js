/**
 * Created by grahamclapham on 05/01/16.
 */

OpenFinEventListeners = {
    allEvents:['blurred'
        ,'bounds-changed'
        //,'bounds-changing'
        ,'closed'
        ,'close-requested'
        //,'disabled-frame-bounds-changed'
        //,'disabled-frame-bounds-changing'
        //,'focused'
        //,'frame-disabled'
        //,'frame-enabled'
        //,'group-changed'
        ,'hidden'
        ,'maximized'
        ,'minimized'
        ,'restored'
        ,'shown'
    ],
    // store the callbacks in an array, so they may be removed later - you are stuck with an anonymous function.
    allEventCallbacks:[],
    addAllEventListeners:function(win){
        if(!this.element) this.element = document.createElement('div');

        var _allEvents = this.allEvents, _this = this;

        _allEvents.map(function(d,i){

            _this.allEventCallbacks[i] = function (event) {
                //console.log(_allEvents[i], "called with event",event);
                _this.dispatchEvent(_allEvents[i], event);
            };

            win.addEventListener(_allEvents[i],  _this.allEventCallbacks[i],
                function () {
                    console.log(_allEvents[i], " registration was successful");
                },
                function (reason) {
                    console.log(_allEvents[i] ," failure:" + reason);
                });
        });
    },
    genericRegisteredEvent: function(evt){
        console.log(this.allEvents[i], "called with event",event);
        _this.dispatchEvent(_allEvents[i], event);
    },
    removeAllEvemtListeners:function(win){
        var _this = this;
        this.allEvents.map(function(d,i){
            win.removeEventListener(_this.allEvents[i], _this.allEventCallbacks[i]);
        })
    },
    removeListenerByName:function(window, name){
        var ind = this.allEvents.indexOf(name);
        ind === -1 ?
            console.log("There is no event listener by that name ") :
            window.removeEventListener(this.allEvents[ind], this.allEventCallbacks[ind]);
    },
    addListenerByName:function(window, name){
        var ind = this.allEvents.indexOf(name);
        ind === -1 ?
            console.log("There is no event listener by that name ") :
            window.addEventListener(this.allEvents[ind], this.allEventCallbacks[ind]);
    },

    dispatchEvent:function(name, obj){
        var event0 = new CustomEvent(name, { 'detail': obj});
        this.element.dispatchEvent(event0);
        // also dispatch a generic 'openfinEvent' Event.
        obj.eventName = name;
        var event1 = new CustomEvent("openfinEvent", {'detail': obj});
        this.element.dispatchEvent(event1);
    },
    listen:function(name, callback){
        if(!this.element) this.element = document.createElement('div');
        this.element.addEventListener(name, callback)
    },
    unlisten:function(name, callback){
        this.element.removeEventListener(name, callback)
    }
}
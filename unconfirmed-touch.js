var Touch = function (d) {
    if(parent===void(0)){parent=false;};var p=this,settings={},elements={'parentBody':false},body=false,config={body:document.body,sensitivity:20},data={listeners:{},touch:{'x':false,'y':false},isTouched:false},accessible={},objects={},publish=function(nameMe,resource,changable){if(changable===void(0)){canChange=false;}else{canChange=changable;};if(accessible[nameMe]!==void(0)){if(changable!==void(0)){accessible[nameMe]['changable']=canChange;}}else{accessible[nameMe]={'changable':canChange}};accessible[nameMe]['value']=resource;},
        create = function () {
            if (_.isTouch()) {
                document.addEventListener('touchstart', touchStart, false);
                document.addEventListener('touchend', touchEnd, false);
            }
        },
        touchStart = function (event) {
            data.isTouched = true;
            data.touch.x = event.touches[0].clientX;
            data.touch.y = event.touches[0].clientY;

        },
        touchEnd = function (event) {
            var x = event.touches[0].clientX;
            var y = event.touches[0].clientY;

            var movement = {
                'xAxis':false,
                'yAxis':false
            };

            if (data.touch.x-config.sensitivity>x) {
                movement.xAxis = 'left';
            }

            if (data.touch.x+config.sensitivity<x) {
                movement.xAxis = 'right';
            }

            if (data.touch.y-config.sensitivity>y) {
                movement.yAxis = 'up';
            }

            if (data.touch.y+config.sensitivity<y) {
                movement.yAxis = 'down';
            }

            data.isTouched = false;

            for (var a in data.listeners) {
                data.listeners[a](movement);
            }
        };

    p.addListener = function (listener, call) {
        if (data.listeners[listener]===void(0)) {
            data.listeners[listener] = call;
        }
    };

    p.get=function(nameMe){if(accessible[nameMe]!==void(0)){return accessible[nameMe]['value'];}else{return false;}};p.set=function(nameMe,value){if(accessible[nameMe]!==void(0) && accessible[nameMe]['changable']){accessible[nameMe]['value']=value;return true;}else{return false;}};p.parent=parent;if(typeof(d)!='undefined'){_.sval(config,d);};create();
};

var touchClass = new Touch();
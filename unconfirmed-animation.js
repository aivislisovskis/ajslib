var MySprite = function (d) {
    if (parent===void(0)) {parent = false;} //specified parent element;
    //======= DECLARE PRIVATE VARIABLES&METHODS PHASE
    var p = this,
        settings = {'path':'/images/','format':'sprite.png', defaultFPS:25}, //hardcoded options
        elements = {}, //html element references
        body = false, //main HTML body (if exists)
        config = {     //configurable options
            'image':false,
            'length':0,
            'frames':0,
            'playTime':false,
            'width':0,
            'height':0,
            'play':'mouseover',
            'stop':'mouseout',
            'loop':false,
            'body':false,
            'onStop':function () {}, //when playback stops
            'onEnd':function () {}, //after last frame is played
            'pauseOnStop':false //if false - will reset to 1. frame, if true - will pause on current frame [when stops playing]
        },
        data = { //inner data storage
            'pausedOn':false,
            'inProgress':false,
            'frame':0,
            'fps':0,
            'interval':0,
            'reInterval':false
        },
        accessible = { //publicaly acessible data storage
            'test':{'value':true,'changable':true}
        },
        objects = {'songs':{}}, //references to obbjects
        create = function () { //initialization function
            if (config.image && config.body)
            body = config.body;

            if (config.width>0) {
                body.style.width = config.width + "px";
            } else {
                config.width = $(body).width();
            }

            if (config.height>0) {
                body.style.height = config.height + "px";
            } else {
                config.height = $(body).height();
            }

            $(body).addClass('sprite');

            if (config.play!=false) {
                $(body).bind(config.play, startPlay)
            }

            if (config.stop!=false) {
                $(body).bind(config.stop, stopPlay)
            }

            body.style.backgroundImage = settings.image + config.image + "." + settings.format;

            reCalculate();

            publish('parent', parent); //set public, unchangable parent reference
        },
        stopPlay = function () {
          if (data.reInterval) {
              clearInterval(data.reInterval);
              data.inProgress = false;
              if (!config.pauseOnStop) {
                  data.frame = 0;
                  setFrame();
              }
              config.onStop();
              data.reInterval = false;
          }
        },
        finishPlay = function () {
            if (data.reInterval) {
                config.onEnd();
                clearInterval(data.reInterval);
                data.inProgress = false;
                if (!config.pauseOnStop) {
                    data.frame = 0;
                    setFrame();
                }
                config.onStop();
                data.reInterval = false;
                data.frame = 1;
                setFrame();
            }
        },
        startPlay = function () {
            if (!data.reInterval) {
                data.reInterval = setInterval(playAction, data.interval);
                data.inProgress = true;
            }
        },
        playAction = function () {
          if (data.frame<(config.frames-1)) {
              data.frame++;
          } else {
              config.onEnd();
              if (config.loop) {
                data.frame = 1;
              } else {
                if (config.pauseOnStop) {
                    stopPlay();
                } else {
                    stopPlay();
                    data.frame = 1;
                    setFrame();
                }
              }
          }
          setFrame();
        },
        setFrame = function () {
            body.style.backgroundPosition = "-" + (Math.round(data.frame * config.width)) + "px 0px";
        },
        reCalculate = function () {
            if (config.playTime!==false) {
                data.interval=config.playTime/config.frames;
                data.fps = 60000/data.interval;
            } else {
                data.interval = 60/settings.defaultFPS;
                data.fps = settings.defaultFPS;
                config.playTime = settings.defaultFPS * config.frames;
            }
        },
        publish = function (nameMe, resource, changable) {  // create/change public variable
            if (changable===void(0)) {
                canChange = false;
            } else {
                canChange = changable;
            }

            if (accessible[nameMe]!==void(0)) {
                if (changable!==void(0)) {
                    accessible[nameMe]['changable'] = canChange;
                }
            } else {
                accessible[nameMe] = {'changable':canChange}
            }

            accessible[nameMe]['value'] = resource;
        }
        ;

    //======= DECLARE PUBLIC VARIABLES&METHODS PHASE

    //--> SPECIFIC

    p.play = startPlay;
    p.stop = stopPlay;
    p.finish = finishPlay;

    p.setTime = function (time) {
        var status = config.playTime/time
           data.frame = Math.round(config.frames/status);
    };

    //--> PREDEFINED

    p.get = function (nameMe) { // read public variable
        if (accessible[nameMe]!==void(0)) {
            return accessible[nameMe]['value'];
        } else {
            return false;
        }
    };

    p.set = function (nameMe, value) { // set public variable
        if (accessible[nameMe]!==void(0) && accessible[nameMe]['changable']) {
            accessible[nameMe]['value'] = value;
            return true;
        } else {
            return false;
        }
    };

    //======== INIT PHASE

    if (typeof(d)!='undefined') {
        _.sval(config,d); //set/override config options
    }

    create();
};
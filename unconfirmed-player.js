/*

music player

 */

var Player = function () {
    if (parent===void(0)) {parent = false;} //specified parent element;
    //======= DECLARE PRIVATE VARIABLES&METHODS PHASE
    var p = this,
        settings = {}, //hardcoded options
        elements = {}, //html element references
        body = false, //main HTML body (if exists)
        config = {}, //configurable options
        data = {'mute':false}, //inner data storage
        accessible = { //publicaly acessible data storage
            'test':{'value':true,'changable':true}
        },
        objects = {'songs':{}}, //references to obbjects
        create = function () { //initialization function
            publish('parent', parent); //set public, unchangable parent reference
        },
        muteAll = function () {
            for (var a in objects.songs) {
                objects.songs[a].stop();
            }
        },
        playEnvironment = function () {
            for (var a in objects.songs) {
                objects.songs[a].playEnvironment();
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

    p.mute = function () {
        data.mute = data.mute?false:true;
        if (data.mute) {
            muteAll();
            $('.sound').addClass('muted');
        } else {
            playEnvironment();
            $('.sound').removeClass('muted');
        }
        objects['songs']['volume_click'].play();
        return data.mute;
    };

    p.loadSound = function (name) {
        objects['songs'][name] =  new Song({'name':name}, p);
        return objects['songs'][name];
    };

    p.play = function (song) {
        if (!data.mute) {
            objects['songs'][song].play();
        }
    };

    p.pause = function (song) {
        objects['songs'][song].pause();
    };

    p.stop = function (song) {
        objects['songs'][song].stop();
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

var player = new Player();

var Song = function (d, parent) {
    if (parent===void(0)) {parent = false;} //specified parent element;
    //======= DECLARE PRIVATE VARIABLES&METHODS PHASE
    var p = this,
        settings = {'path':'/audio/'}, //hardcoded options
        elements = {}, //html element references
        body = false, //main HTML body (if exists)
        config = {}, //configurable options
        data = {'isEnvironment':false}, //inner data storage
        accessible = { //publicaly acessible data storage
            'test':{'value':true,'changable':true}
        },
        objects = {'songs':{}}, //references to obbjects
        create = function () { //initialization function
            body = _('audio', {'src':settings['path'] + config['name'] + "." + supportedExtension(), preload:"auto"});
            document.body.appendChild(body);
        },
        supportedExtension = function () {
            if ($.browser=='mozilla') {
              //  return 'ogg';
                return 'mp3';
            } else {
                return 'mp3';
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

    p.play = function () {
        body.play();
    };

    p.stop = function () {
        body.pause();
        //body.currentTime = 0;
    };

    p.pause = function () {
        body.pause();
    };

    p.playEnvironment = function () {
      if (data.isEnvironment) {
          p.play();
      }
    };

    p.setAsEnvironment = function () {
      data.isEnvironment = true;
      body.autoplay = true;
      body.loop = true;
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
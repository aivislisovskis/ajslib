var Pager = function (d, parent) {
    if (parent===void(0)) {parent = false;} //specified parent element;
    //======= DECLARE PRIVATE VARIABLES&METHODS PHASE
    var p = this,
        settings = {}, //hardcoded options
        elements = {'pagenavs':{}}, //html element references
        body = false, //main HTML body (if exists)
        config = {'pages':0,'ajaxTo':'/','pageVar':'page','before':3, 'middle':3,'end':3, returnTo:function () {}, onError:function() {}, 'arrows':true, active:0}, //configurable options
        data = {'total':5, 'current':0, displayStart:true, displayMiddle:true,displayEnd:true}, //inner data storage
        accessible = { //publicaly acessible data storage
            'test':{'value':true,'changable':true}
        },
        objects = {}, //references to obbjects
        create = function () { //initialization function
            publish('parent', parent); //set public, unchangable parent reference

            body = config.body;

            data.current = config.active;

            createItems();

            coordinateItems();
        },
        coordinateItems = function () {
            for (var a in elements['pagenavs']) {
                elements['pagenavs'][a].style.display="none";
            }

            if (config.arrows) {
                elements['pagenavs']['previous'].style.display = 'inline';
                elements['pagenavs']['next'].style.display = 'inline';
            } else {
                elements['pagenavs']['previous'].style.display = 'none';
                elements['pagenavs']['next'].style.display = 'none';
            }

            data.displayMiddle = true;

            if (data.current==0) {
                $(elements['pagenavs']['previous']).addClass('disabled');
                if (data.current<config.before) {
                    data.displayMiddle = false;
                }
            } else {
                $(elements['pagenavs']['previous']).removeClass('disabled');
            }

            if (data.current==config.pages-1) {
                $(elements['pagenavs']['next']).addClass('disabled');
                if (data.current>=config.pages - config.end) {
                    data.displayMiddle = false;
                }
            } else {
                $(elements['pagenavs']['next']).removeClass('disabled');
            }

            if (data.displayStart) {
                for (var counter = 0; counter<config.before;counter++) {
                    elements['pagenavs'][counter].style.display = 'inline';
                    elements['pagenavs'][counter].destination = counter;
                    elements['pagenavs'][counter].firstChild.innerHTML = counter+1;
                }
            }

            if (data.displayMiddle) {

                var realMiddleCount = config.middle;
                var beforeDots = true;
                var afterDots = true;
                var startCounter = 0;

                if (data.current<config.before + Math.ceil(config.middle/2)) {
                    //realMiddleCount = (realMiddleCount + ((data.current-config.before)-Math.floor(realMiddleCount/2)));
                    realMiddleCount = data.current - config.before;
                    beforeDots = false;
                    startCounter = (data.current - realMiddleCount) + 1;
                }

                if (data.current>=(config.pages - config.after) -  Math.ceil(config.middle/2)) {
                    realMiddleCount = (config.before - data.current)+1;
                    afterDots = false;
                    startCounter = (data.current - realMiddleCount) + 1;
                }

                counter++;

                if (beforeDots) {
                    elements['pagenavs'][counter].style.display = 'inline';
                    elements['pagenavs'][counter].firstChld.innerHTML = '...';
                    elements['pagenavs'][counter].destination = 'p';
                }

                counter++;

                var a = 0;

                for (counter; counter<config.middle; counter++) {
                    a++;
                    elements['pagenavs'][counter].style.display = 'inline';
                    elements['pagenavs'][counter].destination = startCounter + a;
                    elements['pagenavs'][counter].firstChld.innerHTML = startCounter + a;
                }

                counter++;

                if (afterDots) {
                    elements['pagenavs'][counter].style.display = 'inline';
                    elements['pagenavs'][counter].firstChld.innerHTML = '...';
                    elements['pagenavs'][counter].destination = 'n';
                }
            }

            if (data.displayEnd) {
                counter++;
                for (var a = 0; a<config.end; a++) {
                    elements['pagenavs'][counter].style.display = 'inline';
                    elements['pagenavs'][counter].destination = config.pages - (config.end-a);
                    elements['pagenavs'][counter].firstChild.innerHTML = config.pages - (config.end-a);
                }
            }
        },
        createItems = function () {
            elements['pagenavs']['previous'] = _('li', {'class':'arrowLeft', 'apc':_('a', {'href':'#', onclick:goto, destination:'p', app:body, apc:'&laquo;'})});

            data.total = config.before + config.middle + config.end + 2;

            for (var a=0; a<data.total; a++) {
                elements['pagenavs'][a] = _('li', {'apc':_('a', {'href':'#', onclick:goto, destination:0}), app:body});
            }

            elements['pagenavs']['next'] = _('li', {'class':'arrowRight','apc':_('a', {'href':'#', onclick:goto, destination:'n', app:body, apc:'&raquo;'})});
        },
        goto = function () {
            if (this.destination=='p' && data.current>0) {
                data.current--;
            } else if (this.destination=='n' && data.current<config.pages-1) {
                data.current++;
            } else {
                data = this.destination;
            }

            loadPage();
        },
        loadPage = function () {
           // $.ajax({'url':ajaxTo, ''})
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

    p.updateQuery = function (newData) {
        config.data = newData;
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
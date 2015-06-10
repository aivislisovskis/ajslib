var Pager = function (d, parent) {
    if (parent===void(0)) {parent = false;} //specified parent element;
    //======= DECLARE PRIVATE VARIABLES&METHODS PHASE
    var p = this,
        settings = {}, //hardcoded options
        elements = {'pagenavs':{}}, //html element references
        body = false, //main HTML body (if exists)
        config = {'data':{},'pages':0,'ajaxTo':'/','pageVar':'page','before':0, 'middle':5,'end':0, returnTo:function () {}, onError:function() {}, 'arrows':true, active:0}, //configurable options
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
                $(elements['pagenavs'][a]).removeClass("active");
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
            } else {
                $(elements['pagenavs']['previous']).removeClass('disabled');
            }

            if (data.current==config.pages-1) {
                $(elements['pagenavs']['next']).addClass('disabled');
            } else {
                $(elements['pagenavs']['next']).removeClass('disabled');
            }

            var middle = config.middle;
            var start = 3;

            if (data.current<Math.floor(config.middle/2)) {
                start = data.current+1;
            }

            if (data.current>config.pages - Math.floor(config.middle/2)) {
                start = config.middle - (config.pages - data.current)
            }


            if (config.pages<config.middle) {
                middle = config.pages;
                start = data.current+1;
            }


            if (data.displayEnd) {
                for (var a = 0; a<middle; a++) {
                    elements['pagenavs'][a].style.display = 'inline';
                    elements['pagenavs'][a].destination = (data.current - start)+ a + 2 - 1;
                    elements['pagenavs'][a].firstChild.innerHTML = (data.current  - start)+a+ 2;

                    if (elements['pagenavs'][a].destination==data.current) {
                       $(elements['pagenavs'][a]).addClass("active");
                    }
                }
            }
        },
        createItems = function () {
            elements['pagenavs']['previous'] = _('li', {'class':'arrowLeft', app:body, destination:'p', 'apc':_('a', {'href':'#', onclick:goto,  apc:'<<'})});

            data.total = config.before + config.middle + config.end + 2;

            for (var a=0; a<data.total; a++) {
                elements['pagenavs'][a] = _('li', {'apc':_('a', {'href':'#', onclick:goto, destination:0}), app:body});
            }

            elements['pagenavs']['next'] = _('li', {'class':'arrowRight',app:body,destination:'n','apc':_('a', {'href':'#', onclick:goto,   apc:'>>'})});
        },
        goto = function () {

            if (this.parentNode.destination=='p' && data.current>0) {
                data.current--;
            } else if (this.parentNode.destination=='n' && data.current<config.pages-1) {
                data.current++;
            } else {
                if (this.parentNode.destination!='p' && this.parentNode.destination!='n') {
                    data.current = this.parentNode.destination;
                }
            }

            coordinateItems();
            loadPage();
        },
        loadPage = function () {

            config.data['page'] = data.current+1;

            $.ajax({'url':config.ajaxTo, 'type':'POST', 'data':config.data, success:config.returnTo,error:config.onError});

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
        data.current = 0;
        coordinateItems();
        config.data = newData;
    };

    p.refresh = function() {
        loadPage();
    };

    p.updatePages = function (pages) {
      config.pages = pages;
      if (data.current>=config.pages) {
          data.current = 0;
      }

      coordinateItems();
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
/*
    v.1.0 by Aivis Lisovskis (c)
 */

var TabHolder = function () {
    if (parent===void(0)) {parent = false;} //specified parent element;
    //======= DECLARE PRIVATE VARIABLES&METHODS PHASE
    var p = this,
        settings = {'scroll':{'step':20,'time':50}}, //hardcoded options
        elements = {}, //html element references
        body = false, //main HTML body (if exists)
        config = {}, //configurable options
        data = {'active':false,'image':false,clickOnElement:false}, //inner data storage
        accessible = { //publicaly acessible data storage
            'test':{'value':true,'changable':true}
        },
        objects = {'tabs':[]}, //references to obbjects
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
        },
        create = function () { //initialization function
            $('.tabHolder').each(createInstance);
        },
        createInstance = function () {
            objects.tabs.push(new Tab({'body':this}, p));
        }
        ;

    //======= DECLARE PUBLIC VARIABLES&METHODS PHASE

    //--> CUSTOM



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

var Tab = function (d, parent) {
    if (parent===void(0)) {parent = false;} //specified parent element;
    //======= DECLARE PRIVATE VARIABLES&METHODS PHASE
    var p = this,
        settings = {'scroll':{'step':20,'time':50}}, //hardcoded options
        elements = {'items':[],'tabs':[]}, //html element references
        body = false, //main HTML body (if exists)
        config = {}, //configurable options
        data = {tabCount:0, itemCount:0}, //inner data storage
        accessible = { //publicaly acessible data storage
            'test':{'value':true,'changable':true}
        },
        objects = {'songs':{}}, //references to obbjects
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
        },
        create = function () { //initialization function
            body = config.body;

            $('.item', body).each(addItemId);
            $('.tab', body).each(addTabId);

            openTabInner(0);
        },
        addItemId = function () {
            this.innerId = data.itemCount;
            this.onclick = openTab;
            elements.items[data.itemCount] = this;
            data.itemCount++;
        },
        addTabId = function () {
            this.innerId = data.tabCount;
            elements.tabs[data.tabCount] = this;
            data.tabCount++;
        },
        openTab = function (id) {
            if (elements.tabs[this.innerId]!==void(0)) {
                hideTabs();
                $(elements.tabs[this.innerId]).addClass("active");
                hideItems();
                $(this).addClass("active");
            }
        },
        openTabInner = function (id) {
            if (elements.tabs[id]!==void(0)) {
                hideTabs();
                $(elements.tabs[id]).addClass("active");
                hideItems();
                $(elements.items[id]).addClass("active");
            }
        },
        hideTabs = function () {
            for (var a=0; a<elements.tabs.length; a++) {
                $(elements.tabs[a]).removeClass("active");
            }
        },
        hideItems = function () {
            for (var a=0; a<elements.items.length; a++) {
                $(elements.items[a]).removeClass("active");
            }
        }
        ;

    //======= DECLARE PUBLIC VARIABLES&METHODS PHASE

    //--> CUSTOM

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

var tabholder;

$(function () {
    tabholder = new TabHolder();
});
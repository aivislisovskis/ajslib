/*
 v1.0 by Aivis Lisovskis (c)
 */

var Alert = function(d) {
    if(parent===void(0)){parent=false;};var p=this,settings={},events={},elements={},body=false,config={options:{pars:false,'title':'', 'text':'', 'className':'default', onClose:function () {}},body:document.body,'close':'Ok!'},data={value:false, passParams:false},accessible={},objects={},publish=function(nameMe,resource,changable){if(changable===void(0)){canChange=false;}else{canChange=changable;};if(accessible[nameMe]!==void(0)){if(changable!==void(0)){accessible[nameMe]['changable']=canChange;}}else{accessible[nameMe]={'changable':canChange}};accessible[nameMe]['value']=resource;},
        create = function () {
            createAlert();
        },
        createAlert =  function () {
            elements.overlay = _('div', {'className':'overlay ' + config.className, app:document.body, onclick:close});
            elements.main = _('div', {'className':'alert ' + config.className});
            config.options.className = config.className;
            elements.title = _('div', {'className':'title', app:elements.main});
            elements.close = _('div', {'className':'close', app:elements.main, onclick:close});
            elements.text = _('div', {'className':'text', app:elements.main});
            elements.buttonGroup = _('div', {'className':'buttonGroup', app:elements.main});

            elements.buttonClose = _('div', {'className':'buttonClose', apc:config.close, app:elements.buttonGroup, onclick:close});

            document.body.appendChild(elements.main);
        },
        close = function () {
            events.onClose(data.passParams);
            $(elements.main).fadeOut();
            $(elements.overlay).fadeOut();
        },
        pop = function (options) {
            options = _.nval(config.options,options);
            data.passParams = options.pars;

            elements.main.className = "alert " + options.className;

            elements.title.innerHTML = options.title;
            elements.text.innerHTML = options.text;

            events.onClose = options.onClose;

            $(elements.overlay).fadeIn();
            $(elements.main).fadeIn();
        }
        ;

    p.alert = function (message) {
        pop({'text':message, 'className':'alert-box'});
    };

    p.pop = pop;

    p.close = function() {
        $(elements.main).fadeOut();
        $(elements.overlay).fadeOut();
    };

    p.update = function () {
        alert = p.alert;
    };

    p.get=function(nameMe){if(accessible[nameMe]!==void(0)){return accessible[nameMe]['value'];}else{return false;}};p.set=function(nameMe,value){if(accessible[nameMe]!==void(0) && accessible[nameMe]['changable']){accessible[nameMe]['value']=value;return true;}else{return false;}};p.parent=parent;if(typeof(d)!='undefined'){_.sval(config,d);};create();
};

var _alert;

$(function () {
    _alert = new Alert();
});

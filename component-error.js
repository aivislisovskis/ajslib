/*
 v.1.1 by Aivis Lisovskis (c)

 changelog:
    1.1 - @18.06.2015
        changed startForm (move error message display removal form here to validate)
        changed order for validate params, session made optional
        changed names of startSession/endSession to startForm/endForm
 */

var Error = function (d) {
    if(parent===void(0)){parent=false;};var p=this,settings={},events={},elements={},body=false,config={},data={sessions:[]},accessible={},objects={},publish=function(nameMe,resource,changable){if(changable===void(0)){canChange=false;}else{canChange=changable;};if(accessible[nameMe]!==void(0)){if(changable!==void(0)){accessible[nameMe]['changable']=canChange;}}else{accessible[nameMe]={'changable':canChange}};accessible[nameMe]['value']=resource;},
        create = function () {

        };

    p.startForm = function () {
        var c = data.sessions.push(true);
        return c-1;
    };

    p.endForm = function (session) {
        return data.sessions[session];
    };

    p.show = function (element, message, optionals) {
        if (typeof (optionals) == 'undefined') {
            optionals = {};
        }

        if (typeof (message) == 'undefined') {
            message = $(element).data('error-message');
        }

        optionals.message = message;
        optionals.body = element;
        if (typeof(optionals.priority)=='undefined') {
            optionals.priority = 100;
        }

        new ErrorItem(optionals, p);
    };

    p.destroy = function (element) {
        if (typeof(element.error)== 'undefined' || element.error==false) {} else {
            element.error.destroy()
        }
    };

    p.validate = function (element, session, error, fx) {
        if (element===void(0)) {
            console.info('Missing element!');
            return false;
        }
        if (typeof(error)=='undefined' || error==null) {
            error = $(element).data('error-message');
        }

        if (element.displayError === void(0) || element.displayError == false) {} else {
            $(element).removeClass('has-error');
            element.displayError = false;
        }

        var valid = true;

        if (typeof(fx)=='undefined') {
            valid = element.checkValidity();
        } else {
            valid = fx.apply(element);
        }

        if (valid && element.value!='') {
            var len;
            if (len = $(element).data('minlength')) {
                if (element.value.length<len) {
                    valid = false;
                }
            }
        }

        if (valid && element.value!='') {
            var len;
            if (len = $(element).data('maxlength')) {
                if (element.value.length>len) {
                    valid = false;
                }
            }
        }

        if (valid) {
            p.destroy(element);
            return true;
        } else {
            element.displayError = true;
            p.show(element, error);
            if (session === void(0) || session == null) {} else {
                data.sessions[session] = false;
            }
            return false;
        }
    };

    p.get=function(nameMe){if(accessible[nameMe]!==void(0)){return accessible[nameMe]['value'];}else{return false;}};p.set=function(nameMe,value){if(accessible[nameMe]!==void(0) && accessible[nameMe]['changable']){accessible[nameMe]['value']=value;return true;}else{return false;}};p.parent=parent;if(typeof(d)!='undefined'){_.sval(config,d);};create();
};

var ErrorItem = function (d, parent) {
    if(parent===void(0)){parent=false;};var p=this,settings={},events={},elements={},body=false,config={'defaultClass':'std-error'},data={},accessible={},objects={},publish=function(nameMe,resource,changable){if(changable===void(0)){canChange=false;}else{canChange=changable;};if(accessible[nameMe]!==void(0)){if(changable!==void(0)){accessible[nameMe]['changable']=canChange;}}else{accessible[nameMe]={'changable':canChange}};accessible[nameMe]['value']=resource;},
        create = function () {
            body = config.body;
            if (typeof(body.error)== 'undefined' || body.error==false) {
            } else {
                if (config.priority>=body.error.priority) {
                    body.error.destroy();
                } else {
                    return false;
                }
            }
            p.priority = config.priority;
            $(body).addClass('has-error');
            $(body).addClass(config.defaultClass);

            if (body.parentNode.style.position!='absolute' && body.parentNode.style.position!='fixed') {
                body.parentNode.style.position = 'relative';
            }

            elements.popupInfo = _('div', {'className':"error-popup " + config.defaultClass, app:body.parentNode, apc:config.message});

            body.error = p;
        };

    p.destroy = function () {
        $(body).removeClass('has-error');
        $(body).removeClass(config.defaultClass);
        body.parentNode.removeChild(elements.popupInfo);
        body.error = false;
    };

    p.get=function(nameMe){if(accessible[nameMe]!==void(0)){return accessible[nameMe]['value'];}else{return false;}};p.set=function(nameMe,value){if(accessible[nameMe]!==void(0) && accessible[nameMe]['changable']){accessible[nameMe]['value']=value;return true;}else{return false;}};p.parent=parent;if(typeof(d)!='undefined'){_.sval(config,d);};create();

};


var error = new Error();
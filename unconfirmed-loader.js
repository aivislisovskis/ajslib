var Loader = function (d) {
    if(parent===void(0)){parent=false;};var p=this,settings={},elements={},body=false,config={body:document.body},data={},accessible={},objects={},publish=function(nameMe,resource,changable){if(changable===void(0)){canChange=false;}else{canChange=changable;};if(accessible[nameMe]!==void(0)){if(changable!==void(0)){accessible[nameMe]['changable']=canChange;}}else{accessible[nameMe]={'changable':canChange}};accessible[nameMe]['value']=resource;},
        create =function () {

            body = config.body;

            elements.loader = _('div', {className:'loader', apc:_('div', {className:'loaderIcon'})});
            if (config.inverse) {
                $(elements.loader).addClass('i');
            }
            elements.loader.style.display = "none";
            body.appendChild(elements.loader);

            $(elements.loader).fadeIn(100);
        };

    p.onfinished = function () {
        if (elements.loader!==void(0) && elements.loader.parentNode!==void(0) && elements.loader.parentNode.removeChild!==void(0)) {
            elements.loader.parentNode.removeChild(elements.loader);
        } else {
            elements.loader.style.display = "none";
        }
    };

    p.get=function(nameMe){if(accessible[nameMe]!==void(0)){return accessible[nameMe]['value'];}else{return false;}};p.set=function(nameMe,value){if(accessible[nameMe]!==void(0) && accessible[nameMe]['changable']){accessible[nameMe]['value']=value;return true;}else{return false;}};p.parent=parent;if(typeof(d)!='undefined'){_.sval(config,d);};create();
};

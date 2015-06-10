/*
 v.1.0 by Aivis Lisovskis (c)
 */

/*
 ---> Global functions
 site.t(a) - translate text; a - original value;
 site.g - global object;
 site.r(a) - refresh page; [a] - go to page;

 ---> Scripts

 site.registerScript(class) - register that script is loaded and return preload values;
 site.readEssentials(class) - read all form elements whose id's starts with {class} and return;
 site.createData(class) - read all input type elements into array that starts with {class}

 */

var Site = function (d) {
    if(parent===void(0)){parent=false;};var p=this,settings={},events={},elements={},body=false,config={'runList':{}},data={listPars:{}, loadeds:{}, script:{}},accessible={},objects={},publish=function(nameMe,resource,changable){if(changable===void(0)){canChange=false;}else{canChange=changable;};if(accessible[nameMe]!==void(0)){if(changable!==void(0)){accessible[nameMe]['changable']=canChange;}}else{accessible[nameMe]={'changable':canChange}};accessible[nameMe]['value']=resource;},
        create = function () {

            for (var a in config.runList) {
                startScript(config.runList[a],a);
            }
        },
        startScript = function(pars, name) {
            data.listPars[name] = pars;
            data.loadeds[name] = false;
            data.script[name] = _('script', {'src':'/js/site-' + name + '.js', type:"text/javascript"});
            document.body.appendChild(data.script[name]);
        }
        ;

    p.registerScript = function (myClass) {
        if (typeof(data.listPars[myClass])!='undefined') {
            data.loadeds[myClass] = true;
            return data.listPars[myClass];
        } else {
            return false;
        }
    };

    p.readEsentials = function(className) {
        var oElements = {};
        var classL = className.length;
        $('*[id^=' + className + '-]').each(function () {
            var uniqTitle = this.id.substr(classL+1);
            oElements[uniqTitle] = this;
            if ($(this).data('error-display')==true) {
                error.show(this);
            }

        });

        return oElements;
    };

    // implementation for translations code for JS;
    p.t = function (source) {
        return source;
    };

    p.g = {}; //global variables

    p.createData = function (key) {
        var resultData = {};

        $('*[id^=' + key + '-]').each(
            function () {
                if (this.tagName=='INPUT' || this.tagName=='SELECT' || this.tagName=='TEXTAREA') {
                    if (this.type=="checkbox") {
                        resultData[this.id] = this.checked;
                    } else {
                        resultData[this.id] = this.value;
                    }
                }
            }
        );

        return resultData;
    };

    p.r = function (toThe) {
        if (typeof(toThe) == 'undefined') {
            document.location.href = document.location.href
        } else {
            document.location.href = toThe;
        }
    };

    p.get=function(nameMe){if(accessible[nameMe]!==void(0)){return accessible[nameMe]['value'];}else{return false;}};p.set=function(nameMe,value){if(accessible[nameMe]!==void(0) && accessible[nameMe]['changable']){accessible[nameMe]['value']=value;return true;}else{return false;}};p.parent=parent;if(typeof(d)!='undefined'){_.sval(config,d);};create();
};

var site;

$(function () {
    if (typeof(initParss)=='undefined') {
        var initPars = {};
    }

    site = new Site(initParss);
});

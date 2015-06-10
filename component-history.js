/*
 v1.0 by Aivis Lisovskis (c)
 */

var MyHistory = function (d) {
    if(parent===void(0)){parent=false;};var p=this,settings={},elements={},body=false,config={body:document.body,'baseUrl':'http://www.kaslauns.lv/lv/'},data={badBrowser:false,forceHash:false,state:false,'links':{},'listeners':{}},accessible={},objects={'albums':[]},publish=function(nameMe,resource,changable){if(changable===void(0)){canChange=false;}else{canChange=changable;};if(accessible[nameMe]!==void(0)){if(changable!==void(0)){accessible[nameMe]['changable']=canChange;}}else{accessible[nameMe]={'changable':canChange}};accessible[nameMe]['value']=resource;},
        create = function () {
            badBrowser();
            data.state = location.hash.substr(1);
            window.onhashchange = checkIfHashChanges;
            window.onpopstate = checkIfChanges;
            publish('base', config.baseUrl,false);
            checkIfChanges();
        },
        add = function (params) {
            data.links[params.address] = params;
        },
        navigate = function (setData) {
            data.state = setData;
            //document.location.href = config.baseURL + setData;
            var stateObj = {};
            history.pushState(stateObj, null, config.baseUrl + setData);
            analytics(config.baseUrl + setData);
            //data.state = history.state;
        },
        navigateReplace = function (setData) {
            data.state = setData;
            //document.location.href = config.baseURL + setData;
            var stateObj = {};
            history.replaceState(stateObj, null, config.baseUrl + setData);
            //_.con('called');
            //_gaq.push(['_trackPageview', config.baseUrl + setData]);
            //data.state = history.state;
        },
        navigateHash = function (setData) {
            data.state = setData;
            data.forceHash = true;
            parts = document.location.href.split('#');
            document.location.href = parts[0] + '#' + setData;
            // _.con('calledHash');
        },
        checkIfHashChanges = function () {
            var hash = document.location.hash;
            if (hash!='#' + data.state && hash!='#') {
                var hash = hash.substr(1);
                data.state = hash;
                goto(data.state);
            }
        },
        checkIfChanges = function () {
            var myLocation = document.location.href.substr(config.baseUrl.length-1);
            if (myLocation!='/' + data.state && !data.forceHash) {
                var hash = myLocation.substr(1);
                data.state = hash;
                goto(data.state);
            } else {
                data.forceHash = false;
            }
        },
        goto = function (address) {
            if (data.links[address] !==void(0)) {
                data.links[address].call(data.links['params']);
                return true;
            } else {
                for (var a in data.listeners) {
                    if (data.listeners[a](address)) {
                        return true;
                    }
                }
            }

            return false;
        },
        analytics = function (link) {
            if (typeof (_gaq)!='undefined' && typeof(_gaq.push)!='undefined') {
                _gaq.push(['_trackPageview', link]);
            }
        },
        badBrowser = function () {
            if(navigator.appName.indexOf("Internet Explorer")!=-1){     //yeah, he's using IE
                var badBrowser=(
                    navigator.appVersion.indexOf("MSIE 1")==-1  //v10, 11, 12, etc. is fine too
                    );

                if(badBrowser){
                    data.badBrowser = true;
                }
            }
        }
        ;

    p.loadCurrent = function () {
        return data.state;
    };

    p.navigate = function (params) {
        if (data.badBrowser) {
            return false;
        }
        add(params);

        if (params['hash']!==void(0)) {
            navigateHash(params.address);
        } else if (params['replace']!==void(0)) {
            navigateReplace(params.address);
        } else {
            navigate(params.address);
        }

        if (params.callNow !== void(0)) {
            params.callNow(document.location.href);
        }
    };

    p.listen = function (address) {
        goto(address);
    };

    p.list = function (addressList) {
        for (var a = 0; a<addressList.length; a++) {
            add(addressList[a])
        }

    };

    p.test = function (add) {
        navigate(add);
    };

    p.addListener = function (listener, call) {
        if (data.listeners[listener]===void(0)) {
            data.listeners[listener] = call;
        }
    };

    p.addAnalytics = function (link) {
        //_.con('ext');
        //analytics(link['address']);
    }

    p.get=function(nameMe){if(accessible[nameMe]!==void(0)){return accessible[nameMe]['value'];}else{return false;}};p.set=function(nameMe,value){if(accessible[nameMe]!==void(0) && accessible[nameMe]['changable']){accessible[nameMe]['value']=value;return true;}else{return false;}};p.parent=parent;if(typeof(d)!='undefined'){_.sval(config,d);};create();
};

var historyClass;


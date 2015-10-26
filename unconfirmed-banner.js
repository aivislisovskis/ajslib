/*
 v.1.0 by Aivis Lisovskis (c)
 */

_.BannerManager = function () {
    if(parent===void(0)){parent=false;};var p=this,className='BannerManager',settings={},events={},elements={},body=false,config={},data={},accessible={},objects={},publish=function(nameMe,resource,changable){if(changable===void(0)){canChange=false;}else{canChange=changable;};if(accessible[nameMe]!==void(0)){if(changable!==void(0)){accessible[nameMe]['changable']=canChange;}}else{accessible[nameMe]={'changable':canChange}};accessible[nameMe]['value']=resource;},
        create = function () {

        };

    p.init = function (options) {
        if (options['select']!==void(0)) {
            var pElem = $(options['select']);
            if (pElem) {
                options['container'] = pElem[0];
                new _.Banner(options);
            }
        }
    };

    p.get=function(nameMe){if(accessible[nameMe]!==void(0)){return accessible[nameMe]['value'];}else{return false;}};p.set=function(nameMe,value){if(accessible[nameMe]!==void(0) && accessible[nameMe]['changable']){accessible[nameMe]['value']=value;return true;}else{return false;}};p.parent=parent;if(typeof(d)!='undefined'){_.sval(config,d);};create();
};

$(function () {
    _.banner = new _.BannerManager();
});

_.Banner = function (d, parent) {
    if(parent===void(0)){parent=false;};var p=this,className='Banner',settings={},events={},elements={},body=false,config={'sleep':10000, 'stopOnOver':true, 'container':false,list:[]},data={},accessible={},objects={'list':[]},publish=function(nameMe,resource,changable){if(changable===void(0)){canChange=false;}else{canChange=changable;};if(accessible[nameMe]!==void(0)){if(changable!==void(0)){accessible[nameMe]['changable']=canChange;}}else{accessible[nameMe]={'changable':canChange}};accessible[nameMe]['value']=resource;},
        create = function () {
            body = config.container;

            elements.body = _('div', {'className':'body', app:body});
            elements.swaps = _('div', {'className':'swaps', app:body});

            config.container.onmouseover = pauseRotation;
            config.container.onmouseout = resumeRotation;

            createElements();
            next();

            if (config.rotation !==void(0)) {
                startRotation();
            }
        },
        startRotation = function () {
            data.rotation = setInterval(next, config.sleep);
        },
        pauseRotation = function () {
            if (config.rotation !==void(0)) {
                clearInterval(data.rotation);
            }
        },
        resumeRotation = function () {
            if (config.rotation !==void(0)) {
                startRotation();
            }
        },
        next = function () {
            var element = data.list.next();
            closeVisible();
            if (element!==void(0)) {
                element.open();
            }
        },
        createElements = function () {
            for (var a=0; a<config.list.length; a++) {
                config.list[a]['container'] = elements.body;
                objects.list.push(new _.BannerImage(config.list[a], p));
            }

            data.list = new SA();
            data.list.merge(objects.list);

            createSwaps();
        },
        createSwaps = function () {
            data.list.each(createSwap);
        },
        createSwap = function (val, key) {
            var swap = _('div', {'className':'swap', app:elements.swaps});
            val.linkSwap(swap, key);
        },
        closeVisible = function () {
            data.list.each(close);
        },
        close = function (val, key) {
            val.close();
        }
        ;

    p.parent = parent;

    p.showThis = function (key) {
        var object = data.list.point(key);
        if (object.visible() == false) {
            closeVisible();
            object.open();
        }
    };

    p.get=function(nameMe){if(accessible[nameMe]!==void(0)){return accessible[nameMe]['value'];}else{return false;}};p.set=function(nameMe,value){if(accessible[nameMe]!==void(0) && accessible[nameMe]['changable']){accessible[nameMe]['value']=value;return true;}else{return false;}};p.parent=parent;if(typeof(d)!='undefined'){_.sval(config,d);};create();
};

_.BannerImage = function (d, parent) {
    if(parent===void(0)){parent=false;};var p=this,className='BannerImage',settings={},events={},elements={swap:false},body=false,config={fade:1000, 'key':false,'container':false,'src':false,'href':false},data={visible:false},accessible={},objects={},publish=function(nameMe,resource,changable){if(changable===void(0)){canChange=false;}else{canChange=changable;};if(accessible[nameMe]!==void(0)){if(changable!==void(0)){accessible[nameMe]['changable']=canChange;}}else{accessible[nameMe]={'changable':canChange}};accessible[nameMe]['value']=resource;},
        create = function () {
            body = config.container;
            elements.body = _('a', {className:'item', 'href':config.href, target:'_blank', 'style':{'backgroundImage':'url(\'' + config.src + "')"}, app:body});
        },
        showMe = function () {
            parent.showThis(data.key);
        }
        ;

    p.linkSwap = function (swap, key) {
        data.key = key;
        elements.swap = swap;
        elements.swap.onclick = showMe;
    };

    p.visible = function () {
      return data.visible;
    };

    p.close = function () {
        if (data.visible) {
            data.visible = false;
            $(elements.swap).removeClass('active');
            $(elements.body).fadeOut(config.fade);
        }
    };

    p.open = function () {
        if (!data.visible) {
            data.visible = true;
            $(elements.swap).addClass('active');
            $(elements.body).fadeIn(config.fade).css("display","block");;
        }
    };

    p.get=function(nameMe){if(accessible[nameMe]!==void(0)){return accessible[nameMe]['value'];}else{return false;}};p.set=function(nameMe,value){if(accessible[nameMe]!==void(0) && accessible[nameMe]['changable']){accessible[nameMe]['value']=value;return true;}else{return false;}};p.parent=parent;if(typeof(d)!='undefined'){_.sval(config,d);};create();
};
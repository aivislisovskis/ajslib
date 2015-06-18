/*
 v1.1 by Aivis Lisovskis (c)

 changelog:
 1.1 - @2015.06.17
 added singleton class "Checks" that creates new objects and works with them
 moved configurable options to "Checks" class.

 */

/* example HTML
 <div class="check" data-default="true" id="sameasbilling" data-title="sameasbilling"></div><label for="sameasbilling">Sama as billing</label>
 */

/* Contains all checkboxes that is converted*/
var Checks = function () {
    if(parent===void(0)){parent=false;};var p=this,settings={},elements={},body=false,config={},data={value:false},accessible={},objects={'checks':[]},publish=function(nameMe,resource,changable){if(changable===void(0)){canChange=false;}else{canChange=changable;};if(accessible[nameMe]!==void(0)){if(changable!==void(0)){accessible[nameMe]['changable']=canChange;}}else{accessible[nameMe]={'changable':canChange}};accessible[nameMe]['value']=resource;},
        create = function () {

        },
        searchAndUpdate = function (search, options) {
            $(search).each(function () {
                objects.checks.push(new Check({'source':this, 'pars':options}));
            });
        }
        ;

    /* contains default classes and data-atributes used for converting to check */
    config = {
        'findClass':'.check', //find convertables by class
        'data-title':'title', //unique data attribute for identifying and finding linked labels
        'data-default':'default', //data atribute for default value. not set = false; posible values false/true
        'convert-element':'div', //element type that replaces original element
        'convert-class':'checkbox', //className for replacement element
        'convert-checked-class':'checked', //className when replacement element is clicked
        'convert-label-class':'clickIcon' //class added to linked label
    };

    p.config = function (newConfig) {
        _.sval(config,newConfig);
    };

    p.update = function (convertOptions) {
        if (convertOptions===void(0)) {
            if (typeof(convertOptions)=='string') {
                searchAndUpdate(config['findClass'], config);
            } else {
                var options = _.nval(config, convertOptions);
                searchAndUpdate(options['findClass'], options);
            }
        } else {
            searchAndUpdate(convertOptions, config);
        }
    };

    p.get=function(nameMe){if(accessible[nameMe]!==void(0)){return accessible[nameMe]['value'];}else{return false;}};p.set=function(nameMe,value){if(accessible[nameMe]!==void(0) && accessible[nameMe]['changable']){accessible[nameMe]['value']=value;return true;}else{return false;}};p.parent=parent;if(typeof(d)!='undefined'){_.sval(config,d);};create();
};

/* Conversion class.
 *
 *  method:
 *   value() - returns if checked
 *
 * */

var Check = function(d) {
    if(parent===void(0)){parent=false;};var p=this,settings={},elements={},body=false,config={default:false, body:document.body,'source':false, pars:false},data={value:false},accessible={},objects={},publish=function(nameMe,resource,changable){if(changable===void(0)){canChange=false;}else{canChange=changable;};if(accessible[nameMe]!==void(0)){if(changable!==void(0)){accessible[nameMe]['changable']=canChange;}}else{accessible[nameMe]={'changable':canChange}};accessible[nameMe]['value']=resource;},
        create = function () {
            if (!config.source) {return false;}
            $(config.source).data('check', p);

            config.default = $(config.source).data(config.pars['data-default']);

            if (config.default==null && config.source.checked!=='undefined') {
                config.default=config.source.checked;
            } else {
                if (config.default == null || config.default == "false") {
                    config.default = false;
                } else {
                    config.default = true;
                }
            }

            _.con(config.source.checked);
            config.source.value = p.value;

            config.source.style.display = 'none';

            elements.div = _(config.pars['convert-element'], {className:config.pars['convert-class'], onclick:checkMe});

            if (config.default==true) {
                data.value = true;
                $(elements.div).addClass(config.pars['convert-checked-class']);
            }

            $("label[for=" + $(config.source).data(config.pars['data-title']) + "]").each(function () {
                $(this).click(checkMe);
                $(this).addClass(config.pars['convert-label-class']);
            });

            config.source.parentNode.insertBefore(elements.div,config.source);

        },
        checkMe = function () {
            if (data.value) {
                $(elements.div).removeClass(config.pars['convert-checked-class']);
                data.value = false;
                config.source.value = false;
                config.source.checked = false;
            } else {
                $(elements.div).addClass(config.pars['convert-checked-class']);
                data.value = true;
                config.source.value = true;
                config.source.checked = true;
            }
        };

    p.value = function () {
        return data.value;
    };

    p.get=function(nameMe){if(accessible[nameMe]!==void(0)){return accessible[nameMe]['value'];}else{return false;}};p.set=function(nameMe,value){if(accessible[nameMe]!==void(0) && accessible[nameMe]['changable']){accessible[nameMe]['value']=value;return true;}else{return false;}};p.parent=parent;if(typeof(d)!='undefined'){_.sval(config,d);};create();
};

var checkbox;
$(function () {
    checkbox = new Checks();
});
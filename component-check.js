/*
 v1.0 by Aivis Lisovskis (c)
*/

/* contains default classes and data-atributes used for converting to stdCheck */
var CheckKeys = {
    'findClass':'check', //find convertables by class
    'data-title':'title', //unique data attribute for identifying and finding linked labels
    'data-default':'default', //data atribute for default value. not set = false; posible values false/true
    'convert-element':'div', //element type that replaces original element
    'convert-class':'checkbox', //className for replacement element
    'convert-checked-class':'checked', //className when replacement element is clicked
    'convert-label-class':'clickIcon' //class added to linked label
};

/* example HTML
 <div class="check" data-default="true" id="sameasbilling" data-title="sameasbilling"></div><label for="sameasbilling">Sama as billing</label>
 */

/* Contains all checkboxes that is converted*/
var CheckLib = {};

/* Conversion class.
 *
 *  method:
 *   value() - returns if checked
 *
 * */

var Check = function(d) {
    if(parent===void(0)){parent=false;};var p=this,settings={},elements={},body=false,config={default:false, body:document.body,'source':false},data={value:false},accessible={},objects={},publish=function(nameMe,resource,changable){if(changable===void(0)){canChange=false;}else{canChange=changable;};if(accessible[nameMe]!==void(0)){if(changable!==void(0)){accessible[nameMe]['changable']=canChange;}}else{accessible[nameMe]={'changable':canChange}};accessible[nameMe]['value']=resource;},
        create = function () {
            if (!config.source) {return false;}
            $(config.source).data('check', p);

            config.default = $(config.source).data(CheckKeys['data-default']);

            if (config.default==null || config.default=="false") {
                config.default = false;
            } else {
                config.default = true;
            }

            config.source.value = p.value;

            config.source.style.display = 'none';

            elements.div = _(CheckKeys['convert-element'], {className:CheckKeys['convert-class'], onclick:checkMe});

            if (config.default==true) {
                data.value = true;
                $(elements.div).addClass(CheckKeys['convert-checked-class']);
            }

            $("label[for=" + $(config.source).data(CheckKeys['data-title']) + "]").each(function () {
                $(this).click(checkMe);
                $(this).addClass(CheckKeys['convert-label-class']);
            });

            config.source.parentNode.insertBefore(elements.div,config.source);

        },
        checkMe = function () {
            if (data.value) {
                $(elements.div).removeClass(CheckKeys['convert-checked-class']);
                data.value = false;
            } else {
                $(elements.div).addClass(CheckKeys['convert-checked-class']);
                data.value = true;
            }
        };

    p.value = function () {
        return data.value;
    };

    p.get=function(nameMe){if(accessible[nameMe]!==void(0)){return accessible[nameMe]['value'];}else{return false;}};p.set=function(nameMe,value){if(accessible[nameMe]!==void(0) && accessible[nameMe]['changable']){accessible[nameMe]['value']=value;return true;}else{return false;}};p.parent=parent;if(typeof(d)!='undefined'){_.sval(config,d);};create();
};

/*

 finds all elements cvontaining "transformation" class;
 original elements has new method - value() that returns if checked;

 $('.' + CheckKeys['findClass']).each (function () {
 console.info($(this).data(CheckKeys['data-title']) + ":" + this.value());
 })

 */
$(function () {
    $('.check').each(function () {
        CheckLib[$(this).data[CheckKeys['data-title']]] = new Check({'source':this});
    });
});
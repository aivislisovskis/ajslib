/*
    v.1.0 by Aivis Lisovskis (c)
*/

var MyClass = function () {
    if(parent===void(0)){parent=false;};var p=this,className='MyClass',settings={},events={},elements={},body=false,config={'assign':{'ref':'#search'}},data={},accessible={},objects={},publish=function(nameMe,resource,changable){if(changable===void(0)){canChange=false;}else{canChange=changable;};if(accessible[nameMe]!==void(0)){if(changable!==void(0)){accessible[nameMe]['changable']=canChange;}}else{accessible[nameMe]={'changable':canChange}};accessible[nameMe]['value']=resource;},        assign = function (list, from, toThe) {for (var a in list) {$(list[a], from).each (function (){toThe[a] = this;});}},
        create = function () {

        };


    p.get=function(nameMe){if(accessible[nameMe]!==void(0)){return accessible[nameMe]['value'];}else{return false;}};p.set=function(nameMe,value){if(accessible[nameMe]!==void(0) && accessible[nameMe]['changable']){accessible[nameMe]['value']=value;return true;}else{return false;}};p.parent=parent;if(typeof(d)!='undefined'){_.sval(config,d);};    if (config.assign!==void(0)) {if (config.body===void(0)) {config.body = document.body;}assign(config.assign, config.body, elements);}create();
};

// if singleton then:

var myClass;

$(function () {
   myClass = new MyClass();
});

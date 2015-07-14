var Activatable = function () {
    if(parent===void(0)){parent=false;};var p=this,className='Actvatable',settings={},events={},elements={},body=false,config={},data={groups:{}},accessible={},objects={},publish=function(nameMe,resource,changable){if(changable===void(0)){canChange=false;}else{canChange=changable;};if(accessible[nameMe]!==void(0)){if(changable!==void(0)){accessible[nameMe]['changable']=canChange;}}else{accessible[nameMe]={'changable':canChange}};accessible[nameMe]['value']=resource;},
        create = function () {


        },
        upgrade = function () {
            var group = $(this).data('group');
            if (group==false) {
                new ActivatableItem({body: this}, p);
            } else {
                if (data.groups[group]===void(0)) {
                    data.groups[group] = [];
                }
                data.groups[group].push(new ActivatableItem({body: this}, p));
            }
        }
        ;

    p.unselectGroup = function (group) {
        for (var a=0; a<data.groups[group].length; a++) {
            data.groups[group][a].close();
        }
    };

    p.render = function (selector) {
        $(selector).each(upgrade)
    };

    p.get=function(nameMe){if(accessible[nameMe]!==void(0)){return accessible[nameMe]['value'];}else{return false;}};p.set=function(nameMe,value){if(accessible[nameMe]!==void(0) && accessible[nameMe]['changable']){accessible[nameMe]['value']=value;return true;}else{return false;}};p.parent=parent;if(typeof(d)!='undefined'){_.sval(config,d);};create();
};

// if singleton then:

var activatable;

$(function () {
    activatable = new Activatable();
});

var ActivatableItem = function (d, parent) {
    if(parent===void(0)){parent=false;};var p=this,className='ActvatableItem',settings={},events={},elements={},body=false,config={},data={state:false, group:false},accessible={},objects={},publish=function(nameMe,resource,changable){if(changable===void(0)){canChange=false;}else{canChange=changable;};if(accessible[nameMe]!==void(0)){if(changable!==void(0)){accessible[nameMe]['changable']=canChange;}}else{accessible[nameMe]={'changable':canChange}};accessible[nameMe]['value']=resource;},
        create = function () {
            body = config.body;

            body.activation = activation;
            data.group = $(body).data('group');

            extract();
            upgrade()
        },
        extract = function () {
            data.dafault = $(body).data('active');
            data.state = data.default;
            data.event = $(body).data('method');
        },
        upgrade = function () {
            body[data.event] = onHappened;
        },
        activation = function () {
            onHappened();
        },
        onHappened = function () {
            if (data.group) {
                parent.unselectGroup(data.group);
            }
            if (data.state == true) {
                data.state = false;
                $(body).removeClass('active');
            } else {
                data.state = true;
                $(body).addClass('active');
            }
        }
        ;

    p.close = function () {
        data.state = false;
        $(body).removeClass('active');
    };

    p.get=function(nameMe){if(accessible[nameMe]!==void(0)){return accessible[nameMe]['value'];}else{return false;}};p.set=function(nameMe,value){if(accessible[nameMe]!==void(0) && accessible[nameMe]['changable']){accessible[nameMe]['value']=value;return true;}else{return false;}};p.parent=parent;if(typeof(d)!='undefined'){_.sval(config,d);};create();
};
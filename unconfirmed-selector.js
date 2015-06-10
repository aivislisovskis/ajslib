/*

Selector containing two lists - selected and unselected (exportpull admin, selection from articles what to display as first)

 */

var Selector = function(d) {
    if(parent===void(0)){parent=false;};var p=this,settings={},elements={},body=false,config={body:document.body, 'instanceName':'defaultList'},data={touch:false},accessible={},objects={'items':{},'unselected':false,'selected':false},publish=function(nameMe,resource,changable){if(changable===void(0)){canChange=false;}else{canChange=changable;};if(accessible[nameMe]!==void(0)){if(changable!==void(0)){accessible[nameMe]['changable']=canChange;}}else{accessible[nameMe]={'changable':canChange}};accessible[nameMe]['value']=resource;},
        create = function () {
            objects.selected = new SelectorList({'type':'selected', body:$('.' + config.instanceName + 'List .rightSelector')[0]},p);
            objects.unselected = new SelectorList({'type':'unselected', body:$('.' + config.instanceName + 'List .leftSelector')[0]},p);
            publish('selected', objects.selected);
            publish('unselected', objects.unselected);
            publish('movable', config.movable);

            $('.' + config.instanceName + 'List .selectItems').each(readItem);
        },
        readItem = function () {
            var item = new SelectorItem({body:this}, p);
            objects.items[item.id] = item;
        }
        ;

    p.export = function () {
       return objects.selected.getList();
    };

    p.get=function(nameMe){if(accessible[nameMe]!==void(0)){return accessible[nameMe]['value'];}else{return false;}};p.set=function(nameMe,value){if(accessible[nameMe]!==void(0) && accessible[nameMe]['changable']){accessible[nameMe]['value']=value;return true;}else{return false;}};p.parent=parent;if(typeof(d)!='undefined'){_.sval(config,d);};create();
};

var SelectorList = function(d, parent) {
    if(parent===void(0)){parent=false;};var p=this,settings={},elements={},body=false,config={body:document.body, type:'selected'},data={touch:false},accessible={},objects={order:false,'list':{}},publish=function(nameMe,resource,changable){if(changable===void(0)){canChange=false;}else{canChange=changable;};if(accessible[nameMe]!==void(0)){if(changable!==void(0)){accessible[nameMe]['changable']=canChange;}}else{accessible[nameMe]={'changable':canChange}};accessible[nameMe]['value']=resource;},
        create = function () {
            objects.order = new SA();
            body = config.body;
        };

    p.addItem = function (item) {
        if (config.type=='selected') {
            parent.get('unselected').removeItem(item);
        } else {
            parent.get('selected').removeItem(item);
        }

        objects.order.add(item, item.id);

        objects.list[item.id] = item;

        item.moveTo(body);
    };

    p.removeItem = function (item) {
        objects.order.remove(item.id);
        delete(objects.list[item.id]);
    };

    p.getList = function () {
        var list = [];
        /*
        for (a in objects.list) {
            list.push(a);
        }
        */

        for (var a = 0; a<objects.order.length(); a++) {
            var item = objects.order.next();
            list.push(item.id);
        }

        return list;
    };

    p.get=function(nameMe){if(accessible[nameMe]!==void(0)){return accessible[nameMe]['value'];}else{return false;}};p.set=function(nameMe,value){if(accessible[nameMe]!==void(0) && accessible[nameMe]['changable']){accessible[nameMe]['value']=value;return true;}else{return false;}};p.parent=parent;if(typeof(d)!='undefined'){_.sval(config,d);};create();
};

var SelectorItem = function(d, parent) {
    if(parent===void(0)){parent=false;};var p=this,settings={},elements={toAdd:false},body=false,config={body:document.body},data={touch:false},accessible={},objects={'albums':[]},publish=function(nameMe,resource,changable){if(changable===void(0)){canChange=false;}else{canChange=changable;};if(accessible[nameMe]!==void(0)){if(changable!==void(0)){accessible[nameMe]['changable']=canChange;}}else{accessible[nameMe]={'changable':canChange}};accessible[nameMe]['value']=resource;},
        create = function () {
            body = config.body;

            data.status = $(body).data('status');
            data.id = $(body).data('value');
            p.id = data.id;

            selectSide();
            createControls();
        },
        selectSide = function () {
            if (data.status=='available') {
                parent.get('unselected').addItem(p);
            } else {
                parent.get('selected').addItem(p);
            }
        },
        createControls = function () {
            if (elements.toAdd==false) {elements.toAdd = _('div', {'className':'add btn btn-primary', onclick:addTo, app:body})}
            if (data.status=='available') {
                elements.toAdd.className = 'add btn btn-primary';
                elements.toAdd.innerHTML = 'Add';
            } else {
                elements.toAdd.className = 'remove btn btn-primary';
                elements.toAdd.innerHTML = 'Remove';
            }
        },
        addTo = function () {
            if (data.status=='available') {
                data.status = 'selected';
            } else {
                data.status = 'available';
            }
            selectSide();
            createControls();
        };

    p.moveTo = function(node) {
        node.appendChild(body);
    };

    p.get=function(nameMe){if(accessible[nameMe]!==void(0)){return accessible[nameMe]['value'];}else{return false;}};p.set=function(nameMe,value){if(accessible[nameMe]!==void(0) && accessible[nameMe]['changable']){accessible[nameMe]['value']=value;return true;}else{return false;}};p.parent=parent;if(typeof(d)!='undefined'){_.sval(config,d);};create();
};
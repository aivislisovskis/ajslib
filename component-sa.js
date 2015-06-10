/*
 v.2.0 by Aivis Lisovskis (c)
*/

var SA = function (d) {
    //======= DECLARE PRIVATE VARIABLES&METHODS PHASE
    var p = this,
        config = {'list':false}, //configurable options
        data = {'array':{},'count':0,position:false,keys:[], numbered:0, pointer:false}, //inner data storage
        accessible = { //publicaly acessible data storage
            'test':{'value':true,'changable':true}
        },
        create = function () { //initialization function
            if (config.list!==false) {
                read();
            } else {
                config.list = {};
            }

            publish('list',data.array,false);
        },
        read = function () {
            if (typeof(config.list)=='Object') {readObject();} else {readArray();}
        },
        readObject = function () {
            for (var a in config.list) {
                add(config.list[a],a);
            }
        },
        readArray = function () {
            for (var a=0; a<config.list.length; a++) {
                add(config.list[a],a);
            }
        },
        next = function (onlyReturn) {
            if (onlyReturn===void(0)) {onlyReturn=false;}
            var result;
            if (data.pointer===false) {
                if (!onlyReturn) {
                    result=point()
                } else {
                    return false;
                }
            } else {
                if (data.pointer==lastKeyPosition()) {
                    if (!onlyReturn) {
                        result=point();
                    } else {
                        result=valueByInnerKey(0);
                    }
                } else {
                    if (!onlyReturn) {
                        data.pointer++; result=currentValue();
                    } else {
                        var previewPointer = data.pointer+1;
                        result=valueByInnerKey(previewPointer);
                    }
                }
            }
            return result;
        },
        previous = function (onlyReturn) {
            if (onlyReturn===void(0)) {
                onlyReturn=false;
            }
            var result;
            if (data.pointer===false) {
                if (!onlyReturn) {
                    result=last()
                } else {
                    return false
                }
            } else {
                if (data.pointer<1) {
                    if (!onlyReturn) {
                        result=last();
                    } else {
                        result=valueByInnerKey(lastKey());
                    }
                } else {
                    if (!onlyReturn) {
                        data.pointer--; result=currentValue();
                    } else {
                        var previewPointer = data.pointer-1;
                        result=valueByInnerKey(previewPointer);
                    }
                }
            }
            return result;
        },
        add = function (value, key) {
            if (typeof(key)!='undefined') {
                if (searchKey(key)===false) {
                    data.keys.push(key);
                    data.count++;
                }

                data.array[key]=value;

                if (isInt(key) && data.numbered<key) {
                    data.numbered=key;
                }
            } else {
                data.numbered++;
                data.array[data.numbered]=value;
                data.keys.push(data.numbered);
                data.count++;
            }
        },
        searchKey = function(key) {
            if (data.array[key]!==void(0)) {return data.array[key];} else {return false;}
        },
        isInt = function (value){
            return ((Number(value)>=0) && (Math.round(value)==value))?true:false;
        },
        remove = function (key) {
            if (searchKey(key)!==false) {
                delete data.array[key];
                if (isInt(key) && (data.numbered==key)) {
                    data.numbered--;
                }
                data.count--;
                data.removeKey(key);
            }
        },
        removeKey = function (key) {
            for (var a=0; a<data.keys.length; a++) {
                if (data.keys[a]==key) {
                    data.keys.splice(a,1);
                    return true;
                }
            }
            return false;
        },
        merge = function (list, harsh) {
            if (harsh===void(0)) {harsh = false}  //true - replace existing keys
            if (typeof(list)=='object') {
                for(var a in list) {
                    if (searchKey(a) && !harsh) {
                        add(list[a]);
                    } else {
                        add(list[a],a);
                    }
                }

                return true;
            } else {
                return false;
            }
        },
        searchKeyPosition = function (value) {
            for (var a=0; a<data.keys.length; a++) {
                if (data.keys[a]==value) { return a; }
            }
            return false;
        },
        last = function () {
            data.pointer = lastKeyPosition();
            return currentValue();
        },
        lastKey = function () {
            return data.keys[lastKeyPosition()];
        },
        lastKeyPosition = function () {
            return data.keys.length-1;
        },
        valueByInnerKey = function (key) {
            if (key===void(0)) {
                return currentValue();
            }
            if ([key]!==void(0) && data.array[data.keys[key]]!=void(0)) {
                return data.array[data.keys[key]];
            }
            return false;
        },
        first = function () {
            return point();
        },
        point = function (key) {
            if (key!==void(0)) {
                if (searchKey(key)!==false) {
                    data.pointer=searchKeyPosition(key);
                    return currentValue();
                }
            } else {
                data.pointer=0;
                return currentValue();
            }

            return false;
        },
        currentKey = function () {
            if (data.pointer!==false) {
                return data.keys[data.pointer];
            }
            return false;
        },
        currentValue = function () {
            if (data.pointer!==false) {
                return data.array[data.keys[data.pointer]];
            }
            return false;
        },
        publish = function (nameMe, resource, changable) {  // create/change public variable
            var canChange;
            if (changable===void(0)) {
                canChange = false;
            } else {
                canChange = changable;
            }

            if (accessible[nameMe]!==void(0)) {
                if (changable!==void(0)) {
                    accessible[nameMe]['changable'] = canChange;
                }
            } else {
                accessible[nameMe] = {'changable':canChange}
            }

            accessible[nameMe]['value'] = resource;
        };
    // >============= PRIVATE CUSTOM METHODS


    //======= DECLARE PUBLIC VARIABLES&METHODS PHASE

    //--> CUSTOM

    p.first = first;
    p.next = next;
    p.prev = previous;
    p.remove = remove;
    p.removeKey = removeKey;
    p.current = currentValue;
    p.key = currentKey;
    p.merge = merge;
    p.add = add;
    p.read = read;
    p.point = point;
    p.goTo =

        p.each = function(fx) {
            for (var a=0; a<data.keys.length; a++) {
                fx(data.array[data.keys[a]], data.keys[a]);
            }
        };

    p.length = function () {
        return data.keys.length;
    };

    //--> PREDEFINED

    p.get = function (nameMe) { // read public variable
        if (accessible[nameMe]!==void(0)) {
            return accessible[nameMe]['value'];
        } else {
            return false;
        }
    };

    p.set = function (nameMe, value) { // set public variable
        if (accessible[nameMe]!==void(0) && accessible[nameMe]['changable']) {
            accessible[nameMe]['value'] = value;
            return true;
        } else {
            return false;
        }
    };

    //======== INIT PHASE

    if (typeof(d)!='undefined') {
        _.sval(config,d); //set/override config options
    }

    create();
};

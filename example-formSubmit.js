var MyForm = function () {
    if(parent===void(0)){parent=false;};var p=this,className='myForm',settings={},events={},elements={},body=false,config={},data={},accessible={},objects={},publish=function(nameMe,resource,changable){if(changable===void(0)){canChange=false;}else{canChange=changable;};if(accessible[nameMe]!==void(0)){if(changable!==void(0)){accessible[nameMe]['changable']=canChange;}}else{accessible[nameMe]={'changable':canChange}};accessible[nameMe]['value']=resource;},
        create = function () {
            config = site.registerScript(className);
            elements = site.readEsentials(className);

            elements.button.onclick = trySubmit;
        },
        validateFields = function() {

            var session = error.startForm();

            //--> validate fields!
            error.validate(elements.mail, session);
            error.validate(elements.password, session);
            //--<

            return error.endForm(session);

        },
        onCompleted = function (re) {
            site.r();
        },
        trySubmit = function () {
            if (validateFields()) {
                var fields = site.createData(className);
                connection.post(className, fields, onCompleted)
            }
        }
        ;

    p.get=function(nameMe){if(accessible[nameMe]!==void(0)){return accessible[nameMe]['value'];}else{return false;}};p.set=function(nameMe,value){if(accessible[nameMe]!==void(0) && accessible[nameMe]['changable']){accessible[nameMe]['value']=value;return true;}else{return false;}};p.parent=parent;if(typeof(d)!='undefined'){_.sval(config,d);};create();
};

$(function () {
    site.g.myForm = new MyForm();
});
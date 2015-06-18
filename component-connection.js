/*
    v1.2 by Aivis Lisovskis (c)

    changelog:
    1.2 - @2015.06.11
        added config (config, connectionSettings);
        repaired on error default behaviour
        changed texts to english
    1.1.1 - @2015.06.11
        added 'fail' to post.
    1.1 - @2015.05.19
        addded global "post" to generalise function calls

*/

var Connection = function (d) {
    var config = {'destination':'/ajax/', 'dataType':'json', 'type':'POST', 'debug':false, 'alert':alert};
    var p = this,
        data = {
            'networkError':false,
            'connectionId':false
        },
    /* create instance, save connection Id. Without connection id nothing ever happens */

        request = function (method,params, re, fail) {
            if (fail === void(0) || fail === null) {
                fail = errorCatch;
            }

            $.ajax({'url':config.destination + method,'data':params,'type':config.type,'dataType':config.dataType,success:function(resp) {if (typeof(resp.error) != 'undefined' && resp.error!=false) {config.alert(resp); return false;}; re(resp);}, error:fail})
        },
        errorAlert = function (resp) {
            alert(resp.error);
        },
        errorCatch = function (resp, status, error) {

            if (config.debug) {
                _.con(status);
                _.con(resp);
                _.con(error);
            }

            if (resp.readyState==0) {
                data.networkError = true;
                _.con('Network problems, please wait!');
            } else {
                _.con('Error in request!');
            }
        };

    p.post = function(to, par, re, fail) {
        if (typeof(re)=='undefined') {re = function () {};}
        if (typeof(par)=='undefined') {par = {};}
        if (typeof(fail)=='undefined') {fail = null}

        request(to.toLowerCase(), par, re, fail);
    };

    if (d!==void(0)) {_.sval(config, d);}

    p.config = function (connectionSettings) {
        _.sval(config,connectionSettings);
    };
};

var connection;

$(function () {
    connection = new Connection();
});

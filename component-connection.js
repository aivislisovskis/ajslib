/*
    v1.1 by Aivis Lisovskis (c)

    changelog:
    1.1 - @2015.05.19
        addded global "post" to generalise function calls

*/

var Connection = function () {
    var p = this,
        data = {
            'networkError':false,
            'connectionId':false
        },
    /* create instance, save connection Id. Without connection id nothing ever happens */

        request = function (method,params, re, fail) {
            if (fail === void(0)) {
                fail = errorCatch;
            }

            $.ajax({'url':'/ajax/' + method,'data':params,'type':'POST','dataType':'json',success:function(resp) {if (data.networkError) {global.popUp.close();data.networkError = false;}; if (typeof(resp.error) != 'undefined' && resp.error!=false) {errorAlert(resp); return false;}; re(resp);}, error:fail})
        },
        errorAlert = function (resp) {
            alert(resp.error);
        },
        errorCatch = function (resp, status, error) {

            //   _.con(status);
            //   _.con(resp);
            //   _.con(error);

            if (resp.readyState==0) {
                data.networkError = true;
                _.con('Tīkla problēmas. Lūdzu uzgaidiet!');
            } else {
                _.con('Kļūdains pieprasījums!');
            }
        };

    p.post = function(to, par, re) {
        if (typeof(re)=='undefined') {re = function () {};}
        if (typeof(par)=='undefined') {par = {};}

        request(to.toLowerCase(), par, re);
    };
};

var connection;

$(function () {
    connection = new Connection();
});

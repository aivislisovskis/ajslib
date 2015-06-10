var Social = function () {
    if(parent===void(0)){parent=false;};var p=this,settings={},elements={},body=false,config={body:document.body},data={touch:false},accessible={},objects={'albums':[]},publish=function(nameMe,resource,changable){if(changable===void(0)){canChange=false;}else{canChange=changable;};if(accessible[nameMe]!==void(0)){if(changable!==void(0)){accessible[nameMe]['changable']=canChange;}}else{accessible[nameMe]={'changable':canChange}};accessible[nameMe]['value']=resource;},
        create = function () { //initialization function
        };

    p.facebook = function (link) {
        FB.ui({
            method: 'share',
            href: 'http://cipsi.lv/karalis'
        }, function(response){});
    };

    p.google = function (link) {
        window.open('https://plus.google.com/share?url=' + link,'', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600');
    };

    p.draugiem = function( title, url, titlePrefix ){
        titlePrefix = 'Esmu Atpūtas karalis!';
        window.open(
            'http://www.draugiem.lv/say/ext/add.php?title=' + encodeURIComponent('Pievienojies man karaliskajā atpūtā arī Tu, ienāc http://cipsi.lv/karalis!') +
                '&link=' + encodeURIComponent( 'http://cipsi.lv/karalis' ) +
                ( titlePrefix ? '&titlePrefix=' + encodeURIComponent( titlePrefix ) : '' ),
            '',
            'location=1,status=1,scrollbars=0,resizable=0,width=530,height=400'
        );
        return false;
    };

    p.draugiemInner = function(){
        var titlePrefix = 'Esmu Atpūtas karalis!';

        var title = $(this).data('title');
        var url = $(this).data('href');

        window.open(
            'http://www.draugiem.lv/say/ext/add.php?title=' + encodeURIComponent( 'Pievienojies man karaliskajā atpūtā arī Tu, ienāc http://cipsi.lv/karalis!') +
                '&link=' + encodeURIComponent( 'http://cipsi.lv/karalis' ) +
                ( titlePrefix ? '&titlePrefix=' + encodeURIComponent( titlePrefix ) : '' ),
            '',
            'location=1,status=1,scrollbars=0,resizable=0,width=530,height=400'
        );
        return false;
    };


    p.facebookInner = function () {
        FB.ui({
            method: 'share',
            href: $(this).data('href')
        }, function(response){});
    };

    p.get=function(nameMe){if(accessible[nameMe]!==void(0)){return accessible[nameMe]['value'];}else{return false;}};p.set=function(nameMe,value){if(accessible[nameMe]!==void(0) && accessible[nameMe]['changable']){accessible[nameMe]['value']=value;return true;}else{return false;}};p.parent=parent;if(typeof(d)!='undefined'){_.sval(config,d);};create();
};

var social = new Social();
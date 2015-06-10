/* 2015.04.17 - Added nval */

var ___STD_CLASS = false;

var __STD_XPN = function () {};

var ___STD_CLASS_CORE = function () {

    var p = this;
    p.IE = navigator.userAgent.indexOf("MSIE")!=-1;

    p._ = function (elm,params){

        var p = this;

        if (params==false) {
            if (typeof(elm)!='object') {return document.getElementById(elm)} else {if (p.IE) {__STD_XPN(elm)} else {elm}}
        } else if (elm!=false){

            var m = document.createElement(elm);
            for (var a in params)	{
                switch (a) {
                    case "style":
                        var b;
                        for (b in params[a]){
                            if (b=="float")  {
                                m.style['styleFloat']=m.style['cssFloat']=params['float'][b];
                            } else {
                                m.style[b]=params[a][b];
                            }
                        }
                        break;
                    case "apc":
                        p.apc.apply(m,[params[a]]);
                        break;
                    case "app":
                        p.apc.apply(params[a],[m]);
                        break;
                    default:
                        m[a]=params[a];
                }
            }
            m.apc = p.apc;
            if (p.IE) {__STD_XPN(m);}
            return m;
        } else {
            return p;
        }
    };

    p.apc = function (nod) {
        if (typeof(nod)=='undefined' || nod==null || nod=='null' || nod=="") {nod="";}
        var z=typeof(nod);
        if (z=="string" || z=='number' || z=='function'){
            this.appendChild(document.createTextNode(nod));
        } else if (nod instanceof Array)
        {
            for (var a in nod)
            {
                var za=typeof(nod[a]);
                if (za=="string" || za=='number'){
                    this.appendChild(document.createTextNode(nod[a]));
                } else {
                    if (za=="object") {
                        this.appendChild(nod[a]);
                    }
                }
            }
        } else {
            this.appendChild(nod);
        }
        return this;
    };

    p.method = {

        'formatTime':function (d) {

            var seconds = d % 60;
            if (seconds<10) {seconds = "0" + seconds}
            var min = Math.floor(d / 60);
            var minutes = min % 60;
            if (minutes<10) {minutes = "0" + minutes}
            min = Math.floor(min/60);
            var hours = min;
            if (hours<10) {hours = "0" + hours}

            return hours + ":" + minutes + ":" + seconds;

        },

        'con':function (d, strict) {
            if (typeof(console)!='undefined') {
                console.info(d);
            } else {
                if (typeof(strict)!='undefined' && strict==true) {
                    alert(d);
                }
            }
        },

        'sval':function(to,from) {

            for (var a in from) {
                to[a] = from[a];
            }

        },
        'nval':function(to,from) {

            var newTo = {};

            for (var a in to) {
                newTo[a] = to[a];
            }

            for (var a in from) {
                newTo[a] = from[a];
            }

            return newTo;

        },

        'shuffle':function (input) {

            var subsort = [];
            for (var a = 0; a<input.length; a++) {
                subsort.push(input[a]);
            }

            var i = subsort.length;
            var k = subsort.length;

            while (--i) {
                var j = Math.floor(Math.random() * (k-1));
                var temp = subsort[i];
                subsort[i] = subsort[j];
                subsort[j] = temp;
            }

            return subsort;

        }

    };

};

_ = function (par1, par2) {

    if (!___STD_CLASS) {

        ___STD_CLASS = new ___STD_CLASS_CORE();
        for (var a in ___STD_CLASS.method) {
            _[a] =  ___STD_CLASS.method[a];
        }

    }

    if (typeof(par1)!='undefined') {
        if (typeof(par2)=='undefined') {par2 = false}
        return ___STD_CLASS._(par1, par2);
    } else {
        return ___STD_CLASS.IE;
    }

};

_();

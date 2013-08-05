/**
 * Magpie 2.4.3
 * Bazaarvoice Analytics Client
 *
 * Acknowledgements:
 *
 * ///////////////////////////////////////////////////////////////////////////////////////////////
 *
 * lib/rison:
 *
 * Rison
 * the stringifier is based on http://json.org/json.js as of 2006-04-28 from json.org
 * the parser is based on http://osteele.com/sources/openlaszlo/json
 *
 * ///////////////////////////////////////////////////////////////////////////////////////////////
 *
 * requirejs, require, define
 *
 * almond 0.0.3 Copyright (c) 2011, The Dojo Foundation All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: http://github.com/jrburke/almond for details
 *
 * ///////////////////////////////////////////////////////////////////////////////////////////////
 *
 * lib/has:
 *
 * Tentatively, has.js is available under the Academic Free License, New BSD License, and the MIT License.
 *
 * ///////////////////////////////////////////////////////////////////////////////////////////////
 *
 * lib/cookie:
 *
 * Copyright (c) 2005-2011, The Dojo Foundation
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 *   * Redistributions of source code must retain the above copyright notice, this
 *     list of conditions and the following disclaimer.
 *   * Redistributions in binary form must reproduce the above copyright notice,
 *     this list of conditions and the following disclaimer in the documentation
 *     and/or other materials provided with the distribution.
 *   * Neither the name of the Dojo Foundation nor the names of its contributors
 *     may be used to endorse or promote products derived from this software
 *     without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED.  IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE
 * FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
 * DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
 * CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
 * OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 * ///////////////////////////////////////////////////////////////////////////////////////////////
 *
 * lib/random
 *
 * Copyright (C) 2010 by Johannes Baagøe <baagoe@baagoe.org>
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

;(function() {
var requirejs,require,define;(function(a){function g(a,b){if(a&&a.charAt(0)==="."&&b){b=b.split("/"),b=b.slice(0,b.length-1),a=b.concat(a.split("/"));var c,d;for(c=0;d=a[c];c++)if(d===".")a.splice(c,1),c-=1;else if(d==="..")if(c!==1||a[2]!==".."&&a[0]!=="..")c>0&&(a.splice(c-1,2),c-=2);else break;a=a.join("/")}return a}function h(b,c){return function(){return f.apply(a,d.call(arguments,0).concat([b,c]))}}function i(a){return function(b){return g(b,a)}}function j(a){return function(c){b[a]=c}}function k(d){if(c.hasOwnProperty(d)){var f=c[d];delete c[d],e.apply(a,f)}return b[d]}function l(a,b){var c,d,e=a.indexOf("!");return e!==-1?(c=g(a.slice(0,e),b),a=a.slice(e+1),d=k(c),d&&d.normalize?a=d.normalize(a,i(b)):a=g(a,b)):a=g(a,b),{f:c?c+"!"+a:a,n:a,p:d}}var b={},c={},d=[].slice,e,f;if(typeof define=="function")return;e=function(d,e,f,g){var i=[],m,n,o,p,q,r;g||(g=d);if(typeof f=="function"){!e.length&&f.length&&(e=["require","exports","module"]);for(p=0;p<e.length;p++){r=l(e[p],g),o=r.f;if(o==="require")i[p]=h(d);else if(o==="exports")i[p]=b[d]={},m=!0;else if(o==="module")n=i[p]={id:d,uri:"",exports:b[d]};else if(b.hasOwnProperty(o)||c.hasOwnProperty(o))i[p]=k(o);else if(r.p)r.p.load(r.n,h(g,!0),j(o),{}),i[p]=b[o];else throw d+" missing "+o}q=f.apply(b[d],i),d&&(n&&n.exports!==a?b[d]=n.exports:m||(b[d]=q))}else d&&(b[d]=f)},requirejs=f=function(b,c,d,g){return typeof b=="string"?k(l(b,c).f):(b.splice||(c.splice?(b=c,c=arguments[2]):b=[]),g?e(a,b,c,d):setTimeout(function(){e(a,b,c,d)},15),f)},f.config=function(){return f},require||(require=f),define=function(a,b,d){b.splice||(d=b,b=[]),define.unordered?c[a]=[a,b,d]:e(a,b,d)},define.amd={jQuery:!0}})()
define("lib/rison",[],function(){"a".replace(/a/,function(){return"b"})!="b"&&function(a){String.prototype.replace=function(b,c){if(typeof c!="function")return a.apply(this,arguments);var d=""+this;if(b instanceof RegExp){var f=b,g=[],h=f.lastIndex,i;while((i=f.exec(d))!=null){var e=i.index,j=i.concat(e,d);g.push(d.slice(h,e),c.apply(null,j).toString());if(!f.global){h+=RegExp.lastMatch.length;break}h=f.lastIndex}return g.push(d.slice(h)),g.join("")}var e=d.indexOf(b);return e==-1?d:a.apply(d,[b,c(b,e,d)])}}(String.prototype.replace);var a={};return a.uri_ok={"~":!0,"!":!0,"*":!0,"(":!0,")":!0,"-":!0,_:!0,".":!0,",":!0,":":!0,"@":!0,$:!0,"'":!0,"/":!0},function(){var b=[];for(var c=0;c<16;c++)for(var d=0;d<16;d++){if(c+d===0)continue;var e=String.fromCharCode(c*16+d);/\w|[\-_.\/~]/.test(e)||b.push("\\u00"+c.toString(16)+d.toString(16))}a.not_idchar=b.join("")}(),a.not_idchar=" \t\r\n\"<>\\[\\]{}'!=:(),*@$;&",a.not_idstart="-0123456789",function(){var b="[^"+a.not_idstart+a.not_idchar+"][^"+a.not_idchar+"]*";a.id_ok=new RegExp("^"+b+"$"),a.next_id=new RegExp(b,"g")}(),a.quote=function(b){var c=a.uri_ok;return/^[A-Za-z0-9_\-]*$/.test(b)?b:(b=b.replace(/([^A-Za-z0-9_\-])/g,function(a,b){var d=c[b];return d?b:encodeURIComponent(b)}),b.replace(/%20/g,"+"))},function(){var b={"'":!0,"!":!0},c={array:function(a){var b=["!("],d,e,f,g=a.length,h;for(f=0;f<g;f+=1)h=a[f],e=c[typeof h],e&&(h=e(h),typeof h=="string"&&(d&&(b[b.length]=","),b[b.length]=h,d=!0));return b[b.length]=")",b.join("")},"boolean":function(a){return a?"!t":"!f"},"null":function(a){return"!n"},number:function(a){return isFinite(a)?String(a).replace(/\+/,""):"!n"},object:function(a){if(a){if(a instanceof Array)return c.array(a);if(typeof a.__prototype__=="object"&&typeof a.__prototype__.encode_rison!="undefined")return a.encode_rison();var b=["("],d,e,f,g,h,i=[];for(f in a)i[i.length]=f;i.sort();for(h=0;h<i.length;h++)f=i[h],g=a[f],e=c[typeof g],e&&(g=e(g),typeof g=="string"&&(d&&(b[b.length]=","),b.push(c.string(f),":",g),d=!0));return b[b.length]=")",b.join("")}return"!n"},string:function(c){return c===""?"''":a.id_ok.test(c)?c:(c=c.replace(/(['!])/g,function(a,c){return b[c]?"!"+c:c}),"'"+c+"'")},"undefined":function(a){return"!n"}};a.encode=function(a){return c[typeof a](a)}}(),a}),define("lib/random",[],function(){function f(){return function(a){var b=0,c=0,d=0,h=1;a.length===0&&(a=e);var i=g();b=i(" "),c=i(" "),d=i(" ");for(var j=0;j<a.length;j++)b-=i(a[j]),b<0&&(b+=1),c-=i(a[j]),c<0&&(c+=1),d-=i(a[j]),d<0&&(d+=1);i=null;var k=function(){var a=2091639*b+h*2.3283064365386963e-10;return b=c,c=d,d=a-(h=a|0),d};return k.uint32=function(){return k()*4294967296},k.fract53=function(){return k()+(k()*2097152|0)*1.1102230246251565e-16},k.version="Alea 0.9",k.args=a,k.Alea=f,k}(Array.prototype.slice.call(arguments))}function g(){var a=4022871197,b=function(b){b=""+b;for(var c=0;c<b.length;c++){a+=b.charCodeAt(c);var d=.02519603282416938*a;a=d>>>0,d-=a,d*=a,a=d>>>0,d-=a,a+=d*4294967296}return(a>>>0)*2.3283064365386963e-10};return b.version="Mash 0.9",b}var a=window,b=a.navigator,c=document,d=window.location,e=[b&&b.userAgent,d&&d.href,c.referrer,(new Date).getTime(),Math.random()];return f()}),define("lib/util",["./rison","./random"],function(a,b){var c=Object.prototype.toString,d={log:function(){window.Debug&&window.Debug.writeln?Debug.writeln([].join.call(arguments,", ")):window.console&&window.console.log?window.console.log.apply(window.console,arguments):window.opera&&window.opera.postError&&window.opera.postError([].join.call(arguments,", "))},extend:function(a){var b=[].slice.call(arguments,1),c,d;for(var e in b)if(b.hasOwnProperty(e)){c=b[e];for(d in c)c.hasOwnProperty(d)&&(a[d]=c[d])}return a},buster:function(){return Math.round(Math.random()*2147483647)},isArray:Array.isArray||function(a){return c.call(a)=="[object Array]"},isFunction:function(a){return c.call(a)=="[object Function]"},isString:function(a){return c.call(a)=="[object String]"},isObject:function(a){return a===Object(a)},isNumber:function(a){return c.call(a)=="[object Number]"},isIE:function(){var a=3,b=document.createElement("div"),c=b.getElementsByTagName("i");do b.innerHTML="<!--[if gt IE "+ ++a+"]><i></i><![endif]-->";while(c[0]);return a>4?!0:!1}(),loadId:function(){var a=16,c=20,d=Math.floor(Math.random()*(c-a+1)+a),e="",f=0;while(f++<d)e+=(b()*16|0).toString(16);return e},uuid:function(){return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(a){var c=b()*16|0,d=a=="x"?c:c&3|8;return d.toString(16)})}};return d}),define("lib/jsonp",["./util"],function(a){function f(a){var b=e.createElement("script"),d=!1;b.src=a,b.async=!0,b.onload=b.onreadystatechange=function(){!d&&(!this.readyState||this.readyState==="loaded"||this.readyState==="complete")&&(d=!0,b.onload=b.onreadystatechange=null,b&&b.parentNode&&b.parentNode.removeChild(b))},c||(c=e.getElementsByTagName("head")[0]),c.appendChild(b)}function g(c,e,g){var h=(c||"").indexOf("?")===-1?"?":"&",i;return a.isFunction(e)&&(i="_bvajsonp"+ ++b,d[i]=function(a){try{delete d[i]}catch(b){d[i]=null}e(a)},f(c+h+(g||"callback")+"="+i)),i}var b=0,c,d=window,e=document;return{get:g}}),define("lib/event",[],function(){return{add:function(a,b,c,d){a.addEventListener?a.addEventListener(b,c,!!d):a.attachEvent&&a.attachEvent("on"+b,c)},remove:function(a,b,c,d){a.removeEventListener?a.removeEventListener(b,c,!!d):a.detachEvent&&a.detachEvent("on"+b,c)}}}),define("lib/cookie",[],function(){var a=function(a,b){return a.replace(/([\.$?*|{}\(\)\[\]\\\/\+\^])/g,function(a){return b&&b.indexOf(a)!=-1?a:"\\"+a})},b=function(b,c,d){var e=document.cookie,f;if(arguments.length==1){var g=e.match(new RegExp("(?:^|; )"+a(b)+"=([^;]*)"));f=g?decodeURIComponent(g[1]):undefined}else{d=d||{};var h=d.expires;if(typeof h=="number"){var i=new Date;i.setTime(i.getTime()+h*24*60*60*1e3),h=d.expires=i}h&&h.toUTCString&&(d.expires=h.toUTCString()),c=encodeURIComponent(c);var j=b+"="+c,k;for(k in d){j+="; "+k;var l=d[k];l!==!0&&(j+="="+l)}document.cookie=j}return f};return b.isSupported=function(){if(navigator.cookieEnabled)return!0;document.cookie="bvcookietest=1";var a=document.cookie.indexOf("bvcookietest=")!=-1;return document.cookie="bvcookietest=1; expires=Thu, 01-Jan-1970 00:00:01 GMT",a},b}),define("lib/browser",["./cookie"],function(a){var b=window.navigator,c=window.screen,d=document;return{host:window.location.host,ref:d.referrer,res:c?c.width+"x"+c.height:"-",lang:(b&&(b.language||b.browserLanguage)||"-").toLowerCase(),charset:d.characterSet||d.charset||"-",geo:navigator.geolocation?1:0,cookies:a.isSupported()?1:0}}),define("lib/conversion",["./util"],function(a){function j(a,b){var c=a&&a[b];return c!==null&&c!==undefined}function k(b,c){var d,e=c.length;if(a.isObject(b))for(d=0;d<e&&j(b,c[d]);d++);return d===e}function l(a){return k(a,f)}var b="Conversion",c="PII"+b,d="Transaction",e={orderId:1,affiliation:1,total:1,tax:1,shipping:1,city:1,state:1,country:1,currency:1,items:1,type:1,label:1,value:1,proxy:1,TestCase:1,TestSession:1},f=["type"],g="public_",h=function(a){var b;this._data=a,this._anonymized={},this._hasPII=!1;for(b in a)a.hasOwnProperty(b)&&(e[b]||b.indexOf(g)===0?this._anonymized[b]=a[b]:this._hasPII=!0);this._hasPII===!0&&(this._anonymized.hadPII=!0)},i=h.prototype;return i.containsPII=function(){return this._hasPII},i.getAnonymizedData=function(){return this._anonymized},i.getPIIData=function(){return this._data},{EVENT_CLASS:b,PII_EVENT_CLASS:c,create:function(a){return l(a)?new h(a):null}}}),function(a){function i(b){return typeof h[b]=="function"&&(h[b]=h[b](a,d,e)),h[b]}function j(b,c,f){h[b]=f?c(a,d,e):c}function k(a,b){var d=!1,e=a.charAt(0).toUpperCase()+a.slice(1),f=c.length,g=b.style;if(typeof g[a]=="string")d=!0;else while(f--)if(typeof g[c[f]+e]=="string"){d=!0;break}return d}function l(a){if(a)while(a.lastChild)a.removeChild(a.lastChild);return a}function m(a,c){var d=typeof a[c];return d=="object"?!!a[c]:!b[d]}var b={"boolean":1,number:1,string:1,"undefined":1},c=["Webkit","Moz","O","ms","Khtml"],d=m(a,"document")&&a.document,e=d&&m(d,"createElement")&&d.createElement("DiV"),f=!1,g=typeof module=="object"&&module,h={};i.add=j,i.clearElement=l,i.cssprop=k,i.isHostType=m,i._tests=h,i.add("dom",function(a,b,c){return b&&c&&m(a,"location")&&m(b,"documentElement")&&m(b,"getElementById")&&m(b,"getElementsByName")&&m(b,"getElementsByTagName")&&m(b,"createComment")&&m(b,"createElement")&&m(b,"createTextNode")&&m(c,"appendChild")&&m(c,"insertBefore")&&m(c,"removeChild")&&m(c,"getAttribute")&&m(c,"setAttribute")&&m(c,"removeAttribute")&&m(c,"style")&&typeof c.style.cssText=="string"});try{document.execCommand("BackgroundImageCache",!1,!0)}catch(n){}f?g&&g.exports==f?(g.exports=i).has=i:f.has=i:typeof define=="function"&&typeof define.amd=="object"&&define.amd?define("lib/has",[],function(){return i}):a.has=i}(this),define("lib/pixel",["./util","./rison","./has"],function(a,b,c){function j(a,b){var c,d,e,f,g="";a=a||[],f=a.length;for(c=0;b>0&&c<f;c++){d=a[c]||"";if(d.length+1>b){d=d.substr(0,b-1);if(d.indexOf("=")===-1)continue}e="&"+d,g+=e,b-=e.length}return g}function k(c,e){var f=null;if(c!==undefined&&e!==undefined)try{if(a.isArray(e)||a.isObject(e))c=d+c,e=b.encode(e);f=b.quote(c)+"="+b.quote(""+e)}catch(g){}return f}function l(b){var c,d,e=g[b.cl]||{},f=0,i=[],j=[],l={optional:[],longestField:null};if(!a.isObject(b))return null;for(c in b){if(!b.hasOwnProperty(c))continue;d=k(c,b[c]);if(d===null)continue;if(e&&c in e)l.optional.push(d);else{if(c in h){var m=h[c];i.length>m?i.splice(m,0,d):i.push(d)}else j.push(d);d.length>f&&(l.longestField=c,f=d.length)}}return l.required=i.concat(j).join("&"),l}var d="r_",e=2036,f=a.isIE?e:8192,g={PageView:{ref:1}},h={cl:0,loadId:1,type:2},i=function(b,c,d,e,f,g,h){var i=(c?"a":"st")+(b?".json":".gif"),j;this.anonymous=c,this.secure=d,this.hostname=e,this.protocol=d||document.location.protocol=="https:"?"https:":"http:",this._baseUrl=this.protocol+"//"+this.hostname+"/"+i,this._sharedData=f,this._brandCookies=g,this.data=h,this.tooLong=!1,this.validating=b,a.isObject(this.data)?(this.data.cl=this.data.cl||null,j=this._buildEvent(this.data),this.url=this._buildUrl({ev:j,ignoreTooLong:!1})):this.url=""};return i.MAX_URL_LENGTH=f,i.prototype._buildEvent=function(b){var c=a.extend({},this._sharedData,this._brandCookies,b);return c._=a.buster(),c},i.prototype._buildUrl=function(a){var b=a||{},c,d,e;return c=l(b.ev),c?(d=this._baseUrl+"?"+c.required,e=f-d.length,e<0?(d=b.ignoreTooLong?"":this._urlTooLong(d,c),this.tooLong=!0):c.optional.length>0&&(d+=j(c.optional,e)),d):""},i.prototype._urlTooLong=function(a,b){var c={cl:"Magpie",type:"LongUrl",length:(a||"").length,maxLength:f,targetCl:this.data.cl?this.data.cl.substr(0,200):null,longestField:b.longestField.substr(0,200)};return c=this._buildEvent(c),this._buildUrl({ev:c,ignoreTooLong:!0})},i}),define("lib/tracker",["./util","./random","./jsonp","./has","./event","./browser","./cookie","./pixel","./conversion"],function(a,b,c,d,e,f,g,h,i){function o(b,c){this._settings=a.extend({},this._defaults),this.version="2.4.3",this._shared={},this._shared.loadId=k,this._shared.tz=(new Date).getTimezoneOffset(),this._shared.magpieJsVersion=this.version,this._shared.source=null,this._shared.environment=null,b&&this.setClient(b),c&&this.setDisplay(c),this._batch=null,this._unloaded=!1,this._oldUnload=window.onunload,this._oldBeforeUnload=window.onbeforeunload;var d=this;e.add(window,"unload",function(){d._unload()}),e.add(window,"beforeunload",function(){d._unload()}),this._bvCookiesRequest=l,this._requestQueue=[],this._id=null,this._idQueue=[]}var j={"public":1,"private":1,internal:1},k=a.loadId(),l=0,m=1,n=2,p=o.prototype;return p._defaults={trackerHostname:"network.bazaarvoice.com",anonTrackerHostname:"network-a.bazaarvoice.com",anonymous:!0,brandDomain:null,timing:!0,staging:!1,secure:!1,eventFilter:null},p._set=function(a,b){this._settings[a]=b},p._get=function(a){return this._settings[a]},p._filterClass=function(a){var b=this.getEventClassFilter();return b&&!b.exec(a)},p._getProtocol=function(){return this.getSecure()||document.location.protocol==="https:"?"https:":"http:"},p._trackerUrl=function(b,c){var d=this._getProtocol()+"//"+this.getTrackerHostname()+"/"+b;return c&&(d+="?_="+a.buster()),d},p._getPixel=function(a){var b=this.getAnonymous(),c=this.getSecure(),d=b?this.getAnonTrackerHostname():this.getTrackerHostname(),e=this._getBrandCookies();return new h(this.isValidating(),b,c,d,this._shared,e,a)},p._send=function(a){a.validating?this._sendValidatingRequest(a):a.anonymous?this._sendRequest(a.url):this._sendTrackedRequest(a)},p._sendTrackedRequest=function(a){var b=this,c=a.url;b._bvCookiesRequest===l&&b._setBVCookies(),b._bvCookiesRequest===n?b._sendRequest(a.url):b._requestQueue.push(a)},p._setBVCookies=function(){var a=this,b=a._trackerUrl("sid.gif",!0);a._sendRequest(b,function(){a._bvCookiesRequest=n,a._flushRequestQueue(),a._loadBVID()}),a._bvCookiesRequest=m},p._flushRequestQueue=function(){while(this._requestQueue.length)this._send(this._requestQueue.shift())},p._sendRequest=function(b,c){var d;d=new Image(1,1),a.isFunction(c)&&(d.onload=function(){d.onload=null,c()}),d.src=b},p._sendValidatingRequest=function(b){var d=this._get("validationCallback");c.get(b.url,function(c){a.isFunction(d)?d(c,b.data):c.error&&a.log("Invalid Magpie event:",c)})},p._loadBVID=function(){var a=this,b=a._trackerUrl("id.json",!0),d=a.getTrackerHostname();c.get(b,function(b){a._id=b,a._id.hostname=d,a._flushIdQueue()})},p._flushIdQueue=function(){var b=this._id,c=this._idQueue,d;while(c.length)d=c.shift(),a.isFunction(d)&&d(b)},p._unload=function(){if(this._unloaded)return;this.flushBatch(),this._unloaded=!0},p._setBrandCookies=function(b){if(b&&g.isSupported()){var c=new Date;g("BVBRANDID")||g("BVBRANDID",a.uuid(),{domain:b,path:"/",expires:new Date(c.getTime()+6310656e5)});var d=g("BVBRANDSID")||a.uuid();g("BVBRANDSID",d,{domain:b,path:"/",expires:new Date(c.getTime()+18e5)})}},p._getBrandCookies=function(){var a={BVBRANDID:null,BVBRANDSID:null};return this.getBrandDomain()!==null&&g.isSupported()&&(a.BVBRANDID=g("BVBRANDID")||null,a.BVBRANDSID=g("BVBRANDSID")||null),a},p._timing=function(){var a,b=window.performance||window.webkitPerformance||window.mozPerformance||window.oPerformance||window.msPerformance||!1;return b!==!1&&(a=b.timing)?{dns:a.domainLookupEnd-a.domainLookupStart,con:a.connectEnd-a.connectStart,req:a.responseStart-a.connectEnd,res:a.responseEnd-a.responseStart,load:a.loadEventStart-a.responseEnd,tot:a.loadEventEnd-a.navigationStart}:{}},p._isPII=function(a){return a&&a.substring(0,3).toLowerCase()==="pii"},o.prototype.setClient=function(a){this._shared.client=a},p.getClient=function(){return this._shared.client},p.setDisplay=function(a){this._shared.dc=a},p.getDisplay=function(){return this._shared.dc},p.setAnonymous=function(a){this._set("anonymous",a)},p.getAnonymous=function(){return this._get("anonymous")},p.setTrackerHostname=function(a){this._set("trackerHostname",a),this._id=null,this._bvCookiesRequest=l},p.getTrackerHostname=function(){return this._get("trackerHostname")},p.setAnonTrackerHostname=function(a){this._set("anonTrackerHostname",a)},p.getAnonTrackerHostname=function(){return this._get("anonTrackerHostname")},p.setBrandDomain=function(b){a.isString(b)&&b.length>0?this._setBrandCookies(b):b=null,this._set("brandDomain",b)},p.getBrandDomain=function(){return this._get("brandDomain")},p.enableTiming=function(){this._set("timing",!0)},p.disableTiming=function(){this._set("timing",!1)},p.setSource=function(a){this._shared.source=a},p.getSource=function(){return this._shared.source},p.setEnvironment=function(a){this._shared.environment=a},p.getEnvironment=function(){return this._shared.environment},p.setAudience=function(a){var b=this._shared;j[a]&&(a==="public"?delete b.audience:b.audience=a)},p.getAudience=function(){return this._shared.audience||"public"},p.enableValidation=function(b){this._set("validate",!0),a.isFunction(b)&&this._set("validationCallback",b),this._prevTracker=this.getTrackerHostname(),this._prevAnonTracker=this.getAnonTrackerHostname(),this.setTrackerHostname("schema.mag.bazaarvoice.com"),this.setAnonTrackerHostname("schema.mag.bazaarvoice.com")},p.disableValidation=function(){this._set("validate",!1),this._set("validationCallback",null),this._prevTracker&&(this.setTrackerHostname(this._prevTracker),this._prevTracker=null),this._prevAnonTracker&&(this.setAnonTrackerHostname(this._prevAnonTracker),this._prevAnonTracker=null)},p.isValidating=function(){return this._get("validate")},p.setStaging=function(a){this._set("staging",!!a),a&&(this.setTrackerHostname("network-stg.bazaarvoice.com"),this.setAnonTrackerHostname("network-stg-a.bazaarvoice.com"))},p.getStaging=function(){return this._get("staging")},p.setSecure=function(a){this._set("secure",!!a)},p.getSecure=function(){return this._get("secure")},p.getEventClassFilter=function(){return this._get("eventClassFilter")},p.setEventClassFilter=function(b){if(a.isString(b))try{b=new RegExp(b)}catch(c){}this._set("eventClassFilter",b)},p.getID=function(b){a.isFunction(b)&&(this._id?b(this._id):this._idQueue.push(b))},p.trackEvent=function(a,b){var c;if(this._filterClass(a))return;b=b||{},b.cl=a;if(this._isPII(a)){var d=this.getAnonymous(),e=this.getSecure();this.setSecure(!0),this.setAnonymous(!0),c=this._send(this._getPixel(b)),this.setAnonymous(d),this.setSecure(e)}else c=this._send(this._getPixel(b))},p.trackPageView=function(b){b=b||{},a.extend(b,f),this._get("timing")&&(b.t=this._timing());var c=this.trackEvent("PageView",b)},p.trackConversion=function(a){var b=i.create(a),c;b&&(b.containsPII()&&this.trackEvent(i.PII_EVENT_CLASS,b.getPIIData()),c=this.trackEvent(i.EVENT_CLASS,b.getAnonymizedData()))},p.addMeta=function(a,b){this._shared.meta||(this._shared.meta={}),this._shared.meta[a]=b},p.removeMeta=function(a,b){var c=this._shared.meta;a in c&&c.hasOwnProperty(a)&&delete c[a]},p.addBatch=function(a){this._batch&&this._batch.items.length>0&&this.flushBatch(),this._batch={data:a||{},items:[]}},p.addBatchItem=function(a,b){var c;if(this._filterClass(a))return;if(this._isPII(a))return this.trackEvent(a,b);b=b||{},b.cl=a,this._batch||this.addBatch(),this._batch.items.push(b),c=this._getPixel(this.getBatch()),c.tooLong&&(this._batch.items.pop(),this._batch.items.length===0?this._send(c):(this.flushBatch(),this._batch.items.push(b)))},o.prototype.flushBatch=function(){if(!this._batch||!this._batch.items||this._batch.items.length===0)return;var a=this._send(this._getPixel(this.getBatch()));this._batch.items=[]},p.getBatch=function(){return this._batch?a.extend({batch:this._batch.items},this._batch.data):""},p.push=function(){try{var b;for(var c=0,d=arguments.length;c<d;c++){var e=arguments[c];if(a.isFunction(e))e.call(window);else if(a.isArray(e)){if(e.length===0)continue;var f=e[0];if(!a.isString(f)||f.charAt(0)==="_")continue;if(!a.isFunction(this[f]))continue;b=this[f].apply(this,e.slice(1))}}}catch(g){}return 1},p.resetLoadId=function(){this._shared.loadId=a.loadId()},o}),define("main",["lib/tracker","lib/has"],function(a,b){b.add("dev",!0),window._bvaq=window._bvaq||[],window._bva=window._bva||new a,window._bvaq.length>0&&window._bva.push.apply(window._bva,window._bvaq),window._bvaq=window._bva;var c={};window._bva.createTracker=function(b,d){var e=(b||"")+"|"+(d||"");return c[e]=new a(b,d)},window._bva.getTracker=function(a,b){var d=(a||"")+"|"+(b||"");return c[d]||window._bva.createTracker(a,b)}})
})();
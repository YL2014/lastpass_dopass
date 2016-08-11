(function(f,b){"function"===typeof define&&define.amd?define("bloodhound",["jquery"],function(l){return f.Bloodhound=b(l)}):"object"===typeof exports?module.exports=b(require("jquery")):f.Bloodhound=b(jQuery)})(this,function(f){var b={isMsie:function(){return/(msie|trident)/i.test(navigator.userAgent)?navigator.userAgent.match(/(msie |rv:)(\d+(.\d+)?)/i)[2]:!1},isBlankString:function(a){return!a||/^\s*$/.test(a)},escapeRegExChars:function(a){return a.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g,
"\\$&")},isString:function(a){return"string"===typeof a},isNumber:function(a){return"number"===typeof a},isArray:f.isArray,isFunction:f.isFunction,isObject:f.isPlainObject,isUndefined:function(a){return"undefined"===typeof a},isElement:function(a){return!!(a&&1===a.nodeType)},isJQuery:function(a){return a instanceof f},toStr:function(a){return b.isUndefined(a)||null===a?"":a+""},bind:f.proxy,each:function(a,e){f.each(a,function(a,c){return e(c,a)})},map:f.map,filter:f.grep,every:function(a,e){var d=
!0;if(!a)return d;f.each(a,function(c,g){if(!(d=e.call(null,g,c,a)))return!1});return!!d},some:function(a,e){var d=!1;if(!a)return d;f.each(a,function(c,g){if(d=e.call(null,g,c,a))return!1});return!!d},mixin:f.extend,identity:function(a){return a},clone:function(a){return f.extend(!0,{},a)},getIdGenerator:function(){var a=0;return function(){return a++}},templatify:function(a){function e(){return String(a)}return f.isFunction(a)?a:e},defer:function(a){setTimeout(function(){a()},0)},debounce:function(a,
e,d){var c,g;return function(){var b=this,k=arguments,f,j;f=function(){c=null;d||(g=a.apply(b,k))};j=d&&!c;clearTimeout(c);c=setTimeout(function(){f()},e);j&&(g=a.apply(b,k));return g}},throttle:function(a,e){var d,c,g,b,f,m;f=0;m=function(){f=new Date;g=null;b=a.apply(d,c)};return function(){var j=new Date,n=e-(j-f);d=this;c=arguments;0>=n?(clearTimeout(g),g=null,f=j,b=a.apply(d,c)):g||(g=setTimeout(function(){m()},n));return b}},stringify:function(a){return b.isString(a)?a:JSON.stringify(a)},noop:function(){}},
l;l=function(a){return(a=b.toStr(a))?a.split(/\s+/):[]};var t=function(a){return(a=b.toStr(a))?a.split(/\W+/):[]},q=function(a){return function(e){e=b.isArray(e)?e:[].slice.call(arguments,0);return function(d){var c=[];b.each(e,function(e){c=c.concat(a(b.toStr(d[e])))});return c}}};l={nonword:t,whitespace:l,obj:{nonword:q(t),whitespace:q(l)}};var v=function(a){this.maxSize=b.isNumber(a)?a:100;this.reset();0>=this.maxSize&&(this.set=this.get=f.noop)},z=function(){this.head=this.tail=null},L=function(a,
e){this.key=a;this.val=e;this.prev=this.next=null};b.mixin(v.prototype,{set:function(a,e){var d=this.list.tail;this.size>=this.maxSize&&(this.list.remove(d),delete this.hash[d.key],this.size--);(d=this.hash[a])?(d.val=e,this.list.moveToFront(d)):(d=new L(a,e),this.list.add(d),this.hash[a]=d,this.size++)},get:function(a){if(a=this.hash[a])return this.list.moveToFront(a),a.val},reset:function(){this.size=0;this.hash={};this.list=new z}});b.mixin(z.prototype,{add:function(a){this.head&&(a.next=this.head,
this.head.prev=a);this.head=a;this.tail=this.tail||a},remove:function(a){a.prev?a.prev.next=a.next:this.head=a.next;a.next?a.next.prev=a.prev:this.tail=a.prev},moveToFront:function(a){this.remove(a);this.add(a)}});var A=function(a,e){this.prefix=["__",a,"__"].join("");this.ttlKey="__ttl__";this.keyMatcher=RegExp("^"+b.escapeRegExChars(this.prefix));this.ls=e||h;!this.ls&&this._noop()},B=function(a){return JSON.stringify(b.isUndefined(a)?null:a)},h;try{h=window.localStorage,h.setItem("~~~","!"),h.removeItem("~~~")}catch(O){h=
null}b.mixin(A.prototype,{_prefix:function(a){return this.prefix+a},_ttlKey:function(a){return this._prefix(a)+this.ttlKey},_noop:function(){this.get=this.set=this.remove=this.clear=this.isExpired=b.noop},_safeSet:function(a,e){try{this.ls.setItem(a,e)}catch(d){"QuotaExceededError"===d.name&&(this.clear(),this._noop())}},get:function(a){this.isExpired(a)&&this.remove(a);a=this.ls.getItem(this._prefix(a));return f.parseJSON(a)},set:function(a,e,d){b.isNumber(d)?this._safeSet(this._ttlKey(a),B((new Date).getTime()+
d)):this.ls.removeItem(this._ttlKey(a));return this._safeSet(this._prefix(a),B(e))},remove:function(a){this.ls.removeItem(this._ttlKey(a));this.ls.removeItem(this._prefix(a));return this},clear:function(){var a;a=this.keyMatcher;var e,d,c=[],g=h.length;for(e=0;e<g;e++)(d=h.key(e)).match(a)&&c.push(d.replace(a,""));for(a=c.length;a--;)this.remove(c[a]);return this},isExpired:function(a){a=this.ls.getItem(this._ttlKey(a));a=f.parseJSON(a);return b.isNumber(a)&&(new Date).getTime()>a?!0:!1}});var r=
function(a){a=a||{};this.cancelled=!1;this.lastReq=null;this._send=a.transport;this._get=a.limiter?a.limiter(this._get):this._get;this._cache=!1===a.cache?new v(0):C},w=0,x={},D=6,C=new v(10);r.setMaxPendingRequests=function(a){D=a};r.resetCache=function(){C.reset()};b.mixin(r.prototype,{_fingerprint:function(a){a=a||{};return a.url+a.type+f.param(a.data||{})},_get:function(a,e){function d(a){e(null,a);b._cache.set(f,a)}function c(){e(!0)}function g(){w--;delete x[f];b.onDeckRequestArgs&&(b._get.apply(b,
b.onDeckRequestArgs),b.onDeckRequestArgs=null)}var b=this,f,m;f=this._fingerprint(a);this.cancelled||f!==this.lastReq||((m=x[f])?m.done(d).fail(c):w<D?(w++,x[f]=this._send(a).done(d).fail(c).always(g)):this.onDeckRequestArgs=[].slice.call(arguments,0))},get:function(a,e){var d,c;e=e||f.noop;a=b.isString(a)?{url:a}:a||{};c=this._fingerprint(a);this.cancelled=!1;this.lastReq=c;(d=this._cache.get(c))?e(null,d):this._get(a,e)},cancel:function(){this.cancelled=!0}});var t=window,q=function(a){a=a||{};
(!a.datumTokenizer||!a.queryTokenizer)&&f.error("datumTokenizer and queryTokenizer are both required");this.identify=a.identify||b.stringify;this.datumTokenizer=a.datumTokenizer;this.queryTokenizer=a.queryTokenizer;this.reset()},E=function(a){a=b.filter(a,function(a){return!!a});return a=b.map(a,function(a){return a.toLowerCase()})},F=function(){var a={};a[y]=[];a[u]={};return a},M=function(a){for(var e={},d=[],c=0,b=a.length;c<b;c++)e[a[c]]||(e[a[c]]=!0,d.push(a[c]));return d},u="c",y="i";b.mixin(q.prototype,
{bootstrap:function(a){this.datums=a.datums;this.trie=a.trie},add:function(a){var e=this;a=b.isArray(a)?a:[a];b.each(a,function(a){var c;e.datums[c=e.identify(a)]=a;a=E(e.datumTokenizer(a));b.each(a,function(a){var d,b;d=e.trie;for(a=a.split("");b=a.shift();)d=d[u][b]||(d[u][b]=F()),d[y].push(c)})})},get:function(a){var e=this;return b.map(a,function(a){return e.datums[a]})},search:function(a){var e=this,d;a=E(this.queryTokenizer(a));b.each(a,function(a){var b,f;if(d&&0===d.length)return!1;b=e.trie;
for(a=a.split("");b&&(f=a.shift());)b=b[u][f];if(b&&0===a.length){f=b[y].slice(0);if(d){b=d;var k=a=0,m=[];b=b.sort();f=f.sort();for(var j=b.length,n=f.length;a<j&&k<n;)b[a]<f[k]?a++:(b[a]>f[k]||(m.push(b[a]),a++),k++);b=m}else b=f;d=b}else return d=[],!1});return d?b.map(M(d),function(a){return e.datums[a]}):[]},all:function(){var a=[],b;for(b in this.datums)a.push(this.datums[b]);return a},reset:function(){this.datums={};this.trie=F()},serialize:function(){return{datums:this.datums,trie:this.trie}}});
var N=t.SearchIndex=q,G=function(a){this.url=a.url;this.ttl=a.ttl;this.cache=a.cache;this.prepare=a.prepare;this.transform=a.transform;this.transport=a.transport;this.thumbprint=a.thumbprint;this.storage=new A(a.cacheKey)};b.mixin(G.prototype,{_settings:function(){return{url:this.url,type:"GET",dataType:"json"}},store:function(a){this.cache&&(this.storage.set("data",a,this.ttl),this.storage.set("protocol",location.protocol,this.ttl),this.storage.set("thumbprint",this.thumbprint,this.ttl))},fromCache:function(){var a,
b;if(!this.cache)return null;a=this.storage.get("data");b=this.storage.get("protocol");b=this.storage.get("thumbprint")!==this.thumbprint||b!==location.protocol;return a&&!b?a:null},fromNetwork:function(a){function b(){a(!0)}function d(b){a(null,c.transform(b))}var c=this,f;a&&(f=this.prepare(this._settings()),this.transport(f).fail(b).done(d))},clear:function(){this.storage.clear();return this}});var H=function(a){this.url=a.url;this.prepare=a.prepare;this.transform=a.transform;this.transport=new r({cache:a.cache,
limiter:a.limiter,transport:a.transport})};b.mixin(H.prototype,{_settings:function(){return{url:this.url,type:"GET",dataType:"json"}},get:function(a,b){function d(a,d){a?b([]):b(c.transform(d))}var c=this,f;if(b)return f=this.prepare(a||"",this._settings()),this.transport.get(f,d)},cancelLastRequest:function(){this.transport.cancel()}});var I,J=function(a){return function(e){var d=f.Deferred();a(e,function(a){b.defer(function(){d.resolve(a)})},function(a){b.defer(function(){d.reject(a)})});return d}};
I=function(a){var e;a=b.mixin({initialize:!0,identify:b.stringify,datumTokenizer:null,queryTokenizer:null,sufficient:5,sorter:null,local:[],prefetch:null,remote:null},a||{});!a.datumTokenizer&&f.error("datumTokenizer is required");!a.queryTokenizer&&f.error("queryTokenizer is required");e=a.sorter;a.sorter=e?function(a){return a.sort(e)}:b.identity;a.local=b.isFunction(a.local)?a.local():a.local;var d=a,c;c=a.prefetch;var g;c?(g={url:null,ttl:864E5,cache:!0,cacheKey:null,thumbprint:"",prepare:b.identity,
transform:b.identity,transport:null},c=b.isString(c)?{url:c}:c,c=b.mixin(g,c),!c.url&&f.error("prefetch requires url to be set"),c.transform=c.filter||c.transform,c.cacheKey=c.cacheKey||c.url,c.thumbprint="0.11.1"+c.thumbprint,c.transport=c.transport?J(c.transport):f.ajax):c=null;d.prefetch=c;d=a;if(c=a.remote){g={url:null,cache:!0,prepare:null,replace:null,wildcard:null,limiter:null,rateLimitBy:"debounce",rateLimitWait:300,transform:b.identity,transport:null};c=b.isString(c)?{url:c}:c;c=b.mixin(g,
c);!c.url&&f.error("remote requires url to be set");c.transform=c.filter||c.transform;g=c;var p=function(a,b){b.url=n(b.url,a);return b},k=function(a,b){b.url=b.url.replace(l,encodeURIComponent(a));return b},m=function(a,b){return b},j,n,l;j=g.prepare;n=g.replace;l=g.wildcard;j||(j=n?p:g.wildcard?k:m);c.prepare=j;g=c;var h,p=c.limiter,k=c.rateLimitBy;h=c.rateLimitWait;p||(p=/^throttle$/i.test(k)?function(a){return b.throttle(a,h)}:function(a){return b.debounce(a,h)});g.limiter=p;c.transport=c.transport?
J(c.transport):f.ajax;delete c.replace;delete c.wildcard;delete c.rateLimitBy;delete c.rateLimitWait}else c=void 0;d.remote=c;return a};var s=function(a){a=I(a);this.sorter=a.sorter;this.identify=a.identify;this.sufficient=a.sufficient;this.local=a.local;this.remote=a.remote?new H(a.remote):null;this.prefetch=a.prefetch?new G(a.prefetch):null;this.index=new N({identify:this.identify,datumTokenizer:a.datumTokenizer,queryTokenizer:a.queryTokenizer});!1!==a.initialize&&this.initialize()},K;K=window&&
window.Bloodhound;s.noConflict=function(){window&&(window.Bloodhound=K);return s};s.tokenizers=l;b.mixin(s.prototype,{__ttAdapter:function(){function a(a,b,e){return d.search(a,b,e)}function b(a,e){return d.search(a,e)}var d=this;return this.remote?a:b},_loadPrefetch:function(){function a(a,c){if(a)return d.reject();b.add(c);b.prefetch.store(b.index.serialize());d.resolve()}var b=this,d,c;d=f.Deferred();this.prefetch?(c=this.prefetch.fromCache())?(this.index.bootstrap(c),d.resolve()):this.prefetch.fromNetwork(a):
d.resolve();return d.promise()},_initialize:function(){var a=this;this.clear();(this.initPromise=this._loadPrefetch()).done(function(){a.add(a.local)});return this.initPromise},initialize:function(a){return!this.initPromise||a?this._initialize():this.initPromise},add:function(a){this.index.add(a);return this},get:function(a){a=b.isArray(a)?a:[].slice.call(arguments);return this.index.get(a)},search:function(a,e,d){function c(a){var c=[];b.each(a,function(a){!b.some(h,function(b){return f.identify(a)===
f.identify(b)})&&c.push(a)});d&&d(c)}var f=this,h;h=this.sorter(this.index.search(a));e(this.remote?h.slice():h);this.remote&&h.length<this.sufficient?this.remote.get(a,c):this.remote&&this.remote.cancelLastRequest();return this},all:function(){return this.index.all()},clear:function(){this.index.reset();return this},clearPrefetchCache:function(){this.prefetch&&this.prefetch.clear();return this},clearRemoteCache:function(){r.resetCache();return this},ttAdapter:function(){return this.__ttAdapter()}});
return s});
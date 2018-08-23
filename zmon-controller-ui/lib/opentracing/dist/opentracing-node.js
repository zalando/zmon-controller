module.exports=function(e){function t(r){if(n[r])return n[r].exports;var i=n[r]={exports:{},id:r,loaded:!1};return e[r].call(i.exports,i,i.exports,t),i.loaded=!0,i.exports}var n={};return t.m=e,t.c=n,t.p="",t(0)}([function(e,t,n){"use strict";e.exports=n(1)},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}var i=n(2),u=r(i);e.exports=new u["default"]},function(e,t,n){"use strict";function r(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t["default"]=e,t}function i(e){return e&&e.__esModule?e:{"default":e}}function u(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function a(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var f=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),l=n(3),c=i(l),s=n(6),p=r(s),d=n(8),h=i(d),_=n(7),y=i(_),v=function(e){function t(){u(this,t);var e=o(this,Object.getPrototypeOf(t).call(this));for(var n in p)e[n]=p[n];return e.Reference=y["default"],e.BinaryCarrier=h["default"],e}return a(t,e),f(t,[{key:"initGlobalTracer",value:function(e){this._imp=e,e&&e.setInterface(this)}},{key:"initNewTracer",value:function(e){var t=new c["default"](e);return e&&e.setInterface(this),t}}]),t}(c["default"]);t["default"]=v,e.exports=t["default"]},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var u=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),o=n(4),a=r(o),f=n(5),l=r(f),c=n(6),s=r(c),p=n(7),d=r(p),h=function(){function e(t){i(this,e),this._imp=t||null}return u(e,[{key:"startSpan",value:function(e,t){var n=null;if(this._imp){if(1===arguments.length?t="string"==typeof e?{operationName:e}:e:t.operationName=e,t.childOf){var r=this.childOf(t.childOf);t.references?t.references.push(r):t.references=[r],delete t.childOf}n=this._imp.startSpan(t)}return new a["default"](n)}},{key:"childOf",value:function(e){return new d["default"](s["default"].REFERENCE_CHILD_OF,e)}},{key:"followsFrom",value:function(e){return new d["default"](s["default"].REFERENCE_FOLLOWS_FROM,e)}},{key:"inject",value:function(e,t,n){this._imp&&(e instanceof a["default"]&&(e=e.context()),this._imp.inject(e._imp,t,n))}},{key:"extract",value:function(e,t){var n=null;return this._imp&&(n=this._imp.extract(e,t)),null!==n?new l["default"](n):null}},{key:"flush",value:function(e){return this._imp?void this._imp.flush(e):void e(null)}}]),u(e,[{key:"imp",value:function(){return this._imp}}]),e}();t["default"]=h,e.exports=t["default"]},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function u(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var o=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),a=n(3),f=r(a),l=n(5),c=r(l),s=n(1),p=function(){function e(t){u(this,e),this._imp=t}return o(e,[{key:"context",value:function(){var e=null;return this._imp&&(e=this._imp.context()),new c["default"](e)}},{key:"tracer",value:function(){return this._imp?new f["default"](this._imp.tracer()):s}},{key:"setOperationName",value:function(e){return this._imp&&this._imp.setOperationName(e),this}},{key:"setTag",value:function(e,t){return this.addTags(i({},e,t)),this}},{key:"addTags",value:function(e){if(this._imp)return this._imp.addTags(e),this}},{key:"log",value:function(e){if(this._imp)return this._imp.log(e),this}},{key:"logEvent",value:function(e,t){return this.log({event:e,payload:t})}},{key:"finish",value:function(e){this._imp&&this._imp.finish(e)}}]),o(e,[{key:"imp",value:function(){return this._imp}}]),e}();t["default"]=p,e.exports=t["default"]},function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var i=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),u=function(){function e(t){r(this,e),this._imp=t}return i(e,[{key:"setBaggageItem",value:function(e,t){this._imp&&this._imp.setBaggageItem(e,t)}},{key:"getBaggageItem",value:function(e){if(this._imp)return this._imp.getBaggageItem(e)}}]),i(e,[{key:"imp",value:function(){return this._imp}}]),e}();t["default"]=u,e.exports=t["default"]},function(e,t){"use strict";e.exports={FORMAT_BINARY:"binary",FORMAT_TEXT_MAP:"text_map",FORMAT_HTTP_HEADERS:"http_headers",REFERENCE_CHILD_OF:"child_of",REFERENCE_FOLLOWS_FROM:"follows_from"}},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var u=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),o=n(4),a=r(o),f=n(5),l=(r(f),function(){function e(t,n){i(this,e),this._type=t,this._referencedContext=n instanceof a["default"]?n.context():n}return u(e,[{key:"type",value:function(){return this._type}},{key:"referencedContext",value:function(){return this._referencedContext}}]),e}());t["default"]=l,e.exports=t["default"]},function(e,t){"use strict";function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var r=function i(e){n(this,i),this.buffer=e};t["default"]=r,e.exports=t["default"]}]);
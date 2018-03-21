/*! grafana - v3.1.0 - 2018-03-21
 * Copyright (c) 2018 Torkel Ödegaard; Licensed Apache-2.0 */

System.register(["lodash","moment"],function(a){function b(a,b){if(a){if(f["default"].isMoment(a))return a;if(e["default"].isDate(a))return f["default"](a);var c,g,h,i="";return"now"===a.substring(0,3)?(c=f["default"](),i=a.substring("now".length)):(g=a.indexOf("||"),g===-1?(h=a,i=""):(h=a.substring(0,g),i=a.substring(g+2)),c=f["default"](h,f["default"].ISO_8601)),i.length?d(i,c,b):c}}function c(a){var c=b(a);return!!c&&(!!f["default"].isMoment(c)&&c.isValid())}function d(a,b,c){for(var d=b,f=0,h=a.length;f<h;){var i,j,k,l=a.charAt(f++);if("/"===l)i=0;else if("+"===l)i=1;else{if("-"!==l)return;i=2}if(isNaN(a.charAt(f)))j=1;else if(2===a.length)j=a.charAt(f);else{for(var m=f;!isNaN(a.charAt(f));)if(f++,f>10)return;j=parseInt(a.substring(m,f),10)}if(0===i&&1!==j)return;if(k=a.charAt(f++),!e["default"].contains(g,k))return;0===i?c?d.endOf(k):d.startOf(k):1===i?d.add(j,k):2===i&&d.subtract(j,k)}return d}var e,f,g;return a("parse",b),a("isValid",c),a("parseDateMath",d),{setters:[function(a){e=a},function(a){f=a}],execute:function(){g=["y","M","w","d","h","m","s"]}}});
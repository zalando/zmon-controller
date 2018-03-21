/*! grafana - v3.1.0 - 2018-03-21
 * Copyright (c) 2018 Torkel Ödegaard; Licensed Apache-2.0 */

define(["angular","lodash","./editorCtrl","./templateValuesSrv"],function(a,b){"use strict";var c=a.module("grafana.services");c.service("templateSrv",function(){function a(a){return a.replace(/[\\^$*+?.()|[\]{}\/]/g,"\\$&")}function c(a){return a.replace(/([\!\*\+\-\=<>\s\&\|\(\)\[\]\{\}\^\~\?\:\\/"])/g,"\\$1")}var d=this;this._regex=/\$(\w+)|\[\[([\s\S]+?)\]\]/g,this._index={},this._texts={},this._grafanaVariables={},this.init=function(a){this.variables=a,this.updateTemplateData()},this.updateTemplateData=function(){this._index={};for(var a=0;a<this.variables.length;a++){var b=this.variables[a];b.current&&(b.current.isNone||b.current.value)&&(this._index[b.name]=b)}},this.luceneFormat=function(a){if("string"==typeof a)return c(a);var d=b.map(a,function(a){return'"'+c(a)+'"'});return"("+d.join(" OR ")+")"},this.formatValue=function(c,d,e){if(e=e||{},"function"==typeof d)return d(c,e,this.formatValue);switch(d){case"regex":if("string"==typeof c)return a(c);var f=b.map(c,a);return"("+f.join("|")+")";case"lucene":return this.luceneFormat(c,d,e);case"pipe":return"string"==typeof c?c:c.join("|");default:return"string"==typeof c?c:"{"+c.join(",")+"}"}},this.setGrafanaVariable=function(a,b){this._grafanaVariables[a]=b},this.variableExists=function(a){this._regex.lastIndex=0;var b=this._regex.exec(a);return b&&void 0!==d._index[b[1]||b[2]]},this.containsVariable=function(b,c){if(!b)return!1;c=a(c);var d=new RegExp("\\$("+c+")(?:\\W|$)|\\[\\[("+c+")\\]\\]","g"),e=d.exec(b);return null!==e},this.highlightVariablesAsHtml=function(a){return a&&b.isString(a)?(a=b.escape(a),this._regex.lastIndex=0,a.replace(this._regex,function(a,b,c){return d._index[b||c]?'<span class="template-variable">'+a+"</span>":a})):a},this.getAllValue=function(a){if(a.allValue)return a.allValue;for(var b=[],c=1;c<a.options.length;c++)b.push(a.options[c].value);return b},this.replace=function(a,b,c){if(!a)return a;var e,f,g;return this._regex.lastIndex=0,a.replace(this._regex,function(a,h,i){if(e=d._index[h||i],b&&(g=b[h||i]))return d.formatValue(g.value,c,e);if(!e)return a;if(f=d._grafanaVariables[e.current.value])return d.formatValue(f,c,e);if(g=e.current.value,d.isAllValue(g)&&(g=d.getAllValue(e),e.allValue))return g;var j=d.formatValue(g,c,e);return j})},this.isAllValue=function(a){return"$__all"===a||Array.isArray(a)&&"$__all"===a[0]},this.replaceWithText=function(a,b){if(!a)return a;var c;return this._regex.lastIndex=0,a.replace(this._regex,function(a,e,f){if(b){var g=b[e||f];if(g)return g.text}return c=d._index[e||f],c?d._grafanaVariables[c.current.value]||c.current.text:a})},this.fillVariableValuesForUrl=function(a,c){b.each(this.variables,function(b){var d=b.current,e=d.value;"All"===d.text&&(e="All"),c&&void 0!==c[b.name]&&(e=c[b.name].value),a["var-"+b.name]=e})}})});
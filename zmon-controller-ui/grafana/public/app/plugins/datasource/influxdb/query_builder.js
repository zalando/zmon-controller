/*! grafana - v3.1.0 - 2018-03-21
 * Copyright (c) 2018 Torkel Ödegaard; Licensed Apache-2.0 */

define(["lodash"],function(a){"use strict";function b(a,b){this.target=a,this.database=b}function c(a,b){var c="",d=a.operator,e=a.value;return b>0&&(c=(a.condition||"AND")+" "),d||(d=/^\/.*\/$/.test(a.value)?"=~":"="),"=~"!==d&&"!~"!==d&&isNaN(+e)&&(e="'"+e+"'"),c+'"'+a.key+'" '+d+" "+e}var d=b.prototype;return d.build=function(){return this.target.rawQuery?this._modifyRawQuery():this._buildQuery()},d.buildExploreQuery=function(b,d){var e,f;if("TAG_KEYS"===b)e="SHOW TAG KEYS",f=this.target.measurement;else if("TAG_VALUES"===b)e="SHOW TAG VALUES",f=this.target.measurement;else if("MEASUREMENTS"===b)e="SHOW MEASUREMENTS";else{if("FIELDS"===b)return e='SHOW FIELD KEYS FROM "'+this.target.measurement+'"';if("RETENTION POLICIES"===b)return e='SHOW RETENTION POLICIES on "'+this.database+'"'}if(f&&(f.match("^/.*/")||f.match(/^merge\(.*\)/)||(f='"'+f+'"'),e+=" FROM "+f),d&&(e+=' WITH KEY = "'+d+'"'),this.target.tags&&this.target.tags.length>0){var g=a.reduce(this.target.tags,function(a,b){return b.key===d?a:(a.push(c(b,a.length)),a)},[]);g.length>0&&(e+=" WHERE "+g.join(" "))}return e},b});
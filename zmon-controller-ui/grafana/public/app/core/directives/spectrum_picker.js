/*! grafana - v3.1.0 - 2018-03-21
 * Copyright (c) 2018 Torkel Ödegaard; Licensed Apache-2.0 */

define(["angular","../core_module","spectrum"],function(a,b){"use strict";b["default"].directive("spectrumPicker",function(){return{restrict:"E",require:"ngModel",scope:!1,replace:!0,template:"<span><input class='input-small' /></span>",link:function(b,c,d,e){var f=c.find("input"),g=a.extend({showAlpha:!0,showButtons:!1,color:e.$viewValue,change:function(a){b.$apply(function(){e.$setViewValue(a.toRgbString())})}},b.$eval(d.options));e.$render=function(){f.spectrum("set",e.$viewValue||"")},f.spectrum(g),b.$on("$destroy",function(){f.spectrum("destroy")})}}})});
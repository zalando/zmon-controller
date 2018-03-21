/*! grafana - v3.1.0 - 2018-03-21
 * Copyright (c) 2018 Torkel Ödegaard; Licensed Apache-2.0 */

define(["angular","lodash","jquery","jquery.flot","jquery.flot.time"],function(a,b,c){"use strict";var d=a.module("grafana.directives");d.directive("graphLegend",["popoverSrv","$timeout",function(a,d){return{link:function(e,f){function g(a){return a.parents("[data-series-index]").data("series-index")}function h(b){if(!c(b.target).parents(".popover").length){var e=c(b.currentTarget).find(".fa-minus"),f=g(e),h=n[f];d(function(){a.show({element:e[0],position:"bottom center",template:"<gf-color-picker></gf-color-picker>",model:{series:h,toggleAxis:function(){r.toggleAxis(h)},colorSelected:function(a){r.changeSeriesColor(h,a)}}})})}}function i(a){var b=c(a.currentTarget),d=g(b),e=n[d];r.toggleSeries(e,a)}function j(a){var b=c(a.currentTarget),d=b.data("stat");return d!==s.legend.sort&&(s.legend.sortDesc=null),s.legend.sortDesc===!1?(s.legend.sort=null,s.legend.sortDesc=null,void l()):(s.legend.sortDesc=!s.legend.sortDesc,s.legend.sort=d,void l())}function k(a){if(!s.legend[a])return"";var b='<th class="pointer" data-stat="'+a+'">'+a;if(s.legend.sort===a){var c=s.legend.sortDesc?"fa fa-caret-down":"fa fa-caret-up";b+=' <span class="'+c+'"></span>'}return b+"</th>"}function l(){if(!r.panel.legend.show)return f.empty(),void(q=!0);q&&(f.append(p),p.on("click",".graph-legend-icon",h),p.on("click",".graph-legend-alias",i),p.on("click","th",j),q=!1),n=m,p.empty();var a=s.legend.rightSide&&s.legend.sideWidth?s.legend.sideWidth+"px":"";if(p.css("min-width",a),p.toggleClass("graph-legend-table",s.legend.alignAsTable===!0),s.legend.alignAsTable){var d="<tr>";d+='<th colspan="2" style="text-align:left"></th>',s.legend.values&&(d+=k("min"),d+=k("max"),d+=k("avg"),d+=k("current"),d+=k("total")),d+="</tr>",p.append(c(d))}s.legend.sort&&(n=b.sortBy(n,function(a){return a.stats[s.legend.sort]}),s.legend.sortDesc&&(n=n.reverse()));var e=0;for(o=0;o<n.length;o++){var g=n[o];if(!g.hideFromLegend(s.legend)){var l='<div class="graph-legend-series';if(2===g.yaxis&&(l+=" graph-legend-series--right-y"),r.hiddenSeries[g.alias]&&(l+=" graph-legend-series-hidden"),l+='" data-series-index="'+o+'">',l+='<div class="graph-legend-icon">',l+='<i class="fa fa-minus pointer" style="color:'+g.color+'"></i>',l+="</div>",l+='<a class="graph-legend-alias pointer">'+b.escape(g.label)+"</a>",s.legend.values){var t=g.formatValue(g.stats.avg),u=g.formatValue(g.stats.current),v=g.formatValue(g.stats.min),w=g.formatValue(g.stats.max),x=g.formatValue(g.stats.total);s.legend.min&&(l+='<div class="graph-legend-value min">'+v+"</div>"),s.legend.max&&(l+='<div class="graph-legend-value max">'+w+"</div>"),s.legend.avg&&(l+='<div class="graph-legend-value avg">'+t+"</div>"),s.legend.current&&(l+='<div class="graph-legend-value current">'+u+"</div>"),s.legend.total&&(l+='<div class="graph-legend-value total">'+x+"</div>")}l+="</div>",p.append(c(l)),e++}}if(s.legend.alignAsTable){var y=r.height;s.legend.rightSide||(y/=2);var z=6;p.css("max-height",y-z)}else p.css("max-height","")}var m,n,o,p=c('<section class="graph-legend"></section>'),q=!0,r=e.ctrl,s=r.panel;r.events.on("render",function(){m=r.seriesList,m&&l()})}}}])});
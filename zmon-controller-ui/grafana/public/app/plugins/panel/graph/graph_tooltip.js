/*! grafana - v3.1.0 - 2018-03-21
 * Copyright (c) 2018 Torkel Ödegaard; Licensed Apache-2.0 */

define(["jquery"],function(a){"use strict";function b(b,c,d,e){var f=this,g=d.ctrl,h=g.panel,i=a('<div id="tooltip" class="graph-tooltip">');this.findHoverIndexFromDataPoints=function(a,b,c){for(var d=b.datapoints.pointsize,e=c*d,f=b.datapoints.points.length,g=e;g<f;g+=d)if(b.datapoints.points[g]>a)return Math.max(g-d,0)/d;return g/d-1},this.findHoverIndexFromData=function(a,b){for(var c=b.data.length,d=0;d<c;d++)if(b.data[d][0]>a)return Math.max(d-1,0);return d-1},this.showTooltip=function(a,b,c){var d='<div class="graph-tooltip-time">'+a+"</div>";d+=b+"</div>",i.html(d).place_tt(c.pageX+20,c.pageY)},this.getMultiSeriesPlotHoverInfo=function(a,b){var c,d,e,f,g=[],i=0;for(d=0;d<a.length;d++)if(e=a[d],!e.data.length||h.legend.hideEmpty&&e.allIsNull)g.push({hidden:!0});else if(!e.data.length||h.legend.hideZero&&e.allIsZero)g.push({hidden:!0});else if(f=this.findHoverIndexFromData(b.x,e),g.time=e.data[f][0],e.stack?"individual"===h.tooltip.value_type?c=e.data[f][1]:e.stack?(i+=e.data[f][1],c=i):c=e.data[f][1]:c=e.data[f][1],e.lines.steps||e.stack){var j=this.findHoverIndexFromDataPoints(b.x,e,f);g.push({value:c,hoverIndex:j,color:e.color,label:e.label})}else g.push({value:c,hoverIndex:f,color:e.color,label:e.label});return g},b.mouseleave(function(){if(h.tooltip.shared){var a=b.data().plot;a&&(i.detach(),a.unhighlight())}c.sharedCrosshair&&g.publishAppEvent("clearCrosshair")}),b.bind("plothover",function(a,j,k){var l,m,n,o,p,q,r,s,t=b.data().plot,u=t.getData(),v=e();if(s=h.tooltip.msResolution?"YYYY-MM-DD HH:mm:ss.SSS":"YYYY-MM-DD HH:mm:ss",c.sharedCrosshair&&g.publishAppEvent("setCrosshair",{pos:j,scope:d}),0!==v.length)if(h.tooltip.shared){t.unhighlight();var w=f.getMultiSeriesPlotHoverInfo(u,j);for(r="",n=c.formatDate(w.time,s),2===h.tooltip.sort?w.sort(function(a,b){return b.value-a.value}):1===h.tooltip.sort&&w.sort(function(a,b){return a.value-b.value}),p=0;p<w.length;p++)if(o=w[p],!o.hidden){var x="";k&&p===k.seriesIndex&&(x="graph-tooltip-list-item--highlight"),q=v[p],m=q.formatValue(o.value),r+='<div class="graph-tooltip-list-item '+x+'"><div class="graph-tooltip-series-name">',r+='<i class="fa fa-minus" style="color:'+o.color+';"></i> '+o.label+":</div>",r+='<div class="graph-tooltip-value">'+m+"</div></div>",t.highlight(p,o.hoverIndex)}f.showTooltip(n,r,j)}else k?(q=v[k.seriesIndex],l='<div class="graph-tooltip-list-item"><div class="graph-tooltip-series-name">',l+='<i class="fa fa-minus" style="color:'+k.series.color+';"></i> '+q.label+":</div>",m=h.stack&&"individual"===h.tooltip.value_type?k.datapoint[1]-k.datapoint[2]:k.datapoint[1],m=q.formatValue(m),n=c.formatDate(k.datapoint[0],s),l+='<div class="graph-tooltip-value">'+m+"</div>",f.showTooltip(n,l,j)):i.detach()})}return b});
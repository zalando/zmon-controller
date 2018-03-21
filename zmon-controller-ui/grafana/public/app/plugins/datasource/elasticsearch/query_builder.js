/*! grafana - v3.1.0 - 2018-03-21
 * Copyright (c) 2018 Torkel Ödegaard; Licensed Apache-2.0 */

define(["./query_def"],function(a){"use strict";function b(a){this.timeField=a.timeField,this.esVersion=a.esVersion}return b.prototype.getRangeFilter=function(){var a={};return a[this.timeField]={gte:"$timeFrom",lte:"$timeTo"},this.esVersion>=2&&(a[this.timeField].format="epoch_millis"),a},b.prototype.buildTermsAgg=function(a,b,c){var d,e,f;if(b.terms={field:a.field},!a.settings)return b;if(b.terms.size=parseInt(a.settings.size,10),void 0!==a.settings.orderBy&&(b.terms.order={},b.terms.order[a.settings.orderBy]=a.settings.order,d=parseInt(a.settings.orderBy,10),!isNaN(d)))for(f=0;f<c.metrics.length;f++)if(e=c.metrics[f],e.id===a.settings.orderBy){b.aggs={},b.aggs[e.id]={},b.aggs[e.id][e.type]={field:e.field};break}return b},b.prototype.getDateHistogramAgg=function(a){var b={},c=a.settings||{};return b.interval=c.interval,b.field=this.timeField,b.min_doc_count=c.min_doc_count||0,b.extended_bounds={min:"$timeFrom",max:"$timeTo"},"auto"===b.interval&&(b.interval="$interval"),this.esVersion>=2&&(b.format="epoch_millis"),b},b.prototype.getFiltersAgg=function(a){for(var b={},c=0;c<a.settings.filters.length;c++){var d=a.settings.filters[c].query;b[d]={query:{query_string:{query:d,analyze_wildcard:!0}}}}return b},b.prototype.documentQuery=function(a){return a.size=500,a.sort={},a.sort[this.timeField]={order:"desc",unmapped_type:"boolean"},a.fields=["*","_source"],a.script_fields={},a.fielddata_fields=[this.timeField],a},b.prototype.build=function(b){b.metrics=b.metrics||[{type:"count",id:"1"}],b.dsType="elasticsearch",b.bucketAggs=b.bucketAggs||[{type:"date_histogram",id:"2",settings:{interval:"auto"}}],b.timeField=this.timeField;var c,d,e,f={size:0,query:{filtered:{query:{query_string:{analyze_wildcard:!0,query:"$lucene_query"}},filter:{bool:{must:[{range:this.getRangeFilter()}]}}}}};if(0===b.bucketAggs.length){if(e=b.metrics[0],e&&"raw_document"!==e.type)throw{message:"Invalid query"};return this.documentQuery(f,b)}for(d=f,c=0;c<b.bucketAggs.length;c++){var g=b.bucketAggs[c],h={};switch(g.type){case"date_histogram":h.date_histogram=this.getDateHistogramAgg(g);break;case"filters":h.filters={filters:this.getFiltersAgg(g)};break;case"terms":this.buildTermsAgg(g,h,b);break;case"geohash_grid":h.geohash_grid={field:g.field,precision:g.settings.precision}}d.aggs=d.aggs||{},d.aggs[g.id]=h,d=h}for(d.aggs={},c=0;c<b.metrics.length;c++)if(e=b.metrics[c],"count"!==e.type){var i={},j=null;if(a.isPipelineAgg(e.type)){if(!e.pipelineAgg||!/^\d*$/.test(e.pipelineAgg))continue;j={buckets_path:e.pipelineAgg}}else j={field:e.field};for(var k in e.settings)e.settings.hasOwnProperty(k)&&null!==e.settings[k]&&(j[k]=e.settings[k]);i[e.type]=j,d.aggs[e.id]=i}return f},b.prototype.getTermsQuery=function(a){var b={size:0,query:{filtered:{query:{query_string:{analyze_wildcard:!0,query:"$lucene_query"}},filter:{bool:{must:[{range:this.getRangeFilter()}]}}}}};return b.aggs={1:{terms:{field:a.field,size:0,order:{_term:"asc"}}}},b},b});
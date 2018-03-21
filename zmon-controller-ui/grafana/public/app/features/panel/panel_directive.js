/*! grafana - v3.1.0 - 2018-03-21
 * Copyright (c) 2018 Torkel Ödegaard; Licensed Apache-2.0 */

System.register(["angular","jquery"],function(a){var b,c,d,e;return{setters:[function(a){b=a},function(a){c=a}],execute:function(){d=b["default"].module("grafana.directives"),e='\n  <div class="panel-container" ng-class="{\'panel-transparent\': ctrl.panel.transparent}">\n    <div class="panel-header">\n      <span class="alert-error panel-error small pointer" ng-if="ctrl.error" ng-click="ctrl.openInspector()">\n        <span data-placement="top" bs-tooltip="ctrl.error">\n          <i class="fa fa-exclamation"></i><span class="panel-error-arrow"></span>\n        </span>\n      </span>\n\n      <span class="panel-loading" ng-show="ctrl.loading">\n        <i class="fa fa-spinner fa-spin"></i>\n      </span>\n\n      <div class="panel-title-container drag-handle" panel-menu></div>\n    </div>\n\n    <div class="panel-content">\n      <ng-transclude></ng-transclude>\n    </div>\n    <panel-resizer></panel-resizer>\n  </div>\n\n  <div class="panel-full-edit" ng-if="ctrl.editMode">\n    <div class="tabbed-view tabbed-view--panel-edit">\n      <div class="tabbed-view-header">\n        <h2 class="tabbed-view-title">\n          {{ctrl.pluginName}}\n        </h2>\n\n        <ul class="gf-tabs">\n          <li class="gf-tabs-item" ng-repeat="tab in ::ctrl.editorTabs">\n            <a class="gf-tabs-link" ng-click="ctrl.changeTab($index)" ng-class="{active: ctrl.editorTabIndex === $index}">\n              {{::tab.title}}\n            </a>\n          </li>\n        </ul>\n\n        <button class="tabbed-view-close-btn" ng-click="ctrl.exitFullscreen();">\n          <i class="fa fa-remove"></i>\n        </button>\n      </div>\n\n      <div class="tabbed-view-body">\n        <div ng-repeat="tab in ctrl.editorTabs" ng-if="ctrl.editorTabIndex === $index">\n          <panel-editor-tab editor-tab="tab" ctrl="ctrl" index="$index"></panel-editor-tab>\n        </div>\n      </div>\n    </div>\n  </div>\n',d.directive("grafanaPanel",function(){return{restrict:"E",template:e,transclude:!0,scope:{ctrl:"="},link:function(a,b){var c=b.find(".panel-container"),d=a.ctrl;a.$watchGroup(["ctrl.fullscreen","ctrl.containerHeight"],function(){c.css({minHeight:d.containerHeight}),b.toggleClass("panel-fullscreen",!!d.fullscreen)})}}}),d.directive("panelResizer",["$rootScope",function(a){return{restrict:"E",template:'<span class="resize-panel-handle"></span>',link:function(b,d){function e(a){a.preventDefault(),m=!0,i=c["default"](a.target).offset(),j=parseInt(n.row.height),k=n.panel.span,l=c["default"](document).width(),h=n.row.panels[n.row.panels.length-1],c["default"]("body").on("mousemove",f),c["default"]("body").on("mouseup",g)}function f(a){n.row.height=j+(a.pageY-i.top),n.panel.span=k+(a.pageX-i.left)/l*12,n.panel.span=Math.min(Math.max(n.panel.span,1),12);var c=n.dashboard.rowSpan(n.row);Math.floor(c)<14&&(h===n.panel&&c>12?h.span-=c-12:h!==n.panel&&(h.span=h.span-(c-12),h.span=Math.min(Math.max(h.span,1),12))),b.$apply(function(){n.render()})}function g(){var d=n.dashboard.rowSpan(n.row);d<12&&d>11&&(h.span+=12-d),b.$apply(function(){a.$broadcast("render")}),c["default"]("body").off("mousemove",f),c["default"]("body").off("mouseup",g)}var h,i,j,k,l,m=!1,n=b.ctrl;d.on("mousedown",e),b.$on("$destroy",function(){d.off("mousedown",e)})}}}])}}});
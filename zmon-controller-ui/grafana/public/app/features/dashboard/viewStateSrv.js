/*! grafana - v3.1.0 - 2018-03-21
 * Copyright (c) 2018 Torkel Ödegaard; Licensed Apache-2.0 */

define(["angular","lodash","jquery"],function(a,b,c){"use strict";var d=a.module("grafana.services");d.factory("dashboardViewStateSrv",["$location","$timeout","templateSrv","contextSrv","timeSrv",function(a,d,e,f,g){function h(b){var c=this;c.state={},c.panelScopes=[],c.$scope=b,c.dashboard=b.dashboard,b.exitFullscreen=function(){c.state.fullscreen&&c.update({fullscreen:!1})},b.onAppEvent("time-range-changed",function(){var b=a.search(),c=g.timeRangeForUrl();b.from=c.from,b.to=c.to,a.search(b)}),b.onAppEvent("template-variable-value-updated",function(){c.updateUrlParamsWithCurrentVariables()}),b.onAppEvent("$routeUpdate",function(){var a=c.getQueryStringState();c.needsSync(a)&&c.update(a,!0)}),b.onAppEvent("panel-change-view",function(a,b){c.update(b)}),b.onAppEvent("panel-initialized",function(a,b){c.registerPanel(b.scope)}),this.update(this.getQueryStringState()),this.expandRowForPanel()}return h.prototype.updateUrlParamsWithCurrentVariables=function(){var c=a.search();b.each(c,function(a,b){0===b.indexOf("var-")&&delete c[b]}),e.fillVariableValuesForUrl(c),a.search(c)},h.prototype.expandRowForPanel=function(){if(this.state.panelId){var a=this.$scope.dashboard.getPanelInfoById(this.state.panelId);a&&(a.row.collapse=!1)}},h.prototype.needsSync=function(a){return b.isEqual(this.state,a)===!1},h.prototype.getQueryStringState=function(){var b=a.search();return b.panelId=parseInt(b.panelId)||null,b.fullscreen=!!b.fullscreen||null,b.edit="true"===b.edit||b.edit===!0||null,b.editview=b.editview||null,b},h.prototype.serializeToUrl=function(){var a=b.clone(this.state);return a.fullscreen=!!this.state.fullscreen||null,a.edit=!!this.state.edit||null,a},h.prototype.update=function(c){b.extend(this.state,c),this.dashboard.meta.fullscreen=this.state.fullscreen,this.state.fullscreen||(this.state.panelId=null,this.state.fullscreen=null,this.state.edit=null),a.search(this.serializeToUrl()),this.syncState()},h.prototype.syncState=function(){if(0!==this.panelScopes.length){if(this.dashboard.meta.fullscreen){this.fullscreenPanel&&this.leaveFullscreen(!1);var a=this.getPanelScope(this.state.panelId);if(!a)return;return a.ctrl.editModeInitiated||a.ctrl.initEditMode(),void this.enterFullscreen(a)}this.fullscreenPanel&&this.leaveFullscreen(!0)}},h.prototype.getPanelScope=function(a){return b.find(this.panelScopes,function(b){return b.ctrl.panel.id===a})},h.prototype.leaveFullscreen=function(a){var b=this,c=b.fullscreenPanel.ctrl;return c.editMode=!1,c.fullscreen=!1,this.$scope.appEvent("panel-fullscreen-exit",{panelId:c.panel.id}),!!a&&void d(function(){b.oldTimeRange!==c.range?b.$scope.broadcastRefresh():c.render(),delete b.fullscreenPanel})},h.prototype.enterFullscreen=function(a){var b=a.ctrl;b.editMode=this.state.edit&&this.$scope.dashboardMeta.canEdit,b.fullscreen=!0,this.oldTimeRange=b.range,this.fullscreenPanel=a,c(window).scrollTop(0),this.$scope.appEvent("panel-fullscreen-enter",{panelId:b.panel.id}),d(function(){b.render()})},h.prototype.registerPanel=function(a){var c=this;c.panelScopes.push(a),c.state.panelId===a.ctrl.panel.id&&(c.state.edit?a.ctrl.editPanel():a.ctrl.viewPanel()),a.$on("$destroy",function(){c.panelScopes=b.without(c.panelScopes,a)})},{create:function(a){return new h(a)}}}])});
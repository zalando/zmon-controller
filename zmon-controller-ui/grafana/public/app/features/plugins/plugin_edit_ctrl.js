/*! grafana - v3.1.0 - 2018-03-21
 * Copyright (c) 2018 Torkel Ödegaard; Licensed Apache-2.0 */

System.register(["angular","lodash"],function(a){var b,c,d;return{setters:[function(a){b=a},function(a){c=a}],execute:function(){d=function(){function a(a,b,c,d,e,f){this.$scope=a,this.$rootScope=b,this.backendSrv=c,this.$routeParams=d,this.$sce=e,this.$http=f,this.model={},this.pluginId=d.pluginId,this.tabIndex=0,this.tabs=["Overview"],this.preUpdateHook=function(){return Promise.resolve()},this.postUpdateHook=function(){return Promise.resolve()}}return a.$inject=["$scope","$rootScope","backendSrv","$routeParams","$sce","$http"],a.prototype.init=function(){var a=this;return this.backendSrv.get("/api/plugins/"+this.pluginId+"/settings").then(function(b){return a.model=b,a.pluginIcon=a.getPluginIcon(a.model.type),a.model.dependencies.plugins.forEach(function(b){b.icon=a.getPluginIcon(b.type)}),a.includes=c["default"].map(b.includes,function(b){return b.icon=a.getPluginIcon(b.type),b}),"app"===a.model.type&&(a.tabIndex=1,a.tabs.push("Config"),a.hasDashboards=c["default"].findWhere(b.includes,{type:"dashboard"}),a.hasDashboards&&a.tabs.push("Dashboards")),a.initReadme()})},a.prototype.initReadme=function(){var a=this;return this.backendSrv.get("/api/plugins/"+this.pluginId+"/readme").then(function(b){return System["import"]("remarkable").then(function(c){var d=new c;a.readmeHtml=a.$sce.trustAsHtml(d.render(b))})})},a.prototype.getPluginIcon=function(a){switch(a){case"datasource":return"icon-gf icon-gf-datasources";case"panel":return"icon-gf icon-gf-panel";case"app":return"icon-gf icon-gf-apps";case"page":return"icon-gf icon-gf-endpoint-tiny";case"dashboard":return"icon-gf icon-gf-dashboard"}},a.prototype.update=function(){var a=this;this.preUpdateHook().then(function(){var b=c["default"].extend({enabled:a.model.enabled,pinned:a.model.pinned,jsonData:a.model.jsonData,secureJsonData:a.model.secureJsonData},{});return a.backendSrv.post("/api/plugins/"+a.pluginId+"/settings",b)}).then(this.postUpdateHook).then(function(a){window.location.href=window.location.href})},a.prototype.importDashboards=function(){return Promise.resolve()},a.prototype.setPreUpdateHook=function(a){this.preUpdateHook=a},a.prototype.setPostUpdateHook=function(a){this.postUpdateHook=a},a.prototype.updateAvailable=function(){var a=this.$scope.$new(!0);a.plugin=this.model,this.$rootScope.appEvent("show-modal",{src:"public/app/features/plugins/partials/update_instructions.html",scope:a})},a.prototype.enable=function(){this.model.enabled=!0,this.model.pinned=!0,this.update()},a.prototype.disable=function(){this.model.enabled=!1,this.model.pinned=!1,this.update()},a}(),a("PluginEditCtrl",d),b["default"].module("grafana.controllers").controller("PluginEditCtrl",d)}}});
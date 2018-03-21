/*! grafana - v3.1.0 - 2018-03-21
 * Copyright (c) 2018 Torkel Ödegaard; Licensed Apache-2.0 */

define(["angular","../core_module","app/core/config"],function(a,b,c){"use strict";b["default"].controller("InvitedCtrl",["$scope","$routeParams","contextSrv","backendSrv",function(a,b,d,e){d.sidemenu=!1,a.formModel={},a.init=function(){e.get("/api/user/invite/"+b.code).then(function(c){a.formModel.name=c.name,a.formModel.email=c.email,a.formModel.username=c.email,a.formModel.inviteCode=b.code,a.greeting=c.name||c.email||c.username,a.invitedBy=c.invitedBy})},a.submit=function(){a.inviteForm.$valid&&e.post("/api/user/invite/complete",a.formModel).then(function(){window.location.href=c.appSubUrl+"/"})},a.init()}])});
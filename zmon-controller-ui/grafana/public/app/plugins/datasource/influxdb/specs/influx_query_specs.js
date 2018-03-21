/*! grafana - v3.1.0 - 2018-03-21
 * Copyright (c) 2018 Torkel Ödegaard; Licensed Apache-2.0 */

System.register(["test/lib/common","../influx_query"],function(a){var b,c;return{setters:[function(a){b=a},function(a){c=a}],execute:function(){b.describe("InfluxQuery",function(){var a={replace:function(a){return a}};b.describe("render series with mesurement only",function(){b.it("should generate correct query",function(){var d=new c["default"]({measurement:"cpu"},a,{}),e=d.render();b.expect(e).to.be('SELECT mean("value") FROM "cpu" WHERE $timeFilter GROUP BY time($interval) fill(null)')})}),b.describe("render series with policy only",function(){b.it("should generate correct query",function(){var d=new c["default"]({measurement:"cpu",policy:"5m_avg"},a,{}),e=d.render();b.expect(e).to.be('SELECT mean("value") FROM "5m_avg"."cpu" WHERE $timeFilter GROUP BY time($interval) fill(null)')})}),b.describe("render series with math and alias",function(){b.it("should generate correct query",function(){var d=new c["default"]({measurement:"cpu",select:[[{type:"field",params:["value"]},{type:"mean",params:[]},{type:"math",params:["/100"]},{type:"alias",params:["text"]}]]},a,{}),e=d.render();b.expect(e).to.be('SELECT mean("value") /100 AS "text" FROM "cpu" WHERE $timeFilter GROUP BY time($interval) fill(null)')})}),b.describe("series with single tag only",function(){b.it("should generate correct query",function(){var d=new c["default"]({measurement:"cpu",groupBy:[{type:"time",params:["auto"]}],tags:[{key:"hostname",value:"server\\1"}]},a,{}),e=d.render();b.expect(e).to.be('SELECT mean("value") FROM "cpu" WHERE "hostname" = \'server\\\\1\' AND $timeFilter GROUP BY time($interval)')}),b.it("should switch regex operator with tag value is regex",function(){var d=new c["default"]({measurement:"cpu",groupBy:[{type:"time",params:["auto"]}],tags:[{key:"app",value:"/e.*/"}]},a,{}),e=d.render();b.expect(e).to.be('SELECT mean("value") FROM "cpu" WHERE "app" =~ /e.*/ AND $timeFilter GROUP BY time($interval)')})}),b.describe("series with multiple tags only",function(){b.it("should generate correct query",function(){var d=new c["default"]({measurement:"cpu",groupBy:[{type:"time",params:["auto"]}],tags:[{key:"hostname",value:"server1"},{key:"app",value:"email",condition:"AND"}]},a,{}),e=d.render();b.expect(e).to.be('SELECT mean("value") FROM "cpu" WHERE "hostname" = \'server1\' AND "app" = \'email\' AND $timeFilter GROUP BY time($interval)')})}),b.describe("series with tags OR condition",function(){b.it("should generate correct query",function(){var d=new c["default"]({measurement:"cpu",groupBy:[{type:"time",params:["auto"]}],tags:[{key:"hostname",value:"server1"},{key:"hostname",value:"server2",condition:"OR"}]},a,{}),e=d.render();b.expect(e).to.be('SELECT mean("value") FROM "cpu" WHERE "hostname" = \'server1\' OR "hostname" = \'server2\' AND $timeFilter GROUP BY time($interval)')})}),b.describe("query with value condition",function(){b.it("should not quote value",function(){var d=new c["default"]({measurement:"cpu",groupBy:[],tags:[{key:"value",value:"5",operator:">"}]},a,{}),e=d.render();b.expect(e).to.be('SELECT mean("value") FROM "cpu" WHERE "value" > 5 AND $timeFilter')})}),b.describe("series with groupByTag",function(){b.it("should generate correct query",function(){var d=new c["default"]({measurement:"cpu",tags:[],groupBy:[{type:"time",interval:"auto"},{type:"tag",params:["host"]}]},a,{}),e=d.render();b.expect(e).to.be('SELECT mean("value") FROM "cpu" WHERE $timeFilter GROUP BY time($interval), "host"')})}),b.describe("render series without group by",function(){b.it("should generate correct query",function(){var d=new c["default"]({measurement:"cpu",select:[[{type:"field",params:["value"]}]],groupBy:[]},a,{}),e=d.render();b.expect(e).to.be('SELECT "value" FROM "cpu" WHERE $timeFilter')})}),b.describe("render series without group by and fill",function(){b.it("should generate correct query",function(){var d=new c["default"]({measurement:"cpu",select:[[{type:"field",params:["value"]}]],groupBy:[{type:"time"},{type:"fill",params:["0"]}]},a,{}),e=d.render();b.expect(e).to.be('SELECT "value" FROM "cpu" WHERE $timeFilter GROUP BY time($interval) fill(0)')})}),b.describe("when adding group by part",function(){b.it("should add tag before fill",function(){var d=new c["default"]({measurement:"cpu",groupBy:[{type:"time"},{type:"fill"}]},a,{});d.addGroupBy("tag(host)"),b.expect(d.target.groupBy.length).to.be(3),b.expect(d.target.groupBy[1].type).to.be("tag"),b.expect(d.target.groupBy[1].params[0]).to.be("host"),b.expect(d.target.groupBy[2].type).to.be("fill")}),b.it("should add tag last if no fill",function(){var d=new c["default"]({measurement:"cpu",groupBy:[]},a,{});d.addGroupBy("tag(host)"),b.expect(d.target.groupBy.length).to.be(1),b.expect(d.target.groupBy[0].type).to.be("tag")})}),b.describe("when adding select part",function(){b.it("should add mean after after field",function(){var d=new c["default"]({measurement:"cpu",select:[[{type:"field",params:["value"]}]]},a,{});d.addSelectPart(d.selectModels[0],"mean"),b.expect(d.target.select[0].length).to.be(2),b.expect(d.target.select[0][1].type).to.be("mean")}),b.it("should replace sum by mean",function(){var d=new c["default"]({measurement:"cpu",select:[[{type:"field",params:["value"]},{type:"mean"}]]},a,{});d.addSelectPart(d.selectModels[0],"sum"),b.expect(d.target.select[0].length).to.be(2),b.expect(d.target.select[0][1].type).to.be("sum")}),b.it("should add math before alias",function(){var d=new c["default"]({measurement:"cpu",select:[[{type:"field",params:["value"]},{type:"mean"},{type:"alias"}]]},a,{});d.addSelectPart(d.selectModels[0],"math"),b.expect(d.target.select[0].length).to.be(4),b.expect(d.target.select[0][2].type).to.be("math")}),b.it("should add math last",function(){var d=new c["default"]({measurement:"cpu",select:[[{type:"field",params:["value"]},{type:"mean"}]]},a,{});d.addSelectPart(d.selectModels[0],"math"),b.expect(d.target.select[0].length).to.be(3),b.expect(d.target.select[0][2].type).to.be("math")}),b.it("should replace math",function(){var d=new c["default"]({measurement:"cpu",select:[[{type:"field",params:["value"]},{type:"mean"},{type:"math"}]]},a,{});d.addSelectPart(d.selectModels[0],"math"),b.expect(d.target.select[0].length).to.be(3),b.expect(d.target.select[0][2].type).to.be("math")})})})}}});
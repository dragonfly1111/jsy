(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/my/distribution"],{"33b6":function(e,t,n){"use strict";var a=n("d9ff"),i=n.n(a);i.a},"3aca":function(e,t,n){"use strict";n.r(t);var a=n("49b1"),i=n.n(a);for(var r in a)"default"!==r&&function(e){n.d(t,e,function(){return a[e]})}(r);t["default"]=i.a},"49b1":function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n={data:function(){return{currentType:0,statistics:"",brokerageList:[],brokerages:1,brokeragesCount:0,generalize:"",generalizePage:1,generalizeList:[],generalizeCount:0}},methods:{chooseType:function(e){this.currentType=e},getBrokerage:function(){var t=this,n={token:e.getStorageSync("token"),userid:e.getStorageSync("customer").userid};this.ask("/app/me/commissionStatistics","POST",n,function(e){t.statistics=e.data.data,console.log(e)})},getBrokerageList:function(){var t=this,n={token:e.getStorageSync("token"),userid:e.getStorageSync("customer").userid,page:this.brokerages,pagesize:20};this.ask("/app/me/commissionList","POST",n,function(e){t.brokeragesCount=e.data.count;for(var n=0;n<e.data.data.length;n++)t.brokerageList.push(e.data.data[n]);console.log(e)})},getGeneralize:function(){var t=this,n={token:e.getStorageSync("token"),userid:e.getStorageSync("customer").userid};this.ask("/app/me/generalizeStatistics","POST",n,function(e){t.generalize=e.data.data,console.log(e)})},getGeneralizeList:function(){var t=this,n={token:e.getStorageSync("token"),userid:e.getStorageSync("customer").userid,page:this.generalizePage,pagesize:20};this.ask("/app/me/generalizeList","POST",n,function(e){t.generalizeCount=e.data.count;for(var n=0;n<e.data.data.length;n++)t.generalizeList.push(e.data.data[n]);console.log(e)})}},onLoad:function(){this.getBrokerage(),this.getBrokerageList(),this.getGeneralize(),this.getGeneralizeList()},onReachBottom:function(){0==this.currentType&&this.brokerageList.length!=this.brokeragesCount&&(this.brokerages++,this.getBrokerageList(this.brokerages)),1==this.currentType&&this.generalizeList.length!=this.generalizeCount&&(this.generalizePage++,this.getBrokerageList(this.generalizePage))}};t.default=n}).call(this,n("543d")["default"])},"83cc":function(e,t,n){"use strict";n.r(t);var a=n("c1ab"),i=n("3aca");for(var r in i)"default"!==r&&function(e){n.d(t,e,function(){return i[e]})}(r);n("33b6");var o,s=n("f0c5"),c=Object(s["a"])(i["default"],a["b"],a["c"],!1,null,null,null,!1,a["a"],o);t["default"]=c.exports},c1ab:function(e,t,n){"use strict";var a,i=function(){var e=this,t=e.$createElement,n=(e._self._c,e.__map(e.generalizeList,function(t,n){var a=decodeURIComponent(t.nickname);return{$orig:e.__get_orig(t),m0:a}}));e.$mp.data=Object.assign({},{$root:{l0:n}})},r=[];n.d(t,"b",function(){return i}),n.d(t,"c",function(){return r}),n.d(t,"a",function(){return a})},cd73:function(e,t,n){"use strict";(function(e){n("f0cb"),n("921b");a(n("66fd"));var t=a(n("83cc"));function a(e){return e&&e.__esModule?e:{default:e}}e(t.default)}).call(this,n("543d")["createPage"])},d9ff:function(e,t,n){}},[["cd73","common/runtime","common/vendor"]]]);
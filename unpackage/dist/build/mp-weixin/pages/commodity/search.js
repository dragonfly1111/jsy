(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/commodity/search"],{"2e6d":function(t,e,n){"use strict";n.r(e);var a=n("621a"),o=n.n(a);for(var i in a)"default"!==i&&function(t){n.d(e,t,function(){return a[t]})}(i);e["default"]=o.a},"621a":function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n={data:function(){return{count:0,imgHttp:"",searchList:[],index:1,searchKey:""}},methods:{toDetails:function(e){t.navigateTo({url:"./goods_details?id="+e})},getGoodsList:function(t){var e=this,n={page:t,searchvalue:this.searchKey};console.log(n),this.ask("/app/index/getSearchList","POST",n,function(t){e.count=t.data.count;for(var n=0;n<t.data.data.length;n++)e.searchList.push(t.data.data[n]);console.log(t)})}},onLoad:function(t){console.log(t),this.imgHttp=this.comHttp,this.searchKey=t.key,this.getGoodsList(1)},onReachBottom:function(){this.searchList.length!=this.count&&(this.index++,this.getGoodsList(this.index))}};e.default=n}).call(this,n("543d")["default"])},"9aea":function(t,e,n){"use strict";var a=n("baa2"),o=n.n(a);o.a},a491:function(t,e,n){"use strict";n.r(e);var a=n("e2c7"),o=n("2e6d");for(var i in o)"default"!==i&&function(t){n.d(e,t,function(){return o[t]})}(i);n("9aea");var c,s=n("f0c5"),u=Object(s["a"])(o["default"],a["b"],a["c"],!1,null,null,null,!1,a["a"],c);e["default"]=u.exports},baa2:function(t,e,n){},bf60:function(t,e,n){"use strict";(function(t){n("f0cb"),n("921b");a(n("66fd"));var e=a(n("a491"));function a(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("543d")["createPage"])},e2c7:function(t,e,n){"use strict";var a,o=function(){var t=this,e=t.$createElement,n=(t._self._c,t.__map(t.searchList,function(e,n){var a=e.keyword.replace(","," ");return{$orig:t.__get_orig(e),g0:a}}));t.$mp.data=Object.assign({},{$root:{l0:n}})},i=[];n.d(e,"b",function(){return o}),n.d(e,"c",function(){return i}),n.d(e,"a",function(){return a})}},[["bf60","common/runtime","common/vendor"]]]);
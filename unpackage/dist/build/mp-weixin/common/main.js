(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["common/main"],{"013f":function(t,e,o){"use strict";(function(t,e){o("f0cb"),o("921b");var n=u(o("66fd")),a=u(o("db09"));function u(t){return t&&t.__esModule?t:{default:t}}function c(t){for(var e=1;e<arguments.length;e++){var o=null!=arguments[e]?arguments[e]:{},n=Object.keys(o);"function"===typeof Object.getOwnPropertySymbols&&(n=n.concat(Object.getOwnPropertySymbols(o).filter(function(t){return Object.getOwnPropertyDescriptor(o,t).enumerable}))),n.forEach(function(e){i(t,e,o[e])})}return t}function i(t,e,o){return e in t?Object.defineProperty(t,e,{value:o,enumerable:!0,configurable:!0,writable:!0}):t[e]=o,t}var r=function(){return o.e("colorui/components/cu-custom").then(o.bind(null,"8224"))};n.default.component("cu-custom",r),n.default.config.productionTip=!1,a.default.mpType="app",n.default.prototype.hint=function(e){t.showToast({title:e,mask:!0,icon:"none",complete:function(){setTimeout(function(){t.hideToast(),"商品不存在!"==e&&t.navigateBack({delta:1})},1500)}})},n.default.prototype.comHttp="https://www.juanfenjiang.com/MicroMarket",n.default.prototype.ask=function(e,o,a,u){var c=this;"/app/index/addCollect"!=e&&t.showLoading({title:"loading"}),t.request({url:c.comHttp+e,data:a,timeout:6e4,header:{Accept:"*/*","Content-Type":"application/x-www-form-urlencoded; charset=UTF-8"},method:o,success:function(e){if(t.hideLoading(),1==e.data.isFail)return console.log(e),c.hint(e.data.msg),void n.default.prototype.hint(e.msg);u(e)},fail:function(e){"request:fail timeout"!=e.errMsg&&"request:fail The request timed out."!=e.errMsg||n.default.prototype.hint("请求超时,请稍后再试"),console.log(e),setTimeout(function(){t.hideLoading()},2500)}})},n.default.prototype.getinfo=function(e){var o=this;this.modalName="";var n="";console.log("哈哈哈",t.getStorageSync("sender")),wx.login({success:function(a){a.code&&(n=a.code,wx.getUserInfo({success:function(a){t.request({url:o.comHttp+"/app/userLogin/doLoginByxcx",data:{code:n,encryptedData:a.encryptedData,iv:a.iv,sender:t.getStorageSync("sender")},method:"GET",header:{Accept:"application/json","Content-Type":"application/json"},success:function(n){if(o.hint("登录中,请稍后"),console.log(n.data.msg),"获取用户信息错误！微信登录失败！"==n.data.msg)return o.modalName="doLoginModal",void o.hint("登录失败");o.hint("登录成功"),t.setStorageSync("token",n.data.token),-1==n.data.userInfo.avatar.indexOf("http")&&(n.data.userInfo.avatar=o.comHttp+n.data.userInfo.avatar),t.setStorageSync("customer",n.data.userInfo),o.userObj=n.data.userInfo,o.token=n.data.token,o.isLogin=!0,console.log(o.userObj),"cart"==e&&o.getCartList(),"goodsDetails"==e&&o.isCollect()}})},fail:function(){o.hint("微信授权失败")}}))}})};var s=new n.default(c({},a.default));e(s).$mount()}).call(this,o("543d")["default"],o("543d")["createApp"])},"14eb":function(t,e,o){},"8daf":function(t,e,o){"use strict";var n=o("14eb"),a=o.n(n);a.a},b1fa:function(t,e,o){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n=a(o("66fd"));function a(t){return t&&t.__esModule?t:{default:t}}var u={onLaunch:function(){var e=t.getUpdateManager();e.onCheckForUpdate(function(o){console.log(o),o.hasUpdate&&e.onUpdateReady(function(o){t.showModal({title:"更新提示",content:"发现新版本，是否重启应用?",cancelColor:"#eeeeee",confirmColor:"#FF0000",success:function(t){t.confirm&&e.applyUpdate()}})})}),e.onUpdateFailed(function(o){t.showModal({title:"提示",content:"检查到有新版本，但下载失败，请检查网络设置",success:function(t){t.confirm&&e.applyUpdate()}})}),t.getSystemInfo({success:function(t){n.default.prototype.StatusBar=t.statusBarHeight;var e=wx.getMenuButtonBoundingClientRect();n.default.prototype.Custom=e,n.default.prototype.CustomBar=e.bottom+e.top-t.statusBarHeight}})},onShow:function(){console.log("App Show")},onHide:function(){console.log("App Hide")}};e.default=u}).call(this,o("543d")["default"])},d622:function(t,e,o){"use strict";o.r(e);var n=o("b1fa"),a=o.n(n);for(var u in n)"default"!==u&&function(t){o.d(e,t,function(){return n[t]})}(u);e["default"]=a.a},db09:function(t,e,o){"use strict";o.r(e);var n=o("d622");for(var a in n)"default"!==a&&function(t){o.d(e,t,function(){return n[t]})}(a);o("8daf");var u,c,i,r,s=o("f0c5"),d=Object(s["a"])(n["default"],u,c,!1,null,null,null,!1,i,r);e["default"]=d.exports}},[["013f","common/runtime","common/vendor"]]]);
import Vue from 'vue'
import App from './App'
import cuCustom from './colorui/components/cu-custom.vue'
import floatWindows from './components/float-windows'
Vue.component('cu-custom', cuCustom)
Vue.component('floatWindows', floatWindows)
Vue.config.productionTip = false
App.mpType = 'app'

//消息框展示
Vue.prototype.hint = function(title) {
	uni.showToast({
		title: title,
		mask: true,
		icon: 'none',
		complete: function() {
			setTimeout(function() {
				uni.hideToast()
				if (title == '商品不存在!') {
					uni.navigateBack({
						delta: 1
					})
				}
			}, 1500)
		}
	})
}
//全局请求
// Vue.prototype.comHttp = 'https://www.juanfenjiang.com/MicroMarket'
Vue.prototype.comHttp = 'http://132.232.50.78:8080/MicroMarket'
// Vue.prototype.comHttp = 'http://rdp.wars.cat:3902/MicroMarket'

// Vue.prototype.comHttp = 'http://192.168.1.18'
Vue.prototype.ask = function(url, method, data, callback) {
	let self = this;
    if(url != '/app/index/addCollect'){
		uni.showLoading({
			title: 'loading'
		});
	}
	uni.request({
		url: self.comHttp + url,
		data: data,
		timeout: 60000,
		header: {
		        'Accept': '*/*',
		        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' 
		    },
		method: method,
		success: function(res) {
			// console.log(url)
			// console.log(res)
			
			uni.hideLoading()
			// if (res.data.isFail == true) {
			// 	console.log(res)
			// 	self.hint(res.data.msg);
			// 	Vue.prototype.hint(res.msg)
			// 	return
			// }
			callback(res);
		},
		fail: function(error) {
			// console.log(url)
			console.log(error);
			
			if (error.errMsg == 'request:fail timeout' || error.errMsg == 'request:fail The request timed out.') {
				Vue.prototype.hint('请求超时,请稍后再试')
			}
			setTimeout(function() {
				uni.hideLoading()
			}, 2500)
		}
	})
}

//获取用户信息
Vue.prototype.getinfo = function(type) {
	let self = this;
	this.modalName = '';
	let code = ''
	console.log(this)
	console.log('哈哈哈',uni.getStorageSync('sender'))
	wx.login({
		success(res) {
			//微信登录授权码
			if (res.code) {
				code = res.code;
				//微信授权
				
				wx.getUserInfo({
					success: function(res) {
						console.log('微信用户信息')
						console.log(res)

						uni.request({
							url: self.comHttp + '/app/userLogin/doLoginByxcx',
							data: {
								"code": code,
								"encryptedData": res.encryptedData,
								"iv": res.iv,
								"sender": uni.getStorageSync('sender'),
							},
							method: 'GET',
							header: {
								'Accept': 'application/json',
								'Content-Type': 'application/json' //自定义请求头信息
							},
							success: (res) => {
								//登录成功
								    self.hint('登录中,请稍后')
								    console.log(res.data.msg)	
									// 开始写缓存
					                if(res.data.msg == '获取用户信息错误！微信登录失败！'){
										self.modalName = 'doLoginModal';
										self.hint('登录失败')
										return
										
									}
									
									self.hint('登录成功')
									uni.setStorageSync('token', res.data.token);
									if(res.data.userInfo.avatar.indexOf('http') == -1){
										res.data.userInfo.avatar = self.comHttp + res.data.userInfo.avatar; 
									}
									uni.setStorageSync('customer', res.data.userInfo);
									self.userObj = res.data.userInfo;
									
									self.token = res.data.token;
									self.isLogin = true
									console.log(self.userObj)
								
									
									if(type == 'cart'){
										self.getCartList();
									}
									if(type == 'goodsDetails'){
										self.isCollect()
									}
									if(type == 'my'){
									}
								
									
									
								
							}
						});
					},
					fail: function() {
                       self.hint('微信授权失败')
					}
				})
			} else {

			}
		}
	})

}
const app = new Vue({
	...App
})
app.$mount()

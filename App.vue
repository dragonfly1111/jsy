<script>
	import Vue from 'vue'
	export default {
		onLaunch: function() {
			const updateManager = uni.getUpdateManager();
			updateManager.onCheckForUpdate(function(res) {
				console.log(res);
				// 请求完新版本信息的回调
				if (res.hasUpdate) {
					updateManager.onUpdateReady(function(res2) {
						uni.showModal({
							title: '更新提示',
							content: '发现新版本，是否重启应用?',
							cancelColor: '#eeeeee',
							confirmColor: '#FF0000',
							success(res2) {
								if (res2.confirm) {
									// 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
									updateManager.applyUpdate();
								}
							}
						});
					});
				}
			});
			
			updateManager.onUpdateFailed(function(res) {
				// 新的版本下载失败
				uni.showModal({
					title: '提示',
					content: '检查到有新版本，但下载失败，请检查网络设置',
					success(res) {
						if (res.confirm) {
							// 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
							updateManager.applyUpdate();
						}
					}
				});
			});
			
			uni.getSystemInfo({
				success: function(e) {
					// #ifndef MP
					Vue.prototype.StatusBar = e.statusBarHeight;
					if (e.platform == 'android') {
						Vue.prototype.CustomBar = e.statusBarHeight + 50;
					} else {
						Vue.prototype.CustomBar = e.statusBarHeight + 45;
					};
					// #endif
					// #ifdef MP-WEIXIN
					Vue.prototype.StatusBar = e.statusBarHeight;
					let custom = wx.getMenuButtonBoundingClientRect();
					Vue.prototype.Custom = custom;
					Vue.prototype.CustomBar = custom.bottom + custom.top - e.statusBarHeight;
					// #endif		
					// #ifdef MP-ALIPAY
					Vue.prototype.StatusBar = e.statusBarHeight;
					Vue.prototype.CustomBar = e.statusBarHeight + e.titleBarHeight;
					// #endif
				}
			})			
			
		},
		onShow: function() {
			console.log('App Show');
		},
		onHide: function() {
			console.log('App Hide');
		},

	};
</script>

<style>
	/*每个页面公共css */
	@import "colorui/main.css";
	@import "colorui/icon.css";

	page {
		background-color: #fff;
	}

	[v-cloak] {
		display: none;
	}

	.status_bar {
		height: var(--status-bar-height);
		width: 100%;
		/* background-color: #857825; */
		position: fixed;
		left: 0;
		top: 0;
	}

	.top_view {
		height: var(--status-bar-height);
		width: 100%;
		position: fixed;
		/* background-color: #857825; */
		top: 0;
		z-index: 9999999;
	}

	.no_more {
		font-size: 24rpx;
		color: #666;
		width: 100%;
		text-align: center;
		padding: 10rpx 0;

	}
</style>

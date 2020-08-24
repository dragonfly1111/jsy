<template>
	<view>
		<cu-custom bgColor="none-bg" :isBack="true">
			<block slot="content">会员码</block>
		</cu-custom>
		
		<view class="post">
			<canvas canvas-id="canvas" width="80%" height="75%"></canvas>
			<view class="post-foot">
				<view class="save-post" @click="savePost()">保存图片</view>
			</view>
		</view>
		
		<floatWindows :showFloat="true"></floatWindows>
	</view>
</template>

<script>
	
	export default{
		components:{

		},
		data(){
			return{
				imgHttp: '',
			}
		},
		methods:{
			getQrCode: function() {
				const params = {
					sceneStr: encodeURI(uni.getStorageSync('customer').wechat_id),
					pageUrl: 'pages/home/home',
				}
				let that = this
				this.ask("/api/share/createPoster", "POST", params, function(res) {
					that.drawCanvas(res.data.file_url)
				})
			},
			
			savePost() {
				wx.saveImageToPhotosAlbum({
					filePath: this.loadImagePath,
					success(res) {
						console.log('res', res);
						wx.showToast({
							title: '已保存到相册',
							icon: 'success',
							duration: 3000
						})
					}
				})
			},
			
			drawCanvas(url) {
				wx.showLoading({
					title: '加载中...',
				})
				let that = this
				const ctx = wx.createCanvasContext('canvas', that)
				wx.downloadFile({
					url: this.imgHttp + '/marketResources/upload/2007/share.png',
					// url: 'http://bcjtfiles.oss-cn-shenzhen.aliyuncs.com/Activity/%E9%A6%96%E9%A1%B5-%E5%88%86%E4%BA%AB%E9%A1%B5%E9%9D%A2.png',
					success: (res) => {
						console.log(res)
						if (res.statusCode === 200) {
							ctx.drawImage(res.tempFilePath, 0, 0, wx.getSystemInfoSync().windowWidth * 0.8, wx.getSystemInfoSync().windowHeight *
								0.7)
							ctx.draw(true)
							wx.downloadFile({
								url: url,
								// url: this.imgHttp + url,
								// url: 'http://bcjtfiles.oss-cn-shenzhen.aliyuncs.com/avatar/144c1f24680449db860d6d8b1671958a.jpg',
								success: (res) => {
									console.log(res)
									if (res.statusCode === 200) {
										ctx.drawImage(res.tempFilePath, wx.getSystemInfoSync().windowWidth * 0.25, wx.getSystemInfoSync().windowHeight *
											0.5, wx.getSystemInfoSync().windowWidth * 0.3, wx.getSystemInfoSync().windowWidth * 0.3)
										ctx.draw(true,function(){
											console.log('画完了')
											wx.canvasToTempFilePath({
												canvasId: 'canvas',
												success: function(res) {
													wx.hideLoading()
													that.loadImagePath = res.tempFilePath
												},
												fail: function(res) {
													wx.hideLoading()
													console.log(res);
												}
											},that);
										})
										
			
									}
								},
								fail: (res) => {
									console.log(res)
			
								}
							})
						}
					},
					fail: (res) => {
						console.log(res)
			
					}
				})
			},
			
		},
		onLoad(option) {
			this.imgHttp = this.comHttp
			this.getQrCode()
		},
		onShow() {
			
		},
		created() {
			
		}
	}
</script>

<style lang="scss" scoped>
	.post {
		height: 70vh;
		width: 80vw;
		margin: 5vh auto 0 auto;
		// top: 0;
		// left: 0;
		// position: fixed;
		// z-index: 10000;
		// background-color: rgba(0, 0, 0, 0.7);
	
		canvas {
			width: 100%;
			height: 100%;
		}
	
	
		.post-foot {
			display: flex;
			margin-top: 50rpx;
			width: 100%;
	
			.save-post {
				margin-bottom: 10%;
				width: 100%;
				height: 80rpx;
				text-align: center;
				line-height: 80rpx;
				background-color: #857827;
				color: #FFFFFF;
				font-size: 32rpx;
			}
		}
	
	}
</style>

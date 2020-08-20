<template>
	<view>
		<view v-if="showFloat && showIcon || openShareSheet" class="mask" @click="showList"></view>

		<view class="add-icon" :class="!showFloat ? 'hide-add' : 'show-add'" :style="showIcon1 ? 'background-color: #2c2c2c' : ''"
		 @click="showList()">
			<view :class="showIcon1 ? 'close_image' : 'add_image'"></view>
			<!-- <image src="../static/floaWindow/add.png"></image> -->
		</view>

		<view class="icon_list" :class="closing ? 'close_list' : ''" v-if="showFloat && showIcon">
			<view class="icon_row">
				<view @click="toCart()" class="icon_item">
					<image src="../static/floaWindow/cart.png"></image>
					<view>购物车</view>
				</view>
				<view class="icon_item">
					<button open-type='contact'>
						<image src="../static/floaWindow/service.png"></image>
					</button>
					<view>客服</view>

				</view>
				<view @click="openShare()" class="icon_item">
					<image src="../static/floaWindow/share.png"></image>
					<view>分享</view>
				</view>
			</view>

			<view class="icon_row">
				<view @click="toMember()" class="icon_item">
					<image src="../static/floaWindow/member.png"></image>
					<view>会员</view>
				</view>
				<view class="icon_item">
					<image src="../static/floaWindow/goods.png"></image>
					<view>推荐</view>
				</view>
				<view @click="toTop()" class="icon_item">
					<image src="../static/floaWindow/top.png"></image>
					<view>顶部</view>
				</view>
			</view>


		</view>

		<view class="post" v-show="showPost">
			<canvas canvas-id="canvas" width="80%" height="75%"></canvas>
			<!-- <image :src="imgHttp+'/marketResources/upload/2007/share.png'" mode=""></image> -->
			<view class="post-foot">

				<view class="close-post" @click="showPost = false">关闭</view>
				<view class="save-post" @click="savePost()">保存图片</view>
			</view>
		</view>

		<view :class="openShareSheet ? 'show-share' : ''" class="share-box">
			<view style="height: 50rpx;width: 100%;"></view>
			<button open-type="share">发送给朋友</button>

			<view style="height: 45rpx;width: 100%;"></view>
			<view @click="generatePoster()">生成海报</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: ['showFloat', 'goodsObj'],
		data() {
			return {
				showIcon: false,
				showIcon1: false,
				closing: false,
				openShareSheet: false,
				showPost: false,
				imgHttp: '', //图片接口前缀
				loadImagePath: '', //生成的图片临时路径

			}
		},
		mounted() {
			this.imgHttp = this.comHttp;
		},


		methods: {
			getQrCode: function() {
				let params
				if (this.goodsObj) {
					params = {
						key: this.goodsObj.id,
						sceneStr: encodeURI(uni.getStorageSync('customer').wechat_id),
						pageUrl: 'pages/commodity/goods_details',
					}
				} else {
					params = {
						sceneStr: encodeURI(uni.getStorageSync('customer').wechat_id),
						pageUrl: 'pages/home/home',
					}
				}

				let that = this
				this.ask("/api/share/createPoster", "POST", params, function(res) {
					that.drawCanvas(res.data.file_url)
				})
			},
			drawCanvas(url) {
				wx.showLoading({
					title: '海报生成中...',
				})
				if (!this.goodsObj) {
					this.drawCommon(url)
				} else {
					this.drawGoods(url)
				}

			},

			// 普通海报逻辑
			drawCommon(url) {
				let that = this
				const ctx = wx.createCanvasContext('canvas', that)
				wx.downloadFile({
					url: this.imgHttp + '/marketResources/upload/2007/share.png',
					// url: 'http://bcjtfiles.oss-cn-shenzhen.aliyuncs.com/Activity/%E9%A6%96%E9%A1%B5-%E5%88%86%E4%BA%AB%E9%A1%B5%E9%9D%A2.png',
					success: (res) => {
						console.log(res)
						if (res.statusCode === 200) {
							ctx.drawImage(res.tempFilePath, 0, 0, wx.getSystemInfoSync().windowWidth * 0.8, wx.getSystemInfoSync().windowHeight *
								0.75)
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
										ctx.draw(true, function() {
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
											}, that);
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

			// 商品海报逻辑
			drawGoods(url) {
				let that = this
				let rate = 0.5

				const ctx = wx.createCanvasContext('canvas', that)
				wx.hideLoading()
				ctx.fillStyle = '#FFFFFF' //白色背景
				ctx.fillRect(0, 0, wx.getSystemInfoSync().windowWidth, wx.getSystemInfoSync().windowHeight)
				wx.downloadFile({
					url: this.imgHttp + this.goodsObj.cover,
					success: (res) => {
						console.log(res)
						if (res.statusCode === 200) {
							// 商品图部分
							let coverX = wx.getSystemInfoSync().windowWidth * 0.8 * 0.05
							let coverY = wx.getSystemInfoSync().windowWidth * 0.8 * 0.1
							ctx.beginPath();
							ctx.save();
							let width = wx.getSystemInfoSync().windowWidth * 0.8 * 0.9 - 10
							let radius = 8 * rate
							let angleLine = 10 * rate
							ctx.setLineWidth(1)
							ctx.setStrokeStyle('#E9E9E9')
							ctx.moveTo(coverX + angleLine, coverY); // 创建开始点
							ctx.lineTo(coverX + angleLine + width, coverY); // 创建水平线
							ctx.arcTo(coverX + angleLine * 2 + width, coverY, coverX + angleLine * 2 + width, coverY +
								angleLine, radius); // 创建弧
							ctx.lineTo(coverX + angleLine + width + angleLine, coverY + angleLine + width); // 创建垂直线
							ctx.arcTo(coverX + angleLine * 2 + width, coverY + angleLine * 2 + width, coverX + angleLine + width,
								coverY + angleLine * 2 + width, radius); // 创建弧
							ctx.lineTo(coverX + angleLine, coverY + angleLine * 2 + width); // 创建水平线
							ctx.arcTo(coverX, coverY + angleLine * 2 + width, coverX, coverY + angleLine + width, radius); // 创建弧
							ctx.lineTo(coverX, coverY + angleLine); // 创建垂直线
							ctx.arcTo(coverX, coverY, coverX + angleLine, coverY, radius); // 创建弧
							ctx.stroke(); // 这个具体干什么用的？
							ctx.clip();
							ctx.drawImage(res.tempFilePath, coverX, coverY, width + 20, width + 20);
							ctx.restore();
							ctx.draw()

							// 商品描述部分
							// 商品名
							ctx.font = `16px Arial`
							ctx.fillStyle = '#000000'
							ctx.textBaseline = 'middle'
							ctx.fillText(that.goodsObj.name, coverX, width + coverY + 50);

							// 价格前的小符号
							ctx.font = `14px Arial`
							ctx.fillStyle = '#7b7634'
							ctx.textBaseline = 'middle'
							ctx.fillText('¥', coverX, width + coverY + 80);


							// 价格
							ctx.font = `18px Arial`
							ctx.fillStyle = '#7b7634'
							ctx.textBaseline = 'middle'
							ctx.fillText(parseFloat(that.goodsObj.sellingprice), coverX + 14, width + coverY + 80);


							// 原价格
							ctx.font = `12px Arial`
							ctx.fillStyle = '#999999';
							ctx.textBaseline = 'middle'
							ctx.fillText('原价：¥' + that.goodsObj.marketprice, coverX, width + coverY + 100);
							ctx.draw(true)


							// 二维码
							wx.downloadFile({
								url: url,
								success: (res) => {
									console.log(res)
									if (res.statusCode === 200) {
										const x = wx.getSystemInfoSync().windowWidth * 0.8 * 0.5
										const y = wx.getSystemInfoSync().windowHeight * 0.75 - x - 100
										const height = wx.getSystemInfoSync().windowWidth * 0.3
										console.log(x,y,height)
										ctx.drawImage(res.tempFilePath,x,y,height,height);
										ctx.restore();
										
										ctx.draw(true)

									}
								}
							})
						}
					},
					fail: (res) => {
						console.log(res)

					}
				})

				// console.log(this.goodsObj)
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

			generatePoster() {
				if (uni.getStorageSync('customer').userid) {
					this.openShareSheet = false
					this.showPost = true
					this.getQrCode()
				} else {
					this.hint('请先登录再生成海报')
				}
			},

			openShare() {
				this.closing = true
				this.showIcon1 = false
				setTimeout(() => {
					this.closing = false
					this.showIcon = false
				}, 200)
				this.openShareSheet = true
			},

			showList() {
				if (!this.showIcon) {
					this.showIcon = true
					this.showIcon1 = true
				} else {
					this.closing = true
					this.showIcon1 = false
					setTimeout(() => {
						this.closing = false
						this.showIcon = false
					}, 200)
				}

				if (this.openShareSheet) {
					this.openShareSheet = false
				}
			},

			toCart() {
				this.showList()

				uni.navigateTo({
					url: '../cart/cart'
				})
			},

			//跳转到会员
			toMember() {
				this.showList()

				uni.navigateTo({
					url: "../my/member"
				})
			},

			toTop() {
				this.showList()

				uni.pageScrollTo({
					scrollTop: 0,
					duration: 300
				});
			}
		}
	}
</script>

<style scoped lang="scss">
	.mask {
		height: 100vh;
		width: 100vw;
		top: 0;
		left: 0;
		position: fixed;
		z-index: 10000;
		// background-color: rgba(0,0,0,0.7);

	}


	.post {
		height: 100vh;
		width: 100vw;
		top: 0;
		left: 0;
		position: fixed;
		z-index: 10000;
		background-color: rgba(0, 0, 0, 0.7);

		canvas {
			width: 80%;
			height: 75%;
			margin: 50px 10% 0 10%;
		}


		.post-foot {
			display: flex;
			margin: 50rpx 10% 0 10%;
			width: 100%;

			.close-post {
				width: 35%;
				height: 80rpx;
				text-align: center;
				line-height: 80rpx;
				background-color: #FFFFFF;
				border: 1px solid #000000;
			}

			.save-post {
				margin-bottom: 10%;
				width: 35%;
				height: 80rpx;
				text-align: center;
				line-height: 80rpx;
				margin-left: 10%;
				background-color: #857827;
				color: #FFFFFF;
				font-size: 32rpx;
			}
		}

	}

	.share-box {
		position: fixed;
		bottom: -220rpx;
		background-color: #FFFFFF;
		border-top-left-radius: 40rpx;
		border-top-right-radius: 40rpx;
		height: 220rpx;
		width: 100%;
		text-align: center;
		z-index: 10001;
		box-shadow: 0 5rpx 20rpx 10rpx #999999;

		button {
			height: 80rpx;
			font-size: 32rpx;
			width: 100%;
			color: #666666;
		}

		view {
			height: 80rpx;
			font-size: 32rpx;
			color: #666666;
		}
	}

	.show-share {
		animation: showShare 0.2s forwards;
	}

	@keyframes showShare {
		0% {
			bottom: -220rpx;
		}

		100% {
			bottom: 0rpx;
		}
	}

	.add-icon {
		position: fixed;
		bottom: 100rpx;
		right: 50rpx;
		width: 80rpx;
		height: 80rpx;
		border-radius: 50%;
		box-shadow: 0 0 10rpx 1rpx #cfcece;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: #FFFFFF;
		z-index: 10001;

	}

	.add_image {
		width: 80%;
		height: 80%;
		background: url(../static/floaWindow/add.png) 50% 50% no-repeat;
		background-size: 100%;
		animation: changeIcon1 0.2s forwards;
	}

	.close_image {
		width: 80%;
		height: 80%;
		animation: changeIcon 0.2s forwards;
	}

	.icon_list {
		background-color: rgba($color: #000000, $alpha: 0.8);
		padding: 20rpx;
		position: fixed;
		bottom: 100rpx;
		right: 0rpx;
		z-index: 10000;

		// bottom: 150rpx;
		// right: 180rpx;
		border-radius: 50rpx;
		animation: showList 0.2s forwards;

		image {
			margin: 20rpx;
			width: 80rpx;
			height: 80rpx;
		}

		.icon_row {
			width: 100%;
			display: flex;

			.icon_item {
				text-align: center;
				color: #FFFFFF;
			}
		}
	}

	button {
		height: 100rpx;
		width: 100rpx;
		padding: 0;
		margin: 0;
		line-height: unset;
		border: none;
		background: unset;
		// width: 100rpx;
		// height: 100rpx;
		display: inline;

		image {
			margin-bottom: 12rpx;
		}
	}

	button::after {
		height: 0;
		width: 0;
	}

	.close_list {
		animation: hideList 0.2s forwards;
	}

	.hide-add {
		animation: hideAdd 0.2s forwards;
	}

	.show-add {
		animation: showAdd 0.2s forwards;

	}

	@keyframes hideAdd {
		0% {
			transform: translateX(0rpx);
		}

		100% {
			transform: translateX(100rpx);

		}
	}

	@keyframes showAdd {
		0% {
			transform: translateX(100rpx);
		}

		100% {
			transform: translateX(0rpx);
		}
	}

	@keyframes changeIcon {
		0% {
			transform: rotate(0);
		}

		100% {
			transform: rotate(90deg);
			background: url(../static/floaWindow/add_white.png) 50% 50% no-repeat;
			background-size: 100%;
		}
	}

	@keyframes changeIcon1 {
		0% {
			transform: rotate(90deg);
			background: url(../static/floaWindow/add.png) 50% 50% no-repeat;
			background-size: 100%;
		}

		100% {
			transform: rotate(0);
		}
	}


	@keyframes showList {
		0% {
			transform: scale(0) translateX(0) translateY(0);
		}

		100% {
			transform: scale(1) translateX(-180rpx) translateY(-50rpx);
		}
	}

	@keyframes hideList {
		0% {
			transform: scale(1) translateX(-180rpx) translateY(-50rpx);
		}

		100% {
			transform: scale(0) translateX(0) translateY(0);
		}
	}
</style>

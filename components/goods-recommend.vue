<template>
	<view>
		<view class="title">
			<text class="title-text">更多精选商品</text>
		</view>
		
		<view class="goods-wrapper">
			<view class="flex flex-wrap">
				<view class="basis-df" v-for="(item, index) in 6" :class="{'text-right': index % 2 != 0}">
					<image></image>
					<view class="info" :class="{'move-right': index % 2 != 0}">
						<view>
							<view class="goods-name">
								山东红富士
							</view>
							<view class="goods-price">
								¥ 20元/斤
							</view>
						</view>
						<text class="lg cuIcon-cart"></text>
					</view>
				</view>
			</view>
		</view>
		
		<view class="go-shop">
			进店逛逛
			<image src="../../../static/details/arrow.png"></image>
		</view>
	</view>
</template>

<script>
</script>

<style scoped lang="scss">
	.title{
		width: 100%;
		font-size: 26rpx;
		text-align: center;
		height: 30rpx;
		line-height: 28rpx;
		position: relative;
		margin-bottom: 20rpx;
		.title-text{
			margin: 0 20rpx;
		}
	}
	.title-text::before{
		content: "";
		width: 32%;
		height: 2rpx;
		background-color: #999999;
		position: absolute;
		top: 13rpx;
		left: 5%;
	}
	
	.title-text::after{
		content: "";
		width: 32%;
		height: 2rpx;
		background-color: #999999;
		position: absolute;
		top: 13rpx;
		right: 5%;
	}
	
	.goods-wrapper {
		width: 85%;
		margin: 0 auto;
		.basis-df {
			image {
				width: calc(100% - 20rpx);
				height:0;
				padding-bottom:100%;
				background: #eee;
			}
			.info {
				display: flex;
				justify-content: space-between;
				align-items: center;
				.goods-name {
					font-size: 20rpx;
					color: #81772b;
					font-weight: bold;
					margin-top: 20rpx;
					text-align: left;
				}
				.goods-price {
					text-align: left;
					font-size: 17rpx;
					color: #9f9e9f;
					margin-bottom: 40rpx;
				}
				.cuIcon-cart {
					color: #81772b;
					margin-top: -40rpx;
					padding-right: 20rpx;
				}
			}
			/* .basis-df:nth-child(even) {
				text-align: right !important;
			} */
			.text-right {
				text-align: right;
			}
			.move-right {
				position: relative;
				left: 20rpx;
			}
		}
	}
	
	.go-shop{
		width: 85%;
		margin: 30rpx auto 0 auto;
		height: 60rpx;
		color: #666666;
		border: 1rpx solid #999999;
		display: flex;
		align-items: center;
		justify-content: center;
		image{
			width: 20rpx;
			height: 20rpx;
			margin-left: 20rpx;
		}
	}
</style>

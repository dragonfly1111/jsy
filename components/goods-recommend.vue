<template>
	<view>
		<view class="title">
			<text class="title-text">更多精选商品</text>
		</view>
		
		<view class="goods_list">
			<view class="goods" v-for="(item,index) in goodsList" :key='index' @click="toGoods(item.id)">
				<image class="goods_img" :src="imgHttp+item.cover" mode=""></image>
				<view style="padding: 15rpx 12rpx;">
					<view class="goods_name">
						<view class="goods_name_title">{{item.name}}</view>
					</view>
							
					<view class="price_box">
						<view class="price_left">
							<text class="symbol">￥</text><text class="price">{{item.sellingprice}}</text>
							<!-- <text class="unit">/{{item.unit}}</text> -->
						</view>
						<image class="cart" src="../static/home/cart.png" mode=""></image>
					</view>
				</view>
				
			</view>
		</view>
		
		
		<view class="go-shop" @click="toHome()">
			进店逛逛
			<image src="../static/details/arrow.png"></image>
		</view>
	</view>
</template>

<script>
	export default{
		props:['terms'],
		data(){
			return{
				goodsList:[],
				imgHttp:''
			}
		},
		methods:{
			toHome(){
				uni.switchTab({
					url:"../home/home"
				})
			},
			
			//跳转到商品详情
			toGoods(id){
				uni.navigateTo({
					url:"../commodity/goods_details?id=" + id
				})
			},
			//获取精选商品列表
			getGoodList(){
				let self = this;
				let params
				if(self.terms){
					params = {
						page:1,
						pagesize: 6,
						is_choice: 1,
						terms: encodeURI(self.terms)
					}
				} else{
					params = {
						page:1,
						pagesize: 6,
						is_choice: 1
					}
				}
				this.ask("/app/index/getProductList", "POST", params, function(res) {
					self.goodsList = res.data.data
					self.goodsList.push([]);
					self.goodsList.pop();
				})
			}
		},
		mounted() {
			this.imgHttp = this.comHttp;
			this.getGoodList()
		},
		watch:{
			terms(val){
				this.getGoodList()
			}
		}
	}
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
	
	.goods_list{
		width: 100%;
		padding: 0 30rpx;
		// padding: 30rpx 0rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		flex-wrap: wrap;
		background-color: #f8f8f8;
	}
	.goods{
		width: 335rpx;
		// display: flex;
		// flex-direction: column;
		// justify-content: flex-start;
		// align-items: center;
		margin-bottom: 30rpx;
		color: #857825;
		height: 470rpx;
	    // border-radius: 10rpx;
		background-color: #FFFFFF;
		position: relative;
		
		.goods_img{
			width: 335rpx;
		    height: 335rpx;			
		}
		.cart{
			width: 40rpx;
			height: 40rpx;
		}
		.goods_name{
			margin-bottom: 30rpx;
			width: 100%;
			.goods_name_title{
				width: 100%;
				font-size: 28rpx;
				color: #333333;
	
				display: -webkit-box;
				overflow: hidden;
				text-overflow: ellipsis;
				word-wrap: break-word;
				white-space: normal !important;
				-webkit-line-clamp: 2;
				-webkit-box-orient: vertical;
			}
		}
	
		.price_box{
			display: flex;
			align-items: center;
			justify-content: space-between;
			position: absolute;
			bottom: 10rpx;
			width: calc(100% - 20rpx);
			font-size: 26rpx;
			.price_left{
				display: flex;
				align-items: center;
				font-size: 26rpx;
				.symbol{
					font-size: 19rpx;
					color: #f74845;
					margin-right: 5rpx;
				}
				.price{
					color: #f74845;
					// font-weight: bold;
				}
				.unit{
					color: #f74845;
				}
			}
			image{
				height: 25rpx;
				width: 27rpx;
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

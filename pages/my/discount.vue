<template>
	<view class="discount_bxo" v-cloak>
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<block slot="content">优惠券</block>
		</cu-custom>
		<view class="discount_list">
			<view class="no_more" v-if="discountList.length == 0">
				<image src="../../static/my/no-coupon.png"></image>
				<view class="remark">暂时还没有优惠券码哦</view>
				<view class="cu-btn bg-golden margin-tb-sm" @click="toHome()">进 店 逛 逛</view>
			</view>
			
			<view class="row" v-if=" (item.conditionsofuse <= minPrice && item.coupon_type =='1') || item.coupon_type =='0'  "
			 @click="isChoosed(item.id)" v-for="(item,index) in discountList" :key='index'>

				<image class="angle" src="../../static/my/angle.png" mode="" v-if="chooseed.includes(item.id)"></image>
				<view class="discount_msg">
					<view class="left">
						<view class="symbol">￥</view>
						<text class="big_num">{{item.money}}</text>
					</view>
					<view class="right">
						<view class="title">RMB_</view>
						<view class="sub_title">{{item.title}}</view>

						<view class="time">有效期: 111111</view>
					</view>
				</view>

			</view>
		</view>
		<floatWindows :showFloat="true"></floatWindows>

	</view>

</template>

<script>
	import floatWindows from '../../components/float-windows.vue'

	export default {
		components: {
			floatWindows
		},
		data() {
			return {
				chooseed: [],
				discountList: '',
				sourceType: '',
				discountPrice: 0,
				minPrice: 0, //满减优惠劵的最低使用价格
			}
		},
		methods: {
			toHome() {
				uni.switchTab({
					url: "../home/home"
				})
			},
			isChoosed(id) {
				if (this.sourceType != '1') return

				if (this.chooseed.length == 0) {
					this.chooseed.push(id);
				} else {
					if (this.chooseed.indexOf(id) === -1) {
						// 不存在,则添加
						this.chooseed.push(id)
					} else {
						// 存在,则删除
						this.chooseed.splice(this.chooseed.indexOf(id), 1)
					}
				}
				this.discountPrice = 0;
				for (let i = 0; i < this.discountList.length; i++) {
					for (let j = 0; j < this.chooseed.length; j++) {
						if (this.discountList[i].id == this.chooseed[j]) {
							this.discountPrice += this.discountList[i].money;
						}
					}
				}
				console.log(this.discountPrice)
				uni.$emit('discountArr', {
					choosed: this.chooseed,
					discountPrice: this.discountPrice
				})

			},
			//获取优惠券列表
			getDiscountList() {
				let self = this;
				let data = {
					"token": uni.getStorageSync('token'),
					"userid": uni.getStorageSync('customer').userid
				}
				this.ask('/app/coupon/getCouponList', 'POST', data, function(res) {
					console.log(res)
					self.discountList = res.data.couponlist;

				})
			}
		},
		onLoad(option) {
			console.log(option)
			if (JSON.stringify(option) != '{}') {
				this.sourceType = option.type;
				this.minPrice = Number(option.minPrice);
				// console.log(this.minPrice)
				if (JSON.parse(option.couponId) != "") {
					this.chooseed = JSON.parse(option.couponId)
					console.log(this.chooseed)
				}
				this.getDiscountList();
			} else {
				this.minPrice = 999999999999;
				this.getDiscountList();
			}

		}
	}
</script>

<style lang="scss">
	page {
		background-color: #f9f9f9;
	}

	.no_more {
		image {
			width: 366rpx;
			height: 290rpx;
			margin-top: 200rpx;
		}
		.remark{
			text-align: center;
			margin: 20rpx 0;
			color: #999999;
			font-size: 30rpx;
			
		}
		.cu-btn{
			border-radius: 40rpx;
		}
	}

	.discount_bxo {
		width: 100%;

		.discount_list {
			width: 100%;
			padding: 30rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			flex-direction: column;

			.row {
				width: 100%;
				min-height: 180rpx;
				// background-image: linear-gradient(to right,#85792a,#af9c42);
				background: url(../../static/my/coupon.png) 50% 50% no-repeat;
				background-size: 100%;
				display: flex;
				justify-content: flex-start;
				// align-items: center;
				// flex-direction: column;
				color: #fff;
				border-radius: 12rpx;
				// border: 1rpx solid #e1e1e1;
				box-shadow: 0 5rpx 5rpx 5rpx #F0F0F0;
				position: relative;
				margin-bottom: 30rpx;
				position: relative;

				.angle {
					position: absolute;
					right: 0;
					top: 0;
					width: 80rpx;
					height: 80rpx;
				}

				.discount_msg {
					display: flex;
					width: 70%;
					align-items: baseline;
					// justify-content: flex-start;
					height: 200rpx;
					padding: 0 25rpx;

					.left {
						margin: 0 20rpx 0 8rpx;
						color: #81772b;
						display: flex;

						.symbol {
							font-size: 28rpx;
							margin-top: 40rpx;
							font-weight: bold;

						}

						.big_num {
							font-size: 160rpx;
							font-weight: bold;
						}
					}

					.right {
						color: #81772b;
						transform: translateY(20rpx);

						.sub_title {
							font-size: 32rpx;
							font-weight: bold;
						}

						.time {
							color: #999999;
							font-size: 28rpx;
						}
					}
				}
			}
		}
	}


	// .row::after{
	// 	content: "";
	// 	background-color: #f9f9f9;
	// 	position: absolute;
	// 	width: 40rpx;
	// 	height: 40rpx;
	// 	left: -20rpx;
	// 	top: 65%;
	// 	border-radius: 50%;
	// 	border-right: 1rpx solid #e1e1e1;

	// }
	// .row::before{
	// 	content: "";
	// 	background-color: #f9f9f9;
	// 	position: absolute;
	// 	width: 40rpx;
	// 	height: 40rpx;
	// 	right: -20rpx;
	// 	top: 65%;
	// 	border-radius: 50%;
	// 	border-left: 1rpx solid #e1e1e1;
	// }
	.row_red {
		background-image: linear-gradient(to right, #d9383f, #e3575c) !important;
	}

	.row_gray {
		background-image: linear-gradient(to right, #c2c2c2, #c2c2c2) !important;
	}
</style>

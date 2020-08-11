<template>
	<view class="discount_bxo" v-cloak>
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<block slot="content">优惠券</block>
		</cu-custom>
		<view class="discount_list">
			<view class="no_more" v-if="discountList.length == 0">
			    没有更多了	
			</view>
			
			<view class="row" :class="{row_red: item.coupon_type == 0}" v-if=" (item.conditionsofuse <= minPrice && item.coupon_type =='1') || item.coupon_type =='0'  "   @click="isChoosed(item.id)" v-for="(item,index) in discountList" :key='index'>
		
				<image class="angle" src="../../static/my/angle.png" mode="" v-if="chooseed.includes(item.id)"></image>
				<view class="discount_msg">
					<view class="left">
						<!-- <text class="title" v-if="item.coupon_type == '1'">满{{item.conditionsofuse}}减</text> -->
						<text class="title" >{{item.title}}</text>
						<view class="sub_title">
						  <text>使用规则</text>
						    <text class="time" v-if="item.coupon_type == '1'">满{{item.conditionsofuse}}减{{item.money}}</text>
						   <text class="time" v-else>无</text>
						</view>
					</view>
					<view class="right">
						<text class="title">￥{{item.money}}</text>
						<text class="sub_title">商城内通用</text>
					</view>
				</view>
				<view class="foot">
					<text class="title">{{item.usergroup == null ? '' : item.usergroup }}</text>
					<text class="sub_title">未使用</text>
				</view>

			</view>
		</view>

	</view>
	
</template>

<script>
	export default{
		data(){
			return{
				chooseed: [],
				discountList:'',
				sourceType:'',
				discountPrice:0,
				minPrice:0,//满减优惠劵的最低使用价格
			}
		},
		methods:{
			isChoosed(id){
				if(this.sourceType != '1') return
				
				if(this.chooseed.length == 0){
					this.chooseed.push(id);
				} 
				else{
					if (this.chooseed.indexOf(id) === -1) {
					    // 不存在,则添加
					    this.chooseed.push(id)
					  } else {
					    // 存在,则删除
					    this.chooseed.splice(this.chooseed.indexOf(id), 1)
				      }
				}
				this.discountPrice = 0;
				for(let i = 0 ; i<this.discountList.length;i++){
					for(let j = 0 ; j<this.chooseed.length;j++){
						if(this.discountList[i].id == this.chooseed[j]){
							this.discountPrice += this.discountList[i].money;
						}
					}
				}
				console.log(this.discountPrice)
				uni.$emit('discountArr',{choosed:this.chooseed,discountPrice:this.discountPrice})
				
			},
			//获取优惠券列表
			getDiscountList(){
				let self = this;
				let data = {
					"token":uni.getStorageSync('token'),
					"userid":uni.getStorageSync('customer').userid
				}
				this.ask('/app/coupon/getCouponList','POST',data,function(res){
					console.log(res)
					self.discountList = res.data.couponlist;
					
				})
			}
		},
		onLoad(option) {
			console.log(option)
			if(JSON.stringify(option) != '{}'){
				this.sourceType = option.type;
				this.minPrice = Number(option.minPrice);
				// console.log(this.minPrice)
				if(JSON.parse(option.couponId) != ""){
					this.chooseed = JSON.parse(option.couponId)
					console.log(this.chooseed)
				}
				this.getDiscountList();
			} else{
				this.minPrice = 999999999999;
				this.getDiscountList();
			}
			
		}
	}
</script>

<style lang="scss">
	page{
		background-color: #f9f9f9;
	}
	.discount_bxo{
		width: 100%;
		.discount_list{
			width: 100%;
			padding: 30rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			flex-direction: column;
			.row{
				width: 100%;
				min-height: 180rpx;
				background-image: linear-gradient(to right,#85792a,#af9c42);
				display: flex;
				justify-content: space-between;
				align-items: center;
				flex-direction: column;
				color: #fff;
				border-radius: 12rpx;
				// border: 1rpx solid #e1e1e1;
				box-shadow: 0 5rpx 5rpx 5rpx #F0F0F0;
				position: relative;
				margin-bottom: 30rpx;
				position: relative;
				.angle{
					position: absolute;
					right: 0;
					top: 0;
					width: 80rpx;
					height: 80rpx;
				}
				.discount_msg{
					display: flex;
					width: 100%;
					align-items: center;
					justify-content: space-between;
					height: 200rpx;
				    padding: 0 25rpx;
					.left{
						display: flex;
						flex-direction: column;
						margin-bottom: 15rpx;
						.title{
							font-size: 50rpx;
							font-weight: bold;
							margin-bottom: 10rpx;
							
						}
						.sub_title{
							margin-bottom: 20rpx;
						}
						.time{
							margin: 0 8rpx;
						}
					}
					.right{
						display: flex;
						flex-direction: column;
						align-items: center;
						justify-content: center;
						margin-bottom: 25rpx;
						.title{
							font-size: 80rpx;
							font-weight: bold;
							margin-bottom: 0rpx;
						}
						.sub_title{
							margin-top: -15rpx;
						}
					}
				}
				.foot{
					width: 100%;
					height: 80rpx;
					background-color: #fff;
					color: #666;
					display: flex;
					align-items: center;
					justify-content: space-between;
					padding: 0 30rpx;
					.sub_title{
						color: #857825;
					}
					
				}
			}
			
		}
		
	}
	.row::after{
		content: "";
		background-color: #f9f9f9;
		position: absolute;
		width: 40rpx;
		height: 40rpx;
		left: -20rpx;
		top: 65%;
		border-radius: 50%;
		border-right: 1rpx solid #e1e1e1;

	}
	.row::before{
		content: "";
		background-color: #f9f9f9;
		position: absolute;
		width: 40rpx;
		height: 40rpx;
		right: -20rpx;
		top: 65%;
		border-radius: 50%;
		border-left: 1rpx solid #e1e1e1;
	}
	.row_red{
	   background-image: linear-gradient(to right,#d9383f,#e3575c) !important;
	}
	.row_gray{
		background-image: linear-gradient(to right,#c2c2c2,#c2c2c2) !important;
	}
</style>

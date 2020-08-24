<template>
	<view class="set_box">
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<block slot="content">设置</block>
		</cu-custom>
		<view class="set_list">
			<view class="set_row" @click="to_EditUser()">
				<text>个人资料</text>
				<image src="../../static/details/arrow.png" mode=""></image>
			</view>
			<view class="set_row" @click="to_addressList()">
				<text>收货地址</text>
				<image src="../../static/details/arrow.png" mode=""></image>
			</view>
		</view>
		<view class="foot_btn" >
			<text @click="clearUserMsg()">退出登录</text>
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
				
			}
		},
		methods:{
			//跳转到用户消息编辑
			to_EditUser(){
				uni.navigateTo({
					url:'./edit_user'
				})
			},
			//跳转到地址列表
			to_addressList(){
				uni.navigateTo({
					url:'./address_list'
				})
			},
			//清除用户缓存
			clearUserMsg(){
				uni.removeStorageSync("token");
				uni.removeStorageSync("customer");
				uni.reLaunch({
					url:'../home/home'
				})
				
			}
		}
	}
</script>

<style lang="scss">
	page{
		background-color: #f9f9f9;
	}
	.set_list{
		width: 100%;
		padding: 0 30rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		background-color: #fff;
		margin: 30rpx 0;
		.set_row{
			width: 100%;
			padding: 30rpx 0;
			display: flex;
			justify-content: space-between;
			align-items: center;
			border-bottom: 1rpx solid #E0E0E0;
			color: #333;
			image{
				width: 25rpx;
				height: 25rpx;
			}
		}
	}
	.set_list .set_row:last-child{
		border-bottom: none;
	}
	.foot_btn {
		width: 100%;
		height: 80rpx;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		justify-content: center;
		align-items: center;
		margin-top: 50rpx;
		position: fixed;
		bottom: 40rpx;
		text{
			color: #fff;
			background-color: #857825;
			width: 380rpx;
			height: 100%;
			display: -webkit-box;
			display: -webkit-flex;
			display: flex;
			justify-content: center;
			align-items: center;
			border-radius: 60rpx;
		}
	
	}
</style>

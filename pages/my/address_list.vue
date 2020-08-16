<template>
	<view class="add_address">
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<block slot="content">地址管理</block>
		</cu-custom>
		<view class="address_list">
			
			<view class="address" v-for="(item,index) in addressList" :key='index'>
				<view class="center">
					<text class="title">{{item.address_province}}{{item.address_detailed}}</text>
					<text class="name">{{item.name}}<text class="tel">{{item.telephone}}</text></text>
				</view>
				<image class="edit" src="../../static/details/edit.png" mode="" @click="to_editAddress('edit',item)"></image>
			</view>
			
		</view>
		<view class="foot_btn" >
			<text @click="to_address('add')">添加新地址</text>
		</view>
		<floatWindows :showFloat="true"></floatWindows>
		
	</view>
</template>

<script>
	import floatWindows from '../../components/float-windows.vue'
	
	export default{
		components:{
			floatWindows
		},
		data(){
			return{
				addressList:''
			}
		},
		methods:{
			//跳转到添加地址
			to_address(type){
				uni.navigateTo({
					url:'./address?type=' + type
				})
			},
			//编辑地址
			to_editAddress(type,data){
				uni.navigateTo({
					url:"./address?type=" + type + "&&data=" + JSON.stringify(data)
				})
			},
			//获取地址列表
			getAddress(){
				let self = this;
				let data={
					"token":uni.getStorageSync('token'),
					"userid":uni.getStorageSync('customer').userid
				};
			
				this.ask("/app/address/getAddressList",'POST',data,function(res){
					console.log(res)
					self.addressList = res.data.addresslist;
				
				})
			},
		},
		onShow() {
			this.getAddress()
		}
		
	}
</script>

<style lang="scss">

	.address_list{
		width: 100%;
		background-color: #fff;
		.address{
			box-shadow: none;
			padding: 0;
			margin: 5rpx 30rpx;
			margin-top: 20rpx;
			min-height: 90rpx;
			display: flex;
			justify-content: space-around;
			align-items: center;
			border-bottom: 1rpx solid #E0E0E0;
			padding-bottom: 20rpx;
			.center{
				display: flex;
				flex-direction: column;
				
				flex: 1;
				.title{
					font-weight: normal;
					margin-bottom: 10rpx;
				
				}
				.tel{
					margin-left: 10rpx;
				}
			}
		    .edit{
				min-width: 50rpx;
				width: 50rpx;
				height: 50rpx;
				margin-right: 20rpx;
				margin-left: 20rpx;
			}
		}

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

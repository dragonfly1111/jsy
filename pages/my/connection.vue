<template>
	<view class="connection_box" v-cloak>
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<block slot="content">联系我们</block>
		</cu-custom>
		<view class="connection_list">
			<view class="row" @click="openMap()">
				<view class="address_img">
					<image src="../../static/com/company.png"></image>
				</view>
				<view class="address_msg">
					<text class="company_name">广西金三源农业科技有限公司</text>
					<text>联系电话：5632198</text>
					<text>联系地址：广西南宁市兴宁区兴东路61号5#楼</text>
				</view>
			</view>
			<view class="row" @click="openMap()" v-for="(item,index) in addresObj" :key='index'>
				<view class="address_img">
					<image :src="imgHttp + item.cover" mode=""></image>
				</view>
				<view class="address_msg">
					<text class="company_name">{{item.name}}</text>
					<text>联系电话：{{item.telephone}}</text>
					<text>联系地址：{{item.address}}</text>
				</view>
			</view>

		</view>
		<floatWindows :showFloat="true"></floatWindows>
		
	</view>
</template>

<script>

	export default {
		components:{
		},
		data() {
			return {
              addresObj:'',//地址对象
			  imgHttp:''
			}
		},
		methods: {
			//打开地图
			openMap() {
				// uni.openLocation({
				// 	latitude: 22.82,
				// 	longitude: 108.37,
				// 	name:'广西壮族自治区南宁市青秀区民族大道652号',
				// 	success: function(res) {
				// 		console.log(res)
				// 	},
				// 	fail(err) {
				// 		console.log(err)
				// 	}
				// })
			},
			//获取地址列表
			getCompanyList(){
				let self = this;
				let data = {
					"token":uni.getStorageSync('token'),
					"userid": uni.getStorageSync('customer').userid,
				}
				this.ask('/app/me/getContactList','POST',data,function(res){
					self.addresObj = res.data.data
					console.log(res)
				})
			}
		},
		onLoad(){
			this.imgHttp = this.comHttp;
			this.getCompanyList();
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #f0f0f0;
	}
	.connection_box {
		width: 100%;
	}
	.connection_list {
		width: 100%;
		padding: 30rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		.row {
			width: 100%;
			display: flex;
			align-items: center;
			justify-content: flex-start;
			background-color: #fff;
			border-radius: 15rpx;
			min-height: 230rpx;
			margin-bottom: 30rpx;
			padding: 20rpx;
			.address_img {
				width: 200rpx;
				height: 200rpx;
				min-width: 200rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				margin-right: 10rpx;
			}
			image {
				width: 90%;
				height: 90%;
				border-radius: 10rpx;
			}
			.address_msg {
				display: flex;
				justify-content: center;
				flex-direction: column;
				text {
					margin-bottom: 5rpx;
					color: #666;
					font-size: 26rpx;
					line-height: 40rpx;
				}
				.company_name {
					color: #857825;
					font-size: 30rpx;
					font-weight: bold;
					margin-bottom: 15rpx;
				    
				}
			}
		}
	}
</style>

<template>
	<view class="distribution_box" v-cloak>
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<block slot="content">分销</block>
		</cu-custom>
		<view class="distribution_head">
			<text :class="{act_text: currentType == 0}" @click="chooseType(0)">佣金</text>
			<text :class="{act_text: currentType == 1}" @click="chooseType(1)">推广关系</text>
		</view>
		<view class="main-wrapper">
			<view v-if="currentType == 0">
				<view class="banner">
					<image src="../../static/my/money-banner.png" mode="aspectFit"></image>
					<view class="text-area">
						<view class="text">已提佣金</view>
						<view class="value">
							{{statistics.cashbrokerage == null ? 0 : statistics.cashbrokerage }}
							 <text class="unit">元</text>
						</view>
						<view class="text" style="margin-top: 10rpx;">未提佣金</view>
						<view class="value">
							{{statistics.uncashtotalbrokerage == null ? 0 : statistics.uncashtotalbrokerage }}
							<text class="unit">元</text>
						</view>
					</view>
					<view class="bottom-area">
						<view class="text">冻结佣金</view>
						<view class="value">{{statistics.freezebrokerage == null ? 0 : statistics.freezebrokerage}}</view>
						<view class="unit">元</view>
					</view>
				</view>
				<view class="body-group">
					<!-- <view class="date">04月21日</view> -->
					<view class="block" v-for="item in brokerageList" :key="item.ordercode">
						<view class="info">
							<image src="../../static/my/no-header.png"></image>
							<view>
								<view class="rows">
									<text class="label">金额：</text>
									<text class="value">103元</text>
									<text class="line">|</text>
									<text class="label">佣金：</text>
									<text class="value">5元</text>
								</view>
								<view>
									<text class="label">单号：</text>
									<text class="value">{{item.ordercode}}</text>
								</view>
							</view>
						</view>
						<view class="status">
							<text class="text-red" v-if="item.type == '0'">冻结</text>
							<text v-if="item.type == '1'">未提现</text>
							<text v-if="item.type == '2'">提现申请</text>
							<text v-if="item.type == '3'">已提现</text>
						</view>
					</view>
				</view>
			</view>
			<view v-if="currentType == 1">
				<view class="banner banner-bg">
					<view class="flex flex-wrap">
						<view class="basis-df">
							<view class="text">会员</view>
							<view class="value">
								{{generalize.membernum}}
								<text class="unit">人</text>
							</view>
						</view>
						<view class="basis-df">
							<view class="text">游客</view>
							<view class="value">
								{{generalize.unmembernum}}
								<text class="unit">人</text>
							</view>
						</view>
					</view>
					<view class="bottom-area" style="padding: 0;">
						<view class="flex flex-wrap" style="width: 100%;">
							<view class="basis-df">
								<view class="header-text">昵称</view>
							</view>
							<view class="basis-df">
								<view class="header-text">游客</view>
							</view>
						</view>
					</view>
				</view>
				<view class="user-list">
				
					<view class="rows" v-for="(item,index) in generalizeList" :key='index'>
						<view class="flex flex-wrap" style="width: 100%;">
							<view class="basis-df">
								<image src="../../static/my/no-header.png"></image>
								<text class="user-name">{{decodeURIComponent(item.nickname)}}</text>
							</view>
							<view class="basis-df" style="justify-content: center;">
								<view class="user-type" :class="item.usertype == '会员' ? 'text-red' : '' ">{{item.usertype}}</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- <view class="distribution_msg" v-if="currentType == 0">
			<view class="msg_head">
				<text class="title">未提现佣金</text>
				<text class="sub_title">{{statistics.uncashtotalbrokerage == null ? 0 : statistics.uncashtotalbrokerage }}<text class="unit">元</text></text>
			</view>
			<view class="msg_foot">
				<view class="deposit">
					<text class="title">已提现佣金</text>
					<text class="sub_title">{{statistics.cashbrokerage == null ? 0 : statistics.cashbrokerage }}<text class="unit">元</text></text>
				</view>
				<view class="freeze">
					<text class="title">冻结押金</text>
					<text class="sub_title">{{statistics.freezebrokerage == null ? 0 : statistics.freezebrokerage}} <text class="unit">元</text></text>
				</view>
			</view>
		</view>

		<view class="distribution_msg" v-if="currentType == 1">
			<view class="msg_head">
				<text class="title">上级机构</text>
				<text class="sub_title">{{generalize.comname}}</text>
			</view>
			<view class="msg_foot">
				<view class="deposit">
					<text class="title">会员</text>
					<text class="sub_title">{{generalize.membernum}}<text class="unit">人</text></text>
				</view>
				<view class="freeze">
					<text class="title">游客</text>
					<text class="sub_title">{{generalize.unmembernum}}<text class="unit">人</text></text>
				</view>
			</view>
		</view>

		<view class="distribution_list" v-if="currentType == 0">
			<view class="row th">
				<text class="order">单号</text>
				<text class="money">金额</text>
				<text class="brokerage">佣金</text>
				<text class="type_title">状态</text>
			</view>
			<view class="row" v-for="(item,index) in brokerageList" :key='index'>
				<text class="order">{{item.ordercode}}</text>
				<text class="money">{{item.payprice}}</text>
				<text class="brokerage">{{item.totalbrokerage}}</text>
				<text class="type freezeType" v-if="item.type == '0'">冻结</text>
				<text class="type" v-if="item.type == '1'">未提现</text>
				<text class="type" v-if="item.type == '2'">提现申请</text>
				<text class="type" v-if="item.type == '3'">已提现</text>
			</view>

		</view>
		<view class="distribution_list" v-if="currentType == 1">
			<view class="row th">
				<text class="money">昵称</text>
				<text class="type_title">状态</text>
			</view>
			<view class="row " v-for="(item,index) in generalizeList" :key='index'>
				<text class="money">{{decodeURIComponent(item.nickname)}}</text>
				<text class="type" v-if="item.usertype == '会员'">{{item.usertype}}</text>
				<text class="type freezeType" v-else>{{item.usertype}}</text>
			</view>
	
		</view>
 -->
		<!-- <view class="foot_btn" v-if="currentType == 0">
			<text @click="applyRefund()">申请提现</text>
		</view> -->
  
	</view>
</template>

<script>
	export default {
		data() {
			return {
				currentType: 0,
				statistics: '',//分佣总计
				brokerageList:[],
				brokerages: 1,//分佣分页数目
				brokeragesCount: 0,//分佣列表总数
				generalize:'',//推广统计
				generalizePage:1,
				generalizeList:[],
				generalizeCount:0,
			}
		},
		methods: {
			chooseType(num) {
				this.currentType = num;
			},
			//获取分佣
			getBrokerage(){
				let self = this;
				let data = {
					"token": uni.getStorageSync('token'),
					"userid": uni.getStorageSync('customer').userid,
				};
				this.ask('/app/me/commissionStatistics','POST',data,function(res){
					self.statistics = res.data.data
					console.log(res)
				})
			},
			//获取蜂拥列表
			getBrokerageList(){
				let self = this;
				let data = {
					"token": uni.getStorageSync('token'),
					"userid": uni.getStorageSync('customer').userid,
					page: this.brokerages,
					pagesize: 20,
				};
				this.ask('/app/me/commissionList','POST',data,function(res){
					self.brokeragesCount = res.data.count;
					for(let i= 0 ; i<res.data.data.length ; i++){
						self.brokerageList.push(res.data.data[i]);
					}
					console.log(res)
				})
			},
			//获取推广人员
			getGeneralize(){
				let self = this;
				let data = {
					"token": uni.getStorageSync('token'),
					"userid": uni.getStorageSync('customer').userid,
				};
				this.ask('/app/me/generalizeStatistics','POST',data,function(res){
					self.generalize = res.data.data
					console.log(res)
				})
			},
			getGeneralizeList(){
				let self = this;
				let data = {
					"token": uni.getStorageSync('token'),
					"userid": uni.getStorageSync('customer').userid,
					page: this.generalizePage,
					pagesize: 20,
				};
				this.ask('/app/me/generalizeList','POST',data,function(res){
					self.generalizeCount = res.data.count;
					for(let i= 0 ; i<res.data.data.length ; i++){
						self.generalizeList.push(res.data.data[i]);
					}
					console.log(res)
				})
			}
		},
		onLoad() {
			this.getBrokerage();
			this.getBrokerageList();
			this.getGeneralize();
			this.getGeneralizeList();
		},
		onReachBottom(){
			if(this.currentType == 0 && this.brokerageList.length != this.brokeragesCount){
				this.brokerages++
				this.getBrokerageList(this.brokerages)
			}
			
			if(this.currentType == 1 && this.generalizeList.length != this.generalizeCount){
				this.generalizePage++
				this.getBrokerageList(this.generalizePage)
			}
			
		}
	}
</script>

<style lang="scss">
	page{
		background-color: #f9f9f9;
	}
	.distribution_box {
		width: 100%;
		.distribution_head {
			width: 100%;
			height: 80rpx;
			color: #333;
			display: flex;
			align-items: center;
			justify-content: center;

			text {
				display: flex;
				align-items: center;
				justify-content: center;
				flex: 1;
				height: 100%;
				background-color: #fff;
				font-size: 30rpx;
				font-weight: bold;
			}

			.act_text {
		
				color: #857825;
				position: relative;

			}

		}
		.distribution_head .act_text::after{
			content: '';
			position: absolute;
			bottom: 0;
			width: 50%;
			left: 25%;
			height: 8rpx;
			background-color: #857825;
		}
	}
	.main-wrapper {
		width: calc(100% - 60rpx);
		margin: 0 auto;
		.banner {
			height: 300rpx;
			margin-top: 20rpx;
			position: relative;
			color: #fff;
			margin-bottom: 10rpx;
			border-radius: 10rpx;
			image {
				position: absolute;
				width: 100%;
				height: 300rpx;
				z-index: -1;
			}
			.text-area {
				padding-top: 40rpx;
				padding-left: 40rpx;
				.text {
					font-size: 28rpx;
				}
				.value {
					font-size: 42rpx;
					margin-top: 5rpx;
				}
				.unit {
					font-size: 28rpx;
				}
			}
			.bottom-area {
				padding-left: 40rpx;
				width: 100%;
				height: 60rpx;
				background: rgba($color: #000000, $alpha: 0.3);
				position: absolute;
				bottom: 0;
				border-radius: 0 0 10rpx 10rpx;
				display: flex;
				align-items: center;
				color: #fff;
				.text {
					font-size: 28rpx;
					margin-right: 40rpx;
				}
				.value {
					
				}
				.unit {
					font-size: 28rpx;
				}
			}
		}
		.body-group {
			.date {
				padding-left: 40rpx;
				margin-bottom: 10rpx;
			}
			.block {
				padding: 30rpx 40rpx;
				background: #fff;
				border-radius: 10rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin-bottom: 10rpx;
				.info {
					display: flex;
					align-items: center;
					image {
						width: 80rpx;
						height: 80rpx;
						margin-right: 20rpx;
					}
					.rows {
						display: flex;
						align-items: center;
						margin-bottom: 10rpx;
					}
					.label {
						font-size: 24rpx;
						font-weight: bold;
						color: #7d7834;
					}
					.value {
						font-size: 22rpx;
						color: #666;
					}
					.line {
						color: #7d7834;
						margin-left: 8rpx;
						margin-right: 8rpx;
					}
				}
				.status {
					font-size: 24rpx;
					font-weight: bold;
					.text-red {
						color: #d14949;
					}
				}
			}
		}
	
		.banner-bg {
			background-color: #7d7834;
			text-align: center;
			margin-bottom: 30rpx;
			.text {
				font-size: 48rpx;
				margin-top: 60rpx;
				margin-bottom: 30rpx;
			}
			.value {
				font-size: 54rpx;
			}
			.unit {
				margin-left: 10rpx;
				font-size: 20rpx;
			}
			.header-text {
				font-size: 26rpx;
			}
		}
		.user-list {
			text-align: center;
			font-size: 26rpx;
			image {
				width: 80rpx;
				height: 80rpx;
				margin-right: 20rpx;
				margin-left: 30rpx;
			}
			.rows {
				margin-bottom: 30rpx;
			}
			.basis-df {
				display: flex;
				align-items: center;
			}
			.user-name {
				color: #666;
			}
			.user-type {
				color: #000;
			}
			.text-red {
				color: #d14949;
			}
		}
	}

</style>

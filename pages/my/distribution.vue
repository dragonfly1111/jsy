<template>
	<view class="distribution_box" v-cloak>
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<block slot="content">分销</block>
		</cu-custom>
		<view class="distribution_head">
			<text :class="{act_text: currentType == 0}" @click="chooseType(0)">佣金</text>
			<text :class="{act_text: currentType == 1}" @click="chooseType(1)">推广关系</text>
		</view>

		<view class="distribution_msg" v-if="currentType == 0">
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
		.distribution_msg {
			width: calc(100% - 60rpx);
			margin: 30rpx;
			min-height: 0;
			background-image: linear-gradient(45deg, #85792a, #e9d1b4);
            margin-top: 20rpx;
			.msg_head {
				width: 100%;
				background-image: linear-gradient(45deg, #85792a, #e9d1b4);
				height: 150rpx;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				color: #fff;
				border-radius: 6rpx 6rpx 0 0;

				.title {
					font-size: 24rpx;
				}

				.sub_title {
					font-size: 44rpx;
					font-weight: bold;
					margin-top: 5rpx;
				}

				.unit {
					font-size: 22rpx;
				}
			}

			.msg_foot {
				width: 100%;
				height: 120rpx;
				background-color: #857825;
				display: flex;
				justify-content: center;
				align-items: center;
				background-color: rgba(000, 000, 000, 0.3);
				border-radius: 0 0 9rpx 9rpx;

				view {
					flex: 1;
					display: flex;
					justify-content: center;
					align-items: center;
					flex-direction: column;
					color: #fff;

					.title {
						font-size: 24rpx;
					}

					.sub_title {
						font-size: 36rpx;
						margin-top: 8rpx;

					}

					.unit {
						font-size: 22rpx;
					}

				}
			}
		}

		.distribution_list {
			width: 100%;
			padding: 30rpx;
			padding-top: 0;
            margin-bottom: 120rpx;
			.row {
				display: flex;
				justify-content: center;
				align-items: center;
				margin-bottom: 20rpx;

				text {
					display: flex;
					justify-content: center;
					align-items: center;
					color: #666;
				}

				.order {
					flex: 3;
					color: #857825;
				}

				.money {
					flex: 1;
					color: #857825;
				}

				.brokerage {
					flex: 1;
					color: #857825;
				}

				.type_title {
					flex: 1;
					color: #857825;

				}

				.type {
					flex: 1;
					color: #000;
				}

				.freezeType {
					color: #F24544;

				}
			}

			.th {
				color: #857825;
				font-size: 30rpx;
				font-weight: bold;

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

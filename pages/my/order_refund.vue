<template>
	<view class="refund_box">
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<block slot="content">申请退款</block>
		</cu-custom>
		<view class="refund_head">
			<view class="refund_bd">
				
			</view>
			<view class="row_main" v-for="(item,index) in detailsObj.items" :key='index' >
				<view class="left">
					<image :src="imgHttp+item.itemcover" mode=""></image>
				</view>
				<view class="center">
					<text class="title">{{item.itemname}}</text>
					<text class="sub_title">单价:￥{{item.sellingprice}}/{{item.unit}}</text>
					<text class="num">x{{item.itemnum}}</text>
				</view>
				<view class="right">
					<text class="sub_title">￥{{item.itemnum * item.sellingprice}}</text>
				</view>
			</view>
			
			<view class="refunf_msg">
				<view class="refund_row">
					<text class="title">退款原因</text>
					<view class="selcet" @click="closeReason">
						<text class="reason">{{currentReason}}</text>
						<image src="../../static/details/arrow.png" mode=""></image>
					</view>
				</view>
				<view class="fill_line">
					
				</view>
				<view class="refund_row">
					<text class="title">退款金额</text>
					<text class="sub_title">￥{{detailsObj.totalprice}}</text>
		
				</view>
			</view>
		</view>
		
		<view class="refund_explain">
			<text class="title">退款说明</text>
			<text class="sub_title">1.退款申请提交后，需要等待商家处理。商家同意退款后，需要您将退货商品寄回商家所提供的退货地址。</text>
			<text class="sub_title">2.商家同意退款，退款金额会在3到5个工作日内退回您的账户。</text>
			<text class="sub_title">3.如果商家拒绝退款申请，请修改申请或与在线客服取得联系沟通退款申请。</text>
			<text class="sub_title">4.退款金额最大为订单实际支付最大金额。</text>
			<text class="sub_title">5.优惠券使用过后即便退单也不会以任何形式退回原账户。</text>
		</view>
		
		<view class="reason_list" v-if="isSHowReason == true">
			<view class="reason_bg" @click="closeReason()">
				
			</view>
			<view class="reason_row">
				<view class="reason_head">
					<text class="sub_title">&nbsp;</text>
					<text class="title">退款原因</text>
					<text class="sub_title" @click="closeReason()">取消</text>
				</view>
				<radio-group name="reason" @change="chooseType($event)">
				    <view class="row">
				    	<text>质量问题</text>
						<radio class="red margin-left-sm" value="质量问题" />
				    </view>
					<view class="row">
						<text>少件/漏发</text>
						<radio class="red margin-left-sm" value="少件/漏发" />
					</view>
					<view class="row">
						<text>包装/商品破损/污渍/裂痕/变形</text>
						<radio class="red margin-left-sm" value="包装/商品破损/污渍/裂痕/变形" />
					</view>
					<view class="row">
						<text>卖家发错货</text>
						<radio class="red margin-left-sm" value="卖家发错货" />
					</view>
						
				</radio-group>
				
			</view>
		</view>
		<view class="foot_btn">
			<text @click="applyRefund()">提交</text>
		</view>
		
	</view>
</template>

<script>
	export default{
		data(){
			return{
				imgHttp:'',
				currentReason:'请选择',//当前理由
				isSHowReason: false,
				detailsObj:'',
				sourceType: ''
			}
		},
		methods:{
			//关闭理由列表
			closeReason(){
				this.isSHowReason = !this.isSHowReason;
			},
			//选中理由
			chooseType(e){
				this.currentReason = e.detail.value;
				
			},
			//获取订单消息
			getDetails(orderid){
				let self = this;
				let data = {
					"token":uni.getStorageSync('token'),
					"orderid":orderid,
					"userid":uni.getStorageSync('customer').userid,
				}
				this.ask("/app/order/getOrderById","POST",data,function(res){
					self.detailsObj = res.data.data;
					console.log(res)
				})
			},
			//申请退款
			applyRefund(){
				
				let self = this;
				let data = {
					token: uni.getStorageSync('token'),
					userid: uni.getStorageSync('customer').userid,
					orderid:self.detailsObj.id,
					refundreason: self.currentReason
				}
				if(self.currentReason == '请选择'){
					self.hint('请选择退款原因');
					return
				}
				this.ask('/app/order/refundOrder',"POST",data,function(res){
					// console.log(res)
					self.hint(res.data.msg);
					if(self.sourceType == 0){
						uni.navigateBack({
							delta: 1
						})
					} else{
						uni.navigateBack({
							delta: 2
						})
					}
					
				})
			}
		},
		onLoad(option) {
			this.imgHttp = this.comHttp;
			this.sourceType = option.type;
			this.getDetails(option.id)
			
			
		}
	}
</script>

<style lang="scss">
   @import "./order_refund.scss"
</style>

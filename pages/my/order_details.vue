<template>
	<view class="details" v-cloak>
		<cu-custom bgColor="none-bg"  :isBack="true" :isRedirect="source == 'goodsDetails'" >
			<block slot="content">订单详情</block>
		</cu-custom>
		<view class="address">
			<view class="left">
				<image src="../../static/details/logistics.png" mode=""></image>
			</view>
			<view class="center" >
				<text class="title">物流信息</text>
				<text class="name">已揽件</text>
			</view>
			<view class="right">
				<image src="../../static/details/arrow.png" mode=""></image>
			</view>
		</view>
		
		<view class="address">
			<view class="left">
				<image src="../../static/details/address.png" mode=""></image>
			</view>
			<view class="center" >
				<text class="title" v-if="detailsObj.consigneeaddress_province" >{{detailsObj.consigneeaddress_province}}{{detailsObj.consigneeaddress_detailed}}</text>
				<text class="name">{{detailsObj.consigneename}}<text class="tel">{{detailsObj.consigneetelephone}}</text></text>
			</view>
			<view class="right">
				<image src="../../static/details/arrow.png" mode=""></image>
			</view>
		</view>
		<view class="order_list">
			<view class="row">
				<view class="row_head">
					<text class="title">快递发货</text>
					<text class="sub_title">商家发货,第三方物流配送，免运费</text>
				</view>
				<view class="row_main" v-for="(item,index) in detailsObj.items" :key='index'>
					<view class="left">
						<image :src="imgHttp+item.itemcover" mode=""></image>
					</view>
					<view class="center">
						<text class="title">{{item.itemname}}</text>
						<text class="sub_title">单价:￥{{item.sellingprice}}/{{item.unit}}</text>
						<text class="num">x {{item.itemnum}}</text>
					</view>
					<view class="right">
						<text class="sub_title">￥{{item.sellingprice * item.itemnum}}</text>
					</view>
				</view>
		

			</view>

		</view>
		
		<view class="price_box">
			<view class="row">
				<text class="title">订单金额</text>
				<text class="sub_title" v-if="detailsObj" >￥{{detailsObj.totalprice}}</text>
			</view>
			<view class="row">
				<text class="title">运费</text>
				<text class="sub_title" v-if="detailsObj" >￥{{detailsObj.totalpostage}}</text>
			</view>
			<view class="row">
				<text class="title">优惠金额</text>
				<text class="sub_title" v-if="detailsObj" >￥{{discountPrice}}</text>
			</view>
			<view class="row">
				<text class="title">优惠券金额</text>
				<text class="sub_title" v-if="detailsObj">￥{{detailsObj.couponsnomey}}</text>
			</view>
		</view>
		
		<view class="remark_box">
			<view class="row">
				<text class="title">订单备注</text>
				<text class="sub_title">{{detailsObj.remark || "无"}}</text>
			</view>
		</view>
		
		<view class="order_box">
			<view class="row">
				<text class="title">下单时间</text>
				<text class="sub_title">{{detailsObj.create_order_time}}</text>
			</view>
			<view class="row">
				<text class="title">订单编号</text>
				<text class="sub_title">{{detailsObj.order_number}}</text>
			</view>
		</view>
		<view class="details_foot">
			<text class="btn" @click="reduceOrder()" v-if="detailsObj.statu == 0">取消订单</text>
			<text class="btn" @click="pay()" v-if="detailsObj.statu == 0">去支付</text>
			
			<text class="btn" @click="to_remind(detailsObj.id)" v-if="detailsObj.statu == 1 && !idArr.includes(detailsObj.id) == 1">提醒发货</text>
			<text class="btn" v-if="detailsObj.statu == 1 && idArr.includes(detailsObj.id)">已提醒</text>
			
			<text class="btn" @click="sureDelivery()" v-if="detailsObj.statu == 2">确认收货</text>
			
			<button class="btn" open-type="contact" v-if="detailsObj.statu == 3">售后</button>
			<text class="btn" @click="evaluateOrder()" v-if="detailsObj.statu == 3">完成订单</text>
			<text class="btn" @click="refundOrder()" v-if="detailsObj.statu == 3">退款</text>
			
			<text class="btn" @click="deleteOrder()" v-if="detailsObj.statu == 99">删除订单</text>
		
		</view>
		
	</view>

</template>

<script>
	export default{
		data(){
			return{
				detailsObj: '',
				imgHttp:'',
				idArr:[],
				source:'',
				discountPrice:0,
				discount:'',
				expressInfo:[],
			}
		},
		methods:{
			to_remind(id) {
				let date = new Date().getTime();
				let remindTime = uni.getStorageSync('remindTime') ? uni.getStorageSync('remindTime') : date;
				console.log(date - remindTime)
				if (date - remindTime >= 720000) {
					uni.removeStorageSync("remindArr");
				}
				
				if (this.idArr.length == 0) {
					this.idArr.push(id);
					this.hint('提醒发货成功');
				} else {
					if (this.idArr.indexOf(id) === -1) {
						// 不存在,则添加
						this.hint('提醒发货成功');
						this.idArr.push(id)
					} else {
						// 存在,
						this.hint('已发起提醒，请不要重复点击');
					}
				}
				uni.setStorageSync('remindArr', JSON.stringify(this.idArr));
				uni.setStorageSync("remindTime", date);
			
			
			},
			//申请退款
			refundOrder:function(){
				uni.navigateTo({
					url:"./order_refund?id=" + this.detailsObj.id +'&&type=1'
				})
			
			},
			//评价
			evaluateOrder:function(){
				let self = this;
				let data = {
					"token":uni.getStorageSync('token'),
					"userid":uni.getStorageSync('customer').userid,
					"orderid": self.detailsObj.id,
					"evaluateValue": 5,
					"evaluateMsg": '默认好评'
				}
				this.ask("/app/order/evaluateOrder","POST",data,function(res){
					console.log(res);
					self.hint('订单完成');
					uni.navigateBack({
						delta:1
					})
					
				})
			},
			//删除订单
			deleteOrder:function(orderid){
				let self = this;
				let data = {
					"token":uni.getStorageSync('token'),
					"userid":uni.getStorageSync('customer').userid,
					"orderid": self.detailsObj.id
				}
				uni.showModal({
				    title: '提示',
				    content: '确定是否删除该项订单？',
				    success: function (res) {
				        if (res.confirm) {
							self.ask("/app/order/deleteOrder","POST",data,function(res){
								self.hint(res.data.msg);
								uni.navigateBack({
									delta:1
								})
							})
				        }
				    }
				});
			},
			//取消订单
			reduceOrder(){
				let self = this;
				let data = {
					"token":uni.getStorageSync('token'),
					"userid":uni.getStorageSync('customer').userid,
					"orderid": self.detailsObj.id,
				}
				uni.showModal({
				    title: '提示',
				    content: '请确认取消订单？',
				    success: function (res) {
				        if (res.confirm) {
							self.ask("/app/order/cancelOrder","POST",data,function(res){
								self.hint(res.data.msg);
								uni.navigateBack({
									delta:1
								})
							})
				        }
				    }
				});
			},
			//支付
			pay(){
				let self = this;
				uni.login({
					success: function(loginRes) {
						console.log(payData)
						let payData = {
							"token":uni.getStorageSync('token'),
							"orderid": self.detailsObj.id,
							"userid":uni.getStorageSync('customer').userid,
							"code": loginRes.code
						}
						self.ask("/app/order/payOrder","POST",payData,function(res){
							console.log(res)
							uni.requestPayment({
								provider: 'wxpay',
								timeStamp: res.data.data.timeStamp + '',
								nonceStr: res.data.data.nonceStr,
								package: res.data.data.package,
								signType: 'MD5',
								paySign: res.data.data.sign,
								success: (e) => {
									console.log("success", e);
									self.hint('订单支付成功');
				                  
				                    uni.navigateBack({
				                    	delta:1
				                    })
								},
								fail: (e) => {
									console.log("fail", e);
									if (e.errMsg == 'requestPayment:fail:[payment微信:-1]General errors') {
										uni.showToast({
											title: "支付失败!",
											icon: 'none'
										})
									} else {
										uni.showToast({
											title: "用户取消支付!",
											icon: 'none'
										})
									}
												            
								},
							})
							
						})
					},
					fail:function(){
						self.hint('登录失败')
					}
				});
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
					console.log(res)
					self.detailsObj = res.data.data;
					self.getOrderExpress(self.detailsObj.couriercode)
					self.discountPrice = Math.floor(Number(self.detailsObj.totalprice) * (1 - self.discount / 10) *100) / 100;
					
				})
			},
			//获取订单物流信息
			getOrderExpress(num){
				let self = this;
				let data = {
					"num":num,
				}
				this.ask("/api/express/expressInfo","POST",data,function(res){
					self.expressInfo = res.data.data;
					console.log(self.expressInfo)
				})
			},
			
			//确认收货
			sureDelivery(){
				let self = this;
				let data = {
					"token":uni.getStorageSync('token'),
					"userid":uni.getStorageSync('customer').userid,
					"orderid": self.detailsObj.id
				}
				console.log(data)
			
				uni.showModal({
				    title: '提示',
				    content: '请确认订单商品已经收到？',
				    success: function (res) {
				        if (res.confirm) {
				            console.log('确认收货事件！');
							self.ask("/app/order/confirmOrder","POST",data,function(res){
								console.log(res)
								self.hint(res.data.msg);
								uni.navigateBack({
									delta:1
								})
							})
							
							
				        }
				    }
				});
			},
		},
		onLoad(option){
			this.discount = Number(uni.getStorageSync('customer').discount);
			if( this.discount == 0){
				this.discount = 10;
			}
			this.imgHttp = this.comHttp;
			this.source = option.source
			this.idArr = uni.getStorageSync('remindArr') ? JSON.parse(uni.getStorageSync('remindArr')) : [];
			this.getDetails(option.id)
			
		},
		onBackPress() {
			if(this.source == 'goodsDetails'){
				uni.switchTab({
					url:'../home/home'
				})
			}
		}
	}
</script>

<style lang="scss">
	@import "./order.scss";
	@import "./order_details.scss";
</style>

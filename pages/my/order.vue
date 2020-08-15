<template>
	<view class="order" v-cloak>
		<cu-custom bgColor="none-bg" :isBack="true">
			<block slot="content"></block>
		</cu-custom>
		<view class="order_head">
			<text :class="{act_nav: currentNav  == '-1'}" @click="chooseNav('-1')">全部</text>
			<text :class="{act_nav: currentNav  == 0}" @click="chooseNav(0)">待付款</text>
			<text :class="{act_nav: currentNav  == 1}" @click="chooseNav(1)">待发货</text>
			<text :class="{act_nav: currentNav  == 2}" @click="chooseNav(2)">待收货</text>
			<!-- <text :class="{act_nav: currentNav  == 3}" @click="chooseNav(3)">待评价</text> -->
		</view>
		<!-- //全部类型订单 -->
		<view class="order_list" v-if="currentNav == '-1' ">

			<view class="row" v-for="(item,index) in allArr" :key='index'>
				<view class="row_head">
					<!-- <text class="title">{{item.time}}</text> -->
					<text class="sub_title" v-if='item.state==0'>待付款</text>
					<text class="sub_title" v-if='item.state==1'>待发货</text>
					<text class="sub_title" v-if='item.state==2'>卖家已发货</text>
					<text class="sub_title" v-if='item.state==4'>订单完成</text>
					<text class="sub_title" v-if='item.state==98'>退款</text>
					<text class="sub_title" v-if='item.state==99'>已取消</text>
				</view>
				<view class="row_main"   @click="to_order_details(item.id,item.order_number)" v-for="(val,num) in item.goodslist" :key='num' v-if="item.goodslist.length == 1">
					<view class="left">
						<image :src="imgHttp+val.image" mode=""></image>
					</view>
					<view class="center">
						<text class="title">{{val.title}}</text>
						<!-- <text class="sub_title">单价:￥{{val.price}}{{ item.order_number.indexOf('openMember') != -1 ? '' : '/' +val.unit}}</text> -->
						<text class="sub_title">规格字段</text>
					</view>
					<view class="right">
						<viev class="title">￥<text class="big_num">{{val.price * val.itemnum | numberFilter}}</text><text>{{val.price * val.itemnum | numberFilter1}}</text></viev>
						<text class="num" ><text class="small_symbol">x</text>{{val.itemnum}}</text>
						<!-- v-if="item.order_number.indexOf('openMember') != -1" -->
					</view>
				</view>

				<view class="row_body" v-if="item.goodslist.length >= 2">
					<swiper display-multiple-items='2' next-margin="20rpx">
						<swiper-item v-for="(img,imgNum) in item.goodslist" :key='imgNum'  @click="to_order_details(item.id,item.order_number)">
							<view class="swiper-item">
								<image :src="imgHttp+img.image" mode=""></image>
								<text>x{{img.itemnum}}</text>
							</view>
						</swiper-item>
					</swiper>
					<view class="right">
						<view class="count">
							<!-- <text class="title">合计:</text> -->
							<viev class="sub_title">￥<text class="big_num">{{item.payprice | numberFilter}}</text><text>{{item.payprice | numberFilter1}}</text></viev>
						</view>
						<view class="num">
							<text>共{{item.goodslist.length}}件</text>
						</view>
					</view>
				</view>
				
				
				<view class="row_bottom" v-if="item.state == 0" @click="to_order_fill(item)">
					<text>去支付</text>
				</view>

				<view class="row_bottom" v-if="item.state  == 1 && !idArr.includes(item.id)" @click="to_remind(item.id)">
					<text>提醒发货</text>
				</view>

				<view class="row_bottom" v-if="item.state  == 1 && idArr.includes(item.id)">
					<text>已提醒</text>
				</view>
				<view class="row_bottom" v-if="item.state == 2">
					<text class="text_gray" @click="to_order_details(item.id,item.order_number)">查看物流</text>
					<text @click="confirmOrder(item.id)">确认收货</text>
				</view>
				<view class="row_bottom" v-if="item.state == 3">
					<button open-type="contact">售后</button>
					<text @click="evaluateOrder(item.id)">完成订单</text>
					<text @click="refundOrder(item.id)">退款</text>

				</view>

				<view class="row_bottom" v-if="item.state == 99" @click="deleteOrder(item.id)">
					<text>删除订单</text>
				</view>
			</view>
			<view class="no_more" v-if="allArr.length == 0">
				<image src="../../static/my/no-order.png"></image>
			</view>
		</view>

		<!-- 待付款 -->
		<view class="order_list" v-if="currentNav == 0">

			<view class="row" v-for="(item,index) in arrearage" :key='index'>
				<view class="row_head">
					<text class="sub_title" v-if='state==0'>待付款</text>
				</view>
				<view class="row_main"   @click="to_order_details(item.id,item.order_number)" v-for="(val,num) in item.goodslist" :key='num' v-if="item.goodslist.length == 1">
					<view class="left">
						<image :src="imgHttp+val.image" mode=""></image>
					</view>
					<view class="center">
						<text class="title">{{val.title}}</text>
						<!-- <text class="sub_title">单价:￥{{val.price}}{{ item.order_number.indexOf('openMember') != -1 ? '' : '/' +val.unit}}</text> -->
						<text class="sub_title">规格字段</text>
					</view>
					<view class="right">
						<viev class="title">￥<text class="big_num">{{val.price * val.itemnum | numberFilter}}</text><text>{{val.price * val.itemnum | numberFilter1}}</text></viev>
						<text class="num" ><text class="small_symbol">x</text>{{val.itemnum}}</text>
						<!-- v-if="item.order_number.indexOf('openMember') != -1" -->
					</view>
				</view>

				<view class="row_body" v-if="item.goodslist.length >= 2">

					<swiper display-multiple-items='2' next-margin="20rpx">
						<swiper-item v-for="(img,imgNum) in item.goodslist" :key='imgNum'  @click="to_order_details(item.id,item.order_number)">
							<view class="swiper-item">
								<image :src="imgHttp+img.image" mode=""></image>
								<text>x{{img.itemnum}}</text>
							</view>
						</swiper-item>
					</swiper>
					<view class="right">
						<view class="count">
							<text class="title">合计:</text>
							<text class="sub_title">￥{{item.payprice}}</text>
						</view>
						<view class="num">
							<text>共{{item.goodslist.length}}件</text>
						</view>
					</view>
				</view>

				<view class="row_bottom" v-if="state == 0">
					<text @click="to_order_fill(item)">去支付</text>
				</view>
			</view>
			<view class="no_more" v-if="arrearage.length == 0">
				<image src="../../static/my/no-order.png"></image>
			</view>
		</view>

		<!-- //代发货 -->
		<view class="order_list" v-if="currentNav == 1">

			<view class="row" v-for="(item,index) in unshipped" :key='index'>
				<view class="row_head">
					<text class="sub_title" v-if='state==1'>待发货</text>
				</view>
				<view class="row_main"   @click="to_order_details(item.id,item.order_number)" v-for="(val,num) in item.goodslist" :key='num' v-if="item.goodslist.length == 1">
					<view class="left">
						<image :src="imgHttp+val.image" mode=""></image>
					</view>
					<view class="center">
						<text class="title">{{val.title}}</text>
						<!-- <text class="sub_title">单价:￥{{val.price}}{{ item.order_number.indexOf('openMember') != -1 ? '' : '/' +val.unit}}</text> -->
						<text class="sub_title">规格字段</text>
					</view>
					<view class="right">
						<viev class="title">￥<text class="big_num">{{val.price * val.itemnum | numberFilter}}</text><text>{{val.price * val.itemnum | numberFilter1}}</text></viev>
						<text class="num" ><text class="small_symbol">x</text>{{val.itemnum}}</text>
						<!-- v-if="item.order_number.indexOf('openMember') != -1" -->
					</view>
				</view>

				<view class="row_body" v-if="item.goodslist.length >= 2">

					<swiper display-multiple-items='2' next-margin="20rpx">
						<swiper-item v-for="(img,imgNum) in item.goodslist" :key='imgNum'  @click="to_order_details(item.id,item.order_number)">
							<view class="swiper-item">
								<image :src="imgHttp+img.image" mode=""></image>
								<text>x{{img.itemnum}}</text>
							</view>
						</swiper-item>
					</swiper>
					<view class="right">
						<view class="count">
							<text class="title">合计:</text>
							<text class="sub_title">￥{{item.payprice}}</text>
						</view>
						<view class="num">
							<text>共{{item.goodslist.length}}件</text>
						</view>
					</view>
				</view>

				<view class="row_bottom" v-if="state == 1 && !idArr.includes(item.id)" @click="to_remind(item.id)">
					<text>提醒发货</text>
				</view>

				<view class="row_bottom" v-if="state == 1 && idArr.includes(item.id)">
					<text>已提醒</text>
				</view>
			</view>
			<view class="no_more" v-if="unshipped.length == 0">
				<image src="../../static/my/no-order.png"></image>
			</view>
		</view>

		<!-- //代收货 -->
		<view class="order_list" v-if="currentNav == 2">

			<view class="row" v-for="(item,index) in waitReceiving" :key='index'>
				<view class="row_head">
					<text class="sub_title" v-if='state==2'>卖家已发货</text>
				</view>
				<view class="row_main"   @click="to_order_details(item.id,item.order_number)" v-for="(val,num) in item.goodslist" :key='num' v-if="item.goodslist.length == 1">
					<view class="left">
						<image :src="imgHttp+val.image" mode=""></image>
					</view>
					<view class="center">
						<text class="title">{{val.title}}</text>
						<!-- <text class="sub_title">单价:￥{{val.price}}{{ item.order_number.indexOf('openMember') != -1 ? '' : '/' +val.unit}}</text> -->
						<text class="sub_title">规格字段</text>
					</view>
					<view class="right">
						<viev class="title">￥<text class="big_num">{{val.price * val.itemnum | numberFilter}}</text><text>{{val.price * val.itemnum | numberFilter1}}</text></viev>
						<text class="num" ><text class="small_symbol">x</text>{{val.itemnum}}</text>
						<!-- v-if="item.order_number.indexOf('openMember') != -1" -->
					</view>
				</view>

				<view class="row_body" v-if="item.goodslist.length >= 2">

					<swiper display-multiple-items='2' next-margin="20rpx">
						<swiper-item v-for="(img,imgNum) in item.goodslist" :key='imgNum'  @click="to_order_details(item.id,item.order_number)">
							<view class="swiper-item">
								<image :src="imgHttp+img.image" mode=""></image>
								<text>x{{img.itemnum}}</text>
							</view>
						</swiper-item>
					</swiper>
					<view class="right">
						<view class="count">
							<text class="title">合计:</text>
							<text class="sub_title">￥{{item.payprice}}</text>
						</view>
						<view class="num">
							<text>共{{item.goodslist.length}}件</text>
						</view>
					</view>
				</view>

				<view class="row_bottom" v-if="state == 2" @click="confirmOrder(item.id)">
					<text class="text_gray" @click="to_order_details(item.id,item.order_number)">查看物流</text>
					<text>确认收货</text>
				</view>
	
			</view>
			<view class="no_more" v-if="waitReceiving.length == 0">
				<image src="../../static/my/no-order.png"></image>
			</view>
		</view>

		<goodsRecommend></goodsRecommend>
		<div style="height: 100rpx;width: 100%;"></div>
	</view>

</template>

<script>
	import goodsRecommend from '../../components/goods-recommend.vue'
	export default {
		components:{
			goodsRecommend
		},
		filters:{
				numberFilter(e){
					return e.toString().split('.')[0] + '.'
				},
				numberFilter1(e){
					return e.toString().split('.')[1] ? e.toString().split('.')[1] : '00'
				}
		},
		data() {
			return {
				imgHttp: '',
				currentNav: 0,
				idArr: [], //提醒收货的数组
				state: '', //列表类型
				allArr: [], //全部
				arrearage: [], //待付款
				unshipped: [], //代发货
				waitReceiving: [], //待收货
				noEvaluate: [], //待评价
				maxallArr: 0,
				maxarrearage: 0,
				maxunshipped: 0,
				maxwaitReceiving: 0,
				maxnoEvaluate: 0,
			}
		},
		methods: {
			//跳转到订单详情
			to_order_details: function(id,type) {
				console.log(type)
				if(type.indexOf('openMember') != -1) return
				console.log(id)
				uni.navigateTo({
					url: "./order_details?id=" + id
				})
			},
			//申请退款
			refundOrder: function(id) {
				uni.navigateTo({
					url: "./order_refund?id=" + id + '&&type=0'
				})

			},
			//评价
			evaluateOrder: function(id) {
				let self = this;
				let data = {
					"token": uni.getStorageSync('token'),
					"userid": uni.getStorageSync('customer').userid,
					"orderid": id,
					"evaluateValue": 5,
					"evaluateMsg": '默认好评'
				}
				this.ask("/app/order/evaluateOrder", "POST", data, function(res) {
					console.log(res);
					self.hint('订单完成');
					self.allArr = []
					self.getOrderList(true);

				})
			},
			//删除订单
			deleteOrder: function(orderid) {
				let self = this;
				let data = {
					"token": uni.getStorageSync('token'),
					"userid": uni.getStorageSync('customer').userid,
					"orderid": orderid
				}
				uni.showModal({
					title: '提示',
					content: '确定是否删除该项订单？',
					success: function(res) {
						if (res.confirm) {
							self.ask("/app/order/deleteOrder", "POST", data, function(res) {
								self.hint(res.data.msg);
								self.allArr = [];
								self.getOrderList(true);
							})
						}
					}
				});
			},
			//确认收货
			confirmOrder: function(orderid) {

				let self = this;
				uni.showModal({
					title: '提示',
					content: '请确认订单商品已经收到？',
					success: function(res) {
						if (res.confirm) {

							let data = {
								"token": uni.getStorageSync('token'),
								"userid": uni.getStorageSync('customer').userid,
								"orderid": orderid
							}
							self.ask("/app/order/confirmOrder", "POST", data, function(res) {
								console.log(res)
								self.hint(res.data.msg)
								self.allArr = [];
								self.waitReceiving = [];
								self.getOrderList(true);
							})


						}
					}
				});


			},
			//提醒发货
			to_remind(id) {
				let date = new Date().getTime();
				let remindTime = uni.getStorageSync('remindTime') ? uni.getStorageSync('remindTime') : date;
				console.log(date - remindTime)
				if (date - remindTime >= 720000 * 2 ) {
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
			//支付订单
			to_order_fill(data) {
				let self = this;
				uni.login({
					success: function(loginRes) {
						console.log(payData)
						let payData = {
							"token": uni.getStorageSync('token'),
							"orderid": data.id,
							"userid": uni.getStorageSync('customer').userid,
							"code": loginRes.code
						}
						self.ask("/app/order/payOrder", "POST", payData, function(res) {
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
									self.allArr = [],
									self.arrearage = [],
									self.unshipped = [],
									self.waitReceiving = [],
									self.noEvaluate = [],
									self.currentNav = 1;
									self.state = '1';
									self.getOrderList(true);
										
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
					fail: function() {
						self.hint('登录失败')
					}
				});
			},
			//切换nav
			chooseNav(num) {
				this.currentNav = num;
				this.state = num + '';
				if (this.state == '-1') {
					this.state = '';
				}

				if (this.currentNav == 0 && this.arrearage.length == 0) {
					this.state = '0';
					this.getOrderList(true);
				} else if (this.currentNav == 1 && this.unshipped.length == 0) {
					this.state = '1';
					this.getOrderList(true);
				} else if (this.currentNav == 2 && this.waitReceiving.length == 0) {
					this.state = '2';
					this.getOrderList(true);
				} else if (this.currentNav == "-1" && this.allArr.length == 0) {
					this.state = '';
					this.getOrderList(true);
				}
			},
			//获取订单列表
			getOrderList(isFirst) {
				let self = this;
				let data = {
					"token": uni.getStorageSync('token'),
					"userid": uni.getStorageSync('customer').userid,
					"state": this.state,
					"page": 1,
					"pagesize": 100,
				};

				this.ask("/app/order/getOrderList", "POST", data, function(res) {
					console.log(res)
					if (isFirst == true) {

						if (self.state == '0') {
							self.arrearage = res.data.data;
							self.maxarrearage = res.data.count;

						} else if (self.state == '1') {
							self.unshipped = res.data.data;
							self.maxunshipped = res.data.count;

						} else if (self.state == '2') {
							self.waitReceiving = res.data.data;
							self.maxwaitReceiving = res.data.count;

						} else if (self.state == '-1') {
							self.allArr = res.data.data;
							self.maxallArr = res.data.count;

						}
					} else {
						if (self.state == '0' && self.maxarrearage != self.arrearage.length) {
							self.arrearage.push(...res.data.data);
						} else if (self.state == '1' && self.maxunshipped != self.unshipped.length) {
							self.unshipped.push(...res.data.data);
						} else if (self.state == '2' && self.maxwaitReceiving != self.waitReceiving) {
							self.waitReceiving.push(...res.data.data);
						} else if (self.state == '-1' && self.maxallArr != self.allArr.length) {
							self.allArr.push(...res.data.data);
						}
					}


				})
			}

		},
		onLoad(option) {
			this.imgHttp = this.comHttp;
			this.currentNav = option.type;
			this.state = option.type;
			let date = new Date().getTime();
			let remindTime = uni.getStorageSync('remindTime') ? uni.getStorageSync('remindTime') : date;
	
			if (date - remindTime >= 720000 * 2) {
				uni.removeStorageSync("remindArr");
			} else{
				this.idArr = uni.getStorageSync('remindArr') ? JSON.parse(uni.getStorageSync('remindArr')) : [];
			}
			
			// this.getOrderList(true);
		},
		onShow() {
			this.getOrderList(true);
		},
		onReachBottom() {
			this.getOrderList(false);
		}
	}
</script>

<style lang="scss">
	@import "./order.scss"
</style>

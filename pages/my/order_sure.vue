<template>
	<view class="details" v-cloak>
		<cu-custom bgColor="bg-gradual-blue" :isBack="true" >
			<block slot="content">订单详情</block>
		</cu-custom>
		<view class="address" v-if="defaultAddress == null " @click="showAddress">
			<text class="add_address">请选择地址</text>
		</view>
		<view class="address" @click="showAddress" v-if="defaultAddress !=null  && defaultAddress!= '' ">
			<view class="left">
				<image src="../../static/details/address.png" mode=""></image>
			</view>
			<view class="center">
				<text class="title">{{defaultAddress.address_province}}{{defaultAddress.address_detailed}}</text>
				<text class="name">{{defaultAddress.name}}<text class="tel">{{defaultAddress.telephone}}</text></text>
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
				<view class="row_main" v-for="(item,index) in goodsArr" :key='index'>
					<view class="left">
						<image :src="imgHttp+item.cover" mode=""></image>
					</view>
					<view class="center">
						<text class="title">{{item.name}}</text>
						<text class="sub_title">单价:￥{{item.sellingprice}}/{{item.unit}}</text>
						<text class="num">x{{item.num}}</text>
					</view>
					<view class="right">
						<text class="sub_title">￥{{item.sellingprice * item.num}}</text>
					</view>
				</view>
			</view>

		</view>
		
		<view class="price_box">
			<view class="row">
				<text class="title">商品金额</text>
				<text class="sub_title">￥{{totalprice}}</text>
			</view>
			<view class="row">
				<text class="title">运费</text>
				<text class="sub_title">￥{{totalpostage}}</text>
			</view>
			<view class="row">
				<text class="title">优惠金额</text>
				<text class="sub_title">￥{{discountPrice}}</text>
			</view>
		</view>
		
		<view class="remark_box">
			<view class="row">
				<text class="title">订单备注</text>
				<textarea  v-model="remake"  auto-height='true' />
			</view>
		</view>
		
		<view class="discount_box">
			<view class="row" @click="to_member()">
				<text class="title">优惠券</text>
				<view class="coupon">
					<text>￥{{couponPrice}}</text>
					<image src="../../static/details/arrow.png" mode=""></image>
				</view>
				
				
			</view>
		</view>

		
		<view class="details_foot">
			<text class="title">合计：</text>
			<text class="sub_title">￥{{endPrice}}</text>
			<text class="btn" @click="createOrder()" >立即购买</text>
		</view>
		<!-- //地址选择弹窗 -->
		<view class="addres_box" v-if="show_address">
			<view class="shadow_box" @click="showAddress">
			</view>
			<view class="address_list">
				<view class="list_head">
					<text class="btn cancel" @click="showAddress">退出</text>
					<text class="">地址选择</text>
					<text class="btn add" @click="to_address('add')">添加新地址</text>
				</view>
				<radio-group name="address" @change="chooseAddress($event)">
				<view class="address" v-for="(item,index) in addressList" :key='index'>
					<view class="">
						<radio class='red margin-left-sm' :checked="item.status == 1?true:false" :value="JSON.stringify(item)" ></radio>
					</view>
					<view class="center">
						<text class="title">{{item.address_province}}{{item.address_detailed}}</text>
						<text class="name">{{item.name}}<text class="tel">{{item.telephone}}</text></text>
					</view>
					<image class="edit" src="../../static/details/edit.png" mode="" @click="to_editAddress('edit',item)"></image>
				</view>
				
				</radio-group>
			</view>
		</view>
		
	</view>

</template>

<script>
	let newEndPrice = 0;
	let couponId = '';
	export default{
		data(){
			return{
				imgHttp:'',
				show_address:false,//是否显示地址
				detailsObj:'',
				totalprice: 0,//商品总价
				goodsArr:[],
				addressList:[],
				defaultAddress:'',//默认地址
				totalpostage:0,//邮费
				endPrice:0,//最终价格
				remake:'',
				source:"",
				discount:'',//折扣
				discountPrice: 0,//折扣金额
				couponPrice:0,//优惠券金额
			}
		},
		methods:{
			//跳转到优惠券
			to_member(){
				uni.navigateTo({
					url:'./discount?type=1' + "&&minPrice=" + this.totalprice  +'&&couponId=' + JSON.stringify(couponId)
				})
			},
			//创建订单
			createOrder(){
				if(this.defaultAddress == null){
					this.hint('请选择地址')
					return
				}
				
				let self = this;
				let data = {
					"token":uni.getStorageSync('token'),
					"userid":uni.getStorageSync('customer').userid,
					"items":JSON.stringify(self.detailsObj),
					"couponid": couponId == '' ? '' : couponId.join(','),
					"addressid": self.defaultAddress.id,
					"remark": self.remake
				}
				console.log(data)
				
				this.ask('/app/order/createOrder',"POST",data,function(res){
					console.log(res)
					if(res.data.orderid !='' || res.data.orderid != undefined ){
						
						uni.login({
							success: function(loginRes) {
								console.log(payData)
								let payData = {
									"token":uni.getStorageSync('token'),
									"orderid":res.data.orderid,
									"userid":uni.getStorageSync('customer').userid,
									"code": loginRes.code
								}
								self.ask("/app/order/payOrder","POST",payData,function(res){
									console.log(res)
									if(!res.data.data){
										uni.navigateTo({
											url:'./order_details?id=' + payData.orderid + "&&source=goodsDetails"
										})
										return
									} 
									uni.requestPayment({
										provider: 'wxpay',
										timeStamp: res.data.data.timeStamp + '',
										nonceStr: res.data.data.nonceStr,
										package: res.data.data.package,
										signType: 'MD5',
										paySign: res.data.data.sign,
										success: (e) => {
											console.log("success", e);
                                            uni.navigateTo({
                                            	url:'./order_details?id=' + payData.orderid + "&&source=goodsDetails"
                                            })
										},
										fail: (e) => {
											console.log("dfail", e);
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
						
					}
				})
			},
			//选择地址
			chooseAddress(e){
				this.defaultAddress = JSON.parse(e.detail.value)
			},
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
			//显示地址列表
			showAddress(){
				this.show_address = !this.show_address;
			},
			//获取地址列表
			getAddress(){
				let self = this;
				let data={
					"token":uni.getStorageSync('token'),
					"userid":uni.getStorageSync('customer').userid
				};
				this.ask("/app/address/getAddressList",'POST',data,function(res){
					self.addressList = res.data.addresslist;
				
				})
			},
			//获取商品信息
			getGoodsInfo(){
				let self = this;
				let data={
					"token":uni.getStorageSync('token'),
					"orderitem":JSON.stringify(self.detailsObj),
					"userid":uni.getStorageSync('customer').userid,
				}
				this.ask('/app/order/getOrderInfo',"POST",data,function(res){
					console.log(res);
					self.goodsArr = res.data.orderInfo.iteminfolist;
					self.totalprice = res.data.orderInfo.totalprice;
					self.totalpostage = res.data.orderInfo.totalpostage;
					self.discountPrice = Math.floor(Number(self.totalprice) * (1 - self.discount / 10) *100) / 100;
					self.endPrice =  Number(self.totalprice)  - self.discountPrice - self.totalpostage ;
					self.endPrice = Math.floor(self.endPrice * 100) / 100 
					self.endPrice = self.endPrice - newEndPrice;
					if(self.endPrice < 0){
						self.endPrice = 0
					}
					self.defaultAddress = res.data.orderInfo.address;
				})
			}
		},
		onLoad(option) {
			this.discount = Number(uni.getStorageSync('customer').discount);
			if( this.discount == 0){
				this.discount = 10;
			}
			this.imgHttp = this.comHttp;
			this.detailsObj = JSON.parse(option.goodsObj);
			// this.source = option.source;
			let self = this
			uni.$on('discountArr',function(data){
				self.couponPrice = data.discountPrice;
				newEndPrice = self.couponPrice;
				couponId = data.choosed;
			})
		},
		onShow() {
			this.getGoodsInfo();
			this.getAddress();
		},
		onUnload() {
			newEndPrice = 0;
			couponId = '';
			// if(this.source == 'goodsDetails'){
			// 	console.log(3333)
			// 	uni.redirectTo({
			// 		url:'../home/home'
			// 	})
			// }
			
		}
		
	}
</script>

<style lang="scss">
	@import "./order.scss";
	@import "./order_details.scss";
</style>
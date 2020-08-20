<template>
	<view class="my_box" v-cloak>
		<view class="status_bar">
			<view class="top_view"></view>  
		</view>  
		<view class="my_top" :style="{top:headerTop,height: headHeight}">
		</view>
		<view class="my_head">
			<view class="user_no" v-if="userObj.nickname" @click="toMemberCode()">
				会员码
			</view>
			<view class="info-block">
				<image :src="userObj.avatar" mode=""></image>
				<view class="user_msg">
					<text class="no_tip" v-if="userObj.nickname">{{decodeURIComponent(userObj.nickname)}}</text>
					<button class="no_tip" v-if="!userObj.nickname" open-type="getUserInfo" @getuserinfo="getinfo()">点击授权登录</button>
				</view>
			</view>
			<view class="member_box">
				<view class="member_head">
				   <text class="v-logo" ></text>
				   <!-- <text class="sub_title"  @click="toMember()">立即开通</text> -->
				  <text class="title" @click="toMember()">成为会员 ></text>
				</view>
			</view>
		</view>
		<view class="grap"></view>
		<view class="main_block">
			<view class="header">
				<view class="title">我的订单</view>
				<view class="more" @click="toOrder(-1)">
					<text>查看全部订单</text>
					<text class="lg text-gray cuIcon-right"></text>
				</view>
			</view>
			<view class="body">
				<view class="icon-area">
					<view class="flex">
						<view class="flex-sub padding-sm margin-xs">
							<view  @click="toOrder(0)">
								<image src="../../static/my/icon-wallet.png"></image>
								<view class="text">待付款</view>
							</view>
						</view>
						<view class="flex-sub padding-sm margin-xs">
							<view  @click="toOrder(1)">
								<image src="../../static/my/icon-box.png"></image>
								<view class="text">待收货</view>
							</view>
						</view>
						<view class="flex-sub padding-sm margin-xs">
							<view  @click="toOrder(2)">
								<image src="../../static/my/icon-truck.png"></image>
								<view class="text">待发货</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="grap"></view>
		<view class="main_block">
			<view class="list" @click="toCart()">
				<view class="flex">
					<image src="../../static/my/icon-cart.png"></image>
					<text class="text">购物车</text>
				</view>
				<text class="lg text-gray cuIcon-right"></text>
			</view>
			<view class="list" @click="toCollected()">
				<view class="flex">
					<image src="../../static/my/icon-start.png"></image>
					<text class="text">收藏夹</text>
				</view>
				<text class="lg text-gray cuIcon-right"></text>
			</view>
			<view class="list" @click="toDistribution()">
				<view class="flex">
					<image src="../../static/my/icon-file.png"></image>
					<text class="text">商务合作</text>
				</view>
				<text class="lg text-gray cuIcon-right"></text>
			</view>
			<view class="list" @click="toAddressList">
				<view class="flex">
					<image src="../../static/my/icon-map.png"></image>
					<text class="text">收货地址</text>
				</view>
				<text class="lg text-gray cuIcon-right"></text>
			</view>
		</view>
		<view class="grap"></view>
		<view class="main_block">
			<view class="list" @click="toDiscount">
				<view class="flex">
					<image src="../../static/my/icon-ticket.png"></image>
					<text class="text">优惠券</text>
				</view>
				<text class="lg text-gray cuIcon-right"></text>
			</view>
			<view class="list" @click="toMember()">
				<view class="flex">
					<image src="../../static/my/icon-vip.png"></image>
					<text class="text">VIP</text>
				</view>
				<text class="lg text-gray cuIcon-right"></text>
			</view>
		</view>
		<view class="grap"></view>
		<view class="main_block">
			<view class="list">
				<button open-type='contact' class="flex">
					<image src="../../static/my/icon-service.png"></image>
					<text class="text">客服</text>
				</button>
				<text class="lg text-gray cuIcon-right"></text>
			</view>
			<view class="list" @click="toSeting()">
				<view class="flex">
					<image src="../../static/my/icon-user-setting.png"></image>
					<text class="text">账号设置</text>
				</view>
				<text class="lg text-gray cuIcon-right"></text>
			</view>
			<view class="list" @click="toConnection()">
				<view class="flex">
					<image src="../../static/my/icon-phone.png"></image>
					<text class="text">联系我们</text>
				</view>
				<text class="lg text-gray cuIcon-right"></text>
			</view>
			<view class="list" @click="toAbout()">
				<view class="flex">
					<image src="../../static/my/icon-about.png"></image>
					<text class="text">关于我们</text>
				</view>
				<text class="lg text-gray cuIcon-right"></text>
			</view>
		</view>
		<floatWindows :showFloat="true"></floatWindows>
		
		<!-- <view class="btn_head">
			<view class="row">
				<view class="btn" @click="toDiscount">
					<image src="../../static/my/discounts.png" mode=""></image>
					<text>优惠劵</text>
				</view>
				<view class="btn" @click="toMessage()">
					<image src="../../static/my/msg.png" mode=""></image>
					<text>消息</text>
				</view>
				<view class="btn" @click="toCollected()">
					<image src="../../static/my/collect.png" mode=""></image>
					<text>收藏</text>
				</view>
			</view>
			
		</view> -->
		<!-- //我得订单 -->
		<!-- <view class="order_box">
			<text class="title">我的订单</text>
			<view class="row">
				<view class="btn" @click="toOrder(0)">
					<image src="../../static/my/paided.png" mode=""></image>
					<text>待付款</text>
				</view>
				<view class="btn" @click="toOrder(1)">
					<image src="../../static/my/unpaid.png" mode=""></image>
					<text>待发货</text>
				</view>
				<view class="btn" @click="toOrder(2)">
					<image src="../../static/my/trading.png" mode=""></image>
					<text>待收货</text>
				</view>
				<view class="btn" @click="toOrder(3)">
					<image src="../../static/my/traded.png" mode=""></image>
					<text>完成</text>
				</view>
			</view>
			<image src="../../static/ad3.png" class="active" mode=""></image>
			<view class="row">
				<button class="btn" open-type='contact'>
					<image src="../../static/my/service.png" mode=""></image>
					<text>客服</text>
				</button>
				<view class="btn" @click="toMember()">
					<image src="../../static/my/member.png" mode=""></image>
					<text>会员</text>
				</view>
				<view class="btn" @click="toDistribution()">
					<image src="../../static/my/sales.png" mode=""></image>
					<text>分销</text>
				</view>
			</view>
			<view class="row">
				<view class="btn" @click="toConnection()">
					<image src="../../static/my/contact.png" mode=""></image>
					<text>联系我们</text>
				</view>
				<view class="btn" @click="toAbout()">
					<image src="../../static/my/about.png" mode=""></image>
					<text>关于我们</text>
				</view>
				<view class="btn" @click="toSeting()">
					<image src="../../static/my/set.png" mode=""></image>
					<text>设置</text>
				</view>
			</view>
		</view> -->
		
		<!-- <view class="cu-modal " :class="modalName=='doLoginModal'?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">授权提醒</view>
					<view class="action" @tap="hideModal">
						<text class="cuIcon-close text-golden" ></text>
					</view>
				</view>
				<view class="padding bg-white">
					请授权头像等信息，以便为您提供更好的服务
				</view>
				<view>
					<button class="cu-btn bg-golden margin-tb-sm lg" open-type="getUserInfo" @getuserinfo="getinfo()">去授权</button>
				</view>
			</view>
		</view> -->
	</view>
</template>

<script>

	export default{
		components:{
		},
		data(){
			return{
				headerTop: 0,
				headHeight:0,
				modalName:'',//是否显示授权弹窗
				userObj: {nickname:'',avatar:'../../static/missing-face.png'},//用户信息
				applicationstatu: '',
				
			}
		},
		methods:{
			//
			hideModal:function(){
				uni.navigateBack({
					delta:1
				})
			},
			
			closeDoLogin:function(){
				this.modalName = '';
			},
			//跳转到消息列表
			toMessage(){
				uni.navigateTo({
					url:'./message_list'
				})
			},
			//跳转到购物车
			toCart(){
				uni.navigateTo({
					url:'../cart/cart'
				})
			},
			
			//跳转到收藏
			toCollected(){
				uni.navigateTo({
					url:'../commodity/collect'
				})
			},
			//跳转到优惠券
			toDiscount:function(){
				uni.navigateTo({
					url:"./discount"
				})
			},
			//跳转到订单
			toOrder:function(num){
				uni.navigateTo({
					url:'./order?type=' + num
				})
			},
			//跳转到分销
			toDistribution:function(){
			    // application
				// if(this.applicationstatu == '' || this.applicationstatu == null ){
				// 	uni.navigateTo({
				// 		url:'./apply_distribution'
				// 	})
				// 	return
				// }
           	    
				if(this.applicationstatu == '0'  ){
					uni.navigateTo({
						url:'./apply_distribution'
					})
					return
				}	
				
				if(this.applicationstatu == '2' ){
					uni.navigateTo({
						url:'./check'
					})
					return
				} 
				if(this.applicationstatu == '1'){
					uni.navigateTo({
						url:'./distribution'
					})
				}
				
			},
			//跳转到会员
			toMember:function(){

				uni.navigateTo({
					url:"./member"
				})
			},
			//跳转到关于我们
			toAbout:function(){
			
				uni.navigateTo({
					url:'./about'
				})
			},
			//跳转到联系我们
			toConnection:function(){
				uni.navigateTo({
					url:'./connection'
				})
			},
			//跳转到设置
			toSeting(){
				uni.navigateTo({
					url:'./seting'
				})
			},
			//跳转到设置
			toMemberCode(){
				uni.navigateTo({
					url:'./menber_code'
				})
			},
			//跳转到地址列表
			toAddressList(){
				uni.navigateTo({
					url:'./address_list'
				})
			},
	
			
			//获取分销状态
			getMarketStatu(){
				let self = this;
				let data = {
					"token": uni.getStorageSync('token'),
					"userid": uni.getStorageSync('customer').userid
				};
				this.ask('/app/me/marketStatu','POST',data,function(res){
					self.applicationstatu = res.data.applicationstatu
					console.log(res)
				})	
			}
		},
		onLoad:function(){
			
		},
		onShow() {
			if(uni.getStorageSync('customer') == ''){
				this.modalName = 'doLoginModal';
			}else{
				this.userObj = uni.getStorageSync('customer');
				this.getMarketStatu();
			}
		},
		created() {
			//初始化顶部高度
			this.headerTop = this.StatusBar + 'px';
			this.headHeight = this.CustomBar/2 + 'px';
		}
	}
</script>

<style lang="scss">
@import "./my.scss"
</style>

<template>
	<view class="member_box" v-cloak>
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<block slot="content">会员</block>
		</cu-custom>
		<view class="my_top" :style="{top:headerTop,height: headHeight}">
		</view>
		<view class="my_head">
			<image :src="userObj.avatar" mode=""></image>
			<view class="user_msg">
				<text class="user_name">{{decodeURIComponent(userObj.nickname)}}</text>
				<text class="user_text">{{isMember}}</text>
			</view>
		</view>
		<swiper class="member_type" :current="currentType" :display-multiple-items="3">
			<swiper-item v-for="(item,index) in memberObj" :key='index'>
				<view class="swiper-item" :class="{act_nav: currentType == index}" @click="chooseNav(index)">{{item.title}}</view>
			</swiper-item>
			<swiper-item>
				<view class="swiper-item" ></view>
			</swiper-item>
			<swiper-item>
				<view class="swiper-item" ></view>
			</swiper-item>
		</swiper>
		
		
		<view class="member_head">
			<view class="member_img">
				<swiper class="swiper_img" @change='chooseImg($event)' :current='currentType' >
					<swiper-item v-for="(item,index) in memberObj" :key='index'   >
						<view class="swiper-item">
							<!-- <text class="price">{{item.sellingprice}}<text class="unit">￥</text> </text> -->
							<!-- <image class="member_bg" src="../../static/member/member.png" ></image> -->
							<!-- <image class="member_icon" :src="imgHttp+item.imgsrc" mode=""></image> -->
							<image class="member_bg" :src="imgHttp+item.imgsrc" ></image>
						</view>
					</swiper-item>
				</swiper>
			</view>
			
		</view>
		
		<view class="member_equity">
			<text class=".equity_title">会员权益</text>
			<view class="equity_list">
				<view class="equity_module">
					<image src="../../static/member/btn7.png" mode=""></image>
					<text>账号保护</text>
				</view>
				<view class="equity_module">
					<image src="../../static/member/btn6.png" mode=""></image>
					<text>生日礼包</text>
				</view>
				<view class="equity_module">
					<image src="../../static/member/btn2.png" mode=""></image>
					<text>独家礼券</text>
				</view>
				<view class="equity_module">
					<image src="../../static/member/btn5.png" mode=""></image>
					<text>会员权益</text>
				</view>
				<view class="equity_module">
					<image src="../../static/member/btn8.png" mode=""></image>
					<text>专属优惠</text>
				</view>
				<view class="equity_module">
					<image src="../../static/member/btn4.png" mode=""></image>
					<text>会员奖励</text>
				</view>
				<view class="equity_module">
					<image src="../../static/member/btn3.png" mode=""></image>
					<text>分享好友</text>
				</view>
				<view class="equity_module">
					<image src="../../static/member/btn1.png" mode=""></image>
					<text>爱心服务</text>
				</view>
			</view>
			
		</view>

		<view class="member_equity">
			<text class=".equity_title">会员说明</text>
			<view class="equity_list" v-if="currentType == index" v-for="(item,index) in memberExplain" :key = 'index'>
				<view class="equity_row" v-for="(val,num) in item" :key='num' >
				   {{num+1 +'、'}}{{val}}
				</view>

			</view>
			
		</view>
		<view class="foot_btn">
			<text @click="pay">开通{{memberObj[currentType].title}}</text>
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
				userObj:'',
				currentType:0,
				memberObj:'',//会员对象
				imgHttp:'',
				isMember:'您还不是会员',
				memberExplain:[],//会员说明
			}
		},
		methods:{
			//切换会员img
			chooseImg(e){
			
				this.currentType = e.detail.current;
			},
			//选择nav
			chooseNav(num){
				this.currentType = num;
			},
			//获取会员类型
			getMemberType(){
				let self = this;
				let data = {
					"token":uni.getStorageSync('token'),
					"userid": uni.getStorageSync('customer').userid,
				}
				
				this.ask("/app/member/getMember","POST",data,function(res){
					console.log(res)
					self.memberObj = res.data.data;
					for(let i = 0 ; i < self.memberObj.length;i++){
						self.memberExplain.push(self.memberObj[i].explain.split(/[\n,]/g))
					}
					
					
					
				})
			},
			//会员支付
			pay(){
				let self = this;			
				uni.login({
					success: function(loginRes) {
						
						let data = {
							"token":uni.getStorageSync('token'),
							"orderid":'openmember',
							"userid":uni.getStorageSync('customer').userid,
							"code":loginRes.code,
							"memberid": self.memberObj[self.currentType].id
						}
						self.ask('/app/member/payMember',"POST",data,function(res){
							uni.requestPayment({
								provider: 'wxpay',
								timeStamp: res.data.data.timeStamp + '',
								nonceStr: res.data.data.nonceStr,
								package: res.data.data.package,
								signType: 'MD5',
								paySign: res.data.data.sign,
								// orderInfo: res.data.data,
								success: (e) => {
									let data2 = {
										"token":uni.getStorageSync('token'),
										"userid":uni.getStorageSync('customer').userid,
									}
									self.ask('/app/userLogin/refreshUserInfo',"POST",data2,function(res){
										if(res.data.userInfo.avatar.indexOf('http') == -1){
											res.data.userInfo.avatar = self.comHttp + res.data.userInfo.avatar; 
										}
                                        uni.setStorageSync("customer",res.data.userInfo)
										uni.showModal({
											title: '提示',
											content: '支付成功',
											showCancel: false,
											success: function(res) {
												uni.navigateBack({
													delta: 1
												})
											}
										});
									})
									
	
								},
								fail: (e) => {
								
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
				});
			}
		},
		onLoad() {
			this.imgHttp = this.comHttp;
			this.userObj = uni.getStorageSync('customer');
			this.getMemberType()
		},
		onShow() {
			if(uni.getStorageSync('customer').usertype !="0" || uni.getStorageSync('customer').usertype != null){
			    this.isMember = '尊敬的会员'
			}
			
		}
	}
</script>

<style lang="scss">
	@import './member.scss'
	
	
</style>

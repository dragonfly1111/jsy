<template>
	<view class="details_box" v-cloak>
		<view class="bact_btn" :style="{paddingTop:heightTop,height:height}" @click="back()">
			<image src="../../static/details/back.png" mode=""></image>
		</view>
		<view class="details_swiper">
			<swiper class="screen-swiper square-dot" :indicator-dots="true" :circular="true"
			 :autoplay="true" interval="5000" duration="500">
				<swiper-item v-for="(item,index) in carousel" :key='index'>
					<view class="swiper-item">
						<image :src="imgHttp + item" mode=""></image>
					</view>
				</swiper-item>
			</swiper>
		</view>
		<view class="details_msg">
			<view class="title">
				<text v-if="detailsObj.name">{{detailsObj.name}}</text>
			</view>
			<view class="sub_title">
				<text v-if="detailsObj.keyword">{{detailsObj.keyword.replace(",",' ')}}</text>
				<text v-if="detailsObj.salesvolume">销量：{{detailsObj.salesvolume}}</text>
			</view>
			<view class="price_box">
				<view class="discount">
					<text class="coin">￥</text>
					<text class="price">{{detailsObj.sellingprice}}</text>
					<text class="unit" v-if="detailsObj.unit">/{{detailsObj.unit}}</text>
				</view>
				<view class="original">
					<text v-if="detailsObj.marketprice" >￥{{detailsObj.marketprice}}/{{detailsObj.unit}}</text>
				</view>
			</view>
		</view>
		
		<view class="source_box">
			<view class="source">
				<image src="../../static/details/location.png" mode=""></image>
				<text v-if="detailsObj.area">{{detailsObj.area}}</text>
				<view class="line">
					
				</view>
			</view>
			<view class="source">
				<image src="../../static/details/brand.png" mode=""></image>
				<text v-if="detailsObj.trademark">{{detailsObj.trademark}}</text>
				<view class="line">
					
				</view>
			</view>
			<view class="source">
				<image src="../../static/details/provider.png" mode=""></image>
				<text v-if="detailsObj.supplier">{{detailsObj.supplier}}</text>
			</view>
		</view>
		
		<view class="choose_list">
			<view class="row" v-for="(item,index) in detailsObj.specification_detail" :key='index' @click="chooseType(item.sellingprice,index,item.id,item.combination,item.marketprice)">
				<view class="type_text">
					<text class="title">规格：</text>
					<text class="sub_title">{{item.combination.replace(","," ")}}</text>
				</view>
				<image src="../../static/details/specification.png" mode="" v-if="currentType == index"></image>
			</view>
		</view>
		
		<view class="details_bg">
			<rich-text :nodes="detailsObj.particular"></rich-text>
		</view>
		
		<view class="foot_btn">
			<view class="collect_box">
				<image @click="addCollect" src="../../static/details/collect.png" mode="" v-if="collectType == false"></image>
				<text @click="addCollect" v-if="collectType == false">收藏</text>
				
				<image @click="addCollect" src="../../static/details/collected.png" mode="" v-if="collectType == true"></image>
				<text @click="addCollect" v-if="collectType == true">已收藏</text>
			</view>
			<view class="btn_box">
				<text class="add" @click="addCart()">加入购物车</text>
				<text class="buy" @click="nowBuy()">立即购买</text>
			</view>
			
		</view>
		<view class="cu-modal " :class="modalName=='doLoginModal'?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">授权提醒</view>
					<view class="action" >
						<text class="cuIcon-close text-golden" @click="closeDoLogin" ></text>
					</view>
				</view>
				<view class="padding bg-white">
					请授权头像等信息，以便为您提供更好的服务
				</view>
				<view>
					<button class="cu-btn bg-golden margin-tb-sm lg" open-type="getUserInfo" @getuserinfo="getinfo('goodsDetails')">去授权</button>
				</view>
			</view>
		</view>
		<view class="cu-modal" :class="modalName=='Modal'?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">友情提示</view>
					<view class="action" @tap="closeDoLogin">
						<text class="cuIcon-close text-golden"></text>
					</view>
				</view>
				<view class="padding-xl">
					<view>您还不是三源会员，无法购买商品！</view>
					<button class="cu-btn bg-golden margin-tb-sm lg" @click="to_member">立即开通会员</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				"heightTop":'',
				"height":'',
				"key":"" ,//商品id
				"userid":"",//用户id
				"brand": "",//手机品牌
				"model": "",//手机型号
				"platform": "",//手机平台
				"detailsObj":{},//商品详情
				"imgHttp":'',
				"carousel":[],//轮播数组
				"currentType": -1,//当前商品规格类型
				"modalName":'',//是否显示授权弹窗
				"vipprice":'',//vip价格
				"orginprice":'',//市场价格
				"specSelectedId":'',//规格id
				"specSelectedName":'',//规格名称
				"userObj":{},
				"token":'',
				"collectType": false,
				"openShare": ''//是否从分享路口进来
			}
		},
		methods:{
			//返回上一页
			back(){
			   if(this.openShare == 'share'){
				   uni.switchTab({
				   	url:'../home/home'
				   })
			   } else{
				   uni.navigateBack({
				   	delta:1
				   })
			   }
			   
			},
			//关闭授权
			closeDoLogin:function(){
				this.modalName = '';
			},
			//跳转到会员页面
			to_member:function(){
				uni.navigateTo({
					url:'../my/member'
				})
			},
			//判读是否登录
			isLogin2:function(callback){
				if(uni.getStorageSync('token') == '' && uni.getStorageSync('customer') == ''){
					this.modalName = 'doLoginModal';
					
				} else{
					callback()
				}
				
			},
			//添加或者移除收藏
			addCollect(){
				let self = this;
				this.isLogin2(function(){
					
					let data = {
						"token":uni.getStorageSync('token'),
						"itemid":self.key,
						"userid": uni.getStorageSync('customer').userid,
						"iscollect": self.collectType
					}
					if(self.collectType){
						uni.showLoading({
							title: '取消收藏'
						});
					} else{
						uni.showLoading({
							title: '添加收藏'
							
						});
					
					}
					self.ask("/app/index/addCollect","POST",data,function(res){
						
						self.collectType = res.data.iscollect;
						
						
					})
					
				})
				
				
			},
			//判断当前用户是否收藏
			isCollect(){
			  let self = this;
			  let data = {
				  "token":uni.getStorageSync('token'),
				  "itemid":self.key,
				  "userid": uni.getStorageSync('customer').userid,
			  }
			  this.ask("/app/index/isCollect","POST",data,function(res){
				 self.collectType = res.data.iscollect;
			  })
			},
			//加入购物车
			addCart(){
				let self = this;
				this.isLogin2(function(){
					if(self.currentType == -1 && self.detailsObj.specification_detail.length !=0){
						self.hint('请选择规格')
					} else{
						let data = {
							"token":uni.getStorageSync('token'),
							"itemid":self.key,
							"userid": uni.getStorageSync('customer').userid,
							"spec": self.specSelectedName
						}
						// console.log(data)
						self.ask("/app/index/addCart","GET",data,function(res){
							self.hint("加入购物车成功")
							// console.log(res)
						})
					}
				})
			},
			//立即购买
			nowBuy(){
				let self = this;
				this.isLogin2(function(){
					// console.log(self.token);
					//判断是否开通会员
					if(uni.getStorageSync('customer').usertype =="0" || uni.getStorageSync('customer').usertype ==null){
                        self.modalName = 'Modal'
						return
					}
					
					//判断是否选择规格
					if(self.currentType == -1 && self.detailsObj.specification_detail.length !=0){
						self.hint('请选择规格')
					} else{
						let goodsObj = [{
								"itemid":self.key,
								"itemnum": 1,
								"specid":self.specSelectedId
						}]
						let endPrice = self.vipprice;
						uni.navigateTo({
							url:'../my/order_sure?goodsObj=' + JSON.stringify(goodsObj) + '&&endPrice=' + endPrice + '&&source=goodsDetails'
						})
					}
				})
			},
			//选择规格
			chooseType(price,index,id,name,orginprice){
				this.vipprice = price;
				this.orginprice = orginprice;
				this.currentType = index;
				this.specSelectedId = id;
				this.specSelectedName = name;
			},
			//获取商品详情
			getGoodsDetails(){
				let data = {
					"key": this.key,
					"userid": this.userid,
					"brand": this.brand,
					"model": this.model,
					"platform": this.platform,
				}
				let self = this;
				this.ask("/app/index/getProduct","GET",data,function(res){
					self.detailsObj = res.data.data
					self.carousel = self.detailsObj.carousel.split(",");
					self.vipprice = self.detailsObj.vipprice;
					// self.carousel.pop();
					// console.log(self.detailsObj)
					// console.log(self.detailsObj.specification_detail)
					
				})
			}
		},
		onLoad(option) {
			console.log(option)
			this.heightTop = this.StatusBar + 'px'
			this.height = this.CustomBar + 'px'
			this.imgHttp = this.comHttp
			this.key = option.id; //获取商品id
			this.openShare = option.type;
			let sysres=uni.getSystemInfoSync(); //获取手机系统信息
			this.brand=sysres.brand;
			this.model=sysres.model;
			this.platform=sysres.platform;
			this.getGoodsDetails();
			if(uni.getStorageSync('token') != '' && uni.getStorageSync('customer') != ''){
				this.isCollect();
			}
			if(option.type == 'share'){
				console.log(33333)
				uni.setStorageSync('sender', option.userid)
			
			}
		},
		onShareAppMessage(res) {
			// console.log(res)
			uni.navigateTo({
				url:'.goods_de'
			})
			return {
			      title: this.detailsObj.name,
			      path: '/pages/commodity/goods_details?id=' +  this.key + '&&type=share' + '&&userid=' + uni.getStorageSync('customer').userid
			    }
		},
		onShow() {
			this.modalName = '';
		}
	}
</script>

<style lang="scss">
	@import "./goods_details.scss";
</style>

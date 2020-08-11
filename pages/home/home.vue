<template>
	<view class="home_box" v-cloak>
		<view class="search" :style="{paddingTop:headerTop,height:headHeight}">
			<input type="text" v-model="searchKey" @confirm='toSearch()' />
			<image src="../../static/home/msg.png" mode="" @click="to_message()"></image>
		</view>
		<view class="swiper_head">
			<swiper class="screen-swiper square-dot" :indicator-dots="true" :circular="true"
			 :autoplay="true" interval="5000" duration="500">
				<swiper-item v-for="(item,index) in headSwiper" :key='index'>
					<view class="swiper-item" @click="toSwiper(item.type,item.imgurl)">
						<image :src="imgHttp+item.imgsrc" mode=""></image>
					</view>
				</swiper-item>
			</swiper>
		</view>

		<view class="head_nav">
			<view class="nav" v-for="(item,index) in headNav" :key = 'index' @click="toCommmodity(item.id)">
				<image :src="imgHttp+item.producttypeimg" mode=""></image>
				<text>{{item.producttypename}}</text>
			</view>
		</view>
		<swiper class="advertising" :autoplay="true" :interval="4000" :duration="1000" :circular="true" display-multiple-items='1.05' previous-margin='30rpx' next-margin="10rpx">
			<swiper-item>
				<image class="recommend" src="../../static/add1.png" mode=""></image>
			</swiper-item>
			<swiper-item>
				<image class="recommend" src="../../static/add2.png" mode=""></image>
			</swiper-item>
			<swiper-item>
				<image class="recommend" src="../../static/add3.png" mode=""></image>
			</swiper-item>
			<swiper-item>
				<image class="recommend" src="../../static/add4.png" mode=""></image>
			</swiper-item>
		</swiper>
		<image class="recommend2" src="../../static/ad3.png" mode=""></image>
		<view class="title_type">
			<text class="title">不时不食</text>
			<view class="title_sub" @click="toCommmodity(moreType1)">
				<text>更多</text>
				<image src="../../static/home/arrow.png" mode=""></image>
			</view>
		</view>
		<view class="goods_list">
			<view class="goods" v-if="index <= 5" v-for="(item,index) in goods" :key='index' @click="toDetails(item.id)">
				<image class="goods_img" :src="imgHttp+item.cover" mode=""></image>
				<view class="goods_name">
					<text class="title">{{item.name}}</text>
				<!-- 	<text class="unit">1kg</text> -->
				</view>
				<view class="sub_title">
					<text>{{item.keyword.replace(",",' ')}}</text>
				</view>
				<view class="price_box">
					<view class="price_left">
						<text class="price">￥{{item.sellingprice}}</text>
						<text class="unit">/{{item.unit}}</text>
					</view>
				<!-- 	<image class="cart" src="../../static/cart.png" mode=""></image> -->
				</view>
			</view>
        </view>

		<view class="title_type">
			<text class="title">热卖食材推荐</text>
			<view class="title_sub" @click="toCommmodity('hot')">
				<text>更多</text>
				<image src="../../static/home/arrow.png" mode=""></image>
			</view>
		</view>
		
		<view class="swiper_recommend">
			<swiper  display-multiple-items='3' next-margin="20rpx">
				<swiper-item v-for="(item,index) in recommend" :key='index' @click="toDetails(item.id)">
					<view class="swiper-item">
						<view class="goods">
							<image class="goods_img" :src="imgHttp+item.cover" mode=""></image>
							<view class="goods_name">
								<text class="title">{{item.name}}</text>
								<!-- <text class="unit">1kg</text> -->
							</view>
							<view class="sub_title">
								<text>{{item.keyword.replace(",",' ')}}</text>
							</view>
							<view class="price_box">
								<view class="price_left">
									<text class="price">￥{{item.sellingprice}}</text>
									<text class="unit">/{{item.unit}}</text>
								</view>
								<!-- <image class="cart" src="../../static/cart.png" mode=""></image> -->
							</view>
						</view>
					</view>
				</swiper-item>
			</swiper>
		</view>
		<!-- <view class="title_type">
			<text class="title">折扣专区</text>
			<view class="title_sub">
				<text>更多</text>
				<image src="../../static/home/arrow.png" mode=""></image>
			</view>
		</view>
		
		<view class="swiper_discount">
			<swiper display-multiple-items='4.2' next-margin="10rpx" >
				<swiper-item >
					<view class="swiper-item" :class="{active:current == 0}"  @click="currentDiscount(0)">九折专区</view>
				</swiper-item>
				<swiper-item>
					<view class="swiper-item" :class="{active:current == 1}" @click="currentDiscount(1)">八折专区</view>
				</swiper-item>
				<swiper-item>
					<view class="swiper-item" :class="{active:current == 2}" @click="currentDiscount(2)">七折专区</view>
				</swiper-item>
				<swiper-item>
					<view class="swiper-item" :class="{active:current == 3}" @click="currentDiscount(3)">六折专区</view>
				</swiper-item>
				<swiper-item>
					<view class="swiper-item" :class="{active:current == 4}" @click="currentDiscount(4)">五折专区</view>
				</swiper-item>
				<swiper-item>
					<view class="swiper-item" :class="{active:current == 5}" @click="currentDiscount(5)">四折专区</view>
				</swiper-item>
			</swiper>
		</view>
		
		<view class="goods_list">
			<view class="goods">
				<image class="goods_img" src="../../static/home/foods.png" mode=""></image>
				<view class="goods_name">
					<text class="title">海南妃子笑</text>
				</view>
				<view class="sub_title">
					<text>甜蜜多汁细腻可口</text>
				</view>
				<view class="price_box">
					<view class="price_left">
						<text class="price">￥59</text>
						<text class="unit">/箱子</text>
					</view>
					<image class="cart" src="../../static/cart.png" mode=""></image>
				</view>
			</view>
			<view class="goods">
				<image class="goods_img" src="../../static/home/foods.png" mode=""></image>
				<view class="goods_name">
					<text class="title">海南妃子笑</text>
					
				</view>
				<view class="sub_title">
					<text>甜蜜多汁细腻可口</text>
				</view>
				<view class="price_box">
					<view class="price_left">
						<text class="price">￥59</text>
						<text class="unit">/箱子</text>
					</view>
					<image class="cart" src="../../static/cart.png" mode=""></image>
				</view>
			</view>
			<view class="goods">
				<image class="goods_img" src="../../static/home/foods.png" mode=""></image>
				<view class="goods_name">
					<text class="title">海南妃子笑</text>
					
				</view>
				<view class="sub_title">
					<text>甜蜜多汁细腻可口</text>
				</view>
				<view class="price_box">
					<view class="price_left">
						<text class="price">￥59</text>
						<text class="unit">/箱子</text>
					</view>
					<image class="cart" src="../../static/cart.png" mode=""></image>
				</view>
			</view>
		</view> -->
		
	</view>
</template>

<script>

	export default{
		data(){
			return{
				headerTop: 0,
				headHeight:0,
				current: 0,
				headSwiper:[],//顶部轮播图数组
				headNav:[],//顶部导航
				goods:[],//商品
				recommend:[],//商品推荐
				imgHttp:'', //图片接口前缀
				moreType:0, //更多类型
				searchKey:'',//搜索关键字
				moreType1:'',
				moreType2:'',
				
			}
		},
		
		methods:{
			//跳转到信息
			to_message(){
				uni.navigateTo({
					url:'../my/message_list'
				})
			},
			//搜索跳转
			toSearch(){
				uni.navigateTo({
					url:'../commodity/search?key=' + this.searchKey
				})
			},
			//轮播图跳转
			toSwiper(type,id){
				if(type == 1){
					uni.navigateTo({
						url:"../commodity/goods_details?id=" + id
					})
				} else if(type == 2){
					uni.navigateTo({
					    url:"./web_view?id=" + id
					})
				} else if(type == 3){
					uni.navigateTo({
						url:"../find/find_details?id=" + id
					})
				} else if(type == 4){
					uni.navigateTo({
					    url:"./web_view?id=" + id
					})
				}
			},
			//跳转到分类
			toCommmodity(type){
				console.log(type)
				uni.setStorageSync('actNav',type);
				uni.switchTab({
					url:'../commodity/commodity' 
				})
			},
		    //跳转到商品详情
			toDetails:function(id){
				uni.navigateTo({
					url:'../commodity/goods_details?id=' + id
				})
			},
			//切换打折专区
			currentDiscount:function(num){
				this.current = num
			},
			//获取顶部轮播图
			getSwiperTop:function(){
				let self = this;
				this.ask("/app/index/getIndexCarousel","GET",{pid:'index'},function(res){
					self.headSwiper = res.data.data;
					
				})
			},
			//获取头部导航
			getHeadNav:function(){
				let self = this;
				this.ask("/app/index/getIndexClassify","GET",{},function(res){
					self.headNav = res.data.data
					console.log(self.headNav)
				})
			},
			//获取推荐商品
			getRecommend:function(){
				let self = this;
				this.ask("/app/index/getIndexHot","GET",{},function(res){
					console.log(res)
					self.recommend = res.data.data
					// console.log(self.recommend)
				})
			},
			//获取顶部商品列表
			getGoods:function(){
				let self = this;
				this.ask("/app/index/getProductListForIndex","GET",{},function(res){
				   
					for(let i = 0 ; i<res.data.data.length;i++){
						if(res.data.data[i].id == '1'){
							self.moreType1 = res.data.data[i].id;
							self.goods = res.data.data[i].productlist;
							self.moreType = i;
						}
					}
					console.log(res)
				})
			}
			
		},
		onLoad:function(){
			this.getSwiperTop();
			this.getHeadNav();
			this.getGoods();
			this.getRecommend();
			this.imgHttp = this.comHttp;
		},
		created() {
			this.headerTop = this.StatusBar + 'px';
			this.headHeight = this.CustomBar + 'px';
		}
	}
</script>


<style lang="scss">
@import "./home.scss"
</style>
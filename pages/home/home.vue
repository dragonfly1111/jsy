<template>
	<view class="home_box" v-cloak>


		<view class="search" :style="{paddingTop:headerTop}">
			<input type="text" v-model="searchKey" placeholder="搜索商品" @confirm='toSearch()' />
		</view>
		<view class="swiper_head">
			<swiper class="screen-swiper square-dot" :indicator-dots="true" :circular="true" :autoplay="true" interval="5000"
			 duration="500">
				<swiper-item v-for="(item,index) in headSwiper" :key='index'>
					<view class="swiper-item" @click="toSwiper(item.type,item.imgurl)">
						<image :src="imgHttp+item.imgsrc" mode=""></image>
					</view>
				</swiper-item>
			</swiper>
		</view>

		<view class="head_nav">
			<view class="nav" v-for="(item,index) in headNav" v-if="index < 3" :key='index' @click="toCommmodity(item.id)">
				<image :src="imgHttp+item.producttypeimg" mode=""></image>
				<text>{{item.producttypename}}</text>
			</view>
		</view>

		<view class="font-bar">
			<image src="../../static/home/font-bar.png"></image>
		</view>

		<view class="main-contaner">
			<view class="advertising">
				<view class="ad-item left">
					<image src="../../static/home/spring-light.png"></image>
				</view>
				<view class="ad-item right">
					<image src="../../static/home/summer-light.png"></image>
				</view>
				<view class="ad-item left">
					<image src="../../static/home/autumn-light.png"></image>
				</view>
				<view class="ad-item right">
					<image src="../../static/home/wind-light.png"></image>
				</view>
			</view>
			<view class="title_type">
				<text class="title">不时不食</text>
				<view class="title_sub" @click="toCommmodity(moreType1)">
					<image src="../../static/home/arrow.png" mode=""></image>
				</view>
			</view>

			<view class="goods_list">
				<view class="goods" v-if="index <= 6" v-for="(item,index) in goods" :key='index' @click="toDetails(item.id)">
					<image class="goods_img" :src="imgHttp+item.cover" mode=""></image>
					<view class="goods_name">
						<text class="title">{{item.name}}</text>
						<image class="cart" src="../../static/home/cart.png" mode=""></image>
					</view>

					<view class="price_box">
						<view class="price_left">
							<text class="price">￥{{item.sellingprice}}</text>
							<text class="unit">/{{item.unit}}</text>
						</view>
					</view>
				</view>
			</view>
		</view>

		<!-- <floatWindows :showFloat="showFloat"></floatWindows> -->
		<floatWindows :showFloat="true"></floatWindows>



		<!-- 		<view class="title_type">
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
							</view>
							<view class="sub_title">
								<text>{{item.keyword.replace(",",' ')}}</text>
							</view>
							<view class="price_box">
								<view class="price_left">
									<text class="price">￥{{item.sellingprice}}</text>
									<text class="unit">/{{item.unit}}</text>
								</view>
							</view>
						</view>
					</view>
				</swiper-item>
			</swiper>
		</view> -->

		<!-- todo -->

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
	import floatWindows from '../../components/float-windows.vue'
	export default {
		data() {
			return {
				headerTop: 0,
				headHeight: 0,
				current: 0,
				headSwiper: [], //顶部轮播图数组
				headNav: [], //顶部导航
				goods: [], //商品
				recommend: [], //商品推荐
				imgHttp: '', //图片接口前缀
				moreType: 0, //更多类型
				searchKey: '', //搜索关键字
				moreType1: '',
				moreType2: '',
				showFloat: false,

			}
		},
		
		// onPageScroll(e) {
		// 	console.log(e)
		// 	if(e.scrollTop > 20){
		// 		this.showFloat = true
		// 	} else{
		// 		this.showFloat = false
		// 	}
		// },
		
		components:{
			floatWindows
		},
		methods: {
			//搜索跳转
			toSearch() {
				uni.navigateTo({
					url: '../commodity/search?key=' + this.searchKey
				})
			},
			//轮播图跳转
			toSwiper(type, id) {
				if (type == 1) {
					uni.navigateTo({
						url: "../commodity/goods_details?id=" + id
					})
				} else if (type == 2) {
					uni.navigateTo({
						url: "./web_view?id=" + id
					})
				} else if (type == 3) {
					uni.navigateTo({
						url: "../find/find_details?id=" + id
					})
				} else if (type == 4) {
					uni.navigateTo({
						url: "./web_view?id=" + id
					})
				}
			},
			//跳转到分类
			toCommmodity(type) {
				console.log(type)
				uni.setStorageSync('actNav', type);
				uni.navigateTo({
					url: '../commodity/commodity'
				})
			},
			//跳转到商品详情
			toDetails: function(id) {
				uni.navigateTo({
					url: '../commodity/goods_details?id=' + id
				})
			},
			//切换打折专区
			currentDiscount: function(num) {
				this.current = num
			},
			//获取顶部轮播图
			getSwiperTop: function() {
				let self = this;
				this.ask("/app/index/getIndexCarousel", "GET", {
					pid: 'index'
				}, function(res) {
					self.headSwiper = res.data.data;

				})
			},
			//获取头部导航
			getHeadNav: function() {
				let self = this;
				this.ask("/app/index/getIndexClassify", "GET", {}, function(res) {
					self.headNav = res.data.data
					console.log(self.headNav)
				})
			},
			//获取推荐商品
			getRecommend: function() {
				let self = this;
				this.ask("/app/index/getIndexHot", "GET", {}, function(res) {
					console.log(res)
					self.recommend = res.data.data
					// console.log(self.recommend)
				})
			},
			//获取顶部商品列表
			getGoods: function() {
				let self = this;
				this.ask("/app/index/getProductListForIndex", "GET", {}, function(res) {

					for (let i = 0; i < res.data.data.length; i++) {
						if (res.data.data[i].id == '1') {
							self.moreType1 = res.data.data[i].id;
							self.goods = res.data.data[i].productlist;
							self.moreType = i;
						}
					}
					console.log(res)
				})
			}

		},
		onLoad: function() {
			this.getSwiperTop();
			this.getHeadNav();
			this.getGoods();
			this.getRecommend();
			this.imgHttp = this.comHttp;
		},
		created() {
			this.headerTop = this.StatusBar + 45 + 'px';
			this.headHeight = this.CustomBar + 'px';
		}
	}
</script>


<style lang="scss">
	@import "./home.scss"
</style>

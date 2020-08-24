<template>
	<view>
		<cu-custom bgColor="none-bg" :isBack="true">
			<block slot="content">{{title}}</block>
		</cu-custom>
		<view class="search">
			<image src="../../static/icon/search.png"></image>
			<input type="text" v-model="searchKey" placeholder="搜索商品" @confirm='toSearch()'/>
		</view>
		<view class="find_head">
			<text v-for="(item,index) in curSeasonList" :class="{act_nav: currentNav  == index}" @click="chooseNav(index)">{{item}}</text>
		</view>
		<image class="banner" :src="imgHttp + seasonObj.terms_img"></image>
		<view class="food_ad">
			<image src="../../static/food_ad.png"  mode="aspectFit"></image>
		</view>
		<view class="iframe-view">
			<rich-text v-html="seasonObj.desc"></rich-text>
			
		</view>

		
		<goodsRecommend :terms="curSeasonList[currentNav]"></goodsRecommend>
		<view style="height: 100rpx;width: 100%;">
		</view>
		<floatWindows :showFloat="true"></floatWindows>
		
	</view>
</template>

<script>
	import goodsRecommend from '../../components/goods-recommend.vue'
	
	// import navigationCustom from "../../components/struggler-navigationCustom/navigation-custom.vue"
	export default{
		components:{
			// navigationCustom
			goodsRecommend
		},
		data(){
			return{
				searchKey: '',
				currentNav: 0,
				type: 1,
				title: 1,
				seasonObj: '', // 文章详情
				scrollTop:0 ,// 当linear为true的时候需要通过onpagescroll传递参数
				scrollMaxHeight:200, //滑动的高度限制，超过这个高度即背景全部显示
				seasonList:[
					["立春","雨水","惊蛰","春分","清明","谷雨"],
					["立夏","小满","芒种","夏至","小暑","大暑"],
					["立秋","处暑","白露","秋分","寒露","霜降"],
					["立冬","小雪","大雪","冬至","小寒","大寒"]
				],
				curSeasonList:[],
				imgHttp: '', //图片接口前缀
				
			}
		},
		methods:{
			//搜索跳转
			toSearch() {
				uni.navigateTo({
					url: '../commodity/search?key=' + this.searchKey
				})
			},
			back() {
				uni.navigateBack({
					delta:1
				})
			},
			chooseNav(index){
				this.currentNav = index
				this.getSeasonArt(this.curSeasonList[this.currentNav])
			},
			getSeasonArt(terms){
				let params = {
					terms: terms
				}
				let self = this
				this.ask("/app/index/getTermsContent", "GET", params, function(res) {
					self.seasonObj = res.data.data
				})
			}
		},
		onLoad(option) {
			this.type = option.type
			this.imgHttp = this.comHttp;
			
			switch (this.type) {
				case '0':
				this.title = '春生'
				this.curSeasonList = this.seasonList[0]
				break
				case '1':
				this.title = '夏物'
				this.curSeasonList = this.seasonList[1]
				
				break
				case '2':
				this.title = '秋收'
				this.curSeasonList = this.seasonList[2]
				
				break
				case '3':
				this.title = '冬藏'
				this.curSeasonList = this.seasonList[3]
				
				break
			}
			this.getSeasonArt(this.curSeasonList[this.currentNav])
		},
		onShow() {
			
		},
		created() {
			
		}
	}
</script>

<style lang="scss">
	page{
		// background-color: #fafaf9;
	}
	.search {
		width: 100%;
		left: 0;
		z-index: 9999;
		display: flex;
		// justify-content: center;
		align-items: center;
		background-color: #F1F1F1;
		width: 640rpx;
		border-radius: 40rpx;
		margin: 0 auto 20rpx auto;
		// padding-left: 30rpx;
		// height: 40rpx;
		line-height: 40rpx;
		font-size: 22rpx;
		height: 40rpx;
		
		input{
			width: 500rpx;
			height: 100%;
		}
		image{
			width: 30rpx;
			height: 30rpx;
			margin: 0 20rpx;
		}
	}
	
	.iframe-view{
		width: calc(100% - 60rpx);
		margin: 0 auto;
		margin-bottom: 40rpx;
	}
	
	
		
	.find_head{
		width: 100%;
		height: 80rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #B0A776;
		text{
			flex: 1;
			display: flex;
			height: 100%;
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 32rpx;
			position: relative;
		}
		
		
		.act_nav{
			color: #7B7633;
			position: relative;
		}
		
		.act_nav::after{
			content: "";
			width: 50%;
			height: 5rpx;
			background-color: #7B7633;
			position: absolute;
			left: 25%;
			border-radius: 10rpx;
			bottom: 0rpx;
		}
	}
	.banner {
		width: 100vw;
		height: 100vw;
		background: #eee;
		margin-top: 20rpx;
	}
	.info {
		text-align: center;
		color: #7d7834;
		font-size: 32rpx;
		margin-top: 20rpx;
		.time {
			font-size: 26rpx;
			color: #9c9c9c;
			margin-top: 10rpx;
		}
	}
	.food_ad {
		width: calc(100% - 60rpx);
		margin: 0 auto;
		padding-bottom: 40rpx;
		image {
			width: 100%;
			height: 230rpx;
		}
	}
	.recommend_wrapper {
		background-color: #fafaf9;
		padding: 40rpx 70rpx;
		.name {
			text-align: center;
			font-size: 38rpx;
			color: #7d7834;
		}
		image {
			width: 100%;
			height: 380rpx;
			background: #eee;
			margin-top: 40rpx;
		}
	}
</style>

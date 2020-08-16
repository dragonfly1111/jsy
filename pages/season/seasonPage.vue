<template>
	<view>
		<navigation-custom
			v-if="config.title"
			:config="config" 
			:scrollTop="scrollTop" 
			:scrollMaxHeight="scrollMaxHeight"
			@customConduct="back()"
		/>
		<view class="search">
			<input type="text" placeholder="搜索商品" />
		</view>
		<view class="find_head">
			<text :class="{act_nav: currentNav  == 0}" @click="chooseNav(0)">立春</text>
			<text :class="{act_nav: currentNav  == 1}" @click="chooseNav(1)">雨水</text>
			<text :class="{act_nav: currentNav  == 2}" @click="chooseNav(2)">惊蛰</text>
			<text :class="{act_nav: currentNav  == 3}" @click="chooseNav(3)">清明</text>
			<text :class="{act_nav: currentNav  == 4}" @click="chooseNav(4)">春分</text>
		</view>
		<view class="banner"></view>
		<view class="info">
			<view class="text">每日食材 &nbsp;&nbsp;&nbsp;&nbsp;正当时令</view>
			<view class="time">2月3日-5日交节</view>
		</view>
		<view class="food_ad">
			<image src="../../static/food_ad.png"  mode="aspectFit"></image>
		</view>
		<view class="recommend_wrapper">
			<view class="name">浙江春笋</view>
			<image></image>
		</view>
	</view>
</template>

<script>
	import navigationCustom from "../../components/struggler-navigationCustom/navigation-custom.vue"
	export default{
		components:{
			navigationCustom
		},
		data(){
			return{
				currentNav: 0,
				type: 1,
				config:{
				    title: "", //title
				    bgcolor:"#fff", //背景颜色
				    fontcolor:"#000", //文字颜色，默认白色
				    type: 4, //type 1，3胶囊 2，4无胶囊模式
				    transparent: false, //是否背景透明 默认白色
				    // linear:true, //是为开启下滑渐变
				    // share:true, //是否将主页按钮显示为分享按钮
				    menuIcon:"../../static/icon/back_.png", // 当type为3或者4的时候左边的icon文件位置，注意位置与当前页面不一样
				    // menuText:"返回", 当type为3或4的时候icon右边的文字
				},
				scrollTop:0 ,// 当linear为true的时候需要通过onpagescroll传递参数
				scrollMaxHeight:200, //滑动的高度限制，超过这个高度即背景全部显示
			}
		},
		methods:{
			back() {
				uni.navigateBack({
					delta:1
				})
			},
			chooseNav(index){
				this.currentNav = index
			},
		},
		onLoad(option) {
			this.type = option.type
			switch (this.type) {
				case '1':
				this.config.title = '春生'
				break
				case '2':
				this.config.title = '夏物'
				break
				case '3':
				this.config.title = '秋收'
				break
				case '4':
				this.config.title = '冬藏'
				break
			}
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
		justify-content: center;
		align-items: center;
		margin-top: 10rpx;
		margin-bottom: 36rpx;
		input{
			background-color: #F1F1F1;
			width: calc(100% - 60rpx);
			border-radius: 40rpx;
			margin: 0 20rpx;
			padding-left: 30rpx;
			// height: 40rpx;
			line-height: 40rpx;
		}
		image{
			width: 50rpx;
			height: 50rpx;
		}
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
		width: 100%;
		height: 380rpx;
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

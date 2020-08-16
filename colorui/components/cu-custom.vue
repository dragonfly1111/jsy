<template>
	<view>
		<view class="cu-custom" :style="[{height:CustomBar + 'px'}]">
			<view class="cu-bar fixed" :style="style" :class="[bgImage!=''?'none-bg text-white bg-img':'',bgColor]">
				<view class="action" v-if="isBack">
					<text class="cuIcon-back" @tap="BackPage" ></text>
					<text class="cuIcon-home" @tap="toHome" ></text>
					<slot name="backText"></slot>
				</view>
				<view class="content" :style="[{top:StatusBar + 'px'}]">
					<slot name="content"></slot>
				</view>
				<slot name="right"></slot>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				StatusBar: this.StatusBar,
				CustomBar: this.CustomBar,
				isshare:''
			};
		},
		onLoad(option) {
			this.isshare=option.share
		},
		name: 'cu-custom',
		computed: {
			style() {
				var StatusBar= this.StatusBar;
				var CustomBar= this.CustomBar;
				var bgImage = this.bgImage;
				var style = `height:${CustomBar}px;padding-top:${StatusBar}px;`;
				if (this.bgImage) {
					style = `${style}background-image:url(${bgImage});`;
				}
				return style
			}
		},
		props: {
			bgColor: {
				type: String,
				default: ''
			},
			isBack: {
				type: [Boolean, String],
				default: false
			},
			isRedirect: {
				type: [Boolean, String],
				default: false
			},
			bgImage: {
				type: String,
				default: ''
			},
		},
		methods: {
			toHome() {
				uni.switchTab({
					url:"../../pages/home/home"
				})
			},
			
			BackPage() {
				let routes = getCurrentPages(); // 获取当前打开过的页面路由数组
				let curRoute = routes[routes.length - 1].route // 获取当前页面路由，也就是最后一个打开的页面路由
				
				if(this.isRedirect == true){
					uni.switchTab({
						url:'../../pages/home/home'
					})
					return
				}
				
				if(curRoute.indexOf('shareproduct')>-1)
				{
					// uni.redirectTo({
					// 	url:'../index/index'
					// })
					uni.navigateBack({
						delta: 1
					})
				}
				else 
				{
					let routes = getCurrentPages(); // 获取当前打开过的页面路由数组
					console.log('获取路由地址！！！！',routes)
					if(routes.length<2)
					{
						// uni.redirectTo({
						// 	url:'../index/index'
						// })
						uni.navigateBack({
							delta: 1
						})
					}
					else{
						let curRoute = routes[routes.length - 2].route // 获取当前页面路由，也就是最后一个打开的页面路由
						if(curRoute.indexOf('/index/index')>-1)
						{
							// uni.redirectTo({
							// 	url:'../index/index'
							// })
							uni.navigateBack({
								delta: 1
							})
						}
						else 
						{
							// uni.navigateBack({
							// 	delta: 1
							// });
							uni.navigateBack({
								delta: 1
							})
						}
						
					}
					
					
				}
				
			}
		}
	}
</script>

<style>

</style>

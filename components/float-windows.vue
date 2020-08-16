<template>
	<view>
		<view v-if="showFloat && showIcon" class="mask" @click="showList"></view>
		
		<view class="add-icon" :class="!showFloat ? 'hide-add' : 'show-add'" :style="showIcon1 ? 'background-color: #2c2c2c' : ''" @click="showList()">
			<view :class="showIcon1 ? 'close_image' : 'add_image'"></view>
			<!-- <image src="../static/floaWindow/add.png"></image> -->
		</view>

		<view class="icon_list" :class="closing ? 'close_list' : ''" v-if="showFloat && showIcon">
			<view class="icon_row">
				<image @click="toCart()" src="../static/floaWindow/cart.png"></image>
				<button open-type='contact'><image src="../static/floaWindow/service.png"></image></button>
				<button open-type='share'><image src="../static/floaWindow/share.png"></image></button>
			</view>

			<view class="icon_row">
				<image @click="toMember()" src="../static/floaWindow/member.png"></image>
				<image src="../static/floaWindow/goods.png"></image>
				<image @click="toTop()" src="../static/floaWindow/top.png"></image>
			</view>


		</view>
	</view>
</template>

<script>
	export default {
		props:['showFloat'],
		data() {
			return {
				showIcon: false,
				showIcon1: false,
				closing: false
			}
		},
		methods: {
			showList() {
				if(!this.showIcon){
				this.showIcon = true
				this.showIcon1 = true
				} else {
					this.closing = true
					this.showIcon1 = false
					setTimeout(()=>{
						this.closing = false
						this.showIcon = false				
					},200)
				}
			},
		
			toCart(){
				this.showList()
				
				uni.navigateTo({
					url:'../cart/cart'
				})
			},
			
			//跳转到会员
			toMember(){
				this.showList()
				
				uni.navigateTo({
					url:"../my/member"
				})
			},
			
			toTop(){
				this.showList()
				
				uni.pageScrollTo({
					scrollTop: 0,
					duration: 300
				});
			}
		}
	}
</script>

<style scoped lang="scss">
	.mask{
		height: 100vh;
		width: 100vw;
		top: 0;
		left: 0;
		position: fixed;
		z-index: 10000;
	}
	
	.add-icon {
		position: fixed;
		bottom: 100rpx;
		right: 50rpx;
		width: 80rpx;
		height: 80rpx;
		border-radius: 50%;
		box-shadow: 0 0 10rpx 1rpx #cfcece;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: #FFFFFF;
		z-index: 10001;

	}

	.add_image{
		width: 80%;
		height: 80%;
		background: url(../static/floaWindow/add.png) 50% 50% no-repeat;
		background-size: 100%;
		animation: changeIcon1 0.2s forwards;
	}
	
	.close_image{
		width: 80%;
		height: 80%;
		animation: changeIcon 0.2s forwards;
	}

	.icon_list {
		background-color: rgba($color: #000000, $alpha: 0.8);
		padding: 20rpx;
		position: fixed;
		bottom: 100rpx;
		right: 0rpx;
		z-index: 10000;
		
		// bottom: 150rpx;
		// right: 180rpx;
		border-radius: 50rpx;
		animation: showList 0.2s forwards;

		image {
			margin: 20rpx;
			width: 80rpx;
			height: 80rpx;
		}

		.icon_row {
			width: 100%;
			button{
				padding: 0;
				margin: 0;
				line-height: unset;
				border: none;
				background: unset;
				// width: 100rpx;
				// height: 100rpx;
				display: inline;
				image{
					// margin: 0;
				}
			}
			button::after{
				height: 0;
				width: 0;
			}
		}
	}
	
	.close_list{
		animation: hideList 0.2s forwards;
	}

	.hide-add{
		animation: hideAdd 0.2s forwards;
	}
	
	.show-add{
		animation: showAdd 0.2s forwards;
		
	}
	
	@keyframes hideAdd{
		0% {
			transform: translateX(0rpx);
		}
		
		100% {
			transform: translateX(100rpx);
			
		}
	}

	@keyframes showAdd{
		0% {
			transform: translateX(100rpx);
		}
		
		100% {
			transform: translateX(0rpx);
		}
	}

	@keyframes changeIcon{
		0% {
			transform: rotate(0);
		}
		
		100% {
			transform: rotate(90deg);
			background: url(../static/floaWindow/add_white.png) 50% 50% no-repeat;
			background-size: 100%;
		}
	}
	
	@keyframes changeIcon1{
		0% {
			transform: rotate(90deg);
			background: url(../static/floaWindow/add.png) 50% 50% no-repeat;
			background-size: 100%;
		}
		
		100% {
			transform: rotate(0);
		}
	}
	

	@keyframes showList {
		0% {
			transform: scale(0) translateX(0) translateY(0);
		}

		100% {
			transform: scale(1) translateX(-180rpx) translateY(-50rpx);
		}
	}
	
	@keyframes hideList {
		0% {
			transform: scale(1) translateX(-180rpx) translateY(-50rpx);
		}
	
		100% {
			transform: scale(0) translateX(0) translateY(0);
		}
	}
</style>

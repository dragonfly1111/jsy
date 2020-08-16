<template>
	<view class="about_box" v-cloak>
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<block slot="content">关于我们</block>
		</cu-custom>
		<view class="about_head">
			<image :src="imgHttp + '/marketResources/img/aboutUs.png'" mode="widthFix" style="width: 100%;"></image>
		</view>
		
		<floatWindows :showFloat="true"></floatWindows>

	</view>
</template>

<script>
	import floatWindows from '../../components/float-windows.vue'
	
	export default{
		components:{
			floatWindows
		},
		data(){
			return{
				imgHttp:'',
			}
		},
		onLoad() {
			this.imgHttp = this.comHttp;
		}
		
	}
</script>

<style lang="scss">
	.about_head{
		width: 100%;
		
	}
	.about_list{
		width: 100%;
		padding: 0 30rpx;
		margin-top: 10rpx;
	}
</style>

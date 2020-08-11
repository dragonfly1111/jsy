<template>
	<view class="">
		<web-view :src="webSrc"></web-view>
	</view>
	
</template>

<script>
	export default{
		data(){
			return{
				webSrc:''
			}
		},
		onLoad(option) {
			this.webSrc = option.id
		}
	}
</script>

<style>
</style>

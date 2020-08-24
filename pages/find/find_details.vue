<template>
	<view class="details_box">
		<cu-custom bgColor="none-bg" :isBack="true">
			<block slot="content">{{detailsTitle}}</block>
		</cu-custom>
		
		<view class="head_img">
			<image :src="imgHttp + detailsObj.pic1"></image>
			<view class="head_title">
				{{detailsObj.title}}
			</view>
		</view>
		<view class="top_title" v-if="detailsObj != '' ">
		</view>
		<view class="details_text">
		   <rich-text v-html="detailsObj.content"></rich-text>
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
				detailsId:'',
				detailsTitle:'',
				detailsObj:'',
				imgHttp:''
			}
		},
		methods:{
			getNewsDetails(){
				let self = this;
				let data = {
					id:this.detailsId
				}
				console.log(data)
				this.ask('/app/content/getContent','POST',data,function(res){
					self.detailsObj = res.data.data;
					console.log(res)
				})
			}
		},
		onLoad(option) {
			console.log(option)
			this.imgHttp = this.comHttp;
			this.detailsId = option.id;
			if(option.title == '会员推荐'){
				this.detailsTitle = option.title;
			}
			this.getNewsDetails()
			
		}
	}
</script>

<style lang="scss">
	.head_img{
		width: 100%;
		height: 500rpx;
		position: relative;
		image{
			width: 100%;
			height: 100%;
		}
		.head_title{
			position: absolute;
			bottom: 0;
			width: 100%;
			background-color: #988F52;
			font-size: 32rpx;
			text-align: center;
			height: 100rpx;
			line-height: 100rpx;
			color: #FFFFFF;
			border-top-left-radius: 30rpx;
			border-top-right-radius: 30rpx;
		}
	}
	
	.top_title{
		width: 100%;
		padding: 30rpx;
		font-size: 34rpx;
		font-weight: bold;
		color: #857825;
		padding-bottom: 0;
	}
	.details_head{
		width: 100%;
		padding: 30rpx 50rpx;
		display: flex;
		align-items: center;
		image{
			width: 100rpx;
			height: 100rpx;
			border-radius: 50%;
		}
		.source{
			display: flex;
			flex-direction: column;
			height: 110rpx;
			justify-content: space-between;
			margin-left: 30rpx;
			.title{
				color: #857825;
				font-size: 28rpx;
				font-weight: bold;
			}
			.sub_title{
				color: #666;
				font-size: 28rpx;
			}
			
		}
		.browse{
			display: flex;
			flex: 1;
			height: 110rpx;
			justify-content: flex-end;
			align-items: flex-end;
			color: #666;
			font-size: 28rpx;
		}
	}
	.details_text{
		width: 100%;
		padding: 30rpx 50rpx;
	}
</style>

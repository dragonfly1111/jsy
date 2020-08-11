<template>
	<view class="details_box">
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<block slot="content">金三源</block>
		</cu-custom>
		<view class="top_title" v-if="detailsObj != '' ">
			{{detailsObj.title}}
		</view>
		<view class="details_head" v-if="detailsObj != '' ">
			<image src="../../static/details/source.png"></image>
			<view class="source">
				<text class="title">{{detailsObj.audit_user}}</text>
				<text class="sub_title">{{detailsObj.audit_time}}</text>
			</view>
			<view class="browse">
				<text>阅读：{{detailsObj.hits}}</text>
			</view>
		</view>
		<view class="details_text">
		   <rich-text v-html="detailsObj.content"></rich-text>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				detailsId:'',
				detailsTitle:'',
				detailsObj:''
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
			this.detailsId = option.id;
			this.detailsTitle = option.title;
			this.getNewsDetails()
			
		}
	}
</script>

<style lang="scss">
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

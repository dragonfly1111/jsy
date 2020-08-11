<template>
	<view class="message_box">
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<block slot="content">消息</block>
		</cu-custom>
		<view class="message_list">
			<view class="row">
				<text class="message_time">2020年06月30日</text>
				<view class="message_content">
					<text class="message_title">浓情端午，情有独钟</text>
					<view class="message_text">
						<image src="../../static/user-bg.jpg" mode=""></image>
						<text>端午节，又称端阳节、龙舟节、重午节、龙节、正阳节、天中节等，源自天象崇拜，由上古时代祭龙演变而来。仲夏端午，苍龙七宿飞升至正南中天，是龙飞天的吉日，即如《易经·乾卦》第五爻的爻辞曰：“飞龙在天”。端午日龙星既“得中”又“得正”，乃大吉大利之象。其起源涵盖了古老星象文化、人文哲学等方面内容，蕴含着深邃丰厚的文化内涵；在传承发展中杂揉了多种民俗为一体，节俗内容丰富。扒龙舟与食粽是端午节的两大礼俗，这两大礼俗在中国自古传承，至今不辍</text>
					</view>
				</view>
			</view>
			<view class="row">
				<text class="message_time">2020年06月30日</text>
				<view class="message_content">
					<text class="message_title">浓情端午，情有独钟</text>
					<view class="message_text">
						<image src="../../static/user-bg.jpg" mode=""></image>
						<text>端午节，又称端阳节、龙舟节、重午节、龙节、正阳节、天中节等，源自天象崇拜，由上古时代祭龙演变而来。仲夏端午，苍龙七宿飞升至正南中天，是龙飞天的吉日，即如《易经·乾卦》第五爻的爻辞曰：“飞龙在天”。端午日龙星既“得中”又“得正”，乃大吉大利之象。其起源涵盖了古老星象文化、人文哲学等方面内容，蕴含着深邃丰厚的文化内涵；在传承发展中杂揉了多种民俗为一体，节俗内容丰富。扒龙舟与食粽是端午节的两大礼俗，这两大礼俗在中国自古传承，至今不辍</text>
					</view>
				</view>
				
				<view class="message_content">
					<text class="message_title">浓情端午，情有独钟</text>
					<view class="message_text">
						<image src="../../static/user-bg.jpg" mode=""></image>
						<text>端午节，又称端阳节、龙舟节、重午节、龙节、正阳节、天中节等，源自天象崇拜，由上古时代祭龙演变而来。仲夏端午，苍龙七宿飞升至正南中天，是龙飞天的吉日，即如《易经·乾卦》第五爻的爻辞曰：“飞龙在天”。端午日龙星既“得中”又“得正”，乃大吉大利之象。其起源涵盖了古老星象文化、人文哲学等方面内容，蕴含着深邃丰厚的文化内涵；在传承发展中杂揉了多种民俗为一体，节俗内容丰富。扒龙舟与食粽是端午节的两大礼俗，这两大礼俗在中国自古传承，至今不辍</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				
			}
		}
	}
</script>

<style lang="scss">
	page{
		background-color: #F0F0F0;
	}
	.message_box{
		width: 100%;
	}
	.message_list{
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: 100%;
		padding: 30rpx;
		.row{
			width: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
			flex-direction: column;
			margin-bottom: 30rpx;
			.message_time{
				width: 250rpx;
				height: 50rpx;
				font-size: 26rpx;
				border-radius: 50rpx;
				background-color: rgba(000,000,000,0.2);
				display: flex;
				justify-content: center;
				align-items: center;
				color: #fff;
				
			}
			.message_content{
				width: 100%;
				padding: 30rpx;
				background-color: #fff;
				margin-top: 30rpx;
				border-radius: 15rpx;
				box-shadow: 0 2rpx 2rpx 2rpx #f9f9f9;
				.message_title{
					font-size: 32rpx;
					font-weight: bold;
					color: #857825;
				}
				.message_text{
					display: flex;
					justify-content: space-between;
					align-items: flex-start;
					padding-top: 20rpx ;
					image{
						width: 170rpx;
						height: 170rpx;
						min-width: 170rpx;
						border-radius: 12rpx;
					}
					text{
						margin-left: 20rpx;
						color: #999;
						font-size: 26rpx;
						text-indent: 52rpx;
						line-height: 34rpx;
						display: -webkit-box;
						-webkit-box-orient: vertical;
						-webkit-line-clamp: 5;
						overflow: hidden;
					}
				}
			}
			
		}
		
	}
</style>

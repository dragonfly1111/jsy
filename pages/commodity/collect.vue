<template>
	<view class="collect_box">
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<block slot="content">收藏</block>
		</cu-custom>
		<view class="order_list" v-if="collectObj.length != 0">
			<view class="row" v-for="(item,index) in collectObj" :key='index'>
				<view class="row_main">
					<view class="left">
						<image :src="imgHttp + item.cover" mode="" @click="to_details(item.id)"></image>
					</view>

					<view class="center">
						<text class="title">{{item.name}}</text>
						<text class="sub_title">{{item.keyword.replace(",",' ')}}</text>
						<view class="num">
							<text class="price_unit">￥</text>
							<text class="price">{{item.sellingprice}}</text>
							<text class="unit">/{{item.unit}}</text>
						</view>
					</view>
					<view class="right">
						<image src="../../static/com/clear.png" mode="" @click="removeCollect(item.id)"></image>
					</view>
				</view>

			</view>
			
		</view>
		<view class="no_more" v-if="collectObj.length == count">
			没有更多了
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				index: 1,
				count: 0,
				collectObj: [],
				imgHttp: '',
			}
		},
		methods: {
			//跳转到商品详情
			to_details(id) {
				uni.navigateTo({
					url: './goods_details?id=' + id
				})
			},
			//移除收藏
			removeCollect(id) {
				let self = this;
				let data = {
					"token": uni.getStorageSync('token'),
					"itemid": id,
					"userid": uni.getStorageSync('customer').userid,
					"iscollect": true
				}
				console.log(data)
				self.ask("/app/index/addCollect", "POST", data, function(res) {
					console.log(res)
					self.hint('移除成功')
					self.getCollectList(1)


				})



			},
			getCollectList(index) {
				let self = this;
				let data = {
					"page": index,
					"classify": '',
					"token": uni.getStorageSync('token'),
					"userid": uni.getStorageSync('customer').userid
				}
				console.log(data)
				this.ask("/app/index/getCollectList", 'POST', data, function(res) {
					self.count = res.data.count;
					self.collectObj = [];
					for(let i = 0 ; i < res.data.data.length; i++){
						self.collectObj.push(res.data.data[i])
					}
				
					console.log(self.collectObj)
				})
			}
		},

		onLoad() {
			this.imgHttp = this.comHttp;
			this.getCollectList(1)
		},
		onReachBottom() {
			if (this.collectObj.length == this.count) return
			this.indexe++
			this.getCollectList(this.index);
		}


	}
</script>

<style lang="scss">
	@import "../my/order.scss";
	@import "./collect.scss"
</style>

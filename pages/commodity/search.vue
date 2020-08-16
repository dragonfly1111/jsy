<template>
	<view class="search_box">
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<block slot="content">搜索</block>
		</cu-custom>
		<view class="goodsList" >
			<view class="row" v-for="(item,index) in searchList" :key='index' @click="toDetails(item.id)">
				<view class="left">
					<image :src="imgHttp + item.cover" mode=""></image>
				</view>
				<view class="center">
					<view class="good">
						<text class="title">{{item.name}}</text>
						<text class="sub_title">{{item.keyword.replace(",",' ')}}</text>
					</view>
					<view class="price_box">
						<view class="price">￥{{item.sellingprice}}<text class="unit">/{{item.unit}}</text> </view>
						<view class="num">销量:{{item.salesvolume}}</view>
					</view>
					
				</view>

			</view>
			<view class="foot_line" v-if="searchList.length == 0 || searchList.length == count">
				没有更多了
			</view>
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
				count:0,
				imgHttp:'',
				searchList:[],
				index: 1,
				searchKey:'',//搜索关键字
			}
		},
		methods:{
			//跳转到商品详情
			toDetails:function(id){
				uni.navigateTo({
					url: "./goods_details?id=" + id
				})
			},
			getGoodsList(index){
				let self = this;
				let data = {
					"page": index,
					"searchvalue": this.searchKey
				};
				console.log(data);
				this.ask('/app/index/getSearchList','POST',data,function(res){
					self.count = res.data.count;
					for(let i = 0 ; i < res.data.data.length ; i++){
					   	self.searchList.push(res.data.data[i])
					}
					console.log(res)
				})
			}
		},
		onLoad(option) {
			console.log(option)
			this.imgHttp = this.comHttp;
			this.searchKey = option.key;
			this.getGoodsList(1)
		},
		onReachBottom() {
			if(this.searchList.length == this.count) return
			this.index++
			this.getGoodsList(this.index)
		}
	}
</script>

<style lang="scss">
	@import "./search.scss"
</style>

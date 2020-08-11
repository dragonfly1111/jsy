<template>
	<view class="find_box">
		<cu-custom bgColor="bg-gradual-blue" :isBack="false">
			<block slot="content">食亦有道</block>
		</cu-custom>
		<view class="find_list" v-for="(item,index) in newsObj" :key='index'>
			<view class="img_box">
				<image :src="imgHttp + item.pic1" mode=""></image>
			</view>
			<text class="title">{{item.title}}</text>
			<view class="sub_title" v-html="item.explain" ></view>
		    <view class="details" @click="toDetails(item.id,item.title)">
		    	<text>详情进入 > </text>
				
		    </view>
		</view>
		<view class="no_more" v-if="newsObj.length == count">
			没有更多了
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				imgHttp:'',
				newsObj:[],
				count:0,
				index:1,
				
			}
		},
		methods:{
			//跳转到详情
			toDetails(id,title){
				uni.navigateTo({
					url:"./find_details?id=" + id + '&&title=' + title
				})
			},
			getNewsList(index){
				let self = this;
				let data = {
					page: index, 
					pagesize: 10
				};
				self.ask('/app/content/getContentList','POST',data,function(res){
					console.log(res)
					self.count = res.data.count;
					for(let i = 0 ; i < res.data.data.length ; i++){
						self.newsObj.push(res.data.data[i])
						console.log(self.newsObj)
					}
				
				})
			}
		},
		onLoad() {
			this.imgHttp = this.comHttp;
			this.getNewsList(1)
		},
		onReachBottom() {
			if(this.newsObj.length == this.count) return
			this.index++
			this.getNewsList(this.index)
		}
		
	}
</script>

<style>
@import url("./find.scss");
</style>

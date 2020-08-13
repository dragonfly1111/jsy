<template>
	<view class="find_box">
		<cu-custom bgColor="bg-gradual-blue" :isBack="false">
			<block slot="content">食宜有道</block>
		</cu-custom>
		
		<view class="find_head">
			<text :class="{act_nav: currentNav  == 0}" @click="chooseNav(0)">食物美学</text>
			<text :class="{act_nav: currentNav  == 1}" @click="chooseNav(1)">生活常识</text>
			<text :class="{act_nav: currentNav  == 2}" @click="chooseNav(2)">空间沙龙</text>
		</view>
		
		<!-- 食物美学 -->
		<view v-if="currentNav == 0">
			<view class="find_list" v-for="(item,index) in newsObj" :key='index'  @click="toDetails(item.id,item.title)">
				<view class="img_box">
					<image :src="imgHttp + item.pic1" mode=""></image>
				</view>
				<view class="find_head_line">
					<text class="title">{{item.title}}</text>
					<text class="time">{{item.audit_time | timeFilter}}</text>
				</view>
				<view class="sub_title" v-html="item.explain"></view>
			</view>
		</view>
		
		<!-- 生活常识 -->
		<view v-if="currentNav == 1">生活常识</view>
		
		<!-- 空间沙龙 -->
		<view v-if="currentNav == 2">空间沙龙</view>
		

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
				currentNav: 0,
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
			},
			
			chooseNav(index){
				this.currentNav = index
			},
		},
		filters:{
			timeFilter(time){
				
				return time.substr(0,11).replace('-','/').replace('-','/')
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

<style scoped lang="scss">
	@import "./find.scss"
</style>

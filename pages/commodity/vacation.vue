<template>
	<view class="find_box">
		<cu-custom bgColor="none-bg" :isBack="true">
			<block slot="content">康养度假</block>
		</cu-custom>
		<view class="find_list" v-for="(item,index) in newsObj" :key='index'  @click="toDetails(item.id,item.title)">
			<view class="img_box">
				<image :src="imgHttp + item.pic1" mode=""></image>
			</view>
			<view class="find_head_line">
				<text class="title">{{item.title}}</text>
			</view>
			<view class="find_sub_line">
				<view class="sub_title" v-html="item.explain"></view>
				<text class="time">{{item.audit_time | timeFilter}}</text>
			</view>
			
		</view>
		<view class="no_more" v-if="newsObj.length == count">
			没有更多了
		</view>

		<floatWindows :showFloat="showFloat"></floatWindows>
	</view>
</template>

<script>

	export default{
		components:{
		},
		data(){
			return{
				imgHttp:'',
				newsObj:[],
				count:0,
				showFloat: true,
			}
		},
		methods:{
			//跳转到详情
			toDetails(id,title){
				uni.navigateTo({
					url:"../find/find_details?id=" + id + '&&title=' + title
				})
			},
			getNewsList(index){
				let self = this;
				
				// let self = this;
				
				// self.ask('/app/content/getContentList','POST',data,function(res){
				// 	self.toArcDetails(res.data.data[0].id)
				// })
				
				let data = {
					page: 1, 
					pagesize: 10,
					type: 'syzp'
				};
				self.ask('/app/content/getContentList','POST',data,function(res){
					console.log(res)
					self.count = res.data.count;
				
					if(self.index != 1){
						for(let i = 0 ; i < res.data.data.length ; i++){
							self.newsObj.push(res.data.data[i])
						}
					} else{
						self.newsObj = res.data.data
					}
				})
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
			this.index++
			this.getNewsList(this.index)
		}
		
	}
</script>

<style scoped lang="scss">
	@import "./vacation.scss"
</style>

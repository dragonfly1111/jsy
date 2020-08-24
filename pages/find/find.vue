<template>
	<view class="find_box">
		<cu-custom bgColor="none-bg" :isBack="false">
			<block slot="content"></block>
		</cu-custom>
		
		<view class="find_head">
			<text :class="{act_nav: currentNav  == 'swmx'}" @click="chooseNav('swmx')">食物美学</text>
			<text :class="{act_nav: currentNav  == 'shcs'}" @click="chooseNav('shcs')">生活常识</text>
			<text :class="{act_nav: currentNav  == 'kjsl'}" @click="chooseNav('kjsl')">空间沙龙</text>
		</view>
		
		<!-- 食物美学 -->
		<view v-if="currentNav == 'swmx'">
			<view class="find_list" v-for="(item,index) in newsObjSw" :key='index'  @click="toDetails(item.id,item.title)">
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
			<view class="no_more" v-if="newsObjSw.length == count">
				没有更多了
			</view>
		</view>
		
		<!-- 生活常识 -->
		<view v-if="currentNav == 'shcs'">
			<view class="find_list" v-for="(item,index) in newsObjSh" :key='index'  @click="toDetails(item.id,item.title)">
				<view class="img_box">
					<image :src="imgHttp + item.pic1" mode=""></image>
				</view>
				<view class="find_head_line">
					<text class="title">{{item.title}}</text>
					<text class="time">{{item.audit_time | timeFilter}}</text>
				</view>
				<view class="sub_title" v-html="item.explain"></view>
			</view>
			<view class="no_more" v-if="newsObjSh.length == count">
				没有更多了
			</view>
		</view>
		
		<!-- 空间沙龙 -->
		<view v-if="currentNav == 'kjsl'">
			<view class="find_list" v-for="(item,index) in newsObjKj" :key='index'  @click="toDetails(item.id,item.title)">
				<view class="img_box">
					<image :src="imgHttp + item.pic1" mode=""></image>
				</view>
				<view class="find_head_line">
					<text class="title">{{item.title}}</text>
					<text class="time">{{item.audit_time | timeFilter}}</text>
				</view>
				<view class="sub_title" v-html="item.explain"></view>
			</view>
			<view class="no_more" v-if="newsObjKj.length == count">
				没有更多了
			</view>
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
				newsObjSw:[],
				newsObjSh:[],
				newsObjKj:[],
				count:0,
				index:1,
				currentNav: 'swmx',
				showFloat: true,
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
					pagesize: 10,
					type: this.currentNav
				};
				self.ask('/app/content/getContentList','POST',data,function(res){
					console.log(res)
					self.count = res.data.count;
					
					if(self.currentNav == 'swmx'){
						if(self.index != 1){
							for(let i = 0 ; i < res.data.data.length ; i++){
								self.newsObjSw.push(res.data.data[i])
							}
						} else{
							self.newsObjSw = res.data.data
						}
	
					}
					if(self.currentNav == 'shcs'){
						if(self.index != 1){
							for(let i = 0 ; i < res.data.data.length ; i++){
								self.newsObjSh.push(res.data.data[i])
							}
						} else{
							self.newsObjSh = res.data.data
						}
	
					}
					if(self.currentNav == 'kjsl'){
						if(self.index != 1){
							for(let i = 0 ; i < res.data.data.length ; i++){
								self.newsObjKj.push(res.data.data[i])
							}
						} else{
							self.newsObjKj = res.data.data
						}

					}

				
				})
			},
			
			chooseNav(index){
				this.currentNav = index
				this.index = 1
				this.getNewsList(1)
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
			if(this.currentNav == 'swmx' && this.newsObjSw.length == this.count) return
			if(this.currentNav == 'shcs' && this.newsObjSh.length == this.count) return
			if(this.currentNav == 'kjsl' && this.newsObjKj.length == this.count) return
			this.index++
			this.getNewsList(this.index)
		}
		
	}
</script>

<style scoped lang="scss">
	@import "./find.scss"
</style>

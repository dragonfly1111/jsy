<template>
	<view class="find_box">
		<cu-custom bgColor="none-bg" :isBack="true">
			<block slot="content">康养度假</block>
		</cu-custom>
		
		<view class="find_head">
			<text v-for="item in typeList" :class="{act_nav: currentNav  == item.menuname}" @click="chooseNav(item.menuname)">{{item.menuname}}</text>
		</view>
		
		<view>
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
				index:1,
				currentNav: '',
				showFloat: true,
				typeList:[]
			}
		},
		methods:{
			//跳转到详情
			toDetails(id,title){
				uni.navigateTo({
					url:"../find/find_details?id=" + id + '&&title=' + title
				})
			},
			
			getNewsItem(){
				let self = this;
				self.ask('/app/index/getIndexContentTitle','GET',{}, function(res){
					self.typeList = res.data.data;
					self.currentNav = self.typeList[0].menuname
					self.getNewsList()
				})
			},
			
			getNewsList(){
				let self = this;
				let data = {
					title: this.currentNav
				};
				self.ask('/app/index/getContentByTitle','GET',data,function(res){
					self.count = res.data.count;
					for(let i = 0 ; i < res.data.data.length ; i++){
						self.newsObj.push(res.data.data[i])
					}
				})
			},
			
			chooseNav(index){
				this.currentNav = index
				this.newsObj = []
				this.getNewsList()
			},
		},
		filters:{
			timeFilter(time){
				
				return time.substr(0,11).replace('-','/').replace('-','/')
			}
			
		},
		onLoad() {
			this.imgHttp = this.comHttp;
			this.getNewsItem()
		},
		onReachBottom() {
			// if(this.currentNav == 'swmx' && this.newsObjSw.length == this.count) return
			// if(this.currentNav == 'shcs' && this.newsObjSh.length == this.count) return
			// if(this.currentNav == 'kjsl' && this.newsObjKj.length == this.count) return
			// this.index++
		}
		
	}
</script>

<style scoped lang="scss">
	@import "./vacation.scss"
</style>

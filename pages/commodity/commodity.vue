<template>
	<view class="main-contaner">
		<cu-custom bgColor="none-bg" :isBack="true">
			<block slot="content">{{clssName}}</block>
		</cu-custom>
		<view class="swiper_head banner">
			<swiper class="screen-swiper" :class="headSwiper.length > 1 ? 'square-dot' :''" :indicator-dots="headSwiper.length > 1 ? true : false" :circular="true" :autoplay="true" interval="5000">
	
				<swiper-item v-for="(item,index) in headSwiper" :key='index'>
					<view class="swiper-item" @click="toSwiper(item.type,item.imgurl)">
						<image :src="imgHttp+item.imgsrc" mode=""></image>
					</view>
				</swiper-item>
			</swiper>
		</view>
		
		<view class="search">
			<image src="../../static/icon/search.png"></image>
			<input type="text" v-model="searchKey" placeholder="搜索商品" @confirm='toSearch()' />
		</view>
		<view class="content">
			<view class="breed-wrapper">
				<view 
					class="breed-name" 
					v-for="(item, index) of breedList" 
					:key="item.id"
					:class="{'active': index === breedActive}"
					@click="handleBreedChange(index, item)"
				>
					{{ item.name }}
				</view>
			</view>
			<view class="goods-wrapper">
				<view class="goods_list">
					<view class="goods" @click="toGoodDetail(item.id)" v-for="(item, index) in goods[breedActive].arr" :key='index'>
						<image class="goods_img" :src="imgHttp+item.cover" mode=""></image>
						<view style="padding: 15rpx 12rpx;">
							<view class="goods_name">
								<view class="title">{{item.name}}</view>
							</view>
									
							<view class="price_box">
								<view class="price_left">
									<text class="symbol">￥</text><text class="price">{{item.sellingprice}}</text>
									<!-- <text class="unit">/{{item.unit}}</text> -->
								</view>
								<image class="cart" src="../../static/home/cart.png" mode=""></image>
							</view>
						</view>
						
					</view>
				</view>
				
				
				<!-- <view class="flex flex-wrap">
					<view class="basis-df" @click="toGoodDetail(item.id)" v-for="(item, index) in goods[breedActive].arr" :class="{'right': index % 2 != 0}">
						<view class="image-wrapper">
							<image :src="imgHttp + item.cover"></image>
						</view>
						<view class="info">
							<view class="info-wrapper">
								<view class="goods-name">
									{{ item.name }}
								</view>
								<view class="goods-price">
									¥ {{ item.sellingprice }}元/{{ item.unit }}
								</view>
							</view>
							<text class="lg cuIcon-cart"></text>
						</view>
					</view>
				</view> -->
			</view>
		</view>
		<floatWindows :showFloat="true"></floatWindows>
		
	</view>
	<!-- <view class="page" v-cloak>
		<cu-custom bgColor="bg-gradual-blue" :isBack="false">
			<block slot="content">商品列表</block>
		</cu-custom>
			 <view class="list_head">
			<text class="nav" :class="{nav_act: currentType == index}" v-for="(item,index) in typeList.flist" :key='index' @click="chooseType(item.id,index)">{{item.name}}</text>
		 </view>
		<view class="list_head">
			<swiper :display-multiple-items='3' :current='currentType'>
				<swiper-item v-for="(item,index) in typeList.flist" :key='index'>
					<text class="nav" :class="{nav_act: currentType == index}" @click="chooseType(item.id,index)">{{item.name}}</text>
				</swiper-item>
				<swiper-item class="fill_data" v-for="(item,index) in 2" :key='index'>
					<text>index</text>
				</swiper-item>
			</swiper>
		</view>
		<view class="filtrate">
			<view :class="{act_order:currentOrder == 0}" @click="chooseOrder(0)">
				<text>综合排序</text>
			</view>
			<view :class="{act_order:currentOrder == 1}" @click="chooseOrder(1)">
				<text>销量优先</text>
			</view>
			<view :class="{act_order:currentOrder == 2}" @click="chooseOrder(2)">
				<text>价格</text>
			</view>
			<view class="filtrate_btn">
				<image src="../../static/filtrate.png" mode="" @click="toggleCateMask('show')"></image>
			</view>

		</view>

		//商品列表
		<view class="goodsList" v-for="(item,index) in goods" v-if='currentType == index' :key='index' :class='index'>
			<view class="row" v-for="(val,num) in item.arr[0]" :key='num' @click="toDetails(val.id)">
				<view class="left">
					<image :src="imgHttp+val.cover" mode=""></image>
				</view>
				<view class="center">
					<view class="good">
						<text class="title">{{val.name}}</text>
						<text class="sub_title">{{val.keyword.replace(",",' ')}}</text>
					</view>
					<view class="price_box">
						<view class="price">￥{{val.sellingprice}}<text class="unit">/{{val.unit}}</text> </view>
						<view class="num">销量:{{val.salesvolume}}</view>
					</view>

				</view>
				<view class="right">
					<text>销量:{{val.salesvolume}}</text>
				</view>
			</view>
			<view class="foot_line" v-if="item.count == item.arr[0].length ">
				没有更多了
			</view>
		</view>

		<view class="cate-mask " :class="cateMaskState===0 ? 'none' : cateMaskState===1 ? 'show' : ''" :style="{top:headerTop,height:cateHeight}"
		 @click="toggleCateMask">
			<view class="cate-content" @click.stop.prevent="stopPrevent" @touchmove.stop.prevent="stopPrevent">
				<scroll-view scroll-y="true" class="scroll">
					<view class="type_list" v-if="typeList.flist[currentType].classify.length !=0">
						<text class="title">分类</text>
						<view class="sub_title">
							<text @click="chooseClassify(val.id)" :class="{act_type:currentClassify.includes(val.id)}" v-for="(val,num) in typeList.flist[currentType].classify"
							 :key='num'>{{val.name}}</text>
						</view>
					</view>
					<view class="type_list" v-if="typeList.flist[currentType].area.length !=0">
						<text class="title">产地</text>
						<view class="sub_title">
							<text @click="chooseArea(num)" :class="{act_type: currentArea == num}" v-for="(val,num) in typeList.flist[currentType].area"
							 :key='num'>{{val.area}}</text>
						</view>
					</view>
					<view class="type_list" v-if="typeList.flist[currentType].supplier.length !=0">
						<text class="title">供应商</text>
						<view class="sub_title">
							<text @click="chooseSupplier(num)" :class="{act_type: currentSupplier == num}" v-for="(val,num) in typeList.flist[currentType].supplier"
							 :key='num'>{{val.supplier}}</text>
						</view>
					</view>
				</scroll-view>
				<view class="foot_btn">
					<view class="init_btn" @click="resetBtn()">重置</view>
					<view class="sure_btn" @click="sureBtn()">确定</view>
				</view>
			</view>
		</view>
	</view> -->
</template>

<script>
// import navigationCustom from "../../components/struggler-navigationCustom/navigation-custom.vue"
export default{
	components:{
		// navigationCustom
	},
	data() {
		return {
			/* new */
			imgHttp: '',
			indicatorDots: false,
			searchKey: '',
			goods: [], //商品数组
			classId: '',
			clssName: '',
			scrollTop:0 ,// 当linear为true的时候需要通过onpagescroll传递参数
			scrollMaxHeight:200, //滑动的高度限制，超过这个高度即背景全部显示
			breedList: [],
			breedActive: 0,
			headSwiper: []
		};
	},

	onPageScroll(e) {
		//兼容iOS端下拉时顶部漂移
		if (e.scrollTop >= 0) {
			this.headerPosition = "fixed";
		} else {
			this.headerPosition = "absolute";
		}
	},
	methods: {
		//获取顶部轮播图
		getSwiperTop: function() {
			let self = this;
			this.ask("/app/index/getIndexCarousel", "GET", {
				pid: 'productType',
				title: this.clssName
			}, function(res) {
				self.headSwiper = res.data.data.filter(item=>{
					return item.statu == 1
				});
		
			})
		},
		//轮播图跳转
		toSwiper(type, id) {
			if (type == 1) {
				uni.navigateTo({
					url: "../commodity/goods_details?id=" + id
				})
			} else if (type == 2) {
				uni.navigateTo({
					url: "./web_view?id=" + id
				})
			} else if (type == 3) {
				uni.navigateTo({
					url: "../find/find_details?id=" + id
				})
			} else if (type == 4) {
				uni.navigateTo({
					url: "./web_view?id=" + id
				})
			}
		},
		
		//跳转到商品详情
		toGoodDetail(id) {
			uni.navigateTo({
				url: '../commodity/goods_details?id=' + id
			})
		},
		//搜索跳转
		toSearch() {
			uni.navigateTo({
				url: '../commodity/search?key=' + this.searchKey
			})
		},
		
		//获取商品类型
		getClassify() {
			this.ask("/app/index/getClassify", "POST", {}, (res) => {
				console.log(res)
				let data = res.data.flist
				this.breedList = []
				// 三源甄选分类
				try {
					let breedList = data.filter((item) => item.id === this.classId)[0].classify
					this.clssName = data.filter((item) => item.id === this.classId)[0].name
					this.getSwiperTop()
					for (let i = 0; i < breedList.length; i++) {
						let di = breedList[i]
						this.breedList.push(di)
						this.goods.push({
							arr: []
						})
					}
					this.getGoodsList(breedList[0].id, 0)
				} catch(e) {
					console.log(e)
				}
			})
		},
		//首次获取商品列表
		getGoodsList(id, num) {
			let data = {
				"page": 1,
				"pagesize": 10,
				"classify": id
			}
			console.log(data)
			this.ask("/app/index/getProductList", "POST", data, (res) => {
				if (res.data.data.length) {
					this.goods[num].arr = res.data.data;
					this.goods[num].page = 2;
				}
				this.goods[num].count = res.data.count;
				this.goods[num].id = id;
				this.goods.push([]);
				this.goods.pop();
				console.log(this.goods)
			})
		},
		// 切换分类
		handleBreedChange(index, item) {
			this.breedActive = index
			this.getGoodsList(item.id, index)
		}
	},
	onLoad(option) {
		this.classId = option.type
		this.getClassify()
		
		this.imgHttp = this.comHttp
		console.log(this.imgHttp + "/marketResources/upload/2008/20088c7d0a15d26841dabdfa3743d6386be7.png")
	},
	onShow() {

	},
	//监听滚到到底部
	onReachBottom() {
		console.log(111)
	},
	created() {
		
	}
}
</script>

<style lang="scss" scoped>
	@import "./commodity.scss"
</style>

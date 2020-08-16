<template>
	<view class="main-contaner" v-cloak>
		<navigation-custom :config="config" :scrollTop="scrollTop" :scrollMaxHeight="scrollMaxHeight"/>
		<view class="banner">
			<!-- <image src="http://rdp.wars.cat:3902/MicroMarket/marketResources/upload/2008/2008948a5590335d49bc9bae21a232d58ef2.png"></image> -->
		</view>
		<view class="search">
			<input type="text" placeholder="搜索商品" />
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
				<view class="flex flex-wrap">
					<view class="basis-df" v-for="(item, index) in goods[breedActive].arr" :class="{'text-right': index % 2 != 0}">
						<view class="image-wrapper">
							<image :src="imgHttp + item.cover"></image>
						</view>
						<view class="info" :class="{'move-right': index % 2 != 0}">
							<view>
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
				</view>
			</view>
		</view>
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
import navigationCustom from "../../components/struggler-navigationCustom/navigation-custom.vue"
export default{
	components:{
		navigationCustom
	},
	data() {
		return {
			/* new */
			imgHttp: '',
			goods: [], //商品数组
			config:{
			    title: "三源甄选", //title
			    bgcolor:"#fff", //背景颜色
			    fontcolor:"#000", //文字颜色，默认白色
			    type: 4, //type 1，3胶囊 2，4无胶囊模式
			    transparent: false, //是否背景透明 默认白色
			    // linear:true, //是为开启下滑渐变
			    // share:true, //是否将主页按钮显示为分享按钮
			    menuIcon:"../../static/icon/back_.png", // 当type为3或者4的时候左边的icon文件位置，注意位置与当前页面不一样
			    // menuText:"返回", 当type为3或4的时候icon右边的文字
			},
			scrollTop:0 ,// 当linear为true的时候需要通过onpagescroll传递参数
			scrollMaxHeight:200, //滑动的高度限制，超过这个高度即背景全部显示
			breedList: [],
			breedActive: 0
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
		//获取商品类型
		getClassify() {
			this.ask("/app/index/getClassify", "POST", {}, (res) => {
				console.log(res)
				let data = res.data.flist
				this.breedList = []
				// 三源甄选分类
				try {
					let breedList = data.filter((item) => item.name === '三源甄选')[0].classify
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

<style lang="scss">
	@import "./commodity.scss"
</style>

<template>
	<view class="page" v-cloak>
		<cu-custom bgColor="bg-gradual-blue" :isBack="false">
			<block slot="content">商品列表</block>
		</cu-custom>
		<!-- 	 <view class="list_head">
			<text class="nav" :class="{nav_act: currentType == index}" v-for="(item,index) in typeList.flist" :key='index' @click="chooseType(item.id,index)">{{item.name}}</text>
		 </view> -->
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

		<!-- //商品列表 -->
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
				<!-- <view class="right">
					<text>销量:{{val.salesvolume}}</text>
				</view> -->
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

	</view>
</template>

<script>
	import Vue from 'vue'
	export default {

		data() {
			return {
				cateMaskState: 0, //是否展开搜索条件
				headerTop: 0,
				cateHeight: 0, //侧边栏高度
				currentType: 0, //当前头部类型
				typeList: {}, //商品类型
				goodsId: '', //商品id
				goodsPid: '', //商品pid
				slist: [], //二级菜单
				sureType: [], //选中的商品id
				goods: [{
					arr: []
				}], //商品数组
				imgHttp: '',
				currentOrder: 0, //当前排序
				state: 'marketprice', //排序的当前字段
				currentSupplier: -1, //选中的供应商
				currentArea: -1, //选择的地区
				currentClassify: [], //选中的分类
				selectObj: {}, //选中的对象
				ishot: '', //是否是热门分类
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
			stopPrevent() {

			},
			//选择分类
			chooseClassify(id) {
				if (this.currentClassify.length == 0) {
					this.currentClassify.push(id);
				} else {
					if (this.currentClassify.indexOf(id) === -1) {
						// 不存在,则添加
						this.currentClassify.push(id);
					} else {
						// 存在,则删除
						this.currentClassify.splice(this.currentClassify.indexOf(id), 1)
					}
				}

			},
			//选择产地
			chooseArea(num) {
				this.currentArea = num;
			},
			//选择供应商
			chooseSupplier(num) {
				this.currentSupplier = num;
			},
			//跳转到详情
			toDetails(id) {
				uni.navigateTo({
					url: "./goods_details?id=" + id
				})
			},
			//获取筛选的数据列表
			getNewList(selectObj, page, isFirst) {
				let self = this;
				let data = {
					"page": page,
					"pagesize": 10,
					"classify": selectObj.classify,
					"area": selectObj.area,
					"supplier": selectObj.supplier,
					"ishot": self.ishot,
				}
				console.log(data)
				this.ask("/app/index/getProductList", "POST", data, function(res) {
					console.log(res)
					if (isFirst == true) {
						Vue.set(self.goods[self.currentType], "arr", [res.data.data]);
						Vue.set(self.goods[self.currentType], "count", res.data.count);
						Vue.set(self.goods[self.currentType], "page", page + 1);
						Vue.set(self.goods[self.currentType], "selectObj", selectObj);
						self.cateMaskState = 0;
					} else {
						let oldArr = self.goods[self.currentType].arr;
						let newArr = oldArr[0].concat(res.data.data);
						Vue.set(self.goods[self.currentType], "arr", [newArr]);
						Vue.set(self.goods[self.currentType], "page", page + 1);
						self.goods.push([]);
						self.goods.pop();
					}
					self.orderSort(self.state);
				})
			},
			//确定筛选
			sureBtn() {
				
				let classifyArr = [];
				for(let i = 0; i<this.typeList.flist[this.currentType].classify.length ; i++){
					for(let j = 0 ; j < this.currentClassify.length;j++){
						if(this.typeList.flist[this.currentType].classify[i].id == this.currentClassify[j]){
							classifyArr.push(this.currentClassify[j])
						}
					}
				}
				if (this.currentArea == -1 && this.currentSupplier == -1 && classifyArr.length == 0) {
					this.hint('请选择过滤条件');
					return
				}
				let classify = classifyArr.join(",");
				let area = this.typeList.flist[this.currentType].area[this.currentArea] ? this.typeList.flist[this.currentType].area[
					this.currentArea].area : "";
				let supplier = this.typeList.flist[this.currentType].supplier[this.currentSupplier] ? this.typeList.flist[this.currentType]
					.supplier[this.currentSupplier].supplier : "";
				if (classify == '') {
					classify = this.goods[this.currentType].id;
				}
				this.selectObj = {
					classify: classify,
					area: area,
					supplier: supplier,
				}
				this.getNewList(this.selectObj, 1, true);
			},
			//重置
			resetBtn() {
				this.currentClassify = [];
				this.currentArea = -1;
				this.currentSupplier = -1;
				console.log(this.typeList)
				console.log(this.currentType)
				console.log(this.typeList.flist[this.currentType].id)
				// this.cateMaskState  = 0;
				this.selectObj.classify = this.typeList.flist[this.currentType].id;
				this.selectObj.area = '';
				this.selectObj.supplier = '';

				this.getNewList(this.selectObj, 1, true);
			},
			//切换头部
			chooseType(id, index) {
				this.currentType = index;
				this.goodsId = id;
				this.filtrationType();
				this.orderSort(this.state);
				uni.setStorageSync('actNav', id);
			},
			//切换排序
			chooseOrder(num) {
				this.currentOrder = num;
				if (num == 0) {
					this.state = 'marketprice';
				} else if (num == 1) {
					this.state = 'salesvolume';
				} else {
					this.state = 'sellingprice';
				}
				this.orderSort(this.state);
			},
			//排序方法
			orderSort(state) {
				if (this.goods[this.currentType].arr[0].length == 0) return
				console.log(this.goods[this.currentType].arr[0].length)
				this.goods[this.currentType].arr[0].sort(this.compare(state));
			},
			compare(key) {
				return function(a, b) {
					let val1 = a[key];
					let val2 = b[key];
					return val2 - val1;
				}
			},
			//选择子类型
			handleChildType(id, num, index) {
				for (let i = 0; i < this.slist[index].tlist.length; i++) {
					this.slist[index].tlist[i].actNum = num
				}
				this.slist.push([]);
				this.slist.pop();
			},
			//显示分类面板
			toggleCateMask(type) {
				let timer = type === 'show' ? 10 : 300;
				let state = type === 'show' ? 1 : 0;
				this.cateMaskState = state;
			},
			//获取商品类型
			getClassify() {
				let self = this;
				this.ask("/app/index/getClassify", "POST", {}, function(res) {
					console.log(res)
					self.typeList = res.data
					self.goodsId = self.typeList.flist[0].id;
					// console.log(self.typeList)
					self.goods.length = self.typeList.flist.length;
					self.filtrationType();
					for (let i = 0; i < self.goods.length; i++) {
						self.goods[i] = {
							arr: [],
							id: self.typeList.flist[i].id
						};
						self.getGoodsList(self.typeList.flist[i].id, i)
					}

					if (uni.getStorageSync('actNav')) {
						for (let i = 0; i < self.typeList.flist.length; i++) {
							if (self.typeList.flist[i].id == uni.getStorageSync('actNav')) {
								self.currentType = i;
							}
						}

					} else {
						self.currentType = 0;
					}

				})
			},
			//过滤商品类型
			filtrationType(index, num) {
				this.slist = [];
				for (let i = 0; i < this.typeList.slist.length; i++) {
					if (this.typeList.slist[i].pid == this.goodsId) {
						this.typeList.slist[i].tlist = [];
						this.slist.push(this.typeList.slist[i], )
					}
				}

			},
			//首次获取商品列表
			getGoodsList(id, num) {
				let self = this;
				let data = {
					"page": 1,
					"pagesize": 10,
					"classify": id,
					"area": '',
					"supplier": '',
					"ishot": self.ishot,
				}
				console.log(data)
				this.ask("/app/index/getProductList", "POST", data, function(res) {
					self.goods[num].arr.push(res.data.data);
					self.goods[num].count = res.data.count;
					self.goods[num].page = 2;
					self.goods[num].id = id;
					self.goods[num].selectObj = {
							classify: '',
							area: '',
							supplier: ''
						},
						self.goods.push([]);
					self.goods.pop();
				})
			},

		},
		onLoad(option) {
			console.log(option)
			this.imgHttp = this.comHttp;
			this.getClassify();
		},
		onShow() {
			
			let self = this;
			if (uni.getStorageSync('actNav') == 'hot') {
				self.ishot = '1'
				self.currentType = 0;
				return
			}

			if (uni.getStorageSync('actNav')) {
				self.ishot = '';
				for (let i = 0; i < self.typeList.flist.length; i++) {
					if (self.typeList.flist[i].id == uni.getStorageSync('actNav')) {
						self.currentType = i;
					}
				}
			} else {
				self.currentType = 0;
			}


		},
		//监听滚到到底部
		onReachBottom() {
			let selectObj = this.goods[this.currentType].selectObj;
			let page = this.goods[this.currentType].page;
			let count = this.goods[this.currentType].count;

			if (this.goods[this.currentType].arr[0].length >= count) return;
			this.getNewList(selectObj, page, false)
		},

		created() {
			//初始化分类菜
			this.headerTop = this.CustomBar + 'px';
			this.cateHeight = uni.getSystemInfoSync().windowHeight - this.CustomBar + 'px'
		}
	}
</script>

<style lang="scss">
	@import "./commodity.scss"
</style>

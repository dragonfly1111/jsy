<template>
	<view class="details_box" v-cloak>
<!-- 		<view class="bact_btn" :style="{paddingTop:heightTop,height:height}" @click="back()">
			<image src="../../static/details/back.png" mode=""></image>
		</view> -->
		<cu-custom bgColor="none-bg" :isBack="true">
			<block slot="content">商品详情</block>
		</cu-custom>
		<view class="details_swiper">
			<swiper class="screen-swiper square-dot" :indicator-dots="true" :circular="true" :autoplay="true" interval="5000"
			 duration="500">
				<swiper-item v-for="(item,index) in carousel" :key='index'>
					<view class="swiper-item">
						<image :src="imgHttp + item" mode=""></image>
					</view>
				</swiper-item>
			</swiper>
		</view>
		<view class="details_msg">
			<view class="price_box">
				<view class="discount">
					<text class="coin">￥</text>
					<text class="price">{{detailsObj.sellingprice}}</text>
				</view>
				<button open-type="share">
					<image src="../../static/floaWindow/share.png"></image>
				</button>
			</view>
			<view class="name">
				<text v-if="detailsObj.name">{{detailsObj.name}}</text>
			</view>
			<view class="sub_title">
				原产地：{{detailsObj.area}}
			</view>
		</view>

		<view class="grep_bar"></view>

		<view class="attr-line" @click="openSheet()">
			品质保证
		</view>
		<view class="grep_bar"></view>

		<view class="attr-line">
			<text class="lint-title">运费</text>
			<text class="line-content" v-if="detailsObj.freemail == 1">免运费</text>
			<text class="line-content" v-if="detailsObj.freemail == 0">{{detailsObj.postage}}</text>
		</view>
		<view class="attr-line flex-center-between" @click="openChooseList()">
			<view class="left-line">
				<text class="lint-title">选择</text>
				<viex class="line-content">{{specSelectedName || "请选择规格"}}</viex>
			</view>
			<image clsss="right-icon" src="../../static/details/arrow.png" mode=""></image>
		</view>
		<view class="grep_bar"></view>

		<view class="shop-line flex-center-between" @click="toHome()">
			<image src="../../static/details/shop_logo.png" mode=""></image>
			<view class="go-shop">进店逛逛</view>
		</view>
		<view class="grep_bar"></view>

		<view @click="hideChooseList()" v-if="showChoose" class="mask"></view>

		<view class="choose_list" :class="showChoose ? 'list_show' : 'list_hide'">
			<text class="text-gray cuIcon-close" @click="showChoose = false"></text>
			<view class="goods_info">
				<image :src="imgHttp + detailsObj.cover"></image>
				<view class="goods-price">
					<view v-if="vipprice" class="price-wrapper">
						<text class="symbol">¥</text>
						<text class="price">{{ vipprice }}</text>
					</view>
					<view v-else>
						<view v-if="detailsObj.specification_detail.length > 1" class="price-wrapper">
							<text class="symbol">¥</text>
							<text class="price">{{ detailsObj.lowest_price }}</text>
							<text class="line">—</text>
							<text class="price">{{ detailsObj.highest_price }}</text>
						</view>
						<view v-else class="price-wrapper">
							<text class="symbol">¥</text>
							<text class="price">{{ detailsObj.highest_price }}</text>
						</view>
					</view>
					<view class="text">
						选择&nbsp;&nbsp;规格
					</view>
				</view>
			</view>
			<view class="specs-wrapper">
				
				<view class="text">规格：</view>
				<view class="specs-list">
					<view class="item" :class="{'active': currentType == index}" v-for="(item,index) in detailsObj.specification_detail"
					 :key='index' @click="chooseType(item.sellingprice,index,item.id,item.combination,item.marketprice)">
						{{item.combination.replace(","," ")}}
					</view>
				</view>
				
				<view class="item-num">
					<view class="text">购买数量：</view>
					
					<view class="add-reduce">
						<view class="reduce" @click="reduceNum()">
							-
						</view>
						<view class="num">
							{{itemNum}}
						</view>
						<view class="add" @click="addNum()">
							+
						</view>
					</view>
				</view>

			</view>
			<view class="button-wrapper">
				<view class="button button-left" @click="addCart()">加入购物车</view>
				<view class="button button-right" @click="nowBuy()">立即购买</view>
			</view>
		</view>
		<view class="details_bg">
			<rich-text style="font-size:0;" :nodes="detailsObj.particular"></rich-text>
		</view>
		<goodsRecommend class="recommend"></goodsRecommend>
		<view style="height: 140rpx;width: 100%;"></view>



		<view class="foot_btn">
			<view class="operating_box">
				<button open-type='contact' class="operating_item">
					<image @click="toService" src="../../static/details/service.png" mode=""></image>
					<view @click="toService">客服</view>
				</button>
				<view class="operating_item">
					<image @click="addCollect" src="../../static/details/collect.png" mode="" v-if="collectType == false"></image>
					<view @click="addCollect" v-if="collectType == false">收藏</view>

					<image @click="addCollect" src="../../static/details/collected.png" mode="" v-if="collectType == true"></image>
					<view @click="addCollect" v-if="collectType == true">已收藏</view>
				</view>

				<view class="operating_item" @click="toCart()">
					<image src="../../static/details/car.png" mode=""></image>
					<view>购物车</view>
				</view>
			</view>

			<view class="btn_box">
				<text class="add" @click="addCart()">加入购物车</text>
				<text class="buy" @click="nowBuy()">立即购买</text>
			</view>

		</view>
		<view class="cu-modal" :class="modalName=='doLoginModal'?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">授权提醒</view>
					<view class="action">
						<text class="cuIcon-close text-golden" @click="closeDoLogin"></text>
					</view>
				</view>
				<view class="padding bg-white">
					请授权头像等信息，以便为您提供更好的服务
				</view>
				<view>
					<button class="cu-btn bg-golden margin-tb-sm lg" open-type="getUserInfo" @getuserinfo="getinfo('goodsDetails')">去授权</button>
				</view>
			</view>
		</view>
		<view class="cu-modal" :class="modalName=='Modal'?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">友情提示</view>
					<view class="action" @tap="closeDoLogin">
						<text class="cuIcon-close text-golden"></text>
					</view>
				</view>
				<view class="padding-xl">
					<view>您还不是三源会员，无法购买商品！</view>
					<button class="cu-btn bg-golden margin-tb-sm lg" @click="to_member">立即开通会员</button>
				</view>
			</view>
		</view>
		<floatWindows :showFloat="true" :goodsObj="detailsObj"></floatWindows>

		<view class="cu-modal" :class="sheetShow ? 'show' : ''">
			<view class="cu-dialog stupid-party-a">
				<view class="pz-title">品质保证</view>
				<image :src="imgHttp + pzbzImg" mode="widthFix"></image>
				<view class="but" @click="sheetShow = false">我 知 道 了</view>
			</view>
		</view>

	</view>
</template>

<script>
	import goodsRecommend from '../../components/goods-recommend.vue'
	export default {
		components: {
			goodsRecommend,
		},
		data() {
			return {
				"heightTop": '',
				"height": '',
				"key": "", //商品id
				"userid": "", //用户id
				"brand": "", //手机品牌
				"model": "", //手机型号
				"platform": "", //手机平台
				"detailsObj": {}, //商品详情
				"imgHttp": '',
				"carousel": [], //轮播数组
				"currentType": -1, //当前商品规格类型
				"modalName": '', //是否显示授权弹窗
				"vipprice": '', //vip价格
				"orginprice": '', //市场价格
				"specSelectedId": '', //规格id
				"specSelectedName": '', //规格名称
				"userObj": {},
				"token": '',
				"collectType": false,
				"showChoose": false,
				"sheetShow": false,
				"itemNum": 1,
				"pzbzImg": ''
			}
		},
		methods: {
			//数量加加
			addNum(){
				
				if(this.itemNum >= 99){
					this.hint('超过单次购买最大数量');
					return
				}
				this.itemNum ++
			},
			//数量减减
			reduceNum(){
				if(this.itemNum <= 1){
					return
				}
				
				this.itemNum --
			},
			openSheet() {
				this.sheetShow = true
			},

			toHome() {
				uni.switchTab({
					url: "../home/home"
				})
			},

			//打开选择规格
			openChooseList() {
				if (this.showChoose) return
				this.showChoose = true
			},

			hideChooseList() {
				this.showChoose = false
			},

			//跳转到购物车
			toCart() {
				uni.navigateTo({
					url: '../cart/cart'
				})
			},

			//返回上一页
			back() {
				if (this.openShare == 'share') {
					uni.switchTab({
						url: '../home/home'
					})
				} else {
					uni.navigateBack({
						delta: 1
					})
				}

			},
			//关闭授权
			closeDoLogin: function() {
				this.modalName = '';
			},
			//跳转到会员页面
			to_member: function() {
				uni.navigateTo({
					url: '../my/member'
				})
			},
			//判读是否登录
			isLogin2: function(callback) {
				if (uni.getStorageSync('token') == '' && uni.getStorageSync('customer') == '') {
					this.modalName = 'doLoginModal';

				} else {
					callback()
				}

			},
			//添加或者移除收藏
			addCollect() {
				let self = this;
				this.isLogin2(function() {

					let data = {
						"token": uni.getStorageSync('token'),
						"itemid": self.key,
						"userid": uni.getStorageSync('customer').userid,
						"iscollect": self.collectType
					}
					if (self.collectType) {
						uni.showLoading({
							title: '取消收藏'
						});
					} else {
						uni.showLoading({
							title: '添加收藏'

						});

					}
					self.ask("/app/index/addCollect", "POST", data, function(res) {

						self.collectType = res.data.iscollect;


					})

				})


			},
			//判断当前用户是否收藏
			isCollect() {
				console.log('判断收藏')
				let self = this;
				let data = {
					"token": uni.getStorageSync('token'),
					"itemid": self.key,
					"userid": uni.getStorageSync('customer').userid,
				}
				this.ask("/app/index/isCollect", "POST", data, function(res) {
					self.collectType = res.data.iscollect;
				})
			},
			//加入购物车
			addCart() {
				let self = this;
				this.isLogin2(function() {
					if (self.currentType == -1 && self.detailsObj.specification_detail.length != 0) {
						if (self.showChoose) {
							self.hint('请选择规格')
						} else {
							self.openChooseList()
						}
					} else {
						let data = {
							"token": uni.getStorageSync('token'),
							"itemid": self.key,
							"userid": uni.getStorageSync('customer').userid,
							"spec": self.specSelectedName,
							"num": self.itemNum
						}
						// console.log(data)
						self.ask("/app/index/addCart", "GET", data, function(res) {
							self.hint("加入购物车成功")
							// console.log(res)
						})
					}
				})
			},
			//立即购买
			nowBuy() {
				let self = this;
				this.isLogin2(function() {
					// console.log(self.token);
					//判断是否开通会员
					if (uni.getStorageSync('customer').usertype == "0" || uni.getStorageSync('customer').usertype == null) {
						self.modalName = 'Modal'
						return
					}

					//判断是否选择规格
					if (self.currentType == -1 && self.detailsObj.specification_detail.length != 0) {
						if (self.showChoose) {
							self.hint('请选择规格')
						} else {
							self.openChooseList()
						}
					} else {
						let goodsObj = [{
							"itemid": self.key,
							"itemnum": self.itemNum,
							"specid": self.specSelectedId
						}]
						let endPrice = self.vipprice;
						uni.navigateTo({
							url: '../my/order_sure?goodsObj=' + JSON.stringify(goodsObj) + '&&endPrice=' + endPrice +
								'&&source=goodsDetails'
						})
					}
				})
			},
			//选择规格
			chooseType(price, index, id, name, orginprice) {
				this.vipprice = price;
				this.orginprice = orginprice;
				this.currentType = index;
				this.specSelectedId = id;
				this.specSelectedName = name;
				// this.showChoose = false;
			},

			//获取商品详情
			getGoodsDetails() {
				let data = {
					"key": this.key,
					"userid": this.userid,
					"brand": this.brand,
					"model": this.model,
					"platform": this.platform,
				}
				let self = this;
				this.ask("/app/index/getProduct", "GET", data, function(res) {
					self.detailsObj = res.data.data
					self.carousel = self.detailsObj.carousel.split(",");
					self.vipprice = self.detailsObj.vipprice;
					/* 找出最大单价、最小单价 */
					let priceList = []
					for (let i = 0; i < self.detailsObj.specification_detail.length; i++) {
						const di = self.detailsObj.specification_detail[i]
						priceList.push(di.sellingprice)
					}
					self.detailsObj.lowest_price = Math.min(...priceList)
					self.detailsObj.highest_price = Math.max(...priceList)
					// self.carousel.pop();
					// console.log(self.detailsObj)
					// console.log(self.detailsObj.specification_detail)

				})
			},
			//获取品质保证图片
			getPZBZ() {
				let self = this;
				this.ask("/app/index/pzbz", "GET", {}, function(res) {
					self.pzbzImg = res.data.data.img_url
				})
			}
		},
		onLoad(option) {
			console.log(option)
			this.heightTop = this.StatusBar + 'px'
			this.height = this.CustomBar + 'px'
			this.imgHttp = this.comHttp
			this.key = option.id; //获取商品id
			this.openShare = option.type;
			let sysres = uni.getSystemInfoSync(); //获取手机系统信息
			this.brand = sysres.brand;
			this.model = sysres.model;
			this.platform = sysres.platform;
			this.getGoodsDetails();
			this.getPZBZ();
			console.log('进入商品详情')
			console.log('判断是否登录' + wx.getStorageSync('token') !== '')
			console.log('判断是否登录1' + wx.getStorageSync('customer') !== '')
			if (wx.getStorageSync('token') !== '' && wx.getStorageSync('customer') !== '') {
				this.isCollect();
			} else {
				console.log('未登录 弹出登录')
				// 直接弹出授权登录
				this.modalName = 'doLoginModal';
			}
			// 直接微信分享进入
			if (option.type == 'share') {
				console.log('微信分享进入，存sender：' + option.userid)
				wx.setStorageSync('sender', option.userid)
				console.log('存成功' + wx.getStorageSync('sender'))
			}
			// 二维码分享进入
			if (option.scene) {
				// 处理二维码传进参数
				let scene = decodeURIComponent(option.scene)
				scene = decodeURIComponent(scene)
				wx.setStorageSync('sender', scene)
			}
		},
		onShareAppMessage(res) {
			console.log("分享者id：" + wx.getStorageSync('customer').wechat_id)
			return {
				title: this.detailsObj.name,
				path: '/pages/commodity/goods_details?id=' + this.key + '&&type=share' + '&&userid=' + wx.getStorageSync('customer')
					.wechat_id,
			}
		},
		onShow() {
			// this.modalName = '';
		}
	}
</script>

<style lang="scss" scoped>
	@import "./goods_details.scss";
</style>

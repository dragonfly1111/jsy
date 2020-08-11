<template>
	<view class="cart_box" v-cloak>
		<cu-custom bgColor="bg-gradual-blue" :isBack="false">
			<block slot="content">购物车</block>
		</cu-custom>
		<view class="goodsList" true>
			<checkbox-group  @change="getCheck($event)">
			<view class="row" v-for="(item,index) in cartList " :key="item.id" >
				<image src="../../static/com/clear.png" class="clear" mode="" @click="clearCartList(item.id)"></image>
				<view class="left">
			        	<checkbox class='round blue' :checked="selected.includes(JSON.stringify({itemid:item.id}))" :value="JSON.stringify({itemid:item.id})"></checkbox> 
					<image :src="imgHttp + item.cover" mode="" @click="to_goods(item.itemid)"></image>
				</view>
				<view class="center">
					<view class="good">
						<text class="title">{{item.name}}</text>
						<text class="sub_title">{{item.keyword.replace(","," ")}}</text>
					</view>
					<view class="price">￥{{item.sellingprice}}<text class="unit">/{{item.unit}}</text> </view>
				</view>
				<view class="right">
					<view class="reduce" @click="reduceNum(index,item.num)">
						<text>-</text>
					</view>
					<view class="num">
						<text>{{item.num}}</text>
					</view>
					<view class="add" @click="addNum(index,item.num)">
						<text>+</text>
					</view>
				</view>
			</view>
            </checkbox-group>
		</view>
		<view class="foot_box" v-if="isLogin == true && cartList.length != 0 ">
			<view class="left">
				<checkbox-group name="" @change="all($event)">
					<label>
						<checkbox :checked="allCheckbox" value="all" class='round blue' /><text>全选</text>
					</label>
				</checkbox-group>
			</view>
			<view class="right">
				<!-- <text class="title">免运费</text> -->
				<text class="sub_title">合计</text>
				<text class="price">￥{{endPrice}}</text>
				<text class="btn" @click="to_details()">去结算</text>
				
			</view>
		</view>
		<view class="no_data" v-if="isLogin == false">
			<image src="../../static/com/emptyCart.jpg" mode=""></image>
			<button class="cu-btn bg-golden margin-tb-sm lg" open-type="getUserInfo" @getuserinfo="getinfo('cart')">亲，去授权</button>
		</view>
		
		<view class="no_data" v-if="cartList.length == 0 && isLogin==true">
			<image src="../../static/com/emptyCart.jpg" mode=""></image>
			<button class="cu-btn bg-golden margin-tb-sm lg" @click="to_home()" >购物车空空如也，去逛逛</button>
			
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
	</view>
</template>

<script>
	import Vue from 'vue'
	export default{
		data(){
			return{
				imgHttp:'',
				allCheckbox:false,
				selected:[],//选中的商品
				cartList:[],//购物车列表
				isLogin:false,
				cartStatus:'去登陆',
				endPrice: 0,
				modalName:'',
			}
		},
		methods:{
			//关闭授权
			closeDoLogin:function(){
				this.modalName = '';
			},
			//跳转到首页
			to_home(){
				uni.switchTab({
					url:"../home/home"
				})
			},
			//跳转到商品详情
			to_goods:function(id){
				uni.navigateTo({
					url:"../commodity/goods_details?id=" + id
				})
			},
			//跳转到会员页面
			to_member:function(){
				uni.navigateTo({
					url:'../my/member'
				})
			},
			//获取单个选中的值
			getCheck(e){
				console.log(e.detail.value)
				this.selected = e.detail.value;
				if(this.selected.length == this.cartList.length){
					this.allCheckbox = true;
				} else{
					this.allCheckbox = false;
				}
				this.end_price();
				
			},
			//全选
			all(e){
				let chooseItem = e.detail.value;
				if(chooseItem[0]=='all'){
					this.allCheckbox=true;
					for(let item of this.cartList){
						// let itemVal= JSON.stringify({itemid:item.itemid,itemnum:item.num,specid:item.specid});
						let itemVal= JSON.stringify({itemid:item.id});
						if(!this.selected.includes(itemVal)){
							this.selected.push(itemVal);
						}
					}					
				}else{
					// 取消全选
					this.allCheckbox=false;
					this.selected=[];
				}
				this.end_price();

			},
			//计算总价
			end_price(){
				this.endPrice = 0;
				for(let j = 0 ; j<this.cartList.length;j++){
					for(let i =0;i<this.selected.length;i++){
						if(JSON.parse(this.selected[i]).itemid == this.cartList[j].id){
							this.endPrice += this.cartList[j].sellingprice * this.cartList[j].num	
						}
					}
				}
				// this.endPrice = Number(this.endPrice) * Number(uni.getStorageSync('customer').discount) / 10
				this.endPrice = Math.floor(this.endPrice * 100) / 100 
				
			},
			//跳转到订单确定页面
			to_details(){
				if(uni.getStorageSync('customer').usertype =="0" || uni.getStorageSync('customer').usertype ==null){
				    this.modalName = 'Modal'
					return
				}
				if(this.selected.length == 0){
					this.hint('请选择要结算的商品');
					return
				}
				let goodsObj = [];
				for(let j = 0 ; j<this.cartList.length;j++){
					for(let i = 0 ; i<this.selected.length;i++){
						if(JSON.parse(this.selected[i]).itemid == this.cartList[j].id){
							goodsObj.push(JSON.stringify({itemid:this.cartList[j].itemid,itemnum:this.cartList[j].num,specid:this.cartList[j].specid,cartid:this.cartList[j].id}));
						}						
					}
				}
			
				uni.navigateTo({
					url:"../my/order_sure?goodsObj=" + JSON.stringify(goodsObj) + '&&endPrice=' + this.endPrice
				})
			},
			//删除购物车
			clearCartList(id){
				let self = this;
				let data = {
					"token":uni.getStorageSync('token'),
					"userid":uni.getStorageSync('customer').userid,
					"itemid":id
				}
				console.log(id)
				// console.log(self.selected)
		
				this.ask("/app/index/deleteCartItem","POST",data,function(res){
					// console.log(res)
					for(let i = 0; i<self.selected.length ;i++){
						if(self.selected[i].itemid == id){
							self.selected.splice(i,1)
						}
					}
	             // console.log(self.selected)
					self.cartList = res.data.data;
					self.end_price();
				})
			},
			//获取购物车列表
			getCartList(){
				let self = this;
		        let data = {
					"token":uni.getStorageSync('token'),
					"userid":uni.getStorageSync('customer').userid
				}
				this.ask("/app/index/getCartList","POST",data,function(res){
					console.log(res)
					self.cartList = res.data.data;	
				})
			},
			//数量加加
			addNum(index,num,str){
				
				if(num >= 99){
					this.hint('超过单次购买最大数量');
					return
				}
				let newNum = num + 1;
				Vue.set(this.cartList[index],'num',newNum);
				this.end_price();
				
			},
			//数量减减
			reduceNum(index,num){
				if(num <= 1){
					return
				}
				
				let newNum = num - 1;
				Vue.set(this.cartList[index],'num',newNum);
				this.end_price();
			}
			
		},
		onLoad() {
			this.imgHttp = this.comHttp;
			
		},
		onShow() {
			this.endPrice = 0;
			if(uni.getStorageSync('token')== '' && uni.getStorageSync('customer')== ''){
				this.isLogin =false
			} else{
				this.isLogin = true
				this.allCheckbox = false;
				this.selected = [];
				this.getCartList();
			}
		}
	}
</script>
<style lang="scss">
	@import "./cart.scss"
</style>

<template>
	<view class="address_box" v-cloak>
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<block slot="content">添加收货地址</block>
		</cu-custom>
		<view class="address_bg">

		</view>
		<view class="form_box">
			<view class="row">
				<text class="title">收货人</text>
				<input type="text" v-model="userName" />
			</view>
			<view class="row">
				<text class="title">手机号</text>
				<input type="number" v-model="userTel" />
			</view>
			<view class="row" @click="showAddress">
				<text class="title">所在地区</text>
				<input type="text" v-model="userArea" disabled="true" />
				<image src="../../static/details/arrow.png" mode="" ></image>
			</view>
			<view class="row">
				<textarea v-model="userAddress" placeholder="详细地址:如道路,门牌号,小区,楼栋号,单元室等" />
				</view>
			
		</view>
		
		<view class="default_address">
			<text>设为默认地址</text>
			<switch class="red" :checked="ischecked" @change='isDefault($event)'  />
		</view>
		
		<view class="foot_btn">
			<text @click="submitAddress()">保存</text>
		</view>
		<view class="foot_btn clear_btn">
			<text @click="clearAddress()" v-if="addressType == 'edit' ">删除</text>
		</view>
		
		<pickerAddress v-model="addressShow" @confirm="addresspick" />
		<floatWindows :showFloat="true"></floatWindows>
		
	</view>
	
</template>

<script>
	
    import pickerAddress from '@/components/liudx-pickerAddress/index.vue'

	export default{
		components:{
		    pickerAddress,
		},
		data(){
			return{
				ischecked: false, //switch开关
				addressShow: false, //是否显示地址选择
				form: {            
					province: '',
					city: '',
					area: '',
				}, //省市区结构数据
				userName:'',
				userTel:'',
				userArea:'',
				userAddress:'',
				address: '',//选中的地址
				addressType: '',
				userAddressId:'',
			}
		},
		methods:{
			//是否默认
			isDefault(e){
				this.ischecked = e.detail.value;
		
			},
			//展开地址选择
			showAddress(){
				this.addressShow = !this.addressShow;
			},
			//选择地区
			addresspick(obj) {
				console.log(obj)
				let arr = [ 'province', 'city', 'area'];
				let place = '';
				arr.map(key => {
					this.form[key] = obj[key].AreaId
					place += obj[key].AreaName 
				})
				this.userArea = place;
			},
			//删除地址
			clearAddress(){
				let self = this;
				let data = {
					"token":uni.getStorageSync('token'),
					"userid":uni.getStorageSync('customer').userid,
					"id": self.userAddressId
				}
				uni.showModal({
				    title: '提示',
				    content: '确定是否删除该项地址？',
				    success: function (res) {
				        if (res.confirm) {
							self.ask('/app/address/deleteAddress','POST',data,function(res){
								self.hint(res.data.msg)
								uni.navigateBack({
									delta:1
								})
							})
				        }
				    }
				});
				
					
			
			},
			//添加地址
			submitAddress(){
				let self = this;
				if(self.userName == ''){
					self.hint('请填写收货人姓名');
					return;
				}
				if(!/(^1[3|4|5|7|8|9][0-9]{9}$)/.test(self.userTel)){
					self.hint('请输入正确的手机号码');
					return;
				}
				if(self.userArea == ''){
					self.hint('请选择地区');
					return;
				}
				if(self.userAddress == ''){
					self.hint('请填写详细地址');
					return;
				}
				let formdata = {
					consignee: self.userName,
					telephone: self.userTel,
					address:  self.userArea,
					addressDetailed: self.userAddress,
					mrdefault: self.ischecked
				}
				let data = {
					"token":uni.getStorageSync('token'),
					"userid":uni.getStorageSync('customer').userid,
					"data":JSON.stringify(formdata),
					"addresstype": self.addressType,
					"addressid": self.userAddressId
				}
				this.ask('/app/address/creatrAddress',"POST",data,function(res){
					self.hint(res.data.msg)
					setTimeout(()=>{
						uni.navigateBack({
							delta:1
						})
					},500)
	
					
				})
			}
		},
		onLoad(option) {
			this.addressType = option.type
			//判断操作地址类型
			if(option.type == 'edit'){
				let userMsg = JSON.parse(option.data);
				this.userName = userMsg.name;
				this.userTel = userMsg.telephone;
				this.userArea = userMsg.address_province;
				this.userAddress = userMsg.address_detailed;
				this.userAddressId = userMsg.id;
				this.ischecked = userMsg.status == 1? true : false;
				
			}
		}
	}
</script>

<style lang="scss">
	page{
		background-color: #f9f9f9;
	}
	.address_box{
		width: 100%;
		.address_bg{
			background-image: linear-gradient(to right,#85792a,#af9c42);
			height: 400rpx;
			width: 100%;
			position: fixed;
			z-index: -1;
			border-radius: 0 0 40% 40%;
		}
		.form_box{
			background-color: #fff;
			width: calc(100% - 60rpx);
			margin: 30rpx;
			margin-top: 60rpx;
			border-radius: 8rpx;
			.row{
				min-height: 80rpx;
				width: calc(100% - 40rpx);
				margin:  0 20rpx;
				border-bottom: 1rpx solid #e1e1e1;
				display: flex;
				align-items: center;
				position: relative;
				
				.title{
					width: 120rpx;
					font-size: 28rpx;
				}
				input{
					width: calc(100% - 120rpx);
				}
				image{
					z-index: 999;
					position: absolute;
					right: 0;
					top: 25rpx;
					width: 30rpx;
					height: 30rpx;
				}
				textarea{
					width: 100%;
					height: 120rpx;
					padding-top: 20rpx;
				}
			}
		}
		.default_address{
			width: calc(100% - 60rpx);
			margin: 30rpx;
			background-color: #fff;
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 0 20rpx;
			font-size: 28rpx;
			height: 80rpx;
		}
		.foot_btn{
			width: 100%;
			padding: 100rpx 30rpx 30rpx 30rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			height: 80rpx;
			text{
				display: flex;
				justify-content: center;
				align-items: center;
				background-color: #857825;
				color: #fff;
				width: 380rpx;
				height: 80rpx;
				border-radius: 60rpx;
			}
		}
		.clear_btn{
			text{
				background-color: #fff;
				border: 1rpx solid #857825;
				color: #857825;
				height: 78rpx;
			}
			
		}
		
	}
	.address_box .form_box .row:last-child{
		border: none;
	}
</style>

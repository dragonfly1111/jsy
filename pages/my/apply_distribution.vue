<template>
	<view class="apply_box" v-cloak>
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<block slot="content">分销人员申请</block>
		</cu-custom>
		<view class="refund_head">
			<view class="apply_bg">

			</view>
			<view class="refunf_msg">
				<view class="refund_row">
					<text class="title">分公司</text>
					<view class="selcet" @click="closeCompany">
						<input :disabled='true' class="reason" type="text" v-model="currentCompany" placeholder="请选择分公司" />
						<image src="../../static/details/arrow.png" mode=""></image>
					</view>
				</view>
			</view>

			<view class="apply_msg">
				<view class="msg_row">
					<text class="title">姓名</text>
					<input type="text" v-model="username" placeholder="请输入申请人姓名" />
				</view>
				<view class="msg_row">
					<text class="title">联系电话</text>
					<input type="text" v-model="usertel" placeholder="请输入手机号码" />
				</view>
				<view class="msg_row">
					<text class="title">验证码</text>
					<input type="text" v-model="usercode" placeholder="请输入验证码" />
					<text class="code" @click="getCode()">{{countDown}}</text>
				</view>
			</view>

			<view class="apply_msg">
				<view class="msg_row">
					<text class="title">身份证</text>
					<input type="text" v-model="usercard" placeholder="请输入身份证号码" />
				</view>
				<view class="msg_row msg_img">
					<text class="title">身份证</text>
					<view class="row_img" @click="chooseImg(1)">
						<image class="add_bg" src="../../static/my/add.png" mode=""></image>
						<image class="image_bg" :src="imgHttp + cardAfter" mode=""></image>
						<text>国徽面</text>
					</view>

					<view class="row_img" @click="chooseImg(2)">
						<image class="add_bg" src="../../static/my/add.png" mode=""></image>
						<image class="image_bg" :src="imgHttp + cardBbefare" mode=""></image>
						<text>人像面</text>
					</view>
				</view>
			</view>

			<view class="apply_msg">
				<view class="msg_row">
					<text class="title">银行卡号</text>
					<input type="text" v-model="binNUm" placeholder="请输入银行卡号" @blur='getBin(binNUm)' />
				</view>
				<view class="msg_row">
					<text class="title">银行</text>
					<input type="text" v-model="binName" placeholder="请填写银行卡名称" />
					<!-- <image class="arrow" src="../../static/details/arrow.png" mode=""></image> -->
				</view>
			</view>

		</view>
		<view class="reason_list" v-if="isSHowCompany == true">
			<view class="reason_bg" @click="closeCompany()">
			</view>
			<view class="reason_row">
				<view class="reason_head">
					<text class="sub_title">&nbsp;</text>
					<text class="title">选择公司</text>
					<text class="sub_title" @click="closeCompany()">取消</text>
				</view>
				<radio-group name="reason" @change="chooseType($event)">
					<view class="row" v-for="(item,index) in comPanyObj" :key='index'>
						<text>{{item.name}}</text>
						<radio class="red margin-left-sm" :value="JSON.stringify({name:item.name,id:item.id})" />
					</view>
				</radio-group>

			</view>
		</view>

		<view class="foot_btn">
			<text @click="submitApply()">提交</text>
		</view>
		<floatWindows :showFloat="true"></floatWindows>

	</view>
</template>

<script>
	import floatWindows from '../../components/float-windows.vue'
	import BIN from "bankcardinfo"
	export default {
		components:{
			floatWindows
		},
		data() {
			return {
				currentCompany: '',
				isSHowCompany: false,
				comPanyObj:'',//分公司列表
				imgHttp: '',
				cardBbefare: '',//身份证前面
				cardAfter: '',//身份证后面
				binNUm:'',//银行卡号码
				binName:'',//银行卡名称
				username:'',//申请人名字
				usertel:'',//申请人电话
				usercode:'',//验证码
				countDown: '获取验证码',//倒计时
				codeStatus: true,
				usercard:'',//身份证
				companyid:''
			}
		},
		methods: {
			closeCompany() {
				this.isSHowCompany = !this.isSHowCompany;
			},
			//选中公司
			chooseType(e) {
				console.log(e)
				// this.currentCompany = ;
				this.currentCompany = JSON.parse(e.detail.value).name;
				this.companyid = JSON.parse(e.detail.value).id;
			},
			//获取分公司列表
			getCompany(){
				let self = this;
				let data = {
					"token":uni.getStorageSync('token'),
					"userid": uni.getStorageSync('customer').userid,
				}
				this.ask('/app/me/getContactList','POST',data,function(res){
					console.log(res)
					self.comPanyObj = res.data.data
					
				})
			},
			//上传身份证
			chooseImg(type) {
			    let self = this;
				uni.chooseImage({
					count: 1,
					sizeType: ['original', 'compressed'], 
					sourceType: ['album', 'camera'], 
				    success: (chooseImageRes) => {
				        const tempFilePaths = chooseImageRes.tempFilePaths;
				        uni.uploadFile({
				            url: self.comHttp + '/CMS/imgUpload/Upload', 
				            filePath: tempFilePaths[0],
				            name: 'file',
				            formData: {
				                'user': 'test'
				            },
				            success: (uploadFileRes) => {
				                if(type == '1'){
									self.cardAfter = JSON.parse(uploadFileRes.data).src;
								} else{
									self.cardBbefare = JSON.parse(uploadFileRes.data).src;
								}
								
				            }
				        });
				    }
				});
			},
			//获取银行卡的银行名称
			getBin(binNUm) {
				//6221882600114166800
				let self = this;
				BIN.getBankBin(binNUm)
					.then(function(data) {
						console.log(data)
						self.binName = data.bankName;
					})
					.catch(function(err) {
						self.hint(err)
						console.log(err)
					})
			},
			//获取验证码
			getCode(){
				if(this.codeStatus = false) return
				let self = this;
				let data = {
					token:uni.getStorageSync('token'),
					userid:uni.getStorageSync('customer').userid,
					telephone: this.usertel,
				}
				if(this.usertel == ''){
					this.hint('请输入申请人电话');
					return
				}
				if(!(/^1[3456789]\d{9}$/.test(this.usertel))){ 
					this.hint("手机号码有误，请重填");  
					return  
				} 
				this.ask('/app/me/getApplicationCode','POST',data,function(res){
					self.hint('验证码发送成功');
					self.codeStatus = false;
					self.countDown = 60;
					console.log(res);
					let times =  setInterval(function(){
						self.countDown-- 
						if(self.countDown <= 0){
							clearInterval(times);
							self.countDown ='重新获取验证码'
							self.codeStatus = true;
						}
					},1000)
				})
			},
			//提交审核
			submitApply(){
				if(this.currentCompany == ''){
					this.hint('请选择分公司');
					return
				}
				if(this.username == ''){
					this.hint('请输入申请人名字');
					return
				}
				if(this.usertel == ''){
					this.hint('请输入申请人电话');
					return
				}
				if(!(/^1[3456789]\d{9}$/.test(this.usertel))){ 
				        this.hint("手机号码有误，请重填");  
				        return  
				} 
				if(this.usercode == ''){
					this.hint('请填写验证码')
					return
				}
				if(this.usercard == ''){
					this.hint('请填写身份证');
					return
				}
				if(!(/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(this.usercard))){
					this.hint('身份证格式错误，请重填')
					return
				}
				if(this.cardBbefare == ''){
					this.hint('请上传人像面')
					return
				}
				if(this.cardAfter == ''){
					this.hint('请上传国徽面')
					return
				}
				if(this.binNUm == ''){
					this.hint('请填写银行卡号')
					return
				}
				if(this.binName == ''){
					this.hint('请填写银行名称')
					return
				}
				let self = this;
				let data = {
					token:uni.getStorageSync('token'),
					userid:uni.getStorageSync('customer').userid,
					companyid: this.companyid,
					name: this.username,
					telephone: this.usertel,
					vCode: this.usercode,
					identity_card: this.usercard,
					identity_card_front: this.cardBbefare,
					identity_card_back: this.cardAfter,
					bank: this.binName,
					card: this.binNUm
				}
				console.log(data);
				this.ask("/app/me/applicationMarket","POST",data,function(res){
					self.hint('提交成功');
					console.log(res);
					let data2 = {
						"token":uni.getStorageSync('token'),
						"userid":uni.getStorageSync('customer').userid,
					}
					self.ask('/app/userLogin/refreshUserInfo',"POST",data2,function(res){
						
						if(res.data.userInfo.avatar.indexOf('http') == -1){
							res.data.userInfo.avatar = self.comHttp + res.data.userInfo.avatar; 
						}
					    uni.setStorageSync("customer",res.data.userInfo)
						uni.navigateBack({
							delta:1
						})
					})
				})
			}

		},
		onLoad() {
			this.imgHttp = this.comHttp;
			this.getCompany();
		
			
			
		}

	}
</script>

<style lang="scss">
	@import "./order_refund.scss";
	@import './apply_distribution.scss';
</style>

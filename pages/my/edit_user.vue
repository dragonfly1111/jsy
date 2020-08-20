<template>
	<view class="edit_box">
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<block slot="content">个人资料</block>
		</cu-custom>
		<view class="refund_head">
			<view class="apply_bg">

			</view>

			<view class="apply_msg">
				<view class="msg_row" @click="chooseImg()">
					<text class="title">头像</text>
					<input type="text" disabled="true" />
					<image class="user_img" :src="avatar" mode=""></image>
					<image class="arrow" src="../../static/details/arrow.png" mode=""></image>
				</view>
				<view class="msg_row">
					<text class="title">昵称</text>
					<input type="text" v-model="nickname" placeholder="请输入昵称" />
					<image class="arrow" src="../../static/details/arrow.png" mode=""></image>
				</view>
				<view class="msg_row">
					<text class="title">个人介绍</text>
					<input type="text" maxlength="20" v-model="synopsis" placeholder="请输入个人简介20字以内" />
				

				</view>
			</view>


			<view class="apply_msg">
				<view class="msg_row">
					<text class="title">姓名</text>
					<input type="text" v-model="name" placeholder="请输入姓名" />
				
				</view>
				<view class="msg_row">
					<text class="title">性别</text>
					<input type="text" @click="showGender()" v-model="gender" disabled="true" placeholder="请选择性别" />
					<image class="arrow" src="../../static/details/arrow.png" mode=""></image>
				</view>
				<view class="msg_row">
					<text class="title">我的手机</text>
					<input type="text" v-model="telephone" placeholder="请输入手机号码" />
				
				</view>
			</view>

		</view>
		<view class="reason_list" v-if="isSHow == true">
			<view class="reason_bg" @click="showGender()">
			</view>
			<view class="reason_row">
				<view class="gender" @click="chooseGender('男')">
					男
				</view>
				<view class="gender" @click="chooseGender('女')">
					女
				</view>
				<view class="gender gender_btn" @click="showGender()">
					取消
				</view>
			</view>
		</view>
		<view class="foot_btn">
			<text @click="saveEdit()">保存</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				imgHttp:'',
				isSHow: false,
				userObj: '',
				avatar:'',//用户头像
				avatarUpdate:'',
				nickname: '', //用户昵称
				synopsis: '', //个人简介
				name: '', //用户名
				gender: '', //性别
				telephone:'',//电话
			}
		},
		methods: {
			//更换头像
			chooseImg() {
                let self = this;
				uni.chooseImage({
					count: 1,
					sizeType: ['original', 'compressed'], 
					sourceType: ['album', 'camera'], 
				    success: (chooseImageRes) => {
				        const tempFilePaths = chooseImageRes.tempFilePaths;
						wx.showLoading("头像上传中")
				        uni.uploadFile({
				            url: self.comHttp + '/CMS/imgUpload/Upload', 
				            filePath: tempFilePaths[0],
				            name: 'file',
				            formData: {
				                'user': 'test'
				            },
				            success: (uploadFileRes) => {
								self.hint("头像上传成功")
								self.avatar = self.imgHttp + JSON.parse(uploadFileRes.data).src;
								self.avatarUpdate = JSON.parse(uploadFileRes.data).src;
								console.log(self.avatar)
				            },
							fail:()=>{
								self.hint("头像上传失败，请重新上传")
							}
				        });
				    }
				});
			},
			//显示性别
			showGender() {
				this.isSHow = !this.isSHow;
			},
			//选择性别
			chooseGender(gender) {
				this.gender = gender;
				this.showGender()
			},

			//保存提交
			saveEdit(){
				let self = this;
				if(this.telephone != '' &&  !(/^1[3456789]\d{9}$/.test(this.telephone))){ 
				        this.hint("手机号码格式不正确");  
				        return false; 
				  } 
				
				
				let data = {
					token:uni.getStorageSync('token'),
					userid: uni.getStorageSync('customer').userid,
					avatar: this.avatarUpdate,
					nickname: this.nickname, 
					synopsis: this.synopsis, 
					name: this.name, 
					gender: this.gender, 
					telephone: this.telephone,
				};
				this.ask("/app/me/personalSeting",'POST',data,function(res){
					console.log(res)
					let data2 = {
						"token":uni.getStorageSync('token'),
						"userid":uni.getStorageSync('customer').userid,
					}
					self.ask('/app/userLogin/refreshUserInfo',"POST",data2,function(res){
						if(res.data.userInfo.avatar.indexOf('http') == -1){
							res.data.userInfo.avatar = self.comHttp + res.data.userInfo.avatar; 
						}
						uni.setStorageSync("customer",res.data.userInfo);
						self.hint('修改成功')
						uni.navigateBack({
							delta:1
						})
					})
				})
			}
		},
		onLoad() {
			this.imgHttp = this.comHttp;
			this.userObj = uni.getStorageSync('customer');
			this.avatar = this.userObj.avatar;
			this.avatarUpdate = this.userObj.avatar;
			this.nickname = decodeURIComponent(this.userObj.nickname);
			this.synopsis = this.userObj.synopsis == 'null' ? '' : this.userObj.synopsis;
			this.name =  this.userObj.username;
			this.gender =  this.userObj.gender == 'null' ? '' : this.userObj.gender;
			this.telephone = this.userObj.telephone;
			
		}
	}
</script>

<style lang="scss">
	@import "./order_refund.scss";
	@import './apply_distribution.scss';

	.apply_msg .msg_row input {
		text-align: right;
	}

	.user_img {
		min-width: 80rpx;
		width: 80rpx;
		height: 80rpx;
		border-radius: 50%;

	}
	.apply_msg .msg_row .title {
		font-weight: bold;
		font-size: 26rpx;
	}
	.apply_msg .msg_row .arrow {
		margin-left: 12rpx;
	}
	.reason_list .reason_row {
		height: 320rpx;
		background-color: #E0E0E0;
	}

	.reason_row .gender {
		width: 100%;
		padding: 30rpx 0;
		display: flex;
		justify-content: center;
		align-items: center;
		color: #333;
		background-color: #fff;
	}

	.reason_row .gender_btn {
		margin-top: 20rpx;
	}

	.reason_row .gender:first-child {
		border-bottom: 1rpx solid #E0E0E0;
	}
</style>

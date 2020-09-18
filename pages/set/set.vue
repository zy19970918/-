<template>
	<view class="content" style="padding: 0 20rpx;">
		<view class="item">
			<view class="item_left">
				<view class="" style="color: #ffffff; font-size: 36rpx;">{{bank.wxNickname}}</view>
				<view class="" style="font-size: 30rpx; color: #FFFFFF;">{{bank.bankName}}</view>
				<view class="" style="color: #ffffff; font-size: 36rpx;">卡号:<text style="margin-left: 16rpx;">{{bank.bankNum}}</text></view>
			</view>
			<view class="" style="display: flex; flex-direction: column; justify-content: space-between;">
				<view class="" style="color: #ffffff; font-size: 30rpx;" @tap="visible=true">更改</view>
			</view>
		</view>
		<e-modal :visible.sync="visible" @cancel="handleCancel">
			<view class="modal-container">
				<view class="modal-container_content" style="white-space: nowrap;">
					<label>姓名&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&ensp;:</label><input v-model="name" type="text" value="" />
				</view>
				<view class="modal-container_content">
					<label style="white-space: nowrap;">银行&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&ensp;:</label><input v-model="bankName" type="text" value="" />
				</view>
				<view class="modal-container_content">
					<label style="text-align: left;white-space: nowrap ">银行卡号:</label><input v-model="bankNum" type="text" value="" />
				</view>
				<button type="primary" size="mini" @tap="toBankdetail" style="margin-top: 25rpx; width: 454rpx; height: 77rpx; line-height: 77rpx;border-radius: 30rpx;">确定</button>
			</view>
		</e-modal>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				flag:true,
				visible: false,
				bank:'',
				bankName:'',
				bankNum:'',
				name:''
			}
		},
		methods: {
			add() {
				this.flag=!this.flag
			},
			open(){
			         this.$refs.popup.open()
			},
			look() {
				var userid=uni.getStorageSync('userId')
				this.$http.postRequest('/user/queryBank',{userId:userid.userId}).then(res=>{this.bank=res})
			},
			handleCancel() {
				console.log('modal关闭')
			},
			toBankdetail() {
				if(this.bankName.length==0||this.bankNum.length==0||this.name.length==0) {
					uni.showToast({
						title:"所有选项为必填项",
						icon:'none'
					})
					return false
				}
				var pattern=/^([1-9]{1})(\d{14}|\d{18})$/
				var str=this.bankNum.replace(/\s+/g, "")
				if(!pattern.test(str)) {
					uni.showToast({
						title:"请正确输入银行卡号",
						icon:'none'
					})
					return false
				}
				var that=this
				var userid=uni.getStorageSync('userId')
				that.$http.postRequest('/user/queryBankData',{bankName:that.bankName,bankNum:that.bankNum,wxNickname:that.name,userId:userid.userId}).then(res=>{
					if(res.code==1) {
						uni.showToast({
							title:'更改成功',
							success() {
								that.look()
							}
						})
						that.visible=false
					}
				}) //添加银行卡
			}
		},
		onLoad() {
			this.look()
		}
	}
</script>

<style scoped lang="scss">
	.item{
		display: flex;
		justify-content: space-around;
		box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.15);
		border-radius: 20px;
		padding: 20rpx;
		margin-top: 20rpx;
		background: #C8460D;
	}
	.modal-container {
		padding: 20rpx;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	
	.modal-container_title {
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 45rpx;
	}
	
	.modal-container_content {
		display: flex;
		justify-content: space-between;
		margin-top: 29rpx;
	}
	label {
		   float: left;
		   line-height: 54rpx;
	}
	.modal-container>* {
		margin: 20rpx 0;
	}
	input{
		   background: #CCCCCC;
		   float:  right;
		   border-radius: 10rpx;
		   margin-left: 10rpx;
		   height: 54rpx;
	}
</style>

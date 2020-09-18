<template>
	<view>
		<view class="">
			<view class="" style="display: flex; justify-content: center;align-items: center;">
				<image src="../../static/imgs/wx_20200903192005.png" style="height: 213rpx; width: 213rpx;" mode="" @tap="visible=true"></image>
			</view>
			<view class="" style="text-align: center;">
				添加银行卡
			</view>
				<e-modal :visible.sync="visible" @cancel="handleCancel">
					<view class="modal-container">
						<view class="modal-container_content" style="white-space: nowrap;">
							<label style="white-space: nowrap;">姓名&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&ensp;:</label><input v-model="name" type="text" value="" />
						</view>
						<view class="modal-container_content">
							<label style="white-space: nowrap;">银行&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&ensp;:</label><input v-model="bankName" type="text" value="" />
						</view>
						<view class="modal-container_content">
							<label style="text-align: left; white-space: nowrap;">银行卡号:</label><input v-model="bankNum" type="text" value="" />
						</view>
						<button type="primary" size="mini" @tap="toBankdetail" style="margin-top: 25rpx; width: 454rpx; height: 77rpx; line-height: 77rpx;border-radius: 30rpx;">确定</button>
					</view>
				</e-modal>
		</view>
	</view>
</template>

<script>

	export default {
		data() {
			return {
				visible: false,
				bankName:'',
				bankNum:'',
				name:''
			}
		},
		methods: {
			 open(){
			     this.$refs.popup.open()
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
				this.$http.postRequest('/user/queryBankData',{bankName:that.bankName,bankNum:that.bankNum,wxNickname:that.name,userId:userid.userId}).then(res=>{
					if(res.code==1) {
						console.log(userid)
						userid.isNew=0
						uni.setStorageSync('userId',userid)
						that.agreeContent=res.agreeContent;
						uni.navigateTo({
							url:'../set/set'
						})
					}
				}) //添加银行卡
				
			}
		},
		components:{
			
		}
	}
</script>

<style>
   page {
	   height: 100%;
	   display: flex;
	   justify-content: center;
	   flex-direction: column;
	   align-items: center;
   }
   .content{
	   height: 485rpx;
	   width:600rpx;
	   border: 2px solid red;
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

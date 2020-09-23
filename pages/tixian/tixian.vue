<template>
	<view>
		<view class="" style=" width: 717rpx; margin: 0 auto; margin-top: 27rpx; border-radius: 20px; box-shadow: 0 0 5px #666; padding-bottom: 20rpx ;">
			<view class="top">
				<view class="">{{bank.name}}</view>
				<view class="">{{bank.bankName}}</view>
				<view class="" style="font-size: 36rpx;">卡号:<text style="margin-left:20rpx;">{{bank.bankNum}}</text></view>
			</view>
			<view class="" style="padding-left: 47rpx; font-size: 38rpx; margin-top: 20rpx;">
				提现金额
			</view>
			<view class="" style="padding: 0 47rpx; margin-top: 10rpx;">
				<input placeholder="￥" type="number" style="height: 80rpx;" v-model="money" value="" />
				<view class="" style="font-size: 26rpx; color: rgb(178,178,178); margin-top: 10rpx;">
					达到{{miniMoney}}元可提现
				</view>
			</view>
			<view class="" style="display: flex; justify-content: center; align-items: center; margin-top: 25rpx;">
				<button type="primary" size="mini" @click="Withdrawal()" style="width: 454rpx; height: 77rpx; line-height: 77rpx;border-radius: 30rpx;">提现</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				bank: '', //提现银行卡信息
				money:'',
				miniMoney:'' //提现标准
			}
		},
		methods: {
			Withdrawal() {
				var that = this
				if (that.money.length==0) {
					uni.showToast({
						title:"请输入提现金额",
						icon:'none'
					})
					return
				}
				var reg = new RegExp("^[0-9]*$");
				if (!reg.test(that.money)) {
					uni.showToast({
						title: "请输入数字",
						icon:'none'
					})
					return
				}
				if (that.bank.money<that.miniMoney) {
					uni.showToast({
						title: "不满足提现条件",
						icon: 'none'
					})
					return false
				}
				if (parseInt(that.money)>parseInt(that.bank.money)) {
					uni.showToast({
						title: "不满足提现条件",
						icon: 'none'
					})
					return false
				}
				var userid = uni.getStorageSync('userId')
				var openid = uni.getStorageSync('openid')
				uni.request({
					header: {
						'content-type': 'application/x-www-form-urlencoded'
					},
					method:'POST',
					url:"https://www.xn--4gqr6isbv1bn21d.com/api/pay/payTakeMoney",
					data:{
						openid:openid,
						userId:userid.userId,
						money:that.money
					},
					success(res) {
						if(res.data.status==200) {
							uni.showToast({
								title:"提现成功",
								success() {
									setTimeout(function () {
										uni.navigateBack({
											delta:1
										})
									},1000)
								}
							})
						}
					}
				})
			}
		},
		onLoad(options) {
			this.bank = options
			this.miniMoney=uni.getStorageSync('miniMoney')
		}
	}
</script>

<style scoped lang="scss">
	.top {
		color: #FFFFFF;
		font-size: 34rpx;
		padding-left: 47rpx;
		background-color: rgb(200, 70, 13);
		margin-top: 20rpx;
		border-top-right-radius: 20px;
		border-top-left-radius: 20px;
		padding: 40rpx 47rpx;
	}
</style>

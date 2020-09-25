<template>
	<view>
		<view class="auth">
			<image src="https://img03.sogoucdn.com/v2/thumb/resize/w/100/h/100?appid=100520147&url=http%3A%2F%2Fdl.app.sogou.com%2Fpc_logo%2F4669602030091557924.png"
			 class="img" mode="aspectFill"></image>
			<!-- 		<view class="title">微信授权页面</view> -->
			<view class="describe">点击下方按钮进行手机号码授权</view>
			<button class="btn" open-type='getPhoneNumber' wx:if="canIUse" @getphonenumber="onGetPhoneNumber">点击手机号码授权</button>
		</view>
	</view>
</template>

<script>
	var appId = 'wxd26f46560a42f999'
	export default {
		data() {
			return {
				iv: '',
				encryptedData: ''
			}
		},
		methods: {
			onGetPhoneNumber(e) {
				var that = this
				that.encryptedData = e.detail.encryptedData
				that.iv = e.detail.iv
				wx.checkSession({
					success: function() {
						that.wxadd()
						console.log("有效")
					},
					fail: function() {
						// session_key 已经失效，需要重新执行登录流程
						uni.reLaunch({
							url: '../login/login'
						}) //重新登录
					}
				})

			},
			wxadd(pho) {
				var that = this
				uni.setStorageSync('flag', true)
				const scene = uni.getStorageSync('scene')
				const sessionKey = uni.getStorageSync('session_key')
				const nickName = uni.getStorageSync('userInfo').nickName
				const picture = uni.getStorageSync('userInfo').avatarUrl
				const phone = "11011011011"
				const wxProvince = uni.getStorageSync('userInfo').province
				const wxCity = uni.getStorageSync('userInfo').city
				const wxOpenId = uni.getStorageSync('openid')
				if (scene) {
					uni.request({
						url: "https://www.xn--4gqr6isbv1bn21d.com/api/user/save",
						method: 'POST',
						header: {
							"Content-Type": "application/json"
						},
						data: {
							wxNickname: nickName,
							wxPicture: picture,
							phone: pho,
							wxProvince: wxProvince,
							wxCity: wxCity,
							openid: wxOpenId,
							picture: picture,
							sessionKey: sessionKey,
							iv: that.iv,
							encryptedData: that.encryptedData,
							userId: scene,
							scanCode: 1
						},
						success(res) {
							console.log(res)
							console.log("成功")
							if (res.data.data.code == 0) {
								uni.showToast({
									title: "一级用户不可再分销!",
									icon: 'none'
								})
								uni.setStorageSync('flag', true)
								uni.setStorageSync('userId', res.data.data.us1)
							} else {
								uni.setStorageSync('flag', true)
								uni.setStorageSync('userId', res.data.data.user)
							}
							setTimeout(function() {
								uni.reLaunch({
									url: '../index/index'
								})
							}, 1000)
						}
					})
				} else {
					uni.request({
						url: "https://www.xn--4gqr6isbv1bn21d.com/api/user/save",
						method: 'POST',
						header: {
							"Content-Type": "application/json"
						},
						data: {
							wxNickname: nickName,
							wxPicture: picture,
							phone: pho,
							wxProvince: wxProvince,
							wxCity: wxCity,
							openid: wxOpenId,
							picture: picture,
							sessionKey: sessionKey,
							iv: that.iv,
							encryptedData: that.encryptedData,
						},
						success(res) {
							console.log(res)
							console.log("成功")
							if (res.data.status == 200) {
								uni.setStorageSync('flag', true)
								uni.setStorageSync('userId', res.data.data.user)
							}
							uni.reLaunch({
								url: '../index/index'
							})
						}
					})
				}
			}
		}
	}
</script>
<style>
	page {
		height: 100%;
		display: table;
	}
</style>
<style scoped lang="scss">
	/* 开始 */
	.auth {
		margin-top: 0;
		text-align: center;
		display: table-cell;
		flex-direction: column;
		flex-wrap: wrap;
		justify-content: center;
		align-items: flex-start;
		padding: 100rpx;
		vertical-align: middle;
	}

	.img {
		margin: 0 0 60rpx;
		display: inline-block;
		width: 200rpx;
		height: 200rpx;
		line-height: 0;
	}

	.title {
		display: inline-block;
		width: 100%;
		margin: 0 0 60rpx;
	}

	.describe {
		color: #a7aaa9;
		font-size: 26rpx;
		margin: 0 0 60rpx;
		border-radius: 50%;
		text-align: center;
		display: inline-block;
		width: 100%;
	}

	.btn {
		padding: 0 60rpx;
		background-color: #19be6b;
		margin: 20rpx 0 200rpx;
		text-align: center;
		vertical-align: middle;
		touch-action: manipulation;
		cursor: pointer;
		background-image: none;
		white-space: nowrap;
		user-select: none;
		font-size: 14px;
		border: 0 !important;
		position: relative;
		text-decoration: none;
		height: 44px;
		line-height: 44px;
		box-shadow: inset 0 0 0 1px #19be6b;
		background: #fff !important;
		color: #19be6b !important;
		display: inline-block;
		border-radius: 10rpx;
	}
</style>

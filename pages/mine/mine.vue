<template>
	<view>
		<view class="top_bar">
			<view class="" style="text-align: center; display: flex; justify-content: center; align-items: center;" @click="tominmation">
				<image style="height: 124rpx; width: 124rpx; border-radius: 50%;" :src="mations.avatarUrl" mode="aspectFit"></image>
				<view class="" style="color: #FFFFFF; font-size: 30rpx; margin-left: 30rpx;">
					{{mations.nickName}}
				</view>
			</view>
		</view>
		<view class="tips">
			<view class="" style="border-right: 2rpx solid #F5F5F5;">
				<view class="">
					剩余次数
				</view>
				<text>{{my.msg.browseCount?my.msg.browseCount:0}}次</text>
			</view>
			<view class="">
				<view class="">
					到期时间
				</view>
				<text>{{my.msg.payTimeStr?my.msg.payTimeStr:0}}</text>
			</view>
		</view>
		<view class="footer">
			<view class="tooterbar" @click="tomyguanzhu">
				<image src="../../static/imgs/icon_guanzhu2.png" style="width: 100rpx; height: 76rpx;" mode="aspectFit"></image>
				<view class="">
					我的关注
				</view>
			</view>
			<view class="tooterbar" @click="toti">
				<image src="../../static/imgs/icon_qinglihuancun2.png" style="height: 76rpx; width: 76rpx;" mode="aspectFit"></image>
				<view class="">
					提现设置
				</view>
			</view>
		</view>
		<view class="footer">
			<view class="tooterbar">
				
				<button open-type="contact" type="default" style=""><image src="../../static/imgs/icon_kefu.png" style="height: 76rpx; width: 76rpx;" mode="aspectFit"></image><view class=""><text>我的客服</text></view></button>
			</view>
			<view class="tooterbar" @click="tomydetail">
				<image src="../../static/imgs/wx_20200902130731.png" style="height: 76rpx; width: 76rpx;" mode="aspectFit"></image>
				<button type="default" style="max-height: 40rpx;">招工海报</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				my: "",
				mations: ""

			}
		},
		methods: {
			tominmation() {
				uni.navigateTo({
					url: '../mymation/mymation'
				})
			},
			getmymation() {
				var userid = uni.getStorageSync('userId')
				console.log(userid)
				console.log(userid)
				this.$http.postRequest('/user/queryCountAndTime', {
					userId: userid.userId
				}).then(res => {
					this.my = res
				}) //获取我的剩余信息
			},
			tomyguanzhu() {
				uni.navigateTo({
					url: '../My_concerns/My_concerns'
				})
			},
			tomydetail() {
				uni.navigateTo({
					url: '../mymation/mymation'
				})
			},
			toti() {
				var userid = uni.getStorageSync('userId')
				if (userid.isNew == 1) {
					uni.navigateTo({
						url: '../addBank/addBank'
					})
				}
				if (userid.isNew == 0) {
					uni.navigateTo({
						url: '../set/set'
					})
				}
			}
		},
		onShow() {
			this.getmymation()
			var that = this
			wx.getUserInfo({
				success(res) {
					that.mations = res.userInfo
				}
			})
		}
	}
</script>

<style scoped lang="scss">
	.top_bar {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 242rpx;
		background-color: #C8460E;
	}

	.footer {
		display: flex;
		justify-content: space-around;
		align-items: center;
		margin-top: 68rpx;
	}

	.tooterbar {
		font-size: 30rpx;
		color: #282828;
		max-width: 121rpx;
		text-align: center;
	}

	button {
		background-color: #FFFFFF;
		padding: 0;
		height: 100%;
		margin: 0;
		line-height: 40rpx;
		font-size: 30rpx;
		min-height: 0;
		/* 默认自带最小高度为40px  设置小于40px式不生效需要先清空默认的最小高度再设置高度*/
	}

	input {
		outline: none;
		border: none;
		list-style: none;
	}

	/*我们可以使用::after的方式去覆盖默认值*/
	button::after {
		border: none;
	}

	.tips {
		width: 710rpx;
		height: 116rpx;
		padding-top: 30rpx;
		background-color: #FFFFFF;
		box-shadow: 1px 4px 8px 0px rgba(36, 15, 15, 0.38);
		border-radius: 20rpx;
		margin: 0 auto;
		margin-top: -33rpx;
		display: flex;
		justify-content: space-around;
		text-align: center;

		view {
			width: 100%;
			text-align: center;
			font-size: 30rpx;
			color: #343434;
		}

		text {
			color: #C8460E;
		}
	}
</style>

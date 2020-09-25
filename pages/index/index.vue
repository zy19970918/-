<template>
	<view class="">
		<video :src="video" style="width: 100%;height:340rpx;" poster="http://m.qpic.cn/psc?/V11EtE3S2awPyr/bqQfVz5yrrGYSXMvKr.cqY19dadW6L0nfwBG0UPSIeyYqiywE68MpAK7JKHGBqFKeiFsM276jzUyfcLCJwmV9CbAoY4J6K4TgBNm8o8i8r4!/b&bo=xAg4BAAAAAABB9A!&rf=viewer_4"
		 autoplay controls show-progress object-fit="fill"></video>
		<view class="text_bar">
			<view class="imag_logo">
				<image src="../../static/imgs/gonggaolan_.png" style="height: 33rpx; width: 84rpx;" mode="aspectFit"></image>
			</view>
			<view class="text_jie">
				{{noticeContent}}
			</view>
		</view>
		<view class="scoll">
			<uni-notice-bar showIcon="true" scrollable="true" single="true" :text="rollContent"></uni-notice-bar>
		</view>
		<view class="footer" style="min-height:560rpx; position: relative;">
			<view class="imag_logo">
				<image src="../../static/imgs/lauwtongxun.png" style="height: 33rpx; width: 144rpx;" mode="aspectFit"></image>
				<!-- <view class="" style="">
					<button @click="eq" style="height:43rpx; width:126rpx; text-align: center; line-height: 43rpx;background-color: none; background: none;border: 1px solid #be8e58; color: #666666; font-size: 20rpx; padding: 0;">进入圈子</button>
				</view> -->
			</view>
			<view class="" style="margin-top:15rpx;">
				<mSearch style="display: inline-block;" @changes="change"></mSearch>
				<view class="contry" style="display: inline-block;">
					<view class="city" @click="eq"  style="display: inline-block; width: 100%; font-size: 30rpx; color: #333; text-align: center;">
						{{city?city:'选择地区'}}
					</view>
					<!-- <text style="margin-left: 10rpx;">{{city}}</text> -->
				</view>
			</view>
			<view class="tr bg-w" style="margin-top: 10rpx;">
				<view class="th" style="width: 16%;">头像</view>
				<view class="th" style="width: 20%;">公司</view>
				<view class="th" style="width: 13%;">姓名</view>
				<view class="th" style="width: 24%;">地址</view>
				<view class="th" style="width: 27%;">操作</view>
			</view>
			<scroll-view scroll-y="true" style="max-height: 360rpx;">
				<view>
					<view class="table">
						<block v-for="(item,index) in list" :key="index">
							<view class="tr bg-g" style="margin-top: 8rpx;">
								<view class="td" style="width: 16%;">
									<image style="width:66rpx; height:66rpx;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;" :src="item.isUser==0?'https://www.xn--4gqr6isbv1bn21d.com'+item.wxQcode:item.wxPicture"
									 mode="aspectFit"></image>
								</view>
								<view class="td" style="width: 20%; font-size: 26rpx; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">{{item.companyName}}</view>
								<view class="td" style="width: 13%; font-size: 26rpx;  white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">{{item.name}}</view>
								<view class="td" style="width: 24%; font-size: 26rpx;  white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">{{item.city}}</view>
								<view class="td" style="display: flex; justify-content: space-around; width: 27%;">
									<view class="" style="display: flex; flex-direction: column; align-items: center;" @click="guanzhu(item)">
										<image src="../../static/imgs/icon_yiguanzhu.png" v-if="item.focusData==1" mode="aspectFit" style="height: 36rpx; width: 32rpx;"></image>
										<image src="../../static/imgs/icon_guanzhulaowu.png" v-else mode="aspectFit" style="height: 36rpx; width: 32rpx;"></image>
										<text style="font-size: 24rpx; min-width: 66rpx;">{{item.focusData==1?'已关注':'关注'}}</text>
									</view>
									<view class="" style="display: flex; flex-direction: column; align-items: center;" @click="toDetail(item.companyId)">
										<image src="../../static/imgs/icon_xiangqinglaowu.png" mode="aspectFit" style="height: 36rpx; width: 32rpx;"></image>
										<text style="font-size: 24rpx;">详情</text>
									</view>
								</view>
							</view>
						</block>
					</view>
					<!-- <view class="" style="height: 100%; width: 100%;" v-else>
						<image src="../../static/imgs/wx_20200922005300.jpg" @click="eq()" style="height: 603rpx; width: 710rpx;" mode="scaleToFill"></image>
					</view> -->
				</view>
			</scroll-view>
			<view class="" style="position: fixed; bottom: 0; width: 100%;">
				<button @click="eq" style="background-color: red;">点击进入圈子</button>
			</view>
		</view>
		<e-modal :visible.sync="visible" @cancel="handleCancel">
			<view class="" style="padding: 0 20rpx; padding-bottom: 16rpx;">
				<view class="title" style="text-align: center; font-weight: 800; font-size: 32rpx;">
					付款协议
				</view>
				<scroll-view scroll-y="true" style="height: 800rpx;">
					<view class="text_content" style="text-indent: 2em; font-size: 26rpx; text-align:left; padding-bottom: 20rpx; margin-top: 20rpx;"
					 v-html="agreeContent"></view>
				</scroll-view>
				<view class="title" style="text-align: center; font-weight: 800; font-size: 32rpx; margin-top: 10rpx; display: flex; justify-content: space-around;">
					<button type="primary" size="mini" style="width: 200rpx; border-radius: 5rpx;" @click="pay" :disabled="flagss"><text
						 v-if="time!=0">同意({{time}})</text><text v-if="time==0">同意</text></button><button type="warn" style="background: #e64340;border-radius: 5rpx; width: 200rpx;"
					 size="mini" @tap="cancel">取消</button>
				</view>
			</view>
			<!-- <button type="primary" size="mini" @tap="toBankdetail" style="margin-top: 25rpx; width: 454rpx; height: 77rpx; line-height: 77rpx;border-radius: 30rpx;">确定</button> -->
		</e-modal>
	</view>
</template>

<script>
	import mSearch from '@/components/mehaotian-search-revision/mehaotian-search-revision.vue';
	import uniNoticeBar from '@/components/uni-notice-bar/uni-notice-bar.vue'
	export default {
		data() {
			return {
				rollContent: "",
				flag: false,
				video: '',
				noticeContent: '',
				list: [],
				number: [],
				flag: true,
				visible: false,
				agreeContent: '', //协议
				time: '',
				flag: false,
				studus: '',
				time: '',
				flagss: true,
				timer: null,
				cont: false,
				money: '', //支付的ji金钱
				data: [{
					name: '一手天下',
					id: "001",
					"age": "20"
				}]
			}
		},
		methods: {
			cancel() {
				clearInterval(this.timer)
				this.visible = false
			},
			getXieyi() {
				this.$http.postRequest('/agree/query').then(res => {
					this.agreeContent = res.agreeContent;
				})
			},
			handleCancel() {
				console.log('modal关闭')
			},
			change() {
				this.eq()
			},
			pay() {
				var that = this
				var userid = uni.getStorageSync('userId')
				var openid = uni.getStorageSync('openid')
				uni.request({
					header: {
						'content-type': 'application/x-www-form-urlencoded'
					},
					url: 'https://www.xn--4gqr6isbv1bn21d.com/api/pay/payMoney',
					method: 'POST',
					data: {
						userId: userid.userId,
						money: that.money.standMoney,
						openid: openid
					},
					success(res) {
						console.log(res)
						if(res.data.data.data==0) {
							uni.showToast({
								title:"请先登录",
								icon:'none'
							})
							setTimeout(function () {
								uni.navigateTo({
									url:'../login/login'
								})
							},1000)
						}
						wx.requestPayment({
							timeStamp: res.data.data.timeStamp,
							nonceStr: res.data.data.nonceStr,
							package: res.data.data.package,
							signType: 'MD5',
							paySign: res.data.data.paySign,
							fail(err) {
								console.log(err)
							},
							success(res) {
								that.visible = false
								that.getmymation('flag')
							}
						})
					}
				})
			},
			getmoney() {
				this.$http.postRequest('/user/queryMoney').then(res => {
					this.money = res
					uni.setStorageSync('miniMoney', res.miniMoney)
				})
			},
			toDetail(item) {
				var that = this
				var flag = uni.getStorageSync('flag')
				var userInfo = uni.getStorageSync('userInfo')
				wx.getSetting({
					success: res => {
						if (res.authSetting['scope.userInfo']) {
							//已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
							if (!flag) {
								uni.redirectTo({
									url: '../login/login'
								})
							} else {
								if (that.cont == false) {
									uni.showModal({
										title: "加入我们后，可查看更多，并使用功能!",
										content: `支付${that.money.standMoney}元，加入我们!`,
										cancelText: "暂不加入",
										confirmText: "申请加入",
										success(res) {
											if (res.confirm) {
												that.ADD()
											} else {
												console.log("取消")
											}
										}
									})
									return false
								}
								var companyId = uni.getStorageSync('companyId')
								if (!companyId) {
									uni.navigateTo({
										url: '../mymation/mymation'
									})

									return false
								}
								uni.navigateTo({
									url: `../detail/detail?companyId=${item}`
								})
							}
						} else {
							console.log("未授权")
							// 未授权，跳转到授权页面							
							wx.redirectTo({
								url: "../login/login"
							})
						}
					}
				})


			},
			getuserInfo() { //授权
				var flag = uni.getStorageSync('flag')
				var userInfo = uni.getStorageSync('userInfo')
				wx.getSetting({
					success: res => {
						if (res.authSetting['scope.userInfo']) {
							//已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
							if (!flag) {
								uni.redirectTo({
									url: '../login/login'
								})
							}
						} else {
							console.log("未授权")
							// 未授权，跳转到授权页面							
							wx.redirectTo({
								url: "../login/login"
							})
						}
					}
				})
			},
			getmymation(item) {
				var userid = uni.getStorageSync('userId')
				if(userid) {
					this.$http.postRequest('/user/queryCountAndTime', {
						userId: userid.userId
					}).then(res => {
						var time1 = new Date(`${res.msg.payTimeStr}`);
						var time2 = new Date();
						if (!res.msg.payTimeStr && !res.msg.browseCount) {
							uni.showToast({
								title: "你还不是会员",
								icon: 'none'
							})
							this.cont = false
							return false
						} else {
							this.cont = true
						}
						if (time1.getTime() <= time2.getTime()) {
							uni.showToast({
								title: "会员已到期",
								icon: 'none'
							})
							this.cont = false
							return false
						} else {
							this.cont = true
						} //到期时间
						if (item) {
							uni.navigateTo({
								url: '../mymation/mymation'
							})
						}
					}) //获取我的剩余信息
				}else {
					uni.showToast({
						title:"请先登录!",
						icon:'none'
					})
				}
			},
			eq() {
				var that = this
				var flag = uni.getStorageSync('flag')
				var userInfo = uni.getStorageSync('userInfo')
				wx.getSetting({
					success: res => {
						if (res.authSetting['scope.userInfo']) {
							//已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
							if (!flag) {
								uni.redirectTo({
									url: '../login/login'
								})
							} else {
								var companyId = uni.getStorageSync('companyId')
								if (that.cont == false) {
									uni.showModal({
										title: "加入我们后，可查看更多，并使用功能!",
										content: `支付${that.money.standMoney}元,加入我们!`,
										cancelText: "暂不加入",
										confirmText: "申请加入",
										success(res) {
											if (res.confirm) {
												that.ADD()
											} else {
												uni.showToast({
													title: "取消支付",
													icon: "none"
												})
											}
										}
									})
									return false
								} else if (!companyId) {
									uni.navigateTo({
										url: '../mymation/mymation'
									})
								} else {
									uni.navigateTo({
										url: "../Service_address_book/Service_address_book"
									})
								}
							}
						} else {
							console.log("未授权")
							// 未授权，跳转到授权页面							
							wx.redirectTo({
								url: "../login/login"
							})
						}
					}
				})

				// var companyId = uni.getStorageSync('companyId')
				// var that = this
				// that.getuserInfo()
				// if (that.cont == false) {
				// 	uni.showModal({
				// 		title: "加入我们后，可查看更多，并使用功能!",
				// 		content: `支付${that.money.standMoney}元，开通${that.money.months}个月会员,可浏览${that.money.browseCount}条信息!`,
				// 		cancelText: "暂不加入",
				// 		confirmText: "申请加入",
				// 		success(res) {
				// 			if (res.confirm) {
				// 				that.ADD()
				// 			} else {
				// 				uni.showToast({
				// 					title: "取消支付",
				// 					icon: "none"
				// 				})
				// 			}
				// 		}
				// 	})
				// 	return false
				// } else if (!companyId) {
				// 	uni.navigateTo({
				// 		url: '../mymation/mymation'
				// 	})
				// } else {
				// 	uni.navigateTo({
				// 		url: "../Service_address_book/Service_address_book"
				// 	})
				// }
			},
			ADD() {
				var that = this
				that.time = 5
				// var timer=''
				that.flagss = true
				if (that.cont == false) {
					that.visible = true
					clearInterval(that.timer)
					that.timer = setInterval(function() {
						--that.time
						// that.times=time
						if (that.time <= 0) {
							that.time = ''
							that.flagss = false
							clearInterval(that.timer)
						}
					}, 1000);

				}
			},
			getIndeinfo() {
				this.list = []
				var companyId = uni.getStorageSync('companyId')
				var userid = uni.getStorageSync('userId')
				this.$http.postRequest('/company/query', {
					userId: userid.userId,
				}).then(res => {
					console.log(res[7])
					this.list=res
				})
				this.$http.postRequest('/notice/query').then(res => {
					this.noticeContent = res.noticeContent
				})
				this.$http.postRequest('/roll/query').then(res => {
					this.rollContent = res.rollContent
				}) //滚动
				this.$http.postRequest('/banner/queryVedio').then(res => {
					this.video = res.view
				}) //
			},
			guanzhu(item) { //关注
				var that = this
				var flag = uni.getStorageSync('flag')
				var userInfo = uni.getStorageSync('userInfo')
				wx.getSetting({
					success: res => {
						if (res.authSetting['scope.userInfo']) {
							//已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
							if (!flag) {
								uni.redirectTo({
									url: '../login/login'
								})
							} else {
								var companyId = uni.getStorageSync('companyId')
								if (that.cont == false) {
									uni.showModal({
										title: "加入我们后，可查看更多，并使用功能!",
										content: `支付${that.money.standMoney}元，加入我们!`,
										cancelText: "暂不加入",
										confirmText: "申请加入",
										success(res) {
											if (res.confirm) {
												that.ADD()
											} else {
												uni.showToast({
													title: "取消支付",
													icon: "none"
												})
											}
										}
									})
									return false
								}
								if (!companyId) {
									uni.navigateTo({
										url: '../mymation/mymation'
									})

									return false
								}
								var userid = uni.getStorageSync('userId')
								this.$http.postRequest('/company/edit', {
									companyId: item.companyId,
									userId: userid.userId,
									focusData: item.focusData
								}).then(res => {
									if (res.msg == 1) {
										uni.showToast({
											title: "关注成功",
											success() {
												item.focusData = 1
											}
										})
									}
									if (res.msg == 0) {
										uni.showToast({
											title: "取消关注",
											success() {
												item.focusData = 0
											}
										})
									}
								}) //
							}
						} else {
							console.log("未授权")
							// 未授权，跳转到授权页面							
							wx.redirectTo({
								url: "../login/login"
							})
						}
					}
				})


			}
		},
		components: {
			uniNoticeBar,
			mSearch
		},
		onLoad(options) {
			if (options.scene) {
				uni.setStorageSync('scene', options.scene)
			}
			this.getmoney()
			// this.getuserInfo()
			this.getXieyi()
			this.getmymation()
			// this.getIndeinfo()
		},
		onShow() {
			this.getIndeinfo()
			this.getmymation()
		},
		onHide() {
			if (this.cont == false) {
				setTimeout(function() {
					wx.switchTab({
						url: "../index/index",
						success() {
							uni.showToast({
								title: "你还不是会员",
								icon: 'none'
							})
						}
					})
				}, 0)
				return false
			}
		}
	}
</script>

<style scoped lang="scss">
	.table {
		border: 0px solid darkgray;
	}

	.tr {
		display: flex;
		width: 100%;
		justify-content: center;
		border-bottom: 1rpx solid rgb(245, 245, 245);
		// height: 3rem;
		align-items: center;
	}

	.td {
		width: 40%;
		font-weight: 500;
		justify-content: center;
		text-align: center;
	}

	.th {
		width: 40%;
		justify-content: center;
		color: rgba(190, 142, 88, 1);
		display: flex;
		border: 1rpx solid rgb(245, 245, 245);
		// height: 72rpx;
		align-items: center;
	}

	.text_bar {
		margin: 16rpx 14rpx;
		margin-bottom: 0;
		border-radius: 20px;
		box-shadow: 0px 0px 7px 0px rgba(0, 0, 0, 0.15);
		min-height: 217rpx;

		.text_jie {
			text-indent: 2em;
			font-size: 28rpx;
			color: #343434;
			margin: 17rpx 35rpx;
			margin-bottom: 8rpx;
			font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
		}
	}

	.imag_logo {
		padding-left: 32rpx;
		padding-right: 32rpx;
		padding-top: 16rpx;
		display: flex;
		justify-content: space-between;
	}

	.scoll {
		margin: 12rpx 14rpx;
		height: 60rpx;
	}

	.footer {
		margin: 20rpx 14rpx;
		box-shadow: 0px 0px 7px 0px rgba(0, 0, 0, 0.15);
		padding-bottom: 13rpx;
		border-radius: 20px;
	}

	.footer_bar {
		display: flex;
		font-size: 20rpx;
		margin: 13rpx 14rpx;
		margin-left: 32rpx;
		padding-bottom: 15rpx;
		margin-bottom: 15rpx;
		justify-content: space-between;
		align-items: center;
		color: #343434;
		border-bottom: 1px solid rgb(224, 223, 223);
	}

	button {
		line-height: 54rpx;
		font-size: 24rpx;
		width: 284rpx;
		height: 54rpx;
		border-radius: 27px;
		background: rgba(190, 142, 88, 1);
		color: #FFFFFF;
	}
	.contry {
		margin-right: 20rpx;
		width: 188rpx;
		font-size: 20rpx;
		padding-left: 15rpx;
		padding-right: 15rpx;
		height: 60rpx;
		color: #3D3D3D;
		border-radius: 8px;
		float: right;
		line-height: 60rpx;
		box-shadow: 0px 0px 2px 0px rgba(0, 0, 0, 0.1);
	}
</style>

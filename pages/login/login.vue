<template>
	<view>
		<view >
			<view class='header'>
				<image src='https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1600274783146&di=d2482f836d6d31fdff056137a81e3a3a&imgtype=0&src=http%3A%2F%2Fwww.dlmingchen.cn%2Fdata%2Fupload%2Fimage%2F20180322%2F1521701230204669.jpg'></image>
			</view>

			<view class='content'>
				<view>申请获取以下权限</view>
				<text>获得你的公开信息(昵称，头像等)</text>
			</view>

			<button class='bottom' type='primary' open-type="getUserInfo" @getuserinfo="bindGetUserInfo">
				授权登录
			</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// canIUse: wx.canIUse('button.open-type.getUserInfo'),
				// isHide: false
			}
		},
		onLoad() {
			this.login()
		},
		methods: {
			 bindGetUserInfo: function(e) {
			        if (e.detail.userInfo) {
			            //用户按了允许授权按钮
			            var that = this;
			            // 获取到用户的信息了，打印到控制台上看下
			            console.log("用户的信息如下：");
			            // console.log(e);
			            //授权成功后,通过改变 isHide 的值，让实现页面显示出来，把授权页面隐藏起来
			           that.login()
					   console.log(1)

			        } else {
			            //用户按了拒绝按钮
			            wx.showModal({
			                title: '警告',
			                content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
			                showCancel: false,
			                confirmText: '返回授权',
			                success: function(res) {
			                    // 用户没有授权成功，不需要改变 isHide 的值
			                    if (res.confirm) {
			                        console.log('用户点击了“返回授权”');
			                    }
			                }
			            });
			        }
			    },
				login() {
					var that = this;
					      // 查看是否授权
					      wx.getSetting({
					          success: function(res) {
								   console.log(2)
					              if (res.authSetting['scope.userInfo']) {
					                  wx.getUserInfo({
					                      success: function(res) {
											   console.log(3)
											  console.log(res)
											  uni.setStorageSync("userInfo",res.userInfo)
					                          // 用户已经授权过,不需要显示授权页面,所以不需要改变 isHide 的值
					                          // 根据自己的需求有其他操作再补充
					                          // 我这里实现的是在用户授权成功后，调用微信的 wx.login 接口，从而获取code
					                          wx.login({
					                              success: res => {
													   console.log(4)
					                                  // 获取到用户的 code 之后：res.code
					                                  console.log("用户的code:" + res.code);
					                                  // 可以传给后台，再经过解析获取用户的 openid
					                                  // 或者可以直接使用微信的提供的接口直接获取 openid ，方法如下：
					                                  wx.request({
					                                      // 自行补上自己的 APPID 和 SECRET
					                                      url: 'https://api.weixin.qq.com/sns/jscode2session?appid=wxd26f46560a42f999&secret=cd1d26f1681f0206ef9f3e2c421b0976&js_code=' + res.code + '&grant_type=authorization_code',
					                                      success: res => {
															   console.log(5)
					                                          // 获取到用户的 openid
															  uni.setStorageSync('openid',res.data.openid)
															  uni.setStorageSync('session_key',res.data.session_key)
															uni.reLaunch({
																url:'../getPhone/getPhone'
															})
					                                      }
					                                  });
					                              }
					                          });
					                      }
					                  });
					              } else {
					                  // 用户没有授权
					                  // 改变 isHide 的值，显示授权页面
					                 // that.isHide=true
					              }
					          }
					      });
					
				}

		}
	}
</script>

<style>
	.header {
		margin: 90rpx 0 90rpx 50rpx;
		border-bottom: 1px solid #ccc;
		text-align: center;
		width: 650rpx;
		height: 300rpx;
		line-height: 450rpx;
	}

	.header image {
		width: 400rpx;
		height: 200rpx;
	}

	.content {
		margin-left: 50rpx;
		margin-bottom: 90rpx;
	}

	.content text {
		display: block;
		color: #9d9d9d;
		margin-top: 40rpx;
	}

	.bottom {
		border-radius: 80rpx;
		margin: 70rpx 50rpx;
		font-size: 35rpx;
	}
</style>

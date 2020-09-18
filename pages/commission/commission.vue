<template>
	<view>
		<view class="top_bar">
			<view class="mine">
				<view class="mine_left">
					<image style="width: 120rpx; height: 120rpx; border-radius: 50%;" :src="touxiang" mode="aspectFit"></image>
					<text style="margin-left: 25rpx; color: #FFFFFF;">{{name}}</text>
				</view>
				<view class="" style="position: absolute;top: 7rpx; right: 0; color: #FFFFFF; font-size: 26rpx;" @click="toWith">
					提现记录<text>＞</text>
				</view>
			</view>
		</view>
		<view class="tixian">
			<view class="" style="background-color: #FFFFFF; padding-left: 0; border-top-right-radius: 10px; border-top-left-radius:10px;display:flex;justify-content:space-between;align-items:center;">
				<view class="" style="line-height: 60rpx;">
					我的佣金:￥<text>{{counts?counts:0}}</text>
				</view>
				<view @click="tixian" class="" style="float: right; background-color: #6BB36A; font-size: 28rpx; color: #FFFFFF; border-radius: 20rpx; width: 120rpx; height: 50rpx; line-height: 50rpx !important;padding: 0; text-align: center; margin-right: 34rpx;">
					提现
				</view>
			</view>
			<view class="" space='true' style="background-color: #333333; color: #FFFFFF; border-bottom-right-radius: 10px;border-bottom-left-radius: 10px; line-height: 120rpx;">
				累计提现:￥<text>{{drawalMoney? drawalMoney:0}}</text>
			</view>
		</view>
		<view class="footer">
			<view class="tooterbar" @click="formSubmit">
				<image src="../../static/imgs/icon_tuiguangmP.png" style="width: 100rpx; height: 91rpx;" mode="aspectFit"></image>
				<view class="">
					推广名片
				</view>
			</view>
			<view class="tooterbar" @click="CommissionRecords">
				<image src="../../static/imgs/icon_dingdanlw.png" style="height: 76rpx; width: 76rpx;" mode="aspectFit"></image>
				<view class="">
					推广记录
				</view>
			</view>
		</view>
		<!-- 海报 -->

		<view class='imagePathBox' :hidden="maskHidden == false">
			<text style="color: #FFFFFF; font-size: 40rpx; float: right; margin-right: 20rpx; padding-top: 32rpx; margin-right: 30rpx;"
			 @click="quxiao">X</text>
			<swiper @change="change" style="height: 100%; margin-top: -50rpx;" :interval="3000" :duration="1000" :current="count">
				<swiper-item style="height: 100%; margin-top: -40rpx;" v-for="(item,index ) in imagePath" :key="index">
					<image :src="item" class='shengcheng'></image>
				</swiper-item>
			</swiper>
			  <view class='ceshi_next' @click='prevImg'>
			      <text class='icon iconfont icon-you'></text>
			    </view>
			    <view class='ceshi_prew' @click='nextImg'>
			      <text class='icon iconfont icon-zuo'></text>
			    </view>
			<button class='baocun' @click='baocun'>保存相册，分享到朋友圈</button>
		</view>
		<view :hidden="maskHidden == false" class="mask"></view>
		<view class="canvas-box">
			<canvas style="width: 375px;height: 667px;position:fixed;top:9999px;" canvas-id="mycanvas" />
			<canvas style="width: 375px;height: 667px;position:fixed;top:9999px;" canvas-id="mycanvasa" />
			<canvas style="width: 375px;height: 667px;position:fixed;top:9999px;" canvas-id="mycanvasb" />
		</view>
	</view>
</template>

<script>
	import base64Src from '../../utils/base64src.js';
	export default {
		data() {
			return {
				maskHidden: false,
				name: "",
				bank: '', //提现银行卡的信息
				touxiang: "",
				code: "E7A93C",
				imagePath: [],
				pathList: [],
				urlList: [{
						url: 'http://m.qpic.cn/psc?/V11EtE3S2awPyr/bqQfVz5yrrGYSXMvKr.cqb8oOh*SrI65s1IZ0OgwZinhoCEBJqB1*B0kZiop6dvwGCOlw72ss1a1nbF4R1EVMh.PETQM48yqodqrm*kOwb8!/b&bo=7gI2Be4CNgUDByI!&rf=viewer_4',
					},
					{
						url: 'http://m.qpic.cn/psc?/V11EtE3S2awPyr/bqQfVz5yrrGYSXMvKr.cqdty8A0OzEsXgGIhPcK*Aw07T.EyHpJlocBFkJcg6ukfODPsUSVzYv0rUWyBvjzHI0yeufsMhDi9uO2hKe.*Dd0!/b&bo=7gI2BQAAAAADB*0!&rf=viewer_4',
					},
					{
						url: 'http://m.qpic.cn/psc?/V11EtE3S2awPyr/bqQfVz5yrrGYSXMvKr.cqeUanfR1uiFvogoU1uqIqfmo9oemrxdcIcs4mkq82ufSBslERrRtA3yoINDnfi98Gp1paNEXD9mia5e.wp8g9fg!/b&bo=7gI2BQAAAAADB*0!&rf=viewer_4'
					}
				],
				erweima: "",
				count: 0,
				drawalMoney: '', //累计提现，
				counts: '', //可提现
				miniMoney: '', //标准
				count:0
			}
		},
		onLoad() {
			this.getmoney()
			this.eq()
			var that = this;
			wx.getUserInfo({
				success: res => {
					that.name = res.userInfo.nickName,
						wx.downloadFile({
							url: res.userInfo.avatarUrl, //仅为示例，并非真实的资源
							success: function(res) {
								// 只要服务器有响应数据，就会把响应内容写入文件并进入 success 回调，业务需要自行判断是否下载到了想要的内容
								if (res.statusCode === 200) {
									console.log(res, "reererererer")
									that.touxiang = res.tempFilePath
								}
							}
						})
				}
			})
		},
		onShow() {
			this.getmoney()
		},
		methods: {
			prevImg() {
				console.log("加")
				if(this.count<2) {
					++this.count
				}
			},
			nextImg() {
				if(this.count>0) {
					--this.count
				}
			},
			getmoney() { //获取可提现
			var that=this
				var userid = uni.getStorageSync('userId')
				that.$http.postRequest('/user/query', {
					userId: userid.userId
				}).then(res => {
					var a=res.returnMoney
					console.log("天线")
					console.log(res)
					that.drawalMoney=res.drawalMoney;
					that.counts= a.toString()
				})
			},
			tixian() {
				var that = this
				var userid = uni.getStorageSync('userId')
				console.log(userid)
				if (userid.isNew == 1) {
					uni.navigateTo({
						url: '../addBank/addBank'
					})
				}
				if (userid.isNew == 0) {
					var userid = uni.getStorageSync('userId')
					this.$http.postRequest('/user/queryBank', {
						userId: userid.userId
					}).then(res => {
						this.bank = res
						console.log(res)
						console.log("假假按揭啊")
						uni.navigateTo({
							url: `../tixian/tixian?name=${res.wxNickname}&bankNum=${res.bankNum}&bankName=${res.bankName}&money=${that.counts}`
						})
					})
				}
			},
			change(e) {
				this.count = e.detail.current
			},
			CommissionRecords() {
				uni.navigateTo({
					url: '../CommissionRecords/CommissionRecords'
				})
			},
			text(req) {
				var that = this
				base64Src.base64src(req, res => {
					wx.getImageInfo({
						src: res,
						success(res) {
							that.erweima = res.path
						}
					})
				})
			},
			eq() {
				var that = this
				wx.request({
					url: "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wxd26f46560a42f999&secret=cd1d26f1681f0206ef9f3e2c421b0976",
					method: 'GET',
					success(res) {
						wx.request({
							url: `https://api.weixin.qq.com/wxa/getwxacodeunlimit?access_token=${res.data.access_token}`,
							method: 'POST',
							responseType: 'arraybuffer',
							data: {
								scene: "code:1",
								is_hyaline: true
							},
							success(res) {
								const base64 = wx.arrayBufferToBase64(res.data).toString();
								that.erweima = "data:image/PNG;base64," + base64
								that.text(that.erweima)
							},
							fail(err) {
								console.log(err)
							}
						})
					}
				})
				that.urlList.forEach(item => {
					wx.getImageInfo({
						src: item.url,
						success(res) {
							that.pathList.push(res.path)
						}
					})
				})
			},
			quxiao() {
				this.maskHidden = false
			},
			createNewImg: function(item) {
				if (!item) {
					return false
				}
				var that = this;
				var context = wx.createCanvasContext('mycanvas');
				context.setFillStyle("#ffe200")
				context.fillRect(0, 0, 375, 667)
				var path = item;
				//将模板图片绘制到canvas,在开发工具中drawImage()函数有问题，不显示图片
				//不知道是什么原因，手机环境能正常显示
				context.drawImage(path, 0, 0, 375, 667);
				// var path1 = that.touxiang;
				// console.log(path1, "path1")
				//将模板图片绘制到canvas,在开发工具中drawImage()函数有问题，不显示图片
				// var path2 = "../../static/inmg/1033914-20180419150331561-740454292.png";
				// var path3 = "../../static/inmg/1033914-20180419150331561-740454292.png";
				var path4 = that.erweima;
				// var path5 = "../../static/inmg/1033914-20180419150331561-740454292.png";
				// context.drawImage(path2, 126, 186, 120, 120);
				//不知道是什么原因，手机环境能正常显示
				// context.save(); // 保存当前context的状态

				var name = that.name;
				//绘制名字
				context.setFontSize(24);
				context.setFillStyle('#333333');
				context.setTextAlign('center');
				// context.fillText(name, 185, 340);
				context.stroke();
				//绘制一起吃面标语
				context.setFontSize(14);
				context.setFillStyle('#333333');
				context.setTextAlign('center');
				// context.fillText("邀请你一起去吃面", 185, 370);
				context.stroke();
				//绘制验证码背景
				// context.drawImage(path3, 48, 390, 280, 84);
				//绘制code码
				context.setFontSize(40);
				context.setFillStyle('#ffe200');
				context.setTextAlign('center');
				// context.fillText(that.code, 185, 435);
				context.stroke();
				//绘制左下角文字背景图
				context.drawImage(path4, 115, 432, 150, 150);
				context.setFontSize(12);
				context.setFillStyle('#ffe200');
				context.setTextAlign('left');
				// context.fillText("进入小程序输入朋友的邀请", 35, 540);
				context.stroke();
				context.setFontSize(12);
				context.setFillStyle('#333');
				context.setTextAlign('left');
				// context.fillText("码，朋友和你各自获得通用", 35, 560);
				context.stroke();
				context.setFontSize(12);
				context.setFillStyle('#333');
				context.setTextAlign('left');
				// context.fillText("优惠券1张哦~", 35, 580);
				context.stroke();
				//绘制右下角扫码提示语
				// context.drawImage(path5, 248, 578, 90, 25);
				//绘制头像
				// context.arc(186, 246, 50, 0, 2 * Math.PI) //画出圆
				// context.strokeStyle = "#ffe200";
				// context.clip(); //裁剪上面的圆形
				// context.drawImage(path1, 136, 196, 100, 100); // 在刚刚裁剪的园上画图
				context.draw();
				//将生成好的图片保存到本地，需要延迟一会，绘制期间耗时
				setTimeout(function() {
					wx.canvasToTempFilePath({
						canvasId: 'mycanvas',
						success: function(res) {
							var tempFilePath = res.tempFilePath;
							that.imagePath.push(tempFilePath)
							that.canvasHidden = true
						},
						fail: function(res) {
							console.log(res);
						}
					});
				}, 200);
			},
			createNewImga: function(item) {
				if (!item) {
					return false
				}
				var that = this;
				var context = wx.createCanvasContext('mycanvasa');
				context.setFillStyle("#ffe200")
				context.fillRect(0, 0, 375, 667)
				var path = item;
				//将模板图片绘制到canvas,在开发工具中drawImage()函数有问题，不显示图片
				//不知道是什么原因，手机环境能正常显示
				context.drawImage(path, 0, 0, 375, 667);
				// var path1 = that.touxiang;
				// console.log(path1, "path1")
				//将模板图片绘制到canvas,在开发工具中drawImage()函数有问题，不显示图片
				// var path2 = "../../static/inmg/1033914-20180419150331561-740454292.png";
				// var path3 = "../../static/inmg/1033914-20180419150331561-740454292.png";
				var path4 = that.erweima;
				// var path5 = "../../static/inmg/1033914-20180419150331561-740454292.png";
				// context.drawImage(path2, 126, 186, 120, 120);
				//不知道是什么原因，手机环境能正常显示
				// context.save(); // 保存当前context的状态

				var name = that.name;
				//绘制名字
				context.setFontSize(24);
				context.setFillStyle('#333333');
				context.setTextAlign('center');
				// context.fillText(name, 185, 340);
				context.stroke();
				//绘制一起吃面标语
				context.setFontSize(14);
				context.setFillStyle('#333333');
				context.setTextAlign('center');
				// context.fillText("邀请你一起去吃面", 185, 370);
				context.stroke();
				//绘制验证码背景
				// context.drawImage(path3, 48, 390, 280, 84);
				//绘制code码
				context.setFontSize(40);
				context.setFillStyle('#ffe200');
				context.setTextAlign('center');
				// context.fillText(that.code, 185, 435);
				context.stroke();
				//绘制左下角文字背景图
				context.drawImage(path4, 115, 432, 150, 150);
				context.setFontSize(12);
				context.setFillStyle('#ffe200');
				context.setTextAlign('left');
				// context.fillText("进入小程序输入朋友的邀请", 35, 540);
				context.stroke();
				context.setFontSize(12);
				context.setFillStyle('#333');
				context.setTextAlign('left');
				// context.fillText("码，朋友和你各自获得通用", 35, 560);
				context.stroke();
				context.setFontSize(12);
				context.setFillStyle('#333');
				context.setTextAlign('left');
				// context.fillText("优惠券1张哦~", 35, 580);
				context.stroke();
				//绘制右下角扫码提示语
				// context.drawImage(path5, 248, 578, 90, 25);
				//绘制头像
				// context.arc(186, 246, 50, 0, 2 * Math.PI) //画出圆
				// context.strokeStyle = "#ffe200";
				// context.clip(); //裁剪上面的圆形
				// context.drawImage(path1, 136, 196, 100, 100); // 在刚刚裁剪的园上画图
				context.draw();
				//将生成好的图片保存到本地，需要延迟一会，绘制期间耗时
				setTimeout(function() {
					wx.canvasToTempFilePath({
						canvasId: 'mycanvasa',
						success: function(res) {
							var tempFilePath = res.tempFilePath;
							console.log(tempFilePath)
							that.imagePath.push(tempFilePath)
							that.canvasHidden = true
						},
						fail: function(res) {
							console.log(res);
						}
					});
				}, 200);
			},
			createNewImgb: function(item) {
				if (!item) {
					return false
				}
				var that = this;
				var context = wx.createCanvasContext('mycanvasb');
				context.setFillStyle("#ffe200")
				context.fillRect(0, 0, 375, 667)
				var path = item;
				//将模板图片绘制到canvas,在开发工具中drawImage()函数有问题，不显示图片
				//不知道是什么原因，手机环境能正常显示
				context.drawImage(path, 0, 0, 375, 667);
				// var path1 = that.touxiang;
				// console.log(path1, "path1")
				//将模板图片绘制到canvas,在开发工具中drawImage()函数有问题，不显示图片
				// var path2 = "../../static/inmg/1033914-20180419150331561-740454292.png";
				// var path3 = "../../static/inmg/1033914-20180419150331561-740454292.png";
				var path4 = that.erweima;
				// var path5 = "../../static/inmg/1033914-20180419150331561-740454292.png";
				// context.drawImage(path2, 126, 186, 120, 120);
				//不知道是什么原因，手机环境能正常显示
				// context.save(); // 保存当前context的状态

				var name = that.name;
				//绘制名字
				context.setFontSize(24);
				context.setFillStyle('#333333');
				context.setTextAlign('center');
				// context.fillText(name, 185, 340);
				context.stroke();
				//绘制一起吃面标语
				context.setFontSize(14);
				context.setFillStyle('#333333');
				context.setTextAlign('center');
				// context.fillText("邀请你一起去吃面", 185, 370);
				context.stroke();
				//绘制验证码背景
				// context.drawImage(path3, 48, 390, 280, 84);
				//绘制code码
				context.setFontSize(40);
				context.setFillStyle('#ffe200');
				context.setTextAlign('center');
				// context.fillText(that.code, 185, 435);
				context.stroke();
				//绘制左下角文字背景图
				context.drawImage(path4, 115, 432, 150, 150);
				context.setFontSize(12);
				context.setFillStyle('#ffe200');
				context.setTextAlign('left');
				// context.fillText("进入小程序输入朋友的邀请", 35, 540);
				context.stroke();
				context.setFontSize(12);
				context.setFillStyle('#333');
				context.setTextAlign('left');
				// context.fillText("码，朋友和你各自获得通用", 35, 560);
				context.stroke();
				context.setFontSize(12);
				context.setFillStyle('#333');
				context.setTextAlign('left');
				// context.fillText("优惠券1张哦~", 35, 580);
				context.stroke();
				//绘制右下角扫码提示语
				// context.drawImage(path5, 248, 578, 90, 25);
				//绘制头像
				// context.arc(186, 246, 50, 0, 2 * Math.PI) //画出圆
				// context.strokeStyle = "#ffe200";
				// context.clip(); //裁剪上面的圆形
				// context.drawImage(path1, 136, 196, 100, 100); // 在刚刚裁剪的园上画图
				context.draw();
				//将生成好的图片保存到本地，需要延迟一会，绘制期间耗时
				setTimeout(function() {
					wx.canvasToTempFilePath({
						canvasId: 'mycanvasb',
						success: function(res) {
							var tempFilePath = res.tempFilePath;
							console.log(tempFilePath)
							that.imagePath.push(tempFilePath)
							that.canvasHidden = true
						},
						fail: function(res) {
							console.log(res);
						}
					});
				}, 200);
			},
			formSubmit: function(e) {
				var that = this;
				this.imagePath = []
				that.maskHidden = false

				wx.showToast({
					title: '加载中...',
					icon: 'loading',
					duration: 1000
				});
				setTimeout(async function() {
					wx.hideToast()
					that.createNewImg(that.pathList[0])
					that.createNewImga(that.pathList[1])
					that.createNewImgb(that.pathList[2])
					that.maskHidden = true

				}, 1000)
			},
			baocun: function() {
				var that = this
				var imagepath = that.imagePath[that.count]
				console.log('2222222222')
				wx.getSetting({
					success(res) {
						console.log("xixixixixixi")
						if (!res.authSetting['scope.writePhotosAlbum']) {
					  wx.authorize({
					          scope: 'scope.writePhotosAlbum',
					          success () {
					            wx.saveImageToPhotosAlbum({
					            	filePath: imagepath,
					            	success(res) {
					            		wx.showModal({
					            			content: '图片已保存到相册，赶紧晒一下吧~',
					            			showCancel: false,
					            			confirmText: '好的',
					            			confirmColor: '#333',
					            			success: function(res) {
					            				console.log(res)
					            				if (res.confirm) {
					            					console.log('用户点击确定');
					            					/* 该隐藏的隐藏 */
					            					that.maskHidden = false
					            				}
					            			},
					            			fail: function(res) {
					            				console.log(11111)
					            			}
					            		})
					            	},
					            	fail(err) {
					            		console.log('2222222222')
					            		console.log(imagepath)
					            		console.log(err)
					            	}
					            })
					          },
					          // 拒绝授权时，则进入手机设置页面，可进行授权设置
					          fail() {
					            wx.openSetting({
					              success: function (data) {
					                console.log("openSetting success");
					              },
					              fail: function (data) {
					                console.log("openSetting fail");
					              }
					            });
					          }
					        })
						} else {
							console.log('22222222225555555555555555')
							wx.saveImageToPhotosAlbum({
								filePath: imagepath,
								success(res) {
									wx.showModal({
										content: '图片已保存到相册，赶紧晒一下吧~',
										showCancel: false,
										confirmText: '好的',
										confirmColor: '#333',
										success: function(res) {
											console.log(res)
											if (res.confirm) {
												console.log('用户点击确定');
												/* 该隐藏的隐藏 */
												that.maskHidden = false
											}
										},
										fail: function(res) {
											console.log(11111)
										}
									})
								},
								fail(err) {
									console.log('2222222222')
									console.log(imagepath)
									console.log(err)
								}
							})
						}
					}
				})
			},
			toWith() {
				uni.navigateTo({
					url: '../Withdrawal_record/Withdrawal_record'
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.top_bar {
		width: 100%;
		height: 242rpx;
		background-color: #C8460D;
	}

	.top_bar {
		padding-top: 41rpx;
		padding-left: 30rpx;
		padding-right: 30rpx;
		box-sizing: border-box;
	}

	.mine {
		display: flex;
		position: relative;
		justify-content: space-between;
		align-items: center;

		.mine_left {
			display: flex;
			align-items: center;
		}
	}

	.tixian {
		margin: 0 17rpx;
		margin-top: -60rpx;
		height: 240rpx;
		box-shadow: 0px 0px 7px 0px rgba(0, 0, 0, 0.15);

		view {
			padding-left: 25rpx;
			height: 50%;
			font-size: 32rpx;
			font-weight: 500;
		}
	}

	.footer {
		display: flex;
		justify-content: space-around;
		align-items: center;
		margin-top: 28rpx;
	}

	.tooterbar {
		font-size: 30rpx;
		color: #282828;
		max-width: 121rpx;
		text-align: center;
	}


	.bgImg {
		display: block;
		width: 100%;
		height: 366rpx;
	}

	.mine {
		display: block;
		text-align: center;
		color: #333;
	}

	.code {
		display: block;
		text-align: center;
		color: #333;
		font-size: 76rpx;
		font-weight: bold;
		margin-top: 30rpx;
	}

	.who {
		display: block;
		margin-top: 80rpx;
		font-size: 32rpx;
		color: #333;
		text-align: center;
	}

	.inputBox {
		text-align: center;
		margin-top: 44rpx;
	}

	.input {
		text-align: center;
		width: 440rpx;
		height: 88rpx;
		border-radius: 44rpx;
		background: #f5f5f5;
		font-size: 32rpx;
		display: inline-block;
	}

	.btn {
		width: 160rpx;
		height: 88rpx;
		border-radius: 44rpx;
		background: linear-gradient(90deg, rgba(255, 226, 0, 1), rgba(255, 200, 11, 1));
		box-shadow: 0px 4px 8px 0px rgba(255, 200, 11, 0.5);
		color: #333;
		font-size: 32rpx;
		display: inline-block;
		line-height: 88rpx;
		margin-left: 40rpx;
	}

	button[class="btn"]::after {
		border: 0;
	}

	.tishi {
		display: block;
		text-align: center;
		color: #999;
		margin-top: 30rpx;
	}

	.shareText {
		display: block;
		text-align: center;
		color: #333;
		font-size: 28rpx;
		margin-top: 100rpx;
	}

	.imgBox {
		text-align: center;
		width: 100%;
		margin-top: 60rpx;
		padding-bottom: 120rpx;
	}

	.img {
		display: inline-block;
		width: 100%;
		height: 100%;
	}

	.m_l {
		margin-left: 180rpx;
	}

	.zfbtn {
		display: inline-block;
		width: 120rpx;
		height: 120rpx;
		border-radius: 50%;
		background: transparent;
		outline: none;
		border: 0;
		padding: 0;
	}

	button[class="zfbtn"]::after {
		border: 0;
	}

	button[class="zfbtn m_l"]::after {
		border: 0;
	}

	.imagePathBox {
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.7);
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 10;
	}

	.shengcheng {
		width: 80%;
		height: 80%;
		position: fixed;
		top: 50rpx;
		left: 50%;
		margin-left: -40%;
		z-index: 10;
	}

	.baocun {
		display: block;
		width: 80%;
		height: 80rpx;
		padding: 0;
		line-height: 80rpx;
		text-align: center;
		position: fixed;
		bottom: 20rpx;
		left: 10%;
		background: #ffe200;
		color: #333;
		font-size: 32rpx;
		border-radius: 44rpx;
	}

	button[class="baocun"]::after {
		border: 0;
	}
	
	
	
	
	
	
	
	
	
	
	.ceshi_swiper {
	  width: 599rpx;
	  margin: 10rpx auto;
	  position: relative;
	}
	
	.ceshi_prew text {
	  color: #fff;
	  font-size: 30rpx;
	  float: left;
	  margin-top: 15rpx;
	}
	
	.ceshi_next text {
	  color: #fff;
	  font-size: 30rpx;
	  display: block;
	  float: right;
	  margin-top: 15rpx;
	}
	
	.ceshi_next {
	  width: 40rpx;
	  height: 80rpx;
	  position: absolute;
	  top: 480rpx;
	  right: 20rpx;
	  background-color: rgba(0, 0, 0, 0.5);
	 border-top-right-radius: 80rpx;
	 border-bottom-right-radius: 80rpx;
	}
	
	.ceshi_prew {
	  width: 40rpx;
	  height: 80rpx;
	  position: absolute;
	  top: 480rpx;
	  left: 20rpx;
	  background-color: rgba(0, 0, 0, 0.5);
	  border-top-left-radius: 80rpx;
	  border-bottom-left-radius: 80rpx;
	}
	
	.zuopin_qh {
	  float: left;
	}
	
	.read_kecheng {
	  background: #fff;
	}
	
	.zuopin {
	  overflow: hidden;
	  margin: 10rpx auto;
	  background: #fff;
	  width: 610rpx;
	  padding-top: 10rpx;
	  padding-bottom: 10rpx;
	}
	
	.zuopin_qh {
	  margin-left: 15rpx;
	  margin-right: 15rpx;
	}
	.zuopin_qh image{  box-shadow: 0 0 10px #dadada;}
	.zuopinr {
	  background: #f2b91c;
	  width: 48rpx;
	  height: 48rpx;
	  border-radius: 48rpx;
	  color: #fff;
	  font-size: 35rpx;
	  text-align: center;
	  right: 20rpx;
	  position: absolute;
	  top: 160rpx;
	}
	
	.zuopinl {
	  background: #f2b91c;
	  width: 48rpx;
	  height: 48rpx;
	  border-radius: 48rpx;
	  color: #fff;
	  font-size: 35rpx;
	  text-align: center;
	  left: 20rpx;
	  position: absolute;
	  top: 160rpx;
	}
	
	.zuopin_read {
	  position: relative;
	}
	swiper.zuopin_read_swiper{height: 500rpx;}
	swiper.zuopin_read_swiper{height: 500rpx;}
	.ceshi_swiper image{width: 599rpx;height:323rpx;}
	.ceshi_swiper2 image{width: 626rpx;height:337rpx;}
	swiper.ceshi_swiper_s{height: 337rpx;}
	swiper.read_swiper{height: 323rpx;}
</style>

<template>
	<view style="padding: 35rpx;">
		<view class="label">
			<label>标题</label><input style="border: 2rpx solid rgb(17,150,219);" v-model="title" type="text" value="" />
		</view>
		<view class="">
			 <form @submit="formsubmit" @reset="">
			 	<label  v-if="!maskHidden">内容</label><textarea v-if="!maskHidden" auto-height auto-height placeholder="请输入要分享的内容(120字以内)" v-model="contentext" maxlength="120" style="z-index: 2;" name="textarea" value="" />
			 	<view class="" style="display: flex; justify-content: space-around; margin-top: 50rpx;">
			 		<button type="warn" size="mini" form-type="reset">取消生成</button>
					<button type="primary" size="mini" form-type="submit">提交生成</button>
			 	</view>
			 </form>
		</view>
		<!-- 生成海报 -->
		<view class='imagePathBox' :hidden="maskHidden == false">
			<text style="color: #FFFFFF; font-size: 40rpx; float: right; margin-right: 20rpx; padding-top: 32rpx; margin-right: 30rpx;" @click="quxiao">X</text>
			<swiper @change="change" style="height: 100%; margin-top: -50rpx;" :interval="3000" :duration="1000" :current="counts">
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
		<view class="canvas-box" >
			<canvas style="width: 375px;height: 667px;position:fixed;top:9999px;z-index: 99999;" canvas-id="mycanvas" />
			<canvas style="width: 375px;height: 667px;position:fixed;top:9999px;z-index: 99999;" canvas-id="mycanvasa" />
			<canvas style="width: 375px;height: 667px;position:fixed;top:9999px;z-index: 99999;" canvas-id="mycanvasb" />
			<canvas style="width: 375px;height: 667px;position:fixed;top:9999px;z-index: 99999;" canvas-id="mycanvasc" />
			<canvas style="width: 375px;height: 667px;position:fixed;top:9999px;z-index: 99999;" canvas-id="mycanvasd" />
		</view>
	</view>
</template>

<script>
	import base64Src from '../../utils/base64src.js';
	import util from '../../utils/utils.js';
	console.log(util)
	export default {
		data() {
			return {
				maskHidden: false,
				mycanvas:'mycanvassdfsdfsd',
				name: "",
				touxiang: "",
				code: "E7A93C",
				imagePath: [],
				pathList: [],
				urlList: [{
						url: 'http://m.qpic.cn/psc?/V11EtE3S2awPyr/TmEUgtj9EK6.7V8ajmQrEAR2a3VZN4mxq02MNJE0pvC77WGO5Pgy5OM5Y.aOnbFwTH9J9KStcujqHNpRUnrjp14WVt6Sw18Y0.FhI8KvumI!/b&bo=7gI2BQAAAAADF.0!&rf=viewer_4',
					},
					{
						url: 'http://m.qpic.cn/psc?/V11EtE3S2awPyr/bqQfVz5yrrGYSXMvKr.cqUExTGS4fdUKv.n8Wz*W9cjR8lM9wNtU7lt7KbSW3flWLzYrqkNn5D7wFvZQE9hQ07uQi3IcbHigO.V5eWJBiKk!/b&bo=7gI2BQAAAAADB*0!&rf=viewer_4',
					},
					{
						url: 'http://m.qpic.cn/psc?/V11EtE3S2awPyr/TmEUgtj9EK6.7V8ajmQrEAM4OWWTBnFekXyUMzvVa9XxpJP7UvCp9h71n0wS5RJivkfxwvV9aJYK0cH3MPTMbATuSbTUpzJYv4oi*ksE1I8!/b&bo=7gI2BQAAAAADF.0!&rf=viewer_4'
					},
					{
						url: 'http://m.qpic.cn/psc?/V11EtE3S2awPyr/bqQfVz5yrrGYSXMvKr.cqYLXpA4MwBnRA6NK3hb39YVN6lcBas0oUGpa926M*wApakFuWDtDteSWvWkY60P7QC3UsJXHBCPtKs7CTAC2lWs!/b&bo=7gI2BQAAAAADB*0!&rf=viewer_4'
					},
					{
						url: 'http://m.qpic.cn/psc?/V11EtE3S2awPyr/TmEUgtj9EK6.7V8ajmQrEFeEfHxeY54vVTDgi0wlMH04i*1wzgBqytzV9jMQ640X4Mm5il.ggKQHQKmJuBbV25uWTwM04q7Fb9Wy41hZloM!/b&bo=7gI2BQAAAAADZ50!&rf=viewer_4'
					}
				],
				phone:'',
				wechat:"",
				adress:'',
				yewu:"",
				erweima: "",
				count: 0,
				title:"",
				contentext:"",
				zhiwu:"",
				componery:"红星劳务",
				counts:0
			}
		},
		onLoad(options) {
			console.log(options)
			this.phone=options.phone
			this.wechat=options.wxchat
			this.adress=options.addr
			this.yewu=options.yewu,
			this.zhiwu=options.job,
			this.name=options.name
			this.componery=options.companyName
			this.eq()
			var that = this;

		},
		methods: {
			prevImg() {
				console.log("加")
				if(this.counts<4) {
					++this.counts
				}
			},
			nextImg() {
				if(this.counts>0) {
					--this.counts
				}
			},
			formsubmit(e) {
				console.log(e)
				this.formSubmit()
				// this.formsubmit()
			},
			change(e) {
				this.count = e.detail.current
			},
			eq() {
				console.log("之昂啊")
				var that = this
					wx.getImageInfo({
						src: that.urlList[0].url,
						success(res) {
							that.pathList[0]=res.path
							console.log(res)
						},
						fail(err) {
						  console.log(err)	
						}
					})
					wx.getImageInfo({
						src: that.urlList[1].url,
						success(res) {
							that.pathList[1]=res.path
						}
					})
					wx.getImageInfo({
						src: that.urlList[2].url,
						success(res) {
							that.pathList[2]=res.path
						}
					})
					wx.getImageInfo({
						src: that.urlList[3].url,
						success(res) {
							that.pathList[3]=res.path
						}
					})
					wx.getImageInfo({
						src: that.urlList[4].url,
						success(res) {
							that.pathList[4]=res.path
						}
					})
			},
			quxiao() {
				this.maskHidden = false
			},
			createNewImg: function(item) {
				if (!item) {
					return false
				}
				// this.mycanvas=""
				var that = this;
				// var time = util.formatTime(new Date());
				// that.mycanvas=that.mycanvas+""+time
				var context = wx.createCanvasContext('mycanvas');
				console.log(context)
				context.setFillStyle("#ffe200")
				context.fillRect(0, 0, 375, 667)
				var path = item;
				//将模板图片绘制到canvas,在开发工具中drawImage()函数有问题，不显示图片
				//不知道是什么原因，手机环境能正常显示
				context.drawImage(path, 0, 0, 375, 667);
				// var path1 = that.touxiang;
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
				context.setFontSize(20);
				context.setFillStyle('#333333');
				context.setTextAlign('center');
				 context.fillText(name, 200, 120,200);
				context.stroke();
				//绘制一起吃面标语
				var phone=that.phone
				context.setFontSize(14);
				context.setFillStyle('#333333');
				context.setTextAlign('left');
				 context.fillText(phone, 180, 148);
				context.stroke();
				var wxchat=that.wechat
				context.setFontSize(14);
				context.setFillStyle('#333333');
				context.setTextAlign('left');
				 context.fillText(wxchat, 180, 185);
				context.stroke();
				var adress=that.adress
				context.setFontSize(14);
				context.setFillStyle('#333333');
				context.setTextAlign('left');
				 context.fillText(adress, 180, 222);
				context.stroke();
				var yewu=that.yewu
				context.setFontSize(14);
				context.setFillStyle('#333333');
				context.setTextAlign('left');
				 context.fillText(yewu, 180, 258,400);
				context.stroke();
				var title=that.title  //设置标题
				context.setFontSize(28);
				context.setFillStyle('#333333');
				context.setTextAlign('center');
				 context.fillText(title, 240, 330);
				context.stroke();
				var text=that.contentext
				 var chr =text.split("");//这个方法是将一个字符串分割成字符串数组
				    var temp = "";
				    var row = [];
				    context.setFontSize(14)
				    context.setFillStyle("#333")
					context.setTextAlign("left")
				    for (var a = 0; a < chr.length; a++) {
				      if (context.measureText(temp).width < 260) {
				        temp += chr[a];
				      }
				      else {
				        a--; //这里添加了a-- 是为了防止字符丢失，效果图中有对比
				        row.push(temp);
				        temp = "";
				      }
				    }
				    row.push(temp); 
				    //如果数组长度大于2 则截取前两个
				    if (row.length > 2) {
				      var rowCut = row.slice(0, 2);
				      var rowPart = rowCut[1];
				      var test = "";
				      var empty = [];
				      for (var a = 0; a < rowPart.length; a++) {
				        if (context.measureText(test).width < 220) {
				          test += rowPart[a];
				        }
				        else {
				          break;
				        }
				      }
				      empty.push(test);
				      // var group = empty[0] + "..."//这里只显示两行，超出的用...表示
				      // rowCut.splice(1, 1, group);
				      // row = rowCut;
				    }
				    for (var b = 0; b < row.length; b++) {
				      context.fillText(row[b], 100, 370 + b * 30, 300);
				    }
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
				context.draw(true)
				//将生成好的图片保存到本地，需要延迟一会，绘制期间耗时
				setTimeout(function() {
					wx.canvasToTempFilePath({
						canvasId: 'mycanvas',
						success: function(res) {
							// console.log(that.mycanvas)
							console.log("行了嘛")
							var tempFilePath = res.tempFilePath;
							that.imagePath.push(tempFilePath)
							that.canvasHidden = true
						},
						fail: function(res) {
							console.log(that.mycanvas)
							console.log(res);
						}
					});
				}, 300);
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
				context.setTextAlign('left');
				 context.fillText(name, 145, 440);
				context.stroke();
				var zhiwu = that.zhiwu;
				//绘制名字
				context.setFontSize(14);
				context.setFillStyle('#333333');
				context.setTextAlign('center');
				 context.fillText(zhiwu, 172, 463);
				context.stroke();
				//绘制一起吃面标语
				var phone=that.phone
				context.setFontSize(14);
				context.setFillStyle('#333333');
				context.setTextAlign('left');
				 context.fillText(phone, 130, 500);
				context.stroke();
				var wxchat=that.wechat
				context.setFontSize(14);
				context.setFillStyle('#333333');
				context.setTextAlign('left');
				 context.fillText(wxchat, 130, 535);
				context.stroke();
				var adress=that.adress
				context.setFontSize(14);
				context.setFillStyle('#333333');
				context.setTextAlign('left');
				 context.fillText(adress, 130, 572);
				context.stroke();
				var title=that.title  //设置标题
				context.setFontSize(28);
				context.setFillStyle('#FFFFFF');
				context.setTextAlign('center');
				 context.fillText(title, 190, 60);
				context.stroke();
				var yewu=that.yewu
				context.setFontSize(14);
				context.setFillStyle('#333333');
				context.setTextAlign('left');
				 context.fillText(yewu, 130, 610);
				context.stroke();
				var text=that.contentext
				 var chr =text.split("");//这个方法是将一个字符串分割成字符串数组
				    var temp = "";
				    var row = [];
				    context.setFontSize(14)
				    context.setFillStyle("#FFFFFF")
				    for (var a = 0; a < chr.length; a++) {
				      if (context.measureText(temp).width < 260) {
				        temp += chr[a];
				      }
				      else {
				        a--; //这里添加了a-- 是为了防止字符丢失，效果图中有对比
				        row.push(temp);
				        temp = "";
				      }
				    }
				    row.push(temp); 
				    //如果数组长度大于2 则截取前两个
				    if (row.length > 2) {
				      var rowCut = row.slice(0, 2);
				      var rowPart = rowCut[1];
				      var test = "";
				      var empty = [];
				      for (var a = 0; a < rowPart.length; a++) {
				        if (context.measureText(test).width < 220) {
				          test += rowPart[a];
				        }
				        else {
				          break;
				        }
				      }
				      empty.push(test);
				      // var group = empty[0] + "..."//这里只显示两行，超出的用...表示
				      // rowCut.splice(1, 1, group);
				      // row = rowCut;
				    }
				    for (var b = 0; b < row.length; b++) {
				      context.fillText(row[b],65, 100 + b * 30, 400);
				    }
				context.setFontSize(14);
				context.setFillStyle('#ffffff');
				context.setTextAlign("center")
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
							// console.log(tempFilePath)
							that.imagePath.push(tempFilePath)
							that.canvasHidden = true
						},
						fail: function(res) {
							console.log(res);
						}
					});
				}, 300);
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
				context.setFontSize(14);
				context.setFillStyle('#333333');
				context.setTextAlign('left');
				 context.fillText(name, 191, 543);
				context.stroke();
				// var zhiwu = that.zhiwu;
				// //绘制名字
				// context.setFontSize(14);
				// context.setFillStyle('#333333');
				// context.setTextAlign('center');
				//  context.fillText(zhiwu, 232, 439);
				// context.stroke();
				var text=that.zhiwu
				 var chr =text.split("");//这个方法是将一个字符串分割成字符串数组
				    var temp = "";
				    var row = [];
				    context.setFontSize(38)
				    context.setFillStyle("#333")
					context.setTextAlign("left")
				    for (var a = 0; a < chr.length; a++) {
				      if (context.measureText(temp).width < 5) {
				        temp += chr[a];
				      }
				      else {
				        a--; //这里添加了a-- 是为了防止字符丢失，效果图中有对比
				        row.push(temp);
				        temp = "";
				      }
				    }
				    row.push(temp); 
				    //如果数组长度大于2 则截取前两个
				    if (row.length > 2) {
				      var rowCut = row.slice(0, 2);
				      var rowPart = rowCut[1];
				      var test = "";
				      var empty = [];
				      for (var a = 0; a < rowPart.length; a++) {
				        if (context.measureText(test).width < 220) {
				          test += rowPart[a];
				        }
				        else {
				          break;
				        }
				      }
				      empty.push(test);
				      // var group = empty[0] + "..."//这里只显示两行，超出的用...表示
				      // rowCut.splice(1, 1, group);
				      // row = rowCut;
				    }
				    for (var b = 0; b < row.length; b++) {
				      context.fillText(row[b],25, 530 + b * 30, 400);
				    }
				context.stroke();
				// 绘制一起吃面标语
				var phone=that.phone
				context.setFontSize(14);
				context.setFillStyle('#333333');
				context.setTextAlign('left');
				 context.fillText(phone, 191, 570);
				context.stroke();
				var wxchat=that.wechat
				context.setFontSize(14);
				context.setFillStyle('#333333');
				context.setTextAlign('left');
				 context.fillText(wxchat, 191, 595);
				context.stroke();
				var adress=that.adress
				context.setFontSize(14);
				context.setFillStyle('#999999');
				context.setTextAlign('center');
				 context.fillText(adress, 218, 515);
				context.stroke();
				var yewu=that.yewu
				context.setFontSize(14);
				context.setFillStyle('#333333');
				context.setTextAlign('left');
				 context.fillText(yewu, 191, 620);
				context.stroke();
				var conponey=that.componery
				context.setFontSize(28);
				context.setFillStyle('#7F3B20');
				context.setTextAlign('center');
				context.fillText(conponey, 220, 490);
				context.stroke();
				// var zhiwu=that.zhiwu  //职务
				// context.setFontSize(28);
				// context.setFillStyle('#333333');
				// context.setTextAlign('center');
				// context.fillText(zhiwu, 100, 490);
				// context.stroke();
				//绘制一起吃面标语
				context.setFontSize(14);
				context.setFillStyle('#333333');
				context.setTextAlign('center');
				// context.fillText("邀请你一起去吃面", 185, 370);
				context.stroke();
				var title=that.title  //设置标题
				context.setFontSize(28);
				context.setFillStyle('#333');
				context.setTextAlign('center');
				 context.fillText(title, 190, 60);
				context.stroke();
				var text=that.contentext
				 var chr =text.split("");//这个方法是将一个字符串分割成字符串数组
				    var temp = "";
				    var row = [];
				    context.setFontSize(14)
				    context.setFillStyle("#333")
					context.setTextAlign("left")
				    for (var a = 0; a < chr.length; a++) {
				      if (context.measureText(temp).width < 260) {
				        temp += chr[a];
				      }
				      else {
				        a--; //这里添加了a-- 是为了防止字符丢失，效果图中有对比
				        row.push(temp);
				        temp = "";
				      }
				    }
				    row.push(temp); 
				    //如果数组长度大于2 则截取前两个
				    if (row.length > 2) {
				      var rowCut = row.slice(0, 2);
				      var rowPart = rowCut[1];
				      var test = "";
				      var empty = [];
				      for (var a = 0; a < rowPart.length; a++) {
				        if (context.measureText(test).width < 220) {
				          test += rowPart[a];
				        }
				        else {
				          break;
				        }
				      }
				      empty.push(test);
				      // var group = empty[0] + "..."//这里只显示两行，超出的用...表示
				      // rowCut.splice(1, 1, group);
				      // row = rowCut;
				    }
				    for (var b = 0; b < row.length; b++) {
				      context.fillText(row[b],65, 100 + b * 30, 400);
				    }
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
							// console.log(tempFilePath)
							that.imagePath.push(tempFilePath)
							that.canvasHidden = true
						},
						fail: function(res) {
							console.log(res);
						}
					});
				}, 300);
			},
			createNewImgc: function(item) {
				if (!item) {
					return false
				}
				var that = this;
				var context = wx.createCanvasContext('mycanvasc');
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
				context.setFontSize(30);
				context.setFillStyle('#ffffff');
				context.setTextAlign('center');
				 context.fillText(name, 188, 370);
				context.stroke();
				// var zhiwu = that.zhiwu;
				// //绘制名字
				// context.setFontSize(14);
				// context.setFillStyle('#333333');
				// context.setTextAlign('center');
				//  context.fillText(zhiwu, 232, 439);
				// context.stroke();
				//绘制一起吃面标语
				var phone=that.phone
				context.setFontSize(14);
				context.setFillStyle('#ffffff');
				context.setTextAlign('left');
				 context.fillText(phone, 100, 530);
				context.stroke();
				var wechat=that.wechat
				context.setFontSize(14);
				context.setFillStyle('#ffffff');
				context.setTextAlign('left');
				 context.fillText(wechat, 242, 482);
				context.stroke();
				var adress=that.adress
				context.setFontSize(14);
				context.setFillStyle('#ffffff');
				context.setTextAlign('left');
				 context.fillText(adress, 100, 483);
				context.stroke();
				var yewu=that.yewu
				context.setFontSize(14);
				context.setFillStyle('#ffffff');
				context.setTextAlign('left');
				 context.fillText(yewu, 242, 529);
				context.stroke();
				var conponey=that.componery
				context.setFontSize(28);
				context.setFillStyle('#e0cf8d');
				context.setTextAlign('center')
				context.fillText(conponey, 185, 600);
				context.stroke();
				var zhiwu=that.zhiwu  //职务
				context.setFontSize(14);
				context.setFillStyle('#ffffff');
				context.setTextAlign('center');
				context.fillText(zhiwu, 190, 400);
				context.stroke();
				//绘制一起吃面标语
				context.setFontSize(14);
				context.setFillStyle('#333333');
				context.setTextAlign('center');
				// context.fillText("邀请你一起去吃面", 185, 370);
				context.stroke();
				var title=that.title  //设置标题
				context.setFontSize(28);
				context.setFillStyle('#FFFFFF');
				context.setTextAlign('center');
				 context.fillText(title, 190, 60);
				context.stroke();
				var text=that.contentext
				 var chr =text.split("");//这个方法是将一个字符串分割成字符串数组
				    var temp = "";
				    var row = [];
				    context.setFontSize(14)
				    context.setFillStyle("#FFFFFF")
					context.setTextAlign("left")
				    for (var a = 0; a < chr.length; a++) {
				      if (context.measureText(temp).width < 260) {
				        temp += chr[a];
				      }
				      else {
				        a--; //这里添加了a-- 是为了防止字符丢失，效果图中有对比
				        row.push(temp);
				        temp = "";
				      }
				    }
				    row.push(temp); 
				    //如果数组长度大于2 则截取前两个
				    if (row.length > 2) {
				      var rowCut = row.slice(0, 2);
				      var rowPart = rowCut[1];
				      var test = "";
				      var empty = [];
				      for (var a = 0; a < rowPart.length; a++) {
				        if (context.measureText(test).width < 220) {
				          test += rowPart[a];
				        }
				        else {
				          break;
				        }
				      }
				      empty.push(test);
				      // var group = empty[0] + "..."//这里只显示两行，超出的用...表示
				      // rowCut.splice(1, 1, group);
				      // row = rowCut;
				    }
				    for (var b = 0; b < row.length; b++) {
				      context.fillText(row[b],65, 100 + b * 30, 400);
				    }
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
						canvasId: 'mycanvasc',
						success: function(res) {
							var tempFilePath = res.tempFilePath;
							// console.log(tempFilePath)
							that.imagePath.push(tempFilePath)
							that.canvasHidden = true
						},
						fail: function(res) {
							console.log(res);
						}
					});
				}, 300);
			},
			createNewImgd: function(item) {
				if (!item) {
					return false
				}
				var that = this;
				var context = wx.createCanvasContext('mycanvasd');
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
				context.setFontSize(30);
				context.setFillStyle('#cf9676');
				context.setTextAlign('center');
				 context.fillText(name, 190, 240);
				context.stroke();
				// var zhiwu = that.zhiwu;
				// //绘制名字
				// context.setFontSize(14);
				// context.setFillStyle('#333333');
				// context.setTextAlign('center');
				//  context.fillText(zhiwu, 232, 439);
				// context.stroke();
				//绘制一起吃面标语
				var phone=that.phone
				context.setFontSize(14);
				context.setFillStyle('#ffffff');
				context.setTextAlign('left');
				 context.fillText(phone, 154, 64);
				context.stroke();
				var wechat=that.wechat
				context.setFontSize(14);
				context.setFillStyle('#ffffff');
				context.setTextAlign('left');
				 context.fillText(wechat, 154, 100);
				context.stroke();
				var adress=that.adress
				context.setFontSize(14);
				context.setFillStyle('#ffffff');
				context.setTextAlign('left');
				 context.fillText(adress,154, 138);
				context.stroke();
				var yewu=that.yewu
				context.setFontSize(14);
				context.setFillStyle('#FFFFFF');
				context.setTextAlign('left');
				 context.fillText(yewu, 154, 174);
				context.stroke();
				// var conponey=that.componery
				// context.setFontSize(28);
				// context.setFillStyle('#333333');
				// context.setTextAlign('center');
				// context.fillText(conponey, 220, 600);
				context.stroke();
				var zhiwu=that.zhiwu  //职务
				context.setFontSize(14);
				context.setFillStyle('#b48b35');
				context.setTextAlign('center');
				context.fillText(zhiwu, 192, 265);
				context.stroke();
				//绘制一起吃面标语
				context.setFontSize(14);
				context.setFillStyle('#333333');
				context.setTextAlign('center');
				// context.fillText("邀请你一起去吃面", 185, 370);
				//绘制一起吃面标语
				context.setFontSize(14);
				context.setFillStyle('#333333');
				context.setTextAlign('center');
				// context.fillText("邀请你一起去吃面", 185, 370);
				context.stroke();
				var title=that.title  //设置标题
				context.setFontSize(28);
				context.setFillStyle('#333');
				context.setTextAlign('center');
				 context.fillText(title, 190, 390);
				context.stroke();
				var text=that.contentext
				 var chr =text.split("");//这个方法是将一个字符串分割成字符串数组
				    var temp = "";
				    var row = [];
				    context.setFontSize(14)
					context.setTextAlign("left")
				    context.setFillStyle("#333")
				    for (var a = 0; a < chr.length; a++) {
				      if (context.measureText(temp).width < 260) {
				        temp += chr[a];
				      }
				      else {
				        a--; //这里添加了a-- 是为了防止字符丢失，效果图中有对比
				        row.push(temp);
				        temp = "";
				      }
				    }
				    row.push(temp); 
				    //如果数组长度大于2 则截取前两个
				    if (row.length > 2) {
				      var rowCut = row.slice(0, 2);
				      var rowPart = rowCut[1];
				      var test = "";
				      var empty = [];
				      for (var a = 0; a < rowPart.length; a++) {
				        if (context.measureText(test).width < 220) {
				          test += rowPart[a];
				        }
				        else {
				          break;
				        }
				      }
				      empty.push(test);
				      // var group = empty[0] + "..."//这里只显示两行，超出的用...表示
				      // rowCut.splice(1, 1, group);
				      // row = rowCut;
				    }
				    for (var b = 0; b < row.length; b++) {
				      context.fillText(row[b],70, 430 + b * 30, 450);
				    }
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
						canvasId: 'mycanvasd',
						success: function(res) {
							var tempFilePath = res.tempFilePath;
							// console.log(tempFilePath)
							that.imagePath.push(tempFilePath)
							that.canvasHidden = true
						},
						fail: function(res) {
							console.log(res);
						}
					});
				}, 300);
			},
			formSubmit: function(e) {
				var that = this;
				that.imagePath=[]
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
					that.createNewImgc(that.pathList[3])
					that.createNewImgd(that.pathList[4])
					that.maskHidden = true
			
				}, 1500)
			},
			baocun: function() {
				var that = this
				var imagepath = that.imagePath[that.count]
				wx.getSetting({
					success(res) {
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
					            					console.log('用户点击确定')
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
		}
	}
</script>

<style>
textarea {
	border: 2rpx solid rgb(17,150,219);
	width: 90%;
	min-height: 500rpx;
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
		margin-top: 44rpx;
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
	canvas {
		/* letter-spacing: 10rpx !important; */
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

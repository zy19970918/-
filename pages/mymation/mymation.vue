<template>
	<view style="padding: 0 47rpx;">
		<view class="contentbar">
			<view class="">
				姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名<input @focus="change" type="text" v-model="name" style="display: inline-block; float: right; height:70rpx; width: 70%; padding-top: 10rpx;"
				 placeholder="请输入姓名(必填)" value="" />
			</view>
		</view>
		<view class="contentbar">
			<view class="">
				职&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;位<input @focus="change" placeholder="请输入职位(必填)" v-model="job" type="text"
				 style="display: inline-block; float: right; height:70rpx; width: 70%;  padding-top: 10rpx;" value="" />
			</view>
		</view>
		<view class="contentbar">
			<view class="">
				公&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;司<input @focus="change" placeholder="请输入公司名称(选填)" v-model="companyName"
				 type="text" style="display: inline-block; float: right; height:70rpx; width: 70%;  padding-top: 10rpx;" value="" />
			</view>
		</view>
		<view class="contentbar">
			<view class="" @click="openAddres">
				地&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;址<text v-if="!city" v-model="adress" style="margin-left: 80rpx; color:rgb(128,128,128); font-size: 26rpx;">请选择地址</text><text
				 v-if="city" style="margin-left: 80rpx; color:rgb(128,128,128); font-size: 26rpx;">{{city}}</text>
			</view>
		</view>
		<view class="contentbar">
			<view class="">
				详细地址<input placeholder="请输入详细地址(选填)" type="text" v-model="detailadress" style="display: inline-block; float: right; height:70rpx; width: 70%;  padding-top: 10rpx;"
				 value="" />
			</view>
		</view>
		<view class="contentbar">
			<view class="">
				手&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;机<input v-model="phone" @focus="change" placeholder="请输入手机号码(必填)" type="number"
				 style="display: inline-block; float: right; height:70rpx; width: 70%;  padding-top: 10rpx;" value="" />
			</view>
		</view>
		<view class="contentbar">
			<view class="">
				固定电话<input placeholder="请输入固话(选填)" @focus="change" v-model="mobilePhone" type="number" style="display: inline-block; float: right; height:70rpx; width: 70%;  padding-top: 10rpx;"
				 value="" />
				<!-- <view class="text" style="color: #D70606;">
					(为防止恶意骚扰，可查看100人电话，如需查看更多，请联系客服。）
				</view> -->
			</view>
		</view>
		<view class="contentbar">
			<view class="">
				微&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;信<input v-model="wxchat" @focus="change" placeholder="请输入微信(必填)" type="text"
				 style="display: inline-block; float: right; height:70rpx; width: 70%; padding-top: 10rpx;" value="" />
			</view>
		</view>
		<view class="contentbar">
			<view class="">
				Q&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Q<input v-model="qq" @focus="change" placeholder="请输入QQ号码(选填)" type="number"
				 style="display: inline-block; float: right; height:70rpx; width: 70%;  padding-top: 10rpx;" value="" />
			</view>
		</view>
		<view class="contentbar">
			<view class="">
				公&nbsp;&nbsp;众&nbsp;号<input type="text" v-model="gngzonghao" @focus="change" placeholder="请输入公众号(选填)" style="display: inline-block; float: right; height:70rpx; width: 70%;  padding-top: 10rpx;"
				 value="" />
			</view>
		</view>
		<view class="contentbar">
			<view class="">
				业务范畴<input type="text" v-model="yewu" @focus="change" placeholder="请输入业务范畴(必填)" style="display: inline-block; float: right; height:70rpx; width: 70%; padding-top: 10rpx;"
				 value="" />
			</view>
		</view>
		<view class="" style="display: flex;justify-content: space-around; width: 100%; margin-top: 50rpx;">
			<button type="primary" :disabled="flag" size="mini" @click="baocun">保存信息</button>
			<button type="warn" size="mini" @click="toPoster">生成招工海报</button>
		</view>
		<simple-address ref="simpleAddress" :pickerValueDefault="cityPickerValueDefault" @onConfirm="onConfirm" themeColor="#007AFF"></simple-address>
	</view>
</template>

<script>
	import simpleAddress from '@/components/simple-address/simple-address.vue';
	export default {
		data() {
			return {
				cityPickerValueDefault: [0, 0, 1],
				city: "", //选择的城市
				name: '',
				adress: '',
				job: '',
				detailadress: '',
				phone: '',
				mobilePhone: '',
				wxchat: '',
				qq: '',
				gngzonghao: '',
				yewu: '',
				companyName: '',
				flag: true,
				proice: '', //省
				citys: '', //市
				companyId:''//

			}
		},
		methods: {
			change() {
				this.flag = false
			},
			baocun() {
				if (this.name.length > 4) {
					uni.showToast({
						title: "姓名长度超出限制",
						icon: 'none'
					})
					return false
				}
				if (this.name.length == 0) {
					uni.showToast({
						title: "姓名不能为空",
						icon: 'none'
					})
					return false
				}
				if (this.job.length > 4) {
					uni.showToast({
						title: "职位长度超出限制",
						icon: 'none'
					})
					return false
				}
				if (this.job.length == 0) {
					uni.showToast({
						title: "职位不能为空",
						icon: 'none'
					})
					return false
				}
				var phone_reg =
					/^13[0-9]{1}[0-9]{8}$|15[0-9]{1}[0-9]{8}$|18[0-9]{1}[0-9]{8}|17[0-9]{1}[0-9]{8}$|14[0-9]{1}[0-9]{8}/;
				var tel_reg = /^([0-9]{3,4}-)?[0-9]{7,8}$/;
				if (!phone_reg.test(this.phone) && !tel_reg.test(this.phone)) {

					uni.showToast({
						title: '手机号码格式不正确',
						icon: 'none'
					})
					return false;
				}

				if (this.wxchat.length == 0) {
					uni.showToast({
						title: "微信不能为空",
						icon: 'none'
					})
					return false
				}
				var reg = new RegExp("^[0-9]*$");
				if (!reg.test(this.qq)) {
					uni.showToast({
						title: "QQ输入数字类型",
						icon: 'none'
					})
				}

				if (/[\u4E00-\u9FA5]/g.test(this.gngzonghao)) {
					uni.showToast({
						title: "公众号请输入字母、数字或下划线",
						icon: 'none'
					})
					return false
				}
				if (this.yewu.length > 10) {
					uni.showToast({
						title: "业务范畴长度超出限制",
						icon: 'none'
					})
					return false
				}
				var that = this
				var companyId=uni.getStorageSync('companyId')
				var userid = uni.getStorageSync('userId')
				this.$http.postRequest('/company/add', {
					userId: userid.userId,
					name: this.name,
					jobName: this.job,
					companyAddr: this.city,
					province: that.proice,
					city: that.citys,
					detailAddr: this.detailadress,
					phone: this.phone,
					mobilePhone: this.mobilePhone,
					wxNumber: this.wxchat,
					qq: this.qq,
					officialName: this.gngzonghao,
					serviceScope: this.yewu,
					companyName: this.companyName,
					// companyId:companyId,
				}).then(res => {
					console.log(res)
					uni.setStorageSync('companyId',res.msg.companyId)
						uni.showToast({
							title: "保存成功",
							success() {
								that.flag = true
							}
						})
				}) //修改用户信息
			},
			getinfo() { //获取用户信息
				var companyId=uni.getStorageSync('companyId')
				var userid = uni.getStorageSync('userId')
				this.$http.postRequest('/company/querymingpian', {
					userId:userid.userId
				}).then(res => {
					console.log(res)
					if (!res) {
						return
					}
					    this.name = res.name,
						this.job = res.jobName,
						this.city = res.companyAddr,
						this.detailadress = res.detailAddr,
						this.phone = res.phone,
						this.mobilePhone = res.mobilePhone,
						this.wxchat = res.wxNumber,
						this.qq = res.qq,
						this.gngzonghao = res.officialName,
						this.yewu = res.serviceScope,
						this.companyName = res.companyName
						uni.setStorageSync('companyId',res.companyId)
				})
			},
			toPoster() {
				if (this.name.length == 0 || this.phone.length == 0 || this.yewu.length == 0 ||
					this.job.length == 0 || this.wxchat.length == 0) {
					uni.showToast({
						title: "请完善相关信息",
						icon: 'none'
					})
					return
				}
				uni.navigateTo({
					url: `../poster/poster?name=${this.name}&job=${this.job}&addr=${this.city}&phone=${this.phone}&wxchat=${this.wxchat}&yewu=${this.yewu}&companyName=${this.companyName}`
				})
			},
			openAddres() {
				this.flag = false
				this.$refs.simpleAddress.open();
			},
			onConfirm(e) {
				console.log(e)
				if (e.labelArr[0] == e.labelArr[1]) {
					this.city = e.labelArr[1]
				} else {
					this.city = e.labelArr[0] + "" + e.labelArr[1]
				}
				this.proice = e.labelArr[0]
				this.citys = e.labelArr[1]
			}
		},
		onShow() {
			this.getinfo()
		},
		components: {
			simpleAddress
		}
	}
</script>

<style scoped lang="scss">
	.contentbar {
		height: 70rpx;
		line-height: 90rpx;
		color: #3E77D4;
		font-size: 30rpx;
		border-bottom: 1px solid rgb(230, 230, 230);
		margin-top: 20rpx;
	}

	.contentba {
		position: relative;
		color: #3E77D4;
		min-height: 70rpx;
		border-bottom: 1px solid rgb(230, 230, 230);
		padding-top: 20rpx;
	}

	.text {
		font-size: 16rpx;
		position: absolute;
		bottom: 10rpx;
		right: 70rpx;
	}

	input {
		color: #343434;
		font-size: 26rpx;
		font-family: PingFang SC;
	}
</style>

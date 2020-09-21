<template>
	<view>
		<view class="content">
			<view class="left">
				<view class="" style="font-size: 36rpx; color: #FFFFFF; margin-top: 21rpx;">
					返现总额
				</view>
				<view class="" style="font-size: 32rpx; color: #FFFFFF; margin-top: 21rpx; text-align: center;">
					￥<text>{{list[0].historyMoney?list[0].historyMoney:0}}</text>
				</view>
			</view>
			<view class="">
				<view class="" style="font-size: 36rpx; color: #FFFFFF; margin-top: 21rpx;">
					推广人数
				</view>
				<view class="" style="font-size: 32rpx; text-align: center; color: #FFFFFF; margin-top: 21rpx;">
					<text style="text-align: center;">{{list[0].shareNum?list[0].shareNum:0}}</text>
				</view>
			</view>
		</view>
		<view class="main">
			<view class="money">
				<text style="margin-right: 10rpx;">金额排序</text>
				<image src="../../static/imgs/addd.png" style="height: 40rpx; width: 30rpx;" mode="aspectFit" @click="moneyup"></image>
			</view>
			<view class="time">
				<text style="margin-right: 10rpx;">时间排序</text>
				<image src="../../static/imgs/addd.png" style="height: 40rpx; width: 30rpx;" mode="aspectFit" @click="timepaixu"></image>
			</view>
		</view>
		<view class="list" style="padding-left: 80rpx;" v-for="(item,index) in list" :key='index'>
			<view class="">
				<view class="round" style="display: inline-block;"><image :src="item.wxPicture" style="height: 100%; width: 100%; border-radius: 50%;" mode=""></image></view>
			</view>
			<view class="" style="margin-right: 218rpx; margin-left: 20rpx;">
				<view class="" style="font-size: 32rpx; color: #333333; font-weight: 600;">
					{{item.wxNickname}}
				</view>
				<view class="" style="display: inline-block; margin-top: 6rpx;white-space:nowrap; ">
					加入时间:<text style="color: rgb(169,169,169); margin-left: 10rpx; white-space:nowrap;">{{item.createTimeStr}}</text>
				</view>
			</view>
			<view class="" style="position: relative; right: 120rpx;">
				<view class="" style="color: #C8460D; font-size: 30rpx;white-space:nowrap; min-width: 130rpx;">
					金额:<text>{{item.money}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list:[],
				falg:true
			}
		},
		methods: {
			gettuiguan() {
				var userid=uni.getStorageSync('userId')
				this.$http.postRequest('/user/extension',{userId:userid.userId}).then(res=>{this.list=res;console.log(res)})
			},
			timepaixu() {
				this.list.reverse()
			},
			moneypaixu(property){
				this.falg=false
				return function (a,b) {
					var val1=a[property]
					var val2=b[property]
					return val1-val2
				}
			},
			moneypaixu2(property){
				this.falg=true
				return function (a,b) {
					var val1=a[property]
					var val2=b[property]
					return val2-val1
				}
			},
			moneyup() {
				if(this.falg) {
					this.list.sort(this.moneypaixu('money'))
				}else {
					this.list.sort(this.moneypaixu2('money'))
				}
			},
		},
		onLoad() {
			this.gettuiguan()
		}
	}
</script>
<style>
	page {
		background-color: rgb(245, 245, 245);
	}
</style>
<style scoped lang="scss">
	.content {
		width: 750rpx;
		height: 146rpx;
		background: #C8460D;
		display: flex;
		justify-content: space-around;
	}

	.round {
		width: 98rpx;
		height: 98rpx;
		background: #DCD62F;
		border-radius: 50%;

	}

	.list {
		display: flex;
		justify-content: space-around;
		align-items: center;
		font-size: 24rpx;
		height: 120rpx;
		background: #FFFFFF;
		margin-top: 20rpx;
		box-shadow: 0px 0px 7px 0px rgba(0, 0, 0, 0.15);
		color: #333333;
	}

	.main {
		height: 88rpx;
		width: 100%;
		display: flex;
		justify-content: space-between;
		background-color: #FFFFFF;

		view {
			font-weight: 400;
			width: 49%;
			height: 100%;
		}
	}

	.money {
		border-right: 1px solid rgb(245, 245, 245);
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.time {
		border-right: 1px solid rgb(245, 245, 245);
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>

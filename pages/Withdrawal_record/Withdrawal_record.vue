<template>
	<view>
		<view class="content">
			<view class="" style="font-size: 36rpx; color: #FFFFFF; margin-top: 21rpx;">
				提现总额
			</view>
			<view class="" style="font-size: 32rpx; color: #FFFFFF; margin-top: 21rpx;">
				￥<text>{{list[0].totalMoney?list[0].totalMoney:0 }}</text>
			</view>
		</view>
		<view class="list" v-for="(item,index) in list" :key='index'>
			<view class="">
				<view class="round" style="display: inline-block;"></view>
				<view class="" style="display: inline-block;">
					{{item.createTimeStr}}
				</view>
			</view>
			<view class="" style="min-width: 200rpx;">
				<view class="">
					{{item.info}}</text>
				</view>
			</view>
			<view class="" style="color:#1aad19;" v-if="item.status==1">
				已到账
			</view>
			<view class="" style="color: #C8460D;" v-else>
				未到账
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list:[]
			}
		},
		onLoad() {
			this.gettixianReocord()
		},
		methods: {
			gettixianReocord() {
				var userid=uni.getStorageSync('userId')
				this.$http.postRequest('/recordMoney/queryTiXian',
				{userId:userid.userId},
				).then(res=>{this.list=res})
			}
		}
	}
</script>

<style scoped lang="scss">
	.content{
		width: 750rpx;
		height: 146rpx;
		background: #C8460D;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.round{
		width: 20rpx;
		height: 20rpx;
		background: #DCD62F;
		border-radius: 50%;

	}
	.list{
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 24rpx;
		height: 63rpx;
		background: #FFFFFF;
		box-shadow: 0px 0px 7px 0px rgba(0, 0, 0, 0.15);
		border-radius: 10px;
		margin: 20rpx 20rpx;
		padding: 0 25rpx ;
		color: #333333;
	}
</style>

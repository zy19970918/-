<template>
	<view class="content">
		<view class="table">
		  <view class="tr bg-w" style="margin-top: 10rpx;">
		    <view class="th" style="width: 16%;">头像</view>
		    <view class="th" style="width: 20%;">公司</view>
		    <view class="th" style="width: 13%;">姓名</view>
			<view class="th" style="width: 24%;">地址</view>
			 <view class="th" style="width: 27%;">操作</view>
		  </view>
		  <block v-for="(item,index) in list" :key="index">
		    <view class="tr bg-g" style="margin-top: 8rpx;" >
		      <view class="td" style="width: 16%;"><image style="width:66rpx; height:66rpx;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;" :src="item.isUser==0?'https://www.xn--4gqr6isbv1bn21d.com'+item.wxQcode:item.wxPicture"
					 mode="aspectFit"></image></view>
		      <view class="td" style="width: 20%; font-size: 26rpx;  white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">{{item.companyName}}</view>
		      <view class="td" style="width: 13%; font-size: 26rpx; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">{{item.name}}</view>
			   <view class="td" style="width: 24%; font-size: 26rpx; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">{{item.city}}</view>
			  <view class="td" style="display: flex; justify-content: space-around; width: 27%;">
				  <view class="" style="display: flex; flex-direction: column; align-items: center;" @click="guanzhu(item)">
				  	<image src="../../static/imgs/icon_yiguanzhu.png" v-if="item.focusData==1" mode="aspectFit" style="height: 36rpx; width: 32rpx;"></image>
					<image src="../../static/imgs/icon_guanzhulaowu.png" v-else mode="aspectFit" style="height: 36rpx; width: 32rpx;"></image>
					<text style="font-size: 24rpx; min-width: 66rpx;">{{item.focusData==1?'已关注':'关注'}}</text>
				  </view>
				  <view class="" style="display: flex; flex-direction: column; align-items: center;" @click="todetail(item.companyId)">
				  	<image src="../../static/imgs/icon_xiangqinglaowu.png" mode="aspectFit" style="height: 36rpx; width: 32rpx;"></image>
					<text style="font-size: 24rpx;">详情</text>
				  </view>
			  </view>
		    </view>
		  </block>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: []
			}
		},
		onLoad() {

		},
		methods: {
			todetail(item) {
				uni.navigateTo({
					url: `../detail/detail?companyId=${item}`
				})
			},
			getMyguanzhu() {
				var userid = uni.getStorageSync('userId')
				this.$http.postRequest('/company/queryMyFocus', {
					userId: userid.userId
				}).then(res => {
					this.list = res
				})
			},
			guanzhu(item) { //关注
				var userid = uni.getStorageSync('userId')
				this.$http.postRequest('/company/edit', {
					companyId: item.companyId,
					userId: userid.userId,
					focusData:item.focusData
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
		},
		onShow() {
			this.getMyguanzhu()
		}
	}
</script>

<style>
.table {
	  border: 0px solid darkgray;
	}
	.tr {
	  display: flex;
	  width: 100%;
	  justify-content: center;
	  border-bottom: 1rpx solid rgb(245,245,245);
	  // height: 3rem;
	  align-items: center;
	}
	.td {
	    width:40%;
		font-weight: 500;
	    justify-content: center;
	    text-align: center;
	}
	.th {
	  width: 40%;
	  justify-content: center;
	  color:rgba(190, 142, 88, 1);
	  display: flex;
	  border: 1rpx solid rgb(245,245,245);
	  // height: 72rpx;
	  align-items: center;
	}
	
</style>

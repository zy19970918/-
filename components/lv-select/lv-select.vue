<template>
	<view style="position: relative; display: inline-block !important;" :class="size === 'small' ? 'small' : ''">
		<view class="uni-flex" :class="{unishadow :uniShadow}">
			<view class="uni-search-form uni-circular uni-background">
				<icon type="search" size="14" class="uni-icon-position"/>
				<input class="inpust"
				 placeholder-style="font-size:22rpx; color:#fff;"
					type="text" 
					:placeholder="placeholder" 
					v-model="inputVal" 
					@input="onInput"
					@focus="onFocus"
				></input>
				<icon v-if="isShowClearIcon" type="clear" size="16" class="uni-icon-clear" @tap="clearInputValue"/>
			</view>
			<view class="uni-action">
				<button 
					:disabled="loading" 
					class="uni-cu-btn uni-bg-gradual-green uni-shadow-blur uni-round" 
					:class="[type === 'primary' ? 'uni-primary' : (type === 'success' ? 'uni-success' : (type === 'warning' ? 'uni-warning' : 'uni-error'))]" 
					hover-class="hover" 
					@click="handleSearch"
				>搜索</button>
			</view>
		</view>
		<view v-if="isShowSelect">
			<view class="uni-combox__selector" v-if="inputIsShow">
				<scroll-view scroll-y="true" class="uni-combox__selector-scroll">
					<view class="uni-combox__selector-empty " v-if="loading">
						<view>加载中··· </view>
					</view>
					<view class="uni-combox__selector-empty " v-if="!loading && dataListLength === 0" @tap="closeDielog">
						<view>{{emptyTips}}</view>
					</view>
					<view class="uni-combox__selector-item" v-for="(item,index) in dataList" :key="index" @tap="onSelectorClick(index)">
						<text>{{item[showValue]}}</text>
					</view>
				</scroll-view>
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		name: 'select',
		props: {
			// placeholder: {
			// 	type: String,
			// 	default: '请输入信息'
			// },
			infoList: {
				type: Array,
				default () {
					return []
				}
			},
			value: {
				type: String,
				default: ''
			},
			showValue: {
				type: String,
				default: 'name'
			},
			emptyTips: {
				type: String,
				default: '暂无数据'
			},
			loading: {
				type: Boolean,
				default: false
			},
			btnStyleColor: {
				type: Object,
				default() {
					return {}
				}
			},
			uniShadow: {
				type: Boolean,
				default: true
			},
			type: {
				type: String,
				default: 'primary'
			},
			size: {
				type: String,
				default: 'medium'
			},
			isShowSelect: {
				type: Boolean,
				default: true
			}
		},
		data() {
			return {
				inputIsShow: false,
				inputVal: '',
				dataList: [],
				placeholder: '输入厂名搜索一手单',
				isShowClearIcon: false
			}
		},
		computed: {
			dataListLength() {
				return this.dataList.length
			}
		},
		watch: {
			value: {
				handler(newVal) {
					this.inputVal = newVal
				},
				immediate: true
			},
			infoList: {
				handler(newVal) {
					this.dataList = newVal
				},
				deep: true,
				immediate: true
			},
			inputVal(val) {
				console.log("sssssss")
				if(!val.length) {
					this.isShowClearIcon = false
				}else {
					this.isShowClearIcon=true
				}
			}
		},
		methods: {
			closeDielog() {
				this.inputIsShow = false
			},
			onFocus() {
				if(this.dataList.length) {
					this.inputIsShow = true
					this.isShowClearIcon = !!this.inputVal
				}
			},
			onSelectorClick(index) {
				this.inputIsShow = false
				this.isShowClearIcon = false
				this.inputVal = this.dataList[index][this.showValue]
				this.$emit('input', this.inputVal)
				this.$emit('change', this.dataList[index])
			},
			onInput() {
				this.$emit('input', this.inputVal)
			},
			handleSearch() {
				this.inputIsShow = true
				this.$emit('handleSearch')
			},
			clearInputValue() {
				this.inputVal = ''
			}
		}
	}
</script>
<style scoped lang="scss">
	// $selectWidth: 75%; // 下拉选择框宽度
	.small {
		transform: scale(.9, .9);
	}
	.uni-primary {
		background-color: $uni-color-primary;
	}
	.uni-success {
		background-color: #67c23a;
	}
	.uni-warning {
		background-color: $uni-color-warning;
	}
	.uni-error {
		background-color: $uni-color-error;
	}
	.hover{
		transition: all .6s;
		transform: scale(0.8,0.8);
	}
	.uni-flex{
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 10rpx 20rpx;
		box-sizing: border-box;
	}
	.unishadow{
		// box-shadow: 0rpx 1rpx 5rpx #DDDDDD;
	}
	.uni-search-form{
		position: relative;
		width: 60%;
		margin: 10rpx;
		padding: 10rpx 0;
		padding-left: 70rpx;
		font-size: 30rpx;
		color: #999999;
		margin-right: 200rpx;
		padding-right: 46rpx;
	}
	.uniRound{
		border-radius: 5px;
	}
	.uni-circular{
		border-radius: 100rpx;
	}
	.uni-icon-position{
		position: absolute;
		top: 50%;
		left: 26rpx;
		transform: translate(0,-50%);
	}
	.uni-icon-clear{
		position: absolute;
		top: 50%;
		right: 0rpx;
		transform: translate(0,-50%);
	}

	/* button */
	.uni-action{
		width:150rpx;
		height: 66rpx;
	position: absolute;
	right: 0;
		 button{
			 background-color: rgba(0,0,0,0);
			 color: #000000;
			 font-size: 38rpx;
			 font-weight: 900;
			 border: 0px solid red !important;
		 }
	}
	.uni-cu-btn{
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		color: #FFFFFF;
		font-size: 28rpx;
		border: none;
		// background-color: $uni-color-primary;
	} 
	.uni-cu-btn::after {
		border: 0px;
	}
	.uni-shadow-blur{
		// box-shadow: 0rpx 1rpx 10rpx #C8C7CC;
	}
	.uni-round{
		border-radius: 100rpx;
	}
	.uni-combox__selector {
		position: absolute;
		top: 100rpx;
		left: 40rpx;
		box-sizing: border-box;
		width: 75%; // 下拉框宽度
		background-color: #FFFFFF;
		border-radius: 6px;
		box-shadow: #DDDDDD 4px 4px 8px, #DDDDDD -4px -4px 8px;
		z-index: 999;
	}
	.uni-combox__selector-scroll {
		max-height: 200px;
		box-sizing: border-box;
	}
	.uni-combox__selector::before {
		content: '';
		position: absolute;
		width: 0;
		height: 0;
		border-bottom: solid 6px #FFFFFF;
		border-right: solid 6px transparent;
		border-left: solid 6px transparent;
		left: 50%;
		top: -6px;
		margin-left: -6px;
	}
	.uni-combox__selector-empty{
		text-align: center;
		color: #8F8F94;
		padding: 20rpx 0;
		font-size: 28rpx;
	}
	.uni-combox__selector-item {
		/* #ifdef APP-NVUE */
		display: flex;
		/* #endif */
		font-size: 24rpx;
		margin: 0px 10px;
		padding: 20rpx 10rpx;
		color: #808080;
	}
	.uni-combox__selector-item:hover {
		background-color: #DDDDDD;
	}
	.uni-combox__selector-empty:last-child,
	.uni-combox__selector-item:last-child {
		border-bottom: none;
	}
</style>
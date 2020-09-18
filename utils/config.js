const commonUrl = "https://www.35logo.cn:8886" //公共路径
// post请求封装
function postRequest(url, data) {
	var promise = new Promise((resolve, reject) => {
		var that = this;
		var postData = data;
		uni.request({
			url: commonUrl + url,
			data: postData,
			method: 'POST',
			header: {
				'content-type': 'application/json;charset=utf-8',
			},
			success: function(res) {
				if (res.statusCode == 200 && res.data.code == 0) {
					resolve(res.data.data);
				} else {
					resolve(res.data.data);
				}
			},
			error: function(e) {
				reject('网络出错');
			}
		})
	});
	return promise;
}
// get请求封装
function getRequest(url, data) {
	var promise = new Promise((resolve, reject) => {
		var that = this;
		var postData = data;
		uni.request({
			url: commonUrl + url,
			data: postData,
			method: 'GET',
			header: {
				'content-type': 'application/json'
			},
			success: function(res) {
				if (res.statusCode == 200 && res.data.code == 0) {
					resolve(res.data.data);
				} else {
					resolve(res.data.data);
				}
			},
			error: function(e) {
				reject('网络出错');
			}
		})
	});
	return promise;
}


module.exports = {
	postRequest,
	getRequest
}

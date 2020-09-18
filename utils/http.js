var config = require('./config.js')
 
// 文章请求列表
var getArticleList = function(e){
	return config.getRequest("article/list",e);
}
 
 
module.exports = {
    getArticleList
}

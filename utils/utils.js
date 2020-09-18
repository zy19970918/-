function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()
 
  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()
  var a=year+''+month+''+day+""+hour+''+minute+""+second
  console.log(a)
  return a
}
 
function formatNumber(n) {
  n = n.toString()
  return n
}
 
module.exports = {
  formatTime: formatTime
}
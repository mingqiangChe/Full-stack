function hasVersion(version){
  console.log('envVersion', __wxConfig.envVersion);
  let state = __wxConfig.envVersion == version;
  return state
}

const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}
const formatMonth = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1

  return [year, month].map(formatNumber).join('-')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

/*
    函数，加法函数，用来得到精确的加法结果 
    说明：javascript的加法结果会有误差，在两个浮点数相加的时候会比较明显。这个函数返回较为精确的加法结果。
    参数：arg1：第一个加数；arg2第二个加数；d要保留的小数位数（可以不传此参数，如果不传则不处理小数位数）
    返回值：两数相加的结果
*/
function add(arg1, arg2) {
  arg1 = arg1.toString(), arg2 = arg2.toString();
  var arg1Arr = arg1.split("."), arg2Arr = arg2.split("."), d1 = arg1Arr.length == 2 ? arg1Arr[1] : "", d2 = arg2Arr.length == 2 ? arg2Arr[1] : "";
  var maxLen = Math.max(d1.length, d2.length);
  var m = Math.pow(10, maxLen);
  var result = Number(((arg1 * m + arg2 * m) / m).toFixed(maxLen));
  var d = arguments[2];
  return typeof d === "number" ? Number((result).toFixed(d)) : result;
}

/*
  函数：减法函数，用来得到精确的减法结果 
  说明：函数返回较为精确的减法结果。
  参数：arg1：第一个加数；arg2第二个加数；d要保留的小数位数（可以不传此参数，如果不传则不处理小数位数)
  返回值：两数相减的结果
*/
function sub(arg1, arg2) {
  return this.add(arg1, -Number(arg2), arguments[2]);
}

/*
  函数：乘法函数，用来得到精确的乘法结果 
  说明：函数返回较为精确的乘法结果。
  参数：arg1：第一个乘数；arg2第二个乘数；d要保留的小数位数（可以不传此参数，如果不传则不处理小数位数)
  返回值：两数相乘的结果
*/
function mul(arg1, arg2) {
  var r1 = arg1.toString(), r2 = arg2.toString(), m, resultVal, d = arguments[2];
  m = (r1.split(".")[1] ? r1.split(".")[1].length : 0) + (r2.split(".")[1] ? r2.split(".")[1].length : 0);
  resultVal = Number(r1.replace(".", "")) * Number(r2.replace(".", "")) / Math.pow(10, m);
  return typeof d !== "number" ? Number(resultVal) : Number(resultVal.toFixed(parseInt(d)));
}

/*
  函数：除法函数，用来得到精确的除法结果 
  说明：函数返回较为精确的除法结果。
  参数：arg1：除数；arg2被除数；d要保留的小数位数（可以不传此参数，如果不传则不处理小数位数)
  返回值：arg1除于arg2的结果
*/
function div(arg1, arg2, d) {
  var r1 = arg1.toString(), r2 = arg2.toString(), m, resultVal;
  m = (r2.split(".")[1] ? r2.split(".")[1].length : 0) - (r1.split(".")[1] ? r1.split(".")[1].length : 0);
  resultVal = Number(r1.replace(".", "")) / Number(r2.replace(".", "")) * Math.pow(10, m);
  return typeof d !== "number" ? Number(resultVal) : Number(resultVal.toFixed(parseInt(d)));
}




module.exports = {
  formatMonth: formatMonth,
  formatTime: formatTime,
  hasVersion:hasVersion,
  add: add,
  sub: sub,
  mul: mul,
  div: div
}

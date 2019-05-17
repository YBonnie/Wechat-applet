const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
//图片格式转换
const formaImg = val =>{
	val = decodeURIComponent(val).replace(/\/agent\//,'')
	return val
}


//时间格式

Date.prototype.format = function(format)
{
	var o = {
            "M+" : this.getMonth()+1, //month
            "d+" : this.getDate(), //day
            "h+" : this.getHours(), //hour
            "m+" : this.getMinutes(), //minute
            "s+" : this.getSeconds(), //second
            "q+" : Math.floor((this.getMonth()+3)/3), //quarter
            "S" : this.getMilliseconds() //millisecond
        }
    if(/(y+)/.test(format))
    format=format.replace(RegExp.$1,(this.getFullYear()+"").substr(4 - RegExp.$1.length));
    for(var k in o)
    if(new RegExp("("+ k +")").test(format))
    format = format.replace(RegExp.$1,RegExp.$1.length==1 ? o[k] : ("00"+ o[k]).substr((""+ o[k]).length));
    return format;
}
 
const hGMT = gmtDate =>{
	var mydate = new Date(gmtDate);
	mydate.setHours(mydate.getHours() + 8);
	return mydate.format("yyyy-MM-dd hh:mm:ss");
}


//
const upDateTime = timeValue => {
	
	  var t = Date.parse(timeValue) 
	 var mydate = new Date(t);
	 	mydate.setHours(mydate.getHours() + 8);
	return mydate.format("yyyy-MM-dd");
 

}

const changeNum = (x) =>{
    x=(x/10000).toFixed(1);
    return x;
}

//转换文章url格式
const changeUrl = value => {
	var result = value.replace("://", "%3A%2F%2F").replace(/\//g, "%2F").replace(/\?/g, "%3F").replace(/\=/g, "%3D")
	return result
}

//替换文本文件的字符
const changeTxtUrl = value => {
	var result = value.replace(/\r/g,'\n')
	return result
}




module.exports = {
  formatTime: formatTime,
  formaImg:formaImg,
  hGMT:hGMT,
  upDateTime:upDateTime,
  changeNum:changeNum,
  changeUrl:changeUrl,
  changeTxtUrl:changeTxtUrl
  
}





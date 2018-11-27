/*工具类*/
/**
 * 放在传参脚本攻击
 * @param {Object} str
 */
function pre(str){
  return str.replace(/[<>"&]/g,function(val,index,allText){
    switch(val){
      case "<":
        return "&lt;";
      case ">":
        return "&gt;";
      case "\"":
        return "&quot;";
      case "&":
        return "&amp;";
    }
  });
}
/**
 * 判断非空
 * 
 * @param val
 * @returns {Boolean}
 */
function isEmpty(val) {
	val = $.trim(val);
	if (typeof val =="number"&&val===0)//这个判断web专用，，
		return false;
	if (val == null)
		return true;
	if (val == undefined || val == 'undefined')
		return true;
	if (val == "")
		return true;
	if (val.length == 0)
		return true;
	if (!/[^(^\s*)|(\s*$)]/.test(val)){
		return true;
	}
	return false;
}


/*非空判断*/
function isNotEmpty(val) {
	return !isEmpty(val);
}

/**
 * 获取URL的参数
 * addOrUpdate.html?opt=update    ==>GetQueryString("opt")  ==>update
 * @param {Object} name
 */
function GetQueryString(name){
     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
     var r = window.location.search.substr(1).match(reg);
     if(r!=null)return  unescape(r[2]); return null;
}
/*对象拓展*/
/**
 * 对Date的扩展，将 Date 转化为指定格式的String 月(M)、日(d)、12小时(h)、24小时(H)、分(m)、秒(s)、周(E)、季度(q)
 * 可以用 1-2 个占位符 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字) eg: (new
 * Date()).format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423 (new
 * Date()).format("yyyy-MM-dd E HH:mm:ss") ==> 2009-03-10 二 20:09:04 (new
 * Date()).format("yyyy-MM-dd EE hh:mm:ss") ==> 2009-03-10 周二 08:09:04 (new
 * Date()).format("yyyy-MM-dd EEE hh:mm:ss") ==> 2009-03-10 星期二 08:09:04 (new
 * Date()).format("yyyy-M-d h:m:s.S q ") ==> 2006-7-2 8:9:4.18
 */
Date.prototype.format = function(fmt) {
	var o = {
		"Y+" : this.getFullYear(),
		"M+" : this.getMonth() + 1,
		// 月份
		"d+" : this.getDate(),
		// 日
		"h+" : this.getHours() % 12 == 0 ? 12 : this.getHours() % 12,
		// 小时
		"H+" : this.getHours(),
		// 小时
		"m+" : this.getMinutes(),
		// 分
		"s+" : this.getSeconds(),
		// 秒
		"q+" : Math.floor((this.getMonth() + 3) / 3),
		// 季度
		"S" : this.getMilliseconds()
	// 毫秒
	};
	var week = {
		"0" : "日",
		"1" : "一",
		"2" : "二",
		"3" : "三",
		"4" : "四",
		"5" : "五",
		"6" : "六"
	};
	if (/(y+)/.test(fmt)) {
		fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "")
				.substr(4 - RegExp.$1.length));
	}
	if (/(E+)/.test(fmt)) {
		fmt = fmt
				.replace(
						RegExp.$1,
						((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? "/u661f/u671f"
								: "/u5468")
								: "")
								+ week[this.getDay() + ""]);
	}
	for ( var k in o) {
		if (new RegExp("(" + k + ")").test(fmt)) {
			fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k])
					: (("00" + o[k]).substr(("" + o[k]).length)));
		}
	}
	return fmt;
};
//生成uuid
function uuid() {
    var s = [];
    var hexDigits = "0123456789abcdef";
    for (var i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = "4"; 
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); 
                                                        
    s[8] = s[13] = s[18] = s[23] = "-";

    var uuid = s.join("");
    return uuid.replace(new RegExp("-","igm"),"");
}
//获取网络安全色
function getRandomSafeColor() {
    var base = ['00','33','66','99','CC','FF'];     //基础色代码
    var len = base.length;	                       //基础色长度
    var bg = new Array();                         //返回的结果
    var random = Math.ceil(Math.random()*215+1);    //获取1-216之间的随机数
    var res;
    for(var r = 0; r < len; r++){
        for(var g = 0; g < len; g++){
            for(var b = 0; b < len; b++){
                bg.push('#'+base[r].toString()+base[g].toString()+base[b].toString());
            }  
        };  
    };
    for(var i=0;i<bg.length;i++){
        res =  bg[random];
    }
    return res;
}

//简单数据变成父子结构数据  忽略大小写
function simpleToPS(data,optObj){
  let opts = {
    idKey: "id",
    pIdKey: "pid",
    rootPId: ""
  }
  opts = Object.assign({},opts,optObj);
  for(let i in opts){
    opts[i] = opts[i].toLowerCase();
  }
  data = JSON.parse(JSON.stringify(data));
  for(let i in data){
      data[i].children = [];
    }
  let index = 0,result=[];
  while(data.length>0){
    index = index%data.length;
    if(data[index][opts.pIdKey]==opts.rootPId){
      data[index].level=1;
      result.push(data[index]);
      data.splice(index,1);
      index--;
    }else{
      arrpush(result,2);
    }
    index++;
  }
  function arrpush(arr,level){
      let markinto=true;
      for(let i=0;i<data.length;i++){
        for(let k=0;k<arr.length;k++){
          if(data.length>0){
            if(arr[k][opts.idKey]==data[i][opts.pIdKey]){
              data[i].level = level;
              arr[k].children.push(data[i]);
              data.splice(i,1);
              i--;
              markinto = false;
              break;
            }
          }
          if(arr[k].children.length>0&&markinto){
            arrpush(arr[k].children,++level);
            level--;
          }
        }
      }
      
    }
    return result;
 }


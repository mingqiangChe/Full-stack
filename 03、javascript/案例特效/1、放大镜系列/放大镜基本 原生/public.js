function rand(min,max){
	//该方法返回一个min和max之间的随机数:200-600
	return Math.floor(Math.random()*(max-min+1)+min);
	
}


function windowWidth(){
	return window.innerWidth||document.documentElement.clientWidth||document.body.clientWidth;

}

function create(tagName){
	return document.createElement(tagName)
}

function getElements(className){
	//传入类名,返回指定类名的节点的集合,兼容ie678
	var result = [];
	var all = document.getElementsByTagName('*');
	for(var i=0;i<all.length;i++){
		if(all[i].className==className){
			result.push(all[i])
		}
	}
	return result;
}


function getStyle(dom,attr){
	//获取指定节点的指定属性
	if(dom.currentStyle){
		return dom.currentStyle[attr]
	}else{
		return getComputedStyle(dom,false)[attr]
	}
}

function getColor(){
	//获取一个#123ABC
	var str = "#";
	for(var i=0;i<6;i++){
		//生成一个0-15之间的随机数,然后转成16进制
		str = str+rand(0,15).toString(16);
	}
	return str;
}

//希望封装一个函数,就叫trim(参数字符串),可以把传入的参数的前后空格去除
function trim(str){
	return str.replace(/(^\s+)|(\s+$)/g,"")
}

//封装一个方法,返回页面被卷曲的部分
function scroll(){
	return {
		"left":document.documentElement.scrollLeft||document.body.scrollLeft,
		"top":document.documentElement.scrollTop||document.body.scrollTop
	}
}

//封装一个多属性缓动函数
function animate(obj,json,fn){		
	clearInterval(obj.timer);
	obj.timer = setInterval(function(){
		var flag = true;
		for(var attr in json){
			//原来的位置
			if(attr=="opacity"){
				//如果遍历到的属性是opacity要乘以100
				var current = parseInt(getStyle(obj,attr)*100);	
			}else{
				var current = parseInt(getStyle(obj,attr));	
			}

			//速度					
			var speed = (json[attr]-current)/10;
			speed = speed>0?Math.ceil(speed):Math.floor(speed)


			//停止条件
			if(current==json[attr]){
				//如果遍历到的属性是opacity,赋值的时候要除以100
				if(attr=="opacity"){
					obj.style[attr] = json[attr]/100;
				}else if(attr == "zIndex"){
					obj.style[attr] = json[attr];
				}				
				else{
					obj.style[attr] = json[attr]+"px";
				}
					
			}else{
				current = current + speed;
				//如果遍历到的属性是opacity,赋值的时候要除以100
				if(attr=="opacity"){
					obj.style[attr] = current/100;
				}else if(attr=="zIndex"){
					obj.style[attr] = json[attr];
				}				
				else{
					obj.style[attr] = current+"px";
				}
				
				flag = false;
			}
		}
		if(flag){
			if(fn){
				fn();
			}
			clearInterval(obj.timer);
		}

	},20)
}



/*
作用:返回一个随机整数
参数:第一个是最小值,第二个最大值
返回值:最小到最大值之间的随机整数
*/
function rand(min,max){
	return min+Math.floor(Math.random()*(max-min+1));
}



/*
作用:通过id获取元素
参数:id
返回值:DOM节点
*/
function $id(id){
	return document.getElementById(id);
}

/*
作用:获取窗口可视区域的宽高
参数:无
返回值:json对象
*/

function getClient(){
	if(window.innerWidth!=undefined){
		return {
			width: window.innerWidth,
			height:window.innerHeight
		};
	}else if(document.compatMode=="CSS1Compat"){
		return {
			width:document.documentElement.clientWidth,
			height:document.documentElement.clientHeight
		};
	}else{
		return {
			width:document.body.clientWidth,
			height:document.body.clientHeight
		};
	}
}

function scroll(){
	// return {
	// 	left:document.documentElement.scrollLeft+document.body.scrollLeft,
	// 	top:document.documentElement.scrollTop+document.body.scrollTop
	// }
	return {
		left:document.documentElement.scrollLeft||document.body.scrollLeft,
		top:document.documentElement.scrollTop||document.body.scrollTop
	}
}

function getElements(className){
		//定义一个数组,用于存放符合条件的DOM节点
		var result = [];
		//第一步:获取页面上的所有标签
		var all = document.getElementsByTagName('*');
		//第二步:筛选其中类名叫one的元素
		for(var i=0;i<all.length;i++){
			if(all[i].className==className){
				//如果循环到的标签的类名和传入的类名一致,说明这个标签就是符合条件的
				result.push(all[i])
			}
		}
		return result;
}

//封装一个getStyle方法用于获取元素的样式
function getStyle(element,attr){
	if(window.getComputedStyle){
		return window.getComputedStyle(element,null)[attr];
	}else{
		return element.currentStyle[attr];
	}

}

function addEvent(dom,type,fn){
	if(dom.addEventListener){
		dom.addEventListener(type,fn,false)
	}else{
		dom.attachEvent("on"+type,fn)
	}
}


function trim(str){
	var reg = /(^\s+)|(\s+$)/g
	str = str.replace(reg,"")
	return str;
}



// 思路:封装一个匀速运动函数,可以实现指定元素,指定属性运动到指定目标位置,要求属性是数值型的,单位是px
// function animate(dom,attr,target,fn){
// 	clearInterval(dom.timer);
// 	dom.timer = setInterval(function(){
// 		//获取当前位置(属性:attr)
// 		var current = getStyle(dom,attr);
// 		if(attr == "opacity"){
// 			current = current*100
// 		}else{
// 			current = parseInt(current)
// 		}
// 		//设置速度(如果当前位置大于目标位置,速度为负数,否则为正数)
// 		var speed = current>target?-5:5;
// 		//计算下一次的位置
// 		var next = current + speed;
// 		//判断是否到达目标位置
// 		if(Math.abs(next-target)<=5){
// 			//计算的位置和目标位置距离不到一步,直接到位
// 			if(attr == "opacity"){
// 				dom.style.opacity = target/100;
// 				dom.style.filter = "alpha(opacity="+target+")";//ie678
// 			}else{
// 				dom.style[attr] = target + "px";
// 			}
// 			if(fn){
// 				fn()
// 			}
// 			clearInterval(dom.timer)
			
// 		}else{
// 			//元素定位
// 			if(attr == "opacity"){
// 				dom.style.opacity = next/100;
// 				dom.style.filter = "alpha(opacity="+next+")";
// 			}else{
// 				dom.style[attr] = next+"px";
// 			}
			
// 		}
		
// 	},30)
// }

//思路:封装一个缓动函数,可以实现指定元素,指定属性运动到指定目标位置,要求属性是数值型的,单位是px
//这个函数用于源代码的01-03题目
// function animate(dom,attr,target,fn){
// 	clearInterval(dom.timer);
// 	dom.timer = setInterval(function(){
// 		//获取当前值
// 		var current = getStyle(dom,attr);
// 		if(attr=="opacity"){
// 			//如果是透明度,值是小数,要乘以100
// 			current *= 100;
// 		}else{
// 			current = parseInt(current);//取整,去除px单位
// 		}
// 		//设置速度
// 		var speed = (target - current)/10;
// 		speed = speed>0?Math.ceil(speed):Math.floor(speed);
// 		//计算下一次的值
// 		var next = current + speed;
// 		if(attr=="zIndex"){
// 			next = target;
// 		}
// 		//判断是否到达目标值
// 		if(next==target){
// 			if(attr=="opacity"){
// 				dom.style.opacity = target/100;
// 				dom.style.filter = "alpha(opacity="+target+")";//ie678
// 			}else{
// 				dom.style[attr] = target + "px"
// 			}	
// 			if(fn){
// 				fn();//fn是动画完成以后执行的函数
// 			}				
// 			clearInterval(dom.timer);
// 		}else{
// 			//元素定位
// 			if(attr=="opacity"){
// 				dom.style.opacity = next/100;
// 				dom.style.filter = "alpha(opacity="+next+")";//ie678
// 			}else{
// 				dom.style[attr] = next + "px";
// 			}
// 		}
		
// 	},20)
// }

//这个函数用于源代码的04以后的题目
function animate(dom,json,fn){		
		/*
		dom:要缓动的节点
		json:就是要执行缓动的键值对{"width":600,"height":300,"left":300,"top":400}
		fn:是动画完成后的回调函数
		*/		
		clearInterval(dom.timer);//要用定时器先清定时器
		dom.timer = setInterval(function(){
			//设定标志值
			var flag = 1;

			for(var attr in json){
				//获取当前值
				var current = getStyle(dom,attr);
				if(attr=="opacity"){
					current *=100;//透明度需要乘以100					
				}else{
					current = parseInt(current);
				}
				//获取目标值
				var target = json[attr];
				//设置速度
				var speed = (target- current)/10;
				speed = speed>0?Math.ceil(speed):Math.floor(speed);
				//计算下一个位置
				var next = current + speed;
				if(attr == "zIndex"){
					next = target;
				}
				//判断是否到达目标位置
				if(next!=target){
					flag = 0;
				}	
				//元素定位
				if(attr=="opacity"){
					dom.style.opacity = next/100;
					dom.style.filter = "alpha(opacity="+next+")"
				}else if(attr=="zIndex"){
					dom.style[attr] = next;
				}else{
					dom.style[attr] = next+"px";
				}
			}
	
	
			if(flag){
				if(fn){
					fn();
				}
				clearInterval(dom.timer);
			}
	
		},20)
	}
//写一个函数,判断一个数是否是素数,如果是素数,返回true,如果不是素数,返回false
function isPrimeNumber(number){
	//如果number能被2到number-1中的任意一个整除,都不是素数,如果一个都不能整除,就是素数
	for(var i=2;i<=number-1;i++){
		if(number%i==0){
			return false;
		}
	}

	return true;
}


// 返回指定id的元素
function $id(id){
	return document.getElementById(id);
}


//通过类名获取元素
function getElements(className){
	//先获取所有标签
	var all = document.getElementsByTagName('*');
	//然后从中筛选出符合指定类名的元素,放在一个数组里面返回
	//就需要一个存放元素的空数组
	var result = [];
	//循环判断每一个元素的className是否等于传入的className;
	for(var i=0;i<all.length;i++){
		if(all[i].className == className){
			//这就是符合条件的元素,放到数组中
			result[result.length] = all[i];
		}
		//如果类名不同,就什么都不干
	}
	//把数组通过return返回出去
	return result;
}

/*
使用说明:
dom参数:要获取样式的元素节点
attr参数:要获取的样式名,字符串
返回值:获取到的元素样式的属性值,字符串
*/
function getStyle(dom,attr){
	if(window.getComputedStyle){
		return window.getComputedStyle(dom,null)[attr];
	}else{
		return dom.currentStyle[attr];
	}
}


//测算元素距离页面的距离
function getDistance(dom){
	var totalLeft = 0;
	var totalTop = 0;
	do{
		totalLeft+= dom.offsetLeft;
		totalTop+=dom.offsetTop;
		//下一次的dom节点就是本次dom节点的最近的有定位的父元素
		dom = dom.offsetParent;
	}while(dom.nodeName!="BODY")			

	return {
		left:totalLeft,
		top:totalTop
	}

}

//事件监听
function addEvent(dom,type,fn){
	if(dom.addEventListener){
		//说明dom 上有addEventListener这个属性
		dom.addEventListener(type,fn)
	}else{
		//说明是IE678
		dom.attachEvent("on"+type,fn)
	}
}


//封装一个函数,返回鼠标按键,要求:左0  中1  右2
function getButton(e){
	//普通的函数
	if(e){
		//如果接到的e确实有值,说明e不是undefined,说明当前浏览器不是IE678
		return e.button;
	}else{
		//就是IE678
		switch(window.event.button){
			case 1:
				return 0;
			case 4:
				return 1;
			case 2:
				return 2;
		}
	}
}

//去除str前后空格
function trim(str){
	return str.replace(/(^\s+)|(\s+$)/g,"")
};


//获取页面的滚动距离
function getScroll(){
	return {
		left:document.documentElement.scrollLeft||document.body.scrollLeft,
		top:document.documentElement.scrollTop||document.body.scrollTop
	}
}


//浏览器可视区域的宽高
function getClient(){
	if(document.compatMode=="BackCompat"){
		return document.body.clientWidth;
	}else{
		return document.documentElement.clientWidth;
	}
}


//封装一个函数,可以让指定目标(dom)运动到指定位置(target),是匀速运动,每20毫秒运动30px;
function move(dom,target){			
	clearInterval(dom.timer)
	dom.timer = setInterval(function(){
		//1 获取元素原来的位置
		var current = dom.offsetLeft;
		//2 确定运动速度
		var speed = target>current?5:-5;
		//3 计算元素的当前位置
		current = current + speed;
		//4 判断是否到达目标:
		if(Math.abs(current-target)<=5){
			current = target;
			clearInterval(dom.timer)
		}
		//5 定义目标元素
		dom.style.left = current+"px";
	},20)
}

//封装一个函数,实现透明度匀速运动:target必须是0-100之间的整数
function move2(dom,target){
	clearInterval(dom.timer)
	//每隔一段时间(20毫秒),透明度变化3
	dom.timer = setInterval(function(){
		//1 获取元素原来位置
		var current = parseInt(getStyle(dom,"opacity")*100);
		//2 计算速度
		var speed = target>current?3:-3;
		//3 计算元素现在位置 
		current = current + speed
		//4 判断是否到达目标
		if(Math.abs(current-target)<=3){
			current = target;
			clearInterval(dom.timer)
		}
		//5 定位元素
		dom.style.filter = "alpha(opacity="+current+")";
		dom.style.opacity = current/100;
	},20)
}

//缓动函数封装:单属性缓动
function animate1(dom,attr,target,fn){
	//每隔一段时间(20毫秒),让dom元素的attr属性运动一段距离(剩余路程的10分之1)
	clearInterval(dom.timer);
	dom.timer = setInterval(function(){
		//1 获取元素原来的位置
		var current = parseInt(getStyle(dom,attr));
		//2 计算速度
		var speed = (target-current)/10;
		speed = speed>0?Math.ceil(speed):Math.floor(speed);
		//3 计算元素的的当前位置
		current = current + speed;
		//4 判断到达目标位置
		if(current==target){
			clearInterval(dom.timer)
			if(fn){fn()};
		}
		//5 定位元素
		dom.style[attr] = current+"px";
	},20)

}

function animate(dom,target,fn){
	clearInterval(dom.timer)
	dom.timer = setInterval(function(){
		var flag = true
		//每间隔20毫秒,width和left就缓动一段距离,直到他们都到达目标位置
		for(var attr in target){
			//1 获取元素原来位置
			if(attr=="opacity"){
				var current = parseInt(getStyle(dom,"opacity")*100)
			}else{
				var current = parseInt(getStyle(dom,attr))
			}					
			//2 计算速度
			var speed = (target[attr]-current)/10
			speed = speed>0?Math.ceil(speed):Math.floor(speed)
			//3 计算元素当前位置					
			if(attr=="zIndex"){
				current = target.zIndex;											
			}else{
				current = current+speed
			}
			//4 判断是否到达目标
			if(current!=target[attr]){
				flag = false;
			}
			//5 定位元素
			if(attr=="zIndex"){
				dom.style.zIndex = current;
			}
			else if(attr=="opacity"){
				dom.style.opacity = current/100;
				dom.style.filter = "alpha(opacity="+current+")";
			}
			else{
				dom.style[attr] = current+"px";
			}			
			
		}
		if(flag){
			clearInterval(dom.timer)
			if(fn) {
				fn()
			}
		}

	},20)

}

//生成一个n到m之间的随机整数
function rand(n,m){
    return n+parseInt(Math.random()*(m-n+1));
}

//传入一个数组和一个元素,判断数组中是否存在该元素,存在返回true,不存在返回false
function has(arr,data){
    for(var i=0;i<arr.length;i++){
        if(data===arr[i]){
            //continue和break;
            //在此处,循环在函数中,return终止了函数执行,就是终止了循环
            return true;
        }
    }
    //如果函数能运行到此处,说明没有终止函数
    return false;
}
//传入一个数组,返回数组去重以后的结果,不改变原数组
function norepeat(arr){
    var result = [];
    for(var i=0;i<arr.length;i++){
        if(!has(result,arr[i])){
            //如果进入此处,说明arr[i]在result里面不存在,可以放进去
            result.push(arr[i])
        }
    }
    return result;
}

//格式化时间:YYYY-MM-DD HH-mm-ss
//times是一个时间戳:指定时间距离格林威治时间的毫秒数,是可选参数
function formatDate(times){
    
    var time = new Date;
    if(times){
        //如果进入此处,说明time有实参赋值,因为如果没有实参赋值,他是undefined
        //如果传入参数,表示不是当前时间,是你指定的时间
        time.setTime(times)
    }
    //年
    var year = time.getFullYear();
    //月
    var month = time.getMonth()+1;//month取值0-11之间,显示要变成1-12之间,所以+1
    //如果月份是一位数,前面要补0;
    month = month<10?"0"+month:month;//三目运算
    //日
    var date = time.getDate();
    //如果日是一位数,前面要补0;
    date = date<10?"0"+date:date;
    //小时
    var hour = time.getHours();
    hour = hour<10?"0"+hour:hour;
    //分
    var minute = time.getMinutes();
    minute = minute<10?"0"+minute:minute;
    //秒
    var second = time.getSeconds();
    second = second<10?"0"+second:second;
    return year+"-"+month+"-"+date+" "+hour+":"+minute+":"+second;
}

//获取滚动的距离{top:"",left:""}

function getScroll(){
    if(window.pageYOffset){
        return {
            top:window.pageYOffset,
            left:window.pageXOffset
        }
    }else if(document.documentElement.scrollLeft){
        return {
            top:document.documentElement.scrollTop,
            left:document.documentElement.scrollLeft
        }
    }else{
        return {
            top:document.body.scrollTop,
            left:document.body.scrollLeft
        }
    }
}
//获取指定dom的指定样式值
function getStyle(dom,attr){
    if(window.getComputedStyle){
        //如果window.getComputedStyle不是undefined,说明是非IE浏览器
        return window.getComputedStyle(dom,null)[attr];
    }else{
        //如果window.getComputedStyle是undefined,说明是IE浏览器
        return dom.currentStyle[attr]
    }
    
}
效果及样式要求：
 - 页面布局效果，初始效果图 
 - 添加新任务，鼠标移到任务上显示 编辑和删除按钮 
 - 点击 编辑任务内容位置替换为输入框，自动获得焦点，失去焦点完成编辑，恢复原样
 - 点击 删除 把当前任务从待办任务列表删除
 - 勾选全部  所有任务为选中状态
 - 点击 处理 所有选中的任务从待办任务列表删除，并添加到已处理任务列表
 - 点击 删除 所有选中的任务从待办任务列表删除
 - 全选框和每个任务的选择框关联
 html样式：
 

```html
	<body>
		<div class="todo">    
		<h1>待办任务列表</h1>    
		<input type="text" class="ipt">    
		<button class="add">添加</button>    
		<ul class="list">        
			<li>            
				<input type="checkbox">            
				<span class="con">任务1</span>            
				<span class="remove">删除</span>            
				<span class="edit">编辑</span>        
			</li>        
			<li>            
				<input type="checkbox">            
				<span class="con">任务2</span>            
				<span class="remove">删除</span>            
				<span class="edit">编辑</span>        
			</li>        
				<li>            
					<input type="checkbox">            
					<span class="con">任务3</span>            
					<span class="remove">删除</span>            
					<span class="edit">编辑</span>        
				</li>    
		</ul>    
		<span class="selAll">        
			<input type="checkbox" id="all"> 全部    </span>    
			<span class="done">处理</span>    
			<span class="removes">删除</span>    
			<br>    
			<br>    
			<br>    
			<h1>已处理任务列表</h1>    
			<ul class="doneList">        
				<!-- <li>任务1</li> -->        
				<!-- <li>任务2</li> -->    
			</ul>
		</div>
		<script src="./js/utils.js">
		</script><script src="./js/todo.js"></script>
		</body>
```
css样式：

```css
*{margin: 0; padding: 0; list-style: none;}
.todo{    
	width: 705px;    
	background-color: #eee;    
	padding: 1px 20px;    
	margin: 0 auto;
}
.todo h1{    
	text-align: center;    
	margin: 20px 0;
}
.todo .ipt{    
	font-size: 18px;    
	line-height: 30px;    
	width: 600px;    
	padding: 0 8px;
}
.todo .add{    
	line-height: 30px;    
	font-size: 18px;    
	padding: 0 20px;
}
.todo .list{    
	padding: 10px;
}
.todo .list li{    
	line-height: 30px;    
	font-size: 18px;    
	background-color: #ccc;    
	margin-bottom: 10px;    
	padding: 4px 15px;
}
.todo .list .con{    
	padding: 0 2px;
}
.todo .list .repIpt{    
	font-size: 16px;    
	line-height: 26px;    
	width: 440px;
}
.todo .list .remove{    
	float: right;    
	font-size: 16px;    
	display: none;    
	color: red;    
	cursor: pointer;   
	 margin: 0 20px;
}
.todo .list li:hover .remove{    
	display: block;
}
.todo .list .edit{    
	float: right;    
	font-size: 16px;    
	display: none;    
	color: red;    
	cursor: pointer;
}
.todo .list li:hover .edit{    
	display: block;
}
.selAll, .done, .removes{    
	margin: 0 20px;    
	cursor: pointer;    
	color: blue;
}
.doneList{    
	padding: 0 10px 10px;
}
.doneList li{    
	font-size: 16px;    
	color: #999;    
	line-height: 30px;    
	margin-bottom: 10px;    
	padding: 2px 10px;    
	background-color: #c2c2c2;
}
```
通用js

```javascript
	// 添加事件监听（兼容低版本浏览器）
	function addEvent(dom,type,cb){    
		if (dom.attachEvent) {        
			dom.attachEvent('on'+type,cb);    
		} else {        
			dom.addEventListener(type,cb);    
		}
	}
	// 移除事件监听（兼容低版本浏览器）
	function removeEvent(dom,type,cbName){    
		if (dom.detachEvent) {        
			dom.detachEvent('on'+type,cbName);    
		} else {        
			dom.removeEventListener(type,cbName);    
		}
	}
	// 事件委托封装
	function on(parent,type,selector,callback){    
		addEvent(parent,type,function (ev){        
			var e = ev || event;//事件对象        
			var target = e.target || e.srcElement;//事件源        
			// 获取选择器第一个字符（ . ）        
			var sel_first = selector.substr(0,1);        
			// 记录第一个字符之后的属性值（ add ）        
			var sel_last = null;        
			// 记录选择器类型（id className tagName）        
			var sel_type = null;        
			// 判断传入的是什么选择器        
			switch(sel_first){            
				case '.': // 类选择器                
					sel_last = selector.slice(1);                
					sel_type = 'className';                
					break;            
				case '#': // id选择器                
					sel_last = selector.slice(1);                
					sel_type = 'id';                
					break;            
				default:                
					sel_last = selector;                
					sel_type = 'tagName';        
				}
        			// 只有传入selector元素被点击时触发        
        			if (sel_type === 'tagName') {            
        				// 如果是标签选择器，转成大写            
        				sel_last = sel_last.toUpperCase();        
        			}        
        			if (target[sel_type] === sel_last){            
        				// callback(e);            
        				callback.call(target,e);        
        			}    
        		});
        	}

```

调用事件js⭐⭐⭐

```javascript
// 缓存元素
var ipt = document.querySelector('.ipt');
var list = document.querySelector('.list');
var add = document.querySelector('.add');
var all = document.querySelector('#all');
var done = document.querySelector('.done');
var remove = document.querySelector('.removes');
var doneList = document.querySelector('.doneList');
//添加任务
add.onclick = function (){    
	var addText = ipt.value;    
	if ( !addText ) {// 空值判断        
		return;    
	}    
	// 要插入的dom结构    
	var addDom = '<li><input type="checkbox"><span class="con">'+addText+'</span><span class="remove">删除</span><span class="edit">编辑</span></li>';    
	list.innerHTML += addDom;    
	// 判断全部是否勾选    
	if ( all.checked ){        
		var checks = document.querySelectorAll('.list input');        
		for (var i = 0, len = checks.length; i < len; i++){            
			checks[i].checked = true;        
		}    
	}    
	ipt.value = '';// 清空输入框
};
//选择任务（事件委托）
on(list,'click','input',function (){    
	var selectArr = [];//存储勾选状态    
	var checks = document.querySelectorAll('.list input');    
	// 遍历所有任务的勾选状态    
	for (var i = 0, len = checks.length; i < len; i++){        
		if ( checks[i].checked ) {            
			selectArr.push('a');        
		} else {            
			selectArr.push('b');        
		}    
	}    
	// 判断全选是否需要选中    
	if ( has(selectArr,'b') ) {        
		all.checked = false;    
	} else {        
	all.checked = true;    
	}
});
// 编辑任务
on(list,'click','.edit',function (){    
	// 保存当前任务内容    
	var conTxt = this.parentNode.children[1].innerText;    
	// 创建输入框    
	var replaceDom = document.createElement('input');    
	replaceDom.className = 'repIpt';    
	replaceDom.value = conTxt;    
	// 用输入框替换原来的任务节点    
	this.parentNode.replaceChild(replaceDom,this.parentNode.children[1]);    
	// 自动获得焦点    
	replaceDom.focus();
    
    	// 编辑完成    
    	replaceDom.onblur = function (){        
    		// 创建任务节点 <span class="con">任务1</span>        
    		var newSpan = document.createElement('span');        
    		newSpan.className = 'con';        
    		newSpan.innerText = this.value;        
    		// 用任务节点来替换输入框        
    		this.parentNode.replaceChild(newSpan,this);    
    	}
    });
// 删除单条任务
on(list,'click','.remove',function (){    
	this.parentNode.parentNode.removeChild(this.parentNode);
});
// 点击全部
all.onclick = function (){    
	var checks = document.querySelectorAll('.list input');    
	for (var i = 0, len = checks.length; i < len; i++){        
		if ( this.checked ) {            
			checks[i].checked = true;        
		} else {            
			checks[i].checked = false;        
		}    
	}
}

// 批量处理
done.onclick = function (){    
	var checks = document.querySelectorAll('.list input');    
	for (var i = 0, len = checks.length; i < len; i++){        
		if ( checks[i].checked ) {            
			// 已勾选任务的内容            
			var tastTxt = checks[i].parentNode.children[1].innerText;            
			// 创建已处理任务节点            
			var doneLi = document.createElement('li');            
			doneLi.innerText = tastTxt;            
			doneList.appendChild(doneLi);            
			// 删除列表中对应的任务节点            
			checks[i].parentNode.parentNode.removeChild(checks[i].parentNode);            
			// 取消全选            
			all.checked = false;        
		}    
	}
}

// 批量删除
remove.onclick = function (){    
	var checks = document.querySelectorAll('.list input');    
	for (var i = 0, len = checks.length; i < len; i++){        
		if ( checks[i].checked ) {            
			// 删除代表列表中对应的任务            
			checks[i].parentNode.parentNode.removeChild(checks[i].parentNode);            
			// 取消全选            
			all.checked = false;        
		}    
	}
}

```

![在这里插入图片描述](https://img-blog.csdnimg.cn/20201102205524177.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NTg5NjEyNg==,size_16,color_FFFFFF,t_70#pic_center)
![在这里插入图片描述](https://img-blog.csdnimg.cn/20201102205547718.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NTg5NjEyNg==,size_16,color_FFFFFF,t_70#pic_center)


![在这里插入图片描述](https://img-blog.csdnimg.cn/20201102205555256.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NTg5NjEyNg==,size_16,color_FFFFFF,t_70#pic_center)

![在这里插入图片描述](https://img-blog.csdnimg.cn/20201102205601639.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NTg5NjEyNg==,size_16,color_FFFFFF,t_70#pic_center)
![在这里插入图片描述](https://img-blog.csdnimg.cn/2020110220560853.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NTg5NjEyNg==,size_16,color_FFFFFF,t_70#pic_center)


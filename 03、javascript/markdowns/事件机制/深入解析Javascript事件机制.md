# 深入解析Javascript事件机制

## 什么是事件机制

事件是在编程时系统内发生的动作或者发生的事情，系统会在事件出现的时候触发某种信号并且会提供一个自动加载某种动作的机制。每个事件都有事件处理器（有时也叫事件监听器），也就是触发事件时运行的代码块。严格来说事件监听器监听事件是否发生，然后事件处理器对事件做出反应。

## 事件机制的组成

一个事件机制有三个组成部分：

1.**事件源**：即事件的发送者

2.**事件**：事件源发出的一种信息或状态

3.**事件侦听者**：对事件作出反应的对象

## DOM事件流

事件流(Event Flow)指的就是「**网页元素接收事件的顺序**」。事件流可以分成两种机制：

- 事件捕获(Event Capturing)
- 事件冒泡(Event Bubbling)

当一个事件发生后，会在子元素和父元素之间传播（propagation）。这种传播分成三个阶段：

1. 捕获阶段：事件从window对象自上而下向目标节点传播的阶段；
2. 目标阶段：真正的目标节点正在处理事件的阶段；
3. 冒泡阶段：事件从目标节点自下而上向window对象传播的阶段。

### 事件捕获

 ![1642583891796](%E6%B7%B1%E5%85%A5%E8%A7%A3%E6%9E%90Javascript%E4%BA%8B%E4%BB%B6%E6%9C%BA%E5%88%B6.assets/1642583891796.png)



 事件捕获指的是「从启动事件的元素节点开始，逐层往下传递」，直到最下层节点，也就是div。 

 假设HTML 如下： 

```js
<html>
<head>
  <title>事件捕获</title>
</head>
<body>

  <div>click</div>

</body>
</html>
```

假设我们点击(click)了`click`元素，那么在「事件捕获」的机制下，触发事件的顺序会是：

1. document
2. html
3. body

4. <div>click</div>

### 事件冒泡

![1642584067185](%E6%B7%B1%E5%85%A5%E8%A7%A3%E6%9E%90Javascript%E4%BA%8B%E4%BB%B6%E6%9C%BA%E5%88%B6.assets/1642584067185.png)



 假设HTML 同样如下： 

```html
<html>
<head>
  <title>事件冒泡</title>
</head>
<body>

  <div>click</div>

</body>
</html>
```

 假设我们点击(click)了`点我`元素，那么在「事件冒泡」的机制下，触发事件的顺序会是： 

1. `click`
2. <body>
3. <html>
4. `document`

事件是依据哪种机制执行？

两种都会执行



![4d5795f71e086d3f886c82385d4e8706](%E6%B7%B1%E5%85%A5%E8%A7%A3%E6%9E%90Javascript%E4%BA%8B%E4%BB%B6%E6%9C%BA%E5%88%B6.assets/4d5795f71e086d3f886c82385d4e8706.jpg)

假设现在的事件是点击上图中蓝色的`。

那么当td的`click`事件发生时，会先走红色的「capture phase」：

1. `Document`
2. html
3. body
4. table
5. tbody
6. tr
7. td(实际被点击的元素)

由上而下依序触发它们的`click`事件。

然后到达「Target phase」后再继续执行绿色的「bubble phase」，反方向由`一路往上传至`Document，整个事件流到此结束。

### **事件监听**

```bash
EventTarget.addEventListener
```

`addEventListener()`基本上有三个参数，分别是「事件名称」、「事件的处理程序」(事件触发时执行的`function`)，以及一个「Boolean」值，由这个Boolean决定事件是以「捕获」还是「冒泡」机制执行，若不指定则预设为「冒泡」。使用这种方式来注册事件的好处是：同一个元素的同种事件可以绑定多个函数，按照绑定顺序执行。

```js
var btn = document.getElementById('btn');

btn.addEventListener('click', function(){
  console.log('kaka');
}, false);

btn.addEventListener('click', function(){
  console.log('tata');
}, false);
```

 点击后`console`出现： 

```js
"kaka"
"tata"
```

### 事件代理

 在实际的开发当中，利用事件流的特性，我们可以使用一种叫做事件代理的方法。 

```js
<ul id="color-list">
 <li>red</li>
 <li>yellow</li>
 <li>blue</li>
 <li>green</li>
 <li>black</li>
 <li>white</li>
</ul>
```

 如果点击页面中的li元素，然后输出li当中的颜色，我们通常会这样写: 

```js
(function(){
 var color_list = document.getElementById('color-list');
 var colors = color_list.getElementsByTagName('li');
 for(var i=0;i<colors.length;i++){
 colors[i].addEventListener('click',showColor,false); };
 function showColor(e){
 var x = e.target;
 console.log("The color is " + x.innerHTML);
 };
})();
```

 利用事件流的特性，我们只绑定一个事件处理函数也可以完成： 

```js
(function(){
  var color_list =document.getElementById('color-list');
  color_list.addEventListener('click',showColor,false);
  function showColor(e){
  var x = e.target;
  if(x.nodeName.toLowerCase() === 'li'){
  console.log('The color is ' + x.innerHTML);
  }
 }
})();
```

 使用事件代理的好处不仅在于将多个事件处理函数减为一个，而且对于不同的元素可以有不同的处理方法。假如上述列表元素当中添加了其他的元素（如：a、span等），我们不必再一次循环给每一个元素绑定事件，直接修改事件代理的事件处理函数即可。 

### 冒泡还是捕获？

 对于事件代理来说，在事件捕获或者事件冒泡阶段处理并没有明显的优劣之分，但是由于事件冒泡的事件流模型被所有主流的浏览器兼容，从兼容性角度来说还是建议大家使用事件冒泡模型。 

## 事件注意点

- 事件分为三个阶段： 事件捕获 --> 事件目标 --> 事件冒泡
- 事件捕获：事件发生时（onclick,onmouseover……）首先发生在document上，然后依次传递给body、……最后到达目的节点（即事件目标）。
- 事件冒泡：事件到达事件目标之后不会结束，会逐层向上冒泡，直至document对象，跟事件捕获相反

参考链接：https://cloud.tencent.com/developer/article/1926314
# 数据类型
## 基本(值)类型
### string: 

### number: 

```javascript
			//整点数 浮点数
      console.log(0.1 + 0.2); //0.30000000004
      console.log(0.3 / 0.2); //1.49999999998
      console.log(0.3 - 0.2 === 0.2 - 0.1); //false

      //NaN非数字类型  数据类型number
      console.log(5 - "a"); //NaN

      console.log(typeof NaN);

      NaN === NaN  //false
      console.log(boolean(NaN));//false
      

      //  Infinity  无穷
```

### boolean:   判断❤️

​				<u>🌟除了underfined null false 0 NaN “” ‘’为false，其余为true</u>

### undefined:   

表示“未定义”或不存在

### null: null

## 对象类型
### object: 基本对象类型

### function: 特殊对象, 可以执行

### array: 特殊对象, 可通过下标执行, 内部有序

## 判断数据类型
* typeof  
    * 返回数据类型的字符串表达
    * 可以判断数值, 字符串, undefined, boolean, function
    * 不能判断null与object与array, 返回都是Object
* instanceof
    * 返回boolean值, 只能判断对象的具体类型, 即是普通对象, 函数还是基本类型
* ===(全等)
    * 可以判断undefined与null, 由于它们的值只有1个
* Object.prototype.toString.call()
```javascript
     //typrof
      console.log(typeof 123); //number
      console.log(typeof "123"); //string
      console.log(typeof false); //boolean
      function tp() {}
      console.log(typeof tp); //function
      console.log(typeof underfined); //underfined

      console.log(typeof({}));//object
      console.log(typeof([]));//object
      console.log(typeof(null));//object

      //instance 常用来区分数组和对象
      var array =[]
      var object ={}
      console.log(array instanceof Array);//true
      console.log(object instanceof Array);//false

//Object.prototype.toString.call()
Object.prototype.toString.call(2) // "[object Number]"
Object.prototype.toString.call('') // "[object String]"
Object.prototype.toString.call(true) // "[object Boolean]"
Object.prototype.toString.call(undefined) // "[object Undefined]"
Object.prototype.toString.call(null) // "[object Null]"
Object.prototype.toString.call(Math) // "[object Math]"
Object.prototype.toString.call({}) // "[object Object]"
Object.prototype.toString.call([]) // "[object Array]"

```

## 相关问题
1. undefined与null的区别
   * undefined: **创建了变量未赋值**
   * null: 创建了变量并赋值, 赋值为null
   * 在if中自动转为false，甚至null == underfined
   * null**表示空的对象转为数值为0**，underfined表示‘此处无定义’原始值，转为数值为NaN
   
   ```javascript
         console.log(Number(null));//0
         console.log(5 + null);//5
         console.log(Number(undefined));//NaN
         console.log(5 + undefined);//NaN
   ```
   
   
   
2. 什么时候赋值为null
   * 初始赋值为null, 表明将要赋值为对象
   * **最后赋值为null, 让这个变量原来指向的对象被垃圾回收机制回收**
   
3. 严格区分变量类型与数据类型
   * 数据类型
        * 基本类型, 对象类型
   * 变量类型(内存值类型)
        * 基本类型, 引用类型
# 数据_内存_变量
1. 什么是数据
   * 存储在内存中并代表特定信息, 本质是0101...
   * 数据特点: 可传递, 可运算
   * 内存中所有可操作的目标
        * 算数运算
        * 逻辑运算
        * 赋值
        * 运行函数
2. 什么是内存
   * 内存条通电后产生可储存数据的临时空间
   * 内存产生与消失: 通电产生, 断电消失
   * 一块小内存中存在两种数据: 基本数据, 地址值
   * 内存两种类型: 栈空间(全局变量或局部变量), 堆空间(对象)
3. 变量
   * 可变化的量, 由变量名与变量值组成
   * 每个变量都对应一块小内存, 变量名用来查找对应的内存，变量值就是内存中保存的数据
4. 内存, 数据, 变量三者间的关系
   * 内存是用来存储数据的临时空间
   * 变量是内存的标识
## 相关问题
1. var a = xxx, a内存中保存的是什么
   * xxx是<u>基本类型</u>, 保存的是这个基本类型值
   * xxx是<u>引用类型</u>，保存的是这个引用类型的内存地址值
   * xxx是个<u>变量</u>，保存的是这个变量所存储的值(若是基本类型则就是这个值, 若是引用类型则是这个引用类型的内存地址值)
2. 引用变量赋值问题
   * 多个引用变量指向同一个对象, 通过一个变量**<u>修改</u>**这个对象的值, 另一个变量只能看到修改后的值
   * 两个引用变量指向同一个对象,将其中一个变量**<u>赋值</u>**为新对象, 另一个引用变量仍指向原对象
3. 在函数调用时是值传递还是引用传递
   * 理解1: 无论变量类型都是值(基本/地址值)传递
   * 理解2: 可能是值传递, 也可能是引用传递(地址值)
4. js如何管理内存
   * 内存生命周期
     1. 分配小内存空间, 得到它的使用权
     2. 存储数据, 可以重复使用
     3. 释放小内存空间
     4. 释放内存 
   * 释放内存
     1. 局部变量: 函数执行完自动释放
     2. 对象: 成为垃圾对象后在某个时间被垃圾处理机制释放
# 对象
1. 什么是对象
   * 多个数据的封装体
   * 用来保存多个数据的容器
   * 一个对象代表现实中的一个事物
2. 为什么要用对象
   * 统一管理多个数据
3. 对象的组成
   * 属性: 属性名(字符串)与属性值(任意类型)
   * 方法: 一种特别的属性(属性值是一个函数)
4. 如何访问对象内部数据
   * .属性名    编码简单, 有时无法使用
   * [\'属性名\'] 编码复杂, 但能随意使用
5. 什么时候必须使用[\'属性名\']
   * 属性名包含特殊字符, 如-. 空格
   * 属性名不确定时, 使用的是变量的值
```
var foo = "bar";
      var obj = {
        foo: 1,
        bar: 2,
      };
      console.log(obj.foo);//1
      console.log(obj[foo]);//2
      console.log(obj["foo"]);//1
```

❤️上面代码中，引用对象`obj`的`foo`属性时，如果使用点运算符，`foo`就是字符串；如果使用方括号运算符，但是不使用引号，那么`foo`就是一个变量，指向字符串`bar`。

### 属性查看 Object.keys()

```js
var obj = {
  key1: 1,
  key2: 2
};

Object.keys(obj);
// ['key1', 'key2']
```

### 属性删除 delete

```js
var obj = { p: 1 };
Object.keys(obj) // ["p"]

delete obj.p // true
obj.p // undefined
Object.keys(obj) // []
```

### 属性是否存在：in 运算符。 hasOwnProperty

但是他返回true同时无法判定是本身还是继属性

```js
var obj = { p: 1 };
'p' in obj // true
'toString' in obj // true
```

使用hasOwnProperty可以

```js
var obj = {};
if ('toString' in obj) {
  console.log(obj.hasOwnProperty('toString')) // false
}
```



### for in遍历对象



- 它遍历的是对象所有可遍历（enumerable）的属性，会跳过不可遍历的属性。
- 它不仅遍历对象自身的属性，还遍历继承的属性。

```js
var obj = {a: 1, b: 2, c: 3};

for (var i in obj) {
  console.log('键名：', i);
  console.log('键值：', obj[i]);
}
// 键名： a
// 键值： 1
// 键名： b
// 键值： 2
// 键名： c
// 键值： 3
```

不可遍历对象属性可以使用hasOwnProperty方法





# 函数 

1. 什么是[函数](https://wangdoc.com/javascript/types/function.html)
   * 实现特定功能的n条语句的封装体
   * 只有函数可以执行, 其他类型的数据不能执行
2. 为什么要用函数
   * 提高代码复用
   * 便于阅读交流
3. 如何定义函数
   * 函数声明
   * 表达式
4. 如何调用(执行)函数
   * 直接调用: test()
   * 通过对象调用: obj.test()
   * new调用: new test()
   * test.call/apply(obj): 临时让test函数变成obj的方法进行调用

toString 返回字符串为源码

❤️**函数执行时所在的作用域，是定义时的作用域，而不是调用时所在的作用域。**



### 两大传递方式 是修改地址还是改值

函数参数如果是原始类型的值（数值、字符串、布尔值），传递方式是传值传递（passes by value）。这意味着，在函数体内修改参数值，不会影响到函数外部。

```js
var p = 2;

function f(p) {
  p = 3;
}
f(p);

p // 2
```

上面代码中，变量`p`是一个原始类型的值，传入函数`f`的方式是传值传递。因此，在函数内部，`p`的值是原始值的拷贝，无论怎么修改，都不会影响到原始值。

但是，如果函数参数是复合类型的值（数组、对象、其他函数），传递方式是传址传递（pass by reference）。也就是说，传入函数的原始值的地址，因此在函数内部修改参数，将会影响到原始值。

```js
var obj = { p: 1 };

function f(o) {
  o.p = 2;
}
f(obj);

obj.p // 2
```

上面代码中，传入函数`f`的是参数对象`obj`的地址。因此，在函数内部修改`obj`的属性`p`，会影响到原始值。

注意，如果函数内部修改的，不是参数对象的某个属性，而是替换掉整个参数，这时不会影响到原始值。

```js
var obj = [1, 2, 3];

function f(o) {
  o = [2, 3, 4];
}
f(obj);

obj // [1, 2, 3]
```

上面代码中，在函数`f()`内部，参数对象`obj`被整个替换成另一个值。这时不会影响到原始值。这是因为，形式参数（`o`）的值实际是参数`obj`的地址，重新对`o`赋值导致`o`指向另一个地址，保存在原地址上的值当然不受影响。

### arguments对象  在函数体内部读取所有参数

```js
var f = function (one) {
  console.log(arguments[0]);
  console.log(arguments[1]);
  console.log(arguments[2]);
}

f(1, 2, 3)
// 1
// 2
// 3
```

只有严格模式下使用arguments对象修改不了 传入的值

#### 与数组关系

需要注意的是，虽然`arguments`很像数组，但它是一个对象。数组专有的方法（比如`slice`和`forEach`），不能在`arguments`对象上直接使用。

如果要让`arguments`对象使用数组方法，真正的解决方法是将arguments转为真正的数组。下面是两种常用的转换方法：`slice`方法和逐一填入新数组。

```js
var args = Array.prototype.slice.call(arguments);

// 或者
var args = [];
for (var i = 0; i < arguments.length; i++) {
  args.push(arguments[i]);
}
```

### 闭包

```js
function f1() {
  var n = 999;
  function f2() {
    console.log(n);
  }
  return f2;
}

var result = f1();
result(); // 999
```

上面代码中，函数`f1`的返回值就是函数`f2`，由于`f2`可以读取`f1`的内部变量，所以就可以在外部获得`f1`的内部变量了。

闭包就是函数`f2`，即能够读取其他函数内部变量的函数。由于在 JavaScript 语言中，只有函数内部的子函数才能读取内部变量，因此可以把闭包简单理解成“定义在一个函数内部的函数”。闭包最大的特点，就是它可以“记住”诞生的环境，比如`f2`记住了它诞生的环境`f1`，所以从`f2`可以得到`f1`的内部变量。在本质上，闭包就是将函数内部和函数外部连接起来的一座桥梁。



```js
function createIncrementor(start) {
  return function () {
    return start++;
  };
}

var inc = createIncrementor(5);

inc() // 5
inc() // 6
inc() // 7
```

上面代码中，`start`是函数`createIncrementor`的内部变量。通过闭包，`start`的状态被保留了，每一次调用都是在上一次调用的基础上进行计算。从中可以看到，闭包`inc`使得函数`createIncrementor`的内部环境，一直存在。所以，闭包可以看作是函数内部作用域的一个接口。

为什么闭包能够返回外层函数的内部变量？原因是闭包（上例的`inc`）**用到了外层变量（`start`）**，导致外层函数（`createIncrementor`）不能从内存释放。**只要闭包没有被垃圾回收机制清除，外层函数提供的运行环境也不会被清除，它的内部变量就始终保存着当前值，供闭包读取。**

```js
function Person(name) {
  var _age;
  function setAge(n) {
    _age = n;
  }
  function getAge() {
    return _age;
  }

  return {
    name: name,
    getAge: getAge,
    setAge: setAge
  };
}

var p1 = Person('张三');
p1.setAge(25);
p1.getAge() // 25
```

上面代码中，函数`Person`的内部变量`_age`，通过闭包`getAge`和`setAge`，变成了返回对象`p1`的私有变量。

注意，外层函数每次运行，都会生成一个新的闭包，而这个闭包又会保留外层函数的内部变量，所以内存消耗很大。因此不能滥用闭包，否则会造成网页的性能问题。



# 回调函数

1. 什么函数属于回调函数
   * 自己定义过的
   * 自己没有调用的
   * 能被执行的(某个时刻或者某种条件下)
2. 常见的回调函数
   * dom事件回调函数-->发生事件的dom元素
   * 定时器回调函数-->window
   * ajax回调函数-->
   * 生命周期回调函数
# 类数组

字符串。对象。arguments对象

将“类似数组的对象”转为真正的数组，然后再直接调用数组的`forEach`方法。

```js
var arr = Array.prototype.slice.call('abc');
arr.forEach(function (chr) {
  console.log(chr);
});
// a
// b
// c
```



# IIFE(立即调用函数表达式)

## 形式
```javascript
(function(){

})()
```
## 作用
* 隐藏实现
* 不会污染外部作用域

用法示例:
```javascript
(function(){
    var a = 0;
    function test(){
        console.log(++a);
    }
    window.$ = function(){
        return {test: test};
    }
})();
$().test()
//输出为1
```
# this
1. this是什么
   * 任何函数本质都是通过某个对象来调用的, 如果没有指定就是window
   * 所有函数内部都有一个变量this
   * 它的值是调用函数时的当前对象
2. 如何确定this的值
   * test() window
   * p.test() p
   * new test() 新创建的对象
   * p.call(obj) obj
# 原型与原型链
## 函数的prototype属性
* 每个函数都有一个prototype, 默认指向一个object空实例对象(原型对象), 但是Object除外, 它的prototype为null
* 原型对象有个constructor, 指向函数对象
```javascript
func.prototype.constructor === func;    //true
```
## 显式原型与隐式原型
* 每个函数function都有一个prototype, 即显式原型
* 每个实例对象都有一个__proto__, 即隐式原型
* 能够直接操作prototype但不能直接操作__prototype__(ES6之前)
```javascript
var Func = function(){
};
var func = new Func();
func.__proto__ === Func.prototype   //true
```
## 原型链
  别名：隐式原型链

作用：查找对象属性(方法)
1. 查找函数自身内部的方法
2. 如果函数自身内部没有这个方法就去找这个函数__proto__内的方法
3. 没有找到就沿着__proto__向上查找
4. Object的显式原型的隐式原型为null, 即原型链的尽头
### 构造函数/原型/实例对象的关系
* 对于每一个函数, 包括Oject构造函数, 都有一个隐式原型指向Function构造函数的显式原型, 即每一个函数都是Function构造函数的实例
* Function也是一个构造函数, 因此它的隐式原型指向它自己的显式原型, 即Function也是自己的实例
* prototype也是一个对象, 因此它的隐式原型指向Oject构造函数的显式原型, 即所有的prototype是Object构造函数的实例
* Object的显式原型也有隐式原型, 由于它已经是原型链的尽头所以值为null
## instance
1. instance是如何判断的
    * 表达式: `A instanceof B`
    * 如果B函数的显式原型在A函数的原型链上则返回true否则返回false
2. Function是通过new自己产生的实例
### 例子
```javascript
Function instanceof Object  //true  Function.__proto__.__proto__ === Object.prototype 
Object instanceof Object    //true  Object.__proto__.__proto__ === Object.prototype
Object instanceof Functon   //true  Object.__proto__ === Function.prototype
Function instanceof Function    //true  Function.__proto__ === Function.prototype
function foo(){}
Object instanceof foo   //false
```
## 面试题
测试题1
```javascript
var A = function(){};
A.prototype.n = 1;
var b = new A();
A.prototype = {
    n:2,
    m:3
}
var c = new A();
console.log(b.n,b.m,c.n,c.m);   //1 undefined 2 3
```
测试题2
```javascript
function F(){}
Object.prototype.a = function(){
    console.log("a");
}
Function.prototype.b = function(){
    console.log("b");
}
var f = new F();
f.a();  //a 
f.b();  //f.b() is not a function
F.a();  //a
F.b();  //b
```
# 执行上下文与执行上下文栈
1. 变量声明提升
   * 通过var定义的变量在这行定义语句前就能访问到
   * 值: undefined
2. 函数声明提升
   * 通过function声明的函数在声明之前就能访问到
   * 值: 通过function定义的函数本身
   * 先变量提升再函数提升
   * 在函数中使用未声明的变量会自动声明成全局变量
3. 执行上下文
   1. 代码分类
        * 全局代码
        * 函数代码
   2. 全局执行上下文
        * 在执行全局代码前将window确定为全局执行上下文
        * 对全局数据进行预处理
            * var定义的全局变量-->undefined, 添加为window的属性
            * function声明的全局函数-->赋值为这个函数, 将全局函数添加为window的方法
            * this-->赋值为window
        * 开始执行全局代码
    3. 函数执行上下文
        * 在调用函数, 准备执行函数体之前, 创建对应的函数执行上下文对象
        * 对局部数据进行预处理
            * 声明形参变量-->赋值为实参-->添加为执行上下文的属性
            * arguments-->赋值为实参列表, 添加为执行上下文属性
            * var定义的局部变量-->赋值为undefined, 添加为执行上下文属性
            * function声明的函数-->赋值为这个函数本身, 添加为执行上下文方法
            * this-->赋值为调用这个函数的对象
        * 开始执行函数上下文
4. 执行上下文栈
    1. 全局代码执行前, JS引擎会创建一个上下文栈来存储管理执行上下文
    2. 在全局执行上下文(window)确定后, 将其添加到栈中
    3. 在函数执行上下文创建后, 将其添加到栈中
    4. 在当前函数执行完后, 将栈顶对象移除
    5. 当所有代码执行完毕后栈中只剩下window
5. 面试题
```javascript
var c = 1;
function c(c){
    console.log(c);
}
c(2);
```
# 作用域与作用域链
1. 分类
    * 全局作用域
    * 函数作用域
    * 没有块作用域(ES6有了)
2. 作用
    * 隔离变量
## 作用域与执行上下文
* 区别1
   * 函数作用域在函数定义时创建而非函数调用时
   * 全局执行上下文在全局作用域创建之后, JS代码执行之前创建
   * 函数执行上下文在调用函数时, 函数体代码未执行前创建
* 区别2
   * 作用域是静态的, 只要函数定义好后就一直存在且不会变化
   * 执行上下文是动态的, 调用函数时创建, 函数执行完成后自动销毁
* 联系
   * 作用域从属于所在的执行上下文
   * 全局作用域-->全局执行上下文
   * 函数作用域-->函数执行上下文
## 作用域链
1. 理解
   * 多个上下级关系的作用域形成的链的方向是从内向外的
   * 查找变量时是沿着作用域链来查找的
2. 查找上一个变量的查找规则
   1. 在当前作用域下的上下文中查找对应属性, 有则返回没有进入2
   2. 在上一级作用下的上下文中查找对应属性, 有则返回没有进入3
   3. 依次执行2直到处在全局作用域中, 在全局上下文中查找对应属性, 有则返回没有报错
# 闭包
1. 如何产生闭包
   * **当一个嵌套的内部函数引入了外部函数的变量就产生闭包,** 与外部变量的值无关
2. 闭包是什么
   * 使用chrome调试, 可以看到的包含了被引用变量的对象Closure
3. 产生闭包的条件
   * 函数嵌套
   * 内部函数引用了外部函数的数据且已经被定义(函数表达式与函数声明存在区别)
   * 外部函数执行
4. 常见闭包
   * 将内部函数作为外部函数的返回值进行返回
   * 将函数作为一个实参传给另一个函数
5. 闭包的作用
   * 外部函数在执行完毕后能使它的内部变量仍然存留在内存中, 即延长了变量的生命周期
   * 未成为闭包中的变量会在外部函数执行完毕后被释放
   * 让函数外部可以操作到函数内部的数据但并非将变量直接暴露给外部
6. 闭包的生命周期
   * 在嵌套的内部函数定义时产生
   * 在嵌套的内部函数成为垃圾对象时
7. 闭包的应用
   1. 自定义js模块
        * 具有特定功能的js文件
        * 将所有数据和功能封装到函数内部
        * 只向外暴露一个有n个方法的函数或对象
        * 模块的使用者, 只需要通过模块暴露的函数或对象来使用模块的功能
```javascript
//方法1
function Mymodule(){
    var msg = "My test";
    function toUpperCase(){
        console.log(msg.toUppercase());
    }
    function toLowerCase(){
        console.log(msg.toLowerCase());
    }
    return {toUpperCase:toUpperCase, toLowerCase:toLowerCase};
}
var mymodule = Mymodule();
mymodule.toUpperCase();
mymodule.toLowerCase();
//方法2
(function(){
    var msg = "My test";
    function toUpperCase(){
        console.log(msg.toUppercase());
    }
    function toLowerCase(){
        console.log(msg.toLowerCase());
    }
    window.mymodule1 = {toUpperCase:toUpperCase, toLowerCase:toLowerCase};
})();
mymodule1.toUpperCase();
mymodule1.toLowerCase();
```
8. 闭包的缺点及解决办法
    * 缺点
        * 函数执行完后函数内的局部变量没有释放, 占用内存时间会变长
        * 容易造成内存泄露
    * 解决办法
        * 尽量不使用闭包
        * 尽早释放
9. 内存溢出
    * 程序运行时出现错误
    * 当程序需要的内存超出内存剩余的内存时
10. 内存泄露
    * 占用的内存没有及时释放
    * 内存泄露过多容易导致内存溢出
    * 常见的内存泄露
      * 意外的全局变量
      * 没有及时处理的计时器或回调函数
      * 闭包
11. 面试题
```javascript
//题目1
var name = "window";
var object = {
    name: "object",
    fn: function(){
        return function(){
        console.log(this.name);
        }
    }
}
object.fn()();  //"window"
var name = "window";
var object = {
    name: "object",
    fn: function(){
        var that = this;
        return function(){
        console.log(that.name);
        }
    }
}
object.fn()();  //"object"
//题目2
```
# 对象创建模式
## 方法1: Object构造函数模式
* 套路: 先new来创建空对象, 再动态添加新的属性/方法
* 使用场景: 起始时不知道对象内部的数据
* 问题: 语句太多
```javascript
var obj = new Object();
obj.name = "a";
obj.age = "1";
obj.setname = function(){
    this.name = "b";
};
```
## 方法2: 对象字面量模式
* 套路: 使用{}创建空对象, 再动态添加新的属性/方法
* 使用场景: 起始时已知对象内部的数据
* 问题: 如果创建多个对象, 代码会重复
```javascript
var obj = {
    name: "a",
    age: 1,
    setname: function(){
    this.name = "b";
    }
};
```
## 方法3: 工厂模式
* 套路: 使用工厂函数动态创建对象并返回
* 使用场景: 需要创建多个对象
* 问题: 对象没有具体类型, 都是Object
```javascript
function createPerson(name, age){
    var obj = new Object();
    obj.name = "a";
    obj.age = "1";
    obj.setname = function(){
    this.name = "b";
    };
    return obj;
}
```
## 方法4: 自定义构造函数
* 套路: 自定义构造函数, 使用new创建
* 使用场景: 需要创建多个类型确定的对象
* 问题: 如果实例化多次会使同样的方法重复占用内存空间
```javascript
function createPerson(name, age){
    this.name = "a";
    this.age = "1";
    this.setname = function(){
    this.name = "b";
};
}
```
## 方法5: 自定义构造函数+原型对象组合使用
* 套路: 自定义构造函数, 使用new创建, 添加方法时使用原型对象来添加
* 使用场景: 需要创建多个类型确定的对象
```javascript
function createPerson(name, age){
    this.name = "a";
    this.age = "1";
}
createPerson.prototype = {
    getname: function(){
    this.name = "b";
    }
}
```
# 继承模式
## 原型继承
**缺点是如果父函数有一个变量为引用类型, 任意一个实例修改这个变量会导致所有实例的相关属性被修改**

套路：
1. 构造父函数
2. 给父函数的原型添加新方法
3. 构造子函数
4. 使子函数的原型对象成为父函数的实例(关键一步, 此处使原型链能够继承)
5. 给子函数的原型对象添加新方法
```javascript
var sup = function(){
    var supP = "sup";
}
sup.prototype.showSup = function(){
    console.log(this.supP);
};
var sub = function(){
    var subP = "sub";
}
Sub.prototype = new Sup();  //sub.prototype.__proto__ = sup.prototype
console.log(Sub.prototype.constructor); //function sup(){...}, 不符合事实
Sub.prototype.constructor = Sub;    //修正constructor属性
Sub.prototype.showSub = function(){
    console.log(this.subP);
};
var sub = new Sub();
sub.showSup();  //"sup"
sub/showSub();  //"sub"
```
## 借用构造函数继承(假继承, 没有继承父类型方法)
**缺点是父类有方法时会被创建多次**

套路:
1. 创建父类型构造函数
2. 创建子类型构造函数
3. 在子类型构造函数中使用call/apply调用父类型构造函数
```javascript
var Person = function(name, age){
    this.name = name;
    this.age = age;
};
var student = function(name, age, price){
    Person.call(this, name, age);
    this.price = price;
}
var aa= new student('aa',11, 12)
```
## 寄生式继承
**缺点是方法没有放到原型中无法复用**

套路:
1. 创建父类型构造函数
2. 创建子类型构造函数
3. 在子类型构造函数中使用call/apply调用父类型构造函数
```javascript
var Person = function(o){
    var obj = Object.create(o); //返回一个隐式原型为o的实例
    obj.class = "student";
    obj.say = function(){
        console.log(this.name);
    }
    return obj;
};
var aman = {
    name: "tom",
    age: 16
}
var student = new Person(aman);
```
## 组合继承(借用构造函数继承+原型继承)
**缺点是构造函数执行了两次**

套路:
1. 创建父类型构造函数
2. 创建子类型构造函数
3. 在子类型构造函数中使用call/apply调用父类型构造函数
```javascript
var Person = function(name, age){
    this.name = name;
    this.age = age;
};
Person.prototype.setName = function(name){
    this.name = name;
};
Person.prototype.setAge = function(age){
    this.age = age;
};
var Student = function(name, age, price){
    Person.call(this, name, age);
    this.price = price;
}
Student.prototype = new Person("tom", 12);
Student.prototype.constructor = Student;
Student.prototype.setPrice = function(price){
    this.price = price;
};
var student = new Student('aa',1,2)
console.log(student)
```
# 进程与线程
## 进程
* 程序的一次执行, 在内存中占用一片独立的内存空间
## 线程
* 是进程里的一个独立执行单元
* 是程序执行的一个完整的流程
* 是CPU的最小调度
## 相关知识
* 应用程序必须运行在某个进程的某个线程上
* 一个进程中至少有一个运行的线程: 主线程, 进程启动后自动创建
* 一个进程中也可以同时运行多个线程
* 一个进程内的数据可以让其中多个线程共享
* 多个进程之间的数据是相互独立的
* 线程池: 保存多个线程对象的容器, 实现线程对象重复利用
## 比较单线程与多线程
* 多线程优点
    * CPU利用效率高
* 多线程缺点
    * 创建多线程开销
    * 线程间切换开销
    * 死锁与状态同步问题
* 单线程优点
    * 顺序编程简单易懂
* 单线程缺点
    * 效率低
## JS的单线程与多线程
* js单线程运行
* 使用H5的Web Workers可以多线程运行
## 浏览器运行是单线程还是多线程
多线程
## 浏览器运行是单进程还是多进程
有单进程如火狐与老版IE
也有多进程如chrome与新版IE
# 浏览器内核
* 支撑浏览器运行的最核心的程序
* 不同浏览器可能不一样
    * chrome, safari: webket
    * firefox: Gecko
    * IE: Trident
* 内核由多个模块组成
  
    **主线程模块**
    * js引擎模块, 负责js的编译与运行
    * html, css文档解析模块, 负责页面文本的解析
    * DOM/CSS模块, 负责DOM/CSS在内存中的相关处理
    * 布局和渲染模块, 负责页面的布局与效果的绘制
    * ...

    **分线程模块**
    * 定时器模块, 负责定时器管理
    * 事件响应模块, 负责事件的管理
    * 网络请求模块, 负责ajax请求
# 启动定时器
1. 定时器真的是定时执行吗
   * 无法保证真正定时执行
   * 一般会延迟一点, 也可能延迟很长时间
2. 定时器的回调函数是在分线程执行的吗
   * 不是, js是单线程的
3. 定时器如何实现的
   * 事件循环模型
# js的单线程执行
1. 如何证明js执行是单线程的
   * setTimeout()函数是在主线程执行的
   * 定时器回调代码只有在运行栈中的代码全部执行完后才执行
2. 为什么js要用单线程模式而不是多线程模式
   * 作为浏览器脚本语言主要用途在于与用户互动及操作DOM, 这决定必须为单线程执行, 否则有严重的同步问题
3. 代码分类
   * 初始化代码
   * 回调代码
4. js引擎执行代码的基本流程
   * 先执行初始化代码, 包含一些特殊代码
       * 设置定时器
       * 绑定监听
       * 发送ajax请求
   * 某个时刻后再执行回调代码
   **使用alert()能暂停主线程执行与定时器计时**
# 事件循环模型
## 相关概念
* 执行栈
* 浏览器内核
* 回调队列
  * 消息队列
  * 任务队列
  * 事件队列
* 事件轮询(主线程队列与回调队列的事件执行顺序)
* 事件驱动模型(同步与异步的执行)
* 请求响应模型
# H5 Web Workers多线程
## 介绍
* Web Workers是HTML5的多线程解决方案
* 可以将一些大计算量的代码交由Web Workers运行而不冻结用户界面
* 但是子线程完全受主线程控制且不能操作DOM, 因此没有改变JS是单线程的属性
## 使用
* 创建在分线程执行的js函数
* 向主线程的js中发消息并执行回调
## 不足
* 慢
* 不能跨域加载js
* worker内代码不能操作dom
* 不是每个浏览器都支持

# 细节

在循环里return false时就是整个方法直接停止 如果是break是当前条件停止

map使用映射方式 每次都会返回新数组。保留旧数组状态  sort会改变原数组所以需要使用map

Const 不可修改 如果定义对象是个复杂数据类型的话 里面可以随意添加数据

写在方法体的prototypt定义方法 在这个方法体使用这个方法需要经过.protype.方法名 调用 或者重定义方法通过new构造实例方法 直接调用
















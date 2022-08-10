## [bind 介绍](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/bind)

语法：`fun.bind(thisArg[, arg1[, arg2[, ...]]])`

`bind` 方法与 `call / apply` 最大的不同就是前者返回一个绑定上下文的**函数**，而后两者是**直接执行**了函数。

来个例子说明下

```js
var value = 2;

var foo = {
    value: 1
};

function bar(name, age) {
    return {
		value: this.value,
		name: name,
		age: age
    }
};

bar.call(foo, "Jack", 20); // 直接执行了函数
// {value: 1, name: "Jack", age: 20}

var bindFoo1 = bar.bind(foo, "Jack", 20); // 返回一个函数
bindFoo1();
// {value: 1, name: "Jack", age: 20}

var bindFoo2 = bar.bind(foo, "Jack"); // 返回一个函数
bindFoo2(20);
// {value: 1, name: "Jack", age: 20}
```

通过上述代码可以看出`bind` 有如下特性：

- 1、可以指定`this`
- 2、返回一个函数
- 3、可以传入参数
- 4、柯里化

## 使用场景

### 缓存 `this`值

```js
var nickname = "Kitty";
function Person(name){
    this.nickname = name;
    this.distractedGreeting = function() {
		var self = this; // added
        setTimeout(function(){
            console.log("Hello, my name is " + self.nickname); // changed
        }, 500);
    }
}
 
var person = new Person('jawil');
person.distractedGreeting();
// Hello, my name is jawil
```

**解决方案2**：使用 `bind`

```js
var nickname = "Kitty";
function Person(name){
    this.nickname = name;
    this.distractedGreeting = function() {

        setTimeout(function(){
            console.log("Hello, my name is " + this.nickname);
        }.bind(this), 500);
    }
}
 
var person = new Person('jawil');
person.distractedGreeting();
// Hello, my name is jawil
```

### 验证是否是数组

```js
var toStr = Function.prototype.call.bind(Object.prototype.toString);
function isArray(obj){ 
    return toStr(obj) === '[object Array]';
}
isArray([1, 2, 3]);
// true

// 使用改造后的 toStr
toStr([1, 2, 3]); 	// "[object Array]"
toStr("123"); 		// "[object String]"
toStr(123); 		// "[object Number]"
toStr(Object(123)); // "[object Number]"
```

上面方法首先使用 `Function.prototype.call`函数指定一个 `this` 值，然后 `.bind` 返回一个新的函数，始终将 `Object.prototype.toString` 设置为传入参数。其实等价于 `Object.prototype.toString.call()` 。

这里有一个**前提**是`toString()`方法**没有被覆盖**

```js
Object.prototype.toString = function() {
    return '';
}
isArray([1, 2, 3]);
// false
```



## 模拟实现

`bind（）` 函数在 ES5 才被加入，所以并不是所有浏览器都支持，`IE8`及以下的版本中不被支持，如果需要兼容可以使用 Polyfill 来实现。

首先我们来实现以下四点特性：

- 1、可以指定`this`
- 2、返回一个函数
- 3、可以传入参数
- 4、柯里化

### 模拟实现第一步

对于第 1 点，使用 `call / apply` 指定 `this` 。

对于第 2 点，使用 `return` 返回一个函数。

结合前面 2 点，可以写出第一版，代码如下：

```js
// 第一版
Function.prototype.bind2 = function(context) {
    var self = this; // this 指向调用者
    return function () { // 实现第 2点
        return self.apply(context); // 实现第 1 点
    }
}
```

测试一下

```js
// 测试用例
var value = 2;
var foo = {
    value: 1
};

function bar() {
	return this.value;
}

var bindFoo = bar.bind2(foo);

bindFoo(); // 1
```

### 模拟实现第二步

对于第 3 点，使用 `arguments` 获取参数数组并作为 `self.apply()` 的第二个参数。

对于第 4 点，获取返回函数的参数，然后同第3点的参数合并成一个参数数组，并作为 `self.apply()` 的第二个参数。

```js
// 第二版
Function.prototype.bind2 = function (context) {

    var self = this;
    // 实现第3点，因为第1个参数是指定的this,所以只截取第1个之后的参数
	// arr.slice(begin); 即 [begin, end]
    var args = Array.prototype.slice.call(arguments, 1); 

    return function () {
        // 实现第4点，这时的arguments是指bind返回的函数传入的参数
        // 即 return function 的参数
        var bindArgs = Array.prototype.slice.call(arguments);
        return self.apply( context, args.concat(bindArgs) );
    }
}
```

测试一下：

```js
// 测试用例
var value = 2;

var foo = {
    value: 1
};

function bar(name, age) {
    return {
		value: this.value,
		name: name,
		age: age
    }
};

var bindFoo = bar.bind2(foo, "Jack");
bindFoo(20);
// {value: 1, name: "Jack", age: 20}
```

### 模拟实现第三步

到现在已经完成大部分了，但是还有一个难点，`bind` 有以下一个特性

> 一个绑定函数也能使用new操作符创建对象：这种行为就像把原函数当成构造器，提供的 this 值被忽略，同时调用时的参数被提供给模拟函数。

来个例子说明下：

```js
var value = 2;
var foo = {
    value: 1
};
function bar(name, age) {
    this.habit = 'shopping';
    console.log(this.value);
    console.log(name);
    console.log(age);
}
bar.prototype.friend = 'kevin';

var bindFoo = bar.bind(foo, 'Jack');
var obj = new bindFoo(20);
// undefined
// Jack
// 20

obj.habit;
// shopping

obj.friend;
// kevin
```

上面例子中，运行结果`this.value` 输出为 `undefined`，这不是全局`value` 也不是`foo`对象中的`value`，这说明 `bind` 的 `this` 对象失效了，`new` 的实现中生成一个新的对象，这个时候的 `this`指向的是 `obj`。（【进阶3-1期】有介绍new的实现原理，下一期也会重点介绍）

这里可以通过修改返回函数的原型来实现，代码如下：

```js
// 第三版
Function.prototype.bind2 = function (context) {
    var self = this;
    var args = Array.prototype.slice.call(arguments, 1);

    var fBound = function () {
        var bindArgs = Array.prototype.slice.call(arguments);
        
        // 注释1
        return self.apply(
            this instanceof fBound ? this : context, 
            args.concat(bindArgs)
        );
    }
    // 注释2
    fBound.prototype = this.prototype;
    return fBound;
}
```

- 注释1：
  - 当作为构造函数时，this 指向实例，此时 `this instanceof fBound` 结果为 `true`，可以让实例获得来自绑定函数的值，即上例中实例会具有 `habit` 属性。
  - 当作为普通函数时，this 指向 `window`，此时结果为 `false`，将绑定函数的 this 指向 `context`
- 注释2： 修改返回函数的 `prototype` 为绑定函数的 `prototype`，实例就可以继承绑定函数的原型中的值，即上例中 `obj` 可以获取到 `bar` 原型上的 `friend`。

### 模拟实现第四步

上面实现中 `fBound.prototype = this.prototype`有一个缺点，直接修改 `fBound.prototype` 的时候，也会直接修改 `this.prototype`。

来个代码测试下：

```js
// 测试用例
var value = 2;
var foo = {
    value: 1
};
function bar(name, age) {
    this.habit = 'shopping';
    console.log(this.value);
    console.log(name);
    console.log(age);
}
bar.prototype.friend = 'kevin';

var bindFoo = bar.bind2(foo, 'Jack'); // bind2
var obj = new bindFoo(20); // 返回正确
// undefined
// Jack
// 20

obj.habit; // 返回正确
// shopping

obj.friend; // 返回正确
// kevin

obj.__proto__.friend = "Kitty"; // 修改原型

bar.prototype.friend; // 返回错误，这里被修改了
// Kitty
```

解决方案是用一个空对象作为中介，把 `fBound.prototype` 赋值为空对象的实例（原型式继承）。

```js
var fNOP = function () {};			// 创建一个空对象
fNOP.prototype = this.prototype; 	// 空对象的原型指向绑定函数的原型
fBound.prototype = new fNOP();		// 空对象的实例赋值给 fBound.prototype
```

这边可以直接使用ES5的 `Object.create()`方法生成一个新对象

```js
fBound.prototype = Object.create(this.prototype);
```

不过 `bind` 和 `Object.create()`都是ES5方法，部分IE浏览器（IE < 9）并不支持，Polyfill中不能用 `Object.create()`实现 `bind`，不过原理是一样的。

第四版目前OK啦，代码如下：

```js
// 第四版，已通过测试用例
Function.prototype.bind2 = function (context) {
    var self = this;
    var args = Array.prototype.slice.call(arguments, 1);

    var fNOP = function () {};

    var fBound = function () {
        var bindArgs = Array.prototype.slice.call(arguments);
        return self.apply(
            this instanceof fNOP ? this : context, 
            args.concat(bindArgs)
        );
    }

    fNOP.prototype = this.prototype;
    fBound.prototype = new fNOP();
    return fBound;
}
```

### 模拟实现第五步

到这里其实已经差不多了，但有一个问题是调用 `bind` 的不是函数，这时候需要抛出异常。

```js
if (typeof this !== "function") {
  throw new Error("Function.prototype.bind - what is trying to be bound is not callable");
}
```

所以完整版模拟实现代码如下：

```js
// 第五版
Function.prototype.bind2 = function (context) {

    if (typeof this !== "function") {
      throw new Error("Function.prototype.bind - what is trying to be bound is not callable");
    }

    var self = this;
    var args = Array.prototype.slice.call(arguments, 1);

    var fNOP = function () {};

    var fBound = function () {
        var bindArgs = Array.prototype.slice.call(arguments);
        return self.apply(this instanceof fNOP ? this : context, args.concat(bindArgs));
    }

    fNOP.prototype = this.prototype;
    fBound.prototype = new fNOP();
    return fBound;
}
```

参考链接：https://muyiy.cn/blog/3/3.4.html#%E6%9C%AC%E6%9C%9F%E6%80%9D%E8%80%83%E9%A2%98
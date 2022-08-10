## call() 和 apply()的简介

> call() 方法调用一个函数, 其具有一个指定的 `this` 值和分别地提供的参数(**参数的列表**)。

`call()` 和 `apply()`的区别在于，`call()`方法接受的是**若干个参数的列表**，而`apply()`方法接受的是**一个包含多个参数的数组**

举个例子：

```js
var func = function(arg1, arg2) {
     ...
};

func.call(this, arg1, arg2); // 使用 call，参数列表
func.apply(this, [arg1, arg2]) // 使用 apply，参数数组
```

### 使用场景：

#### 一 、合并两个数组

```js
var vegetables = ['parsnip', 'potato'];
var moreVegs = ['celery', 'beetroot'];

// 将第二个数组融合进第一个数组
// 相当于 vegetables.push('celery', 'beetroot');
Array.prototype.push.apply(vegetables, moreVegs);
// 4

vegetables;
// ['parsnip', 'potato', 'celery', 'beetroot']
```

#### 二、获取数组中的最大值和最小值

```js
var numbers = [5, 458 , 120 , -215 ]; 
Math.max.apply(Math, numbers);   //458    
Math.max.call(Math, 5, 458 , 120 , -215); //458

// ES6
Math.max.call(Math, ...numbers); // 458
```



## call的模拟实现

先看下面一个简单的例子

```js
var value = 1;
var foo = {
    value: 1
};

function bar() {
    console.log(this.value);
}

bar.call(foo); // 1
```

通过上面的介绍我们知道，`call()`主要有以下两点

- 1、`call()`改变了this的指向
- 2、函数 `bar` 执行了

### 模拟实现第一步

如果在调用`call()`的时候把函数 `bar()`添加到`foo()`对象中，即如下

```js
var foo = {
    value: 1,
    bar: function() {
        console.log(this.value);
    }
};

foo.bar(); // 1
```

这个改动就可以实现：改变了this的指向并且执行了函数`bar`。

但是这样写是有副作用的，即给`foo`额外添加了一个属性，怎么解决呢？

解决方法很简单，用 `delete` 删掉就好了。

所以只要实现下面3步就可以模拟实现了。

- 1、将函数设置为对象的属性：`foo.fn = bar`
- 2、执行函数：`foo.fn()`
- 3、删除函数：`delete foo.fn`

代码实现如下：

```js
// 第一版
Function.prototype.call2 = function(context) {
    // 首先要获取调用call的函数，用this可以获取
    context.fn = this; 		// foo.fn = bar
    context.fn();			// foo.fn()
    delete context.fn;		// delete foo.fn
}

// 测试一下
var foo = {
    value: 1
};

function bar() {
    console.log(this.value);
}

bar.call2(foo); // 1
```

完美！

### 模拟实现第二步

第一版有一个问题，那就是函数 `bar` 不能接收参数，所以我们可以从 `arguments`中获取参数，取出第二个到最后一个参数放到数组中，为什么要抛弃第一个参数呢，因为第一个参数是 `this`。

类数组对象转成数组的方法上面已经介绍过了，但是这边使用ES3的方案来做。

```js
var args = [];
for(var i = 1, len = arguments.length; i < len; i++) {
    args.push('arguments[' + i + ']');
}
```

参数数组搞定了，接下来要做的就是执行函数 `context.fn()`。

```js
context.fn( args.join(',') ); // 这样不行
```

上面直接调用肯定不行，`args.join(',')`会返回一个字符串，并不会执行。

这边采用 `eval`方法来实现，拼成一个函数。

```js
eval('context.fn(' + args +')')
```

上面代码中`args` 会自动调用 `args.toString()` 方法，因为`'context.fn(' + args +')'`本质上是字符串拼接，会自动调用`toString()`方法，如下代码：

```js
var args = ["a1", "b2", "c3"];
console.log(args);
// ["a1", "b2", "c3"]

console.log(args.toString());
// a1,b2,c3

console.log("" + args);
// a1,b2,c3
```

所以说第二个版本就实现了，代码如下：

```js
// 第二版
Function.prototype.call2 = function(context) {
    context.fn = this;
    var args = [];
    for(var i = 1, len = arguments.length; i < len; i++) {
        args.push('arguments[' + i + ']');
    }
    eval('context.fn(' + args +')');
    delete context.fn;
}

// 测试一下
var foo = {
    value: 1
};

function bar(name, age) {
    console.log(name)
    console.log(age)
    console.log(this.value);
}

bar.call2(foo, 'kevin', 18); 
// kevin
// 18
// 1
```

完美！！

### 模拟实现第三步

还有2个细节需要注意：

- 1、this 参数可以传 `null` 或者 `undefined`，此时 this 指向 window
- 2、this 参数可以传基本类型数据，原生的 call 会自动用 Object() 转换
- 3、函数是可以有返回值的

实现上面的三点很简单，代码如下

```js
// 第三版
Function.prototype.call2 = function (context) {
    context = context ? Object(context) : window; // 实现细节 1 和 2
    context.fn = this;

    var args = [];
    for(var i = 1, len = arguments.length; i < len; i++) {
        args.push('arguments[' + i + ']');
    }

    var result = eval('context.fn(' + args +')');

    delete context.fn
    return result; // 实现细节 2
}

// 测试一下
var value = 2;

var obj = {
    value: 1
}

function bar(name, age) {
    console.log(this.value);
    return {
        value: this.value,
        name: name,
        age: age
    }
}

function foo() {
    console.log(this);
}

bar.call2(null); // 2
foo.call2(123); // Number {123, fn: ƒ}

bar.call2(obj, 'kevin', 18);
// 1
// {
//    value: 1,
//    name: 'kevin',
//    age: 18
// }
```

## call和apply模拟实现汇总

### call的模拟实现

ES3：

```js
Function.prototype.call = function (context) {
    context = context ? Object(context) : window; 
    context.fn = this;

    var args = [];
    for(var i = 1, len = arguments.length; i < len; i++) {
        args.push('arguments[' + i + ']');
    }
    var result = eval('context.fn(' + args +')');

    delete context.fn
    return result;
}
```

ES6：

```js
Function.prototype.call = function (context) {
  context = context ? Object(context) : window; 
  context.fn = this;

  let args = [...arguments].slice(1);
  let result = context.fn(...args);

  delete context.fn
  return result;
}
```

### apply的模拟实现

ES3：

```js
Function.prototype.apply = function (context, arr) {
    context = context ? Object(context) : window; 
    context.fn = this;

    var result;
    // 判断是否存在第二个参数
    if (!arr) {
        result = context.fn();
    } else {
        var args = [];
        for (var i = 0, len = arr.length; i < len; i++) {
            args.push('arr[' + i + ']');
        }
        result = eval('context.fn(' + args + ')');
    }

    delete context.fn
    return result;
}
```

ES6：

```js
Function.prototype.apply = function (context, arr) {
    context = context ? Object(context) : window; 
    context.fn = this;
  
    let result;
    if (!arr) {
        result = context.fn();
    } else {
        result = context.fn(...arr);
    }
      
    delete context.fn
    return result;
}
```



参考链接：https://muyiy.cn/blog/3/3.3.html#call-%E5%92%8C-apply
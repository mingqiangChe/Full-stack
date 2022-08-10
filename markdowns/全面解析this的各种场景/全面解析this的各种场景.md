

## 全面讲解this各种应用场景 

与其他语言相比，**函数的 `this` 关键字**在 JavaScript 中的表现略有不同，此外，在[严格模式](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Strict_mode)和非严格模式之间也会有一些差别。在绝大多数情况下，函数的调用方式决定了 `this` 的值（运行时绑定）。`this` 不能在执行期间被赋值，并且在每次函数被调用时 `this` 的值也可能会不同。ES5 引入了 [bind](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/bind) 方法来设置函数的 `this` 值，而不用考虑函数如何被调用的。ES2015 引入了[箭头函数](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions/Arrow_functions)，箭头函数不提供自身的 this 绑定（`this` 的值将保持为闭合词法上下文的值）。

### 1. [全局上下文](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/this#全局上下文)

 无论是否在严格模式下，在全局执行环境中（在任何函数体外部）`this` 都指向全局对象。 

```js
// 在浏览器中, window 对象同时也是全局对象：
console.log(this === window); // true

a = 37;
console.log(window.a); // 37

this.b = 'ABC';
console.log(window.b); // "ABC"
console.log(b); // "ABC"
```

### 2. [函数上下文](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/this#函数上下文)

 在函数内部，`this`的值取决于函数被调用的方式。 

 不在严格模式下，且 `this` 的值不是由该调用设置的，所以 `this` 的值默认指向全局对象，浏览器中就是 [`window`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window)。 

```js
function f1(){
  return this;
}
//在浏览器中：
f1() === window;   //在浏览器中，全局对象是window

//在Node中：
f1() === globalThis;
```

 然而，在严格模式下，如果进入执行环境时没有设置 `this` 的值，`this` 会保持为 `undefined`，如下 

```js
function f2(){
  "use strict"; // 这里是严格模式
  return this;
}

f2() === undefined; // true
```

### 3. [类上下文](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/this#类上下文)

`this` 在 [类](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Classes) 中的表现与在函数中类似，因为类本质上也是函数，但也有一些区别和注意事项。

在类的构造函数中，`this` 是一个常规对象。类中所有非静态的方法都会被添加到 `this` 的原型中：

```js
class Example {
  constructor() {
    const proto = Object.getPrototypeOf(this);
    console.log(Object.getOwnPropertyNames(proto));
  }
  first(){}
  second(){}
  static third(){}
}

new Example(); // ['constructor', 'first', 'second']
```

### 4.[箭头函数](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/this#箭头函数)中的this

 在全局代码中，它将被设置为全局对象： 

```js
var globalObject = this;
var foo = () => this; 
console.log(foo() === globalObject); // true
```

 这同样适用于在其他函数内创建的箭头函数：这些箭头函数的`this`被设置为封闭的词法环境的。 

```js
// 创建一个含有bar方法的obj对象，
// bar返回一个函数，
// 这个函数返回this，
// 这个返回的函数是以箭头函数创建的，
// 所以它的this被永久绑定到了它外层函数的this。
// bar的值可以在调用中设置，这反过来又设置了返回函数的值。
var obj = {
  bar: function() {
    var x = () => this;
    return x;
  }
};

// 作为obj对象的一个方法来调用bar，把它的this绑定到obj。
// 将返回的函数的引用赋值给fn。
var fn = obj.bar();

// 直接调用fn而不设置this，
// 通常(即不使用箭头函数的情况)默认为全局对象
// 若在严格模式则为undefined
console.log(fn() === obj); // true

// 但是注意，如果你只是引用obj的方法，
// 而没有调用它
var fn2 = obj.bar;
// 那么调用箭头函数后，this指向window，因为它从 bar 继承了this。
console.log(fn2()() == window); // true
```

### 5. [作为对象的方法](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/this#作为对象的方法)

 当函数作为对象里的方法被调用时，`this` 被设置为调用该函数的对象。 

 下面的例子中，当 `o.f()` 被调用时，函数内的 `this` 将绑定到 `o` 对象。 

```js
var o = {
  prop: 37,
  f: function() {
    return this.prop;
  }
};

console.log(o.f()); // 37
```

### 6. [作为一个DOM事件处理函数](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/this#作为一个dom事件处理函数)

 当函数被用作事件处理函数时，它的 `this` 指向触发事件的元素（一些浏览器在使用非 `addEventListener` 的函数动态地添加监听函数时不遵守这个约定）。 

```js
<!DOCTYPE html>
<html lang="zh_CN">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <button id="btn">dom事件的处理函数中</button>
    <script>
      document.getElementById('btn').addEventListener('click', function () {
        console.log(this);
      });
      //   document.getElementById('btn').addEventListener('click', () => {
      //     console.log(this);
      //   });
    </script>
  </body>
</html>

```

### 7. [作为一个内联事件处理函数](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/this#作为一个内联事件处理函数)

 当代码被内联 [on-event 处理函数 (en-US)](https://developer.mozilla.org/en-US/docs/Web/Events/Event_handlers) 调用时，它的`this`指向监听器所在的DOM元素： 

```js
<button onclick="alert(this.tagName.toLowerCase());">
  Show this
</button>
```

 上面的 alert 会显示 `button`。注意只有外层代码中的 `this` 是这样设置的： 

```js
<button onclick="alert((function(){return this})());">
  Show inner this
</button>
```

 在这种情况下，没有设置内部函数的 `this`，所以它指向 global/window 对象（即非严格模式下调用的函数未设置 `this` 时指向的默认对象）。 

 

参考链接：https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/this#%E5%85%A8%E5%B1%80%E4%B8%8A%E4%B8%8B%E6%96%87


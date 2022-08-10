

ES6， 全称 ECMAScript 6.0 ，是 JavaScript 的下一个版本标准，2015.06 发版。ES6 主要是为了解决 ES5 的先天不足，比如 JavaScript 里并没有类的概念，但是目前浏览器的 JavaScript 是 ES5 版本，大多数高版本的浏览器也支持 ES6，不过只实现了 ES6 的部分特性和功能。

### 1. 块级绑定

ES2015(ES6) 新增加了两个重要的 JavaScript 关键字: **let** 和 **const**。let 声明的变量只在 let 命令所在的代码块内有效。const 声明一个只读的常量，一旦声明，常量的值就不能改变。

基本例子

```js
{
    let a = 0;
    var b = 1;
    const c = 2;
}
a; // 报错，let 是在代码块内有效，var 是在全局范围内有效
b; // 1
c; // 报错，const 是在代码块内有效，var 是在全局范围内有效
```

####  **let只能声明一次 var 可以声明多次 **

```js
let a = 1;
let a = 2;
var b = 3;
var b = 4;
a; // Identifier 'a' has already been declared
b; // 4
```

#### **经典的for循环闭包问题可以使用let 解决**

```js
for (var i = 0; i < 10; i++) {
  setTimeout(function(){
    console.log(i);
  })
}
// 输出十个 10
for (let j = 0; j < 10; j++) {
  setTimeout(function(){
    console.log(j);
  })
}
// 输出 0123456789
```

变量 i 是用 var 声明的，在全局范围内有效，所以全局中只有一个变量 i, 每次循环时，setTimeout 定时器里面的 i 指的是全局变量 i ，而循环里的十个 setTimeout 是在循环结束后才执行，所以此时的 i 都是 10。变量 j 是用 let 声明的，当前的 j 只在本轮循环中有效，每次循环的 j 其实都是一个新的变量，所以 setTimeout 定时器里面的 j 其实是不同的变量。

#### **不存在变量提升**

let 不存在变量提升，var 会变量提升:

```js
console.log(a);  //ReferenceError: a is not defined
let a = "apple";
 
console.log(b);  //undefined
var b = "banana";
```

#### **暂时性死区**

```js
var A = "a";
if(true){
  console.log(A);  // ReferenceError: A is not defined
  const A = "3";
}
```

 ES6 明确规定，代码块内如果存在 let 或者 const，代码块会对这些命令声明的变量从块的开始就形成一个封闭作用域。代码块内，在声明变量 PI 之前使用它会报错。 

#### 全局块绑定

let 与 const 不同于 var 的另一个方面是在全局作用域上的表现。当在全局作用域上使 用 var 时，它会创建一个新的全局变量，并成为全局对象（在浏览器中是 window ）的一 个属性，然而若你在全局作用域上使用 let 或 const ，虽然在全局作用域上会创建新的绑定，但不会有任何属性被添加到全局对象上。

```js
// 在浏览器中 
var RegExp = "Hello!"; console.log(window.RegExp); // "Hello!"
var ncz = "Hi!"; console.log(window.ncz); // "Hi!"
```

```js
// 在浏览器中 
let RegExp = "Hello!"; console.log(RegExp); // "Hello!"
console.log(window.RegExp === RegExp); // false 
const ncz = "Hi!"; console.log(ncz); // "Hi!" console.log("ncz" in window); // false
```



#### 块级绑定的最佳实践

在 ES6 的发展阶段，被广泛认可的变量声明方式是：默认情况下应当使用 let 而不是 var 。对于多数 JS 开发者来说， let 的行为方式正是 var 本应有的方式，因此直接用 let 替代 var 更符合逻辑。在这种情况下，你应当对需要受到保护的变量使用 const 。 然而，随着更多的开发者迁移到 ES6 上，一种替代方案变得更为流行，那就是在默认情况下 使用 const 、并且只在知道变量值需要被更改的情况下才使用 let 。其理论依据是大部分 变量在初始化之后都不应当被修改，因为预期外的改动是 bug 的源头之一。这种理念有着足 够强大的吸引力，在你采用 ES6 之后是值得在代码中照此进行探索实践的。 

### 2. 解构：更方便的数据访问

解构赋值是对赋值运算符的扩展，是一种针对数组或者对象进行模式匹配，然后对其中的变量进行赋值。

在代码书写上简洁且易读，语义更加清晰明了；也方便了复杂对象中数据字段获取。在解构中，有下面两部分参与：解构的源，解构赋值表达式的右边部分。解构的目标，解构赋值表达式的左边部分。

#### 数组的解构

```js
// 基本
let [a, b, c] = [1, 2, 3];
// a = 1
// b = 2
// c = 3
// 嵌套	
let [a, [[b], c]] = [1, [[2], 3]];
// a = 1
// b = 2
// c = 3
// 剩余参数
let [a, ...b] = [1, 2, 3];
//a = 1
//b = [2, 3]
```

#### 对象的解构

```js
// 基本
let { foo, bar } = { foo: 'aaa', bar: 'bbb' };
// foo = 'aaa'
// bar = 'bbb'
 
let { baz : foo } = { baz : 'ddd' };
// foo = 'ddd'
// 剩余运算符
let {a, b, ...rest} = {a: 10, b: 20, c: 30, d: 40};
// a = 10
// b = 20
// rest = {c: 30, d: 40}
// 解构默认值
let {a = 10, b = 5} = {a: 3};
// a = 3; b = 5;
let {a: aa = 10, b: bb = 5} = {a: 3};
// aa = 3; bb = 5;
```

#### 参数解构

解构还有一个特别有用的场景，即在传递函数参数时。当 JS 的函数接收大量可选参数时，一 个常用模式是创建一个 options 对象，其中包含了附加的参数，就像这样：

```js
function setObj(name, type, { age = 123 }) {
    console.log(name, type, age);
}
   setObj(1, 1, { age: 345 }); // 正常
// setObj(1, 1);// 报错
```

参数解构有一个怪异点：默认情况下调用函数时未给参数解构传值会抛出错误。

若你让解构的参数作为必选参数，那么上述行为并不会令人困扰。但若你要求它是可选的， 

可以给解构的参数提供默认值来处理这种行为，就像这样： 

```js
function setObj(name, type, { age = 123 } = {}) {
    console.log(name, type, age);
}
//   setObj(1, 1, { age: 345 });
setObj(1, 1);
```

### 3.符号-Symbol

 ES6 引入了一种新的原始数据类型 Symbol ，表示独一无二的值，最大的用法是用来定义对象的唯一属性名。 

 Symbol 函数栈不能用 new 命令，因为 Symbol 是原始数据类型，不是对象。可以接受一个字符串作为参数，为新创建的 Symbol 提供描述，用来显示在控制台或者作为字符串的时候使用，便于区分。 

```js
let sy = Symbol("kk");
console.log(sy);   // Symbol(kk)
console.log(typeof sy);       // "symbol"
 
// 相同参数 Symbol() 返回的值不相等
let sy1 = Symbol("kk"); 
sy === sy1;       // false
```

#### 使用场景

##### 作为属性名

```js
let sy = Symbol("key");
let syObject = {};
syObject[sy] = "kk";
console.log(syObject);    // {Symbol(key): "kk"}
```

##### 定义常量

```js
const RED = Symbol("red");
const YELLOW = Symbol("yellow");
const BLUE = Symbol("blue");
```

##### 在不同代码中共享symbol值

 Symbol.for() 类似单例模式，首先会在全局搜索被登记的 Symbol 中是否有该字符串参数作为名称的 Symbol 值，如果有即返回该 Symbol 值，若没有则新建并返回一个以该字符串参数为名称的 Symbol 值，并登记在全局环境中供搜索。 

```js
let red = Symbol("Red"); // 不是注册在全局中的
let red1 = Symbol.for("Red");
red === red1;      // false
let red2 = Symbol.for("Red");
red1 === red2;     // true
```

利用Symbol.keyFor 返回一个已登记的 Symbol 类型值的 key 

```js
let red1 = Symbol.for("Red");
Symbol.keyFor(red1);    // "Yellow"
```

### 4. 字符串

 模板字符串相当于加强版的字符串，用反引号 **`**,除了作为普通字符串，还可以用来定义多行字符串，还可以在字符串中加入变量和表达式。 

##### 基本用法

```js
let string = `Hello'\n'world`;
console.log(string); 
// "Hello'
// 'world"
```

##### 多行字符串

```js
let string1 =  `Hey,
can you stop angry now?`;
console.log(string1);
// Hey,
// can you stop angry now?
```

字符串插入变量和表达式。

变量名写在 ${} 中，${} 中可以放入 JavaScript 表达式。

```js
let name = "Thomas";
let age = 25;
let info = `My Name is ${name},I am ${age+1} years old next year.`
console.log(info);
// My Name is Mike,I am 28 years old next year.
```

过滤 HTML 字符串，防止用户输入恶意内容

```js
// 3.过滤 HTML 字符串，防止用户输入恶意内容。
function filter_html(stringArr, ...values) {
    let result = '';
    for (let i = 0; i < stringArr.length; i++) {
        result += stringArr[i];
        if (values[i]) {
            result += String(values[i])
                .replace(/&/g, '&amp;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;');
        }
    }
    return result;
}
let name = '&<p>Thomas';
let result = filter_html`你好,欢迎您${name}，<p>您是第123位访问者！`;
console.log(result);
```



### 5. 对象

#### 对象字面量

属性简写

 ES6允许对象的属性直接写变量，这时候属性名是变量名，属性值是变量值。 

```js
const age = 12;
const name = "Thomas";
const person = {age, name};
person   //{age: 12, name: "Amy"}
//等同于
const person = {age: age, name: name}
```

方法名简写

```js
const person = {
  sayHello(){
    console.log("Hello");
  }
}
person.sayHello();  //"Hello"
//等同于
const person = {
  sayHello:function(){
    console.log("Hello");
  }
}
person.sayHello();//"Hello"
```

属性名表达式

 ES6允许用表达式作为属性名，但是一定要将表达式放在方括号内。 

```js
const obj = {
 ["he"+"llo"](){
   return "Hello";
  }
}
obj.hello();  //"Hello"
```

#### 对象的拓展运算符

 拓展运算符（...）用于取出参数对象所有可遍历属性然后拷贝到当前对象。 

```js
let person = {name: "Thomas", age: 16};
let someone = { ...person };
someone;  //{name: "Thomas", age: 16}
```

可用于合并两个对象

```js
let age = {age: 16};
let name = {name: "Thomas"};
let person = {...age, ...name};
person;  //{age: 16, name: "Thomas"}
```

### 6. 箭头函数

 箭头函数提供了一种更加简洁的函数书写方式。基本语法是 

```js
参数 => 函数体
```

基本用法

```js
var f = v => v;
```

注意： 箭头函数体中的 this 对象，是定义函数时的对象，而不是使用函数时的对象。 

```js
function fn(){
  setTimeout(()=>{
    // 定义时，this 绑定的是 fn 中的 this 对象
    console.log(this.a);
  },0)
}
var a = 30;
// fn 的 this 对象为 {a: 20}
fn.call({a: 20});  // 20
```

 不可以作为构造函数，也就是不能使用 new 命令，否则会报错 

##### 适合使用的场景

 ES6 之前，JavaScript中经常看到 var that= this 这样的代码，为了将外部 this 传递到回调函数中，那么有了箭头函数，就不需要这样做了，直接使用 箭头函数就行。 

```js
// 回调函数
var Person = {
    'age': 20,
    'sayHello': function () {
      setTimeout(function () {
        console.log(this.age);
      });
    }
};
var age = 30;
Person.sayHello();  // 20
 
var Person1 = {
    'age': 50,
    'sayHello': function () {
      setTimeout(()=>{
        console.log(this.age);
      });
    }
};
var age = 20;
Person1.sayHello();  // 50
```

### 7. ES 6 中的 class

在ES6中，class (类)作为对象的模板被引入，可以通过 class 关键字定义类。class 的本质是 function。

它可以看作一个语法糖，让对象原型的写法更加清晰、更像面向对象编程的语法。

声明类

```js
class Example {
    constructor(a) {
        this.a = a;
    }
}
```

类实例化

 class 的实例化必须通过 new 关键字。 

```js
let example = new Example()
```

类的继承

 通过 extends 实现类的继承。 子类 constructor 方法中必须有 super ，且必须出现在 this 之前。

```js
class Father {
    constructor() {}
}
class Child extends Father {
    constructor() {
        super()
    }
}
let child = new Child(); 
```

```html
<!DOCTYPE html>
<html lang="zh_CN">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>ES6 中的class</title>
  </head>
  <body>
    <script>
      /* 类的基本使用 */
      /* 匿名类 */
      let Demo = class {
        constructor(a) {
          this.a = a;
        }
      };
      /* 类 */
      class Father {
        name = 'Thomas';
        constructor() {
          //   this.a = a;
        }
        static a = 2;
      }
      class Son extends Father {
        // name = '123';
        constructor(name) {
          super(); // 必须调用
          this.name = name;
        }
        move() {
          console.log('移动');
        }
      }
      let son = new Son('Jack');
      console.log(son.__proto__);
      console.log(son.name);
      //   console.log(son);
      //   console.log(son.name);
    </script>
  </body>
</html>

```



### 8.ES6 中的模块

在 ES6 前， 实现模块化使用的是 RequireJS 或者 seaJS（分别是基于 AMD 规范的模块化库， 和基于 CMD 规范的模块化库）。ES6 引入了模块化，其设计思想是在编译时就能确定模块的依赖关系，以及输入和输出的变量。

ES6 的模块化分为导出（export） @与导入（import）两个模块。

模块导入导出各种类型的变量，如字符串，数值，函数，类。

methods.js

```js
let foo = 1;
let bar = 2;
export default  { foo, bar };
```

test.js

```js
import { foo, bar } from "methods.js";
```

as 用法

```js
import { foo as name1 } from "./methods.js";
```

export default 命令

- 在一个文件或模块中，export、import 可以有多个，export default 仅有一个。
- export default 中的 default 是对应的导出接口变量。
- 通过 export 方式导出，在导入时要加{ }，export default 则不需要。
- export default 向外暴露的成员，可以使用任意变量来接收。

```js
var a = "My name is Thomas!";
export default a; // 仅有一个
```

另外一个文件

```js
import b from "./xxx.js"; // 不需要加{}， 使用任意变量接收
```

### 9. Promise、async和await

Promise是异步编程的一种解决方案。从语法上说，Promise 是一个对象，从它可以获取异步操作的消息。

Promise 异步操作有三种状态：pending（进行中）、fulfilled（已成功）和 rejected（已失败）。除了异步操作的结果，任何其他操作都无法改变这个状态。Promise 对象只有：从 pending 变为 fulfilled 和从 pending 变为 rejected 的状态改变。只要处于 fulfilled 和 rejected ，状态就不会再变了即 resolved（已定型）。

```js
const p1 = new Promise(function (resolve, reject) {
    resolve('success1');
});
const p2 = new Promise(function (resolve, reject) {
    reject('reject');
});
p1.then(function (value) {
    console.log(value); // success1
});
// 链式调用
p2.catch(function (value) {
    console.log(value); // success3
    return 123;
}).then((res) => console.log(123));
```

### 10.Async

 async 是 ES7 才有的与异步操作有关的关键字， 配合await，可以让异步代码变同步。

async 函数中可能会有 await 表达式，async 函数执行时，如果遇到 await 就会先暂停执行 ，等到触发的异步操作完成后，恢复 async 函数的执行并返回解析值。await 关键字仅在 async function 中有效。如果在 async function 函数体外使用 await ，你只会得到一个语法错误。

```js
function testAwait (x) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(x);
    }, 2000);
  });
}
 
async function helloAsync() {
  var x = await testAwait ("hello world");
  console.log(x); 
}
helloAsync ();
// hello world
```



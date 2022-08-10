在上篇[《理解 Javascript 执行上下文和执行栈》](https://zhuanlan.zhihu.com/p/456099148)中讲到，当JavaScript代码执行一段可执行代码(executable code)时，会创建对应的执行上下文(execution context)。对于每个执行上下文，都有三个重要属性：

- 变量对象(Variable object，VO)
- 作用域链(Scope chain)
- this

变量对象（VO）是与执行上下文相关的数据作用域，存储了在上下文中定义的变量和函数声明。

不同上下文下的变量对象稍有不同，接下来我们来聊聊全局上下文下和函数上下文下的变量对象。



## 全局上下文

在全局上下文中，浏览器中的全局对象就是 window 对象，`this` 指向这个全局对象。

```text
console.log(this);
```

全局对象是由Object构造函数实例化的一个对象。

```text
console.log(this instanceof Object);
```

1.预定义了一大堆函数和属性。

```text
console.log(this.alert(123));
console.log(this.Math.random());
```

2.作为全局变量的宿主环境

```text
var a = 1;
console.log(this.a);
```

3.客户端JavaScript中，全局对象有window属性指向自身。

```text
var a = 1;
console.log(window.a);
this.window.b = 2;
console.log(this.b)
```

注意： let和const定义的变量并没有挂载在全局变量上

## 函数上下文

在函数上下文中，用活动对象(activation object, **AO**)来表示变量对象。

活动对象和变量对象的区别在于

- 1、变量对象（**VO**）是规范上或者是JS引擎上实现的，并不能在JS环境中直接访问。
- 2、当进入到一个执行上下文后，这个变量对象才会被**激活**，所以叫活动对象（**AO**），这时候活动对象上的各种属性才能被访问。

调用函数时，会为其创建一个**Arguments对象**，并自动初始化局部变量arguments，指代该Arguments对象。所有作为参数传入的值都会成为Arguments对象的数组元素。

### 执行过程

执行上下文的代码会分成两个阶段进行处理：分析和执行，我们也可以叫做：

1. 进入执行上下文
2. 代码执行

### 进入执行上下文

当进入执行上下文时，这时候还没有执行代码，

变量对象会包括：

1. 函数的所有形参 (如果是函数上下文)
   - 由名称和对应值组成的一个变量对象的属性被创建
   - 没有实参，属性值设为undefined
2. 函数声明
   - 由名称和对应值（函数对象(function-object)）组成一个变量对象的属性被创建
   - 如果变量对象已经存在相同名称的属性，则完全替换这个属性
3. 变量声明
   - 由名称和对应值（undefined）组成一个变量对象的属性被创建；
   - 如果变量名称跟已经声明的形式参数或函数相同，则变量声明不会干扰已经存在的这类属性

举个例子：

```text
function foo(a) {
  var b = 2;
  function c() {}
  var d = function() {};

  b = 3;

}

foo(2)
```

在进入执行上下文后，这时候的AO是：

```text
AO = {
    arguments: {
        0: 1,
        length: 1
    },
    a: 2,
    b: undefined,
    c: reference to function c(){},
    d: undefined
}
```

### 代码执行

在代码执行阶段，会顺序执行代码，根据代码，修改变量对象的值

还是上面的例子，当代码执行完后，这时候的AO是：

```text
AO = {
    arguments: {
        0: 1,
        length: 1
    },
    a: 2,
    b: 3,
    c: reference to function c(){},
    d: reference to FunctionExpression "d"
}
```

到这里变量对象的创建过程就介绍完了，让我们总结我们上述所说：

1. 全局上下文的变量对象初始化是全局对象 window 
2. 函数上下文的变量对象初始化只包括Arguments对象，在进入执行上下文时会给变量对象添加形参、函数声明、变量声明等初始的属性值，在代码执行阶段，会再次修改变量对象的属性值

## 思考题

最后让我们看几个例子：

### 第一题

```text
function foo() {
    console.log(a);
    a = 1;
}

foo();

function bar() {
    a = 1;
    console.log(a);
}
bar();
```

第一段会报错： Uncaught ReferenceError: a is not defined

第二段会打印1。

这是因为函数中的"a"并没有通过var关键字声明，所有不会被存放在AO中。

第一段执行console的时候，AO的值是：

```text
AO = {
    arguments: {
        length: 0
    }
}
```

没有a的值，然后就会到全局去找，全局也没有，所以会报错。

当第二段执行console的时候，全局对象已经被赋予了a属性，这时候就可以从全局找到a值，所以会打印1。

### 第二题

```text
console.log(foo);
function foo(){
    console.log("foo");
}
var foo = 1;
```

会打印函数，而不是undefined。

这是因为在进入执行上下文时，首先会处理函数声明，其次会处理变量声明，如果变量名称跟已经声明的形式参数或函数相同，则变量声明不会干扰已经存在的这类属性。



### 

初衷：方便查阅使用

# 语言基础

## 变量

### var

函数作用域

关键字 在函数体内var一个变量，在函数体**外部调用该函数后**打印就会报错。 如果在函数体内内部**不使用var 直接声明变量** 在函数体外部调用该函数后打印即可成功。

![image-20220919225324676](https://chemingqiang.oss-cn-shenzhen.aliyuncs.com/img/202209192253271.png)

Var 变量提升。只是提升变量 赋值并不会提升

![image-20220919225837741](https://chemingqiang.oss-cn-shenzhen.aliyuncs.com/img/202209192258322.png)

但是提升的变量**却不是赋值. 如下打印null

![image-20220921230838066](https://chemingqiang.oss-cn-shenzhen.aliyuncs.com/img/202209212308633.png)

全局声明（之前不曾知道的知识点）

![image-20220921232521380](https://chemingqiang.oss-cn-shenzhen.aliyuncs.com/img/202209212325450.png)

for循环中的问题 var

![image-20220921233953431](https://chemingqiang.oss-cn-shenzhen.aliyuncs.com/img/202209212339469.png)

连续打印5个5原因是在退出循环时，迭代变量保存导致循环退出值 5 在之后执行超时逻辑时 所有i是同一个变量。因而输出都是同一个最终值

### let

### 块作用域 暂时性死区

![image-20220921225513228](https://chemingqiang.oss-cn-shenzhen.aliyuncs.com/img/202209212255812.png)

不存在变量提升 以及不能重复声明

![image-20220921225649214](https://chemingqiang.oss-cn-shenzhen.aliyuncs.com/img/202209212256790.png)

在不同块级作用域中可以重复声明

![image-20220921230557160](https://chemingqiang.oss-cn-shenzhen.aliyuncs.com/img/202209212305739.png)

可以定义空值(这个地方主要与const做对比)

![image-20220921225905400](https://chemingqiang.oss-cn-shenzhen.aliyuncs.com/img/202209212259991.png)

暂时性死区（可与var做对比）

![image-20220921231013098](https://chemingqiang.oss-cn-shenzhen.aliyuncs.com/img/202209212310688.png)

无法全局声明

![image-20220921232709782](https://chemingqiang.oss-cn-shenzhen.aliyuncs.com/img/202209212327823.png)

for循环中的问题 let

![image-20220921234812463](https://chemingqiang.oss-cn-shenzhen.aliyuncs.com/img/202209212348495.png)

在使用let声明迭代变量时，js引擎在后台会为每个迭代循环声明一个新的迭代变量。每个settimeout引用的都是不同的变量实例。

const

与let基本相同，但是不能定义空变量 必须定义初始值

![image-20220921235206730](https://chemingqiang.oss-cn-shenzhen.aliyuncs.com/img/202209212352777.png)

const声明的限制只适用于它指向的变量的引用。如果const变量引用的是一个对象，那么**修改这个对象内部的属性不违反const限制**

![image-20220922001427966](https://chemingqiang.oss-cn-shenzhen.aliyuncs.com/img/202209220014008.png)

for循环

for in 和for of有意义

![image-20220922003134236](https://chemingqiang.oss-cn-shenzhen.aliyuncs.com/img/202209220031268.png)



## 数据类型

几种数据解释

### undefined

undefined只有一个undefined值，声明但是没有初始化。

无论声明但是未初始化还是未声明返回结果typeof都是undefined

![image-20220922004522788](https://chemingqiang.oss-cn-shenzhen.aliyuncs.com/img/202209220045837.png)

### Null

null类型只有一个特殊值null，null值表示一个空对象指针，所以typeof判断为object. 可以用于对一个对象的初始化 let obj = null;

![image-20220922005156985](https://chemingqiang.oss-cn-shenzhen.aliyuncs.com/img/202209220051036.png)

undefined是由null派生所以==比较相等

![image-20220922005523003](https://chemingqiang.oss-cn-shenzhen.aliyuncs.com/img/202209220055022.png)

条件判断 （就是上文提出的‘’ null undefined判断都为false）

![image-20220922005835253](https://chemingqiang.oss-cn-shenzhen.aliyuncs.com/img/202209220058292.png)

### Boolean

有两个字面值：true和false不等同于数值，因此true不等于1，false不等于0.

![image-20220922010413887](https://chemingqiang.oss-cn-shenzhen.aliyuncs.com/img/202209220104914.png)

![image-20220922010647383](https://chemingqiang.oss-cn-shenzhen.aliyuncs.com/img/202209220106414.png)

技巧；字符串里是数值前面加+号 默认转boolean或者Boolean(value)直接转

注意：数据类型来进行判断时，null undefined ‘’ 为false其余为true



### Number

精度问题 

![image-20220922011340327](https://chemingqiang.oss-cn-shenzhen.aliyuncs.com/img/202209220113363.png)

NaN

表示不是数值 用于表示本来要返回数值操作失败了（而不是抛出错误）

涉及NaN的操作都会返回NaN。NaN不等于包括NaN在内任何值

![image-20220922125227219](https://chemingqiang.oss-cn-shenzhen.aliyuncs.com/img/202209221252256.png)

### 数值转换

Number 可以转任何数值

number可以将null转为0

![image-20220922130200998](https://chemingqiang.oss-cn-shenzhen.aliyuncs.com/img/202209221302031.png)

parseInt和parseFloat主要用于将字符串转数值

需要得到整数时优先使用parseInt

![image-20220922130704199](https://chemingqiang.oss-cn-shenzhen.aliyuncs.com/img/202209221307225.png)

parseFloat 十六进制始终返回0 十进制格式开头0会被忽略

![image-20220922131426710](https://chemingqiang.oss-cn-shenzhen.aliyuncs.com/img/202209221314743.png)

### String

字符串不可变，一旦创建，值不可变。如果修改，就必须先销毁原始字符串，然后将包含新值的另一个字符串保存到该变量。

转换  

toString 可见于数值 布尔值 对象和字符串值 默认可传入参数表示进制位 2 8 10 16

![image-20220922132321625](https://chemingqiang.oss-cn-shenzhen.aliyuncs.com/img/202209221323657.png)

模版字面量

![image-20220922132751497](https://chemingqiang.oss-cn-shenzhen.aliyuncs.com/img/202209221327535.png)

字符串插值   所有插入的值都会默认使用toString强制转型为字符串

![image-20220922133104513](https://chemingqiang.oss-cn-shenzhen.aliyuncs.com/img/202209221331546.png)

插值表达式可以调用函数和**方法**

![image-20220922134127896](https://chemingqiang.oss-cn-shenzhen.aliyuncs.com/img/202209221341931.png)

![image-20220922134538639](https://chemingqiang.oss-cn-shenzhen.aliyuncs.com/img/202209221345669.png)

模版字面量标签函数

通过标签函数可以自定义插值行为。标签函数会接收被插值记号分隔后的模版和对每个表达式求值的结果。

![image-20220922212821649](https://chemingqiang.oss-cn-shenzhen.aliyuncs.com/img/202209222128680.png)



对于有n个插值的模版字面量，传给标签函数的表达式参数的个数始终是n，而传给标签函数的第一个参数所包含的字符串个数则始终是n+1.需要如下操作

![image-20220922214752606](https://chemingqiang.oss-cn-shenzhen.aliyuncs.com/img/202209222147641.png)



### Symbol

Es6新增数据类型。符号是原始值，且符号实例是唯一、不可变的。用途是确保对象属性使用唯一标识符，不会发生属性冲突。 用来创建唯一记号，进而操作用作非字符串形式的对象属性。

![image-20220922215506153](https://chemingqiang.oss-cn-shenzhen.aliyuncs.com/img/202209222155183.png)

只要创建Symbol()实例并将其用作对象新属性，就可以保证它不会覆盖已有对象属性

![image-20220922220011858](https://chemingqiang.oss-cn-shenzhen.aliyuncs.com/img/202209222200889.png)

Symbol()函数不能与new关键字一起作为构造函数使用。

![image-20220922220529537](https://chemingqiang.oss-cn-shenzhen.aliyuncs.com/img/202209222205569.png)

使用符号作为属性 

可以使用字符串或数值作为属性。包括对象字面量属性和Object.defineProperty()或Object.defineProperties()定义的属性

![image-20220922222009917](https://chemingqiang.oss-cn-shenzhen.aliyuncs.com/img/202209222220956.png)

![image-20220922222116500](https://chemingqiang.oss-cn-shenzhen.aliyuncs.com/img/202209222221535.png)

有时间需要用可以研究以下api

symbol.asyncIterator作为一个属性表示一个方法，该方法返回对象默认的AsyncIterator。这个符号表示实现异步迭代器API的函数

symbol.hasIntance 作为一个属性表示一个方法，该方法决定一个构造器对象是否认可一个对象是它的实例。

![image-20220922224720116](https://chemingqiang.oss-cn-shenzhen.aliyuncs.com/img/202209222247147.png)

symbol.isConcatSpreadable 作为一个属性表示一个布尔值，如果是true则意味着对象应该用Array.protype.concat()打平其数组元素。

symbol.ieterator 作为一个属性表示一个方法，该方法返回对象默认的迭代器。由for-of语句使用

symbol.match作为一个属性表示一个正则表达式方法，该方法用正则表达式区匹配字符串由String.prototype.match()方法使用

symbol.replace作为一个属性表示一个正则表达式方法，该方法替换一个字符串中匹配的子串。由String.prototype.replace()方法使用。

Symbol.search 作为一个属性表示一个正则表达式方法，该方法返回字符串中匹配正则表达式的索引。search为键的函数来对正则表达式求值。

symbol.species作为一个属性表示一个函数值，该函数作为创建派生对象的构造函数。这个属性在内置类型中最常用，用于对内置类型实例方法的返回值暴露实例化派生对象的方法。

symbol.split作为一个属性表示一个正则表达式方法，该方法在匹配正则表达式的索引位置拆分字符串。由String.prototype.split()方法使用。

symbol.toPrimitive作为一个属性表示一个方法，该方法将对象转换为相应的原始值。

symbol.toStringTag作为一个属性表示一个字符串，该字符串用于创建对象的默认字符串描述。由内置方法Object.prototype.toString()使用

Symbol.unscopables作为一个属性表示一个对象，该对象所有的以及继承的属性，都会从关联对象的with环境绑定中排出。



### Object

![image-20220922230709612](https://chemingqiang.oss-cn-shenzhen.aliyuncs.com/img/202209222307645.png)

与上面一一对应

构造函数实例

是否有某个属性

是否是另一个对象原型

属性是否可以使用for in枚举

返回对象字符串表示

返回对象字符串表示

返回对象对象的字符串 数值 或布尔值表示

![image-20220922231253972](https://chemingqiang.oss-cn-shenzhen.aliyuncs.com/img/202209222312008.png)

### Array ？？？





## 操作符

操作数据值

### 递增/递减操作符文

![image-20220922231756648](https://chemingqiang.oss-cn-shenzhen.aliyuncs.com/img/202209222317689.png)

后缀版递增和递减在语句被求值后才发生。 **被返回的原值是被加减操作后的值。参与计算的是未操作的原值。**

字符串如果不是有效数值形式，则为NaN。需转换为数值

![image-20220922232704063](https://chemingqiang.oss-cn-shenzhen.aliyuncs.com/img/202209222327095.png)

### 一元加和减

如果+放在数值字符串前边默认类型转换数值型 包括布尔值true false

![image-20220922232939575](https://chemingqiang.oss-cn-shenzhen.aliyuncs.com/img/202209222329612.png)



![image-20220922233401396](https://chemingqiang.oss-cn-shenzhen.aliyuncs.com/img/202209222334437.png)

-则变成负值

![image-20220922233453748](https://chemingqiang.oss-cn-shenzhen.aliyuncs.com/img/202209222334776.png)

### 布尔操作符

逻辑非  !

**暗含规则 0 、‘’、null、undefined、NaN为false其余都为true**

![image-20220923000701678](https://chemingqiang.oss-cn-shenzhen.aliyuncs.com/img/202209230007721.png)

![image-20220923000837407](https://chemingqiang.oss-cn-shenzhen.aliyuncs.com/img/202209230008456.png)

使用!!可以把任意值转换为布尔值。相当于使用Boolean()

![image-20220923001207495](https://chemingqiang.oss-cn-shenzhen.aliyuncs.com/img/202209230012531.png)

逻辑与  &&

true true true

false true false

false false false

![image-20220923001854118](https://chemingqiang.oss-cn-shenzhen.aliyuncs.com/img/202209230018158.png)

逻辑或   ||

true false true

true true true

false false false

![image-20220923001924548](https://chemingqiang.oss-cn-shenzhen.aliyuncs.com/img/202209230019582.png)

**利用这个规则 可以避免给变量赋值null或undefinde**

![image-20220923002132106](https://chemingqiang.oss-cn-shenzhen.aliyuncs.com/img/202209230021145.png)

### 乘性操作符

取模操作符

![image-20220923002426853](https://chemingqiang.oss-cn-shenzhen.aliyuncs.com/img/202209230024898.png)

### 指数操作符

Math.pow()

![image-20220923002636835](https://chemingqiang.oss-cn-shenzhen.aliyuncs.com/img/202209230026871.png)

### 关系操作符

![image-20220923002843935](https://chemingqiang.oss-cn-shenzhen.aliyuncs.com/img/202209230028984.png)

### 相等操作符

null和underfined 相等

如果有NaN 相等操作符也返回false

如果两个都是对象，则比较是不是同一个对象。不是则false

![image-20220923003214258](https://chemingqiang.oss-cn-shenzhen.aliyuncs.com/img/202209230032297.png)

全等与不全等 ==    ===

![image-20220923003337280](https://chemingqiang.oss-cn-shenzhen.aliyuncs.com/img/202209230033318.png)

### 条件操作符

即三目运算

![image-20220923003629507](https://chemingqiang.oss-cn-shenzhen.aliyuncs.com/img/202209230036544.png)

### 赋值操作符

![image-20220923003814300](https://chemingqiang.oss-cn-shenzhen.aliyuncs.com/img/202209230038336.png)

![image-20220923004004315](https://chemingqiang.oss-cn-shenzhen.aliyuncs.com/img/202209230040355.png)



### 逗号操作符

可以在一条语句中执行多个操作

![image-20220923004325363](https://chemingqiang.oss-cn-shenzhen.aliyuncs.com/img/202209230043402.png)



## 语句

### if

在循环里return false时就是整个方法直接停止 如果是break是当前循环体停止

break

![image-20220923005610313](https://chemingqiang.oss-cn-shenzhen.aliyuncs.com/img/202209230056350.png)

return

![image-20220923005854157](https://chemingqiang.oss-cn-shenzhen.aliyuncs.com/img/202209230058197.png)

### do-while

循环体中的代码执行后才会对退出条件进行求值。循环体内代码至少执行一次

![image-20220923004956149](https://chemingqiang.oss-cn-shenzhen.aliyuncs.com/img/202209230049200.png)



### while

先检测退出条件，再执行循环体内代码

![image-20220923010325577](https://chemingqiang.oss-cn-shenzhen.aliyuncs.com/img/202209230103636.png)



### for



### for-in

用于枚举对象中的非符号键属性

### while
即先检测退出条件，再执行循环体内的代码。。while语句代码有可能不执行的情况。

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5bd8fe0b558e4e72a452a48d19a242fa~tplv-k3u1fbpfcp-watermark.image?)

### for

无法通过while循环实现的逻辑，同样无法使用for循环实现。for循环只是将循环相关的代码封装在了一起而已。
一般i使用let声明 ，尽量避免使用var（可联系上文var声明关键字理解）

层次for循环使用就是递归以及双重for循环、

[for循环打印案例]([(68条消息) js for循环创造小星星⭐⭐⭐_秃头男神的博客-CSDN博客](https://blog.csdn.net/weixin_45896126/article/details/108930652))

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/eb1d23fff7024b1d8d2173cce75aec7c~tplv-k3u1fbpfcp-watermark.image?)


![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d6006e53135f41bc8b4dd4b533024d39~tplv-k3u1fbpfcp-watermark.image?)


![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2ea380f57d3d472ca4fd4883872d2f53~tplv-k3u1fbpfcp-watermark.image?)

### for-in

严格的迭代语句，用于枚举对象中的非符号键属性。  for in循环里属性变量尽量使用const

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2dbdd30d91114fc5a4e9ff8f037b8ab1~tplv-k3u1fbpfcp-watermark.image?)

### for-of
严格的迭代语句，用于遍历可迭代对象的元素

无法直接遍历对象。只能用于遍历数组中的对象

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f9a0a5c508de48dd87573ac2e92d0cf8~tplv-k3u1fbpfcp-watermark.image?)

break和continue语句

break用于立即退出循环，**强制执行循环后的下一条语句**。


![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/bfa20391e6e844dbbb1658cd7876af8a~tplv-k3u1fbpfcp-watermark.image?)

之所以为4，是因为当i等于5时break语句会导致循环退出，该次循环不会执行递增num的代码。


continue语句也用于立即退出循环，但会再次从循环顶部开始执行。


![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1f726e1525cf42199661a92cfa0d7b75~tplv-k3u1fbpfcp-watermark.image?)

当i等于5时 continue会退出 执行下一次迭代 重新从顶部开始。最终因为continue使其少递增一次，所以为8

### with

不推荐使用 影响性能且难于调试     用于多个相同api调用方法


![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/17d3b452cda94a619c52d3ad81e6bc69~tplv-k3u1fbpfcp-watermark.image?)


### switch

适合处理多个if else判断条件情况下使用


![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3815a357e74c4514b713a0f00b69e558~tplv-k3u1fbpfcp-watermark.image?)

为避免不必要条件判断，最好每个条件后面加break。如果需要匹配多个条件那么推荐写个注释表明故意忽略break


![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/07384177569b464e81986e1f820f8bc1~tplv-k3u1fbpfcp-watermark.image?)

条件判断中能够使用表达式，可以在判断中加入更多逻辑。


![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/94bb2d77f9ff4dacafbed6fdcc8613ec~tplv-k3u1fbpfcp-watermark.image?)

### 函数

函数对于任何语言都是核心组件。可封装语句，然后再任何地方、时间执行。

只要遇到return 语句，函数立即停止执行并退出

## 变量 作用域 内存

### 原始值与引用值

#### 动态属性
原始值类型不可以添加属性，引用值可随意添加属性。

#### 复制值

原始值类型复制过去，相当于复制一份全新空间的值。
引用值类型复制过去，其实就是将一个空间的指针（指向这个空间）


![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6b764c42b5824ae49b8c24d0a5787bc4~tplv-k3u1fbpfcp-watermark.image?)


#### 传递值
原始值传递是没有什么需要注意的，主要是对象传值 需要注意。


![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d5c2f1faac4f4ae89486c1ab26218c78~tplv-k3u1fbpfcp-watermark.image?)

上图，创建了一个对象，并把它保存在标量person中。然后将其作为参数传给函数方法，并被复制到参数a中。在函数方法中a和person都指向一个对象。即使对象是按值传进函数，a也会通过引用访问对象。当函数内部给obj设置name属性时，函数外部的对象也会反映这个变化，因为obj指向的对象保存在全局作用域的堆内存上。（不是固定的 是可以被修改的 是会变得 是会导致bug原因）


![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/58703c3b6000422aa31dea9836378300~tplv-k3u1fbpfcp-watermark.image?)

上图与上上图区别变化是set函数方法内多了两行代码，将obj重新定义为一个有着不同name的新对象。当person传入set方法时，其name属性被设置成了‘che’，然后变量a被设置为一个新对象且name属性被设置为‘hu’。如果person是按引用传递的，那么打印的应该是‘hu’而不是‘che’。可是当访问时，a的值还是‘che’，这表明函数中参数的值改变之后，原始的引用依然没变。当obj在函数内部重写时，它变成了一个指向本地对象的指针。而那个本地对象在函数执行结束时就被销毁了、

函数的参数就是局部变量


#### 确定类型


![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b6031c6bce0b488e9c8c6a5990c56b15~tplv-k3u1fbpfcp-watermark.image?)



![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6154558d844346539f70462624632025~tplv-k3u1fbpfcp-watermark.image?)


### 执行上下文与作用域

变量或函数的上下文决定它们可以访问哪些数据，以及它们的行为。每个上下文都有一个关联的变量对象，而这个上下文中定义的所有变量和函数都存在于这个对象上。虽然无法通过代码访问变量对象，但后台处理数据会用到它。

全局上下文是最外层的上下文。在浏览器中，全局上下文就是window对象，所有通过var定义的全局对象和函数都会成为window对象的属性和方法（和原型一样原理 [参照这个）]([方法原型对象使用 - 掘金 (juejin.cn)](https://juejin.cn/post/7142802239675957255)) 。 如下图


![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b83fa9cbf6724b4a9b7accffbd78f2b2~tplv-k3u1fbpfcp-watermark.image?)


上下文在其代所有代码都执行完毕后会被销毁，包括定义在它上面的所有变量和函数（全局上下文在应用程序退出前才会被销毁，比如关闭网页或退出浏览器）。

每个函数调用都有自己上下文，当代码执行流进入函数时，函数的上下文被推到一个上下文栈上。在函数执行完后，上下文栈会弹出该函数上下文（即销毁），将控制权返还给之前的执行上下文。

上下文中的代码在执行的时候，会创建变量的一个作用域链。这个作用域链决定了各级上下文中的代码在访问变量和函数时的顺序。代码正在执行的上下文的变量对象始终位于作用域链的最前端。如果上下文是函数，则其活动对象用作变量对象。活动对象最初只有一个定义变量：arguments。（全局上下文中没有这个变量。）作用域链中的下一个变量对象来自包含上下文，再下一个对象来自再下一个包含上下文。以此类推直至全局上下文；全局上下文的变量对象始终是作用域链的最后一个变量对象。


代码执行时的标识符解析是通过沿作用域链逐级搜索标识符名称完成的。搜索过程始终从作用域链的最前端开始，然后逐级往后，直到找到标识符。（如果没有找到标识符，那么通常会报错。）


![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6a10653fa2a044c3836c535749bd74a3~tplv-k3u1fbpfcp-watermark.image?)

如上图，函数changeColor的作用域链包括两个对象：一个是它自己的变量对象（就是定义arguments对象的那个），另一个是全局上下文的变量对象。这个函数内部之所以能够访问变量color，就是因为可以在作用域链中找到它。

局部作用域中定义的变量可用于在局部上下文中替换全局变量。 



![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f655e57368dc4e10aa8fe01f5024716a~tplv-k3u1fbpfcp-watermark.image?)

以上代码涉及3个上下文：全局上下文、changeColor（）的局部上下文和swapColors（）的局部上下文。全局上下文中有一个变量color和一个函数changeColor（）。changeColor（）的局部上下文中有一个变量anotherColor和一个函数swapColors（），但在这里可以访问全局上下文中的变量color。swapColors（）的局部上下文忠有一个变量tempColor，只能在这个上下文中访问到。全局上下文和changeColor（）的局部上下文都无法访问到tempColor。而在swapColors（）中则可以访问另外两个上下文中的变量，因为它们都是父上下文。下图展示上图的**作用域链**


![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/528d51e93bb64817b0ea84cc69c163c5~tplv-k3u1fbpfcp-watermark.image?)

矩形表示不同的上下文。内部上下文可以通过作用域链访问外部上下文中的一切，但外
部上下文无法访问内部上下文中的任何东西。上下文之间的连接是线性的、有序的。每个上下文都可以到上一级上下文中去搜索变量和函数，但任何上下文都不能到下一级上下文中去搜索。swapColors()局部上下文的作用域链中有3 个对象：swapColors()的变量对象、changeColor()的变量对象和全局变量对象。swapColors()的局部上下文首先从自己的变量对象开始搜索变量和函数，搜不到就去搜索上一级变量对象。changeColor()上下文的作用域链中只有2 个对象：它自己的变量对象和全局变量对象。因此，它不能访问swapColors()的上下文。


### 作用域链增强
执行上下文主要有全局上下文和函数上下文两种。有其他方式增强作用域链。 try/catch语句catch块以及with语句. 会在作用域链前端添加一个新的变量对象（临时添加上下文）。对with语句来说，会想作用域链前端添加指定的对象；对catch语句而言，则会创建一个新的变量对象，这个变量对象会包含要抛出的错误对象的声明。


![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a6fe94c3654c493298a7d105d6ee3286~tplv-k3u1fbpfcp-watermark.image?)

这里，with 语句将location 对象作为上下文，因此location 会被添加到作用域链前端。
buildUrl()函数中定义了一个变量qs。当with 语句中的代码引用变量href 时，实际上引用的是
location.href，也就是自己变量对象的属性。在引用qs 时，引用的则是定义在buildUrl()中的那
个变量，它定义在函数上下文的变量对象上。而在with 语句中使用var 声明的变量url 会成为函数
上下文的一部分，可以作为函数的值被返回；但像这里使用let 声明的变量url，因为被限制在块级作
用域（稍后介绍），所以在with 块之外没有定义。























## Promise

三种状态 pending resolve reject

![image-20220921221531226](https://chemingqiang.oss-cn-shenzhen.aliyuncs.com/img/202209212215803.png)

如果中间有接口reject

![image-20220921221702795](https://chemingqiang.oss-cn-shenzhen.aliyuncs.com/img/202209212217366.png)

![image-20220921221805355](https://chemingqiang.oss-cn-shenzhen.aliyuncs.com/img/202209212218933.png)



注：本文查阅红宝石归纳而成


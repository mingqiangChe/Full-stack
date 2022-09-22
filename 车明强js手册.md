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



逻辑或   ||















## Promise

三种状态 pending resolve reject

![image-20220921221531226](https://chemingqiang.oss-cn-shenzhen.aliyuncs.com/img/202209212215803.png)

如果中间有接口reject

![image-20220921221702795](https://chemingqiang.oss-cn-shenzhen.aliyuncs.com/img/202209212217366.png)

![image-20220921221805355](https://chemingqiang.oss-cn-shenzhen.aliyuncs.com/img/202209212218933.png)



注：本文查阅红宝石归纳而成


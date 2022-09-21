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



### Promise

三种状态 pending resolve reject

![image-20220921221531226](https://chemingqiang.oss-cn-shenzhen.aliyuncs.com/img/202209212215803.png)

如果中间有接口reject

![image-20220921221702795](https://chemingqiang.oss-cn-shenzhen.aliyuncs.com/img/202209212217366.png)

![image-20220921221805355](https://chemingqiang.oss-cn-shenzhen.aliyuncs.com/img/202209212218933.png)



注：本文查阅红宝石归纳而成


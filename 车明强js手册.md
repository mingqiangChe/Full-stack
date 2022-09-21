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

### let.

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

### Promise

三种状态 pending resolve reject

![image-20220921221531226](https://chemingqiang.oss-cn-shenzhen.aliyuncs.com/img/202209212215803.png)

如果中间有接口reject

![image-20220921221702795](https://chemingqiang.oss-cn-shenzhen.aliyuncs.com/img/202209212217366.png)

![image-20220921221805355](https://chemingqiang.oss-cn-shenzhen.aliyuncs.com/img/202209212218933.png)



注：本文查阅红宝石归纳而成


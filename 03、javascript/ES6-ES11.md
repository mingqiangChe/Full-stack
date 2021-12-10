# ES6

## let

```js
        //随意声明变量
        let a;
        let b, c, d;
        let e = 100;
        let f = 521, g = 'iloveyou', h = [];

        🍎1. 变量不能重复声明
        let star = '罗志祥';
        let star = '小猪'; //报错 Uncaught SyntaxError: Identifier 'star' has already been declared

        🍎2. 块儿级作用域  全局, 函数, eval
            if else while for 
        {
            let girl = '周扬青';
        }
        console.log(girl); //Uncaught ReferenceError: girl is not defined

        🍎3. 不存在变量提升
            console.log(song); //underfined
            let song = '恋爱达人';

        🍎4. 不影响作用域链
        {
            let school = '车车';
            function fn() {
                console.log(school);  //车车
            }
            fn();
        }
```

## const


```js
        //声明常量
        const SCHOOL = '车车';

        🍎1. 一定要赋初始值
        const A;  //Uncaught SyntaxError: Missing initializer in const declaration
        🍎2. 一般常量使用大写(潜规则)
        const a = 100;
        🍎3. 常量的值不能修改
        SCHOOL = 'ATGUIGU';  //Uncaught TypeError: Assignment to constant variable.不能给常量赋值
        🍎4. 块儿级作用域  在{}内
        {
            const PLAYER = 'UZI';
        }
        console.log(PLAYER);  //PLAYER is not defined
        🍎5. 对于数组和对象的元素修改, 不算做对常量的修改, 不会报错
        const TEAM = ['UZI', 'MXLG', 'Ming', 'Letme'];
        TEAM.push('Meiko');
        console.log(TEAM);//0: "UZI"1: "MXLG"2: "Ming"3: "Letme"4: "Meiko"
```

## 闭包

```
function Person() {
      var name = 'cxk'
      this.getName = function () {
        return name;
      }
      this.setName = function (value) {
        name = value
      }
    }
    const cxk = new Person()
    console.log(cxk.getName());  //cxk
    cxk.setName('dd')
    console.log(cxk.getName());//dd
    console.log(name);//nane is underfid
```

外部访问不到，只能通过new实例方法，通过调用实例里的方法去进行读写操作。

## 解构赋值

```js
        //ES6 允许按照一定模式从数组和对象中提取值，对变量进行赋值，
        //这被称为解构赋值。
        🍎1. 数组的结构 用的少
        const F4 = ['小沈阳', '刘能', '赵四', '宋小宝'];
        let [xiao, liu, zhao, song] = F4;
        console.log(xiao);
        console.log(liu);
        console.log(zhao);
        console.log(song);

        🍎2. 对象的解构  常用
        const zhao = {
            name: '赵本山',
            age: '不详',
            xiaopin: function () {
                console.log("我可以演小品");
            }
        };

        let { name, age, xiaopin } = zhao;
        console.log(name); //赵本山
        console.log(age);  //不详
        console.log(xiaopin);  //f(){console.log("我可以演小品");}
        xiaopin(); //我可以演小品

        🍎3.
        let { xiaopin } = zhao;
        xiaopin();  //zhao is not defined
```
## 模板字符串

```js
        // ES6 引入新的声明字符串的方式 『``』   '' "" 
        🍎1. 声明
        let str = `我也是一个字符串哦!`;
        console.log(str, typeof str);  //我也是一个字符串哦! string

        🍎2. 内容中可以直接出现换行符
        let str = `<ul>
                    <li>沈腾</li>
                    <li>玛丽</li>
                    <li>魏翔</li>
                    <li>艾伦</li>
                    </ul>`;
        console.log(str); //原文打印   如果是''  ""则报错
        🍎3. 变量拼接⭐
        let lovest = '魏翔';
        let out = `${lovest}是我心目中最搞笑的演员!!`; //固定格式
        console.log(out); //魏翔是我心目中最搞笑的演员!!
```
## 简化对象写入写法

```js
        //ES6 ⭐允许在大括号里面，直接写入变量和函数，作为对象的属性和方法。
        //这样的书写更加简洁
        //声明两个变量
        let name = '车车';
        let change = function () {
            console.log('我们可以改变你!!');
        }

        const school = {
            name,
            change,
            improve() {
                console.log("我们可以提高你的技能");
            }
        }

        console.log(school);//{name:"车车",cahnge:f,improve:f}
```

## this

通过new构造函数实例改变this指向

```
 function Person(name) {
      this.name = name;
      console.log(this.name);
    }
    var cxk = new Person('cxk')//cxk
```



### 箭头函数

箭头函数适合与 this 无关的回调. 定时器, 数组的方法回调

箭头函数不适合与 this 有关的回调.  DOM元素事件回调, 对象的方法

```js
        // ES6 允许使用「箭头」（=>）定义函数。
        //声明一个函数
        let fn = function () {

        }
        //两者比较写法
        let fn = (a, b) => {
            return a + b;
        }
        // // 调用函数
        let result = fn(1, 2);
        console.log(result); //3


        🍎1. this 是静态的. this 始终指向函数声明时所在作用域下的 this 的值
         function getName() {
            console.log(this.name);
        }
        let getName2 = () => {
            console.log(this.name);
        }

        // //设置 window 对象的 name 属性
        window.name = '车车';
        const school = {
            name: "ATGUIGU"
        }

        //直接调用  直接调用 指向window
        getName();//普通函数  车车
        getName2();//箭头函数 车车

        //call 方法调用 改变函数内部值  可以改变普通函数this 改变不了箭头函数this
        getName.call(school);//普通函数  ATGUIGU
        getName2.call(school);//箭头函数静态地  车车
        
        
        🍎2. 不能作为构造函数实例化对象 （普通函数可以构造函数实例化对象）
        let Person = (name, age) => {
            this.name = name;
            this.age = age;
        }
        let me = new Person('xiao', 30);
        console.log(me);  //Person is not a constructor
        
        
        🍎3. 不能使用 arguments 变量  (arguments可以保存实参,箭头函数不可以)
        箭头函数
        let fn = () => {
            console.log(arguments);
        }
        fn(1, 2, 3);//arguments is not defined
        普通函数
        let fn = function () {
            console.log(arguments);
        }
        fn(1, 2, 3);//Arguments(3) 0: 1 1: 2 2: 3
        
        🍎4. 箭头函数的简写
        //1) 省略小括号, 当形参有且只有一个的时候
        let add = n => {
            return n + n;
        }
        console.log(add(9));//18
        //2) 省略花括号, 当代码体只有一条语句的时候, 此时 return 必须省略
        // 而且语句的执行结果就是函数的返回值
        let pow = n => n * n;

        console.log(pow(8));//64
```
### 案例

```js
        //需求-1  点击 div 2s 后颜色变成『粉色』
        //获取元素
        let ad = document.getElementById('ad');
        //绑定事件
        ad.addEventListener("click", function(){
            //保存 this 的值
            // let _this = this;
            //定时器
            setTimeout(() => {
                //修改背景颜色 this
                // console.log(this);不使用箭头函数指向window
                // _this.style.background = 'pink';
                this.style.background = 'pink';//箭头函数 则this指向ad
            }, 2000);
        });

        //需求-2  从数组中返回偶数的元素
        const arr = [1,6,9,10,100,25];
        普通函数
        const result = arr.filter(function (item) {
            if (item % 2 === 0) {
                return true;
            } else {
                return false;
            }
        });
        箭头函数
        const result = arr.filter(item => item % 2 === 0);

        console.log(result); //[6,10,100]
```

### call apply  bind改变普通函数this指向

```
function f() {
      console.log(this.name);
    }
    var a = {
      name: '1'
    }
    var b = {
      name: '2'
    }
    f.bind(a)()//1
```





## 函数参数默认值

```js
        //ES6 允许给函数参数赋值初始值
        🍎1. 形参初始值 具有默认值的参数, 一般位置要靠后(潜规则)
        function add(a, c = 10, b = 2) {
            return a + b + c;
        }
        let result = add(1, 2);
        console.log(result);//5
        
        
        🍎2. 与解构赋值结合
        function connect({ host = "127.0.0.1", username, password, port }) {
            console.log(host)  //atguigu.com
            console.log(username)  //root
            console.log(password)  //root
            console.log(port)  //3306
        }
        connect({
            host: 'atguigu.com',
            username: 'root',
            password: 'root',
            port: 3306
        })
```

## rest参数 ...

```js
        // ES6 引入 rest 参数，用于获取函数的实参，用来代替 arguments
        // ES5 获取实参的方式
        function date() {
            console.log(arguments);⭐ //arguments ['白芷', '阿娇', '思慧']
        }
        date('白芷', '阿娇', '思慧');

        // rest 参数
        function date(...args) {
            console.log(args);//⭐['阿娇', '柏芝', '思慧']可以使用 filter some every map 
        }
        date('阿娇', '柏芝', '思慧');

        // rest 参数必须要放到参数最后
        function fn(a, b, ...args) {
            console.log(a);//1
            console.log(b);//2
            console.log(args);//3,4,5,6
        }
        fn(1, 2, 3, 4, 5, 6);
```

## 扩展运算符 ...        扩展运算符能将『数组』转换为逗号分隔的『参数序列』

```js
        //声明一个数组 ...
        const tfboys = ['易烊千玺', '王源', '王俊凯'];// => '易烊千玺','王源','王俊凯'

        // 声明一个函数
        function chunwan() {
            console.log(arguments);
        }

        chunwan(tfboys);// arguments(1)  0:('易烊千玺','王源','王俊凯')
        chunwan(...tfboys);// arguments(3)  0:'易烊千玺',1:'王源',2:'王俊凯')
```

### 案例

```js
        //1. 数组的合并 情圣  误杀  唐探
        const kuaizi = ['王太利', '肖央'];
        const fenghuang = ['曾毅', '玲花'];
        // const zuixuanxiaopingguo = kuaizi.concat(fenghuang);
        const zuixuanxiaopingguo = [...kuaizi, ...fenghuang];
        console.log(zuixuanxiaopingguo);  //Array(4)  0: "王太利" 1: "肖央" 2: "曾毅" 3: "玲花"

        //2. 数组的克隆
        const sanzhihua = ['E', 'G', 'M'];
        const sanyecao = [...sanzhihua];
        console.log(sanyecao); //  Array(3)['E','G','M']

        //3. 将伪数组转为真正的数组
        const divs = document.querySelectorAll('div');
        console.log(divs); //NodeList(3) 0: div 1: div 2: div
        const divArr = [...divs];
        console.log(divArr);// Array(3)0: div 1: div 2: div
```

## Symbol

```js
        //创建Symbol  值是唯一 解决命名冲突
        let s = Symbol();
        console.log(s, typeof s); //Symbol() 'symbol'
        // 传入字符串
        let s2 = Symbol('车车');
        let s3 = Symbol('车车');
        console.log(s2 === s3);//false
        //Symbol.for 创建
        let s4 = Symbol.for('车车');
        let s5 = Symbol.for('车车');
        console.log(s4 === s5);//true
        //不能与其他数据进行运算
        let result = s + 100;
        let result = s > 100;
        let result = s + s;
         //Uncaught TypeError: Cannot convert a Symbol value to a number
```
### 案例  向对象中添加方法


```js
        //向对象中添加方法 up down
        let game = {
            name: '俄罗斯方块',
            up: function () { },
            down: function () { }
        };

        //声明一个对象
        let methods = {
            up: Symbol(),
            down: Symbol()
        };

        game[methods.up] = function () {
            console.log("我可以改变形状");
        }

        game[methods.down] = function () {
            console.log("我可以快速下降!!");
        }

        console.log(game);//{name: '俄罗斯方块', up: ƒ, down: ƒ, Symbol(): ƒ, Symbol(): ƒ}

        //
        let youxi = {
            name: "狼人杀",
            //封装方法
            [Symbol('say')]: function () {
                console.log("我可以发言")
            },
            //封装方法
            [Symbol('zibao')]: function () {
                console.log('我可以自爆');
            }
        }

        console.log(youxi)//{name: '狼人杀', Symbol(say): ƒ, Symbol(zibao): ƒ}
```
### 内置属性   特定场景下表现  好多个(如下举例  后面补充)

```js
        // 🍎自己控制类型检测
        class Person {
            static [Symbol.hasInstance](param) {
                console.log(param);//Object[[Prototype]]: Object
                console.log("我被用来检测类型了");//我被用来检测类型了
                return false;
            }
        }

        let o = {};

        console.log(o instanceof Person);//false
        // 🍎数组合并是否可以展开
        const arr = [1, 2, 3];
        const arr2 = [4, 5, 6];
        arr2[Symbol.isConcatSpreadable] = false;
        console.log(arr.concat(arr2));
```


## 迭代器  拿到想拿到的数据
是一种接口,为各种不同数据结构提供统一访问机制.任何数据结构只要部署iterator接口,就for of 可以完成遍历操作.

iterator接口:对象里面属性 

原理:   需要自定义遍历数据时候

1)创建指针对象,指向当前数据结构的起始位置 

2)第一次调用对象next方法,指针自动指向数据结构地第一个成员.

3)不断调用next方法,指针一直往后移动,直到指向最后一个成员 

4)每调用next方法返回一个包含value和done属性的对象.
```js
        //声明一个数组
        const xiyou = ['唐僧', '孙悟空', '猪八戒', '沙僧'];

        //使用 for...of 遍历数组  in键名  of 键值
        for (let v of xiyou) {
            console.log(v);  //唐僧  孙悟空  猪八戒   沙僧
        }
        
        
        let iterator = xiyou[Symbol.iterator]();

        // //调用对象的next方法
        console.log(iterator.next());//done false  value 唐僧
        console.log(iterator.next());//...
        console.log(iterator.next());
        console.log(iterator.next());
        console.log(iterator.next());//done false value 沙僧
        //第五次打印  //value underfined  done true
```
### 案例

```js
        //声明一个对象
        const banji = {
            name: "终极一班",
            stus: [
                'xiaoming',
                'xiaoning',
                'xiaotian',
                'knight'
            ],
            [Symbol.iterator]() {
                //索引变量
                let index = 0;
                //
                let _this = this;
                return {
                    next: function () {
                        if (index < _this.stus.length) {
                            const result = { value: _this.stus[index], done: false };
                            //下标自增
                            index++;
                            //返回结果
                            return result;
                        } else {
                            return { value: undefined, done: true };
                        }
                    }
                };
            }
        }

        //遍历这个对象   ⭐⭐⭐得到我想拿到的数据
        for (let v of banji) {
            console.log(v);   //'xiaoming','xiaoning','xiaotian','knight'
        }
```


## 生成器   异步解决方案

```js
         //生成器其实就是一个特殊的函数
        //异步编程  纯回调函数  node fs  ajax mongodb
        //函数代码的分隔符yield
        function* gen() {
            // console.log(111);
            yield '一只没有耳朵';
            // console.log(222);
            yield '一只没有尾部';
            // console.log(333);
            yield '真奇怪';
            // console.log(444);
        }

        let iterator = gen();
        // 迭代器对象next 输出结果和迭代器方式一样
        console.log(iterator.next());//Object done: false value: "一只没有耳朵"
        console.log(iterator.next());
        console.log(iterator.next());
        console.log(iterator.next());

        //遍历  全部输出 一只没有耳朵  一只没有尾部  真奇怪
        for (let v of gen()) {
            console.log(v);
        }
```
### 生成器函数参数

```js
        function* gen(arg) {
            console.log(arg);
            let one = yield 111;
            console.log(one);
            let two = yield 222;
            console.log(two);
            let three = yield 333;
            console.log(three);
        }

        //执行获取迭代器对象
        let iterator = gen('AAA');
        console.log(iterator.next());
        //next方法也可以传入实参  作为第一个返回结果
        console.log(iterator.next('BBB'));
        console.log(iterator.next('CCC'));
        console.log(iterator.next('DDD'));
```
### 生成器函数实例

```js
         // 异步编程  文件操作 网络操作(ajax, request) 数据库操作
        // 1s 后控制台输出 111  2s后输出 222  3s后输出 333 
        // 回调地狱
        setTimeout(() => {
            console.log(111);
            setTimeout(() => {
                console.log(222);
                setTimeout(() => {
                    console.log(333);
                }, 3000);
            }, 2000);
        }, 1000);

        🍎另一种方法实现
        function one() {
            setTimeout(() => {
                console.log(111);
                iterator.next();
            }, 1000)
        }

        function two() {
            setTimeout(() => {
                console.log(222);
                iterator.next();
            }, 2000)
        }

        function three() {
            setTimeout(() => {
                console.log(333);
                iterator.next();
            }, 3000)
        }

        function* gen() {
            yield one();
            yield two();
            yield three();
        }

        //调用生成器函数
        let iterator = gen();
        iterator.next();
```

### 案例

```js
        //模拟获取  用户数据  订单数据  商品数据 
        function getUsers() {
            setTimeout(() => {
                let data = '用户数据';
                //调用 next 方法, 并且将数据传入
                iterator.next(data);
            }, 1000);
        }

        function getOrders() {
            setTimeout(() => {
                let data = '订单数据';
                iterator.next(data);
            }, 1000)
        }

        function getGoods() {
            setTimeout(() => {
                let data = '商品数据';
                iterator.next(data);
            }, 1000)
        }

        function * gen() {
            let users = yield getUsers();
            let orders = yield getOrders();
            let goods = yield getGoods();
        }

        //调用生成器函数
        let iterator = gen();
        iterator.next();

```
## Promise
异步编程解决方案    **语法上是构造函数 用来封装异步操作并可以获取期成功或失败结果**
### 基本语法

```js
        //实例化 Promise 对象  状态：初始化  成功  失败
        const p = new Promise(function (resolve, reject) {
            // 异步操作
            setTimeout(function () {
                // resolve
                // let data = '数据库中的用户数据';
                // resolve(data);

                let err = '数据读取失败';
                reject(err);
            }, 1000);
        });

        //调用 promise 对象的 then 方法  接收两个函数类型值    成功调用第一个函数类型值形参  失败调用第二个
        p.then(function (value) {
            console.log(value);
        }, function (reason) {
            console.error(reason);
        })
```

### Promise封装读取文件  多个异步任务处理

```js
//1. 引入 fs 模块
const fs = require('fs');

// 调用方法读取文件
     fs.readFile('./resources/为学.md', (err, data) => {
         //如果失败, 则抛出错误
         if (err) throw err;
         //如果没有出错, 则输出内容
         console.log(data.toString());  //成功输出
    });

//🍎或 使用 Promise 封装
const p = new Promise(function (resolve, reject) {
    fs.readFile('./resources/为学.md', (err, data) => {
        //判断如果失败
        if (err) reject(err);
        //如果成功
        resolve(data);
    });
});

p.then(function (value) {
    console.log(value.toString());
}, function (reason) {
    console.log("读取失败!!");
});
```

### Promise封装AJAX

```js
 // 接口地址: https://api.apiopen.top/getJoke
        const p = new Promise((resolve, reject) => {
            //1. 创建对象
            const xhr = new XMLHttpRequest();

            //2. 初始化
            xhr.open("GET", "https://api.apiopen.top/getJoke");

            //3. 发送
            xhr.send();

            //4. 绑定事件, 处理响应结果
            xhr.onreadystatechange = function () {
                //判断
                if (xhr.readyState === 4) {
                    //判断响应状态码 200-299
                    if (xhr.status >= 200 && xhr.status < 300) {
                        //表示成功
                        resolve(xhr.response);
                    } else {
                        //如果失败
                        reject(xhr.status);
                    }
                }
            }
        })

        //指定回调
        p.then(function (value) {
            console.log(value);
        }, function (reason) {
            console.error(reason);
        });
```


### Promise-then方法


```js
     //创建 promise 对象
        const p = new Promise((resolve, reject)=>{
            setTimeout(()=>{
                resolve('用户数据');
                // reject('出错啦');
            }, 1000)
        });

        //调用 then 方法  then方法的返回结果是 Promise 对象, 对象状态由回调函数的执行结果决定
        //1. 如果回调函数中返回的结果是 非 promise 类型的属性, 状态为成功, ⭐返回值为对象的成功的值

        // const result = p.then(value => {
        //     console.log(value);
        //     //1. 非 promise 类型的属性
        //     // return 'iloveyou';
        //     //2. 是 promise 对象
        //     // return new Promise((resolve, reject)=>{
        //     //     // resolve('ok');
        //     //     reject('error');
        //     // });
        //     //3. 抛出错误
        //     // throw new Error('出错啦!');
        //     throw '出错啦!';
        // }, reason=>{
        //     console.warn(reason);
        // });

        //链式调用
        p.then(value=>{

        }).then(value=>{

        });
```


### catch promise失败后回调 语法糖,不指定第一个成功函数参数,直接输出第二个失败函数参数形参

```js
const p = new Promise((resolve, reject)=>{
            setTimeout(()=>{
                //设置 p 对象的状态为失败, 并设置失败的值
                reject("出错啦!");
            }, 1000)
        });

        // p.then(function(value){}, function(reason){
        //     console.error(reason);
        // });

        p.catch(function(reason){
            console.warn(reason);
        });
```



### 案例 读取多个文件

```js
    //引入 fs 模块
    const fs = require("fs");

     fs.readFile('./resources/为学.md', (err, data1)=>{
             fs.readFile('./resources/插秧诗.md', (err, data2)=>{
             fs.readFile('./resources/观书有感.md', (err, data3)=>{
                 let result = data1 + '\r\n' +data2  +'\r\n'+ data3;
                 console.log(result);
             });
         });
     });

//使用 promise 实现
const p = new Promise((resolve, reject) => {
    fs.readFile("./resources/为学.md", (err, data) => {
        resolve(data);
    });
});

p.then(value => {
    return new Promise((resolve, reject) => {
        fs.readFile("./resources/插秧诗.md", (err, data) => {
            resolve([value, data]);
        });
    });
}).then(value => {
    return new Promise((resolve, reject) => {
        fs.readFile("./resources/观书有感.md", (err, data) => {
            //压入
            value.push(data);
            resolve(value);
        });
    })
}).then(value => {
    console.log(value.join('\r\n'));
});

```

## set(集合) 数据结构   类似数组
但成员值唯一   集合实现interator接口 可以使用扩展运算符和for of 进行遍历
集合属性和方法

1)size   返回集合元素个数

2)add  增加一个新元素,返回当前集合

3)delete  删除元素,返回boolean值

4)has  检测集合中是否包含某个元素 ,返回boolean值


```js
        //声明一个 set  一般传入数组
        let s = new Set();
        let s2 = new Set(['大事儿', '小事儿', '好事儿', '坏事儿', '小事儿']);

        //元素个数
        console.log(s2.size);//4
        //添加新的元素
        s2.add('喜事儿');
        //删除元素
        s2.delete('坏事儿');
        //检测
        console.log(s2.has('糟心事'));//false
        //清空
        s2.clear();
        console.log(s2);//''

        for (let v of s2) {
            console.log(v);
        }
```
###  案例

```js
    let arr = [1, 2, 3, 4, 5, 4, 3, 2, 1];
        //1. 数组去重
        let result = [...new Set(arr)];
        console.log(result);//[1,2,3,4,5]
        //2. 交集
        let arr2 = [4, 5, 6, 5, 6];
        let result = [...new Set(arr)].filter(item => {
            let s2 = new Set(arr2);// 4 5 6
            if (s2.has(item)) {
                return true;
            } else {
                return false;
            }
        });
        // 或者
        let result = [...new Set(arr)].filter(item => new Set(arr2).has(item));

        //打印
        console.log(result);//4,5

        //3. 并集
        let union = [...new Set([...arr, ...arr2])];
        console.log(union);//[1,2,3,4,5,6]

        //4. 差集 交集逆运算
        let diff = [...new Set(arr)].filter(item => !(new Set(arr2).has(item)));
        console.log(diff);//1,2,3
```

## Map   类似于对象
键值对集合.键范围不局限于字符串,各种类型值(包括对象).map也实现interator接口.可以使用扩展运算符和for of 进行遍历.
map属性和方法

1)size   返回map元素个数

2)set  增加一个新元素,返回当前map

3)get  返回键名对象的键值

4)has  检测map中是否包含某个元素 ,返回boolean值

5)clear 清空集合,返回underfined

```js
//声明 Map
        let m = new Map();

        //添加元素
        m.set('name', '车车');  //Map key:name value:车车
        m.set('change', function () {
            console.log("我们可以改变你!!");//Map key:'change' value f
        });
        let key = {
            school: 'ATGUIGU'
        };
        m.set(key, ['北京', '上海', '深圳']); //key:ATGUIGU value:['北京', '上海', '深圳']

        //size
        console.log(m.size);//3

        //删除
        m.delete('name');

        //获取
        console.log(m.get('change'));//f
        console.log(m.get(key));//['北京', '上海', '深圳']


        //清空
        m.clear();//Map(0)

        //遍历  每个元素数组
        for (let v of m) {
            console.log(v);
        }

        console.log(m);
```

## class类  语法糖 更像面向对象编程语法
知识点:

1)clss声明类

2)constructor定义构造函数初始化

3)extends继承父类

4)super调用父级构造方法

5)static定义静态方法和属性

6)父类方法可以重写

```js
    //手机
        function Phone(brand, price) {
            this.brand = brand;
            this.price = price;
        }

        //添加方法
        Phone.prototype.call = function () {
            console.log("我可以打电话!!");
        }

        //实例化对象
        let Huawei = new Phone('华为', 5999);

        console.log(Huawei);//brand:'华为' price:5999 原型_proto_下call方法f
        Huawei.call();
        console.log(Huawei)// 我可以打电话!!   brand:'华为' price:5999
        //🍎class
        class Shouji {
            //构造方法 名constructor字不能修改
            constructor(brand, price) {
                this.brand = brand;
                this.price = price;
            }

            //⭐方法必须使用该语法, 不能使用 ES5 的对象完整形式
            call() {
                console.log("我可以打电话!!");
            }
        }

        let onePlus = new Shouji("1+", 1999);

        console.log(onePlus);//brand:'1+' price:1999 原型_proto_下call方法f


```
### 类静态成员

```js
    //ES5
        function Phone() {

        }
        Phone.name = '手机';
        Phone.change = function () {
            console.log("我可以改变世界");
        }
        Phone.prototype.size = '5.5inch';

        let nokia = new Phone();

        console.log(nokia.name);//underfined 实例对象没有构造函数上方法
        nokia.change();//is not function
        console.log(nokia.size);//5.5inch⭐可以

        // ES6
        class Phone {
            //静态属性
            static name = '手机';
            static change() {
                console.log("我可以改变世界");
            }
        }

        let nokia = new Phone();
        console.log(nokia.name);//underfined
        console.log(Phone.name);//手机
```
### 对象继承  es5构造函数继承


```js
     //手机
        function Phone(brand, price) {
            this.brand = brand;
            this.price = price;
        }

        Phone.prototype.call = function () {
            console.log("我可以打电话");
        }

        //智能手机
        function SmartPhone(brand, price, color, size) {
            Phone.call(this, brand, price);
            this.color = color;
            this.size = size;
        }

        //设置子级构造函数的原型
        SmartPhone.prototype = new Phone;
        SmartPhone.prototype.constructor = SmartPhone;

        //声明子类的方法
        SmartPhone.prototype.photo = function () {
            console.log("我可以拍照")
        }

        SmartPhone.prototype.playGame = function () {
            console.log("我可以玩游戏");
        }

        const chuizi = new SmartPhone('锤子', 2499, '黑色', '5.5inch');

        console.log(chuizi);//SmartPhone  brand: "锤子" color: "黑色  price: 2499  size: "5.5inch"  原型方法子 smartPhone 父 phone

```


### 类继承


```js
    class Phone {
            //父类构造方法
            constructor(brand, price) {
                this.brand = brand;
                this.price = price;
            }
            //父类的成员属性
            call() {
                console.log("我可以打电话!!");
            }
        }

        class SmartPhone extends Phone {
            //构造方法
            constructor(brand, price, color, size) {
                super(brand, price);// Phone.call(this, brand, price)
                this.color = color;
                this.size = size;
            }

            photo() {
                console.log("拍照"); //2.拍照
            }

            playGame() {
                console.log("玩游戏");//3.玩游戏
            }

            call() {
                console.log('我可以进行视频通话'); //1.我可以进行视频通话
            }
        }

        const xiaomi = new SmartPhone('小米', 799, '黑色', '4.7inch');
        console.log(xiaomi);//SmartPhone {brand: '小米', price: 799, color: '黑色', size: '4.7inch'} 子类 constructor=> class SmartPhone 方法 f photo  f call父类 call
        xiaomi.call();//1
        xiaomi.photo();//2
        xiaomi.playGame();//3
```

### 子类对付类方法重写
声明同名方法 
    子类不能直接调父类同名方法  使用super也不行 普通成员方法里不能出现super去调父类同名方法.  只能完全重写


### class中set和get  对对象属性方法绑定

```js
     // get 和 set  
        class Phone {
            get price() {
                console.log("价格属性被读取了");
                return 'iloveyou';
            }

            set price(newVal) {
                console.log('价格属性被修改了');
            }
        }

        //实例化对象
        let s = new Phone();

        console.log(s.price);//价格属性被读取了   iloveyou
        s.price = 'free';//价格属性被修改了
```

## 数值扩展

```js
         //0. Number.EPSILON 是 JavaScript 表示的最小精度
        //EPSILON 属性的值接近于 2.2204460492503130808472633361816E-16
        function equal(a, b) {
            if (Math.abs(a - b) < Number.EPSILON) {
                return true;
            } else {
                return false;
            }
        }
        console.log(0.1 + 0.2 === 0.3);//false
        console.log(equal(0.1 + 0.2, 0.3))//true

        //1. 二进制和八进制
        let b = 0b1010;
        let o = 0o777;
        let d = 100;
        let x = 0xff;
        console.log(x);//255

        //2. Number.isFinite  检测一个数值是否为有限数
        console.log(Number.isFinite(100));//true
        console.log(Number.isFinite(100 / 0));//false
        console.log(Number.isFinite(Infinity));//false

        //3. Number.isNaN 检测一个数值是否为 NaN 
        console.log(Number.isNaN(123));//false

        //4. Number.parseInt Number.parseFloat字符串转整数
        console.log(Number.parseInt('5211314love'));//5211314
        console.log(Number.parseFloat('3.1415926神奇'));//3.1415926

        //5. Number.isInteger 判断一个数是否为整数
        console.log(Number.isInteger(5));//true
        console.log(Number.isInteger(2.5));//false

        //6. Math.trunc 将数字的小数部分抹掉  
        console.log(Math.trunc(3.5));//3

        //7. Math.sign 判断一个数到底为正数 负数 还是零
        console.log(Math.sign(100));//1
        console.log(Math.sign(0));//0
        console.log(Math.sign(-20000));//-1
```



## 对象方法扩展


```js
        //1. 🍎Object.is 判断两个值是否完全相等 
        console.log(Object.is(120, 120));// true
        console.log(Object.is(NaN, NaN));// true
        console.log(NaN === NaN);// false

        //2. 🍎Object.assign 对象的合并
        const config1 = {
            host: 'localhost',
            port: 3306,
            name: 'root',
            pass: 'root',
            test: 'test'
        };
        const config2 = {
            host: 'http://atguigu.com',
            port: 33060,
            name: 'atguigu.com',
            pass: 'iloveyou',
            test2: 'test2'
        }
        console.log(Object.assign(config1, config2));//host: "http://atguigu.com" name: "atguigu.com" pass: "iloveyou" port: 33060test: "test" test2: "test2"

        //3. 🍎Object.setPrototypeOf 设置原型对象  Object.getPrototypeof
        const school = {
            name: '车车'
        }
        const cities = {
            xiaoqu: ['北京', '上海', '深圳']
        }
        Object.setPrototypeOf(school, cities);
        console.log(Object.getPrototypeOf(school));//xiaoqu: (3) ['北京', '上海', '深圳']
        console.log(school);//name: "车车" 子类 xiaoqu(3) ['北京', '上海', '深圳'] 父类 构造函数 object 
```

## ES6模块化
将一个大程序文件,拆分许多小文件,然后将小文件组合起来
好处:

1)防止命名冲突

2)代码复用

3)高维护性

### 模块化语法 A方法

export命令用于规定模块对外接口

import命令用于输入其他模块提供的功能

**以下方法一一对应**
m1.js

```js
//🍎分别暴漏
export let school = '123'
export function()
    {
        console.log('234')
    }
//🍎统一暴漏
let school = '123'
function find()
    {
        console.log('234')
    }
export {school,find}
//🍎默认暴漏
export default{
    school:'123'
    change:function(){console.log('234')}
```
html

```js
<script type='module'>
//🍎通用方式
import * as m1 from './m1.js'
console.log(m1)
//🍎解构赋值
import {school,change} from './m1.js'
console.log(school)
//名字重复 使用`别名
import {school as zz,change} from './m1.js'
console.log(zz)
//🍎默认暴漏解决
import {default as m1} from './m1.js'
    或
import  m1 from './m1.js'
//该方式只针对默认暴漏
console.log(m1)
</script>
```
### es6 module B方法

app.js

```js

//模块引入`
import * as m1 from './m1.js'


//使用js
m1.change();
....
```
html

```js
<script src='./app.js type='module' />
```


### 解决兼容性 项目中采用方式 转es5
1.安装工具 babel-cli  babel-preset-env  browserify(或webpack)打包工具  -D

2.npx babel src/js  dist/js --presets=babel-preset-env

3.打包  npx browserify dist/js/app.js -o dist/bundle.js

html
报错

```js
<script src="/dist/js/app.js"/>
```
正确
```js
<script src="dist/bundle.js"/>
```
4.不断进行打包

#### 案例 使用jq改背景色
1. npm i jquery
2.app.js

```js
import $ from 'jquery'
//正常使用jq代码
...
```
3.打包


# ES7

## Array.prototypr.includes
数组方法 检测数组中是否包含某个元素 返回布尔值

```js
        // includes   indexOf
        const mingzhu = ['西游记', '红楼梦', '三国演义', '水浒传'];

        //判断
        console.log(mingzhu.includes('西游记'));//true
        console.log(mingzhu.includes('金瓶梅'));//false
```

## 指数操作符
引入指数运算符 ** 实现幂运算 功能与Math.pow相同

```js
        // **
        console.log(2 ** 10);// 1024
        console.log(Math.pow(2, 10));//1024
```

# ES8


## async和await
解决异步

**async函数**

async函数的返回值为promise对象

promise对象的结果由async函数执行的返回值决定

```js
        //async 函数
        async function fn() {
             🍎返回一个字符串
            // return '车车';
            /返回的结果不是一个 Promise 类型的对象, 返回的结果就是成功 Promise 对象
            
            // return;
            🍎抛出错误, 返回的结果是一个失败的 Promise
            // throw new Error('出错啦!');
            
            
            //返回的结果如果是一个 Promise 对象
            return new Promise((resolve, reject) => {
                resolve('成功的数据');//🍎成功的数据
                // reject("失败的错误");
            });
        }

        const result = fn();

        //调用 then 方法
        result.then(value => {
            console.log(value);
        }, reason => {
            console.warn(reason);
        })
```
**await表达式**

await必须写在async函数中

await右侧的表达式一般为promise对象

await返回的是promise成功的值

await的promise失败了,就会抛出异常,需要通过try catch 捕获处理



```js
        创建 promise 对象
        const p = new Promise((resolve, reject) => {
            resolve("用户数据");
            // reject("失败啦!");//需要用try catch捕获
        })

        // await 要放在 async 函数中.
        async function main() {
            try {
                let result = await p;
                //
                console.log(result);
            } catch (e) {
                console.log(e);
            }
        }
        //调用函数
        main();
```

### 结合使用  读取多个文件


```js
    //1. 引入 fs 模块
const fs = require("fs");

//读取『为学』
function readWeiXue() {
    return new Promise((resolve, reject) => {
        fs.readFile("./resources/为学.md", (err, data) => {
            //如果失败
            if (err) reject(err);
            //如果成功
            resolve(data);
        })
    })
}

function readChaYangShi() {
    return new Promise((resolve, reject) => {
        fs.readFile("./resources/插秧诗.md", (err, data) => {
            //如果失败
            if (err) reject(err);
            //如果成功
            resolve(data);
        })
    })
}

function readGuanShu() {
    return new Promise((resolve, reject) => {
        fs.readFile("./resources/观书有感.md", (err, data) => {
            //如果失败
            if (err) reject(err);
            //如果成功
            resolve(data);
        })
    })
}

//声明一个 async 函数
async function main(){
    //获取为学内容
    let weixue = await readWeiXue();
    //获取插秧诗内容
    let chayang = await readChaYangShi();
    // 获取观书有感
    let guanshu = await readGuanShu();

    console.log(weixue.toString());
    console.log(chayang.toString());
    console.log(guanshu.toString());
}

main();
```
### 结合使用  封装ajax请求


```js
    // 发送 AJAX 请求, 返回的结果是 Promise 对象
        function sendAJAX(url) {
            return new Promise((resolve, reject) => {
                //1. 创建对象
                const x = new XMLHttpRequest();

                //2. 初始化
                x.open('GET', url);

                //3. 发送
                x.send();

                //4. 事件绑定
                x.onreadystatechange = function () {
                    if (x.readyState === 4) {
                        if (x.status >= 200 && x.status < 300) {
                            //成功啦
                            resolve(x.response);
                        }else{
                            //如果失败
                            reject(x.status);
                        }
                    }
                }
            })
        }
    
        //promise then 方法测试
             sendAJAX("https://api.apiopen.top/getJoke").then(value=>{
                 console.log(value);
            }, reason=>{})
  
        // async 与 await 测试  axios
        async function main(){
            //发送 AJAX 请求
            let result = await sendAJAX("https://api.apiopen.top/getJoke");
            //再次测试
            let tianqi = await sendAJAX('https://www.tianqiapi.com/api/?version=v1&city=%E5%8C%97%E4%BA%AC&appid=23941491&appsecret=TXoD5e8P')

            console.log(tianqi);
        }

        main();
```


## 对象方法扩展 Objext.values和Object.entries

Objext.values()方法返回一个给定对象的所有可枚举属性值的数组


Object.entries()方法返回一个给定对象自身可遍历属性[key,vakue]的数组


## Object.getOwnPropertyDescriptors

该方法返回指定对象所有自身属性的描述对象


```js

    //声明对象
        const school = {
            name: "车车",
            cities: ['北京', '上海', '深圳'],
            xueke: ['前端', 'Java', '大数据', '运维']
        };

        //获取对象所有的键
        console.log(Object.keys(school));//Array(3) 0: "name" 1: "cities" 2: "xueke"
        //获取对象所有的值
        console.log(Object.values(school));//: "车车" 1: Array(3) 0: "北京" 1: "上海" 2: "深圳" length: 3 [[Prototype]]: Array(0) 2: Array(4) 0: "前端"1: "Java" 2: "大数据"3: "运维"
        //entries
        console.log(Object.entries(school));//键· 值
        //创建 Map
        const m = new Map(Object.entries(school));
        console.log(m.get('cities'));//['北京', '上海', '深圳'],

        //对象属性的描述对象
        console.log(Object.getOwnPropertyDescriptors(school));//Object  school cites  xueke
        // create  第一个原型对象  第二个描述对象
        const obj = Object.create(null, {
            name: {
                //设置值
                value: '车车',
                //属性特性
                writable: true,
                configurable: true,
                enumerable: true
            }
        });
```

# ES9

## 针对对象的rest参数与扩展与运算符


```js

    //rest 参数  其余存user里面
        function connect({ host, port, ...user }) {
            console.log(host);//127.0.0.1
            console.log(port);//3306
            console.log(user);
        }

        connect({
            host: '127.0.0.1',
            port: 3306,
            username: 'root',
            password: 'root',
            type: 'master'
        });


        //对象合并  解析出来合并
        const skillOne = {
            q: '天音波'
        }

        const skillTwo = {
            w: '金钟罩'
        }

        const skillThree = {
            e: '天雷破'
        }
        const skillFour = {
            r: '猛龙摆尾'
        }

        const mangseng = { ...skillOne, ...skillTwo, ...skillThree, ...skillFour };

        console.log(mangseng)

        // ...skillOne   =>  q: '天音波', w: '金钟罩'
```

## 正则扩展  命名捕获分组

对捕获的结果添加属性  方便提取
```js
        //声明一个字符串
        let str = '<a href="http://www.atguigu.com">车车</a>';

        // //提取 url 与 『标签文本』
        const reg = /<a href="(.*)">(.*)<\/a>/;

        // //执行
        const result = reg.exec(str);

        console.log(result);//<a href="http://www.atguigu.com">车车</a>
        console.log(result[1]);//http://www.atguigu.com
        console.log(result[2]);//车车


        let str = '<a href="http://www.atguigu.com">车车</a>';
        // //分组命名
        const reg = /<a href="(?<url>.*)">(?<text>.*)<\/a>/;

        const result = reg.exec(str);

        console.log(result.groups.url);//http://www.atguigu.com

        console.log(result.groups.text);//车车
```

## 正则扩展 反向断言
判断匹配结果正确与否


```js
        //声明字符串
        let str = 'JS5211314你知道么555啦啦啦';
        //正向断言  数字提取555  根据后面内容判断前面内容是否合法
        // const reg = /\d+(?=啦)/;
        // const result = reg.exec(str);

        //反向断言  根据前面内容 做一个判断
        const reg = /(?<=么)\d+/;
        const result = reg.exec(str);
        console.log(result);
```

## 正则扩展  dotAll模式


```js
        //dot  .  元字符  除换行符以外的任意单个字符
        let str = `
        <ul>
            <li>
                <a>肖生克的救赎</a>
                <p>上映日期: 1994-09-10</p>
            </li>
            <li>
                <a>阿甘正传</a>
                <p>上映日期: 1994-07-06</p>
            </li>
        </ul>`;
        //声明正则  电影名称·和上映时间提取出来
        const reg = /<li>\s+<a>(.*?)<\/a>\s+<p>(.*?)<\/p>/;
        ⭐⭐⭐或
        dotall模式   g全局匹配
        
        const reg = /<li>.*?<a>(.*?)<\/a>.*?<p>(.*?)<\/p>/gs;
        //执行匹配
        // const result = reg.exec(str);
        let result;
        let data = [];
        while (result = reg.exec(str)) {
            data.push({ title: result[1], time: result[2] });
        }
        //输出结果
        console.log(data);//Array(2) 0: { title: '肖生克的救赎', time: '上映日期: 1994-09-10' } 1: { title: '阿甘正传', time: '上映日期: 1994-07-06' }
```

# ES10
##  Object.fromEntries
创建对象 接收二维数组 map


```js
    //二维数组  键 值
        const result = Object.fromEntries([
            ['name', '尚硅谷'],
            ['xueke', 'Java,大数据,前端,云计算']
        ]);
        console.log(result);//Object  name: "尚硅谷"  xueke: "Java,大数据,前端,云计算"


        //Map  // 把二维数组转为对象
        const m = new Map();
        m.set('name', 'ATGUIGU');
        const result = Object.fromEntries(m);
        console.log(result);//Object name: "ATGUIGU"
        //Object.entries ES8  把对象转为二维数组
        const arr = Object.entries({
            name: "尚硅谷"
        })
        console.log(arr); //Array(1)=>0: Array(2) 0: "name" 1: "尚硅谷"
```


## trimStar与trimEnd

```js
        let str = '   iloveyou   ';

        console.log(str);// iloveyou  完整留空白
        console.log(str.trimStart());// iloveyou  清除左
        console.log(str.trimEnd());//    iloveyou  清除右
```

## flat与flatMap


```js
        //flat 平
        //将多维数组转化为低维数组
        const arr = [1, 2, 3, 4, [5, 6]];
        console.log(arr.flat());//[1, 2, 3, 4,5, 6];
        const arr = [1, 2, 3, 4, [5, 6, [7, 8, 9]]];
        //参数为深度 是一个数字 变一维
        console.log(arr.flat(2));//[1, 2, 3, 4, 5, 6,7, 8, 9]

        //flatMap map结果维度降低
        const arr = [1, 2, 3, 4];
        const result = arr.map(item => item * 10);
        console.log(result);//[10,20,30,40]
        
        // 返回是[10] [20] [30] [40]数组  下面
        const result = arr.flatMap(item => [item * 10]);
        console.log(result); //Array(4) 0: 10 1: 20 2: 30 3: 40
```


## Symbol.prototype.description
获取symbol描述字符串

```js
        //创建 Symbol
        let s = Symbol('尚硅谷');

        console.log(s.description);//尚硅谷
```


# ES11

## 私有属性


```js
     class Person {
            //公有属性
            name;
            //私有属性 标志#
            #age;
            #weight;
            //构造方法  初始化
            constructor(name, age, weight) {
                this.name = name;
                this.#age = age;
                this.#weight = weight;
            }

            intro() {
                console.log(this.name);//晓红
                console.log(this.#age);//18
                console.log(this.#weight);//45kg
            }
        }
         girl.intro();  //⭐上面调用打印
        //实例化
        const girl = new Person('晓红', 18, '45kg');

        console.log(girl.name);//晓红
        console.log(girl.#age);//报错  外部私有属性访问不到
        console.log(girl.#weight);//报错  外部私有属性访问不到

       
```



## Promise.allSettled

接收promise数组，返回结果promise对象

每一个异步任务都想得到结果  用Promise.allSettled

要求每一个异步任务成功才能继续执行 用Promise.all
```js
        //声明两个promise对象
        const p1 = new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve('商品数据 - 1');
            }, 1000)
        });

        const p2 = new Promise((resolve, reject) => {
            setTimeout(() => {
                //resolve('商品数据 - 2');
                reject('出错啦!');
            }, 1000)
        });
```

```js
    //调用 allsettled 方法
        const result = Promise.allSettled([p1, p2]);
        console.log(result);
```

![aaaaaaaaa.jpg](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/aeb703b857be4822a6adc0220f508567~tplv-k3u1fbpfcp-watermark.image?)


```js
        const res = Promise.all([p1, p2]);

        console.log(res);
```

![bbbbbbb.jpg](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/39f66b714ca844a3b6678500ccf4ac58~tplv-k3u1fbpfcp-watermark.image?)

### 区别


![ccccccc.jpg](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6ea9fff40c9844bc940b32bdff13ce23~tplv-k3u1fbpfcp-watermark.image?)

## String.prototype.matchAll

字符传扩展方法  用来得到正则批量匹配的结果⭐⭐⭐实用

```js
     //需求 把每一个电影名称和上映时间提取出来
        let str = `<ul>
            <li>
                <a>肖生克的救赎</a>
                <p>上映日期: 1994-09-10</p>
            </li>
            <li>
                <a>阿甘正传</a>
                <p>上映日期: 1994-07-06</p>
            </li>
        </ul>`;

        //声明正则
        const reg = /<li>.*?<a>(.*?)<\/a>.*?<p>(.*?)<\/p>/sg
        //调用方法
        const result = str.matchAll(reg);
        
```


```js
    //  第一种方式
        for (let v of result) {
            console.log(v);
        }
```

![dddddddddd.jpg](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6e85fa90b44a4a36b02c150f0ed8fefc~tplv-k3u1fbpfcp-watermark.image?)


```js
     //第二种方式
        const arr = [...result];

        console.log(arr);
```


![eeeeeee.jpg](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9053b4d6fa9d4994941b9a7b7a63cedb~tplv-k3u1fbpfcp-watermark.image?)



## 可选链操作符

？. 配合使用   

当应对对象类型参数时 对象层级深


```js
        // 传入对象
        function main(config) {
            1.
            const dbHost = config && config.db && config.db.host;
            console.log(dbHost);//⭐192.168.1.100
            
            //两种方式   
            
            2.可选链操作符
            const dbHost = config?.db?.host;

            console.log(dbHost);//⭐192.168.1.100
        }

        main({
            db: {
                host: '192.168.1.100',
                username: 'root'
            },
            cache: {
                host: '192.168.1.200',
                username: 'admin'
            }
        })
```


## 动态import

hello.js

```js
    export function hello(){
    alert('Hello');
}
```
app.js


```js
const btn = document.getElementById('btn');

btn.onclick = function(){
    import('./hello.js').then(module => {
        module.hello();
    });
}
```
html 引入使用


```js
<body>
    <button id="btn">点击</button>
    <script src="./js/app.js" type="module"></script>
</body>
```

## bigint



```js
        //大整形
        let n = 521n;
        console.log(n, typeof (n));//521n 'bigint'

        //函数
        // let n = 123;
        console.log(BigInt(n)); //521n
        console.log(BigInt(1.2));//报错 Uncaught RangeError: The number 1.2 cannot be converted to a BigInt because it is not an integer  浮点型不可以

        //大数值运算
        let max = Number.MAX_SAFE_INTEGER;
        console.log(max);   //9007199254740991
        console.log(max + 1);   //9007199254740992
        console.log(max + 2);   //9007199254740992

        console.log(BigInt(max))    //9007199254740991n
        console.log(BigInt(max) + BigInt(1)) //9007199254740992n
        console.log(BigInt(max) + BigInt(2))  //9007199254740993n
```


## globalThis  对全局对象做操作 忽略操作环境
全局this

无论执行环境是什么，始终指向全局对象

html
```js
    <body>
    <script>
        console.log(globalThis);  //指向window对象
    </script>
</body>
```

js  run code 运行该js文件


```js
console.log(globalThis); //指向global
```

![ffffffffff.jpg](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/15770a9aa97d4b0ea2926b9b42901646~tplv-k3u1fbpfcp-watermark.image?)
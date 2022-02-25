@[TOC](express)
注：用于工作中接口需求并不是要求访问很大的开发
### 基本结构
该段体现中间件路由保护作用
```javascript
// 引入 express 框架
const express = require('express')

// 创建网站服务器
const app = express();

app.use('/admin', (req, res, next) => {
    // 用户没有登录
    let isLogin = true;
    // 如果用户登录
    if (isLogin) {
        // 让请求继续向下执行
        next();
    } else {
        // 如果用户没有登录，直接对客户端作出响应
        res.send('您还没有登录，无法访问当前页面');
    }
})


app.get('/admin', (req, res) => {
    res.send('您已登录 可以访问当前页面')
})


app.use((req, res, next) => {
    // 为客户端响应404状态码以及提示信息
    res.status(404).send('当前访问的页面是不存在的');
})
// 监听端口
app.listen(3000);
console.log('网站服务器启动成功');

```
next（）主要用于中间件走流程


## express每次修改需要重启，安排热启动
### 1
 1. npm install node-dev -D
 2. // package.json 里的script中，配置
 3. "dev": "node-dev ./bin/www"
 4. // 启动项目
 5. npm run dev
### 2

```javascript
npm install nodemon -g
```
启动

```javascript
nodemon app.js
```

## 读取文件，不存在返回错误信息

```javascript
// 引入 express 框架
const express = require('express')

// 引入文件模块
const fs = require('fs');

// 创建网站服务器
const app = express();

app.get('/index', (req, res, next) => {
    // 创建一个错误实例并抛出
    // throw new Error('程序发生了未知错误');
    fs.readFile('./demo.txt', 'utf8', (err, result) => {
        if (err != null) {
            // 文件读取失败 向下传递错误对象
            next(err);
        } else {
            // 文件读取成功
            res.send(result);
        }
    })
    // res.send('程序正常')
})

// 错误处理中间件
app.use((err, req, res, next) => {
    res.status(500).send(err.message);
})

// 监听端口
app.listen(3000);
console.log('网站服务器启动成功');


```
## 构建模块化路由

 1. 在 route 文件夹中构建不同的路由模块，放在不同的文件中
 2. 通过module.exports 将不同路由模块的路由对象导出
 3. 在 app.js 文件中通过 require 将不同路由模块的路由对象导入，同时对导入的路由进行路由匹配
界面一

```javascript
const express = require('express');

const admin = express.Router();

admin.get('/index', (req, res) => {
    res.send('欢迎来到博客管理页面');
});

// 导出 admin 这个路由对象
module.exports = admin;

```
界面二

```javascript
const express = require('express');

const home = express.Router();

home.get('/index', (req, res) => {
    res.send('欢迎来到博客首页页面');
});

// 导出 home 这个路由对象
module.exports = home;

```
app.js

```javascript
// 引入 express 框架
const express = require('express');

// 创建网站服务器
const app = express();

const home = require('./route/home');
const admin = require('./route/admin');

app.use('/home', home);
app.use('/admin', admin);

// 监听端口
app.listen(3000);
console.log('服务器开启成功');

```
## get 参数获取

```javascript
// 引入 express 框架
const express = require('express');
// 创建网站服务器
const app = express();

app.get('/index', (req, res) => {
    // req.query 获取请求参数
    res.send(req.query)
})

// 监听端口
app.listen(3000);
console.log('服务器开启成功');

```
进入时浏览器地址栏

```javascript
 http://localhost:3000/index

```
页面显示
{}
在浏览器栏输入

```javascript
 http://localhost:3000/index?name=zhangbing&age=20&gender=男

```
页面显示
{'name':'zhangbing','age':'20','gender':'男'}


## post参数请求
express接收post请求参数需要借助第三方包 **body-parser**
app.js

```javascript

// 引入 express 框架
const express = require('express');
const bodyParser = require('body-parser');
// 创建网站服务器
const app = express();

app.use(fn ({a: 1}));

function fn (obj) {
    return function (req, res, next) {
    //通过判断来决定服务器输出台打印什么
        if (obj.a == 1) {
            console.log(req.url);
        } else {
            console.log(req.method);
        }
        next();
    }
}

app.get('/', (req, res) => {
    // 接收 post 请求参数
    res.send('ok');
})

app.post('/add', (req, res) => {
    res.send(req.body);
})
// 监听端口
app.listen(3000);
console.log('服务器开启成功');
```
post.html表单数据通过post方法提交

```html
<html lang="en">
<body>
    <form action="http://localhost:3000/add" method="post">
        <input type="text" name="username">
        <input type="password" name="password">
        <input type="submit">
    </form>
</body>
</html>

```
## 模板ejs
相比于jade模板引擎，[ejs](https://ejs.bootcss.com/)对原HTML语言就未作出结构上的改变，只不过在其交互数据方面做出了些许修改

### 二、ejs基本使用

使用如下配置文件：

可以通过下面的方式实现基本的ejs操作：
app.js文件：

```javascript
const express=require("express");
const ejs=require("ejs");
const fs=require("fs");

var app=express();

//引用ejs
app.set('views',"public");	//设置视图的对应目录
app.set("view engine","ejs");		//设置默认的模板引擎
app.engine('ejs', ejs.__express);		//定义模板引擎

app.get("/",function(req,res){
	res.render("index.ejs",{title: "<h4>express</h4>"});
});

app.listen(8080);
```


ejs文件：

```HTML
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title></title>
	</head>
	<body>
		<% for(var i=0;i<10;i++){ %>
			<%= i %>
		<% } %>
		<!-- 获取变量 -->
		<div class="datas">
			<p>获取变量：</p>
			<%- title %>
			<%= title %>
		</div>
	</body>
</html>
```

这时我们会得到如下图的结果：

由此可以知道：

```
<% xxx %>：里面写入的是js语法，
<%= xxx %>：里面是服务端发送给ejs模板转义后的变量，输出为原html
<%- xxx %>：里面也是服务端发送给ejs模板后的变量，不过他会把html输出来
<%# 注释标签，不执行、不输出内容
```

同理res.render()函数也是支持回调的：

```
res.render('user', { name: 'Tobi' }, function(err, html) {
  console.log(html);
});
```


这样我们即可将看到heml的内容。另外值得说明的是ejs模块也有ejs.render()和ejs.renderFile()方法，他在这里与res.render()作用类似，如下：

```
ejs.render(str, data, options);

ejs.renderFile(filename, data, options, function(err, str){
    // str => 输出绘制后的 HTML
});
```

### 三、ejs标签各种含义

```
<% '脚本' 标签，用于流程控制，无输出。
<%_ 删除其前面的空格符
<%= 输出数据到模板（输出是转义 HTML 标签）
<%- 输出非转义的数据到模板
<%# 注释标签，不执行、不输出内容
<%% 输出字符串 '<%'
%> 一般结束标签
-%> 删除紧随其后的换行符
_%> 将结束标签后面的空格符删除
```


以上就为ejs基本用法，往后对数据库操作就直接把json数据从服务器返送给模板引擎就行；


## 中间件

```bash
1.浏览器发送请求
2.express接受请求
中间处理的过程
3.路由函数处理渲染（req,res）
4.res.render渲染
```
中间件函数可以执行以下任务：

 1. 执行任何代码。 
 2. 对请求和响应对象进行更改。 
 3. 结束请求/响应循环。 
 4. 调用堆栈中的下一个中间件函数。
#### 中间件有几类
#### 应用层中间件
next() 在进行路由匹配之前或又要继续执行下一步操作
```bash
const express=require("express");
​
var app=express();
​
//匹配路由之前的操作
app.use(function(req,res,next){
    console.log("访问之前");
    next();
});
app.get("/",function(req,res){
    res.send("主页");
});
app.listen(8080);
```
#### 路由中间件
在匹配路由时，我们使用 router.use() 或 router.VERB() ,路由中间件结合多次callback可用于用户登录及用户状态检测。

```bash
const express = require("express");
var app = express();
var router=express.Router();
​
router.use("/",function(req,res,next){
    console.log("匹配前");
    next();
});
​
router.use("/user",function(req,res,next){
    console.log("匹配地址：",req.originalUrl);
    next();
},function(req,res){
    res.send("用户登录");
});
​
app.use("/",router);
​
app.listen(8080);
```
#### 错误处理中间件
匹配到未有路由即跳转错误页面
```bash
const express = require("express");

var app = express();

app.get("/", function (req, res, next) {
  const err = new Error('Not Found');
  res.send("主页");
  next(err);
});
app.use("/user", function (err, req, res, next) {
  console.log("用户登录");
  next(err);
}, function (req, res, next) {
  res.send("用户登录");
  next();
});
app.use(function (req, res) {
  res.status(404).send("未找到指定页面");
});
app.listen(8080);
```
#### 内置中间件
通过express.static可以指定要加载的静态资源
```bash
express.static(root, [options]);
```
#### 利用express托管静态文件/查看

```bash
app.use(express.static('public'))
```
#### 第三方中间件
形如body—parser,采用引入外部模块方式获得更多应用操作。如后期cookie和session。

```bash
var express = require('express');
var app = express();
var cookieParser = require('cookie-parser');
```
#### 使用cookie
**Cookie的特点**

 1. cookie保存在浏览器本地，只要不过期关闭浏览器也会存在。 
 2. 正常情况下cookie不加密，用户可轻松看到
 3. 用户可以删除或者禁用cookie 
 4. cookie可以被篡改 
 5. cookie可用于攻击 
 6. cookie存储量很小，大小一般是4k
 7. 发送请求自动带上登录信息


 ##### 安装使用
 
1、安装
```bash
cnpm install cookie-parser --save
```
2、引用
```bash
const cookieParser=require("cookie-parser");
```

 3、设置中间件
 

```bash
app.use(cookieParser());
```
4、设置cookie

```bash
res.cookie("name",'zhangsan',{maxAge: 900000, httpOnly: true});
//res.cookie(名称,值,{配置信息})
```
关于设置cookie的参数说明：

 1. domain: 域名
 2. name=value：键值对，可以设置要保存的 Key/Value，注意这里的 name 不能和其他属性项的名字一样
 3. Expires： 过期时间（秒），在设置的某个时间点后该 Cookie 就会失效，如 expires=Wednesday,09-Nov-99 23:12:40 GMT。
 4. maxAge： 最大失效时间（毫秒），设置在多少后失效。
 5. secure： 当 secure 值为 true 时，cookie 在 HTTP 中是无效，在 HTTPS 中才有效 。
 6. Path： 表示 在那个路由下可以访问到cookie。
 7. httpOnly：是微软对 COOKIE 做的扩展。如果在 COOKIE 中设置了“httpOnly”属性，则通过程序（JS
    脚本applet 等）将无法读取到COOKIE 信息，防止 XSS 攻击的产生 。
 8. singed：表示是否签名cookie, 设为true 会对这个 cookie 签名，这样就需要用 res.signedCookies
    而不是res.cookies 访问它。被篡改的签名 cookie 会被服务器拒绝，并且 cookie 值会重置为它的原始值。
5、获取cookie

```bash
req.cookies.name;
```
基础实例

```bash
const express=require("express");
const cookieParser=require("cookie-parser");
​
var app=express();
​
//设置中间件
app.use(cookieParser());
​
app.get("/",function(req,res){
    res.send("首页");
});
​
//设置cookie
app.get("/set",function(req,res){
    res.cookie("userName",'张三',{maxAge: 20000, httpOnly: true});
    //设置res.cookie中option对象的值，即可实现对相应路由下多个二级路由的cookie进行共享。满足条件zz.com顶级域名
    //res.cookie("userName",'张三',{maxAge: 20000, httpOnly: true,domain:"zz.com"});
    res.send("设置cookie成功");
});
​
//获取cookie
app.get("/get",function(req,res){
    console.log(req.cookies.userName);
    res.send("获取cookie成功，cookie为："+ req.cookies.userName);
});
​
app.listen(8080);
```
当访问set路由后会设置cookie，当访问get路由后会获取到设置的cookie值。当然你也可以在其他页面继续获取当前cookie，以实现cookie共享。
##### 加密
cookie加密是让客户端用户无法的获取cookie明文信息，是数据安全的重要部分；一般的我们可以在保存cookie时对cookie信息进行加密，或者在res.cookie中对option对象的signed属性设置设置成true即可。

```bash
//获取cookie
app.use(function(req,res,next){
    console.log(req.signedCookies.name);
    next();
});
//设置cookie
app.use(function(req,res,next){
    console.log(res.cookie("name","zhangsan",{httpOnly: true,maxAge: 200000,signed: true}));
    res.end("cookie为："+req.signedCookies.name);
});
```
**签名原理**
Express用于对cookie签名，而cookie-parser则是实现对签名的解析。实质是把cookie设置的值和cookieParser(‘secret’);中的secret进hmac加密，之后和cookie值加“.”的方式拼接起来。
当option中signed设置为true后，底层会将cookie的值与“secret”进行hmac加密；

**如何解析**
cookie-parser中间件在解析签名cookie时做了两件事：

 1. 将签名cookie对应的原始值提取出来
 2. 验证签名cookie是否合法
#### 直接加密 封装模块
node为我们提供了一个核心安全模块“crypto”，它提供了很多安全相关的功能，如摘要运算、加密、电子签名等。

```bash
const crypto=require('crypto');
​
module.exports={
    //MD5封装
    MD5_SUFFIX:'s5w84&&d4d473885s2025s5*4s2',
    md5:function(str){
        var obj=crypto.createHash('md5');
        obj.update(str);        
        return obj.digest('hex');
    }
}
```
进行相应导入

```bash
const common=require('./MD5');
​
var str='123456';
var str=common.md5(str+'s5w84&&d4d473885s2025s5*4s2');
console.log(str);
```
设置cookie代码如下

```bash
const express=require("express");
const cookieParser=require("cookie-parser");
var cry = require('./md5');
​
var app=express();
​
var str='hello-123';
var str=cry.md5(str+'s5w84&&d4d473885s2025s5*4s2');
​
//设置中间件
app.use(cookieParser());
​
//获取加密cookie
app.use(function(req,res,next){
    console.log(req.cookies.userName);
    next();
});
​
//设置并加密cookie
app.use(function(req,res,next){
    res.cookie("userName", str, {maxAge: 5*60*1000, httpOnly: true});
    res.end("set ok");
});
​
app.listen(8080);
```
如果是在判断登录时，只需将用户输入的账号进行同样加密操作在进行比较即可知道账户是否正确。
crypto所涉及的加密方式有很多，推荐大家都写模块引用，这样更方便后期的维护。




# 项目搞起
## 环境搭建
### 1
基本命令搭建完毕，修改文件，使入口变成app.js
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210707183758969.jpg#pic_center)
把上图代码复制到app,js中，并设置app.js监听3000
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210707183914940.jpg#pic_center)
此时，bin目录可删可不删不受影响
### 2数据库创建

```javascript
npm install mysql --save
```
**本地创建表，之后创建连接**
根目录创建util文件夹，创建名为 dbconfig.js文件。

```javascript
const mysql = require('mysql')
// 暴漏出去
module.exports = {
    // 数据库库配置
    config: {
        host: "localhost",
        port: "3306",
        user: 'root',
        password: "Hqtcsz888.com",
        database: "hqtc_crm",
    },
    // 连接数据库，使用连接池方式
    // 连接池对象
    sqlConnect:function(sql,sqlArr,callBack){
        var pool = mysql.createPool(this.config)
        pool.getConnection((err,conn)=>{
            console.log('1245466');
            if(err){
                console.log('连接失败');
                return;
            }
            // 事件驱动回调
            conn.query(sql,sqlArr,callBack);
            // 释放链接
            conn.release();
        })
    }
}
```
在routes里index.js尝试数据链接

```javascript
var express = require('express');
var router = express.Router();
//u引入数据库
var dbConfig = require("../util/dbconfig")
/* GET home page. */
router.get('/', function(req, res, next) {
//查询表名cate数据
  var sql ="select * from cate";
  var sqlArr = [];
  var callBack =(err,data)=>{
    if(err){
      console.log('链接失败'); 
    }else{
      // 返回接口数据
      res.send({
        'list':data
      })
    }
  }
  // res.render('index', { title: 'Express' });
  dbConfig.sqlConnect(sql,sqlArr,callBack)
});

module.exports = router;

```
此时开启，可以观察到数据
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210707203535816.jpg#pic_center)
### 3请求方法封装
根目录下创建controllers文件夹，创建名为cateController.js
把route.js中负责请求数据部分搬运到新建js文件中，命名函数并导出。cateController.js引进来连接数据库文件，路由route不需要引入该文件。router.js引入方法文件cateController.js 使用其暴漏出去的接口
```javascript
// 请求方法封装
var dbConfig = require("../util/dbconfig")
// 获取分类
getCate=(req,res)=>{
    var sql ="select * from cate";
  var sqlArr = [];
  var callBack =(err,data)=>{
    if(err){
      console.log('链接失败'); 
    }else{
      // 返回接口数据
      res.send({
        'list':data
      })
    }
  }
  // res.render('index', { title: 'Express' });
  dbConfig.sqlConnect(sql,sqlArr,callBack)
}
// 暴漏出去
module.exports={
    getCate
}
```
cateController.js修改内容如下

```javascript
var express = require('express');
var router = express.Router();
// 引入封装方法
var cate =require('../controllers/cateController')
/* GET home page. */
router.get('/',cate.getCate );

module.exports = router;

```
可以达到上步同样效果。
### 查询带有参数列表
创建新的数据表  文章类型表可以查询的
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210707212343465.jpg#pic_center)
根目录下controllers文件夹，cateController.js处理逻辑

```javascript
// 获取指定分类文章列表
getPostCate = (req, res) => {
    let { id } = req.query;
    //⭐⭐⭐
    var sql = 'select * from post where cate_id=?';
    var sqlArr = [id];
    // 回调一样
    var callBack = (err, data) => {
        if (err) {
            console.log('链接失败');
        } else {
            // 返回接口数据
            res.send({
                'list': data
            })
        }
    }
    dbConfig.sqlConnect(sql, sqlArr, callBack)
}
```
别忘了最下面把接口暴漏出去。
路由router文件下，使用路由调用方法

```javascript
var express = require('express');
var router = express.Router();
// 引入封装方法
var cate =require('../controllers/cateController')

router.get('/getPostCate', cate.getPostCate )
module.exports = router;
```
#### 使用postman测试接口
![在这里插入图片描述](https://img-blog.csdnimg.cn/2021070722074276.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NTg5NjEyNg==,size_16,color_FFFFFF,t_70#pic_center)

### 整理app.js不需要的代码（视情况而定，已经标明各部分作用）

```javascript
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
// 路由引进
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();
// 改写
var http = require('http');
var server = http.createServer(app);
// view engine setup有关模板
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

// 日志
// app.use(logger('dev'));
// app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// 路由使用
app.use('/', indexRouter);
app.use('/users', usersRouter);
// 错误警告
// catch 404 and forward to error handler
// app.use(function(req, res, next) {
  // next(createError(404));
// });

// error handler判断环境应该
// app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  // res.locals.message = err.message;
  // res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

server.listen('3000');
```
# 案例抖yin api接口
用户模块接口·
用户表 id username userpic password phone email status create_time
验证码登录=》发送验证码=》阿里大鱼
手机号或者邮箱登录
第三方登录
## 数据表设计
![在这里插入图片描述](https://img-blog.csdnimg.cn/2021070816004651.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NTg5NjEyNg==,size_16,color_FFFFFF,t_70#pic_center)
## 代码逻辑
在controllers文件夹下创建登录模块  注：此时数据库不引入也没关系
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210708161432803.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NTg5NjEyNg==,size_16,color_FFFFFF,t_70#pic_center)
在routers注册

```javascript
var express = require('express');
var router = express.Router();
//引入模块
var User =require('../controllers/Usercontroller')
/* GET users listing. */
router.post('/sendCode',User.sendCode);

module.exports = router;

```
注意查看入口app.js路径⭐⭐⭐
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210708162233681.jpg#pic_center)
此时，用postman测试
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210708162755604.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NTg5NjEyNg==,size_16,color_FFFFFF,t_70#pic_center)
# 验证码登录接口
因为post请求，所以需要安装插件⭐⭐⭐

```javascript
npm install body-parser --save
```
其次，在**app.js**引入这款插件

```javascript
const bodyParser = require('body-parser')
```
其次，在**app.js**注册插件 并设置允许post请求

```javascript
// 注册post请求插件 设置允许请求
app.use(bodyParser.urlencoded({extended:true}))
```

```javascript
// var dbConfig = require("../util/dbconfig")
function rand(min, max) {
    // 随机生成4位数验证码
    return Math.floor(Math.random() * (max - min)) + min
}
ValidatePhoneCode = [];
// 检测该号码是否发送过验证码
let sendCodeP = (phone) => {
    for (var item of ValidatePhoneCode) {
        if (phone == item.phone) {
            return true
        }
    }
    return false;
}
let findCodeAndPhone = (phone, code) => {
    //验证码和手机号是否匹配
    for (var item of ValidatePhoneCode) {
        if (phone == item.phone && code == item.code) {
            return 'login'
        }
    }
    return 'error'
}
// 模拟验证码发送接口
sendCode = (req, res) => {
    // let phone = req.body.user_phone;
    let phone = req.query.phone;
    if (sendCodeP(phone)) {
        res.send({
            'code': 400,
            'msg': '已经发送验证码，稍后再发'
        })
    }
    let code = rand(1000, 9999);
    ValidatePhoneCode.push({
        'phone': phone,
        'code': code
    })
    console.log(ValidatePhoneCode);
    res.send({
        'code': 200,
        'msg': "发送成功"
    })
    console.log(code);
}
// 验证码登录接口
codePhoneLogin = (req, res) => {
    let { phone,code } = req.query;
    // 验证号是否发送过验证码
    if (sendCodeP(phone)) {
        //验证码和手机号是否匹配
        let status = findCodeAndPhone(phone, code);
        if (status == 'login') {
            // 登陆成功
            // 成功之后操作
            res.send({
                'code': 200,
                'msg': '登录成功'
            })
        } else if (status == 'error') {
            res.send({
                'code': 200,
                'msg': '登录失败'
            })
        }
    } else {
        res.send({
            'code': 400,
            'msg': '未发送验证码'
        })
    }
}
module.exports = {
//暴漏出去
    sendCode,
    codePhoneLogin
}
```
user.js注册

```javascript
router.post('/sendCode',User.sendCode);
router.post('/codePhoneLogin',User.codePhoneLogin)
```
通过postman测试，先使用sendCode方法传入手机号生成验证码，在使用codePhoneLogin验证手机号和验证码
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210708174243515.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NTg5NjEyNg==,size_16,color_FFFFFF,t_70#pic_center)
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210708174535674.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NTg5NjEyNg==,size_16,color_FFFFFF,t_70#pic_center)
使用短信服务，阿里云大鱼可以使用
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210708175738842.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NTg5NjEyNg==,size_16,color_FFFFFF,t_70#pic_center)

```javascript
nom install @alicloud/pop-core --save
```
目前accesskey接口  LTAI5tSSLHRZkPmbkrEyLPHj
在util文件夹创建阿里云配置文件  配置文件配置好就能走通，不然就报错
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210708192717211.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NTg5NjEyNg==,size_16,color_FFFFFF,t_70#pic_center)

```javascript
//调用阿里插件
const Core = require('@alicloud/pop-core');
// 引入配置文件
const config = require('../util/aliconfig')
// 配置
let client = new Core(config.alicloud)
// 提交方式
let requestOption = {
    method: 'POST'
};

function rand(min, max) {
    // 随机生成4位数验证码
    return Math.floor(Math.random() * (max - min)) + min
}
ValidatePhoneCode = [];
// 检测该号码是否发送过验证码
let sendCodeP = (phone) => {
    for (var item of ValidatePhoneCode) {
        if (phone == item.phone) {
            return true
        }
    }
    return false;
}
let findCodeAndPhone = (phone, code) => {
    //验证码和手机号是否匹配
    for (var item of ValidatePhoneCode) {
        if (phone == item.phone && code == item.code) {
            return 'login'
        }
    }
    return 'error'
}
sendCoreCode = (req, res) => {
    let phone = req.query.phone;
    let code = rand(1000, 9999);
    var params = {
        "PhoneNumbers": phone,
        "TemplateParam": JSON.stringify({ "code": code })
    };
    //   返回调用实例
    client.request('SendSms', params, requestOption).then((result) => {
        console.log(result);
        if (result.code == 'ok') {
            res.send({
                'code': 200,
                "msg": '发送成功'
            });
            ValidatePhoneCode.push({
                'phone': phone,
                'code': code
            });
            console.log(code);
        } else {
            res.send({
                'code': 400,
                "msg": '发送失败'
            })
        }
    })

}
```
## 多文件上传
创建数据表
id url user_id  create_time
需要安装插件 multer
```javascript
uploadMoreImg = (req, res) => {
    let files = req.file;
    if (req.files.length === 0) {//判断文件是否存在，也可以在前端代码中进行判断
        res.render('error', { message: "上传文件不能为空" });
        return
    } else {
        for (var i in files) {
            // 设置响应编码类型以及编码
            res.set({
                'content-type': 'application/json; charset=utf-8'
            })
            let file = files[i];
            false.renameSync('./public/uploads' + file.filename, './public/uploads' + file.originalname);//这里修改文件名字随意
            let { user_id } = req.query;
            let url = "http://localhost:3000/uploads/" + file.originalname;
            let sql = 'insert into image(url,create_time,user_id) values(?,?,?)';
            let sqlArr = [url, (new DataCue()).valueof(), user_id];
            // 循环插入数据库
            dbconfig.sqlConnect(sql, sqlArr, (err, data) => {
                if (err) {
                    console.log(err);
                } else {
                    if (data.affectedRows == 1) {
                        res.send({
                            'code': 200,
                            'msg': "上传成功",
                            'url': imgUrl
                        })
                    } else {
                        res.send({
                            'code': 400,
                            'msg': "上传失败",
                        })
                    }
                }
            })
        }
    }



```


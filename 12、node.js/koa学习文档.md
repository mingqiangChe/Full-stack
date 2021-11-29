# koa学习文档
## 安装
nosejs版本>7.6

```javascript
npm init --yes //强制生成
npm install --save koa
```
## helloword 世界你好

```javascript
var koa = require('koa');

var app = new koa();
// 配置路由
app.use(async(ctx)=>{
    ctx.body='helloword'
})
app.listen(3000);
```
## koa路由
由一个URL和一个特定http方法组成
即路由就是根据不同URL地址，加载不同的页面实现不同的功能。

koa需要安装对应koa-router路由模块实现

```javascript
npm install --save koa-router
```

```javascript
// 引入koa模块
var Koa = require('koa');
var Router = require('koa-router');

// 实例化
var app = new Koa();
var router = new Router();

// 配置路由
// ctx 上下文 context，包含了request和responese等信息
router.get('/',async (ctx,next)=>{
    ctx.body='首页' //返回数据 类似res.send
}).get('/news',async(ctx)=>{
    ctx.body='新闻页面'
})

app
    .use(router.routes())  //启动路由
    .use(router.allowedMethods());  //设置对应响应头可选

app.listen(3000);
```

### 路由传值
#### get传值
koa中get传值通过request接收，两种：query和querystring
query：返回是格式化好的参数对象
querystring：返回的是请求字符传

```javascript
    // 从ctx中读取get传值
    console.log(ctx.query);//⭐⭐⭐[Object: null prototype] { aid: '123', name: 'lisi' }
    console.log(ctx.querystring);//aid=123&name=lisi

    // ctx里面的request里面获取get传值
    console.log(ctx.request);
    //{
    //    method: 'GET',
	//         url: '/news?aid=123&name=lisi',
	//         header: {
	//           host: 'localhost:3000',
	//           connection: 'keep-alive',
	//           'cache-control': 'max-age=0',
	//           'sec-ch-ua': '" Not;A Brand";v="99", "Google Chrome";v="91", "Chromium";v="91"',
	//           'sec-ch-ua-mobile': '?0',
	//           'upgrade-insecure-requests': '1',
	//           'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) 		Chrome/91.0.4472.164 Safari/537.36',
	//           accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-			exchange;v=b3;q=0.9',
	//           'sec-fetch-site': 'none',
	//           'sec-fetch-mode': 'navigate',
	//           'sec-fetch-user': '?1',
//           'sec-fetch-dest': 'document',
//           'accept-encoding': 'gzip, deflate, br',
//           'accept-language': 'zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7,ko;q=0.6,ja;q=0.5',
//           cookie: 'authorization=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im5haW5haSIsImlhdCI6MTYyNzAzMzI4MSwiZXhwIjoxNjI3MTE5NjgxfQ.GASP8JvQNlKa1VC07an1mDIlhs7eoLn4lV16-ZfW-aE; sidebarStatus=0'
//         }
//       }
console.log(ctx.request.query);//[Object: null prototype] { aid: '123', name: 'lisi' }
console.log(ctx.request.querystring);//aid=123&name=lisi

```
#### 动态路由

```javascript
router.get('/news/:aid',async(ctx)=>{
    // 获取动态路由传值
    // http://localhost:3000/news/ww
    console.log(ctx.params);//{ aid: 'ww' }
    ctx.body='新闻页面'
})
```
后台控制路由跳转
![在这里插入图片描述](https://img-blog.csdnimg.cn/114327e86c444b89a3aeda85d70ae45b.jpg#pic_center)
跳转到views下index.ejs页面
## koa中间件
匹配路由之前或者匹配路由完成做的一系列的操作
和express中间件相似，是一个函数，可以访问请求对象，响应对象，和web应用中处理请求-响应循环流程中的中间件，一般被命名为next的变量。
功能包括：

 - 执行任何代码
 - 修改请求和响应对象
 - 终结请求-响应循环
 - 调用堆栈中的下一个中间件
get和post回调函数中，没有next参数，那么匹配上第一个路由，就不会往下匹配。如果往下匹配，需要写next（）
### koa可使用几种中间件
执行顺序如洋葱
koa2中间件是基于async/await实现的，其执行过程是通过next来驱动的
![在这里插入图片描述](https://img-blog.csdnimg.cn/01f1fb6d72c64a2290e9bddfb0f6f316.webp?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NTg5NjEyNg==,size_16,color_FFFFFF,t_70#pic_center)

```javascript
const Koa = require('koa');
const app = new Koa();

// logger
app.use(async (ctx, next) => {
  console.log('第一层洋葱 - 开始')
  await next();
  const rt = ctx.response.get('X-Response-Time');
  console.log(`${ctx.method} ${ctx.url} - ${rt}`);
  console.log('第一层洋葱 - 结束')
});

// x-response-time
app.use(async (ctx, next) => {
  console.log('第二层洋葱 - 开始')
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.set('X-Response-Time', `${ms}ms`);
  console.log('第二层洋葱 - 结束')
});

// response
app.use(async ctx => {
  console.log('第三层洋葱 - 开始')
  ctx.body = 'Hello World';
  console.log('第三层洋葱 - 结束')
});

app.listen(8000);
```
打印结果

```bash
第一层洋葱 - 开始
第二层洋葱 - 开始
第三层洋葱 - 开始
第三层洋葱 - 结束
第二层洋葱 - 结束
第一层洋葱 - 结束
```




#### 应用级中间件
```javascript
// 匹配任何路由处理
app.use(async (ctx)=>{
    ctx.body='中间件'
})
```

```javascript
app.use(async (ctx,next)=>{
    console.log(new Date());
    await next();//当前路由匹配完成以后继续向下匹配，如果没有next就不会向下继续路由匹配
})
```
#### 路由级中间件

```javascript
router.get('/news',async(ctx,next)=>{
    console.log('XINEWEW');//中间件做处理 之后执行页面
    await next();
})
router.get('/news',async(ctx)=>{
    ctx.body='新闻'
})
```

#### 错误处理中间件

```javascript
app.use(async (ctx,next)=>{
    console.log('这是中间件');
    next();
    // 如果路径跳转错误 走404，不然按路由匹配执行跳转
    if(ctx.status==404){
        ctx.status= 404;
        ctx.body='这是一个404页面'
    }
})
```

#### 第三方中间件
##### post提交数据 koa-bodyparser第三方中间件使用
[参考网址](https://www.jianshu.com/p/93032efe97d0)

1.安装

```javascript
npm install --save koa-bodyparser
```

2.引入配置中间件

引入

```bash
// 引入koa模块
var Koa = require('koa');
var Router = require('koa-router');
var bodyParser= require('koa-bodyparser');
// 实例化
var app = new Koa();
var router = new Router();


```

配置中间件

```bash
app.use(async ctx=>{
    ctx.body=ctx.request.body;
})
```

读取post数据 对象格式

```bash
ctx.request.body
```

```bash
router.post('/doAdd',async (ctx) =>{
    //获取表单数据
   // let data = await  common.getPostData(ctx)
    // console.log(data)
    console.log(ctx.request.body)

})
```
##### koa-static 静态资源中间件
静态资源使用路径访问不到
![在这里插入图片描述](https://img-blog.csdnimg.cn/9bbad0b0eed8404ea5048350ceee3db1.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NTg5NjEyNg==,size_16,color_FFFFFF,t_70#pic_center)
静态资源使用
![在这里插入图片描述](https://img-blog.csdnimg.cn/75129375e31a4f95babc073f3540cda9.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NTg5NjEyNg==,size_16,color_FFFFFF,t_70#pic_center)
##### art-template模板引擎
[官网](http://aui.github.io/art-template/zh-cn/docs/)
[借鉴](https://blog.csdn.net/muzidigbig/article/details/88096064)
1.安装

```bash
npm install art-template --save

npm install koa-art-template --save
```
2.引入

```bash
const render = require('koa-art-template');
```
3.配置

```bash
// 配置koa-art-template模板引擎

render(app,{
      root:path.join(__dirname,'views'), //视图位置

      extname:'.html',//后缀名（.ejs）

      debug:process.env.NODE_ENV !== 'production' //是否开启调试模式

})
```
4.渲染

```bash
await ctx.render(模板名,{参数})
```
案例：
目录结构
![在这里插入图片描述](https://img-blog.csdnimg.cn/bc473d42023d40a88ed1aee545bcdfe7.png#pic_center)
app_art.js

```javascript
let Koa = require('koa');
let Router = require('koa-router');
let app = new Koa();
let router = new Router();
let path = require('path');
 
// 引入koa-art-template模板
const render = require('koa-art-template');
// 配置koa-art-template模板引擎
render(app,{
    root:path.join(__dirname,'views'), //视图位置
    extname:'.html',//后缀名
    debug:process.env.NODE_ENV !== 'production' //是否开启调试模式
})
 
router.get('/',async (ctx,next) => {
    let obj = {
        name:'muzidigbig',
        sex:'<h2>男</h2>',
        list:[1,2,3,4,5],
        flg:true
    }
    await ctx.render('art',{
        obj
    })
})
 
app.use(router.routes());//启动路由
app.use(router.allowedMethods());
app.listen(3005);
```
模板views/art.html

```javascript
<!DOCTYPE html>
<body>
    <h2>这是一个art-template模板引擎</h2>
    {{obj.name}}
    {{@ obj.sex}}
    {{if obj.flg}}true{{/if}}
    {{each obj.list}}
    <li>{{$index}}---{{$value}}</li>
    {{/each}}
    <hr>
    <!-- 引入子模版 -->
    {{include './public/footer.html'}}
 
</body>
</html>
```
子模版footer.html

```javascript
<h1>这是一个底部</h1>
```




## ejs模板引擎（目前没什么地方使用，了解）

```bash
安装koa-views ejs
npm i koa-views -S , npm i ejs -S
```
引入koa-views配置中间件

```javascript
const views =require('koa-views')
//配置模板引擎 views是文件地址，意思就是把views下面的文件编译成html文件
app.use(views('views',{
  extension:'ejs'
})) 

```
文件名就应该是以ejs结尾在views下面
![在这里插入图片描述](https://img-blog.csdnimg.cn/33e18e12f5fb498084f3efa6066ad9da.png#pic_center)
另外的一种配置方式但是注意文件名
```bash
const views =require('koa-views')
app.use(views('views',{
	map:{html:'ejs'}}
))

```
这里的文件名是以html结尾的
![在这里插入图片描述](https://img-blog.csdnimg.cn/a812949b08c140c19849a0597a485aef.png#pic_center)
接下来就是渲染

```javascript
// 配置中间件
router.get('/', async (ctx, next) => {
  let title ='你好ejs'  //这是js里面的数据
  await ctx.render('index',  //渲染用ctx.render,index是页面
  {dataTitle:title}	 //将定义的数据title传给dataTitle
  )
})

//另一种使用方法
router.get('/news', async (ctx, next) => {
  let arr=['111','2222','333'];
  await ctx.render('index',  //渲染用ctx.render,index是页面
  {list:arr}
  )
})

```
另一种用法页面使用
![在这里插入图片描述](https://img-blog.csdnimg.cn/46b4101b6a51487caad012a0e4edd25b.jpg#pic_center)

```bash
一些简单的ejs语法

<%=dataTitle%> 获取数据 可以在里面使用js语法
使用js语法作为参照 换行就需要就
<%=%> 绑定数据不解析标签
<%- %> 绑定数据解析HTML标签
<%for(var i=0;i<arr.length;i++){%> <li> <%=arr[i]%> </li> <%}%>
<%- include(‘public/healder’) -%> 引入内部文件活或者模块
```
ejs中的公共数据 ，写在中间件的地方那么在任意路由下面都可以使用

```javascript
app.use(async (ctx, next) => {
  ctx.state.name='张三'   //ctx.state存放公共数据的地方
  await next()  //当前路由匹配完成继续向下匹配
})
//接收数据在任何路由下面直接引入就行<%=name%>

```
子模版footer.html

```javascript
<h1>这是一个底部</h1>
```

## koa cookie
用同一个浏览器访问同一个网站共享数据
[借鉴网址](https://www.jianshu.com/p/f7e7eb18f8f9)
[借鉴网站](https://www.jianshu.com/p/db5c5255aca5?utm_campaign=maleskine&utm_content=note&utm_medium=seo_notes&utm_source=recommendation)
koa提供了从上下文直接读取、写入cookie的方法

```bash
ctx.cookies.get(name, [options]) 读取上下文请求中的cookie
```

```bash
ctx.cookies.set(name, value, [options]) 在上下文中写入cookie
```
代码

```javascript
const Koa = require('koa')
const config = require('../config')
const app = new Koa()

app.use(async(ctx)=>{
    if(ctx.url==='/index'){
        ctx.cookies.set('cid','comedy',{
            domain:'localhost',     //写cookie所在的域名
            path:'/index',          //写cookie所在的路径
            maxAge:60*1000,         //写cookie有效时长
            expires:7,
            httpOnly:false,
            overwrite:false
        })
        ctx.body = 'cookie is ok'
    }else{
        ctx.body = 'hello world'
    }
})


app.listen( config.port ,()=>{console.log(`端口号为${config.port}的node项目启动成功`);})
```
![在这里插入图片描述](https://img-blog.csdnimg.cn/a04f9f9100a74a96a0fdfe5ee5a52337.webp?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NTg5NjEyNg==,size_16,color_FFFFFF,t_70#pic_center)
## koa session
session工作流程

```javascript
当浏览器访问服务器并发送第一次请求时，服务器端会创建一个session对象，生成一个类似于key,value的键值对，然后将key(cookie)返回到浏览器(客户)端，浏览器下次再访问时，携带key(cookie)，找到对应的session(value)。客户的信息都保存在session中
```
1.安装 

```javascript
express-session npm install koa-session --save 
```

2.引入 

```javascript
express-session const session = require('koa-session'); 
```

3.设置官方文档提供的中间件 
⭐表示需要修改其余默认
```javascript
app.keys = ['some secret hurr']; /cookie签名
const CONFIG = {
key: 'koa:sess', //cookie key (default is koa:sess) 
maxAge: 86400000, // cookie 的过期时间 maxAge in ms (default is 1 days) ⭐
overwrite: true, //是否可以 overwrite (默认 default true)   没有效果设不设置一样
httpOnly: true, //cookie 是否只有服务器端可以访问 httpOnly or not (default true) 
signed: true, //签名默认 true 
rolling: false, //在每次请求时强行设置 cookie，这将重置 cookie 过期时间（默认：false） 
renew: true, //(boolean) renew session when session is nearly expired, ⭐};

app.use(session(CONFIG, app));
```

4.使用 设置值

```javascript
 ctx.session.username = "张三";  获取值 ctx.session.username 
```

## mongodb创建连接配置
[实战网址借鉴](https://juejin.cn/post/6844904153982976013#heading-9)
准备工作：es5、es6 class类 静态方法 以及单例模式
1.安装mongodb

```javascript
npm install mongodb --save
```
2.引入mongodb下面的MongoClient

```javascript
var MongoClient = require('mongodb').MongoClient
```
3.定义数据库连接的地址 以及配置数据库config.js

```javascript
koa数据库名称
var url = 'mongodb://localhost:3306/';
var dbName = 'koa'
```
4.nodejs连接数据库

```javascript
MongoClient.connect(url,function(err,client){
if(err){
	console.log(err)
	return;
	}
	const db = client.db(dbName)  //数据库db对象
})
```
5.操作数据库(官方较慢）

```javascript
//增加数据
MongoClient.connect(url,function(err,client){
    if(err){
        console.log(err);
    }
	const db = client.db(dbName);  //数据库db对象
    // 增加数据
    db.collection('user').insertOne({'username':"张三","age":"23","sex":"男","status":"1"},function(err,result){
        if(!err){
            console.log("增加数据成功");
            client.close()
        }
    })
    //查询数据
    var result=db.collection('user').find({});
  result.toArray((err,docs)=>{
      console.log(docs);
  })
  
  })
```
5.1封装koa操作mongodb数据库的db类库
在module文件夹下新建config.js和db.js两文件
增
config.js

```javascript
// 配置文件
var app = {
    dbUrl = 'mongodb://localhost:3306/',
    dbName = 'koa'
}
module.exports=app;
```

db.js
```javascript
// 连接数据库⭐
var MongoDB = require('mongodb')
var MongoClient = MongoDB.ObjectID;
var Config = require('./config.js');
class Db {
    static getInstance(){ //单例 多次实例化实例不共享问题
        if(!Db.instance){
            Db.instance=new Db();
        }
        return
    }
    constructor() {
        this.dbClient=''//属性 放db对象
        this.connect();
    }
    connect() {
        // 连接数据库
        var _that =this;
        return new Promise(function (resolve, reject) {
            if(!_that.dbClient){ //解决数据库多次链接问题
                MongoClient.connect(Config.dbUrl, (err, client) => {
                    if (err) {
                        reject(err)
                    } else {
                        var db =client.db(Config.dbName);
                        _that.dbClient=db;
                        resolve(this.dbClient)
                    }
                })
            }else{
                resolve(_that.dbClient);
            }
            

        })

    }
    find(biaoming,json) {//⭐⭐ 查询
        return new Promise((resolvr,reject)=>{
            this.connect().then((db)=>{
                var result = db.collection(biaoming).find(json);
                result.toArray(function(err,docs){
                    if(erer){
                        reject(err);
                        return
                    }
                        resolve(docs);
                    
                })
            })
        })
    }
    update(biaoming, json1,json2) {  //修改⭐
        return new Promise((resolve, reject) => {
            this.connect().then((db) => {
                db.collection(biaoming).updateOne(json1,{
                    $set:json2
                },(errr,result)=>{
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result);
                    }
                })
            })
        })
    }
    insert(biaoming,json){   //bioaming表名 增加⭐
        return new Promise((resolve,reject)=>{
            this.connect().then((db)=>{
                db.collection(bioaming).insertOne(json,function(err,result){
                    if(err){
                        reject(err);
                    }else{
                        resolve(result);
                    }
                })
            })
        })

    }
    remove(biaoming,json){  //⭐删除
        return new Promise((resolve, reject) => {
            this.connect().then((db) => {
                db.collection(bioaming).removeOne(json, function (err, result) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result);
                    }
                })
            })
        })
    }
    getObjectId(id){//mongodb里面查_id把字符串转换成对象
    return new ObjectID(id);
    }
}
module.exports=Db.getInstance();
```
调用查

```javascript
DB.require('./module/db')
router.get('/',async (ctx)=>{
    var result = await DB.find('biaoming',{});
    console.log(result);
});
```
调用增

```javascript
router.get('/add',async (ctx)=>{
    var result = await DB.insert('user',{'username':'赵六','age':22});
    console.log(result);
});
```
调用改

```javascript
router.get('/edit',async (ctx)=>{
    var result = await DB.update('user',{'username':'赵六','age':22});
    console.log(result);
});
```
调用删除

```javascript
router.get('/delete',async (ctx)=>{
    var result = await DB.remove('user',{'username':'赵六'});
    console.log(result);
});
```
### 渲染到模板类似express的res.json

```javascript
//显示学员信息
router.get('/edit',async (ctx)=>{
    var result = await DB.find('user',{});
    list:result
});
```

```javascript
// 增加学员
router.get('/add',async(ctx)=>{
    await ctx.render('add')
})
// 执行增加学员操作
router.post('/doArr',async(ctx)=>{
    // 获取表单提交信息
    console.log(ctx.request.body);
})
```

```javascript
//编辑
router.post('/eedit',async(ctx)=>{
    let id = ctx.ruery.id;
    let data=await DB.find('user','_id':DB.getObjectId(id))
    //获取用户信息
    await ctx.render('edit')

	try{
        if(data.result.ok){
            ctx.redirect("/")
        }
        }catch(err){
            console.log(err);
            return;
            ctx.redirect('/add')
        }
})
```

```javascript
//修改
router.post('doEdit',async(ctx)=>{
	var id =ctx.request.body.id;
	var username=ctx.request.body.username;
	var sex=ctx.request.body.sex;
	let data = await DB.update('user':DB.getObjectId(id),{username,sex})}
try{
        if(data.result.ok){
            ctx.redirect("/")
        }
        }catch(err){
            console.log(err);
            return;
            ctx.redirect('/add')
        }
```

```javascript
//删除
router.get('/delete',async(ctx)=>{
    let id = ctx.ruery.id;
    let data=await DB.remove('user','_id:DB.getObjectId(id)')
})
```
## koa用户生成器 koa路由模块化
1.全局安装

```javascript
npm install koa-generator -g
```
2.创建项目

```javascript
koa koa_demo
```
3.安装依赖

```javascript
cd koa_deno
npm install
```
4.启动项目

```javascript
npm start
```
# 配置文件









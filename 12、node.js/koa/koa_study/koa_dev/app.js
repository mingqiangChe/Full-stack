var app = require('koa')()
  , logger = require('koa-logger')
  , json = require('koa-json')
  , views = require('koa-views')
  , onerror = require('koa-onerror')
  ,router =require('koa-router')();
// 引入admin子模块
var admin=require('../koa_dev/routes/admin');
var api=require('../koa_dev/routes/admin/api')



// error handler
onerror(app);

// global middlewares
app.use(views('views', {
  root: __dirname + '/views',
  default: 'jade'
}));
app.use(require('koa-bodyparser')());
app.use(json());
app.use(logger());

app.use(function *(next){
  var start = new Date;
  yield next;
  var ms = new Date - start;
  console.log('%s %s - %s', this.method, this.url, ms);
});

app.use(require('koa-static')(__dirname + '/public'));

// routes definition
app
    .use(router.routes())  //启动路由
    .use(router.allowedMethods());  //设置对应响应头可选


// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});
app.listen(9000);



// 配置路由
router.use('/admin',admin.routes());
router.get('/', (ctx) => {
    ctx.body = '首页'
})

router.get('/admin', (ctx) => {
    ctx.body = '后台管理页面'
})
// router.use('/api',api.routes());
router.use('/api',api);//在模块里面暴漏路由并启动路由

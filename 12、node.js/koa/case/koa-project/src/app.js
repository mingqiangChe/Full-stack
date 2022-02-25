const Koa = require('koa')
const app = new Koa()
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
import koabody from 'koa-body';
import cors from 'koa-cors';
const render = require('koa-swig')
const co = require('co')
const koaStaticCache = require('koa-static-cache')
// const logger = require('koa-logger')
const logUtil = require('./utils/log_util');
const users = require('./routes/users')
const index = require('./routes/index')
const blog = require('./routes/blog')
import returnValue from './utils/returnValue';
const response_formatter = require('./middlewares/response_formatter');
// 添加格式化处理响应结果的中间件，在添加路由之前调用
// error handler
onerror(app)

// 处理跨域及post数据处理
app.use(cors());  // 这里使用的是generators，v3移除，可用中间件替代处理
/* 
    app.use(async (ctx, next) => {
    ctx.set('Access-Control-Allow-Origin', '*');
	await next();
})
*/
app.use(koabody({
    text: false,
    multipart: true,
    formidable: {
        maxFileSize: 200 * 1024 * 1024
    }
}))
// bodyparser无法处理form-data,用koabody替代
// app.use(bodyparser({
//     enableTypes:['json', 'form', 'text']
// }))
app.context.render = co.wrap(render({
    root: __dirname + '/views', // 模板存放目录
    autoescape: true, // 是否自动escape编码，作用是是否自动解析为html，false为开启，为了安全起见一般设置为true
    cache: false, // 是否启用缓存  启用缓存为 memory:把解析后的结果保存在内存中，避免每次访问都去解析
    ext: 'html' // 模板后缀
}))
// middlewares
app.use(koaStaticCache(__dirname + '/public', {
    // root:__dirname +'/static',  // 和上面的第一个参数一个作用，可以只写一个，设置存放静态资源的目录
    // dir:'',
    prefix: '/public' // 请求的前缀
}))
app.use(json())
// app.use(logger())
app.use(async (ctx, next) => { // 响应开始时间
    const start = new Date();
    // 响应间隔时间
    var ms;
    try { // 开始进入到下一个中间件
        await next();
        ms = new Date() - start;
        // 记录响应日志
        logUtil.logResponse(ctx, ms);
        console.log(`${
            ctx.method
        } ${
            ctx.url
        } - ${ms}ms`)
    } catch (error) {
        console.log(error);
        if(error.code){
            return returnValue.err(ctx,error.code,error.message&&error.message)
        }
        ms = new Date() - start;
        // 记录异常日志
        logUtil.logError(ctx, error, ms);
        ctx.body = {
            data: error.name,
            errorCode: 1001,
            message: '服务器错误',
            updata_time:new Date()
        }
    }
});

app.use(response_formatter('^/users'));
// routes
app.use(index.routes(), index.allowedMethods())
app.use(blog.routes(), blog.allowedMethods())
app.use(users.routes(), users.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
    console.error('server error', err, ctx)
});

module.exports = app

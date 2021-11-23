// 处理用户增删改查
var router= require('koa-router')();

router.get('/',(ctx)=>{
    ctx.body='用户首页'
})
router.get('/add',(ctx)=>{
    ctx.body='增加用户'
})


module.exports=router.routes();
// 到处由总admin处理路由
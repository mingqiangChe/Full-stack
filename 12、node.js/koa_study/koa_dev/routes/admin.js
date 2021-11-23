// 配置路由 其他引入使用
var router= require('koa-router')();
var user=require('./admin/user')
router.get('/',(ctx)=>{
    ctx.body='后台'
})
router.use('/user',user)
module.exports=router;
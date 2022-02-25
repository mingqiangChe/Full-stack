var router= require('koa-router')();

router.get('/list',(ctx)=>{
    ctx.body={'title':'菜单接口'}
})


// module.exports=router;
module.exports=router.routes();
import userController from '../controller/user'
const router = require('koa-router')()

router.get('/', async (ctx, next) => {
    try {
        await ctx.render('index', {
            title: 'Hello Koa 2!',
            color: 'red'
        })
    } catch (error) {
        console.log(error);
    }
})

router.get('/string', async (ctx, next) => {
    ctx.body = 'koa2 string'
})

router.post('/refresh/token', userController.refreshToken)

module.exports = router

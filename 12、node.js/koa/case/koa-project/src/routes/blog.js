import blogController from '../controller/blog'
const router = require('koa-router')()

router.prefix('/blog')

router.post('/addBlog',blogController.addBlog)
router.get('/pageBlog',blogController.pageBlog)

module.exports = router

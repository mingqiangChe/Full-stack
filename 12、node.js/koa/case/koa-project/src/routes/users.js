const router = require('koa-router')()
import userController from '../controller/user'
router.prefix('/users')

router.post('/register', userController.addUser)
router.post('/updateUserPassword', userController.updateUserPassword)
router.post('/login', userController.login)
module.exports = router


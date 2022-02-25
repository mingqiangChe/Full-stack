// 用户路由模块
const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const service = require('../services/userService');
// 登录/注册校验
const vaildator = [
    body('username').isString().withMessage('用户名类型错误'),
    body('password').isString().withMessage('密码类型错误')
]


// 用户登录路由
router.post('/login', vaildator, service.login);
router.get('/getImgVerify', service.getImgVerify)
router.post('/getUserInfo', service.getUserInfo);
router.post('/setUserPwd', service.setUserPwd);
module.exports = router;
/*
 * @Author: your name
 * @Date: 2021-07-16 14:58:40
 * @LastEditTime: 2021-08-04 11:34:32
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \hqtcsz_pc_servere:\项目\hqtcsz_crm_server\utils\user-jwt.js
 */
// jwt-token验证和解析函数
const jwt = require('jsonwebtoken'); // 引入验证jsonwebtoken模块
const expressJwt = require('express-jwt'); // 引入express-jwt模块
const { PRIVATE_KEY } = require('./constant'); // 引入自定义的jwt密钥

// 验证token是否过期
const jwtAuth = expressJwt({
    // 设置密钥
    secret: PRIVATE_KEY,
    // 设置为true表示校验，false表示不校验
    credentialsRequired: true,

    algorithms: ['HS256'],
    // 自定义获取token的函数
    getToken: (req) => {
            console.log('服务缓存token：', req.headers.authorization)
            if (req.headers.authorization) {
                return req.headers.authorization
            } else if (req.query && req.query.token) {
                return req.query.token
            }

        }
        // 设置jwt认证白名单，比如/api/login登录接口不需要拦截
}).unless({
    path: [
        '/api/login',
        '/api/getImgVerify',
        '/api',
        // '/api/register',
        // '/api/resetPwd'
    ]
})

// jwt-token解析
function decode(req) {
    const token = req.get('Authorization')
    return jwt.verify(token, PRIVATE_KEY);
}

module.exports = {
    jwtAuth,
    decode
}
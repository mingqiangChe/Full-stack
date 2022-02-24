// 业务逻辑 用户登录注册查询相关api接口
const { querySql, queryOne } = require('../utils/index');
const md5 = require('../utils/md5');
const jwt = require('jsonwebtoken');
const boom = require('boom');
const { body, validationResult } = require('express-validator');
const {
    CODE_ERROR,
    CODE_SUCCESS,
    PRIVATE_KEY,
    JWT_EXPIRED
} = require('../utils/constant');
const { decode } = require('../utils/user-jwt');
const svgCaptcha = require('svg-captcha');
const session = require('express-session');

/**
 * @description: 登录
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @return {*}
 */
function login(req, res, next) {
    // 如果验证错误，empty不为空
    let { username, password, imagesCode } = req.body;
    console.log('前端传输数据：', req.body)
    if (!imagesCode) {
        res.send({
            code: -1001,
            msg: '验证码不能为空！'
        });
        return false;
    }
    console.log(session.captcha)
    if (imagesCode !== session.captcha) {
        res.send({
            code: -1001,
            msg: '验证码错误，请重新输入！'
        });
        return false;
    }
    // md5加密
    password = md5(password);
    const query = `select * from sys_user where user_code='${username}' and user_password='${password}'`;
    console.log('登录Mysql查询语句', query)
    querySql(query)
        .then(user => {
            // console.log('用户登录===', user);
            if (!user || user.length === 0) {
                res.json({
                    code: CODE_ERROR,
                    msg: '用户名或密码错误',
                    data: null
                })
            } else {
                console.log('返回的用户信息', user[0]);
                // 登录成功，签发一个token并返回给前端
                const token = jwt.sign(
                    // payload：签发的 token 里面要包含的一些数据。
                    { username },
                    // 私钥
                    PRIVATE_KEY,
                    // 设置过期时间
                    { expiresIn: JWT_EXPIRED }
                )
                let userData = {
                    id: user[0].id,
                    username: user[0].user_name,
                    nickname: user[0].user_nickname,
                    avator: user[0].user_avator,
                    sex: user[0].user_gender,
                    gmt_create: user[0].gmt_create,
                    gmt_modify: user[0].gmt_modify,
                    user_code: user[0].user_code
                };
                res.json({
                    code: CODE_SUCCESS,
                    msg: '登录成功',
                    data: {
                        token,
                        userData
                    }
                })
            }
        })
}

/**
 * @description: 图形验证码
 * @param {*}
 * @return {*}
 */
function getImgVerify(req, res, next) {
    const err = validationResult(req);
    // 如果验证错误，empty不为空
    if (!err.isEmpty()) {
        // 获取错误信息
        const [{ msg }] = err.errors;
        // 抛出错误，交给我们自定义的统一异常处理程序进行错误返回 
        next(boom.badRequest(msg));
    } else {
        let option = {
            size: 4, // 个数
            width: 98, // 宽
            height: 45, // 高
            fontSize: 38, // 字体大小
            color: true, // 字体颜色是否多变
            noise: 1, // 干扰线几条
            background: 'white', // 背景色
        };
        // 验证码，有两个属性，text是字符，data是svg代码
        let captcha = svgCaptcha.create(option);
        // 保存到session,忽略大小写
        session.captcha = captcha.text.toLowerCase();
        console.log(captcha);
        // 返回数据直接放入页面元素展示即可
        res.json({
            code: 200,
            msg: '成功',
            data: {
                imgUrl: captcha.data
            }
        })
    }
}

/**
 * @description: 通过用户名查询用户信息
 * @param {*} req
 * @param {*} res
 * @return {*}
 */
function getUserInfo(req, res, next) {
    let { id, user_code } = req.body;
    const query = `select * from sys_user where id=${id} and user_code='${user_code}'`;
    console.log(query)
    querySql(query)
        .then(user => {
            console.log('用户信息：', user);
            res.json({
                code: 200,
                msg: '信息获取成功！',
                data: user[0]
            })
        })
}

/**
 * @description: 修改密码
 * @param {*} req
 * @param {*} res
 * @return {*}
 */
function setUserPwd(req, res) {
    let { id, nowPassword, newPassword, forPassword } = req.body;
    const query = `select * from sys_user where id=${id}`;
    console.log(query)
    querySql(query)
        .then(user => {
            console.log('用户信息：', user);
            console.log(user[0].user_password);
            console.log(nowPassword)
            if (user[0].user_password !== md5(nowPassword)) {
                res.json({
                    code: -1001,
                    msg: '您输入的旧密码错误，请重新核对！'
                })
                return;
            } else {
                const queryNow = `UPDATE sys_user SET user_password = '${ md5(forPassword)}' WHERE id = ${id}`;
                console.log(queryNow)
                querySql(queryNow)
                    .then(user => {
                        console.log('修改密码：', user[0]);
                        res.json({
                            code: 200,
                            msg: '密码修改成功，请退出重新登录'
                        })
                    })
            }
        })
}

module.exports = {
    login,
    getImgVerify,
    getUserInfo,
    setUserPwd
}
import User from '../models/user';
import {sequelize, tableExample} from '../mysql';
import paramJudge from '../utils/param';
import returnValue from '../utils/returnValue';
import redis from '../redis';
import logger from '../utils/log_util'
import crypto from 'crypto';
async function addUser(ctx, next) {
    const data = ctx.request.body,
        user = new User();
    let userInfo;
    // 参数是否符合规范判断
    await paramJudge(data, 'phone', 'password').then(result => {
        if (result != 'true') {
            throw {
                code : 1003,
                message : result
            };
        }
    });
    userInfo = await user.getUser([
        'uid', 'phone',
    ], {phone: data.phone});
    if (userInfo.length && userInfo[0].dataValues.uid) {
        throw {
            code : 1006
        };
    }
    // 创建用户信息
    await sequelize.transaction(async t => { // 事务
        return tableExample.userTable.create({
            phone: data.phone.toString(),
            password: data.password
        }, {transaction: t})
    }).then(async result => {
        returnValue.success(ctx);
    }).catch(function (err) {
        throw err;
    });
}
async function updateUserPassword(ctx, next) {
    const data = ctx.request.body,
        user = new User();
    let userInfo;
    console.log(data);
    // 参数是否符合规范判断
    await paramJudge(data, 'phone', 'password', 'newPassword').then(result => {
        if (result != 'true') {
            throw {
                code : 1003,
                message : result
            };
        }
    });
    userInfo = await user.getUser([
        'phone', 'password'
    ], {phone: data.phone});
    if (userInfo.length) {
        if (userInfo[0].dataValues.password !== data.password) {
            throw {
                code : 1009
            };
        } else {
            let result = await user.updateUser({
                password: data.newPassword
            }, {phone: data.phone})
            if (result) {
                returnValue.success(ctx);
            } else {
                throw {
                    code : 1013
                };
            }
        }
    } else {
        throw {
            code : 1008
        };
    }
}
function createToken(info) {
    let header,
        payload,
        secret,
        sha256,
        token,
        tokenKey;
    header = {
        "typ": "JWT",
        "alg": "HS256"
    };
    payload = {
        "uid": info.uid,
        "upload_time": Date.now(),
        "phone": info.phone
    };
    header = new Buffer(JSON.stringify(header)).toString('base64');
    payload = new Buffer(JSON.stringify(payload)).toString('base64');
    // secret生成
    secret = header + payload + 'kirk';
    sha256 = crypto.createHash("sha256");
    sha256.update(secret);
    secret = sha256.digest('hex');
    token = `${header}.${payload}.${secret}`;
    return token;
}
async function loginResult(info, ctx) {
    let resultInfo,
        sessionInfo,
        token,
        refresh_token;
    refresh_token = createToken(info);
    resultInfo = Object.assign({}, info)
    token = createToken(info)
    sessionInfo = {
        uid: info.uid,
        token,
        upload_time: Date.now()
    }
    // redis中保存token
    redis.set(`${
        info.phone
    }${
        info.uid
    }`, JSON.stringify(sessionInfo), (err, result) => {
        if (err) {
            logger.error(`session设置--${err}`);
        }
    });
    // 设置超时时间
    redis.expire(`${
        info.phone
    }${
        info.uid
    }`, 60 * 60 * 3);
    resultInfo.access_token = token;
    resultInfo.refresh_token = refresh_token
    return resultInfo;
}
async function login(ctx, next) {
    const data = ctx.request.body,
        user = new User();
    let userInfo;
    // 参数是否符合规范判断
    await paramJudge(data, 'phone', 'password').then(result => {
        if (result != 'true') {
            throw {
                code : 1003,
                message : result
            };
        }
    });
    userInfo = await user.getUser([
        'uid', 'phone', 'password'
    ], {phone: data.phone});
    if (userInfo.length) {
        let {uid, phone, password} = userInfo[0].dataValues
        if (password !== data.password) {
            throw {
                code : 1009
            };
        } else {
            let resultInfo = await loginResult({
                uid: uid,
                phone: phone
            }, ctx);
            returnValue.success(ctx, resultInfo)
        }
    } else {
        throw {
            code : 1008
        };
    }
}

// 更新token
async function refreshToken(ctx, next) {
    const data = ctx.request.body,
        header = ctx.request.header,
        user = new User();
    let refresh,
        userInfo,
        refresh_token,
        token,
        sessionInfo;
    // 参数是否符合规范判断
    await paramJudge(data, 'refresh_token').then(result => {
        if (result != 'true') {
            throw {
                code : 1003,
                message : result
            };
        }
    });
    // 判断refresh_token是否过期
    refresh = JSON.parse(new Buffer(data.refresh_token.split('.')[1], 'base64').toString());
    if (refresh.upload_time + 1000 * 60 * 60 * 24 * 7 < Date.now()) {
        throw {
            code : 2003
        };
    }
    // 更换新token
    refresh_token = createToken(refresh);
    token = createToken(refresh);
    sessionInfo = {
        uid: refresh.uid,
        token,
        upload_time: Date.now()
    }
    // redis中保存token
    redis.set(`${
        refresh.phone
    }${
        refresh.uid
    }`, JSON.stringify(sessionInfo), (err, result) => {
        if (err) {
            logger.error(`session设置--${err}`);
        }
    });
    // 设置超时时间
    redis.expire(`${
        refresh.phone
    }${
        refresh.uid
    }`, 60 * 60 * 3);
    returnValue.success(ctx, {refresh_token, token});

}
export default {addUser, updateUserPassword, login, refreshToken}

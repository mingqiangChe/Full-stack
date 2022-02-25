const message = [
    {
        errCode: 1001,
        message: '服务器错误'
    },
    {
        errCode: 1002,
        message: '数据库操作失败'
    },
    {
        errCode: 1003,
        message: '参数缺失'
    },
    {
        errCode: 1004,
        message: '参数判断错误'
    },
    {
        errCode: 1005,
        message: '手机号错误'
    },
    {
        errCode: 1006,
        message: '已注册'
    },
    {
        errCode: 1007,
        message: '验证码错误'
    },
    {
        errCode: 1008,
        message: '账号未注册'
    },
    {
        errCode: 1009,
        message: '密码错误'
    },
    {
        errCode: 1010,
        message: '账号错误'
    },
    {
        errCode: 1011,
        message: '验证码发送失败'
    },
    {
        errCode: 1012,
        message: '超过最大值'
    },
    {
        errCode: 1013,
        message: '修改失败'
    },
    {
        errCode: 2001,
        message: '错误token'
    },
    {
        errCode: 2002,
        message: 'token过期'
    },
    {
        errCode: 2003,
        message: '重新登录'
    },
    {
        errCode: 3001,
        message: '权限不足'
    },
    {
        errCode: 4001,
        message: '异地登陆'
    },
    {
        errCode: 5001,
        message: '未知类型消息'
    }
];
const returnValue = {
    async success(ctx, data, code) {
        if (code) {
            ctx.body = {
                errCode: 1,
                message: 'success',
                data: data
            }
        } else {
            ctx.body = {
                errCode: 0,
                message: 'success',
                data: data
            }
        }
    },
    err(ctx, errCode, news) {
        let info;
        message.filter(item => {
            if (item.errCode == errCode) {
                info = item.message;
            }
        })
        if (news) {
            info = news + info
        }
        ctx.body = {
            errCode: errCode,
            message: info
        }
    }
};
export default returnValue;
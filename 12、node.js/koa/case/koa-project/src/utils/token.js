import returnValue from '../utils/returnValue';
import client from '../redis';
import logger from '../utils/log_util'

const tokenJudge = async (ctx, rank = 10) => {
    try {
        const token = ctx.request.header.token;
        const header = ctx.request.header;
        // if (!header.type) {
        //     throw { code: 1003, message: 'type' };
        // }
        if (token) {
            let userInfo;
            const user = JSON.parse(new Buffer(token.split('.')[1], 'base64').toString());
            //判断token是否超时
            if (ctx.url != '/refresh/token') {
                if (!user) {
                    throw { code: 2002 };
                }
                if (user.upload_time < Date.now() - 1000 * 60 * 60 * 2) {
                    throw { code: 2002 };
                }
                // 获取用户信息
                await client.getAsync(`${
                    user.phone
                }${
                    user.uid
                }`).then(result => {
                    userInfo = result;
                    userInfo = JSON.parse(userInfo)
                }).catch(err => {
                    throw { code: 2001 };
                });
                if (!userInfo) {
                    throw { code: 2002 };
                }
                if (userInfo.token != token) {
                    throw { code: 4001 };
                }
                ctx.request.header.uid = userInfo.uid;
            }
            ctx.request.header.uid = user.uid;
            return true;
        } else {
            throw { code: 1003, message: 'token' };
        }
    } catch (err) {
        if (err.code) {
            returnValue.err(ctx, err.code, err.message);
            logger.error(`token--${JSON.stringify(err)}`);
        } else {
            returnValue.err(ctx, 1001);
            logger.error(`token--${err}`);
        }
    }
};
export default tokenJudge; 
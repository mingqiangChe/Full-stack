import request from '@/utils/request'

/**
 * @description: 登录接口
 * @param {*} data
 * @return {*}
 */
export function login(data) {
    return request({
        url: '/login',
        method: 'post',
        data
    })
}

/**
 * @description: 获取图形验证码接口
 * @param {*} data
 * @return {*}
 */
export function getImgVerify() {
    return request({
        url: '/getImgVerify',
        method: 'get',
    })
}

/**
 * @description: 获取用户信息接口
 * @param {*} token
 * @return {*}
 */
export function getInfo(data) {
    return request({
        url: '/getUserInfo',
        method: 'post',
        data
    })
}

/**
 * @description: 修改密码
 * @param {*}
 * @return {*}
 */
export function setUserPwd(data) {
    return request({
        url: '/setUserPwd',
        method: 'post',
        data
    })
}

/**
 * @description: 退出登录
 * @param {*}
 * @return {*}
 */
export function logout() {
    return request({
        url: '/vue-admin-template/user/logout',
        method: 'post'
    })
}
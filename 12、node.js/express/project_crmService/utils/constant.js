/*
 * @Author: your name
 * @Date: 2021-07-16 14:58:40
 * @LastEditTime: 2021-08-12 09:05:35
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \hqtcsz_pc_servere:\项目\hqtcsz_crm_server\utils\constant.js
 */
// 定义常量信息
module.exports = {
    CODE_ERROR: -1001, // 请求响应失败code码
    CODE_SUCCESS: 200, // 请求响应成功code码
    CODE_TOKEN_EXPIRED: 401, // 授权失败
    PRIVATE_KEY: 'jackchen', // 自定义jwt加密的私钥
    JWT_EXPIRED: 60 * 60 * 24, // 过期时间24小时
    // 60 * 60 * 24
}
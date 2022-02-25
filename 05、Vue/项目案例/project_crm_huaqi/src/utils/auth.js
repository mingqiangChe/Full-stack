/*
 * @Author: your name
 * @Date: 2021-06-30 10:35:46
 * @LastEditTime: 2021-07-20 10:35:18
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \hqtcsz_pc_servere:\项目\hqtcsz_crm_admin\vue-admin-template\src\utils\auth.js
 */
import Cookies from 'js-cookie'

export function getToken() {
    return Cookies.get('authorization')
}

export function setToken(token) {
    return Cookies.set('authorization', token)
}

export function removeToken() {
    return Cookies.remove('authorization')
}
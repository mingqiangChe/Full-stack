import request from '@/utils/request'

/**
 * @description: 客户池列表查询接口
 * @param {*} data
 * @return {*}
 */
export function CustomerPool(data) {
    return request({
        url: '/queryCustomerPool',
        method: 'post',
        data
    })
}

/**
 * @description: 客户池针删除单条/多条数据接口
 * @param {*} data
 * @return {*}
 */
export function delectCustomerPoolItem(data) {
    return request({
        url: '/delectCustomerPoolItem',
        method: 'post',
        data
    })
}

/**
 * @description: 客户池修改数据
 * @param {*} data
 * @return {*}
 */
export function updateCustomerPoolItem(data) {
    return request({
        url: '/updateCustomerPoolItem',
        method: 'post',
        data
    })
}

/**
 * @description: 客户池导入数据
 * @param {*} data
 * @return {*}
 */
export function importMultipleData(data) {
    return request({
        url: '/importMultipleData',
        method: 'post',
        data
    })
}

/**
 * @description: 线上列表查询
 * @param {*} data
 * @return {*}
 */
export function queryOnlineCustomers(data) {
    return request({
        url: '/queryOnlineCustomers',
        method: 'post',
        data
    })
}
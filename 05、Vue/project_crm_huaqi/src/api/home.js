import request from '@/utils/request'
/**
 * @description: 昨日销售金额  昨日成交订单数
 * @param {*}
 * @return {*}
 */
export function queryYesterdayPerformance() {
    return request({
        url: '/queryYesterdayPerformance',
        method: 'post',
    })
}

/**
 * @description: 今日销售金额  今日成交订单数
 * @param {*}
 * @return {*}
 */
export function queryTodayPerformance() {
    return request({
        url: '/queryTodayPerformance',
        method: 'post',
    })
}

/**
 * @description: 七天每日总销售金额分析表
 * @param {*}
 * @return {*}
 */
export function querySevenDaysADay() {
    return request({
        url: '/querySevenDaysADay',
        method: 'post',
    })
}

/**
 * @description: 一年每月总销售金额分析表
 * @param {*}
 * @return {*}
 */
export function queryEveryMonthOfTheYear() {
    return request({
        url: '/queryEveryMonthOfTheYear',
        method: 'post',
    })
}

/**
 * @description: 各产品总销售金额、数量分析表
 * @param {*}
 * @return {*}
 */
export function queryEveryProuducts() {
    return request({
        url: '/queryEveryProuducts',
        method: 'post',
    })
}
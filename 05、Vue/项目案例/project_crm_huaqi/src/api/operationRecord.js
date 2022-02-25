import request from '@/utils/request'

/**
 * @description: 操作记录列表查询接口
 * @param {*} data
 * @return {*}
 */
export function queryOperationRecord(data) {
    return request({
        url: '/queryOperationRecord',
        method: 'post',
        data
    })
}
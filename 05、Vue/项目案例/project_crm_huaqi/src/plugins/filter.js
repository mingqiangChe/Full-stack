import { parseTime } from '@/utils/index'


/**
 * @description:客户池-客户当前情况状态过滤器
 * @param {val}
 * @returns {type:string}
 */
let filter_information = val => {
    if (val == '1') {
        return 'primary'
    } else if (val == '2') {
        return 'warning'
    } else if (val == '3') {
        return 'warning'
    } else if (val == '4') {
        return 'success'
    } else if (val == '5') {
        return 'success'
    } else if (val == '6') {
        return 'danger'
    } else {
        return 'danger'
    }
}

/**
 * @description:客户池-客户当前情况状态文字展示效果过滤器
 * @param {val}
 * @returns {type:string}
 */
let filter_informationText = val => {
    if (val == '1') {
        return '跟进中'
    } else if (val == '2') {
        return '已付款'
    } else if (val == '3') {
        return '已发货'
    } else if (val == '4') {
        return '已收货'
    } else if (val == '5') {
        return '交易完成'
    } else if (val == '6') {
        return '退款中'
    } else {
        return '退款完成'
    }
}

/**
 * @description: 客户池-客户意向状态过滤器
 * @param {val}
 * @return {type:string}
 */
let filter_intention = val => {
    if (val == '4') {
        return 'danger'
    } else if (val == '3') {
        return 'warning'
    } else if (val == '2') {
        return 'success'
    } else {
        return 'info'
    }
}

/**
 * @description: 客户池-客户意向状态文字展示效果过滤器
 * @param {val}
 * @return {type:string}
 */
let filter_intentionText = val => {
    if (val == '4') {
        return '极高'
    } else if (val == '3') {
        return '高'
    } else if (val == '2') {
        return '中'
    } else {
        return '低'
    }
}

/**
 * @description: 客户池-客户来源文字展示效果状态过滤器
 * @param {val}
 * @return {type:string}
 */
let filter_sourceText = val => {
    if (val == '1') {
        return '淘宝'
    } else if (val == '2') {
        return '1688'
    } else if (val == '3') {
        return '阿里国际站'
    } else {
        return '线下'
    }
}

/**
 * @description: 客户池-客户意向产品文字展示效果状态过滤器
 * @param {val}
 * @return {type:string}
 */
let filter_productsText = val => {
    if (val == '1') {
        return '行业无人机系列'
    } else if (val == '2') {
        return '植保无人机系列'
    } else if (val == '3') {
        return '植保无人机10L'
    } else if (val == '4') {
        return '植保无人机16L'
    } else if (val == '5') {
        return '植保无人机22L'
    } else if (val == '6') {
        return '植保无人机25L'
    } else if (val == '7') {
        return '植保无人机30L'
    } else if (val == '8') {
        return '消防无人机灭火弹'
    } else {
        return '消防无人机灭火罐'
    }
}

/**
 * @description: 客户池-上次跟进时间 时间戳过滤器
 * @param {val}
 * @return {type:string}
 */
let filter_lasttimeText = val => {
    return parseTime(val)
}

/**
 * @description: 操作记录-操作类型过滤器
 * @param {val}
 * @return {type:string}
 */
let filter_operationRecord = val => {
    if (val == '0') {
        return 'warning'
    } else if (val == '1') {
        return 'danger'
    } else {
        return 'error'
    }
}

/**
 * @description: 操作记录-操作类型文字展示效果过滤器
 * @param {val}
 * @return {type:string}
 */
let filter_operationRecordText = val => {
    if (val == '0') {
        return '导入'
    } else if (val == '1') {
        return '删除'
    } else {
        return '修改'
    }
}

/**
 * @description: 
 * @param {*}
 * @return {*}
 */
let filter_identityText = val => {
    if (val == '1') {
        return '农民'
    } else if (val == '2') {
        return '经销商'
    } else {
        return '相关机构'
    }
}
export default {
    filter_information,
    filter_intention,
    filter_informationText,
    filter_intentionText,
    filter_sourceText,
    filter_productsText,
    filter_lasttimeText,
    filter_operationRecord,
    filter_operationRecordText,
    filter_identityText,
}
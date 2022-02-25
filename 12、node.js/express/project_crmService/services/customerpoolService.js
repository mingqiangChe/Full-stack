const { querySql, queryOne } = require('../utils/index');
const boom = require('boom');
const SDTime = require('silly-datetime')
const {
    CODE_ERROR,
    CODE_SUCCESS,
} = require('../utils/constant');
const { body, validationResult } = require('express-validator');
const session = require('express-session');
const { ValidatorsImpl } = require('express-validator/src/chain');
/**
 * @description: 客户池列表查询
 * @param {*} req
 * @param {*} res
 * @return {*}
 */
function queryCustomerPool(req, res, next) {
    let { customer_sale, saleName, customer_intention, customer_products, customer_source, customer_phone, customer_status, pageSize, pageNo } = req.body;
    const err = validationResult(req);
    // 如果验证错误，empty不为空
    if (!err.isEmpty()) {
        // 获取错误信息
        const [{ msg }] = err.errors;
        // 抛出错误，交给我们自定义的统一异常处理程序进行错误返回 
        next(boom.badRequest(msg));
    } else {
        let { status } = req.query;
        // 默认值
        pageSize = pageSize ? pageSize : 10;
        pageNo = pageNo ? pageNo : 1;
        status = (status || status == 0) ? status : null;

        let intentionSQL = `AND customer_intention IN ( SELECT id FROM customer_intention WHERE id =${customer_intention})`
        let productsSQL = `AND customer_products IN ( SELECT id FROM customer_products WHERE id =${customer_products})`
        let sourceSQL = `AND customer_source IN ( SELECT id FROM customer_source WHERE id =${customer_source})`
        let statusSQL = `AND customer_status IN ( SELECT id FROM customer_status WHERE id =${customer_status})`
        let phoneSQL = `AND customer_phone =${customer_phone}`
        let saleSQL = `AND customer_sale ='${customer_sale}'`
        let saleNameSQL = `AND customer_name ='${saleName}'`
        let query = `SELECT
                        id,
                        customer_nickname,
                        customer_name,
                        customer_phone,
                        customer_source,
                        customer_products,
                        customer_intention,
                        customer_issues,
                        customer_worry,
                        customer_budget,
                        customer_quote,
                        customer_purpose,
                        customer_identity,
                        customer_operation_area,
                        customer_sale,
                        customer_status,
                        customer_inquiry_time,
                        customer_customized,
                        customer_transaction_amount,
                        customer_payment_time,
                        remarks
                    FROM
                        customerpool
                    ${!customer_intention && !customer_products && !customer_source && !customer_status && !customer_phone && !customer_sale && !saleName ? '' : 'where'} 
                        ${!customer_intention ? '' : intentionSQL} 
                        ${!customer_products ? '' : productsSQL} 
                        ${!customer_source ? '' : sourceSQL} 
                        ${!customer_status ? '' : statusSQL} 
                        ${!customer_phone ? '' : phoneSQL}
                        ${!customer_sale ? '' : saleSQL}
                        ${!saleName ? '' : saleNameSQL}`

        if (query.indexOf('where') != -1) {
            let newStr = query.split('where')
            query = newStr[0] + 'where' + newStr[1].replace(/^\s*|\s*$/g, "").substring(3)
        }
        querySql(query)
            .then(data => {
                // console.log('任务列表查询===', data);
                if (!data || data.length === 0) {

                    res.json({
                        code: 200,
                        msg: '暂无数据',
                        data: []
                    })
                } else {

                    // 计算数据总条数
                    let total = data.length;
                    // 分页条件 (跳过多少条)
                    let n = (pageNo - 1) * pageSize;
                    // 拼接分页的sql语句命令
                    if (status) {
                        let query_1 = `SELECT
                        id,
                        customer_nickname,
                        customer_name,
                        customer_phone,
                        customer_source,
                        customer_products,
                        customer_intention,
                        customer_issues,
                        customer_worry,
                        customer_budget,
                        customer_quote,
                        customer_purpose,
                        customer_identity,
                        customer_operation_area,
                        customer_sale,
                        customer_status,
                        customer_inquiry_time,
                        customer_customized,
                        customer_transaction_amount,
                        customer_payment_time,
                        remarks
                    FROM
                        customerpool
                    WHERE status='${status}' order by customer_inquiry_time desc`;
                        querySql(query_1)
                            .then(result_1 => {

                                if (!result_1 || result_1.length === 0) {
                                    res.json({
                                        code: CODE_SUCCESS,
                                        msg: '暂无数据',
                                        data: null
                                    })
                                } else {
                                    let query_2 = query_1 + ` limit ${n} , ${pageSize}`;
                                    querySql(query_2)
                                        .then(result_2 => {

                                            if (!result_2 || result_2.length === 0) {
                                                res.json({
                                                    code: CODE_SUCCESS,
                                                    msg: '暂无数据',
                                                    data: null
                                                })
                                            } else {
                                                res.json({
                                                    code: CODE_SUCCESS,
                                                    msg: '查询数据成功',
                                                    data: {
                                                        rows: result_2,
                                                        total: result_1.length,
                                                        pageNo: parseInt(pageNo),
                                                        pageSize: parseInt(pageSize),
                                                    }
                                                })
                                            }
                                        })
                                }
                            })
                    } else {
                        // let query_3 = query + ` order by d.gmt_create desc limit ${n} , ${pageSize}`;
                        let query_3 = query + ` order by customer_inquiry_time desc limit ${n} , ${pageSize}`;
                        querySql(query_3)
                            .then(result_3 => {

                                if (!result_3 || result_3.length === 0) {
                                    res.json({
                                        code: 200,
                                        msg: '暂无数据',
                                        data: []
                                    })
                                } else {
                                    res.json({
                                        code: CODE_SUCCESS,
                                        msg: '查询数据成功',
                                        data: {
                                            rows: result_3,
                                            total: total,
                                            pageNo: parseInt(pageNo),
                                            pageSize: parseInt(pageSize),
                                        }
                                    })
                                }
                            })
                    }
                }
            })
    }
}

/**
 * @description: 客户池删除单条/多条数据
 * @param {*}
 * @return {*}
 */
//  DELETE FROM customerpool where id=${id}
function delectCustomerPoolItem(req, res, next) {
    let { id, user_name, customer_name } = req.body;
    const err = validationResult(req);
    let zz = customer_name;
    let id_arr = id.toString();

    if (zz.indexOf(',')) {
        zz = zz.split(',');
    }
    if (id_arr.indexOf(',')) {
        id_arr = id_arr.split(',');
    }

    if (!err.isEmpty()) {
        // 获取错误信息
        const [{ msg }] = err.errors;
        // 抛出错误，交给我们自定义的统一异常处理程序进行错误返回 
        next(boom.badRequest(msg));
    } else {
        let querySQlText = ''
        for (const i in zz) {
            querySQlText += `INSERT INTO operation_record (user_code,type,operation) SELECT '${user_name}','1','删除客户名为：${zz[i]} 的数据' from customerpool where id in (${id_arr[i]});DELETE FROM customerpool WHERE id IN (${id_arr[i]});`
        }

        querySql(querySQlText).then(data => {
            res.json({
                code: CODE_SUCCESS,
                msg: '删除成功',
                data: null
            })
        });

    }
}

// dx

/**
 * @description: 外部导入数据库多条数据
 * @param {*}
 * @return {*}
 */
function importMultipleData(req, res, next) {
    let formData = req.body.formData;
    let user_name = req.body.user_name;

    let formStr = '';
    formData = newExcelData(formData);

    for (var i = 0; i < formData.length; i++) {
        formStr += `('${formData[i].customer_nickname  == 'undefined' || !formData[i].customer_nickname ? '' : formData[i].customer_nickname}', '${formData[i].customer_name == 'undefined' || !formData[i].customer_name ? '' : formData[i].customer_name}','${formData[i].customer_phone == 'undefined' || !formData[i].customer_phone ? '' : formData[i].customer_phone}','${formData[i].customer_source  == 'undefined' || !formData[i].customer_source ? '' : formData[i].customer_source}', '${formData[i].customer_products  == 'undefined' || !formData[i].customer_products ? '' : formData[i].customer_products}',  '${formData[i].customer_intention == 'undefined' || !formData[i].customer_intention ? '' : formData[i].customer_intention}','${formData[i].customer_issues  == 'undefined' || !formData[i].customer_issues ? '' : formData[i].customer_issues}', '${formData[i].customer_worry  == 'undefined' || !formData[i].customer_worry ? '' : formData[i].customer_worry}','${formData[i].customer_budget  == 'undefined' || !formData[i].customer_budget ? '' : formData[i].customer_budget}', '${formData[i].customer_quote  == 'undefined' || !formData[i].customer_quote ? '' : formData[i].customer_quote}', '${formData[i].customer_purpose  == 'undefined' || !formData[i].customer_purpose ? '' : formData[i].customer_purpose}', '${formData[i].customer_identity  == 'undefined' || !formData[i].customer_identity ? '' : formData[i].customer_identity}','${formData[i].customer_operation_area  == 'undefined' || !formData[i].customer_operation_area ? '' : formData[i].customer_operation_area}', '${formData[i].customer_sale   == 'undefined' || !formData[i].customer_sale ? '' : formData[i].customer_sale}', '${formData[i].customer_status  == 'undefined' || !formData[i].customer_status ? '' : formData[i].customer_status}', '${formData[i].customer_inquiry_time == 'undefined' || !formData[i].customer_inquiry_time ? '' : formData[i].customer_inquiry_time}', '${formData[i].customer_customized  == 'undefined' || !formData[i].customer_customized ? '' : formData[i].customer_customized}','${formData[i].customer_transaction_amount == 'undefined' || !formData[i].customer_transaction_amount ? 0 : formData[i].customer_transaction_amount}','${formData[i].customer_payment_time == 'undefined' || !formData[i].customer_payment_time ? '' : formData[i].customer_payment_time}', '${formData[i].remarks == 'undefined' || !formData[i].remarks ? '' : formData[i].remarks}'),`
    }
    formStr = (formStr.substring(formStr.length - 1) == ',') ? formStr.substring(0, formStr.length - 1) : formStr;
    const err = validationResult(req);
    if (!err.isEmpty()) {
        const [{ msg }] = err.errors;
        next(boom.badRequest(msg));
    } else {
        let importDate = `INSERT INTO customerpool (customer_nickname,customer_name,customer_phone,customer_source,customer_products,customer_intention,customer_issues,customer_worry,customer_budget,customer_quote,customer_purpose,customer_identity,customer_operation_area,customer_sale,customer_status,customer_inquiry_time,customer_customized,customer_transaction_amount,customer_payment_time,remarks)
      VALUES                                                                            
         ${formStr};INSERT INTO operation_record (user_code,type,operation) values ('${user_name}','0','新插入${formData.length}条数据') `;
        console.log(importDate)
        querySql(importDate).then(data => {
            res.json({
                code: CODE_SUCCESS,
                msg: '导入成功',
                data: formStr
            })
        })
    }
}


/**
 * @description:客户池修改数据
 * @param {*}
 * @return {*}
 */
function updateCustomerPoolItem(req, res, next) {

    let { id, user_name, customer_budget, customer_issues, customer_intention, customer_customized, customer_identity, customer_inquiry_time, customer_name, customer_nickname, customer_operation_area, customer_phone, customer_products, customer_purpose, customer_quote, customer_sale, customer_source, customer_status, customer_worry, customer_transaction_amount, customer_payment_time, remarks } = req.body;
    const err = validationResult(req);
    // 如果验证错误，empty不为空
    if (!err.isEmpty()) {
        // 获取错误信息
        const [{ msg }] = err.errors;
        // 抛出错误，交给我们自定义的统一异常处理程序进行错误返回 
        next(boom.badRequest(msg));
    } else {
        let querySQlText = `
            UPDATE customerpool 
            SET customer_budget = '${customer_budget}',
                customer_customized = '${customer_customized}',
                customer_identity = '${customer_identity}',
                customer_inquiry_time = '${customer_inquiry_time}',
                customer_intention = '${customer_intention}',
                customer_issues = '${customer_issues}',
                customer_name = '${customer_name}',
                customer_nickname = '${customer_nickname}',
                customer_operation_area = '${customer_operation_area}',
                customer_phone = '${customer_phone}',
                customer_products = '${customer_products}',
                customer_purpose = '${customer_purpose}',
                customer_quote = '${customer_quote}',
                customer_sale = '${customer_sale}',
                customer_source = '${customer_source}',
                customer_status = '${customer_status}',
                customer_worry = '${customer_worry}',
                customer_transaction_amount='${customer_transaction_amount}',
                customer_payment_time='${customer_payment_time}',
                remarks = '${remarks != 'null' ? remarks : ''}'
            WHERE
                id = ${id};INSERT INTO operation_record (user_code,type,operation) SELECT '${user_name}','2','对客户名为：${customer_name},手机号为：${customer_phone}的这条数据做了修改' from customerpool where id='${id}';
            `;
        console.log(querySQlText)
        querySql(querySQlText).then(data => {
            res.json({
                code: CODE_SUCCESS,
                msg: '修改成功',
                data: null
            })
        }).catch(error => {
            console.log(error)
        })
    }
}

/**
 * @description: 处理导入Excel数据
 * @param {*}
 * @return {*}
 */
function newExcelData(data) {
    let newData = data;
    for (let i = 0; i < newData.length; i++) {
        if (newData[i].customer_intention == '低') {
            newData[i].customer_intention = 1
        } else if (newData[i].customer_intention == '中') {
            newData[i].customer_intention = 2
        } else if (newData[i].customer_intention == '高') {
            newData[i].customer_intention = 3
        } else {
            newData[i].customer_intention = 4
        }

        if (newData[i].customer_products == '行业无人机系列') {
            newData[i].customer_products = 1
        } else if (newData[i].customer_products == '植保无人机系列') {
            newData[i].customer_products = 2
        } else if (newData[i].customer_products == '植保无人机10L') {
            newData[i].customer_products = 3
        } else if (newData[i].customer_products == '植保无人机16L') {
            newData[i].customer_products = 4
        } else if (newData[i].customer_products == '植保无人机22L') {
            newData[i].customer_products = 5
        } else if (newData[i].customer_products == '植保无人机25L') {
            newData[i].customer_products = 6
        } else if (newData[i].customer_products == '植保无人机30L') {
            newData[i].customer_products = 7
        } else if (newData[i].customer_products == '消防无人机灭火弹') {
            newData[i].customer_products = 8
        } else if (newData[i].customer_products == '消防无人机灭火罐') {
            newData[i].customer_products = 9
        } else if (newData[i].customer_products == '消防无人机水基灭火弹') {
            newData[i].customer_products = 10
        } else {
            newData[i].customer_products = 11
        }

        if (newData[i].customer_status == '跟进中') {
            newData[i].customer_status = 1
        } else if (newData[i].customer_status == '已付款') {
            newData[i].customer_status = 2
        } else if (newData[i].customer_status == '已发货') {
            newData[i].customer_status = 3
        } else if (newData[i].customer_status == '已收货') {
            newData[i].customer_status = 4
        } else if (newData[i].customer_status == '交易完成') {
            newData[i].customer_status = 5
        } else if (newData[i].customer_status == '退款中') {
            newData[i].customer_status = 6
        } else {
            newData[i].customer_status = 7
        }

        if (newData[i].customer_source == '淘宝') {
            newData[i].customer_source = 1
        } else if (newData[i].customer_source == '1688') {
            newData[i].customer_source = 2
        } else if (newData[i].customer_source == '阿里国际站') {
            newData[i].customer_source = 3
        } else {
            newData[i].customer_source = 4
        }

        if (newData[i].customer_quote == '是') {
            newData[i].customer_quote = 0
        } else {
            newData[i].customer_quote = 1
        }

        if (newData[i].customer_customized == '是') {
            newData[i].customer_customized = 0
        } else {
            newData[i].customer_customized = 1
        }

        if (newData[i].customer_identity == '农民') {
            newData[i].customer_identity = 1
        } else if (newData[i].customer_identity == '经销商') {
            newData[i].customer_identity = 2
        } else {
            newData[i].customer_identity = 3
        }
    }
    return newData;
}

/**
 * @description: 线上客户列表查询
 * @param {*} req
 * @param {*} res
 * @return {*}
 */
function queryOnlineCustomers(req, res, next) {
    // let { user_code, type, operation, create_data, remark } = req.body;
    let { customer_sale, customer_intention, customer_products, customer_source, customer_phone, customer_status, pageSize, pageNo } = req.body;
    const err = validationResult(req);
    // 如果验证错误，empty不为空
    if (!err.isEmpty()) {
        // 获取错误信息
        const [{ msg }] = err.errors;
        // 抛出错误，交给我们自定义的统一异常处理程序进行错误返回 
        next(boom.badRequest(msg));
    } else {
        let { status } = req.query;
        // 默认值
        pageSize = pageSize ? pageSize : 10;
        pageNo = pageNo ? pageNo : 1;
        status = (status || status == 0) ? status : null;
        let intentionSQL = `AND customer_intention IN ( SELECT id FROM customer_intention WHERE id =${customer_intention})`
        let productsSQL = `AND customer_products IN ( SELECT id FROM customer_products WHERE id =${customer_products})`
        let statusSQL = `AND customer_status IN ( SELECT id FROM customer_status WHERE id =${customer_status})`
        let phoneSQL = `AND customer_phone =${customer_phone}`
        let saleSQL = `AND customer_sale ='${customer_sale}'`
        let query = `SELECT
                        id,
                        customer_budget,
                        customer_customized,
                        customer_identity,
                        customer_inquiry_time,
                        customer_intention,
                        customer_issues,
                        customer_name,
                        customer_nickname,
                        customer_operation_area,
                        customer_phone,
                        customer_products,
                        customer_purpose,
                        customer_quote,
                        customer_sale,
                        customer_source,
                        customer_status,
                        customer_worry,
                        customer_transaction_amount,
                        customer_payment_time,
                        remarks 
                    FROM
                        customerpool
                        ${!customer_intention && !customer_products && !customer_source && !customer_status && !customer_phone && !customer_sale ? '' : 'where'} 
                        customer_source in(1,2,3)
                        ${!customer_intention ? '' : intentionSQL} 
                        ${!customer_products ? '' : productsSQL} 
                        ${!customer_status ? '' : statusSQL} 
                        ${!customer_phone ? '' : phoneSQL}
                        ${!customer_sale ? '' : saleSQL}
                    `;
        console.log(query)
        querySql(query)
            .then(data => {
                // console.log('任务列表查询===', data);
                if (!data || data.length === 0) {
                    res.json({
                        code: 200,
                        msg: '暂无数据',
                        data: []
                    })
                } else {

                    // 计算数据总条数
                    let total = data.length;
                    // 分页条件 (跳过多少条)
                    let n = (pageNo - 1) * pageSize;
                    // 拼接分页的sql语句命令
                    if (status) {
                        // let query_1 = `select d.id, d.title, d.content, d.status, d.is_major, d.gmt_create, d.gmt_expire from sys_task d where status='${status}' order by d.gmt_create desc`;
                        let query_1 = `SELECT
                                        customer_budget,
                                        customer_customized,
                                        customer_identity,
                                        customer_inquiry_time,
                                        customer_intention,
                                        customer_issues,
                                        customer_name,
                                        customer_nickname,
                                        customer_operation_area,
                                        customer_phone,
                                        customer_products,
                                        customer_purpose,
                                        customer_quote,
                                        customer_sale,
                                        customer_source,
                                        customer_status,
                                        customer_worry,
                                        customer_transaction_amount,
                                        customer_payment_time,
                                        remarks 
                                    FROM
                                        customerpool
                                    WHERE status='${status}' order by customer_inquiry_time desc`;
                        querySql(query_1)
                            .then(result_1 => {
                                console.log('分页1===', result_1);
                                if (!result_1 || result_1.length === 0) {
                                    res.json({
                                        code: CODE_SUCCESS,
                                        msg: '暂无数据',
                                        data: null
                                    })
                                } else {
                                    let query_2 = query_1 + ` limit ${n} , ${pageSize}`;
                                    querySql(query_2)
                                        .then(result_2 => {
                                            console.log('分页2===', result_2);
                                            if (!result_2 || result_2.length === 0) {
                                                res.json({
                                                    code: 200,
                                                    msg: '暂无数据',
                                                    data: []
                                                })
                                            } else {
                                                res.json({
                                                    code: CODE_SUCCESS,
                                                    msg: '查询数据成功',
                                                    data: {
                                                        rows: result_2,
                                                        total: result_1.length,
                                                        pageNo: parseInt(pageNo),
                                                        pageSize: parseInt(pageSize),
                                                    }
                                                })
                                            }
                                        })
                                }
                            })
                    } else {
                        // let query_3 = query + ` order by d.gmt_create desc limit ${n} , ${pageSize}`;
                        let query_3 = query + ` order by customer_inquiry_time desc limit ${n} , ${pageSize}`;
                        querySql(query_3)
                            .then(result_3 => {
                                console.log('分页2===', result_3);
                                if (!result_3 || result_3.length === 0) {
                                    res.json({
                                        code: 200,
                                        msg: '暂无数据',
                                        data: []
                                    })
                                } else {
                                    res.json({
                                        code: CODE_SUCCESS,
                                        msg: '查询数据成功',
                                        data: {
                                            rows: result_3,
                                            total: total,
                                            pageNo: parseInt(pageNo),
                                            pageSize: parseInt(pageSize),
                                        }
                                    })
                                }
                            })
                    }
                }
            })
    }
}
module.exports = {
    queryCustomerPool,
    delectCustomerPoolItem,
    updateCustomerPoolItem,
    importMultipleData,
    queryOnlineCustomers
}
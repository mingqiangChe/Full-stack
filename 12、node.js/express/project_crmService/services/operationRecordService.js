//操作记录表
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
 * @description: 操作记录列表查询
 * @param {*} req
 * @param {*} res
 * @return {*}
 */
function queryOperationRecord(req, res, next) {
    // let { user_code, type, operation, create_data, remark } = req.body;
    let { pageSize, pageNo } = req.body;
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
        let query = `SELECT
        id,user_code, type, operation, create_data, remark
          FROM operation_record`;
        querySql(query)
            .then(data => {
                // console.log('任务列表查询===', data);
                if (!data || data.length === 0) {
                    res.json({
                        code: CODE_ERROR,
                        msg: '暂无数据',
                        data: null
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
                        id,user_code, type, operation, create_data, remark
                          FROM operation_record
                    WHERE status='${status}' order by create_data desc`;
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
                        let query_3 = query + ` order by create_data desc limit ${n} , ${pageSize}`;
                        querySql(query_3)
                            .then(result_3 => {
                                console.log('分页2===', result_3);
                                if (!result_3 || result_3.length === 0) {
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
    queryOperationRecord
}
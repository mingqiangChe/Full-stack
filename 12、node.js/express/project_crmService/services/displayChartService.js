const { querySql, queryOne } = require('../utils/index');
const boom = require('boom');
const {
    CODE_ERROR,
    CODE_SUCCESS,
} = require('../utils/constant');
const { body, validationResult } = require('express-validator');
const session = require('express-session');
const { ValidatorsImpl } = require('express-validator/src/chain');


/**
 * @description: 图表 昨日销售金额  昨日成交订单数
 * @param {*} req
 * @param {*} res
 * @return {*}
 */
function queryYesterdayPerformance(req, res, next) {
    console.log(req.body)
    const err = validationResult(req);
    // 如果验证错误，empty不为空
    if (!err.isEmpty()) {
        // 获取错误信息
        const [{ msg }] = err.errors;
        // 抛出错误，交给我们自定义的统一异常处理程序进行错误返回 
        next(boom.badRequest(msg));
    } else {
        // let hh=new Date();
        // let zz=hh.toLocaleDateString(); //2021/8/6
        // let timedata =zz.split('/').join('-')//2021-8-6
        // console.log(timedata,'时间');

        let myDate = new Date();
        let Y = myDate.getFullYear();
        let M = myDate.getMonth() + 1;
        let D = myDate.getDate() - 1;
        let n = Y.toString();
        let y = M.toString();
        let r = D.toString();
        let arr = [n, y, r]
        let dataTime = arr.join("-")
        console.log(dataTime);
        let querySQlText = `
        SELECT
        id,
        customer_transaction_amount
    FROM
        customerpool
    WHERE
        customer_status in (SELECT id FROM customer_status WHERE id=2)
        and customer_payment_time ='${dataTime}'
            `;
        querySql(querySQlText).then(data => {
            let dataNum = data.length;
            var dataPrice = '';
            for (let i = 0; i < data.length; i++) {
                console.log(typeof(data[i].customer_transaction_amount));
                dataPrice = (dataPrice - 0) + (data[i].customer_transaction_amount);
            }
            console.log(dataPrice);
            res.json({
                code: CODE_SUCCESS,
                msg: '昨日订单信息查询成功',
                data: {
                    dataNum,
                    dataPrice
                }
            })
        }).catch(error => {
            console.log(error)
        })
    }
}

/**
 * @description: 图表 今日销售金额  今日成交订单数
 * @param {*} req
 * @param {*} res
 * @return {*}
 */
function queryTodayPerformance(req, res, next) {
    console.log(req.body)
    const err = validationResult(req);
    // 如果验证错误，empty不为空
    if (!err.isEmpty()) {
        // 获取错误信息
        const [{ msg }] = err.errors;
        // 抛出错误，交给我们自定义的统一异常处理程序进行错误返回 
        next(boom.badRequest(msg));
    } else {
        // let hh=new Date();
        // let zz=hh.toLocaleDateString(); //2021/8/6
        // let timedata =zz.split('/').join('-')//2021-8-6
        // console.log(timedata,'时间');

        let myDate = new Date();
        let Y = myDate.getFullYear();
        let M = myDate.getMonth() + 1;
        let D = myDate.getDate();
        let n = Y.toString();
        let y = M.toString();
        let r = D.toString();
        let arr = [n, y, r]
        let dataTime = arr.join("-")
        console.log(dataTime);
        let querySQlText = `
        SELECT
        id,
        customer_transaction_amount
    FROM
        customerpool
    WHERE
        customer_status in (SELECT id FROM customer_status WHERE id=2)
        and customer_payment_time ='${dataTime}'
            `;
        querySql(querySQlText).then(data => {
            let dataNum = data.length;
            var dataPrice = '';
            for (let i = 0; i < data.length; i++) {
                console.log(typeof(data[i].customer_transaction_amount));
                dataPrice = (dataPrice - 0) + (data[i].customer_transaction_amount);
            }
            console.log(dataPrice);
            res.json({
                code: CODE_SUCCESS,
                msg: '今日订单信息查询成功',
                data: {
                    dataNum,
                    dataPrice
                }

            })
        }).catch(error => {
            console.log(error)
        })
    }
}

/**
 * @description: 图表 七天每日总销售金额分析表
 * @param {*} req
 * @param {*} res
 * @return {*}
 */
function querySevenDaysADay(req, res, next) {
    console.log(req.body)
    const err = validationResult(req);
    // 如果验证错误，empty不为空
    if (!err.isEmpty()) {
        // 获取错误信息
        const [{ msg }] = err.errors;
        // 抛出错误，交给我们自定义的统一异常处理程序进行错误返回 
        next(boom.badRequest(msg));
    } else {

        let myDate = new Date();
        let Y = myDate.getFullYear();
        let M = myDate.getMonth() + 1;
        // let D = myDate.getDate();
        // let DA =myDate.getDate()-1;
        // let DB =myDate.getDate()-2;
        // let DC =myDate.getDate()-3;
        // let DD =myDate.getDate()-4;
        // let DE =myDate.getDate()-5;
        // let DF =myDate.getDate()-6;

        let n = Y.toString();
        let y = M.toString();
        // let r = D.toString();
        // let arr = [n, y, r]
        // let dataTime = arr.join("-")

        // console.log(dataTime,'时间格式');
        // select id,customer_payment_time,customer_transaction_amount from customerpool where date_sub(CURDATE(),INTERVAL 7 DAY) <= DATE(customer_payment_time) and customer_status in (SELECT id FROM customer_status WHERE id=2)
        let querySQlText = `
        select customer_payment_time,sum(customer_transaction_amount) as sale_money,count(*) as count from customerpool where date_sub(CURDATE(),INTERVAL 7 DAY) < DATE(customer_payment_time) and customer_status in (SELECT id FROM customer_status WHERE id=2) GROUP BY customer_payment_time 
            `;
        querySql(querySQlText).then(data => {
            var dataAggregate = [

            ];
            console.log(data, 'oooooooooooooooooo');
            for (var i = 0; i <= 6; i++) {
                let hh = myDate.getDate() - i;
                let arr = [n, y, hh]
                let dataTime = arr.join("-")
                let kk = {
                    "customer_payment_time": dataTime,
                    "sale_money": 0,
                    "count": 0
                }
                dataAggregate.push(kk)
            }

            for (var i = 0; i < dataAggregate.length; i++) {
                for (var z = 0; z < data.length; z++) {
                    if (dataAggregate[i].customer_payment_time == data[z].customer_payment_time) {
                        dataAggregate[i].sale_money = data[z].sale_money;
                        dataAggregate[i].count = data[z].count;
                    }
                }
            }
            console.log(dataAggregate);
            // let last = -1;
            // let lastNum = 0;
            // let result = [];
            // while(data.length>0){
            //     for(let i = 0;i<data.length;i++){
            //         if(i==0&&last==-1){
            //             last = data[i].customer_payment_time;
            //             lastNum = data[i].customer_transaction_amount;
            //             data.splice(i,1);
            //             i--;
            //             continue;
            //         }
            //         let temp = data[i];
            //         if(temp.customer_payment_time==last){
            //             lastNum=lastNum+ temp.customer_transaction_amount; 
            //             data.splice(i,1);
            //             i--;
            //         }
            //     }
            //     result.push( {customer_transaction_amount:lastNum,customer_payment_time:last} );
            //     last = -1;
            //     lastNum = 0;
            // }
            // console.log(result);

            res.json({
                code: CODE_SUCCESS,
                msg: '七日订单信息查询成功',
                data:
                // result
                    dataAggregate
            })
        }).catch(error => {
            console.log(error)
        })
    }
}

/**
 * @description: 图表 一年每月总销售金额分析表
 * @param {*} req
 * @param {*} res
 * @return {*}
 */
function queryEveryMonthOfTheYear(req, res, next) {
    console.log(req.body)
    const err = validationResult(req);
    // 如果验证错误，empty不为空
    if (!err.isEmpty()) {
        // 获取错误信息
        const [{ msg }] = err.errors;
        // 抛出错误，交给我们自定义的统一异常处理程序进行错误返回 
        next(boom.badRequest(msg));
    } else {
        let myDate = new Date();
        let Y = myDate.getFullYear();
        let D = myDate.getDate();
        let n = Y.toString();
        let r = D.toString();
        let querySQlText = `
        SELECT SUM(customer_transaction_amount)AS price, MONTH(customer_payment_time) AS months FROM customerpool WHERE customer_status in (SELECT id FROM customer_status WHERE id=2) GROUP BY months 
            `;
        querySql(querySQlText).then(data => {
            let dataAggregate = [

            ];
            console.log(data, 'oooooooooooooooooo');
            for (var i = 1; i <= 12; i++) {
                let kk = {
                    "months": i,
                    "price": 0
                }
                dataAggregate.push(kk)
            }

            for (var i = 1; i < dataAggregate.length; i++) {
                for (var z = 0; z < data.length; z++) {
                    if (dataAggregate[i].months == data[z].months) {
                        dataAggregate[i].months = data[z].months;
                        dataAggregate[i].price = data[z].price;
                    }
                }
            }
            console.log(dataAggregate);


            res.json({
                code: CODE_SUCCESS,
                msg: '一年每月订单信息查询成功',
                data: dataAggregate
            })
        }).catch(error => {
            console.log(error)
        })
    }
}

/**
 * @description: 图表 各产品总销售金额、数量分析表
 * @param {*} req
 * @param {*} res
 * @return {*}
 */
function queryEveryProuducts(req, res, next) {
    console.log(req.body)
    const err = validationResult(req);
    // 如果验证错误，empty不为空
    if (!err.isEmpty()) {
        // 获取错误信息
        const [{ msg }] = err.errors;
        // 抛出错误，交给我们自定义的统一异常处理程序进行错误返回 
        next(boom.badRequest(msg));
    } else {
        // console.log(dataTime);
        let querySQlText = `
        select customer_products,sum(customer_transaction_amount) as sale_money,count(*) as count from customerpool WHERE customer_status in (SELECT id FROM customer_status WHERE id=2) GROUP BY customer_products 
            `;
        querySql(querySQlText).then(data => {
            let dataAggregate = [

            ];
            console.log(data, 'oooooooooooooooooo');
            for (var i = 1; i <= 11; i++) {
                let kk = {
                    "customer_products": i,
                    "sale_money": 0,
                    "count": 0
                }
                dataAggregate.push(kk)
            }

            for (var i = 1; i < dataAggregate.length; i++) {
                for (var z = 0; z < data.length; z++) {
                    if (dataAggregate[i].customer_products == data[z].customer_products) {
                        dataAggregate[i].customer_products = data[z].customer_products;
                        dataAggregate[i].sale_money = data[z].sale_money;
                        dataAggregate[i].count = data[z].count;
                    }
                }
            }
            console.log(dataAggregate);
            res.json({
                code: CODE_SUCCESS,
                msg: '产品信息查询成功',
                data: dataAggregate
            })
        }).catch(error => {
            console.log(error)
        })
    }
}

module.exports = {
    queryYesterdayPerformance,
    queryTodayPerformance,
    querySevenDaysADay,
    queryEveryMonthOfTheYear,
    queryEveryProuducts
}
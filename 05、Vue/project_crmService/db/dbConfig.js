/*
 * @Author: your name
 * @Date: 2022-01-06 15:13:29
 * @LastEditTime: 2022-01-06 15:13:29
 * @LastEditors: your name
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /Full-stack/05、Vue/project_crmService/db/dbConfig.js
 */
// mysql 数据库基础配置
// 数据库连接
const mysql = {
    host: 'localhost', // 主机名称，一般是本机  
    port: '3306', // 数据库的端口号，如果不设置，默认是3306
    user: 'root', // 创建数据库时设置用户名
    password: 's', // 创建数据库时设置的密码
    database: 'hq', // 创建的数据库
    connectTimeout: 10000, // 连接超时
    // multipleStatements: true
    allowMultiQueries: true,
    multipleStatements: true,
}

module.exports = mysql;

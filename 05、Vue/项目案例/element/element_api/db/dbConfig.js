// mysql 数据库基础配置
// 数据库连接
const mysql = {
    host: 'localhost', // 主机名称，一般是本机  39.103.133.174
    port: '3306', // 数据库的端口号，如果不设置，默认是3306
    user: 'root', // 创建数据库时设置用户名
    password: 'Hqtcsz888.com', // 创建数据库时设置的密码
    database: 'hqtc_api', // 创建的数据库
    connectTimeout: 10000, // 连接超时
    // multipleStatements: true
    allowMultiQueries: true,
    multipleStatements: true,
}

module.exports = mysql;
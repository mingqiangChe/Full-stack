// 连接数据库操作文件
// 导入包
const mysql =require('mysql');
const conn=mysql.createConnection(config: {
    host:'127.0.0.1',
    user:'root',
    password:'root',
    database:'pdd',
    multipleStatements:true

});
conn.connect();
// 到处对应的cnn
module.exports=conn;
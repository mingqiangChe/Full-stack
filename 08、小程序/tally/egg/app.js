"use strict";
const {database_name} = require('./config/config.default')
module.exports = (app) => {
  if (app.mysql && app.mysql.query) {
    app.beforeStart(async () => {
      console.log('app,dtabase_name---',database_name);
      // 创建的数据库名
      app.database_name = database_name || "access_egg_sql";
      /**
       * 创建数据库 创建不了数据库
       */
      const create_database = `CREATE DATABASE IF NOT EXISTS ${app.database_name} DEFAULT CHARACTER SET utf8 DEFAULT COLLATE utf8_general_ci`;

      try {
        // await app.mysql.query(create_database);
      } catch (error) {
        console.log(error);
      }

      /**
       * 账单表结构
       */
      const bill = `CREATE TABLE IF NOT EXISTS \`bill\` (
  \`id\` int NOT NULL AUTO_INCREMENT COMMENT '账单id',
  \`bill_delivery_method\` varchar(20) DEFAULT NULL COMMENT '交付方式',
  \`bill_category_name\` varchar(100) DEFAULT NULL COMMENT '选中分类名称',
  \`bill_category_icon\` varchar(100) DEFAULT NULL COMMENT '选中分类图标',
  \`bill_tag\` varchar(255) DEFAULT NULL COMMENT '备注',
  \`bill_money\` decimal(10,2) NOT NULL DEFAULT '0.00' COMMENT '账单金额',
  \`create_time\` datetime DEFAULT NULL COMMENT '账单创建的时间',
  \`update_time\` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP COMMENT '账单修改的时间',
  \`create_user_id\` int NOT NULL COMMENT '某个用户创建的id',
  PRIMARY KEY (\`id\`)
) ENGINE=InnoDB AUTO_INCREMENT = 100001 DEFAULT CHARSET=utf8`;

      /**
       * 分类表结构
       */
      const category = `CREATE TABLE IF NOT EXISTS \`category\` (
  \`id\` int NOT NULL AUTO_INCREMENT COMMENT '分类id',
  \`category_name\` varchar(1000) NOT NULL COMMENT '分类标题',
  \`category_icon\` varchar(1000) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '未选中分类图标',
  \`create_user_id\` int NOT NULL COMMENT '创建用户的id',
  \`category_par\` varchar(1000) DEFAULT NULL COMMENT '分类父字段id',
  \`category_id\` varchar(1000) DEFAULT NULL COMMENT '分类字段id',
  PRIMARY KEY (\`id\`)
) ENGINE=InnoDB AUTO_INCREMENT = 100001 DEFAULT CHARSET=utf8`;

      /**
       * 用户表结构
       */
      const user = `CREATE TABLE IF NOT EXISTS \`user\` (
  \`id\` int NOT NULL AUTO_INCREMENT COMMENT '用户的唯一id',
  \`username\` varchar(60) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '用户名',
  \`openid\` varchar(150) UNIQUE NOT NULL COMMENT '微信唯一openid',
  \`session_key\` varchar(150) DEFAULT NULL COMMENT 'sessionkey',
  \`unionid\` varchar(100) DEFAULT NULL COMMENT 'unionid',
  \`create_time\` datetime DEFAULT NULL COMMENT '用户创建账号的时间',
  \`update_time\` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP COMMENT '用户近期登陆的时间',
  \`login_count\` int NOT NULL DEFAULT '0' COMMENT '用户登陆的次数',
  \`sex\` int DEFAULT '0' COMMENT '性别',
  \`avatar\` varchar(150) DEFAULT NULL COMMENT '微信头像',
  PRIMARY KEY (\`id\`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT = 100001 DEFAULT CHARSET=utf8`;

      /**
       * 自定义表结构
       */
      const user_defined = `CREATE TABLE IF NOT EXISTS \`user_defined\` (
  \`user_defined_key\` varchar(1000) NOT NULL COMMENT '自定义key',
  \`user_defined_value\` varchar(1000) NOT NULL COMMENT '自定义value',
  \`create_user_id\` int DEFAULT NULL COMMENT '创建的用户id',
  \`describe\` varchar(1000) DEFAULT NULL COMMENT '描述',
  PRIMARY KEY (\`user_defined_key\`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8`;

      const add_all_notice =
        'INSERT IGNORE INTO user_defined (user_defined_key,user_defined_value,`describe`) VALUE ("all_notice","","全局公告")';

      if (app.mysql && app.mysql.query) {
        try {
          await app.mysql.query("SET autocommit = 0");
          await app.mysql.query("START TRANSACTION");
          // ---------------- 建表 ---------------
          await app.mysql.query(`USE ${app.database_name}`);
          await app.mysql.query(user);
          await app.mysql.query(user_defined);
          await app.mysql.query(category);
          await app.mysql.query(bill);
          // ---------------- 建全局数据 ---------------

          await app.mysql.query(add_all_notice); // 添加所有人的公告
          // await app.mysql.query('SET autocommit = 0');
          // await app.mysql.query('SET autocommit = 0');
          // await app.mysql.query('SET autocommit = 0');
          // await app.mysql.query('SET autocommit = 0');
          // await app.mysql.query('SET autocommit = 0');
          // await app.mysql.query('SET autocommit = 0');
          // await app.mysql.query('SET autocommit = 0');
          // await app.mysql.query('SET autocommit = 0');
          // await app.mysql.query('SET autocommit = 0');
          // await app.mysql.query('SET autocommit = 0');
          await app.mysql.query("COMMIT");
          await app.mysql.query("SET autocommit = 1");
        } catch (error) {
          if (error) {
            console.log("报错了：", error);
            await app.mysql.query("ROLLBACK");
            await app.mysql.query("SET autocommit = 1");
          }
        }
      } else {
        console.log("压根没走进去");
      }
    });
  }
};

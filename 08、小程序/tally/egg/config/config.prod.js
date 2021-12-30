/* eslint valid-jsdoc: "off" */

"use strict";

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = (appInfo) => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = (exports = {});

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + "_1635516887739_6219";

  // csrf enable false
  config.security = {
    csrf: {
      enable: false,
    },
  };
  //ejs view
  config.view = {
    mapping: {
      ".html": "ejs",
    },
  };
  //自定义jwt
  config.jwt = {
    secret: "rightsun",
  };
  config.ejs = {};

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
    password: "123456",
  };
  exports.mysql = {
    client: {
      host: "172.18.28.219",
      port: "3306",
      user: "root",
      password: "q4956225",
      database: "access_egg_sql",
      dateStrings: true, //解决时间格式
      multipleStatements: true, //开启多条查询语句
    },
    app: true,
    agent: false,
  };
  // HTTPS
  // config.cluster = {
  //   https: {
  //   key: path.join(__dirname,'./xxx.key'), // https 证书绝对目录
  //   cert: path.join(__dirname,'./xxx.crt') // https 证书绝对目录
  //   }
  // };
  return {
    ...config,
    ...userConfig,
  };
};

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
      port: "3305",
      user: "admin",
      password: "admin",
      database: "access_egg_sql",
      dateStrings: true, //解决时间格式
      multipleStatements: true, //开启多条查询语句
    },
    app: true,
    agent: false,
  };
  return {
    ...config,
    ...userConfig,
  };
};

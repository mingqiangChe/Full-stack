import Sequelize from 'sequelize';
import Table from './SqlTable'
import config from '../config/mysql_config';
const sequelize = new Sequelize(config.mysql.databaseName, config.mysql.user, config.mysql.password, {
  host: config.mysql.host,
  dialect: config.mysql.dialect,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  timezone: '+08:00'
});

// 初始化数据表
const tableExample = new Table(Sequelize, sequelize);
export { tableExample, sequelize, Sequelize };
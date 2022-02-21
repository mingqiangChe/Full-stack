import { sequelize, tableExample } from '../mysql';
export default class Test {
    /**
  * mysql原声查询
  */
    async addTest(info) {
        return tableExample.testTable.create(info, {
            logging: false
        });
    }
 
} 
import {sequelize, tableExample} from '../mysql';
export default class User { /**
  * mysql原声查询
  */
    addUser(info) {
        return tableExample.userTable.create(info, {logging: false});
    }
    getUser(attributes, where) {
        return tableExample.userTable.findAll({attributes, where});
    }
    updateUser(info, where) {
        return tableExample.userTable.update(info,{where});
    }
}

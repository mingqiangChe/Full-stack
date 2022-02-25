import { sequelize, tableExample } from '../mysql';
export default class Note {
    /**
  * mysql原声查询
  */
    async addNote(info) {
        return tableExample.noteTable.create(info, {
            logging: false
        });
    }
 
} 
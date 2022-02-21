import {sequelize, tableExample} from '../mysql';

export default class Blog { /**
    * mysql原声查询
    */
    async addBlog(info) {
        return tableExample.blogTable.create(info, {logging: false});
    }
    getBlog(attributes, where) {
        return tableExample.blogTable.findAll({attributes, where});
    }
    updateBlog(info, where) {
        return tableExample.blogTable.update(info, {where});
    }
    deleteBlog(where) {
        return tableExample.blogTable.destory({where});
    }
    findAndCountAll(attributes,where,offset,limit,){
        return tableExample.blogTable.findAndCountAll({
            offset,limit,where,attributes
        })
    }
}

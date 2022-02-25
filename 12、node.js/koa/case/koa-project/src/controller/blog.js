import Blog from '../models/blog'
import {sequelize, tableExample} from '../mysql';
import paramJudge from '../utils/param';
import returnValue from '../utils/returnValue';

var blog = new Blog()
const blogController = {
    async addBlog(ctx, next) {
        const data = ctx.request.body
        const uid = ctx.request.header.uid
        await paramJudge(data, 'note_id', 'brief', 'title', 'ext_info').then(result => {
            if (result != 'true') {
                throw {
                    code : 1003,
                    message : result
                };
            }
        })
        await blog.addBlog({
            ... data,
            uid
        }).then(r => {
            returnValue.success(ctx)
        }).catch(err => {
            console.log(err, 11);
            throw err
        })

    },
    async pageBlog(ctx, next) {
        const data = ctx.query
        const uid = ctx.request.header.uid
        const limit = parseInt(data.size) || 10
        const offset = data.page ? (data.page - 1) * limit : 0;
        let pageInfo = await blog.findAndCountAll(['id','title','content','note_id','uid','brief','publish','updatedAt'],{
            uid:uid
        },offset,limit)
        if(pageInfo){
            returnValue.success(ctx,pageInfo)
        }
    }
}
export default blogController

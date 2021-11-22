let express= require('express');

// 加载路由
let router =express.Router();
const conn=require('./db');

// 查询数据
router.get('/api/getUserMsg',(req,res))=>{
    let sqlStr ='select *from usermsg';
    conn.query(sqlStr,(err,results)=>{
        if(err){
            res.json({code:1,msg:"获取数据失败"})
        }else{
            res.json({code:0,usermsg:result})
        }
    })
}
// 插入数据
router.post('/api/InsertUserMsg',(req,res))=>{
    conn.query('INSERT INTO usermsg SET ?',req.body,(err,results)=>{
        if(err){
            res.json({code:1,msg:"插入数据失败"})
        }else{
            res.json({code:0,usermsg:'插入成功'})
        }
    })
}
// 删除数据
router.post('/api/delUserMsg',(req,res))=>{
    conn.query('DELETE FROM usermsg WHERE id=?',[req.body.id],(err,results)=>{
        if(err){
            res.json({code:1,msg:"删除数据失败"})
        }else{
            res.json({code:0,usermsg:'删除成功'})
        }
    })
}
module.exports=router;
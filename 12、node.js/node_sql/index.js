let express =require('express');
const bodyParser = require('body-parser')
let app=express()
const router =require('./router')
// 设置跨域访问
app.use(require('cors')());

app.use(bodyParser.urlencoded({extended:false}))

app.use(bodyParser.json())
app.use(fn:'/',router)

app.listen(3000,(req,res)=>{
    console.log('http://localhost:3000');
})

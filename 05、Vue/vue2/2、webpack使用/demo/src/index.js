// 1.使用es6导入语法，导入jQuery
import $ from 'jquery'

import './index.css'
import './index.less'

// 导入图片动态赋值
import logo from './image/2.jpg'
// 定义jq
$('.box').attr('src', logo)

// 2.定义jq入口函数
$(function () {
    // 3.实现奇偶行变色
    $('li:odd').css('background-color', 'blue')
    $('li:even').css('background-color', 'green')
})



// 1．定义了名为info 的装饰器
function info(target) {
    // 2．为目标添加静态属性info
    target.info = 'Person info'
}
//3．为Person类应用info 装饰器
@info
class Person { }
// 4．打印 Person的静态属性info
console.log(Person.info)

// ⭐⭐⭐不生效 无法使用高级语法 需要借助webpack支持
// 类型注解:是一种轻量级的为函数或者变量添加的约束
(() => {
    // str string类型
    function showMsg(str: string) {
        return '窗前明月光' + str
    }
    var msg = '疑是地上床'
    // msg 数组类型
    // var msg = [10, 20, 30]
    //智能错误提示
    console.log(showMsg(msg))//类型“number[]”的参数不能赋给类型“string”的参数。

})()
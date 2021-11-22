// 函数重载:函数名字相同，函数的参数及个数不同
(() => {
    // 定义一个函数
    // 需求:我们有一个add函数，它可以接收2个string类型的参数进行拼接，也可以接收2个number类型的参数进行相加

    // 函数重载声明
    function add(x: number, y: number): number
    function add(x: string, y: string): string

    // 函数声明
    function add(x: string | number, y: string | number): string | number {
        if (typeof x === 'string' && typeof y === 'string') {
            return x + y  //字符传拼接
        } else if (typeof x === 'number' && typeof y === 'number') {
            return x + y  //数字相加
        }

    }

    // 函数调用
    // 两个参数字符传
    console.log(add('诸葛', '青'));
    // 两个参数数字
    console.log(add(110, 20));
    // 如果传入非法数据  ts 提示错误信息输入  函数重载声明
    // console.log(add('好', 10));
    // console.log(add(20, '坏'));
})()
// 剩余参数（rest参数）
// 剩余参数是放在函数声明的时候所在的参数的最后
(() => {
    // ...args: string[]============剩余的参数，放在了一个字符串的数组中，args里面
    function showMsg(str: string, ...args: string[]) {
        console.log(str);//a
        console.log(args);//b c d
        
    }
    showMsg('a','b','c','d')
})()
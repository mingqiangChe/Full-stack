(() => {
    //str 是string类型
    function sayhi(str: string) {
        return 'hellworld' + str
    }
    let text = '车明强'
    console.log(sayhi(text));
    
})()

//总结:ts的文件中如果直接书写js语法的代码,那么在htm1文件中直接引入ts文件,在谷歌的浏览器中是可以直接使用的
//如果ts文件中有了ts的语法代码,那么就需要把这个ts文件编译成js文件,在htm1文件中引入js的文件来使用
// ts文件中的函数中的形参,如果使用了某个类型进行修饰,那么最终在编译的js文件中是没有这个类型的
// ts文件中的变量使用的是1et进行修饰,编译的js文件中的修饰符就变成了var 了
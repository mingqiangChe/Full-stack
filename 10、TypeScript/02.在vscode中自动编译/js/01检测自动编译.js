(function () {
    function sayhi(str) {
        return '1433223' + str;
    }
    var text = '元哥';
    console.log(sayhi(text));
})();
//自动编译ts文件
// 1). 生成配置文件tsconfig.json
//     tsc --init
// 2). 修改tsconfig.json配置
//     "outDir": "./js",
//     "strict": false,
// 3). 启动监视任务:
//     终端 -> 运行任务 -> 监视tsconfig.json

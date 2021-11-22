const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

const isProd = process.env.NODE_ENV === 'production' // 是否生产环境

function resolve(dir) {
    return path.resolve(__dirname, '..', dir)
}

module.exports = {
    //判断开发还是生产模式
    mode: isProd ? 'production' : 'development',
    entry: {
        // 程序主入口目录
        app: './src/main.ts'
    },

    output: {
        // 把打包后的放在dist目录
        path: resolve('dist'),
        filename: '[name].[contenthash:8].js'
    },

    module: {
        rules: [
            {
                // 针对src下ts和tsx处理文件操作
                test: /\.tsx?$/,
                use: 'ts-loader',
                include: [resolve('src')]
            }
        ]
    },

    plugins: [
        // 把以前dist目录打包后文件清理掉
        new CleanWebpackPlugin({}),
        // 针对当前public下index.henl进行打包
        new HtmlWebpackPlugin({
            template: './public/index.html'
        })
    ],
    // 针对三者扩展名进行处理
    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    },
    // 哪行代码出现错误提示信息
    devtool: isProd ? 'cheap-module-source-map' : 'eval-cheap-source-map',
    // 启动之后在  自动打开
    devServer: {
        host: 'localhost', // 主机名
        stats: 'errors-only', // 打包日志输出输出错误信息
        port: 8081,
        open: true
    }
}
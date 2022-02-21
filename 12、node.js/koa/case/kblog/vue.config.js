const CompressionWebpackPlugin = require('compression-webpack-plugin')
module.exports = {
    publicPath: '/',
    lintOnSave: true,
    configureWebpack: (config) => { // 生产环境取消 console.log
        if (process.env.NODE_ENV === 'production') {
            config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true;
            // 公共代码抽离
            // config.optimization = {
            //     splitChunks: {
            //         cacheGroups: {
            //             vendor: {
            //                 chunks: 'all',
            //                 test: /node_modules/,
            //                 name: 'vendor',
            //                 minChunks: 1,
            //                 maxInitialRequests: 5,
            //                 minSize: 0,
            //                 priority: 100
            //             },
            //             common: {
            //                 chunks: 'all',
            //                 test: /[\\/]src[\\/]js[\\/]/,
            //                 name: 'common',
            //                 minChunks: 2,
            //                 maxInitialRequests: 5,
            //                 minSize: 0,
            //                 priority: 60
            //             },
            //             styles: {
            //                 name: 'styles',
            //                 test: /\.(sa|sc|c)ss$/,
            //                 chunks: 'all',
            //                 enforce: true
            //             },
            //             runtimeChunk: {
            //                 name: 'manifest'
            //             }
            //         }
            //     }
            // }
        }
    },
    chainWebpack: (config) => { // 忽略的打包文件
        config.when(process.env.NODE_ENV === 'production', config => {
            // 去除console.log
            // 代码压缩
            config.optimization.minimize(true)
            config.optimization.splitChunks({chunks: 'all'})
            // 移除预加载
            config.plugins.delete('prefetch')
            config.plugins.delete('preload')
            // cdn
            config.externals({
                'vue': 'Vue',
                'vue-router': 'VueRouter',
                'vuex': 'Vuex',
                'axios': 'axios',
            });
            // 配置cdn
            config.plugin('html').tap(args => {
                args[0].isProd = true
                return args
            })
            // gzip压缩
            config.plugin('CompressionWebpackPlugin').use(new CompressionWebpackPlugin({
                filename: '[path].gz[query]',
                algorithm: 'gzip',
                test: /\.js$|\.html$|\.css/, // 匹配文件名
                threshold: 10240,
                minRatio: 0.8,
                deleteOriginalAssets: true // 是否删除原文件
            }));
            // 图片压缩
            config.module.rule('images').use('image-webpack-loader').loader('image-webpack-loader').options({bypassOnDebug: true}).end()
        })

        // 浏览器适配
        const entry = config.entry('app');
        entry.add('babel-polyfill').end();
        entry.add('classlist-polyfill').end();
    },
    devServer: {
        port: 1888,
        proxy: {
            '/api': {
                changeOrigin: true,
                // 本地服务接口地址
                target: 'http://localhost:3001',
                // 远程演示服务地址,可用于直接启动项目
                ws: true,
                pathRewrite: {
                    '^/api': '/'
                }
            }
        }
    },
}
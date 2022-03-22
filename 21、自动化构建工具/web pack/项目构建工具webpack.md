# 项目构建工具webpack

* 为了简化项目构建的过程，通过使用构建工具来自动化项目构建
## webpack
* [webpack中文官网](https://webpack.docschina.org)
### 什么是webpack
* 现代javascript程序的模块打包器
* 当webpack处理应用程序时，它会递归构造一个*依赖关系图*
* 前端的所有资源都会当做模块处理，默认支持commonjs，AMD，ES6模块化语法
* 将根据模块的依赖关系进行静态分析，生成对应的静态资源
### 配置文件
* webpack.config.js 是一个node模块, 返回一个json的格式的配置对象
### 核心概念
#### 入口entry
* 用来指示webpack应该从哪个模块开始构建依赖关系图
* 入口文件默认为`src/index.js`
#### 出口output
* 用来指示webpack在哪里输出它所创建的bundle以及如何命名这些文件
* 出口文件默认为`dist/main.js`,其他文件路径默认为`dist/`
* 使用path参数配置出口路径
* 使用filename参数配置出口文件名
#### loader
* webpack本身只能加载js/json模块，如果要加载其他类型的文件(模块),就要使用对应的loader进行转换/加载
* 当加载json模块时会默认获取一个对象
* loader本身也是运行在nodejs环境中的javascript模块
* 它本身是个函数，接收源文件作为参数，返回转换结果
* loader一般以xxx-loader的方式命名，xxx表示这个loader要做的转换功能
* 在配置loader时使用`module.rules`属性，它有test与use两个参数，test用来匹配需要使用loader的对应文件，use配置需要使用哪些loader
#### 插件plugin
* 用以进行更加广泛的任务，包括打包优化，资源管理等
* 想要使用插件只需要先require这个插件然后在plugins属性对应的数组中获取这个插件的实例即可使用
### 安装
```
npm install -g webpack-cli
npm install -D webpack webpack-cli
```
### 文件结构
```
.project
  |--dist              项目构建完成后的文件所在目录
  |--src                项目源码
      |---js
      |---css
  |--webpack.config.js       grunt的配置文件
```
### 快速使用
* 命令行参数指定入口文件与出口文件
* 按照模块化的形式依次加载各个模块，然后最终输出到一个文件中，减少请求数量
```
webpack ./src/js/test1.js ./dist/js/build.js
```
* 通过配置文件加载
```javascript
const path = require('path')
module.exports = {
  entry: './src/js/index.js', //与模块加载路径规则相同，不可省略./
  output: {
    path: path.resolve(__dirname, 'dist/js'),
    filename: 'build.js'
  }
}
```
### 使用loader,plugin,webpack-dev-server的实例
```javascript
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
  entry: './src/js/test1.js', //与模块加载路径规则相同，不可省略./
  output: {
    path: path.resolve(__dirname, 'dist/js'),
    filename: 'build.js'
  },
  module: {
    rules: [{
      test: /\.css$/,       //匹配所有css文件
      use: ['style-loader', 'css-loader']     //以从右到左的顺序执行loader，前一个作用是将获取到的css文件内容以style标签的形式添加到引入入口文件的html中，后一个用来引入css文件
    },{
      test: /\.(gif|png|jpg)$/, //匹配所有图片
      use: {
        loader: 'url-loader',
        options: {
          limit: 8192       //单位为比特，小于这个大小的图片会使用base64编码放入入口文件，减少请求数量
        }
      }
    }]
  },
  plugins: [new HtmlWebpackPlugin({template: './index.html'})],   //此插件可创建以指定模板为内容的html文件，然后添加到出口文件所在目录中
  devServer: {
    contentBase: './dist/js/'     //设置访问此热加载服务器时的根路径，默认会加载index.html文件，不设置此参数会从根目录中查找
  }
}
```
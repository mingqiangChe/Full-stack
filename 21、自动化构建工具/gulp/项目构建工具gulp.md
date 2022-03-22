# 项目构建工具gulp
* 为了简化项目构建的过程，通过使用构建工具来自动化项目构建
## gulp
* [gulp官方中文参考文档](www.gulpjs.com.cn)
* 与grunt功能类似的**项目构建工具**, 也是基于nodejs的自动**任务运行器**
* 能自动化完成js/coffee/sass/less/html/image/css的合并，压缩，检查，监听，浏览器刷新，测试等任务
* gulp更高效(异步多任务), 更易于使用，插件高质量
* 基于流的操作
```
.project
    |---dist
    |---src
        |---js
        |---css
        |---less
    |---gulpfile.js
```
### 安装
```
npm install -g gulp-cli
npm install --save-dev gulp
```
### 常用插件
1. gulp-concat  合并js/css文件
2. gulp-uglify  压缩js文件
3. gulp-rename  文件重命名
4. gulp-less    编译less
5. gulp-clean-css  压缩css
6. gulp-htmlmin  压缩html
7. gulp-livereload  实时自动编译刷新,半自动
8. gulp-connect  实时自动编译刷新,服务器监听的全自动
9. open      自动打开指定链接
10. gulp-load-plugins 可以自动引入已下载好的所有gulp相关插件，无需重新引入
### 使用
#### 安装
```
npm install -g gulp
npm install --save-dev gulp gulp-rename gulp-concat gulp-uglify
```
```javascript
const {src, dest, series, parallel, watch} = require('gulp')
const $ = require('gulp-load-plugins')()
const concat = require('gulp-concat')
const rename = require('gulp-rename')
const uglify = require('gulp-uglify')
const cleanCss = require('gulp-clean-css')
const htmlmin = require('gulp-htmlmin')
const livereload = require('gulp-livereload')
const connect = require('gulp-connect')
const less = require('gulp-less')
const open = require('open') 

function js(){
    return src('src/js/*.js')
           .pipe($.concat('build.js'))
           .pipe(dest('dist/js/'))
           .pipe($.uglify())
           .pipe($.rename({suffix: '.min'}))
           .pipe(dest('dist/js/'))
           .pipe($.livereload())    //livereload插件的执行完重载
           .pipe($.connect.reload())  //connect插件的执行完重载
}

function css(){
    return src('src/css/*.css')
           .pipe($.concat('build.css'))
           .pipe($.cleanCss({compatibility: 'ie8'}))
           .pipe($.rename({suffix: '.min'}))
           .pipe(dest('dist/css/'))
           .pipe($.livereload())
           .pipe($.connect.reload())
}
function lessfunc(){
    return src('src/less/*.less')
           .pipe($.less())
           .pipe(dest('src/css/'))
           .pipe($.livereload())
           .pipe($.connect.reload())
}
function html(){
    return src('index.html')
           .pipe($.htmlmin({collapseWhitespace: true}))
           .pipe(dest('dist/'))
           .pipe($.livereload())
           .pipe($.connect.reload())
}
function live(){
    $.livereload.listen()
    watch(['src/js/*.js'], js)    //监听特定文件的修改，然后执行特定流
    watch(['src/css/*.css'], css)
    watch(['src/less/*.less'], series(lessfunc, css))
    watch(['index.html'], html)
}
function connection(){
    $.connect.server({
        root: 'dist/',
        port: 5000,
        livereload: true
    })
    watch(['src/js/*.js'], js)
    watch(['src/css/*.css'], css)
    watch(['src/less/*.less'], series(lessfunc, css))
    watch(['index.html'], html)
    open('http://localhost:5000/index.html')
}
exports.js = js
exports.css = css
exports.less = lessfunc
exports.html = html
exports.allcss = series(lessfunc, css)    //同步执行方法
exports.all = parallel(js, html, series(lessfunc, css))   //异步执行方法
exports.live = series(parallel(js, html, series(lessfunc, css)), live)
exports.connect = series(parallel(js, html, series(lessfunc, css)), connection)
```
### 

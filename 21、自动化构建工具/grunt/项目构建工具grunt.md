# 项目构建工具grunt
* 为了简化项目构建的过程，通过使用构建工具来自动化项目构建
## Grunt
* 在[grunt官网](www://grountjs.net)中contrib开头且有星号表示的插件代表是官方开发并维护的
* 其他是第三方插件
* 项目结构
```
.project
  |--build              项目构建完成后的文件所在目录
  |--src                项目源码
      |---js
      |---css
  |--Gruntfile.js       grunt的配置文件
```
### 安装
```
npm install -g grunt-cli
npm insatll --save-dev grunt
```
### 常用插件
1. grunt-contrib-clear  
2. grunt-contrib-concat  将多个js文件合并成一个
3. grunt-contrib-uglify  压缩js文件
4. grunt-contrib-jshint  js语法检查
5. grunt-contrib-cssmin  压缩css文件
### 使用
* 使用插件
#### 安装
```
npm install --save-dev grunt-contrib-concat
npm install --save-dev grunt-contrib-uglify
npm install --save-dev grunt-contrib-jshint
npm install --save-dev grunt-contrib-cssmin
npm install --save-dev grunt-contrib-watch      //真正实现自动化
```
#### 配置
```javascript
module.exports = function(grunt){
    grunt.initConfig({
        concat:{    //给指定插件进行配置，通常这里的插件名就是官网中插件名的后缀
            options: {   //可选项
                seperator: ';'  //指定使用分号来分隔不同js文件
            },
            dist:{  //此名称任意
                files: {
                    'src/js/build.js': ['src/js/test1.js', 'src/js/test2.js'],    //指定输出的js文件,指定需要合并的js文件
                }
            }
        },
        pkg: grunt.file.readJSON('package.json'),       //读取json文件方便插件中调用json文件中的属性
        uglify: {
          options: {
            banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
              '<%= grunt.template.today("yyyy-mm-dd") %> */'
          },
          my_target: {          //名称任意
            files: {
              'dist/js/build.min.js': ['src/js/build.js']
            }
          }
        },
        jshint:{
            options: {
              "curly": true,
              "eqnull": true,
              "eqeqeq": true,
              "undef": true,
              "asi": true,
              "predef": true,
              "esversion": 5,
              "globals": {          //设置需要忽略的全局变量
                "jQuery": true,
                "module": true,
                'environment': true
              }
            },
            build: {
                files: {
                src: ['Gruntfile.js', 'src/js/*.js']
                }
            }
        },
        cssmin:{
            options: {
            mergeIntoShorthands: false,
            roundingPrecision: -1
          },
          build: {      //任意名称
            files: {
              'dist/css/output.min.css': ['src/css/test1.css', 'src/css/test2.css']
            }
          }
        },
        watch: {
            scripts: { 
              files: ['src/js/*.js', 'src/css/*.css'],
              tasks: ['jshint', 'concat', 'uglify', 'cssmin'],
              options: {
                spawn: false,       //false：变量更新，只执行与修改了的文件相关的任务 true：全量更新，即无论修改哪个文件都会执行所有的任务
              },
            },
          }
    })
    grunt.loadNpmTasks('grunt-contrib-concat')  //加载插件
    grunt.loadNpmTasks('grunt-contrib-uglify')  //加载插件
    grunt.loadNpmTasks('grunt-contrib-jshint')  //加载插件
    grunt.loadNpmTasks('grunt-contrib-cssmin')  //加载插件
    grunt.loadNpmTasks('grunt-contrib-watch')
    grunt.registerTask('default', ['jshint', 'concat', 'uglify', 'cssmin'])   //注册默认执行插件, 执行任务过程是同步的按照注册的顺序执行
    grunt.registerTask('myWatch', ['default', 'watch'])   //当调用此任务时才按照这个任务包含的任务顺序执行
}
```
#### 运行
* 在命令行中执行
```
grunt concat
grunt uglify
grunt           //当注册了默认任务插件时就能省略需要执行的插件名
grunt myWatch   //调用注册的任务，此时才会监听
```
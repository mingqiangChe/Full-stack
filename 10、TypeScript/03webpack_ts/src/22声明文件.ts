// 第一种方式 ⭐不推荐
// 1 安装jquery npm install jquery
// 引入第三方库
// 2 import jQuery from 'jquery'

// 3 在jQuery.ts中配置
// 使用jquery
// 4 jQuery('选择器')
// 5 鼠标放上去提示


// 第二种方式 ⭐⭐⭐推荐
/*
当使用第三方库时，我们需要引用它的声明文件，才能获得对应的代码补全、接口提示等功能。
声明语句: 如果需要ts对新的语法进行检查, 需要要加载了对应的类型说明代码
  declare var jQuery: (selector: string) => any;
声明文件: 把声明语句放到一个单独的文件（jQuery.d.ts）中, ts会自动解析到项目中所有声明文件
下载声明文件: npm install @types/jquery --save-dev
*/

// 1   npm install @types/jquery --save-dev
import jQuery from 'jquery'
jQuery('选择器')
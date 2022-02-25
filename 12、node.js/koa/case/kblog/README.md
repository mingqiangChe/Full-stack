# Kblog
<p align="center">
  <a href="https://gitee.com/kirk958617/kblog/Fblog">
    <img src="https://gitee.com/kirk958617/kblog/badge/star.svg?theme=white" alt="star"/>
    <img src="https://gitee.com/kirk958617/kblog/badge/fork.svg" alt="fork"/>
  </a>
  <a href="https://github.com/vuejs/vue">
    <img src="https://img.shields.io/badge/vue-2.6.6-brightgreen.svg" alt="vue"/>
  </a>
    <a href="https://element.eleme.cn/2.6/#/zh-CN/component/installation">
    <img src="https://img.shields.io/badge/elementui-2.6.3-blue.svg" alt="element-ui"/>
  </a>
  <a href="https://gitee.com/kirk958617/kblog/blob/master/license">
    <img src="https://img.shields.io/github/license/mashape/apistatus.svg" alt="license"/>
  </a>
</p>
```
一个基于vue2.x+element-ui简洁的博客模板
```

<!-- ## 项目截图

### 首页（懒，博文列表都一样 :sweat_smile: ）

![首页](https://images.gitee.com/uploads/images/2019/0326/212821_d068d429_1658323.png "屏幕截图.png")

### 国际化效果（只截了一张图）

![国际化](https://images.gitee.com/uploads/images/2019/0326/213439_7719202a_1658323.png "屏幕截图.png")

### 博文页

![博文页](https://images.gitee.com/uploads/images/2019/0326/213002_d950f6fe_1658323.png "屏幕截图.png")

### 申请友链

![申请友链](https://images.gitee.com/uploads/images/2019/0326/213340_0de8aa80_1658323.png "屏幕截图.png")

### 归档（标签页与他类似）

![归档](https://images.gitee.com/uploads/images/2019/0326/213057_d1b8d6ac_1658323.png "屏幕截图.png")

### 关于页

![关于](https://images.gitee.com/uploads/images/2019/0326/213232_9b8a17df_1658323.png "屏幕截图.png") -->



## 安装
```
npm install
```
## 运行
```
npm run serve
```

## 打包
```
npm run build
```

## 部署
把build的dist文件命名为kBlog(自取)上传到服务器

### nginx配置
```
location /kBlog/ {
	root /usr/local/nginx/;#fBlog所在的更目录
	try_files $uri $uri/ /fBlog/;
}
```

## 演示
```
域名:4567/kBlog/

```

模板来源于 作者：fengziy  [https://gitee.com/fengziy/Fblog](https://gitee.com/fengziy/Fblog)
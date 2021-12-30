

## 介绍
    竞答活动助手小程序是使用云开发的在线答题小程序，无需搭建服务器，无需域名即可使用云端能力。目前该主要用于在线答题，在线模拟考试等场景

## 帮助文档

二人对战答题小程序设计分享? - 微信开放社区 https://developers.weixin.qq.com/community/develop/article/doc/000aeee8964e48ecfd6c143755b413

在线答题小程序使用帮助文档? - 微信开放社区 https://developers.weixin.qq.com/community/develop/article/doc/000c22e3f24fc8909189e48b151413

## 如何部署
    第一步：打开data目录，在云开发控制台创建集合并依次导入，第二步：修改集合权限为所有用户可读，仅创建者可读写，第三步：上传所有云函数

具体创建的集合有以下六个，①先依次创建，②再依次导入json文件，③最后修改权限
+ exams
+ historys
+ notes
+ profiles
+ questions
+ subjects
## 注意事项
     该开源小程序代码只支持云开发有一个环境的场景，多个环境下不支持。

## 云函数如何上传
    由于该小程序用到云开发，云函数是一个非常重要的知识点，这里特别强调下 如何部署 里面的第三步，上传云函数，一定不能遗漏
该小程序只需要一个云函数login，建议将原先login删掉，新建一个login云函数，会默认上传
+ login 云函数

## 题库如何导入
    目前我已开发现成工具，可以将按照固定模板的excel文件批量导入，具体可参考下面文档

在线答题小程序批量导入模板文件详解? - 微信开放社区 https://developers.weixin.qq.com/community/develop/article/doc/000866b4a28e58a1172aa6b0451413


小程序云开发如何更优雅导入数据? - 微信开放社区 https://developers.weixin.qq.com/community/develop/article/doc/0000aa9f810b38f09b5acb40151013

## 如何体验

    微信小程序搜索：知识竞赛活动，
    
![输入图片说明](https://images.gitee.com/uploads/images/2021/0709/132915_fffe68d5_1307964.jpeg "gh_cceb46e91b0c_258.jpg")

![输入图片说明](https://images.gitee.com/uploads/images/2021/0709/133316_9a6fe208_1307964.jpeg "gh_4135f4beb528_258.jpg")

### 更新记录

[CHANGELOG](./CHANGELOG.md)


## 目前已完成功能
+ 答题
+ 答题分单题模式和列表模式
+ 查看分数
+ 查看答案
+ 错题提醒
+ 查看答题历史记录
+ 查看错题记录
+ 生成海报
+ 选择题支持单选、多选


## 学习交流
   如需帮助可以联系我微信

http://file.xiaomutong.com.cn/img2020061103.jpg

![](https://images.gitee.com/uploads/images/2020/0611/140000_94a859bd_1307964.jpeg)


目前小程序已经通过审核，并且发布，大家可以体验下，在学习的过程中遇到问题，可以咨询我，微信号：xfy6369

![输入图片说明](https://images.gitee.com/uploads/images/2021/0709/132827_e4bcf3b8_1307964.jpeg "gh_cceb46e91b0c_258.jpg")


##  付费服务
   
    2020-05-25更新，如果您在答题小程序学习遇到问题，我们也提供付费服务，只需要200元便可以成为我们的付费客户，付费客户享受下面优质服务：
+ 全程无忧发布
+ 终身免费维护
+ 终身免费数据导入、导出
+ 少量需求免费定制开发
+ 后续版本免费更新
+ 小程序视频学习课程
+ 其他优质服务


## 备注
   开源版本依然永久开放，前端、后端、数据库均可访问下载，开源的初衷不会改变





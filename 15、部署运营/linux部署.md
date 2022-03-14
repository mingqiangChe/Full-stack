# linux部署

## node

安装地址 cd /usr/local/

2.1安装node

下载

解压

```
wget wget https://nodejs.org/dist/v14.17.1/node-v14.17.1-linux-x64.tar.xz
```

```
tar -xvf node-v14.17.1-linux-x64.tar.xz
```

删除

```
rm node-v14.17.1-linux-x64.tar.xz
```

配置环境变量

软连接 环境路径指向

```
ln -s /usr/local/node-v14.17.1-linux-x64/bin/node /usr/local/sbin/node
```

```
ln -s /usr/local/node-v14.17.1-linux-x64/bin/npm /usr/local/sbin/npm
```

## mysql

```
rpm -ivh https://dev.mysql.com/get/mysql80-community-release-el7-1.noarch.rpm 
```

```
yum install mysql-server
```

设置开启启动

```
systemctl enable mysqld.service
```

检查是否安装开机启动

```
systemctl list-unit-files | grep mysqld
```

设置开启服务

```
systemctl start mysqld.service
```

查看mysql默认密码

```
grep 'temporary password' /var/log/mysqld.log     
```

```
grep 'temporary password' /var/log/mysql/mysqld.log  
```

密码样例： s>OpK/ijb3ln

```
2021-11-09T09:24:27.432545Z 6 [Note] [MY-010454] [Server] A temporary password is generated for root@localhost: s>OpK/ijb3ln
```

第一次登录，输入账号和默认密码 获得不到尝试直接回车进去改密码

```
mysql -u root -p
```

输入初始密码进入<mysql>命令行

修改当前密码

```
ALTER USER 'root'@'localhost' IDENTIFIED BY 'Hqtcsz888.com';
```

用mysql远程地址连接 MySQLHost Adress ip 密码本地与远程一致

由于更改新密码，所以先退出去

exit

再次登录进去开始一下操作

```
use mysql
```

```
update user set host =’%’ where user =‘root’   //更新主机
```

root表示想要被连接的数据库的用户名 其中“%”表示允许所有机器能访问root用户 如果失败的话，有可能是因为数据库的用户名不是root，这种情况下，只需要将root改为数据库用户名就可以了。

```
ALTER USER 'root'@'%' IDENTIFIED BY 'Hqtcsz888.com' PASSWORD EXPIRE NEVER;
```

//更改加密方式

```
ALTER USER 'root'@'%' IDENTIFIED WITH mysql_native_password BY 'Hqtcsz888.com'; 
```

//更新用户密码

```
ALTER USER 'root'@'%' IDENTIFIED WITH mysql_native_password BY 'Hqtcsz888.com'; 
```

## nginx

下载压缩包

```
wget -c https://nginx.org/download/nginx-1.10.1.tar.gz
```

安装gcc环境

```
yum install gcc-c++
```

安装PCRE pcre-devel

```
yum install -y pcre pcre-devel
```

安装zlib

```
yum install -y zlib zlib-devel
```

安装Open SSL

```
yum install -y openssl openssl-devel
```

解压nginx包

```
tar -xvf nginx-1.10.1.tar.gz
```

```
cd nginx-1.10.1 
```

// 默认默认配置

```
./configure 
```

编译安装nginx

```
make
```

接下来如果提示错误检查是否是以下错误：

error: this statement may fall through [-Werror=implicit-fallthrough=] h ^= data[2] ＜＜ 16；

<https://blog.csdn.net/qq_44689970/article/details/116891874>

修改完以后再make 查看一下是否还有错误提示 若有确认是否为以下错误

linux 安装 nginx ‘struct crypt_data’ has no member named ‘current_salt’ 解决办法

<https://blog.csdn.net/humanyr/article/details/107405383>

或([(24条消息) Linux下nginx的安装_heidenghua的博客-CSDN博客](https://blog.csdn.net/heidenghua/article/details/109533591?utm_medium=distribute.pc_relevant.none-task-blog-2~default~baidujs_title~default-0.no_search_link&spm=1001.2101.3001.4242.1))

修改完以后再make 查看一下是否还有错误提示 若无则往下继续走

然后

```
make install
```

启动nginx

```
cd /usr/local/nginx/sbin
```

进入 **/usr/local/nginx/sbin**目录 输入

```
./nginx
```

即可启动

此时输入服务器地址即可访问

设置开机启动

**vim /etc/rc.local** 进入编辑页面

在底部增加一串代码 点击键盘i 进入插入模式

```
/usr/local/nginx/sbin/nginx
```

按下esc退出模式，冒号:加wq保存并退出

### 扩展

关闭

```
./nginx -s quit
```

重启nginx

```
./nginx -s reload
```

报错解决  
[(24条消息) nginx: [error] open() “/usr/local/nginx/logs/nginx.pid“ failed (2: No such file or directory)_流楚丶格念的博客-CSDN博客](https://blog.csdn.net/weixin_45525272/article/details/107980445)

```js
sudo /usr/local/nginx/sbin/nginx -c /usr/local/nginx/conf/nginx.conf

```

查看nginx进程

ps aux|grep nginx

### 配置

```js
## 此处出现了【root】
user root;
worker_processes  1;

#error_log  logs/error.log;
#error_log  logs/error.log  notice;
#error_log  logs/error.log  info;

pid        logs/nginx.pid;

events {
    worker_connections  1024;
}


http {
    include       mime.types;
    default_type  application/octet-stream;
    #log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
    #                  '$status $body_bytes_sent "$http_referer" '
    #                  '"$http_user_agent" "$http_x_forwarded_for"';

    #access_log  logs/access.log  main;

    sendfile        on;
    #tcp_nopush     on;

    #keepalive_timeout  0;
    keepalive_timeout  65;

    #gzip  on;

    server {
		# nginx的监听端口 （此处为管理后台前端地址的访问端口）
        listen       80;
        # server_name  localhost;

        #charset koi8-r;

        #access_log  logs/host.access.log  main;

        location / {
            root   /project/html/hqtc_pc;
            proxy_read_timeout 1500;  # 秒
            proxy_send_timeout 1500;
            send_timeout 1500;
            index  index.html index.htm;
        }
        location ^~ /datav {
            alias /project/html/dataV/;
        }
            # location /api/v1 {
            #    rewrite          ^/api/v1(/.*)$ $1 break;
            #    proxy_read_timeout 1500;  # 秒
            #    proxy_send_timeout 1500;
            #    send_timeout 1500;
            #    proxy_pass http://ip:90000;

            # }
        #error_page  404              /404.html;

        # redirect server error pages to the static page /50x.html
        #
        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   html;
        }
    }
    include servers/*;

}


```

## 代码上线

### 使用git

```
yum install git -g
```

```
yum install git
```

下载完成

进入 **cd /usr/local/**

```
git clone 
```

文件入口xx.js

cd 项目目录 **后台**

```
node app.js
```

### 使用xftp

## MySQL使用 逻辑流程

1.下载文件 百度网盘有 教程也有链接

mysql安装教程：<https://www.cnblogs.com/mysqlanzhuang/p/13037182.html>

1.1文件配置

1.2环境配置

2视图工具navicat 创建数据库 注意：本地访问，navicat连接主机名需为localhost

链接[https://www.jb51.net/database/710931.html#downintro2](https://app.yinxiang.com/Home.action#downintro2)
1. cmd进入/bin 开始连接数据库 修改密码 重新登录 开启数据库 作用等同于phpstudy开启数据库端口

不能关闭

@[TOC](docker学习参考文档
## 学习途径
[Docker官网：](http://www.docker.com)
[Docker中文网站：](https://www.docker-cn.com)
[Docker Hub官网： （仓库）](https://hub.docker.com)
[借鉴狂神老师b站视频以及笔记](https://space.bilibili.com/95256449?spm_id_from=333.788.b_765f7570696e666f.1)
在此，十分感谢狂神老师开源精神

# 安装
## 介绍
![在这里插入图片描述](https://img-blog.csdnimg.cn/a0ff201e635e4d34a9b1e1001099cf44.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NTg5NjEyNg==,size_16,color_FFFFFF,t_70#pic_center)


 >镜像image：

```javascript
 docker镜像就好比是模板，可以通过这个模板创建容器服务，tomcat镜像=>run运行=>tomcat01容器（提供服务器)
 通过这个镜像可以创建多个容器（最终服务运行或者项目运行就是在容器中）
```

> 容器container：

```javascript
docker利用容器技术，独立运行一个或者一个组应用，通过·镜像来创建
启动，停止，删除，基本命令    
目前就可以理解为建议linux系统，项目
```
> 仓库repository：

```javascript
存放镜像地方  
公有仓库  dockerhub   阿里云都有容器服务器（配置镜像加速）
私有仓库
```
**总结**
需要正确的理解仓储/镜像/容器这几个概念 :

 - Docker 本身是一个容器运行载体或称之为管理引擎。我们把应用程序和配置依赖打包好形成一个 可交付的运行环境，这个打包好的运行环境就似乎
   image镜像文件。只有通过这个镜像文件才能生 成 Docker 容器。image 文件可以看作是容器的模板。Docker 根据
   image 文件生成容器的实例。 同一个 image 文件，可以生成多个同时运行的容器实例。
 - image 文件生成的容器实例，本身也是一个文件，称为镜像文件。
 - 一个容器运行一种服务，当我们需要的时候，就可以通过docker客户端创建一个对应的运行实例， 也就是我们的容器
 - 至于仓库，就是放了一堆镜像的地方，我们可以把镜像发布到仓库中，需要的时候从仓库中拉下来 就可以了。

## 环境准备

> 环境准备：

1.linux基础

2.centos 7

3.xhell连接远程服务器操作

> 环境查看

```javascript
[root@iz8vb15btme7reio6zs71ez /]# uname -r
3.10.0-514.26.2.el7.x86_64
[root@iz8vb15btme7reio6zs71ez /]# cat /etc/os-release
NAME="CentOS Linux"
VERSION="7 (Core)"
ID="centos"
ID_LIKE="rhel fedora"
VERSION_ID="7"
PRETTY_NAME="CentOS Linux 7 (Core)"
ANSI_COLOR="0;31"
CPE_NAME="cpe:/o:centos:centos:7"
HOME_URL="https://www.centos.org/"
BUG_REPORT_URL="https://bugs.centos.org/"

CENTOS_MANTISBT_PROJECT="CentOS-7"
CENTOS_MANTISBT_PROJECT_VERSION="7"
REDHAT_SUPPORT_PRODUCT="centos"
REDHAT_SUPPORT_PRODUCT_VERSION="7"

```

##  开始安装：

[帮助文档：](https://www.docker.com)

![在这里插入图片描述](https://img-blog.csdnimg.cn/fba053605ad24ff78cca67b2a0ee29d5.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NTg5NjEyNg==,size_16,color_FFFFFF,t_70#pic_center)

linux安装版本 



> 1.卸载旧版本 （如果有）

```javascript
 sudo yum remove docker \
                  docker-client \
                  docker-client-latest \
                  docker-common \
                  docker-latest \
                  docker-latest-logrotate \
                  docker-logrotate \
                  docker-engine
```
出现如下提示代表卸载成功

```javascript
Loaded plugins: fastestmirror
No Match for argument: docker
No Match for argument: docker-client
No Match for argument: docker-client-latest
No Match for argument: docker-common
No Match for argument: docker-latest
No Match for argument: docker-latest-logrotate
No Match for argument: docker-logrotate
No Match for argument: docker-engine
No Packages marked for removal

```

> 2.需要的安装包 环境
ps：如果出现问题就运行提示中给出的运行代码
```shell
# yum install -y yum-utils device-mapper-persistent-data lvm2 git
```

> 3.设置镜像仓库

```shell

# yum-config-manager --add-repo http://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo
    
```
> 4.更新yum包索引  

```
yum makecache fast
```

> 5.安装docker引擎  ce社区版推荐   ee企业版

```
yum install docker-ce docker-ce-cli containerd.io
```

> 6.启动docker

```
systemctl start docker
```

> 7.打印 **docker version**出现信息说明安装成功

```javascript
[root@iz8vb15btme7reio6zs71ez /]# docker version
Client: Docker Engine - Community
 Version:           20.10.7
 API version:       1.41
 Go version:        go1.13.15
 Git commit:        f0df350
 Built:             Wed Jun  2 11:58:10 2021
 OS/Arch:           linux/amd64
 Context:           default
 Experimental:      true

Server: Docker Engine - Community
 Engine:
  Version:          20.10.7
  API version:      1.41 (minimum version 1.12)
  Go version:       go1.13.15
  Git commit:       b0f5bc3
  Built:            Wed Jun  2 11:56:35 2021
  OS/Arch:          linux/amd64
  Experimental:     false
 containerd:
  Version:          1.4.9
  GitCommit:        e25210fe30a0a703442421b0f60afac609f950a3
 runc:
  Version:          1.0.1
  GitCommit:        v1.0.1-0-g4144b63
 docker-init:
  Version:          0.19.0
  GitCommit:        de40ad0

```

> 8.通过运行`hello-world` 映像验证 Docker Engine 是否已正确安装。

```
docker run hello-world
```

第一次没有寻找到镜像会自动下载

出现hello from Docker！说明安装成功了

```javascript
[root@iz8vb15btme7reio6zs71ez /]# docker run hello-world
⭐Unable to find image 'hello-world:latest' locally
⭐拉取 latest: Pulling from library/hello-world
b8dfde127a29: Pull complete 
Digest: sha256:df5f5184104426b65967e016ff2ac0bfcd44ad7899ca3bbcf8e44e4461491a9e
Status: Downloaded newer image for hello-world:latest

⭐⭐Hello from Docker!
This message shows that your installation appears to be working correctly.

To generate this message, Docker took the following steps:
 1. The Docker client contacted the Docker daemon.
 2. The Docker daemon pulled the "hello-world" image from the Docker Hub.
    (amd64)
 3. The Docker daemon created a new container from that image which runs the
    executable that produces the output you are currently reading.
 4. The Docker daemon streamed that output to the Docker client, which sent it
    to your terminal.

To try something more ambitious, you can run an Ubuntu container with:
 $ docker run -it ubuntu bash

Share images, automate workflows, and more with a free Docker ID:
 https://hub.docker.com/

For more examples and ideas, visit:
 https://docs.docker.com/get-started/
```

> 9.查看下载的hello-word镜像

```
docker images
```

```javascript
[root@iz8vb15btme7reio6zs71ez /]# docker images
REPOSITORY    TAG       IMAGE ID       CREATED        SIZE
nginx         latest    4cdc5dd7eaad   3 weeks ago    133MB
hello-world   latest    d1165f221234   4 months ago   13.3kB

```
> 了解 卸载docker

#### 卸载依赖

```javascript
yum remove docker-ce docker-ce-cli containerd.io
```

#### 删除资源

```javascript
rm -rf /var/lib/docker
```

docker默认工作路径
/var/lib/docker



#### 阿里云镜像加速
目的：提高效率

1.登录阿里云，找到容器服务

2.找到镜像加速地址（左边栏最下面 镜像加速器）

操作文档会告诉怎么做 centos
![在这里插入图片描述](https://img-blog.csdnimg.cn/dba26269a62843ac9a638a156bc49088.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NTg5NjEyNg==,size_16,color_FFFFFF,t_70#pic_center)
3.配置使用  找到类似下表文件 配置

```javascript
sudo mkdir -p /etc/docker
//新建目录docker
sudo tee /etc/docker/daemon.json <<-'EOF'
{
  "registry-mirrors": ["https://0p279n1x.mirror.aliyuncs.com"]
}
EOF
//配置阿里云地址
sudo systemctl daemon-reload
//镜像重启
sudo systemctl restart docker
//docker重启
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/651b72da33264f4b8d5f8651af87235e.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NTg5NjEyNg==,size_16,color_FFFFFF,t_70#pic_center)

## 底层原理

### docker怎么工作

docker是一个Client-serve结构的系统，docker的守护进程运行在主机上。通过socker从客户端访问。

dockerServe接收到docker-client指令，就会执行这个命令

![在这里插入图片描述](https://img-blog.csdnimg.cn/c915ed789fed4d629ff2bea2c1adabab.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NTg5NjEyNg==,size_16,color_FFFFFF,t_70#pic_center)
### docker为什么比虚拟机快

#### 1.docker有着比虚拟机更少的抽象层

#### 2.docker利用的是宿主机内核·，vm需要guest os

![在这里插入图片描述](https://img-blog.csdnimg.cn/53cd08338b3b41bc976814113333c63b.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NTg5NjEyNg==,size_16,color_FFFFFF,t_70#pic_center)


所以，新建容器时候，docker不需要像虚拟机一样重新加载一个操作系统内核，避免引导操作。虚拟机是加载guest os，分钟级别的。而docker是利用宿主机操作系统，省略了复杂过程，秒级别。
![在这里插入图片描述](https://img-blog.csdnimg.cn/f031b76a1fa34dca95e3220347ea36e4.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NTg5NjEyNg==,size_16,color_FFFFFF,t_70#pic_center)
# docker常用命令

## 帮助命令
```
docker -version  #显示版本信息
docker info   # 显示系统信息  包括镜像和容器数量
docker --help  #帮助命令
```

[帮助文档](https://docs.docker.com/reference/)

## 镜像命令

### docker images 查看所有主机镜像

```javascript
[root@iz8vb15btme7reio6zs71ez /]# docker images
REPOSITORY    TAG       IMAGE ID       CREATED        SIZE
nginx         latest    4cdc5dd7eaad   3 weeks ago    133MB
hello-world   latest    d1165f221234   4 months ago   13.3kB

```
查看镜像可选
```javascript
	-a    --all      //列出所有镜像
	-q     --quite    //只显示镜像id
```

### docker search搜索镜像

```javascript
docker search mysql
```

```javascript
[root@iz8vb15btme7reio6zs71ez /]# docker search mysql
NAME                              DESCRIPTION                                     STARS     OFFICIAL   AUTOMATED
mysql                             MySQL is a widely used, open-source relation…   11188     [OK]       
mariadb                           MariaDB Server is a high performing open sou…   4251  
```
可选项，通过收藏过滤

```javascript
--filter=STARS=3000   //搜索出来STARS大于3000得
```

```javascript
[root@iz8vb15btme7reio6zs71ez /]# docker search mysql --filter=STARS=3000
NAME      DESCRIPTION                                     STARS     OFFICIAL   AUTOMATED
mysql     MySQL is a widely used, open-source relation…   11188     [OK]       
mariadb   MariaDB Server is a high performing open sou…   4251      [OK]       
[root@iz8vb15btme7reio6zs71ez /]# 

```

### docker pull  镜像名[:tag版本]   下载镜像
没有tag指定版本默认最新
```javascript
[root@iz8vb15btme7reio6zs71ez /]# docker pull mysql
Using default tag: latest    //如果不写tag默认就是latest
latest: Pulling from library/mysql
33847f680f63: Pull complete    //分层下载 dock image核心  联合文件系统
5cb67864e624: Pull complete 
1a2b594783f5: Pull complete 
b30e406dd925: Pull complete 
48901e306e4c: Pull complete 
603d2b7147fd: Pull complete 
802aa684c1c4: Pull complete 
715d3c143a06: Pull complete 
6978e1b7a511: Pull complete 
f0d78b0ac1be: Pull complete 
35a94d251ed1: Pull complete 
36f75719b1a9: Pull complete 
Digest: sha256:8b928a5117cf5c2238c7a09cd28c2e801ac98f91c3f8203a8938ae51f14700fd   //签名
Status: Downloaded newer image for mysql:latest
docker.io/library/mysql:latest     //真实地址

```
docker pull mysql 5.7 （前提官方文档有支持这版本）

### docker rmi  删除镜像

```javascript
[root@iz8vb15btme7reio6zs71ez /]# docker rmi -f d1165f221234
Untagged: hello-world:latest
Untagged: hello-world@sha256:df5f5184104426b65967e016ff2ac0bfcd44ad7899ca3bbcf8e44e4461491a9e
Deleted: sha256:d1165f2212346b2bab48cb01c1e39ee8ad1be46b87873d9ca7a4e434980a7726

```
![在这里插入图片描述](https://img-blog.csdnimg.cn/d78377c8b3024df0a2d84ffa9140ddc7.jpg#pic_center)

## 容器命令

⭐⭐⭐有镜像才可以创建容器

### docker pull centos   下载centos测试学习

```javascript
[root@iz8vb15btme7reio6zs71ez /]# docker pull centos
Using default tag: latest
latest: Pulling from library/centos
7a0437f04f83: Pull complete 
Digest: sha256:5528e8b1b1719d34604c87e11dcd1c0a20bedf46e83b5632cdeac91b8c04efc1
Status: Downloaded newer image for centos:latest
docker.io/library/centos:latest

```

### 新建容器并启动

```shell
docker run [可选参数] 镜像

#参数说明
--name='Name'    容器名字   tomcat01    tomcat02，用来区分容器
-d               后台方式运行
-it               使用交互方式运行，进入容器查看内容
-p                指定容器的端口  -p 8080：8080
	-p  ip:主机端口：容器端口
	-p  主机端口：容器端口（常用）
	-p  容器端口
	容器端口
-p                随机指定端口

# 测试，启动并进入容器
[root@iz8vb15btme7reio6zs71ez /]# docker run  -it centos /bin/bash     //⭐⭐⭐
[root@26fc6c67f452 /]# ls    //查看容器内centos
bin  etc   lib	  lost+found  mnt  proc  run   srv  tmp  var
dev  home  lib64  media       opt  root  sbin  sys  usr

# 从容器口退出
exit
[root@26fc6c67f452 /]# exit
exit
[root@iz8vb15btme7reio6zs71ez /]#
```

### 列出所有运行的容器

```shell
# docker ps 命令
   #列出当前正在运行的容器
-a #列出当前正在运行的容器+带出历史运行过的容器
-n=？ #显示最近创建的容器
-q   #只显示容器得编号


[root@iz8vb15btme7reio6zs71ez /]# docker ps
CONTAINER ID   IMAGE     COMMAND   CREATED   STATUS    PORTS     NAMES
[root@iz8vb15btme7reio6zs71ez /]# docker ps -a
CONTAINER ID   IMAGE          COMMAND       CREATED          STATUS                       PORTS     NAMES
26fc6c67f452   centos         "/bin/bash"   11 minutes ago   Exited (130) 7 minutes ago             sharp_wiles
d81717efa43f   d1165f221234   "/hello"      2 hours ago      Exited (0) 2 hours ago                 sleepy_archimedes
371e8c74bcf6   d1165f221234   "/hello"      3 hours ago      Exited (0) 3 hours ago                 mystifying_shirley
[root@iz8vb15btme7reio6zs71ez /]# 

```

### 退出容器
```
exit  #直接从容器停止并退出
ctrl+p+q  #可以不停止退出 //⭐⭐⭐⭐⭐⭐⭐⭐
```

```shell
[root@iz8vb15btme7reio6zs71ez /]# docker run  -it centos /bin/bash
[root@dba569e5b212 /]# [root@iz8vb15btme7reio6zs71ez /]# docker ps
CONTAINER ID   IMAGE     COMMAND       CREATED          STATUS          PORTS     NAMES
dba569e5b212   centos    "/bin/bash"   22 seconds ago   Up 21 seconds             laughing_mirzakhani
[root@iz8vb15btme7reio6zs71ez /]# 

```

### 删除容器

```
docker rm 容器id        #删除指定容器  除正在运行容器
docker rm -f $(docker ps -aq)   #强制删除所有容器
docker ps -a -qixargs docker rm #删除所有容器
```

### 启动和停止容器
```
docker start 容器id     #启动容器
docker restart 容器id  #重启容器
docker stop 容器id     #停止当前正在运行的容器
docker kill 容器id        #强制停止当前容器
```

## 常用其他命令

### 后台启动容器

```shell
# 命令 
docker run -d 容器名 
# 例子 
docker run -d centos # 启动centos，使用后台方式启动 
# 问题： 使用docker ps 查看，发现容器已经退出了！ 经测试有的不会停止，比如我的。。。。
# 解释：Docker容器后台运行，就必须有一个前台进程，容器运行的命令如果不是那些一直挂起的命令，就会自动退出。 
# 比如，你运行了nginx服务，但是docker前台没有运行应用，这种情况下，容器启动后，会立即自杀，因为他觉得没有程序了，所以最好的情况是，将你的应用使用前台进程的方式运行启动。
```
ctrl+p+q

```shell
[root@iz8vb15btme7reio6zs71ez ~]# docker ps
CONTAINER ID   IMAGE     COMMAND       CREATED        STATUS        PORTS     NAMES
dba569e5b212   centos    "/bin/bash"   12 hours ago   Up 12 hours             laughing_mirzakhani
[root@iz8vb15btme7reio6zs71ez ~]# cd /
[root@iz8vb15btme7reio6zs71ez /]# docker run -it centos /bin/bash
[root@aa04a252a68f /]# [root@iz8vb15btme7reio6zs71ez /]# docker ps     //⭐⭐⭐ctrl+p+q
CONTAINER ID   IMAGE     COMMAND       CREATED          STATUS          PORTS     NAMES
aa04a252a68f   centos    "/bin/bash"   18 seconds ago   Up 17 seconds             goofy_brown
dba569e5b212   centos    "/bin/bash"   12 hours ago     Up 12 hours               laughing_mirzakhani
[root@iz8vb15btme7reio6zs71ez /]# 

```

### 查看日志  (前提前步，需要后台不退出运行)
帮助文件

```shell
[root@iz8vb15btme7reio6zs71ez /]# docker logs --help

Usage:  docker logs [OPTIONS] CONTAINER

Fetch the logs of a container

Options:
      --details        Show extra details provided to logs
  -f, --follow         Follow log output
      --since string   Show logs since timestamp (e.g. 2013-01-02T13:23:37Z) or relative (e.g. 42m
                       for 42 minutes)
  -n, --tail string    Number of lines to show from the end of the logs (default "all")
  -t, --timestamps     Show timestamps
      --until string   Show logs before a timestamp (e.g. 2013-01-02T13:23:37Z) or relative (e.g.
                       42m for 42 minutes)
[root@iz8vb15btme7reio6zs71ez /]# 

```
操作实例

```shell
# 命令 
docker logs -f -t --tail 容器id 
# 例子：我们启动 centos，并编写一段脚本来测试玩玩！最后查看日志 1234
查看容器中运行的进程信息，支持 ps 命令参数。
查看容器/镜像的元数据
[root@kuangshen ~]# docker run -d centos /bin/sh -c "while true;do echo kuangshen;sleep 1;done" [root@kuangshen ~]# docker ps CONTAINER ID IMAGE c8530dbbe3b4 centos 
# -t 显示时间戳 
# -f 打印最新的日志 
# --tail 数字 显示多少条！ 
[root@kuangshen ~]# docker logs -tf --tail 10 c8530dbbe3b4 
2020-05-11T08:46:40.656901941Z kuangshen 
2020-05-11T08:46:41.658765018Z kuangshen 
2020-05-11T08:46:42.661015375Z kuangshen 
2020-05-11T08:46:43.662865628Z kuangshen 
2020-05-11T08:46:44.664571547Z kuangshen 
2020-05-11T08:46:45.666718583Z kuangshen 
2020-05-11T08:46:46.668556725Z kuangshen 
2020-05-11T08:46:47.670424699Z kuangshen 
2020-05-11T08:46:48.672324512Z kuangshen 
2020-05-11T08:46:49.674092766Z kuangshen
```
### 查看容器中运行的进程信息，支持 ps 命令参数。
docker top  容器id
```shell
[root@iz8vb15btme7reio6zs71ez /]# docker ps
CONTAINER ID   IMAGE     COMMAND       CREATED          STATUS          PORTS     NAMES
aa04a252a68f   centos    "/bin/bash"   17 minutes ago   Up 17 minutes             goofy_brown
[root@iz8vb15btme7reio6zs71ez /]# docker top aa04a252a68f
UID                 PID                 PPID                C                   STIME               TTY                 TIME                CMD
root                22811               22779               0                   10:35               pts/0               00:00:00            /bin/bash
[root@iz8vb15btme7reio6zs71ez /]# 

```

### 查看容器/镜像的元数据
docker inspect 容器id

```shell
[root@iz8vb15btme7reio6zs71ez /]# docker inspect aa04a252a68f
[
    {
    	# 完整的id，有意思啊，这里上面的容器id，就是截取的这个id前几位！
        "Id": "aa04a252a68f395546abb346baf8d1554dc157b93ad97ff864101c55a4563e3b",
        "Created": "2021-07-31T02:35:57.80580604Z",
        "Path": "/bin/bash",
        "Args": [],
         # 状态
        "State": {
            "Status": "running",
            "Running": true,
            "Paused": false,
            "Restarting": false,
            "OOMKilled": false,
            "Dead": false,
            "Pid": 22811,
            "ExitCode": 0,
            "Error": "",
            "StartedAt": "2021-07-31T02:35:58.040203353Z",
            "FinishedAt": "0001-01-01T00:00:00Z"
        },
        "Image": "sha256:300e315adb2f96afe5f0b2780b87f28ae95231fe3bdd1e16b9ba606307728f55",
        "ResolvConfPath": "/var/lib/docker/containers/aa04a252a68f395546abb346baf8d1554dc157b93ad97ff864101c55a4563e3b/resolv.conf",
        "HostnamePath": "/var/lib/docker/containers/aa04a252a68f395546abb346baf8d1554dc157b93ad97ff864101c55a4563e3b/hostname",
        "HostsPath": "/var/lib/docker/containers/aa04a252a68f395546abb346baf8d1554dc157b93ad97ff864101c55a4563e3b/hosts",
        "LogPath": "/var/lib/docker/containers/aa04a252a68f395546abb346baf8d1554dc157b93ad97ff864101c55a4563e3b/aa04a252a68f395546abb346baf8d1554dc157b93ad97ff864101c55a4563e3b-json.log",
...............
```
### 进入正在运行的容器
通常容器通过后台方式运行，需要进入容器修改一些设置
第一种方式：
docker exec -it  容器id  bashShell

```shell
[root@iz8vb15btme7reio6zs71ez /]# docker ps
CONTAINER ID   IMAGE     COMMAND       CREATED          STATUS          PORTS     NAMES
aa04a252a68f   centos    "/bin/bash"   36 minutes ago   Up 36 minutes             goofy_brown
[root@iz8vb15btme7reio6zs71ez /]# docker exec -it aa04a252a68f /bin/bash   //⭐⭐⭐⭐⭐
[root@aa04a252a68f /]# ls
bin  etc   lib	  lost+found  mnt  proc  run   srv  tmp  var
dev  home  lib64  media       opt  root  sbin  sys  usr
[root@aa04a252a68f /]# ps -ef
UID        PID  PPID  C STIME TTY          TIME CMD
root         1     0  0 02:35 pts/0    00:00:00 /bin/bash
root        15     0  0 03:12 pts/1    00:00:00 /bin/bash
root        30    15  0 03:13 pts/1    00:00:00 ps -ef
[root@aa04a252a68f /]# 

```
第二种方式
docker attach 容器id

```shell
[root@iz8vb15btme7reio6zs71ez /]# docker attach 399e95e98645
[root@399e95e98645 /]# ps -ef
UID        PID  PPID  C STIME TTY          TIME CMD
root         1     0  0 03:22 pts/0    00:00:00 /bin/bash
root        18     1  0 03:24 pts/0    00:00:00 ps -ef

```
区别 
#exec   是在容器中打开新的终端，并且可以启动新的进程 
#attach  直接进入容器启动命令的终端，不会启动新的进程

### 从容器内拷贝文件到主机上
docker cp 容器id:容器内路径 目的主机路径

```cpp
[root@399e95e98645 /]# cd /home   //容器内路径
[root@399e95e98645 home]# ls
[root@399e95e98645 home]# touch che.txt  //新建文件
[root@399e95e98645 home]# ls
che.txt
[root@399e95e98645 home]# exit //退出
exit
[root@iz8vb15btme7reio6zs71ez /]# docker ps 
CONTAINER ID   IMAGE     COMMAND   CREATED   STATUS    PORTS     NAMES
[root@iz8vb15btme7reio6zs71ez /]# docker ps -a
CONTAINER ID   IMAGE     COMMAND                  CREATED       STATUS                      PORTS     NAMES
399e95e98645   centos    "/bin/bash"              3 hours ago   Exited (0) 22 seconds ago             awesome_rosalind
f50f007d77ce   centos    "/bin/bash"              3 hours ago   Exited (0) 3 hours ago                affectionate_fermi
2c988901d4a1   centos    "/bin/sh -C 'while t…"   3 hours ago   Exited (127) 3 hours ago              
[root@iz8vb15btme7reio6zs71ez /]# cd /home
[root@iz8vb15btme7reio6zs71ez home]# docker cp 399e95e98645:/home/che.txt /home  //⭐⭐⭐⭐⭐
[root@iz8vb15btme7reio6zs71ez home]# ls
che.txt
[root@iz8vb15btme7reio6zs71ez home]# 

```
# 常用命令归纳
![在这里插入图片描述](https://img-blog.csdnimg.cn/ebbc438bf2d746529e79a329c8840522.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NTg5NjEyNg==,size_16,color_FFFFFF,t_70#pic_center)

```shell
attach Attach to a running container   # ⭐当前 shell 下 attach 连接指定运行镜像 
build Build an image from a Dockerfile # ⭐通过 Dockerfile 定制镜像 
commit Create a new image from a container changes # ⭐提交当前容器为新的镜像 
cp Copy files/folders from the containers filesystem to the host path #⭐从容器中拷贝指定文件或者目录到宿主机中 
create Create a new container # ⭐创建一个新的容器，同 run，但不启动容器 
diff Inspect changes on a container's filesystem # ⭐查看 docker 容器变化 
events Get real time events from the server # ⭐从 docker 服务获取容 器实时事件 
exec Run a command in an existing container # ⭐在已存在的容器上运行命令
export Stream the contents of a container as a tar archive  # ⭐导出容器的内 容流作为一个 tar 归档文件[对应 import] 
history Show the history of an image # ⭐展示一个镜像形成历史
images List images # ⭐列出系统当前镜像
import Create a new filesystem image from the contents of a tarball # ⭐从 tar包中的内容创建一个新的文件系统映像[对应export] 
info Display system-wide information # ⭐显示系统相关信息 
inspect Return low-level information on a container #⭐ 查看容器详细信息 
kill Kill a running container # ⭐kill 指定 docker 容 器
load Load an image from a tar archive # ⭐从一个 tar 包中加载一 个镜像[对应 save] 
login Register or Login to the docker registry server # ⭐注册或者登陆一个 docker 源服务器 
logout Log out from a Docker registry server # ⭐从当前 Docker registry 退出 
logs Fetch the logs of a container # ⭐输出当前容器日志信息 
port Lookup the public-facing port which is NAT-ed to PRIVATE_PORT # ⭐查看映射端口对应的容器内部源端口 
pause Pause all processes within a container # ⭐暂停容器 
ps List containers # ⭐列出容器列表 
pull Pull an image or a repository from the docker registry server # ⭐从docker镜像源服务器拉取指定镜像或者库镜像 
push Push an image or a repository to the docker registry server # ⭐推送指定镜像或者库镜像至docker源服务器 restart Restart a running container # ⭐重启运行的容器 
rm Remove one or more containers # ⭐移除一个或者多个容器 
rmi Remove one or more images # ⭐移除一个或多个镜像[无容器使用该 镜像才可删除，否则需删除相关容器才可继续或 -f 强制删除] run Run a command in a new container #⭐ 创建一个新的容器并运行 一个命令 
save Save an image to a tar archive # ⭐保存一个镜像为一个 tar 包[对应 load] 
search Search for an image on the Docker Hub # ⭐在 docker hub 中搜 索镜像 
start Start a stopped containers # ⭐启动容器 stop Stop a running containers # 停止容器 
tag Tag an image into a repository # ⭐给源中镜像打标签 
top Lookup the running processes of a container # ⭐查看容器中运行的进程信 息
unpause Unpause a paused container # ⭐取消暂停容器 
version Show the docker version information # ⭐查看 docker 版本号 
wait Block until a container stops, then print its exit code # ⭐截取容 器停止时的退出状态值
```
# 阶段案例
> 使用Docker 安装Nginx

```javascript
# 1、搜索镜像 
[root@iz8vb15btme7reio6zs71ez /]# docker search nginx
NAME                              DESCRIPTION                                     STARS     OFFICIAL   AUTOMATED
nginx                             Official build of Nginx.                        15237     [OK]       
jwilder/nginx-proxy               Automated Nginx reverse proxy for docker con…   2053                 [OK]
richarvey/nginx-php-fpm           Container running Nginx + PHP-FPM capable of…   815                  [OK]
......
bitwarden/nginx                   The Bitwarden nginx web server acting as a r…   11                   
flashspys/nginx-static            Super Lightweight Nginx Image                   10                   [OK]
mailu/nginx                       Mailu nginx frontend                            9                    [OK]
sophos/nginx-vts-exporter         Simple server that scrapes Nginx vts stats a…   7                    [OK]
ansibleplaybookbundle/nginx-apb   An APB to deploy NGINX                          2                    [OK]
wodby/nginx                       Generic nginx                                   1                    [OK]
[root@iz8vb15btme7reio6zs71ez /]# 
# 2、拉取镜像
[root@iz8vb15btme7reio6zs71ez /]# docker pull nginx
Using default tag: latest
latest: Pulling from library/nginx
33847f680f63: Already exists 
dbb907d5159d: Pull complete 
8a268f30c42a: Pull complete 
b10cf527a02d: Pull complete 
c90b090c213b: Pull complete 
1f41b2f2bf94: Pull complete 
Digest: sha256:8f335768880da6baf72b70c701002b45f4932acae8d574dedfddaf967fc3ac90
Status: Downloaded newer image for nginx:latest
docker.io/library/nginx:latest

# 3、确认是否拉取下来
[root@iz8vb15btme7reio6zs71ez /]# docker images
REPOSITORY   TAG       IMAGE ID       CREATED        SIZE
nginx        latest    08b152afcfae   8 days ago     133MB
mysql        latest    c60d96bd2b77   8 days ago     514MB
nginx        <none>    4cdc5dd7eaad   3 weeks ago    133MB
centos       latest    300e315adb2f   7 months ago   209MB
[root@iz8vb15btme7reio6zs71ez /]# 
# 4、启动镜像    -d以后台启动   --name给后台挂载名子  -p暴漏出去端口号 以3344访问我得80
[root@iz8vb15btme7reio6zs71ez /]# docker run -d --name nginx01 -p 3344:80 nginx
608758faab2e53e0b0a57cda7cfbdd221a769a44c4eab29ccb695ff575013057
# 5、访问一下
[root@iz8vb15btme7reio6zs71ez /]# curl localhost:3344
<!DOCTYPE html>
<html>
<head>
<title>Welcome to nginx!</title>
</body>
</html>

# 6、进入容器
[root@iz8vb15btme7reio6zs71ez /]# docker ps
CONTAINER ID   IMAGE     COMMAND                  CREATED          STATUS          PORTS                  NAMES
608758faab2e   nginx     "/docker-entrypoint.…"   44 minutes ago   Up 44 minutes   0.0.0.0:3344->80/tcp   nginx01
[root@iz8vb15btme7reio6zs71ez /]# docker exec -it nginx01 /bin/bash
root@608758faab2e:/# whereis nginx
nginx: /usr/sbin/nginx /usr/lib/nginx /etc/nginx /usr/share/nginx
root@608758faab2e:/# cd /etc/nginx
root@608758faab2e:/etc/nginx# ls
conf.d	fastcgi_params	mime.types  modules  nginx.conf  scgi_params  uwsgi_params
root@608758faab2e:/etc/nginx# 

```
涉及端口暴漏小知识
![在这里插入图片描述](https://img-blog.csdnimg.cn/7698f51afcd74bac819c80333035f8e8.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NTg5NjEyNg==,size_16,color_FFFFFF,t_70#pic_center)
我们以后要部署项目，还需要进入容器中，是不是十分麻烦，要是有一种技术，可以将容器 内和我们Linux进行映射挂载就好了？   思路解决   数据卷技术

> 使用Docker安装tomcat

```cpp
# 1、下载    --rm用完就删除 官方玩法
docker run -it --rm tomcat:9.0
咱们自己老老实实
docker pull tomcat:9.0

[root@iz8vb15btme7reio6zs71ez /]# docker pull tomcat:9.0
9.0: Pulling from library/tomcat
Digest: sha256:6e40250d8fac4eca05c2067cb81f79427e4ddbaf4e78d5ecd21c35e8c5f2bfcf
Status: Image is up to date for tomcat:9.0
docker.io/library/tomcat:9.0
# 2、查看是否安装成功
[root@iz8vb15btme7reio6zs71ez /]# docker images
REPOSITORY   TAG       IMAGE ID       CREATED        SIZE
tomcat       9.0       46cfbf1293b1   7 days ago     668MB
nginx        latest    08b152afcfae   8 days ago     133MB
mysql        latest    c60d96bd2b77   8 days ago     514MB
nginx        <none>    4cdc5dd7eaad   3 weeks ago    133MB
centos       latest    300e315adb2f   7 months ago   209MB
# 3、启动
docker run -d -p 3355:8080 --name tomcat01 tomcat
[root@iz8vb15btme7reio6zs71ez /]# docker run -d -p 3355:8080 --name tomcat01 tomcat
Digest: sha256:6e40250d8fac4eca05c2067cb81f79427e4ddbaf4e78d5ecd21c35e8c5f2bfcf
Status: Downloaded newer image for tomcat:latest
02006a6a6c48d770d08497ec1ff5c957593f72de95790a6a58436f4c262bff9c
[root@iz8vb15btme7reio6zs71ez /]# 
# 4、测试 访问出现阉割版，需要进一步配置
进入查看
[root@iz8vb15btme7reio6zs71ez /]# docker exec -it tomcat01 /bin/bash
root@02006a6a6c48:/usr/local/tomcat# ls
BUILDING.txt	 LICENSE  README.md	 RUNNING.txt  conf  logs	    temp     webapps.dist
CONTRIBUTING.md  NOTICE   RELEASE-NOTES  bin	      lib   native-jni-lib  webapps  work
root@02006a6a6c48:/usr/local/tomcat# 

# 5、这种操作可以访问tomcat官网
root@02006a6a6c48:/usr/local/tomcat# cp webapps.dist/* webapps
cp: -r not specified; omitting directory 'webapps.dist/ROOT'
cp: -r not specified; omitting directory 'webapps.dist/docs'
cp: -r not specified; omitting directory 'webapps.dist/examples'
cp: -r not specified; omitting directory 'webapps.dist/host-manager'
cp: -r not specified; omitting directory 'webapps.dist/manager'
root@02006a6a6c48:/usr/local/tomcat# cp -r  webapps.dist/* webapps   //⭐⭐⭐⭐
root@02006a6a6c48:/usr/local/tomcat# cd webapps
root@02006a6a6c48:/usr/local/tomcat/webapps# ls   //⭐⭐⭐
ROOT  docs  examples  host-manager  manager
root@02006a6a6c48:/usr/local/tomcat/webapps# 
```
> 使用docker 部署es+kibana

```shell
# 我们启动es这种容器需要考虑几个问题 
1、端口暴露问题 9200、9300 
2、数据卷的挂载问题 data、plugins、conf 
3、吃内存 - "ES_JAVA_OPTS=-Xms512m -Xmx512m" 
# 扩展命令 
docker stats 容器id # 查看容器的cpu内存和网络状态 
# 1、启动es测试 
 docker run -d --name elasticsearch -p 9200:9300 -e "discovery.type=single-node" elasticsearch:7.6.2

[root@iz8vb15btme7reio6zs71ez /]# docker run -d --name elasticsearch -p 9200:9300 -e "discovery.type=single-node" elasticsearch:7.6.2
Unable to find image 'elasticsearch:7.6.2' locally
7.6.2: Pulling from library/elasticsearch
ab5ef0e58194: Pull complete 
c4d1ca5c8a25: Pull complete 
941a3cc8e7b8: Pull complete 
43ec483d9618: Pull complete 
c486fd200684: Pull complete 
1b960df074b2: Pull complete 
1719d48d6823: Pull complete 
Digest: sha256:1b09dbd93085a1e7bca34830e77d2981521a7210e11f11eda997add1c12711fa
Status: Downloaded newer image for elasticsearch:7.6.2
0f031f731a4491da4366fecc9f700038264eef66a500d7d3cfbcfd355b6f3361

# 注意 启动后curl localhost:9200访问有可能访问不到，但是下面使用优化方法就可以访问。 对了，云服务器别忘了开放端口哦
# 2、启动之后很卡，使用 docker stats 容器id 查看下cpu状态 ，发现占用的很大 (我的4核8G感觉还行)
[root@iz8vb15btme7reio6zs71ez /]# docker stats

CONTAINER ID   NAME            CPU %     MEM USAGE / LIMIT     MEM %     NET I/O   BLOCK I/O    PIDS
0f031f731a44   elasticsearch   0.19%     1.256GiB / 7.376GiB   17.03%    0B / 0B   0B / 696kB   44

CONTAINER ID   NAME            CPU %     MEM USAGE / LIMIT     MEM %     NET I/O   BLOCK I/O    PIDS
0f031f731a44   elasticsearch   0.41%     1.256GiB / 7.376GiB   17.03%    0B / 0B   0B / 696kB   44

# 3、解决方法  关闭 增加内存限制 修改配置文件  -e 环境配置修改  elasticsearch02镜像名自定义
docker run -d --name elasticsearch02  -p 9200:9200 -p 9300:9300 -e "discovery.type=single-node" -e ES_JAVA_OPTS="-Xms64m -Xmx512m" elasticsearch:7.6.2

[root@iz8vb15btme7reio6zs71ez /]# docker run -d --name elasticsearch02  -p 9200:9200 -p 9300:9300 -e "discovery.type=single-node" -e ES_JAVA_OPTS="-Xms64m -Xmx512m" elasticsearch:7.6.2
2866cb779c5acab74a9e36bf1e5371d527582de5a012ba4a2ebb5834e6e36b45
[root@iz8vb15btme7reio6zs71ez /]# docker stats 2866cb779c5a 

CONTAINER ID   NAME              CPU %     MEM USAGE / LIMIT     MEM %     NET I/O   BLOCK I/O    PIDS
2866cb779c5a   elasticsearch02   0.00%     376.3MiB / 7.376GiB   4.98%     0B / 0B   0B / 696kB   45

CONTAINER ID   NAME              CPU %     MEM USAGE / LIMIT     MEM %     NET I/O   BLOCK I/O    PIDS
2866cb779c5a   elasticsearch02   0.00%     376.3MiB / 7.376GiB   4.98%     0B / 0B   0B / 696kB   45

# 4、测试启动  访问
[root@iz8vb15btme7reio6zs71ez /]# curl localhost:9200
{
  "name" : "2866cb779c5a",
  "cluster_name" : "docker-cluster",
  "cluster_uuid" : "KlNLdJdvRUWjmTLnN1h4rg",
  "version" : {
    "number" : "7.6.2",
    "build_flavor" : "default",
    "build_type" : "docker",
    "build_hash" : "ef48eb35cf30adf4db14086e8aabd07ef6fb113f",
    "build_date" : "2020-03-26T06:34:37.794943Z",
    "build_snapshot" : false,
    "lucene_version" : "8.4.0",
    "minimum_wire_compatibility_version" : "6.8.0",
    "minimum_index_compatibility_version" : "6.0.0-beta1"
  },
  "tagline" : "You Know, for Search"
}
[root@iz8vb15btme7reio6zs71ez /]# 


```
![在这里插入图片描述](https://img-blog.csdnimg.cn/45e951ceccc54fefb7f29fbc35d4bf11.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NTg5NjEyNg==,size_16,color_FFFFFF,t_70#pic_center)
思考：如果我们要使用 kibana , 如果配置连接上我们的es呢？网络该如何配置呢？

## 可视化
### 定义
> Portainer（先用这个）

Portainer是Docker的图形化管理工具，提供状态显示面板、应用模板快速部署、容器镜像网络数据卷
的基本操作（包括上传下载镜像，创建容器等操作）、事件日志显示、容器控制台操作、Swarm集群和
服务等集中管理和操作、登录用户管理和控制等功能。功能十分全面，基本能满足中小型单位对容器管
理的全部需求。
如果仅有一个docker宿主机，则可使用单机版运行，Portainer单机版运行十分简单，只需要一条语句即
可启动容器，来管理该机器上的docker镜像、容器等数据。
```shell
docker run -d -p 8088:9000 \
--restart=always -v /var/run/docker.sock:/var/run/docker.sock --privileged=true portainer/portainer

[root@iz8vb15btme7reio6zs71ez /]# docker run -d -p 8088:9000 \
> --restart=always -v /var/run/docker.sock:/var/run/docker.sock --privileged=true portainer/portainer
Unable to find image 'portainer/portainer:latest' locally
latest: Pulling from portainer/portainer
94cfa856b2b1: Pull complete 
49d59ee0881a: Pull complete 
a2300fd28637: Pull complete 
Digest: sha256:fb45b43738646048a0a0cc74fcee2865b69efde857e710126084ee5de9be0f3f
Status: Downloaded newer image for portainer/portainer:latest
25190baeb40ce68b07945bf159d1966cd402828300023e33436f68aa678c94fd
```
访问测试 8088 外网
 - Rancher（CI/CD再用这个）
#### 进入docker图形化界面
![在这里插入图片描述](https://img-blog.csdnimg.cn/99ea6d5b65f646019f23b5baf2cf9710.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NTg5NjEyNg==,size_16,color_FFFFFF,t_70#pic_center)
> 再用这个 Rancher

```shell
#安装rancher-server 
docker run --name rancher-server -p 8000:8080 -v
/etc/localtime:/etc/localtime:ro -d rancher/server 
#安装agent 
docker run --rm --privileged -v /var/run/docker.sock:/var/run/docker.sock -v /var/lib/rancher:/var/lib/rancher rancher/agent:v1.2.11 http://39.101.191.131:8000/v1/scripts/D3DBD43F263109BB881F:1577750400000:7M0y BzCw4XSxJklD7TpysYIpI
```
# docker镜像讲解
镜像是一种轻量级、可执行的独立软件包，用来打包软件运行环境和基于运行环境开发的软件，它包含
运行某个软件所需的所有内容，包括代码、运行时、库、环境变量和配置文件。
所有的应用，直接打包docker镜像，就可以直接跑起来。
如何得到：远程仓库  拷贝   自己制作镜像
> UnionFS （联合文件系统）

UnionFS（联合文件系统）：Union文件系统（UnionFS）是一种分层、轻量级并且高性能的文件系统，
它支持对文件系统的修改作为一次提交来一层层的叠加，同时可以将不同目录挂载到同一个虚拟文件系
统下(unite several directories into a single virtual filesystem)。Union 文件系统是 Docker 镜像的基
础。镜像可以通过分层来进行继承，基于基础镜像（没有父镜像），可以制作各种具体的应用镜像。
特性：一次同时加载多个文件系统，但从外面看起来，只能看到一个文件系统，联合加载会把各层文件
系统叠加起来，这样最终的文件系统会包含所有底层的文件和目录

> Docker镜像加载原理

bootfs(boot file system)主要包含bootloader和kernel, bootloader主要是引导加载kernel, Linux刚启
动时会加载bootfs文件系统，在Docker镜像的最底层是bootfs。这一层与我们典型的Linux/Unix系统是
一样的，包含boot加载器和内核。当boot加载完成之后整个内核就都在内存中了，此时内存的使用权已
由bootfs转交给内核，此时系统也会卸载bootfs。 rootfs (root file system) ，在bootfs之上。包含的就是典型 Linux 系统中的 /dev, /proc, /bin, /etc 等标
准目录和文件。rootfs就是各种不同的操作系统发行版，比如Ubuntu，Centos等等。
![在这里插入图片描述](https://img-blog.csdnimg.cn/7ce8fc4858ab44ffaab74a46666612d9.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NTg5NjEyNg==,size_16,color_FFFFFF,t_70#pic_center)
对于一个精简的OS，rootfs 可以很小，只需要包含最基本的命令，工具和程序库就可以了，因为底层直
接用Host的kernel，自己只需要提供rootfs就可以了。由此可见对于不同的linux发行版, bootfs基本是一
致的, rootfs会有差别, 因此不同的发行版可以公用bootfs。

# 分层理解
![在这里插入图片描述](https://img-blog.csdnimg.cn/537a0209468349c5b57936b79010b642.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NTg5NjEyNg==,size_16,color_FFFFFF,t_70#pic_center)
> 理解：

所有的 Docker 镜像都起始于一个基础镜像层，当进行修改或增加新的内容时，就会在当前镜像层之
上，创建新的镜像层。
举一个简单的例子，假如基于 Ubuntu Linux 16.04 创建一个新的镜像，这就是新镜像的第一层；如果
在该镜像中添加 Python包，就会在基础镜像层之上创建第二个镜像层；如果继续添加一个安全补丁，就
会创建第三个镜像层。
该镜像当前已经包含 3 个镜像层，如下图所示（这只是一个用于演示的很简单的例子）。
![在这里插入图片描述](https://img-blog.csdnimg.cn/27fe86b2dc6041bfacc2f6bb3131a36e.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NTg5NjEyNg==,size_16,color_FFFFFF,t_70#pic_center)
在添加额外的镜像层的同时，镜像始终保持是当前所有镜像的组合，理解这一点非常重要。下图中举了
一个简单的例子，每个镜像层包含 3 个文件，而镜像包含了来自两个镜像层的 6 个文件。
![在这里插入图片描述](https://img-blog.csdnimg.cn/33d7fdfff26e49d08f43d4e8f40a0b7f.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NTg5NjEyNg==,size_16,color_FFFFFF,t_70#pic_center)


上图中的镜像层跟之前图中的略有区别，主要目的是便于展示文件。
下图中展示了一个稍微复杂的三层镜像，在外部看来整个镜像只有 6 个文件，这是因为最上层中的文件
7 是文件 5 的一个更新版本。

![在这里插入图片描述](https://img-blog.csdnimg.cn/734d27411ed0496c8ba9261f4af6e064.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NTg5NjEyNg==,size_16,color_FFFFFF,t_70#pic_center)


这种情况下，上层镜像层中的文件覆盖了底层镜像层中的文件。这样就使得文件的更新版本作为一个新
镜像层添加到镜像当中。
Docker 通过存储引擎（新版本采用快照机制）的方式来实现镜像层堆栈，并保证多镜像层对外展示为统
一的文件系统。
Linux 上可用的存储引擎有 AUFS、Overlay2、Device Mapper、Btrfs 以及 ZFS。顾名思义，每种存储
引擎都基于 Linux 中对应的文件系统或者块设备技术，并且每种存储引擎都有其独有的性能特点。
Docker 在 Windows 上仅支持 windowsfilter 一种存储引擎，该引擎基于 NTFS 文件系统之上实现了分
层和 CoW[1]。
下图展示了与系统显示相同的三层镜像。所有镜像层堆叠并合并，对外提供统一的视图。
![在这里插入图片描述](https://img-blog.csdnimg.cn/1b7be0cae79246ab8c76f8c1900bfbe6.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NTg5NjEyNg==,size_16,color_FFFFFF,t_70#pic_center)
> 特点

Docker镜像都是只读的，当容器启动时，一个新的可写层被加载到镜像的顶部！
这一层就是我们通常说的容器层，容器之下的都叫镜像层！

![在这里插入图片描述](https://img-blog.csdnimg.cn/5c692ddb99614b83831017baa7e7c68b.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NTg5NjEyNg==,size_16,color_FFFFFF,t_70#pic_center)
## 镜像commit
docker commit 从容器创建一个新的镜像
```shell
docker commit 提交容器副本使之成为一个新的镜像！ 
# 语法 
docker commit -m="提交的描述信息" -a="作者" 容器id 要创建的目标镜像名:[标签名]
```
测试

```shell
# 1、从Docker Hub 下载tomcat镜像到本地并运行 -it 交互终端 -p 端口映射 
docker run -it -p 8080:8080 tomcat 
# 注意：坑爹：docker启动官方tomcat镜像的容器，发现404是因为使用了加速器，而加速器里的 tomcat的webapps下没有root等文件！ 
# 下载tomcat官方镜像，就是这个镜像（阿里云里的tomcat的webapps下没有任何文件） 
# 进入tomcat查看cd到webapps下发现全部空的，反而有个webapps.dist里有对应文件，cp -r 到webapps下！ root@aba865b53114:/usr/local/tomcat# cp -r webapps.dist/* webapps 
# 2、删除上一步镜像产生的tomcat容器的文档 
docker ps 
# 查看容器id 
docker exec -it 容器id /bin/bash 
/usr/local/tomcat # ce webapps/ 
/usr/local/tomcat/webapps # ls -l # 查看是否存在 docs文件夹 
/usr/local/tomcat/webapps 
# curl localhost:8080/docs/ # 可以看到 docs 返回的 
内容
/usr/local/tomcat/webapps # rm -rf docs # 删除它 
/usr/local/tomcat/webapps # curl localhost:8080/docs/ # 再次访问返回404 
# 3、当前运行的tomcat实例就是一个没有docs的容器，我们使用它为模板commit一个没有docs的 tomcat新镜像， tomcat02 
docker ps -l # 查看容器的id 
# 注意：commit的时候，容器的名字不能有大写，否则报错：invalid reference format 
docker commit -a="kuangshen" -m="no tomcat docs" 1e98a2f815b0 tomcat02:1.1 sha256:cdccd4674f93ad34bf73d9db577a20f027a6d03fd1944dc0e628ee4bf17ec748 
[root@kuangshen /]# docker images # 查看，我们自己提交的镜像已经OK了！ 
REPOSITORY TAG IMAGE ID CREATED SIZE 
tomcat02 1.1 cdccd4674f93 About a minute ago 649MB redis latest f9b990972689 9 days ago 104MB tomcat latest 927899a31456 2 weeks ago 
647MB centos latest 470671670cac 3 months ago 237MB 
# 4、这个时候，我们的镜像都是可以使用的，大家可以启动原来的tomcat，和我们新的tomcat02来 测试看看！ 
[root@kuangshen ~]# docker run -it -p 8080:8080 tomcat02:1.1 
# 如果你想要保存你当前的状态，可以通过commit，来提交镜像，方便使用，类似于 VM 中的快照！
```
# 入门精髓
## 容器数据券
容器的持久化和同步操作，容器间也可以数据共享
> 作用：

卷就是目录或者文件，存在一个或者多个容器中，由docker挂载到容器，但不属于联合文件系统，因此
能够绕过 Union File System ， 提供一些用于持续存储或共享数据的特性：
卷的设计目的就是数据的持久化，完全独立于容器的生存周期，因此Docker不会在容器删除时删除其挂
载的数据卷。
> 特点：

1、数据卷可在容器之间共享或重用数据
2、卷中的更改可以直接生效
3、数据卷中的更改不会包含在镜像的更新中
4、数据卷的生命周期一直持续到没有容器使用它为止
所以：总结一句话： 就是容器的持久化，以及容器间的继承和数据共享！
### 使用数据卷
方式一：容器中直接使用命令来添加
挂载

```shell
# 命令 
docker run -it -v 宿主机绝对路径目录:容器内目录 镜像名 /bin/bash
# 测试 
[root@kuangshen ~]# docker run -it -v /home/ceshi:/home centos /bin/bash
```
查看数据卷是否挂载成功 **docker inspect 容器id**

![在这里插入图片描述](https://img-blog.csdnimg.cn/dc3ace6047164fb69a6624d085953313.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NTg5NjEyNg==,size_16,color_FFFFFF,t_70#pic_center)
> 测试容器停止退出后，主机修改数据是否会同步！

1. 停止容器
2. 在宿主机上修改文件，增加些内容
3. 启动刚才停止的容器
4. 然后查看对应的文件，发现数据依旧同步！ok
### 匿名挂载 具名挂载

```shell
# 匿名挂载 
-v 容器内路径 docker run -d -P --name nginx01 -v /etc/nginx nginx 
# 匿名挂载的缺点，就是不好维护，通常使用命令 docker volume维护 
docker volume ls 

[root@iZ8vb15btme7reio6zs71eZ /]# docker volume ls 
DRIVER    VOLUME NAME
local     ef53adf0ea5b5bc62df9f9948157c7a4dc6768ca78cb0a1cee8ae7cfbe2ba877
local     fc6936ecf8cbc6263f9d73f8a1969b96b6e4de868698d5b8e9734a904d7ee3ae

# 具名挂载 
-v 卷名:/容器内路径 
docker run -d -P --name nginx02 -v nginxconfig:/etc/nginx nginx 
# 查看挂载的路径 
[root@iZ8vb15btme7reio6zs71eZ /]# docker volume inspect nginxconfig 
[
    {
        "CreatedAt": "2021-08-09T21:03:27+08:00",
        "Driver": "local",
        "Labels": null,
        "Mountpoint": "/var/lib/docker/volumes/nginxconfig/_data",
        "Name": "nginxconfig",
        "Options": null,
        "Scope": "local"
    }
]
docker volume ls 
[root@iZ8vb15btme7reio6zs71eZ /]# docker volume ls 
DRIVER    VOLUME NAME
local     nginxconfig

# 怎么判断挂载的是卷名而不是本机目录名？ 
不是/开始就是卷名，是/开始就是目录名 
# 改变文件的读写权限 
# ro: readonly 
# rw: readwrite 
# 指定容器对我们挂载出来的内容的读写权限 
docker run -d -P --name nginx02 -v nginxconfig:/etc/nginx:ro nginx 
docker run -d -P --name nginx02 -v nginxconfig:/etc/nginx:rw nginx
```


## 初识dockerFile
构建docker镜像构建文件
> 初体验
通过这个命令可以生成镜像  **镜像一层层 命令一个个**

```shell
# 1、我们在宿主机 /home 目录下新建一个 docker-test-volume文件夹 
[root@kuangshen home]# mkdir docker-test-volume 
# 说明：在编写DockerFile文件中使用 VOLUME 指令来给镜像添加一个或多个数据卷 VOLUME["/dataVolumeContainer1","/dataVolumeContainer2","/dataVolumeContainer 3"] 
# 出于可移植和分享的考虑，我们之前使用的 -v 主机目录:容器目录 这种方式不能够直接在 DockerFile中实现。 
# 由于宿主机目录是依赖于特定宿主机的，并不能够保证在所有宿主机上都存在这样的特定目录. 
# 2、编写DockerFile文件 
[root@kuangshen docker-test-volume]# pwd /home/docker-test-volume 
[root@kuangshen docker-test-volume]# vim dockerfile1 
[root@kuangshen docker-test-volume]# cat dockerfile1 # volume test 
FROM centos 
VOLUME ["/dataVolumeContainer1","/dataVolumeContainer2"] 
CMD echo "-------end------" 
CMD /bin/bash 
# 3、build后生成镜像，获得一个新镜像 kuangshen/centos
docker build -f /home/docker-test-volume/dockerfile1 -t kuangshen/centos . # 注意最后有个.
```
![在这里插入图片描述](https://img-blog.csdnimg.cn/2b288d243e15478ea30c04e490326fed.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NTg5NjEyNg==,size_16,color_FFFFFF,t_70#pic_center)

```shell
# 4、启动容器 
[root@kuangshen docker-test-volume]# docker run -it 0e97e1891a3d /bin/bash # 启动容器 
[root@f5824970eefc /]# ls -l 
total 56 
lrwxrwxrwx 1 root root 7 May 11 2019 bin -> usr/bin 
drwxr-xr-x 2 root root 4096 May 11 11:55 dataVolumeContainer1 # 数据卷目录 
drwxr-xr-x 2 root root 4096 May 11 11:55 dataVolumeContainer2 # 数据卷目录 
drwxr-xr-x 5 root root 360 May 11 11:55 dev 
drwxr-xr-x 1 root root 4096 May 11 11:55 etc 
drwxr-xr-x 2 root root 4096 May 11 2019 home 
..... 
# 问题:通过上述步骤，容器内的卷目录地址就已经知道了，但是对应的主机目录地址在哪里呢？ 
# 5、我们在数据卷中新建一个文件 
[root@f5824970eefc dataVolumeContainer1]# pwd 
/dataVolumeContainer1 
[root@f5824970eefc dataVolumeContainer1]# touch container.txt 
[root@f5824970eefc dataVolumeContainer1]# ls -l 
total 0 -rw-r--r-- 1 root root 0 May 11 11:58 container.txt 
# 6、查看下这个容器的信息 
[root@kuangshen ~]# docker inspect 0e97e1891a3d 
# 查看输出的Volumes 
"Volumes": { "/dataVolumeContainer1": {}, "/dataVolumeContainer2": {} },
# 7、这个卷在主机对应的默认位置
```
注意：如果访问出现了 cannot open directory: Permission denied
解决办法：在挂载目录后多加一个 --privileged=true参数即可
查看自己根据命令创建的镜像
![在这里插入图片描述](https://img-blog.csdnimg.cn/e3802143c974483c8aade8424ba11603.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NTg5NjEyNg==,size_16,color_FFFFFF,t_70#pic_center)



### 数据卷容器
命名的容器挂载数据卷，其他容器通过挂载这个（父容器）实现数据共享，挂载数据卷的容器，称之为
数据卷容器。
我们使用上一步的镜像：kuangshen/centos 为模板，运行容器 docker01，docker02，docker03，他
们都会具有容器卷
![在这里插入图片描述](https://img-blog.csdnimg.cn/284cbe4ba0644dcfb2973aef142713b3.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NTg5NjEyNg==,size_16,color_FFFFFF,t_70#pic_center)

```shell
"/dataVolumeContainer1" 
"/dataVolumeContainer2"
```
#### 1、先启动一个父容器docker01，然后在dataVolumeContainer2新增文件
![在这里插入图片描述](https://img-blog.csdnimg.cn/6ed23570632d48c9a289b319699da6c4.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NTg5NjEyNg==,size_16,color_FFFFFF,t_70#pic_center)
退出不停止：ctrl+P+Q
#### 2、创建docker02，docker03 让他们继承docker01 **--volumes-from**

```shell
[root@kuangshen docker-test-volume]# docker run -it --name docker02 --volumes-from docker01 kuangshen/centos:1.0 [root@ea4c82779077 /]# cd /dataVolumeContainer2 
[root@ea4c82779077 dataVolumeContainer2]# ls docker01.txt 
[root@95164598b306 dataVolumeContainer2]# touch docker02.txt 
[root@95164598b306 dataVolumeContainer2]# ls docker01.txt docker02.txt 
[root@kuangshen docker-test-volume]# docker run -it --name docker03 -- volumes-from docker01 kuangshen/centos:1.0 [root@ea4c82779077 /]# cd /dataVolumeContainer2 
[root@ea4c82779077 dataVolumeContainer2]# ls docker01.txt docker02.txt 
[root@95164598b306 dataVolumeContainer2]# touch docker03.txt 
[root@95164598b306 dataVolumeContainer2]# ls docker01.txt docker02.txt docker03.txt
```
#### 3、回到docker01发现可以看到 02 和 03 添加的共享文件

```shell
[root@kuangshen docker-test-volume]# docker attach docker01 
[root@799b6ea5db7c dataVolumeContainer2]# ls -l total 0 
-rw-r--r-- 1 root root 0 May 11 13:20 docker01.txt 
-rw-r--r-- 1 root root 0 May 11 13:22 docker02.txt 
-rw-r--r-- 1 root root 0 May 11 13:24 docker03.txt
```
#### 4、删除docker01，docker02 修改后docker03还能不能访问

```shell
[root@kuangshen docker-test-volume]# docker rm -f docker01 docker01 
[root@kuangshen docker-test-volume]# docker attach docker02 
[root@ea4c82779077 dataVolumeContainer2]# ls -l 
total 0 
-rw-r--r-- 1 root root 0 May 11 13:20 docker01.txt 
-rw-r--r-- 1 root root 0 May 11 13:22 docker02.txt 
-rw-r--r-- 1 root root 0 May 11 13:24 docker03.txt 
[root@ea4c82779077 dataVolumeContainer2]# touch docker02-update.txt 
[root@ea4c82779077 dataVolumeContainer2]# ls -a 
. .. docker01.txt docker02.txt docker02-update.txt docker03.txt 
[root@ea4c82779077 dataVolumeContainer2]# Ctrl+P+Q 退出容器
[root@kuangshen docker-test-volume]# docker attach docker03 
[root@95164598b306 dataVolumeContainer2]# ls -l 
total 0 
-rw-r--r-- 1 root root 0 May 11 13:20 docker01.txt 
-rw-r--r-- 1 root root 0 May 11 13:22 docker02.txt 
-rw-r--r-- 1 root root 0 May 11 13:29 docker02-update.txt 
-rw-r--r-- 1 root root 0 May 11 13:24 docker03.txt
```
#### 5、删除docker02 ，docker03还能不能访问

```shell
[root@kuangshen docker-test-volume]# docker ps 
CONTAINER ID IMAGE 
95164598b306 kuangshen/centos 
ea4c82779077 kuangshen/centos 
[root@kuangshen docker-test-volume]# docker rm -f docker02 
docker02 
[root@kuangshen docker-test-volume]# docker attach docker03 
[root@95164598b306 dataVolumeContainer2]# ls -l 
total 0 
-rw-r--r-- 1 root root 0 May 11 13:20 docker01.txt 
-rw-r--r-- 1 root root 0 May 11 13:22 docker02.txt 
-rw-r--r-- 1 root root 0 May 11 13:29 docker02-update.txt 
-rw-r--r-- 1 root root 0 May 11 13:24 docker03.txt 
[root@95164598b306 dataVolumeContainer2]# touch docker03-update.txt
```
#### 6、新建docker04继承docker03，然后再删除docker03，看下是否可以访问！

![在这里插入图片描述](https://img-blog.csdnimg.cn/fb2a52f897ed4ef296772b41a270e445.jpg#pic_center)

```shell
[root@2119f4f23a92 /]# cd dataVolumeContainer2 
[root@2119f4f23a92 dataVolumeContainer2]# ls -l 
total 0 
-rw-r--r-- 1 root root 0 May 11 13:20 docker01.txt 
-rw-r--r-- 1 root root 0 May 11 13:22 docker02.txt 
-rw-r--r-- 1 root root 0 May 11 13:29 docker02-update.txt 
-rw-r--r-- 1 root root 0 May 11 13:32 docker03-update.txt 
-rw-r--r-- 1 root root 0 May 11 13:24 docker03.txt 

# 查看当前运行的容器 
[root@kuangshen docker-test-volume]# docker ps 
CONTAINER ID IMAGE NAMES 
2119f4f23a92 kuangshen/centos docker04 
95164598b306 kuangshen/centos docker03 

# 继续删除docker03 
[root@kuangshen docker-test-volume]# docker rm -f docker03 
docker03 
[root@kuangshen docker-test-volume]# docker attach docker04 
[root@2119f4f23a92 dataVolumeContainer2]# ls -l 
total 0 
-rw-r--r-- 1 root root 0 May 11 13:20 docker01.txt 
-rw-r--r-- 1 root root 0 May 11 13:22 docker02.txt 
-rw-r--r-- 1 root root 0 May 11 13:29 docker02-update.txt 
-rw-r--r-- 1 root root 0 May 11 13:32 docker03-update.txt 
-rw-r--r-- 1 root root 0 May 11 13:24 docker03.txt
```
得出结论：
容器之间配置信息的传递，数据卷的生命周期一直持续到没有容器使用它为止。
存储在本机的文件则会一直保留！
![在这里插入图片描述](https://img-blog.csdnimg.cn/aef229ce7d30404e87192f0d11b6aeff.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NTg5NjEyNg==,size_16,color_FFFFFF,t_70#pic_center)

![在这里插入图片描述](https://img-blog.csdnimg.cn/4998f5c0a0454f5ea103f8c407c0577e.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NTg5NjEyNg==,size_16,color_FFFFFF,t_70#pic_center)
# docker file
## 介绍
dockerfile是用来构建Docker镜像的构建文件，是由一系列命令和参数构成的脚本。
构建步骤：
1、编写DockerFile文件
2、docker build 构建镜像
3、docker run 运行镜像
4、docker push 发布镜像（DockerHub、阿里云镜像库）
![在这里插入图片描述](https://img-blog.csdnimg.cn/77f43818a5dc4974ba04a6ce0d663ff2.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NTg5NjEyNg==,size_16,color_FFFFFF,t_70#pic_center)

## 构建过程

基础知识：
1、每条保留字指令都必须为大写字母且后面要跟随至少一个参数
2、指令按照从上到下，顺序执行
3、# 表示注释
4、每条指令都会创建一个新的镜像层，并对镜像进行提交
![在这里插入图片描述](https://img-blog.csdnimg.cn/c9fead1eaaaa458db806fdaa60b22e4d.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NTg5NjEyNg==,size_16,color_FFFFFF,t_70#pic_center)
> dockerfile是面向开发的，我们以后要发布项目，做镜像，就需要编写dockerfile文件，这个文件十分简单!'l
Docker镜像逐渐成为企业交付的标准，必须要掌握!
DockerFile :构建文件，定义了一切的步骤，源代码
Dockerlmages :通过DockerFile构建生成的镜像，最终发布和运行的产品!Docker容器︰容器就是镜像运行起来提供服务器

> 流程：

1、docker从基础镜像运行一个容器
2、执行一条指令并对容器做出修改
3、执行类似 docker commit 的操作提交一个新的镜像层
4、Docker再基于刚提交的镜像运行一个新容器
5、执行dockerfile中的下一条指令直到所有指令都执行完成！
说明：
从应用软件的角度来看，DockerFile，docker镜像与docker容器分别代表软件的三个不同阶段。
DockerFile 是软件的原材料 （代码）
Docker 镜像则是软件的交付品 （.apk）
Docker 容器则是软件的运行状态 （客户下载安装执行）
DockerFile 面向开发，Docker镜像成为交付标准，Docker容器则涉及部署与运维，三者缺一不可！


DockerFile：需要定义一个DockerFile，DockerFile定义了进程需要的一切东西。DockerFile涉及的内容
包括执行代码或者是文件、环境变量、依赖包、运行时环境、动态链接库、操作系统的发行版、服务进
程和内核进程（当引用进行需要和系统服务和内核进程打交道，这时需要考虑如何设计 namespace的权
限控制）等等。
Docker镜像：在DockerFile 定义了一个文件之后，Docker build 时会产生一个Docker镜像，当运行Docker 镜像时，会真正开始提供服务；
Docker容器：容器是直接提供服务的。

## dockerfile指令

```shell
FROM # 基础镜像，当前新镜像是基于哪个镜像的 
MAINTAINER # 镜像维护者的姓名混合邮箱地址 
RUN # 容器构建时需要运行的命令 
EXPOSE # 当前容器对外保留出的端口 
WORKDIR # 指定在创建容器后，终端默认登录的进来工作目录，一个落脚点 
ENV # 用来在构建镜像过程中设置环境变量 
ADD # 将宿主机目录下的文件拷贝进镜像且ADD命令会自动处理URL和解压tar压缩包 
COPY # 类似ADD，拷贝文件和目录到镜像中！ 
VOLUME # 容器数据卷，用于数据保存和持久化工作 
CMD # 指定一个容器启动时要运行的命令，dockerFile中可以有多个CMD指令，但只有最 后一个生效！ 
ENTRYPOINT # 指定一个容器启动时要运行的命令！和CMD一样 
ONBUILD # 当构建一个被继承的DockerFile时运行命令，父镜像在被子镜像继承后，父镜像的 ONBUILD被触发
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/ac3e795f95fd4b00a68a4d2c1eb1e68f.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NTg5NjEyNg==,size_16,color_FFFFFF,t_70#pic_center)
## 实战测试
![在这里插入图片描述](https://img-blog.csdnimg.cn/e392bb7e126249e6beb19034306dfd0c.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NTg5NjEyNg==,size_16,color_FFFFFF,t_70#pic_center)
> 创建一个属于自己的centos

```shell
#1.编写dockerfile文件
FROM centos
MAINTAINER cheche<cmq15650272396@163.com>

ENV MYPATH /usr/local
WORKDIR $MYPATH

RUN yum -y install vim
RUN yum -y install net-tools

EXPOSE 80

CMD echo $MYPATH
CMD echo "---end---"
CMD /bin/bash
# 2.通过这个文件构建镜像
docker build -f mydockerfile -t mycentos:0.1 .


[root@iZ8vb15btme7reio6zs71eZ dockerfile]# docker images
REPOSITORY   TAG       IMAGE ID       CREATED          SIZE
mycentos     0.1       78bd78d38c54   12 seconds ago   307MB    ⭐
tomcat       latest    710ec5c56683   10 days ago      668MB
redis        latest    aa4d65e670d6   3 weeks ago      105MB
nginx        latest    08b152afcfae   3 weeks ago      133MB
mysql        5.7.32    cc8775c0fe94   7 months ago     449MB
centos       latest    300e315adb2f   8 months ago     209MB

#3.进入测试

[root@iZ8vb15btme7reio6zs71eZ dockerfile]# docker run -it mycentos:0.1
[root@7fd352f361f6 local]# pwd
/usr/local
[root@7fd352f361f6 local]# 

```
查看镜像生成日志/本地进行的变更历史

```shell
[root@iZ8vb15btme7reio6zs71eZ /]# docker history 78bd78d38c54 
IMAGE          CREATED          CREATED BY                                      SIZE      COMMENT
78bd78d38c54   7 minutes ago    /bin/sh -c #(nop)  CMD ["/bin/sh" "-c" "/bin…   0B        
6b27c6d8f94e   7 minutes ago    /bin/sh -c #(nop)  CMD ["/bin/sh" "-c" "echo…   0B        
085405c88ec0   7 minutes ago    /bin/sh -c #(nop)  CMD ["/bin/sh" "-c" "echo…   0B        
6778e0a97713   7 minutes ago    /bin/sh -c #(nop)  EXPOSE 80                    0B        
49b085e96897   8 minutes ago    /bin/sh -c yum -y install net-tools             29.5MB    
56887131d526   8 minutes ago    /bin/sh -c yum -y install vim                   68.1MB    
f9bce2398edf   11 minutes ago   /bin/sh -c #(nop) WORKDIR /usr/local            0B        
1381b21ad5be   11 minutes ago   /bin/sh -c #(nop)  ENV MYPATH=/usr/local        0B        
505f29f81278   11 minutes ago   /bin/sh -c #(nop)  MAINTAINER cheche<cmq1565…   0B        
300e315adb2f   8 months ago     /bin/sh -c #(nop)  CMD ["/bin/bash"]            0B        
<missing>      8 months ago     /bin/sh -c #(nop)  LABEL org.label-schema.sc…   0B        
<missing>      8 months ago     /bin/sh -c #(nop) ADD file:bd7a2aed6ede423b7…   209MB     
[root@iZ8vb15btme7reio6zs71eZ /]# 

```
> CMD 和ENTRYPOINT区别

```shell
CMD  			#指定这个容器启动时要运行的命令，只有最后一个会生效，可被替代
ENTRYPOINT      #指定这个容器启动的时候要运行的命令，可以追加命令。
```
## 测试：
CMD命令

```shell
# 1、构建dockerfile 
[root@kuangshen home]# vim dockerfile-cmd-test 
[root@kuangshen home]# cat dockerfile-cmd-test 
FROM centos 
CMD [ "ls", "-a" ] 
# 2、build 镜像 
[root@kuangshen home]# docker build -f dockerfile-cmd-test -t cmdtest . 
Sending build context to Docker daemon 22.02kB 
Step 1/2 : FROM centos 
---> 470671670cac 
Step 2/2 : CMD [ "ls", "-a" ] 
---> Running in a3072987de38 
Removing intermediate container a3072987de38 
---> 554bc6952657 
Successfully built 554bc6952657 
Successfully tagged cmdtest:latest 

# 3、执行 
[root@kuangshen home]# docker run 554bc6952657 
.dockerenv 
bin 
dev
etc 
home 
lib 
lib64 
...... 
# 4、如果我们希望用 -l 列表展示信息，我们就需要加上 -l参数 
[root@kuangshen home]# docker run cmdtest -l 
docker: Error response from daemon: OCI runtime create failed: 
container_linux.go:349: starting container process caused "exec: \"-l\": executable file not found in $PATH": unknown. 
# 问题：我们可以看到可执行文件找不到的报错，executable file not found。 
# 之前我们说过，跟在镜像名后面的是 command，运行时会替换 CMD 的默认值。 
# 因此这里的 -l 替换了原来的 CMD，而不是添加在原来的 ls -a 后面。而 -l 根本不是命令，所以自然找不到。 
# 那么如果我们希望加入 -l 这参数，我们就必须重新完整的输入这个命令： 
docker run cmdtest ls -al
```
ENTRYPOINT命令

```shell
# 1、构建dockerfile 
[root@kuangshen home]# vim dockerfile-entrypoint-test 
[root@kuangshen home]# cat dockerfile-entrypoint-test 
FROM centos 
ENTRYPOINT [ "ls", "-a" ] 
# 2、build 镜像 
[root@kuangshen home]# docker build -f dockerfile-entrypoint-test -t entrypointtest . 
Sending build context to Docker daemon 23.04kB 
Step 1/2 : FROM centos 
---> 470671670cac 
Step 2/2 : ENTRYPOINT [ "ls", "-a" ] 
---> Running in bac4ae055630 
Removing intermediate container bac4ae055630 
---> ae07199f9144 
Successfully built ae07199f9144 
Successfully tagged entrypointtest:latest 
# 3、执行 
[root@kuangshen home]# docker run ae07199f9144 
.dockerenv 
bin 
dev 
etc 
home 
lib 
lib64 
...... 
# 4、测试-l参数，发现可以直接使用，这里就是一种追加，我们可以明显的知道 CMD 和 ENTRYPOINT 的区别了 
[root@kuangshen home]# docker run entrypointtest -l 
total 56 
drwxr-xr-x 1 root root 4096 May 12 04:21 . 
drwxr-xr-x 1 root root 4096 May 12 04:21 ..
-rwxr-xr-x 1 root root 0 May 12 04:21 .dockerenv lrwxrwxrwx 1 root root 7 May 11 2019 bin -> usr/bin drwxr-xr-x 5 root root 340 May 12 04:21 dev drwxr-xr-x 1 root root 4096 May 12 04:21 etc drwxr-xr-x 2 root root 4096 May 11 2019 home .....
```
### 实战 部署tomcat镜像
1、 mkdir -p kuangshen/build/tomcat 
2、在上述目录下 touch read.txt
3、将 JDK 和 tomcat 安装的压缩包拷贝进上一步目录
4、在 /kuangshen/build/tomcat 目录下新建一个Dockerfile文件

```shell
# vim Dockerfile 
FROM centos 
MAINTAINER kuangshen<24736743@qq.com> 
#把宿主机当前上下文的read.txt拷贝到容器/usr/local/路径下 
COPY read.txt /usr/local/cincontainer.txt 
#把java与tomcat添加到容器中 
ADD jdk-8u11-linux-x64.tar.gz /usr/local/ 
ADD apache-tomcat-9.0.22.tar.gz /usr/local/ 
#安装vim编辑器 
RUN yum -y install vim 
#设置工作访问时候的WORKDIR路径，登录落脚点 
ENV MYPATH /usr/local 
WORKDIR $MYPATH 
#配置java与tomcat环境变量 
ENV JAVA_HOME /usr/local/jdk1.8.0_11 
ENV CLASSPATH $JAVA_HOME/lib/dt.jar:$JAVA_HOME/lib/tools.jar 
ENV CATALINA_HOME /usr/local/apache-tomcat-9.0.22 
ENV CATALINA_BASE /usr/local/apache-tomcat-9.0.22 
ENV PATH $PATH:$JAVA_HOME/bin:$CATALINA_HOME/lib:$CATALINA_HOME/bin 
#容器运行时监听的端口 
EXPOSE 8080 
#启动时运行tomcat 
# ENTRYPOINT ["/usr/local/apache-tomcat-9.0.22/bin/startup.sh" ] 
# CMD ["/usr/local/apache-tomcat-9.0.22/bin/catalina.sh","run"] 
CMD /usr/local/apache-tomcat-9.0.22/bin/startup.sh && tail -F /usr/local/apache-tomcat-9.0.22/bin/logs/catalina.out
```
当前文件状态
![在这里插入图片描述](https://img-blog.csdnimg.cn/ef4a0b5e54cf43d8b554cf5ad5d88023.jpg#pic_center)
5、构建镜像

```shell
[root@kuangshen tomcat]# docker build -t diytomcat . 
..... 
Successfully built ffdf6529937d 
Successfully tagged diytomcat:latest # 构建完成 
# 查看确定构建完毕！ 
[root@kuangshen tomcat]# docker images 
REPOSITORY TAG IMAGE ID CREATED SIZE 
diytomcat latest ffdf6529937d 20 seconds ago 636MB
```
6、运行启动run

```csharp
docker run -d -p 9090:8080 --name mydiytomcat -v 
/home/kuangshen/build/tomcat/test:/usr/local/apache-tomcat- 9.0.22/webapps/test -v /home/kuangshen/build/tomcat/tomcat9logs/:/usr/local/apache-tomcat- 9.0.22/logs --privileged=true diytomcat
```
![在这里插入图片描述](https://img-blog.csdnimg.cn/9d6e6cfcfad34cea8cdad5e36ff74f71.jpg#pic_center)
备注：Docker挂载主机目录Docker访问出现cannot open directory .: Permission denied 解决办法：在挂载目录后多加一个--privileged=true参数即可
7、验证测试访问！curllocalhost:9090
![在这里插入图片描述](https://img-blog.csdnimg.cn/3ccc044a1574451ba2d3f71575079716.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NTg5NjEyNg==,size_16,color_FFFFFF,t_70#pic_center)
8、结合前面学习的容器卷将测试的web服务test发布
![在这里插入图片描述](https://img-blog.csdnimg.cn/226b4118c65c47f5bdea6a466255daed.jpg#pic_center)
web.xml

```xml
<?xml version="1.0" encoding="UTF-8"?> 
<web-app xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns="http://java.sun.com/xml/ns/javaee" xsi:schemaLocation="http://java.sun.com/xml/ns/javaee http://java.sun.com/xml/ns/javaee/web-app_2_5.xsd" id="WebApp_ID" version="2.5"> 
<display-name>test</display-name> 
</web-app>
```
a.jsp

```html
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%> <!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd"> 
<html> 
<head> <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"> <title>hello，kuangshen</title> </head> <body> -----------welcome------------ <%=" my docker tomcat，kuangshen666 "%> <br> <br> <% System.out.println("-------my docker tomcat-------");%> 
</body> 
</html>
```
9、测试

![在这里插入图片描述](https://img-blog.csdnimg.cn/fbbb54f2122143e1aece68430c4dc899.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NTg5NjEyNg==,size_16,color_FFFFFF,t_70#pic_center)

```shell
# 查看日志 
[root@kuangshen tomcat]# cd tomcat9logs/ 
[root@kuangshen tomcat9logs]# ll 
total 24 
-rw-r----- 1 root root 6993 May 12 12:50 catalina.2020-05-12.log 
-rw-r----- 1 root root 7024 May 12 12:53 catalina.out 
-rw-r----- 1 root root 0 May 12 12:47 host-manager.2020-05-12.log 
-rw-r----- 1 root root 408 May 12 12:47 localhost.2020-05-12.log 
-rw-r----- 1 root root 150 May 12 12:53 localhost_access_log.2020-05-12.txt -rw-r----- 1 root root 0 May 12 12:47 manager.2020-05-12.log 
[root@kuangshen tomcat9logs]# cat catalina.out 
.... 
-------my docker tomcat------- # 搞定
```
## 发布镜像
> DockerHub

注册dockerhub   https://hub.docker.com/signup，需要有一个账号

```shell
# 1、查看登录命令 
[root@kuangshen tomcat]# docker login --help 
Usage: docker login [OPTIONS] [SERVER] 
# 2、登录 
[root@kuangshen tomcat]# docker login -u kuangshen 
Password: 
WARNING! Your password will be stored unencrypted in 
/root/.docker/config.json. 
Configure a credential helper to remove this warning. See https://docs.docker.com/engine/reference/commandline/login/#credentials- store 
Login Succeeded //表示登录成功⭐⭐⭐
# 3、将镜像发布出去   人的名字 镜像名以及版本号
[root@kuangshen tomcat]# docker push kuangshen/diytomcat:1.0 
The push refers to repository 
[docker.io/library/diytomcat] 
0f02399c6fdf: Preparing 
e79ea0c3a34e: Preparing 
09281fa8fe38: Preparing 
b56a902b0aef: Preparing 
0683de282177: Preparing 
# 拒绝：请求的资源访问被拒绝 
denied: requested access to the resource is denied 
# 问题：本地镜像名无帐号信息，解决加 tag即可 版本号c'c'c
docker tag 251ca4419332 kuangshen/diytomcat:1.0 
# 再次 push， ok 
[root@kuangshen tomcat]# docker push kuangshen/diytomcat:1.0 
The push refers to repository [docker.io/kuangshen/diytomcat] 
0f02399c6fdf: Pushing [========>                    ] 9.729MB/59.76MB 
e79ea0c3a34e: Pushing [==========>                   ] 3.188MB/15.41MB 
09281fa8fe38: Pushing [>                             ] 3.823MB/324MB 
b56a902b0aef: Pushed 
0683de282177: Pushing [=>                            ] 5.997MB/237.1MB
```

>阿里云镜像服务

1、登录阿里云
2、找到容器镜像服务
3、创建命名空间
![在这里插入图片描述](https://img-blog.csdnimg.cn/a1f9e5d2d55a46ab92a9b1d28f663b79.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NTg5NjEyNg==,size_16,color_FFFFFF,t_70#pic_center)

4、创建镜像仓库
![在这里插入图片描述](https://img-blog.csdnimg.cn/ec072a135d774980af82727dc0550ba1.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NTg5NjEyNg==,size_16,color_FFFFFF,t_70#pic_center)
![在这里插入图片描述](https://img-blog.csdnimg.cn/68f83b868333408387a922ed8005c23c.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NTg5NjEyNg==,size_16,color_FFFFFF,t_70#pic_center)
5、浏览阿里云
操作步骤
![在这里插入图片描述](https://img-blog.csdnimg.cn/746709f740c94ffd9671f95f1026afa6.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NTg5NjEyNg==,size_16,color_FFFFFF,t_70#pic_center)
6、按阿里云操作会生成镜像版本
![在这里插入图片描述](https://img-blog.csdnimg.cn/ffc379dc14d148ca8070783e53650bb8.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NTg5NjEyNg==,size_16,color_FFFFFF,t_70#pic_center)
7、参靠阿里云文档
# 小结
![在这里插入图片描述](https://img-blog.csdnimg.cn/dd44a308aab94d70a0ff57c5334c8501.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NTg5NjEyNg==,size_16,color_FFFFFF,t_70#pic_center)


![在这里插入图片描述](https://img-blog.csdnimg.cn/96f42d2e8f7b4b18a2f6646498d583f4.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NTg5NjEyNg==,size_16,color_FFFFFF,t_70#pic_center)



## docker 网络（容器编排 集群处理）
准备工作：清空所有容器，清空所有镜像

```shell
docker rm -f $(docker ps -a -q) # 删除所有容器 
docker rmi -f $(docker images -qa) # 删除全部镜像
```
查看本地ip   ip addr
分析可得，有三个网络
![在这里插入图片描述](https://img-blog.csdnimg.cn/aeba38fea376417ca70a6440acbfb2f9.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NTg5NjEyNg==,size_16,color_FFFFFF,t_70#pic_center)

```csharp
lo 127.0.0.1 # 本机回环地址 
eth0 172.17.90.138 # 阿里云的私有IP 
docker0 172.18.0.1 # docker网桥 
# 问题：Docker 是如何处理容器网络访问的？
```

```shell
# 启动tomcat01 
[root@kuangshen ~]# docker run -d -P --name tomcat01 tomcat 
# 查看tomcat01的ip地址，docker会给每个容器都分配一个ip！ 
[root@kuangshen ~]# docker exec -it tomcat01 ip addr 
1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN group 
default qlen 1000 

	link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00 
	inet 127.0.0.1/8 scope host lo 
		valid_lft forever preferred_lft forever 
	122: eth0@if123: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc noqueue state UP group default 
	link/ether 02:42:ac:12:00:02 brd ff:ff:ff:ff:ff:ff 
	link-netnsid 0 inet 172.18.0.2/16 brd 172.18.255.255 scope global eth0 
		valid_lft forever preferred_lft forever 
# 思考，我们的linux服务器是否可以ping通容器内的tomcat ？ 
[root@kuangshen ~]# ping 172.18.0.2 
PING 172.18.0.2 (172.18.0.2) 56(84) bytes of data. 
64 bytes from 172.18.0.2: icmp_seq=1 ttl=64 time=0.070 ms # 可以ping通！
```
> 原理

1.我们每启动一个docker容器，docker就会给docker容器分配一个ip，我们·只要安装了docker，就会有一个网卡docker0桥接模式，使用evth-pair技术

2.每启动一个容器，linux主机就会多了一个虚拟网卡

```shell
# 我们启动了一个tomcat01，主机的ip地址多了一个 123: vethc8584ea@if122 
# 然后我们在tomcat01容器中查看容器的ip是 122: eth0@if123 
# 我们再启动一个tomcat02观察 
[root@kuangshen ~]# docker run -d -P --name tomcat02 tomcat 
# 然后发现linux主机上又多了一个网卡 125: veth021eeea@if124: 
# 我们看下tomcat02的容器内ip地址是 124: eth0@if125: 
[root@kuangshen ~]# docker exec -it tomcat02 ip addr 
# 观察现象： 
# tomcat --- linux主机 vethc8584ea@if122 ---- 容器内 eth0@if123 
# tomcat --- linux主机 veth021eeea@if124 ---- 容器内 eth0@if125 
# 相信到了这里，大家应该能看出点小猫腻了吧！只要启动一个容器，就有一对网卡 
# veth-pair 就是一对的虚拟设备接口，它都是成对出现的。一端连着协议栈，一端彼此相连着。 
# 正因为有这个特性，它常常充当着一个桥梁，连接着各种虚拟网络设备! 
# “Bridge、OVS 之间的连接”，“Docker 容器之间的连接” 等等，以此构建出非常复杂的虚拟网络 结构，比如 OpenStack Neutron。
```
容器之间可以ping通
网络模型图
![在这里插入图片描述](https://img-blog.csdnimg.cn/d744d8d248df4151b1175bca8ea6413d.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NTg5NjEyNg==,size_16,color_FFFFFF,t_70#pic_center)
结论：tomcat1和tomcat2共用一个路由器。是的，他们使用的一个，就是docker0。任何一个容器启动
默认都是docker0网络。
docker默认会给容器分配一个可用ip。
Docker使用Linux桥接，在宿主机虚拟一个Docker容器网桥(docker0)，Docker启动一个容器时会根据
Docker网桥的网段分配给容器一个IP地址，称为Container-IP，同时Docker网桥是每个容器的默认网
关。因为在同一宿主机内的容器都接入同一个网桥，这样容器之间就能够通过容器的Container-IP直接
通信。

#### link
思考一个场景，我们编写一个微服务，数据库连接地址原来是使用ip的，如果ip变化就不行了，那我们
能不能使用服务名访问呢？
jdbc:mysql://mysql:3306，这样的话哪怕mysql重启，我们也不需要修改配置了！docker提供了 --link
的操作！

```shell
# 我们使用tomcat02，直接通过容器名ping tomcat01，不使用ip 
[root@kuangshen ~]# docker exec -it tomcat02 ping tomcat01 
ping: tomcat01: Name or service not known # 发现ping不通 
# 我们再启动一个tomcat03，但是启动的时候连接tomcat02

[root@kuangshen ~]# docker run -d -P --name tomcat03 --link tomcat02 tomcat a3a4a17a2b707766ad4f2bb967ce1d94f658cd4cccef3bb8707395cdc71fa1e7 
# 这个时候，我们就可以使用tomcat03 ping通tomcat02 了 
[root@kuangshen ~]# docker exec -it tomcat03 
ping tomcat02 PING tomcat02 (172.18.0.3) 56(84) bytes of data. 
64 bytes from tomcat02 (172.18.0.3): icmp_seq=1 ttl=64 time=0.093 ms 
64 bytes from tomcat02 (172.18.0.3): icmp_seq=2 ttl=64 time=0.066 ms 

# 再来测试，tomcat03 是否可以ping tomcat01 失败 
[root@kuangshen ~]# docker exec -it tomcat03 
ping tomcat01 ping: tomcat01: Name or service not known 

# 再来测试，tomcat02 是否可以ping tomcat03 反向也ping不通 
[root@kuangshen ~]# docker exec -it tomcat02 
ping tomcat03 ping: tomcat03: Name or service not known
```
思考，这个原理是什么呢？我们进入tomcat03中查看下host配置文件

```shell
[root@kuangshen ~]# docker exec -it tomcat03 cat /etc/hosts 
127.0.0.1 localhost 
::1 localhost ip6-localhost ip6-loopback 
fe00::0 ip6-localnet 
ff00::0 ip6-mcastprefix 
ff02::1 ip6-allnodes 
ff02::2 ip6-allrouters 
172.18.0.3 tomcat02 b80da266a3ad # 发现tomcat2直接被写在这里 
172.18.0.4 a3a4a17a2b70 

# 所以这里其实就是配置了一个 hosts 地址而已！ 
# 原因：--link的时候，直接把需要link的主机的域名和ip直接配置到了hosts文件中了。
```
这link新手玩 过时
### 自定义网络
> 查看所有网络
![在这里插入图片描述](https://img-blog.csdnimg.cn/cb4c17e159204f45902f364bc961564c.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NTg5NjEyNg==,size_16,color_FFFFFF,t_70#pic_center)
####  网络模式
![在这里插入图片描述](https://img-blog.csdnimg.cn/1c524d0b0ebf4acf92c156fbc11ce8a0.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NTg5NjEyNg==,size_16,color_FFFFFF,t_70#pic_center)
##### 查看一个具体的网络的详细信息
docker network inspec   id
> 自定义网卡

1、删除原来的所有容器

```shell
[root@kuangshen ~]# docker rm -f $(docker ps -aq) 
# 恢复到了最开始的样子 
[root@kuangshen ~]# ip addr 
1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN group default qlen 1000 
	link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00 
	inet 127.0.0.1/8 scope host lo 
		valid_lft forever preferred_lft forever
2: eth0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc pfifo_fast state UP group default qlen 1000 		
	link/ether 00:16:3e:30:27:f4 brd ff:ff:ff:ff:ff:ff 
	inet 172.17.90.138/20 brd 172.17.95.255 scope global dynamic eth0 
		valid_lft 310951436sec preferred_lft 310951436sec 
3: docker0: <NO-CARRIER,BROADCAST,MULTICAST,UP> mtu 1500 qdisc noqueue state DOWN group default 
	link/ether 02:42:bb:71:07:06 brd ff:ff:ff:ff:ff:ff 
	inet 172.18.0.1/16 brd 172.18.255.255 scope global docker0 
		valid_lft forever preferred_lft forever
		
```
2、接下来我们来创建容器，但是我们知道默认创建的容器都是docker0网卡的

```shell
# 默认我们不配置网络，也就相当于默认值 --net bridge 使用的docker0 
docker run -d -P --name tomcat01 --net bridge tomcat 
# docker0网络的特点 
	1.它是默认的 
	2.域名访问不通 
	3.--link 域名通了，但是删了又不行
```
3、我们可以让容器创建的时候使用自定义网络

```shell
# 自定义创建的默认default "bridge" 
# 自定义创建一个网络网络 
[root@kuangshen ~]# docker network create --driver bridge --subnet 192.168.0.0/16 --gateway 192.168.0.1 mynet 
09bd09d8d3a6b33e6d19f49643dab551e5a45818baf4d5328aa7320c6dcfc236 
# 确认下 
[root@kuangshen ~]# docker network ls 
NETWORK ID NAME DRIVER SCOPE 
4eb2182ac4b2 bridge bridge local 
ae2b6209c2ab host host local 
09bd09d8d3a6 mynet bridge local 
c037f7ec7e57 none null local 
[root@kuangshen ~]# docker network inspect mynet 
[ { "Name": "mynet", "Id": "09bd09d8d3a6b33e6d19f49643dab551e5a45818baf4d5328aa7320c6dcfc236",
"Created": "2020-05-13T13:29:33.568644836+08:00", "Scope": "local", "Driver": "bridge", "EnableIPv6": false, "IPAM": { "Driver": "default", "Options": {}, "Config": [ { "Subnet": "192.168.0.0/16", "Gateway": "192.168.0.1" } ] },"Internal": false, "Attachable": false, "Ingress": false, "ConfigFrom": { "Network": "" },"ConfigOnly": false, "Containers": {}, "Options": {}, "Labels": {} } ]
# 我们来启动两个容器测试，使用自己的 mynet！ 
[root@kuangshen ~]# docker run -d -P --name tomcat-net-01 --net mynet tomcat    065f82e947c760c63539ab4c0de0d683787ec7ac6d0dcaa71f64e191319f9fe7 
[root@kuangshen ~]# docker run -d -P --name tomcat-net-02 --net mynet tomcat 2e85d71afe87c87166786b0bbae2d90eefb969d716fcd78a21173add5956cb12 
[root@kuangshen ~]# docker ps 
CONTAINER ID IMAGE PORTS NAMES 
2e85d71afe87 tomcat 0.0.0.0:32772->8080/tcp tomcat-net-02 
065f82e947c7 tomcat 0.0.0.0:32771->8080/tcp tomcat-net-01 
# 再来查看下 
[root@kuangshen ~]# docker network inspect mynet 
[ { "Name": "mynet", "Id": "09bd09d8d3a6b33e6d19f49643dab551e5a45818baf4d5328aa7320c6dcfc236", ............ "Containers": { "065f82e947c760c63539ab4c0de0d683787ec7ac6d0dcaa71f64e191319f9fe7": { "Name": "tomcat-net-01", "EndpointID": "d61cef1bc294d7f10fb6d9b728735fc87bed79e4e02f5298374f0fab3e9b2da6", "MacAddress": "02:42:c0:a8:00:02", "IPv4Address": "192.168.0.2/16", "IPv6Address": "" }, "2e85d71afe87c87166786b0bbae2d90eefb969d716fcd78a21173add5956cb12": { "Name": "tomcat-net-02",
"EndpointID": "adbc37a20526c2985c3589382998a3d106ef722662c7b296a57d8a7c8f449f38", "MacAddress": "02:42:c0:a8:00:03", "IPv4Address": "192.168.0.3/16", "IPv6Address": "" } },"Options": {}, "Labels": {} } ]
# 我们来测试ping容器名和ip试试，都可以ping通 
[root@kuangshen ~]# docker exec -it tomcat-net-01 ping 192.168.0.3 PING 192.168.0.3 (192.168.0.3) 56(84) bytes of data. 
64 bytes from 192.168.0.3: icmp_seq=1 ttl=64 time=0.093 ms 
[root@kuangshen ~]# docker exec -it tomcat-net-01 ping tomcat-net-02 PING tomcat-net-02 (192.168.0.3) 56(84) bytes of data. 
64 bytes from tomcat-net-02.mynet (192.168.0.3): icmp_seq=1 ttl=64 time=0.063 ms 
64 bytes from tomcat-net-02.mynet (192.168.0.3): icmp_seq=2 ttl=64 time=0.066 ms 
# 发现，我们自定义的网络docker都已经帮我们维护好了对应的关系 # 所以我们平时都可以这样使用网络，不使用--link效果一样，所有东西实时维护好，直接域名 ping 通。
```

### 网络连通
![在这里插入图片描述](https://img-blog.csdnimg.cn/e08d2964ef9c424d85e4c884416b12b6.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NTg5NjEyNg==,size_16,color_FFFFFF,t_70#pic_center)
docker0和自定义网络肯定不通，我们使用自定义网络的好处就是网络隔离：
大家公司项目部署的业务都非常多，假设我们有一个商城，我们会有订单业务（操作不同数据），会有
订单业务购物车业务（操作不同缓存）。如果在一个网络下，有的程序猿的恶意代码就不能防止了，所
以我们就在部署的时候网络隔离，创建两个桥接网卡，比如订单业务（里面的数据库，redis，mq，全
部业务 都在order-net网络下）其他业务在其他网络。
那关键的问题来了，如何让 tomcat-net-01 访问 tomcat1？

```shell
# 启动默认的容器，在docker0网络下 [root@kuangshen ~]# docker run -d -P --name tomcat01 tomcat bcd122e0dcf6bf8c861eaa934911f98a5497a4954f3fde9575e496160bd23287 
[root@kuangshen ~]# docker run -d -P --name tomcat02 tomcat 6183aaeca003a3e5a3549a37f9c1040551320ae358807b4aaad547a986afb887
# 查看当前的容器 
[root@kuangshen ~]# docker ps 
CONTAINER ID IMAGE PORTS NAMES 
6183aaeca003 tomcat 0.0.0.0:32774->8080/tcp tomcat02 
bcd122e0dcf6 tomcat 0.0.0.0:32773->8080/tcp tomcat01 
2e85d71afe87 tomcat 0.0.0.0:32772->8080/tcp tomcat- 
net-02 
065f82e947c7 tomcat 0.0.0.0:32771->8080/tcp tomcat- 
net-01 

# 我们来查看下network帮助，发现一个命令 connect 
[root@kuangshen ~]# docker network --help 
Commands: 
	connect        Connect a container to a network # 连接一个容器到一个网络 
	create         Create a network 
	disconnect     Disconnect a container from a network 
	inspect        Display detailed information on one or more networks 
	ls             List networks 
	prune          Remove all unused networks 
	rm             Remove one or more networks 
# 我们来测试一下！打通mynet-docker0 
# 命令 docker network connect 
[OPTIONS] NETWORK CONTAINER 
[root@kuangshen ~]# docker network connect mynet tomcat01 
[root@kuangshen ~]# docker network inspect mynet 
[ { ...... "Containers": { "065f82e947c760c63539ab4c0de0d683787ec7ac6d0dcaa71f64e191319f9fe7": { "Name": "tomcat-net-01", "EndpointID": "d61cef1bc294d7f10fb6d9b728735fc87bed79e4e02f5298374f0fab3e9b2da6", "MacAddress": "02:42:c0:a8:00:02", "IPv4Address": "192.168.0.2/16", "IPv6Address": "" }, "2e85d71afe87c87166786b0bbae2d90eefb969d716fcd78a21173add5956cb12": { "Name": "tomcat-net-02", "EndpointID": "adbc37a20526c2985c3589382998a3d106ef722662c7b296a57d8a7c8f449f38", "MacAddress": "02:42:c0:a8:00:03", "IPv4Address": "192.168.0.3/16", "IPv6Address": "" },// 发现我们的tomcat01就进来这里了，tomcat01拥有了双ip "bcd122e0dcf6bf8c861eaa934911f98a5497a4954f3fde9575e496160bd23287": { "Name": "tomcat01", "EndpointID": "b2bf2342948e17048d872a4d5603c77e90d0e032439d510e86c10a1acc3928d9", "MacAddress": "02:42:c0:a8:00:04", "IPv4Address": "192.168.0.4/16", "IPv6Address": ""} },...... } ]

# tomcat01 可以ping通了 
[root@kuangshen ~]# docker exec -it tomcat01 ping tomcat-net-01 
PING tomcat-net-01 (192.168.0.2) 56(84) bytes of data. 
64 bytes from tomcat-net-01.mynet (192.168.0.2): icmp_seq=1 ttl=64 time=0.071 ms 
64 bytes from tomcat-net-01.mynet (192.168.0.2): icmp_seq=2 ttl=64 time=0.067 ms 
# tomcat02 依旧ping不通，大家应该就理解了 
[root@kuangshen ~]# docker exec -it tomcat02 ping tomcat-net-01 ping: tomcat-net-01: Name or service not known
```
结论：如果要跨网络操作别人，就需要使用 docker network connect [OPTIONS] NETWORK CONTAINER 连接

# 未完





# 企业实战
## docker-compose 容器编排
管理docker
[参考网址](https://www.jianshu.com/p/658911a8cff3)



## docker swarm  集群部署


## CI/CD jenkins流水线





# 实战
## 安装mysql与本地创建连接

```cpp
# 1、 拉取镜像  
docker pull mysql:5.7.32

# 2、运行容器，挂载数据  后台运行加暴漏端口 -v 挂载数据   放在home文件夹下mysql文件夹下 目录
# -d 后台运行   -v数据卷挂载   -p端口映射   -e环境配置   --name 容器名字
docker run -d -p 3310:3306 -v /home/mysql/conf:/etc/mysql/conf.d -v /home/mysql/data:/var/lib/mysql -e MYSQL_ROOT_PASSWORD=密码 --name mysql01 mysql:5.7.32
```
注意：需要关闭防火墙以及开放暴漏出去端口       数据库连接输入主机地址 以及端口为暴漏出去端口。

## 安装nginx与本地创建连接

```shell
# 1、
docker run -d -p 8081:80 --name nginx01 --net host -v /docker/nginx/www:/usr/share/nginx/html -v /docker/nginx/logs:/var/log/nginx nginx
# 2、
docker exec -it nginx01 /bin/bash （进入容器 获取文件）
#3、
cd /etc/nginx/ （这里主要获取配置文件路径的）
# 4、
exit
# 5、
cd /docker/nginx/conf/
# 6、容器id替换自己生成的
docker cp 1eb88ad2fb93:/etc/nginx/nginx.conf .
ps：文件copy成功后 把nginx容器先删除掉
# 7、
docker rm -f nginx01
# 8、
docker run -d -p 8081:80 --name nginx01 --net host -v /docker/nginx/www:/usr/share/nginx/html -v /docker/nginx/conf/nginx.conf:/etc/nginx/nginx.conf -v /docker/nginx/logs:/var/log/nginx nginx
```
## 部署redis集群
![在这里插入图片描述](https://img-blog.csdnimg.cn/e5b9cdfb64bb476f8ad37a08fff138e5.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NTg5NjEyNg==,size_16,color_FFFFFF,t_70#pic_center)

```shell
# 创建网卡 ⭐
docker network create redis --subnet 172.38.0.0/16 
# 通过脚本创建六个redis配置 复制到命令行  回车  有空格会自动换行不换行就手动回车
for port in $(seq 1 6); 
\ do \ 
mkdir -p /mydata/redis/node-${port}/conf 
touch /mydata/redis/node-${port}/conf/redis.conf 
cat << EOF >/mydata/redis/node-${port}/conf/redis.conf 
port 6379 
bind 0.0.0.0
cluster-enabled yes 
cluster-config-file nodes.conf 
cluster-node-timeout 5000 
cluster-announce-ip 172.38.0.1${port} 
cluster-announce-port 6379 
cluster-announce-bus-port 16379 
appendonly yes 
EOF 
done 

# 进入redis文件夹下查看 有6个  随笔那进入其中一个查看 cat redis.conf 就可以查看到端口号以及地址  
#将下方代码复制命令行执行。  ⭐模板⭐具体看下方
docker run -p 637${port}:6379 -p 1637${port}:16379 --name redis-${port} \ 
-v /mydata/redis/node-${port}/data:/data \ 
-v /mydata/redis/node-${port}/conf/redis.conf:/etc/redis/redis.conf \ 
-d --net redis --ip 172.38.0.1${port} redis:5.0.9-alpine3.11 redis-server /etc/redis/redis.conf; \ 

# 启动6个容器 用上方同样命令，只需要注意端口及名字⭐就是这里⭐
docker run -p 6371:6379 -p 16371:16379 --name redis-1 \ 
-v /mydata/redis/node-1/data:/data \ 
-v /mydata/redis/node-1/conf/redis.conf:/etc/redis/redis.conf \ 
-d --net redis --ip 172.38.0.11 redis:5.0.9-alpine3.11 redis-server 
/etc/redis/redis.conf 
docker run -p 6376:6379 -p 16376:16379 --name redis-6 \ 
-v /mydata/redis/node-6/data:/data \ 
-v /mydata/redis/node-6/conf/redis.conf:/etc/redis/redis.conf \ 
-d --net redis --ip 172.38.0.16 redis:5.0.9-alpine3.11 redis-server /etc/redis/redis.conf 


# docker ps 此时会出现6个容器

# 进入一个redis，注意这里是 sh命令 
docker exec -it redis-1 /bin/sh 

# ls
/data #  appendonly.aof   nodes.conf 
# 创建集群 
redis-cli --cluster create 172.38.0.11:6379 172.38.0.12:6379 172.38.0.13:6379 172.38.0.14:6379 172.38.0.15:6379 172.38.0.16:6379 -- cluster-replicas 1 

# 输入yes自动创建集群

# 连接集群 
redis-cli -c 
# 查看集群信息 
cluster info 
# 查看节点 
cluster nodes 
# set a b 
# 停止到存值的容器 
# 然后再次get a，发现依旧可以获取值 
# 查看节点，发现高可用完全没问题

```
![在这里插入图片描述](https://img-blog.csdnimg.cn/dcb6d9ee9ffd4630977e1ccdf8b2698f.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NTg5NjEyNg==,size_16,color_FFFFFF,t_70#pic_center)
## springboot微服务打包docker镜像
将java项目打包成jar包
写一个dokerfile
### 1.构架springboot项目
### 2.打包应用
### 3.编写dockerfile
### 4.构建镜像
 1、在项目下编写 Dockerfile 文件，将打包好的jar包拷贝到Dockerfile同级目录

```shell
FROM java:8 
# 服务器只有dockerfile和jar在同级目录 
COPY *.jar /app.jar 
CMD ["--server.port=8080"] 
# 指定容器内要暴露的端口 
EXPOSE 8080 ENTRYPOINT 
["java","-jar","/app.jar"]
```
2、将Dockerfile 和 项目的 jar 包上传到linux服务器上，构建运行

```shell
[root@kuangshen idea]# pwd 
/home/idea 
[root@kuangshen idea]# ll 
total 17228 
-rw-r--r-- 1 root root 17634294 May 14 12:33 demo-0.0.1-SNAPSHOT.jar 
-rw-r--r-- 1 root root 207 May 14 12:32 Dockerfile 
# 构建镜像 
docker build -t idea-ks . 
# 查看镜像 
docker images 
# 运行 
docker run -d -P --name idea-ks idea-ks 
[root@kuangshen ~]# docker ps 
CONTAINER ID IMAGE PORTS NAMES 
2366c960ba99 idea-ks 0.0.0.0:32779->8080/tcp idea-ks1 

# 测试访问 
[root@kuangshen ~]# curl localhost:32779 
[root@kuangshen ~]# curl localhost:32779/hello
```

### 5.发布运行


@[TOC](git git git)
# 一、常用命令行
cd 文件夹路径    #进入到某个文件夹
cd ..           #返回上一层文件夹

# 二、Git常用命令
## 一、
1.进入项目目录
cd 项目目录的路径      #进入项目目录

2.初始化本地git仓库
git init    #初始化一个git仓库(repository)，初始化完成之后会在
            项目目录中自动创建一个.git隐藏文件夹，此文件夹是
            git的版本记录，用来跟踪或者管理git仓库

3.查看版本库的状态
git status      #查看当前git仓库的状态
git status -s   #简单方式查看git仓库的状态

4.把工作区的文件添加到暂存区
git add 文件名   #把没有添加到暂存区的文件添加到暂存区(文件名可写多个)
git add .       #把工作区没有添加到暂存区文件全部添加到暂存区(一次添加多个)

5.把缓存区的文件提交到本地仓库
git commit -m 提交的备注信息  #把加入暂存区的文件提交到本地仓库
        commit 提交，-m表示给提交的内容添加描述信息，用来备注本次
        提交的信息。
        注意：提交的备注信息不能省略，写的要有意义
            （有的公司会作为工作内容的考核）

6.查看版本库的历史操作记录
git log     #查看git操作的详细历史记录
    比如：
    commit b979bc1782e8f56750554323474da72ebca03553 #本次操作的版本号(commit id 版本号是唯一的)
    Author: jinxizhen <842166299@qq.com>                  #用户信息
    Date:   Thu Jan 19 11:40:55 2017 +0800          #提交的日期

        初始化了git仓库并创建index.txt                #提交的备注信息
git log --oneline   #把git操作日志简化为一行显示
git reflog          #查看操作命令及日志


## 二、版本回退

1.修改的内容还没有添加到暂存区
git checkout -- 文件名     #撤销工作区最后一次修改的内容，
                           前提是修改的内容还没有添加到暂存区

2.修改的内容已经添加到暂存区，但是还没有提交到本地仓库
先使用 git reset HEAD 文件名      #撤销添加到暂存区的内容
再使用 git checkout -- 文件名     #回退到上一个状态

3.修改的内容已经提交到了本地仓库
git reset --hard 版本号    #回退到指定的版本号的状态


# 三、本地仓库和远程仓库的连接
1.从远程仓库克隆到本地
git clone https://git.oschina.net/jinxizhen/H21weather.git  #克隆项目，把远程库创建的好的(已经有的项目)项目同步到本地

git pull    #同步远程库的文件到本地
git push    #同步本地的文件到远程库

2.从工作目录连接远程库
git remote add origin git@git.oschina.net:jinxizhen/H21rili.git #连接远程库

先使用
git pull --rebase origin master #从远程库同步到本地
git push -u origin master       #把本地仓库的内容推送到远程库

之后就是 git pull / git push  ...


# 四、添加公钥 sshkey 

## 1.ssh-keygen -t rsa -C "邮箱号"   #生成公钥（邮箱：注册码云的邮箱）
    生成公钥的步骤 
    a.生成公钥时，会提示我们选择保存的路径， 
    Generating public/private rsa key pair.
    Enter file in which to save the key (/c/Users/Jinxizhen/.ssh/id_rsa):
            路径使用默认的，直接回车

    b.如果提示已经存在，可以直接覆盖掉
    /c/Users/Jinxizhen/.ssh/id_rsa already exists.
    Overwrite (y/n)?
    输入:y 然后回车 

    c.最后会提示输入密码
    Enter passphrase (empty for no passphrase):
    Enter same passphrase again:
    密码可以不用输入，直接回车，就可以生成公钥

    d.成功的提示
    Your identification has been saved in /c/Users/Jinxizhen/.ssh/id_rsa
    Your public key has been saved in /c/Users/Jinxizhen/.ssh/id_rsa.pub
    The key fingerprint is:
    SHA256:g1VOz7OAJMSq49Vc1pSzvlDLsItX+JtiMGqRqJSaakQ 842166299@qq.com
    The key's randomart image is:
    +---[RSA 3072]----+
    |     oo . o.     |
    |      .o =+o     |
    |     .  oooo+    |
    | E  .  o+ +. o   |
    |. .o +.oSB ..    |
    | ++ + = +.=      |
    |++ o o + = .     |
    |+.. o . = o.     |
    |+  .   o .o.     |
    +----[SHA256]-----+


## 2.cat ~/.ssh/id_rsa.pub     #查看公钥
    比如输出：
    ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQC53lok+oPntpwg0E0p6z2Klxb7275YyWcWyxiQZk7sKL0J90xi1btvqd7MVEHH2UvuPluSKwyLVTQCmA1iWlqyRjuO4LBeY85feqkhKWi+haq5u9NEAcALS00vNH6URWS7Uz5gU1RIs3F9Ssd9V/VsWNJ28DVIGKYM2s8Vs0K1CQ3l0Ed0onlOsOb2vUa/5k8R64P8vS+EpV/1XsxH99cQK2tq8A6tyRBAGe406s/sNufV/EYvGcM9nQyz+QI/lxcoHCw0xc9kkezxk4X8uTxgwMBx5EkTmMzYxcr34jT+ltsMHULmaJPWoN4J55EdINY+9YzfpwqYABoQATjK0p8z 842166299@qq.com

## 3.ssh -T git@gitee.com    #验证公钥是否添加成功，出现以下提示“successfully” 表示成功
    Hi 金西振 (DeployKey)! You've successfully authenticated, but GITEE.COM does not provide shell access.
    Note: Perhaps the current use is DeployKey.
    Note: DeployKey only supports pull/fetch operations



# 五、分支操作

git branch            #查看所有分支，当前的分之前会有一个*符号
git branch 分支名      #创建一个分支
git checkout 分支名    #切换到指定的分支

git checkout -b 分支名 #创建一个分支，并切换到分支(相当于创建+切换)

git merge 分支名       #合并指定分支的内容到当前分支
git log --graph       #查看分支合并信息
git branch -d 分支名   #删除分支

# 六、.gitignore文件
.gitignore 用来添加不需要上传到远程库的文件
把文件名写在.gitignore文件内即可，以/结尾表示目录，否则表示单个文件

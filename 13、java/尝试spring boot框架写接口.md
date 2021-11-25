## github参考项目代码地址：
https://github.com/thomas373737/springBootModel.git
# 步骤

 - 1.建立实体类，跟数据库表字段保持一致
 - 2.建立mapper接口，定义要操作数据库的动作
 - 3.建立mapper的xml文件，写具体的sql语句
 - 4.建立service类，处理业务逻辑
 - 5.在controller类中展示处理结果

# 开始项目
## 创建项目
选择spring boot框架
![在这里插入图片描述](https://img-blog.csdnimg.cn/0671ad9bb0634c58b18813d5aa3f9b56.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NTg5NjEyNg==,size_16,color_FFFFFF,t_70#pic_center)
至此，算是创建成功。
稍等片刻，等加载完成。
## 2.运行项目
![在这里插入图片描述](https://img-blog.csdnimg.cn/f7648cd7cb41470d8e6dfbcb71e7d7c2.jpg#pic_center)
需要配置数据库

![在这里插入图片描述](https://img-blog.csdnimg.cn/ff61686b17df47fe82d9ad13eb6c7ad6.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NTg5NjEyNg==,size_16,color_FFFFFF,t_70#pic_center)
在此文件添加配置文件
（自己敲代码注意间隔，很容易报错。还有尽量不要写注释）
```yml
server:
  port: 8081
spring:
  #数据库配置
  datasource:
    driver-class-name: com.mysql.cj.jdbc.Driver
    url: jdbc:mysql://127.0.0.1:3306/数据库名?characterEncoding=utf-8&useSSL=false&serverTimezone=UTC
    username: 用户名（一般默认是root）
    password: 数据库密码

mybatis:
  mapper-locations: classpath:mapper/*.xml
```
### 新建包packge  controller
#### 新建UserController.java

```java
package com.text.demo.controller;


import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {
    @RequestMapping("/abc")
    public String getName(){
        return "liuliu";
    }
}
```
网页访问即可得到 liuliu
写一个Animal.java类 固定写法   使用了alt+insert中快速构造函数以及getter and setter 方法
```java
package com.text.demo.controller;

public class Animal {
    private String name;
    private  int age;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public Animal(String name, int age) {
        this.name = name;
        this.age = age;
    }
}
```
#### 方法点：快速构建构造函数
alt+insert
![在这里插入图片描述](https://img-blog.csdnimg.cn/fb512c08fa5e439db720603fa8ca13fa.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NTg5NjEyNg==,size_16,color_FFFFFF,t_70#pic_center)
在UserController.java处理一下，与Animal.java
下面两个方法有很大作用⭐⭐⭐
[@RestController](https://www.jianshu.com/p/6bbb5748ac83) 
该类中所有的API接口返回的数据，无论你对应的方法返回Map或是其他Object，它会以Json字符串的形式返回给客户端
[@RequestMapping](https://blog.csdn.net/renanrenan/article/details/84654362/)      
映射请求，也就是通过它来指定控制器可以处理哪些URL请求
```java
package com.text.demo.controller;


import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {
    @RequestMapping("/abc")
    public Animal getName(){
        return new Animal("dog",12);
    }
}
```
![在这里插入图片描述](https://img-blog.csdnimg.cn/9e63303fe74c44dc9e64ca9cd488370d.jpg#pic_center)
转头一想，不应该是静态的，应该从数据库拿是动态的。
![在这里插入图片描述](https://img-blog.csdnimg.cn/c30fb24e1af646128c2b9d15ded92196.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NTg5NjEyNg==,size_16,color_FFFFFF,t_70#pic_center)

## 3.使用数据库，开始真实项目
上文，主要实战了连接数据库配置，以及开启服务。并通过java写脚本完成在浏览器输入获得json对象的获取。中间又学到了java类的构造函数以及getter和setter固定写法。但由于数据是死的，所以我们应该对数据库做操作作查询。
### 1.建立实体类，跟数据库表字段保持一致
1.新建package entity 内部新建User.java和数据库保持一致
注：使用构造函数以及getter和setter方法

```java
package com.text.demo.entity;

import java.time.DateTimeException;

public class User {
    private int id;
    private String user_code;
    private String user_name;
    private String user_password;
    private String user_avator;
    private String user_gender;
    private String gmt_create;
    private String locked;
    private String gmt_modify;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getUser_code() {
        return user_code;
    }

    public void setUser_code(String user_code) {
        this.user_code = user_code;
    }

    public String getUser_name() {
        return user_name;
    }

    public void setUser_name(String user_name) {
        this.user_name = user_name;
    }

    public String getUser_password() {
        return user_password;
    }

    public void setUser_password(String user_password) {
        this.user_password = user_password;
    }

    public String getUser_avator() {
        return user_avator;
    }

    public void setUser_avator(String user_avator) {
        this.user_avator = user_avator;
    }

    public String getUser_gender() {
        return user_gender;
    }

    public void setUser_gender(String user_gender) {
        this.user_gender = user_gender;
    }

    public String getGmt_create() {
        return gmt_create;
    }

    public void setGmt_create(String gmt_create) {
        this.gmt_create = gmt_create;
    }

    public String getLocked() {
        return locked;
    }

    public void setLocked(String locked) {
        this.locked = locked;
    }

    public String getGmt_modify() {
        return gmt_modify;
    }

    public void setGmt_modify(String gmt_modify) {
        this.gmt_modify = gmt_modify;
    }

    public User(int id, String user_code, String user_name, String user_password, String user_avator, String user_gender, String gmt_create, String locked, String gmt_modify) {
        this.id = id;
        this.user_code = user_code;
        this.user_name = user_name;
        this.user_password = user_password;
        this.user_avator = user_avator;
        this.user_gender = user_gender;
        this.gmt_create = gmt_create;
        this.locked = locked;
        this.gmt_modify = gmt_modify;
    }
}
```


### 2.建立mapper接口，定义要操作数据库的动作
新建mapper包（package） ，新建接口UserMapper.java(即建class时选择interface)

```java
package com.text.demo.mapper;

import com.text.demo.entity.User;

import java.util.List;

public interface UserMapper {
    List<User> findAll();
}
```

### 3.建立mapper的xml文件，写具体的sql语句
在resources新建名为mapper的directory文件夹，内新建file文件 UserMapper.xml
针对mybatis告诉数据库要执行哪些sql语句

```xml
<?xml version="1.0" encoding="UTF-8" ?>
        <!DOCTYPE mapper PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN" "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
        #namespace指向路径
        <mapper namespace="com.text.demo.mapper.UserMapper">
        #id是哪个路径下的方法 resultType返回类型
        <select id="findAll" resultType="com.text.demo.entity.User">
        SELECT * FROM sys_user
        </select>
        </mapper>
```
![在这里插入图片描述](https://img-blog.csdnimg.cn/ae58875f384c4ec3bdc6b2fad64daf07.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NTg5NjEyNg==,size_16,color_FFFFFF,t_70#pic_center)
如果报红，说明你没有安装mybatis   **之前创建项目时我的是已经引进来了**
把他引进来即可。   或者去那个创建项目界面将mybatis引入
怎么做？
找到pom.xml文件
将下面这段代码复制随意地方即可
```xml
<dependency>
            <groupId>org.mybatis.spring.boot</groupId>
            <artifactId>mybatis-spring-boot-starter</artifactId>
            <version>2.2.0</version>
 </dependency>
```
随后不报红，说明成功。
逻辑理解：
![在这里插入图片描述](https://img-blog.csdnimg.cn/1aec2a90b77c4e09a0704e8990dddd14.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NTg5NjEyNg==,size_16,color_FFFFFF,t_70#pic_center)

### 4.建立service类，处理业务逻辑
创建包service，  处理业务逻辑操作、过滤、检查
在文件夹内创建UserService类

```java
package com.text.demo.service;

import com.text.demo.entity.User;
import com.text.demo.mapper.UserMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class UserService {
    @Autowired
    private UserMapper userMapper;
    public List<User> findAll(){
        return userMapper.findAll();

    }
}

```



### 5.在controller类中展示处理结果

```java
package com.text.demo.controller;
import com.text.demo.entity.User;
import com.text.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class UserController {
    @Autowired
    private UserService userService;

    @RequestMapping("/abc")
    public Animal getName(){
        return new Animal("dog",12);
    }
    @RequestMapping("/abcd")
    public List<User> getUser(){
        return userService.findAll();
    }
}

```
### 思路
#### 作用
controller包下作展示的  只给前端交互
service 包下处理业务逻辑 操作计算
mapper包下做哪些操作 insert select等数据库查询
entity包只做数据库映射
#### 逻辑关系：
![在这里插入图片描述](https://img-blog.csdnimg.cn/9a6e8e71bca94fb294c8d1cd55469970.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NTg5NjEyNg==,size_16,color_FFFFFF,t_70#pic_center)




# 完工
























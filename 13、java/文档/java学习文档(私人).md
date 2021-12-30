@[TOC](感谢开源精神，java学习)
# 环境
cmd输入java和javac能输出
环境变量配置
![在这里插入图片描述](https://img-blog.csdnimg.cn/69771ed1beaf4016aaddf04cc508f812.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NTg5NjEyNg==,size_16,color_FFFFFF,t_70#pic_center)
![在这里插入图片描述](https://img-blog.csdnimg.cn/ebc226bc1ce84e5aba71c3dbc93385af.jpg#pic_center)

# 安装
选择好jdk与jre安装位置

## idea基本运行
![在这里插入图片描述](https://img-blog.csdnimg.cn/63846c736624425f82268b055506d401.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NTg5NjEyNg==,size_16,color_FFFFFF,t_70#pic_center)
DemoApplication.java主入口

```java
package com.example.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class DemoApplication {

    public static void main(String[] args) {
        Salary s = new Salary("Mohd Mohtashim", "Ambehta, UP", 3, 3600.00);
        Employee e = new Salary("John Adams", "Boston, MA", 2, 2400.00);

        System.out.println("Call mailCheck using Salary reference --");
        s.mailCheck();

        System.out.println("\n Call mailCheck using Employee reference--");
        e.mailCheck();
    }

}

```
Employee.java 抽象类 不被继承就报错无法实例化

```java
package com.example.demo;
public abstract class Employee
{
    private String name;
    private String address;
    private int number;
    public Employee(String name, String address, int number)
    {
        System.out.println("Constructing an Employee");
        this.name = name;
        this.address = address;
        this.number = number;
    }
    public double computePay()
    {
        System.out.println("Inside Employee computePay");
        return 0.0;
    }
    public void mailCheck()
    {
        System.out.println("Mailing a check to " + this.name
                + " " + this.address);
    }
    public String toString()
    {
        return name + " " + address + " " + number;
    }
    public String getName()
    {
        return name;
    }
    public String getAddress()
    {
        return address;
    }
    public void setAddress(String newAddress)
    {
        address = newAddress;
    }
    public int getNumber()
    {
        return number;
    }
}
```
Salary.java

```java
package com.example.demo;

public class Salary extends Employee
{
    private double salary; //Annual salary
    public Salary(String name, String address, int number, double
            salary)
    {
        super(name, address, number);
        setSalary(salary);
    }
    public void mailCheck()
    {
        System.out.println("Within mailCheck of Salary class ");
        System.out.println("Mailing check to " + getName()
                + " with salary " + salary);
    }
    public double getSalary()
    {
        return salary;
    }
    public void setSalary(double newSalary)
    {
        if(newSalary >= 0.0)
        {
            salary = newSalary;
        }
    }
    public double computePay()
    {
        System.out.println("Computing salary pay for " + getName());
        return salary/52;
    }
}
```
编译结果
> Constructing an Employee
Constructing an Employee
Call mailCheck using Salary reference --
Within mailCheck of Salary class 
Mailing check to Mohd Mohtashim with salary 3600.0
Call mailCheck using Employee reference--
Within mailCheck of Salary class 
Mailing check to John Adams with salary 2400.0


## 理解java类与方法
[参考网站](https://blog.csdn.net/rain722/article/details/78929943)
### 个人思考（跟着思路走思考）
#### 类与方法
> 1.定义一个动物类 这个动物类呢可以有名字 移动方式 喝水  抽象类
![在这里插入图片描述](https://img-blog.csdnimg.cn/b14e5efd0c724dde80e50148324fe392.jpg#pic_center)
> 2.这个动物类呢也可以分为哺乳动物类 爬行动物类  继承动物类  抽象类
![在这里插入图片描述](https://img-blog.csdnimg.cn/280544957f2c47c18a1baec2f753ce12.jpg#pic_center)
![在这里插入图片描述](https://img-blog.csdnimg.cn/f47dc16b57ec40628807b10d07e5d322.jpg#pic_center)
> 3.老虎类是实体类 它必须重写所有继承自超类的抽象方法, 至于那些方法如何重写, 则取决于老虎类本身.
![在这里插入图片描述](https://img-blog.csdnimg.cn/b041216b96394cfcae82d260d87ac25d.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NTg5NjEyNg==,size_16,color_FFFFFF,t_70#pic_center)
老虎低头喝水  
> 4.兔子实体类 继承哺乳动物类  它喝水有点不同ing
![在这里插入图片描述](https://img-blog.csdnimg.cn/be887951c9a4484a9a8fcb206af383e1.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NTg5NjEyNg==,size_16,color_FFFFFF,t_70#pic_center)
> 5、蛇类继承爬行动物类  属于实体类
![在这里插入图片描述](https://img-blog.csdnimg.cn/d62eaefcdd3846b78f96c7e9775c8291.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NTg5NjEyNg==,size_16,color_FFFFFF,t_70#pic_center)
> 6 Framer农夫类  不属于animal动物类，但是他可以带水bringwater去给动物们喂水feedwater
Farmer可以给老虎喂水, 可以给山羊喂水, 还可以给蛇喂水, 那么feedWater()里的参数类型到底是老虎,山羊还是蛇呢.
实际上因为老虎,山羊, 蛇都继承自Animal这个类, 所以feedWater里的参数类型设为Animal就可以了.
![在这里插入图片描述](https://img-blog.csdnimg.cn/d046e4a8ae2246648dfc6b6e17958aeb.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NTg5NjEyNg==,size_16,color_FFFFFF,t_70#pic_center)
> 7逻辑执行  农夫依次喂水 
![在这里插入图片描述](https://img-blog.csdnimg.cn/d0c4790341be42c2919cf9be04233191.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NTg5NjEyNg==,size_16,color_FFFFFF,t_70#pic_center)
> 8.运行代码
![在这里插入图片描述](https://img-blog.csdnimg.cn/97d32cc37ae44d89a68ecebca8621a4f.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NTg5NjEyNg==,size_16,color_FFFFFF,t_70#pic_center)农夫framer带水bringwater去农场
蛇snake 爬行 crawled去农场  行为
蛇跳进水里喝水  方式
山羊goat 移动move去农场 行为
山羊低头喝水 方式
#### interface接口
必要性：
> 1、抽象类解决不了的问题.

既然抽象类很好地实现了多态性, 那么什么情况下用接口会更加好呢?
对于上面的例子, 我们加一点需求.
Farmer 农夫多了1个技能, 就是给另1个动物喂兔子(囧).
BringAnimal(Animal a, String destination)     把兔子带到某个地点...
feedAnimal(Animal ht, Animal a)            把动物a丢给动物ht 
注意农夫并没有把兔子宰了, 而是把小动物(a)丢给另1个被喂食的动物(ht).
那么问题来了, 那个动物必须有捕猎这个技能.  也就是我们要给被喂食的动物加上1个方法(捕猎) hunt(Animal a).
但是现实上不是所有动物都有捕猎这个技能的, 所以我们不应该把hunt(Animal a)方法加在Goat类和Rabbit类里,  只加在Tiger类和Snake类里.
而且老虎跟蛇的捕猎方法也不一样, 则表明hunt()的方法体在Tiger类里和Snake类里是不一样的.
下面有3个方案.
1. 分别在Tiger类里和Snake类里加上Hunt() 方法.  其它类(例如Goat) 不加.
2. 在基类Animal里加上Hunt()抽象方法. 在Tiger里和Snake里重写这个Hunt() 方法.
3. 添加肉食性动物这个抽象类.   
先来说第1种方案.
这种情况下, Tiger里的Hunt(Animal a)方法与 Snake里的Hunt(Animal a)方法毫无关联. 也就是说不能利用多态性.
导致Farm类里的feedAnimal()方法需要分别为Tiger 与 Snake类重载. 否决.
第2种方案:
如果在抽象类Animal里加上Hunt()方法, 则所有它的非抽象派生类都要重写实现这个方法, 包括 Goat类和 Rabbit类.
这是不合理的, 因为Goat类根本没必要用到Hunt()方法, 造成了资源(内存)浪费.
第3种方案:
加入我们在哺乳类动物下做个分叉, 加上肉食性哺乳类动物, 非肉食性哺乳动物这两个抽象类?
首先, 
肉食性这种分叉并不准确, 例如很多腐蚀性动物不会捕猎, 但是它们是肉食性.
其次
这种方案会另类族图越来越复杂, 假如以后再需要辨别能否飞的动物呢, 增加飞翔 fly()这个方法呢? 是不是还要分叉?
再次,
很现实的问题, 在项目中, 你很可能没机会修改上层的类代码, 因为它们是用Jar包发布的, 或者你没有修改权限.
这种情况下就需要用到接口了.
> 2、接口与多态 以及 多继承性.

上面的问题, 抽象类解决不了, 根本问题是Java的类不能多继承.
因为Tiger类继承了动物Animal类的特性(例如 move() 和 drink()) , 但是严格上来将 捕猎(hunt())并不算是动物的特性之一. 有些植物, 单细胞生物也会捕猎的.
所以Tiger要从别的地方来继承Hunt()这个方法.  接口就发挥作用了.
##### 走进接口
> 1.捕获技能接口 Huntable
![在这里插入图片描述](https://img-blog.csdnimg.cn/37803aa1f9224fbc8d58087cb5b30626.jpg#pic_center)
> 2.Tiger类 实现这个接口并重写接口hunt()hunt方法 （注意观察与上文中tiger类区别）
![在这里插入图片描述](https://img-blog.csdnimg.cn/53f8382bbf5240faad8146c426062d46.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NTg5NjEyNg==,size_16,color_FFFFFF,t_70#pic_center)
> 3.Snake类同样逻辑
![在这里插入图片描述](https://img-blog.csdnimg.cn/6071a49b743f47f3b06a744456a80d30.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NTg5NjEyNg==,size_16,color_FFFFFF,t_70#pic_center)
可见同样实现接口的hunt()方法, 但是蛇与老虎的捕猎方法是有区别的.老虎撕咬吃，叼毛蛇直接吞然后消化
> 5.Framer类
Farmer类里的feedAnimal(Animal ht, Animal a)就可以实现多态了.
![在这里插入图片描述](https://img-blog.csdnimg.cn/1532741b8509417b91559a3dc5684311.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NTg5NjEyNg==,size_16,color_FFFFFF,t_70#pic_center)
> 6 执行输出
![在这里插入图片描述](https://img-blog.csdnimg.cn/9a75fb91f87b4ad9b54f2289b5e2a813.jpg#pic_center)
# 接口
抽象方法  静态常量
alt +/  自动智能补全
![在这里插入图片描述](https://img-blog.csdnimg.cn/da05d1b211734acf9097f902f522a326.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NTg5NjEyNg==,size_16,color_FFFFFF,t_70#pic_center)
### 接口
接口（英文：Interface），在JAVA编程语言中是一个抽象类型，是抽象方法的集合，接口通常以interface来声明。一个类通过继承接口的方式，从而来继承接口的抽象方法。							
![在这里插入图片描述](https://img-blog.csdnimg.cn/4907016f2566468dbeed8712172e855a.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NTg5NjEyNg==,size_16,color_FFFFFF,t_70#pic_center)
接口继承接口extends 多继承
类继承类extends关联接口implements

继承的话，每个都要复写方法
![在这里插入图片描述](https://img-blog.csdnimg.cn/4bb81279332541f9bd08dc7801bbb01f.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NTg5NjEyNg==,size_16,color_FFFFFF,t_70#pic_center)
![在这里插入图片描述](https://img-blog.csdnimg.cn/210ac51ffeb24fa085f97e949bba8743.jpg#pic_center)
![在这里插入图片描述](https://img-blog.csdnimg.cn/a1fbccf388fe44b3a47d1a37889ff2ec.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NTg5NjEyNg==,size_16,color_FFFFFF,t_70#pic_center)
1.7以前全是抽象方法，之后接口可以带方法体


> 接口和抽象类共同点不同点

![在这里插入图片描述](https://img-blog.csdnimg.cn/7117031781a54045ac3d5ba0ca28e3d8.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NTg5NjEyNg==,size_16,color_FFFFFF,t_70#pic_center)
super用在调用父类某一个字段   this指向继承的所有上一级类 this代表不同类
当在子类super调用时调用的是父类重写前的方法  

接口里调super 根本不存在

java8对接口拓展的带方法体的方法
![在这里插入图片描述](https://img-blog.csdnimg.cn/a21629fa0ca740babd1e82f21c8e723b.jpg#pic_center)
多态 上下类型转换
#### 实例
![在这里插入图片描述](https://img-blog.csdnimg.cn/c029ef3b8901478691e79cc007e9ecdd.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NTg5NjEyNg==,size_16,color_FFFFFF,t_70#pic_center)
##### 一个类可以同时实现多个接口。
##### 一个类只能继承一个类，但是能实现多个接口。
##### 一个接口能继承另一个接口，这和类之间的继承比较相似。
### 接口的继承
一个接口能继承另一个接口，和类之间的继承方式比较相似。接口的继承使用extends关键字，子接口继承父接口的方法
![在这里插入图片描述](https://img-blog.csdnimg.cn/fb046838ca3a472e949853991ab58c0d.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NTg5NjEyNg==,size_16,color_FFFFFF,t_70#pic_center)
### 类的多继承不合法，接口允许多继承

```csharp
public interface 接口名 extends   类名，类名
```
以上的程序片段是合法定义的子接口，与类不同的是，接口允许多继承，而类名可以定义或是继承相同的方法
### 标记接口  
最常用的继承接口是没有包含任何方法的接口。

标记接口是没有任何方法和属性的接口.它仅仅表明它的类属于一个特定的类型,供其他代码来测试允许做一些事情。

标记接口作用：简单形象的说就是给某个对象打个标（盖个戳），使对象拥有某个或某些特权。
![在这里插入图片描述](https://img-blog.csdnimg.cn/ebd49abf19994e758432880b697a6f71.jpg#pic_center)
没有任何方法的接口被称为标记接口。标记接口主要用于以下两种目的：

 - 建立一个公共的父接口：

正如EventListener接口，这是由几十个其他接口扩展的Java API，你可以使用一个标记接口来建立一组接口的父接口。例如：当一个接口继承了EventListener接口，Java虚拟机(JVM)就知道该接口将要被用于一个事件的代理方案。

 - 向一个类添加数据类型：

这种情况是标记接口最初的目的，实现标记接口的类不需要定义任何接口方法(因为标记接口根本就没有方法)，但是该类通过多态性变成一个接口类型。
### final作用
[借鉴网址](https://www.cnblogs.com/chhyan-dream/p/10685878.html)

>1、用来修饰一个引用
 如果引用为基本数据类型，则该引用为常量，该值无法修改；
 如果引用为引用数据类型，比如对象、数组，则该对象、数组本身可以修改，但指向该对象或数组的地址的引用不能修改。
 如果引用时类的成员变量，则必须当场赋值，否则编译会报错
>  2.用来修饰一个方法
    当使用final修饰方法时，这个方法将成为最终方法，无法被子类重写。但是，该方法仍然可以被继承。
> 3.用来修饰类
 当用final修改类时，该类成为最终类，无法被继承。简称为“断子绝孙类”

### main（）方法中的String[] args
主方法（main）的方法

```csharp
1 public static void main(String[] args){ }   
2 public static void main(String args[]){ }
```
public static void main(String[] args)为Java程序的入口方法，JVM在运行程序的时候，会首先查找main方法。其中，public是权限修饰符，表明任何类或对象都可以访问这个方法，static表明main方法是一个静态方法，即方法中的代码是存储在静态存储区的，只要类被加载后，就可以使用该方法而不需要通过实例化对象来访问，可以直接通过类名.main()直接访问，JVM在启动的时候就是按照上述方法的签名（必须有public与static修饰，返回值为void，且方法的参数为字符串数组）来查找方法的入口地址，如果能找到就执行，找不到则会报错。void表明方法没有返回值，main是JVM识别的特殊方法名，是程序的入口方法。字符串数组参数args为开发人员在命令行状态下与程序交互提供了一种手段。

因为main为程序的入口方法，因此当程序运行的时候，第一个执行的方法就是main方法。通常来讲，要执行一个类的方法，首先必须实例化一个类的对象，然后通过对象来调用这个方法。但是由于main是程序的入口方法，此时还没有实例化对象，因此在编写main方法的时候就要求不需要实例化对象就可以调用这个方法，鉴于此，main方法需要被定义成public与static。下例给出了在调用main方法时传递参数的方法。

```java
public class Example1{
       public static void main(String[] args){
              for(int i=0;i<args.length;i++){
                     System.out.println(args[i]);
              }
       }
}
```
运行java 文件名 a b c  
打印 
a
b
c
所以在命令行中使用String[ ] args即传入参数的使用为：java  类名   【参数1】 【参数2】 【参数3】 .。。。
#### java变量

```java
public class Variable{
    static int allClicks=0;    // 类变量  独立于方法之外的变量，用 static 修饰。
 
    String str="hello world";  // 实例变量  独立于方法之外的变量，不过没有 static 修饰
 
    public void method(){w
 
        int i =0;  // 局部变量  类的方法中的变量
 
    }
}
```
#### 方法
![在这里插入图片描述](https://img-blog.csdnimg.cn/4e46a514f8d74196b79cea8d68c4948a.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NTg5NjEyNg==,size_16,color_FFFFFF,t_70#pic_center)
方法包含一个方法头和一个方法体。下面是一个方法的所有部分：

 - 修饰符：修饰符，这是可选的，告诉编译器如何调用该方法。定义了该方法的访问类型。
 - 返回值类型 ：方法可能会返回值。returnValueType
   是方法返回值的数据类型。有些方法执行所需的操作，但没有返回值。在这种情况下，returnValueType 是关键字void。
 - 方法名：是方法的实际名称。方法名和参数表共同构成方法签名。
 - 参数类型：参数像是一个占位符。当方法被调用时，传递值给参数。这个值被称为实参或变量。参数列表是指方法的参数类型、顺序和参数的个数。参数是可选的，方法可以不包含任何参数。
 - 方法体：方法体包含具体的语句，定义该方法的功能。
> 如何定义方法以及如何调用它

```java
public class TestMax {
   /** 主方法 */
   public static void main(String[] args) {
      int i = 5;
      int j = 2;
      int k = max(i, j);
      System.out.println( i + " 和 " + j + " 比较，最大值是：" + k);
   }
 
   /** 返回两个整数变量较大的值 */
   public static int max(int num1, int num2) {
      int result;
      if (num1 > num2)
         result = num1;
      else
         result = num2;
 
      return result; 
   }
}
```
与前端函数形参实参有点相像
#### 构造方法
当一个对象被创建时候，构造方法用来初始化该对象。构造方法和它所在类的名字相同，但构造方法没有返回值。

通常会使用构造方法给一个类的实例变量赋初值，或者执行其它必要的步骤来创建一个完整的对象。

```java
public class ConsDemo {
  public static void main(String args[]) {
    MyClass t1 = new MyClass( 10 );
    MyClass t2 = new MyClass( 20 );
    System.out.println(t1.x + " " + t2.x);
  }
}
```
# 继承
公共父类

```java
public class Animal { 
    private String name;  
    private int id; 
    public Animal(String myName, int myid) { 
        name = myName; 
        id = myid;
    } 
    public void eat(){ 
        System.out.println(name+"正在吃"); 
    }
    public void sleep(){
        System.out.println(name+"正在睡");
    }
    public void introduction() { 
        System.out.println("大家好！我是"         + id + "号" + name + "."); 
    } 
}
```
🐧类

```java
public class Penguin extends Animal { 
    public Penguin(String myName, int myid) { 
        super(myName, myid); 
    } 
}
```

🐀类

```java
public class Mouse extends Animal { 
    public Mouse(String myName, int myid) { 
        super(myName, myid); 
    } 
}
```
个人想法，没有想法  (～￣▽￣)～
> 继承的特性

 - 子类拥有父类非 private 的属性、方法。
 - 子类可以拥有自己的属性和方法，即子类可以对父类进行扩展。
 - 子类可以用自己的方式实现父类的方法。
 - Java 的继承是单继承，但是可以多重继承，单继承就是一个子类只能继承一个父类，多重继承就是，例如 B 类继承 A 类，C 类继承 B类，所以按照关系就是 B 类是 C 类的父类，A 类是 B 类的父类，这是 Java 继承区别于 C++ 继承的一个特性。
 - 提高了类之间的耦合性（继承的缺点，耦合度高就会造成代码之间的联系越紧密，代码独立性越差）。
##### super 与 this 关键字
super关键字：我们可以通过super关键字来实现对父类成员的访问，用来引用当前对象的父类。

this关键字：指向自己的引用

```java
class Animal {
  void eat() {
    System.out.println("animal : eat");
  }
}
 
class Dog extends Animal {
  void eat() {
    System.out.println("dog : eat");
  }
  void eatTest() {
    this.eat();   // this 调用自己的方法⭐⭐⭐
    super.eat();  // super 调用父类方法⭐⭐⭐
  }
}
 
public class Test {
  public static void main(String[] args) {
    Animal a = new Animal();
    a.eat();
    Dog d = new Dog();
    d.eatTest();
  }
}
```
输出结果
>animal : eat
dog : eat
animal : eat

##### 构造器
子类是不继承父类的构造器（构造方法或者构造函数）的，它只是调用（隐式或显式）。如果父类的构造器带有参数，则必须在子类的构造器中显式地通过 super 关键字调用父类的构造器并配以适当的参数列表。

如果父类构造器没有参数，则在子类的构造器中不需要使用 super 关键字调用父类构造器，系统会自动调用父类的无参构造器。
```java
class SuperClass {
  private int n;
  SuperClass(){
    System.out.println("SuperClass()");
  }
  SuperClass(int n) {
    System.out.println("SuperClass(int n)");
    this.n = n;
  }
}
// SubClass 类继承
class SubClass extends SuperClass{
  private int n;
  
  SubClass(){ // 自动调用父类的无参数构造器
    System.out.println("SubClass");
  }  
  
  public SubClass(int n){ 
    super(300);  // 调用父类中带有参数的构造器
    System.out.println("SubClass(int n):"+n);
    this.n = n;
  }
}
// SubClass2 类继承
class SubClass2 extends SuperClass{
  private int n;
  
  SubClass2(){
    super(300);  // 调用父类中带有参数的构造器
    System.out.println("SubClass2");
  }  
  
  public SubClass2(int n){ // 自动调用父类的无参数构造器
    System.out.println("SubClass2(int n):"+n);
    this.n = n;
  }
}
public class TestSuperSub{
  public static void main (String args[]){
    System.out.println("------SubClass 类继承------");
    SubClass sc1 = new SubClass();
    SubClass sc2 = new SubClass(100); 
    System.out.println("------SubClass2 类继承------");
    SubClass2 sc3 = new SubClass2();
    SubClass2 sc4 = new SubClass2(200); 
  }
}
```
输出结果

```csharp
------SubClass 类继承------
SuperClass()
SubClass
SuperClass(int n)
SubClass(int n):100
------SubClass2 类继承------
SuperClass(int n)
SubClass2
SuperClass()
SubClass2(int n):200
```
## 重写override
重写是子类对父类的允许访问的方法的实现过程进行重新编写, 返回值和形参都不能改变。即外壳不变，核心重写！

重写的好处在于子类可以根据需要，定义特定于自己的行为。 也就是说子类能够根据需要实现父类的方法。

重写方法不能抛出新的检查异常或者比被重写方法申明更加宽泛的异常。例如： 父类的一个方法申明了一个检查异常 IOException，但是在重写这个方法的时候不能抛出 Exception 异常，因为 Exception 是 IOException 的父类，只能抛出 IOException 的子类异常。

在面向对象原则里，重写意味着可以重写任何现有方法。实例如下：

```java
class Animal{
   public void move(){
      System.out.println("动物可以移动");
   }
}
 
class Dog extends Animal{
   public void move(){
      System.out.println("狗可以跑和走");
   }
}
 
public class TestDog{    //重写⭐⭐⭐⭐
   public static void main(String args[]){
      Animal a = new Animal(); // Animal ⭐⭐对象
      Animal b = new Dog(); // Dog ⭐⭐对象
 
      a.move();// 执行 Animal 类的方法
 
      b.move();//执行 Dog 类的方法
   }
}
```
编译运行结果

```csharp
动物可以移动
狗可以跑和走
```
在上面的例子中可以看到，尽管 b 属于 Animal 类型，但是它运行的是 Dog 类的 move方法。

这是由于在编译阶段，只是检查参数的引用类型。

然而在运行时，Java 虚拟机(JVM)指定对象的类型并且运行该对象的方法。
思考：java的super和这种重写区别在哪里
super重写是继承父类方法重写，这种则是将父类方法重写进自己对象的方法中，访问的是自己对象方法。

##### 方法重写规则

 - 参数列表与被重写方法的参数列表必须完全相同。
 - 返回类型与被重写方法的返回类型可以不相同，但是必须是父类返回值的派生类（java5 及更早版本返回类型要一样，java7及更高版本可以不同）。
 - 访问权限不能比父类中被重写的方法的访问权限更低。例如：如果父类的一个方法被声明为 public，那么在子类中重写该方法就不能声明为protected。
 - 父类的成员方法只能被它的子类重写。
 - 声明为 final 的方法不能被重写。
 - 声明为 static 的方法不能被重写，但是能够被再次声明。
 - 子类和父类在同一个包中，那么子类可以重写父类所有方法，除了声明为 private 和 final 的方法。
 - 子类和父类不在同一个包中，那么子类只能够重写父类的声明为 public 和 protected 的非 final 方法。
 - 重写的方法能够抛出任何非强制异常，无论被重写的方法是否抛出异常。但是，重写的方法不能抛出新的强制性异常，或者比被重写方法声明的更广泛的强制性异常，反之则可以。
 - 构造方法不能被重写。
 - 如果不能继承一个类，则不能重写该类的方法。
##### super关键字使用
当需要在子类中调用父类的被重写方法时，要使用 super 关键字。

```java
class Animal{
   public void move(){
      System.out.println("动物可以移动");
   }
}
 
class Dog extends Animal{
   public void move(){
      super.move(); // 应用super类的方法
      System.out.println("狗可以跑和走");
   }
}
 
public class TestDog{
   public static void main(String args[]){
 
      Animal b = new Dog(); // Dog 对象
      b.move(); //执行 Dog类的方法
 
   }
}
```
编译结果

```csharp
动物可以移动
狗可以跑和走
```
思想图
![在这里插入图片描述](https://img-blog.csdnimg.cn/56c03726caf848f18473f9080487edc5.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NTg5NjEyNg==,size_16,color_FFFFFF,t_70#pic_center)
如果没有super的话将会输出

```csharp
狗可以跑和走
```
## 重载

 - 被重载的方法必须改变参数列表(参数个数或类型不一样)；
 - 被重载的方法可以改变返回类型；
 - 被重载的方法可以改变访问修饰符；
 - 被重载的方法可以声明新的或更广的检查异常；
 - 方法能够在同一个类中或者在一个子类中被重载。
 - 无法以返回值类型作为重载函数的区分标准。
![在这里插入图片描述](https://img-blog.csdnimg.cn/0b22e23e897c4214885d7b49225670c2.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NTg5NjEyNg==,size_16,color_FFFFFF,t_70#pic_center)
# 	多态
比如我按f1，在不同界面弹出功能都不一样.
即同一个事件发生在不同的对象上会产生不同的结果。
## 多态存在三个必要条件
 - 继承
 - 重写
 - 父类引用指向子类对象：Parent p = new Child();
![在这里插入图片描述](https://img-blog.csdnimg.cn/ca81434ec29e4a74aca97ec67b7e286e.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NTg5NjEyNg==,size_16,color_FFFFFF,t_70#pic_center)

```java
class Shape {
    void draw() {}
}
  
class Circle extends Shape {
    void draw() {
        System.out.println("Circle.draw()");
    }
}
  
class Square extends Shape {
    void draw() {
        System.out.println("Square.draw()");
    }
}
  
class Triangle extends Shape {
    void draw() {
        System.out.println("Triangle.draw()");
    }
}
```

当使用多态方式调用方法时，首先检查父类中是否有该方法，如果没有，则编译错误；如果有，再去调用子类的同名方法。

多态的好处：可以使程序有良好的扩展，并可以对所有类的对象进行通用处理。

### 多态实例演示

```java
public class Test {
    public static void main(String[] args) {
      show(new Cat());  // 以 Cat 对象调用 show 方法
      show(new Dog());  // 以 Dog 对象调用 show 方法
                
      Animal a = new Cat();  // 向上转型  
      a.eat();               // 调用的是 Cat 的 eat
      Cat c = (Cat)a;        // 向下转型  
      c.work();        // 调用的是 Cat 的 work
  }  
            
    public static void show(Animal a)  {
      a.eat();  
        // 类型判断
        if (a instanceof Cat)  {  // 猫做的事情 
            Cat c = (Cat)a;  
            c.work();  
        } else if (a instanceof Dog) { // 狗做的事情 
            Dog c = (Dog)a;  
            c.work();  
        }  
    }  
}
 
abstract class Animal {  
    abstract void eat();  
}  
  
class Cat extends Animal {  
    public void eat() {  
        System.out.println("吃鱼");  
    }  
    public void work() {  
        System.out.println("抓老鼠");  
    }  
}  
  
class Dog extends Animal {  
    public void eat() {  
        System.out.println("吃骨头");  
    }  
    public void work() {  
        System.out.println("看家");  
    }  
}
```
编译结果
> 吃鱼
抓老鼠
吃骨头
看家
吃鱼
抓老鼠

![在这里插入图片描述](https://img-blog.csdnimg.cn/fb89161ac3894e4997356952f55f4dcf.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NTg5NjEyNg==,size_16,color_FFFFFF,t_70#pic_center)
### 重写 大大例子
![在这里插入图片描述](https://img-blog.csdnimg.cn/3cbe4175294a444c8d70790e0f6cb5ca.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NTg5NjEyNg==,size_16,color_FFFFFF,t_70#pic_center)
#### 例子解析

 - 实例中，实例化了两个 Salary 对象：一个使用 Salary 引用 s，另一个使用 Employee 引用 e。
 - 当调用 s.mailCheck() 时，编译器在编译时会在 Salary 类中找到 mailCheck()，执行过程 JVM 就调用
   Salary 类的 mailCheck()。
 - e 是 Employee 的引用，但引用 e 最终运行的是 Salary 类的 mailCheck() 方法。
 - 在编译的时候，编译器使用 Employee 类中的 mailCheck() 方法验证该语句，但是在运行的时候，Java虚拟机(JVM)调用的是 Salary 类中的 mailCheck() 方法。

以上整个过程被称为虚拟方法调用，该方法被称为虚拟方法。

Java中所有的方法都能以这种方式表现，因此，重写的方法能在运行时调用，不管编译的时候源代码中引用变量是什么数据类型。
# 抽象类
在 Java 中抽象类表示的是一种继承关系，一个类只能继承一个抽象类，而一个类却可以实现多个接口。
抽象类除了不能实例化对象之外，类的其它功能依然存在，成员变量、成员方法和构造方法的访问方式和普通类一样
**抽象类不能实例化对象，所以抽象类必须被继承，才能被使用**
## 抽象方法
如果你想设计这样一个类，该类包含一个特别的成员方法，该方法的具体实现由它的子类确定，那么你可以在父类中声明该方法为抽象方法。

Abstract 关键字同样可以用来声明抽象方法，抽象方法只包含一个方法名，而没有方法体。

抽象方法没有定义，方法名后面直接跟一个分号，而不是花括号。






```java
public abstract class Employee
{
   private String name;
   private String address;
   private int number;
   
   public abstract double computePay();
   
   //其余代码
}
```
声明抽象方法会造成以下两个结果：

 - 如果一个类包含抽象方法，那么该类必须是抽象类。
 - 任何子类必须重写父类的抽象方法，或者声明自身为抽象类。

继承抽象方法的子类必须重写该方法。否则，该子类也必须声明为抽象类。最终，必须有子类实现该抽象方法，否则，从最初的父类到最终的子类都不能用来实例化对象。

**如果Salary类继承了Employee类，那么它必须实现computePay()方法**
```java
/* 文件名 : Salary.java */
public class Salary extends Employee
{
   private double salary; // Annual salary
  
   public double computePay()//实现方法⭐⭐⭐
   {
      System.out.println("Computing salary pay for " + getName());
      return salary/52;
   }
 
   //其余代码
}
```
> 抽象类总结规定

 - 抽象类不能被实例化(初学者很容易犯的错)，如果被实例化，就会报错，编译无法通过。只有抽象类的非抽象子类可以创建对象。
 - 抽象类中不一定包含抽象方法，但是有抽象方法的类必定是抽象类。

 - 抽象类中的抽象方法只是声明，不包含方法体，就是不给出方法的具体实现也就是方法的具体功能。

 - 构造方法，类方法（用 static 修饰的方法）不能声明为抽象方法。

 - 抽象类的子类必须给出抽象类中的抽象方法的具体实现，除非该子类也是抽象类。

# 封装
封装（英语：Encapsulation）是指一种将抽象性函式接口的实现细节部分包装、隐藏起来的方法。

## 实现Java封装的步骤
1. 修改属性的可见性来限制对属性的访问（一般限制为private），例如：

```java
public class Person {
    private String name;
    private int age;
}
```
这段代码中，将 name 和 age 属性设置为私有的，只能本类才能访问，其他类都访问不了，如此就对信息进行了隐藏。

2. 对每个值属性提供对外的公共方法访问，也就是创建一对赋取值方法，用于对私有属性的访问，例如：

```java
public class Person{
    private String name;
    private int age;
​
    public int getAge(){
      return age;
    }
​
    public String getName(){
      return name;
    }
​
    public void setAge(int age){
      this.age = age;
    }
​
    public void setName(String name){
      this.name = name;
    }
}
```
采用 this 关键字是为了解决实例变量（private String name）和局部变量（setName(String name)中的name变量）之间发生的同名的冲突。
## 实例
![在这里插入图片描述](https://img-blog.csdnimg.cn/836b89e8ac094ced88aa6ae6fd0f0b77.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NTg5NjEyNg==,size_16,color_FFFFFF,t_70#pic_center)
父类定义私有变量，并通过公共方法public暴漏出去，入口文件通过赋值复制  获取父类方法变量并重写设置name age。



# 枚举
Java 枚举是一个特殊的类，一般表示一组常量，比如一年的 4 个季节，一个年的 12 个月份，一个星期的 7 天，方向有东南西北等。

Java 枚举类使用 enum 关键字来定义，各个常量使用逗号 , 来分割。

![在这里插入图片描述](https://img-blog.csdnimg.cn/cc4326175fce45948c2aff37fede701f.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NTg5NjEyNg==,size_16,color_FFFFFF,t_70#pic_center)
一组数据相当于数组，当调用的话就使用rhis方法查找到调用
## 迭代枚举属性
可以使用for语句来迭代枚举元素
![在这里插入图片描述](https://img-blog.csdnimg.cn/6ece0f2577e345d9bcd677dae05ee0a0.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NTg5NjEyNg==,size_16,color_FFFFFF,t_70#pic_center)
## 在switch中使用枚举类
枚举类常应用于switch语句中
![在这里插入图片描述](https://img-blog.csdnimg.cn/8bb731e0761045edab943db579d278f6.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NTg5NjEyNg==,size_16,color_FFFFFF,t_70#pic_center)
## values(),ordinal()和valueOf()方法

 - values() 返回枚举类中所有的值。 
 - ordinal()方法可以找到每个枚举常量的索引，就像数组索引一样。
 - valueOf()方法返回指定字符串值的枚举常量。
 ### 具体看菜鸟教程

# 包

 - 1、把功能相似或相关的类或接口组织在同一个包中，方便类的查找和使用。
 - 2、如同文件夹一样，包也采用了树形目录的存储方式。同一个包中的类名字是不同的，不同的包中的类的名字是可以相同的，当同时调用两个不同包中相同类名的类时，应该加上包名加以区别。因此，包可以避免名字冲突。
 - 3、包也限定了访问权限，拥有包访问权限的类才能访问某个包中的类。

Java 使用包（package）这种机制是为了防止命名冲突，访问控制，提供搜索和定位类（class）、接口、枚举（enumerations）和注释（annotation）等。
![在这里插入图片描述](https://img-blog.csdnimg.cn/902e94b8ee2341a2a5a823e4c99fa46e.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NTg5NjEyNg==,size_16,color_FFFFFF,t_70#pic_center)
## 创建包
创建包的时候，你需要为这个包取一个合适的名字。之后，如果其他的一个源文件包含了这个包提供的类、接口、枚举或者注释类型的时候，都必须将这个包的声明放在这个源文件的开头。

包声明应该在源文件的第一行，每个源文件只能有一个包声明，这个文件中的每个类型都应用于它。

如果一个源文件中没有使用包声明，那么其中的类，函数，枚举，注释等将被放在一个无名的包（unnamed package）中。
## import 关键字
为了能够使用某一个包的成员，我们需要在 Java 程序中明确导入该包。使用 "import" 语句可完成此功能。
![在这里插入图片描述](https://img-blog.csdnimg.cn/de3f5bd2cd744cff94d9da632a1a6a24.jpg#pic_center)
![在这里插入图片描述](https://img-blog.csdnimg.cn/de35bec481de43cdae5d2132ebb55e81.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NTg5NjEyNg==,size_16,color_FFFFFF,t_70#pic_center)


注意：
类文件中可以包含任意数量的 import 声明。import 声明必须在包声明之后，类声明之前


# 个人思考
1.java设计多态 继承主要是为了减小代码耦合度以及增加代码可维护性。














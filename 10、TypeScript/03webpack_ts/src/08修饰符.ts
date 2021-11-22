// 修饰符(类中的成员的修饰符):主要是描述类中的成员(属性,构造函数,方法)的可访问性
// 类中的成员都有自己默认的访问修饰符,public
// public修饰符========公共的⭐,类中成员默认的修饰符,代表的是公共的,任何位置都可以访问类中的成员
// private修饰符========私有的⭐,类中的成员如果使用private来修饰,那么外部是无法访问这个成员数据的。当然，子类中也是无法访问该成员数据的
// protected修饰符===========受保护的⭐,类中的成员如果使用protected来修饰,那么外部是无法访问这个成员数据的,当然,子类中是可以访问该成员数据的
(() => {
    // 定义一个类
    class Person {
        // 属性  public修饰属性成员
        // public name: string
        // private name: string //⭐报错
        protected name:string
        // 构造函数
        constructor(name: string) {
            // 更新属性
            this.name = name
        }
        // 方法
        public eat() {
            console.log('秽土转生', this.name);
        }
    }
    // 定义一个子类
class Student extends Person{
    // 构造函数
    constructor(name:string) {
        super(name)
    }
    play(){
        console.log('我喜欢天空',this.name);
        
    }
}


    // 实例化对象
    const per = new Person('大蛇丸')
    // console.log(per.name);
    per.eat()

    const student = new Student('车车')
    student.play()
})()
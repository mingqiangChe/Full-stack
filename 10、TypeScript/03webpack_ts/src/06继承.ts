// 继承：类与类之间关系
// 继承后 类与类之间叫法： A类继承B类，A类叫子类 B类叫基类
// 子类===》派生类
// 基类===》超类（父类）
// 一旦发生继承关系,就出现了父子类的关系（叫法）
(() => {
    //定义一个类，作为基类（超类/父类）
    class Person {
        // 定义属性
        name: string
        age: number
        gender: string
        // 定义构造函数：为了将来实例化对象的时候，可以直接对属性的值进行初始化
        constructor(name: string, age: number, gender: string) {
            // 更新对象中的属性数据
            this.name = name
            this.age = age
            this.gender = gender
        }
        //定义实例方法
        sayHi(str: string) {
            console.log(`大家好,我是${this.name}，今年已经${this.age}岁了,是个${this.gender}孩子，`, str);

        }
    }
    // 定义一个类 ，继承Person
    class Student extends Person {
        constructor(name: string, age: number, gender: string) {
            // 调用父类构造函数使用的是super
            super(name, age, gender)
        }
        // 可以调用父类中方法
        sayHi() {
            console.log('我是学生类中的sayHi方法');
            // 调用父类中sayHi方法
            super.sayHi('哈哈')

        }
    }
    // 实例化Person
    const person = new Person('大甜甜', 88, '女')
    person.sayHi('嘎嘎')
    // 实例化Student
    const stu = new Student('小甜甜', 12, '女')
    stu.sayHi()


    // 总结:类和类之间如果要有继承关系,需要使用extends关键字
    // 子类中可以调用父类中的构造函数,使用的是super关键字(包括调用父类中的实例方法,也可以使用super)
    // 子类中可以重写父类的方法
})()
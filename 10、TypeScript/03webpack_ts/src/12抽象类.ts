//抽象类:包含抽象方法(抽象方法一般没有任何的具体内容的实现),也可以包含实例方法,抽象类是不能被实例化,为了让子类进行实例化及实现内部的抽象方法
// 抽象芙的目的或者是作用最终都是为子类服务的


(() => {
    //定义一个抽象类
    abstract class Animal {
        // 抽象属性
        // abstract name: string
        // 抽象方法
        abstract eat()
        // 报错案例 抽象方法不能有具体的实现
        // abstract eat() {
        //     console.log('螺旋吃');
        // }

        // 实例方法
        sayHi() {
            console.log('您好啊')
        }
    }
    // 定义一个子类（派生类）Dog    无法继承抽象类中的抽象属性
    class Dog extends Animal {
        // name:string='小黄'
        // 重新的实现抽象类中的方法,此时这个方法就是当前Dog类的实例方法了
        eat() {
            console.log('舔着舌头吃');
        }
    }
    // 实例化Dog对象
    const dog: Dog = new Dog()
    dog.eat()
    // console.log(dog.name);
    
    // 调用抽象类中的实例方法
    dog.sayHi()


    // 不能实例化抽象类的对象
    // const ani: Animal = new Animal()
})()
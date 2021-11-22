// 泛型类

(() => {
    //定义一个类,类中的属性值的类型是不确定,方法中的参数及返回值的类型也是不确定
    //定义一个泛型类
    class GenericNumber<T>{
        // 默认的属性的值的类型式泛型类型
        defaultValue: T
        add: (x: T, y: T) => T
    }

    console.log('=======================number');
    // 在实例化类的对象的时候,在确定泛型的类型
    const g1: GenericNumber<number> = new GenericNumber<number>()
    // 设置属性值
    g1.defaultValue = 100
    // 相加的方法
    g1.add = function (x, y) {
        return x + y
    }
    console.log(g1.add(10, 20));
    console.log(g1.add(g1.defaultValue, 20));


    console.log('======================string');
    // 在实例化类的对象的时候,在确定泛型的类型
    const g2: GenericNumber<string> = new GenericNumber<string>()
    // 设置属性值
    g2.defaultValue = 'fgdsg'
    // 相加的方法
    g2.add = function (x, y) {
        return x + y
    }
    console.log(g2.add('G', 'J'));
    console.log(g2.add(g2.defaultValue, 'J'));

})()
// 泛型约束
(() => {
    // 如果我们直接对一个泛型参数取 length 属性, 会报错, 因为这个泛型根本就不知道它有这个属性


    // 定义一个接口用来约束将来的某个类型中必须哟啊有length这个属性
    interface Ilength {
        // 接口中有一个属性length
        length: number
    }
    function getLength<T extends Ilength>(x: T): number {
        return x.length
    }

    console.log(getLength<string>('what are you doing ?'));  //20
    // console.log(getLength<number>(123)); //类型“number”不满足约束“Ilength”



})()
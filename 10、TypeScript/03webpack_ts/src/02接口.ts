// 接口是对象的状态(属性)和行为(方法)的抽象(描述)
// 接口:是一种类型 是一种规范 是一种规则 是一种能力 是一种约束
(() => {
    /*
    需求: 创建人的对象, 需要对人的属性进行一定的约束
      id是number类型, 必须有, 只读的
      name是string类型, 必须有
      age是number类型, 必须有
      sex是string类型, 可以没有
    */
    //定义一个接口，该接口作为Person对象的类型使用，限定或者是约束该对象中的属性数据
    interface IPerson {
        // id是只读的 是number类型
        readonly id: number
        name: string
        age: number
        // ?可有可无
        sex?: string
    }

    // 定义一个对象，这个对象就是定义的接口Iperson
    const person: IPerson = {
        id: 1,
        name: '车车',
        age: 24,
        sex: '男'
    }
    console.log(person);

})()
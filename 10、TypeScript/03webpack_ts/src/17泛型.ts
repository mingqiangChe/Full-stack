// 泛型：在定义函数、接口、类的时候不能预先确定要使用的数据的类型,而是在使用函数、接口、类的时候才能确定数据的类型
(() => {
    // 需求:定义1个函数,传入两个参数,第一参数是数据,第二个参数是数量,函数的作用:根据数量产生对应个数的数据存放在一个数组中
    console.log('================⭐数字');
    // 定义一个函数
    function getArr1(value: number, count: number): number[] {
        // 根据数据和数量产生一个数组
        const arr: number[] = []
        for (let i = 0; i < count; i++) {
            arr.push(value)
        }
        return arr
    }
    const arr1 = getArr1(100.123, 3)
    console.log(arr1);


    console.log('=========================字符串⭐');

    // 定义一个函数
    function getArr2(value: string, count: number): string[] {
        // 根据数据和数量产生一个数组
        const arr: string[] = []
        for (let i = 0; i < count; i++) {
            arr.push(value)
        }
        return arr
    }
    // 定义一个函数，同上，只不过传入字符串类型
    const arr2 = getArr2('aba', 3)
    console.log(arr2);


    console.log('===========任意⭐');

    //⭐ 需求:可以传入任意类型数据，返回来的是存储这个任意类型数据的数组
    // 定义一个函数
    function getArr3(value: any, count: number): any[] {
        // 根据数据和数量产生一个数组
        const arr: any[] = []
        for (let i = 0; i < count; i++) {
            arr.push(value)
        }
        return arr
    }
    // 定义一个函数，同上，只不过传入字符串类型
    const arr3 = getArr3('aba', 3)
    const arr4 = getArr3(10.2, 3)
    console.log(arr3);
    console.log(arr4);

    console.log('============测试方法提示⭐');

    // arr3中存储的是数字类型的数据
    // arr4中存储的是字符串类型的数据
    console.log(arr4[0].toFixed(2))   //没有任何的智能提示的信息(要么有方法名字的提示信息,要么有错误的提示信息)
    console.log(arr3[0].split(""))   //没有任何的智能提示的信息(要么有方法名字的提示信息,要么有错误的提示信息)

    console.log('⭐⭐⭐');
    // 定义一个函数
    function getArr5<T>(value: T, count: number): T[] {
        // 根据数据和数量产生一个数组
        // const arr: T[] = []
        const arr: Array<T> = []
        for (let i = 0; i < count; i++) {
            arr.push(value)
        }
        return arr
    }
    const arr5 = getArr5<number>(30.235892, 3)
    const arr6 = getArr5<string>('火', 3)
    console.log(arr5);
    console.log(arr6);

    console.log(arr5[0].toFixed(2))
    console.log(arr6[0].split(''))


})()
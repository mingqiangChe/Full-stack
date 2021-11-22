// 多个泛型参数的函数：函数中又多个泛型的参数
(() => {
    function getMsg<K, M>(value1: K, value2: M): [K, M] {
        return [value1, value2]
    }
    const arr1 = getMsg<string, number>('jack', 2.55546)
    console.log(arr1);
    console.log(arr1[0].split(''), arr1[1].toFixed(1));
})()
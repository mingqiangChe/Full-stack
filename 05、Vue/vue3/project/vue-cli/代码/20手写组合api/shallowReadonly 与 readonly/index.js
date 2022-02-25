// shallowReactive（浅只读）  readonly（深只读）

// 定义一个readonlyHandle处理对象
const readonlyHandle = {
    // 获取属性值
    get(target, prop) {
        const result = Reflect.get(target, prop)
        console.log('拦截读取数据', prop, result);
        return result
    },
    // 修改属性值或添加属性
    set(target, prop, value) {
        console.warn('只能读取数据，不能修改数据或者添加数据');
        return true
    },
    // 删除某个属性
    deleteProperty(target, prop) {
        console.warn('只能读取数据，不能删除数据');
        return true
    }
}
// 定义一个shallowReactive函数，传入一个目标对象
function shallowReadonly(target) {
    // 需要判断当前的数据是不是对象
    if (target && typeof target === 'object') {
        return new Proxy(target, readonlyHandle)
    }
    return target
}
// 定义一个readonly函数
function readonly(target) {
    // 需要判断当前的数据是不是对象
    if (target && typeof target === 'object') {
        // 判断数组
        if (Array.isArray(target)) {
            target.forEach((item, index) => {
                target[index] = readonly(item)
            })
        } else {//判断对象
            Object.keys(target).forEach(key => {
                target[key] = readonly(target[key])
            })
        }
        return new Proxy(target, readonlyHandle)
    }
    // 如果不是对象或者数组，那么直接返回
    return target
}






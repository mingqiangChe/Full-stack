// 定义一个reactiveHandle处理对象
const reactiveHandle = {
    // 获取属性值
    get(target, prop) {
        if (prop === '_is_reactive') return true
        const result = Reflect.get(target, prop)
        console.log('拦截读取数据', prop, result);
        return result
    },
    // 修改属性值或添加属性
    set(target, prop, value) {
        const result = Reflect.get(target, prop, value)
        console.log('拦截修改数据或者添加数据', prop, value);
        return result
    },
    // 删除某个属性
    deleteProperty(target, prop) {
        const result = Reflect.deleteProperty(target, prop)
        console.log('拦截删除某个属性', prop);
        return result
    }
}
// ⭐⭐定义一个reactive函数，传入一个目标对象
function reactive(target) {
    // 判断当前对象是否object类型（对象/数组）
    if (target && typeof target === 'object') {
        // 对数组或者对象中所有的数据进行reactive递归处理
        // 先判断当前的数据是不是数组
        if (Array.isArray(target)) {
            // 数组数据遍历操作
            target.forEach((item, index) => {
                target[index] = reactive(item)
            })
        } else {
            // 再判断当前的数据是不是对象
            // 对象数据进行遍历
            Object.keys(target).forEach(key => {
                target[key] = reactive(target[key])
            })
        }
        return new Proxy(target, reactiveHandle)
    }
    // 如果传入的数据式基本类型的数据，直接返回
    return target
}

// 定义一个readonlyHandle处理对象
const readonlyHandle = {
    // 获取属性值
    get(target, prop) {
        if (prop === '_is_readonly') return true
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
// ⭐⭐定义一个ref函数，传入一个目标对象
function ref(target) {
    target = reactive(target)
    return {
        _is_ref: true, //标识当前对象是ref对象
        // 保存target数据保存起来
        _value: target,
        get value() {
            console.log('劫持到读取数据');
            return this._value
        },
        set value(val) {
            console.log('劫持到了修改数据，准备更新界面', val);
            this._value = val
        }
    }
}
// 定义一个函数isRef，判断当前对象是不是ref对象
function isRef(obj) {
    return obj && obj._is_ref
}
// 定义一个函数isReactive，判断当前对象是不是Reactive对象
function isReactive(obj) {
    return obj && obj._is_reactive
}
// 定义一个函数isReadonly，判断当前对象是不是Readonly对象
function isReadonly(obj) {
    return obj && obj._is_readonly
}
// 定义一个函数isProxy，判断当前对象是不是reactive对象或者readonly对象
function isProxy(obj) {
    return isReactive(obj) || isReadonly(obj)
}







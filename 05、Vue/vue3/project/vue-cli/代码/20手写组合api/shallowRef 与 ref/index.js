// shallowRef（浅的劫持） 与 ref（深劫持）


// 定义一个reactiveHandle处理对象
const reactiveHandle = {
    // 获取属性值
    get(target, prop) {
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



// 定义⭐⭐shallowRef函数，传入一个目标对象
function shallowRef(target) {
    return {
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




// ⭐⭐定义一个ref函数，传入一个目标对象
function ref(target) {
    target = reactive(target)
    return {
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
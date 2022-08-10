## 定义及解读

防抖函数 debounce 指的是某个函数在某段时间内，无论触发了多少次回调，**都只执行最后一次**。假如我们设置了一个等待时间 3 秒的函数，在这 3 秒内如果遇到函数调用请求就重新计时 3 秒，直至新的 3 秒内没有函数调用请求，此时执行函数，不然就以此类推重新计时。

如果你还无法理解，看下面这张图就清晰多了。其中 Regular 是不做任何处理的情况，throttle 是函数节流之后的结果（上一小节已介绍），debounce 是函数防抖之后的结果。

![image-20190525193539745](%E6%B7%B1%E5%85%A5%E8%A7%A3%E6%9E%90%E9%98%B2%E6%8A%96%E5%87%BD%E6%95%B0%20debounce.assets/2019-07-24-60159.jpg)

## 原理及实现

实现原理就是利用定时器，函数第一次执行时设定一个定时器，之后调用时发现已经设定过定时器就清空之前的定时器，并重新设定一个新的定时器，如果存在没有被清空的定时器，当定时器计时结束后触发函数执行。

### 实现 1

```js
// 实现 1
// fn 是需要防抖处理的函数
// wait 是时间间隔
function debounce(fn, wait = 50) {
    // 通过闭包缓存一个定时器 id
    let timer = null
    // 将 debounce 处理结果当作函数返回
    // 触发事件回调时执行这个返回函数
    return function(...args) {
      	// 如果已经设定过定时器就清空上一次的定时器
        if (timer) clearTimeout(timer)
      
      	// 开始设定一个新的定时器，定时器结束后执行传入的函数 fn
        timer = setTimeout(() => {
            fn.apply(this, args)
        }, wait)
    }
}

// DEMO
// 执行 debounce 函数返回新函数
const betterFn = debounce(() => console.log('fn 防抖执行了'), 1000)
// 停止滑动 1 秒后执行函数 () => console.log('fn 防抖执行了')
document.addEventListener('scroll', betterFn)
```

### 实现 2

上述实现方案已经可以解决大部分使用场景了，不过想要实现第一次触发回调事件就执行 fn 有点力不从心了，这时候我们来改写下 debounce 函数，加上第一次触发立即执行的功能。

```js
// 实现 2
// immediate 表示第一次是否立即执行
function debounce(fn, wait = 50, immediate) {
    let timer = null
    return function(...args) {
        if (timer) clearTimeout(timer)
      
      	// ------ 新增部分 start ------ 
      	// immediate 为 true 表示第一次触发后执行
      	// timer 为空表示首次触发
        if (immediate && !timer) {
            fn.apply(this, args)
        }
      	// ------ 新增部分 end ------ 
      	
        timer = setTimeout(() => {
            fn.apply(this, args)
        }, wait)
    }
}

// DEMO
// 执行 debounce 函数返回新函数
const betterFn = debounce(() => console.log('fn 防抖执行了'), 1000, true)
// 第一次触发 scroll 执行一次 fn，后续只有在停止滑动 1 秒后才执行函数 fn
document.addEventListener('scroll', betterFn)
```

实现原理比较简单，判断传入的 immediate 是否为 true，另外需要额外判断是否是第一次执行防抖函数，判断依旧就是 timer 是否为空，所以只要 `immediate && !timer` 返回 true 就执行 fn 函数，即 `fn.apply(this, args)`。

## 加强版 throttle

现在考虑一种情况，如果用户的操作非常频繁，不等设置的延迟时间结束就进行下次操作，会频繁的清除计时器并重新生成，所以函数 fn 一直都没办法执行，导致用户操作迟迟得不到响应。

有一种思想是将「节流」和「防抖」合二为一，变成加强版的节流函数，关键点在于「 wait 时间内，可以重新生成定时器，但只要 wait 的时间到了，必须给用户一个响应」。这种合体思路恰好可以解决上面提出的问题。

给出合二为一的代码之前先来回顾下 throttle 函数，上一小节中有详细的介绍。

```js
// fn 是需要执行的函数
// wait 是时间间隔
const throttle = (fn, wait = 50) => {
  // 上一次执行 fn 的时间
  let previous = 0
  // 将 throttle 处理结果当作函数返回
  return function(...args) {
    // 获取当前时间，转换成时间戳，单位毫秒
    let now = +new Date()
    // 将当前时间和上一次执行函数的时间进行对比
    // 大于等待时间就把 previous 设置为当前时间并执行函数 fn
    if (now - previous > wait) {
      previous = now
      fn.apply(this, args)
    }
  }
}
```

结合 throttle 和 debounce 代码，加强版节流函数 throttle 如下，新增逻辑在于当前触发时间和上次触发的时间差小于时间间隔时，设立一个新的定时器，相当于把 debounce 代码放在了小于时间间隔部分。

```js
// fn 是需要节流处理的函数
// wait 是时间间隔
function throttle(fn, wait) {
  
  // previous 是上一次执行 fn 的时间
  // timer 是定时器
  let previous = 0, timer = null
  
  // 将 throttle 处理结果当作函数返回
  return function (...args) {
    
    // 获取当前时间，转换成时间戳，单位毫秒
    let now = +new Date()
    
    // ------ 新增部分 start ------ 
    // 判断上次触发的时间和本次触发的时间差是否小于时间间隔
    if (now - previous < wait) {
    	 // 如果小于，则为本次触发操作设立一个新的定时器
       // 定时器时间结束后执行函数 fn 
       if (timer) clearTimeout(timer)
       timer = setTimeout(() => {
          previous = now
        	fn.apply(this, args)
        }, wait)
    // ------ 新增部分 end ------ 
      
    } else {
       // 第一次执行
       // 或者时间间隔超出了设定的时间间隔，执行函数 fn
       previous = now
       fn.apply(this, args)
    }
  }
}

// DEMO
// 执行 throttle 函数返回新函数
const betterFn = throttle(() => console.log('fn 节流执行了'), 1000)
// 第一次触发 scroll 执行一次 fn，每隔 1 秒后执行一次函数 fn，停止滑动 1 秒后再执行函数 fn
document.addEventListener('scroll', betterFn)
```


# 深入解析节流函数 throttle

## 定义及解读

函数节流指的是某个函数在一定时间间隔内（例如 3 秒）只执行一次，在这 3 秒内 **无视后来产生的函数调用请求**，也不会延长时间间隔。3 秒间隔结束后第一次遇到新的函数调用会触发执行，然后在这新的 3 秒内依旧无视后来产生的函数调用请求，以此类推。

如果你还无法理解，看下面这张图就清晰多了。其中 Regular 是不做任何处理的情况，throttle 是函数节流之后的结果，debounce 是函数防抖之后的结果（下一小节介绍）。

![image-20190525193539745](%E6%B7%B1%E5%85%A5%E8%A7%A3%E6%9E%90%E8%8A%82%E6%B5%81%E5%87%BD%E6%95%B0throttle.assets/2019-07-24-060203.jpg)

## 原理及实现

函数节流非常适用于函数被频繁调用的场景，例如：window.onresize() 事件、mousemove 事件、上传进度等情况。使用 throttle API 很简单，那应该如何实现 throttle 这个函数呢？

实现方案有以下两种

- 第一种是用时间戳来判断是否已到执行时间，记录上次执行的时间戳，然后每次触发事件执行回调，回调中判断当前时间戳距离上次执行时间戳的间隔是否已经达到时间差（Xms） ，如果是则执行，并更新上次执行的时间戳，如此循环。
- 第二种方法是使用定时器，比如当 scroll 事件刚触发时，打印一个 *hello world*，然后设置个 1000ms 的定时器，此后每次触发 scroll 事件触发回调，如果已经存在定时器，则回调不执行方法，直到定时器触发，handler 被清除，然后重新设置定时器。

这里我们采用第一种方案来实现，通过闭包保存一个 previous 变量，每次触发 throttle 函数时判断当前时间和 previous 的时间差，如果这段时间差小于等待时间，那就忽略本次事件触发。如果大于等待时间就把 previous 设置为当前时间并执行函数 fn。

我们来一步步实现，首先实现用闭包保存 previous 变量。

```js
const throttle = (fn, wait) => {
	// 上一次执行该函数的时间
  let previous = 0
  return function(...args) {
    console.log(previous)
    ...
  }
}
```

执行 throttle 函数后会返回一个新的 function，我们命名为 betterFn。

```js
const betterFn = function(...args) {
  console.log(previous)
    ...
}
```

betterFn 函数中可以获取到 previous 变量值也可以修改，在回调监听或事件触发时就会执行 betterFn，即 `betterFn()`，所以在这个新函数内判断当前时间和 previous 的时间差即可。

```js
const betterFn = function(...args) {
  let now = +new Date();
  if (now - previous > wait) {
    previous = now
    // 执行 fn 函数
    fn.apply(this, args)
  }
}
```

结合上面两段代码就实现了节流函数，所以完整的实现如下。

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

// DEMO
// 执行 throttle 函数返回新函数
const betterFn = throttle(() => console.log('fn 函数执行了'), 1000)
// 每 10 毫秒执行一次 betterFn 函数，但是只有时间差大于 1000 时才会执行 fn
setInterval(betterFn, 10)
```

参考：https://muyiy.cn/blog/7/7.1.html#%E5%B0%8F%E7%BB%93
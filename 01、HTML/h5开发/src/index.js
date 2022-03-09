// import { sync, isArray } from "./components/sync/index.js"
// import(/* webpackChunkName:"async-test"*/'../src/components/async/index.js').then(_=>{
// _.default.init();
// });
// console.log('fdsaufhkj');
// sync();

// import { $ } from "./components/common/js/jquery-3.5.1.min.js"
// 引入各部分组件
// 在这里调用ready
// ready(function () {
//   document.getElementById("#head").load("/src/components/common/header/header.html")
// })
// ready(function(){
//   　　$("#head").load("top.html")
//   　　$("#center").load("center.html")
//   })
$(document).ready(function(){
  　　$("#head").load("/src/components/common/header/header.html")
  });

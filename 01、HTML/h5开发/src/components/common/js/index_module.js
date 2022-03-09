// const ready= function ready(fn) {
//   if (document.addEventListener) {
//     //标准浏览器 
//     document.addEventListener('DOMContentLoaded', function () {
//       document.removeEventListener('DOMContentLoaded', arguments.callee, false); //注销事件，避免反复触发 
//       fn();//执行函数 
//     }, false);
//   }
//   else if (document.attachEvent) {
//     //IE浏览器 
//     document.attachEvent('onreadystatechange', function () {
//       if (document.readyState == 'complete') {
//         document.detachEvent('onreadystatechange', arguments.callee);
//         fn();
//       }
//     });
//   }
// }
// export{
//   ready
// }

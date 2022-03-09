import {isArray} from "lodash-es";
import item from "./sync.css";
import help from "../common/help.js"
console.log("async引用",help.version);
const sync=function(){
console.log('sync');
// document.getElementById("app").innerHTML=`<h1 class='${item.test}'>hello</h1>`;
}
const isArrayFun=function(args){
// console.log(lodash.isArray(args));
console.log(isArray(args));
}
export{
  sync,isArrayFun
}

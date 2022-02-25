<!--  -->
<template>
  <h2>响应式数据判断</h2>
</template>
<script lang="ts">
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import {
  defineComponent,
  isProxy,
  isReactive,
  isReadonly,
  isRef,
  reactive,
  readonly,
  ref,
} from "vue";
export default defineComponent({
  name: "App",
  /**  
       isRef: 检查一个值是否为一个 ref 对象
       isReactive: 检查一个对象是否是由 reactive 创建的响应式代理
       isReadonly: 检查一个对象是否是由 readonly 创建的只读代理
       isProxy: 检查一个对象是否是由 reactive 或者 readonly 方法创建的代理   **/
  setup() {
    // isRef: 检查一个值是否为一个 ref 对象
    console.log(isRef(ref({}))); //true
    
    // isReactive: 检查一个对象是否是由 reactive 创建的响应式代理
    console.log(isReactive(reactive({}))); //true

    // isReadonly: 检查一个对象是否是由 readonly 创建的只读代理
    console.log(isReadonly(readonly({}))); //true

    //  isProxy: 检查一个对象是否是由 reactive 或者 readonly 方法创建的代理
    console.log(isProxy(readonly({}))); //true
    console.log(isProxy(reactive({}))); //true
    return {};
  },
});
</script>
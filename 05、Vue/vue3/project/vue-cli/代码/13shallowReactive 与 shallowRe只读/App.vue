<!-- 
什么时候用浅响应式呢?
一般情况下使用 ref 和 reactive 即可
如果有一个对象数据, 结构比较深, 但变化时只是外层属性变化 ===> shallowReactive
如果有一个对象数据, 后面会产生新的对象来替换 ===> shallowRef
 -->
<template>
  <h2>shallowReactive 与 shallowRef</h2>
  <h3>m1:{{ m1 }}</h3>
  <h3>m2:{{ m2 }}</h3>
  <h3>m3:{{ m3 }}</h3>
  <h3>m4:{{ m4 }}</h3>
  <button @click="update">更新数据</button>
</template>
<script lang="ts">
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import {
  defineComponent,
  reactive,
  ref,
  shallowReactive,
  shallowRef,
} from "vue";

// 点击阿牛更新数据，看深度响应式 浅度响应式
export default defineComponent({
  name: "App",
  setup() {
    // 深度劫持（深监视）-----------深度响应式
    const m1 = reactive({
      name: "鸣人",
      age: 20,
      car: {
        name: "大本",
        color: "blue",
      },
    });
    // 浅劫持（浅监视）---------浅响应式
    const m2 = shallowReactive({
      name: "鸣人",
      age: 20,
      car: {
        name: "大本",
        color: "blue",
      },
    });
    // ref放对象会进行reactivee处理
    // 深度劫持（深监视）-----------深度响应式
    const m3 = ref({
      name: "鸣人",
      age: 20,
      car: {
        name: "大本",
        color: "blue",
      },
    });
    // 浅劫持（浅监视）---------浅响应式
    const m4 = shallowRef({
      name: "鸣人",
      age: 20,
      car: {
        name: "大本",
        color: "blue",
      },
    });
    const update = () => {
      // 更改m1数据   reactive
      // m1.name += "11"; //浅响应式验证    yes
      // m1.car.name += "一 一"; //深响应式验证    yes
      // 更改m2数据   shallowReactive
      // m2.name += "22"; //浅响应式验证    yes
      // m2.car.name += "二 二"; //深响应式验证  ⭐ 同时运行会响应 单个监视就不行 no
      // 更改m3数据   ref
      // m3.value.name += "33"; //浅响应式验证   yes
      // m3.value.car.name += "三三"; //深响应式验证  yes
      // 更改m4数据   shallowRef
      m4.value.name += "44"; //浅响应式验证   no
      // m4.value.car.name += "四四"; //深响应式验证  no
      console.log(m3, m4); //m3 proxy 做了代理   m4 object
    };
    return {
      m1,
      m2,
      m3,
      m4,
      update,
    };
  },
});
</script>
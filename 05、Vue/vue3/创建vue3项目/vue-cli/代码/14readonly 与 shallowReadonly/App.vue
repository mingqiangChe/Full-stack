<!--  -->
<template>
  <h2>readonly 与 shallowReadonly</h2>
  <h3>state:{{ state2 }}</h3>
  <button @click="update">更新数据</button>
</template>
<script lang="ts">
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import { defineComponent, reactive, readonly, shallowReadonly } from "vue";
export default defineComponent({
  name: "App",
  setup() {
    const state = reactive({
      name: "佐助",
      age: 20,
      car: {
        name: "奔驰",
        color: "red",
      },
    });
    // readonly 只读数据------------⭐深度只读
    // const state2 = readonly(state)
    const state2 = shallowReadonly(state)
    // shallowReadonly ⭐浅只读的
    const update = () => {
    //  state2.name+='====='
    //  state2.car.name+='==='
    // state2.name+='=='
     state2.car.name+='==='   //yes！！！！！！！！！！
    };
    return {
      state2,
      update,
    };
  },
});
</script>
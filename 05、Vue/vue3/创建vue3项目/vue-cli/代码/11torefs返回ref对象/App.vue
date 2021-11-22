<!--  -->
<template>
  <h2>toRefs的使用</h2>
  <!-- <h3>name:{{ state.name }}</h3>
  <h3>age:{{ state.age }}</h3> -->
  <!-- 下面return换成...state 可以使用 但不是响应式  ⭐-->
  <!-- 响应式 torefs⭐⭐⭐ -->
  <h3>name:{{ name }}</h3>
  <h3>age：{{ age }}</h3>
  <h3>name2:{{ name2 }}</h3>
  <h3>age2：{{ age2 }}</h3>
</template>
<script lang="ts">
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import { defineComponent, reactive, toRefs } from "vue";
export default defineComponent({
  name: "App",
  setup() {
    const state = reactive({
      name: "自来也",
      age: 45,
    });
    // toRefs可以把一个响应式对象转换成普通对象，该普通对象的每个 property 都是一个ref
    // const state2 = toRefs(state);
    // ⭐⭐⭐
    const { name, age } = toRefs(state);
    // 定时器，更新数据，（入如果数据变化了，界面随之变化，响应式数据）
    setInterval(() => {
      // state.name += "==";
      // state2.name.value += "==";
      name.value += "4444";
      console.log("--------");
    }, 2000);

    // 返回对象，每一个对象都是ref对象 样例⭐
    function useFeatureX() {
      const state = reactive({
        name2: "天天",
        age2: 52,
      });
      return {
        ...toRefs(state),
      };
    }
    const { name2, age2 } = useFeatureX();


    return {
      // state,
      // ...state,  //不是响应式数据  {name:'自来也',age:45}
      // ...state2,  toRefs返回来的对象
      // ⭐⭐⭐
      name,
      age,
      name2,
      age2,
    };
  },
});
</script>
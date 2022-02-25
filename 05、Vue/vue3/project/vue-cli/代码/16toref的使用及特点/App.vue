<!-- 
为源响应式对象上的某个属性创建一个 ref 对象, 二者内部操作的是同一个数据值, 更新时二者是同步的
区别 ref: 拷贝了一份新的数据值单独操作, 更新时相互不影响
应用: 当要将 某个 prop 的 ref 传递给复合函数时，toRef 很有用
 -->

<template>
  <h2>toref的使用及特点</h2>
  <h3>state:{{ state }}</h3>
  <h3>age:{{ age }}</h3>
  <h3>money:{{ money }}</h3>
  <button @click="update">更新数据</button>
  <Child :age="age"></Child>
</template>
<script lang="ts">
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import Child from "./components/Child.vue";
import { defineComponent, reactive, ref, toRef } from "vue";
export default defineComponent({
  components: { Child },
  name: "App",
  setup() {
    const state = reactive({
      age: 5,
      money: 100,
    });
    // 把响应式数据state对象中的某个属性age变成ref对象
    // 把响应式对象中的某个属性使用⭐ref进行包装，变成ref对象⭐拷贝了一份新的数据值单独操作, 更新时相互不影响
    const age = toRef(state, "age");

    const money = ref(state.money);
    console.log(age);
    console.log(money);

    const update = () => {
      // 更新数据
      console.log("11");
      // state.age += 2;
      // age.value += 3;
      age.value += 10;
    };
    return {
      state,
      age,
      money,
      update,
    };
  },
});
</script>
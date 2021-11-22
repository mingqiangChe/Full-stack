<!--  
toRaw
返回由 reactive 或 readonly 方法转换成响应式代理的普通对象。
这是一个还原方法，可用于临时读取，访问不会被代理/跟踪，写入时也不会触发界面更新。
markRaw
标记一个对象，使其永远不会转换为代理。返回对象本身
应用场景:
有些值不应被设置为响应式的，例如复杂的第三方类实例或 Vue 组件对象。
当渲染具有不可变数据源的大列表时，跳过代理转换可以提高性能。-->
<template>
  <h2>toRaw 与 markRaw</h2>
  <h3>state:{{ state }}</h3>
  <button @click="testToRaw">测试toraw</button>
  <button @click="testMarkRaw">测试markraw</button>
</template>
<script lang="ts">
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import { defineComponent, markRaw, reactive, toRaw } from "vue";
interface UserInfo {
  name: string;
  age: number;
  likes?: string[];
}
export default defineComponent({
  name: "App",
  setup() {
    const state = reactive<UserInfo>({
      name: "小明",
      age: 20,
    });
    const testToRaw = () => {
      console.log("11");
      // ⭐⭐⭐把代理对象变成普通对象,数据变化，界面不变化
      const user = toRaw(state);
      user.name += "toraw";
    };
    const testMarkRaw = () => {
      // console.log("22");
      // state.likes = ["吃", "喝"];
      // state.likes[0] += "testMarkRaw";
      const likes = ["吃", "喝"];
      // ⭐⭐⭐markraw 标记对象数据，从此不能成为代理对象
      state.likes = markRaw(likes);
      setInterval(() => {
        if (state.likes) {
          // 通过定时器知道不能修改
          state.likes[0] += "testMarkRaw";
          console.log("11");
        }
      }, 1000);
    };
    return {
      state,
      testToRaw,
      testMarkRaw,
    };
  },
});
</script>